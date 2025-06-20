
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, BarChart3, Brain, User, Globe, AlertTriangle } from "lucide-react";
import TrustScoreDisplay from "./TrustScoreDisplay";
import SensorControls from "./SensorControls";
import SessionInfo from "./SessionInfo";
import AnomalyAlert from "./AnomalyAlert";
import BehavioralLearning from "./BehavioralLearning";
import RiskAssessment from "./RiskAssessment";
import PrivacyCompliance from "./PrivacyCompliance";
import AdvancedAnalytics from "./AdvancedAnalytics";
import MLDashboard from "./MLDashboard";
import UserProfiling from "./UserProfiling";
import SecurityDashboard from "./SecurityDashboard";
import DeviceIntelligence from "./DeviceIntelligence";

interface TrustGuardTabsProps {
  trustScore: number;
  status: "Safe" | "Suspicious";
  isLoading: boolean;
  sensorData: any;
  sessionStartTime: Date;
  onSensorChange: (data: any) => void;
}

const TrustGuardTabs = ({ 
  trustScore, 
  status, 
  isLoading, 
  sensorData, 
  sessionStartTime, 
  onSensorChange 
}: TrustGuardTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-6 bg-slate-800/50 border border-slate-700">
        <TabsTrigger value="overview" className="flex items-center gap-2">
          <Shield size={16} />
          <span className="hidden sm:inline">Overview</span>
        </TabsTrigger>
        <TabsTrigger value="analytics" className="flex items-center gap-2">
          <BarChart3 size={16} />
          <span className="hidden sm:inline">Analytics</span>
        </TabsTrigger>
        <TabsTrigger value="ml" className="flex items-center gap-2">
          <Brain size={16} />
          <span className="hidden sm:inline">AI/ML</span>
        </TabsTrigger>
        <TabsTrigger value="profile" className="flex items-center gap-2">
          <User size={16} />
          <span className="hidden sm:inline">Profile</span>
        </TabsTrigger>
        <TabsTrigger value="device" className="flex items-center gap-2">
          <Globe size={16} />
          <span className="hidden sm:inline">Device</span>
        </TabsTrigger>
        <TabsTrigger value="security" className="flex items-center gap-2">
          <AlertTriangle size={16} />
          <span className="hidden sm:inline">Security</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <TrustScoreDisplay 
              score={trustScore} 
              status={status}
              isLoading={isLoading}
            />
            <AnomalyAlert status={status} />
          </div>

          <div className="lg:col-span-2">
            <SensorControls 
              sensorData={sensorData}
              onSensorChange={onSensorChange}
            />
          </div>

          <div className="lg:col-span-1 space-y-6">
            <SessionInfo 
              sessionStartTime={sessionStartTime}
              trustScore={trustScore}
              status={status}
            />
            <BehavioralLearning 
              sensorData={sensorData}
              trustScore={trustScore}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <RiskAssessment 
            sensorData={sensorData}
            trustScore={trustScore}
          />
          <PrivacyCompliance />
        </div>
      </TabsContent>

      <TabsContent value="analytics">
        <AdvancedAnalytics 
          trustScore={trustScore}
          sensorData={sensorData}
        />
      </TabsContent>

      <TabsContent value="ml">
        <MLDashboard 
          trustScore={trustScore}
          sensorData={sensorData}
        />
      </TabsContent>

      <TabsContent value="profile">
        <UserProfiling 
          trustScore={trustScore}
          sensorData={sensorData}
        />
      </TabsContent>

      <TabsContent value="device">
        <DeviceIntelligence 
          trustScore={trustScore}
          sensorData={sensorData}
        />
      </TabsContent>

      <TabsContent value="security">
        <SecurityDashboard 
          trustScore={trustScore}
          sensorData={sensorData}
        />
      </TabsContent>
    </Tabs>
  );
};

export default TrustGuardTabs;
