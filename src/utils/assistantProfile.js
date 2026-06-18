export const assistantProfile = {
  name: "Abinash Rout",
  nickname: "Abhi",
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
  const { contact, education, skills } = assistantProfile;

  if (!text) {
    return "Ask me about Abhi's education, skills, tech stack, interests, or contact details.";
  }

  if (
    includesAny(text, [
      "who are you",
      "tell me about yourself",
      "what does abhi do",
      "who is abhi",
      "who is abinash",
      "about abhi",
      "about abinash",
    ])
  ) {
    return `I am Abhi's AI Portfolio Assistant. Abhi is a ${assistantProfile.role} and Computer Science Engineering student from Odisha, India. He works with the MERN stack and enjoys building responsive full-stack web applications.`;
  }

  if (
    includesAny(text, [
      "education",
      "study",
      "college",
      "school",
      "degree",
      "b.tech",
      "btech",
    ])
  ) {
    return `Abhi is pursuing ${education.current.degree} at ${education.current.college}, ${education.current.location}. He completed higher secondary at ${education.higher_secondary.institution} with ${education.higher_secondary.percentage}, and secondary education at ${education.secondary.institution} with ${education.secondary.percentage}.`;
  }

  if (
    includesAny(text, [
      "skill",
      "technology",
      "technologies",
      "tech stack",
      "stack",
      "tools",
    ])
  ) {
    return `Abhi works with ${formatList(assistantProfile.tech_stack)}. His frontend skills include ${formatList(skills.frontend)}. He also works with ${formatList(skills.backend)}, ${formatList(skills.database)}, ${formatList(skills.other)}.`;
  }

  if (
    includesAny(text, [
      "frontend",
      "front end",
      "react",
      "javascript",
      "html",
      "css",
      "tailwind",
      "next",
    ])
  ) {
    return `Abhi's frontend skills include ${formatList(skills.frontend)}. He focuses on responsive web design and modern JavaScript frameworks.`;
  }

  if (
    includesAny(text, [
      "backend",
      "back end",
      "node",
      "express",
      "api",
      "database",
      "mongodb",
    ])
  ) {
    return `Abhi's backend and database skills include ${formatList(skills.backend)} and ${formatList(skills.database)}. He also works with REST APIs.`;
  }

  if (
    includesAny(text, [
      "contact",
      "email",
      "mail",
      "linkedin",
      "github",
      "twitter",
      "x.com",
      "instagram",
      "connect",
    ])
  ) {
    return `You can contact Abhi by email at ${contact.email}. His GitHub is ${contact.github}, LinkedIn is ${contact.linkedin}, Twitter/X is ${contact.twitter}, and Instagram is ${contact.instagram}.`;
  }
  if (
    includesAny(text, [
      "birth date",
      "birthday",
      "date of birth",
      "dob",
      "when was abhi born",
    ])
  ) {
    return `Abhi's date of birth is ${assistantProfile.birthDate}.`;
  }
  if (
    includesAny(text, ["location", "from", "live", "city", "state", "country"])
  ) {
    return `Abhi is from ${assistantProfile.location.city}, ${assistantProfile.location.state}, ${assistantProfile.location.country}.`;
  }

  if (
    includesAny(text, [
      "interest",
      "passion",
      "likes",
      "open source",
      "ai",
      "generative",
    ])
  ) {
    return `Abhi is interested in ${formatList(assistantProfile.interests)}.`;
  }

  if (
    includesAny(text, [
      "project",
      "experience",
      "achievement",
      "achievements",
      "certificate",
      "certification",
      "resume",
    ])
  ) {
    return "I don't have that information in Abhi's portfolio.";
  }

  if (
    includesAny(text, [
      "code",
      "coding",
      "programming",
      "interview",
      "career",
      "javascript",
      "react",
      "mern",
    ])
  ) {
    return "Sure. Ask a specific coding, interview, or career question and I will explain it clearly with practical examples.";
  }

  return "I can help with questions about Abhi's education, skills, interests, and contact details. For Abhi-specific details not listed in the portfolio, I don't have that information in Abhi's portfolio.";
};
