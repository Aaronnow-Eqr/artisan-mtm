import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-charcoal border-t border-border/30">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div>
              <span className="font-display text-2xl text-gold tracking-wider">
                ARTISAN
              </span>
              <span className="font-display text-xl text-cream/80 tracking-widest ml-2">
                Tailoring
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Excelencia en sastrería a medida desde 1985. Cada prenda es una 
              obra de arte creada con pasión y precisión.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-display text-lg text-cream">Enlaces</h4>
            <nav className="flex flex-col gap-3">
              {[
                { href: "/servicios", label: "Servicios" },
                { href: "/proceso", label: "Nuestro Proceso" },
                { href: "/galeria", label: "Galería" },
                { href: "/nosotros", label: "Sobre Nosotros" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="text-muted-foreground text-sm hover:text-gold transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="font-display text-lg text-cream">Servicios</h4>
            <nav className="flex flex-col gap-3">
              {[
                "Trajes a Medida",
                "Camisas Personalizadas",
                "Abrigos & Chaquetas",
                "Ajustes & Arreglos",
              ].map((service) => (
                <span key={service} className="text-muted-foreground text-sm">
                  {service}
                </span>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="font-display text-lg text-cream">Contacto</h4>
            <div className="flex flex-col gap-4">
              <a href="#" className="flex items-start gap-3 text-muted-foreground text-sm hover:text-gold transition-colors">
                <MapPin size={18} className="text-gold mt-0.5 shrink-0" />
                <span>Calle Gran Vía 45, 28013 Madrid, España</span>
              </a>
              <a href="tel:+34912345678" className="flex items-center gap-3 text-muted-foreground text-sm hover:text-gold transition-colors">
                <Phone size={18} className="text-gold shrink-0" />
                <span>+34 912 345 678</span>
              </a>
              <a href="mailto:info@artisantailoring.com" className="flex items-center gap-3 text-muted-foreground text-sm hover:text-gold transition-colors">
                <Mail size={18} className="text-gold shrink-0" />
                <span>info@artisantailoring.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs tracking-wider">
            © 2024 Artisan Tailoring. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-muted-foreground text-xs hover:text-gold transition-colors">
              Política de Privacidad
            </Link>
            <Link href="#" className="text-muted-foreground text-xs hover:text-gold transition-colors">
              Términos de Servicio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
