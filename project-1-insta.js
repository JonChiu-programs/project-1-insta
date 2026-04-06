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
    this.loading = true;
    this.url = new URL(window.location.href);
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      currentIndex: { type: Number },
      total: {type : Number}, //This line of code is adapted from bpark5 in order to get indicator dots to appear without needing user input
      loading: {type : Boolean},
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
        display: inline-block;
        font-size: var(--ddd-font-size-ml);
        text-align: center;
        color: var(--ddd-theme-default-potential70);
        transform: translateY(-15px);
      }

        insta-card{
        display: block;
        /* outline: auto; I'm just keeping this line as I found it by accident and I found the results to be fascinating despite not being what I was going for. */ 
        transform: translateY(-46px);
        width: 1500px;
        height: 700px;
        border: var(--ddd-border-md);
        text-align: center;
        font-size: var(--ddd-font-size-2xs);
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

    .account{
      text-align: left;
      transform: translateY(10px);
      padding-left: var(--ddd-spacing-5);
    }

    .avatar{
      display: inline-block;
      height: 70px;
      width: 70px;
      background-color: var(--ddd-theme-default-white);
      border-radius: var(--ddd-radius-circle);
    }

    hr{
      color: var(--ddd-theme-default-potential70);
      padding-bottom: var(--ddd-spacing-2);
    }

    .text{
        color: var(--ddd-theme-default-potential70);
        font-size: var(--ddd-font-size-2sm);
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
        transform: translateY(-10px);
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
        font-size: var(--ddd-font-size-xl);
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
      <div class="account">
        <img class="avatar" alt="author" src="https://upload.wikimedia.org/wikipedia/commons/d/da/1-Light_glyph.png">
      <h3>JonChiu-programs</h3>
      </div>
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
  this.loadState();
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
      this.loadFoxIntoSlide(this.slides[this.currentIndex]); //Loads a fox image to the current slide using this.slides & this.currentIndex as input
      this.value++;
      this.updateQueryParam("currentIndex", this.currentIndex);
      this.saveState();
    }
  }

previous() {
  if (this.currentIndex > 0) {
    this.currentIndex--;
    this.changeSlide();
    this.value--;
    this.loadFoxIntoSlide(this.slides[this.currentIndex]);
    this.updateQueryParam("currentIndex", this.currentIndex);
    this.saveState();
  }
}

handleEvent(e){
  this.currentIndex = e.detail.index;
  this.changeSlide();
}

  //Adapted from cjh6976-prog's project; the additional comments are notes so I can better understand what's happening
  async loadFoxIntoSlide(slide) { //Takes this.slide as input
    try {
      const response = await fetch("/api/response.json"); //Does the fetching of fox images.  /api/response.json"
      const data = await response.json(); 
      slide.querySelectorAll("img").forEach(img => img.remove()); //Removes an existing image to make way for a new image; need to solve this.
      const img = document.createElement("img");
      //Additional image information
      img.src = data.images[this.currentIndex].src; //Uses currentIndex to change which image is wanted based on its position in the images array in response.json. Connects to the "src" element in each array entry.
      img.alt = "Random Fox";
      img.style.width = "480px";
      img.style.height = "370px";
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
  }

  saveState(){
    localStorage.setItem("currentState", JSON.stringify(this.currentIndex));
  }

  loadState(){
    const currentSlide = localStorage.getItem("currentState");
    if (currentSlide) this.url = JSON.parse(currentSlide);
    if (currentSlide) this.currentIndex = JSON.parse(currentSlide);
  }
}

globalThis.customElements.define(Project1Insta.tag, Project1Insta);