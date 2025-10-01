import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import SignupForm from '../components/auth/SignupForm';

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

