'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function CommentsPage() {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchComments = async () => {
        try {
            const res = await axios.get('/api/comments?all=true');
            setComments(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            toast.error('Failed to fetch comments');
            setLoading(false);
        }
    };

    const toggleApproval = async (id, currentStatus) => {
        try {
            await axios.patch('/api/comments', { id, isApproved: !currentStatus });
            toast.success(currentStatus ? 'Comment hidden' : 'Comment approved');
            fetchComments(); // Refresh list
        } catch (err) {
            console.error(err);
            toast.error('Failed to update status');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this comment?')) return;

        try {
            await axios.delete(`/api/comments?id=${id}`);
            toast.success('Comment deleted');
            fetchComments(); // Refresh list
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete comment');
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    if (loading) return <div className="p-10">Loading comments...</div>;

    return (
        <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 text-black'>
            <h1 className="text-2xl font-bold mb-6">Manage Comments</h1>

            <div className='relative h-[80vh] overflow-x-auto border border-gray-400 rounded-lg shadow bg-white'>
                <table className='w-full text-sm text-left text-gray-500'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-100 border-b border-gray-200'>
                        <tr>
                            <th className='py-3 px-6'>User</th>
                            <th className='py-3 px-6 w-1/3'>Comment</th>
                            <th className='py-3 px-6'>Status</th>
                            <th className='py-3 px-6'>Date</th>
                            <th className='py-3 px-6 text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="py-6 text-center">No comments found.</td>
                            </tr>
                        ) : (
                            comments.map((comment) => (
                                <tr key={comment._id} className='bg-white border-b hover:bg-gray-50'>
                                    <td className='py-4 px-6 font-medium text-gray-900'>
                                        {comment.userEmail}
                                    </td>
                                    <td className='py-4 px-6 truncate max-w-xs' title={comment.comment}>
                                        {comment.comment}
                                    </td>
                                    <td className='py-4 px-6'>
                                        {comment.isApproved ? (
                                            <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-green-400">Approved</span>
                                        ) : (
                                            <span className="bg-orange-100 text-orange-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-orange-400">Pending</span>
                                        )}
                                    </td>
                                    <td className='py-4 px-6'>
                                        {new Date(comment.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className='py-4 px-6 text-center space-x-2'>
                                        <button
                                            onClick={() => toggleApproval(comment._id, comment.isApproved)}
                                            className={`px-3 py-1 rounded text-white text-xs ${comment.isApproved ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-600 hover:bg-green-700'}`}
                                        >
                                            {comment.isApproved ? 'Unapprove' : 'Approve'}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(comment._id)}
                                            className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-xs"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
