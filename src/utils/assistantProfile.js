import { ProjectData } from "./Project";
export const assistantProfile = {
  name: "Abinash Rout",
  nickname: "AVI",
  birthDate: "1 Oct 2007",
  location: {
    city: "Jajpur",
    state: "Odisha",
    country: "India",
  },
  education: {
    current: {
      degree: "B.Tech in Computer Science and Engineering",
      college: "Oxford College of Engineering and Management",
      location: "Balianta, Bhubaneswar, Odisha",
      status: "Pursuing",
    },
    higher_secondary: {
      institution: "Shanti Institute of Management",
      location: "CDA Sector 10, Cuttack, Odisha",
      percentage: "85%",
    },
    secondary: {
      institution: "Baghua Brahmani Devi High School",
      location: "Balishai, Odisha",
      percentage: "85%",
    },
  },
  skills: {
    frontend: [
      "React",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Bootstrap",
      "Next.js",
      "TypeScript (Beginner)",
    ],
    backend: ["Node.js", "Express.js"],
    database: ["MongoDB"],
    other: ["REST APIs", "Responsive Web Design", "Git", "GitHub"],
  },
  role: "MERN Stack Developer",
  tech_stack: ["MongoDB", "Express.js", "React", "Node.js"],
  contact: {
    email: "abinashrout.mail@gmail.com",
    github: "https://github.com/Abinashrout244",
    linkedin: "https://www.linkedin.com/in/abinash-rout-274285322",
    twitter: "https://x.com/AbinashRout2251",
    instagram: "https://www.instagram.com/frequency._0.001",
    contactno: 8249281685,
  },
  summary:
    "Abinash Rout is a MERN Stack Developer and Computer Science Engineering student at Oxford College of Engineering and Management, Bhubaneswar. He is passionate about web development, modern JavaScript frameworks, AI-powered applications, and building responsive full-stack web applications.",
  interests: [
    "Web Development",
    "Full Stack Development",
    "Artificial Intelligence",
    "Generative AI",
    "Open Source",
    "Modern JavaScript Frameworks",
  ],
};

const includesAny = (text, terms) => terms.some((term) => text.includes(term));

const formatList = (items) => items.join(", ");

export const answerAssistantQuestion = (question) => {
  const text = question.toLowerCase().trim();

  const { contact, education, skills, nickname, name } = assistantProfile;

  if (
    includesAny(text, [
      "abinash nickname",
      "nickname",
      "homename",
      "nickname of Abinash",
    ])
  )
    return `Abinash's Nickname is ${nickname}`;
  if (
    includesAny(text, [
      "avi fullname",
      "fullname",
      "certificatename",
      "fullname of Avi",
      "owner",
    ])
  )
    return ` Mr.  ${name}`;

  // =========================
  // CONTACT - SPECIFIC
  // =========================
  if (
    includesAny(text, [
      "all contact",
      "all contacts",
      "contact details",
      "contact information",
      "all contact related info",
      "how can i contact abhi",
      "how to contact abhi",
      "contact abhi",
      "reach abhi",
      "connect with abhi",
    ])
  )
    return `📧 Email: ${contact.email}

📱 Phone: +91 ${contact.contactno}

🐙 GitHub:
${contact.github}

💼 LinkedIn:
${contact.linkedin}

🐦 Twitter/X:
${contact.twitter}

📸 Instagram:
${contact.instagram}
`;

  if (
    includesAny(text, [
      "contact number",
      "phone number",
      "mobile number",
      "phone",
    ])
  ) {
    return `Abhi's contact number is +91 ${contact.contactno}`;
  }

  if (includesAny(text, ["email", "mail"])) {
    return `Abhi's email is ${contact.email}`;
  }

  if (includesAny(text, ["github"])) {
    return `GitHub: ${contact.github}`;
  }

  if (includesAny(text, ["linkedin"])) {
    return `LinkedIn: ${contact.linkedin}`;
  }

  if (includesAny(text, ["instagram"])) {
    return `Instagram: ${contact.instagram}`;
  }

  if (includesAny(text, ["twitter", "x profile"])) {
    return `Twitter/X: ${contact.twitter}`;
  }

  // =========================
  // LINKS
  // =========================

  if (
    includesAny(text, [
      "project section",
      "projects section",
      "go to projects",
      "open projects",
    ])
  ) {
    return "#project";
  }

  if (includesAny(text, ["contact section", "go to contact", "open contact"])) {
    return "#contact";
  }

  if (includesAny(text, ["skills section", "go to skills", "open skills"])) {
    return "#skill";
  }

  if (
    includesAny(text, ["about section", "go to aboutpage", "open aboutsection"])
  ) {
    return "#about";
  }

  // =========================
  // TOP PROJECTS
  // =========================

  if (
    includesAny(text, [
      "top projects",
      "best projects",
      "featured projects",
      "top 3 projects",
    ])
  ) {
    const topProjects = ProjectData.slice(0, 3)
      .map((project, index) => `${index + 1}. ${project.title}`)
      .join("\n");

    return `Abhi's top projects:\n\n${topProjects}`;
  }

  // =========================
  // TOTAL PROJECTS
  // =========================

  if (
    includesAny(text, ["how many projects", "total projects", "project count"])
  ) {
    return `Abhi has ${ProjectData.length} featured projects in his portfolio.`;
  }

  // =========================
  // SPECIFIC PROJECT DETAILS
  // =========================

  const project = ProjectData.find(
    (item) =>
      text.includes(item.title.toLowerCase()) ||
      item.title.toLowerCase().includes(text),
  );

  if (project) {
    return `
Project: ${project.title}

${project.desc}

Live Demo:
${project.Deploy}

GitHub:
${project.github}
`;
  }

  // =========================
  // ABOUT
  // =========================

  if (
    includesAny(text, [
      "who is abhi",
      "who is abinash",
      "about abhi",
      "about abinash",
    ])
  ) {
    return assistantProfile.summary;
  }

  // =========================
  // EDUCATION
  // =========================

  if (includesAny(text, ["education", "college", "degree", "study", "btech"])) {
    return `
${education.current.degree}

College:
${education.current.college}

Status:
${education.current.status}
`;
  }

  // =========================
  // SKILLS
  // =========================

  if (includesAny(text, ["skills", "tech stack", "technologies", "stack"])) {
    return `
Tech Stack:
${formatList(assistantProfile.tech_stack)}

Frontend:
${formatList(skills.frontend)}

Backend:
${formatList(skills.backend)}

Database:
${formatList(skills.database)}
`;
  }

  // =========================
  // INTERESTS
  // =========================

  if (
    includesAny(text, ["interests", "passion", "likes", "ai", "open source"])
  ) {
    return `Abhi is interested in ${formatList(assistantProfile.interests)}.`;
  }

  // =========================
  // GENERIC CONTACT
  // =========================

  if (includesAny(text, ["contact", "connect", "reach"])) {
    return `
Email: ${contact.email}

Phone: +91 ${contact.contactno}

GitHub:
${contact.github}

LinkedIn:
${contact.linkedin}
`;
  }

  return "I can help with information about Abhi's skills, projects, education, interests, contact details, and portfolio sections.";
};
