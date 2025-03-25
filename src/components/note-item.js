import { deleteNote } from '../index.js';

class NoteItem extends HTMLElement {
  set note(note) {
    this._note = note;
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="note">
        <h3>${this._note.title}</h3>
        <p>${this._note.body}</p>
        <button class="delete-btn">Hapus</button>
      </div>
    `;

    this.querySelector(".delete-btn").addEventListener("click", () => {
      deleteNote(this._note.id);
    });
  }
}

customElements.define("note-item", NoteItem);
