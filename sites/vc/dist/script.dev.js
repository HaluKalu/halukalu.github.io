"use strict";

var range = document.getElementById('range');
var range__money = document.getElementById('range__money');
var money = document.getElementById('money');
var moneys1 = document.getElementById('money1');
var moneys2 = document.getElementById('money2');
var moneys3 = document.getElementById('money3');
var textMoney = document.getElementById('text_money');
var part2 = document.getElementById('part2');
var part3 = document.getElementById('part3');
var infogr_text1 = document.getElementById('infograph_text1');
var infogr_text2 = document.getElementById('infograph_text2');
var circle_money = document.getElementById('circle_money');
var maxValue = 50000;
var threeYear = 12 * 3;
var cur_value = 0;
var middleCount = Math.floor(Math.random() * 50000);
textMoney.innerText = "~ ".concat(middleCount.toLocaleString('ru-RU'), " \u20BD");
var moneyBlocks = ["<use href=\"./src/money2.svg#money2\" x=\"35%\" y=\"50%\"></use>", "<use href=\"./src/money3.svg#Money3\" x=\"20%\" y=\"30%\"></use><use href=\"./src/group_money.svg#Money\" x=\"50%\" y=\"50%\"></use>", "<use href=\"./src/money3_group.svg#Money3\" x=\"20%\" y=\"15%\"></use><use href=\"./src/group_money.svg#Money\" x=\"50%\" y=\"50%\"></use>", "<use href=\"./src/money4.svg#Money\" x=\"24%\" y=\"15%\"></use>", "<use href=\"./src/group_money_f1.svg#Money\" x=\"16%\" y=\"8%\"></use><use href=\"./src/group_money_f2.svg#Money\" x=\"42%\" y=\"47%\"></use>"];
var priceSteps = [maxValue * threeYear / 4, Math.floor(((maxValue * 12 * 1.0698 + maxValue * 12) * 1.0698 + maxValue * 12) * 1.0698 / 6), Math.floor(maxValue * threeYear * 1.7121 / 10)];

var animateValue = function animateValue(obj, start, end, duration) {
  var startTimestamp, step;
  return regeneratorRuntime.async(function animateValue$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          startTimestamp = null;

          step = function step(timestamp) {
            if (!startTimestamp) startTimestamp = timestamp;
            var progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerText = Math.floor(progress * (end - start) + start).toLocaleString('ru-RU');

            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };

          window.requestAnimationFrame(step);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

function toTop() {
  var prev = 1;
  var timer = setInterval(function () {
    if (document.body.scrollTop == 0 && document.documentElement.scrollTop == 0) {
      clearInterval(timer);
      return;
    }

    document.body.scrollTop -= 1 * prev;
    document.documentElement.scrollTop -= 1 * prev;
    prev *= 2;
  }, 50);
}

range.addEventListener('input', function (e) {
  range__money.classList.remove('hidden');
  var value = parseInt(range.value);
  var percent = value / (maxValue / 100);
  var move = "calc(".concat(percent, "% + (").concat(13 - percent * 0.25, "px))");
  range__money.innerText = "".concat(value, " \u20BD");
  range__money.style.left = move;
  range.style.background = 'linear-gradient(to right, #FF9796 0%, #FE4D4A ' + move + ', #e2e2e2 ' + move + ', #e2e2e2 100%)';
});
range.addEventListener('change', function _callee(e) {
  var value, price1, price2, price3, count1, count2, count3;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          range__money.classList.add('hidden');
          value = parseInt(range.value);
          part2.style.display = "block";
          part2.scrollIntoView();
          part2.classList.remove('hidden');
          part3.classList.remove('hidden');
          part3.style.display = "flex";
          price1 = value * threeYear;
          price2 = Math.floor(((value * 12 * 1.0698 + value * 12) * 1.0698 + value * 12) * 1.0698);
          price3 = Math.floor(value * threeYear * 1.7121);
          document.getElementById('money1_price').innerText = '~' + price1.toLocaleString('ru-RU') + ' ₽';
          document.getElementById('money2_price').innerText = '~' + price2.toLocaleString('ru-RU') + ' ₽';
          document.getElementById('money3_price').innerText = 'до ~' + price3.toLocaleString('ru-RU');
          count1 = price1 / priceSteps[0];
          count2 = price2 / priceSteps[1];
          count3 = price3 / priceSteps[2];
          moneys1.innerHTML = "";

          for (i = 0; i < count1; i++) {
            moneys1.innerHTML += "<object type=\"image/svg+xml\" data=\"src/money1.svg\" class=\"money__img\" style=\"left: ".concat((i - count1 / 2) * 12 - 20, "px\"></object>");
          }

          moneys2.innerHTML = "";

          for (i = 0; i < count2; i++) {
            moneys2.innerHTML += "<object type=\"image/svg+xml\" data=\"src/money1.svg\" class=\"money__img\" style=\"left: ".concat((i - count2 / 2) * 12 - 20, "px\"></object>");
          }

          moneys3.innerHTML = "";

          for (i = 0; i < count3; i++) {
            moneys3.innerHTML += "<object type=\"image/svg+xml\" data=\"src/money1.svg\" class=\"money__img\" style=\"left: ".concat((i - count3 / 2) * 15 - 20, "px\"></object>");
          }

          _context2.next = 24;
          return regeneratorRuntime.awrap(animateValue(money, cur_value, value, 2000));

        case 24:
          cur_value = value;
          circle_money.innerHTML = middleCount <= 10000 ? moneyBlocks[0] : middleCount <= 20000 ? moneyBlocks[1] : middleCount <= 30000 ? moneyBlocks[2] : middleCount <= 40000 ? moneyBlocks[3] : moneyBlocks[4];

        case 26:
        case "end":
          return _context2.stop();
      }
    }
  });
});

var updateCircle = function updateCircle(circle, value) {
  var r = circle.getAttribute('r');
  var c = Math.PI * (r * 2);

  if (value < 0) {
    value = 0;
  }

  if (value > 100) {
    val1 = 100;
  }

  var pct = (100 - value) / 100 * c;
  circle.style.strokeDashoffset = pct;
};

var dropdown = function dropdown(e) {
  e.classList.toggle('checked');
  document.querySelector('#part3 section').classList.toggle('hidden');
  document.getElementById('btn__txt').innerText = e.classList.contains('checked') ? 'Свернуть' : 'А как в среднем у читателей vc.ru?';
  var val1 = 50;
  var val2 = 7;
  infogr_text1.innerText = val1 + '%';
  infogr_text2.innerText = val2 + '%';
  var circle1 = document.querySelector('#infograph1 > .bar');
  var circle2 = document.querySelector('#infograph2 > .bar');
  updateCircle(circle1, val1);
  updateCircle(circle2, val2);
};

var tooltip = function tooltip(e) {
  e.children[0].classList.toggle('active');
};