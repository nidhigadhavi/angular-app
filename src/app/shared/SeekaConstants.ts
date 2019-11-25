export class SeekaConstants {
  public static readonly STUDENT_TYPE = [{ TYPE: 'CURRENT_STUDENT' }, { TYPE: 'ALUMNI' }, { TYPE: 'BOTH' }];
  public static readonly STUDENT_CATEGORY = [{ CATEGORY: 'INTERNATIONAL' }, { CATEGORY: 'DOMESTIC' }];

  public static readonly REVIEW_ENTITY_TYPES = [{ TYPE: 'COURSE' }, { TYPE: 'ARTICLE' }];
  public static readonly REVIEW_ENTITY_TYPE = { COURSE: 'COURSE', ARTICLE: 'ARTICLE' };

  public static readonly CAMPUS_TYPE = { PRIMARY: 'PRIMARY', SECONDORY: 'SECONDARY' };

  public static readonly ENROLLMENT_SUBCATEGORY = { LICENCE: 'LICENCE', PASSPORT: 'PASSPORT', BIRTH_CERTIFICATE: 'BIRTH_CERTIFICATE', ENGLISH_TEST: 'ENGLISH_TEST', ACADEMIC_QUALIFICATION: 'ACADEMIC_QUALIFICATION', REFERENCE_LETTER: 'REFERENCE_LETTER', RESUME: 'RESUME', PORTFOLIO: 'PORTFOLIO', PERSONAL_STATEMENT: 'PERSONAL_STATEMENT', BANK_STATEMENT: 'BANK_STATEMENT', SUPPLEMENTARY_FORM: 'SUPPLEMENTARY_FORM' };

  public static readonly MEDIA_UPLOAD_CATEGORY = { ENROLLMENT: 'ENROLLMENT', INSTITUTE: 'INSTITUTE', COURSE: 'COURSE', CITY: 'CITY' };

  public static ENROLLMENT_STATUSES = {
    SUBMITTED: 'SUBMITTED', SEEKA_REVIEWED: 'SEEKA_REVIEWED', PREPARED: 'PREPARED', INSTITUTE_SUBMITTED: 'INSTITUTE_SUBMITTED',
    INSTITUTE_REVIEWED: 'INSTITUTE_REVIEWED', INSTITUTE_OFFERED: 'INSTITUTE_OFFERED', APPLICANT_APPROVED: 'APPLICANT_APPROVED', APPROVED: 'APPROVED',
    FAILED: 'FAILED', REJECTED: 'REJECTED'
  }

  public static readonly ENROLLMENT_STATUS = [{ name: 'SUBMITTED' }, { name: 'SEEKA_REVIEWED' }, { name: 'PREPARED' }, { name: 'INSTITUTE_SUBMITTED' }, { name: 'INSTITUTE_REVIEWED' }, { name: 'INSTITUTE_OFFERED' }, { name: 'APPLICANT_APPROVED' }, { name: 'APPROVED' }, { name: 'FAILED' }, { name: 'REJECTED' }];

  public static readonly INSTITUTE_SUBCATEGORY = {
    LOGO: 'LOGO', DOCUMENTS: 'DOCUMENTS', IMAGES: 'IMAGES'
  }

  public static readonly LimitOptions = [
    {
      key: '5',
      value: 5
    },
    {
      key: '10',
      value: 10
    },
    {
      key: '20',
      value: 20
    },
    {
      key: '50',
      value: 50
    },
    {
      key: '100',
      value: 100
    }
  ];
  public static LANGUAGE = [{value:'English'} , {value:'Arabic'}, {value:'Chinese'}, {value:'French'},{value:'German'} , {value:'Hindi'}, {value:'Indonesian'}, {value:'Malay'}, {value:'Portuguese'} ,{value:'Spanish'},{value:'Urdu'}] 
  public static MONTHS = [{value:'January'} , {value:'February'}, {value:'March'}, {value:'April'},{value:'May'} , {value:'June'}, {value:'July'}, {value:'August'}, {value:'September'} ,{value:'October'},{value:'November'}, {value:'December'}] 
  public static GENDER = [{name:'Male', value:'male'} , {name:'Female', value:'female'}, {name:'All', value:'all'}] 

  public static ALLCLAIMS =
    [
      {
        id: 1,
        field: "Courses",
        name: "Course",
        enabled: false,
        Category: "DataManagement"
      },
      {
        id: 2,
        field: "Scholarship",
        name: "Scholarship",
        enabled: false,
        Category: "DataManagement"
      },
      {
        id: 3,
        field: "Institution",
        name: "Institution",
        enabled: false,
        Category: "DataManagement"
      },
      {
        id: 4,
        field: "Companies",
        name: "Companies",
        enabled: false,
        Category: "DataManagement"
      },
      {
        id: 5,
        field: "Education Agents",
        name: "Education_agent",
        enabled: false,
        Category: "DataManagement"
      },
      {
        id: 7,
        field: "Post Articles",
        name: "Article",
        enabled: false,
        Category: "ContentAdvertising"
      },
      {
        id: 8,
        field: "Banned Advertising",
        name: "Banned_advertising",
        enabled: false,
        Category: "ContentAdvertising"
      },
      {
        id: 6,
        field: "Users",
        name: "Users",
        enabled: false,
        Category: "UserManagement"
      },
      {
        id: 9,
        field: "Error reporting",
        name: "Error_reporting",
        enabled: false,
        Category: "UserManagement"
      },
      {
        id: 10,
        field: "Application / Reporting",
        name: "Application_reporting",
        enabled: false,
        Category: "UserManagement"
      },
      {
        id: 11,
        field: "Chat",
        name: "Chat",
        enabled: false,
        Category: "Support"
      },
      {
        id: 12,
        field: "Todo",
        name: "Todo",
        enabled: false,
        Category: "Support"
      },
      {
        id: 13,
        field: "Case Management",
        name: "Case_management",
        enabled: false,
        Category: "Support"
      },
      {
        id: 14,
        field: "Push",
        name: "Push",
        enabled: false,
        Category: "Notification"
      },
      {
        id: 15,
        field: "InApp",
        name: "Inapp",
        enabled: false,
        Category: "Notification"
      },
      {
        id: 16,
        field: "Email",
        name: "Email",
        enabled: false,
        Category: "Notification"
      },
      {
        id: 17,
        field: "Coming Soon",
        name: "Coming_soon",
        enabled: false,
        Category: "Others"
      },
      {
        id: 18,
        field: "Maintenance",
        name: "Maintenance",
        enabled: false,
        Category: "Others"
      },
      {
        id: 19,
        field: "Help",
        name: "Help",
        enabled: false,
        Category: "Others"
      }, {
        id: 20,
        field: "Dashboard",
        name: "Dashboard",
        enabled: false,
        Category: ""
      }
    ];


  public static MENUITEMS =
    [
      {
        label: 'Deshboard',
        main: [
          {
            state: 'dashboard',
            short_label: 'D',
            name: 'Dashboard',
            type: 'link',
            icon: 'icon-home',
            showActiveDeactive: "Dashboard",
            image: 'assets/images/menu-icon/dashboard.png',
            write: true,
            enabled: false,
          },
        ],
      },
      {
        label: 'DATA MANAGEMENT',
        main: [
          {
            state: 'Course',
            short_label: 'B',
            name: 'Courses',
            type: 'link',
            icon: 'icon-layout-grid2-alt',
            showActiveDeactive: "Course",
            image: 'assets/images/menu-icon/Courses.png',
            write: true,
            enabled: false,
          },
          {
            state: 'Scholarship',
            short_label: 'A',
            name: 'Scholarship',
            type: 'link',
            icon: 'icon-reload rotate-refresh',
            showActiveDeactive: "Scholarship",
            image: 'assets/images/menu-icon/Scholarships.png',
            write: true,
            enabled: false,
          },
          {
            state: 'Institution',
            short_label: 'A',
            name: 'Institution',
            type: 'link',
            icon: 'icon-reload rotate-refresh',
            showActiveDeactive: "Institution",
            image: 'assets/images/menu-icon/Institution.png',
            write: true,
            enabled: false,
          },
          {
            state: 'Companies',
            short_label: 'A',
            name: 'Companies',
            type: 'link',
            icon: 'icon-reload rotate-refresh',
            showActiveDeactive: "Companies",
            image: 'assets/images/menu-icon/Companies.png',
            write: true,
            enabled: false,
          },
          {
            state: 'Education_Agent',
            short_label: 'A',
            name: 'Education Agents',
            type: 'link',
            icon: 'icon-reload rotate-refresh',
            showActiveDeactive: "Education_agent",
            image: 'assets/images/menu-icon/EducationAgents.png',
            write: true,
            enabled: false,
          },
          {
            state: 'Countries',
            short_label: 'A',
            name: 'Countries',
            type: 'link',
            icon: 'icon-reload rotate-refresh',
            showActiveDeactive: "Countries",
            image: 'assets/images/menu-icon/Countries.png',
            write: true,
            enabled: false,
          },
          {
            state: 'Uploads',
            short_label: 'A',
            name: 'Uploads',
            type: 'link',
            icon: 'icon-reload rotate-refresh',
            showActiveDeactive: "Uploads",
            image: 'assets/images/menu-icon/Uploads.png',
            write: true,
            enabled: false,
          },
        ]
      },

      {
        label: 'NOTIFICATIONS',
        main: [
          {
            state: 'Push',
            short_label: 'F',
            name: 'Push',
            type: 'link',
            icon: 'icon-layers',
            showActiveDeactive: "Push",
            image: 'assets/images/menu-icon/Push.png',
            write: true,
            enabled: false,
            badge: [
              {
                type: 'info',
                value: '0'
              }
            ],
          },
          {
            state: 'InApp',
            short_label: 'F',
            name: 'InApp',
            type: 'link',
            icon: 'icon-layers',
            showActiveDeactive: "Inapp",
            image: 'assets/images/menu-icon/InApp.png',
            write: true,
            enabled: false,
          },
          {
            state: 'Email',
            short_label: 'F',
            name: 'Email',
            type: 'link',
            icon: 'icon-layers',
            showActiveDeactive: "Email",
            image: 'assets/images/menu-icon/Email.png',
            write: true,
            enabled: false,
          },
        ]
      },
      {
        label: 'USER MANAGEMENT',
        main: [
          {
            state: 'Users',
            short_label: 'F',
            name: 'Users',
            type: 'link',
            icon: 'icon-layers',
            showActiveDeactive: "Users",
            image: 'assets/images/menu-icon/Users.png',
            write: true,
            enabled: false,
          },
          {
            state: 'error_reporting',
            short_label: 'F',
            name: 'Error Reporting',
            type: 'link',
            icon: 'icon-layers',
            showActiveDeactive: "Error_reporting",
            image: 'assets/images/menu-icon/ErrorReporting.png',
            write: true,
            enabled: false,
          },
          {
            state: 'Applications',
            short_label: 'F',
            name: 'Applications',
            type: 'link',
            icon: 'icon-layers',
            showActiveDeactive: "Applications",
            image: 'assets/images/menu-icon/apps.png',
            write: true,
            enabled: false,
          },
        ]
      },
      {
        label: 'SUPPORT',
        main: [
          {
            state: 'Chats',
            short_label: 'F',
            name: 'Chat',
            type: 'link',
            icon: 'icon-layers',
            showActiveDeactive: "Chat",
            image: 'assets/images/menu-icon/Chat.png',
            write: true,
            enabled: false,
          },
          {
            state: 'Todo',
            short_label: 'F',
            name: 'Todo',
            type: 'link',
            icon: 'icon-layers',
            showActiveDeactive: "Todo",
            image: 'assets/images/menu-icon/Todo.png',
            write: true,
            enabled: false,
          },
          {
            state: '',
            short_label: 'F',
            name: 'Case Management',
            type: 'link',
            icon: 'icon-layers',
            showActiveDeactive: "Case_management",
            image: 'assets/images/menu-icon/CaseManagement.png',
            write: true,
            enabled: false,
          },
          {
            state: 'Reviews',
            short_label: 'F',
            name: 'Reviews',
            type: 'link',
            icon: 'icon-layers',
            showActiveDeactive: "Reviews",
            image: 'assets/images/menu-icon/Reviews.png',
            write: true,
            enabled: false,
          },
        ]
      },

      {
        label: 'CONTENT / ADVERTISING',
        main: [
          {
            state: '',
            short_label: 'F',
            name: 'Banner Advertising',
            type: 'link',
            icon: 'icon-layers',
            showActiveDeactive: "Banned_advertising",
            image: 'assets/images/menu-icon/Banner.png',
            write: true,
            enabled: false,
          },
          {
            state: 'article',
            short_label: 'F',
            name: 'Post Articles',
            type: 'link',
            icon: 'icon-layers',
            showActiveDeactive: "Article",
            image: 'assets/images/menu-icon/Article.png',
            write: true,
            enabled: false,
          },
        ],
      },
      {
        label: 'OTHERS',
        main: [
          {
            state: '',
            short_label: '',
            name: 'Coming Soon',
            type: 'link',
            icon: 'icon-layers',
            showActiveDeactive: "Coming_soon",
            // image: '',
            write: true,
            enabled: false,
          },
          {
            state: 'notFound',
            short_label: '',
            name: 'Not-Found',
            type: 'link',
            icon: 'icon-layers',
            showActiveDeactive: "notFound",
            // image: '',
            write: true,
            enabled: false,
          },
          {
            state: 'Maintenance',
            short_label: 'F',
            name: 'Maintenance',
            type: 'link',
            icon: 'icon-layers',
            showActiveDeactive: "Maintenance",
            image: 'assets/images/menu-icon/Maintenance.png',
            write: true,
            enabled: false,
          },
          {
            state: 'Help',
            short_label: 'F',
            name: 'Help',
            type: 'link',
            icon: 'icon-layers',
            showActiveDeactive: "Help",
            image: 'assets/images/menu-icon/Help.png',
            write: true,
            enabled: false,
          },
          {
            state: 'Faq',
            short_label: 'F',
            name: 'Faq',
            type: 'link',
            icon: 'icon-layers',
            showActiveDeactive: "Faq",
            image: 'assets/images/menu-icon/Faq.png',
            write: true,
            enabled: false,
          },
        ],
      },
    ]

}
