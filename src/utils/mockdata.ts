// utils/mockData.ts
export const mockPosts = [
  {
    _id: "1",
    title: "The Future of Web Development: Trends to Watch in 2024",
    slug: "future-web-development-2024",
    publishedAt: "2024-01-15T10:00:00Z",
    excerpt: "Explore the latest trends shaping web development in 2024, from AI integration to new frameworks and performance optimization techniques.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
      alt: "Web development workspace"
    },
    author: {
      _id: "author1",
      name: "Sarah Johnson",
      slug: "sarah-johnson",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=150&h=150&fit=crop&crop=face"
    },
    categories: [
      { _id: "cat1", title: "Technology", slug: "technology" },
      { _id: "cat2", title: "Web Development", slug: "web-development" }
    ]
  },
  {
    _id: "2",
    title: "Understanding React Server Components: A Complete Guide",
    slug: "react-server-components-guide",
    publishedAt: "2024-01-14T14:30:00Z",
    excerpt: "Dive deep into React Server Components and learn how they revolutionize the way we build modern web applications.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
      alt: "React development"
    },
    author: {
      _id: "author2",
      name: "Michael Chen",
      slug: "michael-chen",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    categories: [
      { _id: "cat2", title: "Web Development", slug: "web-development" },
      { _id: "cat3", title: "React", slug: "react" }
    ]
  },
  {
    _id: "3",
    title: "CSS Grid vs Flexbox: When to Use Which Layout Method",
    slug: "css-grid-vs-flexbox-guide",
    publishedAt: "2024-01-13T09:15:00Z",
    excerpt: "Master CSS layouts by understanding the key differences between Grid and Flexbox, and when to use each approach effectively.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=600&fit=crop",
      alt: "CSS layout design"
    },
    author: {
      _id: "author3",
      name: "Emma Rodriguez",
      slug: "emma-rodriguez",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    categories: [
      { _id: "cat4", title: "CSS", slug: "css" },
      { _id: "cat5", title: "Design", slug: "design" }
    ]
  },
  {
    _id: "4",
    title: "Building Scalable APIs with Node.js and TypeScript",
    slug: "scalable-apis-nodejs-typescript",
    publishedAt: "2024-01-12T16:45:00Z",
    excerpt: "Learn best practices for creating robust, scalable APIs using Node.js and TypeScript for enterprise applications.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
      alt: "Node.js development"
    },
    author: {
      _id: "author4",
      name: "David Kim",
      slug: "david-kim",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    categories: [
      { _id: "cat6", title: "Backend", slug: "backend" },
      { _id: "cat7", title: "Node.js", slug: "nodejs" }
    ]
  },
  {
    _id: "5",
    title: "Mobile-First Design: Creating Responsive Experiences",
    slug: "mobile-first-responsive-design",
    publishedAt: "2024-01-11T11:20:00Z",
    excerpt: "Discover the principles of mobile-first design and how to create seamless experiences across all device sizes.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      alt: "Mobile responsive design"
    },
    author: {
      _id: "author5",
      name: "Lisa Park",
      slug: "lisa-park",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    },
    categories: [
      { _id: "cat5", title: "Design", slug: "design" },
      { _id: "cat8", title: "UX/UI", slug: "ux-ui" }
    ]
  },
  {
    _id: "6",
    title: "Database Optimization Techniques for High-Traffic Apps",
    slug: "database-optimization-high-traffic",
    publishedAt: "2024-01-10T13:10:00Z",
    excerpt: "Optimize your database performance with proven techniques for handling high-traffic applications and large datasets.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      alt: "Database optimization"
    },
    author: {
      _id: "author6",
      name: "James Wilson",
      slug: "james-wilson",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    categories: [
      { _id: "cat9", title: "Database", slug: "database" },
      { _id: "cat10", title: "Performance", slug: "performance" }
    ]
  },
  {
    _id: "7",
    title: "Advanced JavaScript Patterns for Clean Code",
    slug: "advanced-javascript-patterns",
    publishedAt: "2024-01-09T08:30:00Z",
    excerpt: "Master advanced JavaScript design patterns and techniques to write cleaner, more maintainable code.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=600&fit=crop",
      alt: "JavaScript code"
    },
    author: {
      _id: "author1",
      name: "Sarah Johnson",
      slug: "sarah-johnson",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=150&h=150&fit=crop&crop=face"
    },
    categories: [
      { _id: "cat11", title: "JavaScript", slug: "javascript" },
      { _id: "cat12", title: "Code Quality", slug: "code-quality" }
    ]
  },
  {
    _id: "8",
    title: "Docker and Kubernetes: Container Orchestration Guide",
    slug: "docker-kubernetes-orchestration",
    publishedAt: "2024-01-08T15:45:00Z",
    excerpt: "Learn container orchestration with Docker and Kubernetes for scalable, production-ready applications.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=600&fit=crop",
      alt: "Container orchestration"
    },
    author: {
      _id: "author2",
      name: "Michael Chen",
      slug: "michael-chen",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    categories: [
      { _id: "cat13", title: "DevOps", slug: "devops" },
      { _id: "cat14", title: "Containers", slug: "containers" }
    ]
  },
  {
    _id: "9",
    title: "GraphQL vs REST: Choosing the Right API Architecture",
    slug: "graphql-vs-rest-api-architecture",
    publishedAt: "2024-01-07T12:00:00Z",
    excerpt: "Compare GraphQL and REST APIs to make informed decisions about your application's data fetching strategy.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
      alt: "API architecture"
    },
    author: {
      _id: "author3",
      name: "Emma Rodriguez",
      slug: "emma-rodriguez",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    categories: [
      { _id: "cat15", title: "API", slug: "api" },
      { _id: "cat16", title: "GraphQL", slug: "graphql" }
    ]
  },
  {
    _id: "10",
    title: "Cybersecurity Best Practices for Developers",
    slug: "cybersecurity-best-practices-developers",
    publishedAt: "2024-01-06T10:25:00Z",
    excerpt: "Essential cybersecurity practices every developer should implement to build secure applications and protect user data.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop",
      alt: "Cybersecurity"
    },
    author: {
      _id: "author4",
      name: "David Kim",
      slug: "david-kim",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    categories: [
      { _id: "cat17", title: "Security", slug: "security" },
      { _id: "cat1", title: "Technology", slug: "technology" }
    ]
  },
  {
    _id: "11",
    title: "Machine Learning for Frontend Developers",
    slug: "machine-learning-frontend-developers",
    publishedAt: "2024-01-05T14:15:00Z",
    excerpt: "Explore how frontend developers can leverage machine learning to create intelligent user interfaces and experiences.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=600&fit=crop",
      alt: "Machine learning"
    },
    author: {
      _id: "author5",
      name: "Lisa Park",
      slug: "lisa-park",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    },
    categories: [
      { _id: "cat18", title: "AI/ML", slug: "ai-ml" },
      { _id: "cat19", title: "Frontend", slug: "frontend" }
    ]
  },
  {
    _id: "12",
    title: "Testing Strategies for Modern Web Applications",
    slug: "testing-strategies-web-applications",
    publishedAt: "2024-01-04T09:40:00Z",
    excerpt: "Comprehensive guide to testing strategies including unit, integration, and e2e testing for web applications.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
      alt: "Software testing"
    },
    author: {
      _id: "author6",
      name: "James Wilson",
      slug: "james-wilson",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    categories: [
      { _id: "cat20", title: "Testing", slug: "testing" },
      { _id: "cat12", title: "Code Quality", slug: "code-quality" }
    ]
  },
  {
    _id: "13",
    title: "WebAssembly: The Future of Web Performance",
    slug: "webassembly-web-performance-future",
    publishedAt: "2024-01-03T16:20:00Z",
    excerpt: "Discover how WebAssembly is revolutionizing web performance and opening new possibilities for web applications.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
      alt: "WebAssembly performance"
    },
    author: {
      _id: "author1",
      name: "Sarah Johnson",
      slug: "sarah-johnson",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=150&h=150&fit=crop&crop=face"
    },
    categories: [
      { _id: "cat21", title: "WebAssembly", slug: "webassembly" },
      { _id: "cat10", title: "Performance", slug: "performance" }
    ]
  },
  {
    _id: "14",
    title: "Progressive Web Apps: Building App-Like Experiences",
    slug: "progressive-web-apps-guide",
    publishedAt: "2024-01-02T11:50:00Z",
    excerpt: "Learn how to build Progressive Web Apps that deliver native app experiences through web technologies.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
      alt: "Progressive Web Apps"
    },
    author: {
      _id: "author2",
      name: "Michael Chen",
      slug: "michael-chen",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    categories: [
      { _id: "cat22", title: "PWA", slug: "pwa" },
      { _id: "cat2", title: "Web Development", slug: "web-development" }
    ]
  },
  {
    _id: "15",
    title: "Serverless Architecture: Benefits and Best Practices",
    slug: "serverless-architecture-best-practices",
    publishedAt: "2024-01-01T13:35:00Z",
    excerpt: "Explore serverless architecture benefits and learn best practices for building scalable, cost-effective applications.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop",
      alt: "Serverless architecture"
    },
    author: {
      _id: "author3",
      name: "Emma Rodriguez",
      slug: "emma-rodriguez",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    categories: [
      { _id: "cat23", title: "Serverless", slug: "serverless" },
      { _id: "cat24", title: "Cloud", slug: "cloud" }
    ]
  },
  {
    _id: "16",
    title: "Accessibility in Web Design: A Developer's Guide",
    slug: "web-accessibility-developer-guide",
    publishedAt: "2023-12-31T08:45:00Z",
    excerpt: "Essential accessibility principles and techniques to make your web applications inclusive for all users.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop",
      alt: "Web accessibility"
    },
    author: {
      _id: "author4",
      name: "David Kim",
      slug: "david-kim",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    categories: [
      { _id: "cat25", title: "Accessibility", slug: "accessibility" },
      { _id: "cat8", title: "UX/UI", slug: "ux-ui" }
    ]
  },
  {
    _id: "17",
    title: "Version Control with Git: Advanced Techniques",
    slug: "git-advanced-techniques",
    publishedAt: "2023-12-30T15:10:00Z",
    excerpt: "Master advanced Git techniques for better collaboration, branching strategies, and project management.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=600&fit=crop",
      alt: "Git version control"
    },
    author: {
      _id: "author5",
      name: "Lisa Park",
      slug: "lisa-park",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    },
    categories: [
      { _id: "cat26", title: "Git", slug: "git" },
      { _id: "cat27", title: "Version Control", slug: "version-control" }
    ]
  },
  {
    _id: "18",
    title: "Building Real-time Applications with Socket.io",
    slug: "realtime-applications-socketio",
    publishedAt: "2023-12-29T12:25:00Z",
    excerpt: "Create engaging real-time applications using Socket.io for instant communication and live updates.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      alt: "Real-time applications"
    },
    author: {
      _id: "author6",
      name: "James Wilson",
      slug: "james-wilson",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    categories: [
      { _id: "cat28", title: "Real-time", slug: "realtime" },
      { _id: "cat7", title: "Node.js", slug: "nodejs" }
    ]
  },
  {
    _id: "19",
    title: "CSS Animation: Creating Smooth User Interactions",
    slug: "css-animation-user-interactions",
    publishedAt: "2023-12-28T10:15:00Z",
    excerpt: "Learn CSS animation techniques to create smooth, engaging user interactions that enhance user experience.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      alt: "CSS animations"
    },
    author: {
      _id: "author1",
      name: "Sarah Johnson",
      slug: "sarah-johnson",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=150&h=150&fit=crop&crop=face"
    },
    categories: [
      { _id: "cat4", title: "CSS", slug: "css" },
      { _id: "cat29", title: "Animation", slug: "animation" }
    ]
  },
  {
    _id: "20",
    title: "Data Visualization with D3.js: Interactive Charts",
    slug: "data-visualization-d3js-charts",
    publishedAt: "2023-12-27T14:40:00Z",
    excerpt: "Master D3.js to create stunning, interactive data visualizations and charts for your web applications.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      alt: "Data visualization"
    },
    author: {
      _id: "author2",
      name: "Michael Chen",
      slug: "michael-chen",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    categories: [
      { _id: "cat30", title: "Data Viz", slug: "data-viz" },
      { _id: "cat11", title: "JavaScript", slug: "javascript" }
    ]
  },
  {
    _id: "21",
    title: "Microservices Architecture: Design Patterns",
    slug: "microservices-architecture-patterns",
    publishedAt: "2023-12-26T09:20:00Z",
    excerpt: "Explore microservices architecture patterns and learn how to design scalable, maintainable distributed systems.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
      alt: "Microservices architecture"
    },
    author: {
      _id: "author3",
      name: "Emma Rodriguez",
      slug: "emma-rodriguez",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    categories: [
      { _id: "cat31", title: "Microservices", slug: "microservices" },
      { _id: "cat32", title: "Architecture", slug: "architecture" }
    ]
  },
  {
    _id: "22",
    title: "Performance Monitoring: Tools and Techniques",
    slug: "performance-monitoring-tools",
    publishedAt: "2023-12-25T16:55:00Z",
    excerpt: "Essential tools and techniques for monitoring application performance and optimizing user experience.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      alt: "Performance monitoring"
    },
    author: {
      _id: "author4",
      name: "David Kim",
      slug: "david-kim",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    categories: [
      { _id: "cat10", title: "Performance", slug: "performance" },
      { _id: "cat33", title: "Monitoring", slug: "monitoring" }
    ]
  },
  {
    _id: "23",
    title: "Cloud Computing: AWS vs Azure vs Google Cloud",
    slug: "cloud-computing-aws-azure-gcp",
    publishedAt: "2023-12-24T11:30:00Z",
    excerpt: "Compare major cloud platforms and learn which services best fit your application architecture needs.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop",
      alt: "Cloud computing"
    },
    author: {
      _id: "author5",
      name: "Lisa Park",
      slug: "lisa-park",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    },
    categories: [
      { _id: "cat24", title: "Cloud", slug: "cloud" },
      { _id: "cat34", title: "AWS", slug: "aws" }
    ]
  },
  {
    _id: "24",
    title: "State Management in React: Redux vs Context vs Zustand",
    slug: "react-state-management-comparison",
    publishedAt: "2023-12-23T13:45:00Z",
    excerpt: "Compare different React state management solutions and choose the right approach for your application.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
      alt: "React state management"
    },
    author: {
      _id: "author6",
      name: "James Wilson",
      slug: "james-wilson",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    categories: [
      { _id: "cat3", title: "React", slug: "react" },
      { _id: "cat35", title: "State Management", slug: "state-management" }
    ]
  },
  {
    _id: "25",
    title: "Web Components: Building Reusable UI Elements",
    slug: "web-components-reusable-ui",
    publishedAt: "2023-12-22T08:10:00Z",
    excerpt: "Learn to build reusable, framework-agnostic UI components using Web Components standards.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=600&fit=crop",
      alt: "Web components"
    },
    author: {
      _id: "author1",
      name: "Sarah Johnson",
      slug: "sarah-johnson",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=150&h=150&fit=crop&crop=face"
    },
    categories: [
      { _id: "cat36", title: "Web Components", slug: "web-components" },
      { _id: "cat19", title: "Frontend", slug: "frontend" }
    ]
  },
  {
    _id: "26",
    title: "API Security: Authentication and Authorization",
    slug: "api-security-auth-guide",
    publishedAt: "2023-12-21T15:25:00Z",
    excerpt: "Comprehensive guide to securing APIs with proper authentication and authorization mechanisms.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop",
      alt: "API security"
    },
    author: {
      _id: "author2",
      name: "Michael Chen",
      slug: "michael-chen",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    categories: [
      { _id: "cat15", title: "API", slug: "api" },
      { _id: "cat17", title: "Security", slug: "security" }
    ]
  },
  {
    _id: "27",
    title: "Jamstack Architecture: Modern Web Development",
    slug: "jamstack-modern-web-development",
    publishedAt: "2023-12-20T12:40:00Z",
    excerpt: "Explore Jamstack architecture and learn how to build fast, secure, and scalable web applications.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
      alt: "Jamstack development"
    },
    author: {
      _id: "author3",
      name: "Emma Rodriguez",
      slug: "emma-rodriguez",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    categories: [
      { _id: "cat37", title: "Jamstack", slug: "jamstack" },
      { _id: "cat2", title: "Web Development", slug: "web-development" }
    ]
  },
  {
    _id: "28",
    title: "Blockchain Development: Smart Contracts with Solidity",
    slug: "blockchain-smart-contracts-solidity",
    publishedAt: "2023-12-19T10:15:00Z",
    excerpt: "Introduction to blockchain development and creating smart contracts using Solidity programming language.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
      alt: "Blockchain development"
    },
    author: {
      _id: "author4",
      name: "David Kim",
      slug: "david-kim",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    categories: [
      { _id: "cat38", title: "Blockchain", slug: "blockchain" },
      { _id: "cat39", title: "Solidity", slug: "solidity" }
    ]
  },
]