class AppHeader extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `<h1>Daftar Catatan</h1>`;
  }
}

customElements.define("app-header", AppHeader);
