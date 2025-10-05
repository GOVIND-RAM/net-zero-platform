import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Info } from 'lucide-react';

interface ProjectData {
  name: string;
  // ... other project data fields
}

interface KPIQuestion {
  id: string;
  question: string;
  type: 'yesno' | 'text' | 'select' | 'number';
  options?: string[];
  points?: number;
  description?: string;
}

interface KPICategory {
  id: string;
  name: string;
  points: number;
  description: string;
  questions: KPIQuestion[];
}

const KPIDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();
  const location = useLocation();
  const projectData: ProjectData = location.state?.projectData || {};
  
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const kpiCategories: Record<string, KPICategory> = {
    'location-transportation': {
      id: 'location-transportation',
      name: 'Location and Transportation',
      points: 18,
      description: 'Sustainable site selection and transportation strategies',
      questions: [
        {
          id: 'leed-nd-credit',
          question: 'Has the project earned LEED for Neighborhood Development Location credit?',
          type: 'yesno',
          points: 5
        },
        {
          id: 'dense-urban-area',
          question: 'Is the project site located in a dense urban area or near diverse uses?',
          type: 'yesno',
          points: 3
        },
        {
          id: 'transit-proximity',
          question: 'What is the project\'s proximity to quality transit (bus, rail, etc.)?',
          type: 'select',
          options: ['Within 0.25 miles', 'Within 0.5 miles', 'Within 1 mile', 'More than 1 mile'],
          points: 4
        },
        {
          id: 'bicycle-facilities',
          question: 'Are there bicycle facilities (bike racks, storage, showers)?',
          type: 'yesno',
          points: 2
        },
        {
          id: 'parking-reduction',
          question: 'How has the parking footprint been reduced compared to conventional design?',
          type: 'select',
          options: ['25% reduction', '50% reduction', '75% reduction', 'No reduction'],
          points: 4
        }
      ]
    },
    'water-efficiency': {
      id: 'water-efficiency',
      name: 'Water Efficiency',
      points: 12,
      description: 'Water conservation and efficiency measures',
      questions: [
        {
          id: 'indoor-water-reduction',
          question: 'Has the project implemented indoor water use reduction strategies?',
          type: 'yesno',
          points: 3
        },
        {
          id: 'water-fixtures',
          question: 'What fixtures and fittings are installed to reduce potable water consumption?',
          type: 'text',
          points: 3
        },
        {
          id: 'water-modeling',
          question: 'Has water usage been modeled, and how much percentage reduction is achieved?',
          type: 'number',
          points: 6
        }
      ]
    },
    'energy-atmosphere': {
      id: 'energy-atmosphere',
      name: 'Energy and Atmosphere',
      points: 38,
      description: 'Energy performance and atmospheric protection',
      questions: [
        {
          id: 'fundamental-commissioning',
          question: 'Was a fundamental commissioning and verification process carried out?',
          type: 'yesno',
          points: 3
        },
        {
          id: 'energy-performance',
          question: 'Does the project comply with minimum energy performance standards?',
          type: 'yesno',
          points: 5
        },
        {
          id: 'refrigerant-management',
          question: 'Has fundamental refrigerant management been applied to avoid CFC-based systems?',
          type: 'yesno',
          points: 2
        },
        {
          id: 'enhanced-commissioning',
          question: 'Was enhanced commissioning performed to improve system performance?',
          type: 'yesno',
          points: 4
        },
        {
          id: 'energy-optimization',
          question: 'What strategies were used to optimize energy performance (modeling, design)?',
          type: 'text',
          points: 8
        },
        {
          id: 'energy-metering',
          question: 'Has advanced energy metering been installed?',
          type: 'yesno',
          points: 3
        },
        {
          id: 'renewable-energy',
          question: 'Does the project use renewable energy sources (solar, wind, etc.)?',
          type: 'yesno',
          points: 6
        },
        {
          id: 'enhanced-refrigerant',
          question: 'Was enhanced refrigerant management considered (low-GWP refrigerants)?',
          type: 'yesno',
          points: 2
        },
        {
          id: 'green-power',
          question: 'Has the project purchased or produced green power/carbon offsets?',
          type: 'yesno',
          points: 5
        }
      ]
    },
    'materials-resources': {
      id: 'materials-resources',
      name: 'Materials and Resources',
      points: 13,
      description: 'Sustainable material selection and waste management',
      questions: [
        {
          id: 'recyclables-storage',
          question: 'Is there a system for storage and collection of recyclables on-site?',
          type: 'yesno',
          points: 2
        },
        {
          id: 'waste-management',
          question: 'Has a construction and demolition waste management plan been implemented?',
          type: 'yesno',
          points: 3
        },
        {
          id: 'materials-optimization',
          question: 'What is the long-term commitment plan for materials optimization?',
          type: 'text',
          points: 2
        },
        {
          id: 'life-cycle-analysis',
          question: 'Has an interiors life-cycle impact reduction analysis been done?',
          type: 'yesno',
          points: 2
        },
        {
          id: 'environmental-declarations',
          question: 'Are environmental product declarations (EPDs) available for major products?',
          type: 'yesno',
          points: 2
        },
        {
          id: 'raw-materials-sourcing',
          question: 'Was a strategy implemented for sourcing raw materials responsibly?',
          type: 'yesno',
          points: 1
        },
        {
          id: 'health-impacts',
          question: 'Were materials evaluated for health impacts (ingredient disclosure)?',
          type: 'yesno',
          points: 1
        },
        {
          id: 'waste-diversion',
          question: 'Was construction and demolition waste diverted from landfill?',
          type: 'yesno',
          points: 2
        }
      ]
    },
    'indoor-environmental-quality': {
      id: 'indoor-environmental-quality',
      name: 'Indoor Environmental Quality',
      points: 17,
      description: 'Indoor air quality and occupant comfort',
      questions: [
        {
          id: 'indoor-air-quality',
          question: 'Has the project met minimum indoor air quality performance?',
          type: 'yesno',
          points: 2
        },
        {
          id: 'tobacco-smoke-control',
          question: 'What measures are in place for tobacco smoke control?',
          type: 'text',
          points: 1
        },
        {
          id: 'enhanced-air-quality',
          question: 'Were enhanced indoor air quality strategies implemented?',
          type: 'yesno',
          points: 2
        },
        {
          id: 'low-emitting-materials',
          question: 'Are low-emitting materials used (paints, adhesives, flooring)?',
          type: 'yesno',
          points: 2
        },
        {
          id: 'construction-air-quality',
          question: 'Was a construction indoor air quality management plan implemented?',
          type: 'yesno',
          points: 2
        },
        {
          id: 'post-construction-assessment',
          question: 'Was an indoor air quality assessment conducted post-construction?',
          type: 'yesno',
          points: 2
        },
        {
          id: 'thermal-comfort',
          question: 'How was thermal comfort designed and verified?',
          type: 'text',
          points: 2
        },
        {
          id: 'interior-lighting',
          question: 'What strategies enhance interior lighting quality?',
          type: 'text',
          points: 2
        },
        {
          id: 'daylighting',
          question: 'Does the project maximize daylighting for occupants?',
          type: 'yesno',
          points: 2
        },
        {
          id: 'quality-views',
          question: 'Are there quality views for building users?',
          type: 'yesno',
          points: 1
        },
        {
          id: 'acoustic-performance',
          question: 'Was acoustic performance considered?',
          type: 'yesno',
          points: 1
        }
      ]
    },
    'innovation': {
      id: 'innovation',
      name: 'Innovation',
      points: 6,
      description: 'Innovative design and performance strategies',
      questions: [
        {
          id: 'innovative-performance',
          question: 'Did the project achieve innovative performance beyond standard credits?',
          type: 'yesno',
          points: 3
        },
        {
          id: 'leed-ap',
          question: 'Has the project employed a LEED Accredited Professional (LEED AP)?',
          type: 'yesno',
          points: 3
        }
      ]
    },
    'regional-priority': {
      id: 'regional-priority',
      name: 'Regional Priority',
      points: 4,
      description: 'Regional environmental priorities and challenges',
      questions: [
        {
          id: 'regional-credits',
          question: 'Has the project earned credits designated as regional priorities?',
          type: 'yesno',
          points: 2
        },
        {
          id: 'prioritized-credits',
          question: 'Which credits were prioritized due to local environmental conditions?',
          type: 'text',
          points: 1
        },
        {
          id: 'regional-measures',
          question: 'Were any additional measures taken to meet regional challenges?',
          type: 'text',
          points: 1
        }
      ]
    }
  };

  const currentCategory = kpiCategories[categoryId || ''];
  const currentQuestion = currentCategory?.questions[currentQuestionIndex];

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentCategory.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Save answers and navigate back
      navigate('/project/overview', { state: { projectData, answers } });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleBack = () => {
    navigate('/project/overview', { state: { projectData } });
  };

  if (!currentCategory) {
    return (
      <div className="kpi-detail-page kpi-detail-page-error min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="kpi-detail-page-error-content text-center">
          <h1 className="kpi-detail-page-error-title text-2xl font-bold text-slate-900 mb-4">Category Not Found</h1>
          <button
            onClick={handleBack}
            className="kpi-detail-page-error-button px-6 py-3 bg-primary-emerald text-white rounded-lg hover:bg-primary-emerald/90 transition-colors"
          >
            Back to Overview
          </button>
        </div>
      </div>
    );
  }

  const totalQuestions = currentCategory.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="kpi-detail-page min-h-screen bg-slate-50">
      {/* Header */}
      <div className="kpi-detail-page-header bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="kpi-detail-page-header-container max-w-4xl mx-auto px-6 py-4">
          <div className="kpi-detail-page-header-content flex items-center justify-between">
            <div className="kpi-detail-page-header-left flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="kpi-detail-page-back-button flex items-center text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="kpi-detail-page-back-icon h-5 w-5 mr-2" />
                <span className="kpi-detail-page-back-text">Back to Overview</span>
              </button>
              <div className="kpi-detail-page-header-info">
                <h1 className="kpi-detail-page-header-title text-2xl font-bold text-slate-900">{currentCategory.name}</h1>
                <p className="kpi-detail-page-header-description text-slate-600">{currentCategory.description}</p>
              </div>
            </div>
            <div className="kpi-detail-page-header-right text-right">
              <div className="kpi-detail-page-progress-text text-sm text-slate-500">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </div>
              <div className="kpi-detail-page-points-text text-lg font-semibold text-primary-emerald">
                {currentCategory.points} points
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="kpi-detail-page-progress-container mt-4">
            <div className="kpi-detail-page-progress-bar w-full bg-slate-200 rounded-full h-2">
              <div 
                className="kpi-detail-page-progress-fill bg-primary-emerald h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="kpi-detail-page-main-content max-w-4xl mx-auto px-6 py-8">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="kpi-detail-page-question-card bg-white rounded-xl shadow-lg border border-slate-200 p-8"
        >
          <div className="kpi-detail-page-question-header mb-6">
            <div className="kpi-detail-page-question-title-section flex items-center justify-between mb-4">
              <h2 className="kpi-detail-page-question-title text-xl font-semibold text-slate-900">
                {currentQuestion?.question}
              </h2>
              {currentQuestion?.points && (
                <div className="kpi-detail-page-question-points-badge bg-primary-emerald/10 text-primary-emerald px-3 py-1 rounded-full text-sm font-medium">
                  {currentQuestion.points} points
                </div>
              )}
            </div>
            
            {currentQuestion?.description && (
              <div className="kpi-detail-page-question-description bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="kpi-detail-page-question-description-content flex items-start space-x-3">
                  <Info className="kpi-detail-page-question-description-icon h-5 w-5 text-blue-600 mt-0.5" />
                  <p className="kpi-detail-page-question-description-text text-blue-700 text-sm">{currentQuestion.description}</p>
                </div>
              </div>
            )}
          </div>

          {/* Question Input */}
          <div className="kpi-detail-page-question-input mb-8">
            {currentQuestion?.type === 'yesno' && (
              <div className="kpi-detail-page-yesno-options flex space-x-6">
                <label className="kpi-detail-page-yesno-option flex items-center">
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    checked={answers[currentQuestion.id] === true}
                    onChange={() => handleAnswerChange(currentQuestion.id, true)}
                    className="kpi-detail-page-radio-input h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300"
                  />
                  <span className="kpi-detail-page-radio-label ml-2 text-slate-700">Yes</span>
                </label>
                <label className="kpi-detail-page-yesno-option flex items-center">
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    checked={answers[currentQuestion.id] === false}
                    onChange={() => handleAnswerChange(currentQuestion.id, false)}
                    className="kpi-detail-page-radio-input h-4 w-4 text-primary-emerald focus:ring-primary-emerald border-slate-300"
                  />
                  <span className="kpi-detail-page-radio-label ml-2 text-slate-700">No</span>
                </label>
              </div>
            )}

            {currentQuestion?.type === 'text' && (
              <textarea
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                placeholder="Please provide details..."
                rows={4}
                className="kpi-detail-page-textarea w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none resize-none"
              />
            )}

            {currentQuestion?.type === 'select' && (
              <select
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                className="kpi-detail-page-select w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
              >
                <option value="">Select an option</option>
                {currentQuestion.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}

            {currentQuestion?.type === 'number' && (
              <input
                type="number"
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                placeholder="Enter percentage or number"
                className="kpi-detail-page-number-input w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none"
              />
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="kpi-detail-page-navigation flex justify-between pt-6 border-t border-slate-200">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="kpi-detail-page-previous-button px-6 py-3 text-slate-600 hover:text-slate-900 transition-colors font-medium disabled:text-slate-400 disabled:cursor-not-allowed flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </button>
            
            <button
              onClick={handleNext}
              className="kpi-detail-page-next-button px-8 py-3 bg-primary-emerald text-white rounded-lg hover:bg-primary-emerald/90 transition-colors font-medium flex items-center"
            >
              {currentQuestionIndex === totalQuestions - 1 ? 'Complete' : (
                <>
                  Next <ArrowRight className="ml-1 h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default KPIDetailPage;
