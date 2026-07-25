// Projects Portfolio Data

export const projectsData = [
  {
    id: 1,
    title: 'Defect & Issue Reporting System ',
    description: 'Developed the backend for an enterprise-grade defect and issue reporting platform for Ethiopian Airlines using ASP.NET Core and C#. Integrated the Google Gemini API for AI-powered issue classification, built a real-time notification system, and implemented role-based JWT authentication for secure, department-wide issue tracking and resolution.',
    category: 'backend',
    featured: true,
    image: '',
    imageColor: 'gradient-1',
    technologies: ['C#', 'ASP.NET Core', 'SQL Server', 'Gemini API', 'JWT','Github'],
    highlights: [
      'AI powered issue Classification',
      'Real Time Notifications',
      'Role-Based Security',
      'Advanced analytics dashboard'
    ],
    metrics: {
      users: '50+',
      performance: '90/100',
      uptime: '99.9%'
    },
    github: 'https://github.com/tewahidohaimanot/ReportDefectingUpdated',
    // demo: 'https://ecommerce-demo.com',
    year: '2025'
  },
  {
    id: 2,
    title: 'Event Linker Platform (Final Year Project)',
    description: 'Created a comprehensive event management platform that simplifies event planning by connecting organizers with service providers through intelligent recommendations, secure bookings, and real-time collaboration.',
    
    category: 'fullstack',
    featured: true,
    image: '',
    imageColor: 'gradient-2',
    technologies: ['React', 'Express.js', 'Node.js', 'MYSQL', 'Tailwind CSS'],
    highlights: [
      ' AI Recommendations',
      'Secure Booking',
      'Real-Time Chat'
    ],
    metrics: {
      users: '25+',
      performance: '98/100',
      uptime: '99.95%'
    },
    github: 'https://github.com/tewahidohaimanot/FYP-Final-Updated',
    // demo: 'https://healthcare-demo.com',
    year: '2026'
  },
  {
    id: 3,
    title: 'Project Management & Collaboration tool',
    description: 'Developed full stack project management platform that enabales teams to collaborate effeciently through real-time ,task updates,kenban boards,team workspaces and analytics dashboards',
    category: 'fullstack',
    featured: true,
    image: '📊',
    imageColor: 'gradient-3',
    technologies: ['React.js', 'Node.js', 'SQLite', 'Vite', 'Express.js','Socket.io','Tailwind CSS','JWT'],
    highlights: [
      'Real-time collaboration',
      'Kanban & Gantt views',
      'Time tracking & reporting',
      'Third-party integrations'
    ],
    metrics: {
      users: '15+',
      performance: '96/100',
      uptime: '99.8%'
    },
    github: 'https://github.com/tewahidohaimanot/Project-Management',
    // demo: 'https://pm-demo.com',
    year: '2025'
  },
  {
    id: 4,
    title: 'E-Commerce',
    description: 'Developed a full stack e-commerce platform that enabales customers to browse products,manage shopping carts,place secure products,manage shopping carts,place secure orders and truck purchases through an intuitive and responsive online shopping experience.',
    category: 'full-stack',
    featured: false,
    image: '🛒',
    imageColor: 'gradient-4',
    technologies: ['HTML', 'Vanilla CSS', 'Javascript', 'Node.js','MYSQL'],
    highlights: [
      'JWT Authentication & User Accounts ',
      'Inventory Control',
      'Cart & Checkout order tracking',

    ],
    metrics: {
      users: '10+',
      performance: '97/100',
      uptime: '99.7%'
    },
    github: 'https://github.com/tewahidohaimanot/EcommerceWebsite',
    // demo: 'https://finance-demo.com',
    year: '2024'
  },
  {
    id: 5,
    title: 'Hospital Management system',
    description: 'Developed a C++ based hospital management system that simplifies patient registration,medical record management,doctor information and healthcare services through a menu-driven console application',
    category: 'backend',
    featured: false,
    image: '',
    imageColor: 'gradient-5',
    technologies: ['C++', 'OOP', 'File handling', 'STL', 'CLI'],
    highlights: [
      'Patient registration and profile management',
      'Medical record creation and maintenance',
      'Doctor Information',
      'Medical services management'
    ],
    metrics: {
      performance: '94/100',
      uptime: '99.95%'
    },
    github: 'https://github.com/tewahidohaimanot/Hospital-management-system',
    // demo: 'https://api-demo.com',
    year: '2024'
  },
  {
    id: 6,
    title: 'Unit Converter',
    description: 'Developed a java based unit converter application that provides accurate conversions for length, weight,temprature,time,volume and days through an interactive menu-driven interface',
    category: 'fullstack',
    featured: false,
    image: '🤖',
    imageColor: 'gradient-6',
    technologies: ['Java', 'OOP', 'Java collections', 'Scanner API', 'Intellih IDEA'],
    highlights: [
      'Multi conversions',
      'Accurate calculations',
      'Real-Time results',
      'Menu-driven navigation'
    ],
    metrics: {
      // users: '+',
      performance: '95/100',
      uptime: '99.6%'
    },
    github: 'https://github.com/tewahidohaimanot/javaproject',
    // demo: 'https://ai-demo.com',
    year: '2024'
  }
];

export const projectCategories = [
  { value: 'all', label: 'All Projects' },
  { value: 'fullstack', label: 'Full Stack' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' }
];
