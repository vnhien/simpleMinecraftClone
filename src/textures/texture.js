import { NearestFilter, RepeatWrapping, TextureLoader } from "three";
import { dirt, log, grass } from "./images";

const loadProcessedTexture = (image) => {
  const texture = new TextureLoader().load(image);
  texture.magFilter = NearestFilter;
  return texture;
};
const processRepeatTexture = (texture) => {
  texture.magFilter = NearestFilter;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(100, 100);
  return texture;
};
const dirtTexture = loadProcessedTexture(dirt);
const logTexture = loadProcessedTexture(log);
const grassTexture = loadProcessedTexture(grass);
const groundGrassTexture = processRepeatTexture(
  new TextureLoader().load(grass)
);

export const GameTexture = {
  dirtTexture,
  logTexture,
  groundGrassTexture,
  grassTexture,
};
