"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { UserMenu } from "@/components/auth/user-menu";

type AuthUser = {
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
};

export function AuthButton() {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const supabase = createClient();
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        setUser(null);
        return;
      }

      setUser({
        email: authUser.email ?? "",
        fullName: authUser.user_metadata?.full_name ?? null,
        avatarUrl: authUser.user_metadata?.avatar_url ?? null,
      });
    };

    void loadUser();
  }, []);

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
      email={user.email}
      fullName={user.fullName}
      avatarUrl={user.avatarUrl}
    />
  );
}
