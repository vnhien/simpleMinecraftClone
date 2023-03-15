import { useGameContext } from "../../context/game-context";
import Cube from "../Cube";

const Cubes = () => {
  const { cubes } = useGameContext();
  return (
    <>
      {cubes?.map((cube) => {
        return (
          <Cube key={cube.id} position={cube.position} texture={cube.texture} />
        );
      })}
    </>
  );
};

export default Cubes;
