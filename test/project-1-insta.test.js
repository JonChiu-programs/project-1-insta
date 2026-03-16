import { html, fixture, expect } from '@open-wc/testing';
import "../project-1-insta.js";

describe("Project1Insta test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <project-1-insta
        title="title"
      ></project-1-insta>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
