/**
 * English locale — the SOURCE OF TRUTH for all translatable text.
 *
 * Every other language file mirrors these exact keys with translated values.
 * `Messages` (derived from this object) is the shape every locale must match,
 * so TypeScript flags any missing key in another language at build time.
 *
 * Structure: keys are grouped by feature/page. Content that belongs to a data
 * record (a program, event, photo…) is keyed by that record's stable id/slug,
 * so the data files stay free of translatable text.
 */

export const en = {
  // Shared labels and buttons reused across multiple pages.
  common: {
    donate: 'Donate',
    copied: 'Copied!',
    learnMoreAbout: 'Learn more about us',
    viewAllPrograms: 'View all programs',
    seeNews: 'See news & events',
    getInTouch: 'Get in touch',
    contactUs: 'Contact us',
    joinUs: 'Join us',
    viewDetails: 'View details',
    backToHome: 'Back to home',
    backToNews: 'Back to News & Events',
    toggleMenu: 'Toggle menu',
    skipToContent: 'Skip to content',
    followUs: 'Follow us',
    missionTitle: 'Our Mission',
    visionTitle: 'Our Vision',
    // The trust's one-line introduction (used on Home and About).
    intro:
      'A welfare trust bridging lives and building hope — reaching out to the ' +
      'underprivileged, empowering communities, and building a better society.',
  },

  language: {
    label: 'Language',
    select: 'Select language',
  },

  nav: {
    home: 'Home',
    about: 'About Us',
    programs: 'Programs',
    gallery: 'Gallery',
    news: 'News & Events',
    contact: 'Contact',
    donate: 'Donate',
  },

  footer: {
    quickLinks: 'Quick Links',
    getInTouch: 'Get in Touch',
    rights: '© {year} {name}. All rights reserved.',
    regNo: 'Reg. No. {number}',
  },

  hero: {
    badge: 'Serving since {year}',
    tagline: 'Bridging Lives, Building Hope',
    ctaPrograms: 'Our Programs',
    ctaInvolved: 'Get Involved',
  },

  home: {
    introEyebrow: 'Who we are',
    introLead:
      'For over a decade we have worked hand in hand with communities to ' +
      'create lasting change — one child, one family, and one village at a time.',
    featuredEyebrow: 'What we do',
    featuredTitle: 'Featured Programs',
    featuredSubtitle:
      'A snapshot of the initiatives changing lives across our community.',
    updatesEyebrow: 'Latest news',
    updatesTitle: 'Recent Updates',
    ctaTitle: 'Together, we can do more',
    ctaText:
      'Your support helps us reach more children and families. Volunteer, ' +
      'partner, or donate today.',
  },

  about: {
    pageTitle: 'About Us',
    pageSubtitle: 'Our story, our people, and the values that guide our work.',
    overviewEyebrow: 'Trust overview',
    overviewTitle: 'Building a kinder, fairer society',
    overviewBody:
      'Our trust was established in {year} by a group of volunteers who ' +
      'believed that small, consistent acts of service could transform lives. ' +
      'Today we run programs across education, healthcare, livelihood, and the ' +
      'environment, supported by hundreds of dedicated volunteers and ' +
      'well-wishers.',
    mission:
      'To bridge lives and build hope by reaching out to the underprivileged, ' +
      'empowering communities, and creating a better society through care, ' +
      'compassion, and support.',
    vision:
      'A society where every person — regardless of background — has the ' +
      'opportunity to learn, stay healthy, and thrive.',
    valuesTitle: 'Our Values',
    values: [
      {
        title: 'Compassion',
        description: 'We serve every person with empathy, dignity, and respect.',
      },
      {
        title: 'Integrity',
        description: 'We are transparent and accountable in everything we do.',
      },
      {
        title: 'Inclusion',
        description: 'We reach the most marginalised, leaving no one behind.',
      },
      {
        title: 'Sustainability',
        description: 'We build solutions that last and protect the environment.',
      },
    ],
    objectivesEyebrow: 'Why we exist',
    objectivesTitle: 'Our Objectives',
    objectives: [
      'Provide educational support and scholarships to underprivileged children.',
      'Improve access to primary healthcare in rural and remote areas.',
      'Empower women and youth with vocational and digital skills.',
      'Protect the environment through tree planting and water conservation.',
      'Provide relief and rehabilitation during natural disasters.',
      'Promote community participation and volunteerism.',
    ],
    historyEyebrow: 'Our journey',
    historyTitle: 'History & Milestones',
    history: [
      {
        year: '2026',
        text: 'The trust was registered (Govt. Reg. No. 6/2026) to serve the underprivileged in and around Trichy.',
      },
    ],
    trusteesEyebrow: 'Our people',
    trusteesTitle: 'Founder & Trustees',
    trustees: {
      founder: {
        role: 'Founder & Managing Trustee',
        bio: 'A retired physician who founded the trust to bring healthcare and education to rural communities.',
      },
      programs: {
        role: 'Trustee — Programs',
        bio: 'Leads our education and livelihood programmes with over 15 years in the development sector.',
      },
      operations: {
        role: 'Trustee — Operations',
        bio: 'Oversees day-to-day operations, finance, and volunteer coordination.',
      },
    },
    legalEyebrow: 'Transparency',
    legalTitle: 'Registration & Legal Information',
    legalLabels: {
      registeredName: 'Registered Name',
      registrationNumber: 'Registration Number',
      pan: 'PAN',
      section80G: '80G Exemption',
      registeredSince: 'Registered Since',
    },
    legalNote:
      'The trust holds 12A registration and 80G tax exemption. Donations are ' +
      'eligible for tax benefits under the Income Tax Act.',
    ctaTitle: 'Want to know more?',
    ctaText:
      'We’re happy to share our annual reports and answer any questions about ' +
      'our work.',
  },

  programs: {
    pageTitle: 'Programs & Activities',
    pageSubtitle:
      'The initiatives through which we serve our communities every day.',
    filterAll: 'All',
    filterLabel: 'Filter programs by category',
    objectivesLabel: 'Objectives',
    impactLabel: 'Impact',
    categories: {
      welfare: 'Welfare',
      education: 'Education',
      healthcare: 'Healthcare',
      community: 'Community',
    },
    items: {
      'poor-needy': {
        title: 'Support for the Poor & Needy',
        summary:
          'Providing food, clothing, shelter, and basic essentials to families ' +
          'struggling to meet their daily needs.',
        objectives: [
          'Distribute food, clothing, and daily essentials to families in need',
          'Provide shelter support to the homeless and destitute',
          'Respond to families facing sudden hardship',
        ],
        impact: 'Helping underprivileged families meet their basic needs with dignity.',
      },
      'education-support': {
        title: 'Education Support',
        summary:
          'Helping children with education, scholarships, and learning ' +
          'resources so no child is left behind.',
        objectives: [
          'Provide scholarships to children from low-income families',
          'Supply books, uniforms, and learning materials',
          'Encourage children to stay in school and keep learning',
        ],
        impact: 'Enabling underprivileged children to keep learning and build a brighter future.',
      },
      'medical-assistance': {
        title: 'Medical Assistance',
        summary:
          'Supporting medical treatment and healthcare for those in need who ' +
          'cannot afford the care they require.',
        objectives: [
          'Support treatment costs for patients in need',
          'Help families access medicines and healthcare',
          'Organise health awareness and support',
        ],
        impact: 'Helping people in need access timely medical care and treatment.',
      },
      'differently-abled': {
        title: 'Care for Differently Abled',
        summary:
          'Empowering differently abled individuals to live independent, ' +
          'dignified lives.',
        objectives: [
          'Support differently abled individuals with care and resources',
          'Promote inclusion and equal opportunity',
          'Help individuals live with dignity and independence',
        ],
        impact: 'Empowering differently abled individuals to live with dignity and confidence.',
      },
      'women-children': {
        title: 'Women & Children Welfare',
        summary:
          'Empowering women and protecting children for a better tomorrow.',
        objectives: [
          'Support and empower women in the community',
          'Protect and care for vulnerable children',
          'Promote a safe and nurturing environment for families',
        ],
        impact: 'Supporting women and children on the path to a better future.',
      },
      'community-development': {
        title: 'Community Development',
        summary:
          'Working towards the overall development and well-being of ' +
          'communities.',
        objectives: [
          'Support initiatives that strengthen local communities',
          'Encourage participation and self-reliance',
          'Work towards the long-term well-being of communities',
        ],
        impact: 'Building stronger, more self-reliant communities together.',
      },
    },
    ctaTitle: 'Become a volunteer',
    ctaText:
      'Lend your time and skills to a program you care about. Every hand makes ' +
      'a difference.',
  },

  gallery: {
    pageTitle: 'Gallery',
    pageSubtitle:
      'Moments from our events, programs, and the communities we serve.',
    photosEyebrow: 'Photos',
    photosTitle: 'From the Field',
    photosSubtitle:
      'Click any photo to view it larger. Use the arrow keys to browse.',
    videosEyebrow: 'Videos',
    videosTitle: 'Watch Our Story',
    close: 'Close',
    prev: 'Previous photo',
    next: 'Next photo',
    photos: {
      'health-camp': 'Health camp at Melur village',
      'scholarship-day': 'Scholarship Day celebrations',
      'tree-plantation': 'Tree plantation drive',
      'skill-training': 'Women skill training class',
      'school-kits': 'Distributing school kits',
      'digital-lab': 'Digital literacy lab',
      'elder-care': 'Elder care meal programme',
      'relief-drive': 'Volunteers at relief drive',
      'pond-restoration': 'Community pond restoration',
    },
    videos: {
      journey: 'Our journey so far',
      voices: 'Voices from the community',
    },
  },

  news: {
    pageTitle: 'News & Events',
    pageSubtitle: 'Stay up to date with what’s happening at the trust.',
    upcomingEyebrow: 'Mark your calendar',
    upcomingTitle: 'Upcoming Events',
    emptyUpcoming: 'No upcoming events right now. Please check back soon.',
    announcementsEyebrow: 'Quick updates',
    announcementsTitle: 'Announcements',
    completedEyebrow: 'Looking back',
    completedTitle: 'Completed Events',
    statusUpcoming: 'Upcoming',
    statusCompleted: 'Completed',
    announcements: {
      relief: {
        title: 'Monsoon relief kits distributed',
        text: 'We distributed 800 relief kits to families affected by recent floods.',
      },
      lab: {
        title: 'New computer lab inaugurated',
        text: 'A new digital literacy lab opened at the government school in Melur.',
      },
      volunteers: {
        title: 'Volunteer registrations now open',
        text: 'Sign up to volunteer for our upcoming health and education camps.',
      },
    },
  },

  events: {
    items: {
      'annual-scholarship-day-2026': {
        title: 'Annual Scholarship Day 2026',
        location: 'Community Hall, Anna Nagar, Madurai',
        summary:
          'Celebrating the achievements of our scholarship students and ' +
          'awarding this year’s merit scholarships.',
        details: [
          'Join us for our flagship Annual Scholarship Day, where we honour the ' +
            'hard work of students supported by the trust.',
          'The event includes prize distribution, cultural performances by ' +
            'students, and talks by alumni who have gone on to build successful ' +
            'careers.',
          'Parents, donors, and volunteers are warmly invited to attend and ' +
            'celebrate these young achievers.',
        ],
      },
      'free-eye-camp-2026': {
        title: 'Free Eye Care Camp',
        location: 'Primary Health Centre, Melur',
        summary:
          'A free eye screening and cataract surgery camp in partnership with ' +
          'a local eye hospital.',
        details: [
          'In partnership with a leading eye hospital, we are organising a free ' +
            'eye care camp for residents of Melur and surrounding villages.',
          'Services include free vision testing, spectacles, and referrals for ' +
            'cataract surgery at no cost to the patient.',
          'Volunteers are needed to help with registration and crowd management.',
        ],
      },
      'tree-plantation-drive-2026': {
        title: 'World Environment Day Plantation Drive',
        location: 'Vaigai Riverbank, Madurai',
        summary:
          'Over 300 volunteers planted 5,000 saplings along the Vaigai riverbank.',
        details: [
          'To mark World Environment Day, more than 300 volunteers came ' +
            'together to plant 5,000 native saplings along the Vaigai riverbank.',
          'The drive is part of our Green Villages Initiative and will be ' +
            'followed by a one-year sapling care programme to ensure survival.',
          'We thank every volunteer, school, and local partner who made the day ' +
            'a success.',
        ],
      },
      'women-skill-graduation-2026': {
        title: 'Women Skill Training Graduation',
        location: 'Skill Centre, Anna Nagar, Madurai',
        summary:
          '120 women graduated from our tailoring and handicraft training batch.',
        details: [
          'We proudly celebrated the graduation of 120 women from our latest ' +
            'tailoring and handicraft training batch.',
          'Graduates received certificates and starter kits to help them begin ' +
            'their own small businesses.',
          'Several graduates have already formed self-help groups and secured ' +
            'their first orders.',
        ],
      },
    },
  },

  eventDetail: {
    attendUpcoming: 'Would you like to attend or volunteer for this event?',
    attendCompleted: 'Want to be part of our next event?',
  },

  contact: {
    pageTitle: 'Contact Us',
    pageSubtitle:
      'We’d love to hear from you. Reach out to volunteer, partner, or donate.',
    infoTitle: 'Get in Touch',
    infoLead:
      'Have a question or want to support our work? Send us a message and ' +
      'we’ll get back to you soon.',
    labelAddress: 'Address',
    labelPhone: 'Phone',
    labelEmail: 'Email',
    formName: 'Name',
    formEmail: 'Email',
    formSubject: 'Subject',
    formMessage: 'Message',
    requiredField: 'required',
    send: 'Send message',
    successTitle: 'Thank you!',
    successText:
      'Your message has been received. We’ll get back to you as soon as we can.',
    sendAnother: 'Send another message',
    mapTitle: 'Our location on the map',
    mapIframeTitle: 'Map showing the trust’s location',
    validation: {
      required: 'Please fill out this field.',
      email: 'Please enter a valid email address.',
    },
  },

  donate: {
    pageTitle: 'Support Our Mission',
    pageSubtitle:
      'Your donation reaches children, families, and elders who need it most.',

    hero: {
      eyebrow: 'Support our mission',
      title: 'Your generosity changes lives',
      text:
        'Every contribution — big or small — helps us provide education, ' +
        'healthcare, food, and care to underprivileged communities. Give ' +
        'securely and directly through UPI, QR code, or bank transfer.',
      impactNote:
        'The trust holds 12A & 80G — your donation is eligible for tax ' +
        'benefits under the Income Tax Act.',
      ctaDonate: 'Donate now',
      ctaConfirm: 'I have already paid',
    },

    categories: {
      eyebrow: 'Where your money goes',
      title: 'Choose a cause to support',
      subtitle:
        'Give to a cause close to your heart, or to our General Fund where ' +
        'the need is greatest.',
      items: {
        education: {
          title: 'Education Support',
          description:
            'Books, uniforms, tuition, and scholarships for children from ' +
            'low-income families.',
        },
        medical: {
          title: 'Medical Assistance',
          description:
            'Health camps, medicines, and treatment support for those who ' +
            'cannot afford care.',
        },
        food: {
          title: 'Food Distribution',
          description:
            'Nutritious meals and ration kits for hungry families and ' +
            'daily-wage workers.',
        },
        elderly: {
          title: 'Elderly Care',
          description:
            'Meals, medical help, and companionship for elders living alone.',
        },
        women: {
          title: 'Women Empowerment',
          description:
            'Skill training and micro-enterprise support to help women earn ' +
            'a dignified income.',
        },
        environment: {
          title: 'Environmental Programs',
          description:
            'Tree planting, water conservation, and sustainable farming ' +
            'initiatives.',
        },
        general: {
          title: 'General Fund',
          description:
            'Let us direct your gift to wherever the need is greatest right now.',
        },
      },
    },

    upi: {
      eyebrow: 'Pay by UPI',
      title: 'Donate via UPI',
      subtitle: 'Send any amount instantly from your UPI app.',
      idLabel: 'UPI ID',
      copyId: 'Copy UPI ID',
      payViaUpi: 'Pay via UPI app',
      instructionsTitle: 'How to pay',
      instructions: [
        'Open any UPI app (Google Pay, PhonePe, Paytm, BHIM…).',
        'Send your donation to the UPI ID above, or tap “Pay via UPI app”.',
        'After paying, come back and fill in the confirmation form below.',
      ],
      appNote:
        '“Pay via UPI app” works on phones with a UPI app installed. On a ' +
        'computer, copy the UPI ID and pay from your phone.',
    },

    qr: {
      eyebrow: 'Scan to pay',
      title: 'Scan the QR code',
      subtitle: 'Scan with any UPI app to donate in seconds.',
      alt: 'UPI QR code for donations',
      download: 'Download QR code',
      instructions: [
        'Open your UPI app and choose “Scan QR”.',
        'Scan the code above (or scan it from another device).',
        'Enter the amount, pay, then fill in the confirmation form below.',
      ],
    },

    bank: {
      eyebrow: 'Bank transfer',
      title: 'Direct bank transfer',
      subtitle: 'Transfer via NEFT, IMPS, or RTGS using the details below.',
      accountName: 'Account Name',
      accountNumber: 'Account Number',
      bankName: 'Bank Name',
      branchName: 'Branch Name',
      ifsc: 'IFSC Code',
      accountType: 'Account Type',
      copyAccount: 'Copy account number',
      copyIfsc: 'Copy IFSC code',
      copyAll: 'Copy all details',
    },

    // Payment method labels — reused by the form and the admin dashboard.
    methods: {
      upi: 'UPI',
      qr: 'QR Payment',
      bank: 'Bank Transfer',
    },

    form: {
      eyebrow: 'Almost done',
      title: 'Confirm your donation',
      subtitle:
        'Already paid? Share the details below so we can verify and thank you.',
      name: 'Full Name',
      mobile: 'Mobile Number',
      email: 'Email Address',
      amount: 'Donation Amount (₹)',
      category: 'Donation Category',
      chooseCategory: 'Select a cause',
      method: 'Payment Method',
      chooseMethod: 'Select a method',
      transactionRef: 'Transaction Reference Number',
      transactionRefHint: 'The UPI/bank reference or UTR number from your payment.',
      date: 'Donation Date',
      notes: 'Notes',
      notesOptional: 'optional',
      notesPlaceholder: 'Anything you’d like us to know (optional).',
      screenshot: 'Payment Screenshot',
      screenshotHint: 'Optional. JPG or PNG, up to 1 MB.',
      removeScreenshot: 'Remove screenshot',
      required: 'required',
      submit: 'Submit confirmation',
      submitting: 'Submitting…',
      successTitle: 'Thank you for your donation!',
      successText:
        'We’ve received your confirmation and will verify it shortly. Please ' +
        'keep your reference number for tracking.',
      referenceLabel: 'Your reference number',
      submitAnother: 'Submit another donation',
      validation: {
        required: 'Please fill out this field.',
        email: 'Please enter a valid email address.',
        mobile: 'Please enter a valid 10-digit mobile number.',
        amount: 'Please enter a valid amount.',
        fileType: 'Please upload a JPG or PNG image.',
        fileSize: 'The image is too large. Please upload a file under 1 MB.',
      },
    },

    transparency: {
      eyebrow: 'Transparency',
      title: 'Your trust, well placed',
      subtitle:
        'We believe in full transparency. Here is the difference your ' +
        'support has made.',
      items: {
        donations: 'Total donations received',
        beneficiaries: 'Beneficiaries helped',
        programs: 'Active programs',
      },
      note:
        'Figures are updated periodically. Individual donor details are never ' +
        'shared publicly.',
    },
  },

  admin: {
    pageTitle: 'Donation Management',
    pageSubtitle: 'View, search, and verify donation confirmations.',
    login: {
      title: 'Admin sign in',
      intro: 'Enter the admin passcode to manage donations.',
      passcode: 'Passcode',
      submit: 'Sign in',
      error: 'Incorrect passcode. Please try again.',
    },
    logout: 'Sign out',
    summary: {
      total: 'Total',
      pending: 'Pending',
      verified: 'Verified',
      rejected: 'Rejected',
    },
    search: 'Search by name, reference, or mobile',
    filterStatus: 'Status',
    filterCategory: 'Category',
    filterMethod: 'Method',
    all: 'All',
    count: '{count} donation(s)',
    empty: 'No donations yet.',
    emptyFiltered: 'No donations match your search.',
    table: {
      donor: 'Donor',
      contact: 'Contact',
      amount: 'Amount',
      category: 'Category',
      method: 'Method',
      reference: 'Reference',
      transactionRef: 'Transaction ref',
      date: 'Paid on',
      submitted: 'Submitted',
      status: 'Status',
      proof: 'Proof',
      actions: 'Update status',
    },
    viewProof: 'View screenshot',
    noProof: 'No screenshot',
    closeProof: 'Close',
    status: {
      pending: 'Pending Verification',
      verified: 'Verified',
      rejected: 'Rejected',
    },
    markPending: 'Mark pending',
    markVerified: 'Verify',
    markRejected: 'Reject',
  },

  stats: {
    items: {
      lives: 'Lives impacted',
      projects: 'Projects completed',
      volunteers: 'Active volunteers',
      villages: 'Villages reached',
    },
  },

  notFound: {
    title: 'Page not found',
    text: 'Sorry, the page you’re looking for doesn’t exist or has moved.',
  },
}

/** The shape every locale must implement. */
export type Messages = typeof en
