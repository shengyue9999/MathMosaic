'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Chapter } from '../lib/types';
import { getDifficultyLabel } from '../lib/types';
import { useProgressStore } from '../lib/store';

interface ChapterCardProps {
  chapter: Chapter;
  index: number;
  gradeLabel: string;
}

export default function ChapterCard({ chapter, index, gradeLabel }: ChapterCardProps) {
  const { getProgress, isUnlocked } = useProgressStore();
  const progress = getProgress(chapter.id, chapter.progress);
  const unlocked = isUnlocked(chapter.id, chapter.unlocked);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.7 }}
    >
      <Link href={unlocked ? `/mosaic/${chapter.id}` : '#'} aria-label={`${chapter.title} — ${unlocked ? '点击进入' : '尚未解锁'}`}>
        <div
          className={`
            dream-paper dream-card p-8 md:p-10 h-full flex flex-col relative group
            ${unlocked ? 'glow cursor-pointer' : 'grayscale-[40%] cursor-default'}
          `}
          role="article"
          aria-labelledby={`chapter-title-${chapter.id}`}
        >
          {/* Header: emoji + title */}
          <div className="flex gap-5 mb-8">
            <div className="text-6xl md:text-7xl drop-shadow-sm transition-transform group-hover:scale-110">
              {chapter.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs uppercase tracking-widest text-[#9c8663] mb-1">
                {gradeLabel} · 第{chapter.id.slice(2)}章
              </div>
              <h3
                id={`chapter-title-${chapter.id}`}
                className="title-font text-xl md:text-[28px] leading-tight text-[#3f2e1e] truncate"
              >
                {chapter.title}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/60 text-[#8b6f47] border border-[#e8d9c4]">
                  {getDifficultyLabel(chapter.difficulty)}
                </span>
                <span className="text-xs text-[#a38d6e]">
                  难度 {'⭐'.repeat(Math.min(chapter.difficulty, 5))}
                </span>
              </div>
            </div>
          </div>

          {/* Progress section */}
          <div className="mt-auto">
            <div className="flex justify-between items-baseline mb-3">
              <span className="text-sm text-[#8b6f47]">掌握度</span>
              <span className="text-4xl md:text-5xl font-light text-[#5c4732] tabular-nums">
                {progress}
                <span className="text-lg text-[#a38d6e]">%</span>
              </span>
            </div>

            <div className="h-3 bg-[#e8d9c4] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: index * 0.08 + 0.3 }}
                style={{
                  background: `linear-gradient(90deg, ${chapter.color}, #d4f0e0)`,
                }}
              />
            </div>
          </div>

          {/* Lock / enter hint */}
          {!unlocked && (
            <div className="absolute top-8 right-8 text-4xl opacity-25 select-none">🔒</div>
          )}

          {unlocked && (
            <div className="absolute bottom-6 right-6 text-xs bg-white/70 px-3 py-1.5 rounded-full text-[#5c4732] shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
              点击进入绘本 →
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
