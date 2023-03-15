import { useCallback, useEffect, useState } from "react";
const keyMap = (key) => {
  const keyMap = {
    KeyW: "moveFoward",
    KeyA: "moveLeft",
    KeyD: "moveRight",
    KeyS: "moveBack",
    Space: "jump",
    ShiftLeft: "run",
  };
  return keyMap[key];
};

export const useKeyboard = () => {
  const [action, setAction] = useState({
    moveFoward: false,
    moveBack: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    run: false,
  });
  const handleKeyDown = useCallback((e) => {
    const keycode = keyMap(e.code);
    if (keycode) {
      setAction((prev) => {
        return {
          ...prev,
          [keycode]: true,
        };
      });
    }
  }, []);
  const handleKeyUp = useCallback((e) => {
    const keycode = keyMap(e.code);
    if (keycode) {
      setAction((prev) => {
        return {
          ...prev,
          [keycode]: false,
        };
      });
    }
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  });
  return action;
};
