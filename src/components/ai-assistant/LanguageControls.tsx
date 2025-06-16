
import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { languages } from './languageUtils';

interface LanguageControlsProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  isSpeaking: boolean;
  onStopSpeaking: () => void;
}

const LanguageControls: React.FC<LanguageControlsProps> = ({
  selectedLanguage,
  onLanguageChange,
  isSpeaking,
  onStopSpeaking
}) => {
  return (
    <div className="flex items-center gap-2 p-2 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
      <Select value={selectedLanguage} onValueChange={onLanguageChange}>
        <SelectTrigger className="w-24 h-6 text-xs bg-white dark:bg-gray-700 dark:border-gray-600 border-gray-300 shadow-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg z-[70]">
          {languages.map((lang) => (
            <SelectItem 
              key={lang.code} 
              value={lang.code} 
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              {lang.flag} {lang.code.toUpperCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={isSpeaking ? onStopSpeaking : () => {}}
        className="h-6 w-6 dark:text-white dark:hover:bg-gray-700"
        disabled={!isSpeaking}
      >
        {isSpeaking ? <VolumeX size={12} /> : <Volume2 size={12} />}
      </Button>
    </div>
  );
};

export default LanguageControls;
