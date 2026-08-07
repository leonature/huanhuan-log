const menu = ["灌汤小笼包", "豆腐脑"];
const wheel = document.querySelector("#wheel");
const button = document.querySelector("#spin-button");
const buttonText = document.querySelector("#button-text");
const buttonSubtext = document.querySelector("#button-subtext");
const answer = document.querySelector("#answer");
const result = document.querySelector("#result");

let rotation = 0;
let spinning = false;

button.addEventListener("click", () => {
  if (spinning) return;

  const selected = Math.floor(Math.random() * menu.length);
  const targetOffset = selected === 0 ? 90 : 270;
  rotation += 1440 + ((targetOffset - (rotation % 360) + 360) % 360);
  spinning = true;

  answer.classList.remove("answer-visible");
  result.textContent = "等待天意";
  button.disabled = true;
  buttonText.textContent = "天意中";
  buttonSubtext.textContent = "···";
  wheel.style.transform = `rotate(${rotation}deg)`;

  window.setTimeout(() => {
    result.textContent = menu[selected];
    answer.classList.add("answer-visible");
    button.disabled = false;
    buttonText.textContent = "开转";
    buttonSubtext.textContent = "SPIN";
    spinning = false;
  }, 3200);
});
