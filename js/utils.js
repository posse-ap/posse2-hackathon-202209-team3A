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
