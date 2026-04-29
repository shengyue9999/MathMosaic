import yaml from 'yaml';
import { GradeData } from './types';

export async function loadGradeData(gradeFile: string = 'grade6-2'): Promise<GradeData> {
  const response = await fetch(`/data/grades/${gradeFile}.yaml`);
  const text = await response.text();
  return yaml.parse(text) as GradeData;
}

export function getChapterById(data: GradeData, id: string) {
  return data.chapters.find(ch => ch.id === id);
}
