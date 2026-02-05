import { dbConnect } from '@/lib/config/db';
import Comment from '@/lib/models/Comment';

// GET: Fetch comments (Public: only approved, Admin: all if requested)
export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('postId');
    const getAll = searchParams.get('all'); // Admin flag

    if (getAll) {
      // Admin dashboard: fetch all comments, sorted by newest
      const comments = await Comment.find({}).sort({ createdAt: -1 });
      return new Response(JSON.stringify(comments), { status: 200 });
    }

    if (!postId) {
      return new Response(JSON.stringify({ error: 'Missing postId' }), { status: 400 });
    }

    // Public view: fetch only APPROVED comments for specific post
    const comments = await Comment.find({ postId, isApproved: true }).sort({ createdAt: -1 });

    return new Response(JSON.stringify(comments), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[GET COMMENTS ERROR]', err);
    return new Response(JSON.stringify({ error: 'Server Error' }), { status: 500 });
  }
}

// POST: Add a new comment (Pending approval)
export async function POST(req) {
  try {
    await dbConnect();
    const { postId, comment, userEmail } = await req.json();

    if (!postId || !comment || !userEmail) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // Created with isApproved: false by default (defined in Schema)
    const newComment = await Comment.create({ postId, comment, userEmail });

    return new Response(JSON.stringify(newComment), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[POST COMMENT ERROR]', err);
    return new Response(JSON.stringify({ error: 'Server Error' }), { status: 500 });
  }
}

// DELETE: Remove a comment
export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing comment ID' }), { status: 400 });
    }

    await Comment.findByIdAndDelete(id);

    return new Response(JSON.stringify({ success: true, msg: 'Comment deleted' }), { status: 200 });
  } catch (err) {
    console.error('[DELETE COMMENT ERROR]', err);
    return new Response(JSON.stringify({ error: 'Server Error' }), { status: 500 });
  }
}

// PATCH: Approve/Unapprove a comment
export async function PATCH(req) {
  try {
    await dbConnect();
    const { id, isApproved } = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing comment ID' }), { status: 400 });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { isApproved },
      { new: true }
    );

    return new Response(JSON.stringify(updatedComment), { status: 200 });
  } catch (err) {
    console.error('[PATCH COMMENT ERROR]', err);
    return new Response(JSON.stringify({ error: 'Server Error' }), { status: 500 });
  }
}
