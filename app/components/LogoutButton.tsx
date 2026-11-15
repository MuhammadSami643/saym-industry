"use client";

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch {}
    document.cookie = "admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      type="button"
      style={{
        background: '#11171a',
        border: '1px solid rgba(248, 113, 113, 0.25)',
        color: '#f87171',
        padding: '6px 14px',
        borderRadius: '9999px',
        fontSize: '11.5px',
        fontWeight: 700,
        cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(248, 113, 113, 0.12)';
        e.currentTarget.style.borderColor = '#f87171';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#11171a';
        e.currentTarget.style.borderColor = 'rgba(248, 113, 113, 0.25)';
      }}
    >
      Sign Out
    </button>
  );
}
