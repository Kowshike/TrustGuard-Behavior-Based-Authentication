
import { Card } from "@/components/ui/card";
import { Clock, User, Shield } from "lucide-react";
import { useState, useEffect } from "react";

interface SessionInfoProps {
  sessionStartTime: Date;
  trustScore: number;
  status: "Safe" | "Suspicious";
}

const SessionInfo = ({ sessionStartTime, trustScore, status }: SessionInfoProps) => {
  const [sessionDuration, setSessionDuration] = useState("");

  useEffect(() => {
    const updateDuration = () => {
      const now = new Date();
      const diff = now.getTime() - sessionStartTime.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setSessionDuration(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    updateDuration();
    const interval = setInterval(updateDuration, 1000);

    return () => clearInterval(interval);
  }, [sessionStartTime]);

  return (
    <Card className="bg-slate-800/50 border-slate-700 p-6">
      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
        <User className="text-blue-400" size={20} />
        Session Information
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-2">
            <Clock size={16} />
            Session Start
          </span>
          <span className="text-white font-mono text-sm">
            {sessionStartTime.toLocaleTimeString()}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-2">
            <Clock size={16} />
            Duration
          </span>
          <span className="text-white font-mono text-sm">
            {sessionDuration}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-2">
            <Shield size={16} />
            Current Score
          </span>
          <span className={`font-mono text-sm ${
            trustScore >= 60 ? 'text-green-400' : 'text-red-400'
          }`}>
            {trustScore}%
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Status</span>
          <span className={`text-sm font-medium ${
            status === "Safe" ? 'text-green-400' : 'text-red-400'
          }`}>
            {status}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default SessionInfo;
