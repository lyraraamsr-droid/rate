/* ============================================================
   RATE DAS BILD! — LOGIKA GAME
   ============================================================ */

const STORAGE_KEY = "rateDasBild.progress";
const MAX_LIVES = 5;

let state = {
  currentLevelIndex: 0,
  currentQuestionIndex: 0,
  lives: MAX_LIVES,
  timerRemaining: null,
  timerHandle: null
};

/* ---------- Progress (localStorage) ---------- */
function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore corrupted data */ }
  return { completedLevels: [] };
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function isLevelUnlocked(levelIdx) {
  if (levelIdx === 0) return true;
  const progress = loadProgress();
  const prevLevelId = GAME_DATA.levels[levelIdx - 1].id;
  return progress.completedLevels.includes(prevLevelId);
}

function markLevelComplete(levelIdx) {
  const progress = loadProgress();
  const levelId = GAME_DATA.levels[levelIdx].id;
  if (!progress.completedLevels.includes(levelId)) {
    progress.completedLevels.push(levelId);
    saveProgress(progress);
  }
}

function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
}

/* ---------- Screen navigation ---------- */
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function refreshSpielenScreen() {
  const level2Unlocked = isLevelUnlocked(1);
  const btnLevel2 = document.getElementById("btn-level-2");
  if (level2Unlocked) {
    btnLevel2.classList.remove("btn-locked");
    btnLevel2.classList.add("btn-yellow");
    btnLevel2.innerHTML = '<span class="icon">⭐</span>Level 2';
    btnLevel2.disabled = false;
  } else {
    btnLevel2.classList.add("btn-locked");
    btnLevel2.classList.remove("btn-yellow");
    btnLevel2.innerHTML = '<span class="icon">🔒</span>Level 2';
    btnLevel2.disabled = true;
  }
}

/* ---------- Game flow ---------- */
function startLevel(levelIdx) {
  state.currentLevelIndex = levelIdx;
  state.currentQuestionIndex = 0;
  state.lives = MAX_LIVES;
  showScreen("screen-game");
  renderQuestion();
}

function currentLevel() { return GAME_DATA.levels[state.currentLevelIndex]; }
function currentQuestion() { return currentLevel().questions[state.currentQuestionIndex]; }

function renderHearts() {
  const bar = document.getElementById("hearts-bar");
  bar.innerHTML = "";
  for (let i = 0; i < MAX_LIVES; i++) {
    const span = document.createElement("span");
    span.className = "heart" + (i >= state.lives ? " lost" : "");
    span.textContent = "❤️";
    bar.appendChild(span);
  }
}

function renderHintBadge(hint) {
  if (!hint) return "";
  return `<span class="clue-hint ${hint.type}">${hint.text}</span>`;
}

function renderQuestion() {
  clearTimer();
  document.getElementById("answer-input").value = "";
  document.getElementById("feedback").textContent = "";
  document.getElementById("feedback").className = "feedback";
  renderHearts();

  const q = currentQuestion();
  const cluesRow = document.getElementById("clues-row");
  cluesRow.innerHTML = "";

  q.clues.forEach((clue, i) => {
    const wrap = document.createElement("div");
    wrap.className = "clue";
    wrap.innerHTML = `
      <div class="clue-image-wrap">
        <img src="images/${clue.image}" alt="${clue.label}"
             onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'fallback\\'>${clue.label}</div>';">
      </div>
      ${renderHintBadge(clue.hint)}
    `;
    cluesRow.appendChild(wrap);
    if (i < q.clues.length - 1) {
      const plus = document.createElement("div");
      plus.className = "plus-sign";
      plus.textContent = "+";
      cluesRow.appendChild(plus);
    }
  });

  const timerChip = document.getElementById("timer-chip");
  if (q.timer) {
    timerChip.style.display = "block";
    state.timerRemaining = q.timer;
    updateTimerDisplay();
    state.timerHandle = setInterval(() => {
      state.timerRemaining--;
      updateTimerDisplay();
      if (state.timerRemaining <= 0) {
        clearTimer();
        handleWrongAnswer("Die Zeit ist abgelaufen!");
      }
    }, 1000);
  } else {
    timerChip.style.display = "none";
  }

  document.getElementById("answer-input").focus();
}

