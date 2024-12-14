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
const animalDetails = {
  lion: {
    name: "獅子",
    description: "你擁有無與倫比的領導力和自信，喜歡掌控全局，總能成為團隊的核心人物。",
    image:"assets/img/lion.png"  
  },
  cat: {
    name: "貓",
    description: "你獨立、敏銳且充滿好奇心，擅長發現生活中的細節並享受自己的空間。",
    image:"assets/img/cat_hair_long.png"  
      
  },
  dolphin: {
    name: "海豚",
    description: "你充滿智慧和幽默感，善於社交，總能為周圍的人帶來歡樂和靈感。",
      image:"assets/img/dolphin.jpg"  
  },
  eagle: {
    name: "老鷹",
    description: "你目標明確，擁有高瞻遠矚的眼光，總能找到最有效的路徑實現自己的理想。",
      image:"assets/img/eagle.png"  
  },
  bear: {
    name: "熊",
    description: "你溫暖且可靠，為人穩重，有強大的安全感，面對挑戰時能展現無比的力量。",
      image:"assets/img/bear.png"  
  },
  rabbit: {
    name: "兔子",
    description: "你溫和且敏感，適應能力強，對周遭的變化總能快速反應，是他人眼中的和平使者。",
      image:"assets/img/rabbit.png"  
  },
  fox: {
    name: "狐狸",
    description: "你聰明機智，善於分析情況，總能快速找到解決問題的方法，是策略高手。",
      image:"assets/img/fox.png"  
  },
  dog: {
    name: "狗",
    description: "你忠誠且真誠，重視人際關係，能夠為周圍的人提供支持和溫暖。",
      image:"assets/img/youkai_jinmenken.png"  
  },
  owl: {
    name: "貓頭鷹",
    description: "你理性且深思熟慮，擅長洞察事物的本質，總能給出獨到的見解。",
      image:"assets/img/owl.png"  
  },
  wolf: {
    name: "狼",
    description: "你有團隊精神，且擁有無與倫比的適應力，喜歡與志同道合的人一起實現目標。",
      image:"assets/img/wolf.png"  
  }
};



 const scores = { lion: 0, cat: 0, dolphin: 0 ,eagle:0 ,bear:0 ,rabbit:0 ,fox:0 ,dog:0 ,owl:0 ,wolf:0 };

// 監聽所有按鈕的點擊事件，並將選擇的答案記錄到 Local Storage
// 監聽所有按鈕點擊
// 選項按鈕的點擊事件
document.querySelectorAll('.btn[data-question]').forEach(button => {
  button.addEventListener('click', event => {
    // 防止瀏覽器完全攔截事件，保留 href 跳轉功能
    // 獲取題號和答案
    const question = event.target.getAttribute('data-question');
    const answer = event.target.getAttribute('data-answer');

    // 儲存到 Local Storage
    const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || {};
    userAnswers[`question${question}`] = answer;
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));

    // 根據答案加分
    const animalsToScore = scoring[question][answer] || [];
    animalsToScore.forEach(animal => {
      scores[animal] = (scores[animal] || 0) + 1;
    });

    console.log(`當前分數：`, scores);
  });
});


//計算結果
document.getElementById('submitQuiz').addEventListener('click', () => {
  // 從 Local Storage 獲取回答
  const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || {};

  // 再次計算分數（避免多次點擊時重複加分）
  const finalScores = { ...scores };
  Object.entries(userAnswers).forEach(([question, answer]) => {
    const animalsToScore = scoring[question][answer];
    animalsToScore.forEach(animal => {
      finalScores[animal] = (finalScores[animal] || 0) + 1;
    });
  });

  // 找出最高分的動物型人格
  const result = Object.entries(finalScores).reduce((max, current) => 
    current[1] > max[1] ? current : max
  )[0];

  // 顯示結果
  const details = animalDetails[result];
  if (details) {
    document.getElementById('animalName').textContent = `你的動物型人格是：${details.name}`;
    document.getElementById('animalDescription').textContent = details.description;
      
    // 設定圖片路徑和替代文字
  const animalImage = document.getElementById('animalImage');
  animalImage.src = details.image; // 設定圖片路徑
    
    


    // 顯示結果容器
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.style.display = 'block';


    // 滾動到結果位置
    resultContainer.scrollIntoView({ behavior: 'smooth' });
  }
});
