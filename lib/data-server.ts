import 'server-only';

import yaml from 'yaml';
import fs from 'fs';
import path from 'path';
import type { GradeData } from './types';

// ============================================================
// Server-side data loading — Node.js fs APIs, RSC only
// ============================================================

/**
 * Load grade data from YAML file on the server.
 * Use this in Server Components (app/page.tsx, app/mosaic/[id]/page.tsx).
 */
export async function getGradeDataServer(gradeFile: string = 'grade6-2'): Promise<GradeData> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'grades', `${gradeFile}.yaml`);
  const content = fs.readFileSync(filePath, 'utf8');
  const data = yaml.parse(content) as GradeData;

  if (!data?.chapters || !Array.isArray(data.chapters)) {
    throw new Error(`Invalid grade data: missing chapters array in ${gradeFile}.yaml`);
  }

  return data;
}
