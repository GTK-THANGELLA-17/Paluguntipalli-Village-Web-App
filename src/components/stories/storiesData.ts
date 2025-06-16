export interface Story {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
  category: string;
}

export const stories: Story[] = [
  {
    id: 1,
    title: "Farming with the Rhythm of Seasons",
    content: "In Paluguntipalli, our lives revolve around the land and its rhythms. We sow during the first showers, nurture through the rains, and harvest as winter sets in. Each season teaches us patience and gratitude. Surrounded by lush greenery, especially in the rainy season, our fields glow with promise. The villagers are always ready to help—whether it’s sharing tools or lending hands during harvest.",
    author: "Ravi Shankar",
    date: "2025-01-15",
    likes: 24,
    comments: 8,
    category: "Agriculture"
  },
  {
    id: 2,
    title: "A Childhood Among Rivers and Hills",
    content: "Growing up in Paluguntipalli felt like living in a dream. The winter mornings, wrapped in mist, the chirping birds, and the nearby hills made every day magical. We spent our evenings playing by the streams and exploring hidden spots near the village. Our people have always cherished nature, and even as children, we were taught to respect and protect it.",
    author: "Lakshmi ",
    date: "2025-01-20",
    likes: 31,
    comments: 12,
    category: "Childhood"
  },
  {
    id: 3,
    title: "Peerla Panduga: Unity in Every Beat",
    content: "Moharram in our village is special. During Peerla Panduga, people from all religions join hands to celebrate. It’s not just a festival—it’s a feeling of unity, rhythm, and respect. The entire village lights up, and the dappu beats echo through the fields. Despite our differences, we come together as one, reminding the younger generation of what true community means.",
    author: "Imran Ali",
    date: "2025-02-03",
    likes: 45,
    comments: 15,
    category: "Festival"
  },
  {
    id: 4,
    title: "Recipes from My Grandmother’s Clay Stove",
    content: "My grandmother cooked the most delicious meals using fresh vegetables from our seasonal farms. Her recipes, passed down over generations, carry the flavor of our soil and the warmth of our people. I now cook those same dishes for my children, hoping they will carry forward both the taste and the values of our green and giving village.",
    author: "David Mathew",
    date: "2025-02-10",
    likes: 38,
    comments: 9,
    category: "Food"
  }
];
