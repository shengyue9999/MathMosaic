// ============================================================
// Data types for MathMosaic
// ============================================================

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

// ============================================================
// UI types
// ============================================================

export type DifficultyLabel = '入门' | '基础' | '进阶' | '挑战';

export function getDifficultyLabel(level: number): DifficultyLabel {
  const labels: DifficultyLabel[] = ['入门', '基础', '进阶', '挑战'];
  return labels[Math.min(level, labels.length - 1)];
}

export function getStrengthLabel(strength: Connection['strength']): string {
  switch (strength) {
    case 'strong': return '强关联';
    case 'medium': return '中等关联';
    case 'weak': return '弱关联';
  }
}

export const SECTION_LABELS: Record<SectionType, { label: string; icon: string }> = {
  basics: { label: '基础概念', icon: '📘' },
  formulas: { label: '必会公式', icon: '📐' },
  mistakes: { label: '易错点', icon: '⚠️' },
  examples: { label: '经典例题', icon: '✏️' },
};
