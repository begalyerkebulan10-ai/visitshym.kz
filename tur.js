//map
let map;
let isLoaded = false;

function openRoute(){

  document.getElementById("mapModal").style.display = "flex";

  DG.then(function(){

    if(!map){

      map = DG.map('map', {
        center: [42.399506, 69.621184],
        zoom: 15
      });

      const points = [
        {lat: 42.397876, lng: 69.623877, img: "https://avatars.mds.yandex.net/get-altay/15487932/2a0000019750e9c8468ecbf8fbb7a0e7b3c8/orig", text: "SHYM CITY"},
        {lat: 42.394690, lng: 69.623442, img: "https://avatars.mds.yandex.net/get-altay/13203115/2a0000018eb8ebc822ec6d589b78c2dbdf9a/XXXL", text: "Qyzgaldaq saraiy"},
        {lat: 42.387501, lng: 69.627769, img: "https://avatars.mds.yandex.net/i?id=51bae985c56770e970af64f120824ba6_l-4471740-images-thumbs&n=13", text: "Baidibek Bi"},
        {lat: 42.384836, lng: 69.626479, img: "https://visit-shymkent.com/wp-content/uploads/2025/05/kazyna-complex3.jpeg", text: "Қазына"},
        {lat: 42.384890, lng: 69.627966, img: "https://avatars.mds.yandex.net/get-altay/15395175/2a00000198c61a04f062e6f1b103de552157/orig", text: "Қазақ хандығы 550"},
        {lat: 42.382783, lng: 69.626951, img: "https://e-history.kz/storage/tmp/resize/preview/1200_0_ec329aef1b8271f8dbc9a90916d5681e.jpg", text: "Мұражай"},
        {lat: 42.382827, lng: 69.628025, img: "https://dalatimes.kz/wp-content/uploads/2021/08/WhatsApp-Image-2020-11-16-at-12.15.23-1024x682-1.jpeg", text: "Салт-дәстүр"},
        {lat: 42.382319, lng: 69.628590, img: "https://sxodim.com/uploads/posts/2023/02/06/optimized/669c6286245d1e25e6eefe8e75f77b3a_1400x790-q-85.jpg", text: "Наурыз"},
        {lat: 42.381693, lng: 69.628203, img: "https://dwc.kg/wp-content/uploads/2023/06/5ca5cd55d1294-748x574.jpg", text: "Жайлау көл"},
        {lat: 42.376953, lng: 69.628102, img: "https://www.gov.kz/uploads/2025/6/9/23e13cc59fa492028de2f3249297a10c_original.1444556.png", text: "Зоопарк"},
        {lat: 42.368648, lng: 69.622985, img: "https://sn.kz/cache/imagine/main_page_full/uploads/news/2019/06/04/5cf6581432143731731646.jpg", text: "Дендропарк"},
        {lat: 42.366951, lng: 69.623459, img: "https://www.gov.kz/uploads/2020/11/2/29243449d1ec5a70f751535aac091ea8_original.115930.jpeg", text: "Қасірет"}
      ];

      let markers = [];
      let markersList = [];

      points.forEach(p => {

        const icon = DG.divIcon({
          html: `
            <div class="marker-wrapper">
              <div class="circle-marker" style="cursor:pointer;">
                <img src="${p.img}">
              </div>
            </div>
          `,
          className: '',
          iconSize: [60, 60]
        });

        const marker = DG.marker([p.lat, p.lng], { icon }).addTo(map);

        // 🔥 CLICK → POPUP
        marker.on('click', function () {
          marker.bindPopup(`
            <div style="text-align:center; max-width:200px;">
              <img src="${p.img}" style="width:200px;height:140px;object-fit:cover;border-radius:10px;">
              <b>${p.text}</b>
            </div>
          `).openPopup();
        });

        markers.push([p.lat, p.lng]);

        markersList.push({ marker, img: p.img });
      });

      // 🔵 ROUTE LINE (1 рет қана)
      const polyline = DG.polyline(markers, {
        color: '#1e90ff',
        weight: 6
      }).addTo(map);

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const toRad = x => x * Math.PI / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// 📍 TEXT LABEL ҚОСУ
for (let i = 0; i < markers.length - 1; i++) {
  const [lat1, lng1] = markers[i];
  const [lat2, lng2] = markers[i + 1];

  let dist = getDistance(lat1, lng1, lat2, lng2);

  // 📌 midpoint
  let midLat = (lat1 + lat2) / 2;
  let midLng = (lng1 + lng2) / 2;

  // 🔥 TEXT ICON (метка емес, текст)
  const textIcon = DG.divIcon({
    html: `
      <div style="
        background:#070f25;
        color:#22c55e;
        padding:4px 4px;
        border-radius:8px;
        font-size:10px;
        font-weight:600;
        box-shadow:0 0 10px rgba(0,0,0,0.5);
      ">
        ${dist.toFixed(2)} км
      </div>
    `,
    className: '',
    iconSize: [80, 20]
  });

  DG.marker([midLat, midLng], { icon: textIcon }).addTo(map);
}

      // 🚶 ICON
      const personIcon = DG.divIcon({
        html: `
          <div id="person" style="
            width:30px;height:30px;
            background:#2563eb;
            border-radius:50%;
            display:flex;
            align-items:center;
            justify-content:center;
            color:white;
          ">🚶</div>
        `,
        className: '',
        iconSize: [30, 30]
      });

      let person = DG.marker(markers[0], { 
  icon: personIcon,
  zIndexOffset: 10000   // 🔥 ең үстіне шығарады
}).addTo(map);

      function getAngle(lat1, lng1, lat2, lng2) {
        const toRad = x => x * Math.PI / 180;
        const toDeg = x => x * 180 / Math.PI;

        const dLng = toRad(lng2 - lng1);
        const y = Math.sin(dLng) * Math.cos(toRad(lat2));
        const x = Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
                  Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLng);

        return (toDeg(Math.atan2(y, x)) + 360) % 360;
      }

      let i = 0;
      let step = 0;
      let speed = 0.004;

function animate() {

  let [lat1, lng1] = markers[i];
  let [lat2, lng2] = markers[i + 1];

  step += speed;

  if (step >= 1) {
    step = 0;
    i++;

    // 🔥 END → қайта бастау
    if (i >= markers.length - 1) {
      i = 0;   // қайта 1-нүкте
      step = 0;
    }

    requestAnimationFrame(animate);
    return;
  }

  let lat = lat1 + (lat2 - lat1) * step;
  let lng = lng1 + (lng2 - lng1) * step;

  person.setLatLng([lat, lng]);

  let angle = getAngle(lat1, lng1, lat2, lng2);

  document.getElementById("person").style.transform =
    `rotate(${angle + 180}deg)`;

  requestAnimationFrame(animate);
}
      animate();

      isLoaded = true;

    } else {
      setTimeout(()=>map.invalidateSize(),100);
    }

  });
}

