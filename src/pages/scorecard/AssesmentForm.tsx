import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
];

const EXPERIENCE_RANGES = [
  "8 – 12 years",
  "12 – 16 years",
  "16 – 20 years",
  "20 – 25 years",
  "25+ years",
];

export default function AssessmentForm() {
  const navigate = useNavigate();
  const [cardRef, cardInView] = useInView<HTMLDivElement>(0.1);

  const [form, setForm] = useState({
    firstName: "", lastName: "",
    email: "", mobile: "",
    roleLevel: "", experience: "",
    organisation: "", city: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    navigate("/assessment");
  };

  const inputClass =
    "w-full px-4 py-3 text-sm border border-maroon/70 text-black placeholder:text-black/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-200 bg-white rounded-sm";

  const labelClass =
    "block text-xs font-bold tracking-[2px] capitalize text-maroon mb-2";

  const fadeUp = (visible: boolean) =>
    visible ? "animate-fade-in-up" : "opacity-0";

  // Form fields config — drives both render + stagger order
  const FIELDS = [
    { name: "firstName", label: "First Name", required: true, type: "input", placeholder: "e.g. Priya", inputType: "text" },
    { name: "lastName", label: "Last Name", required: false, type: "input", placeholder: "e.g. Sharma", inputType: "text" },
    { name: "email", label: "Email Address", required: true, type: "input", placeholder: "priya@company.com", inputType: "email" },
    { name: "mobile", label: "Mobile Number", required: true, type: "input", placeholder: "+91 98765 43210", inputType: "tel" },
    { name: "roleLevel", label: "Current Role Level", required: true, type: "select", options: ROLE_LEVELS, placeholder: "Select your level" },
    { name: "experience", label: "Years of Experience", required: false, type: "select", options: EXPERIENCE_RANGES, placeholder: "Select range" },
    { name: "organisation", label: "Organisation Name", required: false, type: "input", placeholder: "e.g. Infosys, HDFC Bank", inputType: "text" },
    { name: "city", label: "City / Location", required: false, type: "input", placeholder: "e.g. Mumbai", inputType: "text" },
  ] as const;

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-12 sm:py-16">
      <div
        ref={cardRef}
        className={`w-full max-w-2xl bg-white border border-maroon rounded-md overflow-hidden shadow-sm
                    ${cardInView ? "animate-fade-in-scale" : "opacity-0"}`}
      >
        {/* Gold top border */}
        <div className="h-2 bg-gold" />

        <div className="p-6 sm:p-8 md:p-10">
          {/* Header */}
          <h2
            className={`text-xl sm:text-2xl font-bold text-maroon mb-2 ${fadeUp(cardInView)}`}
            style={{ animationDelay: cardInView ? "200ms" : undefined }}
          >
            Begin Your Assessment
          </h2>
          <p
            className={`text-xs sm:text-sm text-black/80 mb-6 sm:mb-8 leading-relaxed ${fadeUp(cardInView)}`}
            style={{ animationDelay: cardInView ? "320ms" : undefined }}
          >
            Your results are personalised to your profile. Complete all fields
            to receive the most accurate reading.
          </p>

          {/* Form Grid — 1 col mobile, 2 cols sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {FIELDS.map((field, i) => (
              <div
                key={field.name}
                className={fadeUp(cardInView)}
                style={{
                  animationDelay: cardInView
                    ? `${450 + i * 70}ms`
                    : undefined,
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
                    value={form[field.name as keyof typeof form]}
                    onChange={handleChange}
                    className={inputClass}
                  />
                ) : (
                  <select
                    name={field.name}
                    value={form[field.name as keyof typeof form]}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="" disabled>
                      {field.placeholder}
                    </option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className={`relative overflow-hidden group w-full mt-6 sm:mt-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold rounded-full tracking-[2px] sm:tracking-[2.5px] bg-maroon text-white transition-all duration-300 hover:scale-[1.01]
                        ${fadeUp(cardInView)}`}
            style={{ animationDelay: cardInView ? "1050ms" : undefined }}
          >
            <span className="relative z-10">Begin My CXO Scorecard →</span>
            <span className="absolute inset-0 bg-deep-maroon translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>

          {/* Trust row */}
          <div
            className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-6 mt-5 ${
              cardInView ? "animate-fade-in" : "opacity-0"
            }`}
            style={{ animationDelay: cardInView ? "1200ms" : undefined }}
          >
            {["🔒 Completely Confidential", "⏱ Takes 8 Minutes", "✦ No Generic Advice"].map((t) => (
              <span key={t} className="text-[11px] sm:text-xs text-black/80">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}