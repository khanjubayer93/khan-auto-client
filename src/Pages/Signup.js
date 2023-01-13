import { sendEmailVerification } from 'firebase/auth';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

const Signup = () => {
    const { createUser, auth, user } = useContext(AuthContext);

    const handleCreateUser = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photoURL = form.photoURL.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                verifyEmail();
                if (user.emailVerified) {
                    toast.success('Sign up successfully')
                }
            })
            .catch((error) => console.error(error))
    }
    const verifyEmail = () => {
        return sendEmailVerification(auth.currentUser)
            .then(() => {
                toast("Please check your email for verify address")
            })
            .catch((error) => console.error(error))
    }
    return (
        <div>
            <h1 className='text-3xl font-bold text-center my-5'>Sign Up</h1>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse gap-10">

                    <div className="card w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleCreateUser} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input name='name' type="text" placeholder="name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input name='photoURL' type="photoURL" placeholder="photo URL" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name='email' type="text" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input name='password' type="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <span>Do you have an account? <Link to='/login' className="btn btn-link">Login now</Link></span>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Sign Up</button>
                            </div>
                        </form>
                    </div>
                    <div className="w-1/2 lg:text-left">
                        <img className='rounded-xl' src="https://securityintelligence.com/wp-content/uploads/2018/10/si-advanced-authentication-feature.jpg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;