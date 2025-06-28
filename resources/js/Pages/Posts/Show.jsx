import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import Layout from '../../Layouts/Layout';

export default function Show({ post }) {
    const { data, setData, post: submitComment, processing, reset } = useForm({
        content: '',
    });

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        submitComment(`/posts/${post.id}/comments`, {
            onSuccess: () => reset('content')
        });
    };

    return (
        <Layout title={post.title}>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Post Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
                        <p className="text-gray-600">By {post.user.name}</p>
                    </div>
                    <div className="flex space-x-2">
                        <Link 
                            href={`/posts/${post.id}/edit`}
                            className="bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded"
                        >
                            Edit
                        </Link>
                        <Link 
                            href="/posts"
                            className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
                        >
                            Back to Posts
                        </Link>
                    </div>
                </div>

                {/* Post Content */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="prose max-w-none">
                        <p className="whitespace-pre-wrap">{post.content}</p>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-4">
                        Comments ({post.comments.length})
                    </h3>

                    {/* Add Comment Form */}
                    <form onSubmit={handleCommentSubmit} className="mb-6">
                        <div className="mb-4">
                            <textarea
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                rows={3}
                                placeholder="Add a comment..."
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
                        >
                            {processing ? 'Adding...' : 'Add Comment'}
                        </button>
                    </form>

                    {/* Comments List */}
                    <div className="space-y-4">
                        {post.comments.map((comment) => (
                            <div key={comment.id} className="border-l-4 border-blue-500 pl-4 py-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-gray-800">{comment.content}</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            By {comment.user.name} • {new Date(comment.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    {/* Bisa ditambahkan tombol delete comment */}
                                </div>
                            </div>
                        ))}
                        
                        {post.comments.length === 0 && (
                            <p className="text-gray-500 italic">No comments yet. Be the first to comment!</p>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}