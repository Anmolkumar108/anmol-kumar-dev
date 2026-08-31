export const portfolioLinks = {
  github: "https://github.com/Anmolkumar108",
  linkedin: "https://www.linkedin.com/in/anmol-singh-361b90343/",
  email: "mailto:akanmolbhumihar09@gmail.com",
  resume:
    "https://raw.githubusercontent.com/Anmolkumar108/Portfolio/main/assets/resume/resume.pdf",
} as const;

export type Project = {
  number: string;
  label: string;
  title: string;
  summary: string;
  repository: string;
  stack: string[];
  features: string[];
  problem: string;
  solution: string;
  learned: string;
  image: string;
  imageAlt: string;
};

export const projects: Project[] = [
  {
    number: "01",
    label: "VOICE AUTOMATION",
    title: "Sanskari AI Assistant",
    summary:
      "A voice-first desktop assistant that handles commands, web search, weather checks, intelligent responses, and desktop automation.",
    repository: "https://github.com/Anmolkumar108/Sanskari-AI-Assistant",
    stack: ["Python", "OpenAI API", "SpeechRecognition", "PyAutoGUI"],
    features: ["Voice commands", "Google search", "Weather lookup", "Desktop control"],
    problem:
      "Everyday desktop actions often require repetitive searching, typing, and navigating between applications.",
    solution:
      "A Python assistant combines speech recognition, AI responses, and interface automation so common tasks can begin with one spoken command.",
    learned:
      "Integrating speech input, external services, AI responses, and operating-system automation into one coordinated workflow.",
    image: "sanskari",
    imageAlt: "Concept visual of the Sanskari AI Assistant voice interface",
  },
  {
    number: "02",
    label: "MULTI-UTILITY DESKTOP APP",
    title: "AI Calculator App",
    summary:
      "A multi-function desktop calculator with scientific, GST, discount, BMI, currency, unit, temperature, and date tools.",
    repository: "https://github.com/Anmolkumar108/Calculator-App-Py",
    stack: ["Python", "CustomTkinter", "SQLite3", "Pyttsx3"],
    features: ["Multiple calculator modes", "Voice assistant", "SQLite history", "Desktop UI"],
    problem:
      "Different day-to-day calculations usually live across disconnected tools with no shared history or voice interaction.",
    solution:
      "One desktop application brings multiple calculation modes together, stores results locally, and speaks through a built-in voice assistant.",
    learned:
      "Designing a multi-mode desktop interface, persisting local data with SQLite, and coordinating text-to-speech feedback.",
    image: "calculator",
    imageAlt: "Concept visual of the AI Calculator desktop interface",
  },
  {
    number: "03",
    label: "AI STUDY COMPANION",
    title: "StudyMate AI",
    summary:
      "An AI-powered study companion that turns study material into clear explanations, summaries, and quick revision help for students.",
    repository: "https://github.com/Anmolkumar108/StudyMate-AI",
    stack: ["Python", "AI / LLM API", "Text Processing", "Git"],
    features: [
      "Ask study questions",
      "Topic explanations",
      "Notes summarisation",
      "Quick revision help",
    ],
    problem:
      "Students often lose time searching across notes, videos, and websites to understand one topic, and rarely get answers written at their own level.",
    solution:
      "StudyMate AI accepts a topic or question, sends it through an AI model with study-focused prompting, and returns structured explanations and short summaries a student can revise from directly.",
    learned:
      "Prompt design for study-oriented responses, handling and cleaning text input, and structuring an AI workflow around a single clear user goal.",
    image: "studymate",
    imageAlt: "Concept visual of the StudyMate AI study assistant interface",
  },
];

export const skillGroups = [
  { category: "Programming", skills: ["Python", "C"] },
  { category: "Tools", skills: ["Git", "GitHub", "VS Code"] },
  { category: "Data / Other", skills: ["MS Excel", "MS Word"] },
  { category: "Learning / Focus", skills: ["AI", "Machine Learning", "DSA"] },
];

export type Certification = {
  title: string;
  detail: string;
  /** Place the image file in /public/certificates/ and reference it here. */
  image?: string;
};

export const certifications: Certification[] = [
  {
    title: "Secondary School Certificate",
    detail: "2023",
    image: "/certificates/secondary.jpg",
  },
  {
    title: "Senior Secondary School Certificate",
    detail: "2025",
    image: "/certificates/senior-secondary.jpg",
  },
  {
    title: "ADCA Certification",
    detail: "Advanced Diploma in Computer Applications",
    image: "/certificates/adca.jpg",
  },
  {
    title: "College Hackathon Participation",
    detail: "Sityog Institute of Technology",
    image: "/certificates/hackathon.jpg",
  },
];

export const education = [
  {
    date: "2025 — 2028 · IN PROGRESS",
    title: "Bachelor of Computer Applications",
    place: "Sityog Institute of Technology, Aurangabad",
    detail: "Aryabhatta Knowledge University, Patna · Current CGPA 8.81",
  },
  {
    date: "2025",
    title: "Advanced Diploma in Computer Applications (ADCA)",
    place: "Council of Skill and Vocational Learning",
    detail: "Certification in computer applications",
  },
  {
    date: "2025",
    title: "Senior Secondary (XII)",
    place: "Janta High School, Sirari, Sheikhpura",
    detail: "Bihar School Examination Board · 65%",
  },
  {
    date: "2023",
    title: "Secondary (X)",
    place: "Shri Sitaram Radheshyam High School, Mahsaura",
    detail: "Bihar School Examination Board · 67%",
  },
];