import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-2xl">¡Gracias por registrarte!</CardTitle>
            <CardDescription>Revisa tu correo para confirmar</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Te hemos enviado un correo de confirmación. Por favor revisa tu
              bandeja de entrada y haz clic en el enlace para activar tu cuenta
              antes de iniciar sesión.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
