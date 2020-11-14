const range = document.getElementById('range');
const range__money = document.getElementById('range__money');
const money = document.getElementById('money');
const moneys1 = document.getElementById('money1');
const moneys2 = document.getElementById('money2');
const moneys3 = document.getElementById('money3');
const textMoney = document.getElementById('text_money');
const part2 = document.getElementById('part2');
const part3 = document.getElementById('part3');
const infogr_text1 = document.getElementById('infograph_text1');
const infogr_text2 = document.getElementById('infograph_text2');
const circle_money = document.getElementById('circle_money');


const maxValue = 50000;
const threeYear = 12 * 3;
let cur_value = 0;
const middleCount = Math.floor(Math.random()*50000);

textMoney.innerText = `~ ${(middleCount).toLocaleString('ru-RU')} ₽`

const moneyBlocks = [
  `<use href="./src/money2.svg#money2" x="35%" y="50%"></use>`,
  `<use href="./src/money3.svg#Money3" x="20%" y="30%"></use><use href="./src/group_money.svg#Money" x="50%" y="50%"></use>`,
  `<use href="./src/money3_group.svg#Money3" x="20%" y="15%"></use><use href="./src/group_money.svg#Money" x="50%" y="50%"></use>`,
  `<use href="./src/money4.svg#Money" x="24%" y="15%"></use>`,
  `<use href="./src/group_money_f1.svg#Money" x="16%" y="8%"></use><use href="./src/group_money_f2.svg#Money" x="42%" y="47%"></use>`
];

const priceSteps = [
  maxValue * threeYear / 4,
  Math.floor(((maxValue * 12 * 1.0698 + maxValue * 12) * 1.0698 + maxValue * 12) * 1.0698 / 6),
  Math.floor(maxValue * threeYear * 1.7121 / 10)
]

const animateValue = async (obj, start, end, duration) => {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerText = Math.floor(progress * (end - start) + start).toLocaleString('ru-RU');
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

function toTop() {
  let prev = 1;
  let timer = setInterval(() => {
    if (document.body.scrollTop == 0 && document.documentElement.scrollTop == 0) {
      clearInterval(timer);
      return;
    }
    document.body.scrollTop -= 1 * prev;
    document.documentElement.scrollTop -= 1 * prev;
    prev *= 2;
  }, 50);

}

range.addEventListener('input', (e) => {
  range__money.classList.remove('hidden');
  let value = parseInt(range.value);
  let percent = value / (maxValue / 100);
  let move = `calc(${percent}% + (${13 - percent * 0.25}px))`;
  range__money.innerText = `${value} ₽`;
  range__money.style.left = move;
  range.style.background = 'linear-gradient(to right, #FF9796 0%, #FE4D4A ' + move + ', #e2e2e2 ' + move + ', #e2e2e2 100%)';
});
range.addEventListener('change', async (e) => {
  range__money.classList.add('hidden');
  let value = parseInt(range.value);

  
  part2.style.display = "block";
  part2.scrollIntoView();
  part2.classList.remove('hidden');
  
  part3.classList.remove('hidden');
  part3.style.display = "flex";

  let price1 = (value * threeYear);
  let price2 = Math.floor(((value * 12 * 1.0698 + value * 12) * 1.0698 + value * 12) * 1.0698);
  let price3 = Math.floor(value * threeYear * 1.7121);

  document.getElementById('money1_price').innerText = '~' + price1.toLocaleString('ru-RU') + ' ₽';
  document.getElementById('money2_price').innerText = '~' + price2.toLocaleString('ru-RU') + ' ₽';
  document.getElementById('money3_price').innerText = 'до ~' + price3.toLocaleString('ru-RU');
  let count1 = price1 / priceSteps[0];
  let count2 = price2 / priceSteps[1];
  let count3 = price3 / priceSteps[2];
  moneys1.innerHTML = "";
  for (i = 0; i < count1; i++) {
    moneys1.innerHTML += `<object type="image/svg+xml" data="src/money1.svg" class="money__img" style="left: ${(i - count1/2) * 12 - 20}px"></object>`;
  }
  moneys2.innerHTML = "";
  for (i = 0; i < count2; i++) {
    moneys2.innerHTML += `<object type="image/svg+xml" data="src/money1.svg" class="money__img" style="left: ${(i - count2/2) * 12 - 20}px"></object>`;
  }
  moneys3.innerHTML = "";
  for (i = 0; i < count3; i++) {
    moneys3.innerHTML += `<object type="image/svg+xml" data="src/money1.svg" class="money__img" style="left: ${(i - count3/2) * 15 - 20}px"></object>`;
  }
  await animateValue(money, cur_value, value, 2000);
  cur_value = value;

  circle_money.innerHTML = middleCount <= 10000 ? moneyBlocks[0] : middleCount <= 20000 ? moneyBlocks[1] : middleCount <= 30000 ? moneyBlocks[2] : middleCount <= 40000 ? moneyBlocks[3] : moneyBlocks[4];
});

const updateCircle = (circle, value)=>{
  let r = circle.getAttribute('r');
  let c = Math.PI * (r * 2);

  if (value < 0) {
    value = 0;
  }
  if (value > 100) {
    val1 = 100;
  }
  let pct = ((100 - value) / 100) * c;
  circle.style.strokeDashoffset = pct;
}

const dropdown = (e) => {
  e.classList.toggle('checked');
  document.querySelector('#part3 section').classList.toggle('hidden');
  document.getElementById('btn__txt').innerText = e.classList.contains('checked') ? 'Свернуть' : 'А как в среднем у читателей vc.ru?';

  let val1 = 50;
  let val2 = 7;
  infogr_text1.innerText = val1 + '%';
  infogr_text2.innerText = val2 + '%';
  let circle1 = document.querySelector('#infograph1 > .bar');
  let circle2 = document.querySelector('#infograph2 > .bar');
  updateCircle(circle1, val1);
  updateCircle(circle2, val2);
  
}

const tooltip = (e) => {
  e.children[0].classList.toggle('active');
}