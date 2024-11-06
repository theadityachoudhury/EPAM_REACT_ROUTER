import { Link, useNavigate } from "react-router-dom"
import Button from "../../common/Button/Button"
import Logo from "./components/Logo/Logo"
import './Header.css'
import { useEffect } from "react"

const Header = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        // If token is not present, navigate to login page automatically and user should be able to access register page
        if (!token && window.location.pathname !== "/login" && window.location.pathname !== "/register") {
            navigate("/login");
        }
    }, [navigate])
    return (
        <div className="header__container">
            <div className="header">
                <Logo />
                <div className="header__nav">
                    <Link to="/" className="nav__link">Home</Link>
                    <Link to="/courses" className="nav__link">Courses</Link>
                    {localStorage.getItem("name") && <p className="username">{localStorage.getItem("name")}</p>}
                    {localStorage.getItem("token") && <Button title="Logout" onClick={() => { 
                        localStorage.removeItem("token");
                        localStorage.removeItem("email");
                        localStorage.removeItem("name");
                        navigate("/login");
                    }} />}
                </div>
            </div>
        </div>
    )
}

export default Header