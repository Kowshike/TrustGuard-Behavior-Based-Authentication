
import { Card } from "@/components/ui/card";
import { Smartphone, MapPin, Wifi, Battery, Signal, Globe, Shield, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface DeviceIntelligenceProps {
  trustScore: number;
  sensorData: any;
}

const DeviceIntelligence = ({ trustScore, sensorData }: DeviceIntelligenceProps) => {
  const [deviceFingerprint, setDeviceFingerprint] = useState({
    deviceId: "SM-G991B-7A4F2E1",
    os: "Android 13",
    browser: "Chrome 120.0.6099.144",
    screen: "1080x2400",
    timezone: "Asia/Kolkata",
    language: "en-US",
    cookiesEnabled: true,
    javaEnabled: false
  });

  const [locationData, setLocationData] = useState({
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    latitude: 19.0760,
    longitude: 72.8777,
    accuracy: 10,
    vpnDetected: false,
    ipRisk: "Low",
    previousLocations: [
      { city: "Mumbai", country: "India", visits: 342, lastSeen: "Current" },
      { city: "Pune", country: "India", visits: 23, lastSeen: "2 days ago" },
      { city: "Delhi", country: "India", visits: 8, lastSeen: "1 week ago" }
    ]
  });

  const [networkInfo, setNetworkInfo] = useState({
    connectionType: "WiFi",
    signalStrength: 85,
    networkName: "Home_Network_5G",
    ipAddress: "192.168.1.105",
    isp: "Jio Fiber",
    proxyDetected: false,
    tor: false
  });

  const [deviceHealth, setDeviceHealth] = useState({
    batteryLevel: 78,
    temperature: 32,
    storageUsed: 64,
    ramUsage: 71,
    cpuUsage: 23,
    jailbroken: false,
    malwareDetected: false,
    debugMode: false
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkInfo(prev => ({
        ...prev,
        signalStrength: Math.max(70, Math.min(100, prev.signalStrength + (Math.random() - 0.5) * 10))
      }));

      setDeviceHealth(prev => ({
        ...prev,
        batteryLevel: Math.max(0, prev.batteryLevel - 0.1),
        cpuUsage: Math.max(15, Math.min(80, prev.cpuUsage + (Math.random() - 0.5) * 20))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Device Fingerprint */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Smartphone className="text-blue-400" size={20} />
          Device Fingerprint Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <p className="text-xs text-slate-400">Device ID</p>
            <p className="text-sm text-white font-mono">{deviceFingerprint.deviceId}</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-slate-400">Operating System</p>
            <p className="text-sm text-white">{deviceFingerprint.os}</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-slate-400">Browser</p>
            <p className="text-sm text-white">{deviceFingerprint.browser}</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-slate-400">Screen Resolution</p>
            <p className="text-sm text-white">{deviceFingerprint.screen}</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-slate-400">Timezone</p>
            <p className="text-sm text-white">{deviceFingerprint.timezone}</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-slate-400">Language</p>
            <p className="text-sm text-white">{deviceFingerprint.language}</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-slate-400">Cookies</p>
            <p className={`text-sm ${deviceFingerprint.cookiesEnabled ? 'text-green-400' : 'text-red-400'}`}>
              {deviceFingerprint.cookiesEnabled ? 'Enabled' : 'Disabled'}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-slate-400">Java</p>
            <p className={`text-sm ${deviceFingerprint.javaEnabled ? 'text-green-400' : 'text-red-400'}`}>
              {deviceFingerprint.javaEnabled ? 'Enabled' : 'Disabled'}
            </p>
          </div>
        </div>
      </Card>

      {/* Location & Network Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <MapPin className="text-green-400" size={20} />
            Geolocation Intelligence
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-400">Current Location</p>
                <p className="text-sm text-white">{locationData.city}, {locationData.country}</p>
                <p className="text-xs text-slate-500">
                  {locationData.latitude}°N, {locationData.longitude}°E
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Accuracy</p>
                <p className="text-sm text-green-400">±{locationData.accuracy}m</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-700/20 rounded-lg">
              <span className="text-sm text-white">VPN Detection</span>
              <span className={`text-sm px-2 py-1 rounded ${
                !locationData.vpnDetected ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
              }`}>
                {locationData.vpnDetected ? 'Detected' : 'Not Detected'}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-700/20 rounded-lg">
              <span className="text-sm text-white">IP Risk Level</span>
              <span className="text-sm text-green-400">{locationData.ipRisk}</span>
            </div>

            <div>
              <p className="text-xs text-slate-400 mb-2">Previous Locations</p>
              <div className="space-y-1">
                {locationData.previousLocations.map((loc, index) => (
                  <div key={index} className="flex justify-between text-xs">
                    <span className="text-slate-300">{loc.city}, {loc.country}</span>
                    <span className="text-slate-500">{loc.visits} visits • {loc.lastSeen}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Wifi className="text-purple-400" size={20} />
            Network & Security Analysis
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-400">Connection Type</p>
                <p className="text-sm text-white">{networkInfo.connectionType}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Signal Strength</p>
                <div className="flex items-center gap-2">
                  <Signal className="text-blue-400" size={16} />
                  <span className="text-sm text-blue-400">{networkInfo.signalStrength}%</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-400">Network Name</p>
              <p className="text-sm text-white">{networkInfo.networkName}</p>
            </div>

            <div>
              <p className="text-xs text-slate-400">ISP</p>
              <p className="text-sm text-white">{networkInfo.isp}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-slate-700/20 rounded">
                <span className="text-sm text-white">Proxy Detection</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  !networkInfo.proxyDetected ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
                }`}>
                  {networkInfo.proxyDetected ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-700/20 rounded">
                <span className="text-sm text-white">Tor Network</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  !networkInfo.tor ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
                }`}>
                  {networkInfo.tor ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Device Health Monitor */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Battery className="text-orange-400" size={20} />
          Device Health & Security Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Battery Level</span>
              <span className="text-sm text-orange-400">{Math.round(deviceHealth.batteryLevel)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-orange-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${deviceHealth.batteryLevel}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">CPU Usage</span>
              <span className="text-sm text-blue-400">{Math.round(deviceHealth.cpuUsage)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${deviceHealth.cpuUsage}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">RAM Usage</span>
              <span className="text-sm text-purple-400">{deviceHealth.ramUsage}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-purple-400 h-2 rounded-full"
                style={{ width: `${deviceHealth.ramUsage}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Storage Used</span>
              <span className="text-sm text-green-400">{deviceHealth.storageUsed}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-green-400 h-2 rounded-full"
                style={{ width: `${deviceHealth.storageUsed}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-3 rounded-lg border ${
            !deviceHealth.jailbroken ? 'bg-green-900/20 border-green-400/30' : 'bg-red-900/20 border-red-400/30'
          }`}>
            <div className="flex items-center gap-2">
              <Shield className={deviceHealth.jailbroken ? 'text-red-400' : 'text-green-400'} size={16} />
              <span className="text-sm text-white">Jailbreak Status</span>
            </div>
            <p className={`text-xs mt-1 ${deviceHealth.jailbroken ? 'text-red-400' : 'text-green-400'}`}>
              {deviceHealth.jailbroken ? 'Detected' : 'Not Detected'}
            </p>
          </div>

          <div className={`p-3 rounded-lg border ${
            !deviceHealth.malwareDetected ? 'bg-green-900/20 border-green-400/30' : 'bg-red-900/20 border-red-400/30'
          }`}>
            <div className="flex items-center gap-2">
              <AlertCircle className={deviceHealth.malwareDetected ? 'text-red-400' : 'text-green-400'} size={16} />
              <span className="text-sm text-white">Malware Scan</span>
            </div>
            <p className={`text-xs mt-1 ${deviceHealth.malwareDetected ? 'text-red-400' : 'text-green-400'}`}>
              {deviceHealth.malwareDetected ? 'Threats Found' : 'Clean'}
            </p>
          </div>

          <div className={`p-3 rounded-lg border ${
            !deviceHealth.debugMode ? 'bg-green-900/20 border-green-400/30' : 'bg-yellow-900/20 border-yellow-400/30'
          }`}>
            <div className="flex items-center gap-2">
              <Globe className={deviceHealth.debugMode ? 'text-yellow-400' : 'text-green-400'} size={16} />
              <span className="text-sm text-white">Debug Mode</span>
            </div>
            <p className={`text-xs mt-1 ${deviceHealth.debugMode ? 'text-yellow-400' : 'text-green-400'}`}>
              {deviceHealth.debugMode ? 'Enabled' : 'Disabled'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DeviceIntelligence;
