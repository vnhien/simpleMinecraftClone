import { PointerLockControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const FirstPersonView = () => {
  const { camera, gl } = useThree();
  return <PointerLockControls args={[camera, gl.domElement]} />;
};
export default FirstPersonView;
