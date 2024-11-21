document.getElementById('sellForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const price = document.getElementById('price').value;
  const fileInput = document.getElementById('file');
  const file = fileInput.files[0];

  if (!file) {
    alert('Please attach a file.');
    return;
  }

  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('price', price);
  formData.append('file', file);

  try {
    const response = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('File uploaded successfully!');
      this.reset();
    } else {
      alert('Error uploading file.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred.');
  }
});
