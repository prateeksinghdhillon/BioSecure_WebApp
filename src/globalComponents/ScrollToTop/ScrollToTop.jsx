import React, { useState, useEffect } from 'react';
import "./ScrollToTop.css"

function ScrollToTop({ containerRef }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (container) {
        const scrollTop = container.scrollTop;
        setIsVisible(scrollTop > 200); // Adjust the threshold as needed
      }
    };

    containerRef.current.addEventListener('scroll', handleScroll);
  }, [containerRef]);

  const scrollToTop = () => {
    containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
    >
      ↑
    </button>
  );
}

export default ScrollToTop;