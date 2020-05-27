const loginForm = document.querySelector('form');
const email = document.getElementById('email');
const password = document.getElementById('password');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let data = {
    email: email.value,
    password: password.value,
  };

  fetch('/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: data,
    }),
  }).then((r) =>
    r.json().then((data) => {
      if (data.error) {
        document.getElementById('msg').style.display = 'block';
        document.getElementById('msg-body').innerHTML = data.error;
        document.getElementById('msg').classList.add('is-danger');
      } else {
        if (data.token) {
          url = '/users/tasks';
          location = url;
        }
      }
    })
  );
});
