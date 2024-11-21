async function fetchNotes() {
  try {
    const response = await fetch('http://localhost:3000/files');
    if (!response.ok) throw new Error('Failed to fetch files');
    const notes = await response.json();

    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';

    notes.forEach(note => {
      const noteElement = document.createElement('div');
      noteElement.classList.add('note');

      noteElement.innerHTML = `
        <h4>${note.title}</h4>
        <p>${note.description}</p>
        <p><strong>Price:</strong> $${note.price}</p>
        <a href="http://localhost:3000${note.filePath}" download="${note.fileName}" class="download-btn">Download</a>
      `;

      notesList.appendChild(noteElement);
    });
  } catch (error) {
    console.error('Error fetching notes:', error);
    document.getElementById('notesList').innerHTML = '<p class="error">Unable to load notes.</p>';
  }
}

fetchNotes();
