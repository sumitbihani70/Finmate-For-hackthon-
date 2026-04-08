document.addEventListener("DOMContentLoaded", () => {
  const page = "planner";
  basePageSetup(page, () => renderPlanner());
  document.getElementById("plan-button").addEventListener("click", renderPlanner);
  renderPlanner();
});
