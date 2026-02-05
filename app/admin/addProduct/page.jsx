'use client';
import { useEffect, useState, useMemo } from "react"
import axios from "axios"
import { toast } from "react-toastify";
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

export default function CarForm() {
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill-new'), { ssr: false }), []);

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [images, setImages] = useState([])
  const [previewImages, setPreviewImages] = useState([])
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories')
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
      toast.success("✅ The car was successfully added.")
      // Reset form
      setName("")
      setDescription("")
      setCategory("")
      setImages([])
      setPreviewImages([])
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Upload failed');

    }

  }
  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4 p-4 bg-white rounded shadow max-w-2xl mx-auto mt-10 text-black">
      <h2 className="text-xl font-bold"> Add Car </h2>

      <div className="flex flex-col gap-2">
        <label className="font-semibold">Car Name</label>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold">Description</label>
        <ReactQuill
          theme="snow"
          value={description}
          onChange={setDescription}
          className="bg-white text-black h-64 mb-12"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold">Category</label>
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className="w-full border p-2 rounded"
          required
        >
          <option value="" className="text-gray-400 hover:cursor-pointer">Choose category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold">Images</label>
        <input
          type="file"
          multiple
          name="images"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />
      </div>

      {/* Preview Images */}
      <div className="flex gap-2 flex-wrap">
        {previewImages.map((src, index) => (
          <div key={index} className="relative w-24 h-24 border rounded overflow-hidden">
            <img src={src} alt={`preview-${index}`} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-700 transition"
              title="Delete image"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-bold w-full sm:w-auto transition-colors">
        Add Car
      </button>
    </form>
  )
}
