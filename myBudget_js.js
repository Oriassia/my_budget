let incomeArray = getIncomeArray();
let expensesArray = getExpensesArray();

let elememtIncomeList = document.querySelector(".income-items");
let elementExpensesList = document.querySelector(".expenses-items");
const elementDate = document.querySelector(".date");
let descriptionElem = document.querySelector("input.description");
let valueElem = document.querySelector("input.value");

loadArray();
currentDate();
colorChange();
addEnterAction(valueElem);
addEnterAction(descriptionElem);

function currentDate() {
  //
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  elementDate.innerHTML = ` Available Budget in ${new Date().getFullYear()} ${
    month[new Date().getMonth()]
  }`;
}
function colorChange() {
  let submitButtonElem = document.querySelector("i.submit-button");
  //get the select value
  symbol = document.querySelector("select").value;

  //set a variable with name of the class to add >> outline color
  const colorClass = symbol === "plus" ? "add-border-green" : "add-border-red";

  // remove both classes from the elements
  descriptionElem.classList.remove("add-border-red", "add-border-green");
  valueElem.classList.remove("add-border-red", "add-border-green");
  // add class to the elements
  descriptionElem.classList.add(colorClass);
  valueElem.classList.add(colorClass);

  //set a variable with name of the class to add >> font  color
  const checkMarkcolorClass = symbol === "plus" ? "add-green" : "add-red";
  submitButtonElem.classList.remove("add-red", "add-green");
  submitButtonElem.classList.add(checkMarkcolorClass);
}

function addItemAction() {
  const elementSelect = document.querySelector("select").value;
  const elementDescription = document.querySelector(".description").value;
  const elementValue = document.querySelector("input.value").valueAsNumber;
  const pressedTime = new Date().getTime();
  if (
    elementDescription != "" &&
    document.querySelector("input.value").value != "" &&
    parseFloat(elementValue) >= 0
  ) {
    switch (elementSelect) {
      case "plus":
        addIncomeItem(elementDescription, elementValue, pressedTime);

        break;
      case "minus":
        addExpensesItem(
          expensesArray,
          elementDescription,
          elementValue,
          pressedTime
        );
      default:
        break;
    }
  }
  updateExpensesItemPrecentage();
  updateBalanceSection();
  inputReset();
}

function updateExpensesItemPrecentage() {
  let itemsList = elementExpensesList.querySelectorAll(".list-item");
  let objValue;
  for (let item of itemsList) {
    for (let obj of expensesArray) {
      if (item.id == obj.time) {
        objValue = obj.value;
        break;
      }
    }
    let itemPrecentage;
    if (computeArraySum(incomeArray) !== 0) {
      itemPrecentage = (
        (objValue / computeArraySum(incomeArray)) *
        100
      ).toFixed(2);
    } else {
      itemPrecentage = 0;
    }
    item.querySelector(".percentage").innerText = `%${itemPrecentage}`;
  }
}
function addIncomeItem(description, value, pressedTime) {
  const incomeObject = {
    description: description,
    value: value,
    time: pressedTime,
  };

  incomeArray.push(incomeObject);
  loclStorgeUpdate();

  elememtIncomeList.innerHTML += `<li class="list-item" id = "${pressedTime}">
        <span class="item-name">${description}</span>
        <div class = "remove-container" > 
        <span class="item-value add-green">+ ${value.toLocaleString()}</span>
        
        <i onclick="removeIncomeItem(this.parentNode.parentNode)" class="fa-regular fa-circle-xmark remove-button add-green"></i>
        </li>`;
}

function addExpensesItem(expensesArray, description, value, pressedTime) {
  const expensesObject = {
    description: description,
    value: value,
    time: pressedTime,
  };
  expensesArray.push(expensesObject);
  loclStorgeUpdate();
  let itemPrecentage = ((value / computeArraySum(incomeArray)) * 100).toFixed(
    2
  );
  elementExpensesList.innerHTML += `<li class="list-item" id = "${pressedTime}">
        <span class="item-name">${description}</span>
       <div class = "remove-container" > 
       <span class="item-value add-red">- ${value.toLocaleString()}</span>
       <span class="percentage">%${itemPrecentage}</span>
        <i onclick="removeExpensesItem(this.parentNode.parentNode)" class="fa-regular fa-circle-xmark remove-button add-red"></i>
        </li>`;
}

