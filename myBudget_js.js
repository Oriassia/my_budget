let incomeArray = getIncomeArray();
let expensesArray = getExpensesArray();

let elememtIncomeList = document.querySelector(".income-items");
let elementExpensesList = document.querySelector(".expenses-items");
loadArray();
function addItemAction() {
  const elementSelect = document.querySelector("select").value;
  const elementDescription = document.querySelector(".description").value;
  const elementValue = document.querySelector("input.value").valueAsNumber;
  if (
    elementDescription != "" &&
    document.querySelector("input.value").value != ""
  ) {
    switch (elementSelect) {
      case "plus":
        addIncomeItem(incomeArray, elementDescription, elementValue);

        break;
      case "minus":
        addExpensesItem(expensesArray, elementDescription, elementValue);
      default:
        break;
    }
    updateBalanceSection();
  }
  inputReset();
}
function addIncomeItem(incomeArray, description, value) {
  const incomeObject = {
    description: description,
    value: value,
    index: incomeArray.length,
  };

  incomeArray.push(incomeObject);
  loclStorgeUpdate();

  elememtIncomeList.innerHTML += `<li class="list-item" value = "${incomeObject.index}">
        <span class="item-name">${description}</span>
        <div class = "remove-container" > <span class="item-value add-green">+ ${value}</span>
        <i onclick="removeExpensesItem(this.parentNode.parentNode)" class="fa-regular fa-circle-xmark remove-button add-green"></i>
        </li>`;
}

function addExpensesItem(expensesArray, description, value) {
  const expensesObject = {
    description: description,
    value: value,
    index: expensesArray.length,
  };
  expensesArray.push(expensesObject);
  loclStorgeUpdate();

  elementExpensesList.innerHTML += `<li class="list-item" value = "${expensesObject.index}">
        <span class="item-name">${description}</span>
       <div class = "remove-container" > <span class="item-value add-red">- ${value}</span>
        <i onclick="removeExpensesItem(this.parentNode.parentNode)" class="fa-regular fa-circle-xmark remove-button add-red"></i>
        </li>`;
}

function removeIncomeItem(item) {
  const liIndex = item.value;

  incomeArray.splice(liIndex, 1);
  loclStorgeUpdate();
  item.remove();
  updateBalanceSection();
}
function removeExpensesItem(item) {
  const liIndex = item.value;
  expensesArray.splice(liIndex, 1);
  loclStorgeUpdate();
  item.remove();
  updateBalanceSection();
}

function updateBalanceSection() {
  let incomeSum = computeArraySum(incomeArray);
  let expensesSum = computeArraySum(expensesArray);

  document.querySelector(
    ".sum-container.income .value"
  ).textContent = `+ $ ${incomeSum}`;

  document.querySelector(
    ".sum-container.expenses .value"
  ).textContent = `- $ ${expensesSum}`;

  document.querySelector(".total-sum").textContent = `$ ${
    incomeSum - expensesSum
  }`;
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
      elememtIncomeList.innerHTML += `<li class="list-item" value = "${index}">
            <span class="item-name">${incomeArray[index].description}</span>
            <div class = "remove-container"> <span class="item-value add-green">+ ${incomeArray[index].value}</span>
            <i onclick="removeIncomeItem(this.parentNode.parentNode)" class="fa-regular fa-circle-xmark remove-button add-green"></i>
            </li>`;
    }
  }

  if (expensesArray.length > 0) {
    for (let index in expensesArray) {
      elementExpensesList.innerHTML += `<li class="list-item" value = "${index}">
            <span class="item-name">${expensesArray[index].description}</span>
            <div class = "remove-container"> <span class="item-value add-red">- ${expensesArray[index].value}</span>
            <i onclick="removeExpensesItem(this.parentNode.parentNode)" class="fa-regular fa-circle-xmark remove-button add-red"></i></div>
            </li>`;
    }
  }
  updateBalanceSection();
}
function inputReset() {
  document.querySelector(".description").value = "";
  document.querySelector("input.value").value = "";
}

function localStorageValidation() {
  if (incomeArray == undefined) {
    incomeArray = [];
  } else {
    convertArrays(incomeArray);
  }

  if (expensesArray == undefined) {
    expensesArray = [];
  } else {
    convertArrays(expensesArray);
  }
}

function loclStorgeUpdate() {
  localStorage.setItem("income-array", JSON.stringify(incomeArray));
  localStorage.setItem("expenses-array", JSON.stringify(expensesArray));
}
//jgjg