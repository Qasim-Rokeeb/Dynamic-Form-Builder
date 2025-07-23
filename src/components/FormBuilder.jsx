import { useState } from "react";

const fieldTypes = ["text", "number", "email", "select", "checkbox"];

export default function FormBuilder({ fields, setFields }) {
  const [label, setLabel] = useState("");
  const [type, setType] = useState("text");

  const addField = () => {
    const id = Date.now();
    setFields([...fields, { id, label, type }]);
    setLabel("");
    setType("text");
  };

  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  return (
    <section className="bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-3">Add New Field</h2>
      <input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Field label"
        className="border p-2 w-full mb-2 rounded"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      >
        {fieldTypes.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      <button
        onClick={addField}
        className="bg-green-900 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        ➕ Add Field
      </button>

      <ul className="mt-4 space-y-2">
        {fields.map((field) => (
          <li
            key={field.id}
            className="flex justify-between items-center bg-gray-100 p-2 rounded"
          >
            <span>{field.label} ({field.type})</span>
            <button onClick={() => removeField(field.id)} className="text-red-600">🗑️</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
