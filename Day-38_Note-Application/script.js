const form = document.getElementById("noteForm");
const headingInput = document.getElementById("heading");
const detailsInput = document.getElementById("details");
const notesContainer = document.getElementById("notesContainer");

let tasks = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const heading = headingInput.value;
  const details = detailsInput.value;

  tasks.push({ heading, details });

  renderNotes();

  headingInput.value = "";
  detailsInput.value = "";
});

function renderNotes() {
  notesContainer.innerHTML = "";

  tasks.forEach((task, index) => {
    const note = document.createElement("div");

    note.className =
      "bg-[url('./image.png')] relative h-52 w-40 rounded-xl bg-cover flex flex-col pb-2";

    note.innerHTML = `
      <button 
        onclick="deleteNote(${index})"
        class="w-5 bg-red-600 text-white text-[10px] absolute right-1 top-2 rounded-full cursor-pointer p-1">
        ✕
      </button>

      <h3 class="text-black text-xl font-bold px-4 py-1 mt-6">
        ${task.heading}
      </h3>

      <p class="px-4 pb-2 text-[14px] font-semibold leading-tight text-gray-700 flex-1 break-words overflow-y-auto">
        ${task.details}
      </p>
    `;

    notesContainer.appendChild(note);
  });
}

function deleteNote(index) {
  tasks.splice(index, 1);
  renderNotes();
}