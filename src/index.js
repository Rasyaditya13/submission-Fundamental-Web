import './components/styles/style.css';
import './components/app-header.js';
import './components/note-form.js';
import './components/note-item.js';
import './components/loading-indicator.js';

const notesList = document.getElementById("notes-list");

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

export async function addNote(note) {
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

export async function deleteNote(id) {
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

document.addEventListener("DOMContentLoaded", () => {
  fetchNotes();
});