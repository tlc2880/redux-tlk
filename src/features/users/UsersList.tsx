import { useSelector } from 'react-redux'
import { selectAllUsers } from './usersSlice'
import { Link } from 'react-router-dom'
import userType from '../../user.Type';

const UsersList = () => {
    const users: userType[] = useSelector(selectAllUsers)

    const renderedUsers = users.map((user: userType) => (
        <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
        </li>
    ))

    return (
        <section>
            <h4>Users</h4>
            <ul>{renderedUsers}</ul>
        </section>
    )
}
export default UsersList;