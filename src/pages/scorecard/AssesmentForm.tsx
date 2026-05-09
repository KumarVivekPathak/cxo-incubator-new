import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useInView } from "../../hooks/useInView";

const ROLE_LEVELS = [
  "Senior Manager / AGM",
  "Deputy General Manager",
  "General Manager",
  "Vice President",
  "Senior Vice President",
  "Director",
  "C-Suite / CXO",
  "Founder / Co-Founder",
] as const;

const EXPERIENCE_RANGES = [
  "8 – 12 years",
  "12 – 16 years",
  "16 – 20 years",
  "20 – 25 years",
  "25+ years",
] as const;

// ─── Zod schema ─────────────────────────────────────────────
const formSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "Too long"),
  lastName: z.string().max(50, "Too long"),
  organisation: z.string().max(100, "Too long"),
  city: z.string().max(50, "Too long"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  mobile: z
    .string()
    .min(1, "Mobile number is required")
    .refine(
      (v) => v.replace(/\D/g, "").length >= 10,
      "Please enter a valid mobile number (at least 10 digits)"
    ),
  roleLevel: z
    .string()
    .refine(
      (v) => ROLE_LEVELS.includes(v as (typeof ROLE_LEVELS)[number]),
      "Please select your role level"
    ),
  experience: z.string(),
});

type FormData = z.infer<typeof formSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

