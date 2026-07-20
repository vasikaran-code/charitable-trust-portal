/**
 * Trust Forms API — Google Apps Script Web App.
 *
 * Receives form submissions from the website and appends each one as a new row
 * in the attached private Google Sheet. Nothing is ever overwritten.
 *
 * One script serves every form on the site. Each form posts a `formType`, and
 * the FORMS registry below decides which tab it lands in and which columns it
 * has. To support a new form, add one entry to FORMS and redeploy — no other
 * change to this file is needed.
 *
 * SETUP: see docs/CONTACT_FORM_INTEGRATION.md in the website repository.
 * Paste this file into Extensions → Apps Script, then deploy it as a Web App
 * (Execute as: Me, Who has access: Anyone).
 */

// Timezone used for the "Date & Time" column.
var TIMEZONE = 'Asia/Kolkata'

/**
 * The forms this endpoint accepts.
 *
 *   sheet    — tab name; created automatically on the first submission
 *   fields   — column order, after the leading "Date & Time" column
 *   required — fields that may not be empty
 *   formats  — optional per-field format check ('email' or 'phone')
 *   labels   — optional header text; defaults to a capitalised field name
 */
var FORMS = {
  contact: {
    sheet: 'Contact Enquiries',
    fields: ['name', 'email', 'phone', 'subject', 'message'],
    required: ['name', 'email', 'phone', 'message'],
    formats: { email: 'email', phone: 'phone' },
  },

  // Add further forms here, e.g.:
  //
  // volunteer: {
  //   sheet: 'Volunteers',
  //   fields: ['name', 'email', 'phone', 'interest', 'availability', 'message'],
  //   required: ['name', 'email', 'phone', 'interest'],
  //   formats: { email: 'email', phone: 'phone' },
  //   labels: { interest: 'Area of Interest' },
  // },
  //
  // eventRegistration: {
  //   sheet: 'Event Registrations',
  //   fields: ['name', 'email', 'phone', 'eventName', 'attendees'],
  //   required: ['name', 'email', 'phone', 'eventName'],
  //   formats: { email: 'email', phone: 'phone' },
  //   labels: { eventName: 'Event', attendees: 'No. of Attendees' },
  // },
}

// Longest value accepted for any single field.
var MAX_FIELD_LENGTH = 2000

// Shorter caps for fields where a long value is always a mistake. Mirrors
// MAX_LENGTH in the website's src/utils/validators.ts.
var FIELD_LENGTHS = { name: 100, email: 150, phone: 20, subject: 150 }

var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
var PHONE_PATTERN = /^[0-9+()\-\s]{7,}$/

/**
 * Handle a form submission.
 *
 * The website posts a JSON body with Content-Type: text/plain, which keeps the
 * request "simple" so the browser skips the CORS preflight that Apps Script
 * cannot answer. The body is still parsed as JSON here.
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse(false, 'Empty request.')
    }

    var data
    try {
      data = JSON.parse(e.postData.contents)
    } catch (parseError) {
      return jsonResponse(false, 'Request body is not valid JSON.')
    }

    // Older clients that predate the registry post no formType; treat as contact.
    var formType = typeof data.formType === 'string' ? data.formType : 'contact'
    var config = FORMS[formType]
    if (!config) {
      return jsonResponse(false, 'Unknown form type.')
    }

    var values = sanitizeValues(data, config.fields)
    var problem = validateValues(values, config)
    if (problem) {
      return jsonResponse(false, problem)
    }

    appendSubmission(config, values)
    return jsonResponse(true, 'Form submitted successfully.')
  } catch (error) {
    // Log the real cause for the sheet owner; return a generic message to the
    // browser so no internal detail is exposed to visitors.
    console.error('doPost failed: ' + error)
    return jsonResponse(false, 'Could not save the submission.')
  }
}

/** Visiting the Web App URL in a browser lands here — confirm it is alive. */
function doGet() {
  return jsonResponse(true, 'Trust forms endpoint is running.')
}

/** Trim, cap length, and neutralise spreadsheet formula injection. */
function sanitizeValues(data, fields) {
  var values = {}
  for (var i = 0; i < fields.length; i++) {
    var field = fields[i]
    values[field] = clean(data[field], FIELD_LENGTHS[field] || MAX_FIELD_LENGTH)
  }
  return values
}

function clean(value, maxLength) {
  var text = typeof value === 'string' ? value : ''
  text = text.trim().slice(0, maxLength)
  // A leading =, +, - or @ makes Sheets treat the cell as a formula. Prefixing
  // an apostrophe forces it to stay plain text.
  if (/^[=+\-@]/.test(text)) {
    text = "'" + text
  }
  return text
}

/** Returns an error message, or '' when the submission is acceptable. */
function validateValues(values, config) {
  var required = config.required || []
  for (var i = 0; i < required.length; i++) {
    if (!values[required[i]]) {
      return label(config, required[i]) + ' is required.'
    }
  }

  var formats = config.formats || {}
  for (var field in formats) {
    var value = values[field]
    if (!value) continue // optional and left blank
    if (formats[field] === 'email' && !EMAIL_PATTERN.test(value)) {
      return label(config, field) + ' is not valid.'
    }
    if (formats[field] === 'phone' && !PHONE_PATTERN.test(value)) {
      return label(config, field) + ' is not valid.'
    }
  }

  return ''
}

/**
 * Append one row. A script lock serialises concurrent submissions so two
 * visitors sending at the same moment cannot land on the same row.
 */
function appendSubmission(config, values) {
  var lock = LockService.getScriptLock()
  lock.waitLock(20000)
  try {
    var sheet = getSheet(config)
    var row = [Utilities.formatDate(new Date(), TIMEZONE, 'dd-MMM-yyyy hh:mm a')]
    for (var i = 0; i < config.fields.length; i++) {
      row.push(values[config.fields[i]])
    }
    sheet.appendRow(row)
  } finally {
    lock.releaseLock()
  }
}

/** Get the form's tab, creating it with its header row if missing. */
function getSheet(config) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = spreadsheet.getSheetByName(config.sheet)
  if (!sheet) {
    sheet = spreadsheet.insertSheet(config.sheet)
  }
  if (sheet.getLastRow() === 0) {
    var headers = ['Date & Time']
    for (var i = 0; i < config.fields.length; i++) {
      headers.push(label(config, config.fields[i]))
    }
    sheet.appendRow(headers)
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold')
    sheet.setFrozenRows(1)
  }
  return sheet
}

/** Human-readable column name for a field. */
function label(config, field) {
  if (config.labels && config.labels[field]) {
    return config.labels[field]
  }
  return field.charAt(0).toUpperCase() + field.slice(1)
}

/** Build the JSON reply the website expects. */
function jsonResponse(success, message) {
  return ContentService.createTextOutput(
    JSON.stringify({ success: success, message: message }),
  ).setMimeType(ContentService.MimeType.JSON)
}
