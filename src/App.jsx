import { useState } from "react";
import { Home } from "./Home";
import { Onboarding } from "./Onboarding";
export default function App() {
  const [flow, setFlow] = useState(false);
  const [initialVibe, setInitialVibe] = useState("");
  const start = (vibe) => {
    setInitialVibe(typeof vibe === "string" ? vibe : "");
    setFlow(true);
    window.scrollTo(0, 0);
  };
  return flow ? (
    <Onboarding
      initialVibe={initialVibe}
      close={() => {
        setFlow(false);
        window.scrollTo(0, 0);
      }}
    />
  ) : (
    <Home start={start} />
  );
}
