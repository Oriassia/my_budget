function updateBalance(){

}



function updateBalanceSection(){
    let incomeSum = computeArraySum(incomeArray)
    let expensesSum = computeArraySum(expensesArray)

    document.querySelector(".sum-container.income .value").textContent = `+ $ ${incomeSum}`

    document.querySelector(".sum-container.income .value").textContent = `+ $ ${expensesSum}` 
    
    document.querySelector(".total-sum").textContent = `$ ${incomeSum - expensesSum}`;
}


function computeArraySum(array){
    let sum = 0;
    for (let obj of array){
        sum += obj.value
    }
    return sum;
}
