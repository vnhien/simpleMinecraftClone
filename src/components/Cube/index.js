import { useBox } from "@react-three/cannon";
import { GameTexture } from "../../textures/texture";
import { useGameContext } from "../../context/game-context";
import { useState } from "react";

const Cube = ({ position, texture }) => {
  const [isHover, setIsHover] = useState(false);
  const { cubeMenu, active } = useGameContext();
  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }));
  const cubeTexture = GameTexture[texture];
  const { addCube, removeCube } = useGameContext();

  return (
    <mesh
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        const [x, y, z] = ref.current.position;
        const face = Math.floor(e.faceIndex / 2);
        if (e.altKey) {
          removeCube([x, y, z]);
          return;
        }
        switch (face) {
          case 0:
            addCube([x + 1, y, z], cubeMenu[active].name);
            break;
          case 1:
            addCube([x - 1, y, z], cubeMenu[active].name);
            break;
          case 2:
            addCube([x, y + 1, z], cubeMenu[active].name);
            break;
          case 3:
            addCube([x, y - 1, z], cubeMenu[active].name);
            break;
          case 4:
            addCube([x, y, z + 1], cubeMenu[active].name);
            break;
          case 5:
            addCube([x, y, z - 1], cubeMenu[active].name);
            break;
          default:
            break;
        }
      }}
      onPointerEnter={(e) => {
        setIsHover(true);
      }}
      onPointerLeave={(e) => {
        setIsHover(false);
      }}
    >
      <boxGeometry attach="geometry" />
      <meshStandardMaterial
        map={cubeTexture}
        // color={isHover ? "grey" : "white"}
        attach="material"
      />
    </mesh>
  );
};
export default Cube;
