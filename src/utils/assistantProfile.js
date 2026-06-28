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

const fmt = (label, value) => ({ type: "field", label, value });
const url = (value) => ({ type: "url", value });
const heading = (value) => ({ type: "heading", value });
const text = (value) => ({ type: "text", value });
const numbered = (num, value) => ({ type: "numbered", num, value });
const tag = (value) => ({ type: "tag", value });
const divider = () => ({ type: "divider" });

export const answerAssistantQuestion = (question) => {
  const q = question.toLowerCase().trim();
  const { contact, education, skills, nickname, name } = assistantProfile;

  // =========================
  // NAME / NICKNAME
  // =========================
  if (
    includesAny(q, [
      "abinash nickname",
      "nickname",
      "homename",
      "nickname of abinash",
    ])
  )
    return [text(`Abinash's nickname is`), tag(nickname)];

  if (
    includesAny(q, [
      "avi fullname",
      "fullname",
      "certificatename",
      "fullname of avi",
      "owner",
      "name",
    ])
  )
    return [text("Full name:"), tag(`Mr. ${name}`)];

  // =========================
  // CONTACT - ALL
  // =========================
  if (
    includesAny(q, [
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
    return [
      heading("📬 Contact Info"),
      fmt("📧 Email", contact.email),
      fmt("📱 Phone", `+91 ${contact.contactno}`),
      divider(),
      fmt("🐙 GitHub", null),
      url(contact.github),
      fmt("💼 LinkedIn", null),
      url(contact.linkedin),
      fmt("🐦 Twitter/X", null),
      url(contact.twitter),
      fmt("📸 Instagram", null),
      url(contact.instagram),
    ];

  // =========================
  // CONTACT - SPECIFIC
  // =========================
  if (
    includesAny(q, ["contact number", "phone number", "mobile number", "phone"])
  )
    return [text("Abhi's contact number is"), tag(`+91 ${contact.contactno}`)];

  if (includesAny(q, ["email", "mail"]))
    return [fmt("📧 Email", contact.email)];

  if (includesAny(q, ["github"]))
    return [fmt("🐙 GitHub", null), url(contact.github)];

  if (includesAny(q, ["linkedin"]))
    return [fmt("💼 LinkedIn", null), url(contact.linkedin)];

  if (includesAny(q, ["instagram"]))
    return [fmt("📸 Instagram", null), url(contact.instagram)];

  if (includesAny(q, ["twitter", "x profile"]))
    return [fmt("🐦 Twitter/X", null), url(contact.twitter)];

  // =========================
  // LINKS / NAVIGATION
  // =========================
  if (
    includesAny(q, [
      "project section",
      "projects section",
      "go to projects",
      "open projects",
    ])
  )
    return "#project";

  if (includesAny(q, ["contact section", "go to contact", "open contact"]))
    return "#contact";

  if (includesAny(q, ["skills section", "go to skills", "open skills"]))
    return "#skill";

  if (includesAny(q, ["about section", "go to aboutpage", "open aboutsection"]))
    return "#about";

  // =========================
  // TOP PROJECTS
  // =========================
  if (
    includesAny(q, [
      "top projects",
      "best projects",
      "featured projects",
      "top 3 projects",
    ])
  ) {
    const top = ProjectData.slice(0, 3);
    return [
      heading("🏆 Abhi's Top Projects"),
      ...top.map((p, i) => numbered(i + 1, p.title)),
    ];
  }

  // =========================
  // TOTAL PROJECTS
  // =========================
  if (includesAny(q, ["how many projects", "total projects", "project count"]))
    return [
      text("Abhi has"),
      tag(`${ProjectData.length} projects`),
      text("in his portfolio."),
    ];

  // =========================
  // SPECIFIC PROJECT
  // =========================
  const project = ProjectData.find(
    (item) =>
      q.includes(item.title.toLowerCase()) ||
      item.title.toLowerCase().includes(q),
  );

  if (project)
    return [
      heading(`🚀 ${project.title}`),
      text(project.desc),
      divider(),
      fmt("🌐 Live Demo", null),
      url(project.Deploy),
      fmt("🐙 GitHub", null),
      url(project.github),
    ];

  // =========================
  // ABOUT
  // =========================
  if (
    includesAny(q, [
      "who is abhi",
      "who is abinash",
      "about abhi",
      "about abinash",
    ])
  )
    return [heading("👨‍💻 About Abhi"), text(assistantProfile.summary)];

  // =========================
  // EDUCATION - BTECH
  // =========================
  if (includesAny(q, ["education", "college", "degree", "study", "btech"]))
    return [
      heading("🎓 Education"),
      tag(education.current.degree),
      fmt("🏫 College", education.current.college),
      fmt("📌 Status", education.current.status),
    ];

  // =========================
  // EDUCATION - HIGHER SECONDARY
  // =========================
  if (
    includesAny(q, [
      "plus 2",
      "+2",
      "higher-secondary",
      "plus2",
      "higher secondary",
    ])
  ) {
    const { institution, location, percentage } = education.higher_secondary;
    return [
      heading("📚 Higher Secondary (+2)"),
      fmt("🏫 Institution", institution),
      fmt("📍 Location", location),
      fmt("📊 Percentage", percentage),
    ];
  }

  // =========================
  // SKILLS
  // =========================
  if (includesAny(q, ["skills", "tech stack", "technologies", "stack"]))
    return [
      heading("⚡ Tech Stack"),
      ...assistantProfile.tech_stack.map((s) => tag(s)),
      divider(),
      heading("🎨 Frontend"),
      ...skills.frontend.map((s) => tag(s)),
      divider(),
      heading("🛠 Backend"),
      ...skills.backend.map((s) => tag(s)),
      divider(),
      heading("🗄 Database"),
      ...skills.database.map((s) => tag(s)),
    ];

  // =========================
  // INTERESTS
  // =========================
  if (includesAny(q, ["interests", "passion", "likes", "ai", "open source"]))
    return [
      heading("💡 Abhi's Interests"),
      ...assistantProfile.interests.map((i) => tag(i)),
    ];

  // =========================
  // GENERIC CONTACT
  // =========================
  if (includesAny(q, ["contact", "connect", "reach"]))
    return [
      heading("📬 Contact"),
      fmt("📧 Email", contact.email),
      fmt("📱 Phone", `+91 ${contact.contactno}`),
      fmt("🐙 GitHub", null),
      url(contact.github),
      fmt("💼 LinkedIn", null),
      url(contact.linkedin),
    ];

  return [
    text(
      "I can help with information about Abhi's skills, projects, education, interests, contact details, and portfolio sections.",
    ),
  ];
};
