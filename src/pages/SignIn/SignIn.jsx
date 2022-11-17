import React, {useState} from 'react';
import './SignIn.scss'
import {useForm} from "react-hook-form";
import MyInput from "../../components/MyInput/MyInput";
import MyButton from "../../components/MyButton/MyButton";
import imageEye from "../../assets/img/eye.png";
import imageNoEye from "../../assets/img/eye-no.png";
import axios from "axios";
import {useNavigate} from "react-router";

const SignIn = () => {
  const user = localStorage.getItem('user');

  let [systemError, setSystemError] = useState('');

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  let [passwordType, setPasswordType] = useState('password');

  function changePasswordEye() {
    setPasswordType(passwordType === 'password' ? 'text' : 'password')
  }

  const navigate = useNavigate();
  const checkUser = async (data) => {
    try {
      const {data: response} = await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB6Fxcq68vK8zSdq7n4P5jVGuCAD4UDetA', data);
      localStorage.setItem('user', JSON.stringify(response));
      navigate("/favorites")
      window.location.reload()
    } catch (error) {
      setSystemError(error)
    }
  };


  return (
    <div className='signin'>
      <div className='signin__container container'>
        <form className='signin__form' onSubmit={handleSubmit(data => checkUser(data))}>
          <div className="signin-input">
            <MyInput
              id='signin-email'
              type="email"
              placeholder="Input your email as login"
              label="Login:"
              register={register("email", {required: true, minLength: 4, maxLength: 100})}
            />

            {errors?.email?.type === "maxLength" && (
              <p className='signin__error'>Login cannot exceed 100 characters</p>
            )}

            {errors?.Login?.type === "minLength" && (
              <p className='signin__error' >Login must have at least 4 characters</p>
            )}

            {
              systemError !== "" && <p className='signin__error'> {systemError.response.data.error.message} </p>
            }
          </div>
          <div className="signin-input">
            <MyInput
              id='signin-password'
              type={passwordType}
              placeholder="Input your password"
              label="Password:"
              register={register("password", {required: true, maxLength: 10, minLength: 8})}
            />


            <div className="signin-password-eye" onClick={() => changePasswordEye()}>
              <img className="signin-password-imageEye"
                   src={passwordType === 'password' ? imageEye : imageNoEye}
                   alt='Password eye'/>
            </div>

          </div>
          <MyButton type="submit">Login</MyButton>


        </form>
      </div>
    </div>
  );
};

export default SignIn;

// AIzaSyB6Fxcq68vK8zSdq7n4P5jVGuCAD4UDetA