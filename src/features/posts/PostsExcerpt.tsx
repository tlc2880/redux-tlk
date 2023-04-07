import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from 'react-router-dom';
import postType from '../../post.Type'
import React, { JSXElementConstructor } from "react";

type PostsExcerptProps = {
    post: postType;
}

let PostsExcerpt: JSXElementConstructor<PostsExcerptProps> = ({ post }: PostsExcerptProps) => {
        return (
        <article>
            <h4>{post.title}</h4>
            <p className="excerpt">{post.body.substring(0, 75)}...</p>
            <p className="postCredit">
                <Link to={`post/${post.id}`}>View Post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    )
}
PostsExcerpt = React.memo(PostsExcerpt)

export default PostsExcerpt