import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const FbIcon = () => <svg viewBox="0 0 24 24" className="social-svg-float"><path d="M12 2.04c-5.5 0-10 4.48-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.54-4.5-10.02-10-10.02z"/></svg>;
const IgIcon = () => <svg viewBox="0 0 24 24" className="social-svg-float"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.85 3.93 2.3 7.15 2.15c1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07c-4.27.2-6.78 2.71-6.98 6.98C0 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.27 2.71 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.27-.2 6.78-2.71 6.98-6.98C23.99 15.67 24 15.26 24 12s-.01-3.67-.07-4.95c-.2-4.27-2.71-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.4-11.44a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/></svg>;
const YtIcon = () => <svg viewBox="0 0 24 24" className="social-svg-float"><path d="M21.58 7.19a2.71 2.71 0 0 0-1.9-1.92C17.99 4.8 12 4.8 12 4.8s-5.99 0-7.68.47a2.71 2.71 0 0 0-1.9 1.92C1.95 8.89 1.95 12 1.95 12s0 3.11.47 4.81a2.71 2.71 0 0 0 1.9 1.92C5.99 19.2 12 19.2 12 19.2s5.99 0 7.68-.47a2.71 2.71 0 0 0 1.9-1.92c.47-1.7.47-4.81.47-4.81s0-3.11-.47-4.81zM9.98 15.2v-6.4l6.15 3.2-6.15 3.2z"/></svg>;

const css = `
  .floating-widgets {
    position: fixed;
    z-index: 999;
    pointer-events: none; /* Let clicks pass through empty areas */
    inset: 0;
  }
  
  .floating-widgets--hidden {
    opacity: 0;
    visibility: hidden;
  }
  
  .floating-widgets--visible {
    opacity: 1;
    visibility: visible;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }

  .social-svg-float {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }

  /* Scroll to top (Bottom Right) */
  .scroll-to-top {
    position: absolute;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #1BA94C;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(27, 169, 76, 0.4);
    border: none;
    pointer-events: auto;
    transition: all 0.3s ease;
  }
  .scroll-to-top:hover {
    transform: translateY(-5px);
    background: #148f3e;
    box-shadow: 0 6px 20px rgba(27, 169, 76, 0.6);
  }

  /* Social Icons (Bottom Left) */
  .floating-social {
    position: absolute;
    bottom: 30px;
    left: 30px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    pointer-events: auto;
  }
  
  .floating-social-btn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #1BA94C;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(27, 169, 76, 0.4);
    transition: all 0.3s ease;
    text-decoration: none;
  }
  .floating-social-btn:hover {
    background: #0A1930;
    color: white;
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(10, 25, 48, 0.6);
  }

  @media (max-width: 768px) {
    .scroll-to-top {
      bottom: 20px;
      right: 20px;
      width: 45px;
      height: 45px;
    }
    .floating-social {
      bottom: 20px;
      left: 20px;
      gap: 12px;
    }
    .floating-social-btn {
      width: 45px;
      height: 45px;
    }
  }
`;

export default function FloatingWidgets() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isInFooter, setIsInFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      const footer = document.querySelector('.footer');
      const footerTop = footer ? footer.offsetTop : document.documentElement.scrollHeight;

      // Check if we passed the hero section (top 300px)
      setHasScrolled(scrollY > 300);

      // Check if we hit the footer
      setIsInFooter(scrollY + windowHeight >= footerTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const socialVisible = hasScrolled && !isInFooter;
  const arrowVisible = hasScrolled;

  return (
    <>
      <style>{css}</style>
      <div className="floating-widgets">
        
        {/* Social Icons - Left Side (Hides at Footer) */}
        <div className={`floating-social ${socialVisible ? 'floating-widgets--visible' : 'floating-widgets--hidden'}`}>
          <a href="https://www.facebook.com/novamaxfoundation" target="_blank" rel="noopener noreferrer" className="floating-social-btn" aria-label="Facebook">
            <FbIcon />
          </a>
          <a href="https://www.instagram.com/novamaxfoundation" target="_blank" rel="noopener noreferrer" className="floating-social-btn" aria-label="Instagram">
            <IgIcon />
          </a>
          <a href="https://www.youtube.com/@novamaxfoundation" target="_blank" rel="noopener noreferrer" className="floating-social-btn" aria-label="YouTube">
            <YtIcon />
          </a>
        </div>

        {/* Scroll To Top - Right Bottom (Stays visible everywhere except top) */}
        <button 
          className={`scroll-to-top ${arrowVisible ? 'floating-widgets--visible' : 'floating-widgets--hidden'}`}
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>

      </div>
    </>
  );
}
