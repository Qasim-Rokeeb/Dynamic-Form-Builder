import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Plus, Trash2, GripVertical } from "lucide-react";
import toast from "react-hot-toast";

const fieldTypes = ["text", "number", "email", "select", "checkbox"];

function SortableField({ field, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: field.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 bg-slate-700/50 backdrop-blur-sm p-3 rounded-lg shadow"
    >
      <button {...attributes} {...listeners} className="cursor-grab text-slate-400">
        <GripVertical size={18} />
      </button>
      <span className="flex-1">
        {field.label} <span className="text-xs text-slate-400">({field.type})</span>
      </span>
      <button onClick={() => onRemove(field.id)} className="text-red-400 hover:text-red-300">
        <Trash2 size={18} />
      </button>
    </div>
  );
}

export default function FormBuilder({ fields, setFields }) {
  const [label, setLabel] = useState("");
  const [type, setType] = useState("text");
  const [options, setOptions] = useState("");

  const addField = () => {
    if (!label.trim()) return toast.error("Label is required");

    const newField = {
      id: crypto.randomUUID(),
      label: label.trim(),
      type,
      ...(type === "select" || type === "checkbox"
        ? { options: options.split(",").map((o) => o.trim()) }
        : {}),
    };

    setFields([...fields, newField]);
    setLabel("");
    setOptions("");
    setType("text");
    toast.success("Field added!");
  };

  const handleRemove = (id) => setFields(fields.filter((f) => f.id !== id));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setFields((items) => {
        const old = items.findIndex((i) => i.id === active.id);
        const neu = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, old, neu);
      });
    }
  };

  return (
    <section className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl shadow-xl p-5">
      <h2 className="text-xl font-semibold mb-4 text-indigo-300">Add New Field</h2>

      <label className="block mb-1 text-sm">Label</label>
      <input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="e.g. First Name"
        className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 mb-2 focus:ring-2 focus:ring-indigo-500 outline-none"
      />

      <label className="block mb-1 text-sm">Type</label>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 mb-2 focus:ring-2 focus:ring-indigo-500 outline-none"
      >
        {fieldTypes.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      {(type === "select" || type === "checkbox") && (
        <>
          <label className="block mb-1 text-sm">Options (comma separated)</label>
          <input
            value={options}
            onChange={(e) => setOptions(e.target.value)}
            placeholder="Red,Green,Blue"
            className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 mb-2"
          />
        </>
      )}

      <button
        onClick={addField}
        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded-md transition"
      >
        <Plus size={18} /> Add Field
      </button>

      {fields.length > 0 && (
        <>
          <h3 className="text-lg font-medium mt-6 mb-3 text-indigo-300">Fields</h3>
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {fields.map((f) => (
                  <SortableField key={f.id} field={f} onRemove={handleRemove} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </>
      )}
    </section>
  );
}