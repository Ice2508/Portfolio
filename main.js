










'use strict'

document.addEventListener('DOMContentLoaded', () => {
  console.log(aboutImg);
    updateAboutImg(); 
    window.addEventListener('resize', updateAboutImg);
    window.addEventListener('resize', updateArrowPosition);
    const starField = document.getElementById('star-field');
    let starCount;
    if (window.innerWidth < 640) {
      starCount = 180;
    } else if (window.innerWidth < 960) {
      starCount = 320;
    } else {
      starCount = 800;
    }
    createStars(starField, starCount); 
    popupOpenFn(openPopup); 
    popupClose(overlay);
    formSubmit(popupSubmit);
});


const player = new Plyr('#player', {
  controls: ['play-large','play','progress','mute','volume','fullscreen'],
  autoplay: false,
  loop: { active: false }
});

const leftControls = document.querySelector('.portfolio__controls--left');
const rightControls = document.querySelector('.portfolio__controls--right');
const leftControlsSvg = document.querySelector('.portfolio__left-svg-mob');
const rightControlsSvg = document.querySelector('.portfolio__right-svg-mob');
const descriptionList = document.querySelector('.portfolio__descriptions-list');
const overlay = document.querySelector('.popup-overlay');
const openPopup = document.querySelectorAll('.open--popup');
const popupSubmit = document.querySelector('.popup-submit');
const aboutImg = document.querySelector('.about__img');
const mobileNav = document.querySelector('.header__mobile-nav');
const mobileList = document.querySelector('.mobile__nav--list');
const mobileNavList = document.querySelector('.header__mobile-nav-list');
const mobileOverlay = document.querySelector('.header__mobile-nav-overlay');
const mobileNavClose = document.querySelector('.header__mobile-nav-close');
const formState = {
  name: null,
  contacts: null,
  message: null,
}
const videoSrc = [
  {
    path:'video.MP4',
    text:[
      'Разработал современный продающий интерфейс с акцентом на визуальное доверие, удобную навигацию и сильную подачу продукта.',
      'Реализовал адаптивную frontend-разработку для стабильной и корректной работы сайта на всех устройствах',
      'Продумал пользовательский сценарий и структуру блоков, что позволило повысить вовлечённость и улучшить конверсию.',
      'Интегрировал необходимый функционал проекта: формы заявок, анимации, интерактивные элементы и административную логику.'
    ]
  },
  {
    path:'video2.mkv',
    text:[
      'oтлично все выполнил ура ура',
      'без каких либо проблем разработал кастомную админ панель с возможностью вносить правки на сайте'
    ]
  }
];

let index = 0;

leftControls.addEventListener('click', () => updateVideoSource('left'));
rightControls.addEventListener('click', () => updateVideoSource('right'));

function updateVideoSource(direction) {
    descriptionList.classList.add('fade-out');
    setTimeout(() => {
        index = direction === 'left' ? (index === 0 ? videoSrc.length-1 : index-1)
                                      : (index === videoSrc.length-1 ? 0 : index+1);
        player.source = { type: 'video', sources:[{ src: videoSrc[index].path, type:'video/mp4' }]};
        descriptionList.innerHTML = videoSrc[index].text.map(el=>`<li class="portfolio__descriptions-item">${el}</li>`).join('');
        descriptionList.classList.remove('fade-out');
    }, 500);
}

function popupOpenFn(btns){
    btns.forEach(btn=>{
        btn.addEventListener('click', ()=>{
            document.body.style.overflow='hidden';
            overlay.classList.add('popup-overlay--active');
            popupSubmit.classList.add('popup-submit--active');
        });
    });
}

function popupClose(overlay){
    overlay.addEventListener('click',(e)=>{
        if(e.target.closest('.popup-submit') && !e.target.closest('.popup-submit__close') && !e.target.closest('.close')) return;
        document.body.style.overflow='';
        overlay.classList.remove('popup-overlay--active');
        popupSubmit.classList.remove('popup-submit--active');
        if (popupSubmit.querySelector('[data-popup-close]')) {
          setTimeout(() => {
            popupInterfaceReset(popupSubmit);
          }, 400);
        }
    });
}

function popupMessOk(popupSubmit){
    popupSubmit.innerHTML=`
        <button class="popup-submit__close" type="button">&times;</button>
        <img class="popup-submit__icon" src="img/popup-submit-icon.png">
        <div class="popup-submit__text-wrap">
           <h3 class="popup-submit__title">Сообщение отправлено</h3>
           <p class="popup-submit__subtitle">Я свяжусь с вами в ближайшее время</p>
        </div>   
        <button class="close" data-popup-close>закрыть</button>
    `;
}

function popupMessError(popupSubmit){
    popupSubmit.innerHTML=`
        <button class="popup-submit__close" type="button">&times;</button>
        <img class="popup-submit__icon" src="img/popup-submit-error-icon.png">
        <div class="popup-submit__text-wrap">
           <h3 class="popup-submit__title">Ошибка отправки</h3>
           <p class="popup-submit__subtitle">Повторите попытку чуть позже</p>
        </div>   
        <button class="back" type="button" data-popup-close>назад</button>
    `;
}

