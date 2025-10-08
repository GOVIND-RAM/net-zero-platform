import React from 'react';
import AuthLayout from './AuthLayout';
import LoginForm from './LoginForm';

const LoginPage: React.FC = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;

