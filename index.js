const crossEle = '<div class="cross"></div>';
const roundEle = '<div class="round"></div>';

const boxes = document.querySelectorAll('.box')
const resetBtn = document.getElementById("reset");
const sectionBox = document.getElementsByTagName("section")[0];
const player1 = document.getElementById("player-1");
const player2 = document.getElementById("player-2");

let counter = 0;

resetBtn.addEventListener("click", () => {
    boxes.forEach((box) => {
    box.innerHTML = "";
    box.setAttribute("data-fig", "");
    counter = 0;
    box.style.opacity = 1;
    player2.style.opacity = 0.5;
    player1.style.opacity = 1;
    sectionBox.style.background = "linear-gradient(to left, #1cb5e0, #4a569d)";
    });
});

boxes.forEach((box) => {
    box.addEventListener("click", () => {
    if (box.innerHTML === "") {
        if (counter % 2 == 0) {
        box.innerHTML = crossEle;
        box.setAttribute("data-fig", "cross");
        player1.style.opacity = 0.5;
        player2.style.opacity = 1;
        sectionBox.style.background =
            "linear-gradient(to right, #ff416c, #ff4b2b)";
        } else {
        box.innerHTML = roundEle;
        box.setAttribute("data-fig", "round");
        player2.style.opacity = 0.5;
        player1.style.opacity = 1;
        sectionBox.style.background =
            "linear-gradient(to left, #1cb5e0, #4a569d)";
      }
      counter++;
      if (counter > 4) {
        const { ele, indices } = checkResult();
        if (ele != null) {
          boxes.forEach((box) => {
            box.style.opacity = 0.5;
          });
          boxes[indices[0]].style.opacity = 1;
          boxes[indices[1]].style.opacity = 1;
          boxes[indices[2]].style.opacity = 1;
          sectionBox.style.background =
            ele === "cross"
              ? "linear-gradient(to left, #1cb5e0, #4a569d)"
              : "linear-gradient(to right, #ff416c, #ff4b2b)";
          player2.style.opacity = ele === "cross" ? 0.5 : 1;
          player1.style.opacity = ele === "cross" ? 1 : 0.5;
        }
        if (counter == 9) {
          boxes.forEach((box) => {
            box.style.opacity = 0.5;
            player2.style.opacity = 0.5;
            player1.style.opacity = 0.5;
            sectionBox.style.background = `#000`;
          });
        }
      }
    }
  });
});

const checkIfEqual = (a, b, c) => {
  if (
    boxes[a].innerHTML === boxes[b].innerHTML &&
    boxes[b].innerHTML === boxes[c].innerHTML
  )
    return boxes[a].getAttribute("data-fig");
  return false;
};

const checkResult = () => {
  // Checking rows
  if (checkIfEqual(0, 1, 2)) {
    return { ele: checkIfEqual(0, 1, 2), indices: [0, 1, 2] };
  }
  if (checkIfEqual(3, 4, 5)) {
    return { ele: checkIfEqual(3, 4, 5), indices: [3, 4, 5] };
  }
  if (checkIfEqual(6, 7, 8)) {
    return { ele: checkIfEqual(6, 7, 8), indices: [6, 7, 8] };
  }

  // Checking columns
  if (checkIfEqual(0, 3, 6)) {
    return { ele: checkIfEqual(0, 3, 6), indices: [0, 3, 6] };
  }
  if (checkIfEqual(1, 4, 7)) {
    return { ele: checkIfEqual(1, 4, 7), indices: [1, 4, 7] };
  }
  if (checkIfEqual(2, 5, 8)) {
    return { ele: checkIfEqual(2, 5, 8), indices: [2, 5, 8] };
  }

  // Checking diags
  if (checkIfEqual(0, 4, 8)) {
    return { ele: checkIfEqual(0, 4, 8), indices: [0, 4, 8] };
  }
  if (checkIfEqual(2, 4, 6)) {
    return { ele: checkIfEqual(2, 4, 6), indices: [2, 4, 6] };
  }

  return { ele: null, indices: [] };
};
