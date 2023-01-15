export const GameLevels = ['easy', 'medium', 'hard'] as const;

export type LevelNames = typeof GameLevels[number];

export type Size = number;
export type Bombs = number;

export type Settings = [Size, Bombs];

export const GameSettings: Record<LevelNames, Settings> = {
  easy: [9, 10],
  medium: [16, 44],
  hard: [22, 99],
};


