const bookmarkForm = document.getElementById("bookmarkForm");
const siteNameInput = document.getElementById("siteName");
const siteUrlInput = document.getElementById("siteUrl");
const bookmarkList = document.getElementById("bookmarkList");
const messageBox = document.getElementById("message");

document.addEventListener("DOMContentLoaded", loadBookmarks);
bookmarkForm.addEventListener("submit", addBookmark);

function addBookmark(event) {
    event.preventDefault();

    const siteName = siteNameInput.value.trim();
    const siteUrl = siteUrlInput.value.trim();

    if (!validateForm(siteName, siteUrl)) return;

    if (isDuplicateBookmark(siteName, siteUrl)) {
        showMessage("Bookmark already exists!", "error");
        return;
    }

    const bookmark = { name: siteName, url: siteUrl };

    const bookmarks = getBookmarks();
    bookmarks.push(bookmark);
    saveBookmarks(bookmarks);

    displayBookmark(bookmark);
    bookmarkForm.reset();

    showMessage("Bookmark added successfully!", "success");
}

function validateForm(name, url) {
    if (!name || !url) {
        showMessage("Please fill in both fields.", "error");
        return false;
    } try {
        new URL(url);
        return true;
    } catch {
        showMessage("Please enter a valid URL.", "error");
        return false;
    }
}

function displayBookmark(bookmark) {
    const li = document.createElement("li");

    const link = document.createElement("a");
    link.href = bookmark.url;
    link.textContent = bookmark.name;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteBtn.addEventListener("click", () => removeBookmark(bookmark));

    li.appendChild(link);
    li.appendChild(deleteBtn);
    bookmarkList.appendChild(li);
}

function clearBookmarksUI() {
    bookmarkList.innerHTML = "";
}

function getBookmarks() {
    return JSON.parse(localStorage.getItem("bookmarks")) || [];
}

function saveBookmarks(bookmarks) {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function loadBookmarks() {
    const bookmarks = getBookmarks();
    bookmarks.forEach(displayBookmark);
}

function removeBookmark(bookmarkToRemove) {
    let bookmarks = getBookmarks();

    bookmarks = bookmarks.filter(
        (bookmark) =>
            bookmark.name !== bookmarkToRemove.name ||
            bookmark.url !== bookmarkToRemove.url
    );

    saveBookmarks(bookmarks);
    clearBookmarksUI();
    loadBookmarks();

    showMessage("Bookmark removed.", "success");
}

function isDuplicateBookmark(name, url) {
    const bookmarks = getBookmarks();
    return bookmarks.some(
        (bookmark) =>
            bookmark.name.toLowerCase() === name.toLowerCase() &&
            bookmark.url.toLowerCase() === url.toLowerCase()
    );
}

function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.style.color = type === "error" ? "red" : "green";

    setTimeout(() => {
        messageBox.textContent = "";
    }, 3000);
}