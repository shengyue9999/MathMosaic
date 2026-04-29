'use client';

import React from 'react';
import { motion } from 'framer-motion';

function SkeletonPulse({ className }: { className?: string }) {
  return (
    <div className={`bg-[#e8d9c4]/40 rounded-2xl animate-pulse ${className ?? ''}`} />
  );
}

export default function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
          className="dream-paper p-8 md:p-10"
        >
          <div className="flex gap-5 mb-8">
            <SkeletonPulse className="w-16 h-16 rounded-2xl" />
            <div className="flex-1 space-y-3">
              <SkeletonPulse className="h-3 w-20" />
              <SkeletonPulse className="h-6 w-3/4" />
              <SkeletonPulse className="h-4 w-1/2" />
            </div>
          </div>
          <div className="mt-auto space-y-3">
            <div className="flex justify-between">
              <SkeletonPulse className="h-4 w-16" />
              <SkeletonPulse className="h-10 w-14" />
            </div>
            <SkeletonPulse className="h-3 w-full rounded-full" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
