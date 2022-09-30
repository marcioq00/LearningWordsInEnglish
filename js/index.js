// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
// https://stackoverflow.com/questions/22216349/how-to-iterate-through-td-in-a-tbody

const btn = document.querySelector("#btn");
const btnDraw = document.querySelector("#btn__draw");
const btnCheck = document.querySelector("#btn__check");
const btnCopy = document.querySelector("#btn__copy");
const btnRefresh = document.querySelector("#btn__refresh");
const tbody = document.querySelector("#tbody");
let tab = [];
let tabOrginal = [];
let test = [];

let counter = -1;

btn.addEventListener("click", () => {
  const polish = document.querySelector("#polish").value;
  const english = document.querySelector("#english").value;
  if (polish !== "" && english !== "") {
    counter++;
    add(counter, polish, english);
  } else {
    console.log("Data is empty");
  }
});
let row;
let add = (counter, polish, english) => {
  tab[counter] = {
    polishWord: polish,
    englishWord: english,
  };
  let deleteRow = (e) => {
    if (e.target.className === `${english}`) {
      let row = e.target.closest("tr");
      row.remove();
    }
  };
  addTab(counter, polish, english);
  for (let i = 0; i < 1; i++) {
    // creates a table row
    row = document.createElement("tr");
    row.setAttribute("id", `${english}`);
    for (let j = 0; j < 1; j++) {
      const cell = document.createElement("td");
      const cell2 = document.createElement("td");
      const cell3 = document.createElement("td");
      const cell4 = document.createElement("td");
      const btnDel = document.createElement("button");
      btnDel.textContent = "Delete";
      btnDel.setAttribute("class", `${english}`);
      btnDel.setAttribute("id", `btnDel`);
      const test = "test";
      const cellText = document.createTextNode(`${counter}`);
      const cellText2 = document.createTextNode(`${polish}`);
      const cellText3 = document.createTextNode(`${english}`);
      cell.appendChild(cellText);
      cell2.appendChild(cellText2);
      cell3.appendChild(cellText3);
      cell4.appendChild(btnDel);
      row.appendChild(cell);
      row.appendChild(cell2);
      row.appendChild(cell3);
      row.appendChild(btnDel);

      btnDel.addEventListener("click", deleteRow);
    }
    tbody.appendChild(row);
  }

  search(tab);
};

let addTab = (counter, polish, english) => {
  test.push(
    (tab[counter] = {
      polishWord: polish,
      englishWord: english,
    })
  );
  console.log("64: " + counter);
};

btnCopy.addEventListener("click", () => {
  console.table(test);
  console.log(test);
});
let search = (tab) => {
  for (let [key, value] of Object.entries(tab)) {
    console.log(key, value);
  }
  localStorage.setItem(`${counter + "data"}`, JSON.stringify(tab[counter]));
};
let drawWord;
let counterGood = 0;
let counterWrong = 0;

btnDraw.addEventListener("click", () => {
  for (let i = 0; i < 1; i++) {
    // tworzenie losowego indeksu pomiędzy 0 i n - 1
    let r = Math.floor(Math.random() * tab.length);
    if (tab.length < 1) {
      // tu było kieds <=
      console.log("dodaj cos lub odświerz dane");
      refreshTab();
    } else {
      console.log("R: " + r);
      console.log("Array length: " + tab.length);
      // wybieramy element z losowego miejsca
      drawWord = tab[r].englishWord;
      console.log(drawWord);
      document.getElementById("display-word").innerHTML =
        "Polski: " + tab[r].polishWord;
      // przeniesienia ostatniego elementu do miejsca z którego wzięliśmy
      tab[r] = tab[tab.length - 1];
      //zmniejszamy n
      tab.length--;
      counter--;
    }
  }
});

let refreshTab = () => {
  console.log(tab);
  tab = Object.assign([], test);
  counter = tab.length - 1;
};
btnRefresh.addEventListener("click", () => {
  console.table(tab);
  console.log(tab);
});

// let goodBad = () => {
//   // const third = document.querySelector(`#tbody tr:nth-child(${2})`);
//   //console.log(third); // 👉️ div.child3
//   const tbody2 = document.querySelectorAll("#tbody tr");
//   for (let el of tbody2) {
//     console.log(el);
//     if (el.hasAttribute("id")) {
//       el.style.backgroundColor = "red";
//     }
//     // console.log(row);
//   }
//   //tbody.style.backgroundColor = "red";
// };
btnCheck.addEventListener("click", () => {
  const checkWord = document.querySelector("#word").value;
  const third = document.getElementById(`${drawWord}`);
  if (checkWord === drawWord) {
    counterGood++;
    document.querySelector("#status-word").innerHTML =
      "Bardzo dobrze: " + counterGood;
    console.log(third);
    third.classList.add("green");
    if (third.classList.toggle("red")) {
      third.classList.remove("red");
      third.classList.add("green");
      console.log("git1");
    } else {
      console.log("git");
    }
    //console.log("dobrze");
  } else if (checkWord != drawWord) {
    counterWrong++;
    document.getElementById("status-word").innerHTML = "Źle: " + counterWrong;
    console.log(third);
    third.classList.add("red");
    if (third.classList.toggle("green")) {
      third.classList.remove("green");
      third.classList.add("red");
      console.log("git2");
    } else {
      console.log("git");
    }
    //console.log("źle");
  } else {
    console.log("cos innego");
  }
  //goodBad();
});
