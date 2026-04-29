import React, { Suspense } from 'react';
import { getGradeDataServer } from '../lib/data-server';
import ChapterGrid from '../components/ChapterGrid';
import SkeletonGrid from '../components/SkeletonGrid';
import ErrorState from '../components/ErrorState';

export default async function Home() {
  let data;
  try {
    data = await getGradeDataServer('grade6-2');
  } catch (error) {
    return (
      <div className="min-h-screen bg-[#f8f1e7]">
        <div className="h-3 bg-gradient-to-r from-[#d4b8a0] via-[#e8d5b8] to-[#d4b8a0]" />
        <ErrorState
          title="数据加载失败"
          message="无法加载课程数据。请检查 data/grades/grade6-2.yaml 文件是否存在且格式正确。"
        />
      </div>
    );
  }

  return (
    <Suspense fallback={<SkeletonGrid />}>
      <ChapterGrid data={data} />
    </Suspense>
  );
}
