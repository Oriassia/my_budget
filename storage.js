function loclStorgeUpdate() {
  localStorage.setItem("income-array", JSON.stringify(incomeArray));
  localStorage.setItem("expenses-array", JSON.stringify(expensesArray));
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

function getArray(key) {
  let stringArray = localStorage.getItem(key);

  if (stringArray) {
    return JSON.parse(stringArray);
  }
  return [];
}

function darkModeGet() {
  if (localStorage.getItem("dark-mode") == null) {
    return "off";
  }
  return localStorage.getItem("dark-mode");
}
