<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    // READ - Tampilkan semua posts
    public function index()
    {
        $posts = Post::with(['user', 'comments.user'])
                    ->orderBy('created_at', 'desc')
                    ->paginate(10);

        return Inertia::render('Posts/Index', [
            'posts' => $posts
        ]);
    }

    // READ - Tampilkan form create
    public function create()
    {
        return Inertia::render('Posts/Create');
    }

    // CREATE - Simpan post baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $validated['user_id'] = auth()->id();

        Post::create($validated);

        return redirect()->route('posts.index')
                        ->with('message', 'Post berhasil dibuat!');
    }

    // READ - Tampilkan detail post
    public function show(Post $post)
    {
        $post->load(['user', 'comments.user']);

        return Inertia::render('Posts/Show', [
            'post' => $post
        ]);
    }

    // UPDATE - Tampilkan form edit
    public function edit(Post $post)
    {
        return Inertia::render('Posts/Edit', [
            'post' => $post
        ]);
    }

    // UPDATE - Update post
    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $post->update($validated);

        return redirect()->route('posts.index')
                        ->with('message', 'Post berhasil diupdate!');
    }

    // DELETE - Hapus post
    public function destroy(Post $post)
    {
        $post->delete();

        return redirect()->route('posts.index')
                        ->with('message', 'Post berhasil dihapus!');
    }
}