fetch('userProfiles.json')
  .then(response => {
    if (!response.ok)
      throw new Error('Fetch error: ' + response.status);
    return response.json();
  })
  .then(users => {
    const container = document.getElementById('profiles');

    users.forEach(user => {
      const div = document.createElement('div');
      div.className = 'profile';
      div.innerHTML = `
        <h2>${user.firstName} ${user.lastName}</h2>
        <div class="section"><strong>Email:</strong> ${user.email}</div>
        <div class="section"><strong>Date of Birth:</strong> ${user.dateOfBirth}</div>
        <div class="section"><strong>Address:</strong> ${user.address.street}, ${user.address.city}, ${user.address.state} ${user.address.zipCode}</div>
        <div class="section"><strong>Preferences:</strong></div>
        <ul>
          <li>Theme: ${user.preferences.theme}</li>
          <li>Language: ${user.preferences.language}</li>
          <li>Notifications: ${user.preferences.notifications ? 'Enabled' : 'Disabled'}</li>
          <li>Subscribed: ${user.preferences.subscription ? 'Yes' : 'No'}</li>
        </ul>
      `;
      container.appendChild(div);
    });
  })
  .catch(err => console.error('Fetch error: ' + err.message));