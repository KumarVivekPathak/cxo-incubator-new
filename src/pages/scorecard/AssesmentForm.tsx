import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [form, setForm] = useState({
    firstName: "", lastName: "",
    email: "", mobile: "",
    roleLevel: "", experience: "",
    organisation: "", city: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    navigate("/assessment");
  };

  const inputClass =
    "w-full px-4 py-3 text-sm border border-maroon text-black placeholder:text-black/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all duration-200 bg-white rounded-sm";

  const labelClass =
    "block text-xs font-bold tracking-[2px] capitalize text-maroon mb-2";

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl bg-white border border-maroon rounded-md">

        {/* Gold top border */}
        <div className="h-2 bg-gold" />

        <div className="p-10">
          {/* Header */}
          <h2 className="text-2xl font-bold text-maroon mb-2">
            Begin Your Assessment
          </h2>
          <p className="text-sm text-black mb-8 leading-relaxed">
            Your results are personalised to your profile. Complete all fields
            to receive the most accurate reading.
          </p>

          {/* Form Grid */}
          <div className="grid grid-cols-2 gap-5">

            <div>
              <label className={labelClass}>First Name <span className="text-red-500">*</span></label>
              <input name="firstName" placeholder="e.g. Priya"
                value={form.firstName} onChange={handleChange}
                className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Last Name</label>
              <input name="lastName" placeholder="e.g. Sharma"
                value={form.lastName} onChange={handleChange}
                className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Email Address <span className="text-red-500">*</span></label>
              <input name="email" type="email" placeholder="priya@company.com"
                value={form.email} onChange={handleChange}
                className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Mobile Number <span className="text-red-500">*</span></label>
              <input name="mobile" placeholder="+91 98765 43210"
                value={form.mobile} onChange={handleChange}
                className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Current Role Level <span className="text-red-500">*</span></label>
              <select name="roleLevel" value={form.roleLevel}
                onChange={handleChange} className={inputClass}>
                <option value="" disabled>Select your level</option>
                {ROLE_LEVELS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Years of Experience </label>
              <select name="experience" value={form.experience}
                onChange={handleChange} className={inputClass}>
                <option value="" disabled>Select range</option>
                {EXPERIENCE_RANGES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Organisation Name</label>
              <input name="organisation" placeholder="e.g. Infosys, HDFC Bank"
                value={form.organisation} onChange={handleChange}
                className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>City / Location</label>
              <input name="city" placeholder="e.g. Mumbai"
                value={form.city} onChange={handleChange}
                className={inputClass} />
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="relative overflow-hidden group w-full mt-8 py-4 text-sm font-bold rounded-full tracking-[2.5px] bg-maroon text-white transition-colors duration-300"
          >
            <span className="relative z-10">Begin My CXO Scorecard →</span>
            <span className="absolute inset-0 bg-deep-maroon translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>

          {/* Trust row */}
          <div className="flex items-center justify-center gap-6 mt-5">
            {["🔒 Completely Confidential", "⏱ Takes 8 Minutes", "✦ No Generic Advice"].map((t) => (
              <span key={t} className="text-xs text-black">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}