function popupInterfaceReset(popupSubmit) {
   popupSubmit.innerHTML=`
        <button class="popup-submit__close" type="button">&times;</button>
          <h3 class="popup-submit__title">Связаться со мной</h3>
          <input class="popup-submit__input" name="name" type="text" placeholder="имя">
          <input class="popup-submit__input" name="contacts" type="text" placeholder="контактные данные">
          <textarea class="popup-submit__textarea" name="message" placeholder="сообщение"></textarea>
          <button class="popup-submit__btn" type="submit">отправить</button>
      `
}

function createStars(starField, starCount=800){
    const starTypes=['#star-sm','#star-md','#star-lg'];
    for (let i=0; i < starCount; i++){
        const star=document.createElementNS("http://www.w3.org/2000/svg","use");
        const type=starTypes[Math.floor(Math.random()*starTypes.length)];
        const x=Math.random()*1000;
        const y=Math.random()*1000;
        star.setAttributeNS("http://www.w3.org/1999/xlink","href",type);
        star.setAttribute("x",x);
        star.setAttribute("y",y);
        star.classList.add('star','group-'+(Math.floor(Math.random()*5)+1));
        star.setAttribute("opacity",Math.random()*0.7+0.3);
        starField.appendChild(star);
    }
}

function formSubmit(popupSubmit){
    popupSubmit.addEventListener('submit', async (e) => {
        e.preventDefault();
        if(!formValidator(popupSubmit)) return;
        const btn = popupSubmit.querySelector('.popup-submit__btn');
        btn.disabled = true;
        btn.style.opacity = 0.5;
        
        const formData = new FormData(popupSubmit);
        formState.name = formData.get('name');
        formState.contacts = formData.get('contacts');
        formState.message = formData.get('message');
        formData.set('access_key', '4abdbaac-cf19-47b2-a882-f05931f786fe');
        try{
            const response = await fetch('https://api.web3forms.com/submit',{
                method:'POST',
                body: formData
            });

            if(response.ok){
                popupMessOk(popupSubmit);
            }else{
                popupMessError(popupSubmit);
                backPopup()
               
            }
        }catch(error){
            popupMessError(popupSubmit);
            backPopup()
           
        }finally{
            btn.disabled = false;
            btn.style.opacity = 1.0;
        }
    });
}

function formValidator(popupSubmit) {
  const inputs = popupSubmit.querySelectorAll('.popup-submit__input');
  let valid = true;

  inputs.forEach(input => {
    if(!input.value.trim()){
      input.style.border = '2px solid #8A5A40';
    setTimeout(() =>{
      input.style.border = '';
     }, 500);
      valid = false;
    } else {
      input.style.border = ''; 
    }
  });

  return valid; 
}

function backPopup() {
  const back = document.querySelector('.back');
  back.addEventListener('click', (e) => {
    e.stopPropagation(); 
    popupInterfaceReset(popupSubmit);
    const inputs = popupSubmit.querySelectorAll('.popup-submit__input');
    const textarea = popupSubmit.querySelector('.popup-submit__textarea');
    inputs[0].value = formState.name;
    inputs[1].value = formState.contacts;
    textarea.value = formState.message;
  })
}

function updateAboutImg () {
  if  (window.matchMedia('(max-width: 1110px)').matches) {
      aboutImg.src = 'img/22-mob.webp';
   } else {
      aboutImg.src = 'img/22.webp';
   }  
}

function mobileNavClick() {
  mobileNav.addEventListener('click', () => {
      mobileNavList.classList.add('header__mobile-nav-list--active');
      mobileOverlay.classList.add('header__mobile-nav-overlay--active');
      document.body.style.overflow = 'hidden';
  });
  mobileNavList.addEventListener('click', (e) => {
      if (e.target.classList.contains('header__nav-link') || e.target.closest('.header__mobile-nav-close')) {
         mobileNavList.classList.remove('header__mobile-nav-list--active');
         mobileOverlay.classList.remove('header__mobile-nav-overlay--active');
         document.body.style.overflow = '';
      }
    })
}


const videoBlock = document.querySelector('.plyr');

function updateArrowPosition() {
    if (window.matchMedia('(max-width: 840px)').matches) {
        const videoHeight = videoBlock.offsetHeight;
        const topPosition = videoHeight + 32;
        leftControls.style.top = topPosition + 'px';
        rightControls.style.top = topPosition + 'px';
        
            leftControlsSvg.style.visibility = 'visible';
            rightControlsSvg.style.visibility = 'visible';
        
    } else {
        leftControls.style.top = '';
        rightControls.style.top = '';
        leftControlsSvg.style.visibility = 'hidden';
        rightControlsSvg.style.visibility = 'hidden';
    }
}

player.on('loadedmetadata', () => {
    updateArrowPosition();
});



mobileNavClick();