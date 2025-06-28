<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, Post $post)
    {
        $validated = $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        $post->comments()->create([
            'content' => $validated['content'],
            'user_id' => auth()->id(),
        ]);

        return redirect()->back()
                        ->with('message', 'Comment berhasil ditambahkan!');
    }

    public function destroy(Comment $comment)
    {
        // Pastikan hanya pemilik comment yang bisa hapus
        if ($comment->user_id !== auth()->id()) {
            abort(403);
        }

        $comment->delete();

        return redirect()->back()
                        ->with('message', 'Comment berhasil dihapus!');
    }
}