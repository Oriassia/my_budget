let incomeArray = getIncomeArray();
let expensesArray = getExpensesArray();

let elememtIncomeList = document.querySelector(".income-items");
let elementExpensesList = document.querySelector(".expenses-items");
loadArray();

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
    if(incomeArray.length > 0){
        for (let index in incomeArray) {
            elememtIncomeList.innerHTML += `<li class="list-item" value = "${index}">
            <span class="item-name">${incomeArray[index].description}</span>
            <span class="item-value">${incomeArray[index].value}</span>
            <button onclick="removeItem(this.parentNode,${incomeArray})" class = "remove-button">X</button>
            </li>`;
            }
    }
  }


function addItemAction() {
  const elementSelect = document.querySelector("select").value;
  const elementDescription = document.querySelector(".description").value;
  const elementValue = document.querySelector("input.value").valueAsNumber;
  switch (elementSelect) {
    case "plus":
      addIncomeItem(incomeArray, elementDescription, elementValue);

      break;
    case "minus":
      addExpensesItem(expensesArray, elementDescription, elementValue);
    default:
      break;
  }
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

function addIncomeItem(incomeArray, description, value) {
  const incomeObject = { description: description, value: value };

  incomeArray.push(incomeObject);
  loclStorgeUpdate();
  const itemIndex = incomeArray.length;
  elememtIncomeList.innerHTML += `<li class="list-item" value = "${itemIndex}">
        <span class="item-name">${description}</span>
        <span class="item-value">${value}</span>
        <button onclick="removeItem(this.parentNode,${incomeArray})" class = "remove-button">X</button>
        </li>`;
}
function addExpensesItem(expensesArray, description, value) {
  const expensesObject = { description: description, value: value };
  expensesArray.push(expensesObject);
  loclStorgeUpdate();
  const itemIndex = expensesArray.length;
  elementExpensesList.innerHTML += `<li class="list-item" value = "${itemIndex}">
        <span class="item-name">${description}</span>
        <span class="item-value">${value}</span>
        <button onclick="removeItem(this.parentNode,${expensesArray})" class = "remove-button">X</button>
        </li>`;
}

function removeItem(item, array) {
  const liIndex = item.value;
  array.splice(liIndex, 1);
  loclStorgeUpdate();
  item.remove();
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
