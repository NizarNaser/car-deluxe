import {dbConnect} from '@/lib/config/db';
import Comment from '@/lib/models/Comment';

export async function GET(req) {
  try {
    await dbConnect();
    const postId = req.nextUrl.searchParams.get('postId');

    if (!postId) {
      return new Response(JSON.stringify({ error: 'Missing postId' }), {
        status: 400,
      });
    }

    const comments = await Comment.find({ postId });

    return new Response(JSON.stringify(comments), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[GET COMMENTS ERROR]', err);
    return new Response(JSON.stringify({ error: 'Server Error' }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const { postId, comment, userEmail } = await req.json();

    if (!postId || !comment || !userEmail) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
      });
    }

    const newComment = await Comment.create({ postId, comment, userEmail });

    return new Response(JSON.stringify(newComment), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[POST COMMENT ERROR]', err);
    return new Response(JSON.stringify({ error: 'Server Error' }), {
      status: 500,
    });
  }
}
