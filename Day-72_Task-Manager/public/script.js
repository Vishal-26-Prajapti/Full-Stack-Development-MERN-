const API = "http://localhost:3000/tasks";

async function loadTasks() {
  const list = document.getElementById("taskList");

  list.innerHTML = "Loading...";

  try {
    const res = await fetch(API);
    const tasks = await res.json();

    list.innerHTML = "";

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="task-text">
          <strong>${task.title}</strong><br>
          <small>${task.description}</small>
        </div>
        <div>
          <button onclick="deleteTask(${task.id})">Delete</button>
          <button onclick="editTask(${task.id}, '${task.title}', '${task.description}')">Edit</button>
        </div>
      `;
      list.appendChild(li);
    });

    if (tasks.length === 0) {
      list.innerHTML = "No tasks found";
    }
  } catch (err) {
    list.innerHTML = "Error loading tasks";
  }
}

loadTasks();

document.getElementById("taskForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  if (!title) {
    alert("Title is required");
    return;
  }

  if (window.editId) {
    // UPDATE
    await fetch(`${API}/${window.editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        status: "completed",
      }),
    });

    window.editId = null;
  } else {
    // CREATE
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });
  }

  document.getElementById("taskForm").reset();
  loadTasks();
});

async function deleteTask(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  loadTasks();
}

function editTask(id, title, description) {
  document.getElementById("title").value = title;
  document.getElementById("description").value = description;

  window.editId = id;
}
