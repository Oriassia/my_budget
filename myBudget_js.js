let incomeArray = getIncomeArray();
let expensesArray = getExpensesArray();

let elememtIncomeList = document.querySelector(".income-items");
let elementExpensesList = document.querySelector(".expenses-items");
loadArray();
colorChange()

function colorChange(){
    let submitButtonElem = document.querySelector("i.submit-button")
    let descriptionElem = document.querySelector("input.description")
    let valueElem = document.querySelector("input.value")

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
        <div class = "remove-container" > <span class="item-value">${value}</span>
        <button onclick="removeIncomeItem(this.parentNode.parentNode)" class = "remove-button">X</button></div>
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
       <div class = "remove-container" > <span class="item-value">${value}</span>
        <button onclick="removeExpensesItem(this.parentNode.parentNode)" class = "remove-button">X</button></div>
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
            <div class = "remove-container"> <span class="item-value">${incomeArray[index].value}</span>
            <button onclick="removeIncomeItem(this.parentNode.parentNode)" class = "remove-button">X</button></div>
            </li>`;
    }
  }

  if (expensesArray.length > 0) {
    for (let index in expensesArray) {
      elementExpensesList.innerHTML += `<li class="list-item" value = "${index}">
            <span class="item-name">${expensesArray[index].description}</span>
            <div class = "remove-container"> <span class="item-value">${expensesArray[index].value}</span>
            <button onclick="removeExpensesItem(this.parentNode.parentNode)" class = "remove-button">X</button></div>
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
