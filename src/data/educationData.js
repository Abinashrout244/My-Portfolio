import { GraduationCap, BookOpen, School } from "lucide-react";

const educationData = [
  {
    id: 1,
    type: "B.Tech",
    degree: "Bachelor of Technology",
    field: "Computer Science & Engineering",
    institution: "Oxford College Of Engineering & Management",
    location: "Bhubaneswar, Odisha",
    duration: "2024 - 2028",
    grade: "8.7 CGPA",
    gradeLabel: "CGPA",
    currentSemester: "5rd Semester",
    isCurrent: true,
    certificate:
      "https://drive.google.com/file/d/3CdEfGhIjKlMnOpQrStUvWxYzAb/view?usp=sharing",
    marksheet:
      "https://drive.google.com/file/d/3CdEfGhIjKlMnOpQrStUvWxYzAb/view?usp=sharing",
    icon: GraduationCap,
    color: {
      light: "from-pink-500 to-indigo-500",
      dark: "from-pink-400 to-indigo-400",
    },
    glowLight: "rgba(236,72,153,0.25)",
    glowDark: "rgba(236,72,153,0.18)",
    description:
      "Currently pursuing a Bachelor of Technology in Computer Science & Engineering with a strong focus on software development, algorithms, databases, operating systems, computer networks, and modern web technologies. Passionate about Full Stack Development, AI, and building scalable applications.",
    stats: {
      semester: "5",
      projects: "8+",
      status: "Current Student",
      attendance: "92%",
    },
    details: {
      about:
        "B.Tech in CS&E focused on software engineering, data structures, algorithms, database systems, operating systems, and modern web technologies.",
      courses: ["Data Structures", "Algorithms", "Web Dev", "MERN Stack"],
      skills: ["C++", "Java", "React", "MongoDB", "Git", "Express.js"],
      achievements: [
        "Maintained excellent academic performance",
        "Built multiple full-stack projects",
        "Participated in coding contests and hackathons",
        "Consistently improving DSA skills",
      ],
    },
  },
  {
    id: 2,
    type: "12th",
    degree: "Higher Secondary Certificate",
    field: "Science (PCM)",
    institution: "Shanti Institute of Management & Higher Secondary School",
    location: "CDA-10, Cuttack, Odisha",
    duration: "2023 - 2024",
    grade: "86%",
    gradeLabel: "Percentage",
    isCurrent: false,
    certificate:
      "https://drive.google.com/file/d/3CdEfGhIjKlMnOpQrStUvWxYzAb/view?usp=sharing",
    marksheet:
      "https://drive.google.com/file/d/3CdEfGhIjKlMnOpQrStUvWxYzAb/view?usp=sharing",
    icon: BookOpen,
    color: {
      light: "from-indigo-500 to-cyan-500",
      dark: "from-indigo-400 to-cyan-400",
    },
    glowLight: "rgba(99,102,241,0.25)",
    glowDark: "rgba(99,102,241,0.18)",
    description:
      "Completed Higher Secondary Education with Physics, Chemistry, and Mathematics (PCM), developing strong analytical, logical reasoning, and mathematical problem-solving skills.",
    stats: {
      percentage: "86%",
      stream: "PCM",
      status: "Completed",
      board: "CHSE Odisha",
    },
    details: {
      about:
        "Higher secondary with a strong foundation in science and mathematics, preparing for higher studies in technology.",
      courses: [
        "Physics",
        "Chemistry",
        "Mathematics",
        "English",
        "Odia",
        "Information Technology",
      ],
      skills: [
        "Problem Solving",
        "Analytical Thinking",
        "Mathematics",
        "Communication",
      ],
      achievements: [
        "Built a strong academic base in science",
        "Developed analytical problem-solving habits",
        "Improved consistency and discipline",
        "Prepared for engineering entrance exams",
      ],
    },
  },
  {
    id: 3,
    type: "10th",
    degree: "Secondary School Certificate",
    field: "General Studies",
    institution: "Baghua Brahmani Devi High School, Baghua",
    location: "Balishai, Jajpur",
    duration: "2021 - 2022",
    grade: "85%",
    gradeLabel: "Percentage",
    isCurrent: false,
    certificate:
      "https://drive.google.com/file/d/3CdEfGhIjKlMnOpQrStUvWxYzAb/view?usp=sharing",
    marksheet:
      "https://drive.google.com/file/d/3CdEfGhIjKlMnOpQrStUvWxYzAb/view?usp=sharing",
    icon: School,
    color: {
      light: "from-cyan-500 to-emerald-500",
      dark: "from-cyan-400 to-emerald-400",
    },
    glowLight: "rgba(6,182,212,0.25)",
    glowDark: "rgba(6,182,212,0.18)",
    description:
      "Completed secondary education with excellent academic performance while building a strong foundation in mathematics, science, and communication skills.",
    stats: {
      percentage: "85%",
      board: "BSE Odisha",
      status: "Completed",
      schoolLevel: "Secondary",
    },
    details: {
      about:
        "Secondary education building a solid academic base in core subjects and early problem-solving skills.",
      courses: [
        "Mathematics",
        "Science",
        "English",
        "Social Studies",
        "Computer Basics",
      ],
      skills: [
        "Discipline",
        "Problem Solving",
        "Communication",
        "Basic Computing",
      ],
      achievements: [
        "Maintained a consistent academic record",
        "Built a strong learning foundation",
        "Developed curiosity for technology",
        "Strengthened analytical thinking",
      ],
    },
  },
];

export default educationData;
