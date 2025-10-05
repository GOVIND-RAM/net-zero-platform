import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, Clock } from 'lucide-react';

interface CertificationTypeCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  estimatedTime?: string;
  onClick: () => void;
  isAddNew?: boolean;
}

const CertificationTypeCard: React.FC<CertificationTypeCardProps> = ({
  icon: Icon,
  title,
  description,
  estimatedTime,
  onClick,
  isAddNew = false,
}) => {
  return (
    <motion.div
      onClick={onClick}
      className={`certification-type-card bg-white rounded-xl p-6 cursor-pointer group transition-all duration-300 relative overflow-hidden ${
        isAddNew
          ? 'border-2 border-dashed border-slate-300 hover:border-primary-emerald hover:bg-slate-50'
          : 'border border-slate-200 hover:border-primary-emerald hover:shadow-lg hover:shadow-primary-emerald/5'
      }`}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="certification-type-card-content flex flex-col space-y-4">
        {/* Icon */}
        <div className="flex items-center justify-between">
          <div
            className={`certification-type-card-icon-container p-3 rounded-xl transition-all duration-300 ${
              isAddNew
                ? 'bg-primary-emerald/10 text-primary-emerald'
                : 'bg-slate-100 text-slate-600 group-hover:bg-primary-emerald/10 group-hover:text-primary-emerald'
            }`}
          >
            <Icon className="certification-type-card-icon w-8 h-8" strokeWidth={1.5} />
          </div>
          
          {estimatedTime && !isAddNew && (
            <div className="flex items-center space-x-1 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
              <Clock className="h-3 w-3" />
              <span>{estimatedTime}</span>
            </div>
          )}
        </div>
        
        {/* Title */}
        <div>
          <h3 className="certification-type-card-title text-lg font-semibold text-slate-900 mb-2">
            {title}
          </h3>
          
          {/* Description */}
          {description && (
            <p className="certification-type-card-description text-sm text-slate-600 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Action Indicator */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="text-xs text-slate-500">
            {isAddNew ? 'Click to request' : 'Click to start'}
          </div>
          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
            isAddNew ? 'bg-primary-emerald' : 'bg-slate-300 group-hover:bg-primary-emerald'
          }`}></div>
        </div>
      </div>
    </motion.div>
  );
};

export default CertificationTypeCard;

