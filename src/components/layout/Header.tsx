import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthButton } from "@/components/auth/auth-button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-6">
      <div className="flex flex-1 items-center justify-end gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <AuthButton />
      </div>
    </header>
  );
}
