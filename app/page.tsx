'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const chapters = [
  { id: 'ch1', title: '分数的意义和性质', emoji: '🍭', color: '#a8d5ba', progress: 78, unlocked: true },
  { id: 'ch2', title: '分数加法和减法', emoji: '🍪', color: '#f4c2c2', progress: 35, unlocked: false },
  { id: 'ch3', title: '分数乘法和除法', emoji: '🌈', color: '#b8d4f0', progress: 15, unlocked: false },
  { id: 'ch4', title: '圆', emoji: '⭕️', color: '#f7d9a8', progress: 22, unlocked: false },
  { id: 'ch5', title: '百分数', emoji: '%', color: '#e8b4d8', progress: 18, unlocked: false },
  { id: 'ch6', title: '统计', emoji: '📊', color: '#9ed8c8', progress: 45, unlocked: true },
  { id: 'ch7', title: '数学广角', emoji: '🧠', color: '#d4b8f0', progress: 8, unlocked: false },
  { id: 'ch8', title: '整理和复习', emoji: '📚', color: '#f0c8a8', progress: 0, unlocked: false },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f1e7]">
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
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {chapters.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.7 }}
            >
              <Link href={chapter.unlocked ? `/mosaic/${chapter.id}` : '#'}>
                <div className={`dream-paper dream-card p-10 h-full flex flex-col relative ${chapter.unlocked ? 'glow' : 'grayscale-[40%]'}`}>
                  <div className="flex gap-6 mb-8">
                    <div className="text-7xl drop-shadow-sm">{chapter.emoji}</div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-[#9c8663] mb-2">六年级下册 · 第{chapter.id.slice(2)}章</div>
                      <h3 className="title-font text-[28px] leading-[1.15] text-[#3f2e1e]">
                        {chapter.title}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="flex justify-between items-baseline mb-3">
                      <span className="text-sm text-[#8b6f47]">掌握度</span>
                      <span className="text-5xl font-light text-[#5c4732] tabular-nums leading-none">{chapter.progress}</span>
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
                    <div className="absolute top-10 right-10 text-5xl opacity-20">🔒</div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="text-center text-[#a38d6e] text-sm py-16">
        数绘 v0.4 · 欢迎一起继续绘制这本数学绘本
      </div>
</div>
  );
}
