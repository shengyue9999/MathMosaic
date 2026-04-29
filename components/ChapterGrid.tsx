'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GradeData } from '../lib/types';
import { getChapterProgress } from '../lib/data';
import ChapterCard from '../components/ChapterCard';

interface ChapterGridProps {
  data: GradeData;
}

export default function ChapterGrid({ data }: ChapterGridProps) {
  const { total, unlocked, avgProgress } = getChapterProgress(data);
  const gradeLabel = `${data.grade}${data.semester}`;

  return (
    <div className="min-h-screen bg-[#f8f1e7]">
      {/* Top decorative bar */}
      <div className="h-3 bg-gradient-to-r from-[#d4b8a0] via-[#e8d5b8] to-[#d4b8a0]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 md:pt-16 pb-16 md:pb-20">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-20"
        >
          <div className="mx-auto mb-6 md:mb-8 inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-white/80 rounded-3xl shadow-inner text-5xl md:text-6xl border border-[#e8d5b8]">
            📖
          </div>
          <h1 className="title-font text-5xl md:text-7xl text-[#3f2e1e] tracking-tighter mb-3 md:mb-4">
            数绘
          </h1>
          <p className="text-lg md:text-2xl text-[#6b5a42] max-w-lg mx-auto leading-relaxed">
            把小学数学，<br className="hidden sm:inline" />拼成一本会发光的绘本
          </p>
          <p className="mt-3 md:mt-4 text-sm md:text-base text-[#9c8663]">
            {gradeLabel} · {data.textbook}
          </p>

          {/* Overall stats */}
          <div className="flex justify-center gap-6 md:gap-10 mt-6 md:mt-8">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-light text-[#5c4732] tabular-nums">{total}</div>
              <div className="text-xs text-[#a38d6e]">章节</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-light text-[#5c4732] tabular-nums">{unlocked}</div>
              <div className="text-xs text-[#a38d6e]">已解锁</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-light text-[#5c4732] tabular-nums">{avgProgress}%</div>
              <div className="text-xs text-[#a38d6e]">平均掌握度</div>
            </div>
          </div>
        </motion.div>

        {/* Chapter grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {data.chapters.map((chapter, index) => (
            <ChapterCard
              key={chapter.id}
              chapter={chapter}
              index={index}
              gradeLabel={gradeLabel}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-[#a38d6e] text-xs md:text-sm py-10 md:py-16 border-t border-[#e8d5b8]">
        {data.description} · {data.version} · 数据驱动 · 欢迎一起继续完善这本数学绘本
      </div>
    </div>
  );
}
