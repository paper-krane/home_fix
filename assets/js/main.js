class HFPreloader {
    constructor() {
        if (this.checkCookie() != "false") {
            this.animatePreloader();
        } else {
            this.deletePreloader();
        }
    }

    checkCookie() {
        const name = `firstVisit=`;
        const decodedCookie = decodeURIComponent(document.cookie);
        const splitCookie = decodedCookie.split(';');

        for (let cookie of splitCookie) {
            let c = cookie;
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
    }

    animatePreloader() {
        const preloader = document.querySelector('#hf__preloader');
        const preloaderContainer = document.querySelector('#hf__preloader-center');
        const animateText = document.querySelector('#hf__ticker');
        const swipe1 = document.querySelector('#hf__swipe-1');
        const swipe2 = document.querySelector('#hf__swipe-2');
        const TL = gsap.timeline({paused:true});

        TL.to(preloaderContainer, {
            opacity: 1,
            duration: .5,
            onComplete: () => {
                document.querySelector('#hf__preloader .hf__hallow-text').classList.add('loading');
            }
        }).to(animateText, {
            top: `-100%`,
            duration: .5,
            delay: .5,
            ease: 'power4'
        }).to(animateText, {
            top: `-200%`,
            duration: .5,
            delay: .5,
            ease: 'power4'
        }).to(animateText, {
            top: `-300%`,
            duration: .5,
            delay: .5,
            ease: 'power4'
        }).to(preloaderContainer, {
            opacity: 0,
            delay: .8,
            duration: .4,
            ease: 'power2'
        }).to(swipe1, {
            width: `100%`,
            duration: .6,
            delay: -.6,
            ease: 'power2'
        }).to(swipe2, {
            height: `100%`,
            duration: .6,
            delay: 0,
            ease: 'power2'
        }).to(preloader, {
            opacity: 0,
            duration: 1.8,
            onComplete: () => {
                preloader.remove();
                document.cookie = `firstVisit=false`;
            }
        });

        TL.play();
    }

    deletePreloader() {
        const preloader = document.querySelector('#hf__preloader');

        preloader.remove();
    }
}

class HF {
    constructor(firstSession) {
        this.firstSession = firstSession;
        this.init();
    }

    init() {
        console.log(`Website by Paper Krane (https://paperkrane.io)`);
        console.log(`Home Fix scripts initialized... Beep boop bop beep boop!`);

        this.cursorFollow();
        this.cursorExpand();
        this.navToggleInit();
        this.mobileHeadroom();
        this.desktopHeadroom();
        this.heroParallax();
        this.portfolioSlider();
    }

    // Nav toggle
    navToggleInit() {
        const toggles = document.querySelectorAll('.hf__toggle, #hf__nav-filter');
        const navElements = document.querySelectorAll('[data-nav]');

        for (let toggle of toggles) {
            this.navToggle(toggle, navElements, 'click');
            this.navToggle(toggle, navElements, 'keyup');
        }
    }

    navToggle(el, controledElements, eType) {
        el.addEventListener(eType, (e) => {
            if (e.keyCode === 13 || e.type === "click") {
                e.preventDefault();
                e.stopPropagation();
                
                for (let element of controledElements) {
                    element.classList.toggle("hf__active");
                }
              
            }
        }, false);
    }

    // Mobile navbar headroom 
    mobileHeadroom() {
        const showAnim = gsap.from('#hf__mobile-navbar', { 
            yPercent: -100,
            paused: true,
            duration: 0.2
        }).progress(1);

        ScrollTrigger.create({
            start: () => {
                if (window.innerWidth < 992) {
                    return 'top -88';
                } else {
                    return 'top -116';
                }
            },
            end: 9999999,
            toggleClass: {className: 'dark', targets: '#hf__mobile-navbar'},
            onUpdate: (self) => {
                self.direction === -1 ? showAnim.play() : showAnim.reverse()
            }
        });
    }

    // Mobile navbar headroom 
    desktopHeadroom() {
        const showAnim = gsap.from('#hf__navbar', { 
            yPercent: -100,
            paused: true,
            duration: 0.4
        }).progress(1);

        ScrollTrigger.create({
            start: () => {
                if (window.innerWidth >= 1280) {
                    return 'top -108';
                } else {
                    return 'top -99999';
                }
            },
            end: 9999999,
            toggleClass: {className: 'dark', targets: '#hf__navbar'},
            onUpdate: (self) => {
                self.direction === -1 ? showAnim.play() : showAnim.reverse()
            }
        });
    }

    // Cursor functions
    cursorFollow() {
        const cursor = document.querySelector('.cursor.stylus');

        document.addEventListener('mousemove', (e) => {
            if (window.innerWidth > 1280) {
                var x = e.clientX;
                var y = e.clientY;

                const cursorMove = gsap.to(cursor, {
                duration: 1,
                    x: x,
                    y: y,
                    opacity: 1,
                    ease: Expo.easeOut
                });
            } else {
                cursor.style.opacity = 0;
            }
        }, false);
    }
  
    cursorExpand() {
        const hoverable = document.querySelectorAll('a, [data-toggle], button, input, textarea, select, .hg__checkbox');
        const cursor = document.querySelector('#hf__cursor');
        
        for (var i = 0; i < hoverable.length; i++) {
            hoverable[i].addEventListener('mouseover', (e) => {
                const cursorMove = gsap.to(cursor, .5, {
                    width: '108px',
                    height: '108px',
                    marginLeft: '-54px',
                    marginTop: '-54px',
                    opacity: .5,
                    background: 'transparent',
                    ease: Expo.easeOut
                });
            }, false);
            hoverable[i].addEventListener('mouseout', (e) => {
                const cursorMove = gsap.to(cursor, .5, {
                    width: '20px',
                    height: '20px',
                    marginLeft: '-10px',
                    marginTop: '-10px',
                    background: `#f27c00`,
                    opacity: .5,
                    ease: Expo.easeOut
                });
            }, false);
        }
    }

    // Hero Slideshow 
    heroParallax() {
        const heroImg = document.querySelector('#hf__hero-image-container');

        if (heroImg) {
            		
            gsap.utils.toArray("[data-parallax] #hf__acting-hero-image").forEach((section, i) => {
                const heightDiff = section.offsetHeight - section.parentElement.offsetHeight;
                
                gsap.fromTo(section,{ 
                  y: -heightDiff * .5,
                  scale: 1
                }, {
                  scrollTrigger: {
                    trigger: section,
                    scrub: 2
                  },
                  y: 0,
                  scale: 1,
                  ease: "none"
                });
            });
        }
    }

    // Slider 1 
    portfolioSlider() {
        const slider = tns({
            container: '#hf__portfolio-slider-inner',
            items: 1,
            controls: false,
            nav: true,
            navContainer: '#hf__portfolio-slider-nav',
            autoplay: false,
            mouseDrag: true,
            gutter: 64,
            rewind: true,
            loop: false,
            speed: 800
          });
    }
}

const hfPreloader = new HFPreloader();

window.onload = () => {
  const hf = new HF(hfPreloader.checkCookie());
};
