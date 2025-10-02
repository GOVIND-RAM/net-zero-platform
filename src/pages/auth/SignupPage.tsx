import React from 'react';
import AuthLayout from './AuthLayout';
import SignupForm from './SignupForm';

const SignupPage: React.FC = () => {
  return (
    <AuthLayout
      title="Start Your Certification Journey"
      subtitle="Join thousands of organizations achieving net zero"
    >
      <SignupForm />
    </AuthLayout>
  );
};

export default SignupPage;

