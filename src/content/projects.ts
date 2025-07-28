import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: "1",
    title: "Kendali",
    description:
      "Kendali is an office management application designed to facilitate various office processes virtually, helping digitize workflows that were previously done manually.",
    techStack: ["React", "TypeScript", "Laravel", "PostgreSQL", "PHP"],
    imageUrl: "v/projects/kendali.png",
    // githubUrl: "https://github.com/alexjohnson/ecommerce-platform",
    liveUrl: "https://play.google.com/store/apps/details?id=id.kendali.beta",
    featured: true,
    category: "Backend",
    team: "Elux Space",
    overview:
      "Kendali is an office management application designed to facilitate various office processes virtually, helping digitize workflows that were previously done manually. This application provides important features such as electronic letter signing, employee attendance management, room rental for meetings or events, and overall office space management. With this digital solution, Kendali is expected to improve office operational efficiency, minimize the use of physical documents, and support greater flexibility and productivity for all staff and management.",
    challenges: [
      "Implementing secure signature document",
      "Send multiple notifications and emails to multiple users",
    ],
    solutions: [
      "Integrating the p12 signature using pythonn",
      "Use queues and jobs to ensure everything is sent in order and there are repetitions in case of failure.",
    ],
    features: [
      "User authentication and profile management",
      "Attendance",
      "Attendance Overwork",
      "Document Signature",
      "File Management (Cloud Storage)",
      "Circular Letter",
      "News",
    ],
    timeline: "6 months",
    role: "Backend Developer",
    responsibilities: [
      "Build a notification feature that sends automatic notifications to users regarding important activities in the app.",
      "Played a role in the database migration process from MySQL to PostgreSQL",
      "Responsible for backend development, including the addition of new features and bug fixes found during testing",
    ],
  },
  {
    id: "2",
    title: "DPR Revamp",
    description:
      "DPR Revamp is a project that aims to completely overhaul the look and functionality of the sub-website of the House of Representatives (DPR) of the Republic of Indonesia",
    techStack: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    imageUrl:
      "v/projects/dpr_revamp.png",
    // githubUrl: "https://github.com/alexjohnson/task-manager",
    // liveUrl: "https://tasks.alexjohnson.dev",
    featured: false,
    category: "Fullstack",
    overview:
      "DPR Revamp is a project that aims to completely overhaul the look and functionality of the sub-website of the House of Representatives (DPR) of the Republic of Indonesia. The project focused on providing a new look that is more modern, informative and accessible to the public. With a more attractive and pleasing design, the site is expected to improve the user experience for both the general public and internal parties. In addition to updating the visual aspect, DPR Revamp also includes navigation improvements and reorganization of information to make it clearer, easier to understand, and in line with the needs of public information transparency.",
    challenges: ["The appearance of each sub domain that must be consistent"],
    solutions: ["Use of reusable components in blade templates"],
    features: ["Dynamic Template"],
    timeline: "6 months",
    team: "DOT Indoensia",
    role: "Full Stack Developer",
    responsibilities: [
      "Break down frontend elements into small components that follow the standard Laravel structure.",
      "Convert each frontend element into modular and reusable Blade components.",
    ],
  },
  {
    id: "3",
    title: "Chup Clinic",
    description:
      "ChupOnline comes as a digital solution to address long queues at healthcare facilities. By relying on smart algorithms and integration of doctors' schedules, this system automatically organizes the queue order based on real conditions in the field. As a result, waiting times are shorter and services are more efficient.",
    techStack: [
      "React",
      "Nest js",
      "Typescript",
      "Redis",
      "PostgreSQL",
      "Laravel",
    ],
    imageUrl: "v/projects/chup_clinic.png",
    // githubUrl: "https://github.com/alexjohnson/weather-dashboard",
    liveUrl: "https://chup.clinic/",
    featured: true,
    category: "Backend",
    overview:
      "ChupOnline is an AI-based intelligent queue management platform designed to improve service efficiency in clinics, hospitals, and other public services. With its adaptive and real-time system, Chup helps to significantly reduce patient waiting time and improve service satisfaction.",
    challenges: [
      "Convert each frontend element into modular and reusable Blade components.",
      "Handles large amounts of data storage.",
      "Large code complexity and size.",
    ],
    solutions: [
      "Using Redis Queue to ensure regular and distributed notification delivery.",
      "Splitting the database schema by domain to improve scalability and performance.",
      "Implemented service workers for offline caching",
    ],
    features: [
      "Inventory Management",
      "Marketing",
      "Patient Management",
      "Business Management",
      "Finance Analytics",
    ],
    timeline: "12 months",
    team: "Chup Online",
    role: "Backend Developer",
    responsibilities: [
      "Implemented Redis Queue for notification delivery.",
      "Integrating Meta API.",
      "Designing an efficient and structured database structure.",
      "Developed a logging system for audit needs.",
    ],
  },
  {
    id: "4",
    title: "Chup MyMental",
    imageUrl: "v/projects/mymental.png",
    description:
      "MyMental.online was developed to fill the gap in access to mental health services, especially among people who are not ready or able to consult professionals directly. With a digital-based approach, the platform offers self-assessment, progress tracking, and educational content that helps users build self-care routines. The long-term goal is to create a society that is more aware of mental health and able to manage stress and emotions in a healthy manner.",
    techStack: [
      "Node.js",
      "Express",
      "Redis",
      "Docker",
      "JWT",
      "Rate Limiting",
    ],
    // githubUrl: "https://github.com/alexjohnson/api-gateway",
    liveUrl: "https://mymental.online/",
    featured: false,
    category: "Backend",
    overview:
      "MyMental.online is a web-based mental health platform designed to help users understand and treat their mental state independently. The platform provides self-assessment, self-care guidance, and a daily tracking feature to form positive habits.",
    challenges: [
      "Continued development of legacy code.",
      "Performing calculations based on provided documents.",
    ],
    solutions: [
      "Mapping the legacy code and refactoring it to make it easier to maintain.",
      "Dividing modules based on similarity of functions to make them more reusable and modular.",
    ],
    features: [
      "Automatic calculation of test scores.",
      "Payment using payment gateway.",
      "Test result analysis dashboard.",
    ],
    timeline: "3 Month",
    team: "Chup Online",
    role: "Backend Developer",
    responsibilities: [
      "Create code according to standards that can be maintained and developed.",
      "Implement payment system using payment gateway.",
      "Refactor legacy code.",
      "Adjust legacy code implementation based on available technical documents.",
    ],
  },
  {
    id: "5",
    title: "Askala AI",
    description:
      "Askala BaseApp is an AI-powered learning platform built on the Internet Computer Protocol (ICP) using Motoko for the backend and React + Vite for the frontend. It delivers interactive Python learning modules, secure authentication, and progress tracking—fully decentralized and verifiable",
    techStack: ["React", "Motoko", "ICP"],
    imageUrl: "v/projects/askala.png",
    githubUrl: "https://github.com/chainrooks/askala_baseapp",
    // liveUrl: "https://design-system.alexjohnson.dev",
    featured: true,
    category: "Blockchain",
    overview:
      "Askala BaseApp is an AI-powered learning platform built on the Internet Computer Protocol (ICP) using Motoko for the backend and React + Vite for the frontend. It delivers interactive Python learning modules, secure authentication, and progress tracking—fully decentralized and verifiable",
    challenges: [
      "Data is still stored after upgrading the system",
      "Maintaining consistency of content and content storage location",
    ],
    solutions: [
      "Using the ICP feature on stable variables",
      "Storing content metadata in smart contracts",
    ],
    features: [
      "Content-based AI chatbot",
      "Decentralized content",
      "User progress based on material learned",
      "Decentralized account",
    ],
    timeline: "2 weeks",
    team: "4 Developer",
    role: "Blockchain Developer",
    responsibilities: [
      "Create smart contracts to store account data",
      "Create a smart contract to store content",
      "Develop application deployment flow",
    ],
    // metrics: {
    //   adoption: "Used by 8 product teams",
    //   components: "50+ production-ready components",
    //   coverage: "95% test coverage",
    //   satisfaction: "4.9/5 developer satisfaction",
    // },
  },
  {
    id: "6",
    title: "Schoolrank ID",
    description:
      "SchoolRank.id is a comprehensive platform to find out and compare school rankings across Indonesia, covering primary, secondary and tertiary levels. The platform provides various supporting features such as best school lists, education development programs, and education consulting services that help parents, students, and other stakeholders to make decisions based on accurate and up-to-date data.",
    techStack: ["React", "Laravel", "FarankenPhp", "PostgreSQL"],
    imageUrl: "/assets/projects/schoolrank.png",
    // githubUrl: "https://github.com/alexjohnson/analytics-dashboard",
    liveUrl: "https://schoolrank.id/",
    featured: false,
    category: "Data",
    overview:
      "SchoolRank.id is a comprehensive platform to find out and compare school rankings across Indonesia, covering primary, secondary and tertiary levels. The platform provides various supporting features such as best school lists, education development programs, and education consulting services that help parents, students, and other stakeholders to make decisions based on accurate and up-to-date data.",
    challenges: [
      "Creating dynamic input forms",
      "Importing large amounts of school data",
      "Anticipating a surge in user enrollment",
      "Maximizing server performance with low specifications",
    ],
    solutions: [
      "Combining JSON structure with table conditioning for input flexibility",
      "Using chunking and batch import methods for data processing efficiency",
      "Implementing queue job system for regular email notification delivery",
      "Using FrankenPHP with Nginx for server efficiency and lightweight performance",
    ],
    features: [
      "School ranking list",
      "School data import feature",
      "Education news and information page",
      "Special programs from SchoolRank.id",
    ],
    timeline: "3 month",
    team: "1 frontend, 1 backend",
    role: "Backend Developer",
    responsibilities: [
      "Setting up the server with FrankenPHP and Nginx configuration",
      "Design and manage database structurecategory",
      "Optimizing queue and job system for notifications",
      "Implement 3rd-party mail service",
    ],
    metrics: {
      users: "2000+ users",
    },
  },
];