"use strict";

const memberPath = "../member.json";

(async () => {
  return await (await fetch(memberPath)).json();
})().then((members) => {
  setupCheckbox(members);
  document
    .getElementById("js-submit")
    .addEventListener("click", () => handleMatchButton(members));
});

const setupCheckbox = (members) => {
  const checkboxTemplate = document.getElementById("js-tmplCheckbox");
  const checkboxContainer = document.getElementById("js-checkboxContainer");
  const memberNames = members.map((member) => member.name);
  memberNames.forEach((name) => {
    const checkbox = checkboxTemplate.cloneNode(true);
    checkbox.querySelector(".js-text").textContent = name;
    checkbox.id = "";
    checkbox.classList.remove("u-hidden");
    checkboxContainer.appendChild(checkbox);
  });

  checkboxTemplate.remove();
};

const handleMatchButton = (members) => {
  const shuffledMembers = shuffleArray(members);

  const checkboxContainer = document.getElementById("js-checkboxContainer");
  const checkboxWrappers = Array.from(
    checkboxContainer.querySelectorAll(".js-wrapper")
  );

  const selectedNames = checkboxWrappers
    .filter((wrapper) => wrapper.querySelector("input").checked)
    .map((wrapper) => wrapper.querySelector(".js-text").textContent);

  const match = findMatches(shuffledMembers, selectedNames);
  if (match) {
    const result = document.getElementById("js-result");
    result.innerHTML = "";
    match.forEach((names, i) => {
      const team = document.createElement("span");
      const teamName = names.join(", ");
      team.textContent = `チーム${i + 1} : ${teamName}`;
      result.append(team);
    });

    const message = document.getElementById("js-message");
    message.classList.remove("u-hidden");
    const messageText = "今週のクイズチームはこちらです！チーム1: ...";
    message.querySelector(".js-text").textContent = messageText;
    const button = message.querySelector("button");
    button.addEventListener("click", () => {
      navigator.clipboard.writeText(messageText);
      button.textContent = "コピー完了！";
      setTimeout(() => (button.innerHTML = "クリックしてコピー"), 1000);
    });
  } else {
    alert("マッチングできませんでした");
  }
};

const findMatches = (members, selectedNames) => {
  const memberIdByName = getMemberIdByName(members);
  const alreadyMatched = getAlreadyMatched(members, memberIdByName);
  const leftMemberIds = new Set(
    selectedNames.map((name) => memberIdByName.get(name))
  );
  console.log(leftMemberIds);

  const match = [];

  const findMatch = (curMemberId) => {
    leftMemberIds.delete(curMemberId);
    const curLeftMemberIds = shuffleArray(Array.from(leftMemberIds));
    for (let i = 0; i < curLeftMemberIds.length; i++) {
      const leftMemberId = curLeftMemberIds[i];
      if (alreadyMatched[curMemberId].has(leftMemberId)) {
        continue;
      }
      leftMemberIds.delete(leftMemberId);

      if (leftMemberIds.size === 0) {
        return true;
      } else if (leftMemberIds.size === 1) {
        const lastMemberId = Array.from(leftMemberIds)[0];
        if (
          !alreadyMatched[lastMemberId].has(curMemberId) &&
          !alreadyMatched[lastMemberId].has(leftMemberId)
        ) {
          match.push([curMemberId, leftMemberId, lastMemberId]);
          return true;
        } else {
          leftMemberIds.add(leftMemberId);
          return false;
        }
      }

      match.push([curMemberId, leftMemberId]);
      const nextMemberId = popFromSet(leftMemberIds);
      if (findMatch(nextMemberId)) {
        return true;
      }
      leftMemberIds.add(nextMemberId);
      match.pop();
      leftMemberIds.add(leftMemberId);
    }
    return false;
  };

  if (findMatch(popFromSet(leftMemberIds))) {
    return match.map((ids) => ids.map((id) => members[id].name));
  } else {
    return null;
  }
};

const getAlreadyMatched = (members, memberIdByName) => {
  const alreadyMatched = [];
  members.forEach((member) => {
    const yoko1 = member.yoko1.map((name) => memberIdByName.get(name));
    const yoko2 = member.yoko2.map((name) => memberIdByName.get(name));
    const tate1 = member.tate1.map((name) => memberIdByName.get(name));
    alreadyMatched.push(new Set([...yoko1, ...yoko2, ...tate1]));
  });
  return alreadyMatched;
};

const getMemberIdByName = (members) => {
  const memberIdByName = new Map();
  members.forEach((member, i) => {
    memberIdByName.set(member.name, i);
  });
  return memberIdByName;
};
