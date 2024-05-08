let incomeArray = localStorage.getItem(income-array)
let expensesArray = localStorage.getItem(expenses-array);
localStorageValidation()

let elememtIncomeList = document.querySelector(".income-items");
let elementExpensesList = document.querySelector(".expenses-items");

function localStorageValidation() {
  if (incomeArray == undefined) {
    incomeArray = [];
  }

  if (expensesArray == undefined) {
    expensesArray = [];
  }
}

function loclStorgeUpdate() {
  localStorage.setItem("income-array", JSON.stringify(incomeArray));
  localStorage.setItem("expenses-array", JSON.stringify(expensesArray));
}

function addIncomeItem(incomeArray, description, value) {
  const incomeObject = { description: description, value: value };
  incomeArray.push(incomeObject);
  elememtIncomeList.innerElement += `<li class="list-item">
        <span class="item-name">${description}</span>
        <span class="item-value">${value}</span>
        <button class = "remove-button">X</button>
        </li>`;
}
function addExpensesItem(expensesArray, description, value) {
  const expensesObject = { description: description, value: value };
  expensesArray.push(expensesObject);
  elementExpensesList.innerElement += `<li class="list-item">
        <span class="item-name">${description}</span>
        <span class="item-value">${value}</span>
        <button class = "remove-button">X</button>
        </li>`;
}

function updateBalance() {}
