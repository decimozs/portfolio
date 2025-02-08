import { NavigationType, ProjectType, WorkflowType } from "./types";

export const workflowItems: Array<WorkflowType> = [
  {
    tool: "Linux",
    name: "WSL Ubuntu",
  },
  {
    tool: "Terminal",
    name: "Powershell 7",
  },
  {
    tool: "Shell",
    name: "Zsh",
  },
  {
    tool: "Text Editor & Code Editor",
    name: "Neovim",
  },
  {
    tool: "Note Taking",
    name: "Obsidian",
  },
  {
    tool: "Containerization",
    name: "Docker",
  },
  {
    tool: "UI/UX",
    name: "Figma",
  },
];

export const statusItems: Array<string> = [
  "Training for an upcoming marathon, pushing my limits every day.",
  "Deepening my understanding of compilers and their inner workings.",
  "Contributing to open-source projects to expand my skills and give back to the community.",
];

export const contactItems: Array<NavigationType> = [
  {
    label: "Email",
    href: "mailto:marlonadiguemartin548@gmail.com",
  },
  {
    label: "Github",
    href: "https://github.com/decimozs",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/decimomartin/",
  },
  {
    label: "Resume",
    href: "docs/resume.pdf",
  },
];

export const navItems: Array<NavigationType> = [
  {
    label: "Index",
    href: "/",
  },
  {
    label: "Work",
    href: "/works",
  },

  {
    label: "Info",
    href: "/info",
  },
];

