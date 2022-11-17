import React from 'react';
import './MyButton.scss'

const MyButton = ({children, ...props}) => {
  return (
      <button {...props} id='mybutton'>
        {children}
      </button>
  );
};

export default MyButton;