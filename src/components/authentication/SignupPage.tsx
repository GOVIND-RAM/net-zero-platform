import React from 'react';
import AuthLayout from './AuthLayout';
import SignupForm from './SignupForm';

const SignupPage: React.FC = () => {
  return (
    <AuthLayout showBranding={true}>
      <SignupForm />
    </AuthLayout>
  );
};

export default SignupPage;

