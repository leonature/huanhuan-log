const meals = {
  breakfast: [
    { name: "灌汤小笼包", icon: "♨", description: "一笼热气 · 汤鲜皮薄" },
    { name: "豆腐脑", icon: "◒", description: "细嫩顺滑 · 暖胃刚好" },
  ],
  main: [
    { name: "水煮肉片", icon: "♨", description: "麻辣鲜香 · 超级下饭" },
    { name: "火锅", icon: "♨", description: "热辣沸腾 · 幸福围炉" },
    { name: "烤肉", icon: "✦", description: "焦香滋滋 · 大口满足" },
  ],
};

const colors = ["#e9a0ba", "#c6b4e2", "#f3b7a9"];
const wheel = document.querySelector("#wheel");
const wheelOptions = document.querySelector("#wheel-options");
const button = document.querySelector("#spin-button");
const buttonText = document.querySelector("#button-text");
const buttonSubtext = document.querySelector("#button-subtext");
const answer = document.querySelector("#answer");
const result = document.querySelector("#result");
const tabs = document.querySelectorAll(".meal-tab");

let activeMeal = "breakfast";
let rotation = 0;
let spinning = false;

function renderWheel(items) {
  const segment = 360 / items.length;
  const colorStops = items.map((_, index) => {
    const start = index * segment;
    const end = (index + 1) * segment;
    return `${colors[index]} ${start}deg ${end}deg`;
  }).join(", ");

  wheel.style.background = `conic-gradient(from ${-segment / 2}deg, ${colorStops})`;
  wheel.classList.toggle("three-options", items.length === 3);
  wheelOptions.innerHTML = items.map((item, index) => `
    <div class="wheel-label" style="--option-angle: ${index * segment}deg; --counter-angle: ${-index * segment}deg">
      <span class="dish-icon">${item.icon}</span>
      <strong>${item.name}</strong>
      <small>${item.description}</small>
    </div>
  `).join("");
}

function showMeal(meal) {
  activeMeal = meal;
  renderWheel(meals[meal]);
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

  const items = meals[activeMeal];
  const selected = Math.floor(Math.random() * items.length);
  const segment = 360 / items.length;
  const targetOffset = (360 - selected * segment) % 360;
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
    result.textContent = items[selected].name;
    answer.classList.add("answer-visible");
    button.disabled = false;
    tabs.forEach((tab) => { tab.disabled = false; });
    buttonText.textContent = "开转";
    buttonSubtext.textContent = "SPIN";
    spinning = false;
  }, 3200);
});

renderWheel(meals.breakfast);
