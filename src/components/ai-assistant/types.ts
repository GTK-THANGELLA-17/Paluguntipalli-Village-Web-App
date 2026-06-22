
export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  navigationOptions?: NavigationOption[];
  originalContent?: string;
  translatedTo?: string;
}

export interface NavigationOption {
  label: string;
  sectionId: string;
  emoji: string;
}

export interface PredefinedQuestion {
  id: string;
  question: string;
  answer: string;
  category: string;
  navigationOptions?: NavigationOption[];
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface AIAssistantProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSectionChange?: (section: 'quiz' | 'community' | 'business' | 'services' | 'why-use-app' | 'stay-updated' | 'village-map' | 'live-streaming' | null) => void;
}
