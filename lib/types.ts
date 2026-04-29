export type SectionType = 'basics' | 'formulas' | 'mistakes' | 'examples';

export interface Section {
  type: SectionType;
  title: string;
  items: string[];
}

export interface Connection {
  target: string;
  reason: string;
  strength: 'strong' | 'medium' | 'weak';
}

export interface Chapter {
  id: string;
  title: string;
  emoji: string;
  color: string;
  illustration: string;
  difficulty: number;
  unlocked: boolean;
  progress: number;
  prerequisites: string[];
  sections: Section[];
  connections: Connection[];
}

export interface GradeData {
  grade: string;
  semester: string;
  version: string;
  last_updated: string;
  textbook: string;
  description: string;
  chapters: Chapter[];
}
