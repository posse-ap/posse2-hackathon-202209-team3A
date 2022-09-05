"use strict";
// const DOMAIN = "https://posse-ap.github.io/posse2-hackathon-202209-team3A/";
// const CHALLENGE_PAGE_PATH = "/challenge";

// const score = 90;
// const quizName = "ゆりえ";

// const button = document.getElementById("js-challengeUrl");
// button.addEventListener("click", () => {
//   const userName = document.getElementById("js-userName").value;
//   const challengeUrl = createChallengeUrl(score, quizName, userName);
//   navigator.clipboard.writeText(challengeUrl);
//   button.textContent = "コピー完了！";
//   setTimeout(() => (button.innerHTML = "リンクをコピー"), 1000);
// });

// const createChallengeUrl = (score, quizName, userName) => {
//   // todo(takumi) encoding
//   // btoa(encodeURIComponent(text));
//   return `${DOMAIN}/${CHALLENGE_PAGE_PATH}?score=${score}&quiz_name=${quizName}&inviter_name=${userName}`;
// };

{
  const quizListingPath = "../quiz_listing.json";

  const url = new URL(window.location.href);

  const personName = url.searchParams.get("person_name");
  const quizName = url.searchParams.get("quiz_name");
  console.log(personName, quizName);

  (async () => {
    return await (await fetch(quizListingPath)).json();
  })().then((json) => {
    const people = json.children;
    const peopleName = people.map((person) => {
      return person.name;
    });
    const quizzes = people[0].children;
    const quizzesName = quizzes.map((quiz) => {
      return quiz.name;
    });

    const person = people.find((person) => person.name == personName);
    const quiz = person?.children.find((quiz) => quiz.name == quizName);
    console.log(quiz);
    if (!quiz) {
      window.location.assign("./../index.html");
      throw new Error("enough parameter not specified");
    }

    fetch("../" + quiz.file)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setupQuiz(json, 0);
      });
  });

  let score = 0;

  const setupQuiz = (quizzes, index) => {
    const number = document.getElementById("js-number");
    number.textContent = `Q.${index + 1}`;

    const question = document.getElementById("js-question");
    question.textContent = quizzes[index].question;

    const choices = document.getElementById("js-choices");
    const choiceTemplate = document.getElementById("js-templ-choice");
    choices.innerHTML = "";
    quizzes[index].choices.forEach((choiceData, i) => {
      const choice = choiceTemplate.cloneNode(true);
      choice.removeAttribute("id");
      choice.classList.remove("u-hidden");
      const id = String.fromCharCode("A".charCodeAt() + i);
      choice.querySelector(".js-id").textContent = id;
      choice.querySelector(".js-text").textContent = choiceData;
      choices.append(choice);

      choice.addEventListener("click", () => {
        if (quizzes[index].answer === choiceData) {
          score++;
        }
        if (index + 1 < quizzes.length) {
          setupQuiz(quizzes, index + 1);
        } else {
          finishQuiz();
        }
      });
    });
  };

  const finishQuiz = () => {
    const quizResultPath = "./result";
    window.location.assign(
      `${quizResultPath}?person_name=${personName}&quiz_name=${quizName}&score=${score}`
    );
  };
}
