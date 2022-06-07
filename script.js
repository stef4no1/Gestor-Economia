const form = document.getElementById('transactionForm');
form.addEventListener("submit", function(event){
    event.preventDefault();
    let transactionFormData = new FormData(form);
    let transactionObj = convertFormDataToTransactionObj(transactionFormData);
    console.log(transactionObj);
    saveTransactionObj(transactionObj);
    insertRowInTransactionTable(transactionObj);
    form.reset();
    }
);

document.addEventListener("DOMContentLoaded", function(event){
    let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"));
    transactionObjArr.forEach(
        function(arrayElement){
            insertRowInTransactionTable(arrayElement);
        }
    )
    }
);

function getNewTransactionId(){
    let lastTransactionId = localStorage.getItem("lastTransactionId") || "-1";
    let newTransactionId = JSON.parse(lastTransactionId) + 1;
    localStorage.setItem("lastTransactionId", JSON.stringify(newTransactionId));
    return newTransactionId;
}   

function convertFormDataToTransactionObj(transactionFormData){
    let transactionType = transactionFormData.get('transactionType');
    let transactionDescription = transactionFormData.get('transactionType');
    let transactionAmount = transactionFormData.get('transactionAmount');
    let transactionCategory = transactionFormData.get('transactionCategory');
    let transactionId = getNewTransactionId();
    return {
        "transactionType": transactionType,
        "transactionDescription": transactionDescription,
        "transactionAmount": transactionAmount,
        "transactionCategory": transactionCategory,
        "transactionId": transactionId
    }
}

function insertRowInTransactionTable(transactionObj){
    let transactionTableRef = document.getElementById('transactionTable');

    let newTransactionRowRef = transactionTableRef.insertRow(-1);
    newTransactionRowRef.setAttribute("data-transaction-id", transactionObj["transactionId"]);

    let newTypeCellRef = newTransactionRowRef.insertCell(0);
    newTypeCellRef.textContent = transactionObj["transactionType"];

    newTypeCellRef = newTransactionRowRef.insertCell(1);
    newTypeCellRef.textContent = transactionObj["transactionDescription"];

    newTypeCellRef = newTransactionRowRef.insertCell(2);
    newTypeCellRef.textContent = transactionObj["transactionAmount"];

    newTypeCellRef = newTransactionRowRef.insertCell(3);
    newTypeCellRef.textContent = transactionObj["transactionCategory"];

    let newDeleteCell = newTransactionRowRef.insertCell(4);
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    newDeleteCell.appendChild(deleteButton);

    deleteButton.addEventListener("click", (event) => {
        let transactionRow = event.target.parentNode.parentNode;
        let transactionId = transactionRow.getAttribute("data-transaction-id");
        transactionRow.remove();
        deleteTransactionObj(transactionId);
    })
}

function deleteTransactionObj(transactionId){
    let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"));
    let transactionIndexInArray = transactionObjArr.findIndex(element => element.transactionId === transactionId);
    transactionObjArr.splice(transactionIndexInArray, 1);
    let transactionArrayJSON = JSON.stringify(transactionObjArr);
    localStorage.setItem("transactionData", transactionArrayJSON);

}

function saveTransactionObj(transactionObj){
    let myTransactionArray = JSON.parse(localStorage.getItem("transactionData")) || [];
    myTransactionArray.push(transactionObj);
    let transactionArrayJSON = JSON.stringify(myTransactionArray);
    localStorage.setItem("transactionData", transactionArrayJSON);
}