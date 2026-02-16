'use client';

import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
const suitImage = "/assets/suit-detail.jpg";
const shirtImage = "/assets/shirt-detail.jpg";
const coatImage = "/assets/coat-detail.jpg";
const heroImage = "/assets/hero-tailor.jpg";

const categories = ["Todos", "Trajes", "Camisas", "Abrigos", "Accesorios"];

const galleryItems = [
  {
    id: 1,
    title: "Traje Azul Marino Clásico",
    category: "Trajes",
    image: suitImage,
    description: "Lana Super 150's italiana, forro de seda",
  },
  {
    id: 2,
    title: "Camisa Oxford Blanca",
    category: "Camisas",
    image: shirtImage,
    description: "Algodón egipcio, cuello italiano",
  },
  {
    id: 3,
    title: "Abrigo Camel",
    category: "Abrigos",
    image: coatImage,
    description: "Cachemira italiana, construcción entelada",
  },
  {
    id: 4,
    title: "Proceso Artesanal",
    category: "Accesorios",
    image: heroImage,
    description: "Nuestro atelier en acción",
  },
  {
    id: 5,
    title: "Traje Gris Príncipe de Gales",
    category: "Trajes",
    image: suitImage,
    description: "Tejido británico tradicional",
  },
  {
    id: 6,
    title: "Camisa de Vestir Celeste",
    category: "Camisas",
    image: shirtImage,
    description: "Popelín suizo, puños dobles",
  },
];

const Galeria = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);

  const filteredItems =
    activeCategory === "Todos"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 gradient-dark">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold uppercase tracking-[0.3em] text-sm mb-4">
              Galería
            </p>
            <h1 className="font-display text-5xl md:text-6xl text-cream mb-6">
              Nuestras Creaciones
            </h1>
            <p className="text-muted-foreground text-lg">
              Una selección de nuestros trabajos más destacados. Cada imagen 
              representa horas de dedicación artesanal y atención al detalle.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 bg-charcoal">
        <div className="container mx-auto px-6">
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button key={category} onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 text-sm uppercase tracking-[0.15em] border transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-gold text-primary-foreground border-gold"
                    : "bg-transparent text-cream/70 border-border/50 hover:border-gold/50 hover:text-gold"
                }`}>
                {category}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="group relative cursor-pointer overflow-hidden" onClick={() => setSelectedImage(item)}>
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-gold text-sm uppercase tracking-wider mb-1">
                    {item.category}
                  </p>
                  <h3 className="font-display text-xl text-cream">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-6" onClick={() => setSelectedImage(null)}>
          <button type="button" aria-label="Cerrar galería" className="absolute top-6 right-6 text-cream hover:text-gold transition-colors" onClick={() => setSelectedImage(null)}>
            <X size={32} />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.image} alt={selectedImage.title} className="w-full max-h-[70vh] object-contain"/>
            <div className="mt-6 text-center">
              <p className="text-gold text-sm uppercase tracking-wider mb-2">
                {selectedImage.category}
              </p>
              <h2 className="font-display text-3xl text-cream mb-2">
                {selectedImage.title}
              </h2>
              <p className="text-muted-foreground">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-24 relative overflow-hidden gradient-dark">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-4xl text-cream mb-6">
            ¿Le Gustaría Ver Su Creación Aquí?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Comience su proyecto personalizado hoy y únase a nuestra galería 
            de clientes satisfechos.
          </p>
          <Button variant="gold" size="lg" asChild>
            <Link href="/contacto">
              Iniciar Proyecto <ArrowRight className="ml-2" size={18} />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Galeria;
