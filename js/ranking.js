"use strict";

/*
JSON format
[
  {quiz: "", level: 0, triedAt: ""}
]
*/

const mockScores = () => {
  const data = [
    {
      name: "yurie",
      scores: [
        { quiz: "beginner", level: 70, triedAt: getCurrentDate() },
        { quiz: "ほぼゆりえ", level: 20, triedAt: getCurrentDate() },
      ],
    },
    {
      name: "seiya",
      scores: [{ quiz: "beginner", level: 70, triedAt: getCurrentDate() }],
    },
  ];
  data.forEach((person) => {
    const key = keyPrefix + person.name;
    localStorage.setItem(
      key,
      JSON.stringify({ name: person.name, scores: person.scores })
    );
  });
};

const createRanking = () => {
  const ranking = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.startsWith(keyPrefix)) {
      continue;
    }
    const name = key.replace(keyPrefix, "");
    const data = JSON.parse(localStorage.getItem(key));
    data.scores.forEach((score) => {
      ranking.push({ name, ...score });
    });
  }
  ranking.sort((a, b) => b.level - a.level);
  return ranking;
};

const createRankingCell = (rankingCellTemplate, text) => {
  const rankingCell = rankingCellTemplate.cloneNode(false);
  rankingCell.id = "";
  rankingCell.textContent = text;
  return rankingCell;
};

const ranking = createRanking();
console.log(ranking);
const rankingBody = document.getElementById("js-rankingBody");
const rankingRowTemplate = document.getElementById("js-templ-rankingRow");
const rankingCellTemplate = document.getElementById("js-templ-rankingCell");
ranking.forEach((score, rank) => {
  const rankingRow = rankingRowTemplate.cloneNode(false);
  rankingRow.id = "";
  const rankingCellForRank = createRankingCell(rankingCellTemplate, rank);
  rankingCellForRank.classList.add("p-ranking__row__item--rank");
  rankingRow.appendChild(rankingCellForRank);
  rankingRow.appendChild(createRankingCell(rankingCellTemplate, score.name));
  rankingRow.appendChild(createRankingCell(rankingCellTemplate, score.quiz));
  const rankingCellForLevel = createRankingCell(
    rankingCellTemplate,
    score.level + "%"
  );
  rankingCellForLevel.classList.add("p-ranking__row__item--level");
  rankingRow.appendChild(rankingCellForLevel);
  // rankingRow.appendChild(createRankingCell(rankingCellTemplate, score.triedAt));
  rankingBody.appendChild(rankingRow);
});

rankingRowTemplate.classList.add("u-hidden");
rankingCellTemplate.classList.add("u-hidden");
