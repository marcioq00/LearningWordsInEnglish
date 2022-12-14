const btn = document.querySelector("#btn");
const btnDraw = document.querySelector("#btn__draw");
const btnCheck = document.querySelector("#btn__check");
const btnCopy = document.querySelector("#btn__copy");
const btnRefresh = document.querySelector("#btn__refresh");
const tbody = document.querySelector("#tbody");
let tab = [];
let tabCopy = [];

const pageAccessedByReload =
  (window.performance.navigation && window.performance.navigation.type === 1) ||
  window.performance
    .getEntriesByType("navigation")
    .map((nav) => nav.type)
    .includes("reload");

//console.log(pageAccessedByReload);

btn.addEventListener("click", () => {
  const polish = document.querySelector("#polish").value.trim().toLowerCase();
  const english = document.querySelector("#english").value.trim().toLowerCase();
  validation(polish, english);
});

let validation = (polish, english) => {
  const regex = /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{1,45}$/im;
  if (regex.test(polish) == true && regex.test(english) == true) {
    storeData(polish, english);
    successValidation();
  } else {
    //console.log("Data contains inappropriate characters");
    errorValidation();
  }
};

let storeData = (polish, english) => {
  const myObject = { polishWord: polish, englishWord: english };
  if (localStorage.getItem(`${english}`) === null) {
    localStorage.setItem(`${english}`, JSON.stringify(myObject));
    add(myObject);
    addTab(myObject);
  } else {
    //console.log("data exists");
    errorValidation();
  }
};
let hiddenRow = (e) => {
  const hidden = document.querySelector(`#${e.target.className} :nth-child(3)`);
  if (hidden.classList.contains("hidden-element")) {
    hidden.classList.remove("hidden-element");
  } else {
    hidden.classList.add("hidden-element");
  }
};
let deleteRow = (e) => {
  localStorage.removeItem(e.target.className);
  let row = e.target.closest("tr");
  let index = tab.findIndex((x) => x.englishWord === e.target.className);
  let index1 = tabCopy.findIndex((x) => x.englishWord === e.target.className);

  if (index === -1) {
    //console.log("Index doesn't exist");
    tabCopy.splice(index1, 1);
    row.remove();
  } else {
    //console.log("Delete index");
    tab.splice(index, 1);
    tabCopy.splice(index1, 1);
    row.remove();
  }
};

let add = (myObject) => {
  createElementTable();
  function createElementTable() {
    for (let i = 0; i < 1; i++) {
      // creates a table row
      let row = document.createElement("tr");
      row.setAttribute("id", `${myObject.englishWord}`);
      for (let j = 0; j < 1; j++) {
        const cell = document.createElement("td");
        const cell2 = document.createElement("td");
        const cell3 = document.createElement("td");
        const cell4 = document.createElement("td");
        const cell5 = document.createElement("td");
        const btnDel = document.createElement("button");
        const btnShow = document.createElement("button");
        const cellText2 = document.createTextNode(`${myObject.polishWord}`);
        const cellText3 = document.createTextNode(`${myObject.englishWord}`);
        btnDel.textContent = "Delete";
        btnShow.textContent = "Show";
        btnDel.setAttribute("class", `${myObject.englishWord}`);
        btnShow.setAttribute("class", `${myObject.englishWord}`);
        btnDel.setAttribute("id", `btnDel`);
        cell2.appendChild(cellText2);
        cell3.appendChild(cellText3);
        cell3.classList.add("hidden-element");
        cell4.appendChild(btnDel);
        cell5.appendChild(btnShow);
        row.appendChild(cell);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);

        btnDel.addEventListener("click", deleteRow);
        btnShow.addEventListener("click", hiddenRow);
      }
      tbody.appendChild(row);
    }
  }
};

let successValidation = () => {
  const boxAdd = document.querySelector("#box-add");
  if (boxAdd.classList.toggle("red-border")) {
    boxAdd.classList.remove("red-border");
    boxAdd.classList.add("green-border");
  } else {
    boxAdd.classList.add("green-border");
  }
};
let errorValidation = () => {
  const boxAdd = document.querySelector("#box-add");
  if (boxAdd.classList.toggle("green-border")) {
    boxAdd.classList.remove("green-border");
    boxAdd.classList.add("red-border");
  } else {
    boxAdd.classList.add("red-border");
  }
};
let addTab = (myObject) => {
  tab.push({
    polishWord: myObject.polishWord,
    englishWord: myObject.englishWord,
  });
};

