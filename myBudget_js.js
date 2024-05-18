let incomeArray = getArray("income-array");
let expensesArray = getArray("expenses-array");

let elememtIncomeList = document.querySelector(".income-items");
let elementExpensesList = document.querySelector(".expenses-items");
let descriptionElem = document.querySelector("input.description");
let valueElem = document.querySelector("input.value");
const elementDate = document.querySelector(".date");

reloadPage()
function reloadPage() {
  loadArray();
  darkModeReload();
  currentDate();
  colorChange();
  addEnterAction(valueElem);
  addEnterAction(descriptionElem);
}

function currentDate() {
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
  symbol = document.querySelector("select").value;
  const colorClass = symbol === "plus" ? "add-border-green" : "add-border-red";
  descriptionElem.classList.remove("add-border-red", "add-border-green");
  valueElem.classList.remove("add-border-red", "add-border-green");
  descriptionElem.classList.add(colorClass);
  valueElem.classList.add(colorClass);
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
        addItem(elementDescription, elementValue, pressedTime, elementSelect);
        break;
      case "minus":
        addItem(elementDescription, elementValue, pressedTime, elementSelect);
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
function addItem(description, value, pressedTime, operator) {
  const Object = {
    description: description,
    value: value,
    time: pressedTime,
  };

  switch (operator) {
    case "plus":
      incomeArray.push(Object);
      elememtIncomeList.innerHTML += `<li class="list-item" id = "${pressedTime}">
        <span class="item-name">${description}</span>
        <div class = "remove-container" > 
        <span class="item-value add-green">+ ${value.toLocaleString()}</span>
        
        <i onclick="removeIncomeItem(this.parentNode.parentNode)" class="fa-regular fa-circle-xmark remove-button add-green"></i>
        </li>`;
      break;
    case "minus":
      expensesArray.push(Object);
      let itemPrecentage = (
        (value / computeArraySum(incomeArray)) *
        100
      ).toFixed(2);
      elementExpensesList.innerHTML += `<li class="list-item" id = "${pressedTime}">
        <span class="item-name">${description}</span>
       <div class = "remove-container" > 
       <span class="item-value add-red">- ${value.toLocaleString()}</span>
       <span class="percentage">%${itemPrecentage}</span>
        <i onclick="removeExpensesItem(this.parentNode.parentNode)" class="fa-regular fa-circle-xmark remove-button add-red"></i>
        </li>`;
    default:
      break;
  }
  loclStorgeUpdate();
}

function addEnterAction(inputElemnt) {
  inputElemnt.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();

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

function inputReset() {
  document.querySelector(".description").value = "";
  document.querySelector("input.value").value = "";
}
