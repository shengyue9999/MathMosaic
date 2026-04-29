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
    <div className="min-h-screen bg-[#f8f2e9]">
      {/* 顶部装饰条 */}
      <div className="h-3 bg-gradient-to-r from-[#d4b8a0] via-[#e8d5b8] to-[#d4b8a0]"></div>

      <div className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="mx-auto mb-6 inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-inner text-5xl">
            📖
          </div>
          <h1 className="title-font text-6xl md:text-7xl text-[#3f2e1e] tracking-tighter mb-4">
            数绘
          </h1>
          <p className="text-2xl text-[#6b5a42] max-w-md mx-auto leading-relaxed">
            把小学数学，<br />拼成一本会发光的绘本
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chapters.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.065 }}
            >
              <Link href={chapter.unlocked ? `/mosaic/${chapter.id}` : '#'}>
                <div className={`dream-paper dream-card p-9 h-full flex flex-col relative ${chapter.unlocked ? 'glow' : 'grayscale-[30%]'}`}>
                  <div className="flex gap-6">
                    <div className="text-6xl drop-shadow-sm transition-transform hover:scale-110">{chapter.emoji}</div>
                    
                    <div className="flex-1">
                      <div className="text-xs uppercase tracking-[2px] text-[#9c8663] mb-2">六年级下册 · 第{chapter.id.slice(2)}章</div>
                      <h3 className="title-font text-2xl leading-tight text-[#3f2e1e] pr-4">
                        {chapter.title}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-auto pt-10">
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-[#8b6f47]">掌握度</span>
                      <span className="font-light text-4xl text-[#5c4732] tabular-nums">{chapter.progress}</span>
                    </div>
                    
                    <div className="h-2.5 bg-[#e8d9c4] rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${chapter.progress}%`,
                          background: `linear-gradient(90deg, ${chapter.color}, #c8e6d4)`
                        }}
                      />
                    </div>
                  </div>

                  {!chapter.unlocked && (
                    <div className="absolute bottom-8 right-8 text-4xl opacity-20">🔒</div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

<div className="text-center text-[#a38d6e] text-sm py-12">
        数绘 v0.3 · 绘本风知识拼图 · 持续绘制中...
      </div>
    </div>
  );
}
