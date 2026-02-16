'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  ChevronRight,
  Shirt,
  Scissors
} from "lucide-react";
import { toast } from "sonner";

// Import images
const suitNavy = "/assets/suit-navy.jpg";
const suitGray = "/assets/suit-gray.jpg";
const suitBlack = "/assets/suit-black.jpg";
const shirtWhite = "/assets/shirt-white.jpg";
const shirtBlue = "/assets/shirt-blue.jpg";
const coatCamel = "/assets/coat-camel.jpg";
const coatBlack = "/assets/coat-black.jpg";
const jacketNavy = "/assets/jacket-navy.jpg";
const vestFormal = "/assets/vest-formal.jpg";
const tuxedo = "/assets/tuxedo.jpg";
const fabricsImg = "/assets/fabrics.jpg";

import {
  garmentTypes,
  suitStyles,
  lapelStyles,
  buttonConfigs,
  ventStyles,
  collarStyles,
  cuffStyles,
  fabrics,
  colors,
  patterns,
  linings,
  liningColors,
  monogramStyles,
  buttonMaterials,
} from "@/data/configurator";

const garmentImages: Record<string, string> = {
  suit: suitNavy,
  blazer: jacketNavy,
  shirt: shirtWhite,
  pants: suitGray,
  vest: vestFormal,
  coat: coatCamel,
  tuxedo: tuxedo,
};

const steps = [
  { id: 1, name: "Prenda", description: "Tipo de prenda" },
  { id: 2, name: "Estilo", description: "Corte y detalles" },
  { id: 3, name: "Tela", description: "Material y color" },
  { id: 4, name: "Detalles", description: "Acabados finales" },
  { id: 5, name: "Resumen", description: "Confirmar pedido" },
];

interface ConfigState {
  garmentType: string;
  style: string;
  lapel: string;
  buttons: string;
  vent: string;
  collar: string;
  cuff: string;
  fabric: string;
  color: string;
  pattern: string;
  lining: string;
  liningColor: string;
  monogram: string;
  monogramText: string;
  buttonMaterial: string;
  size: string;
}

