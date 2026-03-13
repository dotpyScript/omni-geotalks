'use client';

/**
 * SharePopup — portal-based share dropdown.
 * Renders into document.body via createPortal so it's never clipped
 * by parent overflow:hidden or a low z-index stacking context.
 *
 * Usage:
 *   const btnRef = useRef<HTMLButtonElement>(null);
 *   const [open, setOpen] = useState(false);
 *   ...
 *   <button ref={btnRef} onClick={() => setOpen(v => !v)}>Share</button>
 *   {open && <SharePopup url={...} title={...} anchorRef={btnRef} onClose={() => setOpen(false)} />}
 */

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

interface SharePopupProps {
  url: string;
  title: string;
  anchorRef: React.RefObject<HTMLElement | null>;
  onClose: () => void;
}

export function SharePopup({ url, title, anchorRef, onClose }: SharePopupProps) {
  if (typeof document === 'undefined') return null;

  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(`${title} — IEGS Webinars`);

  const platforms = [
    { label: 'Twitter / X',  icon: '𝕏',  href: `https://twitter.com/intent/tweet?url=${encoded}&text=${text}` },
    { label: 'LinkedIn',     icon: 'in', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}` },
    { label: 'WhatsApp',     icon: '💬', href: `https://wa.me/?text=${text}%20${encoded}` },
    { label: 'Facebook',     icon: 'f',  href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}` },
  ];

  // Position: fixed coordinates derived from the anchor button's viewport rect
  const rect = anchorRef.current?.getBoundingClientRect();
  const top = rect ? rect.bottom + 8 : 80;
  const right = rect ? window.innerWidth - rect.right : 16;

  // Close on Escape
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return createPortal(
    <>
      {/* Backdrop */}
      <div className='fixed inset-0 z-[9998]' onClick={onClose} />

      {/* Dropdown */}
      <motion.div
        initial={{ opacity: 0, y: 6, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.15 }}
        className='fixed z-[9999] min-w-[200px] overflow-hidden'
        style={{
          top,
          right,
          background: 'var(--obsidian-3)',
          border: '1px solid var(--border-mid)',
          boxShadow: '0 16px 40px rgba(0,0,0,0.45)',
        }}
      >
        <p
          className='px-4 py-2.5 text-[0.56rem] tracking-[0.2em] uppercase'
          style={{ color: 'var(--ivory-muted)', borderBottom: '1px solid var(--border)' }}
        >
          Share via
        </p>
        {platforms.map((p) => (
          <a
            key={p.label}
            href={p.href}
            target='_blank'
            rel='noopener noreferrer'
            onClick={onClose}
            className='flex items-center gap-3 px-4 py-3 transition-colors duration-150'
            style={{ color: 'var(--ivory-dim)' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'var(--obsidian-4)';
              (e.currentTarget as HTMLElement).style.color = 'var(--ivory)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.color = 'var(--ivory-dim)';
            }}
          >
            <span
              className='w-7 h-7 rounded-full flex items-center justify-center text-[0.62rem] font-bold shrink-0'
              style={{ background: 'var(--gold-dim)', color: 'var(--gold-light)', border: '1px solid var(--border)' }}
            >
              {p.icon}
            </span>
            <span className='text-[0.72rem]'>{p.label}</span>
          </a>
        ))}
      </motion.div>
    </>,
    document.body
  );
}
