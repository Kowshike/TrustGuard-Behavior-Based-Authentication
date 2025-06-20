
import { useState, useEffect } from "react";
import TrustGuardTabs from "@/components/TrustGuardTabs";

interface SensorData {
  soundLevel: number;
  lightIntensity: number;
  tiltAngle: number;
  motionStatus: "Static" | "Walking" | "Running";
}

interface TrustScoreResponse {
  trust_score: number;
  status: "Safe" | "Suspicious";
}

const Index = () => {
  const [sensorData, setSensorData] = useState<SensorData>({
    soundLevel: 35,
    lightIntensity: 50,
    tiltAngle: 0,
    motionStatus: "Static"
  });

  const [trustScore, setTrustScore] = useState(85);
  const [status, setStatus] = useState<"Safe" | "Suspicious">("Safe");
  const [sessionStartTime, setSessionStartTime] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Simulate backend calculation for demo
  const calculateTrustScore = (data: SensorData): TrustScoreResponse => {
    let score = 100;
    
    // Sound level check (normal: 10-60)
    if (data.soundLevel < 10 || data.soundLevel > 60) {
      score -= Math.abs(data.soundLevel - 35) * 0.5;
    }
    
    // Light intensity check (normal: 20-80)
    if (data.lightIntensity < 20 || data.lightIntensity > 80) {
      score -= Math.abs(data.lightIntensity - 50) * 0.3;
    }
    
    // Tilt angle check (normal: -30 to +30)
    if (data.tiltAngle < -30 || data.tiltAngle > 30) {
      score -= Math.abs(data.tiltAngle) * 0.8;
    }
    
    // Motion status check
    if (data.motionStatus === "Running") {
      score -= 25;
    } else if (data.motionStatus === "Walking") {
      score -= 5;
    }
    
    score = Math.max(0, Math.min(100, score));
    const finalStatus = score >= 60 ? "Safe" : "Suspicious";
    
    return {
      trust_score: Math.round(score),
      status: finalStatus
    };
  };

  // Update trust score when sensor data changes
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      const result = calculateTrustScore(sensorData);
      setTrustScore(result.trust_score);
      setStatus(result.status);
      setIsLoading(false);
      
      console.log("Trust Score Calculated:", {
        sensorData,
        result,
        timestamp: new Date().toISOString()
      });
    }, 200);

    return () => clearTimeout(timer);
  }, [sensorData]);

  const handleSensorChange = (newData: Partial<SensorData>) => {
    setSensorData(prev => ({ ...prev, ...newData }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-6">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600/20 rounded-full border border-blue-400/30">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
              TrustGuard
            </h1>
          </div>
          <p className="text-xl text-blue-200 mb-2">
            Advanced Behavior-Based Continuous Authentication
          </p>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Real-time AI-powered security monitoring with multi-layered behavioral analysis, 
            fraud prediction, and comprehensive device intelligence for next-generation mobile banking security.
          </p>
          <div className="flex justify-center items-center gap-4 mt-4">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-900/30 border border-green-400/30 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs font-medium">LIVE MONITORING</span>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-green-400 rounded-full"></div>
          </div>
        </div>

        {/* Main Dashboard with Tabs */}
        <TrustGuardTabs
          trustScore={trustScore}
          status={status}
          isLoading={isLoading}
          sensorData={sensorData}
          sessionStartTime={sessionStartTime}
          onSensorChange={handleSensorChange}
        />

        {/* Enhanced Footer */}
        <div className="text-center mt-12 space-y-4">
          <div className="flex justify-center items-center gap-8 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Real-time Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>AI/ML Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Privacy Compliant</span>
            </div>
          </div>
          <p className="text-sm text-slate-400">
            🔐 Advanced Demo System - Simulated behavioral authentication for educational and research purposes
          </p>
          <p className="text-xs text-slate-500">
            Built for Next-Generation Mobile Banking Security | Continuous Authentication Research Platform
          </p>
           <b><p className="text-sm text-slate-300">Developed by Emmadisetty Kowshik</p></b>
        </div>
      </div>
    </div>
  );
};

export default Index;
