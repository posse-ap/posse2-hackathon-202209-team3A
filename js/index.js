"use strict";
const quizListingPath = "./quiz_listing.json";
const quizImgPath = "./quiz_img";

(async () => {
  return await (await fetch(quizListingPath)).json();
})().then((json) => {
  const people = json.children;
  const shufflePeople = shuffleArray(people);

  setupProfiles(shufflePeople, 0);

  const button = document.getElementById("js-button");
});

const setupProfiles = (people) => {
  console.log(people);
  const profiles = document.getElementById("js-profiles");
  const profileTemplate = document.getElementById("js-templ-profile");

  people.forEach((person) => {
    const name = person.name;
    const profile = profileTemplate.cloneNode(true);
    profile.removeAttribute("id");
    // tood(takumi) add default image
    profile.querySelector("img").src = `${quizImgPath}/${name}.jpg`;
    profile.querySelector("dt").textContent = `3.0期生 ${name}`;
    profiles.appendChild(profile);

    const choiceWrapper = profile.querySelector(".js-choiceWrapper");
    person.children.forEach((quiz) => {
      const a = document.createElement("a");
      a.href = `./quiz/index.html?person_name=${name}&quiz_name=${quiz.name}`;
      a.textContent = quiz.name;
      choiceWrapper.appendChild(a);
    });
  });
};