function updateTimerDisplay() {
  const timerChip = document.getElementById("timer-chip");
  const m = Math.floor(state.timerRemaining / 60);
  const s = state.timerRemaining % 60;
  timerChip.textContent = `⏱ ${m}:${s.toString().padStart(2, "0")}`;
  timerChip.classList.toggle("warning", state.timerRemaining <= 10);
}

function clearTimer() {
  if (state.timerHandle) {
    clearInterval(state.timerHandle);
    state.timerHandle = null;
  }
}

function normalizeAnswer(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/ß/g, "ss")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/\s+/g, " ");
}

function checkAnswer() {
  const input = document.getElementById("answer-input");
  const q = currentQuestion();
  const userAnswer = normalizeAnswer(input.value);
  const correctAnswer = normalizeAnswer(q.answer);

  if (!input.value.trim()) return;

  if (userAnswer === correctAnswer) {
    clearTimer();
    const fb = document.getElementById("feedback");
    fb.textContent = "Richtig! 🎉";
    fb.className = "feedback correct";
    setTimeout(nextQuestion, 700);
  } else {
    handleWrongAnswer("Leider falsch. Versuch es nochmal!");
  }
}

function handleWrongAnswer(message) {
  state.lives--;
  renderHearts();
  const fb = document.getElementById("feedback");
  fb.textContent = message;
  fb.className = "feedback wrong";

  if (state.lives <= 0) {
    setTimeout(showGameOver, 500);
  } else {
    // restart timer for timed question if it has one
    const q = currentQuestion();
    if (q.timer) {
      clearTimer();
      state.timerRemaining = q.timer;
      updateTimerDisplay();
      state.timerHandle = setInterval(() => {
        state.timerRemaining--;
        updateTimerDisplay();
        if (state.timerRemaining <= 0) {
          clearTimer();
          handleWrongAnswer("Die Zeit ist abgelaufen!");
        }
      }, 1000);
    }
    document.getElementById("answer-input").value = "";
    document.getElementById("answer-input").focus();
  }
}

function nextQuestion() {
  const level = currentLevel();
  state.currentQuestionIndex++;
  if (state.currentQuestionIndex >= level.questions.length) {
    markLevelComplete(state.currentLevelIndex);
    showLevelComplete();
  } else {
    renderQuestion();
  }
}

function showLevelComplete() {
  const level = currentLevel();
  const hasNext = state.currentLevelIndex + 1 < GAME_DATA.levels.length;
  document.getElementById("levelcomplete-text").textContent = hasNext
    ? `Du hast ${level.title} abgeschlossen. Das nächste Level ist jetzt freigeschaltet!`
    : `Du hast ${level.title} abgeschlossen. Super gemacht!`;
  document.getElementById("overlay-levelcomplete").classList.add("active");
}

function showGameOver() {
  document.getElementById("overlay-gameover").classList.add("active");
}

/* ---------- Event wiring ---------- */
document.getElementById("btn-spielen").addEventListener("click", () => {
  refreshSpielenScreen();
  showScreen("screen-spielen");
});
document.getElementById("btn-anleitung").addEventListener("click", () => showScreen("screen-anleitung"));
document.getElementById("btn-back-main-1").addEventListener("click", () => showScreen("screen-main"));
document.getElementById("btn-back-main-2").addEventListener("click", () => showScreen("screen-main"));
document.getElementById("btn-quit-game").addEventListener("click", () => {
  clearTimer();
  showScreen("screen-main");
});

document.getElementById("btn-level-1").addEventListener("click", () => startLevel(0));
document.getElementById("btn-level-2").addEventListener("click", () => {
  if (isLevelUnlocked(1)) startLevel(1);
});

document.getElementById("btn-check").addEventListener("click", checkAnswer);
document.getElementById("answer-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkAnswer();
});

document.getElementById("btn-reset-main").addEventListener("click", () => {
  const ok = confirm("Möchtest du wirklich deinen gesamten Fortschritt zurücksetzen?");
  if (ok) {
    resetProgress();
    alert("Fortschritt wurde zurückgesetzt.");
  }
});

document.getElementById("btn-lc-continue").addEventListener("click", () => {
  document.getElementById("overlay-levelcomplete").classList.remove("active");
  showScreen("screen-main");
});

document.getElementById("btn-go-restart").addEventListener("click", () => {
  document.getElementById("overlay-gameover").classList.remove("active");
  startLevel(state.currentLevelIndex);
});
