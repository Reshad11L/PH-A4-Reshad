// Track current active tab
let currentTab = "all";

// Get all job cards 

function getAllCards() {
  return document.querySelectorAll(".job-card");
}

// Switch Tab

function switchTab(tab) {
  currentTab = tab;

  // Update tab button active styles
  document.querySelectorAll(".tab-btn").forEach(function(btn) {
    btn.classList.remove("active");
    btn.classList.add("text-slate-600");
  });

  const activeBtn = document.querySelector('.tab-btn[data-tab="' + tab + '"]');
  if (activeBtn) {
    activeBtn.classList.add("active");
    activeBtn.classList.remove("text-slate-600");
  }

  filterCards();
}

// Filter cards by current tab

function filterCards() {
  const allCards = getAllCards();
  let visibleCount = 0;

  allCards.forEach(function(card) {
    const status = card.getAttribute("data-status");
    let show = false;

    if (currentTab === "all") {
      show = true;
    } else if (currentTab === "interview" && status === "interview") {
      show = true;
    } else if (currentTab === "rejected" && status === "rejected") {
      show = true;
    }

    if (show) {
      card.classList.remove("hidden");
      visibleCount++;
    } else {
      card.classList.add("hidden");
    }
  });

   // Update jobs count label
  document.getElementById("jobs-count-label").textContent = visibleCount + " jobs";

  // Show/hide no jobs state
  const noJobsState = document.getElementById("no-jobs-state");
  if (visibleCount === 0) {
    noJobsState.classList.remove("hidden");
  } else {
    noJobsState.classList.add("hidden");
  }

  // Update dashboard counts
  updateDashboard();
}

// Update status badge on a card

function updateBadge(card, status) {
  const badge = card.querySelector(".status-badge");

  // Reset classes
  badge.className = "status-badge";

  if (status === "interview") {
    badge.classList.add("bg-green-100", "text-green-600");
    badge.textContent = "INTERVIEW";
  } else if (status === "rejected") {
    badge.classList.add("bg-red-100", "text-red-500");
    badge.textContent = "REJECTED";
  } else {
    badge.classList.add("bg-slate-100", "text-slate-500");
    badge.textContent = "NOT APPLIED";
  }
}

// Update button selected styles on a card

function updateButtons(card, status) {
  const interviewBtn = card.querySelector(".btn-interview");
  const rejectedBtn  = card.querySelector(".btn-rejected");

  // Reset both buttons
  interviewBtn.classList.remove("selected", "bg-green-500", "text-white");
  interviewBtn.classList.add("text-green-600");

  rejectedBtn.classList.remove("selected", "bg-red-400", "text-white");
  rejectedBtn.classList.add("text-red-500");

  if (status === "interview") {
    interviewBtn.classList.add("selected", "bg-green-500", "text-white");
    interviewBtn.classList.remove("text-green-600");
  } else if (status === "rejected") {
    rejectedBtn.classList.add("selected", "bg-red-400", "text-white");
    rejectedBtn.classList.remove("text-red-500");
  }
}

// Handle Interview button click

function handleInterview(id) {
  const card = document.querySelector('.job-card[data-id="' + id + '"]');
  if (!card) return;

  const currentStatus = card.getAttribute("data-status");
  const newStatus = currentStatus === "interview" ? "not-applied" : "interview";

  card.setAttribute("data-status", newStatus);
  updateBadge(card, newStatus);
  updateButtons(card, newStatus);
  filterCards();
}


// Handle Rejected button click

function handleRejected(id) {
  const card = document.querySelector('.job-card[data-id="' + id + '"]');
  if (!card) return;

  const currentStatus = card.getAttribute("data-status");
  const newStatus = currentStatus === "rejected" ? "not-applied" : "rejected";

  card.setAttribute("data-status", newStatus);
  updateBadge(card, newStatus);
  updateButtons(card, newStatus);
  filterCards();
}

