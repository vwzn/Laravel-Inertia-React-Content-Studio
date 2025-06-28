import React from 'react';
import { Link, router } from '@inertiajs/react';
import Layout from '../../Layouts/Layout';

export default function Index({ posts }) {
    const handleDelete = (post) => {
        if (confirm('Yakin ingin menghapus post ini?')) {
            router.delete(`/posts/${post.id}`);
        }
    };

    return (
        <Layout title="All Posts">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">All Posts</h1>
                    <Link
                        href="/posts/create"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Create New Post
                    </Link>
                </div>

                <div className="grid gap-6">
                    {posts.data.map((post) => (
                        <div key={post.id} className="bg-white p-6 rounded-lg shadow">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h2 className="text-xl font-semibold mb-2">
                                        <Link
                                            href={`/posts/${post.id}`}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            {post.title}
                                        </Link>
                                    </h2>
                                    <p className="text-gray-600 mb-4">
                                        {post.content.substring(0, 150)}...
                                    </p>
                                    <div className="text-sm text-gray-500">
                                        By {post.user.name} • {post.comments.length} comments
                                    </div>
                                </div>
                                <div className="flex space-x-2 ml-4">
                                    <Link
                                        href={`/posts/${post.id}/edit`}
                                        className="bg-yellow-500 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(post)}
                                        className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {posts.links && (
                    <div className="flex justify-center space-x-2">
                        {posts.links.map((link, index) =>
                            link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`px-3 py-2 rounded ${link.active
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ) : (
                                <span
                                    key={index}
                                    className="px-3 py-2 rounded bg-gray-100 text-gray-400 cursor-not-allowed"
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            )
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
}