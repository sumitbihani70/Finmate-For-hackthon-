document.addEventListener("DOMContentLoaded", () => {
  const page = "adviser";
  basePageSetup(page, () => {
    resetChatThread();
    renderQuestionList();
    document.querySelectorAll("[data-mode]").forEach((button) => {
      button.classList.toggle("active", button.dataset.mode === state.adviserMode);
    });
  });
  resetChatThread();
  renderQuestionList();
  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === state.adviserMode);
    button.addEventListener("click", () => {
      state.adviserMode = button.dataset.mode;
      saveState();
      document.querySelectorAll("[data-mode]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderQuestionList();
    });
  });
  document.getElementById("ask-button").addEventListener("click", () => {
    const input = document.getElementById("chat-input");
    const questionText = input.value.trim();
    if (!questionText) return;
    appendChatMessage(questionText, "user");
    input.value = "";
    const allQuestions = Object.values(adviserQuestions).flat();
    const matched = allQuestions.find((item) => item.en.toLowerCase() === questionText.toLowerCase() || item.hi.toLowerCase() === questionText.toLowerCase());
    appendChatMessage(matched ? buildAnswers(matched.key, questionText) : uiText[state.language].adviserFallback(questionText), "ai");
  });
});