const Disenar = () => {
  const router = useRouter();

  const defaultConfig: ConfigState = {
    garmentType: "",
    style: "",
    lapel: "",
    buttons: "",
    vent: "",
    collar: "",
    cuff: "",
    fabric: "",
    color: "",
    pattern: "",
    lining: "",
    liningColor: "",
    monogram: "none",
    monogramText: "",
    buttonMaterial: "",
    size: "",
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState<ConfigState>(defaultConfig);

  const standardSizes = [
    { id: "XS", name: "XS", description: "Extra pequeña" },
    { id: "S", name: "S", description: "Pequeña" },
    { id: "M", name: "M", description: "Mediana" },
    { id: "L", name: "L", description: "Grande" },
    { id: "XL", name: "XL", description: "Extra grande" },
    { id: "custom", name: "Medidas exactas", description: "Personaliza con tus medidas" },
  ];

  const updateConfig = (key: keyof ConfigState, value: string) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

useEffect(() => {
  const saved = localStorage.getItem("design-progress");

  if (!saved) return;

  const parsed = JSON.parse(saved);

  if (parsed?.config) setConfig(parsed.config);

  if (parsed?.step !== undefined) {
    setCurrentStep(parsed.step);
  }
}, []);

  useEffect(() => {
    localStorage.setItem(
      "design-progress",
      JSON.stringify({
        config,
        step: currentStep,
      })
    );
  }, [config, currentStep]);

  const calculatePrice = () => {
  if (!config.garmentType) return 0;

    const garment = garmentTypes.find((g) => g.id === config.garmentType);
    const style = suitStyles.find((s) => s.id === config.style);
    const fabric = fabrics.find((f) => f.id === config.fabric);
    const lining = linings.find((l) => l.id === config.lining);
    const monogram = monogramStyles.find((m) => m.id === config.monogram);
    const button = buttonMaterials.find((b) => b.id === config.buttonMaterial);

    let price = garment?.basePrice || 0;
    price += style?.priceModifier || 0;
    price += fabric?.priceModifier || 0;
    price += lining?.priceModifier || 0;
    price += monogram?.priceModifier || 0;
    price += button?.priceModifier || 0;

    return price;
  };

  const nextStep = () => {
    if (currentStep === 1 && !config.garmentType) {
      toast.error("Por favor selecciona un tipo de prenda");
      return;
    }
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const goToMedidas = () => {
    localStorage.setItem(
      "design-progress",
      JSON.stringify({
        config,
        step: currentStep,
      })
    );

    router.push("/medidas");
  };

  const handleGoToPago = () => {
    router.push("/pago");
  };

  const selectedGarment = garmentTypes.find((g) => g.id === config.garmentType);
  const isSuitOrBlazer = ["suit", "blazer", "tuxedo"].includes(config.garmentType);
  const isShirt = config.garmentType === "shirt";

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 gradient-dark">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold uppercase tracking-[0.3em] text-sm mb-4">
              Configurador
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-cream mb-4">
              Diseña Tu Prenda
            </h1>
            <p className="text-muted-foreground text-lg">
              Personaliza cada detalle de tu prenda a medida
            </p>
          </div>
        </div>
      </section>

      {/* Steps Indicator */}
      <section className="bg-charcoal border-b border-border/30">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-4 overflow-x-auto">
            {steps.map((step, index) => (
              <div key={step.id} className={`flex items-center ${
                  index < steps.length - 1 ? "flex-1" : ""
                }`}>
                <button onClick={() => {
                    if (step.id < currentStep || (step.id === 1)) {
                      setCurrentStep(step.id);
                    }
                  }}
                  className={`flex items-center gap-3 ${
                    step.id <= currentStep ? "cursor-pointer" : "cursor-not-allowed"
                  }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      step.id === currentStep
                        ? "bg-gold text-primary-foreground"
                        : step.id < currentStep
                        ? "bg-gold/20 text-gold"
                        : "bg-card text-muted-foreground"
                    }`}>
                    {step.id < currentStep ? (
                      <Check size={18} />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className={`text-sm font-medium ${
                        step.id === currentStep ? "text-cream" : "text-muted-foreground"
                      }`}>
                      {step.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </button>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-px mx-4 ${
                      step.id < currentStep ? "bg-gold/50" : "bg-border/30"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Configurator Content */}
      <section className="py-12 bg-background min-h-[60vh]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Step 1: Garment Type */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl text-cream">
                    Selecciona el tipo de prenda
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {garmentTypes.map((garment) => (
                      <button key={garment.id} onClick={() => updateConfig("garmentType", garment.id)}
                        className={`group relative overflow-hidden border transition-all duration-300 ${
                          config.garmentType === garment.id
                            ? "border-gold ring-2 ring-gold/20"
                            : "border-border/50 hover:border-gold/50"
                        }`}>
                        <div className="aspect-[3/4] overflow-hidden">
                          <img src={garmentImages[garment.id]} alt={garment.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="font-display text-lg text-cream">
                            {garment.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {garment.description}
                          </p>
                          <p className="text-gold font-display mt-1">
                            Desde {garment.basePrice}$
                          </p>
                        </div>
                        {config.garmentType === garment.id && (
                          <div className="absolute top-3 right-3 w-6 h-6 bg-gold rounded-full flex items-center justify-center">
                            <Check size={14} className="text-primary-foreground" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Style */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <h2 className="font-display text-2xl text-cream">
                    Elige el estilo y detalles
                  </h2>

                  {/* Standard Size */}
                  
                  <div className="space-y-4">
                    <h3 className="text-cream font-medium">Talla Estándar</h3>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {standardSizes.map((size) => (
                        <button
                          key={size.id}
                          onClick={() => updateConfig("size", size.id)}
                          className={`p-4 border text-center transition-all ${
                            config.size === size.id
                              ? "border-gold bg-gold/10"
                              : "border-border/50 hover:border-gold/50"
                          }`}
                        >
                          <p className="text-cream font-medium text-lg">{size.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {size.description}
                          </p>
                        </button>
                      ))}
                    </div>
                    {config.size === "custom" && (
                      <p className="text-gold text-sm">
                        Al finalizar podrás introducir tus medidas exactas.
                      </p>
                    )}
                  </div>

                  {/* Fit Style */}
                  <div className="space-y-4">
                    <h3 className="text-cream font-medium">Corte</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {suitStyles.map((style) => (
                        <button key={style.id} onClick={() => updateConfig("style", style.id)}
                          className={`p-4 border text-left transition-all ${
                            config.style === style.id
                              ? "border-gold bg-gold/10"
                              : "border-border/50 hover:border-gold/50"
                          }`}>
                          <p className="text-cream font-medium">{style.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {style.description}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Lapel (for suits) */}
                  {isSuitOrBlazer && (
                    <div className="space-y-4">
                      <h3 className="text-cream font-medium">Solapa</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {lapelStyles.map((lapel) => (
                          <button key={lapel.id} onClick={() => updateConfig("lapel", lapel.id)}
                            className={`p-4 border text-left transition-all ${
                              config.lapel === lapel.id
                                ? "border-gold bg-gold/10"
                                : "border-border/50 hover:border-gold/50"
                            }`}>
                            <p className="text-cream font-medium">{lapel.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {lapel.description}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Buttons (for suits) */}
                  {isSuitOrBlazer && (
                    <div className="space-y-4">
                      <h3 className="text-cream font-medium">Botones</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {buttonConfigs.map((btn) => (
                          <button key={btn.id} onClick={() => updateConfig("buttons", btn.id)}
                            className={`p-4 border text-left transition-all ${
                              config.buttons === btn.id
                                ? "border-gold bg-gold/10"
                                : "border-border/50 hover:border-gold/50"
                            }`}>
                            <p className="text-cream font-medium">{btn.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {btn.description}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Vents (for suits) */}
                  {isSuitOrBlazer && (
                    <div className="space-y-4">
                      <h3 className="text-cream font-medium">Abertura Trasera</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {ventStyles.map((vent) => (
                          <button key={vent.id} onClick={() => updateConfig("vent", vent.id)}
                            className={`p-4 border text-left transition-all ${
                              config.vent === vent.id
                                ? "border-gold bg-gold/10"
                                : "border-border/50 hover:border-gold/50"
                            }`}>
                            <p className="text-cream font-medium">{vent.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {vent.description}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Collar (for shirts) */}
                  {isShirt && (
                    <div className="space-y-4">
                      <h3 className="text-cream font-medium">Cuello</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {collarStyles.map((collar) => (
                          <button key={collar.id} onClick={() => updateConfig("collar", collar.id)}
                            className={`p-4 border text-left transition-all ${
                              config.collar === collar.id
                                ? "border-gold bg-gold/10"
                                : "border-border/50 hover:border-gold/50"
                            }`}>
                            <p className="text-cream font-medium">{collar.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {collar.description}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cuffs (for shirts) */}
                  {isShirt && (
                    <div className="space-y-4">
                      <h3 className="text-cream font-medium">Puños</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {cuffStyles.map((cuff) => (
                          <button key={cuff.id} onClick={() => updateConfig("cuff", cuff.id)}
                            className={`p-4 border text-left transition-all ${
                              config.cuff === cuff.id
                                ? "border-gold bg-gold/10"
                                : "border-border/50 hover:border-gold/50"
                            }`}>
                            <p className="text-cream font-medium">{cuff.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {cuff.description}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Fabric */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <h2 className="font-display text-2xl text-cream">
                    Selecciona la tela
                  </h2>

                  {/* Fabric Selection */}
                  <div className="space-y-4">
                    <h3 className="text-cream font-medium">Material</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {fabrics
                        .filter((f) =>
                          isShirt ? f.category === "cotton" : f.category !== "cotton"
                        )
                        .map((fabric) => (
                          <button
                            key={fabric.id}
                            onClick={() => updateConfig("fabric", fabric.id)}
                            className={`p-4 border text-left transition-all ${
                              config.fabric === fabric.id
                                ? "border-gold bg-gold/10"
                                : "border-border/50 hover:border-gold/50"
                            }`}
>
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-cream font-medium">{fabric.name}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {fabric.origin} • {fabric.weight}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {fabric.description}
                                </p>
                              </div>
                              {fabric.priceModifier > 0 && (
                                <span className="text-gold text-sm">
                                  +{fabric.priceModifier}$
                                </span>
                              )}
                            </div>
                          </button>
                        ))}
                    </div>
                  </div>

                  {/* Color Selection */}
                  <div className="space-y-4">
                    <h3 className="text-cream font-medium">Color</h3>
                    <div className="flex flex-wrap gap-3">
                      {colors
                        .filter((c) =>
                          isShirt
                            ? ["white", "blue", "pink"].includes(c.category)
                            : !["white", "pink"].includes(c.category)
                        )
                        .map((color) => (
                          <button
                            key={color.id}
                            onClick={() => updateConfig("color", color.id)}
                            className={`group relative ${
                              config.color === color.id
                                ? "ring-2 ring-gold ring-offset-2 ring-offset-background"
                                : ""
                            }`}
                            title={color.name}>
                            <div 
                              className="w-12 h-12 rounded-full border border-border/50 transition-transform group-hover:scale-110"
                              style={{ backgroundColor: color.hex }}/>
                            {config.color === color.id && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Check
                                  size={20}
                                  className={
                                    ["white", "cream", "ivory", "silver", "light-gray"].includes(
                                      color.id
                                    )
                                      ? "text-charcoal"
                                      : "text-white"
                                  }/>
                              </div>
                            )}
                          </button>
                        ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Seleccionado:{" "}
                      <span className="text-cream">
                        {colors.find((c) => c.id === config.color)?.name}
                      </span>
                    </p>
                  </div>

                  {/* Pattern Selection */}
                  <div className="space-y-4">
                    <h3 className="text-cream font-medium">Patrón</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {patterns.map((pattern) => (
                        <button
                          key={pattern.id}
                          onClick={() => updateConfig("pattern", pattern.id)}
                          className={`p-3 border text-center transition-all ${
                            config.pattern === pattern.id
                              ? "border-gold bg-gold/10"
                              : "border-border/50 hover:border-gold/50"
                          }`}>
                          <p className="text-cream text-sm font-medium">
                            {pattern.name}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Details */}
              {currentStep === 4 && (
                <div className="space-y-8">
                  <h2 className="font-display text-2xl text-cream">
                    Acabados y detalles
                  </h2>

                  {/* Lining (for suits) */}
                  {!isShirt && (
                    <>
                      <div className="space-y-4">
                        <h3 className="text-cream font-medium">Forro</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {linings.map((lining) => (
                            <button
                              key={lining.id}
                              onClick={() => updateConfig("lining", lining.id)}
                              className={`p-4 border text-left transition-all ${
                                config.lining === lining.id
                                  ? "border-gold bg-gold/10"
                                  : "border-border/50 hover:border-gold/50"
                              }`}>
                              <p className="text-cream font-medium">{lining.name}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {lining.description}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-cream font-medium">Color del Forro</h3>
                        <div className="flex flex-wrap gap-3">
                          {liningColors.map((color) => (
                            <button
                              key={color.id}
                              onClick={() => updateConfig("liningColor", color.id)}
                              className={`group relative ${
                                config.liningColor === color.id
                                  ? "ring-2 ring-gold ring-offset-2 ring-offset-background"
                                  : ""
                              }`}
                              title={color.name}>
                              <div
                                className={`w-10 h-10 rounded-full border border-border/50 transition-transform group-hover:scale-110 flex items-center justify-center ${
                                  color.hex === "match" ? "bg-gradient-to-br from-cream/20 to-gold/20" : ""
                                }`}
                                style={
                                  color.hex !== "match" ? { backgroundColor: color.hex } : {}}>
                                {color.hex === "match" && (
                                  <span className="text-xs text-cream">Auto</span>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Button Material */}
                  <div className="space-y-4">
                    <h3 className="text-cream font-medium">Material de Botones</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {buttonMaterials
                        .filter((b) =>
                          isSuitOrBlazer ? true : b.id !== "metal"
                        )
                        .map((btn) => (
                          <button
                            key={btn.id}
                            onClick={() => updateConfig("buttonMaterial", btn.id)}
                            className={`p-4 border text-left transition-all ${
                              config.buttonMaterial === btn.id
                                ? "border-gold bg-gold/10"
                                : "border-border/50 hover:border-gold/50"
                            }`}>
                            <div className="flex justify-between">
                              <p className="text-cream font-medium">{btn.name}</p>
                              {btn.priceModifier > 0 && (
                                <span className="text-gold text-sm">
                                  +{btn.priceModifier}$
                                </span>
                              )}
                            </div>
                          </button>
                        ))}
                    </div>
                  </div>

                  {/* Monogram */}
                  <div className="space-y-4">
                    <h3 className="text-cream font-medium">Monograma</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {monogramStyles.map((mono) => (
                        <button
                          key={mono.id}
                          onClick={() => updateConfig("monogram", mono.id)}
                          className={`p-4 border text-left transition-all ${
                            config.monogram === mono.id
                              ? "border-gold bg-gold/10"
                              : "border-border/50 hover:border-gold/50"
                          }`}>
                          <div className="flex justify-between">
                            <p className="text-cream font-medium">{mono.name}</p>
                            {mono.priceModifier > 0 && (
                              <span className="text-gold text-sm">
                                +{mono.priceModifier}$
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                    {config.monogram !== "none" && (
                      <input
                        type="text"
                        placeholder="Introduce el texto del monograma"
                        value={config.monogramText}
                        onChange={(e) => updateConfig("monogramText", e.target.value)}
                        className="w-full md:w-1/2 px-4 py-3 bg-card border border-border/50 text-cream placeholder:text-muted-foreground focus:border-gold focus:outline-none"
                        maxLength={config.monogram === "initials" ? 3 : 20}/>
                    )}
                  </div>
                </div>
              )}

              {/* Step 5: Summary */}
              {currentStep === 5 && (
                <div className="space-y-8">
                  <h2 className="font-display text-2xl text-cream">
                    Resumen de tu diseño
                  </h2>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="p-6 bg-card border border-border/30 space-y-4">
                        <h3 className="font-display text-xl text-gold">
                          Configuración
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Prenda</span>
                            <span className="text-cream">{selectedGarment?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Corte</span>
                            <span className="text-cream">
                              {suitStyles.find((s) => s.id === config.style)?.name}
                            </span>
                          </div>
                          {isSuitOrBlazer && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Solapa</span>
                                <span className="text-cream">
                                  {lapelStyles.find((l) => l.id === config.lapel)?.name}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Botones</span>
                                <span className="text-cream">
                                  {buttonConfigs.find((b) => b.id === config.buttons)?.name}
                                </span>
                              </div>
                            </>
                          )}
                          {isShirt && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Cuello</span>
                                <span className="text-cream">
                                  {collarStyles.find((c) => c.id === config.collar)?.name}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Puños</span>
                                <span className="text-cream">
                                  {cuffStyles.find((c) => c.id === config.cuff)?.name}
                                </span>
                              </div>
                            </>
                          )}
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Tela</span>
                            <span className="text-cream">
                              {fabrics.find((f) => f.id === config.fabric)?.name}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Color</span>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-5 h-5 rounded-full border border-border/50"
                                style={{
                                  backgroundColor:
                                    colors.find((c) => c.id === config.color)?.hex,
                                }}
                              />
                              <span className="text-cream">
                                {colors.find((c) => c.id === config.color)?.name}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Patrón</span>
                            <span className="text-cream">
                              {patterns.find((p) => p.id === config.pattern)?.name}
                            </span>
                          </div>
                          {config.monogram !== "none" && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Monograma</span>
                              <span className="text-cream">{config.monogramText}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="aspect-square overflow-hidden border border-border/30">
                        <img
                          src={garmentImages[config.garmentType] || suitNavy}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gold/10 border border-gold/30 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                      <p className="text-muted-foreground text-sm">
                        Precio estimado
                      </p>
                      <p className="font-display text-4xl text-gold">
                        {calculatePrice()}$
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        *Precio final puede variar según medidas y ajustes
                      </p>
                    </div>
                    <Button variant="gold" size="lg" onClick={goToMedidas}>
                      Ajustes <Scissors className="ml-2" size={18} />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Price Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="p-6 bg-card border border-border/30 space-y-4">
                  <h3 className="font-display text-lg text-cream">Tu Selección</h3>
                  {config.garmentType ? (
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3">
                        <Shirt className="text-gold" size={20} />
                        <span className="text-cream">{selectedGarment?.name}</span>
                      </div>
                      {config.fabric && (
                        <div className="flex items-center gap-3">
                          <Scissors className="text-gold" size={20} />
                          <span className="text-cream">
                            {fabrics.find((f) => f.id === config.fabric)?.name}
                          </span>
                        </div>
                      )}
                      {config.color && (
                        <div className="flex items-center gap-3">
                          <div
                            className="w-5 h-5 rounded-full border border-border/50"
                            style={{
                              backgroundColor:
                                colors.find((c) => c.id === config.color)?.hex,
                            }}/>
                          <span className="text-cream">
                            {colors.find((c) => c.id === config.color)?.name}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      Selecciona una prenda para comenzar
                    </p>
                  )}

                  <div className="pt-4 border-t border-border/30">
                    <div className="flex justify-between items-baseline">
                      <span className="text-muted-foreground">Precio base</span>
                      <span className="text-cream">{selectedGarment?.basePrice || 0}$</span>
                    </div>
                    {fabrics.find((f) => f.id === config.fabric)?.priceModifier ? (
                      <div className="flex justify-between items-baseline mt-2">
                        <span className="text-muted-foreground">Tela premium</span>
                        <span className="text-gold">
                          +{fabrics.find((f) => f.id === config.fabric)?.priceModifier}$
                        </span>
                      </div>
                    ) : null}
                    <div className="flex justify-between items-baseline mt-4 pt-4 border-t border-border/30">
                      <span className="text-cream font-medium">Total estimado</span>
                      <span className="font-display text-2xl text-gold">
                        {calculatePrice()}$
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-charcoal border border-border/30">
                  <p className="text-xs text-muted-foreground">
                    ¿Necesitas ayuda? Contacta con un asesor
                  </p>
                  <Link href="/contacto"
                    className="inline-flex items-center text-gold text-sm mt-2 hover:underline">
                    Hablar con un experto <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12 pt-8 border-t border-border/30">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}>
              <ArrowLeft className="mr-2" size={18} />
              Anterior
            </Button>
            {currentStep < 5 ? (
              <Button variant="gold" onClick={nextStep}>
                Siguiente
                <ArrowRight className="ml-2" size={18} />
              </Button>
            ) : (
              <Button variant="gold" onClick={handleGoToPago}>
                Realizar Pago
                <Check className="ml-2" size={18} />
              </Button>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Disenar;
