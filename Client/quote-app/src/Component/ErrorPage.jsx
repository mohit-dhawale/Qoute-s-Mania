import React from 'react';
import { useNavigate } from 'react-router';

const ErrorPage = ({ errorType }) => {
  const navigate = useNavigate()
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
      }}
    >
      <h1 style={{ color: 'white' }}>
        Unauthorized Error / Page Not Found
      </h1>
      <p className='text-center' style={{ color: 'white',margin:10 }}>
         You do not have permission to access this page /<br/>
         The requested page could not be found.
      </p>
      {errorType === 'notfound' && <p style={{ color: 'white' }}>Error 404</p>}
      <p className='text-center text-white nav-link' style={{cursor:'pointer'}} onClick={()=>{navigate('/')}}>Go to Login</p>
    </div>
  );
};

export default ErrorPage;
