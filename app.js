const output = document.querySelector(".output");
const btn1 = document.querySelector(".btn");
const h1ele = document.querySelector("h1");
const tempData = [];
btn1.addEventListener("click", startGame);
window.addEventListener("DOMContentLoaded", init);
btn1.disabled = true;
const game = {
  cur: 0,
  score: 0,
  gameOver: false,
};
function init() {
  console.log("ready");
  //load the JSON or create the JSON data
  genQuizData();

  //document.write(JSON.stringify(tempData));
}

function genQuizData() {
  for (let ques = 0; ques < 10; ques++) {
    const holder = [];
    const ran = Math.floor(Math.random() * 3) + 2;
    for (let ops = 0; ops < ran; ops++) {
      let temp = {
        res: `Try Option Wrong ${ops + 1}`,
        cor: false,
        test: ops,
      };
      holder.push(temp);
    }
    let tempCorrect = {
      res: `Pick This One`,
      cor: true,
      test: 100,
    };
    holder.push(tempCorrect);
    const tempObj = {
      answers: holder,
      question: `Q#${ques + 1}. What is the correct answer ${ran + 1}`,
    };
    tempData.push(tempObj);
  }
  console.log(tempData);
  btn1.disabled = false;
  btn1.textContent = "Start Game Quiz";
  h1ele.textContent = "JSON dummy Data Quiz";
}

function startGame() {
  console.log("clicked");
  btn1.style.display = "none";
  disQuestion();
}

function disQuestion() {
  //game.cur
  if (!game.gameOver) {
    output.innerHTML = "";
    h1ele.textContent = `${game.cur + 1} of ${tempData.length} Questions`;
    let question = tempData[game.cur];
    console.log(question);
    const div = document.createElement("div");
    const ques = document.createElement("h3");
    const div1 = document.createElement("div");
    ques.textContent = question.question;
    ques.classList.add("quez");
    question.answers.sort(() => {
      return 0.5 - Math.random();
    });
    question.answers.forEach((el) => {
      const sel = document.createElement("button");
      sel.classList.add("opts");
      div1.append(sel);
      sel.textContent = el.res;
      sel.addEventListener("click", (e) => {
        disButtons(div1);
        let bg = "red";
        let mes = "Wrong Too Bad";
        if (el.cor) {
          console.log("Correct");
          bg = "green";
          game.score++;
          mes = "Great you got it Right!";
        }
        sel.style.backgroundColor = bg;
        output.innerHTML += `<div class="message" style="color:${bg}">${mes}</div>`;
      });
    });
    output.append(div);
    div.append(ques);
    div.append(div1);
  } else {
    output.innerHTML = `<h1>Game Over</h1><h2>Score: ${game.score} out of ${tempData.length}</h2>`;
  }
}

function disButtons(ele) {
  const eles = ele.querySelectorAll("button");
  console.log(eles);
  game.cur++;

  eles.forEach((btnz) => {
    btnz.disabled = true;
  });
  btn1.style.display = "block";
  if (game.cur >= tempData.length) {
    btn1.textContent = "Game Over See Score";
    game.gameOver = true;
  } else {
    btn1.textContent = "Next Question";
  }
}
