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
    this.value = 1;
    this.url = ""
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      currentIndex: { type: Number },
      total: {type : Number}, //This line of code is adapted from bpark5 in order to get indicator dots to appear without needing user input
      totalImages: {type : Number}, // Code for check-in-2 meant to preserve the slide that is actively being displayed upon refresh of browser; please ignore for now.Code for check-in-2 meant to preserve the slide that is actively being displayed upon refresh of browser; please ignore for now.
      loading: {type : Boolean},
      value: {type : Number},
      url: {type : String}
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
        transform: translateY(-50px);
        margin-bottom: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        border-color: var(--ddd-theme-default-potential70);
      }

      h3 {
        font-size: 80px;
        text-align: center;
      position: flex;
      color: var(--ddd-theme-default-potential70);
      }

        insta-card{
        display: block;
        /* outline: auto; I'm just keeping this line as I found it by accident and I found the results to be fascinating despite not being what I was going for. */ 
        transform: translateY(-46px);
        width: 1500px;
        height: 600px;
        border: var(--ddd-border-md);
        text-align: center;
        font-size: 50px;
        overflow-y: scroll;
        border-color: var(--ddd-theme-default-potential70);
        }

        insta-indicator{
          display: block;
          position: fixed;
          transform: translate(300px, -120px);
        }

        insta-like-counter{
          display: block;
          transform: translate(-600px, 150px);
        }

    hr{
      color: var(--ddd-theme-default-potential70);
      padding-bottom: 20px;
    }

    .text{
        color: var(--ddd-theme-default-potential70);
      }

      @media (min-width: 500px) and (max-width: 800px){
        insta-indicator{
          transform: translateX(-100px);
        }
      }
      @media (prefers-color-scheme: dark) {

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
        transform: translateY(-50px);
        margin-bottom: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }

      .text{
        color: var(--ddd-theme-default-white);
      }

      h3 {
        color: var(--ddd-theme-default-white);
      }

        insta-card{
        display: block;
        /* outline: auto; I'm just keeping this line as I found it by accident and I found the results to be fascinating despite not being what I was going for. */ 
        transform: translateY(-46px);
        width: 1500px;
        height: 600px;
        border: var(--ddd-border-md);
        text-align: center;
        font-size: 50px;
        overflow-y: scroll;
        border-color: var(--ddd-theme-default-white);
        }

        hr{
          color: var(--ddd-theme-default-white);;
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
  this.updateQueryParam("currentIndex", this.value);
  this.loadUrl();
  }

  //Adapted from cjh6976-prog's project; the additional comments are notes so I can better understand what's happening
  loadFoxForAllSlides() {
    if (!this.slides.length) return;
    this.loadFoxIntoSlide(this.slides[this.currentIndex]);
  }
  
  changeSlide() {
  this.loadState();
  this.loadFoxIntoSlide(this.slides[this.currentIndex]);
  this.slides.forEach((slide, i) => {
  slide.style.display = i === this.currentIndex ? "block" : "none";
  this.saveState();
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
      this.loadFoxIntoSlide(this.slides[this.currentIndex]); //Loads a fox image to the current slide using this.slides & this.currentIndex as input
      this.value++;
      this.updateQueryParam("currentIndex", this.value);
    }
  }

previous() {
  if (this.currentIndex > 0) {
    this.currentIndex--;
    this.changeSlide();
    this.value--;
    this.loadFoxIntoSlide(this.slides[this.currentIndex]);
    this.updateQueryParam("currentIndex", this.value);
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
      img.style.width = "600px";
      img.style.height = "300px";
      img.style.borderRadius = "8px";
      img.loading = "lazy";
      slide.appendChild(img); //Creates image with additional info to the inputted slide
    } 
    catch (error) { //Reads an error in case of failure
      console.error("Error fetching fox image:", error);
    }
  }

//Adapted from btopro example
  updateQueryParam(key, value) {
    const currentUrl = new URL(window.location.href); //Gets URL of current page
    currentUrl.searchParams.set(key, value); // Set or update a parameter

    // Update the browser URL without reloading
    history.pushState(null, '', currentUrl.toString());
    saveUrl(currentUrl);
  }

  saveUrl(){
    localStorage.setItem("currentUrlLink", JSON.stringify(this.currentURL));
  }

  loadUrl(){
    const urlCurrent = localStorage.getItem("currentUrlLink");
    if (urlCUrrent) this.url = JSON.parse(urlCurrent);
  }

  saveState(){
    localStorage.setItem("currentState", JSON.stringify(this.currentIndex));
  }

  loadState(){
    const currentSlide = localStorage.getItem("currentState");
    if (currentSlide) this.url = JSON.parse(currentSlide);
  }
}

globalThis.customElements.define(Project1Insta.tag, Project1Insta);