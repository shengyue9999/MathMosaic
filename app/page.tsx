'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const chapters = [
  { id: 'ch1', title: '分数的意义和性质', emoji: '🍭', color: '#a8d5ba', progress: 75, unlocked: true },
  { id: 'ch2', title: '分数加法和减法', emoji: '🍪', color: '#f4c2c2', progress: 30, unlocked: false },
  { id: 'ch3', title: '分数乘法和除法', emoji: '🌈', color: '#b8d4f0', progress: 10, unlocked: false },
  { id: 'ch4', title: '圆', emoji: '⭕️', color: '#f7d9a8', progress: 20, unlocked: false },
  { id: 'ch5', title: '百分数', emoji: '%', color: '#e8b4d8', progress: 15, unlocked: false },
  { id: 'ch6', title: '统计', emoji: '📊', color: '#9ed8c8', progress: 25, unlocked: true },
  { id: 'ch7', title: '数学广角', emoji: '🧠', color: '#d4b8f0', progress: 5, unlocked: false },
  { id: 'ch8', title: '整理和复习', emoji: '📚', color: '#f0c8a8', progress: 0, unlocked: false },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f9f4eb] pb-20 overflow-hidden">
      {/* 顶部装饰 */}
      <div className="h-2 bg-gradient-to-r from-[#e8d5b8] via-[#c8b59a] to-[#e8d5b8]"></div>

      {/* 标题区 */}
      <div className="text-center pt-16 pb-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="inline-block px-8 py-2 bg-white/70 rounded-3xl mb-6 shadow-inner">
            <span className="text-4xl">📖</span>
          </div>
          <h1 className="title-font text-6xl text-[#3f2e1e] tracking-tight mb-4">
            数绘
          </h1>
          <p className="text-2xl text-[#6b5a42] max-w-lg mx-auto leading-relaxed">
            把小学数学，<br />拼成一本会发光的绘本
          </p>
        </motion.div>
      </div>

      {/* 知识拼图地图 */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chapters.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.07, duration: 0.6 }}
            >
              <Link href={chapter.unlocked ? `/mosaic/${chapter.id}` : '#'}>
                <div 
                  className={`dream-paper dream-card p-8 h-full flex flex-col relative
                    ${chapter.unlocked ? 'cursor-pointer glow' : 'grayscale opacity-75'}`}
                  style={{ 
                    borderColor: chapter.color + '99',
                    background: 'linear-gradient(135deg, #fffdf4 0%, #fef9eb 100%)'
                  }}
                >
                  <div className="flex items-start gap-5">
                    <div className="text-6xl drop-shadow-sm">{chapter.emoji}</div>
                    <div className="flex-1 pt-2">
                      <div className="text-xs tracking-widest text-[#8b6f47] mb-1">第六册 · 第{chapter.id.slice(2)}章</div>
                      <h3 className="title-font text-2xl leading-tight text-[#3f2e1e] pr-6">
                        {chapter.title}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-auto pt-8 flex items-center gap-4">
                    <div className="flex-1 h-2.5 bg-[#e8d5b8] rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-700"
                        style={{ 
                          width: `${chapter.progress}%`,
                          background: `linear-gradient(to right, ${chapter.color}, #c8e6d4)`
                        }}
                      />
                    </div>
                    <div className="text-right w-12">
                      <span className="text-3xl font-light text-[#6b5a42]">{chapter.progress}</span>
                      <span className="text-xs text-[#8b6f47]">%</span>
                    </div>
                  </div>

