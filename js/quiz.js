"use strict";

const quizListingPath = "../quiz_listing.json";

const url = new URL(window.location.href);

const personName = url.searchParams.get("person_name");
const quizName = url.searchParams.get("quiz_name");

(async () => {
  return await (await fetch(quizListingPath)).json();
})().then((json) => {
  const people = json.children;

  const person = people.find((person) => person.name == personName);
  const quiz = person?.children.find((quiz) => quiz.name == quizName);
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

  const quizWrapper = document.getElementById("js-quizWrapper");
  const oImg = document.getElementById("js-oImg");
  const xImg = document.getElementById("js-xImg");
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
  });
  Array.from(choices.querySelectorAll("button")).forEach((choice) => {
    choice.addEventListener("click", () => {
      if (
        quizzes[index].answer === choice.querySelector(".js-text").textContent
      ) {
        score++;
        quizWrapper.append(oImg);
        oImg.classList.remove("u-hidden");
      } else {
        quizWrapper.append(xImg);
        xImg.classList.remove("u-hidden");
      }
      Array.from(choices.querySelectorAll("button")).forEach((b) => {
        const text = b.querySelector(".js-text");
        // b.classList.add("stop-effect");
        b.disabled = true;
        console.log(text.textContent);
        if (quizzes[index].answer === text.textContent) {
          text.classList.add("correct-choice");
        } else {
          text.classList.add("wrong-choice");
        }
      });
    });
  });
  const next = document.getElementById("js-next");
  const isLast = index === quizzes.length - 1;
  next.textContent = isLast ? "結果を見る" : "次へ";
  next.addEventListener("click", () => {
    oImg.classList.add("u-hidden");
    xImg.classList.add("u-hidden");
    if (index + 1 < quizzes.length) {
      setupQuiz(quizzes, index + 1);
    } else {
      finishQuiz(quizzes, score);
    }
  });
};

const finishQuiz = (quizzes, score) => {
  const quizResultPath = "./result/index.html";
  const level = Math.floor((score / quizzes.length) * 100);
  setNewScore(personName, quizName, level, getCurrentDate());
  window.location.assign(
    `${quizResultPath}?person_name=${personName}&quiz_name=${quizName}&level=${level}`
  );
};
