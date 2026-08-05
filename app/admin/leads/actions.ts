"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { updateLeadStatus, type LeadStatus } from "@/lib/leads";

const ALLOWED: LeadStatus[] = ["new", "contacted", "archived"];

export async function setLeadStatus(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as LeadStatus;

  if (!id || !ALLOWED.includes(status)) {
    throw new Error("Invalid lead status update");
  }

  await updateLeadStatus(id, status);
  revalidatePath("/admin");
  revalidatePath("/admin/leads");
}
