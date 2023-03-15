import { Physics } from "@react-three/cannon";
import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Ground from "./components/Ground";
import Player from "./components/Player";
import FirstPersonView from "./components/FirstPersonView";
import Cube from "./components/Cube";
import { useGameContext } from "./context/game-context";
import { CrossHair } from "./icons/icon";
import Selectbar from "./components/Selectbar";
import Cubes from "./components/Cubes";
import { useEffect } from "react";

function App() {
  const { generateRandomCube } = useGameContext();
  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      if (e.code === "KeyE") {
        console.log("generate");
        generateRandomCube(20, [-20, 45]);
      }
    });
    return document.removeEventListener("keypress", (e) => {
      if (e.code === "KeyE") {
        generateRandomCube(20, [-20, 45]);
      }
    });
  });
  return (
    <div
      style={{
        width: "100v",
        height: "100vh",
      }}
    >
      <Canvas>
        <Sky sunPosition={[200, 200, 200]} />
        <ambientLight intensity={0.5} />
        <FirstPersonView />
        <Physics>
          <Player />
          <Cubes />
          <Ground />
        </Physics>
      </Canvas>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
        }}
      >
        <CrossHair />
      </div>
      <Selectbar />
    </div>
  );
}

export default App;
