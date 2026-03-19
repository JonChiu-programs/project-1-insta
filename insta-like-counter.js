/**
 * Copyright 2026 JonChiu-programs
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `counter-app`
 * 
 * @demo index.html
 * @element counter-app
 */
export class InstaLikeCounter extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "insta-like-counter";
  }

  constructor() {
    super();
    this.count = "0";
    this.min = "0";
    this.max = "0";
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      count: {type : Number, reflect: true},
      min: {type : Number},
      max: {type : Number},
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        height: 0px;
        width: 0px;
        display: inline-block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-default-beaverBlue);
        font-family: var(--ddd-font-navigation);
      }

      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      
      h3 span {
        font-size: var(--counter-app-label-font-size, var(--ddd-font-size-s));
      }

      .number{
        margin-left: 265px;
        font-size: 100px;
        transform: translate(-100px, 125px);
      }

      .addButton{
        height: 100px;
        width: 150px;
        font-size: 65px;
        text-align: center;
        padding-bottom: 10px;
        background-color: red;
        border-width: 5px;
        border-color: white;
        align-content: center;
        box-shadow: none;
      }

      .glyph{
        height: 100px;
        width: 100px;
        transform: translateY(-4px);
      }

      .addButton:focus{
        background-color: var(--ddd-theme-default-creekTeal);
      }

      .addButton:hover{
        background-color: var(--ddd-theme-default-creekTeal);
      }
    `];
  }


  // Lit render the HTML
  render() {
    return html`
      <div class="wrapper">
        <h3 class="number">${this.count}</h3>
        <button class="addButton" @click="${this.increment}">
        <img class="glyph" src="https://upload.wikimedia.org/wikipedia/commons/d/da/1-Light_glyph.png" alt="the like button">
        </button>
        <slot></slot>
      </div>`;
  }

  increment(){
      this.count++;
  }
}
globalThis.customElements.define(InstaLikeCounter.tag, InstaLikeCounter);