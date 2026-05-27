import React, { useState, useEffect } from 'react';
import { BaseScreenProps } from '../types';

const MainScreen: React.FC<BaseScreenProps> = ({ onNavigate }) => {
  const [videoError, setVideoError] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div id="main-screen" className="screen main-screen active">
      <div className="video-background">
        {!videoError ? (
          <video
            key={isMobile ? 'mobile' : 'desktop'}
            autoPlay
            muted
            loop
            playsInline
            className="cover-video"
            poster={isMobile ? '/images/cover-mobile.jpg' : '/images/cover.jpg'}
            onError={() => setVideoError(true)}
          >
            <source
              src={isMobile ? '/images/cover-mobile.mp4' : '/images/cover.mp4'}
              type="video/mp4"
            />
          </video>
        ) : (
          <img
            src={isMobile ? '/images/cover-mobile.jpg' : '/images/cover.jpg'}
            alt="Cartas Venezolanas"
            className="background-image"
          />
        )}
        <div className="video-overlay"></div>
      </div>

      <div className="screen-content">
        <div className="cv-main-container">
          <h1 className="cv-platform-title">🃏 Cartas Venezolanas</h1>
          <p className="cv-platform-subtitle">Clásicos de la baraja española</p>

          <div className="cv-games-grid">
            <button
              className="cv-game-card cv-game-siete"
              onClick={() => onNavigate('siete-medio-screen')}
            >
              <span className="cv-game-icon">🃏</span>
              <span className="cv-game-name">Siete y Medio</span>
              <span className="cv-game-desc">Acércate a 7½ sin pasarte</span>
            </button>

            <button
              className="cv-game-card cv-game-brisca"
              onClick={() => onNavigate('brisca-screen')}
            >
              <span className="cv-game-icon">🎴</span>
              <span className="cv-game-name">Brisca</span>
              <span className="cv-game-desc">Gana con el palo de triunfo</span>
            </button>

            <button
              className="cv-game-card cv-game-chinchon"
              onClick={() => onNavigate('chinchon-screen')}
            >
              <span className="cv-game-icon">🃏</span>
              <span className="cv-game-name">Chinchón</span>
              <span className="cv-game-desc">Forma escaleras y tríos</span>
            </button>

            <button
              className="cv-game-card cv-game-veintiuno"
              onClick={() => onNavigate('veintiuno-screen')}
            >
              <span className="cv-game-icon">🂡</span>
              <span className="cv-game-name">Veintiuno</span>
              <span className="cv-game-desc">Llega a 21 sin pasarte</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
