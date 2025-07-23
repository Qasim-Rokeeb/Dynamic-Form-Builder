import { useState } from "react";
import FormBuilder from "./components/FormBuilder";
import FormPreview from "./components/FormPreview";
import ExportJSON from "./components/ExportJSON";

export default function App() {
  const [fields, setFields] = useState([]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-center">🛠️ Dynamic Form Builder</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <FormBuilder fields={fields} setFields={setFields} />
        <FormPreview fields={fields} />
      </div>
      <ExportJSON fields={fields} />
    </main>
  );
}
