import { CheckIcon } from "@/app/components/ui/icons";
import { Button } from "@/app/components/ui/Button";
import { brand } from "@/app/content/site";

/** Calm confirmation panel that replaces the form on success. */
export function FormSuccess({ message }: { message: string }) {
  return (
    <div
      className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-bg-elevated p-8 text-center shadow-[var(--shadow-sm)] sm:p-10"
      role="status"
    >
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-success/12 text-success">
        <CheckIcon className="h-7 w-7" />
      </span>
      <div>
        <h2 className="font-display text-2xl font-semibold tracking-[var(--tracking-heading)] text-text">
          Request received
        </h2>
        <p className="mx-auto mt-3 max-w-md text-text-muted">{message}</p>
        <p className="mt-2 text-sm text-text-muted">{brand.responseSla}</p>
      </div>
      <Button href="/" variant="secondary" size="md">
        Back to home
      </Button>
    </div>
  );
}
