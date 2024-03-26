const questions = document.querySelectorAll(".question");
questions.forEach((ques) =>
  ques.addEventListener("click", () => {
    if (ques.parentNode.classList.contains("active")) {
      ques.parentNode.classList.remove("active");
    } else {
      ques.parentNode.classList.add("active");
    }
  })
);