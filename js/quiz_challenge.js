const url = new URL(window.location.href);

const level = url.searchParams.get("level");
const personName = url.searchParams.get("person_name");
const quizName = url.searchParams.get("quiz_name");
const inviterName = url.searchParams.get("inviter_name");

console.log(level, personName, quizName);
if (!level || !personName || !quizName) {
  window.location.assign("./../../index.html");
  throw new Error("enough parameter not specified");
}

const title = document.getElementById("js-text");
title.textContent = inviterName
  ? `${inviterName}から挑戦状が来ました！！`
  : "挑戦状が来ました！！";

const button = document.getElementById("js-button");
button.addEventListener("click", () => {
  window.location.assign(
    `../index.html?person_name=${personName}&quiz_name=${quizName}`
  );
})