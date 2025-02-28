"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Check,
  X,
  ChevronRight,
  Users,
  Calendar,
  Shield,
  Upload,
} from "lucide-react";
import confetti from "canvas-confetti";
import { redirect, useRouter } from "next/navigation";
import { Candidate } from "@/model/Election";

// Main component for creating elections with multi-step form interface
const CreateElectionInterface = () => {
  // const isAcceptable=["encrypted-tbn0.gstatic.com","i.ytimg.com","d3i6fh83elv35t.cloudfront.net","cdn.britannica.com","skift.com"]
  const isAcceptable = ["encrypted-tbn0.gstatic.com", "i.ytimg.com"];
  const router = useRouter();
  // Auth session management with redirect if not authenticated
  const { data: session } = useSession();
  if (!session?.user) {
    redirect("/auth/signin");
  }
  const email = session?.user?.email;
  // Main election state with initial values
  const [electionData, setElectionData] = useState({
    ElectionName: "",
    ElectionDesc: "",
    NoC: 2, // Number of candidates
    Candidates: [
      { Candidate_Name: "", party_img: "", color: "", isUrl: false },
      { Candidate_Name: "", party_img: "", color: "", isUrl: false },
    ],
    Duration: 10,
    parentMail: email,
    isStrict: false,
  });

  // error and setError
  const [error, setError] = useState("");

  // Controls which step is visible
  const [activeStep, setActiveStep] = useState(0);

  // Loading state during submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Submission feedback
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Input handlers for form fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setElectionData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for updating candidate information
  const handleCandidateChange = (
    index: number,
    field: keyof Candidate,
    value: string | boolean
  ) => {
    const newCandidates = [...electionData.Candidates];
    newCandidates[index] = { ...newCandidates[index], [field]: value };
    setElectionData((prev) => ({ ...prev, Candidates: newCandidates }));
  };
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (2MB = 2 * 1024 * 1024 bytes)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
      alert("File size exceeds 2MB limit");
      e.target.value = ""; // Reset the input
      return;
    }

    // Convert file to base64 or use URL.createObjectURL
    const reader = new FileReader();
    reader.onloadend = () => {
      handleCandidateChange(index, "party_img", reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  //Handle Url Submission
  const handleUrl = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const url = e.target.value;

    // Always update the input value to allow typing
    handleCandidateChange(index, "party_img", url);

    // Only validate if there's a value to check
    if (url.trim()) {
      // Check if URL contains one of the acceptable domains
      const isValid = isAcceptable.some((domain) => url.includes(domain));
      console.log(isValid)

      if (!isValid) {
        setError(
          `Candidate ${index} img address is not acceptable. Please download and upload the image`
        );
      } else {
        setError(""); // Clear error if valid
      }
    }
  };

  // Handlers for adding/removing candidates
  const addCandidate = () => {
    setElectionData((prev) => ({
      ...prev,
      NoC: prev.NoC + 1,
      Candidates: [
        ...prev.Candidates,
        { Candidate_Name: "", party_img: "", color: "black", isUrl: false },
      ],
    }));
  };

  const removeCandidate = (index: number) => {
    const newCandidates = electionData.Candidates.filter((_, i) => i !== index);
    setElectionData((prev) => ({
      ...prev,
      NoC: prev.NoC - 1,
      Candidates: newCandidates,
    }));
  };
  
  // Form submission handler with API call
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch("/api/Elections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(electionData),
      });

      const { success, roomkey, message } = await response.json();

      if (success) {
        setSubmitResult({
          success: true,
          message: "Election created successfully!",
        });
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        router.push(`/vote/${roomkey}`);
      } else {
        setSubmitResult({ success: false, message: message });
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: "An error occurred while creating the election.",
      });
    }
    setIsSubmitting(false);
  };

  // Form steps configuration
  const steps = [
    { title: "Election Details", icon: Calendar },
    { title: "Candidates", icon: Users },
    { title: "Settings", icon: Shield },
  ];
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-4 sm:mb-6 text-center">
          Create Your Election
        </h1>

        <div className="mb-6 sm:mb-8 flex flex-wrap sm:flex-nowrap justify-between items-center">
          {steps.map((step, index) => (
            //Fragments used to return a block of components here we are returning
            //a icon from steps array and its title
            <React.Fragment key={index}>
              <motion.div
                //creating a div for bg of the icons with motion (framer-motion)
                className={`flex flex-col items-center cursor-pointer mb-4 sm:mb-0 ${
                  index === activeStep ? "text-emerald-600" : "text-gray-400"
                }`}
                //onClick change the active step
                onClick={() => setActiveStep(index)}
                //animation : while mouse hover scale the bg
                whileHover={{ scale: 1.05 }}
              >
                {/* displaying icon */}
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-1 sm:mb-2 ${
                    index === activeStep ? "bg-emerald-100" : "bg-gray-100"
                  }`}
                >
                  {React.createElement(step.icon, { size: 20 })}
                </div>
                <span className="text-xs sm:text-sm font-medium">
                  {step.title}
                </span>
              </motion.div>
              {/* motion div ends here */}
              {index < steps.length - 1 && (
                <ChevronRight className="text-gray-300" size={24} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* AnimatePresence enables animations when components are removed from the DOM */}
        <AnimatePresence mode="wait">
          {/* Main container that animates between steps */}
          <motion.div
            key={activeStep} // Key changes trigger animation
            initial={{ opacity: 0, x: 20 }} // Start state: invisible, offset right
            animate={{ opacity: 1, x: 0 }} // Animate to: visible, original position
            exit={{ opacity: 0, x: -20 }} // Exit to: invisible, offset left
            transition={{ duration: 0.3 }} // Animation duration
          >
            {activeStep === 0 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Election Name
                  </label>
                  <input
                    type="text"
                    name="ElectionName"
                    value={electionData.ElectionName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-1.5 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ease-in-out"
                    placeholder="Enter election name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Election Description
                  </label>
                  <input
                    type="text"
                    name="ElectionDesc"
                    value={electionData.ElectionDesc}
                    onChange={handleInputChange}
                    className="w-full px-3 py-1.5 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ease-in-out"
                    placeholder="Describe your election purpose"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    name="Duration"
                    value={electionData.Duration}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-3 py-1.5 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ease-in-out"
                    required
                  />
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div className="space-y-6">
                {electionData.Candidates.map((candidate, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4"
                  >
                    <input
                      type="text"
                      value={candidate.Candidate_Name}
                      onChange={(e) =>
                        handleCandidateChange(
                          index,
                          "Candidate_Name",
                          e.target.value
                        )
                      }
                      placeholder="Candidate Name"
                      className="w-full sm:w-auto flex-grow px-3 py-1.5 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ease-in-out"
                      required
                    />
                    <input
                      type="color"
                      value={candidate.color || "#000000"}
                      onChange={(e) =>
                        handleCandidateChange(index, "color", e.target.value)
                      }
                      className="w-8 h-18 rounded-full cursor-pointer "
                      title="Choose candidate color"
                    />
                    {/* {!candidate.isUrl && candidate.party_img && (
                      <div className="mt-2">
                        <img
                          src={candidate.party_img}
                          alt={`Preview for ${candidate.Candidate_Name}`}
                          className="h-10 w-10 object-cover rounded-full"
                        />
                      </div>
                    )} */}
                    {candidate.isUrl ? (
                      <input
                        type="text"
                        value={candidate.party_img}
                        onChange={(e) => handleUrl(e, index)}
                        placeholder="Party Image (paste the image address)"
                        className="w-full sm:w-auto flex-grow px-3 py-1.5 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ease-in-out"
                      />
                    ) : (
                      //TODO change this input to upload file
                      <div className="relative w-full sm:w-auto flex-grow">
                        <label
                          htmlFor={`file-upload-${index}`}
                          className="flex items-center space-x-2 px-3 py-1.5 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm cursor-pointer bg-white text-gray-700 hover:bg-gray-100 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ease-in-out"
                        >
                          <Upload className="w-5 h-5 text-emerald-600" />
                          {!candidate.party_img ? (
                            <span>Upload</span>
                          ) : (
                            <span>Uploaded!</span>
                          )}
                        </label>
                        <input
                          id={`file-upload-${index}`}
                          type="file"
                          accept="image/*" // Accept only image files
                          onChange={(e) => {
                            handleFileUpload(e, index);
                          }}
                          className="hidden"
                        />
                        {candidate.party_img && (
                          <span className=" flex justify-between text-xs text-green-600 ml-2">
                            File selected
                            <button
                              type="button"
                              title="remove image"
                              onClick={() =>
                                handleCandidateChange(index, "party_img", "")
                              }
                              className="pr-1"
                            >
                              🗑️
                            </button>
                            {error && candidate.isUrl&& (
                              <div className="text-red-500 text-xs">
                                {error}
                              </div>
                            )}
                          </span>
                        )}
                      </div>
                    )}

                    <span>
                      <button
                        className={`flex flex-col items-center cursor-pointer mb-4 sm:mb-0 ${
                          candidate.isUrl ? "text-emerald-600" : "text-gray-400"
                        }`}
                        onClick={() =>
                          handleCandidateChange(index, "isUrl", true)
                        }
                      >
                        🔗 URL
                      </button>
                      <button
                        className={`flex flex-col items-center cursor-pointer mb-4 sm:mb-0 ${
                          !candidate.isUrl
                            ? "text-emerald-600"
                            : "text-gray-400"
                        }`}
                        onClick={() =>
                          handleCandidateChange(index, "isUrl", false)
                        }
                      >
                        📤 Upload
                      </button>
                    </span>

                    {/* add trash button only if candidate is more than 2 */}
                    {electionData.Candidates.length > 2 && (
                      <motion.button
                        type="button"
                        onClick={() => removeCandidate(index)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-red-600 hover:text-red-700 transition-colors duration-200 mt-2 sm:mt-0"
                      >
                        <Trash2 size={20} />
                      </motion.button>
                    )}
                  </motion.div>
                ))}
                <motion.button
                  type="button"
                  onClick={addCandidate}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 flex items-center justify-center w-full px-4 py-2 text-sm sm:text-base bg-emerald-100 text-emerald-700 rounded-md hover:bg-emerald-200 transition-colors duration-200"
                >
                  <Plus size={20} className="mr-2" />
                  Add Candidate
                </motion.button>
              </div>
            )}

            {activeStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isStrict"
                    name="isStrict"
                    checked={electionData.isStrict}
                    onChange={(e) =>
                      setElectionData((prev) => ({
                        ...prev,
                        isStrict: e.target.checked,
                      }))
                    }
                    className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isStrict" className="text-sm text-gray-700">
                    Enable strict voting rules
                  </label>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Election Summary
                  </h3>
                  <p>
                    <strong>Name:</strong> {electionData.ElectionName}
                  </p>
                  <p>
                    <strong>Duration:</strong> {electionData.Duration} minutes
                  </p>
                  <p>
                    <strong>Candidates:</strong> {electionData.NoC}
                  </p>
                  <p>
                    <strong>Strict Voting:</strong>{" "}
                    {electionData.isStrict ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200 text-sm sm:text-base"
            onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
            disabled={activeStep === 0}
          >
            Back
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors duration-200 text-sm sm:text-base"
            onClick={() => {
              if (activeStep < steps.length - 1) {
                setActiveStep((prev) => prev + 1);
              } else {
                handleSubmit();
              }
            }}
            disabled={isSubmitting || submitResult?.success}
          >
            {activeStep === steps.length - 1
              ? isSubmitting
                ? "Creating..."
                : "Create Election"
              : "Next"}
          </motion.button>
        </div>

        {submitResult && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-4 rounded-md ${
              submitResult.success
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            <div className="flex items-center">
              {submitResult.success ? (
                <Check className="mr-2" size={20} />
              ) : (
                <X className="mr-2" size={20} />
              )}
              <p>{submitResult.message}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CreateElectionInterface;
