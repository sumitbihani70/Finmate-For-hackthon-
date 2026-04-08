document.addEventListener("DOMContentLoaded", () => {
  const page = "scheme";
  basePageSetup(page, () => renderSchemes());
  document.getElementById("scheme-goal").value = state.schemePreference.goal;
  document.getElementById("scheme-occupation").value = state.schemePreference.occupation;
  document.getElementById("scheme-gender").value = state.schemePreference.gender;
  document.getElementById("scheme-tax").value = state.schemePreference.taxPreference;
  document.getElementById("scheme-button").addEventListener("click", () => {
    state.schemePreference = {
      goal: document.getElementById("scheme-goal").value,
      occupation: document.getElementById("scheme-occupation").value,
      gender: document.getElementById("scheme-gender").value,
      taxPreference: document.getElementById("scheme-tax").value,
    };
    saveState();
    renderSchemes();
  });
  renderSchemes();
});
