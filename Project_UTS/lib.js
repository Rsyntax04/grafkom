export default class ImageLib {
  constructor(canvas_id, output_div_id) {
    this.canvas_handler = document.getElementById(canvas_id);
    this.ctx = this.canvas_handler.getContext("2d");
    this.width = this.canvas_handler.width;
    this.height = this.canvas_handler.height;
    this.fallingLetters = [];
    this.imageData = this.canvas_handler
      .getContext("2d")
      .createImageData(this.width, this.height);
    this.captureArea = {
      x: this.width / 4,
      y: this.height - 100,
      width: this.width / 10,
      height: 30,
    };
    this.speed = 5;
    this.rectangleX = this.captureArea.x;
    this.letters = this.initializeLetters();
    this.capturedLetters = [];
    this.outputDiv = document.getElementById(output_div_id);
  }
  // Assist by chatgpt
  initializeLetters() {
    return {
      A: [
        [0, 1, 0],
        [1, 0, 1],
        [1, 1, 1],
        [1, 0, 1],
        [1, 0, 1],
      ],
      B: [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
      ],
      C: [
        [1, 1, 1],
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 1],
      ],
      D: [
        [1, 1, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
      ],
      E: [
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
      ],
      F: [
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
        [1, 0, 0],
      ],
      G: [
        [1, 1, 1],
        [1, 0, 0],
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
      ],
      H: [
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
        [1, 0, 1],
        [1, 0, 1],
      ],
      I: [
        [1, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 1],
      ],
      J: [
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
      ],
      K: [
        [1, 0, 1],
        [1, 0, 0],
        [1, 1, 0],
        [1, 0, 0],
        [1, 0, 1],
      ],
      L: [
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 1],
      ],
      M: [
        [1, 0, 1],
        [1, 1, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
      ],
      N: [
        [1, 0, 1],
        [1, 1, 0],
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
      ],
      O: [
        [1, 1, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
      ],
      P: [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
        [1, 0, 0],
        [1, 0, 0],
      ],
      Q: [
        [1, 1, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
        [0, 0, 1],
      ],
      R: [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
        [1, 0, 1],
        [1, 0, 1],
      ],
      S: [
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
        [1, 1, 1],
      ],
      T: [
        [1, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ],
      U: [
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
      ],
      V: [
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 0],
        [0, 1, 0],
      ],
      W: [
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
        [1, 0, 1],
      ],
      X: [
        [1, 0, 1],
        [1, 0, 1],
        [0, 1, 0],
        [1, 0, 1],
        [1, 0, 1],
      ],
      Y: [
        [1, 0, 1],
        [1, 0, 1],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ],
      Z: [
        [1, 1, 1],
        [0, 0, 1],
        [0, 1, 0],
        [1, 0, 0],
        [1, 1, 1],
      ],
    };
  }
  clearCanvas() {
    for (let i = 0; i < this.imageData.data.length; i += 4) {
      this.imageData.data[i] = 255;
      this.imageData.data[i + 1] = 255;
      this.imageData.data[i + 2] = 255;
      this.imageData.data[i + 3] = 255;
    }
  }

  create_dot(x, y, color) {
    const index =
      (Math.round(x) + Math.round(y) * this.canvas_handler.width) * 4;

    this.imageData.data[index] = color.r;
    this.imageData.data[index + 1] = color.g;
    this.imageData.data[index + 2] = color.b;
    this.imageData.data[index + 3] = 255;
  }

  create_line(x0, y0, x1, y1, color) {
    let dy = y1 - y0;
    let dx = x1 - x0;

    if (Math.abs(dy) > Math.abs(dx)) {
      if (y0 > y1) {
        for (let i = y0; i > y1; i--) {
          this.create_dot(x0, i, color);
          x0 += dx / Math.abs(dy);
        }
      } else {
        for (let i = y0; i < y1; i++) {
          this.create_dot(x0, i, color);
          x0 += dx / Math.abs(dy);
        }
      }
    } else {
      if (x0 > x1) {
        for (let i = x0; i > x1; i--) {
          this.create_dot(i, y0, color);
          y0 += dy / Math.abs(dx);
        }
      } else {
        for (let i = x0; i < x1; i++) {
          this.create_dot(i, y0, color);
          y0 += dy / Math.abs(dx);
        }
      }
    }
  }

  //Assisted By ChatGpt
  drawText(x, y, char) {
    const letterData = this.letters[char.toUpperCase()];
    if (!letterData) return;

    const color = { r: 0, g: 0, b: 255 };
    const pixelSize = 6;

    for (let row = 0; row < letterData.length; row++) {
      for (let col = 0; col < letterData[row].length; col++) {
        if (letterData[row][col] === 1) {
          for (let i = 0; i < pixelSize; i++) {
            for (let j = 0; j < pixelSize; j++) {
              this.create_dot(
                x + col * pixelSize + i,
                y + row * pixelSize + j,
                color
              );
            }
          }
        }
      }
    }
  }

  addFallingLetter() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomIndex = Math.floor(Math.random() * letters.length);
    const letter = letters[randomIndex];

    this.fallingLetters.push({
      letter,
      x: Math.random() * (this.width - 30),
      y: 0,
    });
  }

  update() {
    this.clearCanvas();

    const color = { r: 0, g: 0, b: 255 };
    this.create_line(
      this.rectangleX,
      this.captureArea.y,
      this.rectangleX + this.captureArea.width,
      this.captureArea.y,
      color
    );
    this.create_line(
      this.rectangleX + this.captureArea.width,
      this.captureArea.y,
      this.rectangleX + this.captureArea.width,
      this.captureArea.y + this.captureArea.height,
      color
    );
    this.create_line(
      this.rectangleX + this.captureArea.width,
      this.captureArea.y + this.captureArea.height,
      this.rectangleX,
      this.captureArea.y + this.captureArea.height,
      color
    );
    this.create_line(
      this.rectangleX,
      this.captureArea.y + this.captureArea.height,
      this.rectangleX,
      this.captureArea.y,
      color
    );

    for (let i = 0; i < this.fallingLetters.length; i++) {
      const letterObj = this.fallingLetters[i];
      this.drawText(letterObj.x, letterObj.y, letterObj.letter);
      letterObj.y += this.speed;

      const letterBottom = letterObj.y + 15;
      const letterWidth = 9;

      if (
        letterBottom >= this.captureArea.y &&
        letterObj.x + letterWidth > this.rectangleX &&
        letterObj.x < this.rectangleX + this.captureArea.width
      ) {
        console.log(`Captured: ${letterObj.letter}`);
        this.capturedLetters.push(letterObj.letter);
        this.updateCapturedLettersDisplay();
        this.fallingLetters.splice(i, 1);
        i--;
      }

      if (letterBottom > this.height) {
        this.fallingLetters.splice(i, 1);
        i--;
      }
    }

    this.ctx.putImageData(this.imageData, 0, 0);
  }

  updateCapturedLettersDisplay() {
    const capturedWord = this.capturedLetters.join("");
    this.outputDiv.value = capturedWord;
  }

  moveRectangle(direction) {
    const moveSpeed = 30;
    if (direction === "left" && this.rectangleX > 0) {
      this.rectangleX -= moveSpeed;
    }
    if (
      direction === "right" &&
      this.rectangleX < this.width - this.captureArea.width
    ) {
      this.rectangleX += moveSpeed;
    }
  }
}
