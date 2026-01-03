"use client"
import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

const DarkThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Efecto único
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initializeTheme = () => {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
      
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

      const root = document.documentElement;
      if (initialTheme === 'dark') {
        root.classList.add('dark');
      }

      setTheme(initialTheme);
      setMounted(true);
    };

    initializeTheme();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    setTheme(newTheme);
    
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', newTheme);
  };

  if (!mounted) {
    return (
      <div className="p-2">
        <div className="w-10 h-10 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="group p-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
      aria-label={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
      title={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
    >
      <div className="relative w-10 h-10 flex items-center justify-center">
        {/* Sol - tema claro */}
        <span
          className={`absolute text-2xl transition-all duration-300 ${
            theme === 'light'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 rotate-90 scale-50'
          }`}
          aria-hidden="true"
        >
            <Sun className='text-[#f8ff2c]'/>
        </span>
        
        {/* Luna - tema oscuro */}
        <span
          className={`absolute text-2xl transition-all duration-300 ${
            theme === 'dark'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-50'
          }`}
          aria-hidden="true"
        >
           <Moon className='text-white'/>
        </span>

      </div>
    </button>
  );
};

export default DarkThemeToggle;