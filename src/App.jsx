import { useState } from "react";
import { Toaster } from "react-hot-toast";
import FormBuilder from "./components/FormBuilder";
import FormPreview from "./components/FormPreview";
import ExportJSON from "./components/ExportJSON";

export default function App() {
  const [fields, setFields] = useState([]);

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-slate-100 p-6">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          🛠️ Dynamic Form Builder
        </h1>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <FormBuilder fields={fields} setFields={setFields} />
          <FormPreview fields={fields} />
        </div>

        <ExportJSON fields={fields} />
      </main>
      <Toaster position="bottom-center" />
    </>
  );
}