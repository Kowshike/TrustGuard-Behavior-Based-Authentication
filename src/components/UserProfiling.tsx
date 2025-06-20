
import { Card } from "@/components/ui/card";
import { User, MapPin, Clock, Smartphone, Fingerprint, Eye } from "lucide-react";
import { useState, useEffect } from "react";

interface UserProfilingProps {
  trustScore: number;
  sensorData: any;
}

const UserProfiling = ({ trustScore, sensorData }: UserProfilingProps) => {
  const [userProfile, setUserProfile] = useState({
    id: "USER_2024_001",
    riskLevel: "Low",
    profileCompleteness: 87,
    lastActivity: "2 minutes ago",
    deviceTrust: 94,
    locationConsistency: 91,
    behaviorStability: 88
  });

  const [behaviorTraits] = useState([
    { trait: "Average Session Duration", value: "12.5 min", baseline: "Normal" },
    { trait: "Typing Speed", value: "42 WPM", baseline: "Consistent" },
    { trait: "Touch Pressure", value: "Medium", baseline: "Stable" },
    { trait: "Navigation Pattern", value: "Sequential", baseline: "Learned" },
    { trait: "Device Angle Preference", value: "15° - 25°", baseline: "Established" },
    { trait: "Active Hours", value: "9AM - 11PM", baseline: "Regular" }
  ]);

  const [recentActivity] = useState([
    { time: "14:32", action: "Transaction Completed", risk: "Low", amount: "$250.00" },
    { time: "14:28", action: "Balance Inquiry", risk: "Low", amount: "-" },
    { time: "14:25", action: "Login Successful", risk: "Low", amount: "-" },
    { time: "14:20", action: "App Opened", risk: "Low", amount: "-" },
    { time: "14:15", action: "Biometric Verified", risk: "Low", amount: "-" }
  ]);

  useEffect(() => {
    // Update risk level based on trust score
    if (trustScore >= 80) {
      setUserProfile(prev => ({ ...prev, riskLevel: "Low" }));
    } else if (trustScore >= 60) {
      setUserProfile(prev => ({ ...prev, riskLevel: "Medium" }));
    } else {
      setUserProfile(prev => ({ ...prev, riskLevel: "High" }));
    }
  }, [trustScore]);

  return (
    <div className="space-y-6">
      {/* User Overview */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <User className="text-indigo-400" size={20} />
          User Profile Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Fingerprint className="text-indigo-400" size={16} />
              <div>
                <p className="text-xs text-slate-400">User ID</p>
                <p className="text-sm text-white font-mono">{userProfile.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Eye className="text-indigo-400" size={16} />
              <div>
                <p className="text-xs text-slate-400">Risk Level</p>
                <span className={`text-sm font-medium px-2 py-1 rounded ${
                  userProfile.riskLevel === 'Low' ? 'bg-green-900/50 text-green-400' :
                  userProfile.riskLevel === 'Medium' ? 'bg-yellow-900/50 text-yellow-400' :
                  'bg-red-900/50 text-red-400'
                }`}>
                  {userProfile.riskLevel}
                </span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-400 mb-1">Profile Completeness</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-indigo-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${userProfile.profileCompleteness}%` }}
                  ></div>
                </div>
                <span className="text-indigo-400 text-sm">{userProfile.profileCompleteness}%</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="text-indigo-400" size={16} />
              <div>
                <p className="text-xs text-slate-400">Last Activity</p>
                <p className="text-sm text-white">{userProfile.lastActivity}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-center p-3 bg-slate-700/20 rounded-lg">
              <div className="text-lg font-bold text-green-400">{userProfile.deviceTrust}%</div>
              <div className="text-xs text-slate-400">Device Trust</div>
            </div>
            <div className="text-center p-3 bg-slate-700/20 rounded-lg">
              <div className="text-lg font-bold text-blue-400">{userProfile.locationConsistency}%</div>
              <div className="text-xs text-slate-400">Location Consistency</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Behavioral Traits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Smartphone className="text-green-400" size={20} />
            Learned Behavioral Traits
          </h3>
          <div className="space-y-3">
            {behaviorTraits.map((trait, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700/20 rounded-lg">
                <div>
                  <p className="text-sm text-white">{trait.trait}</p>
                  <p className="text-xs text-slate-400">{trait.value}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  trait.baseline === 'Normal' || trait.baseline === 'Consistent' || trait.baseline === 'Stable' ||
                  trait.baseline === 'Learned' || trait.baseline === 'Established' || trait.baseline === 'Regular'
                    ? 'bg-green-900/50 text-green-400' : 'bg-yellow-900/50 text-yellow-400'
                }`}>
                  {trait.baseline}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity Log */}
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <MapPin className="text-orange-400" size={20} />
            Recent Activity Log
          </h3>
          <div className="space-y-2">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-slate-700/20 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-mono w-12">{activity.time}</span>
                  <div>
                    <p className="text-sm text-white">{activity.action}</p>
                    {activity.amount !== "-" && (
                      <p className="text-xs text-slate-400">{activity.amount}</p>
                    )}
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  activity.risk === 'Low' ? 'bg-green-900/50 text-green-400' :
                  activity.risk === 'Medium' ? 'bg-yellow-900/50 text-yellow-400' :
                  'bg-red-900/50 text-red-400'
                }`}>
                  {activity.risk}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserProfiling;
