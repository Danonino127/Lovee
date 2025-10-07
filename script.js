// ====== Navegación simple entre paneles ======
const menuBtns = document.querySelectorAll('.menu-btn')
const panels = document.querySelectorAll('.panel')

menuBtns.forEach(b => {
  b.addEventListener('click', () => {
    menuBtns.forEach(x => x.classList.remove('active'))
    b.classList.add('active')
    const t = b.dataset.target
    panels.forEach(p => {
      p.classList.toggle('visible', p.id === t)
    })
  })
})

// ====== Playlist (usa archivos en /audio o reemplaza con URLs) ======
const tracks = [
  // Reemplaza con tus rutas o URLs
  {title: "Canción 1", src: "audio/track1.mp3"},
  {title: "Canción 2", src: "audio/track2.mp3"},
  // Si quieres ejemplos online puedes usar URLs públicas
  // {title:"Ejemplo", src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"}
];

const audio = document.getElementById('audio');
const audioSource = document.getElementById('audioSource');
const trackList = document.getElementById('trackList');
let current = 0;

function renderTracks(){
  trackList.innerHTML = ''
  tracks.forEach((t,i) => {
    const div = document.createElement('div')
    div.className = 'track-item' + (i===current ? ' active' : '')
    div.textContent = t.title
    div.addEventListener('click', ()=> playIndex(i))
    trackList.appendChild(div)
  })
}
function playIndex(i){
  current = i
  audioSource.src = tracks[i].src
  audio.load()
  audio.play()
  renderTracks()
}
document.getElementById('playBtn').addEventListener('click', ()=>{
  if(audio.paused) audio.play() 
  else audio.pause()
})
document.getElementById('prevBtn').addEventListener('click', ()=> {
  current = (current - 1 + tracks.length) % tracks.length
  playIndex(current)
})
document.getElementById('nextBtn').addEventListener('click', ()=> {
  current = (current + 1) % tracks.length
  playIndex(current)
})
audio.addEventListener('ended', ()=> {
  current = (current + 1) % tracks.length
  playIndex(current)
})
renderTracks()

// ====== Collage: lightbox al hacer click en imagen ======
const photoGrid = document.getElementById('photoGrid')
const lightbox = document.getElementById('lightbox')
const lightboxImg = document.getElementById('lightboxImg')
const closeLightbox = document.getElementById('closeLightbox')

photoGrid.addEventListener('click', e => {
  if(e.target.tagName === 'IMG'){
    lightboxImg.src = e.target.src
    lightbox.classList.add('open')
    lightbox.setAttribute('aria-hidden','false')
  }
})
closeLightbox.addEventListener('click', ()=> {
  lightbox.classList.remove('open')
  lightbox.setAttribute('aria-hidden','true')
})
lightbox.addEventListener('click', e => {
  if(e.target === lightbox) {
    lightbox.classList.remove('open')
    lightbox.setAttribute('aria-hidden','true')
  }
})

// ====== Pregunta Sí/No ======
const siBtn = document.getElementById('siBtn')
const noBtn = document.getElementById('noBtn')
const respuesta = document.getElementById('respuesta')

siBtn.addEventListener('click', () => {
  respuesta.textContent = "¡Sí! 🌟 Me encantaría. 💖"
  localStorage.setItem('respuestaRegalo','si')
  explodeConfetti(80)
  showHearts(8)
})

noBtn.addEventListener('click', () => {
  respuesta.textContent = "Oh... ¿En serio? 😅 Aún así gracias por abrir el regalo."
  localStorage.setItem('respuestaRegalo','no')
  shakeElement(noBtn)
})

// recuerda respuesta previa
const prev = localStorage.getItem('respuestaRegalo')
if(prev === 'si') respuesta.textContent = "Ya dijiste Sí anteriormente. 💖"
if(prev === 'no') respuesta.textContent = "Ya dijiste No anteriormente. — Gracias por abrirlo."

// Animaciones auxiliares
function shakeElement(el){
  el.animate([{transform:'translateX(0)'},{transform:'translateX(-8px)'},{transform:'translateX(8px)'},{transform:'translateX(0)'}], {duration:400})
}

// Confetti simple
function explodeConfetti(amount = 60){
  for(let i=0;i<amount;i++){
    const c = document.createElement('div')
    c.className = 'confetti'
    c.style.left = Math.random()*100 + '%'
    c.style.background = randomColor()
    c.style.width = (6 + Math.random()*10) + 'px'
    c.style.height = (8 + Math.random()*12) + 'px'
    c.style.animationDuration = (2 + Math.random()*3) + 's'
    c.style.opacity = 0.95
    document.body.appendChild(c)
    setTimeout(()=> c.remove(), 6000)
  }
}
function randomColor(){
  const colors = ['#FF6B81','#FFD166','#06D6A0','#7C5CFF','#FF8AA3','#FFB86B']
  return colors[Math.floor(Math.random()*colors.length)]
}

// Hearts rising
function showHearts(n=6){
  for(let i=0;i<n;i++){
    const h = document.createElement('div')
    h.textContent = '💖'
    h.style.position = 'fixed'
    h.style.left = (30 + Math.random()*40) + '%'
    h.style.bottom = '20px'
    h.style.fontSize = (18 + Math.random()*18) + 'px'
    h.style.zIndex = 20000
    h.style.opacity = 0.9
    h.style.transform = `translateY(0) scale(${1+Math.random()*0.2})`
    document.body.appendChild(h)
    const dur = 2500 + Math.random()*1500
    h.animate([{transform:'translateY(0) rotate(0)'},{transform:`translateY(-300px) rotate(${Math.random()*360}deg)` , opacity:0}], {duration:dur, easing:'ease-out'})
    setTimeout(()=> h.remove(), dur+50)
  }
}
