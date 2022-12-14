import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useTitle from '../../hooks/useTitle';


const Register = () => {
    const [error, setError] = useState('');
    const { createUserWithEAndP, updateUserProfile } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';


    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value
        const photoURL = form.photo.value
        const email = form.email.value
        const password = form.password.value
        console.log(name, email)
        createUserWithEAndP(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                setError('');
                form.reset();
                handleUserProfile(name, photoURL);
            })
            .catch(error => {
                setError(error.message)
            })

    };

    const handleUserProfile = (name, photoURL) => {
        const profile = {
            displayName: name,
            photoURL: photoURL
        }
        updateUserProfile(profile)
            .then(() => { })
            .catch((error) => { console.log(error) })
    }



    // / to use title
    useTitle('Register')
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center  lg:text-left">
                    <h1 className="text-5xl font-bold">Stay With US!</h1>
                    <p className="py-6">We Will Provide you health tips and technique to keep your teeth healthy</p>
                </div>
                <div className="card flex-shrink-0 w-1/2  shadow-2xl bg-base-100">

                    <form onSubmit={handleSubmit} className="card-body">
                        <h1 className="text-5xl text-center font-bold">Register now!</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo Url</span>
                            </label>
                            <input type="text" name='photo' placeholder="URL" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" />
                        </div>
                        <div className="form-control mt-6">
                            <p className='text-red-600 mb-4'>{error?.slice(10,)}</p>
                            <button className="btn btn-info">Register</button>
                        </div>
                        <div className='text-center'>
                            <p className=''>Already Have Account <Link className='text-blue-400' to='/login'>Login</Link></p>

                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
