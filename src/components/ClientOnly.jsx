'use client';

import { useEffect, useState } from 'react';

/**
 * Renders children only on the client side.
 * Prevents hydration mismatches caused by browser extensions
 * that inject extra attributes (like bis_skin_checked) into the DOM.
 */
export default function ClientOnly({ children, fallback = null }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return fallback;
  return children;
}
