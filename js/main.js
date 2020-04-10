
// the general script run on start
function navigations() {

   // let slide = document.getElementById(slide)
   // navigation bar
   let menuBtn = document.querySelector('#nav-button');
   let list = document.querySelector('.nav__list');
   let logo = document.querySelector('#logo-top');

   setNavigation();

   function setNavigation() {
      // used to get the screen width of the client 
      let curWidth = getCurrentWidth();
      // set the navigation bar type (menu button or list )
      if( curWidth<992) { //set the manue button to be visible and functional 
         setMenuBtn()
      } else { // disable the menu button, allow list to be used 
         setNavBar()
      }
   }

   //get browser width 
   function getCurrentWidth() {
      return window.innerWidth ||
         document.documentElement.clientWidth ||
         document.body.clientWidth
   }

   // init menu button
   function setMenuBtn() {
      menuBtn.style.display = 'block';
      list.style.height = '0';
      // logo.style.transform = 'translate(0, -450px)';
   }

   //handle the menu button click
   //menu button state variable
   let menuState = false; 
   let init = true;
   //add listner to the menu-btn
   menuBtn.onclick = function() {
      if(init) { //handle the first time button get clicked
         list.style.height = '450px';
         init= !init;
         menuState = !menuState;
      } else if(!menuState) { // expand the dropdown menu 
         list.style.transform = 'scale(1, 1)';
         list.style.height = '450px';
         logo.style.transform = 'translate(0, 0)';
         menuState = !menuState;
      } else { // shrank the dropdown menu
         list.style.transform = 'scale(1, 0)';
         logo.style.transform = 'translate(0, -450px)';
         menuState = !menuState;
      }
   }

   // init navBar
   function setNavBar() {
      menuBtn.style.display = 'none';
      list.style.display = 'flex';
      list.style.height = 'auto';
      list.style.transform = 'scale(1, 1)';
      logo.style.transform = 'none';
   }
}

// init the page 
navigations()
// add listner to deal with resize
window.onresize = navigations;



// slider code
// simple slider-hard coded //maybe letter i will make a good slider code  
function slider() {

   //list of the slide display
   let list = document.querySelector('#slider').getElementsByClassName('slider__slide');
   let bls = document.getElementsByClassName('slider__bullet');
   console.log(list);
   //the slider view element
   // let view = document.getElementById('slider__slide-list');
   let active = document.querySelector('.slider__slide--active');
   let activeIndex = active.getAttribute('data-slide');

   console.log(activeIndex);
   // control buttons 
   prev = document.querySelector('#prev'), 
   next = document.querySelector('#next');

   //click event 
   prev.onclick = function() {
      if( --activeIndex < 0) {
         activeIndex = list.length-1;
      }
      setSlide()
   }
   next.onclick = function() {
      if( ++activeIndex >= list.length ) {
         activeIndex = 0;
      }
      setSlide()
   }

   // add the correct className to the slide 
   function setSlide() {

      window.setTimeout( ()=> {
         active.classList.remove('slider__slide--active');
         bls[active.getAttribute('data-slide')].classList.remove('slider__bullet--active');
         
         active = list[activeIndex];   
         
         active.style.visibility = 'hidden';
         active.style.opacity = '0';
         active.classList.add('slider__slide--active');
         bls[active.getAttribute('data-slide')].classList.add('slider__bullet--active');

         window.setTimeout( ()=> {
            active.style.opacity = '1';
         }, 80)
         active.style.visibility = 'visible';

      }, 200)

      active.style.opacity = '0';
   }

}

//init the slider 
slider();


// handle the google map 

let map;

function initMap() {
   let location = {lat: 30.029, lng: 31.23}
   map = new google.maps.Map(document.getElementById('map'), {
      center: location,
      zoom: 25,
      mapTypeId: 'terrain',
      disableDefaultUI: true,
      gestureHandling: 'none'
   });

   let marker = new google.maps.Marker({position: location, map: map});
}
