import React from 'react';

const Button = ({ onClick = null, children }) => (
    <button onClick={onClick}> {children} </button>
);

export default Button;
