'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  User,
  Lock,
  AlertCircle,
  Globe,
  ArrowRight,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';

// ─── Auth constants ────────────────────────────────────────────────────────
const DUMMY_USERNAME = 'admin';
const DUMMY_PASSWORD = 'admin2025';
const AUTH_KEY = 'iegs-admin-auth';

// ─── Schema ───────────────────────────────────────────────────────────────
const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});
type LoginFormData = z.infer<typeof loginSchema>;

// ─── Corner bracket decoration ────────────────────────────────────────────
function ReticleCorner({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const posClass = {
    tl: 'top-0 left-0',
    tr: 'top-0 right-0 rotate-90',
    bl: 'bottom-0 left-0 -rotate-90',
    br: 'bottom-0 right-0 rotate-180',
  }[position];

  return (
    <span
      className={cn('absolute w-4 h-4 pointer-events-none', posClass)}
      style={{ color: 'var(--gold)' }}
    >
      <svg viewBox='0 0 16 16' fill='none' className='w-full h-full'>
        <path
          d='M1 7V1H7'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </span>
  );
}

// ─── Ambient orb ──────────────────────────────────────────────────────────
function AmbientOrb({
  color,
  className,
}: {
  color: 'navy' | 'teal';
  className?: string;
}) {
  const gradient =
    color === 'navy'
      ? 'radial-gradient(ellipse, rgba(24,61,110,0.45) 0%, transparent 70%)'
      : 'radial-gradient(ellipse, rgba(13,108,74,0.35) 0%, transparent 70%)';
  return (
    <div
      className={cn('absolute pointer-events-none', className)}
      style={{ background: gradient }}
    />
  );
}

// ─── Particle canvas (subtle) ─────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const COUNT = 28;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(50,97,149,0.4)';
        ctx.fill();
      });

      // Connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(50,97,149,${0.12 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className='absolute inset-0 w-full h-full pointer-events-none opacity-60'
    />
  );
}

