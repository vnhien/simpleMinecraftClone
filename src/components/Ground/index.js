import { usePlane } from "@react-three/cannon";
import { GameTexture } from "../../textures/texture";
import { useGameContext } from "../../context/game-context";

const Ground = () => {
  const { addCube, cubeMenu, active } = useGameContext();
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0.5, 0],
  }));

  return (
    <mesh
      ref={ref}
      onClick={(e) => {
        const [x, y, z] = Object.values(e.point).map((value) =>
          Math.ceil(value)
        );
        addCube([x, y, z], cubeMenu[active].name);
      }}
    >
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial
        attach="material"
        color={"grey"}
        map={GameTexture.groundGrassTexture}
      />
    </mesh>
  );
};
export default Ground;
