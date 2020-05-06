console.log('Client side');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#one');
const messageTwo = document.querySelector('#two');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  fetch('http://localhost:3000/weather?address=' + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.innerHTML = data.error;
        } else {
          messageOne.innerHTML =
            data.humidity + ' ' + '<small>' + data.location + '</small>';
          messageTwo.innerHTML = data.forecast[0].description;
        }
      });
    }
  );
});
