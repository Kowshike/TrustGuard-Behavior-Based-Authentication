
import { Shield, ShieldAlert } from "lucide-react";
import { Card } from "@/components/ui/card";

interface TrustScoreDisplayProps {
  score: number;
  status: "Safe" | "Suspicious";
  isLoading: boolean;
}

const TrustScoreDisplay = ({ score, status, isLoading }: TrustScoreDisplayProps) => {
  const getScoreColor = () => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getProgressColor = () => {
    if (score >= 80) return "stroke-green-400";
    if (score >= 60) return "stroke-yellow-400";
    return "stroke-red-400";
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <Card className="bg-slate-800/50 border-slate-700 p-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center justify-center gap-2">
          {status === "Safe" ? (
            <Shield className="text-green-400" size={24} />
          ) : (
            <ShieldAlert className="text-red-400" size={24} />
          )}
          Trust Score
        </h2>
        
        {/* Circular Progress */}
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-slate-700"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className={`${getProgressColor()} transition-all duration-500 ease-in-out`}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={isLoading ? circumference : strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          
          {/* Score Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor()} transition-colors duration-300`}>
                {isLoading ? "..." : score}
              </div>
              <div className="text-slate-400 text-sm">
                {isLoading ? "Calculating" : "Trust Score"}
              </div>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
          status === "Safe" 
            ? "bg-green-900/30 text-green-400 border border-green-400/20" 
            : "bg-red-900/30 text-red-400 border border-red-400/20"
        }`}>
          {status === "Safe" ? "System Secure" : "Anomaly Detected"}
        </div>
      </div>
    </Card>
  );
};

export default TrustScoreDisplay;
