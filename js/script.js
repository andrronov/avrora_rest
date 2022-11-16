new Swiper('.image-slider',{
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
   },
   pagination: {
      el: '.swiper-pagination',
      type: 'progressbar'
   },
   loop: true,
   autoplay: {
      delay: 3000,
      stopOnLastSlide: false,
      disableOnInteraction: false,
   },
   speed: 2000,
   touchRatio: 2,
   effect: 'fade',
   fadeEffect:{
      crossFade: false,
   },
   // preloadImages: true,
   // lazy: {
   //    loadOnTransitionStart: false,
   //    loadPrevNext: false,
   // },
   // watchSlidesProgress: true,
   // watchSlidesVisibility: true,
});

let b1 = document.querySelector('.b1');
let b2 = document.querySelector('.b2');
let b3 = document.querySelector('.b3');
let b4 = document.querySelector('.b4');
let b5 = document.querySelector('.b5');
let bb5 = document.querySelector('#b5');
let b6 = document.querySelector('#b6')
let b7 = document.querySelector('#b7')
let p1 = document.querySelector('#p1');
let p2 = document.querySelector('#p2');
let p3 = document.querySelector('#p3');
let p4 = document.querySelector('#p4');
let p5 = document.querySelector('#p5');
let p6 = document.querySelector('#p6');

b1.addEventListener('click', function(){
   p2.classList.remove('_active');
   p3.classList.remove('_active');
   p4.classList.remove('_active');
   p5.classList.remove('_active');
   p6.classList.remove('_active');
});
b2.addEventListener('click', function(){ 
   p2.classList.toggle('_active');
   p3.classList.remove('_active');
   p4.classList.remove('_active');
   p5.classList.remove('_active');
   p6.classList.remove('_active');
});
b3.addEventListener('click', function(){
   p2.classList.remove('_active');
   p3.classList.toggle('_active');
   p4.classList.remove('_active');
   p5.classList.remove('_active');
   p6.classList.remove('_active');
});
b4.addEventListener('click', function(){
   p2.classList.remove('_active');
   p3.classList.remove('_active');
   p4.classList.toggle('_active');
   p5.classList.remove('_active');
   p6.classList.remove('_active'); 
});
b5.addEventListener('click', function(){
   p2.classList.remove('_active');
   p3.classList.remove('_active');
   p4.classList.remove('_active');
   p5.classList.toggle('_active');
   p6.classList.remove('_active'); 
});
bb5.addEventListener('click', function(){
   p2.classList.remove('_active');
   p3.classList.remove('_active');
   p4.classList.remove('_active');
   p5.classList.toggle('_active');
   p6.classList.remove('_active'); 
});
b6.addEventListener('click', function(){
   p2.classList.remove('_active');
   p3.classList.remove('_active');
   p4.classList.remove('_active');
   p5.classList.remove('_active');
   p6.classList.toggle('_active'); 
});
b7.addEventListener('click', function(){
   p2.classList.remove('_active');
   p3.classList.remove('_active');
   p4.classList.remove('_active');
   p5.classList.remove('_active');
   p6.classList.toggle('_active'); 
});


// МЕНЮ БУРГЕР
let iconMenu = document.querySelector('.menu__icon');
let menuBody = document.querySelector('.header__menu');
const menuLinks = document.querySelectorAll('.menu__link');
if (iconMenu){
   iconMenu.addEventListener('click', function(e){
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
   })
};

if (menuLinks.length > 0){
   menuLinks.forEach(menuLink =>{
      menuLink.addEventListener('click', clickButton);
   });


function clickButton(e){
   const menuLink = e.target;
      if(iconMenu.classList.contains('_active')){
         iconMenu.classList.remove('_active');
         menuBody.classList.remove('_active');
      }
   }
}

// FORMAAAAA ======================
document.addEventListener('DOMContentLoaded', function(){
   const form = document.getElementById('form');
   form.addEventListener('submit', formSend);

   async function formSend(e){
      e.preventDefault();

      let error = formValidate(form);

      let formData = new FormData(form);
      formData.append('image', formImage.files[0]);
      if (error === 0){
         form.classList.add('_sending');
       let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData
        }); 
        if (response.ok){
             let result = await response.json();
             alert(result.message);
             formPreview.innerHTML = '';
            form.reset();
             form.classList.remove('_sending');
        } else{
         alert('Ошибка');
         form.classList.remove('_sending');
        }
      } else{
         alert('Заполните поля');
         }
   }

   function formValidate(form){
      let error = 0;
      let formReq = document.querySelectorAll('._req');

      for (let index = 0; index < formReq.length; index++){
         const input = formReq[index];
         formRemoveError(input);

         if (input.classList.contains('_email')){
            if(emailTest(input)){
               formAddError(input);
               error++;
            }
         }else if(input.getAttribute("type") === "checkbox" && input.checked === false){
            formAddError;
            error++;
         }else{
            if(input.value === ''){
               formAddError(input);
               error++;
            }
         }
      }
   }
   function formAddError(input){
      input.parentElement.classList.add('_error');
      input.classList.add('_error');
   }
   function formRemoveError(input){
      input.parentElement.classList.remove('_error');
      input.classList.remove('_error');
   }
   // Проверка введенной почты
   function emailTest(input){
      return !/^w+([\.-]?\w+)*@\w+([\.-]?\w)*(\.w{2,8})+$/.test(input.value);
   }

   const formImage = document.getElementById('formImage');
   const formPreview = document.getElementById('formPreview');

   formImage.addEventListener('change', () => {
      uploadFile(formImage.files[0]);
   });

   function uploadFile(file){
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)){
         alert('AAA');
         formImage.value = '';
         return;
      }
      if (file.size > 2 * 1024 * 1024){
         alert('BBB');
         return;
      }
   }
});