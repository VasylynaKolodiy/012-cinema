import React from 'react'
import './MyInput.scss'


const MyInput = ({id, placeholder, type, label, onChange, register}) => {
  return (
    <div className="inputWrapper">
      <input
        id={id}
        type={type}
        className='input'
        placeholder={placeholder}
        onChange={onChange}
        {...register}
      />
      {label && (
        <label htmlFor={id}>{label}</label>
      )}
    </div>
  )
};


export default MyInput;