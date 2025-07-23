export default function ExportJSON({ fields }) {
  const exportData = () => {
    const json = JSON.stringify(fields, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "form-structure.json";
    link.click();
  };

  return (
    <div className="text-center mt-8">
      <button
        onClick={exportData}
        className="bg-blue-950 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        📥 Export Form as JSON
      </button>
    </div>
  );
}
