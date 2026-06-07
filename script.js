const stageTitle = document.getElementById("stageTitle");
const statusText = document.getElementById("statusText");
const descriptionText = document.getElementById("descriptionText");
const conclusionText = document.getElementById("conclusionText");
const logArea = document.getElementById("logArea");
const progressContainer = document.getElementById("progressContainer");

const userA = document.getElementById("userA");
const userB = document.getElementById("userB");
const printer1 = document.getElementById("printer1");
const printer2 = document.getElementById("printer2");

const mutexBox = document.getElementById("mutexBox");
const mutexWrap = document.getElementById("mutexWrap");

const queueCard = document.getElementById("queueCard");
const queueList = document.getElementById("queueList");

const simulationSelect = document.getElementById("simulationSelect");

let currentStep = 0;
let currentStages = [];
let isPlaying = false;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function appendLog(text) {
  const p = document.createElement("p");
  p.textContent = text;
  logArea.appendChild(p);
  logArea.scrollTop = logArea.scrollHeight;
}

function printLog(text) {
  appendLog(text);
}

function clearLogs() {
  logArea.innerHTML = "";
}

function resetVisual() {
  userA.className = "box user";
  userA.innerHTML = "User A";

  userB.className = "box user";
  userB.innerHTML = "User B";

  printer1.className = "box printer";
  printer1.innerHTML = "Printer 1";

  printer2.className = "box printer hidden";
  printer2.innerHTML = "Printer 2";

  if (mutexBox) {
    mutexBox.className = "box mutex hidden";
    mutexBox.innerHTML = "Mutex";
  }

  if (mutexWrap) {
    mutexWrap.classList.add("hidden");
  }
}

function setBox(el, baseClass, text = null, html = null, classes = []) {
  if (!el) return;

  el.className = baseClass;

  classes.forEach((c) => el.classList.add(c));

  if (el === mutexBox && mutexWrap) {
    mutexWrap.classList.remove("hidden");
    el.classList.remove("hidden");
  }

  if (html !== null && html !== undefined) {
    el.innerHTML = html;
  } else if (text !== null && text !== undefined) {
    el.textContent = text;
  }
}

function showQueue(items = []) {
  if (!items.length) {
    hideQueue();
    return;
  }

  queueCard.classList.remove("hidden");
  queueList.innerHTML = items
    .map(
      (item) => `
        <div class="queue-item ${item.priority}">
          <div class="top">${item.title}</div>
          <div class="bottom">${item.detail}</div>
        </div>
      `,
    )
    .join("");
}

function hideQueue() {
  queueCard.classList.add("hidden");
  queueList.innerHTML = "";
}

function setDefaultView() {
  resetVisual();
  hideQueue();

  setBox(userA, "box user", "User A");
  setBox(userB, "box user", "User B");
  setBox(printer1, "box printer idle", "Printer 1");
  setBox(printer2, "box printer hidden", "Printer 2");
}

async function renderStep() {
  if (isPlaying || currentStages.length === 0) return;

  isPlaying = true;

  const stage = currentStages[currentStep];
  stageTitle.textContent = stage.title;
  statusText.textContent = stage.status;
  descriptionText.textContent = stage.description;

  clearLogs();
  stage.render();
  renderProgress();

  for (const line of stage.logs) {
    appendLog(line);
    await sleep(700);
  }

  isPlaying = false;
}

function loadSimulation() {
  const mode = simulationSelect.value;

  const loaders = {
    normal: loadNormalSimulation,
    mutex: loadMutexSimulation,
    synchronization: loadSynchronizationSimulation,
    deadlock: loadDeadlockSimulation,
    starvation: loadStarvationSimulation,
  };

  const loader = loaders[mode];

  if (typeof loader === "function") {
    loader();
    renderProgress();
  }
}

function nextStep() {
  if (isPlaying || currentStages.length === 0) return;

  if (currentStep < currentStages.length - 1) {
    currentStep += 1;
    renderStep();
  } else {
    appendLog("[INFO] Simulasi sudah mencapai tahap akhir.");
  }
}

function renderProgress() {
  if (!progressContainer) return;

  progressContainer.innerHTML = "";

  for (let i = 0; i < currentStages.length; i++) {
    const step = document.createElement("div");
    step.className = "step";

    if (i < currentStep) {
      step.classList.add("done");
    } else if (i === currentStep) {
      step.classList.add("active");
    }

    step.textContent = i + 1;
    progressContainer.appendChild(step);
  }
}

function resetSimulation() {
  currentStep = 0;
  currentStages = [];
  isPlaying = false;

  stageTitle.textContent = 'Pilih simulasi lalu klik "Mulai Simulasi"';
  statusText.textContent = "Belum ada simulasi berjalan.";
  descriptionText.textContent =
    "Pilih simulasi lalu jalankan untuk melihat prosesnya.";
  conclusionText.textContent = "-";

  clearLogs();
  setDefaultView();
  progressContainer.innerHTML = "";
}
