'use client';

import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: MapPin,
    title: "Dirección",
    lines: ["Calle Gran Vía 45, 4º", "28013 Madrid, España"],
  },
  {
    icon: Phone,
    title: "Teléfono",
    lines: ["+34 912 345 678", "+34 600 123 456 (WhatsApp)"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["info@artisantailoring.com", "citas@artisantailoring.com"],
  },
  {
    icon: Clock,
    title: "Horario",
    lines: [
      "Lunes - Viernes: 10:00 - 19:00",
      "Sábados: 10:00 - 14:00 (con cita)",
    ],
  },
];

const Contacto = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensaje Enviado",
      description:
        "Gracias por contactarnos. Le responderemos en las próximas 24 horas.",
    });
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 gradient-dark">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold uppercase tracking-[0.3em] text-sm mb-4">
              Contacto
            </p>
            <h1 className="font-display text-5xl md:text-6xl text-cream mb-6">
              Hablemos de Su Proyecto
            </h1>
            <p className="text-muted-foreground text-lg">
              Estamos aquí para responder sus preguntas y ayudarle a comenzar 
              su experiencia de sastrería a medida.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-charcoal">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h2 className="font-display text-3xl text-cream mb-6">
                  Información de Contacto
                </h2>
                <p className="text-muted-foreground text-lg">
                  Visite nuestro atelier en el corazón de Madrid o 
                  contáctenos para programar una consulta privada.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                {contactInfo.map((info) => (
                  <div key={info.title} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <info.icon className="text-gold" size={22} />
                      <h3 className="font-display text-lg text-cream">
                        {info.title}
                      </h3>
                    </div>
                    <div className="space-y-1 pl-9">
                      {info.lines.map((line) => (
                        <p key={line} className="text-muted-foreground">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="aspect-video bg-card border border-border/30 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="mx-auto text-gold mb-4" size={32} />
                  <p className="text-muted-foreground">
                    Gran Vía 45, Madrid
                  </p>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-gold text-sm hover:underline mt-2 inline-block">
                    Ver en Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border border-border/30 p-8 lg:p-12">
              <h2 className="font-display text-3xl text-cream mb-6">
                Solicitar Cita
              </h2>
              <p className="text-muted-foreground mb-8">
                Complete el formulario y nos pondremos en contacto con usted 
                en menos de 24 horas.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-cream text-sm">
                      Nombre Completo *
                    </label>
                    <Input required value={formData.name} onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="bg-background border-border/50 focus:border-gold"/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-cream text-sm">
                      Teléfono *
                    </label>
                    <Input required type="tel" value={formData.phone} onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="bg-background border-border/50 focus:border-gold"/>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-cream text-sm">Email *</label>
                  <Input required type="email" value={formData.email} onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-background border-border/50 focus:border-gold"/>
                </div>

                <div className="space-y-2">
                  <label className="text-cream text-sm">
                    Servicio de Interés
                  </label>
                  <select value={formData.service} onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    aria-label="Servicio de Interés"
                    className="w-full h-10 px-3 bg-background border border-border/50 text-cream focus:border-gold focus:outline-none">
                    <option value="">Seleccione una opción</option>
                    <option value="traje">Traje a Medida</option>
                    <option value="camisa">Camisas Personalizadas</option>
                    <option value="abrigo">Abrigos & Chaquetas</option>
                    <option value="smoking">Smoking</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-cream text-sm">Mensaje</label>
                  <Textarea rows={4} value={formData.message} onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Cuéntenos sobre su proyecto o cualquier pregunta que tenga..." className="bg-background border-border/50 focus:border-gold resize-none"/>
                </div>

                <Button type="submit" variant="gold" size="lg" className="w-full">
                  Enviar Solicitud
                  <Send className="ml-2" size={18} />
                </Button>

                <p className="text-muted-foreground text-xs text-center">
                  Al enviar este formulario, acepta nuestra política de 
                  privacidad y términos de servicio.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacto;
