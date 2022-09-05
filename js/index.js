"use strict";
const quizListingPath = "./quiz_listing.json";
const quizImgPath = "./quiz_img";

(async () => {
  return await (await fetch(quizListingPath)).json();
})().then((json) => {
  const people = json.children;
  const shufflePeople = shuffleArray(people);

  setupProfiles(shufflePeople, 0);
});

const setupProfiles = (people) => {
  const profiles = document.getElementById("js-profiles");
  const profileTemplate = document.getElementById("js-templ-profile");

  const names = people.map((person) => person.name);
  names.forEach((name) => {
    const profile = profileTemplate.cloneNode(true);
    profile.removeAttribute("id");
    // tood(takumi) add default image
    profile.querySelector("img").src = `${quizImgPath}/${name}.jpg`;
    profile.querySelector("dt").textContent = `3.0期生 ${name}`;
    profiles.appendChild(profile);
  });
};
