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
    <div className="min-h-screen bg-[#f9f5f0] pb-20">
      {/* 标题栏 */}
      <div className="text-center py-12 px-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-[#3f2e1e] mb-3 tracking-wide"
        >
          数绘
        </motion.h1>
        <p className="text-xl text-[#6b5a42] max-w-md mx-auto">
          把小学数学，拼成一本会发光的绘本
        </p>
      </div>

      {/* 知识地图 */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chapters.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Link href={chapter.unlocked ? `/mosaic/${chapter.id}` : '#'}>
                <div className={`dream-paper dream-card rounded-3xl p-8 h-full flex flex-col relative overflow-hidden
                  ${chapter.unlocked ? 'cursor-pointer hover:shadow-2xl' : 'opacity-60 grayscale'}`}
                  style={{ borderColor: chapter.color + '88' }}
                >
                  {/* 发光效果 */}
                  {chapter.unlocked && chapter.progress > 60 && (
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/30 rounded-full blur-3xl"></div>
                  )}

                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-5xl">{chapter.emoji}</div>
                    <div>
                      <div className="text-sm text-[#8b6f47] font-medium">第 {chapter.id.slice(2)} 章</div>
                      <h3 className="text-2xl font-semibold text-[#3f2e1e] leading-tight">
                        {chapter.title}
                      </h3>
                    </div>
                  </div>

                  {/* 进度环 */}
                  <div className="mt-auto flex items-center gap-4">
                    <div className="relative w-16 h-16">
                      <svg className="w-16 h-16 -rotate-12" viewBox="0 0 42 42">
                        <circle cx="21" cy="21" r="15" fill="none" stroke="#e8d5b8" strokeWidth="6"/>
                        <circle 
                          cx="21" 
                          cy="21" 
                          r="15" 
                          fill="none" 
                          stroke={chapter.color} 
                          strokeWidth="6"
                          strokeDasharray={`${chapter.progress} 100`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#3f2e1e]">
