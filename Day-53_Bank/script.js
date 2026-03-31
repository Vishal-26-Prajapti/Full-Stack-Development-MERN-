class BankAccount {
  #balance = 0;
  #history = [];

  constructor() {
    const savedBalance = localStorage.getItem("balance");
    const savedHistory = localStorage.getItem("history");

    if (savedBalance) this.#balance = Number(savedBalance);
    if (savedHistory) this.#history = JSON.parse(savedHistory);
  }

  deposit(amount) {
    if (amount <= 0) return { msg: "Invalid amount", type: "error" };

    this.#balance += amount;

    const entry = {
      text: `Deposited ₹${amount}`,
      type: "deposit",
      time: new Date().toLocaleTimeString(),
    };

    this.#history.unshift(entry);
    this.#save();

    return { msg: `Deposited ₹${amount}`, type: "deposit" };
  }

  withdraw(amount) {
    if (amount <= 0) return { msg: "Invalid amount", type: "error" };
    if (amount > this.#balance)
      return { msg: "Insufficient balance", type: "error" };

    this.#balance -= amount;

    const entry = {
      text: `Withdrawn ₹${amount}`,
      type: "withdraw",
      time: new Date().toLocaleTimeString(),
    };

    this.#history.unshift(entry);
    this.#save();

    return { msg: `Withdrawn ₹${amount}`, type: "withdraw" };
  }

  getBalance() {
    return this.#balance;
  }

  getHistory() {
    return this.#history;
  }

  clearAll() {
    this.#balance = 0;
    this.#history = [];
    localStorage.clear();
  }

  #save() {
    localStorage.setItem("balance", this.#balance);
    localStorage.setItem("history", JSON.stringify(this.#history));
  }
}

const acc = new BankAccount();

const amountInput = document.querySelector("#amount");
const balanceText = document.querySelector("#balance");
const message = document.querySelector("#message");
const historyList = document.querySelector("#history");
const emptyState = document.querySelector("#emptyState");

const depositBtn = document.querySelector("#depositBtn");
const withdrawBtn = document.querySelector("#withdrawBtn");

function renderHistory() {
  historyList.innerHTML = "";

  const history = acc.getHistory();

  if (history.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  history.forEach((item) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="flex justify-between">
        <span>${item.text}</span>
        <span class="text-xs text-gray-400">${item.time}</span>
      </div>
    `;

    li.className = `px-3 py-2 rounded-lg ${
      item.type === "deposit"
        ? "bg-green-500/10 text-green-400"
        : "bg-red-500/10 text-red-400"
    }`;

    historyList.appendChild(li);
  });
}

function updateUI({ msg, type }) {
  balanceText.textContent = "₹" + acc.getBalance();
  message.textContent = msg;

  let color =
    type === "deposit"
      ? "text-green-400"
      : type === "withdraw"
        ? "text-red-400"
        : "text-yellow-400";

  message.className = `text-center text-sm mb-4 ${color}`;

  balanceText.classList.add("scale-110");
  setTimeout(() => balanceText.classList.remove("scale-110"), 200);

  renderHistory();
}

updateUI({ msg: "Welcome back", type: "info" });

depositBtn.addEventListener("click", () => {
  const amount = Number(amountInput.value);
  const result = acc.deposit(amount);
  updateUI(result);
  amountInput.value = "";
});

withdrawBtn.addEventListener("click", () => {
  const amount = Number(amountInput.value);
  const result = acc.withdraw(amount);
  updateUI(result);
  amountInput.value = "";
});

amountInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") depositBtn.click();
});

balanceText.addEventListener("dblclick", () => {
  acc.clearAll();
  updateUI({ msg: "Account Reset", type: "error" });
});