function closeMap(){
  document.getElementById("mapModal").style.display = "none";
}

//menu select
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
//slide
    let startX = 0;
let endX = 0;

const slider = document.querySelector(".slider");

slider.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
}, { passive:true });

slider.addEventListener("touchmove", e => {
  endX = e.touches[0].clientX;
  e.preventDefault(); // 🔥 scroll-ды тоқтатады
}, { passive:false });

slider.addEventListener("touchend", () => {
  let diff = startX - endX;

  if(Math.abs(diff) > 40){
    if(diff > 0){
      nextSlide();
    } else {
      prevSlide();
    }
  }
});

/* SLIDES */
let slides=document.querySelectorAll(".slide");
let index=0;
let currentLang="kz";

/* 🔥 AUDIO MAP (ең маңызды бөлік) */
const audioMap = {
  0:{
    kz:"mp.mp3",
    ru:"mp2.mp3",
    en:"mp.mp3"
  },
  1:{
    kz:"mp.mp3",
    ru:"mp2.mp3",
    en:"mp.mp3"
  },
  2:{
    kz:"audio3-kz.mp3",
    ru:"audio3-ru.mp3",
    en:"audio3-en.mp3"
  },
  3:{
  kz:"mp.mp3",
  ru:"mp2.mp3",
  en:"audio3-en.mp3"
  },
  4:{
  kz:"mp.mp3",
  ru:"mp2.mp3",
  en:"audio3-en.mp3"
  },
  5:{
  kz:"mp.mp3",
  ru:"mp2.mp3",
  en:"audio3-en.mp3"
  },
  6:{
  kz:"mp.mp3",
  ru:"mp2.mp3",
  en:"audio3-en.mp3"
  },
  7:{
  kz:"mp.mp3",
  ru:"mp2.mp3",
  en:"audio3-en.mp3"
  },
  8:{
  kz:"mp.mp3",
  ru:"mp2.mp3",
  en:"audio3-en.mp3"
  },
  9:{
  kz:"mp.mp3",
  ru:"mp2.mp3",
  en:"audio3-en.mp3"
  },
  10:{
  kz:"mp.mp3",
  ru:"mp2.mp3",
  en:"audio3-en.mp3"
  },
  11:{
  kz:"mp.mp3",
  ru:"mp2.mp3",
  en:"audio3-en.mp3"
  },
  12:{
  kz:"mp.mp3",
  ru:"mp2.mp3",
  en:"audio3-en.mp3"
  },
};


/* SLIDE */
function showSlide(i){
  slides.forEach(s => s.classList.remove("active"));
  slides[i].classList.add("active");
  updateAudio();
}

function nextSlide(){
  index = (index + 1) % slides.length;
  showSlide(index);
}

function prevSlide(){
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}

/* 🔥 AUDIO UPDATE */
function updateAudio(){
  let audio = slides[index].querySelector("audio");

  if(audioMap[index]){
    audio.src = audioMap[index][currentLang];
    audio.load();
  }
}
function setLang(lang){
  botLang = lang;
  currentLang = lang; // 🔥 МІНЕ ОСЫ ЖОҚ

  document.querySelectorAll("[data-key]").forEach(el=>{
    let key = el.getAttribute("data-key");

    if(texts[lang][key]){
      if(el.querySelector(".arrow")){
        el.childNodes[0].nodeValue = texts[lang][key] + " ";
      } else {
        el.textContent = texts[lang][key];
      }
    }
  });

  // 🔥 АУДИОНЫ ЖАҢАРТУ
  updateAudio();
}
/* 🔥 DETAIL PAGE */ 
function goDetail(page){
window.location.href = page; 
} 
  let lang="kz";

