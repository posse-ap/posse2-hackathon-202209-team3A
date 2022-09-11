// general
const shuffleArray = (array) => {
  return array
    .map((elem) => {
      return { weight: Math.random(), value: elem };
    })
    .sort((a, b) => a.weight - b.weight)
    .map((elem) => elem.value);
};

const popFromSet = (set) => {
  if (set.size === 0) {
    return null;
  }
  for (const item of set) {
    set.delete(item);
    return item;
  }
};

const getCurrentDate = () => {
  const d = new Date();
  const formatted = `
  ${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}
`.replace(/\n|\r/g, "");
  return formatted;
};

// ranking
const setNewScore = (name, quiz, level, triedAt) => {
  const key = keyPrefix + name;
  const data = JSON.parse(localStorage.getItem(key));
  if (!data) {
    localStorage.setItem(
      key,
      JSON.stringify({ name, scores: [{ quiz, level, triedAt }] })
    );
    return;
  }
  const curScore = data.scores.find((score) => score.quiz === quiz);
  if (!curScore) {
    data.scores.push({ quiz, level, triedAt });
  } else if (curScore.level < level) {
    curScore.level = level;
    curScore.triedAt = triedAt;
  }

  localStorage.setItem(key, JSON.stringify(data));
};

// profile
const setupProfiles = (people, quizImgPath) => {
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
