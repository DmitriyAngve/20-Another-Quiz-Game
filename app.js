const output = document.querySelector(".output");
const btn1 = document.querySelector(".btn");
const h1ele = document.querySelector("h1");
const game = { cur: 0, score: 0 };

const tempData = [];

btn1.addEventListener("click", startGame);
window.addEventListener("DOMContentLoaded", init);
btn1.disabled = true;

function init() {
  console.log("ready");
  // Load the JSOn or create the JSON data
  genQuizData();
  //   document.write(JSON.stringify(tempData));
}

// Generating Dummy Array
function genQuizData() {
  for (let ques = 0; ques < 5; ques++) {
    const holder = [];
    const ran = Math.floor(Math.random() * 3) + 2;
    for (let ops = 0; ops < ran; ops++) {
      let temp = {
        res: `Try option Wrong ${ops + 1}`,
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
  disQuestion(); // next question
}

function disQuestion() {
  //  game.cur
  let question = tempData[game.cur];
  console.log(question);
}
