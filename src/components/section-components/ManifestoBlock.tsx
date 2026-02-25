'use client';

import { useInView } from './useInView';
import { MANIFESTO_LINES } from './data';

// ─── ManifestoBlock ────────────────────────────────────────────────────────────
// Renders the mission manifesto in large Cormorant Garamond italic.
// Each word fades and slides up with a staggered delay when scrolled into view.

interface ManifestoBlockProps {
  lines?: string[];
}

export function ManifestoBlock({
  lines = MANIFESTO_LINES,
}: ManifestoBlockProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.15 });

  // Split all lines into words, track global word index for delay
  const allWords = lines.flatMap((line, li) =>
    line.split(' ').map((word, wi) => ({ word, li, wi, key: `${li}-${wi}` })),
  );

  let globalIndex = 0;

  return (
    <div ref={ref} className='relative'>
      {/* Gold left accent bar */}
      <div
        className={[
          'absolute -left-6 top-0 bottom-0 w-[2px]',
          'bg-gradient-to-b from-[#c9a84c] via-[rgba(201,168,76,0.4)] to-transparent',
          'transition-[transform] duration-700 origin-top',
          inView ? 'scale-y-100' : 'scale-y-0',
        ].join(' ')}
        aria-hidden='true'
      />

      {lines.map((line, li) => {
        const words = line.split(' ');
        return (
          <p
            key={li}
            className={[
              "font-['Cormorant_Garamond',serif] italic font-light leading-[1.25]",
              'text-[clamp(1.5rem,3vw,2.4rem)]',
              li === 0 || li === lines.length - 1
                ? 'text-[#f0ede6]'
                : 'text-[rgba(240,237,230,0.7)]',
              li < lines.length - 1 ? 'mb-1' : '',
            ].join(' ')}
          >
            {words.map((word) => {
              const delay = globalIndex++ * 60;
              return (
                <span
                  key={`${li}-${word}-${delay}`}
                  className='inline-block mr-[0.28em]'
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(14px)',
                    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
                  }}
                >
                  {word}
                </span>
              );
            })}
          </p>
        );
      })}

      {/* Attribution */}
      <div
        className={[
          'mt-6 flex items-center gap-3',
          'transition-[opacity,transform] duration-700 delay-[800ms]',
          inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4',
        ].join(' ')}
      >
        <span
          className='w-8 h-px bg-gradient-to-r from-[#c9a84c] to-transparent'
          aria-hidden='true'
        />
        <span className='text-[0.65rem] tracking-[0.3em] uppercase text-[#c9a84c]'>
          IEGS Mission Statement
        </span>
      </div>
    </div>
  );
}
