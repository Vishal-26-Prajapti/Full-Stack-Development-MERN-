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
  });

  task.addEventListener("dragstart", () => {
    dragElement = task;
  });

  task.addEventListener("dragend", () => {
    dragElement = null;
  });

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

  taskTitleInput.value = "";
  taskDescInput.value = "";

  modal.classList.remove("active");
});

function addDragEvents(column) {
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
  });
}

Object.values(columns).forEach(addDragEvents);

toggleModalButton.addEventListener("click", () => {
  modal.classList.toggle("active");
});

modalBg.addEventListener("click", () => {
  modal.classList.remove("active");
});

updateCounts();
