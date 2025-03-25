import { addNote } from '../index.js';

class NoteForm extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <form id="note-form">
        <input type="text" id="title" placeholder="Judul Catatan" required />
        <textarea id="body" placeholder="Isi Catatan" required></textarea>
        <button type="submit">Tambah Catatan</button>
      </form>
    `;

    this.querySelector("#note-form").addEventListener("submit", async (event) => {
      event.preventDefault();
      const title = this.querySelector("#title").value;
      const body = this.querySelector("#body").value;

      await addNote({ title, body });

      this.querySelector("#title").value = "";
      this.querySelector("#body").value = "";
    });
  }
}

customElements.define("note-form", NoteForm);
