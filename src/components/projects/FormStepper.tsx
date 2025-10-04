import React from 'react';

interface Step {
  id: number;
  name: string;
  description: string;
}

interface FormStepperProps {
  currentStep: number;
  steps: Step[];
}

const FormStepper: React.FC<FormStepperProps> = ({ currentStep, steps }) => {
  return (
    <div className="form-stepper mb-8">
      <nav aria-label="Progress" className="form-stepper-nav">
        <ol className="form-stepper-list flex items-center justify-center space-x-8"> 
          {steps.map((step, stepIdx) => (
            <li key={step.name} className="form-stepper-item relative">
              {stepIdx < steps.length - 1 && (
                <div className="form-stepper-connector absolute top-4 left-4 w-full h-0.5 bg-gray-300" aria-hidden="true">
                  <div 
                    className={`form-stepper-connector-progress h-full transition-all duration-300 ${
                      stepIdx < currentStep ? 'bg-primary-emerald' : 'bg-gray-300'
                    }`}
                    style={{ width: stepIdx < currentStep ? '100%' : '0%' }}
                  />
                </div>
              )}
              
              <div className="form-stepper-step-content relative flex items-center justify-center">
                <div
                  className={`form-stepper-step-indicator flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    step.id < currentStep
                      ? 'bg-primary-emerald border-primary-emerald'
                      : step.id === currentStep
                      ? 'border-primary-emerald bg-white'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {step.id < currentStep ? (
                    <svg
                      className="form-stepper-check-icon h-5 w-5 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <span
                      className={`form-stepper-step-number text-sm font-semibold ${
                        step.id === currentStep
                          ? 'text-primary-emerald'
                          : 'text-gray-500'
                      }`}
                    >
                      {step.id + 1}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="form-stepper-step-info mt-4 text-center">
                <p
                  className={`form-stepper-step-name text-sm font-medium ${
                    step.id <= currentStep
                      ? 'text-primary-emerald'
                      : 'text-slate-300'
                  }`}
                >
                  {step.name}
                </p>
                <p className="form-stepper-step-description text-xs text-gray-500 mt-1">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default FormStepper;

