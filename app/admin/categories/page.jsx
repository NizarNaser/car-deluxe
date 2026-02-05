'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Trash2, Plus } from 'lucide-react';

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchCategories = async () => {
        try {
            const res = await axios.get('/api/categories');
            setCategories(res.data);
        } catch (err) {
            console.error(err);
            toast.error('Failed to fetch categories');
        }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!newCategory.trim()) return;

        setLoading(true);
        try {
            const res = await axios.post('/api/categories', { name: newCategory });
            toast.success('Category added');
            setNewCategory("");
            fetchCategories();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Failed to add category');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this category?')) return;

        try {
            await axios.delete(`/api/categories?id=${id}`);
            toast.success('Category deleted');
            fetchCategories();
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete category');
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 text-black'>
            <h1 className="text-2xl font-bold mb-6">Manage Categories</h1>

            {/* Add Category Form */}
            <form onSubmit={handleAddCategory} className="mb-8 flex gap-4 max-w-md">
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="New Category Name"
                    className="flex-1 border p-2 rounded focus:outline-none focus:border-black"
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-800 disabled:opacity-50"
                >
                    <Plus size={18} /> Add
                </button>
            </form>

            {/* Categories List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((cat) => (
                    <div key={cat._id} className="bg-white p-4 rounded shadow border flex justify-between items-center">
                        <span className="font-semibold">{cat.name}</span>
                        <button
                            onClick={() => handleDelete(cat._id)}
                            className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition"
                            title="Delete"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>

            {categories.length === 0 && (
                <p className="text-gray-500 mt-4">No categories found.</p>
            )}
        </div>
    );
}
