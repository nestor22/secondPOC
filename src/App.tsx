import React, { useEffect } from 'react';
import WinnerCircle3d from './components/WinnerCircle3d'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "50px" }}>Ganadores</h1>
      {/* Asegúrate de que la ruta del logo sea la correcta */}
      <WinnerCircle3d logo={reactLogo} />
    </div>
  );
}

export default App;
