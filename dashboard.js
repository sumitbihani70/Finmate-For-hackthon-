document.addEventListener("DOMContentLoaded", () => {
  const page = "dashboard";
  basePageSetup(page, () => renderDashboard());
  renderDashboard();
});
