import type { WebsiteRequest } from "@/lib/validation";

/**
 * The single integration seam for captured leads.
 *
 * In this build it validates shape and resolves — no real persistence yet.
 * Nothing else in the app knows how leads are stored, so wiring a real
 * destination happens only here.
 *
 * TODO(backend): send to email / CRM / database / webhook. Keep this the ONLY
 * place that touches secrets or external services.
 */
export async function persistLead(lead: WebsiteRequest): Promise<void> {
  // Server-side breadcrumb so submissions are observable in dev logs.
  if (process.env.NODE_ENV !== "production") {
    console.info("[lead] website request received:", {
      munName: lead.munName,
      email: lead.email,
    });
  }
  // No-op success. Replace with real delivery in the backend phase.
  return Promise.resolve();
}
