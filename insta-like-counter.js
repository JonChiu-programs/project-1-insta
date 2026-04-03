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
    this.likeCount = "0";
    this.dislikeCount = "0";
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
      likeCount: {type : Number},
      dislikeCount: {type : Number}
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        height: 0px;
        width: 0px;
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-default-beaverBlue);
        font-family: var(--ddd-font-navigation);
      }

      .wrapper {
        display: inline-block;
        transform: translateX(-50px);
        margin-top: var(--ddd-spacing-0);
        padding: var(--ddd-spacing-1);
        height: 2px;
      }

      .likes{
        display: inline-block;
        transform: translateY(28.5px);
        margin-top: var(--ddd-spacing-15);
        padding: var(--ddd-spacing-4);
        height: 2px;
      }

      .dislikes{
        display: inline-block;
        transform: translate(200px, -203px);
        margin-top: var(--ddd-spacing-15);
        padding: var(--ddd-spacing-4);
        height: 2px;
      }
      
      h3 span {
        font-size: var(--counter-app-label-font-size, var(--ddd-font-size-s));
      }

      .number{
        display: inline-block;
        margin-left: var(--ddd-spacing-30);
        font-size: var(--ddd-font-size-ml);
        transform: translate(-180px, 75px);
      }

      .likeButton{
        display: inline-block;
        height: 80px;
        width: 110px;
        font-size: var(--ddd-font-size-3xs);
        text-align: center;
        padding-bottom: var(--ddd-spacing-3);
        background-color: var(--ddd-theme-default-error);
        border-width: var(--ddd-border-size-lg);
        border-color: var(--ddd-theme-default-beaverBlue);
        align-content: center;
      }

      .dislikeButton{
        display: inline-block;
        height: 80px;
        width: 110px;
        font-size: var(--ddd-font-size-3xs);
        text-align: center;
        padding-bottom: var(--ddd-spacing-3);
        background-color: var(--ddd-theme-default-error);
        border-width: var(--ddd-border-size-lg);
        border-color: var(--ddd-theme-default-beaverBlue);
        align-content: center;
      }

      .glyph{
        height: 50px;
        width: 50px;
        transform: translateY(6px);
      }

      .disLikeGlyph{
        height: 50px;
        width: 50px;
        transform: rotate(180deg) translateY(-6px);
      }

      .likeButton:focus{
        background-color: var(--ddd-theme-default-success);
      }

      .likeButton:hover{
        background-color: var(--ddd-theme-default-warning);
      }

      .dislikeButton:focus{
        background-color: var(--ddd-theme-default-success);
      }

      .dislikeButton:hover{
        background-color: var(--ddd-theme-default-warning);
      }

      @media (prefers-color-scheme: dark) {
        .likeButton{
        border-color: var(--ddd-theme-default-white);
      }

      .dislikeButton{
        border-color: var(--ddd-theme-default-white);
      }
      }
    `];
  }


  // Lit render the HTML
  render() {
    return html`
      <div class="wrapper">
      <div class = "likes"><h3 class="number">${this.likeCount}</h3>
        <button class="likeButton" @click="${this.upVote}">
        <img class="glyph" src="https://upload.wikimedia.org/wikipedia/commons/d/da/1-Light_glyph.png" alt="the like button">
        </button>
      </div>
      <div class = "dislikes">
        <h3 class="number">${this.dislikeCount}</h3>
        <button class="dislikeButton" @click="${this.downVote}">
        <img class="disLikeGlyph" src="https://upload.wikimedia.org/wikipedia/commons/d/da/1-Light_glyph.png" alt="the dislike button">
        </button>
      </div>
      </div>`;
  }

  //Adapted from dcagliola's code; Notes are meant to help me understand what is happening
  async firstUpdated() {
    this.loadFromStore();
  }

  upVote(){
    this.likeCount++;
    this.saveToStore();
  }

  downVote(){
    this.dislikeCount++;
    this.saveToStore();
  }

  saveToStore(){
    localStorage.setItem("likeClicks", JSON.stringify(this.likeCount)); //If these variables exist, creates an item in local storage
    localStorage.setItem("dislikeClicks", JSON.stringify(this.dislikeCount));
  }

  loadFromStore(){
    const clickLikes = localStorage.getItem("likeClicks"); //Gets the set items and creates workable variables.
    const clickDislikes = localStorage.getItem("dislikeClicks");

    if (clickDislikes) this.dislikeCount = JSON.parse(clickDislikes);//Returns values from const variables to the upvote & downvote variables
    if (clickLikes) this.likeCount = JSON.parse(clickLikes);
  }
}
globalThis.customElements.define(InstaLikeCounter.tag, InstaLikeCounter);