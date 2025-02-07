import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  steps: { number: number; title: string }[];
  currentStep: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, steps, currentStep }) => {
  return (
    <div className="relative">
      <div className="h-2 bg-gray-200 rounded">
        <motion.div
          className="absolute h-full bg-amber-600 rounded"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {steps.map((step) => (
          <div
            key={step.number}
            className={`text-xs ${
              currentStep >= step.number ? 'text-amber-600' : 'text-gray-400'
            }`}
          >
            {step.title}
          </div>
        ))}
      </div>
    </div>
  );
};
