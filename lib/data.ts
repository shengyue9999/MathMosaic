import yaml from 'yaml';
import type { GradeData, Chapter } from './types';

// ============================================================
// Client-safe data helpers — can be imported anywhere
// ============================================================

export function getChapterById(data: GradeData, id: string): Chapter | undefined {
  return data.chapters.find(ch => ch.id === id);
}

export function getChapterProgress(data: GradeData): { total: number; unlocked: number; avgProgress: number } {
  const total = data.chapters.length;
  const unlocked = data.chapters.filter(ch => ch.unlocked).length;
  const avgProgress = total > 0
    ? Math.round(data.chapters.reduce((sum, ch) => sum + ch.progress, 0) / total)
    : 0;
  return { total, unlocked, avgProgress };
}

export function getPrerequisitesForChapter(data: GradeData, chapterId: string): Chapter[] {
  const chapter = getChapterById(data, chapterId);
  if (!chapter) return [];
  return chapter.prerequisites
    .map(id => getChapterById(data, id))
    .filter((ch): ch is Chapter => ch !== undefined);
}
