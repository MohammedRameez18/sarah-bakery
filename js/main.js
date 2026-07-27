// UTILITY FUNCTION
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function helper(element, event, callback){
  if(element){
    element.addEventListener(event, callback);
  }
}

// ELEMENTS
const menuBar = $(".menu-bar");
const closeNav = $(".close");
const navbar = $(".navbar");

function closeNavbar(){
  if(navbar){
    navbar.classList.remove("active");
  }
}

function openNavbar(){
  navbar.classList.add("active");
}

document.addEventListener("DOMContentLoaded", ()=>{
  
  helper(menuBar, "click", openNavbar);
  helper(closeNav, "click", closeNavbar);
})