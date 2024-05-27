import { useState } from "react";
import { useNuiEvent } from "../hooks/useNuiEvent";

import "./App.css";

export default function App() {
  const [tabletOpen, setTabletOpen] = useState<boolean>(false);
  const [maximized, setMaximized] = useState<boolean>(false);

  const toggleTablet = (toogled: boolean) => setTabletOpen(toogled);
  useNuiEvent<boolean>("openTablet", (toogled) => toggleTablet(toogled));

  if (!tabletOpen) {
    return null;
  }

  return (
    <div className={`tablet ${maximized ? "maximized" : ""}`}>
      <div className="header-tablet">
        <div className="manage-tablet-dots">
          <div className="button-dot close" onClick={() => toggleTablet(false)} />
          <div className="button-dot minimize" onClick={() => setMaximized(!maximized)} />
          <div className="button-dot window" onClick={() => setMaximized(!maximized)} />
        </div>
      </div>
    </div >
  )
}