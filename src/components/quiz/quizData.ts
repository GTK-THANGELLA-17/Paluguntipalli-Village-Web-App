
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
    question: "What is the traditional festival celebrated during harvest season in Paluguntipalli?",
    options: ["Peerla Panduga", "Diwali", "Holi", "Ugadi"],
    correctAnswer: 0,
    explanation: "Peerla Panguda is our unique harvest festival celebrated with great enthusiasm by the entire village community.",
    category: "Culture"
  },
  {
    id: 2,
    question: "Which river flows near Paluguntipalli?",
    options: ["Godavari", "Krishna", "Pennar", "Tungabhadra"],
    correctAnswer: 2,
    explanation: "The Pennar River flows near our village, providing water for agriculture and supporting local ecosystem.",
    category: "Geography"
  },
  {
    id: 3,
    question: "What is the main crop grown in Paluguntipalli?",
    options: ["Wheat", "Rice", "Cotton", "Sugarcane"],
    correctAnswer: 1,
    explanation: "Rice is the primary crop in our village, grown during both Kharif and Rabi seasons.",
    category: "Agriculture"
  },
  {
    id: 4,
    question: "During which historical period did Paluguntipalli gain prominence?",
    options: ["Mughal Era", "British Colonial Period", "Vijayanagara Empire", "Chola Dynasty"],
    correctAnswer: 2,
    explanation: "Paluguntipalli flourished during the Vijayanagara Empire, becoming an important agricultural center.",
    category: "History"
  },
  {
    id: 5,
    question: "What is the local language predominantly spoken in Paluguntipalli?",
    options: ["Tamil", "Telugu", "Kannada", "Hindi"],
    correctAnswer: 1,
    explanation: "Telugu is the primary language spoken by the residents of Paluguntipalli.",
    category: "Culture"
  }
];
