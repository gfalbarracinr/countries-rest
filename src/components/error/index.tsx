import React from 'react';
import './error.scss';

interface Errorprops {
  message: string
}
function Error(props: Errorprops) {
  const { message } = props;
  return (
    <section className="error-container">
      <img className="error-image" src={`${process.env.PUBLIC_URL}error.png`} alt="error" height="200px" width="200px" />
      <h1>{ message }</h1>
    </section>
  );
}

export default Error;
