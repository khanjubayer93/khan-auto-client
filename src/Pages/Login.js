import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

const Login = () => {
    const { loginUser, auth } = useContext(AuthContext);
    const [resetEmail, setResetEmail] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleLoninUser = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        loginUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('Log in successfully');
                form.rset();
                navigate(from, { replace: true });
            })
            .catch((error) => console.error(error))
    }
    const handleResetEmail = event => {
        event.preventDefault();
        const email = event.target.value;
        setResetEmail(email)
        console.log(email)
    }

    const handleResetPassword = () => {

        return sendPasswordResetEmail(auth, resetEmail)
            .then(() => {
                // Password reset email sent!
                // ..
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }
    return (
        <div>
            <div>
                <h1 className='text-3xl font-bold text-center my-5'>Log In</h1>
                <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content flex-col lg:flex-row-reverse gap-10">

                        <div className="card w-full max-w-sm shadow-2xl bg-base-100">
                            <form onSubmit={handleLoninUser} className="card-body">

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input onBlur={handleResetEmail} name='email' type="text" placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input name='password' type="password" placeholder="password" className="input input-bordered" required />
                                    <label className="label">
                                        <span>For create an accout <Link to='/signup' className="btn btn-link">Signup now!</Link></span>
                                    </label>
                                    <label className="label">
                                        <Link onClick={handleResetPassword} className="btn btn-link text-start">Forget password?</Link>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Log in</button>
                                </div>
                            </form>
                        </div>
                        <div className="w-1/2 lg:text-left">
                            <img className='rounded-xl' src="https://securityintelligence.com/wp-content/uploads/2018/10/si-advanced-authentication-feature.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;