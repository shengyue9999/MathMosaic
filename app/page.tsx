'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { GradeData, Chapter } from '../lib/types';
import { loadGradeData } from '../lib/yamlLoader';

export default function Home() {
  const [data, setData] = useState<GradeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGradeData('grade6-2')
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f1e7] flex items-center justify-center">
        <div className="text-2xl text-[#8b6f47]">正在绘制绘本...</div>
      </div>
    );
  }

  if (!data) {
    return <div>加载失败</div>;
  }

  return (
    <div className="min-h-screen bg-[#f8f1e7]">
      {/* 顶部装饰 */}
      <div className="h-3 bg-gradient-to-r from-[#d4b8a0] via-[#e8d5b8] to-[#d4b8a0]"></div>

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="mx-auto mb-8 inline-flex items-center justify-center w-24 h-24 bg-white/80 rounded-3xl shadow-inner text-6xl border border-[#e8d5b8]">
            📖
          </div>
          <h1 className="title-font text-7xl text-[#3f2e1e] tracking-tighter mb-4">
            数绘
          </h1>
          <p className="text-2xl text-[#6b5a42] max-w-lg mx-auto leading-relaxed">
            把小学数学，<br />拼成一本会发光的绘本
          </p>
          <p className="mt-4 text-[#9c8663]">{data.grade} {data.semester} · {data.textbook}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.chapters.map((chapter: Chapter, index: number) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.7 }}
            >
              <Link href={chapter.unlocked ? `/mosaic/${chapter.id}` : '#'}>
                <div className={`dream-paper dream-card p-10 h-full flex flex-col relative group ${chapter.unlocked ? 'glow cursor-pointer' : 'grayscale-[40%]'}`}>
                  <div className="flex gap-6 mb-10">
                    <div className="text-7xl drop-shadow-sm transition-transform group-hover:scale-110">
                      {chapter.emoji}
                    </div>
                    
                    <div className="flex-1">
                      <div className="text-xs uppercase tracking-widest text-[#9c8663] mb-2">
                        {data.grade}{data.semester} · 第{chapter.id.slice(2)}章
                      </div>
                      <h3 className="title-font text-[28px] leading-tight text-[#3f2e1e]">
                        {chapter.title}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="flex justify-between items-baseline mb-4">
                      <span className="text-sm text-[#8b6f47]">掌握度</span>
                      <span className="text-5xl font-light text-[#5c4732] tabular-nums">{chapter.progress}</span>
                    </div>
                    
                    <div className="h-3 bg-[#e8d9c4] rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${chapter.progress}%`,
background: `linear-gradient(90deg, ${chapter.color}, #d4f0e0)`
                        }}
                      />
                    </div>
                  </div>

                  {!chapter.unlocked && (
                    <div className="absolute top-10 right-10 text-5xl opacity-25">🔒</div>
                  )}

                  {chapter.unlocked && (
                    <div className="absolute bottom-8 right-8 text-xs bg-white/70 px-3 py-1 rounded-full text-[#5c4732] shadow-sm">
                      点击进入绘本
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="text-center text-[#a38d6e] text-sm py-16 border-t border-[#e8d5b8]">
        数绘 v0.5 · 数据驱动 · 欢迎一起继续完善这本数学绘本
      </div>
    </div>
  );
}