const texts = {
  kz:{
    M1:"Басты бет",
    M2:"Турлар жайлы",
    M21:"ҚАЗІРГІ ШЫМКЕНТ",
    M22:"ҚАЛАНЫҢ ӘІО",
    M23:"ТАНЫМДЫҚ ТУР",
    M24:"ТАРИХИ ҚАЛА",
    M25:"ҚАЖЫЛЫҚ ҚАЛАСЫ",
    M26:"ЕСКЕ АЛУ ЖӘНЕ МӘДЕНИЕТ БАҒЫТЫ",
    M3:"Біз туралы",
    M4:"Байланыс",
    T0:"ҚАЗІРГІ ШЫМКЕНТ",
    T1:"«SHYM CITY» саябағы",
    T2:"Шымкент қаласындағы 45 гектардан асатын ірі демалыс және көрікті орын. Ол қала тұрғындары мен қонақтарына серуендеуге, спортпен айналысуға және отбасымен демалуға арналған.",
    T3:"Qyzgaldaq saraiy",
    T4:"«Qyzgaldaq saraiy» — Шымкент қаласындағы заманауи көпфункциялы концерттік кешен. Ол халықаралық кездесулер, фестивальдер, симпозиумдар және ірі мәдени іс-шараларды өткізуге арналған.",
    T5:"«Бәйдібек би» ескерткіші",
    T6:"«Бәйдібек би» ескерткіші — Шымкент қаласындағы ең биік әрі маңызды тарихи нысандардың бірі. Ол қаланың солтүстік бөлігіндегі 220 метр биіктіктегі төбеге орнатылған.",
    T7:"«Қазына» этно-тарихи кешені",
    T8:"Шымкент қаласындағы ірі мәдени-танымдық орын, 2012 жылы ашылып, 75 гектар аумақты қамтиды. Ол жасыл желекке оранған кең аймақта орналасып, тарих пен заманауи демалысты біріктіреді.",
    T9:"Қазақ хандығының 550 жылдығы монументі",
    T10:"Қазақ хандығының 550 жылдығы монументі-2015 жылдың қазан айында 'Қазына'этно-тарихи кешенін құру шеңберінде ашылған 15 метрлік ескерткіш. Ол тарихи сабақтастықты бейнелейтін ұлттық ою-өрнектері мен рельефтері бар екі аркадан тұрады.",
    T11:"Шымкенттің тарихи-өлкетану мұражайы",
    T12:"Шымкенттің тарихи-өлкетану мұражайы 1920 жылы негізі қаланған және қаланың маңызды мәдени орталықтарының бірі болып табылады. 100 жылға жуық тарихы бар бұл мұражайдың басты мақсаты — келушілерді өңірдің табиғаты, тарихы мен мәдениетімен таныстыру.",
    T13:"Әдет-ғұрып және салт-дәстүр орталығы",
    T14:"Әдет-ғұрып және салт-дәстүр орталығы 2014 жылдың желтоқсан айында Республикамыз бойынша тұңғыш рет шырайлы Шымқаламызда ашылды. Бұл еліміздің өзге өңірлері мен облыстарында жоқ бірегей орталық.",
    T15:"Наурыз алаңы",
    T16:"Шымкентте қаланың шырайына шырай қосқан көрікті мекендердің қатары уақыт өткен сайын көбейіп келеді. Сондай сәулетті орындардың бірі – «Наурыз» алаңы. «Наурыз» алаңы 1 гектардан астам аумақты қамтиды.",
    T17:"Жайлау көл",
    T18:"«Жайлау көл» демалыс аймағында орналасқан «Shymkent Altyn Eye» — биіктігі 50 метр болатын алып айналмалы аттракцион. Ол 18 жабық кабинамен жабдықталып, бір мезетте 108 адамды қабылдай алады.",
    T19:"Шымкент хайуанаттар бағы",
    T20:"Шымкент хайуанаттар бағы — табиғатты жақыннан танып, сирек және экзотикалық жануарларды көруге мүмкіндік беретін ерекше орын. Ол тек демалыс аймағы емес, сонымен қатар экологиялық және білім беру орталығы.",
    T21:"Асанбай Асқаров атындағы дендрологиялық саябақ",
    T22:"Асанбай Асқаров атындағы дендрологиялық саябақ — Шымкенттің ең ірі әрі бірегей жасыл аймақтарының бірі. 1979 жылы бұрынғы қоқыс орнының орнына салынған бұл саябақ бүгінде 120 гектар аумақты алып жатыр.",
    T23:"«Қасірет» мемориалды кешені",
    T24:"«Қасірет» мемориалды кешені — саяси қуғын-сүргін құрбандарына арналған тарихи орын. Ол 1937–1938 жылдары көптеген адамдар атылған Албастысай аумағында орналасқан.",
    marshut:"📍 Маршрут",
    C1:"КАРТАДАН ҚАРАУ",
    C2:"КАРТАДАН ҚАРАУ",
    C3:"КАРТАДАН ҚАРАУ",
    C4:"КАРТАДАН ҚАРАУ",
    C5:"КАРТАДАН ҚАРАУ",
    C6:"КАРТАДАН ҚАРАУ",
    C7:"КАРТАДАН ҚАРАУ",
    C8:"КАРТАДАН ҚАРАУ",
    C9:"КАРТАДАН ҚАРАУ",
    C10:"КАРТАДАН ҚАРАУ",
    C11:"КАРТАДАН ҚАРАУ",
    C12:"КАРТАДАН ҚАРАУ",
    Poroda:"🌦️ Ауа райы",
    Toligral1:"Толығырақ",
    Toligral2:"Толығырақ",
    Toligral3:"Толығырақ",
    Toligral4:"Толығырақ",
    Toligral5:"Толығырақ",
    Toligral6:"Толығырақ",
    Toligral7:"Толығырақ",
    Toligral8:"Толығырақ",
    Toligral9:"Толығырақ",
    Toligral10:"Толығырақ",
    Toligral11:"Толығырақ",
    Toligral12:"Толығырақ",
    mesto1:"«SHYM CITY» саябағы — жалпы аумағы 45 гектардан асатын, қаланың басты көрікті жерлерінің бірі. Саябақ үш аймаққа бөлінген: оңтүстік, орталық және солтүстік, әрқайсысы демалыс пен көңіл көтеруге арналған. Оңтүстік аймақта 10 метрлік арка мен «Тюльпан» фонтаны орналасқан. Саябақ аумағында жаяу жүргіншілер аллеялары, велосипед және жүгіру жолдары, сондай-ақ демалушыларға арналған орындықтар, спорт алаңдары мен балалар ойын кешендері бар. Орталық бөлігінде көлемі 5800 шаршы метр жасанды көл орналасқан, оның айналасында фудкорт бар. Сонымен қатар, мәдени іс-шаралар мен концерттер өтетін амфитеатр қарастырылған. Белсенді демалыс үшін аттракциондар, футбол, баскетбол, волейбол алаңдары және скейт-парк бар. Солтүстік аймақ тыныш серуендеуге және табиғатта демалуға арналған. Саябақ қала тұрғындары мен қонақтары үшін жайлы әрі белсенді демалыс орны болып табылады.",
    Keri:"Кері қайту",
    mesto2:"«Qyzgaldaq saraiy» — заманауи сәулет пен көпфункциялы форматты үйлестірген концерттік кешен. Ол халықаралық кездесулер, симпозиумдар, мәдени фестивальдер және ірі іс-шараларды өткізуге арналған. Үш қабатты ғимараттың жалпы аумағы 17 964 м², ал негізгі зал 2 066 адамға дейін қабылдай алады. Сонымен қатар 190 орындық конференц-зал бар. Кешен заманауи жарық, дыбыс және сахна жабдықтарымен толық қамтылған және халықаралық стандарттарға сай келеді. Интерьері кең, VIP-аймақтары мен ыңғайлы орындықтары көрермендерге жоғары жайлылық сыйлайды. Нысан атауы Шымкенттің символы — қызғалдаққа байланысты берілген.",
    mesto3:"«Бәйдібек би» ескерткіші — Шымкент қаласындағы ең биік монументтердің бірі. Ол қаланың солтүстік бөлігіндегі 220 метрлік ең биік нүктеге орнатылған. Ескерткіштің жалпы биіктігі 23 метр, оның ішінде мүсіннің өзі 10 метрді құрайды. Жалпы салмағы 9 тонна болатын монумент 20 күн ішінде жасалған. Бәйдібек Қарашаұлы (1356–1419) — қазақ халқының биі әрі батыры, Ұлы жүздің көптеген руларының бастаушысы ретінде белгілі. Ол Әмір Темірдің серігі болған және әділдігі, даналығы, шешендігімен танылған тарихи тұлға.",
    mesto4:"«Қазына» этно-тарихи кешені Шымкент қаласындағы Байдібек би даңғылында, жасыл желекке оранған кең аумақта орналасқан. 2012 жылы ашылған бұл кешен 75 гектар жерді қамтитын ірі мәдени-танымдық орталық болып табылады. Кешен аумағында қаланың басты символдарының бірі — Бәйдібек би ескерткіші орналасқан. Сонымен қатар, Қазақ хандығының 550 жылдығына арналған монументтік композиция бар, ол ұлттық өрнектермен безендірілген аркалар мен бірлікті білдіретін шаңырақтан тұрады. Мұнда Түркістан облысының 27 тарихи-мәдени ескерткіштерінің макеттері қойылған этнопарк та бар. Бұл жер арқылы Оңтүстік Қазақстанның бай тарихымен танысуға болады. Кешеннің төменгі бөлігінде «Наурыз» алаңы орналасқан. Бұл жерде жыл сайын мерекелік іс-шаралар, концерттер мен ұлттық ойындар өткізіледі.",
    mesto5:"Қазақ хандығының 550 жылдығы монументі 2015 жылдың қазан айында «Қазына» этно-тарихи кешені аясында ашылған 15 метрлік ескерткіш. Ол тарихи сабақтастықты білдіретін ұлттық ою-өрнектермен безендірілген екі аркадан тұрады. Монумент Бәйдібек би даңғылы аумағында орналасқан.",
    mesto6:"Тарихи-өлкетану мұражайы 1920 жылы құрылған және қаланың маңызды мәдени орталықтарының бірі болып табылады. 96 жылдан астам тарихы бар мұражайдың негізгі мақсаты – жергілікті тұрғындар мен қонақтарды қаланың табиғаты, тарихы және мәдениетімен таныстыру. Бүгінде мұражай қорында 93 000-нан астам жәдігер сақталған. Олар табиғат, археология, қару-жарақ, бейнелеу өнері, фотоқұжаттар және басқа да топтарға бөлінген. Мұражайға жыл сайын 100 мыңнан астам адам келеді.",
    mesto7:"Әдет-ғұрып және салт-дәстүр орталығы 2014 жылдың желтоқсан айында Республикамыз бойынша тұңғыш рет шырайлы Шымқаламызда ашылды. Бұл еліміздің өзге өңірлері мен облыстарында жоқ бірегей орталық. Мұнда ұлттық салт-дәстүр, әдет-ғұрыптарымызға байланысты жан-жақты ғылыми-зерттеу және әдістемелік жұмыстар жүйелі жүргізіледі.",
    mesto8:"Наурыз алаңы - Шымкентте қаланың шырайына шырай қосқан көрікті мекендердің қатары уақыт өткен сайын көбейіп келеді. Сондай сәулетті орындардың бірі – «Наурыз» алаңы. «Наурыз» алаңы 1 гектардан астам аумақты қамтиды. Облыстық бюджет есебінен қаржыландырылған бұл нысанға 100 млн. теңге жұмсалған. Бұл аумақта «Ауылым – алтын бесігім» атты барельефті композициясы, қазақтың салт-дәстүрін көрсететін «Көкпаршы», «Қыз қуу», «Теңге алу», «Бүркітші» кейіптері көрсетілген сәулеттік декоративтік элементтер орналастырылған.",
    mesto9:"«Жайлау көл» демалыс аймағында 50 метр биіктіктегі «Shymkent Altyn Eye» аттракционы орналасқан. Ол 18 жабық кабиналармен жабдықталған және 108 адамға арналған. Әр кабинада қыста жылытқыш, жазда салқындатқыш жүйе бар. Қозғалыс кезінде аудио-экскурсия жұмыс істейді. Толық айналым уақыты – 15 минут. 50 метр биіктіктен Шымкент қаласын толық көруге болады. Бұл ТМД-дағы ең биік айналмалы дөңгелектердің бірі және Азиядағы ірі аттракциондардың қатарына кіреді. Сонымен қатар, саябақта тағы 15 түрлі ойын аттракционы бар.",
    mesto10:"Шымкент хайуанаттар бағы – табиғатты жақыннан танып, экзотикалық жануарларды көруге мүмкіндік беретін ерекше орын. Ол тек демалыс орны ғана емес, сонымен қатар биологиялық әртүрлілікті сақтауға және табиғатты танытуға бағытталған экологиялық орталық. Хайуанаттар бағы 1979 жылы жоспарланып, 1980 жылы ашылған. Жалпы аумағы 54 гектарды құрайды. Алғашында 75 түрлі жануар мен құс түрі болған, қазіргі таңда олардың саны артып келеді. Негізгі мақсаттарының бірі – Қызыл кітапқа енген жануарларды қорғау және көбейту. 2010 жылдан бастап зообақ Еуразиялық хайуанаттар бақтары мен аквариумдар ассоциациясының мүшесі болып табылады. Мұнда жолбарыс, арыстан, бұғы, арқар, пони сияқты жануарларды көруге болады.",
    mesto11:"Асанбай Асқаров атындағы дендрологиялық саябақ — Шымкент қаласындағы ең ірі және ерекше саябақтардың бірі. Ол 1979 жылы бұрынғы қоқыс орнының орнында салынған және 120 гектар аумақты алып жатыр. Саябақта шамамен 80 мың ағаш және 1360-тан астам бұта түрі өседі. Мұнда Қазақстанда алғаш рет Солтүстік Америкадан әкелінген қызғалдақтар өсірілген. Ерекше орындарының бірі — «Атақты тұлғалар аллеясы», онда белгілі тарихи тұлғалар ағаш отырғызған. 2016 жылы саябаққа Асанбай Асқаровтың есімі берілді. Бүгінде бұл — демалуға, серуендеуге және спортпен айналысуға арналған танымал орын.",
    mesto12:"«Қасірет» мемориалды кешені саяси қуғын-сүргін құрбандарына арналған және Албастысайда орналасқан. 1937–1938 жылдары бұл жерде көптеген адамдар қаза тапқан. Қазақстанда 101 мың адам қуғын-сүргінге ұшырап, 27 мыңы атылған, олардың ішінде Оңтүстік Қазақстаннан да көптеген азаматтар болған. Ескерткіш қатаң стильде жасалған: темір торлар, мәрмәр тастар, жылаған көз бейнесі және ана мен бала мүсіні бар. Қасында құрбандар жерленген орын белгіленген. Айналасында тыныш мемориалды саябақ орналасқан. Бұл жер тарихты еске салып, бейбіт өмірдің құндылығын көрсетеді. 31 мамыр – саяси қуғын-сүргін құрбандарын еске алу күні.",
},
  ru:{
    M1:"Главная",
    M2:"О турах",
    M21:"СОВРЕМЕННЫЙ ШЫМКЕНТ",
    M22:"ГОРОДСКОЙ АДО",
    M23:"ПОЗНАВАТЕЛЬНЫЙ ТУР",
    M24:"ИСТОРИЧЕСКИЙ ГОРОД",
    M25:"СВЯЩЕННЫЙ ГОРОД",
    M26:"ПАМЯТЬ И КУЛЬТУРА",
    M3:"О нас",
    M4:"Контакты",
T0:"СОВРЕМЕННЫЙ ШЫМКЕНТ",
T1:"Парк «SHYM CITY»",
T2:"Крупная зона отдыха и достопримечательность в Шымкенте площадью более 45 гектаров. Предназначена для прогулок, занятий спортом и семейного отдыха жителей и гостей города.",
T3:"Qyzgaldaq saraiy",
T4:"«Qyzgaldaq saraiy» — современный многофункциональный концертный комплекс в Шымкенте. Предназначен для проведения международных встреч, фестивалей, симпозиумов и крупных культурных мероприятий.",
T5:"Памятник Бәйдібек би",
T6:"Памятник Бәйдібек би — один из самых высоких и значимых исторических объектов Шымкента. Установлен на холме высотой 220 метров в северной части города.",
T7:"Этно-исторический комплекс «Қазына»",
T8:"Крупный культурно-познавательный объект в Шымкенте, открытый в 2012 году и занимающий территорию 75 гектаров. Расположен в зелёной зоне и сочетает историю и современный отдых.",
T9:"Монумент 550-летия Казахского ханства",
T10:"Монумент 550-летия Казахского ханства — 15-метровый памятник, открытый в октябре 2015 года в рамках создания этно-исторического комплекса «Қазына». Состоит из двух арок с национальными орнаментами и рельефами.",
T11:"Шымкентский историко-краеведческий музей",
T12:"Шымкентский историко-краеведческий музей основан в 1920 году и является одним из важных культурных центров города. Его основная цель — знакомство посетителей с природой, историей и культурой региона.",
T13:"Центр обычаев и традиций",
T14:"Центр обычаев и традиций был открыт в декабре 2014 года в Шымкенте и стал первым подобным учреждением в стране. Это уникальный центр, не имеющий аналогов в других регионах.",
T15:"Площадь Наурыз",
T16:"В Шымкенте с каждым годом увеличивается количество красивых мест, украшающих город. Одним из таких является площадь «Наурыз», занимающая более 1 гектара.",
T17:"Озеро Жайлау",
T18:"В зоне отдыха «Жайлау көл» расположен аттракцион «Shymkent Altyn Eye» высотой 50 метров. Он оснащён 18 закрытыми кабинами и может одновременно принимать до 108 человек.",
T19:"Шымкентский зоопарк",
T20:"Шымкентский зоопарк — уникальное место, где можно познакомиться с природой и увидеть редких и экзотических животных. Это также экологический и образовательный центр.",
T21:"Дендропарк имени Асанбая Аскарова",
T22:"Дендропарк имени Асанбая Аскарова — один из крупнейших и уникальных зелёных парков Шымкента. Основан в 1979 году на месте бывшей свалки и занимает 120 гектаров.",
T23:"Мемориальный комплекс «Қасірет»",
T24:"Мемориальный комплекс «Қасірет» — историческое место, посвящённое жертвам политических репрессий. Расположен в районе Албастысай, где в 1937–1938 годах были расстреляны люди.",
    
marshut:"📍 Маршрут",

C1:"СМОТРЕТЬ НА КАРТЕ",
C2:"СМОТРЕТЬ НА КАРТЕ",
C3:"СМОТРЕТЬ НА КАРТЕ",
C4:"СМОТРЕТЬ НА КАРТЕ",
C5:"СМОТРЕТЬ НА КАРТЕ",
C6:"СМОТРЕТЬ НА КАРТЕ",
C7:"СМОТРЕТЬ НА КАРТЕ",
C8:"СМОТРЕТЬ НА КАРТЕ",
C9:"СМОТРЕТЬ НА КАРТЕ",
C10:"СМОТРЕТЬ НА КАРТЕ",
C11:"СМОТРЕТЬ НА КАРТЕ",
C12:"СМОТРЕТЬ НА КАРТЕ",
Poroda:"🌦️Погода",
Toligral1:"Подробнее",
  Toligral2:"Подробнее",
  Toligral3:"Подробнее",
  Toligral4:"Подробнее",
  Toligral5:"Подробнее",
  Toligral6:"Подробнее",
  Toligral7:"Подробнее",
  Toligral8:"Подробнее",
  Toligral9:"Подробнее",
  Toligral10:"Подробнее",
  Toligral11:"Подробнее",
  Toligral12:"Подробнее",
  mesto1:"Парк «SHYM CITY» — одна из главных достопримечательностей города площадью более 45 гектаров. Он разделён на три зоны: южную, центральную и северную, каждая из которых предназначена для отдыха и развлечений. В южной части расположены 10-метровая арка и фонтан «Тюльпан». В парке есть прогулочные аллеи, велосипедные и беговые дорожки, скамейки, спортивные площадки и детские игровые комплексы. Центральная часть включает искусственное озеро площадью 5800 кв. м, вокруг которого находится фудкорт. Также здесь есть амфитеатр для проведения культурных мероприятий и концертов. Для активного отдыха предусмотрены аттракционы, футбольные, баскетбольные и волейбольные площадки, а также скейт-парк. Северная зона идеально подходит для спокойных прогулок и отдыха на природе. Парк является комфортным местом для жителей и гостей города.",
  Keri:"Назад",   
  mesto2:"«Qyzgaldaq saraiy» — это современный концертный комплекс, сочетающий в себе инновационную архитектуру и многофункциональный формат. Он предназначен для проведения международных встреч, симпозиумов, культурных фестивалей и крупных мероприятий. Трёхэтажное здание имеет общую площадь 17 964 м², а основной концертный зал вмещает до 2 066 человек. Также предусмотрен конференц-зал на 190 мест. Комплекс полностью оснащён современным световым, звуковым и сценическим оборудованием и соответствует международным стандартам. Просторный интерьер, VIP-зоны и удобные сиденья обеспечивают высокий уровень комфорта для зрителей. Название объекта связано с символом Шымкента — тюльпаном.",
  mesto3:"Монумент «Байдибек би» — один из самых высоких памятников в городе Шымкент. Он установлен на самой высокой точке северной части города, на высоте 220 метров. Общая высота монумента составляет 23 метра, из которых 10 метров занимает сама скульптура. Памятник весом 9 тонн был создан в рекордные сроки — за 20 дней. Байдибек Карашаулы (1356–1419) — известный бий и батыр казахского народа, один из легендарных предводителей родов Старшего жуза. Он был соратником Амира Темура (Тамерлана) и прославился своей справедливостью, мудростью и красноречием.",
  mesto4:"Этно-исторический комплекс «Қазына» расположен на проспекте Байдибек би в Шымкенте, на большой зелёной территории. Он был открыт в 2012 году и занимает площадь 75 гектаров, являясь крупным культурно-познавательным центром. На территории комплекса находится один из символов города — монумент Байдибек би. Также здесь расположена мемориальная композиция, посвящённая 550-летию Казахского ханства, включающая арки с национальными орнаментами и символ единства — шаңырақ. В комплексе работает этнопарк с макетами 27 историко-культурных памятников Туркестанской области, позволяющий познакомиться с богатым наследием региона. В нижней части находится площадь «Наурыз», где проходят праздничные мероприятия, концерты и национальные игры.",
  mesto5:"Монумент к 550-летию Казахского ханства был открыт в октябре 2015 года в рамках этно-исторического комплекса «Қазына». Это 15-метровый памятник, состоящий из двух арок, украшенных национальными орнаментами, символизирующими историческую преемственность. Монумент расположен на проспекте Байдибек би.",
  mesto6:"Историко-краеведческий музей был основан в 1920 году и является одним из главных культурных центров города. Более 96 лет его главная задача — знакомить жителей и гостей с природой, историей и культурой региона. Сегодня в фондах музея хранится более 93 000 экспонатов, разделённых по категориям: природа, археология, оружие, изобразительное искусство, фотодокументы и другие. Ежегодно музей посещают более 100 тысяч человек.",
  mesto7:"Центр обычаев и традиций был открыт в декабре 2014 года впервые в Республике в нашем прекрасном городе Шымкент. Это уникальный центр, которого нет в других регионах и областях страны. Здесь системно проводятся научно-исследовательские и методические работы, связанные с национальными традициями и обычаями казахского народа.",
  mesto8:"Площадь «Наурыз» в Шымкенте является одним из красивых мест города, которые с каждым годом придают ему всё больше привлекательности. Одним из таких архитектурных объектов является площадь «Наурыз». Она занимает территорию более 1 гектара. На строительство объекта, профинансированного из областного бюджета, было потрачено 100 млн тенге. На этой территории размещена барельефная композиция «Ауылым – алтын бесігім», а также архитектурно-декоративные элементы, отражающие казахские традиции: «Көкпаршы», «Қыз қуу», «Теңге алу», «Бүркітші».",
  mesto9:"В зоне отдыха «Жайлау көл» расположен аттракцион «Shymkent Altyn Eye» высотой 50 метров. Он оснащён 18 закрытыми кабинами и рассчитан на 108 человек. В каждой кабине есть отопление и охлаждение. Во время поездки работает аудио-экскурсия. Полный оборот занимает 15 минут. С высоты 50 метров можно увидеть весь город. Это одно из самых высоких колес обозрения в СНГ и крупный аттракцион в Азии. Также в парке есть ещё 15 игровых аттракционов.",
  mesto10:"Шымкентский зоопарк — это уникальное место, где можно ближе познакомиться с природой и увидеть экзотических животных. Это не только зона отдыха, но и экологический центр, направленный на сохранение биологического разнообразия и ознакомление будущих поколений с природой. Решение о создании зоопарка было принято в 1979 году, а официальное открытие состоялось в 1980 году. Общая площадь составляет 54 гектара. Изначально здесь содержалось 75 видов животных и птиц, сегодня их количество увеличивается. Одной из главных задач является сохранение и разведение животных, занесённых в Красную книгу. С 2010 года зоопарк является членом Евразийской ассоциации зоопарков и аквариумов. Здесь можно увидеть тигра, льва, оленя, архара, пони и других животных.",
  mesto11:"Дендропарк имени Асанбая Аскарова — один из крупнейших и уникальных парков Шымкента. Он был создан в 1979 году на месте бывшей свалки и занимает 120 гектаров. парке растёт около 80 тысяч деревьев и более 1360 видов кустарников, включая редкие и экзотические растения. Здесь впервые в Казахстане были выращены тюльпаны, завезённые из Северной Америки. Особое место занимает «Аллея знаменитых личностей», где деревья сажали известные исторические деятели. В 2016 году парку было присвоено имя Асанбая Аскарова. Сегодня это популярное место для отдыха, прогулок и занятий спортом.",
  mesto12:"Мемориальный комплекс «Қасірет» посвящён жертвам политических репрессий и расположен в Албастысай. В 1937–1938 годах здесь погибло много людей. В Казахстане было репрессировано 101 000 человек, 27 000 из них расстреляны, включая жителей Южного Казахстана. Памятник выполнен в строгом стиле: металлические решётки, мраморные блоки, изображение плачущих глаз и скульптура матери с ребёнком. Рядом отмечено место захоронения жертв. Вокруг создан тихий мемориальный парк. Он напоминает о трагедии и ценности мира. 31 мая — день памяти жертв репрессий.",
},
  en:{
    M1:"Home",
    M2:"About tours",
    M21:"MODERN SHYMKENT",
    M22:"CITY ADMINISTRATIVE CENTER",
    M23:"EDUCATIONAL TOUR",
    M24:"HISTORICAL CITY",
    M25:"SACRED CITY",
    M26:"MEMORY & CULTURE",
    M3:"About us",
    M4:"Contact",
T0:"MODERN SHYMKENT",
T1:"“SHYM CITY” Park",
T2:"A large recreational and sightseeing area in Shymkent covering more than 45 hectares. Designed for walking, sports, and family recreation for residents and visitors.",
T3:"Qyzgaldaq saraiy",
T4:"“Qyzgaldaq saraiy” is a modern multifunctional concert complex in Shymkent. It is designed for international meetings, festivals, symposiums, and major cultural events.",
T5:"Monument to Baidibek Bi",
T6:"The Baidibek Bi monument is one of the tallest and most significant historical landmarks in Shymkent. It is located on a 220-meter-high hill in the northern part of the city.",
T7:"“Kazyna” Ethno-Historical Complex",
T8:"A major cultural and educational site in Shymkent, opened in 2012 and covering 75 hectares. It is located in a green area and combines history with modern recreation.",
T9:"Monument of the 550th Anniversary of the Kazakh Khanate",
T10:"The monument of the 550th anniversary of the Kazakh Khanate is a 15-meter structure opened in October 2015 as part of the “Kazyna” ethno-historical complex. It consists of two arches with national ornaments and reliefs.",
T11:"Shymkent Regional History Museum",
T12:"The Shymkent Regional History Museum was founded in 1920 and is one of the city's important cultural centers. Its main goal is to introduce visitors to the region’s nature, history, and culture.",
T13:"Center of Customs and Traditions",
T14:"The Center of Customs and Traditions was opened in December 2014 in Shymkent and became the first of its kind in the country. It is a unique center with no аналогues in other regions.",
T15:"Nauryz Square",
T16:"In Shymkent, the number of beautiful places enhancing the city's appearance is growing every year. One of them is Nauryz Square, covering more than 1 hectare.",
T17:"Zhaylau Lake",
T18:"In the Zhaylau recreation area, the “Shymkent Altyn Eye” attraction stands 50 meters tall. It has 18 enclosed cabins and can accommodate up to 108 people at once.",
T19:"Shymkent Zoo",
T20:"Shymkent Zoo is a unique place where visitors can explore nature and see rare and exotic animals. It is also an ecological and educational center.",
T21:"Asanbai Askarov Dendrological Park",
T22:"The Asanbai Askarov Dendrological Park is one of the largest and most unique green parks in Shymkent. Established in 1979 on a former landfill, it now covers 120 hectares.",
T23:"“Kasiret” Memorial Complex",
T24:"The “Kasiret” memorial complex is a historical site dedicated to victims of political repression. It is located in the Albastysay area where executions took place in 1937–1938.",
marshut:"📍 Route",

C1:"VIEW ON MAP",
C2:"VIEW ON MAP",
C3:"VIEW ON MAP",
C4:"VIEW ON MAP",
C5:"VIEW ON MAP",
C6:"VIEW ON MAP",
C7:"VIEW ON MAP",
C8:"VIEW ON MAP",
C9:"VIEW ON MAP",
C10:"VIEW ON MAP",
C11:"VIEW ON MAP",
C12:"VIEW ON MAP",
Poroda:"🌦️ Weather",
Toligral1:"More details",
  Toligral2:"More details",
  Toligral3:"More details",
  Toligral4:"More details",
  Toligral5:"More details",
  Toligral6:"More details",
  Toligral7:"More details",
  Toligral8:"More details",
  Toligral9:"More details",
  Toligral10:"More details",
  Toligral11:"More details",
  Toligral12:"More details",
  mesto1:"“SHYM CITY” Park is one of the city’s main attractions, covering more than 45 hectares. It is divided into three zones: southern, central, and northern, each designed for recreation and entertainment. The southern zone features a 10-meter arch and the “Tulip” fountain. The park includes walking alleys, cycling and running paths, benches, sports grounds, and children’s playgrounds. The central area includes an artificial lake of 5,800 square meters, surrounded by a food court. There is also an amphitheater for cultural events and concerts. For active recreation, the park offers attractions, football, basketball, and volleyball courts, as well as a skate park. The northern zone is ideal for peaceful walks and enjoying nature. The park provides a comfortable and active leisure space for both residents and visitors.",
  Keri:"Back",
  mesto2:"“Qyzgaldaq saraiy” is a modern concert complex that combines innovative architecture with a multifunctional format. It is designed for international meetings, symposiums, cultural festivals, and large-scale events. The three-story building has a total area of 17,964 m², and the main concert hall can accommodate up to 2,066 people. There is also a 190-seat conference hall. The complex is fully equipped with modern lighting, sound, and stage systems and meets international standards. Its spacious interior, VIP areas, and comfortable seating provide a high level of comfort for visitors. The name of the venue is inspired by the tulip, the symbol of Shymkent.",
  mesto3:"The “Baidibek Bi” monument is one of the tallest landmarks in the city of Shymkent. It is located at the highest point in the northern part of the city, at an elevation of 220 meters. The total height of the monument is 23 meters, with the sculpture itself being 10 meters tall. The 9-ton monument was built in a record time of 20 days. Baidibek Karashauly (1356–1419) was a well-known judge (bi) and warrior of the Kazakh people, and one of the legendary leaders of the Senior Zhuz clans. He was a companion of Amir Timur (Tamerlane) and was known for his justice, wisdom, and eloquence.",
  mesto4:"The “Kazyna” ethnographic and historical complex is located on Baidibek Bi Avenue in Shymkent, in a large green area. It was opened in 2012 and covers 75 hectares, becoming a major cultural and educational center. The complex features the Baidibek Bi monument, one of the city’s main symbols, as well as a memorial dedicated to the 550th anniversary of the Kazakh Khanate, including arches decorated with national ornaments and a shanyrak symbolizing unity. There is also an ethnopark with models of 27 historical and cultural monuments from the Turkestan region, showcasing the rich heritage of Southern Kazakhstan. At the lower part of the complex is the “Nauryz” square, where festivals, concerts, and national games are regularly held.",
  mesto5:"The monument dedicated to the 550th anniversary of the Kazakh Khanate was opened in October 2015 as part of the “Kazyna” ethnographic and historical complex. It is a 15-meter structure consisting of two arches decorated with national ornaments symbolizing historical continuity. The monument is located on Baidibek Bi Avenue.",
  mesto6:"The Historical and Local Lore Museum was founded in 1920 and is one of the main cultural centers of the city. With over 96 years of history, its main purpose is to introduce locals and visitors to the nature, history, and culture of the region. Today, the museum holds more than 93,000 exhibits, divided into categories such as nature, archaeology, weapons, fine arts, photo documents, and others. The museum is visited by over 100,000 people annually.",
  mesto7:"The Center of Customs and Traditions was opened in December 2014 for the first time in the Republic in our beautiful city of Shymkent. It is a unique center that does not exist in other regions and provinces of the country. Here, comprehensive scientific research and methodological work related to national traditions and customs is systematically carried out.",
  mesto8:"The “Nauryz” Square in Shymkent is one of the city’s beautiful places that continues to enhance its charm over time. One of such architectural sites is the “Nauryz” Square. It covers an area of more than 1 hectare. The project, funded by the regional budget, cost 100 million tenge. The area features a bas-relief composition called “Auылым – алтын бесігім,” as well as architectural and decorative elements representing Kazakh traditions such as “Kokpar,” “Kyz Kuu,” “Tenge Alu,” and “Berkutshi.”",
  mesto9:"In the “Zhaylau Kol” recreation area, the “Shymkent Altyn Eye” attraction is 50 meters high. It has 18 enclosed cabins and can carry 108 people. Each cabin is equipped with heating and cooling. During the ride, an audio guide operates. One full rotation takes 15 minutes. From 50 meters high, visitors can see the whole city. It is one of the tallest Ferris wheels in the CIS and a major attraction in Asia. The park also includes 15 other amusement rides.",
  mesto10:"The Shymkent Zoo is a unique place where visitors can closely explore nature and see exotic animals. It is not only a recreational area but also an ecological center aimed at preserving biodiversity and introducing nature to future generations. The decision to build the zoo was made in 1979, and it officially opened in 1980. Its total area is 54 hectares. Initially, it housed 75 species of animals and birds, and today their number continues to grow. One of its main goals is the conservation and breeding of species listed in the Red Book. Since 2010, the zoo has been a member of the Eurasian Association of Zoos and Aquariums. Visitors can see animals such as tigers, lions, deer, argali, ponies, and others.",
  mesto11:"The A. Askarov Dendrological Park is one of the largest and most unique parks in Shymkent. It was created in 1979 on the site of a former landfill and covers an area of 120 hectares. The park is home to about 80,000 trees and more than 1,360 species of shrubs, including rare and exotic plants. It is also the place where tulips brought from North America were first grown in Kazakhstan. A special feature of the park is the “Alley of Famous Personalities,” where well-known historical figures planted trees. In 2016, the park was officially named after Asanbay Askarov. Today, it is a popular place for recreation, walking, and sports activities.",
  mesto12:"The “Qasiret” Memorial Complex is dedicated to victims of political repression and is located in Albastysai. Many people died there in 1937–1938. In Kazakhstan, 101,000 people were repressed and 27,000 were executed, including people from South Kazakhstan. The monument has a strict design with metal frames, marble blocks, crying eyes, and a sculpture of a mother with a child. The burial site of the victims is marked nearby. A quiet memorial park surrounds the monument. It serves as a reminder of tragedy and the value of peace. May 31 is the Day of Remembrance.",

  }
};
