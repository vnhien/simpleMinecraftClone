import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../../hooks/useKeyboard";

const Player = () => {
  const { camera } = useThree();
  const [speed, setSpeed] = useState(2);
  const action = useKeyboard();

  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 5, 0],
  }));
  // useEffect(() => {
  //   if (ref.current.position[1] < 0.01) {
  //     setSpeed((prev) => {
  //       if (action.run) {
  //         return 5;
  //       } else {
  //         return 2;
  //       }
  //     });
  //   }
  // }, [ref, action.run]);
  // position
  const pos = useRef([0, 0, 0]);
  useEffect(() => {
    api.position.subscribe((p) => {
      pos.current = p;
    });
  }, [api.position]);
  // movement
  const vel = useRef([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((p) => {
      vel.current = p;
    });
  }, [api.velocity]);

  useFrame(() => {
    camera.position.copy(
      new Vector3(pos.current[0], pos.current[1], pos.current[2])
    );
    const direction = new Vector3();
    const frontVector = new Vector3(
      0,
      0,
      (action.moveBack ? 1 : 0) - (action.moveFoward ? 1 : 0)
    );
    const sideVector = new Vector3(
      (action.moveLeft ? 1 : 0) - (action.moveRight ? 1 : 0),
      0,
      0
    );
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(action.run ? 5 : 2)
      .applyEuler(camera.rotation);
    api.velocity.set(direction.x, vel.current[1], direction.z);
    if (action.jump && Math.abs(vel.current[1]) < 0.05) {
      api.velocity.set(vel.current[0], 3, vel.current[2]);
    }
  });
  return <mesh re={ref}></mesh>;
};
export default Player;
