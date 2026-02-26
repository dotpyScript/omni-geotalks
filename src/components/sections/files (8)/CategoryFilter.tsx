'use client';

import { motion } from 'framer-motion';
import { CATEGORIES } from '@/components/sections/webinerDiscovery/data';
// import type { Category } from '@/components/sections/webinerDiscovery/types';

interface CategoryFilterProps {
  activeCategory: string;
  counts: Record<string, number>;
  onChange: (id: string) => void;
}

export function CategoryFilter({
  activeCategory,
  counts,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className='flex items-center gap-2.5 flex-wrap'>
      {CATEGORIES.map((cat, i) => {
        const isActive = activeCategory === cat.id;
        const count = counts[cat.id] ?? 0;

        return (
          <motion.button
            key={cat.id}
            type='button'
            onClick={() => onChange(cat.id)}
            className={[
              'relative inline-flex items-center gap-2',
              'text-[0.68rem] tracking-[0.14em] uppercase',
              "font-['DM_Sans',sans-serif]",
              'px-4 py-2.5 border cursor-pointer',
              'transition-all duration-[250ms] ease-out whitespace-nowrap',
              'clip-bevel-xs',
              isActive
                ? [
                    'border-[#c9a84c] text-[#e8c97e]',
                    'bg-gradient-to-br from-[rgba(201,168,76,0.16)] to-[rgba(201,168,76,0.06)]',
                    'shadow-[0_0_22px_rgba(201,168,76,0.12),inset_0_1px_0_rgba(201,168,76,0.1)]',
                  ].join(' ')
                : [
                    'border-[rgba(201,168,76,0.12)] text-[rgba(240,237,230,0.45)]',
                    'bg-transparent',
                    'hover:border-[rgba(201,168,76,0.28)] hover:text-[#f0ede6]',
                    'hover:bg-[rgba(201,168,76,0.05)]',
                  ].join(' '),
            ].join(' ')}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: i * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Active indicator */}
            {isActive && (
              <motion.span
                className='w-[5px] h-[5px] rounded-full bg-[#c9a84c]'
                layoutId='categoryDot'
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              />
            )}

            {cat.label}

            {/* Count badge */}
            <span
              className={[
                'text-[0.56rem] leading-none px-1.5 py-0.5 rounded-sm transition-all duration-250',
                isActive
                  ? 'bg-[rgba(201,168,76,0.2)] text-[#c9a84c]'
                  : 'bg-[rgba(240,237,230,0.06)] text-[rgba(240,237,230,0.25)]',
              ].join(' ')}
            >
              {count}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
