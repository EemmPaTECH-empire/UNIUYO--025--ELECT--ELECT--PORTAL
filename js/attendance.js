const reg = localStorage.getItem("currentStudent");
if (!reg) location.href = "index.html";

const now = new Date();
const day = now.toLocaleString("en", { weekday: "long" });
const mins = now.getHours()*60 + now.getMinutes();

function toMin(t){ const [h,m]=t.split(":"); return h*60+ +m; }

let lecture = null;
timetable[day]?.forEach(l=>{
  if(mins >= toMin(l.start) && mins <= toMin(l.end)+5) lecture = l;
});

if(!lecture){
  lectureTitle("No active lecture");
  disable();
} else {
  lectureTitle(`${lecture.course} (${lecture.start}-${lecture.end})`);
}

function lectureTitle(t){ document.getElementById("lecture").innerText=t; }
function disable(){ document.getElementById("markBtn").disabled=true; }

document.getElementById("markBtn").onclick = ()=>{
  const key = `${day}_${lecture.course}`;
  let list = JSON.parse(localStorage.getItem(key)) || [];
  if(!list.includes(reg)) list.push(reg);
  localStorage.setItem(key, JSON.stringify(list));
  document.getElementById("msg").innerText = "Attendance recorded";
};

function logout(){
  localStorage.removeItem("currentStudent");
  location.href="index.html";
}