import React from 'react';
import { notFound } from 'next/navigation';
import { getGradeDataServer, getChapterById } from '../../../lib/data';
import MosaicDetail from '../../../components/MosaicDetail';
import ErrorState from '../../../components/ErrorState';

// ============================================================
// Server Component for /mosaic/[id]
// ============================================================

interface MosaicPageProps {
  params: Promise<{ id: string }>;
}

export default async function MosaicPage({ params }: MosaicPageProps) {
  const { id } = await params;

  let data;
  try {
    data = await getGradeDataServer('grade6-2');
  } catch {
    return (
      <div className="min-h-screen bg-[#f8f1e7]">
        <div className="h-3 bg-gradient-to-r from-[#d4b8a0] via-[#e8d5b8] to-[#d4b8a0]" />
        <ErrorState title="数据加载失败" message="无法加载课程数据。" />
      </div>
    );
  }

  const chapter = getChapterById(data, id);

  if (!chapter) {
    notFound();
  }

  return <MosaicDetail chapter={chapter} allChapters={data.chapters} />;
}

// Generate static params for all chapters at build time
export async function generateStaticParams() {
  try {
    const data = await getGradeDataServer('grade6-2');
    return data.chapters.map(ch => ({ id: ch.id }));
  } catch {
    return [];
  }
}

// Metadata
export async function generateMetadata({ params }: MosaicPageProps) {
  const { id } = await params;
  try {
    const data = await getGradeDataServer('grade6-2');
    const chapter = getChapterById(data, id);
    if (!chapter) return { title: '未找到 - 数绘' };
    return {
      title: `${chapter.emoji} ${chapter.title} - 数绘`,
      description: `${chapter.title}的知识绘本拼图`,
    };
  } catch {
    return { title: '数绘' };
  }
}
