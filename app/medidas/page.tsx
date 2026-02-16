"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Ruler } from "lucide-react";

interface MeasurementFields {
  shoulders: string;
  sleeve_length: string;
  neck: string;
  chest: string;
  stomach: string;
  leg_length: string;
  hip: string;
  thigh: string;
  wrist: string;
}

const fieldLabels: Record<keyof MeasurementFields, string> = {
  shoulders: "Ancho de Hombros",
  sleeve_length: "Longitud de Mangas",
  neck: "Cuello",
  chest: "Pecho (alrededor)",
  stomach: "Estómago",
  leg_length: "Longitud de Pierna",
  hip: "Cadera",
  thigh: "Muslo",
  wrist: "Muñeca",
};

const emptyMeasurements: MeasurementFields = {
  shoulders: "",
  sleeve_length: "",
  neck: "",
  chest: "",
  stomach: "",
  leg_length: "",
  hip: "",
  thigh: "",
  wrist: "",
};

const MedidasContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [unit, setUnit] = useState<"cm" | "in">("cm");
  const [profileName, setProfileName] = useState("Principal");
  const [measurements, setMeasurements] =
    useState<MeasurementFields>(emptyMeasurements);

  const [saving, setSaving] = useState(false);
  const [savedProfiles, setSavedProfiles] = useState<any[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);

  const editId = searchParams.get("edit");

  useEffect(() => {
    fetch("/api/me", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadProfiles();
    }
  }, [user]);

  useEffect(() => {
    if (editId && savedProfiles.length > 0) {
      const profile = savedProfiles.find((p) => p.id === editId);
      if (profile) {
        loadProfile(profile);
      }
    }
  }, [editId, savedProfiles]);

  const loadProfiles = async () => {
    const res = await fetch("/api/measurement-profile", {
      credentials: "include",
    });

    if (!res.ok) return;

    const data = await res.json();
    setSavedProfiles(data);
  };

  const loadProfile = (profile: any) => {
    const entry = profile.entries?.[0]?.data;

    if (!entry) return;

    setSelectedProfileId(profile.id);
    setProfileName(profile.name);
    setUnit(profile.unit);

    setMeasurements({
      shoulders: entry.shoulders?.toString() || "",
      sleeve_length: entry.sleeve_length?.toString() || "",
      neck: entry.neck?.toString() || "",
      chest: entry.chest?.toString() || "",
      stomach: entry.stomach?.toString() || "",
      leg_length: entry.leg_length?.toString() || "",
      hip: entry.hip?.toString() || "",
      thigh: entry.thigh?.toString() || "",
      wrist: entry.wrist?.toString() || "",
    });
  };

  const handleChange = (field: keyof MeasurementFields, value: string) => {
    if (value && !/^\d*\.?\d*$/.test(value)) return;
    setMeasurements((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);

    const payload = {
      userId: user.id,
      name: profileName.trim() || "Principal",
      unit,
      entries: [
        {
          productType: "SHIRT",
          data: {
            shoulders: measurements.shoulders ? Number(measurements.shoulders) : null,
            sleeve_length: measurements.sleeve_length ? Number(measurements.sleeve_length) : null,
            neck: measurements.neck ? Number(measurements.neck) : null,
            chest: measurements.chest ? Number(measurements.chest) : null,
            stomach: measurements.stomach ? Number(measurements.stomach) : null,
            leg_length: measurements.leg_length ? Number(measurements.leg_length) : null,
            hip: measurements.hip ? Number(measurements.hip) : null,
            thigh: measurements.thigh ? Number(measurements.thigh) : null,
            wrist: measurements.wrist ? Number(measurements.wrist) : null,
          },
        },
      ],
    };

    const res = await fetch("/api/measurement-profile", {
      method: selectedProfileId ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        ...payload,
        id: selectedProfileId,
      }),
    });

    setSaving(false);

    if (!res.ok) {
      toast({
        title: "Error",
        description: "No se pudieron guardar las medidas",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "¡Guardado!",
      description: "Tus medidas se han guardado correctamente",
    });

    await loadProfiles();
  };

  if (loading) {
    return (
      <Layout>
        <section className="py-20 min-h-[80vh] flex items-center justify-center">
          <div className="text-cream">Cargando...</div>
        </section>
      </Layout>
    );
  }

  if (!user) return null;

  return (
    <Layout>
      <section className="py-16 gradient-dark">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold uppercase tracking-[0.3em] text-sm mb-4">Medidas Corporales</p>
            <h1 className="font-display text-4xl md:text-5xl text-cream mb-4">Tus Medidas</h1>
            <p className="text-muted-foreground text-lg">
              Introduce tus medidas para fabricar tu prenda perfecta
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background min-h-[60vh]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* perfiles guardados */}
            {savedProfiles.length > 0 && !editId && (
              <div className="space-y-4">
                <h3 className="text-cream font-medium">Perfiles guardados</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {savedProfiles.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => loadProfile(p)}
                      className={`p-4 border text-left transition-all ${
                        selectedProfileId === p.id
                          ? "border-gold bg-gold/10"
                          : "border-border/50 hover:border-gold/50"
                      }`}>
                      <p className="text-cream font-medium">{p.profile_name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Unidad: {p.unit === "cm" ? "Centímetros" : "Pulgadas"}
                      </p>
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setSelectedProfileId(null);
                      setMeasurements(emptyMeasurements);
                      setProfileName("");
                    }}
                    className={`p-4 border text-left transition-all border-dashed ${
                      !selectedProfileId
                        ? "border-gold bg-gold/10"
                        : "border-border/50 hover:border-gold/50"
                    }`}>
                    <p className="text-cream font-medium">+ Nuevo perfil</p>
                    <p className="text-xs text-muted-foreground mt-1">Crear un nuevo perfil de medidas</p>
                  </button>
                </div>
              </div>
            )}

            {/* nombre de perfil */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
              <div className="flex-1">
                <label className="text-cream text-sm mb-2 block">Nombre del perfil</label>
                <Input
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  placeholder="Ej: Principal, Casual, etc."
                  className="bg-card border-border/50 text-cream"
                  maxLength={50}/>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={unit === "cm" ? "gold" : "outline"}
                  size="sm"
                  onClick={() => setUnit("cm")}>Centímetros
                </Button>
                <Button
                  variant={unit === "in" ? "gold" : "outline"}
                  size="sm"
                  onClick={() => setUnit("in")}>Pulgadas
                </Button>
              </div>
            </div>

            {/* Measurement */}
            <div className="grid md:grid-cols-2 gap-6">
              {(Object.keys(fieldLabels) as (keyof MeasurementFields)[]).map((field) => (
                <div key={field} className="space-y-2">
                  <label className="text-cream text-sm flex items-center gap-2">
                    <Ruler size={14} className="text-gold" />
                    {fieldLabels[field]}
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      inputMode="decimal"
                      value={measurements[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      placeholder={`Ej: ${unit === "cm" ? "45" : "17.7"}`}
                      className="bg-card border-border/50 text-cream pr-12"/>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                      {unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-8 border-t border-border/30">
              <Button variant="outline" onClick={() => router.back()}>
                <ArrowLeft className="mr-2" size={18} />
                Volver
              </Button>
              <Button variant="gold" onClick={handleSave} disabled={saving}>
                <Save className="mr-2" size={18} />
                {saving ? "Guardando..." : selectedProfileId ? "Actualizar Medidas" : "Guardar Medidas"}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default function Medidas() {
  return (
    <Suspense fallback={
      <Layout>
        <section className="py-20 min-h-[80vh] flex items-center justify-center">
          <div className="text-cream">Cargando...</div>
        </section>
      </Layout>
    }>
      <MedidasContent />
    </Suspense>
  );
}