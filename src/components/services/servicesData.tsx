import { Zap, Wrench, Hammer, Car, Tractor, Tent, Droplets, Scissors } from "lucide-react";

export interface ServiceProvider {
  id: number;
  name: string;
  service: string;
  phone: string;
  location: string;
  rating: number;
  availability: string;
  description: string;
  category: string;
  experience: string;
  icon: React.ReactNode;
  hasWhatsApp: boolean;
}

export const serviceProviders: ServiceProvider[] = [
  {
    id: 1,
    name: "Suhana Electronics",
    service: "Electrician",
    phone: "+91 99516 68997",
    location: "9WJJ+29Q, Racherla Gate Center, Giddalur, Andhra Pradesh 523357",
    rating: 4.6,
    availability: "9 AM - 8 PM",
    description: "Experienced in residential and commercial electrical services.",
    category: "electrical",
    experience: "5 years",
    icon: <Zap className="text-yellow-500" size={24} />,
    hasWhatsApp: true
  },
  {
    id: 2,
    name: "Modern Car Mechanic Center",
    service: "Auto Mechanic",
    phone: "+91 94567 15591",
    location: "9WHP+QRV, Ongole - Kurnool Main Rd, Giddalur, Andhra Pradesh 523357",
    rating: 4.5,
    availability: "8 AM - 7 PM",
    description: "Car repairs, diagnostics, and regular servicing available.",
    category: "automotive",
    experience: "2 years",
    icon: <Car className="text-blue-500" size={24} />,
    hasWhatsApp: true
  },
  {
    id: 3,
    name: "Sairam Paints & Interior Design Works",
    service: "Carpenter",
    phone: "+91 96762 92174",
    location: "Komarole Bustand, Giddalur, Andhra Pradesh 523357",
    rating: 4.8,
    availability: "10 AM - 6 PM",
    description: "Plywood furniture, interior designs, modular carpentry.",
    category: "construction",
    experience: "5 years",
    icon: <Hammer className="text-amber-600" size={24} />,
    hasWhatsApp: false
  },
  {
    id: 4,
    name: "Venkata Mourya Royal Pacher Shop",
    service: "Tyre Puncture Repair",
    phone: "+91 80084 01189",
    location: "SH 382, Racherla Gate Center, Giddalur, Andhra Pradesh 523357",
    rating: 4.4,
    availability: "24/7 Emergency",
    description: "Tyre patching, tube replacements, and wheel air filling.",
    category: "automotive",
    experience: "2 years",
    icon: <Wrench className="text-gray-600" size={24} />,
    hasWhatsApp: true
  },
  {
    id: 5,
    name: "Cheetirala Nageswarrao Fertilisers Shop",
    service: "Farming Services",
    phone: "+91 98494 43018",
    location: "9WHM+RH3, Ongole - Kurnool Main Rd, Giddalur, Andhra Pradesh 523357",
    rating: 4.7,
    availability: "Seasonal Service",
    description: "Fertilizers, equipment rental, soil consultation.",
    category: "agriculture",
    experience: "3 years",
    icon: <Tractor className="text-green-600" size={24} />,
    hasWhatsApp: true
  },
  {
    id: 6,
    name: "Racherla Water Service",
    service: "Water Supply",
    phone: "+91 84990 90369",
    location: "Racherla, Giddalur, Prakasam District, Andhra Pradesh 523317",
    rating: 4.3,
    availability: "Daily 6 AM - 6 PM",
    description: "Clean drinking water supply and tanker services.",
    category: "utilities",
    experience: "2 years",
    icon: <Droplets className="text-blue-400" size={24} />,
    hasWhatsApp: true
  }
];
