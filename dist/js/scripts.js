/*!
* Start Bootstrap - Stylish Portfolio v6.0.6 (https://startbootstrap.com/theme/stylish-portfolio)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-stylish-portfolio/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', event => {

    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    let scrollToTopVisible = false;
    // Closes the sidebar menu
    const menuToggle = document.body.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', event => {
        event.preventDefault();
        sidebarWrapper.classList.toggle('active');
        _toggleMenuIcon();
        menuToggle.classList.toggle('active');
    })

    // Closes responsive menu when a scroll trigger link is clicked
    var scrollTriggerList = [].slice.call(document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger'));
    scrollTriggerList.map(scrollTrigger => {
        scrollTrigger.addEventListener('click', () => {
            sidebarWrapper.classList.remove('active');
            menuToggle.classList.remove('active');
            _toggleMenuIcon();
        })
    });

    function _toggleMenuIcon() {
        const menuToggleBars = document.body.querySelector('.menu-toggle > .fa-bars');
        const menuToggleTimes = document.body.querySelector('.menu-toggle > .fa-xmark');
        if (menuToggleBars) {
            menuToggleBars.classList.remove('fa-bars');
            menuToggleBars.classList.add('fa-xmark');
        }
        if (menuToggleTimes) {
            menuToggleTimes.classList.remove('fa-xmark');
            menuToggleTimes.classList.add('fa-bars');
        }
    }

    // Scroll to top button appear
    document.addEventListener('scroll', () => {
        const scrollToTop = document.body.querySelector('.scroll-to-top');
        if (document.documentElement.scrollTop > 100) {
            if (!scrollToTopVisible) {
                fadeIn(scrollToTop);
                scrollToTopVisible = true;
            }
        } else {
            if (scrollToTopVisible) {
                fadeOut(scrollToTop);
                scrollToTopVisible = false;
            }
        }
    })
})

function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};

// 監聽所有按鈕的點擊事件，並將選擇的答案記錄到 Local Storage
// 監聽所有按鈕點擊
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', (event) => {
    event.preventDefault(); // 防止跳轉

    // 獲取題號和答案
    const question = event.target.dataset.question;
    const answer = event.target.dataset.answer;

    // 儲存到 Local Storage
    const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || {};
    userAnswers[`question${question}`] = answer;
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));

    // 提示使用者選擇已記錄（可選）
    console.log(`已記錄：第 ${question} 題選擇 ${answer}`);
  });
});


//計算結果
// 定義計分邏輯
const scoring = {
  question1: { A: ["rabbit","eagle","wolf"], B: ["owl","eagle","wolf"], C: ["rabbit","eagle","cat"], D: ["lion"] },
  question2: { A: ["cat"], B: ["dolphin","lion"], C: ["bear"], D: ["dolphin","fox"] },
  question3: { A: ["owl"], B: ["eagle","wolf"], C:["dolphin","fox"], D: ["lion"] },  
  question4: { A: ["lion","wolf"], B: ["eagle"], C: ["wolf"], D: ["fox","owl"] },
    question5: { A: ["fox"], B: ["bear","rabbit","dog"], C: ["bear"], D: ["dog"] },
    question6: { A: ["dog"], B: ["eagle"], C: ["dolphin","cat"], D: ["fox"] },
    question7: { A: ["lion"], B: ["owl","fox"], C: ["dog"], D: ["dolphin"] },
    question8: { A: ["cat"], B: ["owl"], C: ["rabbit"], D: ["rabbit","bear"] },
    question9: { A: ["dog"], B: ["dolphin","wolf"], C: ["dolphin","fox"], D: ["wolf"] },
    question10: { A: ["lion"], B: ["bear"], C: ["rabbit"], D: ["owl"] },
};

document.getElementById('submitQuiz').addEventListener('click', () => {
  const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || {};
  const scores = { lion: 0, eagle: 0, cat: 0, dog: 0 };

  Object.entries(userAnswers).forEach(([question, answer]) => {
    const animal = scoring[question][answer];
    if (animal) scores[animal]++;
  });

  // 找出最高分的動物型人格
  const result = Object.entries(scores).reduce((max, current) => 
    current[1] > max[1] ? current : max
  )[0];

  // 顯示結果
  document.getElementById('result').textContent = `你的動物型人格是：${result}`;
});
