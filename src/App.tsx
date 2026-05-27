import React, { useState } from 'react';
import './styles/App.css';
import './styles/components.css';

import MainScreen from './components/MainScreen';
import SieteMedioScreen from './components/SieteMedioScreen';
import BriscaScreen from './components/BriscaScreen';
import ChinchonScreen from './components/ChinchonScreen';
import VeintiunoScreen from './components/VeintiunoScreen';

type Screen =
  | 'main-screen'
  | 'siete-medio-screen'
  | 'brisca-screen'
  | 'chinchon-screen'
  | 'veintiuno-screen';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('main-screen');

  const navigateTo = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  return (
    <div className="game-canvas">
      {currentScreen === 'main-screen' && (
        <MainScreen onNavigate={navigateTo} />
      )}
      {currentScreen === 'siete-medio-screen' && (
        <SieteMedioScreen onNavigate={navigateTo} />
      )}
      {currentScreen === 'brisca-screen' && (
        <BriscaScreen onNavigate={navigateTo} />
      )}
      {currentScreen === 'chinchon-screen' && (
        <ChinchonScreen onNavigate={navigateTo} />
      )}
      {currentScreen === 'veintiuno-screen' && (
        <VeintiunoScreen onNavigate={navigateTo} />
      )}
    </div>
  );
};

export default App;
