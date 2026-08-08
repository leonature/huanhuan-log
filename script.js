const meals = {
  breakfast: [
    { name: "灌汤小笼包", icon: "♨", description: "一笼热气 · 汤鲜皮薄" },
    { name: "豆腐脑", icon: "◒", description: "细嫩顺滑 · 暖胃刚好" },
  ],
  main: [
    { name: "水煮肉片", icon: "♨", description: "麻辣鲜香 · 超级下饭" },
    { name: "烧烤", icon: "✦", description: "滋滋冒香 · 快乐加倍" },
  ],
};

const wheel = document.querySelector("#wheel");
const button = document.querySelector("#spin-button");
const buttonText = document.querySelector("#button-text");
const buttonSubtext = document.querySelector("#button-subtext");
const answer = document.querySelector("#answer");
const result = document.querySelector("#result");
const tabs = document.querySelectorAll(".meal-tab");
const names = [document.querySelector("#name-one"), document.querySelector("#name-two")];
const icons = [document.querySelector("#icon-one"), document.querySelector("#icon-two")];
const descriptions = [document.querySelector("#desc-one"), document.querySelector("#desc-two")];

let activeMeal = "breakfast";
let rotation = 0;
let spinning = false;

function showMeal(meal) {
  activeMeal = meal;
  meals[meal].forEach((item, index) => {
    names[index].textContent = item.name;
    icons[index].textContent = item.icon;
    descriptions[index].textContent = item.description;
  });

  wheel.setAttribute("aria-label", `${meal === "breakfast" ? "早餐" : "正餐"}选择转盘`);
  answer.classList.remove("answer-visible");
  result.textContent = "等待天意";

  tabs.forEach((tab) => {
    const selected = tab.dataset.meal === meal;
    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-pressed", String(selected));
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    if (!spinning) showMeal(tab.dataset.meal);
  });
});

button.addEventListener("click", () => {
  if (spinning) return;

  const selected = Math.floor(Math.random() * meals[activeMeal].length);
  const targetOffset = selected === 0 ? 90 : 270;
  rotation += 1440 + ((targetOffset - (rotation % 360) + 360) % 360);
  spinning = true;

  answer.classList.remove("answer-visible");
  result.textContent = "等待天意";
  button.disabled = true;
  tabs.forEach((tab) => { tab.disabled = true; });
  buttonText.textContent = "天意中";
  buttonSubtext.textContent = "···";
  wheel.style.transform = `rotate(${rotation}deg)`;

  window.setTimeout(() => {
    result.textContent = meals[activeMeal][selected].name;
    answer.classList.add("answer-visible");
    button.disabled = false;
    tabs.forEach((tab) => { tab.disabled = false; });
    buttonText.textContent = "开转";
    buttonSubtext.textContent = "SPIN";
    spinning = false;
  }, 3200);
});
