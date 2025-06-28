import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Layout({ children, title = 'Laravel App' }) {
    const { auth, flash } = usePage().props;

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-gray-100">
                {/* Navigation */}
                <nav className="bg-white shadow">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <Link href="/" className="text-xl font-bold">
                                    Laravel App
                                </Link>
                            </div>
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <>
                                        <Link href="/posts" className="text-gray-700 hover:text-gray-900">
                                            Posts
                                        </Link>
                                        <span className="text-gray-700">
                                            Hello, {auth.user.name}
                                        </span>
                                        <Link 
                                            href="/logout" 
                                            method="post"
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Logout
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/login" className="text-gray-700 hover:text-gray-900">
                                            Login
                                        </Link>
                                        <Link href="/register" className="text-gray-700 hover:text-gray-900">
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Flash Messages */}
                {flash.message && (
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                            {flash.message}
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <main className="max-w-7xl mx-auto py-6 px-4">
                    {children}
                </main>
            </div>
        </>
    );
}