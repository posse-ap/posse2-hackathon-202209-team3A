"use strict";
const DOMAIN = "https://posse-ap.github.io/posse2-hackathon-202209-team3A/";
const CHALLENGE_PAGE_PATH = "/challenge";

const score = 90;
const quizName = "ゆりえ";

const button = document.getElementById("js-challengeUrl");
button.addEventListener("click", () => {
  const userName = document.getElementById("js-userName").value;
  const challengeUrl = createChallengeUrl(score, quizName, userName);
  navigator.clipboard.writeText(challengeUrl);
  button.textContent = "コピー完了！";
  setTimeout(() => (button.innerHTML = "リンクをコピー"), 1000);
});

const createChallengeUrl = (score, quizName, userName) => {
  // todo(takumi) encoding
  // btoa(encodeURIComponent(text));
  return `${DOMAIN}/${CHALLENGE_PAGE_PATH}?score=${score}&quiz_name=${quizName}&inviter_name=${userName}`;
};
