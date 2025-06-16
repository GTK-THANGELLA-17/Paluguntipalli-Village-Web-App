
import { Home } from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';
import { useTranslation } from 'react-i18next';
import ThemeToggle from '../ThemeToggle';

interface NavbarBrandProps {
  onHomeClick: () => void;
}

const NavbarBrand = ({ onHomeClick }: NavbarBrandProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      <button onClick={onHomeClick} className="flex items-center gap-2">
        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-heritage rounded-lg flex items-center justify-center">
          <Home className="text-white" size={16} />
        </div>
        <span className={`text-xl font-bold font-playfair ${theme === 'light' ? 'text-black hover:text-heritage' : 'text-white hover:text-heritage'} transition-colors`}>
          {t('Paluguntipalli', 'Paluguntipalli')}
        </span>
      </button>
      <div className="hidden sm:block">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default NavbarBrand;
