import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header className="Header">
            <h4>Redux Blog</h4>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="post">Post</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header