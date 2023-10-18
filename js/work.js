const sliderInit = () => {
  // slider

  let activeIndex = 0
  const sliderImages = document.querySelectorAll('.mainImageWrap .imgBox')
  let sliderLenght = sliderImages.length
  const navButton = document.querySelectorAll('[data-nav]')
  const textWrap = document.querySelector('.textBox')

  navButton.forEach((btn) => {
    const dir = btn.dataset.nav

    btn.addEventListener('click', (e) => {
      e.preventDefault()

      if (!textWrap.classList.contains('animating')) {
        let tempIndex = activeIndex

        if (dir == 'left' && activeIndex != 0) {
          activeIndex -= 1

          textTransition(tempIndex)

          imageTransition(tempIndex)
          // button animation
          buttonAnimation(dir)
        } else if (dir == 'right' && activeIndex < sliderLenght - 1) {
          activeIndex += 1

          textTransition(tempIndex)

          imageTransition(tempIndex)

          // button animation
          buttonAnimation(dir)
        }

        pagination()
      }
    })
  })

  const thumbSlide = document.querySelectorAll('.smallthumb .sItem')

  thumbSlide.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      if (!textWrap.classList.contains('animating')) {
        if (activeIndex != index) {
          let tempIndex = activeIndex

          activeIndex = index
          textTransition(tempIndex)
          imageTransition(tempIndex)
          pagination()

          // button animation
          let dir = activeIndex < tempIndex ? 'left' : 'right'

          buttonAnimation(dir)
        }
      }
    })
  })

  gsap.set('.h-title', {
    yPercent: 100,
  })

  const sliderTexts = document.querySelectorAll('.h-title')

  gsap.set(sliderImages, {
    clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
  })

  const buttonAnimation = (dir) => {
    // button animation
    gsap.fromTo(
      '[data-nav]',
      0.5,
      {
        rotate: 0,
      },
      {
        rotate: dir == 'left' ? 90 * -1 : 90,
      }
    )
  }

  const pagination = () => {
    let pageTrans = document
      .querySelector('.paginationWrap i')
      .getBoundingClientRect().height

    gsap.to('.paginationWrap .inner', 0.4, {
      y: pageTrans * activeIndex * -1,
    })
  }

  const textTransition = (preIndex) => {
    let tl = gsap.timeline()
    textWrap.classList.add('animating')
    if (preIndex >= 0) {
      tl.to(sliderTexts[preIndex], 0.3, {
        yPercent: -100,
      }).fromTo(
        sliderTexts[activeIndex],
        0.6,
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          onComplete: () => {
            textWrap.classList.remove('animating')
          },
        }
      )
    } else {
      tl.fromTo(
        sliderTexts[activeIndex],
        0.6,
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          onComplete: () => {
            textWrap.classList.remove('animating')
          },
        }
      )
    }
  }

  const imageTransition = (preIndex) => {
    let tl = gsap.timeline()

    if (preIndex >= 0) {
      const dir = activeIndex > preIndex ? 'right' : 'left'

      tl.fromTo(
        sliderImages[preIndex],
        0.6,
        {
          zIndex: 2,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        },
        {
          zIndex: 2,
          clipPath:
            dir == 'right'
              ? 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
              : 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
        }
      )
        .fromTo(
          sliderImages[preIndex].querySelector('img'),
          0.6,
          {
            xPercent: 0,
          },
          {
            xPercent: dir == 'right' ? -50 : 50,
          },
          '-=.6'
        )
        .fromTo(
          sliderImages[activeIndex].querySelector('img'),
          0.6,
          {
            xPercent: dir == 'right' ? 50 : -50,
          },
          {
            xPercent: 0,
          },
          '-=.6'
        )
        .fromTo(
          sliderImages[activeIndex],
          0.6,
          {
            zIndex: 5,
            clipPath:
              dir == 'right'
                ? 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'
                : 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
          },
          {
            zIndex: 5,
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          },
          '-=.6'
        )
    } else {
      tl.to(
        sliderImages[activeIndex],
        0.2,

        {
          zIndex: 5,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        }
      )
    }
  }
  // init event
  imageTransition(-1)

  setTimeout(() => {
    textTransition(-1)
  }, 5350)
}

sliderInit()

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('domLoaded')
  }, 50)
})
