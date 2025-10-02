import React from 'react';
import AuthLayout from './AuthLayout';
import LoginForm from './LoginForm';

const LoginPage: React.FC = () => {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Continue your certification journey"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;

