'use strict';

const projects = [
  {id:'quiet-geometry',title:'Тихая геометрия',category:'architecture',categoryLabel:'Частный дом',area:'240 м²',year:'2026',image:'hero.jpg',alt:'Светлый современный дом с террасой и садом',material:'Камень / стекло / дерево',description:'Дом, который продолжает ландшафт. Простая геометрия объёмов собирает приватный двор, а большие проёмы соединяют гостиную с садом. В центре концепции — общая зона для неспешных завтраков, длинных разговоров и жизни без жёстких границ между внутри и снаружи.'},
  {id:'light-balance',title:'Равновесие света',category:'interior',categoryLabel:'Жилой интерьер',area:'118 м²',year:'2026',image:'residence.jpg',alt:'Минималистичный светлый интерьер с естественным освещением',material:'Дуб / текстиль / тёплый белый',description:'Городская квартира как спокойная точка отсчёта. Светлые поверхности отражают дневной свет, дерево добавляет теплоту, а предметы не конкурируют друг с другом. Скрытое хранение освобождает пространство для главного — человека и его привычек.'},
  {id:'soft-silence',title:'Мягкая тишина',category:'interior',categoryLabel:'Жилой интерьер',area:'86 м²',year:'2025',image:'interior.jpg',alt:'Тёплая гостиная с натуральными оттенками и мягкой мебелью',material:'Лён / дерево / керамика',description:'Концепт пространства, которое хочется ощущать тактильно. Мягкие линии мебели, спокойная природная палитра и рассеянный свет формируют настроение. Открытая гостиная объединяет повседневные сценарии, оставляя место уединению.'},
  {id:'urban-pause',title:'Городская пауза',category:'public',categoryLabel:'Общественное пространство',area:'420 м²',year:'2025',image:'concrete.jpg',alt:'Выразительная современная архитектура с чистыми геометрическими линиями',material:'Металл / стекло / свет',description:'Идея небольшого культурного павильона внутри городского ритма. Чёткий архитектурный жест создаёт место для встреч и наблюдения. Важнее всего здесь переходы: от улицы к защищённому двору, от шума к тишине, от движения к паузе.'},
  {id:'garden-house',title:'Дом с горизонтом',category:'architecture',categoryLabel:'Загородный дом',area:'310 м²',year:'2024',image:'wood.jpg',alt:'Современный дом с террасой, большими окнами и открытым пространством',material:'Дерево / камень / стекло',description:'Длинный горизонтальный объём раскрывается к саду и свету. Планировка разделяет шумную общую зону и приватную часть, сохраняя связь между ними. Архитектура работает как рамка для меняющегося пейзажа и повседневных семейных ритуалов.'},
  {id:'workshop',title:'Место для идей',category:'public',categoryLabel:'Рабочее пространство',area:'185 м²',year:'2024',image:'studio.jpg',alt:'Светлое рабочее пространство с большими окнами и растениями',material:'Дуб / металл / живые растения',description:'Рабочая среда с домашним масштабом. Открытые столы чередуются с тихими уголками, а естественный свет становится частью планировки. Это концепт места, где удобно сосредоточиться, обсудить идею и ненадолго переключиться.'}
];

const grid = document.querySelector('#project-grid');
const filters = [...document.querySelectorAll('[data-filter]')];
const count = document.querySelector('.project-count');
const dialog = document.querySelector('#project-dialog');
const dialogBody = document.querySelector('#dialog-body');
let activeFilter = 'all';
let currentProject = 0;
let dialogTrigger = null;

