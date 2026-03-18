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
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      currentIndex: { type: Number },
      total: {type : Number} //This line of code is adapted from bpark5 in order to get indicator dots to appear without needing user input
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

      h3 span {
        font-size: var(--play-list-project-label-font-size, var(--ddd-font-size-s));
      }

        insta-card{
      display: block;
        /* outline: auto; I'm just keeping this line as I found it by accident and I found the results to be fascinating despite not being what I was going for. */ 
        transform: translateY(-70px);
        width: 1000px;
        height: 800px;
        border: var(--ddd-border-md);
        text-align: center;
        font-size: 100px;
        overflow-y: scroll;
        }


    h3{
      text-align: center;
      position: flex;
    }

    hr{
      width: 75px;
      color: white;
      padding-bottom: 20px;
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
        <p>Look at all these foxes!</p>
        <slot></slot>
    </insta-card>
    <insta-indicator
    @insta-index-changed="${this.handleEvent}"
    .total="${this.slides ? this.slides.length : 0}"
    .currentIndex="${this.currentIndex}">
    <insta-like-counter></insta-like-counter>
  </insta-indicator>
  </insta-arrow>
  </div>`;
  }

  firstUpdated() {
  this.slides = Array.from(this.querySelectorAll("insta-slide"));
  this.total = this.slides.length; //This line of code is adapted from bpark5 in order to get indicator dots to appear without needing user input
  this.changeSlide();
  this.getFox(); //Need to figure out how to prevent duplicate images on a slide that already has one.
  }
  
  changeSlide() {
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
      this.getFox(); //For when I need a laugh: the reason why this line wasn't working was because I put a "," instead of a "." on accident lol.
    }
}

previous() {
  if (this.currentIndex > 0) {
    this.currentIndex--;
    this.changeSlide();
  }
}

handleEvent(e){
  this.currentIndex = e.detail.index;
  this.changeSlide();
}

getFox() { //Adapted from btopro example; comments are kept in to remind me what everything is supposed to do.
      fetch("https://randomfox.ca/floof/").then((resp) => {
      // headers indicating the request was good, then process it
      if (resp.ok) {
        // return the response as JSON. .text() is another valid response
        // though that's more useful for HTML / non data object responses
        return resp.json();
      }
    })
    .then((data) => {
        // THEN after the 2nd promise resolves, do this
        // the data being passed in, whill be the response object as json()
        // from the previous Promise resolving
        // here we can see that data.image allows us to access the image
        // attribute in the response
        let image = document.createElement('img');
        image.src = data.image;
        image.loading = "lazy";
        this.appendChild(image);
    });
  }
}

globalThis.customElements.define(Project1Insta.tag, Project1Insta);