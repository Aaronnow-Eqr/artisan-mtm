"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().trim().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2, "El nombre es obligatorio"),
  lastName: z.string().min(2, "El apellido es obligatorio"),
});

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!isLogin && password !== confirmPassword) {
        throw new Error("Las contraseñas no coinciden");
      }

      const schema = isLogin ? loginSchema : registerSchema;
      const dataToValidate = isLogin
        ? { email, password }
        : { name, lastName, email, password };

      const validation = schema.safeParse(dataToValidate);

      if (!validation.success) {
        throw new Error(validation.error.errors[0]?.message);
      }

      const res = await fetch(
        isLogin ? "/api/auth/login" : "/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToValidate),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error de autenticación");
      }

      toast({
        title: isLogin ? "¡Bienvenido!" : "¡Cuenta creada!",
        description: isLogin
          ? "Has iniciado sesión correctamente"
          : "Tu cuenta ha sido creada con éxito",
      });

      router.push("/mi-cuenta");
      router.refresh();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message ?? "Algo salió mal",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-20 min-h-[80vh] flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            <div className="bg-charcoal-light border border-gold/20 rounded-lg p-8">
              <h1 className="font-display text-3xl text-gold text-center mb-8">
                {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-cream">
                        Nombre
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Juan"
                        className="bg-charcoal border-gold/30 text-cream"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-cream">
                        Apellido
                      </Label>
                      <Input
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Pérez"
                        className="bg-charcoal border-gold/30 text-cream"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-cream">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="bg-charcoal border-gold/30 text-cream"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-cream">
                    Contraseña
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-charcoal border-gold/30 text-cream"
                    required
                  />
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-cream">
                      Confirmar contraseña
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="bg-charcoal border-gold/30 text-cream"
                      required
                    />
                  </div>
                )}

                <Button type="submit" variant="gold" className="w-full" disabled={isLoading}>
                  {isLoading
                    ? "Cargando..."
                    : isLogin
                    ? "Iniciar Sesión"
                    : "Crear Cuenta"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-cream/70 hover:text-gold transition-colors text-sm"
                  type="button">
                  {isLogin
                    ? "¿No tienes cuenta? Regístrate"
                    : "¿Ya tienes cuenta? Inicia sesión"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
