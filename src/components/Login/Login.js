import React, { useContext, useState } from 'react'
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import {createUserWithEmailAndPassword, initializeLoginFramework, signInWithEmailAndPassword} from './LoginManager';
import {handleGoogleSignIn, handleSignOut} from './LoginManager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import './Login.css'

const Login = () => {
    const googleIcon = <FontAwesomeIcon icon={faGoogle} />
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    });

    initializeLoginFramework();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn =()=>{
        handleGoogleSignIn()
        .then(res=>{
            handleResponse(res, true);
        })
    }
    const signOut =()=>{
        handleSignOut()
        .then(res=>{
            handleResponse(res, false);
        })
    }

    const handleResponse = (res, redirect) =>{
        setUser(res);
        setLoggedInUser(res);
        if(redirect){
            history.replace(from);
        }
    }

    const handleBlur = (e) => {
        let isFieldValid;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (e.target.name === 'name') {
            isFieldValid = true;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        console.log(user.email, user.password);
        if (newUser && user.name && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
            .then(res=>{
                handleResponse(res, true);
            })
        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
            .then(res=>{
                handleResponse(res, false);
            })
        }
        e.preventDefault();
    }

    return (
        <div className="login-system container">
            <h3 className="loginTitle">Sign Up or Login Here</h3>
            <form onSubmit={handleSubmit}>
                { newUser &&
                    <input className="inputClass" type="text" name="name" onBlur={handleBlur} placeholder="enter your name" required />
                }
                <br />
                <input className="inputClass" type="text" onBlur={handleBlur} placeholder="Enter your email" name="email" id="" required /> <br />
                <input className="inputClass" type="password" onBlur={handleBlur} placeholder="Enter password" name="password" required /> <br />
                <input className="inputClass" type="password" onBlur={handleBlur} placeholder="Confirm password" name="password" required /> <br />
                <input className="submitButton" type="submit" value={newUser ? 'Sign Up' : 'SIgn In'} />
            </form>
            <button className="googleButton" onClick={googleSignIn}>{googleIcon}Sign In With Google</button>
            <br />
            <h5> Don't have an account?
            <input  type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
                <label htmlFor="bewUser">new user sign up</label> <br />
            </h5>
        </div>
    );
}

export default Login;
