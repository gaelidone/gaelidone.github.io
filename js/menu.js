const aside = document.querySelector('#aside');
const x = document.querySelector('.bi-x');
const menu_Bar = document.querySelector('.bi-list');
const glass = document.querySelector('.background-glass');

menu_Bar.addEventListener('click', ()=>{
    aside.classList.add('menu-toggle');
    glass.classList.remove('glass-hidden');
})
x.addEventListener('click', ()=>{
    aside.classList.remove("menu-toggle");
    glass.classList.add('glass-hidden');

})