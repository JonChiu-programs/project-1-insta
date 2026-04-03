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
        color: var(--ddd-theme-default-white);
        border: var(--ddd-border-xs);
        padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
        border-radius: var(--ddd-radius-rounded);
        cursor: pointer;
        font-size: var(--ddd-font-size-xl);
        border-color: var(--ddd-theme-default-white);;
        border-width: var(--ddd-border-size-xl);
      }

      button:hover {
        opacity: 0.8;
        background-color: var(--ddd-theme-default-forestGreen);
      }

      button:focus{
        background-color: var(--ddd-theme-default-original87Pink);
      }
      @media (min-width: 500px) and (max-width: 800px){
        button{
          height: 75%;
          width: 75%;
          font-size: var(--ddd-font-size-5xs);
        }

        button.prev{
        transform: translateX(-75px);
      }

      button.next{
        margin-left: var(--ddd-spacing-14);
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