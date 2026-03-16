// I will put the arrows here that can be clicked and change the slide of the playlist

/**
 * Copyright 2026 interested-learner
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `play-list-project`
 * 
 * @demo index.html
 * @element play-list-project
 */
export class InstaArrow extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "insta-arrow";
  }

  constructor() {
    super();
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
      }
      .wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--ddd-spacing-2);
      }
      button {
        background-color: var(--ddd-theme-default-beaverBlue);
        color: white;
        border: solid;
        padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
        border-radius: 100px;
        cursor: pointer;
        font-size: 100px;
        border-color: white;
        border-width: 2px;
      }

      button.prev{
        transform: translateX(-100px);
      }

      button.next{
        transform: translateX(100px);
      }
      button:hover {
        opacity: 0.8;
        background-color: green;
      }

      button:focus{
        background-color: red;
      }
      @media (min-width: 500px) and (max-width: 800px){
        button{
          height: 75%;
          width: 75%;
          font-size: 75%;
        }
        button.prev{
        transform: translateX(-75px);
      }

      button.next{
        margin-left: 55px;
        transform: translateX(100px);
      }
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
    <div class="wrapper">
        <button class="prev" @click=${() => this.dispatchEvent(new CustomEvent('previous', {bubbles: true, composed: true }))}><=</button>
        <slot></slot>
        <button class="next" @click=${() => this.dispatchEvent(new CustomEvent('next', {bubbles: true, composed: true}))}>=></button>
    </div>
    `;
  }

}

globalThis.customElements.define(InstaArrow.tag, InstaArrow);