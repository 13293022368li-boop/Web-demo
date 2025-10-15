fetch('book.xml')
  .then(response => {
    if (!response.ok) throw new Error('Fetch error: ' + response.status);
    return response.text();
  })
  .then(xmlText => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

    const books = xmlDoc.getElementsByTagName('book');
    const booksContainer = document.getElementById('books');

    for (let book of books) {
      const title = book.getElementsByTagName('title')[0].textContent;
      const author = book.getElementsByTagName('author')[0].textContent;
      const price = book.getElementsByTagName('price')[0].textContent;

      const div = document.createElement('div');
      div.className = 'book';
      div.innerHTML = `<strong>${title}</strong><br>
                       Author: ${author}<br>
                       Price: $${price}`;
      booksContainer.appendChild(div);
    }
  })
  .catch(err => console.error('Error:', err.message));