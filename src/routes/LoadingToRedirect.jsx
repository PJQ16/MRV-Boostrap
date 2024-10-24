import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import ClockLoader from 'react-spinners/ClockLoader';

export default function LoadingToRedirect() {
  const [count, setCount] = useState(2);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => {
        if (currentCount === 1) {
          clearInterval(interval);
          setRedirect(true);
        }
        return currentCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (redirect) {
    return <Navigate to='/' />;
  }

  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
      <div className="position-relative" style={{ width: '150px', height: '150px' }}>
        <ClockLoader size={300} color="#ff6600" />
        <h1
          className="position-absolute w-100 text-center"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#ff6600',
            margin: 0,
          }}
        >
          {count}
        </h1>
      </div>
    </div>
  );
}
