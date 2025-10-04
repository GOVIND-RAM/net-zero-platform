import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface DonutChartProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

const DonutChart: React.FC<DonutChartProps> = ({
  percentage,
  size = 120,
  strokeWidth = 8,
  label = 'Overall Progress'
}) => {
  return (
    <div className="donut-chart-component-container flex flex-col items-center">
      <div 
        className="donut-chart-component-wrapper relative"
        style={{ width: size, height: size }}
      >
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            // Progress bar color
            pathColor: '#10b981', // primary-emerald
            // Trail color (background circle)
            trailColor: '#e2e8f0', // slate-200
            // Text color
            textColor: '#1e293b', // slate-800 (neutral-charcoal equivalent)
            // Text size
            textSize: '24px',
            // Path transition
            pathTransitionDuration: 0.5,
            // Path transition easing
            pathTransition: 'easeInOut',
          })}
          strokeWidth={strokeWidth}
        />
        <div className="donut-chart-component-percentage absolute inset-0 flex items-center justify-center">
          <span className="donut-chart-component-percentage-text text-2xl font-bold text-slate-800">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
      
      <div className="donut-chart-component-label mt-3">
        <span className="donut-chart-component-label-text text-sm font-medium text-slate-600">
          {label}
        </span>
      </div>
    </div>
  );
};

export default DonutChart;
