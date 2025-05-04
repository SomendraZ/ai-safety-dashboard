import React from "react";

interface ReportIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string, severity: string) => void;
}

const ReportIncidentModal: React.FC<ReportIncidentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [severity, setSeverity] = React.useState("Low");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    onSubmit(title, description, severity);
    setIsSubmitting(false);
    handleClose();
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setSeverity("Low");
    onClose();
  };

  const isFormValid = title && description;

  const getSeverityStyle = (severity: string) => {
    if (severity === "High") {
      return "bg-[#1E1E1E] text-[#8a1119] font-bold";
    } else if (severity === "Medium") {
      return "bg-[#1E1E1E] text-[#fff051] font-bold";
    } else {
      return "bg-[#1E1E1E] text-[#2ed6b4] font-bold";
    }
  };

  const severityClass =
    severity === "High"
      ? "bg-[#ff7a7a] text-[#8a1119]"
      : severity === "Medium"
      ? "bg-[#fff051] text-[#AF741F]"
      : "bg-[#2ed6b4] text-[#00423f]";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      <div
        className="bg-[#2C2C2C] text-white p-6 rounded-2xl shadow-lg w-1/3"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <h2 id="modalTitle" className="text-xl font-semibold mb-4">
          Report a New Incident
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="incidentTitle"
              className="block text-sm font-medium text-gray-300"
            >
              Title
            </label>
            <input
              id="incidentTitle"
              type="text"
              className="mt-1 p-2 w-full border border-gray-600 rounded-2xl bg-[#333] text-white placeholder-gray-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Incident Title..."
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="incidentDescription"
              className="block text-sm font-medium text-gray-300"
            >
              Description
            </label>
            <textarea
              id="incidentDescription"
              rows={4}
              className="mt-1 p-2 w-full border border-gray-600 rounded-2xl bg-[#333] text-white placeholder-gray-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Incident Description..."
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="incidentSeverity"
              className="block text-sm font-medium text-gray-300"
            >
              Severity
            </label>
            <select
              id="incidentSeverity"
              className={`mt-1 p-2 w-full rounded-2xl font-bold border-3 cursor-pointer ${severityClass} focus:outline-none hover:outline-none`}
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
            >
              <option value="Low" className={getSeverityStyle("Low")}>
                Low
              </option>
              <option value="Medium" className={getSeverityStyle("Medium")}>
                Medium
              </option>
              <option value="High" className={getSeverityStyle("High")}>
                High
              </option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="text-sm text-gray-400 hover:text-gray-300 cursor-pointer"
            >
              Close
            </button>
            <button
              type="submit"
              className={`ml-4 bg-blue-600 text-white py-2 px-4 rounded-2xl ${
                !isFormValid
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
              disabled={isSubmitting || !isFormValid}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportIncidentModal;
