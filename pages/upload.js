import { useState } from "react"

const niches = ["Beauty", "Tech", "Fashion", "Home", "Fitness"]

export default function UploadPage() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    image_url: "",
    niche: "Beauty"
  })
  const [status, setStatus] = useState("")

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus("")

    const response = await fetch("/api/products/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price)
      })
    })

    const data = await response.json()
    if (response.ok && data.success) {
      setStatus("Product Uploaded 🔥")
      setForm({ title: "", price: "", image_url: "", niche: "Beauty" })
      return
    }

    setStatus(data.error || "Upload failed")
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <div className="max-w-xl mx-auto rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-xl">
        <h1 className="text-2xl font-bold mb-6">Upload Product</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={onChange}
            className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2"
            required
          />
          <input
            name="price"
            type="number"
            step="0.01"
            placeholder="Price"
            value={form.price}
            onChange={onChange}
            className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2"
            required
          />
          <input
            name="image_url"
            type="url"
            placeholder="Image URL"
            value={form.image_url}
            onChange={onChange}
            className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2"
          />
          <select
            name="niche"
            value={form.niche}
            onChange={onChange}
            className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2"
          >
            {niches.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-4 py-2 font-semibold hover:bg-indigo-500"
          >
            Upload
          </button>
        </form>
        {status && <p className="mt-4 text-green-400">{status}</p>}
      </div>
    </div>
  )
}
