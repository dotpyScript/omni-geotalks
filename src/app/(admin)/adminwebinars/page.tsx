'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Admin/layout/Sidebar';
import AdminWebinarsPage from '@/components/Admin/page/admin-webiner';

const AUTH_KEY = 'iegs-admin-auth';

export default function AdminWebinarsRoute() {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem(AUTH_KEY) !== 'true') {
      router.replace('/login');
    }
  }, [router]);

  const handleSignOut = () => {
    sessionStorage.removeItem(AUTH_KEY);
    router.replace('/login');
  };

  return (
    <div className='flex h-screen overflow-hidden' style={{ background: 'var(--obsidian)' }}>
      <Sidebar onSignOut={handleSignOut} />
      <main className='flex-1 overflow-y-auto'>
        <AdminWebinarsPage />
      </main>
    </div>
  );
}
