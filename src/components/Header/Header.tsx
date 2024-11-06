import { Link } from "react-router-dom"
import Button from "../../common/Button/Button"
import Logo from "./components/Logo/Logo"
import './Header.css'

const Header = () => {
    return (
        <div className="header__container">
            <div className="header">
                <Logo />
                <div className="header__nav">
                    <Link to="/" className="nav__link">Home</Link>
                    <Link to="/courses" className="nav__link">Courses</Link>
                    <p className="username">Aditya</p>
                    <Button title="Logout" onClick={() => { }} />
                </div>
            </div>
        </div>
    )
}

export default Header