export interface Business {
  id: number;
  name: string;
  category: string;
  description: string;
  phone: string;
  address: string;
  hours: string;
  rating: number;
  image: string;
  featured: boolean;
  services: string[];
}

export const businesses: Business[] = [
  {
    id: 1,
    name: "Balakittu General Store",
    category: "General Store",
    description: "Daily essentials, groceries, and tablets available in the village.",
    phone: "",
    address: "Paluguntipalli",
    hours: "6:00 AM - 10:00 PM",
    rating: 4.4,
    image: "/general store.png",
    featured: true,
    services: ["Groceries", "Household Items", "Tablets", "Mobile Recharge"]
  },
  {
    id: 2,
    name: "Sreenu General Store",
    category: "General Store",
    description: "General provisions and basic medicines available.",
    phone: "",
    address: "Paluguntipalli",
    hours: "7:00 AM - 9:00 PM",
    rating: 4.3,
    image: "/general store.png",
    featured: false,
    services: ["Groceries", "Tablets", "Bill Payments"]
  },
  {
    id: 3,
    name: "Kasim General Store",
    category: "General Store",
    description: "Groceries, snacks, and over-the-counter medicines.",
    phone: "",
    address: "Paluguntipalli",
    hours: "6:30 AM - 9:30 PM",
    rating: 4.2,
    image: "/general store.png",
    featured: false,
    services: ["Snacks", "Groceries", "Medicines"]
  },
  {
    id: 4,
    name: "Basha Clinic & Medical Shop",
    category: "Healthcare",
    description: "Clinic and medical store with general medicine and health services.",
    phone: "",
    address: "Racherla, after Paluguntipalli village",
    hours: "8:00 AM - 8:00 PM",
    rating: 4.5,
    image: "/clinic.png",
    featured: true,
    services: ["General Checkup", "Medicines", "Vaccinations"]
  },
  {
    id: 6,
    name: "Seenu Cycle & Motor Works",
    category: "Repair Shop",
    description: "Bicycle and motorcycle repair services with genuine spare parts.",
    phone: "",
    address: "Paluguntipalli",
    hours: "7:00 AM - 7:00 PM",
    rating: 4.2,
    image: "/puncher services.png",
    featured: false,
    services: ["Bicycle Repair", "Motorcycle Service", "Spare Parts", "Tire Service"]
  }
];

export const categories = ["All", "General Store", "Restaurant", "Healthcare", "Repair Shop"];
