import ImageLib from "./lib.js";

const imageLib = new ImageLib("myCanvas", "username");

function startUpdateLoop() {
  setInterval(() => {
    imageLib.update();
  }, 1000 / 30);
  setInterval(() => {
    imageLib.addFallingLetter();
  }, 1000.3);
}

startUpdateLoop();

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    imageLib.moveRectangle("left");
  } else if (event.key === "ArrowRight") {
    imageLib.moveRectangle("right");
  }
});
