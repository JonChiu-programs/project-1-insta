/**
 * Copyright 2026 JonChiu-programs
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./insta-arrow.js";
import "./insta-indicator.js";
import "./insta-like-counter.js";

/**
 * `project-1-insta`
 * 
 * @demo index.html
 * @element project-1-insta
 */
export class Project1Insta extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "project-1-insta";
  }

   constructor() {
    super();
    this.currentIndex = 0;
    this.total = 0; //This line of code is adapted from bpark5 in order to get indicator dots to appear without needing user input
    this.totalImages = this.total;
    this.loading = true;
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      currentIndex: { type: Number },
      total: {type : Number}, //This line of code is adapted from bpark5 in order to get indicator dots to appear without needing user input
      totalImages: {type : Number}, // Code for check-in-2 meant to preserve the slide that is actively being displayed upon refresh of browser; please ignore for now.Code for check-in-2 meant to preserve the slide that is actively being displayed upon refresh of browser; please ignore for now.
      loading: {type : Boolean}
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: inline-block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        height: 1000px;
        width: 2000px;
        transform: translateX(13vw);
        align-content: center;
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }

      h3 {
        font-size: 80px;
        text-align: center;
      position: flex;
      }

        insta-card{
      display: block;
        /* outline: auto; I'm just keeping this line as I found it by accident and I found the results to be fascinating despite not being what I was going for. */ 
        transform: translateY(-50px);
        width: 1000px;
        height: 500px;
        border: var(--ddd-border-md);
        text-align: center;
        font-size: 50px;
        overflow-y: scroll;
        }

        insta-indicator{
          transform: translate(430px, -150px);
        }

        insta-like-counter{
          transform: translate(-250px, 35px);
        }

    hr{
      color: white;
      padding-bottom: 20px;
    }

    .test{
      font-size: 20px;
    }
        
      @media (min-width: 500px) and (max-width: 800px){
        insta-indicator{
          transform: translateX(-100px);
        }
      }
    
    `];
  }

  // Lit render the HTML
  render() {
    return html`
    <div class="wrapper">
  <insta-arrow
    @previous="${this.previous}"
    @next="${this.next}">
    <insta-card>
      <h3>Hello</h3>
        <hr>
        <slot></slot>
        <p class = "text">Look at all these foxes!</p>
    </insta-card>
    <insta-indicator
    @insta-index-changed="${this.handleEvent}"
    .total="${this.slides ? this.slides.length : 0}"
    .currentIndex="${this.currentIndex}">
  </insta-indicator>
  <insta-like-counter></insta-like-counter>
  </insta-arrow>
  </div>`;
  }

  firstUpdated() {
  this.slides = Array.from(this.querySelectorAll("insta-slide"));
  this.total = this.slides.length; //This line of code is adapted from bpark5 in order to get indicator dots to appear without needing user input
  this.changeSlide();
  this.getFox();
  }

  //Adapted from cjh6976-prog's project; the additional comments are notes so I can better understand what's happening
  loadFoxForAllSlides() {
    if (!this.slides.length) return;
    this.loadFoxIntoSlide(this.slides[this.currentIndex]);
  }
  
  changeSlide() {
  this.loadFoxIntoSlide(this.slides[this.currentIndex]);
  this.slides.forEach((slide, i) => {
  slide.style.display = i === this.currentIndex ? "block" : "none";
  });
  const indexChange = new CustomEvent("insta-index-changed", {
  composed: true,
  bubbles: true,
  detail: {
    index: this.currentIndex
  },
});
this.dispatchEvent(indexChange);  

}

next() {
  if (this.currentIndex < this.slides.length - 1) {
      this.currentIndex++;
      this.changeSlide();
      this.loadFoxIntoSlide(this.slides[this.currentIndex]);
    }
}

previous() {
  if (this.currentIndex > 0) {
    this.currentIndex--;
    this.changeSlide();
    this.loadFoxIntoSlide(this.slides[this.currentIndex]);
  }
}

handleEvent(e){
  this.currentIndex = e.detail.index;
  this.changeSlide();
}
  //Adapted from cjh6976-prog's project; the additional comments are notes so I can better understand what's happening
  async loadFoxIntoSlide(slide) { //Takes this.slide as input
    try {
      const response = await fetch("https://randomfox.ca/floof/"); //Does the fetching of fox images
      const data = await response.json(); 
      slide.querySelectorAll("img").forEach(img => img.remove()); //Removes an existing image to make way for a new image; need to solve this.
      const img = document.createElement("img");
      //Additional image information
      img.src = data.image;
      img.alt = "Random Fox";
      img.style.width = "500px";
      img.style.height = "200px";
      img.style.borderRadius = "8px";
      img.loading = "lazy";
      slide.appendChild(img); //Crates image with additional info
    } 
    catch (error) { //Reads an error in case of failure
      console.error("Error fetching fox image:", error);
    }
  }
}

globalThis.customElements.define(Project1Insta.tag, Project1Insta);