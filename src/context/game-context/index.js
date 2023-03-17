import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { nanoid } from "nanoid";
import {
  dirt,
  grass,
  log,
  coal,
  copper,
  iron,
  plank,
  stone,
} from "../../textures/images";

const gameContext = createContext();
export const GameContextProvider = ({ children }) => {
  const slots = 8;
  const [cubes, setCubes] = useState([]);
  const [cubeMenu, setCubeMenu] = useState([
    { name: "dirtTexture", img: dirt },
    { name: "logTexture", img: log },
    { name: "grassTexture", img: grass },
    { name: "coalTexture", img: coal },
    { name: "copperTexture", img: copper },
    { name: "ironTexture", img: iron },
    { name: "plankTexture", img: plank },
    { name: "stoneTexture", img: stone },
  ]);

  const [active, setActive] = useState(0);
  const nextSlot = () => {
    setActive((prev) => {
      return Math.min(prev + 1, slots - 1);
    });
  };
  const prevSlot = () => {
    setActive((prev) => {
      return Math.max(prev - 1, 0);
    });
  };
  const addCube = (position, texture) => {
    setCubes((prev) => {
      return [
        ...prev,
        {
          id: nanoid(),
          position: position,
          texture: texture,
        },
      ];
    });
  };
  const removeCube = (position) => {
    setCubes((prev) => {
      return prev.filter(
        (item) =>
          item.position[0] !== position[0] ||
          item.position[1] !== position[1] ||
          item.position[2] !== position[2]
      );
    });
  };
  const getRandom = (start, end) => {
    return Math.floor(Math.random() * (end - start));
  };
  const generateRandomCube = useCallback((num, range) => {
    for (var i = 0; i < num; i++) {
      const x = getRandom(range[0], range[1]);
      const y = getRandom(range[0], range[1]);
      const z = getRandom(range[0], range[1]);
      addCube([x, y, z], "dirtTexture");
    }
  }, []);
  console.log("â");
  const contextValue = useMemo(() => {
    return {
      cubes,
      addCube,
      removeCube,
      nextSlot,
      prevSlot,
      active,
      cubeMenu,
      generateRandomCube,
    };
  }, [cubes, active, cubeMenu, generateRandomCube]);
  return (
    <gameContext.Provider value={contextValue}>{children}</gameContext.Provider>
  );
};
export const useGameContext = () => {
  return useContext(gameContext);
};