// ─── Main component ────────────────────────────────────────────────────────
export default function LoginPage() {
  const router = useRouter();
  const [authError, setAuthError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // If already authenticated, redirect immediately
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      sessionStorage.getItem(AUTH_KEY) === 'true'
    ) {
      router.replace('/admin');
    }
  }, [router]);

  const onSubmit = async (data: LoginFormData) => {
    setAuthError('');
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 900));

    if (data.username === DUMMY_USERNAME && data.password === DUMMY_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      setIsSuccess(true);
      await new Promise((r) => setTimeout(r, 600));
      router.push('/admin');
    } else {
      setAuthError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div
      className='min-h-screen w-full flex relative overflow-hidden'
      style={{ background: 'var(--obsidian)' }}
    >
      {/* ── Particle canvas (full bg) */}
      <ParticleCanvas />

      {/* ── Blueprint grid */}
      <div
        className='absolute inset-0 pointer-events-none opacity-[0.04]'
        style={{
          backgroundImage: `
            linear-gradient(var(--border-mid) 1px, transparent 1px),
            linear-gradient(90deg, var(--border-mid) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Ambient orbs */}
      <AmbientOrb
        color='navy'
        className='w-[700px] h-[500px] -top-32 -left-24 blur-[100px]'
      />
      <AmbientOrb
        color='teal'
        className='w-[500px] h-[400px] bottom-0 right-0 blur-[120px]'
      />
      <AmbientOrb
        color='navy'
        className='w-[400px] h-[300px] bottom-1/3 left-1/3 blur-[90px] opacity-40'
      />

      {/* ── Scan line */}
      <motion.div
        className='absolute left-0 right-0 h-px pointer-events-none'
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, var(--gold) 50%, transparent 100%)',
          opacity: 0.06,
        }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      {/* ── Layout: centered container */}
      <div className='relative z-10 w-full flex items-center justify-center px-6 py-14'>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className='w-full max-w-[400px]'
        >
          {/* Logo — always visible */}
          <div className='flex items-center gap-3 mb-10'>
            <div
              className='w-8 h-8 flex items-center justify-center'
              style={{
                background:
                  'linear-gradient(135deg, var(--gold), var(--gold-light))',
                clipPath:
                  'polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))',
              }}
            >
              <Globe size={14} style={{ color: 'var(--obsidian)' }} />
            </div>
            <div>
              <p
                className='text-[0.58rem] tracking-[0.28em] uppercase'
                style={{
                  color: 'var(--gold)',
                  fontFamily: 'var(--font-bebas)',
                }}
              >
                IEGS
              </p>
              <p
                className='text-[0.56rem] tracking-[0.1em] uppercase'
                style={{
                  color: 'var(--ivory-muted)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Indepth Earth Geospatial Services
              </p>
            </div>
          </div>

          {/* Card */}
          <div
            className='relative p-8'
            style={{
              background:
                'linear-gradient(145deg, var(--obsidian-3) 0%, var(--obsidian-2) 100%)',
              border: '1px solid var(--border-mid)',
              clipPath:
                'polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))',
              boxShadow:
                '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(50,97,149,0.08) inset',
            }}
          >
            {/* Corner brackets */}
            <ReticleCorner position='tl' />
            <ReticleCorner position='tr' />
            <ReticleCorner position='bl' />
            <ReticleCorner position='br' />

            {/* Shield icon + header */}
            <div className='mb-8 text-center'>
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className='inline-flex items-center justify-center w-12 h-12 mb-5'
                style={{
                  background:
                    'linear-gradient(135deg, rgba(24,61,110,0.3) 0%, rgba(13,108,74,0.15) 100%)',
                  border: '1px solid var(--border-mid)',
                  clipPath:
                    'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                }}
              >
                <Shield size={20} style={{ color: 'var(--gold)' }} />
              </motion.div>

              {/* Eyebrow */}
              <p
                className='text-[0.58rem] tracking-[0.3em] uppercase mb-2'
                style={{
                  color: 'var(--teal-light)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Secure Access
              </p>

              <h2
                className='text-[1.55rem] font-light leading-tight'
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--ivory)',
                }}
              >
                Admin Sign In
              </h2>

              {/* Divider */}
              <div className='flex items-center gap-3 mt-4'>
                <div
                  className='flex-1 h-px'
                  style={{ background: 'var(--border)' }}
                />
                <div
                  className='w-1 h-1 rotate-45'
                  style={{ background: 'var(--gold)' }}
                />
                <div
                  className='flex-1 h-px'
                  style={{ background: 'var(--border)' }}
                />
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
              <Input
                label='Username'
                size='lg'
                leftIcon={User}
                placeholder='Enter your username'
                autoComplete='username'
                error={errors.username?.message}
                {...register('username')}
              />

              <Input
                label='Password'
                size='lg'
                type='password'
                leftIcon={Lock}
                placeholder='Enter your password'
                autoComplete='current-password'
                error={errors.password?.message}
                {...register('password')}
              />

              {/* Auth error */}
              <AnimatePresence>
                {authError && (
                  <motion.div
                    key='auth-error'
                    initial={{ opacity: 0, y: -6, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -6, height: 0 }}
                    transition={{ duration: 0.22 }}
                    className='flex items-start gap-2.5 px-4 py-3'
                    style={{
                      background: 'rgba(239,68,68,0.07)',
                      border: '1px solid rgba(239,68,68,0.22)',
                      clipPath:
                        'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                    }}
                  >
                    <AlertCircle
                      size={13}
                      className='shrink-0 mt-0.5 text-red-400'
                    />
                    <p
                      className='text-[0.68rem] text-red-400 leading-relaxed'
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {authError}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <div className='pt-2'>
                <Button
                  type='submit'
                  variant={isSuccess ? 'green' : 'primary'}
                  size='lg'
                  fullWidth
                  isLoading={isSubmitting && !isSuccess}
                  loadingText='Authenticating…'
                  rightIcon={isSuccess ? undefined : ArrowRight}
                  clipped
                >
                  {isSuccess ? '✓ Access Granted' : 'Sign In'}
                </Button>
              </div>
            </form>

            {/* Hint strip */}
            <div
              className='mt-6 pt-5 flex items-center gap-2 justify-center'
              style={{ borderTop: '1px solid var(--border)' }}
            >
              <div
                className='w-1.5 h-1.5 rounded-full animate-pulse'
                style={{ background: 'var(--teal-light)' }}
              />
              <p
                className='text-[0.6rem] tracking-[0.1em] uppercase'
                style={{
                  color: 'var(--ivory-muted)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Restricted to authorized personnel only
              </p>
            </div>
          </div>

          {/* Below card — version */}
          <p
            className='text-center mt-6 text-[0.58rem] tracking-[0.14em] uppercase'
            style={{
              color: 'var(--ivory-muted)',
              fontFamily: 'var(--font-body)',
            }}
          >
            IEGS Admin · v1.0.0
          </p>
        </motion.div>
      </div>
    </div>
  );
}
