"use strict";
const quizListingPath = "./../quiz_listing.json";
const quizImgPath = "./../quiz_img";
const quizPagePath = "./../quiz";

(async () => {
  return await (await fetch(quizListingPath)).json();
})().then((json) => {
  const people = json.children;
  const shuffledPeople = shuffleArray(people);
  setupProfiles(shuffledPeople, quizImgPath, quizPagePath);
});
