'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/disenar", label: "Diseñar" },
  { href: "/proceso", label: "Proceso" },
  { href: "/galeria", label: "Galería" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/me", {
          credentials: "include",
        });

        if (!res.ok) {
          setUser(null);
        } else {
          const data = await res.json();
          setUser(data);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  if (loading) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-2xl text-gold tracking-wider">
              ARTISAN
            </span>
            <span className="font-display text-xl text-cream/80 tracking-widest">
              Tailoring
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className={cn( "text-sm tracking-[0.15em] uppercase transition-colors duration-300 hover:text-gold", pathname === link.href ? "text-gold" : "text-cream/70" )}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <Button variant="outline" size="sm" asChild>
                <Link href="/mi-cuenta">Mi cuenta</Link>
              </Button>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link href="/auth">Iniciar sesión</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-cream" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-6 border-t border-border/30 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className={cn(
                    "text-sm tracking-[0.15em] uppercase py-2 transition-colors duration-300",
                    pathname === link.href
                      ? "text-gold"
                      : "text-cream/70 hover:text-gold")}>
                  {link.label}
                </Link>
              ))}

              {user ? (
                <Link href="/mi-cuenta" onClick={() => setIsOpen(false)} className="text-sm tracking-[0.15em] uppercase py-2 text-cream/70 hover:text-gold transition-colors duration-300">
                  Mi cuenta
                </Link>
              ) : (
                <Link href="/auth" onClick={() => setIsOpen(false)} className="text-sm tracking-[0.15em] uppercase py-2 text-cream/70 hover:text-gold transition-colors duration-300">
                  Iniciar sesión
                </Link>
              )}

              <Button variant="outline" size="sm" className="mt-4 w-fit" asChild>
                <Link href="/contacto">Reservar Cita</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
