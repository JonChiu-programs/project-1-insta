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
    <slot></slot>
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

}

globalThis.customElements.define(Project1Insta.tag, Project1Insta);