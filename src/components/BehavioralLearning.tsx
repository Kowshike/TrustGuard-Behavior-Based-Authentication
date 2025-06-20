
import { Card } from "@/components/ui/card";
import { Brain, TrendingUp, Activity, Shield } from "lucide-react";
import { useState, useEffect } from "react";

interface BehavioralPattern {
  pattern: string;
  confidence: number;
  lastUpdated: Date;
}

interface BehavioralLearningProps {
  sensorData: any;
  trustScore: number;
}

const BehavioralLearning = ({ sensorData, trustScore }: BehavioralLearningProps) => {
  const [patterns, setPatterns] = useState<BehavioralPattern[]>([
    { pattern: "Morning Usage (7-9 AM)", confidence: 85, lastUpdated: new Date() },
    { pattern: "Home Environment", confidence: 92, lastUpdated: new Date() },
    { pattern: "Static Device Handling", confidence: 78, lastUpdated: new Date() },
    { pattern: "Typical Sound Levels", confidence: 88, lastUpdated: new Date() }
  ]);

  useEffect(() => {
    // Simulate learning from new data
    const timer = setTimeout(() => {
      setPatterns(prev => prev.map(pattern => ({
        ...pattern,
        confidence: Math.min(95, pattern.confidence + (trustScore > 70 ? 1 : -2)),
        lastUpdated: new Date()
      })));
    }, 3000);

    return () => clearTimeout(timer);
  }, [sensorData, trustScore]);

  return (
    <Card className="bg-slate-800/50 border-slate-700 p-6">
      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
        <Brain className="text-purple-400" size={20} />
        Behavioral Learning Engine
      </h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {patterns.reduce((acc, p) => acc + p.confidence, 0) / patterns.length}%
            </div>
            <div className="text-xs text-slate-400">Avg. Confidence</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {patterns.length}
            </div>
            <div className="text-xs text-slate-400">Learned Patterns</div>
          </div>
        </div>

        <div className="space-y-3">
          {patterns.map((pattern, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">{pattern.pattern}</span>
                <span className={`text-sm font-mono ${
                  pattern.confidence >= 80 ? 'text-green-400' : 
                  pattern.confidence >= 60 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {pattern.confidence}%
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    pattern.confidence >= 80 ? 'bg-green-400' : 
                    pattern.confidence >= 60 ? 'bg-yellow-400' : 'bg-red-400'
                  }`}
                  style={{ width: `${pattern.confidence}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-slate-700/30 rounded-lg">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Activity size={14} />
            <span>Learning Status: {trustScore > 70 ? 'Adapting to normal behavior' : 'Detecting anomalous patterns'}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BehavioralLearning;
