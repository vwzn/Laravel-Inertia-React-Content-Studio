import React from 'react';
import { useForm } from '@inertiajs/react';
import Layout from '../../Layouts/Layout';

export default function Edit({ post }) {
    const { data, setData, put, processing, errors } = useForm({
        title: post.title,
        content: post.content,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/posts/${post.id}`);
    };

    return (
        <Layout title={`Edit: ${post.title}`}>
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Post</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                            Content
                        </label>
                        <textarea
                            id="content"
                            rows={8}
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.content && (
                            <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                        )}
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                        >
                            {processing ? 'Updating...' : 'Update Post'}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}