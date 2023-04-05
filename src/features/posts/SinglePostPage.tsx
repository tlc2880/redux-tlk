import { useSelector } from 'react-redux'
import { selectPostById } from './postsSlice'
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link, useParams } from 'react-router-dom';

const SinglePostPage = () => {
    const { postId } = useParams()

    const post: any = useSelector((state) => selectPostById(state, Number(postId)))

    if (!post) {
        return (
            <section>
                <h4>Post not found!</h4>
            </section>
        )
    }

    return (
        <article>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
            <p className="postCredit">
                <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    )
}

export default SinglePostPage