function addEnterAction(inputElemnt) {
  // Execute a function when the user presses a key on the keyboard
  inputElemnt.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.querySelector(".submit-button").click();
    }
  });
}

function removeIncomeItem(item) {
  const itemTime = item.id;

  for (let index in incomeArray) {
    if (itemTime == incomeArray[index].time) {
      incomeArray.splice(index, 1);
      break;
    }
  }
  loclStorgeUpdate();
  item.remove();
  updateExpensesItemPrecentage();
  updateBalanceSection();
}

function removeExpensesItem(item) {
  const itemTime = item.id;

  for (let index in expensesArray) {
    if (itemTime == expensesArray[index].time) {
      expensesArray.splice(index, 1);
      break;
    }
  }
  loclStorgeUpdate();
  item.remove();
  updateExpensesItemPrecentage();
  updateBalanceSection();
}

function updateBalanceSection() {
  let incomeSum = computeArraySum(incomeArray);
  let expensesSum = computeArraySum(expensesArray);
  let precentageElem = document.querySelector(".percentage");

  let precentageValue;
  if (incomeSum !== 0) {
    precentageValue = (expensesSum / incomeSum) * 100;
  } else {
    precentageValue = 0;
  }
  document.querySelector(
    ".sum-container.income .value"
  ).textContent = `+ $ ${incomeSum.toLocaleString()}`;

  document.querySelector(
    ".sum-container.expenses .value"
  ).textContent = `- $ ${expensesSum.toLocaleString()}`;

  document.querySelector(".total-sum").textContent = `$ ${(
    incomeSum - expensesSum
  ).toLocaleString()}`;

  if (expensesArray.length > 0) {
    precentageElem.textContent = `%${precentageValue.toFixed(2)}`;
  } else {
    precentageElem.textContent = `% 0`;
  }
}

function computeArraySum(array) {
  let sum = 0;
  for (let obj of array) {
    sum += obj.value;
  }
  return sum;
}

function getIncomeArray() {
  let stringIncomeArray = localStorage.getItem("income-array");

  if (stringIncomeArray) {
    return JSON.parse(stringIncomeArray);
  }
  return [];
}

function getExpensesArray() {
  let stringExpensesArray = localStorage.getItem("expenses-array");

  if (stringExpensesArray) {
    return JSON.parse(stringExpensesArray);
  }
  return [];
}

function loadArray() {
  if (incomeArray.length > 0) {
    for (let index in incomeArray) {
      elememtIncomeList.innerHTML += `<li class="list-item" id = "${
        incomeArray[index].time
      }">
            <span class="item-name">${incomeArray[index].description}</span>
            <div class = "remove-container"> <span class="item-value add-green">+ ${incomeArray[
              index
            ].value.toLocaleString()}</span>
            <i onclick="removeIncomeItem(this.parentNode.parentNode)" class="fa-regular fa-circle-xmark remove-button add-green"></i>
            </li>`;
    }
  }

  if (expensesArray.length > 0) {
    for (let index in expensesArray) {
      let itemPrecentage = (
        (expensesArray[index].value / computeArraySum(incomeArray)) *
        100
      ).toFixed(2);
      elementExpensesList.innerHTML += `<li class="list-item" id = "${
        expensesArray[index].time
      }">
            <span class="item-name">${expensesArray[index].description}</span>
            <div class = "remove-container"> 
            <span class="item-value add-red">- ${expensesArray[
              index
            ].value.toLocaleString()}</span>
            <span class="percentage">%${itemPrecentage}</span>
            <i onclick="removeExpensesItem(this.parentNode.parentNode)" class="fa-regular fa-circle-xmark remove-button add-red"></i></div>
            </li>`;
    }
  }
  updateExpensesItemPrecentage();
  updateBalanceSection();
}
function inputReset() {
  document.querySelector(".description").value = "";
  document.querySelector("input.value").value = "";
}

function loclStorgeUpdate() {
  localStorage.setItem("income-array", JSON.stringify(incomeArray));
  localStorage.setItem("expenses-array", JSON.stringify(expensesArray));
}
