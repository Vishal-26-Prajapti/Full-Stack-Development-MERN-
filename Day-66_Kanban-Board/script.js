const isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;
const STORAGE_KEY = "kanban-tasks";

const columns = {
  todo: document.getElementById("todo"),
  progress: document.getElementById("progress"),
  done: document.getElementById("done"),
};

const toggleModalButton = document.getElementById("toggle-modal");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".modal .bg");
const addTaskButton = document.getElementById("add-new-task");

const taskTitleInput = document.getElementById("task-title-input");
const taskDescInput = document.getElementById("task-desc-input");

let dragElement = null;

function saveToLocalStorage() {
  const data = {
    todo: [],
    progress: [],
    done: [],
  };

  Object.keys(columns).forEach((key) => {
    const tasks = columns[key].querySelectorAll(".task");

    tasks.forEach((task) => {
      const title = task.querySelector("h3").innerText;
      const desc = task.querySelector("p").innerText;

      data[key].push({ title, desc });
    });
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (!data) return;

  Object.keys(columns).forEach((key) => {
    if (!data[key]) return;

    data[key].forEach((item) => {
      const task = createTask(item.title, item.desc);
      columns[key].appendChild(task);
    });
  });

  updateCounts();
}

function updateCounts() {
  Object.values(columns).forEach((col) => {
    const countEl = col.querySelector(".right");
    const tasks = col.querySelectorAll(".task");
    countEl.innerText = tasks.length;
  });
}

function createTask(titleText, descText) {
  const task = document.createElement("div");
  task.classList.add("task");
  task.setAttribute("draggable", "true");

  const title = document.createElement("h3");
  title.textContent = titleText;

  const desc = document.createElement("p");
  desc.textContent = descText;

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.textContent = "Delete";

  deleteBtn.addEventListener("click", () => {
    task.remove();
    updateCounts();
    saveToLocalStorage();
  });

  if (!isMobile) {
    task.addEventListener("dragstart", () => {
      dragElement = task;
    });

    task.addEventListener("dragend", () => {
      dragElement = null;
    });
  }

  if (isMobile) {
    task.addEventListener("touchstart", () => {
      dragElement = task;
    });

    task.addEventListener("touchend", () => {
      dragElement = null;
    });
  }

  task.append(title, desc, deleteBtn);

  return task;
}

addTaskButton.addEventListener("click", () => {
  const title = taskTitleInput.value.trim();
  const desc = taskDescInput.value.trim();

  if (!title) return;

  const task = createTask(title, desc);
  columns.todo.appendChild(task);

  updateCounts();
  saveToLocalStorage();

  taskTitleInput.value = "";
  taskDescInput.value = "";

  modal.classList.remove("active");
});

const clearAllButton = document.getElementById("clear-all");

clearAllButton.addEventListener("click", () => {
  const confirmClear = confirm("Are you sure you want to delete all tasks?");

  if (!confirmClear) return;

  Object.values(columns).forEach((col) => {
    const tasks = col.querySelectorAll(".task");
    tasks.forEach((task) => task.remove());
  });

  localStorage.removeItem(STORAGE_KEY);

  updateCounts();
});

function addDragEvents(column) {
  if (!isMobile) {
    column.addEventListener("dragenter", (e) => {
      e.preventDefault();
      column.classList.add("hover-over");
    });

    column.addEventListener("dragleave", () => {
      column.classList.remove("hover-over");
    });

    column.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    column.addEventListener("drop", (e) => {
      e.preventDefault();
      if (!dragElement) return;

      column.appendChild(dragElement);
      column.classList.remove("hover-over");

      updateCounts();
      saveToLocalStorage();
    });
  }

  if (isMobile) {
    column.addEventListener("touchmove", (e) => {
      if (!dragElement) return;

      const touch = e.touches[0];
      const element = document.elementFromPoint(touch.clientX, touch.clientY);

      const targetColumn = element?.closest(".task-column");

      if (targetColumn && targetColumn !== dragElement.parentElement) {
        targetColumn.appendChild(dragElement);

        updateCounts();
        saveToLocalStorage();
      }
    });
  }
}

Object.values(columns).forEach(addDragEvents);

toggleModalButton.addEventListener("click", () => {
  modal.classList.toggle("active");
});

modalBg.addEventListener("click", () => {
  modal.classList.remove("active");
});

loadFromLocalStorage();
updateCounts();