function visibleProjects(){return projects.filter(project => activeFilter === 'all' || project.category === activeFilter);}
function renderProjects(){
  const visible = visibleProjects();
  grid.innerHTML = visible.map(project => `<article class="project-card"><button class="project-image" type="button" data-project="${project.id}" aria-label="Открыть проект: ${project.title}"><img src="./assets/${project.image}" alt="${project.alt}" width="1200" height="900" loading="lazy"><span class="project-arrow" aria-hidden="true">↗</span></button><div class="project-card-header"><h3><button type="button" data-project="${project.id}">${project.title}</button></h3><span class="project-year">${project.year}</span></div><p class="project-meta"><span>${project.categoryLabel}</span><span>${project.area}</span><span>Концепт</span></p></article>`).join('');
  count.textContent = `Показано ${visible.length} ${visible.length === 1 ? 'проект' : visible.length < 5 ? 'проекта' : 'проектов'}`;
}
filters.forEach(button => button.addEventListener('click',()=>{
  activeFilter = button.dataset.filter;
  filters.forEach(filter => {const active = filter === button;filter.classList.toggle('active',active);filter.setAttribute('aria-pressed',String(active));});
  renderProjects();
}));
function renderDialog(){
  const project = projects[currentProject];
  dialogBody.innerHTML = `<div class="dialog-hero"><img src="./assets/${project.image}" alt="${project.alt}" width="1200" height="800"></div><div class="dialog-info"><p class="eyebrow">${project.categoryLabel.toLocaleUpperCase('ru-RU')} / КОНЦЕПТ</p><h2 id="dialog-title">${project.title}</h2><dl class="dialog-facts"><div><dt>Площадь</dt><dd>${project.area}</dd></div><div><dt>Год концепции</dt><dd>${project.year}</dd></div><div><dt>Палитра</dt><dd>${project.material}</dd></div></dl><p class="dialog-description">${project.description}</p><p class="dialog-demo">Вымышленный проект для демонстрации интерфейса. Изображение иллюстрирует настроение концепции и не является результатом работы реального бюро.</p></div>`;
  document.querySelector('#dialog-index').textContent = `${String(currentProject + 1).padStart(2,'0')} / ${String(projects.length).padStart(2,'0')}`;
  dialog.scrollTop = 0;
}
grid.addEventListener('click',event=>{
  const trigger = event.target.closest('[data-project]');
  if(!trigger)return;
  currentProject = projects.findIndex(project=>project.id===trigger.dataset.project);
  dialogTrigger = trigger;
  renderDialog();
  dialog.showModal();
  document.querySelector('.dialog-close').focus();
});
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{if(dialogTrigger?.isConnected)dialogTrigger.focus();});
document.querySelector('#previous-project').addEventListener('click',()=>{currentProject=(currentProject+projects.length-1)%projects.length;renderDialog();});
document.querySelector('#next-project').addEventListener('click',()=>{currentProject=(currentProject+1)%projects.length;renderDialog();});

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
function closeMenu(){menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Открыть меню');mobileMenu.hidden=true;}
menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');mobileMenu.hidden=!open;});
mobileMenu.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!mobileMenu.hidden){closeMenu();menuToggle.focus();}});
window.matchMedia('(min-width: 701px)').addEventListener('change',event=>{if(event.matches)closeMenu();});

const briefForm = document.querySelector('#brief-form');
const briefResult = document.querySelector('#brief-result');
let briefText = '';
briefForm.addEventListener('submit',event=>{
  event.preventDefault();
  if(!briefForm.reportValidity())return;
  const data=new FormData(briefForm);
  const type=String(data.get('type')||'').trim();
  const area=Number(data.get('area'));
  const idea=String(data.get('idea')||'').trim();
  const ideaInput=briefForm.elements.namedItem('idea');
  if(idea.length<20){ideaInput.setCustomValidity('Добавьте немного подробностей — не менее 20 символов без пробелов по краям.');ideaInput.reportValidity();return;}
  ideaInput.setCustomValidity('');
  if(!type||!Number.isFinite(area)||area<10||area>100000)return;
  briefText=`ФОРМА / ДЕМОНСТРАЦИОННЫЙ БРИФ\n\nТип проекта: ${type}\nПлощадь: ${area.toLocaleString('ru-RU')} м²\n\nИдея:\n${idea}\n\nСледующий шаг: уточнить задачи пространства, исходные данные и приоритеты по материалам.\n\nБриф создан в браузере. Заявка никуда не отправлялась. Бюро «Форма» — вымышленный проект для портфолио.\n`;
  document.querySelector('#brief-summary').textContent=`${type} · ${area.toLocaleString('ru-RU')} м². Сохраните описание идеи, чтобы вернуться к нему позже.`;
  briefResult.hidden=false;
  briefResult.focus();
});
briefForm.elements.namedItem('idea').addEventListener('input',event=>event.target.setCustomValidity(''));
briefForm.addEventListener('input',()=>{briefResult.hidden=true;briefText='';});
briefForm.addEventListener('change',()=>{briefResult.hidden=true;briefText='';});
document.querySelector('.download-brief').addEventListener('click',()=>{
  if(!briefText)return;
  const blob=new Blob(['\uFEFF',briefText],{type:'text/plain;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const link=document.createElement('a');link.href=url;link.download='forma-brief.txt';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
renderProjects();
