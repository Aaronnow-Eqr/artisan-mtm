import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Ruler, Palette, Scissors, Eye, Package } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Calendar,
    title: "Consulta Inicial",
    description:
      "Su viaje comienza con una conversación. Nos reunimos para entender sus necesidades, estilo de vida, preferencias estéticas y ocasiones para las que necesita la prenda.",
    details: [
      "Evaluación de su guardarropa actual",
      "Discusión de estilo y preferencias",
      "Asesoramiento profesional personalizado",
      "Presupuesto y cronograma",
    ],
    duration: "45-60 minutos",
  },
  {
    number: "02",
    icon: Ruler,
    title: "Toma de Medidas",
    description:
      "Nuestros maestros sastres toman más de 30 medidas precisas de su cuerpo, asegurando que cada curva y proporción sea capturada con exactitud milimétrica.",
    details: [
      "Más de 30 medidas corporales",
      "Análisis de postura y movimiento",
      "Registro digital permanente",
      "Notas sobre preferencias de ajuste",
    ],
    duration: "30-45 minutos",
  },
  {
    number: "03",
    icon: Palette,
    title: "Selección de Materiales",
    description:
      "Acceda a nuestra colección de más de 3,000 telas de los mejores molinos del mundo. Le guiaremos para elegir los materiales perfectos para cada prenda.",
    details: [
      "Telas de Italia, Reino Unido y España",
      "Muestrario de forros y entretelas",
      "Selección de botones y accesorios",
      "Opciones de personalización de detalles",
    ],
    duration: "45-60 minutos",
  },
  {
    number: "04",
    icon: Scissors,
    title: "Corte y Confección",
    description:
      "Sus prendas son cortadas a mano por nuestros maestros cortadores y confeccionadas utilizando técnicas artesanales tradicionales que garantizan calidad excepcional.",
    details: [
      "Corte manual por maestros artesanos",
      "Confección con técnicas tradicionales",
      "Entretela de crin de caballo",
      "Ojales y acabados hechos a mano",
    ],
    duration: "3-5 semanas",
  },
  {
    number: "05",
    icon: Eye,
    title: "Pruebas y Ajustes",
    description:
      "Realizamos múltiples pruebas durante el proceso de confección. Cada ajuste se hace con precisión milimétrica hasta lograr el ajuste perfecto.",
    details: [
      "Primera prueba de bastilla",
      "Segunda prueba de estructura",
      "Ajustes finales de perfeccionamiento",
      "Garantía de satisfacción total",
    ],
    duration: "2-3 citas",
  },
  {
    number: "06",
    icon: Package,
    title: "Entrega Final",
    description:
      "Su prenda terminada le será entregada con todos los cuidados que merece, incluyendo instrucciones de mantenimiento y nuestra garantía de por vida en costuras.",
    details: [
      "Presentación en caja premium",
      "Guía de cuidados personalizada",
      "Garantía de por vida en costuras",
      "Servicio de ajustes post-entrega",
    ],
    duration: "30 minutos",
  },
];

const Proceso = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 gradient-dark">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold uppercase tracking-[0.3em] text-sm mb-4">
              Proceso
            </p>
            <h1 className="font-display text-5xl md:text-6xl text-cream mb-6">
              El Arte de la Sastrería
            </h1>
            <p className="text-muted-foreground text-lg">
              Descubra el meticuloso proceso detrás de cada prenda que creamos. 
              Desde la primera consulta hasta la entrega final, cada paso está 
              diseñado para garantizar la perfección.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 bg-charcoal">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="relative pb-16 last:pb-0">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-6 top-20 bottom-0 w-px bg-border/50" />
                )}

                <div className="flex gap-8">
                  {/* Number & Icon */}
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                      <step.icon className="text-gold" size={22} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-6">
                    <div>
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-gold font-display text-sm">
                          Paso {step.number}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          {step.duration}
                        </span>
                      </div>
                      <h2 className="font-display text-3xl text-cream mb-4">
                        {step.title}
                      </h2>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {step.details.map((detail) => (
                        <div key={detail} className="flex items-center gap-3 text-cream/70 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-24 bg-charcoal-light">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl text-cream text-center mb-12">
              Preguntas Frecuentes
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: "¿Cuánto tiempo tarda en completarse un traje?",
                  a: "El proceso completo para un traje a medida toma entre 4 y 6 semanas, dependiendo de la complejidad del diseño y la temporada.",
                },
                {
                  q: "¿Necesito varias citas para las pruebas?",
                  a: "Sí, normalmente realizamos 2-3 pruebas durante el proceso de confección para garantizar un ajuste perfecto.",
                },
                {
                  q: "¿Guardan mis medidas para futuros pedidos?",
                  a: "Sí, mantenemos un registro digital de todas sus medidas, lo que facilita pedidos futuros y ajustes.",
                },
              ].map((faq) => (
                <div key={faq.q} className="p-6 bg-card border border-border/30">
                  <h3 className="font-display text-lg text-cream mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden gradient-dark">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-4xl text-cream mb-6">
            Comience Su Experiencia Hoy
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Reserve su consulta inicial gratuita y descubra lo que significa 
            vestir prendas creadas exclusivamente para usted.
          </p>
          <Button variant="gold" size="lg" asChild>
            <Link href="/contacto">
              Agendar Consulta <ArrowRight className="ml-2" size={18} />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Proceso;
