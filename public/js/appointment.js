const appointmentForm = document.querySelector('form');
const elements = document.querySelector('form');
const doAppointment = document.getElementById('doAppointment');
const pangalans = document.getElementsByClassName('pangalan');

const checkName = function () {
  lname = document.getElementById('lastname').value;
  fname = document.getElementById('firstname').value;
  bdate = document.getElementById('birthdate').value;

  if (lname.length > 1 && fname.length > 1 && bdate.length == 10) {
    data = {
      fname: fname,
      lname: lname,
      bdate: bdate,
    };

    fetch('/appointment/checknames', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        appointment: data,
      }),
    }).then((r) =>
      r.json().then((data) => {
        if (data.doa != 'valid') {
          document.getElementById('msg').style.display = 'block';
          document.getElementById('text-msg').innerHTML =
            'You already have an appoint on <b>' +
            new Date(data.doa).toDateString() +
            '</b>';
          document.getElementById('btn-submit').disabled = true;
        } else {
          document.getElementById('btn-submit').disabled = false;
          document.getElementById('msg').style.display = 'none';
        }
      })
    );
  }
};

Array.from(pangalans).forEach(function (element) {
  element.addEventListener('blur', checkName);
});

doAppointment.addEventListener('change', (e) => {
  doa = doAppointment.value;
  data = { doa: doa };
  fetch('/appointment/check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      appointment: data,
    }),
  }).then((r) =>
    r.json().then((data) => {
      if (data.daycount >= 10) {
        document.getElementById('msg').style.display = 'block';
        document.getElementById('text-msg').innerHTML =
          'Appointment for <b>' +
          new Date(doa).toDateString() +
          '</b> is already full. Please select another date.';
        document.getElementById('btn-submit').disabled = true;
      } else {
        document.getElementById('btn-submit').disabled = false;
        document.getElementById('msg').style.display = 'none';
      }
    })
  );
});

appointmentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let data = {};

  for (var i = 0, element; (element = elements[i++]); ) {
    if (element.name != '') data[element.name] = element.value;
  }

  fetch('/appointment/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      appointment: data,
    }),
  }).then((r) =>
    r.json().then((data) => {
      if (data.errmsg.indexOf('duplicate')) {
        console.log('Email already exist');
      }
    })
  );
});
