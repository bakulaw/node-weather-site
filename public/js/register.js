const loginForm = document.querySelector('form');
const name = document.getElementById('name');
const age = document.getElementById('age');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (password.value === password2.value) {
    let data = {
      name: name.value,
      age: age.value,
      email: email.value,
      password: password.value,
    };

    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: data,
      }),
    }).then((r) =>
      r.json().then((data) => {
        // console.log(data)
        var element = document.getElementById('msg');
        element.style.display = 'block';
        if (data.errmsg) {
          element.classList.add('is-danger');
          document.getElementById('text-msg').innerHTML =
            'Error registering account';
          console.log(data.errmsg);
          if (data.errmsg.indexOf('duplicate'))
            document.getElementById('text-msg').innerHTML =
              'Email already exists.';
        } else {
          var myobj = document.getElementById('frm');
          myobj.remove();
          element.classList.add('is-success');
          document.getElementById('text-msg').innerHTML =
            '<b>Registration is successful.</b>';
        }
      })
    );
  }
});
