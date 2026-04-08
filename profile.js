document.addEventListener("DOMContentLoaded", () => {
  const page = "profile";
  basePageSetup(page, () => {});
  const form = document.getElementById("profile-form");
  const isFreshStart = new URLSearchParams(window.location.search).get("start") === "1";
  if (isFreshStart) {
    state.profile = JSON.parse(JSON.stringify(defaultState.profile));
    state.profileCompleted = false;
    setActiveProfileSession(false);
    saveState();
  }
  ["name", "age", "income", "expenses", "savings", "location", "risk", "goal"].forEach((id) => {
    const field = document.getElementById(id);
    const value = state.profile[id];
    if (!field) return;
    field.value = value || (typeof value === "number" ? "" : field.value);
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    state.profile = {
      name: document.getElementById("name").value.trim(),
      age: Number(document.getElementById("age").value),
      income: Number(document.getElementById("income").value),
      expenses: Number(document.getElementById("expenses").value),
      savings: Number(document.getElementById("savings").value),
      location: document.getElementById("location").value,
      risk: document.getElementById("risk").value,
      goal: document.getElementById("goal").value,
    };
    state.profileCompleted = true;
    state.schemePreference.goal = state.profile.goal;
    setActiveProfileSession(true);
    saveState();
    window.location.href = "./dashboard.html";
  });
});
