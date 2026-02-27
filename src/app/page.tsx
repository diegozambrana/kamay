import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthButton } from "@/components/auth/auth-button";

export default function HomePage() {
  return (
    <div className="min-h-svh flex flex-col">
      {/* Navbar */}
      <header className="border-b px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold">
          Kamay
        </Link>
        <AuthButton />
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="text-center space-y-6 max-w-xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Bienvenido a Kamay
          </h1>
          <p className="text-muted-foreground text-lg">
            Esta es una vista pública. Inicia sesión o crea una cuenta para
            acceder al dashboard.
          </p>
          <div className="flex gap-3 justify-center">
            <Button asChild size="lg">
              <Link href="/auth/login">Iniciar sesión</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/auth/register">Crear cuenta</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
