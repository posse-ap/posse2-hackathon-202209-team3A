"use strict";

const DOMAIN = "https://posse-ap.github.io/posse2-hackathon-202209-team3A";
const CHALLENGE_PAGE_PATH = "quiz/challenge";

const url = new URL(window.location.href);

const level = url.searchParams.get("level");
const personName = url.searchParams.get("person_name");
const quizName = url.searchParams.get("quiz_name");

if (!level || !personName || !quizName) {
  window.location.assign("./../../index.html");
  throw new Error("enough parameter not specified");
}

const result = document.getElementById("js-result");
result.textContent = `あなたの${personName}レベルは${level}です！`;

const button = document.getElementById("js-challengeUrl");
button.addEventListener("click", () => {
  const userName = document.getElementById("js-userName").value;
  const challengeUrl = createChallengeUrl(level, personName, quizName, userName);
  navigator.clipboard.writeText(challengeUrl);
  button.textContent = "コピー完了！";
  setTimeout(() => (button.innerHTML = "リンクをコピー"), 1000);
});

const createChallengeUrl = (level, personName, quizName, userName) => {
  // todo(takumi) encoding
  // btoa(encodeURIComponent(text));
  return `${DOMAIN}/${CHALLENGE_PAGE_PATH}/index.html?person_name=${personName}&quiz_name=${quizName}&inviter_name=${userName}&level=${level}`;
};
