import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f8f1e7] flex items-center justify-center">
      <div className="h-3 bg-gradient-to-r from-[#d4b8a0] via-[#e8d5b8] to-[#d4b8a0] fixed top-0 left-0 right-0" />
      <div className="text-center px-6">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="title-font text-4xl text-[#3f2e1e] mb-3">找不到这一页</h1>
        <p className="text-[#8b6f47] mb-8">这节拼图可能还没被画出来…</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#a8d5ba] text-[#2d4a35] rounded-full font-medium hover:bg-[#8fc5a3] transition-colors"
        >
          📖 回到绘本首页
        </Link>
      </div>
    </div>
  );
}
