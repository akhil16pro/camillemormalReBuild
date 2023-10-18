const abouttransition = () => {
  let smallNav = document.querySelector('.smallNav')
  smallNavBounding = smallNav.getBoundingClientRect()
  gsap.to('.smallNav', {
    scrollTrigger: {
      trigger: '.aboutSection',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
    },
    y: window.innerHeight - smallNavBounding.height,
    ease: 'Linear.easeIn',
  })

  let frameBox = document.querySelector('.frameBox')
  frameBoxBounding = frameBox.getBoundingClientRect()
  frmH = frameBoxBounding.height

  let smallNavpadding = window.getComputedStyle(smallNav)

  gsap.to('.frameBox', {
    scrollTrigger: {
      trigger: '.aboutSection',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      // markers: true,
    },
    y:
      window.innerHeight -
      frmH -
      frameBoxBounding.top -
      parseInt(smallNavpadding.paddingBottom) +
      20,
    ease: 'Linear.easeIn',
  })
}

abouttransition()
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('domLoaded')
    document.body.classList.add('noDelay')
  }, 50)
})

// const navActive = (menu) => {
//   let navList = document.querySelectorAll('[data-nav]')

//   navList.forEach((nav) => {
//     nav.classList.remove('active')
//   })

//   document.querySelector(`[data-nav=${menu}]`).classList.add('active')
// }
// barba.init({
//   debug: false,
//   transitions: [
//     {
//       sync: true,
//       leave(data) {
//         // create your stunning leave animation here

//         return gsap.to(data.current.container, {
//           clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
//         })
//       },
//       enter(data) {
//         // create your amazing enter animation here

//         return gsap.fromTo(
//           data.next.container,
//           {
//             clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
//           },
//           {
//             delay: 0.5,
//             clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
//           }
//         )
//       },
//     },
//   ],
//   views: [
//     {
//       namespace: 'home',
//       beforeEnter() {
//         // update the menu based on user navigation
//         // init event
//         sliderInit()
//         navActive('work')
//       },
//       afterEnter() {
//         // refresh the parallax based on new page content
//         loadEvent()
//       },
//     },
//     {
//       namespace: 'about',
//       beforeEnter() {
//         // update the menu based on user navigation
//         navActive('about')
//       },
//       afterEnter() {
//         // init event
//         abouttransition()

//         document.body.classList.add('noDelay')
//         loadEvent()
//       },
//     },
//   ],
// })
