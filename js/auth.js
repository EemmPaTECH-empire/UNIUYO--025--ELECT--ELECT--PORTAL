const form = document.getElementById("signinForm");
const msg = document.getElementById("formMsg");

form.addEventListener("submit", e => {
  e.preventDefault();

  const name = nameInput();
  const reg = regInput();
  const level = levelInput();

  let students = JSON.parse(localStorage.getItem("students")) || {};

  if (!students[reg]) {
    if (!name || !level) {
      msg.innerText = "First time? Enter full name and level";
      msg.style.color = "red";
      return;
    }
    students[reg] = { name, reg, level };
    localStorage.setItem("students", JSON.stringify(students));
  }

  localStorage.setItem("currentStudent", reg);
  location.href = "dashboard.html";
});

function nameInput() {
  return document.getElementById("name").value.trim();
}
function regInput() {
  return document.getElementById("reg").value.trim().toUpperCase();
}
function levelInput() {
  return document.getElementById("level").value.trim();
}