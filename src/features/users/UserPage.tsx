import { useSelector } from 'react-redux'
import { selectUserById } from './usersSlice'
import { selectAllPosts } from '../posts/postsSlice'
import { Link, useParams } from 'react-router-dom'
import postType from '../../post.Type';

const UserPage = () => {
    const { userId } = useParams()
    const user = useSelector(state => selectUserById(state, Number(userId)))

    const postsForUser = useSelector(state => {
        const allPosts= selectAllPosts(state)
        return allPosts.filter((post: any) => post.userId === Number(userId))
    })

    const postTitles = postsForUser.map((post: postType) => (
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ))

    return (
        <section>
            <h4>{user?.name}</h4>
            <ol>{postTitles}</ol>
        </section>
    )
}

export default UserPage