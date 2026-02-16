import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Ruler, Scissors, Award, Clock } from "lucide-react";
const heroImage = "/assets/hero-tailor.jpg";
const suitImage = "/assets/suit-detail.jpg";
const shirtImage = "/assets/shirt-detail.jpg";
const coatImage = "/assets/coat-detail.jpg";

const services = [
  {
    title: "Trajes a Medida",
    description: "Confeccionados con las mejores telas italianas y británicas, cada traje es único.",
    image: suitImage,
    href: "/servicios",
  },
  {
    title: "Camisas Personalizadas",
    description: "Desde el cuello hasta los puños, cada detalle según sus preferencias.",
    image: shirtImage,
    href: "/servicios",
  },
  {
    title: "Abrigos & Chaquetas",
    description: "Piezas de abrigo que combinan elegancia con funcionalidad impecable.",
    image: coatImage,
    href: "/servicios",
  },
];

const processSteps = [
  {
    icon: Ruler,
    title: "Consulta & Medidas",
    description: "Una sesión personalizada donde tomamos más de 30 medidas precisas.",
  },
  {
    icon: Scissors,
    title: "Selección de Telas",
    description: "Acceso a más de 3,000 telas premium de los mejores molinos del mundo.",
  },
  {
    icon: Award,
    title: "Confección Artesanal",
    description: "Cada prenda es cortada y cosida a mano por nuestros maestros sastres.",
  },
  {
    icon: Clock,
    title: "Pruebas & Ajustes",
    description: "Múltiples pruebas para garantizar un ajuste absolutamente perfecto.",
  },
];

const testimonials = [
  {
    quote: "La atención al detalle es incomparable. Cada traje que he encargado ha superado mis expectativas.",
    author: "Carlos Mendoza",
    role: "Director Ejecutivo",
  },
  {
    quote: "Después de probar Artisan, no puedo volver a la ropa de tienda. El ajuste perfecto marca la diferencia.",
    author: "Harvey Specter",
    role: "Abogado Senior",
  },
  {
    quote: "Una experiencia de lujo de principio a fin. Los recomiendo sin dudarlo.",
    author: "Miguel Sánchez",
    role: "Empresario",
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl space-y-8">
            <div className="space-y-2 opacity-0 animate-fade-up">
              <p className="text-gold uppercase tracking-[0.3em] text-sm">
                Sastrería de Lujo
              </p>
              <h1 className="font-display text-5xl md:text-7xl text-cream leading-tight">
                El Arte de la <span className="text-gold italic">Elegancia</span> Hecha a Medida
              </h1>
            </div>

            <p className="text-lg text-cream/70 max-w-lg opacity-0 animate-fade-up delay-200">
              Cada prenda cuenta una historia. La suya merece ser contada con 
              precisión artesanal y los más finos materiales del mundo.
            </p>

            <div className="flex flex-wrap gap-4 opacity-0 animate-fade-up delay-300">
              <Button variant="hero" size="lg" asChild>
                <Link href="/contacto">
                  Reservar Cita
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/proceso">Nuestro Proceso</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-charcoal">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-gold uppercase tracking-[0.3em] text-sm mb-4">
              Servicios
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-cream mb-6">
              Creaciones de Alta Costura
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Desde trajes de negocios hasta piezas de ocasión especial, 
              cada creación refleja nuestra dedicación a la excelencia.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link key={service.title} href={service.href} className="group relative overflow-hidden bg-card border border-border/50 hover:border-gold/50 transition-all duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                  <h3 className="font-display text-2xl text-cream group-hover:text-gold transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center text-gold text-sm tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    Explorar <ArrowRight className="ml-2" size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 gradient-dark">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-gold uppercase tracking-[0.3em] text-sm mb-4">
              Proceso
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-cream mb-6">
              La Experiencia Artisan
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Un viaje meticuloso desde la primera consulta hasta la entrega 
              de su prenda perfecta.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={step.title} className="relative p-8 bg-card/50 border border-border/30 hover:border-gold/30 transition-all duration-300 group">
                <div className="absolute top-4 right-4 text-6xl font-display text-gold/10 group-hover:text-gold/20 transition-colors">
                  0{index + 1}
                </div>
                <step.icon className="text-gold mb-6" size={32} />
                <h3 className="font-display text-xl text-cream mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/proceso">
                Conocer Más <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-charcoal-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-gold uppercase tracking-[0.3em] text-sm mb-4">
              Testimonios
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-cream">
              Lo Que Dicen Nuestros Clientes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.author} className="p-8 bg-card border border-border/30 space-y-6">
                <div className="text-gold text-4xl font-display">"</div>
                <p className="text-cream/80 italic text-lg leading-relaxed">{testimonial.quote}</p>
                <div className="pt-4 border-t border-border/30">
                  <p className="font-display text-cream">{testimonial.author}</p>
                  <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-gold/5 to-transparent" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-cream mb-6">
            ¿Listo Para Su Primera Prenda a Medida?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-lg">
            Reserve una consulta privada en nuestro atelier y descubra 
            la diferencia de la sastrería artesanal.
          </p>
          <Button variant="gold" size="xl" asChild>
            <Link href="/contacto">
              Agendar Consulta <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
