import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
const suitImage = "/assets/suit-detail.jpg";
const shirtImage = "/assets/shirt-detail.jpg";
const coatImage = "/assets/coat-detail.jpg";

const services = [
  {
    id: "trajes",
    title: "Trajes a Medida",
    subtitle: "La máxima expresión de la elegancia masculina",
    description:
      "Nuestros trajes son el resultado de más de cuatro décadas de experiencia en sastrería de alta costura. Cada pieza es cortada y confeccionada a mano utilizando técnicas tradicionales que garantizan un ajuste impecable y una durabilidad excepcional.",
    image: suitImage,
    features: [
      "Más de 3,000 telas premium de Italia, Reino Unido y España",
      "Entretela de crin de caballo para estructura natural",
      "Ojales cosidos a mano",
      "Forros de seda Bemberg",
      "Personalización completa de solapas, bolsillos y detalles",
    ],
    priceFrom: "1,200$",
    timeframe: "4-6 semanas",
  },
  {
    id: "camisas",
    title: "Camisas Personalizadas",
    subtitle: "El lienzo perfecto para su estilo personal",
    description:
      "Una camisa bien ajustada es la base de cualquier guardarropa elegante. Nuestras camisas a medida ofrecen un nivel de confort y sofisticación que las prendas de confección simplemente no pueden igualar.",
    image: shirtImage,
    features: [
      "Algodones egipcios y suizos de primera calidad",
      "16 estilos de cuello diferentes",
      "Puños simples, dobles o con gemelos",
      "Botones de nácar genuino",
      "Monograma bordado opcional",
    ],
    priceFrom: "180$",
    timeframe: "2-3 semanas",
  },
  {
    id: "abrigos",
    title: "Abrigos & Chaquetas",
    subtitle: "Piezas de inversión para toda la vida",
    description:
      "Nuestros abrigos y chaquetas sport representan la fusión perfecta entre artesanía tradicional y diseño contemporáneo. Son piezas diseñadas para convertirse en el centro de su guardarropa durante décadas.",
    image: coatImage,
    features: [
      "Lanas vírgenes y cachemiras de los mejores molinos",
      "Construcción totalmente entelada a mano",
      "Forros personalizables",
      "Acabados impermeables opcionales",
      "Bolsillos internos de seguridad",
    ],
    priceFrom: "1,800$",
    timeframe: "5-7 semanas",
  },
];

const additionalServices = [
  {
    title: "Chalecos",
    description: "El toque de distinción que completa cualquier conjunto.",
    priceFrom: "350$",
  },
  {
    title: "Pantalones",
    description: "Corte perfecto y comodidad durante todo el día.",
    priceFrom: "280$",
  },
  {
    title: "Smokings",
    description: "Para las ocasiones más especiales de su vida.",
    priceFrom: "1,600$",
  },
  {
    title: "Ajustes & Arreglos",
    description: "Mantenemos sus prendas en condiciones óptimas.",
    priceFrom: "Consultar",
  },
];

const Servicios = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 gradient-dark">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold uppercase tracking-[0.3em] text-sm mb-4">
              Servicios
            </p>
            <h1 className="font-display text-5xl md:text-6xl text-cream mb-6">
              Nuestras Creaciones
            </h1>
            <p className="text-muted-foreground text-lg">
              Cada prenda que sale de nuestro atelier es única, confeccionada 
              con las mejores telas y técnicas artesanales transmitidas de 
              generación en generación.
            </p>
          </div>
        </div>
      </section>

      {/* servicios */}
      {services.map((service, index) => (
        <section key={service.id} className={`py-24 ${index % 2 === 0 ? "bg-charcoal" : "bg-background"}`}>
          <div className="container mx-auto px-6">
            <div
              className={`grid lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}>
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full aspect-[4/5] object-cover"/>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-transparent">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-muted-foreground text-sm">Desde</p>
                        <p className="font-display text-3xl text-gold">
                          {service.priceFrom}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-muted-foreground text-sm">
                          Tiempo estimado
                        </p>
                        <p className="text-cream">{service.timeframe}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`space-y-8 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <div>
                  <p className="text-gold uppercase tracking-[0.2em] text-sm mb-2">
                    {service.subtitle}
                  </p>
                  <h2 className="font-display text-4xl text-cream mb-4">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-cream font-display text-lg">
                    Características
                  </h3>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="text-gold mt-1 shrink-0" size={18} />
                        <span className="text-cream/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button variant="outline" size="lg" asChild>
                  <Link href="/contacto">
                    Solicitar Información <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Adicionales */}
      <section className="py-24 bg-charcoal-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl text-cream mb-4">
              Servicios Adicionales
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Completamos su experiencia con una gama completa de servicios 
              de sastrería.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service) => (
              <div key={service.title} className="p-6 bg-card border border-border/30 hover:border-gold/30 transition-colors group">
                <h3 className="font-display text-xl text-cream mb-2 group-hover:text-gold transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {service.description}
                </p>
                <p className="text-gold font-display text-lg">
                  {service.priceFrom}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden gradient-dark">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-4xl text-cream mb-6">
            ¿No Encuentra Lo Que Busca?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Contáctenos para discutir cualquier proyecto especial. 
            Estamos aquí para hacer realidad su visión.
          </p>
          <Button variant="gold" size="lg" asChild>
            <Link href="/contacto">Contactar</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Servicios;
