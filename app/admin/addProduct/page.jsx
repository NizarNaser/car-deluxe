'use client';
// components/CarForm.jsx
import { useEffect, useState } from "react"
import axios from "axios"

export default function CarForm() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [images, setImages] = useState([])
  const [previewImages, setPreviewImages] = useState([])
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories') // جلب التصنيفات
      setCategories(response.data)

    } catch (err) {
      console.error('Error fetching categories:', err)
    }
  }
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setImages(files)

    const previews = files.map((file) => URL.createObjectURL(file))
    setPreviewImages(previews)
  }

  const handleRemoveImage = (indexToRemove) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove)
    const updatedPreviews = previewImages.filter((_, index) => index !== indexToRemove)

    setImages(updatedImages)
    setPreviewImages(updatedPreviews)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("name", name)
    formData.append("description", description)
    formData.append("category", category)

    images.forEach((image) => {
      formData.append("images", image)
    })

    try {
      const res = await axios.post("/api/cars", formData)
      alert("✅The car was successfully lifted.   ")
      // Reset form
      setName("")
      setDescription("")
      setCategory("")
      setImages([])
      setPreviewImages([])
    } catch (err) {
      console.error(err)
      alert("❌ Upload failed")
    }
  }
  useEffect(() => {
    fetchCategories()
  }, [])
  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4 p-4 bg-white rounded shadow max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold"> Add Car</h2>

      <input
        type="text"
        placeholder="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        placeholder="description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <select
        onChange={(e) => setCategory(e.target.value)}
        value={category}
        className="w-full border p-2 rounded"
        required
      >
        <option value="" className="text-gray-400 hover:cursor-pointer"> choose category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>



      <input
        type="file"
        multiple
        name="images"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full"
      />

      {/* معاينة الصور مع زر حذف */}
      <div className="flex gap-2 flex-wrap">
        {previewImages.map((src, index) => (
          <div key={index} className="relative w-20 h-20">
            <img src={src} alt={`preview-${index}`} className="w-full h-full object-cover rounded" />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              title=" delete image"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        add
      </button>
    </form>
  )
}
