"use client"
import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const DarkThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  // Efecto único de inicialización
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initializeTheme = () => {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

      const root = document.documentElement;
      if (initialTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }

      setTheme(initialTheme);
      setMounted(true);
    };

    initializeTheme();
  }, []);

  const toggleTheme = () => {
    if (isHome) return; // Deshabilitado en home

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
        <div className="w-10 h-10 bg-gray-200/20 rounded animate-pulse" />
      </div>
    );
  }

  // En Home forzamos visualmente el estado "dark" y deshabilitamos
  const effectiveTheme = isHome ? 'dark' : theme;

  return (
    <button
      onClick={toggleTheme}
      disabled={isHome}
      className={`group p-2 rounded-lg transition-all duration-200 
        ${isHome ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95 cursor-pointer'}
      `}
      aria-label={`Cambiar a tema ${effectiveTheme === 'light' ? 'oscuro' : 'claro'}`}
      title={isHome ? 'Tema oscuro forzado en Inicio' : `Cambiar a tema ${effectiveTheme === 'light' ? 'oscuro' : 'claro'}`}
    >
      <div className="relative w-10 h-10 flex items-center justify-center">
        {/* Sol - tema claro */}
        <span
          className={`absolute text-2xl transition-all duration-300 ${
            effectiveTheme === 'light'
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
            effectiveTheme === 'dark'
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