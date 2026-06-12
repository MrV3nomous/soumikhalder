import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const targetId = hash.replace('#', '');
        const element = document.getElementById(targetId);
        
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    } 
    
    else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [pathname, hash]);

  return null;
}