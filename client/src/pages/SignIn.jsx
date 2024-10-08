import { Alert, Button, Spinner, TextInput, Label } from "flowbite-react"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice.js';
import { OAuth } from "../components/OAuth.jsx";


export default function SignIn() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("All fields are required!"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/sign-in', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        return dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg text-white">Saqib`s</span>
            Blog
          </Link>
          <p className="text-sm mt-5 ">Sign in with your email and password or with Google</p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div>
              <Label color='black' value="email" />
              <TextInput
                type="email"
                placeholder="example@gmail.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label color='black' value="password" />
              <TextInput
                type="password"
                placeholder="********"
                id="password"
                onChange={handleChange}
              />
            </div>
            {/* <div>

              <FloatingLabel  variant="outlined" type="email" id="email" onChange={handleChange} label="Email" />
            </div>
            <div>
              <FloatingLabel variant="standard" type="password" id="password" onChange={handleChange} label="Password" />
            </div> */}

            <Button gradientDuoTone='purpleToPink' type="submit" disabled={loading}>{
              loading ? (
                <>
                  <Spinner className="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : 'Sign In'
            }</Button>
            <OAuth />
          </form>
          <div className="mt-2 ml-2 text-sm flex gap-1">
            <span>Create new account?</span>
            <Link to='/sign-up' className="text-blue-600">Sign-up</Link>
          </div>
          {
            errorMessage && (
              <Alert className="mt-3" color='failure'>{errorMessage}</Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
