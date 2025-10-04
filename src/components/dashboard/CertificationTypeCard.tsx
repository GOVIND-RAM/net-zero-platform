import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface CertificationTypeCardProps {
  icon: LucideIcon;
  title: string;
  onClick: () => void;
  isAddNew?: boolean;
}

const CertificationTypeCard: React.FC<CertificationTypeCardProps> = ({
  icon: Icon,
  title,
  onClick,
  isAddNew = false,
}) => {
  return (
    <motion.div
      onClick={onClick}
      className={`certification-type-card bg-white rounded-xl p-8 cursor-pointer group transition-all ${
        isAddNew
          ? 'border-2 border-dashed border-slate-300 hover:border-primary-emerald'
          : 'border-2 border-slate-200 hover:border-primary-emerald hover:shadow-lg'
      }`}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="certification-type-card-content flex flex-col items-center text-center space-y-4">
        {/* Icon */}
        <div
          className={`certification-type-card-icon-container transition-colors ${
            isAddNew
              ? 'text-primary-emerald'
              : 'text-slate-700 group-hover:text-primary-emerald'
          }`}
        >
          <Icon className="certification-type-card-icon w-16 h-16" strokeWidth={1.5} />
        </div>
        
        {/* Title */}
        <h3 className="certification-type-card-title text-xl font-semibold text-slate-900">
          {title}
        </h3>
      </div>
    </motion.div>
  );
};

export default CertificationTypeCard;

