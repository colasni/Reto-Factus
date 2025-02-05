import React from 'react'

const Register = () => {
return (
    <div className="register-container">
        <span className="title">Register</span>
        <form>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Register</button>
        </form>
        <p>Can't sign in? Create an account</p>
    </div>
)
}

export default Register
