import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice";
import postType from '../../post.Type'

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

type ReactionButtonsProps = {
    post: postType;
}

const ReactionButtons = ({ post }: ReactionButtonsProps) => {
    const dispatch = useDispatch()

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                className="reactionButton"
                onClick={() =>
                    dispatch(reactionAdded({ postId: post.id, reaction: name }))
                }
            >               
                 {/* @ts-expect-error  */}
                {emoji} {post.reactions[name]}
            </button>
        )
    })

    return <div>{reactionButtons}</div>
}
export default ReactionButtons