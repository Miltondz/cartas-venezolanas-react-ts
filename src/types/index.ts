import React from 'react';

export interface Card {
  suit: string;
  value: number;
  name: string;
  power: number;
  image: string;
  envidoValue: number;
  imageFile: string;
}

export interface AICharacter {
  id: string;
  name: string;
  agresividad: number;
  riesgo: number;
  blufeo: number;
  consistencia: number;
  description: string;
  avatar: string;
  activo: boolean;
  difficulty: 'easy' | 'medium' | 'intermediate' | 'hard' | 'master';
  personality: 'balanced' | 'aggressive' | 'conservative' | 'unpredictable';
}

export interface BaseScreenProps {
  onNavigate: (screen: string) => void;
}

export const DECKS = ['default', 'europea', 'moderna', 'especial'];
export const BOARDS = ['tablero-cama.jpg', 'tablero-mesa.jpg', 'tablero-grama.jpg', 'tablero-salon.jpg'];
export const AVATARS = ['avatar1.jpg', 'avatar2.jpg', 'avatar3.jpg', 'avatar4.jpg', 'avatar5.jpg', 'avatar6.jpg', 'avatar7.jpg'];

export const suitFileMap: Record<string, string> = {
  espadas: 'espadas',
  bastos: 'treboles',
  oros: 'diamantes',
  copas: 'corazones'
};
