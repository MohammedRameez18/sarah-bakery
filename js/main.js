// UTILITY FUNCTION
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function helper(element, event, callback) {
  if (element) {
    element.addEventListener(event, callback);
  }
}

// ELEMENTS
const menuBar = $(".menu-bar");
const closeNav = $(".close");
const navbar = $(".navbar");
const navlinks = $$(".navlink");
const menus = $(".menus");
const header = $(".header");
const themeSwitch = $(".theme-switch");
const body = $("body");

const myArray = [];
const THEME_KEY = "theme";
const LAST_THEME_DATE = "lastThemeDate";
/* ======================================
  LOCAL STORAGE
=======================================*/
const STORAGE_KEY = "sarahBakery";
const defaultData = {
  theme: "light",
  lastThemeDate: null
}

function getThemeValue(name) {
  return getStorageData(STORAGE_KEY)[name];
}

function setThemeValue(name, value) {
  const storageData = getStorageData(STORAGE_KEY);
  storageData[name] = value;
  saveStorageData(STORAGE_KEY, storageData);
}

function getStorageData(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : { ...defaultData };
}

function saveStorageData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* ------------------------------------
    THEME SWITCH: DARK MODE
---------------------------------------*/
//For auto theme toggle based on time
function autoToggleTheme(){
  let hours = new Date().getHours();
  const date = new Date().getDate();

  const mydata = getStorageData(STORAGE_KEY);

  
  if(hours >= 17 && hours <= 21){
    mydata.theme = "dark";
  }else{
    mydata.theme = "light";
  }
  
  mydata.lastThemeDate = date;
  saveStorageData(STORAGE_KEY, mydata);

}

function toggleTheme() {
  const moon = themeSwitch.querySelector(".moon");
  const light = themeSwitch.querySelector(".light");
  const date = new Date().getDate();
  
  // As a whole object
  const mydata = getStorageData(STORAGE_KEY);
  
  body.classList.toggle("dark-mode");
  
  if (body.classList.contains("dark-mode")) {
    moon.classList.add("remove");
    light.classList.add("active");
    
    //update theme prop
    mydata.theme = "dark";
    
  } else {
    moon.classList.remove("remove");
    light.classList.remove("active");
    
    mydata.theme = "light";
  }
  
  //update date prop
  mydata.lastThemeDate = date;
  
  //update whole object
  saveStorageData(STORAGE_KEY, mydata);
  console.log(typeof mydata);
  console.log(mydata);
}
/* ------------------------------------
    SCROLL EVENTS: HEADER
---------------------------------------*/
function headerScrolled() {
  header.classList.toggle("active", window.scrollY > 0);
}

/* ------------------------------------
    MENU CARDS
---------------------------------------*/
// GET PRICE
function getPrice(element) {
  let total = element.querySelector("[data-price]");
  return Number(total.dataset.price);
}

// CALCULATE PRICE
function calculatePrice(price, qty) {
  return price * qty;
}
// Decrease Qty
function decreaseQty(e) {
  const menuCard = e.closest(".menu-card");
  
  // Select qty input and get its value
  let qtyEl = menuCard.querySelector(".qty");
  let msg = menuCard.querySelector(".msg");
  let priceEl = menuCard.querySelector(".price");
  
  
  let qty = qtyEl.value;
  
  // Get Price
  let price = getPrice(menuCard);
  
  // decerement a value until val is greater than one
  if (qty > 1) {
    qty--; //deceremt it
    qtyEl.value = qty;
    msg.textContent = "";
    
    // price = price * qty;
    price = calculatePrice(price, qty);
    priceEl.textContent = "$" + price;
  } else {
    msg.textContent = "minimum reached!";
  }
}

// Increase Qty
function increaseQty(e) {
  const menuCard = e.closest(".menu-card");
  let qtyEl = menuCard.querySelector(".qty");
  let msg = menuCard.querySelector(".msg");
  let priceEl = menuCard.querySelector(".price");
  
  
  let qty = Number(qtyEl.value);
  let price = getPrice(menuCard);
  
  
  // increment a value until value is less than 10
  if (qty < 10) {
    qty++;
    qtyEl.value = qty;
    msg.textContent = "";
    
    price = calculatePrice(price, qty);
    priceEl.textContent = "$" + price;
  } else {
    msg.textContent = "maximun reached!";
  }
}

// Show Menu Cards
function showMenuCards() {
  const menuContent = menus.querySelector(".menu-content")
  let template = "";
  
  data.forEach((item, index) => {
    template += `
          <div class="menu-card" id="menuItem-${index+1}" aria-label="${item.name}">
            <img src="${item.image}" alt="${item.alt}" class="menu-img" width="${item.width}" height="${item.height}" loading="lazy">
            <div class="menu-card-content">
              <div class="content-group">
                <h3>${item.name}</h3>
                <small class="price" data-price="${item.price}">$${item.price}</small>
              </div>
              <div class="control-group">
                  <div class="input-group">
                    <button class="btn decrease" onclick="decreaseQty(this)">-</button>
                    <input type="number" class="qty" id="qty-${index+1}" value="1" aria-label="input quantity">
                    <button class="btn increase" onclick="increaseQty(this)">+</button>
                  </div>
                  <button class="btn order-btn">Order No
                  </button>

              </div>
                <small class="msg">
                  </small>
              </div>
            </div>

    `;
  })
  menuContent.innerHTML = template;
}


/* ------------------------------------
      NAVBAR
---------------------------------------*/
function closeNavbar() {
  if (navbar) {
    navbar.classList.remove("active");
  }
}

function openNavbar() {
  navbar.classList.add("active");
}

function AppIntialiser(){
  autoToggleTheme();
  toggleTheme();
}

document.addEventListener("DOMContentLoaded", () => {
  
  showMenuCards();
  
  // Helper Functions called
  helper(window, "scroll", headerScrolled);
  helper(menuBar, "click", openNavbar);
  helper(closeNav, "click", closeNavbar);
  navlinks.forEach((link) => {
    helper(link, "click", closeNavbar);
  });
  
  helper(themeSwitch, "click", toggleTheme);
  
  // calls other functions like toggleTheme(₹)
  AppIntialiser();
})



// MENUS DATA
const data = [
{
  image: "../assets/images/menu-1.jpg",
  alt: "fresh bread and croissants",
  name: "Bread and Croissants",
  price: 5,
  width: "640",
  height: "427",
},
{
  image: "../assets/images/menu-2.jpg",
  alt: "fresh lemon cake served on plate",
  name: "Lemon cake",
  price: 2,
  width: "640",
  height: "427",
},
{
  image: "../assets/images/menu-3.jpg",
  alt: "fresh homemade lemon loaf cake",
  name: "Lemon loaf cake",
  price: 7,
  width: "640",
  height: "427",
},
{
  image: "../assets/images/menu-4.jpg",
  alt: "fresh strawbery cupcake",
  name: "Strawbery cupcake",
  price: 2,
  width: "640",
  height: "427",
},
{
  image: "../assets/images/menu-5.jpg",
  alt: "fresh lemon choclate cake",
  name: "Lemon choclaye cake",
  price: 5,
  width: "640",
  height: "427",
},
{
  image: "../assets/images/menu-6.jpg",
  alt: "fresh baked seeded bread rolls",
  name: "Seeded bread rolls",
  price: 8,
  width: "640",
  height: "427",
}]