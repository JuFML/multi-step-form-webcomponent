import type { Step } from "./AccommodationForm";

interface StepProgressProps {
  step: number;
  steps: Step[]
}

const StepProgress = ({ step, steps }: StepProgressProps) => {
  const stepProgressFillClass = `h-1 absolute top-0 left-0 transition-all duration-300`;

  return (
    <div className="flex w-full px-4 justify-center items-start sm:items-center gap-4">
      {steps.map((item, index) => (
        <div key={item.id} className={`flex items-center  ${index < steps.length - 1 ? "w-full" : "w-auto"}`}>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold 
          ${step === item.id ? "bg-orange-600 text-white" :
              step > item.id ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}>
            {item.id}
          </div>
          {index < steps.length - 1 && (
            <div className="flex flex-1 h-1 bg-gray-300 mx-2 relative">
              <div className={`${stepProgressFillClass} ${step > item.id ? "bg-green-500 w-full" : "bg-gray-300 w-0"}`} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default StepProgress