
import { Card } from "@/components/ui/card";
import { AlertTriangle, Shield, Eye, MapPin, Clock } from "lucide-react";

interface RiskFactor {
  name: string;
  risk: "Low" | "Medium" | "High";
  impact: number;
  description: string;
}

interface RiskAssessmentProps {
  sensorData: any;
  trustScore: number;
}

const RiskAssessment = ({ sensorData, trustScore }: RiskAssessmentProps) => {
  const getRiskFactors = (): RiskFactor[] => {
    const factors: RiskFactor[] = [];
    
    // Environmental risk assessment
    if (sensorData.soundLevel < 10 || sensorData.soundLevel > 60) {
      factors.push({
        name: "Environmental Anomaly",
        risk: sensorData.soundLevel < 5 || sensorData.soundLevel > 80 ? "High" : "Medium",
        impact: Math.abs(sensorData.soundLevel - 35) * 0.5,
        description: `Unusual sound levels detected (${sensorData.soundLevel}dB)`
      });
    }

    // Device handling risk
    if (Math.abs(sensorData.tiltAngle) > 30) {
      factors.push({
        name: "Device Handling",
        risk: Math.abs(sensorData.tiltAngle) > 60 ? "High" : "Medium",
        impact: Math.abs(sensorData.tiltAngle) * 0.8,
        description: `Unusual device orientation (${sensorData.tiltAngle}°)`
      });
    }

    // Motion pattern risk
    if (sensorData.motionStatus === "Running") {
      factors.push({
        name: "Motion Pattern",
        risk: "High",
        impact: 25,
        description: "Running motion detected - higher fraud risk"
      });
    }

    // Light conditions
    if (sensorData.lightIntensity < 20 || sensorData.lightIntensity > 80) {
      factors.push({
        name: "Lighting Conditions",
        risk: "Medium",
        impact: Math.abs(sensorData.lightIntensity - 50) * 0.3,
        description: `Unusual lighting conditions (${sensorData.lightIntensity}%)`
      });
    }

    return factors;
  };

  const riskFactors = getRiskFactors();
  const overallRisk = trustScore >= 80 ? "Low" : trustScore >= 60 ? "Medium" : "High";

  return (
    <Card className="bg-slate-800/50 border-slate-700 p-6">
      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
        <Shield className="text-orange-400" size={20} />
        Risk Assessment
      </h3>
      
      <div className="space-y-4">
        {/* Overall Risk Status */}
        <div className={`p-4 rounded-lg border ${
          overallRisk === "Low" ? "bg-green-900/20 border-green-400/30" :
          overallRisk === "Medium" ? "bg-yellow-900/20 border-yellow-400/30" :
          "bg-red-900/20 border-red-400/30"
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {overallRisk === "Low" ? (
                <Shield className="text-green-400" size={20} />
              ) : (
                <AlertTriangle className={`${
                  overallRisk === "Medium" ? "text-yellow-400" : "text-red-400"
                }`} size={20} />
              )}
              <span className={`font-semibold ${
                overallRisk === "Low" ? "text-green-400" :
                overallRisk === "Medium" ? "text-yellow-400" :
                "text-red-400"
              }`}>
                {overallRisk} Risk
              </span>
            </div>
            <span className="text-slate-400 text-sm">Trust Score: {trustScore}%</span>
          </div>
        </div>

        {/* Risk Factors */}
        {riskFactors.length > 0 ? (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-300">Active Risk Factors:</h4>
            {riskFactors.map((factor, index) => (
              <div key={index} className="p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{factor.name}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    factor.risk === "Low" ? "bg-green-900/50 text-green-400" :
                    factor.risk === "Medium" ? "bg-yellow-900/50 text-yellow-400" :
                    "bg-red-900/50 text-red-400"
                  }`}>
                    {factor.risk}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{factor.description}</p>
                <div className="mt-2 w-full bg-slate-600 rounded-full h-1">
                  <div 
                    className={`h-1 rounded-full ${
                      factor.risk === "High" ? "bg-red-400" :
                      factor.risk === "Medium" ? "bg-yellow-400" :
                      "bg-green-400"
                    }`}
                    style={{ width: `${Math.min(100, factor.impact * 2)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <Shield className="text-green-400 mx-auto mb-2" size={24} />
            <p className="text-sm text-green-400">No risk factors detected</p>
            <p className="text-xs text-slate-400">All behavioral patterns within normal ranges</p>
          </div>
        )}

        {/* Recommended Actions */}
        <div className="mt-4 p-3 bg-blue-900/20 border border-blue-400/30 rounded-lg">
          <h4 className="text-sm font-medium text-blue-400 mb-2 flex items-center gap-2">
            <Eye size={14} />
            Recommended Actions
          </h4>
          <ul className="text-xs text-blue-300 space-y-1">
            {overallRisk === "High" && (
              <>
                <li>• Require immediate re-authentication</li>
                <li>• Limit transaction capabilities</li>
                <li>• Send security alert to user</li>
              </>
            )}
            {overallRisk === "Medium" && (
              <>
                <li>• Monitor session closely</li>
                <li>• Request additional verification for high-value transactions</li>
                <li>• Log detailed behavioral data</li>
              </>
            )}
            {overallRisk === "Low" && (
              <>
                <li>• Continue normal monitoring</li>
                <li>• Update behavioral baseline</li>
                <li>• Allow full functionality</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default RiskAssessment;
