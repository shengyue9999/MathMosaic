'use client';

import React from 'react';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export default function ErrorState({ title = '加载失败', message, onRetry }: ErrorStateProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="text-6xl mb-6">😵</div>
        <h2 className="title-font text-2xl text-[#3f2e1e] mb-3">{title}</h2>
        <p className="text-[#8b6f47] mb-8 leading-relaxed">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#a8d5ba] text-[#2d4a35] rounded-full font-medium hover:bg-[#8fc5a3] transition-colors shadow-sm"
          >
            🔄 重新加载
          </button>
        )}
      </div>
    </div>
  );
}
