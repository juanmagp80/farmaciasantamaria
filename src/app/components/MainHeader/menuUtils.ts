// Utilidades para el menú principal
export const scrollToSection = (sectionId: string) => {
  if (typeof window !== 'undefined') {
    const element = document.querySelector(sectionId);
    if (element) {
      const headerHeight = 100; // Altura aproximada del header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
};

export const isExternalUrl = (url: string): boolean => {
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('tel:');
};

export const getActiveSection = (): number => {
  if (typeof window === 'undefined') return 0;
  
  const sections = ['Servicios', 'NuestroEquipo', 'Contacto'];
  const scrollPosition = window.scrollY + 150; // Offset para activación temprana
  
  for (let i = sections.length - 1; i >= 0; i--) {
    const element = document.getElementById(sections[i]);
    if (element && element.offsetTop <= scrollPosition) {
      return i + 1; // +1 porque "Inicio" es index 0
    }
  }
  
  return 0; // Inicio
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};