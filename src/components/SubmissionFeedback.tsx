interface SubmissionFeedbackProps {
  submissionFeedback: string;
}

const SubmissionFeedback = ({ submissionFeedback }: SubmissionFeedbackProps) => {

  return (
    <div className="min-h-[80vh]">
      <div className={`text-center p-4 rounded-lg font-semibold transition-all duration-300 
    ${submissionFeedback === "success" ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"}`}>
        {submissionFeedback === "success" ? "Form submitted successfully!" : "Something went wrong. Please try again."}
      </div>
    </div>
  )
}

export default SubmissionFeedback