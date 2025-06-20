
import { Card } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Activity, Zap, Target } from "lucide-react";
import { useState, useEffect } from "react";

interface AnalyticsProps {
  trustScore: number;
  sensorData: any;
}

const AdvancedAnalytics = ({ trustScore, sensorData }: AnalyticsProps) => {
  const [trustHistory, setTrustHistory] = useState<Array<{time: string, score: number}>>([]);
  const [behaviorMetrics, setBehaviorMetrics] = useState([
    { name: 'Sound Patterns', value: 85, trend: '+2.3%' },
    { name: 'Motion Analysis', value: 78, trend: '-1.2%' },
    { name: 'Device Handling', value: 92, trend: '+4.1%' },
    { name: 'Environmental', value: 73, trend: '+0.8%' }
  ]);

  useEffect(() => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString();
    
    setTrustHistory(prev => {
      const updated = [...prev, { time: timeStr, score: trustScore }];
      return updated.slice(-10); // Keep last 10 points
    });
  }, [trustScore]);

  const threatData = [
    { type: 'Session Hijacking', risk: 15, blocked: 3 },
    { type: 'Device Spoofing', risk: 8, blocked: 1 },
    { type: 'Behavioral Anomaly', risk: 23, blocked: 7 },
    { type: 'Location Fraud', risk: 12, blocked: 2 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Trust Score Timeline */}
      <Card className="bg-slate-800/50 border-slate-700 p-6 lg:col-span-2">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="text-blue-400" size={20} />
          Trust Score Timeline
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trustHistory}>
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
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Behavioral Metrics */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Activity className="text-green-400" size={20} />
          Behavioral Metrics
        </h3>
        <div className="space-y-4">
          {behaviorMetrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white">{metric.name}</p>
                <p className={`text-xs ${
                  metric.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {metric.trend}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-24 bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-green-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${metric.value}%` }}
                  ></div>
                </div>
                <span className="text-green-400 text-sm font-mono">{metric.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Threat Intelligence */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Target className="text-red-400" size={20} />
          Threat Intelligence
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={threatData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="type" stroke="#9CA3AF" fontSize={10} angle={-45} textAnchor="end" height={60} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="risk" fill="#EF4444" name="Risk Events" />
              <Bar dataKey="blocked" fill="#10B981" name="Blocked" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default AdvancedAnalytics;
