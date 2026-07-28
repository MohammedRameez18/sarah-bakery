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

/* ------------------------------------
    SCROLL EVENTS: HEADER
---------------------------------------*/
function headerScrolled(){
  header.classList.toggle("active", window.scrollY > 0);
}

/* ------------------------------------
    MENU CARDS
---------------------------------------*/
// Decrease Qty
function decreaseQty(e) {
  const menuCard = e.closest(".menu-card");
  
  // Select qty input and get its value
  let qtyEl = menuCard.querySelector(".qty");
  let msg = menuCard.querySelector(".msg");

  let val = qtyEl.value;
  
  // decerement a value until val is greater than one
  if (val > 1) {
    val--; //deceremt it
    qtyEl.value = val;
    msg.textContent = "";
  } else {
    msg.textContent = "minimum reached!";
  }
}

// Increase Qty
function increaseQty(e) {
  const menuCard = e.closest(".menu-card");
  
  // Select qty input and get its value
  let qtyEl = menuCard.querySelector(".qty");
  let msg = menuCard.querySelector(".msg");
  let val = qtyEl.value;
  
  // increment a value until value is less than 10
  if (val < 10) {
    val++;
    qtyEl.value = val;
    console.log(val);
    msg.textContent = "";
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
                <small class="price">${item.price}</small>
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

document.addEventListener("DOMContentLoaded", () => {
  
  showMenuCards();
  
  // Helper Functions called
  helper(window, "scroll", headerScrolled);
  helper(menuBar, "click", openNavbar);
  helper(closeNav, "click", closeNavbar);
  navlinks.forEach((link)=>{
    helper(link, "click", closeNavbar);
  })
})


// MENUS DATA
const data = [
{
  image: "../assets/images/menu-1.jpg",
  alt: "fresh bread and croissants",
  name: "Bread and Croissants",
  price: "$5",
  width: "640",
  height: "427",
},
{
  image: "../assets/images/menu-2.jpg",
  alt: "fresh lemon cake served on plate",
  name: "Lemon cake",
  price: "$2",
  width: "640",
  height: "427",
},
{
  image: "../assets/images/menu-3.jpg",
  alt: "fresh homemade lemon loaf cake",
  name: "Lemon loaf cake",
  price: "$7",
  width: "640",
  height: "427",
},
{
  image: "../assets/images/menu-4.jpg",
  alt: "fresh strawbery cupcake",
  name: "Strawbery cupcake",
  price: "$2",
  width: "640",
  height: "427",
},
{
  image: "../assets/images/menu-5.jpg",
  alt: "fresh lemon choclate cake",
  name: "Lemon choclaye cake",
  price: "$5",
  width: "640",
  height: "427",
},
{
  image: "../assets/images/menu-6.jpg",
  alt: "fresh baked seeded bread rolls",
  name: "Seeded bread rolls",
  price: "$8",
  width: "640",
  height: "427",
}]