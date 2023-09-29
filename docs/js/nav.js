const hamburger = document.querySelector('.hamburger')
const menu = document.querySelector('.menu')
const menuItem = document.querySelector('.menu-item')


hamburger.addEventListener('click', async () => {

  if(menu.classList.contains('hidden')){
    await anime({
      targets: menuItem,
      duration: 100,
      easing: 'linear',
      translateY: ['0px', '70px'],
      translateX: ['10px', '0px'],
      scale: [0.5, 1],
    });
    menu.classList.toggle('hidden');

  } else {
    await anime({
      targets: menuItem,
      duration: 100,
      easing: 'linear',
      translateY: ['70px', '-10px'],
      translateX: ['0px', '10px'],
      scale: {value: [1, 0.2], duration: 100},
      complete: 
        function(){ 
          setTimeout(()=>{
            menu.classList.toggle('hidden');
          },150 )
        },
    }
    );

  }

})

function scrollToElement(elementId, duration) {
  const element = document.getElementById(elementId);
  const scrollPosition = element.offsetTop;
  const scrollDuration = duration || 500;
  const nonce = Math.random().toString(32).substring(7)

  const start = window.scrollY;
  const distance = scrollPosition - start;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, start, distance, scrollDuration);
    window.scrollTo(0, run);
    if (timeElapsed < scrollDuration) requestAnimationFrame(animation);
  }

  function easeInQuad(t, b, c, d) {
    t /= d;
    return c * t * t + b;
  }
  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }


  requestAnimationFrame(animation);
}