const SheetAppURL ="https://script.google.com/macros/s/AKfycbxEXvINWO4c7YVhBRWskQJeIFONP9i5H-19jR8mm_VTMZdhDEgiBaEQfaBVt8gyQG0H/exec"
export default function AssessmentForm() {
  const navigate = useNavigate();
  const [cardRef, cardInView] = useInView<HTMLDivElement>(0.1);

  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    roleLevel: "",
    experience: "",
    organisation: "",
    city: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // ─── Validate single field ─────────────────────────────
  // Validate by snapshotting the whole form, then pulling out only this
  // field's error. More reliable than schema.pick() across Zod versions.
  const validateField = (
    name: keyof FormData,
    value: string
  ): string | undefined => {
    const snapshot = { ...form, [name]: value };
    const result = formSchema.safeParse(snapshot);
    if (result.success) return undefined;
    return result.error.issues.find((e) => e.path[0] === name)?.message;
  };

  // ─── Validate whole form ─────────────────────────────
  const validateAll = (data: FormData): boolean => {
    const result = formSchema.safeParse(data);
    if (result.success) {
      setErrors({});
      return true;
    }
    const next: FormErrors = {};
    result.error.issues.forEach((err) => {
      const field = err.path[0] as keyof FormData;
      if (!next[field]) {
        next[field] = err.message;
      }
    });
    setErrors(next);
    return false;
  };

  // ─── Handle input changes ─────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;

    setForm((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    // Live validation only after the field has been touched once
    if (touched[fieldName]) {
      const error = validateField(fieldName, value);
      setErrors((prev) => ({
        ...prev,
        [fieldName]: error,
      }));
    }
  };

  // ─── Handle blur ─────────────────────────────
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const fieldName = e.target.name as keyof FormData;

    setTouched((prev) => ({
      ...prev,
      [fieldName]: true,
    }));

    const error = validateField(fieldName, form[fieldName]);
    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  // ─── Submit ─────────────────────────────
  const handleSubmit = async () => {
    setSubmitError(null);

    // Mark all fields as touched so errors render
    const allTouched = Object.keys(form).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {} as Record<string, boolean>
    );
    setTouched(allTouched);

    if (!validateAll(form)) return;

    if (!SheetAppURL) {
      setSubmitError("Submission endpoint is not configured.");
      return;
    }

    setIsSubmitting(true);
    try {
      // no-cors: response is opaque, but the request lands.
      // If fetch throws, we treat it as a network failure.
      await fetch(SheetAppURL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(form),
      });

      localStorage.setItem("cxo_user", JSON.stringify(form));
      navigate("/assessment");
    } catch (err) {
      setSubmitError(
        "Could not reach the server. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Animation helper ─────────────────────────────
  const fadeUp = (visible: boolean) =>
    visible ? "animate-fade-in-up" : "opacity-0";

  // ─── Styles ─────────────────────────────
  const baseInputClass =
    "w-full px-4 py-3 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 transition-all duration-200 bg-white rounded-sm border";

  const inputClass = (fieldName: keyof FormData) => {
    const showError = errors[fieldName] && touched[fieldName];
    return `${baseInputClass} ${
      showError
        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
        : "border-maroon/70 focus:border-gold focus:ring-gold/20"
    }`;
  };

  const labelClass =
    "block text-xs font-bold tracking-[2px] capitalize text-maroon mb-2";

  // ─── Field types ─────────────────────────────
  type InputField = {
    name: keyof FormData;
    label: string;
    required: boolean;
    type: "input";
    placeholder: string;
    inputType: string;
  };

  type SelectField = {
    name: keyof FormData;
    label: string;
    required: boolean;
    type: "select";
    options: readonly string[];
    placeholder: string;
  };

  type Field = InputField | SelectField;

  // ─── Form fields ─────────────────────────────
  const FIELDS: readonly Field[] = [
    {
      name: "firstName",
      label: "First Name",
      required: true,
      type: "input",
      placeholder: "e.g. Priya",
      inputType: "text",
    },
    {
      name: "lastName",
      label: "Last Name",
      required: false,
      type: "input",
      placeholder: "e.g. Sharma",
      inputType: "text",
    },
    {
      name: "email",
      label: "Email Address",
      required: true,
      type: "input",
      placeholder: "priya@company.com",
      inputType: "email",
    },
    {
      name: "mobile",
      label: "Mobile Number",
      required: true,
      type: "input",
      placeholder: "+91 98765 43210",
      inputType: "tel",
    },
    {
      name: "roleLevel",
      label: "Current Role Level",
      required: true,
      type: "select",
      options: ROLE_LEVELS,
      placeholder: "Select your level",
    },
    {
      name: "experience",
      label: "Years of Experience",
      required: false,
      type: "select",
      options: EXPERIENCE_RANGES,
      placeholder: "Select range",
    },
    {
      name: "organisation",
      label: "Organisation Name",
      required: false,
      type: "input",
      placeholder: "e.g. Infosys, HDFC Bank",
      inputType: "text",
    },
    {
      name: "city",
      label: "City / Location",
      required: false,
      type: "input",
      placeholder: "e.g. Mumbai",
      inputType: "text",
    },
  ];

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-12 sm:py-16">
      <div
        ref={cardRef}
        className={`w-full max-w-2xl bg-white border border-maroon rounded-md overflow-hidden shadow-sm
        ${cardInView ? "animate-fade-in-scale" : "opacity-0"}`}
      >
        {/* Top border */}
        <div className="h-2 bg-gold" />

        <div className="p-6 sm:p-8 md:p-10">
          {/* Header */}
          <h2
            className={`text-xl sm:text-2xl font-bold text-maroon mb-2 ${fadeUp(
              cardInView
            )}`}
            style={{ animationDelay: cardInView ? "200ms" : undefined }}
          >
            Begin Your Assessment
          </h2>

          <p
            className={`text-xs sm:text-sm text-black/80 mb-6 sm:mb-8 leading-relaxed ${fadeUp(
              cardInView
            )}`}
            style={{ animationDelay: cardInView ? "320ms" : undefined }}
          >
            Your results are personalised to your profile. Complete all fields
            to receive the most accurate reading.
          </p>

          {/* Form grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {FIELDS.map((field, i) => {
              const showError = errors[field.name] && touched[field.name];

              return (
                <div
                  key={field.name}
                  className={fadeUp(cardInView)}
                  style={{
                    animationDelay: cardInView ? `${450 + i * 70}ms` : undefined,
                  }}
                >
                  <label className={labelClass}>
                    {field.label}
                    {field.required && (
                      <span className="text-red-500"> *</span>
                    )}
                  </label>

                  {field.type === "input" ? (
                    <input
                      name={field.name}
                      type={field.inputType}
                      placeholder={field.placeholder}
                      value={form[field.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={inputClass(field.name)}
                      aria-invalid={!!showError}
                      aria-describedby={
                        showError ? `${field.name}-error` : undefined
                      }
                    />
                  ) : (
                    <select
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={inputClass(field.name)}
                      aria-invalid={!!showError}
                      aria-describedby={
                        showError ? `${field.name}-error` : undefined
                      }
                    >
                      <option value="" disabled>
                        {field.placeholder}
                      </option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}

                  {/* Error message slot — fixed height prevents layout shift */}
                  <div className="min-h-[20px] mt-1">
                    {showError && (
                      <p
                        id={`${field.name}-error`}
                        className="text-xs text-red-500"
                      >
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Server / network error */}
          {submitError && (
            <div className="mt-5 p-3 bg-red-50 border border-red-200 rounded-sm">
              <p className="text-xs text-red-600">{submitError}</p>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`relative overflow-hidden group w-full mt-6 sm:mt-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold rounded-full tracking-[2px] sm:tracking-[2.5px] bg-maroon text-white transition-all duration-300 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
            ${fadeUp(cardInView)}`}
            style={{ animationDelay: cardInView ? "1050ms" : undefined }}
          >
            <span className="relative z-10">
              {isSubmitting ? "Submitting..." : "Begin My CXO Scorecard →"}
            </span>
            <span className="absolute inset-0 bg-deep-maroon translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>

          {/* Trust row */}
          <div
            className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-6 mt-5 ${
              cardInView ? "animate-fade-in" : "opacity-0"
            }`}
            style={{ animationDelay: cardInView ? "1200ms" : undefined }}
          >
            {[
              "🔒 Completely Confidential",
              "⏱ Takes 8 Minutes",
              "✦ No Generic Advice",
            ].map((t) => (
              <span
                key={t}
                className="text-[11px] sm:text-xs text-black/80"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}