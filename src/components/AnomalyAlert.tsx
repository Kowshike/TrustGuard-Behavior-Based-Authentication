
import { Card } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnomalyAlertProps {
  status: "Safe" | "Suspicious";
}

const AnomalyAlert = ({ status }: AnomalyAlertProps) => {
  const handleReAuthenticate = () => {
    console.log("Re-authentication triggered");
    // Simulate re-authentication process
    alert("Re-authentication process would start here. Session temporarily locked.");
  };

  if (status === "Safe") {
    return (
      <Card className="bg-green-900/20 border-green-400/30 p-6">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="text-green-400" size={24} />
          <div>
            <h3 className="text-green-400 font-semibold">All Good</h3>
            <p className="text-green-300 text-sm">
              Normal behavior patterns detected. Session secure.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-red-900/20 border-red-400/30 p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="text-red-400" size={24} />
          <div>
            <h3 className="text-red-400 font-semibold">Suspicious Activity Detected</h3>
            <p className="text-red-300 text-sm">
              Anomalous behavior patterns detected. Please re-authenticate.
            </p>
          </div>
        </div>
        
        <Button 
          onClick={handleReAuthenticate}
          className="w-full bg-red-600 hover:bg-red-700 text-white"
        >
          <Lock className="mr-2" size={16} />
          Re-authenticate Session
        </Button>
      </div>
    </Card>
  );
};

export default AnomalyAlert;
