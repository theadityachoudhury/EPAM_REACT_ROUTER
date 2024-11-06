import { Link } from "react-router-dom";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import "./Login.css";
import { useState } from "react";

const Login = () => {
    const [input, setInput] = useState<{ email: string, password: string }>({ email: "", password: "" });
    const [error, setError] = useState<{ email: string, password: string }>({ email: "", password: "" });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(input);
        const { email, password } = input;
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        let errrorObj = { ...error };
        if (!emailPattern.test(email)) {
            errrorObj = { ...errrorObj, email: "Invalid Email" };
        } else {
            errrorObj = { ...errrorObj, email: "" };
        }
        if (password.length < 8) {
            errrorObj = { ...errrorObj, password: "Password must be 8 characters long" };
        } else {
            errrorObj = { ...errrorObj, password: "" };
        }   

        if (errrorObj.email || errrorObj.password) {
            setError(errrorObj);
            return;
        } else {
            setError({ email: "", password: "" });
        }
    }

    return (
        <div className="login__container">
            <div className="login__body">
                <h1 className="">Login</h1>
                <div className="login__form__body">
                    <form className="">
                        <Input type="email" metaData={{ placeholder: "Enter Email", name: "email", error: error.email }} onChange={handleChange} label={{ show: true, text: "Email" }} />
                        <Input type="password" metaData={{ placeholder: "Enter Password", name: "password", error: error.password }} onChange={handleChange} label={{ show: true, text: "Password" }} />
                        <Button title="LOGIN" onClick={handleSubmit} />
                    </form>
                    <p className="">
                        If you don't have an account you may <Link to="/register" className="">Registration</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
