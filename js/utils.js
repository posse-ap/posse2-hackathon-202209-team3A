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
