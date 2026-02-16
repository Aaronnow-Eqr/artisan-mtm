import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, Clock, Heart } from "lucide-react";
const heroImage = "/assets/hero-tailor.jpg";

const values = [
  {
    icon: Award,
    title: "Excelencia",
    description:
      "No nos conformamos con menos que la perfección. Cada puntada, cada corte, cada detalle debe cumplir con nuestros exigentes estándares.",
  },
  {
    icon: Users,
    title: "Tradición",
    description:
      "Honramos las técnicas de sastrería que han sido perfeccionadas durante generaciones, preservando un arte que está en peligro de extinción.",
  },
  {
    icon: Clock,
    title: "Paciencia",
    description:
      "La verdadera artesanía no se puede apresurar. Nos tomamos el tiempo necesario para crear prendas que durarán toda la vida.",
  },
  {
    icon: Heart,
    title: "Pasión",
    description:
      "Amamos lo que hacemos. Esa pasión se refleja en cada prenda que sale de nuestro taller.",
  },
];

const stats = [
  { number: "39", label: "Años de Experiencia" },
  { number: "12,000+", label: "Trajes Confeccionados" },
  { number: "3,000+", label: "Telas Disponibles" },
  { number: "100%", label: "Satisfacción Garantizada" },
];

const Nosotros = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="absolute inset-0 bg-background/85" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold uppercase tracking-[0.3em] text-sm mb-4">
              Nuestra Historia
            </p>
            <h1 className="font-display text-5xl md:text-6xl text-cream mb-6">
              Artisan Tailoring
            </h1>
            <p className="text-muted-foreground text-lg">
              Desde 1985, transformando la visión de caballeros distinguidos 
              en prendas de vestir excepcionales.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-charcoal">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gold uppercase tracking-[0.2em] text-sm mb-4">
                Nuestra Historia
              </p>
              <h2 className="font-display text-4xl text-cream mb-6">
                Cuatro Décadas de Excelencia en Sastrería
              </h2>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Artisan Tailoring nació en 1985 de la mano de Don Antonio 
                  Martínez, un maestro sastre formado en las prestigiosas 
                  casas de Savile Row en Londres y las botteghe de Milán.
                </p>
                <p>
                  Su visión era simple pero ambiciosa: traer a España la 
                  más alta calidad en sastrería a medida, combinando las 
                  mejores técnicas británicas e italianas con la elegancia 
                  mediterránea.
                </p>
                <p>
                  Hoy, bajo la dirección de la segunda generación de la 
                  familia, seguimos honrando ese legado mientras abrazamos 
                  la innovación en materiales y técnicas que mejoran, pero 
                  nunca reemplazan, el trabajo artesanal.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={heroImage} alt="Nuestro atelier" className="w-full h-full object-cover"/>
              </div>
              <div className="absolute -bottom-8 -left-8 p-8 bg-card border border-gold/30 max-w-xs">
                <p className="font-display text-4xl text-gold mb-2">1985</p>
                <p className="text-cream">Año de fundación en Madrid</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 gradient-dark border-y border-border/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-4xl md:text-5xl text-gold mb-2">
                  {stat.number}
                </p>
                <p className="text-muted-foreground text-sm uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-charcoal">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-gold uppercase tracking-[0.3em] text-sm mb-4">
              Filosofía
            </p>
            <h2 className="font-display text-4xl text-cream mb-6">
              Nuestros Valores
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Los principios que guían cada decisión que tomamos y cada 
              prenda que creamos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="p-8 bg-card border border-border/30 text-center group hover:border-gold/30 transition-colors">
                <value.icon className="mx-auto text-gold mb-6 group-hover:scale-110 transition-transform" size={36}/>
                <h3 className="font-display text-xl text-cream mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-charcoal-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-gold uppercase tracking-[0.3em] text-sm mb-4">
              Equipo
            </p>
            <h2 className="font-display text-4xl text-cream mb-6">
              Maestros Artesanos
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Nuestro equipo combina décadas de experiencia con una pasión 
              inquebrantable por la perfección.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Antonio Martínez Jr.",
                role: "Director & Maestro Sastre",
                experience: "25 años de experiencia",
              },
              {
                name: "Elena Fernández",
                role: "Directora de Diseño",
                experience: "18 años de experiencia",
              },
              {
                name: "Carlos Rodríguez",
                role: "Maestro Cortador",
                experience: "30 años de experiencia",
              },
            ].map((member) => (
              <div key={member.name} className="p-8 bg-card border border-border/30 text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                  <span className="font-display text-2xl text-gold">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-display text-xl text-cream mb-1">
                  {member.name}
                </h3>
                <p className="text-gold text-sm mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">
                  {member.experience}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden gradient-dark">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-4xl text-cream mb-6">
            Conozca Nuestro Atelier
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Le invitamos a visitarnos y descubrir de primera mano el arte 
            de la sastrería tradicional.
          </p>
          <Button variant="gold" size="lg" asChild>
            <Link href="/contacto">
              Programar Visita <ArrowRight className="ml-2" size={18} />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Nosotros;
