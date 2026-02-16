"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Ruler, Plus, Pencil, Trash2 } from "lucide-react";

type User = {
  id: string;
  name: string | null;
  lastName: string | null;
  email: string;
};

type MeasurementProfile = {
  id: string;
  name: string;
  unit: string;
  updatedAt: string;
  entries?: any[];
  [key: string]: any;
};

const measurementLabels: Record<string, string> = {
  shoulders: "Hombros",
  sleeve_length: "Manga",
  neck: "Cuello",
  chest: "Pecho",
  stomach: "Abdomen",
  hip: "Cadera",
  leg_length: "Largo Pierna",
  thigh: "Muslo",
  wrist: "Muñeca",
};

async function fetchJson(url: string, opts: RequestInit = {}) {
  const res = await fetch(url, { credentials: "include", ...opts });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

export default function MiCuentaPage() {
  const [user, setUser] = useState<User | null>(null);
  const [measurements, setMeasurements] = useState<MeasurementProfile[]>([]);
  const [loading, setLoading] = useState({ user: true, measurements: false });
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchJson("/api/me");
        if (mounted) setUser(data);
      } catch {
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoading((s) => ({ ...s, user: false }));
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!user) return;
    let mounted = true;
    setLoading((s) => ({ ...s, measurements: true }));
    (async () => {
      try {
        const data = await fetchJson("/api/measurement-profile");
        if (mounted) setMeasurements(data);
      } catch {
        if (mounted) setMeasurements([]);
      } finally {
        if (mounted) setLoading((s) => ({ ...s, measurements: false }));
      }
    })();
    return () => {
      mounted = false;
    };
  }, [user]);

  const handleLogout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast({ title: "Sesión cerrada", description: "Has salido de tu cuenta correctamente" });
      router.push("/auth");
      router.refresh();
    } catch {
      toast({ title: "Error", description: "No se pudo cerrar sesión", variant: "destructive" });
    }
  }, [router, toast]);

  const deleteMeasurement = useCallback(
    async (id: string) => {
      try {
        const res = await fetch(`/api/measurement-profile?id=${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (!res.ok) throw new Error();
        setMeasurements((prev) => prev.filter((m) => m.id !== id));
        toast({ title: "Perfil eliminado", description: "El perfil de medidas ha sido eliminado correctamente" });
      } catch {
        toast({ title: "Error", description: "No se pudo eliminar el perfil de medidas", variant: "destructive" });
      }
    },
    [toast]
  );

  if (loading.user) {
    return (
      <Layout>
        <section className="py-20 text-center text-cream/70">Cargando tu cuenta...</section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-8">
              <h1 className="font-display text-3xl text-gold">Mi cuenta</h1>

              {user ? (
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Cerrar sesión
                </Button>
              ) : (
                <Button variant="gold" size="sm" asChild>
                  <Link href="/auth">Iniciar sesión</Link>
                </Button>
              )}
            </div>

            <div className="bg-charcoal-light border border-gold/20 rounded-lg p-6 space-y-6">
              {user ? (
                <>
                  <div>
                    <p className="text-cream/70 text-sm">Nombre</p>
                    <p className="text-cream text-lg">{user.name} {user.lastName}</p>
                  </div>

                  <div>
                    <p className="text-cream/70 text-sm">Email</p>
                    <p className="text-cream">{user.email}</p>
                  </div>

                  <div className="border-t border-gold/10 pt-6 space-y-2">
                    <h2 className="font-display text-xl text-gold">Carrito</h2>
                    <ul className="list-disc pl-5 text-cream/70 space-y-1">
                      <li>órdenes / pedidos</li>
                    </ul>
                    <div className="pt-4">
                      <Button variant="gold" asChild>
                        <Link href="/disenar">Ir al configurador</Link>
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-cream/70">No has iniciado sesión todavía.</p>
                  <Button variant="gold" asChild>
                    <Link href="/auth">Iniciar sesión</Link>
                  </Button>
                </>
              )}
            </div>

            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl text-cream flex items-center gap-3">
                  <Ruler className="text-gold" size={24} />
                  Mis Medidas
                </h2>
                <Button variant="gold" size="sm" onClick={() => router.push("/medidas")}>
                  <Plus size={16} className="mr-2" />
                  Nuevo Perfil
                </Button>
              </div>

              {loading.measurements ? (
                <p className="text-muted-foreground">Cargando...</p>
              ) : measurements.length === 0 ? (
                <div className="bg-charcoal-light border border-gold/20 rounded-lg p-8 text-center">
                  <Ruler className="mx-auto text-gold/40 mb-4" size={48} />
                  <p className="text-muted-foreground mb-4">Aún no tienes perfiles de medidas guardados</p>
                  <Button variant="gold" onClick={() => router.push("/medidas")}>Crear Perfil de Medidas</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {measurements.map((m) => (
                    <div key={m.id} className="bg-charcoal-light border border-gold/20 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-cream font-medium">{m.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            Unidad: {m.unit === "cm" ? "Centímetros" : "Pulgadas"} • Actualizado: {new Date(m.updatedAt).toLocaleDateString("es-ES")}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => router.push(`/medidas?edit=${m.id}`)}>
                            <Pencil size={14} />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => deleteMeasurement(m.id)}>
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 md:grid-cols-5 gap-3 text-sm">
                        {Object.entries(measurementLabels).map(([key, label]) =>
                          m[key] ? (
                            <div key={key} className="bg-charcoal rounded p-2 text-center">
                              <p className="text-muted-foreground text-xs">{label}</p>
                              <p className="text-cream">{m[key]} {m.unit}</p>
                            </div>
                          ) : null
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
