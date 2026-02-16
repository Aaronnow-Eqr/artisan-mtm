"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();

  useEffect(() => {
    console.error("404 Error: ruta inexistente:", pathname);
  }, [pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal text-cream">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-display text-gold">404</h1>
        <p className="text-cream/70">
          La página <span className="text-gold">{pathname}</span> no existe
        </p>
      </div>
    </div>
  );
}
