import { AlertCircle } from "lucide-react";

export default function FormPreview({ fields }) {
  return (
    <section className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl shadow-xl p-5">
      <h2 className="text-xl font-semibold mb-4 text-indigo-300">Form Preview</h2>

      {fields.length === 0 ? (
        <div className="flex items-center gap-2 text-slate-400">
          <AlertCircle size={20} />
          <span>No fields added yet</span>
        </div>
      ) : (
        <form className="space-y-5">
          {fields.map((f) => (
            <div key={f.id}>
              <label className="block mb-1 font-medium text-sm text-slate-200">
                {f.label} {f.type !== "checkbox" && <span className="text-red-400">*</span>}
              </label>

              {f.type === "select" ? (
                <select className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option value="">Select…</option>
                  {f.options?.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : f.type === "checkbox" ? (
                <div className="space-y-2">
                  {f.options?.map((o) => (
                    <label key={o} className="flex items-center gap-2">
                      <input type="checkbox" className="accent-indigo-500" />
                      <span>{o}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <input
                  type={f.type}
                  className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder={`Enter ${f.label.toLowerCase()}`}
                />
              )}
            </div>
          ))}
        </form>
      )}
    </section>
  );
}