import Sidebar from './components/sidebar';
import AnimatedRings from './components/AnimateRings';
import RingsWithSVG from './components/Rings3D';
import Other3d from './components/Other3d';

function App() {

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 relative">
        <AnimatedRings />
        <div className="absolute top-4 left-4 text-white z-10">
          <h1 className="text-3xl font-bold">Animated Rings</h1>
        </div>
      </div>
      <div>
        <RingsWithSVG
          ringColor="#00ffcc"
          svgPath="/assets/chartj.svg"
        />
      </div>
      <div>
        <Other3d
          ringColor="#00ffcc"
          svgPath="/assets/chartj.svg"
        />
      </div>

      <div className="app">
      <div className="scene">
        {/* Aros flotantes usando SVG */}
        <svg className="rings" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <circle className="ring ring-1" cx="100" cy="100" r="90" />
          <circle className="ring ring-2" cx="100" cy="100" r="70" />
          <circle className="ring ring-3" cx="100" cy="100" r="50" />
        </svg>

        {/* Cubo flotante */}
        <div className="cube"></div>
      </div>
    </div>

    

    </div>
  );

  // return (
  //   <div className="flex">
  //     <Sidebar />
  //     <div className="flex-1 bg-gray-800 text-gray-300 p-6">
  //       <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
  //       <p className="mt-4">This is the main content area.</p>
  //     </div>
  //     <div className="flex-1 relative">
  //       <FloatingScene />
  //       <div className="absolute inset-0 z-10 flex items-center justify-center text-white">
  //         <h1 className="text-4xl font-bold">3D Dashboard</h1>
  //       </div>
  //     </div>

  //     <div className="flex-1 relative">
  //       <AnimatedRings />
  //       <div className="absolute top-4 left-4 text-white z-10">
  //         <h1 className="text-3xl font-bold">Animated Rings</h1>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default App;
