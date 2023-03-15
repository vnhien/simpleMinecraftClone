import { useEffect, useState } from "react";
import { useGameContext } from "../../context/game-context";

const Selectbar = () => {
  const { cubeMenu, nextSlot, prevSlot, active } = useGameContext();
  const handleChangeSlot = (e) => {
    if (e.deltaY > 0) {
      nextSlot();
    } else {
      prevSlot();
    }
  };
  useEffect(() => {
    document.addEventListener("wheel", handleChangeSlot);
    return () => {
      document.removeEventListener("wheel", handleChangeSlot);
    };
  }, []);
  return (
    <div
      style={{
        width: "100%",
        position: "absolute",
        bottom: "10px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          borderRadius: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {cubeMenu.map((item, index) => {
          return (
            <div
              style={{
                height: "80px",
                width: "80px",
                border: "1px solid black",
                backgroundColor:
                  index === active ? "rgb(150,114,80 )" : "rgb(150,114,80,0.3)",
                borderRadius: "2px",
                padding: "2px",
              }}
            >
              <img src={item.img} alt="" width={"100%"} height={"100%"} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Selectbar;
