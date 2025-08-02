import { Download } from "lucide-react";
import toast from "react-hot-toast";

export default function ExportJSON({ fields }) {
  const exportData = () => {
    if (!fields.length) return toast.error("Nothing to export");

    const json = JSON.stringify(fields, null, 2);
    navigator.clipboard.writeText(json).then(() => toast.success("Copied to clipboard!"));

    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "form-structure.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex justify-center mt-10">
      <button
        onClick={exportData}
        className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition"
      >
        <Download size={20} /> Export JSON
      </button>
    </div>
  );
}