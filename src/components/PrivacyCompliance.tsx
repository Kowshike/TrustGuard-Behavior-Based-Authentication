
import { Card } from "@/components/ui/card";
import { Shield, Lock, Eye, FileText, Database, Zap } from "lucide-react";

const PrivacyCompliance = () => {
  const complianceFeatures = [
    {
      icon: Lock,
      title: "Data Encryption",
      description: "All behavioral data encrypted in transit and at rest using AES-256",
      status: "Active"
    },
    {
      icon: Eye,
      title: "Privacy by Design",
      description: "Minimal data collection, local processing, differential privacy",
      status: "Active"
    },
    {
      icon: FileText,
      title: "DPDP Compliance",
      description: "Adheres to Data Protection and Digital Privacy Act requirements",
      status: "Verified"
    },
    {
      icon: Database,
      title: "Data Minimization",
      description: "Only essential behavioral patterns stored, automatic data purging",
      status: "Active"
    },
    {
      icon: Zap,
      title: "Edge Processing",
      description: "Most calculations performed on-device to reduce data transmission",
      status: "Optimized"
    }
  ];

  return (
    <Card className="bg-slate-800/50 border-slate-700 p-6">
      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
        <Shield className="text-green-400" size={20} />
        Privacy & Compliance
      </h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          {complianceFeatures.map((feature, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg">
              <feature.icon className="text-green-400 mt-1" size={16} />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-white">{feature.title}</h4>
                  <span className="text-xs px-2 py-1 bg-green-900/50 text-green-400 rounded">
                    {feature.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-green-900/20 border border-green-400/30 rounded-lg">
          <h4 className="text-sm font-medium text-green-400 mb-2">Key Privacy Principles</h4>
          <ul className="text-xs text-green-300 space-y-1">
            <li>• User consent for all behavioral data collection</li>
            <li>• Transparent data usage and retention policies</li>
            <li>• Right to data deletion and portability</li>
            <li>• Regular privacy impact assessments</li>
            <li>• Anonymization of behavioral patterns</li>
          </ul>
        </div>

        <div className="mt-4 p-3 bg-blue-900/20 border border-blue-400/30 rounded-lg">
          <h4 className="text-sm font-medium text-blue-400 mb-2">Energy Efficiency</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-400">~2%</div>
              <div className="text-xs text-blue-300">Battery Impact</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-400">50ms</div>
              <div className="text-xs text-blue-300">Avg Processing</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PrivacyCompliance;
