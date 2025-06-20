
import { Card } from "@/components/ui/card";
import { Brain, Cpu, Database, Layers, AlertCircle, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface MLDashboardProps {
  trustScore: number;
  sensorData: any;
}

const MLDashboard = ({ trustScore, sensorData }: MLDashboardProps) => {
  const [modelStatus, setModelStatus] = useState({
    lstm: { accuracy: 94.7, status: 'Active', lastTrained: '2 hours ago' },
    randomForest: { accuracy: 91.2, status: 'Active', lastTrained: '1 hour ago' },
    neuralNetwork: { accuracy: 96.1, status: 'Training', lastTrained: '30 min ago' },
    svm: { accuracy: 88.9, status: 'Standby', lastTrained: '4 hours ago' }
  });

  const [predictions, setPredictions] = useState([
    { feature: 'Device Orientation', confidence: 92, prediction: 'Normal' },
    { feature: 'Touch Pressure', confidence: 87, prediction: 'Verified' },
    { feature: 'Typing Rhythm', confidence: 94, prediction: 'Authenticated' },
    { feature: 'App Navigation', confidence: 78, prediction: 'Learning' }
  ]);

  const [realTimeMetrics, setRealTimeMetrics] = useState({
    dataPoints: 15247,
    modelsRunning: 3,
    predictionsPerSec: 847,
    anomaliesDetected: 23
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics(prev => ({
        ...prev,
        dataPoints: prev.dataPoints + Math.floor(Math.random() * 10),
        predictionsPerSec: 800 + Math.floor(Math.random() * 100)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* ML Models Status */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Brain className="text-purple-400" size={20} />
          Machine Learning Models
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(modelStatus).map(([model, data]) => (
            <div key={model} className="p-4 bg-slate-700/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-white capitalize">
                  {model.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
                  data.status === 'Active' ? 'bg-green-900/50 text-green-400' :
                  data.status === 'Training' ? 'bg-blue-900/50 text-blue-400' :
                  'bg-yellow-900/50 text-yellow-400'
                }`}>
                  {data.status === 'Active' ? <CheckCircle size={12} /> :
                   data.status === 'Training' ? <Cpu size={12} /> :
                   <AlertCircle size={12} />}
                  {data.status}
                </div>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Accuracy: {data.accuracy}%</span>
                <span>Updated: {data.lastTrained}</span>
              </div>
              <div className="mt-2 w-full bg-slate-600 rounded-full h-1">
                <div 
                  className="bg-purple-400 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${data.accuracy}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Real-time Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Layers className="text-cyan-400" size={20} />
            Real-time Predictions
          </h3>
          <div className="space-y-3">
            {predictions.map((pred, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700/20 rounded-lg">
                <div>
                  <p className="text-sm text-white">{pred.feature}</p>
                  <p className={`text-xs ${
                    pred.prediction === 'Normal' || pred.prediction === 'Verified' || pred.prediction === 'Authenticated' 
                      ? 'text-green-400' : 'text-yellow-400'
                  }`}>
                    {pred.prediction}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono text-cyan-400">{pred.confidence}%</p>
                  <div className="w-16 bg-slate-600 rounded-full h-1 mt-1">
                    <div 
                      className="bg-cyan-400 h-1 rounded-full"
                      style={{ width: `${pred.confidence}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* System Metrics */}
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Database className="text-orange-400" size={20} />
            System Metrics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-slate-700/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-400">{realTimeMetrics.dataPoints.toLocaleString()}</div>
              <div className="text-xs text-slate-400">Data Points</div>
            </div>
            <div className="text-center p-4 bg-slate-700/20 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{realTimeMetrics.modelsRunning}</div>
              <div className="text-xs text-slate-400">Models Running</div>
            </div>
            <div className="text-center p-4 bg-slate-700/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{realTimeMetrics.predictionsPerSec}</div>
              <div className="text-xs text-slate-400">Predictions/sec</div>
            </div>
            <div className="text-center p-4 bg-slate-700/20 rounded-lg">
              <div className="text-2xl font-bold text-red-400">{realTimeMetrics.anomaliesDetected}</div>
              <div className="text-xs text-slate-400">Anomalies Today</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MLDashboard;
