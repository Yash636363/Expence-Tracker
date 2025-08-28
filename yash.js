const balance = document.getElementById("balance");
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");



const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));
let transactions = localStorage.getItem("transactions") !==null ? localStorageTransactions: [];

// Add Transaction
function addTransaction(e) {
    e.preventDefault();
    if (text.value.trim() === "" || amount.value.trim() === "") {
        alert("Please Enter Text And Value");
    } else {
        const transaction = {
            id: generateId(),
            text: text.value,
            amount: +amount.value,
        };
        transactions.push(transaction);  // fixed case
        addTransactionDOM(transaction);
        updateLocalStorage();
        updateValues();
        text.value = "";
        amount.value = "";
    }
}

// Generate Id
function generateId() {
    return Math.floor(Math.random() * 100000000);
}

// Add transaction to DOM list
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    item.classList.add(transaction.amount < 0 ? "minus" : "plus");

    item.innerHTML = `
        ${transaction.text} 
        <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}

//removeTransaction
function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
    Init();
}

// Update balance, income, and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);  // fixed method name

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);  // fixed method name

    const expense = (
        amounts
            .filter(item => item < 0)
            .reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);  // fixed method name

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    Init();
}

//Update Local Storage
function updateLocalStorage(){
    localStorage.setItem(
        "transactions",JSON.stringify(transactions)
    );
}

// Init app
function Init() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}

Init();

form.addEventListener("submit", addTransaction);
