export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

export const dailyQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which festival is strongly associated with Paluguntipalli's Peerla Chavidi?",
    options: ["Peerla Panduga", "Holi", "Onam", "Baisakhi"],
    correctAnswer: 0,
    explanation: "Peerla Panduga is closely connected with the village's Peerla Chavidi traditions and annual community celebrations.",
    category: "Village Culture"
  },
  {
    id: 2,
    question: "Which language is predominantly spoken in Paluguntipalli and nearby villages?",
    options: ["Tamil", "Telugu", "Kannada", "Marathi"],
    correctAnswer: 1,
    explanation: "Telugu is the primary local language across this part of Andhra Pradesh.",
    category: "Local Knowledge"
  },
  {
    id: 3,
    question: "Paluguntipalli is located in which Indian state?",
    options: ["Telangana", "Andhra Pradesh", "Karnataka", "Tamil Nadu"],
    correctAnswer: 1,
    explanation: "Paluguntipalli is a village in Andhra Pradesh, India.",
    category: "Geography"
  },
  {
    id: 4,
    question: "What is the best way to preserve old village festival memories for future generations?",
    options: ["Delete old photos", "Keep only rumors", "Save photos, videos, names, dates, and captions", "Avoid sharing history"],
    correctAnswer: 2,
    explanation: "Photos and videos become much more useful when they include dates, names, locations, captions, and context.",
    category: "Digital Heritage"
  },
  {
    id: 5,
    question: "During crowded festival days, what should visitors prioritize?",
    options: ["Blocking narrow roads", "Safety, clean surroundings, and respect for rituals", "Ignoring elders", "Leaving waste everywhere"],
    correctAnswer: 1,
    explanation: "Community safety, cleanliness, and respect for local traditions help everyone enjoy the festival.",
    category: "Festival Safety"
  },
  {
    id: 6,
    question: "Which feature helps visitors locate Paluguntipalli more easily?",
    options: ["Village Map", "Random guessing", "Broken links", "Hidden address"],
    correctAnswer: 0,
    explanation: "The Village Map and Google Maps links help visitors find the village and plan directions.",
    category: "Website Features"
  },
  {
    id: 7,
    question: "Why should local business information be verified before publishing?",
    options: ["To avoid wrong phone numbers and addresses", "To reduce trust", "To hide services", "To confuse visitors"],
    correctAnswer: 0,
    explanation: "Verified phone numbers, addresses, and timings make the business directory more useful and trustworthy.",
    category: "Community Services"
  },
  {
    id: 8,
    question: "What kind of image alt text is best for village photos?",
    options: ["image1", "A clear description of the place, event, or people shown", "blank for every photo", "random keywords"],
    correctAnswer: 1,
    explanation: "Meaningful alt text helps accessibility, search engines, and AI systems understand the photo.",
    category: "Accessibility"
  },
  {
    id: 9,
    question: "What should be done before treating community-submitted stories as factual history?",
    options: ["Publish without checking", "Review and verify details where possible", "Remove all names", "Ignore dates"],
    correctAnswer: 1,
    explanation: "Community stories are valuable, but important factual claims should be reviewed before being presented as verified history.",
    category: "Editorial Quality"
  },
  {
    id: 10,
    question: "For YouTube live streaming on the website, what must be added before deployment?",
    options: ["A random local video", "The active YouTube Live URL", "A fake viewer count", "Nothing at all"],
    correctAnswer: 1,
    explanation: "The Live Streaming section embeds the YouTube live video after the active YouTube Live URL is configured.",
    category: "Live Streaming"
  }
];