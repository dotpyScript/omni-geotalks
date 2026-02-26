'use client';

import { useInView } from './useInView';
import { ManifestoBlock } from './ManifestoBlock';
// import { GeoMapDecoration } from './GeoMapDecoration';

// ─── AboutHero ─────────────────────────────────────────────────────────────────
// The dramatic top split of the About section:
//   LEFT  — eyebrow + large Cormorant title + manifesto quote
//   RIGHT — holographic GeoMap decoration + floating identity block

export function AboutHero() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={[
        'relative grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-0',
        'min-h-[600px]',
      ].join(' ')}
    >
      {/* ── LEFT PANEL ──────────────────────────────────────────────────── */}
      <div
        className={[
          'relative z-[2] flex flex-col justify-center',
          'px-[60px] py-20',
          // 'border-r border-[rgba(201,168,76,0.14)] max-lg:border-r-0 max-lg:border-b',
          'max-md:px-6 max-md:py-14',
        ].join(' ')}
      >
        {/* Eyebrow */}
        <div
          className={[
            'flex items-center gap-[14px] mb-6',
            'transition-[opacity,transform] duration-700',
            inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6',
          ].join(' ')}
        >
          <span
            aria-hidden='true'
            className='w-8 h-px bg-gradient-to-r from-transparent to-[#c9a84c]'
          />
          <span className='text-[0.68rem] tracking-[0.35em] uppercase text-[#c9a84c]'>
            Who We Are
          </span>
        </div>

        {/* Main title — large, asymmetric */}
        <div
          className={[
            'mb-10',
            'transition-[opacity,transform] duration-700 delay-100',
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          ].join(' ')}
        >
          <h2
            className={[
              "font-['Cormorant_Garamond',serif] font-light leading-[1.06]",
              'text-[#f0ede6]',
              // clamp(2.4rem, 4vw, 3.8rem)
              'text-[clamp(2.4rem,4vw,3.8rem)]',
              // Italic parts styled gold via [&_em] selector
              '[&_em]:italic [&_em]:text-[#e8c97e] [&_em]:not-italic',
            ].join(' ')}
          >
            The <em>Intelligence Hub</em> for Africa’s Geospatial Renaissance.
          </h2>
          {/* <h2
            className={[
              "font-['Cormorant_Garamond',serif] font-light leading-[1.0]",
              'text-[clamp(3rem,6vw,5.5rem)]',
              'text-[rgba(240,237,230,0.6)]',
            ].join(' ')}
          >
            Intelligence Hub.
          </h2> */}
        </div>

        {/* Short intro paragraph */}
        <p
          className={[
            'text-[0.85rem] leading-[1.75] text-[rgba(240,237,230,0.55)] font-light',
            'max-w-[420px] mb-12',
            'transition-[opacity,transform] duration-700 delay-200',
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
          ].join(' ')}
        >
          The Institute for Emerging Geospatial Sciences (IEGS) is a pan-African
          knowledge platform connecting practitioners, governments, energy
          companies and academic institutions through world-class webinar
          education — built for Africa, by Africans.
        </p>
      </div>

      {/* ── RIGHT PANEL ─────────────────────────────────────────────────── */}
      <div
        className={[
          'relative flex flex-col justify-center items-center',
          'bg-gradient-to-br from-[#0d1118] to-[#080a0f]',
          'overflow-hidden min-h-[460px]',
          // 'px-[70px] py-20',
          // 'border-r border-[rgba(201,168,76,0.14)] max-lg:border-r-0 max-lg:border-b',
          // 'max-md:px-6 max-md:py-14',
          'transition-[opacity] duration-1000 delay-200',
          inView ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      >
        {/* Large faint "IEGS" word mark */}
        <div
          aria-hidden='true'
          className='absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none'
        >
          <span
            className={[
              "font-['Bebas_Neue',sans-serif]",
              'text-[clamp(8rem,18vw,16rem)] leading-none tracking-[0.1em]',
              'text-[rgba(201,168,76,0.025)]',
              'select-none',
              'transition-[transform] duration-[2000ms] ease-out delay-400',
              inView ? 'translate-y-0' : 'translate-y-10',
            ].join(' ')}
          >
            IEGS
          </span>
        </div>

        {/* Geo map SVG */}
        {/* <div className="absolute inset-6 z-[1]">
          <GeoMapDecoration className="w-full h-full" />
        </div> */}

        {/* Manifesto block */}
        <div
          className={[
            'pl-6',
            'transition-[opacity] duration-700 delay-300',
            inView ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
        >
          <ManifestoBlock />
        </div>

        {/* Floating identity card — bottom */}
        {/* <div className='relative z-[3] mt-auto p-8 max-md:p-5'>
          <div
            className={[
              'border border-[rgba(201,168,76,0.2)] bg-[rgba(8,10,15,0.75)]',
              'backdrop-blur-[12px] p-6',
              'transition-[opacity,transform] duration-700 delay-500',
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
            ].join(' ')}
          > */}
        {/* Tag row */}
        {/* <div className='flex flex-wrap gap-2 mb-4'>
              {['AI-Powered', 'Digital Twin', 'Pan-African', 'Expert-Led'].map(
                (tag) => (
                  <span
                    key={tag}
                    className={[
                      'text-[0.58rem] tracking-[0.2em] uppercase',
                      'px-[10px] py-[4px]',
                      'border border-[rgba(201,168,76,0.22)]',
                      'text-[rgba(240,237,230,0.45)] bg-[rgba(201,168,76,0.06)]',
                    ].join(' ')}
                  >
                    {tag}
                  </span>
                ),
              )}
            </div> */}

        {/* Coordinate readout */}
        {/* <div className='flex items-center justify-between'>
              <div>
                <div className="font-['Bebas_Neue',sans-serif] text-[1.4rem] tracking-[0.08em] text-[#e8c97e] leading-none">
                  IEGS HQ
                </div>
                <div className='text-[0.65rem] tracking-[0.15em] uppercase text-[rgba(240,237,230,0.28)] mt-1'>
                  Port Harcourt · Nigeria
                </div>
              </div>
              <div className='text-right'>
                <div className="font-['DM_Sans',sans-serif] text-[0.62rem] tracking-[0.08em] text-[rgba(240,237,230,0.28)]">
                  4.8156°N · 7.0498°E
                </div>
                <div className='flex items-center gap-1.5 justify-end mt-1'>
                  <span
                    className='w-[6px] h-[6px] rounded-full bg-[#00e5a0] animate-ping absolute'
                    aria-hidden='true'
                  />
                  <span
                    className='w-[6px] h-[6px] rounded-full bg-[#00e5a0] relative'
                    aria-hidden='true'
                  />
                  <span className='text-[0.6rem] tracking-[0.15em] uppercase text-[#00e5a0]'>
                    Active
                  </span>
                </div>
              </div>
            </div> */}
        {/* </div> */}
        {/* </div> */}

        {/* Ambient gold glow */}
        <div
          aria-hidden='true'
          className='absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[400px] h-[400px] rounded-full pointer-events-none
            bg-[radial-gradient(ellipse,rgba(201,168,76,0.07)_0%,transparent_65%)]'
        />
      </div>
    </div>
  );
}
