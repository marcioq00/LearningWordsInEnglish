// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range

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
  const polish = document.querySelector("#polish").value.trim();
  const english = document.querySelector("#english").value.trim();
  validation(polish, english);
});

let validation = (polish, english) => {
  const regex = /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{1,45}$/im;
  if (regex.test(polish) == true && regex.test(english) == true) {
    console.log("polish and english are good");
    counter++;
    add(counter, polish, english);
    //addTab(counter, polish, english);
  } else {
    console.log("Data is empty or the data contains inappropriate characters");
  }
};
let row;
let add = (counter, polish, english) => {
  // test.push(
  //   (tab[counter] = {
  //     polishWord: polish,
  //     englishWord: english,
  //   })
  // );

  for (let value of Object.values(tab)) {
    console.log(value.polishWord);
    if (value.polishWord === polish && value.englishWord === english) {
      console.log("Duplicate data");
    } else {
      // tab[counter] = {
      //   polishWord: polish,
      //   englishWord: english,
      // };
    }
  }

  let deleteRow = (e) => {
    if (e.target.className === `${english}`) {
      let row = e.target.closest("tr");
      let index = tab.findIndex((x) => x.englishWord === e.target.className);
      let index1 = test.findIndex((x) => x.englishWord === e.target.className);
      if (index === -1) {
        console.log("Index doesn't exist");
        test.splice(index1, 1);
        row.remove();
      } else {
        console.log("Delete index");
        tab.splice(index, 1);
        test.splice(index1, 1);
        row.remove();
      }
    }
  };

  let hiddenRow = (e) => {
    const hidden = document.querySelector(
      `#${e.target.className} :nth-child(3)`
    );

    if (hidden.classList.contains("hidden-element")) {
      hidden.classList.remove("hidden-element");
      console.log("tak");
    } else {
      hidden.classList.add("hidden-element");
      console.log("nie");
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
      const cell5 = document.createElement("td");
      const btnDel = document.createElement("button");
      const btnShow = document.createElement("button");
      btnDel.textContent = "Delete";
      btnShow.textContent = "Show";
      btnDel.setAttribute("class", `${english}`);
      btnShow.setAttribute("class", `${english}`);
      btnDel.setAttribute("id", `btnDel`);
      //const cellText = document.createTextNode(`${counter}`);
      const cellText2 = document.createTextNode(`${polish}`);
      const cellText3 = document.createTextNode(`${english}`);
      //cell.appendChild(cellText);
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

btnCheck.addEventListener("click", () => {
  const checkWord = document.querySelector("#word").value;
  const third = document.getElementById(`${drawWord}`);
  console.log(third);
  if (checkWord === drawWord) {
    counterGood++;
    document.querySelector("#status-word").innerHTML = "Good: " + counterGood;
    console.log(third);
    third.classList.add("green");
    if (third.classList.toggle("red")) {
      third.classList.remove("red");
      third.classList.add("green");
      console.log("Change to green");
    } else {
      console.log("Nothing to change");
    }
  } else if (checkWord != drawWord) {
    counterWrong++;
    document.getElementById("status-word").innerHTML = "Bad: " + counterWrong;
    console.log(third);
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
