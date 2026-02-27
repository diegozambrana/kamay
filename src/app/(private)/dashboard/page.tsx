import { createClient } from "@/lib/supabase/server";
import { AuthButton } from "@/components/auth/auth-button";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-svh flex flex-col">
      {/* Navbar */}
      <header className="border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <AuthButton />
      </header>

      {/* Content */}
      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Bienvenido de vuelta 👋</h2>
            <p className="text-muted-foreground mt-1">
              Has iniciado sesión como{" "}
              <span className="font-medium text-foreground">{user?.email}</span>
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border p-4 space-y-1">
              <p className="text-sm text-muted-foreground">ID de usuario</p>
              <p className="text-sm font-mono break-all">{user?.id}</p>
            </div>
            <div className="rounded-lg border p-4 space-y-1">
              <p className="text-sm text-muted-foreground">Proveedor</p>
              <p className="text-sm font-medium capitalize">
                {user?.app_metadata?.provider ?? "email"}
              </p>
            </div>
            <div className="rounded-lg border p-4 space-y-1">
              <p className="text-sm text-muted-foreground">Cuenta creada</p>
              <p className="text-sm font-medium">
                {user?.created_at
                  ? new Date(user.created_at).toLocaleDateString("es-MX", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "—"}
              </p>
            </div>
            <div className="rounded-lg border p-4 space-y-1">
              <p className="text-sm text-muted-foreground">Correo confirmado</p>
              <p className="text-sm font-medium">
                {user?.email_confirmed_at ? "Sí ✓" : "Pendiente"}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
