import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PrivateLayoutShell } from "@/components/layout/PrivateLayoutShell";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <PrivateLayoutShell>{children}</PrivateLayoutShell>
  );
}
