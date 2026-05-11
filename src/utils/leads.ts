import { supabase } from "./supabase";

export type LeadPayload = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  roleLevel: string;
  experience: string;
  organisation: string;
  city: string;
};

export type SubmitResult =
  | { success: true; id: number }
  | { success: false; error: string };

// ─── Constants ─────────────────────────────
const SHEET_URL = import.meta.env.VITE_SHEET_URL;
// ─── 1. Insert lead into Supabase ─────────────────────────────
export async function addLeadToDb(form: LeadPayload): Promise<SubmitResult> {
  try {
    const payload = {
      first_name: form.firstName?.trim(),
      last_name: form.lastName?.trim() || null,
      email: form.email?.trim().toLowerCase(),
      phone: form.mobile?.trim(),
      role_level: form.roleLevel?.trim(),
      experience: form.experience?.trim() || null,
      organisation: form.organisation?.trim() || null,
      city: form.city?.trim() || null,
    };

    const { data, error } = await supabase
      .from("leads")
      .insert(payload)
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert failed:", error);
      return { success: false, error: mapDbError(error) };
    }

    return { success: true, id: data.id };
  } catch (err) {
    console.error("Unexpected DB error:", err);
    return {
      success: false,
      error: "Network error. Please check your connection.",
    };
  }
}

// ─── 2. Send to Google Sheet (fire-and-forget) ─────────────────────────────
export async function addLeadToSheet(
  form: LeadPayload,
  leadId: string
): Promise<void> {
  try {
    await fetch(SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        ...form,
        phone: form.mobile, // align with DB column name
        leadId,
      }),
    });
  } catch (err) {
    console.warn("Google Sheet sync failed (non-blocking):", err);
  }
}

// ─── 3. Orchestrator ─────────────────────────────
export async function submitLead(form: LeadPayload): Promise<SubmitResult> {
  // DB is source of truth — must succeed
  const dbResult = await addLeadToDb(form);
  if (!dbResult.success) return dbResult;

  // Sheet is fire-and-forget — don't block the user
  addLeadToSheet(form, dbResult.id);

  return { success: true, id: dbResult.id };
}

// ─── Error mapping helper ─────────────────────────────
function mapDbError(error: { code?: string; message?: string }): string {
  switch (error.code) {
    case "42501":
      return "Database permission error. Please contact support.";
    case "23505":
      return "This email is already registered.";
    case "23502":
      return "Some required fields are missing.";
    default:
      return error.message || "Could not save your details. Please try again.";
  }
}