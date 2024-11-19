document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
  
    // Send signup request to backend
    // Assuming signup is successful:
    localStorage.setItem('currentUser', username);
    window.location.href = 'index.html';
  });
  
  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
  
    // Send login request to backend
    // Assuming login is successful:
    localStorage.setItem('currentUser', username);
    window.location.href = 'index.html';
  });
  
  document.getElementById('cancelButton').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
  