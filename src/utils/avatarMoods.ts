export type PlayResult = 'excellent' | 'good' | 'bad' | 'terrible';
export type AvatarMood = 'default' | 'happy' | 'sad' | 'smug';

export const getMoodFromResult = (result: PlayResult, isWinning: boolean): AvatarMood => {
  const random = Math.random();
  switch (result) {
    case 'excellent':
      return random < 0.7 ? 'happy' : 'smug';
    case 'good':
      if (isWinning) return random < 0.6 ? 'happy' : 'smug';
      return random < 0.8 ? 'happy' : 'default';
    case 'bad':
      return random < 0.6 ? 'sad' : 'default';
    case 'terrible':
      return random < 0.9 ? 'sad' : 'default';
    default:
      return 'default';
  }
};

export const getAvatarImagePath = (baseAvatar: string, mood: AvatarMood, isPlayer: boolean): string => {
  if (isPlayer) {
    return mood === 'default' ? '/images/avatars/player-default.jpg' : `/images/avatars/player-${mood}.jpg`;
  }
  const avatarName = baseAvatar.replace('.jpg', '');
  return mood === 'default'
    ? `/images/avatars/${avatarName}-default.jpg`
    : `/images/avatars/${avatarName}-${mood}.jpg`;
};

export const getFallbackAvatarPath = (baseAvatar: string, isPlayer: boolean): string => {
  if (isPlayer) return '/images/avatars/player-default.jpg';
  const avatarName = baseAvatar.replace('.jpg', '');
  return `/images/avatars/${avatarName}-default.jpg`;
};

export const getSmartFallbackPath = (baseAvatar: string, mood: AvatarMood, isPlayer: boolean): string => {
  if (isPlayer) return '/images/avatars/player-default.jpg';
  const avatarName = baseAvatar.replace('.jpg', '');
  if (mood !== 'default' && avatarName !== 'avatar1') {
    return `/images/avatars/avatar1-${mood}.jpg`;
  }
  return `/images/avatars/${avatarName}-default.jpg`;
};
