/**
 * Copyright 2026 interested-learner
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `playlist-indicator`
 * 
 * @demo index.html
 * @element playlist-indicator
 */
export class InstaIndicator extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "insta-indicator";
  }

  constructor() {
    super();
        this.total = 0;
        this.currentIndex = 0;
  }

  static get properties() {
    return {
      ...super.properties,
      total: { type: Number },
      currentIndex: { type: Number },
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        position: fixed;
        transform: translate(850px);
      }
      .dots {
        transform: translateY(420px);
        display: flex;
        justify-content: center;
        visibility: visible;
        gap: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-2);
        cursor: pointer;
        }

    .dot {
    visibility: visible;
    width: 30px;
    height: 30px;
    border-radius: var(--ddd-radius-circle);
    background-color: var(--ddd-theme-default-skyBlue);
    opacity: 0.7;
    }
    
    .dot.active {
    opacity: 1;
    background-color: var(--ddd-theme-default-navy80);
    }

    @media (prefers-color-scheme: dark) {
    .dot {
    background-color: var(--ddd-theme-default-keystoneYellow);
    }
    
    .dot.active {
    background-color: var(--ddd-theme-default-disabled);
    }
    }
        `];
  }

  render() {
    let dots = [];
      for (let i = 0; i < this.total; i++) {
      dots.push(html`
      <span class="dot ${i === this.currentIndex ? "active" : ""}" @click="${this.handleDotClick}" data-index="${i}"><slot></slot></span>
      `);
    }
    return html`
    <slot></slot>
      <div class="dots">
        ${dots}
      </div>`;
  }
  
  handleDotClick(e){
    const indexChange = new CustomEvent("insta-index-changed", {
        composed: true,
        bubbles: true,
        detail: {
            index: parseInt(e.target.dataset.index)
        },
    });
    this.dispatchEvent(indexChange);
  }
}

globalThis.customElements.define(InstaIndicator.tag, InstaIndicator);