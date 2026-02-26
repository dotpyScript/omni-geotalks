'use client';

import type { NavLink, ContactItem } from '@/components/types/types';

// ─── Shared column heading with gold rule ─────────────────────────────────────
function ColHeading({ title }: { title: string }) {
  return (
    /*
     * .footer-col__heading — tiny caps label + gradient rule line
     * ::after rule replicated as a sibling span.
     */
    <div className='flex items-center gap-[10px] text-[0.62rem] tracking-[0.3em] uppercase text-gold mb-6'>
      <span>{title}</span>
      <span
        className='flex-1 h-px'
        style={{
          background: 'linear-gradient(90deg, var(--border), transparent)',
        }}
      />
    </div>
  );
}

// ─── Nav link list (.footer-nav) ─────────────────────────────────────────────
function NavList({ links }: { links: NavLink[] }) {
  return (
    <ul className='list-none flex flex-col gap-3'>
      {links.map((l) => (
        /*
         * .footer-nav li a — hover: ivory, +6px left-pad, gold › arrow appears
         * The ::before › chevron is replaced with an explicit span.
         */
        <li key={l.label}>
          <a
            href={l.href}
            className={[
              'group/link',
              'inline-flex items-center gap-2',
              'text-[0.78rem] text-ivory-muted font-light tracking-[0.03em] no-underline',
              'transition-[color,padding-left] duration-[250ms]',
              'hover:text-ivory hover:pl-[6px]',
            ].join(' ')}
          >
            {/* › arrow — invisible by default, appears on hover */}
            <span className='text-gold text-[0.9rem] opacity-0 transition-opacity duration-200 group-hover/link:opacity-100'>
              ›
            </span>
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

// ─── Contact list (.footer-contact) ─────────────────────────────────────────
function ContactList({ items }: { items: ContactItem[] }) {
  return (
    <ul className='list-none flex flex-col gap-4'>
      {items.map((item, i) => (
        <li
          key={i}
          className='flex items-start gap-3 text-[0.76rem] text-ivory-muted font-light leading-[1.5]'
        >
          <span className='text-gold text-[0.85rem] mt-[1px] flex-shrink-0'>
            {item.icon}
          </span>
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

// ─── Column wrapper ───────────────────────────────────────────────────────────
interface FooterNavColProps {
  heading: string;
  navLinks?: NavLink[];
  contactItems?: ContactItem[];
  isLast?: boolean;
}

export default function FooterNavCol({
  heading,
  navLinks,
  contactItems,
  isLast = false,
}: FooterNavColProps) {
  return (
    /*
     * .footer-col — 64px top/bottom, 40px sides, border-right
     * Last child has no border-right.
     * Mobile: border-right removed, border-bottom added (except last).
     */
    <div
      className={[
        'px-10 py-16',
        !isLast ? 'border-r border-border' : '',
        /* responsive */
        'max-[1100px]:border-r-0',
        !isLast
          ? 'max-md:border-r-0 max-md:border-b max-md:border-border max-md:px-6 max-md:py-10'
          : 'max-md:px-6 max-md:py-10',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <ColHeading title={heading} />
      {navLinks && <NavList links={navLinks} />}
      {contactItems && <ContactList items={contactItems} />}
    </div>
  );
}
