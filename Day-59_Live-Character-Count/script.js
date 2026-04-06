const textarea = document.getElementById("textarea");
const charCount = document.getElementById("charCount");
const noSpaceCount = document.getElementById("noSpaceCount");
const wordCount = document.getElementById("wordCount");
const remaining = document.getElementById("remaining");
const progressFill = document.getElementById("progressFill");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");
const toast = document.getElementById("toast");

const MAX = 300;

function bumpAnimate(el) {
  el.classList.remove("bump");
  void el.offsetWidth; 
  el.classList.add("bump");
  setTimeout(() => el.classList.remove("bump"), 150);
}

function updateStats() {
  const text = textarea.value;
  const chars = text.length;
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const noSpc = text.replace(/\s/g, "").length;
  const left = MAX - chars;
  const pct = (chars / MAX) * 100;

  charCount.textContent = chars;
  noSpaceCount.textContent = noSpc;
  wordCount.textContent = words;
  remaining.textContent = left;

  bumpAnimate(charCount);

  const warnState = pct >= 70 && pct < 90;
  const dangerState = pct >= 90;

  progressFill.style.width = pct + "%";
  progressFill.classList.toggle("warn", warnState);
  progressFill.classList.toggle("danger", dangerState);

  textarea.classList.toggle("warn", warnState);
  textarea.classList.toggle("danger", dangerState);

  [charCount, noSpaceCount, wordCount, remaining].forEach((el) => {
    el.classList.toggle("warn", warnState);
    el.classList.toggle("danger", dangerState);
  });
}

copyBtn.addEventListener("click", () => {
  if (!textarea.value.trim()) return;
  navigator.clipboard.writeText(textarea.value).then(() => {
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
  });
});

clearBtn.addEventListener("click", () => {
  textarea.value = "";
  updateStats();
  textarea.focus();
});

textarea.addEventListener("input", updateStats);
