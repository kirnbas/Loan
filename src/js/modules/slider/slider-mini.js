import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor(container, prev, next, activeClass, animate, autoplay, onlyChilds) {
        super(container, prev, next, activeClass, animate, autoplay, onlyChilds);
    }

    decorizeSlides() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);

            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0.4';
            }
        });        

        // if (!this.slides[0].closest('button')) {
        this.slides[0].classList.add(this.activeClass);
        // }

        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        // if (this.slides[1].tagName == "BUTTON" && this.slides[2].tagName == "BUTTON") {
        //     this.container.appendChild(this.slides[0]); // Slide
        //     this.container.appendChild(this.slides[1]); // Btn
        //     this.container.appendChild(this.slides[2]); // Btn
        //     this.decorizeSlides();
        // } 
        // else if (this.slides[1].tagName == "BUTTON" ) {
        //     this.container.appendChild(this.slides[0]); // Slide
        //     this.container.appendChild(this.slides[1]); // Btn
        //     this.decorizeSlides();
        // }
        // else {
            this.container.appendChild(this.slides[0]);
            this.decorizeSlides();
        // }
    }

    bindTriggers() {
        this.next.addEventListener('click', () => {
            this.nextSlide();                        
        });

        this.prev.addEventListener('click', () => {

            // for (let i = this.slides.length - 1; i > 0; i--) {
            //     if (this.slides[i].tagName !== "BUTTON") {
                    let active = this.slides[this.slides.length - 1];
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorizeSlides();
                    // break;
            //     }
            // }          
             
        });

        if (this.autoplay) {
            // Helper lambda
            const bindMouseOverOut = element => {
                element.addEventListener('mouseover', () => {
                    clearInterval(this.timerInterval);
                });

                element.addEventListener('mouseout', () => {
                    this.setTimer();
                });
            };

            this.slides.forEach(slide => {
                bindMouseOverOut(slide);
            });
            bindMouseOverOut(this.next);
            bindMouseOverOut(this.prev);
        }
    }

    setTimer() {
        this.timerInterval = setInterval(() => this.nextSlide(), 5000);
    }

    init() {
        try {
            this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
            `;

            this.bindTriggers();
            this.decorizeSlides();

            if (this.autoplay) {
                this.setTimer();
            }
        } catch (e) {}
    }
}