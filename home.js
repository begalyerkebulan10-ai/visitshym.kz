// menu select
window.addEventListener("scroll", function(){
  let header = document.getElementById("header");

  if(window.scrollY > 50){
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// MENU OPEN
function openMenu(){
  document.getElementById("menu").classList.add("active");
}

// MENU CLOSE
function closeMenu(){
  document.getElementById("menu").classList.remove("active");
}

// SUBMENU TOGGLE
function toggle(el){
  el.classList.toggle("open");
}
function openMenu(){
  document.getElementById("menu").classList.add("active");
}

function closeMenu(){
  document.getElementById("menu").classList.remove("active");
}

let interval;

function openW(){
  document.getElementById("sheet").classList.add("active");
  document.getElementById("bg").classList.add("active");
  loadWeather();
  clearInterval(interval);
  interval = setInterval(loadWeather,600000);
}

function closeW(){
  document.getElementById("sheet").classList.remove("active");
  document.getElementById("bg").classList.remove("active");
}

function getHour(){
  return new Date().getHours();
}

async function loadWeather(){

  const url="https://api.open-meteo.com/v1/forecast?latitude=42.32&longitude=69.59&hourly=temperature_2m&current_weather=true&forecast_days=1";

  const res=await fetch(url);
  const data=await res.json();

  const temps=data.hourly.temperature_2m.slice(0,24);
  const current=data.current_weather.temperature;
  const code=data.current_weather.weathercode;

  let icon="🌤️",text="Ауа райы";

  if(code===0){icon="☀️";text="Ашық";}
  else if(code<=3){icon="☁️";text="Бұлтты";}
  else if(code<=67){icon="🌧️";text="Жаңбыр";}

  document.getElementById("now").innerText=
  icon+" Қазір: "+current+"°C • "+text;

  const box=document.getElementById("hours");
  box.innerHTML="";

  let now=getHour();

  temps.forEach((t,i)=>{
    box.innerHTML+=`
      <div class="hour ${i===now?'active':''}">
        <div>${i}:00</div>
        <div>🌡️</div>
        <div>${Math.round(t)}°</div>
      </div>
    `;
  });

}
//sagat obnova
function updateClock(){
  const now = new Date();

  let h = String(now.getHours()).padStart(2,'0');
  let m = String(now.getMinutes()).padStart(2,'0');
  let s = String(now.getSeconds()).padStart(2,'0');

  document.getElementById("clock").innerText = `${h}:${m}:${s}`;

  let options = { year:'numeric', month:'long', day:'numeric' };
  document.getElementById("date").innerText =
    now.toLocaleDateString('kk-KZ', options);
}

setInterval(updateClock, 1000);
updateClock();
//knonka dalshe
function toggleText(){
  let dots = document.getElementById("dots");
  let more = document.getElementById("more");
  let btn = document.getElementById("btn");

  if(more.style.display === "inline"){
    more.style.display = "none";
    dots.style.display = "inline";
    btn.innerText = "ДАЛЬШЕ";
  } else {
    more.style.display = "inline";
    dots.style.display = "none";
    btn.innerText = "ЖАСЫРУ";
  }
}
//slide

const slides1 = document.querySelectorAll(".slide1");
let i1 = 0;

function show1(n){
  slides1.forEach(s => s.classList.remove("active"));

  setTimeout(()=>{
    slides1[n].classList.add("active");
  }, 60);
}

function next1(){
  i1++;
  if(i1 >= slides1.length) i1 = 0;
  show1(i1);
}

function prev1(){
  i1--;
  if(i1 < 0) i1 = slides1.length - 1;
  show1(i1);
}

/* SWIPE */
let startX1 = 0;

document.addEventListener("touchstart",(e)=>{
  startX1 = e.touches[0].clientX;
});

document.addEventListener("touchend",(e)=>{
  let endX1 = e.changedTouches[0].clientX;

  if(startX1 > endX1 + 40) next1();
  if(startX1 < endX1 - 40) prev1();
});
//email
function sendEmail(){

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("message").value;

  if(!name || !email || !message){
    alert("Толтырыңыз!");
    return;
  }

  emailjs.send("service_sy1jis8","template_6k3o02s",{
    from_name: name,
    from_email: email,
    message: message
  })
  .then(() => {
    alert("Хабарлама жіберілді!");
  })
  .catch((err) => {
    alert("Қате шықты");
    console.log(err);
  });

}