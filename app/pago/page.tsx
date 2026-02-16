"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Lock, Check } from "lucide-react";

interface PaymentForm {
  cardHolder: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

const PagoContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [orderData, setOrderData] = useState({
    price: searchParams.get("price") || "0",
    garmentName: searchParams.get("garment") || "Prenda",
    sizeName: searchParams.get("size") || "—",
  });

  const [form, setForm] = useState<PaymentForm>({
    cardHolder: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });
  
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const handleChange = (field: keyof PaymentForm, value: string) => {
    if (field === "cardNumber") {
      setForm((prev) => ({ ...prev, cardNumber: formatCardNumber(value) }));
    } else if (field === "expiryMonth" || field === "expiryYear") {
      const v = value.replace(/\D/g, "").slice(0, 2);
      setForm((prev) => ({ ...prev, [field]: v }));
    } else if (field === "cvv") {
      const v = value.replace(/\D/g, "").slice(0, 4);
      setForm((prev) => ({ ...prev, cvv: v }));
    } else {
      setForm((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      console.log("Procesando pago para:", form.cardHolder);
      setCompleted(true);
    } catch (error) {
      console.error("Error al procesar:", error);
    } finally {
      setLoading(false);
    }
  };

  if (completed) {
    return (
      <Layout>
        <section className="py-20 min-h-[80vh] flex items-center justify-center">
          <div className="text-center max-w-md mx-auto space-y-6">
            <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto">
              <Check size={40} className="text-gold" />
            </div>
            <h1 className="font-display text-3xl text-cream">¡Pedido Confirmado!</h1>
            <p className="text-muted-foreground">
              Tu {orderData.garmentName} a medida está en proceso.
              Te contactaremos pronto con los detalles de fabricación.
            </p>
            <Button variant="gold" onClick={() => router.push("/mi-cuenta")}>
              Ir a Mi Cuenta
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-16 gradient-dark">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold uppercase tracking-[0.3em] text-sm mb-4">Pago Seguro</p>
            <h1 className="font-display text-4xl md:text-5xl text-cream mb-4">Realizar Pago</h1>
            <p className="text-muted-foreground text-lg">
              Completa tu pedido de forma segura
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background min-h-[60vh]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3 space-y-8">
              <div className="space-y-6">
                <h3 className="text-cream font-medium flex items-center gap-2">
                  <Lock size={16} className="text-gold"/> Datos de la tarjeta
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-cream text-sm mb-2 block">Titular de la tarjeta</label>
                    <Input value={form.cardHolder} onChange={(e) => handleChange("cardHolder", e.target.value)} placeholder="Nombre como aparece en la tarjeta"
                      className="bg-card border-border/50 text-cream" maxLength={100}/>
                  </div>

                  <div>
                    <label className="text-cream text-sm mb-2 block">Número de tarjeta</label>
                    <Input value={form.cardNumber} onChange={(e) => handleChange("cardNumber", e.target.value)} placeholder="1234 5678 9012 3456"
                      className="bg-card border-border/50 text-cream" maxLength={19}/>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-cream text-sm mb-2 block">Mes</label>
                      <Input value={form.expiryMonth} onChange={(e) => handleChange("expiryMonth", e.target.value)} placeholder="MM"
                        className="bg-card border-border/50 text-cream" maxLength={2}/>
                    </div>
                    <div>
                      <label className="text-cream text-sm mb-2 block">Año</label>
                      <Input value={form.expiryYear} onChange={(e) => handleChange("expiryYear", e.target.value)} placeholder="AA"
                        className="bg-card border-border/50 text-cream" maxLength={2}/>
                    </div>
                    <div>
                      <label className="text-cream text-sm mb-2 block">CVV</label>
                      <Input type="password" value={form.cvv} onChange={(e) => handleChange("cvv", e.target.value)} placeholder="•••"
                        className="bg-card border-border/50 text-cream" maxLength={4}/>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-8 border-t border-border/30">
                <Button variant="outline" size="lg" onClick={() => router.back()}>
                  <ArrowLeft className="mr-2" size={18} /> Volver
                </Button>
                <Button variant="gold" size="lg" onClick={handleSubmit} disabled={loading}>
                  <Lock className="mr-2" size={18} />
                  {loading ? "Procesando..." : `Pagar ${orderData.price}€`}
                </Button>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="sticky top-24 p-6 bg-card border border-border/30 space-y-4">
                <h3 className="font-display text-lg text-gold">Resumen del pedido</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Prenda</span>
                    <span className="text-cream">{orderData.garmentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Talla</span>
                    <span className="text-cream">{orderData.sizeName}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-border/30">
                  <div className="flex justify-between items-baseline">
                    <span className="text-cream font-medium">Total</span>
                    <span className="font-display text-3xl text-gold">
                      {orderData.price}$
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-4 text-xs text-muted-foreground">
                  <Lock size={12} />
                  <span>Pago seguro y encriptado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default function PagoPage() {
  return (
    <Suspense fallback={
      <Layout>
        <div className="min-h-screen flex items-center justify-center text-cream">
          Cargando pasarela de pago...
        </div>
      </Layout>
    }>
      <PagoContent />
    </Suspense>
  );
}