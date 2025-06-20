
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Volume2, Sun, Smartphone, Activity } from "lucide-react";

interface SensorData {
  soundLevel: number;
  lightIntensity: number;
  tiltAngle: number;
  motionStatus: "Static" | "Walking" | "Running";
}

interface SensorControlsProps {
  sensorData: SensorData;
  onSensorChange: (data: Partial<SensorData>) => void;
}

const SensorControls = ({ sensorData, onSensorChange }: SensorControlsProps) => {
  return (
    <Card className="bg-slate-800/50 border-slate-700 p-6">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <Activity className="text-blue-400" size={24} />
        Sensor Data Simulation
      </h2>
      
      <div className="space-y-8">
        {/* Sound Level */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-white font-medium flex items-center gap-2">
              <Volume2 className="text-blue-400" size={20} />
              Ambient Sound Level
            </label>
            <span className="text-blue-300 font-mono text-sm bg-slate-700/50 px-2 py-1 rounded">
              {sensorData.soundLevel} dB
            </span>
          </div>
          <Slider
            value={[sensorData.soundLevel]}
            onValueChange={(value) => onSensorChange({ soundLevel: value[0] })}
            max={100}
            min={0}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-400">
            <span>0 dB</span>
            <span className="text-green-400">Normal: 10-60 dB</span>
            <span>100 dB</span>
          </div>
        </div>

        {/* Light Intensity */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-white font-medium flex items-center gap-2">
              <Sun className="text-yellow-400" size={20} />
              Light Intensity
            </label>
            <span className="text-blue-300 font-mono text-sm bg-slate-700/50 px-2 py-1 rounded">
              {sensorData.lightIntensity}%
            </span>
          </div>
          <Slider
            value={[sensorData.lightIntensity]}
            onValueChange={(value) => onSensorChange({ lightIntensity: value[0] })}
            max={100}
            min={0}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-400">
            <span>0%</span>
            <span className="text-green-400">Normal: 20-80%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Device Tilt */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-white font-medium flex items-center gap-2">
              <Smartphone className="text-purple-400" size={20} />
              Device Tilt Angle
            </label>
            <span className="text-blue-300 font-mono text-sm bg-slate-700/50 px-2 py-1 rounded">
              {sensorData.tiltAngle}°
            </span>
          </div>
          <Slider
            value={[sensorData.tiltAngle]}
            onValueChange={(value) => onSensorChange({ tiltAngle: value[0] })}
            max={90}
            min={-90}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-400">
            <span>-90°</span>
            <span className="text-green-400">Normal: -30° to +30°</span>
            <span>+90°</span>
          </div>
        </div>

        {/* Motion Status */}
        <div className="space-y-3">
          <label className="text-white font-medium flex items-center gap-2">
            <Activity className="text-orange-400" size={20} />
            Motion Status
          </label>
          <Select
            value={sensorData.motionStatus}
            onValueChange={(value: "Static" | "Walking" | "Running") => 
              onSensorChange({ motionStatus: value })
            }
          >
            <SelectTrigger className="w-full bg-slate-700/50 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Static">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Static (Normal)
                </span>
              </SelectItem>
              <SelectItem value="Walking">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  Walking (Normal)
                </span>
              </SelectItem>
              <SelectItem value="Running">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  Running (Suspicious)
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};

export default SensorControls;
