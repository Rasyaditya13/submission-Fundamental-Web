const notesList = document.getElementById("notes-list");

async function fetchNotes() {
  showLoading();
  try {
    const response = await fetch("https://notes-api.dicoding.dev/v2/notes");
    const data = await response.json();
    displayNotes(data.data);
  } catch (error) {
    console.error("Error fetching notes:", error);
  } finally {
    hideLoading();
  }
}

function displayNotes(notes) {
  notesList.innerHTML = "";
  notes.forEach((note) => {
    const noteElement = document.createElement("note-item");
    noteElement.note = note;
    notesList.appendChild(noteElement);
  });
}

class NoteItem extends HTMLElement {
  set note(data) {
    this.innerHTML = `
      <div class="note-item">
        <h2>${data.title}</h2>
        <p>${data.body}</p>
        <small>${new Date(data.createdAt).toLocaleDateString()}</small>
        <button class="delete-btn" data-id="${data.id}">Hapus</button>
      </div>
    `;
    this.querySelector(".delete-btn").addEventListener("click", () => deleteNote(data.id));
  }
}
customElements.define("note-item", NoteItem);

class NoteForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <form id="note-form">
        <div class="form-group">
          <label for="title">Judul Catatan:</label>
          <input type="text" id="title" placeholder="Masukkan Judul " required>
        </div>
        <div class="form-group">
          <label for="body">Isi Catatan:</label>
          <textarea id="body" rows="5" placeholder="Masukkan Catatan" required></textarea>
        </div>
        <button type="submit">Tambahkan Catatan</button>
      </form>
    `;
    this.querySelector("form").addEventListener("submit", async (event) => {
      event.preventDefault();
      const title = this.querySelector("#title").value;
      const body = this.querySelector("#body").value;
      await addNote({ title, body });
      this.querySelector("form").reset();
    });
  }
}
customElements.define("note-form", NoteForm);

async function addNote(note) {
  showLoading();
  try {
    await fetch("https://notes-api.dicoding.dev/v2/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    fetchNotes();
  } catch (error) {
    console.error("Error adding note:", error);
  } finally {
    hideLoading();
  }
}

async function deleteNote(id) {
  showLoading();
  try {
    await fetch(`https://notes-api.dicoding.dev/v2/notes/${id}`, {
      method: "DELETE",
    });
    fetchNotes();
  } catch (error) {
    console.error("Error deleting note:", error);
  } finally {
    hideLoading();
  }
}

class LoadingIndicator extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '<div id="loading" class="loading">Loading...</div>';
  }
}
customElements.define("loading-indicator", LoadingIndicator);

function showLoading() {
  if (!document.querySelector("loading-indicator")) {
    const loadingIndicator = document.createElement("loading-indicator");
    document.body.appendChild(loadingIndicator);
  }
}

function hideLoading() {
  const loadingIndicator = document.querySelector("loading-indicator");
  if (loadingIndicator) {
    document.body.removeChild(loadingIndicator);
  }
}

class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<h1 class="title">Daftar Catatan</h1>`;
  }
}
customElements.define("app-header", AppHeader);

fetchNotes();
