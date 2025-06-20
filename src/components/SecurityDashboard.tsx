
import { Card } from "@/components/ui/card";
import { Shield, AlertTriangle, Eye, Zap, Globe, Smartphone, Lock, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface SecurityDashboardProps {
  trustScore: number;
  sensorData: any;
}

const SecurityDashboard = ({ trustScore, sensorData }: SecurityDashboardProps) => {
  const [securityMetrics, setSecurityMetrics] = useState({
    activeThreats: 3,
    blockedAttempts: 47,
    deviceScore: 94,
    locationScore: 87,
    sessionSecurity: 92
  });

  const [fraudPrediction, setFraudPrediction] = useState({
    riskLevel: "Low",
    confidence: 94,
    factors: [
      { name: "Device Consistency", score: 96, status: "Good" },
      { name: "Behavioral Pattern", score: 89, status: "Good" },
      { name: "Location Analysis", score: 92, status: "Good" },
      { name: "Transaction Pattern", score: 78, status: "Moderate" }
    ]
  });

  const [realTimeAlerts] = useState([
    { time: "14:32", type: "Info", message: "New device location detected", severity: "low" },
    { time: "14:28", type: "Warning", message: "Unusual typing speed pattern", severity: "medium" },
    { time: "14:25", type: "Success", message: "Biometric verification successful", severity: "low" },
    { time: "14:20", type: "Info", message: "Session security score updated", severity: "low" }
  ]);

  const securityTrendData = [
    { time: '12:00', score: 85 },
    { time: '12:15', score: 88 },
    { time: '12:30', score: 82 },
    { time: '12:45', score: 90 },
    { time: '13:00', score: trustScore }
  ];

  const threatDistribution = [
    { name: 'Session Hijacking', value: 35, color: '#EF4444' },
    { name: 'Device Spoofing', value: 25, color: '#F59E0B' },
    { name: 'Behavioral Anomaly', value: 30, color: '#8B5CF6' },
    { name: 'Location Fraud', value: 10, color: '#10B981' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSecurityMetrics(prev => ({
        ...prev,
        deviceScore: Math.max(85, prev.deviceScore + (Math.random() - 0.5) * 2),
        locationScore: Math.max(80, prev.locationScore + (Math.random() - 0.5) * 3)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Security Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-red-900/20 border-red-400/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-400 text-sm font-medium">Active Threats</p>
              <p className="text-2xl font-bold text-red-400">{securityMetrics.activeThreats}</p>
            </div>
            <AlertTriangle className="text-red-400" size={24} />
          </div>
        </Card>

        <Card className="bg-green-900/20 border-green-400/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">Blocked Attempts</p>
              <p className="text-2xl font-bold text-green-400">{securityMetrics.blockedAttempts}</p>
            </div>
            <Shield className="text-green-400" size={24} />
          </div>
        </Card>

        <Card className="bg-blue-900/20 border-blue-400/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">Device Score</p>
              <p className="text-2xl font-bold text-blue-400">{securityMetrics.deviceScore}%</p>
            </div>
            <Smartphone className="text-blue-400" size={24} />
          </div>
        </Card>

        <Card className="bg-purple-900/20 border-purple-400/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm font-medium">Session Security</p>
              <p className="text-2xl font-bold text-purple-400">{securityMetrics.sessionSecurity}%</p>
            </div>
            <Lock className="text-purple-400" size={24} />
          </div>
        </Card>
      </div>

      {/* Security Trend and Threat Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="text-blue-400" size={20} />
            Security Trend Analysis
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={securityTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Eye className="text-orange-400" size={20} />
            Threat Distribution
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={threatDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {threatDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {threatDistribution.map((threat, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: threat.color }}
                ></div>
                <span className="text-xs text-slate-400">{threat.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Fraud Prediction & Real-time Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Zap className="text-yellow-400" size={20} />
            AI Fraud Prediction
          </h3>
          <div className="space-y-4">
            <div className={`p-4 rounded-lg border ${
              fraudPrediction.riskLevel === "Low" ? "bg-green-900/20 border-green-400/30" :
              fraudPrediction.riskLevel === "Medium" ? "bg-yellow-900/20 border-yellow-400/30" :
              "bg-red-900/20 border-red-400/30"
            }`}>
              <div className="flex justify-between items-center">
                <span className={`font-semibold ${
                  fraudPrediction.riskLevel === "Low" ? "text-green-400" :
                  fraudPrediction.riskLevel === "Medium" ? "text-yellow-400" :
                  "text-red-400"
                }`}>
                  {fraudPrediction.riskLevel} Risk
                </span>
                <span className="text-slate-400 text-sm">{fraudPrediction.confidence}% Confidence</span>
              </div>
            </div>

            <div className="space-y-3">
              {fraudPrediction.factors.map((factor, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-700/20 rounded-lg">
                  <span className="text-sm text-white">{factor.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">{factor.score}%</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      factor.status === 'Good' ? 'bg-green-900/50 text-green-400' :
                      factor.status === 'Moderate' ? 'bg-yellow-900/50 text-yellow-400' :
                      'bg-red-900/50 text-red-400'
                    }`}>
                      {factor.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Globe className="text-cyan-400" size={20} />
            Real-time Security Alerts
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {realTimeAlerts.map((alert, index) => (
              <div key={index} className={`p-3 rounded-lg border-l-4 ${
                alert.severity === 'low' ? 'bg-blue-900/20 border-blue-400' :
                alert.severity === 'medium' ? 'bg-yellow-900/20 border-yellow-400' :
                'bg-red-900/20 border-red-400'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`text-sm font-medium ${
                      alert.severity === 'low' ? 'text-blue-400' :
                      alert.severity === 'medium' ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {alert.type}
                    </p>
                    <p className="text-xs text-slate-300">{alert.message}</p>
                  </div>
                  <span className="text-xs text-slate-500">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SecurityDashboard;
