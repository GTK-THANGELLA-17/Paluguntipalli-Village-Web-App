export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

export const dailyQuestions: QuizQuestion[] = [
  // ——— State‑related (Andhra Pradesh) ———
  {
    id: 1,
    question: "What is the traditional festival celebrated during harvest season in Paluguntipalli?",
    options: ["Peerla Panduga", "Diwali", "Holi", "Ugadi"],
    correctAnswer: 0,
    explanation: "Peerla Panduga is our unique harvest festival celebrated with great enthusiasm by the entire village community.",
    category: "Andhra Pradesh‑Culture"
  },
  {
    id: 3,
    question: "What is the main crop grown in Paluguntipalli?",
    options: ["Wheat", "Rice", "Cotton", "Sugarcane"],
    correctAnswer: 1,
    explanation: "Rice is the primary crop in our village, grown during both Kharif and Rabi seasons.",
    category: "Andhra Pradesh‑Agriculture"
  },
  {
    id: 5,
    question: "What is the local language predominantly spoken in Paluguntipalli?",
    options: ["Tamil", "Telugu", "Kannada", "Hindi"],
    correctAnswer: 1,
    explanation: "Telugu is the primary language spoken by the residents of Paluguntipalli.",
    category: "Andhra Pradesh‑Culture"
  },
  {
    id: 6,
    question: "On which river was Srisailam bridge built?",
    options: ["Tungabhadra", "Krishna", "Godavari"],
    correctAnswer: 1,
    explanation: "The Srisailam bridge is constructed over the Krishna River, one of the major rivers in Andhra Pradesh.",
    category: "Andhra Pradesh‑Geography"
  },
  {
    id: 7,
    question: "Which was the first Telugu newspaper?",
    options: ["Deshabhimini", "Bharatui", "Satya Doota", "Andhra Patrika"],
    correctAnswer: 3,
    explanation: "Andhra Patrika was the first major Telugu newspaper, playing a vital role in the freedom movement.",
    category: "Andhra Pradesh‑History"
  },
  {
    id: 8,
    question: "On the bank of which river is Vijayawada located?",
    options: ["Krishna", "Tungabhadra", "Gundlakamma", "Godavari"],
    correctAnswer: 0,
    explanation: "Vijayawada lies on the banks of the Krishna River and is a key urban hub of Andhra Pradesh.",
    category: "Andhra Pradesh‑Geography"
  },
  {
    id: 9,
    question: "Name the city called as Jewel of East Coast.",
    options: ["Hyderabad", "Guntur", "Visakhapatnam", "Tirupati"],
    correctAnswer: 2,
    explanation: "Visakhapatnam, with its beaches and ports, is called the Jewel of the East Coast.",
    category: "Andhra Pradesh‑Geography"
  },
  {
    id: 10,
    question: "What is the total area of cultivated land in Andhra Pradesh?",
    options: ["22.63 lakh hectares", "49.55 lakh hectares", "24.29 lakh hectares", "12.84 lakh hectares"],
    correctAnswer: 1,
    explanation: "According to government statistics, Andhra Pradesh has about 49.55 lakh hectares of cultivated land.",
    category: "Andhra Pradesh‑Agriculture"
  },

  // ——— General GK (2025 updates) ———
  {
    id: 11,
    question: "Which country successfully launched the Artemis II mission in 2025?",
    options: ["China", "USA", "India", "Russia"],
    correctAnswer: 1,
    explanation: "NASA launched Artemis II in 2025, marking the first crewed mission around the Moon since Apollo.",
    category: "Global‑Science"
  },
  {
    id: 12,
    question: "Which city hosts Expo 2025 that started in April 2025?",
    options: ["Osaka", "Dubai", "Buenos Aires", "Beijing"],
    correctAnswer: 0,
    explanation: "Expo 2025 is being held in Osaka, Japan, focusing on future food and sustainable innovation.",
    category: "Global‑Current Affairs"
  },
  {
    id: 13,
    question: "Which cricket team won the ICC World Test Championship final in 2025?",
    options: ["Australia", "India", "England", "New Zealand"],
    correctAnswer: 1,
    explanation: "India defeated Australia in the 2025 WTC final held at the Oval.",
    category: "Sports‑Cricket"
  },
  {
    id: 14,
    question: "Which company became the first to reach a $3 trillion market cap in 2025?",
    options: ["Apple", "Microsoft", "Saudi Aramco", "Alphabet"],
    correctAnswer: 0,
    explanation: "Apple hit a market value of $3 trillion in February 2025.",
    category: "Global‑Economy"
  },
  {
    id: 15,
    question: "Which artificial intelligence model made headlines for passing the US bar exam in 2025?",
    options: ["GPT‑5", "PaLM 3", "Claude 3", "Gemini 2"],
    correctAnswer: 0,
    explanation: "OpenAI’s GPT‑5 reportedly passed the bar exam in early 2025 under supervised conditions.",
    category: "Science‑Technology"
  },
  {
    id: 16,
    question: "Which nation hosted the 2025 Cricket World Cup qualifier tournament?",
    options: ["Zimbabwe", "Bangladesh", "Namibia", "Netherlands"],
    correctAnswer: 3,
    explanation: "The qualifying tournament for the 2025 Men’s T20 World Cup took place in the Netherlands.",
    category: "Sports‑Cricket"
  },
  {
    id: 17,
    question: "Which movie won the Best Picture Oscar at the 2025 Academy Awards?",
    options: ["The Last Colony", "Eternal Spring", "Lost in Tomorrow", "Whisper of the Heart"],
    correctAnswer: 2,
    explanation: "“Lost in Tomorrow” received the Academy Award for Best Picture in March 2025.",
    category: "Arts‑Entertainment"
  },
  {
    id: 18,
    question: "Which country became the first in the world to approve fully electric commercial flights in 2025?",
    options: ["Sweden", "Canada", "Australia", "France"],
    correctAnswer: 0,
    explanation: "Sweden certified the world’s first all‑electric regional aircraft for commercial use in mid‑2025.",
    category: "Science‑Technology"
  },
  {
    id: 19,
    question: "Who won the Women’s Final at the 2025 Wimbledon Championship?",
    options: ["Iga Swiatek", "Aryna Sabalenka", "Elena Rybakina", "Coco Gauff"],
    correctAnswer: 3,
    explanation: "Coco Gauff triumphed over Aryna Sabalenka to win Wimbledon 2025 Women’s Singles.",
    category: "Sports‑Tennis"
  },
  {
    id: 20,
    question: "Which country launched a nationwide digital ID system named ‘e‑Citizen’ in 2025?",
    options: ["India", "United Kingdom", "Estonia", "South Korea"],
    correctAnswer: 0,
    explanation: "India rolled out its ‘e‑Citizen’ digital identity platform in 2025 to streamline public services.",
    category: "Global‑Current Affairs"
  }
];
