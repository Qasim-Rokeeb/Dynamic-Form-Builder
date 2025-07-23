export default function FormPreview({ fields }) {
  return (
    <section className="bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-3">Form Preview</h2>
      {fields.length === 0 ? (
        <p className="text-gray-500 italic">No fields added yet</p>
      ) : (
        <form className="space-y-4">
          {fields.map((field) => (
            <div key={field.id}>
              <label className="block font-medium mb-1">{field.label}</label>
              {field.type === "select" ? (
                <select className="border p-2 rounded w-full">
                  <option value="">Select...</option>
                </select>
              ) : field.type === "checkbox" ? (
                <input type="checkbox" className="mr-2" />
              ) : (
                <input type={field.type} className="border p-2 rounded w-full" />
              )}
            </div>
          ))}
        </form>
      )}
    </section>
  );
}