btnCopy.addEventListener("click", () => {
  console.table(tabCopy);
  console.log(tabCopy);
});

let drawWord;

btnDraw.addEventListener("click", () => {
  for (let i = 0; i < 1; i++) {
    // tworzenie losowego indeksu pomiędzy 0 i n - 1
    let r = Math.floor(Math.random() * tab.length);
    if (tab.length < 1) {
      console.log("add something or refresh data");
      refreshTab();
    } else {
      // wybieramy element z losowego miejsca
      drawWord = tab[r].englishWord;
      console.log(drawWord);
      document.getElementById("display-word").innerHTML =
        "Polski: " + tab[r].polishWord;
      // przeniesienia ostatniego elementu do miejsca z którego wzięliśmy
      tab[r] = tab[tab.length - 1];
      //zmniejszamy n
      tab.length--;
    }
  }
});

let refreshTab = () => {
  for (let i = 0; i < localStorage.length; i++) {
    let y = JSON.parse(localStorage.getItem(localStorage.key(i)));
    tab.push({ polishWord: y.polishWord, englishWord: y.englishWord });
  }
};
btnRefresh.addEventListener("click", () => {
  console.table(tab);
  console.log(tab);
});

btnCheck.addEventListener("click", () => {
  const checkWord = document.querySelector("#user_word").value;
  const third = document.getElementById(`${drawWord}`);
  if (checkWord === drawWord) {
    third.classList.add("green");
    if (third.classList.toggle("red")) {
      third.classList.remove("red");
      third.classList.add("green");
      console.log("Change to green");
    } else {
      console.log("Nothing to change");
    }
  } else if (checkWord != drawWord) {
    third.classList.add("red");
    if (third.classList.toggle("green")) {
      third.classList.remove("green");
      third.classList.add("red");
      console.log("Change to red");
    } else {
      console.log("Nothing to change");
    }
  } else {
    console.log("something different");
  }
});

let keepDataAfterRefresh = () => {
  for (let i = 0; i < localStorage.length; i++) {
    let y = JSON.parse(localStorage.getItem(localStorage.key(i)));
    tab.push({ polishWord: y.polishWord, englishWord: y.englishWord });
  }

  for (let i = 0; i < localStorage.length; i++) {
    // creates a table row
    let row = document.createElement("tr");
    let y = JSON.parse(localStorage.getItem(localStorage.key(i)));
    row.setAttribute("id", `${y.englishWord}`);
    for (let j = 0; j < 1; j++) {
      const cell = document.createElement("td");
      const cell2 = document.createElement("td");
      const cell3 = document.createElement("td");
      const cell4 = document.createElement("td");
      const cell5 = document.createElement("td");
      const btnDel = document.createElement("button");
      const btnShow = document.createElement("button");
      const cellText2 = document.createTextNode(`${y.polishWord}`);
      const cellText3 = document.createTextNode(`${y.englishWord}`);
      btnDel.textContent = "Delete";
      btnShow.textContent = "Show";
      btnDel.setAttribute("class", `${y.englishWord}`);
      btnShow.setAttribute("class", `${y.englishWord}`);
      btnDel.setAttribute("id", `btnDel`);
      cell2.appendChild(cellText2);
      cell3.appendChild(cellText3);
      cell3.classList.add("hidden-element");
      cell4.appendChild(btnDel);
      cell5.appendChild(btnShow);
      row.appendChild(cell);
      row.appendChild(cell2);
      row.appendChild(cell3);
      row.appendChild(cell4);
      row.appendChild(cell5);

      btnDel.addEventListener("click", deleteRow);
      btnShow.addEventListener("click", hiddenRow);
    }
    tbody.appendChild(row);
  }
};
if (pageAccessedByReload === true) {
  keepDataAfterRefresh();
} else {
  console.log("The page did not refresh");
}
