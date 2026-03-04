import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Breadcrumb } from "../Breadcrumb/Breadcrumb";

interface MainContainerProps {
  title: string;
  description?: string;
  breadcrumb?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  isEmpty?: boolean;
  error?: string;
  loading?: boolean;
}

export const MainContainer = ({
  title,
  description,
  breadcrumb,
  action,
  children,
  isEmpty,
  error,
  loading = false,
}: MainContainerProps) => {
  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Cargando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {breadcrumb && <Breadcrumb type={breadcrumb} />}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>

      {!isEmpty && !error && <div>{children}</div>}

      {isEmpty && !error && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No hay datos</AlertTitle>
          <AlertDescription>
            No tienes ningún elemento todavía. Crea uno para comenzar.
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};
