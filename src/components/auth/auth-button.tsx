import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { UserMenu } from "@/components/auth/user-menu";

export async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex gap-2">
        <Button asChild size="sm" variant="outline">
          <Link href="/auth/login">Iniciar sesión</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/auth/register">Registrarse</Link>
        </Button>
      </div>
    );
  }

  return (
    <UserMenu
      email={user.email ?? ""}
      fullName={user.user_metadata?.full_name ?? null}
      avatarUrl={user.user_metadata?.avatar_url ?? null}
    />
  );
}
