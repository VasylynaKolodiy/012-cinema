import React, {useState} from 'react';
import MyInput from "../../components/MyInput/MyInput";
import './SignUp.scss'
import MyButton from "../../components/MyButton/MyButton";
import imageEye from '../../assets/img/eye.png';
import imageNoEye from '../../assets/img/eye-no.png';
import {useForm} from "react-hook-form";
import axios from "axios";
import {useNavigate} from "react-router";

const SignUp = () => {

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  let [passwordType, setPasswordType] = useState('password');
  let [repeatPasswordType, setRepeatPasswordType] = useState('password');

  function changePasswordEye() {
    setPasswordType(passwordType === 'password' ? 'text' : 'password')
  }

  function changeRepeatPasswordEye() {
    setRepeatPasswordType(repeatPasswordType === 'password' ? 'text' : 'password')
  }

  let [state, setState] = useState({repeatPassword: ''});
  let [systemError, setSystemError] = useState('');
  const navigate = useNavigate();

  const createUser = async (data) => {
    try {
      const { data: response } = await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB6Fxcq68vK8zSdq7n4P5jVGuCAD4UDetA', data);
      localStorage.setItem('user', JSON.stringify(response));
      navigate("/favorites")
      window.location.reload()
    } catch (error) {
      setSystemError(error)
    }
  };

  return (
    <div className='signup'>
      <div className='signup__container container'>
        <form className='signup__form' onSubmit={handleSubmit(data => createUser(data))}>
          <div>

            <div className="signup-input">
              <MyInput
                id="signup-name"
                placeholder="Input your name "
                type="text"
                label="Name:"
                register={register("displayName", {required: true, minLength: 6, maxLength: 30})}
              />

              {
                systemError !== ""
                  ? <p className='signup__error'> {systemError.response.data.error.message} </p>
                  : errors?.displayName?.type === "minLength"
                    ? (<p className='signup__error'>User name must contain at least 6 characters</p>)
                    : errors?.displayName?.type === "maxLength"
                      && (<p className='signup__error'>User name cannot cannot contain more than 20 characters</p>
                  )
              }
            </div>


            <div className="signup-input">
              <MyInput
                id="signup-email"
                placeholder="Input your email address"
                type="email"
                label="Email:"
                register={register("email", {required: true, minLength: 5, maxLength: 100})}
              />

              {errors?.email?.type === "minLength" && (
                <p className='signup__error'>Email must contain at least 5 characters</p>
              )}

              {errors?.email?.type === "maxLength" && (
                <p className='signup__error'>Email name cannot cannot contain more than 100 characters</p>
              )}
            </div>

          </div>


          <div>
            <div className="signup-input">
              <MyInput
                id="signup-password"
                placeholder="Input your password"
                type={passwordType}
                label="Password:"
                register={register("password", {required: true, minLength: 4, maxLength: 8})}
              />

              <div className="signup-password-eye" onClick={() => changePasswordEye()}>
                <img className="signup-password-imageEye"
                     src={passwordType==='password' ? imageEye : imageNoEye}
                     alt='Password eye'/>
              </div>

              {errors?.password?.type === "minLength" && (
                <p className='signup__error'>Password must contain at least 4 characters</p>
              )}

              {errors?.password?.type === "maxLength" && (
                <p className='signup__error'>Password name cannot cannot contain more than 8 characters</p>
              )}

            </div>

            <div className="signup-input">
              <MyInput
                id="signup-repeatpassword"
                placeholder="Repeat your password"
                type={repeatPasswordType}
                label="Repeat your password:"
                onChange={event => setState({...state, repeatPassword: event.target.value})}
              />


              <div className="signup-password-eye" onClick={() => changeRepeatPasswordEye()}>
                <img className="signup-password-imageEye"
                     src={repeatPasswordType==='password' ? imageEye : imageNoEye}
                     alt='Password eye'/>
              </div>

              {/*{register.password !== state.repeatPassword && (*/}
              {/*  <p className='signup__error'>PASSWORD NOT CORRECT</p>*/}
              {/*)}*/}


            </div>

          </div>

          <MyButton>Sign Up</MyButton>






        </form>
      </div>
    </div>
  );
};

export default SignUp;