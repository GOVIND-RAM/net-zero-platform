import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, FileText, Shield } from 'lucide-react';

interface ProjectData {
  name: string;
  groupCertification: boolean;
  ratingSystem: string;
  unitType: 'sqft' | 'sqm';
  startDate: string;
  endDate: string;
  projectType: string;
  grossFloorArea: string;
  owner: string;
  ownerRepresentative: string;
  ownerType: string;
  ownerCountry: string;
  email: string;
  projectCharacteristics: string[];
  address1: string;
  address2: string;
  city: string;
  country: string;
  state: string;
  postalCode: string;
  geoLocation: string;
}

interface ProjectAgreementPageProps {
  data: ProjectData;
  onSubmit: () => void;
  onPrevious: () => void;
  onCancel: () => void;
}

const ProjectAgreementPage: React.FC<ProjectAgreementPageProps> = ({
  data,
  onSubmit,
  onPrevious,
  onCancel,
}) => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [confirmedData, setConfirmedData] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (agreedToTerms && confirmedData) {
      onSubmit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg border border-slate-200 p-8"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Project Agreement</h1>
        <p className="text-slate-600">Please review your project information and confirm your agreement to proceed.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Project Summary */}
        <div className="bg-slate-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-primary-emerald" />
            Project Summary
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-slate-700 mb-3">Project Details</h4>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Name:</span> {data.name}</div>
                <div><span className="font-medium">Type:</span> {data.projectType}</div>
                <div><span className="font-medium">Rating System:</span> {data.ratingSystem}</div>
                <div><span className="font-medium">Area:</span> {data.grossFloorArea} {data.unitType === 'sqft' ? 'sq ft' : 'sq m'}</div>
                <div><span className="font-medium">Timeline:</span> {data.startDate} to {data.endDate}</div>
                <div><span className="font-medium">Group Certification:</span> {data.groupCertification ? 'Yes' : 'No'}</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-slate-700 mb-3">Owner Information</h4>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Organization:</span> {data.owner}</div>
                <div><span className="font-medium">Representative:</span> {data.ownerRepresentative}</div>
                <div><span className="font-medium">Type:</span> {data.ownerType}</div>
                <div><span className="font-medium">Country:</span> {data.ownerCountry}</div>
                <div><span className="font-medium">Email:</span> {data.email}</div>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="font-medium text-slate-700 mb-2">Project Address</h4>
            <div className="text-sm text-slate-600">
              <div>{data.address1}</div>
              {data.address2 && <div>{data.address2}</div>}
              <div>{data.city}, {data.state} {data.postalCode}</div>
              <div>{data.country}</div>
              <div className="mt-1"><span className="font-medium">Coordinates:</span> {data.geoLocation}</div>
            </div>
          </div>

          {data.projectCharacteristics.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium text-slate-700 mb-2">Project Characteristics</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                {data.projectCharacteristics.map((characteristic, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {characteristic}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Data Confirmation */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900 mb-2">Data Confirmation</h3>
              <p className="text-blue-700 text-sm mb-4">
                Please confirm that all the information provided is accurate and complete. 
                You will be able to modify this information later if needed.
              </p>
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={confirmedData}
                  onChange={(e) => setConfirmedData(e.target.checked)}
                  className="mt-1 h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300 rounded"
                />
                <span className="text-sm text-blue-700">
                  I confirm that all the project information provided is accurate and complete.
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Terms and Agreement */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-slate-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-slate-900 mb-2">Terms and Conditions</h3>
              <div className="text-sm text-slate-600 space-y-3">
                <p>
                  By proceeding with project registration, you agree to the following terms:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>All information provided is accurate and up-to-date</li>
                  <li>You have the authority to register this project on behalf of the organization</li>
                  <li>You understand the certification process and requirements</li>
                  <li>You agree to comply with all applicable standards and regulations</li>
                  <li>You consent to the use of project data for certification purposes</li>
                </ul>
                <p className="font-medium">
                  By checking the agreement box below, you acknowledge that you have read, 
                  understood, and agree to be bound by these terms and conditions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Agreement Checkbox */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 h-5 w-5 text-primary-emerald focus:ring-primary-emerald border-slate-300 rounded"
            />
            <div>
              <span className="font-medium text-green-900">
                I agree to the terms and conditions and confirm that all information is accurate.
              </span>
              <p className="text-sm text-green-700 mt-1">
                You must agree to the terms to proceed with project registration.
              </p>
            </div>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-6 border-t border-slate-200">
          <button
            type="button"
            onClick={onPrevious}
            className="px-6 py-3 text-slate-600 hover:text-slate-900 transition-colors font-medium"
          >
            ← Previous
          </button>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!agreedToTerms || !confirmedData}
              className="px-8 py-3 bg-primary-emerald text-white rounded-lg hover:bg-primary-emerald/90 transition-colors font-medium disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              Register Project
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default ProjectAgreementPage;