export const workItems: Array<ProjectType> = [
  {
    no: 1,
    id: "binspire",
    name: "Binspire",
    type: ["Relevant", "Case Study"],
    category: "Internet of Things",
    title: "Smart Waste Management Application",
    header:
      "IoT-powered solution for detecting waste levels, delivering real-time data to a responsive dashboard, optimizing collection schedules, and promoting efficient waste management for cleaner and smarter communities.",
    description: `
The Interactive Community Waste Management System addresses critical challenges in modern waste management, particularly in communities facing inefficiencies related to trash bin overflow. This issue, compounded by ineffective collection schedules, delayed pickups, and the lack of waste segregation infrastructure, has significant implications for environmental sustainability and public health. Traditional waste management methods, often reliant on fixed collection schedules, fail to account for fluctuating waste production patterns, leading to overflowing bins and unnecessary collection trips.

In response, this project introduces an innovative solution powered by Internet of Things (IoT) technology. Through the deployment of IoT-enabled trash bin detectors, the system provides real-time monitoring of waste levels. Data from these sensors is transmitted to an admin dashboard, where waste management teams can access insights on bin status and optimize collection routes accordingly. This results in more efficient waste collection, significantly reducing the likelihood of overflow and improving overall sanitation.

The system’s real-time data analytics facilitates dynamic waste collection scheduling, which helps to reduce operational costs, minimize unnecessary vehicle trips, and lower fuel consumption. Moreover, it contributes to sustainability by reducing emissions from waste collection vehicles, while enhancing resource allocation and waste disposal efficiency. The solution promotes community engagement by offering a transparent and accountable platform for managing waste disposal, ensuring that the process is accessible and understandable for all stakeholders.

For researchers, this project provides a foundational understanding of the integration of IoT into waste management systems, offering a basis for further exploration of smart technologies in environmental management.

For communities, it showcases how IoT technology can be utilized to create a cleaner, safer, and more sustainable living environment by preventing waste overflow, reducing health risks, and promoting efficient waste disposal practices.

For waste management teams, the system enables real-time notifications regarding waste bin status, streamlining operations and reducing manual checks. This increases the efficiency of waste collection, saving time and reducing costs.

For IT practitioners, this case study serves as a valuable resource for understanding the complexities of IoT integration in public service systems, providing insight into developing similar innovative solutions.

Interactive Community Waste Management System with IoT offers a scalable, forward-thinking solution to the growing waste management challenges faced by modern communities. By leveraging IoT technology, the system enhances operational efficiency, reduces environmental impact, and promotes more sustainable waste management practices, ultimately contributing to healthier, cleaner, and more resilient communities.
    `,
    technologies: [
      "React",
      "Vite",
      "Fastify",
      "Python",
      "PostgreSQL",
      "InfluxDB",
      "Grafana",
      "Docker",
      "MQTT",
      "WebSocket",
    ],
    banner: "IOT",
    source: "",
    createdAt: "DEC 2025",
  },
  {
    no: 2,
    id: "predicting-carbon-monoxide-levels",
    name: "Predicting Carbon Monoxide Levels",
    type: ["Relevant", "Case Study"],
    category: "Machine Learning",
    title: "Data Analysis",
    header:
      "A predictive system for carbon monoxide levels aimed at improving real-time monitoring, enhancing accuracy, and enabling actionable interventions to safeguard public health and the environment through advanced machine learning models and comprehensive environmental data analysis.",
    description: `
This case study addresses the pressing challenges of carbon monoxide (CO) emissions, with a focus on the need for precise, real-time monitoring and prediction systems that safeguard public health and the environment. The primary issues explored include the lack of real-time monitoring infrastructure, the necessity for enhanced prediction accuracy, the complexity of integrating diverse environmental datasets, and the need to translate these predictions into actionable insights for effective mitigation strategies. By overcoming these challenges, the research aims to create a robust system for predicting CO concentrations, providing policymakers and the public with timely interventions to reduce emissions and promote community and environmental well-being.

The dataset utilized in this study includes critical environmental parameters essential for understanding and forecasting air quality. Key pollutants such as carbon monoxide (CO), non-methane hydrocarbons (NMHC), benzene (C6H6), nitrogen oxides (NOx), and ozone (O3) are measured in micrograms per cubic meter. In addition, real-time sensor responses from Tin Oxide (SnO2) sensors—such as PT08.S1(CO), PT08.S2(NMHC), PT08.S3(NOx), PT08.S4(NO2), and PT08.S5(O3)—offer real-time insights into pollutant levels. Meteorological factors like temperature (T), relative humidity (RH), and absolute humidity (AH) further enrich the dataset, providing important context for pollutant behavior in the atmosphere. This rich, multi-dimensional dataset forms the foundation for developing accurate predictive models for CO levels, which are crucial for informed air quality management.

For the prediction task, the Random Forest Regression model was selected due to its ability to capture complex, non-linear relationships in the data. This ensemble model constructs multiple decision trees, each trained on random subsets of data, and combines their predictions to improve accuracy and robustness. The Random Forest model outperformed other models, including Linear Regression, Decision Tree Regressor, and Gradient Boosting Regressor, by consistently achieving low Mean Squared Error (MSE) and high R-squared values on both validation and test datasets.

The model excels in handling multiple predictors such as meteorological conditions, traffic patterns, and sensor data, making it ideal for predicting CO levels in a dynamic and multi-faceted environment. Additionally, it is resistant to overfitting and can handle missing data effectively. Feature importance analysis, a key advantage of the Random Forest model, reveals which variables—such as specific sensor responses or environmental factors—play the most significant role in predicting CO concentrations, offering valuable insights for further research and model refinement.

Based on our findings, we recommend using the Random Forest Regressor as the primary model for predicting carbon monoxide levels, given its strong generalization capabilities and robustness across different datasets. For further improvement, we suggest exploring hyperparameter tuning to enhance the performance of other models like Gradient Boosting and addressing overfitting issues observed with the Decision Tree Regressor. Additionally, continuous monitoring and periodic updates to the model are essential to adapt to changing environmental conditions.

Collaboration with environmental scientists and domain experts is highly recommended to refine the models and ensure their accuracy in real-world applications. By developing predictive models for CO emissions, this research aims to empower decision-makers and communities to take proactive measures in mitigating pollution and improving air quality.    `,
    technologies: [
      "Python",
      "Pandas",
      "Numpy",
      "Matplotlib",
      "Seaborn",
      "Scikit-learn",
    ],
    banner: "ML",
    source: "",
    createdAt: "JUL 2024",
  },
  {
    no: 3,
    id: "leafy-v2",
    name: "Leafy V2",
    type: ["Relevant", "Case Study"],
    category: "Web Development",
    title: "Ecommerce",
    header:
      "A plant ecommerce platform offering a wide selection of plants, emphasizing sustainability, secure transactions, and a user-friendly shopping experience to meet the increasing demand for indoor greenery and eco-friendly living",
    description: `

Leafy is a forward-thinking online platform dedicated to offering a diverse selection of plants, catering to the increasing demand for indoor greenery. The platform is designed to provide a seamless, user-friendly shopping experience, making it easy for plant enthusiasts to browse and purchase a wide variety of plants from the comfort of their homes. Our web and mobile system offers a range of services, including secure online payment, reliable shipping, and responsive customer support for inquiries and feedback, ensuring a smooth and satisfying experience for every customer.

The focus of Leafy extends beyond convenience, as we prioritize environmental sustainability by offering eco-friendly products such as organic soils and sustainable packaging options. As consumers increasingly seek products that contribute to a greener planet, Leafy is positioned to meet the demand for health-conscious, environmentally aware plant lovers. Additionally, we implement advanced security protocols to safeguard customer information and ensure secure transactions, providing peace of mind throughout the shopping process.

The growth of agriculture-related industries, as noted by Zhang Y. and Diao X. (2020), reflects a larger societal trend toward the benefits of plants, such as improved air quality and reduced stress. With the rise of online plant sales, Leafy aligns itself with these trends, offering a wide selection of plants alongside services that enhance customer experiences, including indoor plant care and maintenance. As we continue to build and refine our platform, we are confident that the investment in our system development and marketing will drive long-term success, increasing customer loyalty and positively impacting the community.

Leafy’s commitment to sustainability, coupled with its focus on providing high-quality plants and an exceptional online shopping experience, ensures its place at the forefront of the plant retail industry. By embracing both innovation and eco-conscious practices, Leafy is well-equipped to meet the evolving needs of today’s environmentally aware consumers, positioning itself for success in the growing market of indoor plants and green living.
    `,
    technologies: [
      "React",
      "Typescript",
      "Next.js",
      "ShadCN",
      "TailwindCSS",
      "Zustand",
      "Tanstack Query",
      "Kinde Auth",
      "Supabase",
    ],
    banner: "WEB",
    source: "",
    createdAt: "NOV 2024",
  },
  {
    no: 4,
    id: "san-miguel-cms",
    name: "San Miguel CMS",
    type: ["Relevant", "Case Study"],
    category: "Web Development",
    title: "Content Management System",
    header:
      "A user-friendly platform designed to streamline scheduling and content management for a local government unit, enabling residents to access services, manage appointments, and stay updated through a responsive, efficient system while reducing the need for in-person visits.",
    description: `
The purpose of this project is to develop a Content Management System (CMS) for Barangay San Miguel, aimed at improving the management and accessibility of the barangay’s resources. This system will provide a centralized platform for both administrative users and the public, enabling efficient scheduling, content management, and communication, while eliminating the need for residents to visit the barangay office for certain tasks. By streamlining administrative processes, the CMS will improve operational efficiency and accessibility for residents, especially in times when physical visits are inconvenient due to weather, health concerns, or busy schedules.

Currently, residents are required to physically visit the barangay office for a variety of administrative tasks, including scheduling appointments for barangay-owned facilities and accessing official information. This process can be time-consuming and inconvenient, particularly for individuals with busy work schedules, limited mobility, or those in need of urgent services. The proposed CMS addresses these challenges by offering an online platform where residents can perform key tasks, such as scheduling facility use, accessing important documents, and staying informed about barangay announcements—all without having to leave their homes or workplaces.

The system will cater to different user groups within Barangay San Miguel, including working professionals, students, elderly residents, and those with disabilities who may struggle with mobility. It will provide an intuitive interface for residents to easily register, submit forms, and receive automated confirmations and notifications for their transactions. This will significantly reduce the need for in-person visits, enhancing convenience for all residents, while allowing the barangay office to allocate resources more efficiently. The system will also include features such as an administrative dashboard for managing content, reports, and schedules, ensuring that barangay personnel can efficiently oversee operations.

The CMS will introduce several key features, including user authentication, data entry forms for scheduling, and automated notification systems for confirmations and reminders. These features will be complemented by an admin interface, allowing administrators to manage content such as announcements, news, and scheduling information. The system will be mobile-responsive and accessible via web browsers, ensuring it is usable across various platforms. The expected impact of this project includes greater accessibility, reduced crowding at the barangay office, enhanced operational efficiency, and improved health and safety for residents by minimizing the need for in-person interactions.

By offering residents the ability to schedule appointments, access content, and engage with the barangay through a digital platform, the system aims to create a more convenient and efficient way of managing community resources. Additionally, the project will help reduce physical traffic in the barangay office, contributing to safer and more efficient operations. Ultimately, this system will help Barangay San Miguel modernize its administrative processes, providing a more responsive and accessible service to the community.
    `,
    technologies: ["PHP", "Javascript", "MySQL", "TailwindCSS", "XAMPP"],
    banner: "WEB",
    source: "",
    createdAt: "MAY 2024",
  },
  {
    no: 5,
    id: "speed-converter",
    name: "Speedy",
    type: ["Archives"],
    category: "Mobile Development",
    title: "Speed Converter",
    header:
      "A user-friendly speed converter application that allows seamless conversion between various units like kilometers per hour, miles per hour, and meters per second. Designed for quick and accurate results, making unit conversion easy and efficient.",
    description: "",
    technologies: ["Java"],
    banner: "MAD",
    source: "",
    createdAt: "MAR 2024",
  },
  {
    no: 7,
    id: "artistics",
    name: "Arstistics",
    type: ["Archives"],
    category: "Web Development",
    title: "Landing Page",
    header:
      "A minimalist landing page I created using Next.js to explore dynamic image handling. The page features pixel-related GIF tools and formats, showcasing my skills in building responsive, optimized web experiences with Next.js.",
    description: "",
    technologies: ["React", "Javascript", "Next.js", "TailwindCSS"],
    banner: "WEB",
    source: "",
    createdAt: "FEB 2022",
  },
  {
    no: 8,
    id: "bunch-dental",
    name: "Bunch Dental",
    type: ["Relevant", "Case Study"],
    category: "Desktop Application",
    title: "Information Management System",
    header:
      "A desktop application enhances dental practice efficiency with an intuitive admin dashboard, streamlining patient data management, insurance transactions, and workflow. Its advanced features, including search tools and data confirmation, set a new standard in precision and operational effectiveness.",
    description: `
In the fast-evolving healthcare landscape, operational efficiency is paramount. The Bunch Dental System revolutionizes dental practice management by offering an advanced solution that streamlines transaction handling through a comprehensive and intuitive admin dashboard. Serving as the central control point, this dashboard empowers dental professionals to seamlessly manage patient data, track interactions, and oversee insurance transactions. Essential features such as advanced search and filtering tools facilitate quick access to vital information, ensuring seamless, accurate management of dental care workflows.

Additionally, the system incorporates a robust confirmation process for form fill-ups, allowing users to verify data accuracy before proceeding to the next stage. This function enhances precision, minimizes errors, and optimizes operational flow. By focusing on precision and efficiency, the Bunch Dental System establishes itself as a pioneering platform, setting a new standard in dental practice management, and offering unparalleled user experience and data governance.
    `,
    technologies: ["VB", ".NET", "MySQL"],
    banner: "DESK",
    source: "",
    createdAt: "FEB 2024",
  },
  {
    no: 9,
    id: "plp-university-portal",
    name: "PLP University Portal",
    type: ["Relevant", "Case Study"],
    category: "Desktop Application",
    title: "Information Management System",
    header:
      "A comprehensive university portal developed with VB.NET and MySQL, featuring integrated course management, assignment tracking, grading systems, notifications, and communication tools. This platform enhances academic efficiency by streamlining operations for students and faculty with an intuitive, user-friendly interface.",
    description: `
This case study focuses on the development of the PLP University Portal, a robust and feature-rich platform designed to enhance the academic experience for both students and faculty. The portal, developed using Visual Basic.NET (VB.NET) for the frontend and MySQL for the backend, offers a range of powerful tools and functionalities, including its own Google Classroom-like features, allowing seamless management of courses, assignments, grades, and communication within a single platform.

The PLP University Portal is designed to improve the efficiency of academic operations. It features a comprehensive dashboard where students can access their courses, assignments, and grades, while faculty can easily create and manage their courses, assign tasks, and communicate with students. The portal’s user-friendly interface, developed in VB.NET, ensures that students and faculty can easily navigate through their tasks without any unnecessary complexity, saving valuable time.

The backend is powered by MySQL, a reliable and secure database management system capable of handling large amounts of data. The database efficiently manages the relationships between students, courses, assignments, and grades, storing essential information for easy retrieval and management. By using MySQL, the system guarantees scalability, security, and data integrity, essential for a university portal that handles a significant amount of sensitive academic data.

One of the key features of the PLP University Portal is its own built-in set of Google Classroom-like tools. These tools allow for the creation and management of courses, the submission and grading of assignments, and the facilitation of class discussions and announcements. Instructors can create courses and upload assignments, which students can then access, complete, and submit directly through the platform. Faculty can grade assignments and provide feedback in real-time, ensuring a continuous and transparent learning process.

In addition to course and assignment management, the portal includes features such as an event calendar, where students and faculty can view important academic dates and deadlines. Notifications are integrated into the system, ensuring that students are alerted to new assignments, announcements, and upcoming events, keeping them engaged and on track with their academic responsibilities.

Another notable feature is the grade management system, which provides both students and faculty with an easy-to-read interface for tracking academic performance. Students can view their grades for each assignment and overall course, while faculty can grade and provide feedback on submissions. This streamlines the grading process and ensures that both students and faculty have access to up-to-date academic records.

The PLP University Portal not only empowers students and faculty with the tools they need for efficient academic management, but it also creates a centralized hub for all educational activities, eliminating the need for multiple platforms. The system promotes streamlined communication, transparency, and organization, improving the overall academic experience.

This project stands as a testament to the potential of in-house, specialized tools that replace the need for third-party integrations, offering educational institutions a more tailored and cohesive solution for their teaching and administrative needs.
    `,
    technologies: ["VB", ".NET", "MySQL"],
    banner: "DESK",
    source: "",
    createdAt: "MAY 2023",
  },
  {
    no: 10,
    id: "capital-guard",
    name: "Capital Guard",
    type: ["Relevant", "Case Study"],
    category: "CLI",
    title: "Bank System",
    header:
      "A CLI based banking system with a user-friendly console UI developed using Rich, featuring account management, balance checking, fund transfers, and secure transaction histories. The backend is powered by MySQL, ensuring data security and efficient database handling.",
    description: `
This case study details the development of a simple bank system implemented using Python, with Rich for an intuitive console UI and MySQL for the backend. The system includes essential banking features such as user registration, account creation, balance checking, and fund transfers, all designed to provide a secure and user-friendly experience. By leveraging Rich, the console interface offers text formatting, tables, and progress bars, enhancing the overall usability. MySQL manages customer accounts, transaction histories, and authentication securely, ensuring data protection through encryption. The system’s straightforward functionality ensures easy access to account balances, facilitates seamless fund transfers, and provides users with a detailed transaction history, all while emphasizing simplicity and security in its design.
    `,
    technologies: ["Python", "Rich", "MySQL"],
    banner: "CLI",
    source: "",
    createdAt: "APR 2023",
  },
  {
    no: 11,
    id: "art",
    name: "ART",
    type: ["Relevant"],
    category: "CLI",
    title: "Tool",
    header:
      "This tool offers a platform for evaluating algorithm performance via the command line interface (CLI). Designed for developers, students, and enthusiasts, it enables efficient analysis and comparison of execution times, helping users better understand algorithmic efficiency and optimize performance.",
    description: "",
    technologies: ["Java"],
    banner: "CLI",
    source: "",
    createdAt: "SEP 2023",
  },
  {
    no: 11,
    id: "inspirify",
    name: "Inspirify",
    type: ["Relevant"],
    category: "CLI",
    title: "Tool",
    header:
      "This command-line application generates random inspirational quotes, offering users a daily boost of motivation and positivity. With a simple and intuitive interface, it delivers a refreshing dose of wisdom and encouragement, perfect for staying focused and energized.",
    description: `
Inspirify is a versatile command-line application that generates a random quote each time it is executed, offering users a continuous source of inspiration and motivation. Designed for individuals looking to boost their mindset, the tool features a wide range of quotes from renowned thinkers, leaders, and philosophers. By providing users with an uplifting message at the start of their day or during a break, Inspirify aims to foster a positive mental attitude, helping users stay focused, productive, and motivated. With a simple and user-friendly interface, the application is an ideal tool for anyone in need of daily encouragement
    `,
    technologies: ["Go", "C"],
    banner: "CLI",
    source: "",
    createdAt: "JUN 2023",
  },
  {
    no: 12,
    id: "verdant-vibes",
    name: "Verdant Vibes",
    type: ["Relevant", "Case Study"],
    category: "Desktop Application",
    title: "Ecommerce",
    header:
      "A desktop application offers a comprehensive e-commerce solution tailored for plant-related businesses, featuring secure user authentication, plant category search, weekly updates, robust payment methods, transaction tracking, and a reliable shipping system, ensuring a seamless and engaging customer experience.",
    description: `

This case study showcases the development of a plant-focused e-commerce desktop application, specifically tailored for plant-related enterprises, using Java, Java Swing, and JUnit testing for reliability and functionality. The application features an intuitive and secure user experience, starting with a login and account creation system that ensures users can securely access personalized features.

A key highlight of the platform is its plant category search, which enables users to navigate and discover plants based on specific categories. Regular weekly updates showcase the most loved and popular plants, helping users stay informed on trending options.

The application incorporates a convenient Add to Cart system, allowing users to streamline their purchasing process. With robust payment options, including cash on delivery, credit/debit cards, and digital wallets, the platform offers users flexibility and convenience in choosing their preferred payment methods. To ensure the safe handling of sensitive payment information, a strong security authentication system is employed for credit and debit card transactions.

After completing their purchase, users receive a confirmation email or notification with transaction details, including order summaries, payment information, and shipping details. Furthermore, the application integrates a comprehensive shipping system, ensuring that users can input their delivery information and receive their orders efficiently at their desired locations.

Overall, the project not only meets the business requirements of plant-related e-commerce but also demonstrates an effective approach to combining technology, user experience, and security in the development of a desktop application. This case study highlights the potential for similar applications in other niche markets, with a focuson scalability, reliability, and continuous improvement.`,
    technologies: ["Java", "Java Swing", "JUnit", "MySQL"],
    banner: "DESK",
    source: "",
    createdAt: "JUN 2023",
  },
  {
    no: 13,
    id: "environ",
    name: "Environ",
    type: ["Archives"],
    category: "Web Development",
    title: "Landing Page",
    header:
      "A multimodal academic campaign designed to raise awareness for environmental preservation. This project combines visual, textual, and interactive elements to effectively advocate for sustainable practices, aiming to inspire positive change and promote environmental responsibility.",
    description: "",
    technologies: ["React", "Typescript", "Next.js"],
    banner: "WEB",
    source: "",
    createdAt: "APR 2023",
  },
  {
    no: 14,
    id: "hoopz",
    name: "Hoopz",
    type: ["Archives"],
    category: "Web Development",
    title: "Landing Page",
    header:
      "A basketball blog site I designed to deliver game analyses, player highlights, and the latest news. Built for fans, it showcases my skills in creating engaging, user-focused web experiences.",
    description: "",
    technologies: ["React", "Javascript", "Next.js", "SCSS", "TailwindCSS"],
    banner: "WEB",
    source: "",
    createdAt: "APR 2023",
  },
  {
    no: 14,
    id: "la-cactus-club",
    name: "La Cactus Club",
    type: ["Archives"],
    category: "Web Development",
    title: "Ecommerce",
    header:
      "A front-end e-commerce website dedicated to greeneries, featuring a clean, minimalist design. It offers an intuitive shopping experience while highlighting the beauty and simplicity of plants, creating a user-friendly platform for plant enthusiasts.",
    description: "",
    technologies: [
      "React",
      "Typescript",
      "Next.js",
      "TailwindCSS",
      "Framer Motion",
      "Vercel",
    ],
    banner: "WEB",
    source: "",
    createdAt: "MAR 2023",
  },
  {
    no: 15,
    id: "decimo-ai",
    name: "Decimo AI",
    type: ["Relevant"],
    category: "Web Development",
    title: "Chatbot",
    header:
      "A web application features an interactive chatbot powered by OpenAI's API, providing intelligent, real-time responses. It offers seamless user interaction through an intuitive interface, showcasing advanced natural language processing capabilities for engaging and dynamic conversations.",
    description: `
This full-stack web application features an interactive chatbot powered by OpenAI's API, offering intelligent, real-time responses. The platform ensures seamless user interaction with its intuitive interface, showcasing advanced capabilities in natural language processing and engaging conversations.
    `,
    technologies: [
      "React",
      "Javascript",
      "Vite",
      "Express",
      "Node.js",
      "OpenAI",
    ],
    banner: "WEB",
    source: "",
    createdAt: "FEB 2023",
  },
  {
    no: 16,
    id: "jumpforce",
    name: "Jumpforce",
    type: ["Archives"],
    category: "CLI",
    title: "Game",
    header:
      "A CLI-based anime game built as my first Python project to deepen my understanding of object-oriented programming. This project serves as a practice to improve my Python proficiency and grasp OOP concepts",
    description: "",
    technologies: ["Python"],
    banner: "CLI",
    source: "",
    createdAt: "JAN 2023",
  },
  {
    no: 17,
    id: "pacman-clone",
    name: "Pacman Clone",
    type: ["Relevant", "Case Study"],
    category: "CLI",
    title: "Game",
    header:
      "Game project a clone of a classic arcade game, showcasing the application of game algorithms and logic. Developed as part of coursework, it demonstrates skills in game mechanics, programming, and problem-solving, highlighting the development process and its results.",
    description: `
This project presents a clone of the iconic Pacman game, developed as part of our coursework to showcase the skills and knowledge acquired throughout the semester. I was primarily responsible for handling the game algorithm and logic, ensuring smooth gameplay and optimal interaction between the player and the game environment. By replicating the classic gameplay mechanics and design elements, we demonstrate proficiency in game development, object-oriented programming, and problem-solving.

The project highlights our ability to create interactive and engaging user experiences while adhering to industry standards. This clone serves as a testament to our dedication and growth, showcasing our understanding of gamemechanics, logic, and graphical interface implementation. It stands as an exciting and challenging milestone in our development journey.
    `,
    technologies: ["C++", "SFML", "Aesprite"],
    banner: "GAME",
    source: "",
    createdAt: "JAN 2023",
  },
  {
    no: 18,
    id: "leafy-v1",
    name: "Leafy V1",
    type: ["Archives"],
    category: "Web Development",
    title: "Ecommerce",
    header:
      "This eCommerce front-end website for plants includes various pages and features, such as an add-to-cart functionality and login forms for users. Built to explore advanced concepts of the React framework and Next.js, this project helped me deepen my understanding of modern web development.",
    description: "",
    technologies: ["React", "Javascript", "Next.js", "SCSS", "TailwindCSS"],
    banner: "WEB",
    source: "",
    createdAt: "AUG 2022",
  },
  {
    no: 19,
    id: "jmaa",
    name: "JMAA",
    type: ["Relevant", "Case Study"],
    category: "Desktop Application",
    title: "Information Management System",
    header:
      "This web application streamlines car rental management by centralizing data for real-time access, simplifying vehicle and customer tracking, automating rental processes, and offering seamless online booking. It enhances operational efficiency, improves customer experiences, and supports business growth in the car rental industry.",
    description: `
The integration process within this system involves consolidating data from various sources into a centralized location, ensuring automatic synchronization across all subsystems. This approach eliminates the need for manual data updates and guarantees real-time availability and accessibility, which is crucial for businesses managing vast amounts of data. In particular, for car rental businesses, managing multiple cars, customers, rentals, and returns can become overwhelming without an efficient system in place. The car rental management system is designed to address these challenges by offering seamless tracking of vehicles and customers, thus boosting business productivity and ensuring smooth operations.

This system is an essential tool for car rental businesses, streamlining operations by offering a user-friendly platform where customers can browse car details, make bookings, and process rentals online. Through the JMAA automotive rental system, the complexity of tracking vehicle availability, customer details, and transaction records is greatly simplified, allowing businesses to focus on client satisfaction and service delivery. By automating these processes, the system not only improves the quality of service but also reduces the time spent on administrative tasks, increasing overall efficiency.

The JMAA car rental management system is designed to enhance the customer experience by offering a fully online booking process. This platform enables users to easily rent vehicles from anywhere at any time, making the experience more convenient and accessible. The system integrates features for managing fleet maintenance, tracking rental transactions, generating invoices, and maintaining comprehensive records, all while ensuring the highest level of data accuracy and security. With its focus on customer satisfaction and business optimization, this system is an invaluable asset for car rental companies looking to streamline their operations and improve service delivery.
    `,
    technologies: ["Java", "Java Swing", "JUnit", "MySQL"],
    banner: "DESK",
    source: "",
    createdAt: "May 2022",
  },
  {
    no: 20,
    id: "fylo",
    name: "Fylo",
    type: ["Archives"],
    category: "Web Development",
    title: "Landing Page",
    header:
      "I created this website from a Frontend Mentor challenge to enhance my web development skills. The project allowed me to apply and improve my knowledge of responsive design, layout, and front-end technologies, pushing me to create a polished and user-friendly interface.",
    description: "",
    technologies: ["HTML", "CSS", "SCSS"],
    banner: "WEB",
    source: "",
    createdAt: "JUN 2022",
  },
];
