'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Chapter, SECTION_LABELS, getStrengthLabel, getDifficultyLabel } from '../lib/types';
import { useProgressStore } from '../lib/store';

interface MosaicDetailProps {
  chapter: Chapter;
  allChapters: Chapter[];
}

export default function MosaicDetail({ chapter, allChapters }: MosaicDetailProps) {
  const { getProgress, isUnlocked, setProgress } = useProgressStore();
  const progress = getProgress(chapter.id, chapter.progress);

  // Resolve connection targets
  const resolvedConnections = useMemo(() => {
    return chapter.connections
      .map(conn => {
        const target = allChapters.find(ch => ch.id === conn.target);
        if (!target) return null;
        return { ...conn, targetChapter: target };
      })
      .filter(Boolean);
  }, [chapter.connections, allChapters]);

  // Group sections by type
  const sectionGroups = useMemo(() => {
    const order: Array<Chapter['sections'][0]['type']> = ['basics', 'formulas', 'mistakes', 'examples'];
    return order
      .map(type => {
        const sections = chapter.sections.filter(s => s.type === type);
        return sections.length > 0 ? { type, sections, meta: SECTION_LABELS[type] } : null;
      })
      .filter(Boolean);
  }, [chapter.sections]);

  return (
    <div className="min-h-screen bg-[#f8f1e7]">
      <div className="h-3 bg-gradient-to-r from-[#d4b8a0] via-[#e8d5b8] to-[#d4b8a0]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 md:pt-12 pb-16">
        {/* Back button */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#8b6f47] hover:text-[#5c4732] transition-colors"
          >
            ← 返回目录
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-7xl md:text-8xl mb-4">{chapter.emoji}</div>
          <h1 className="title-font text-4xl md:text-5xl text-[#3f2e1e] mb-3">
            {chapter.title}
          </h1>
          <div className="flex items-center justify-center gap-3 text-sm text-[#9c8663]">
            <span className="px-2 py-0.5 rounded-full bg-white/60 border border-[#e8d9c4]">
              {getDifficultyLabel(chapter.difficulty)}
            </span>
            <span>掌握度 {progress}%</span>
          </div>
        </motion.div>

        {/* Progress bar (interactive) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="dream-paper p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-[#8b6f47]">学习进度</span>
            <span className="text-3xl font-light text-[#5c4732] tabular-nums">{progress}%</span>
          </div>
          <div className="h-4 bg-[#e8d9c4] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{ background: `linear-gradient(90deg, ${chapter.color}, #d4f0e0)` }}
            />
          </div>
          <div className="flex gap-2 mt-4 justify-end">
            {[25, 50, 75, 100].map(val => (
              <button
                key={val}
                onClick={() => setProgress(chapter.id, val)}
                className="text-xs px-3 py-1.5 rounded-full bg-white/70 border border-[#e8d9c4] text-[#8b6f47] hover:bg-[#a8d5ba]/30 transition-colors"
              >
                {val}%
              </button>
            ))}
          </div>
        </motion.div>

        {/* Prerequisites */}
        {chapter.prerequisites.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-8"
          >
            <h3 className="text-sm text-[#9c8663] mb-3">📌 前置知识</h3>
            <div className="flex flex-wrap gap-3">
              {chapter.prerequisites.map(preId => {
                const pre = allChapters.find(ch => ch.id === preId);
                if (!pre) return null;
                return (
                  <Link
                    key={preId}
                    href={`/mosaic/${preId}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 rounded-xl border border-[#e8d9c4] hover:shadow-md transition-shadow text-sm text-[#5c4732]"
                  >
                    <span>{pre.emoji}</span>
                    <span>{pre.title}</span>
                    <span className="text-xs text-[#a38d6e]">{getProgress(preId, pre.progress)}%</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Knowledge sections */}
        <div className="space-y-6">
          {sectionGroups.map((group, gi) => group && (
            <motion.div
              key={group.type}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + gi * 0.1 }}
              className="dream-paper p-6 md:p-8"
            >
              <h2 className="title-font text-xl md:text-2xl text-[#3f2e1e] mb-4">
                {group.meta.icon} {group.meta.label}
              </h2>
              {group.sections.map((section, si) => (
                <div key={si} className="mb-4 last:mb-0">
                  {section.title !== group.meta.label && (
                    <h3 className="text-sm font-medium text-[#8b6f47] mb-2">{section.title}</h3>
                  )}
                  {section.items.length > 0 ? (
                    <ul className="space-y-2">
                      {section.items.map((item, ii) => (
                        <li
                          key={ii}
                          className="flex items-start gap-3 text-[#5c4732] leading-relaxed"
                        >
                          <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: chapter.color }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[#a38d6e] text-sm italic">暂无内容</p>
                  )}
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Knowledge connections */}
        {resolvedConnections.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <h3 className="text-sm text-[#9c8663] mb-3">🔗 知识关联</h3>
            <div className="space-y-3">
              {resolvedConnections.map((conn: any, i: number) => (
                <Link
                  key={i}
                  href={`/mosaic/${conn.targetChapter.id}`}
                  className="block dream-paper p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{conn.targetChapter.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[#3f2e1e] truncate">
                        {conn.targetChapter.title}
                      </div>
                      <div className="text-xs text-[#8b6f47]">{conn.reason}</div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      conn.strength === 'strong' ? 'bg-[#a8d5ba]/30 text-[#2d4a35]' :
                      conn.strength === 'medium' ? 'bg-[#f7d9a8]/30 text-[#8b6f47]' :
                      'bg-[#e8d9c4]/30 text-[#a38d6e]'
                    }`}>
                      {getStrengthLabel(conn.strength)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
