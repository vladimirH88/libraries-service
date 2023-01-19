const form = document.forms.form;

const setRegistrationErrorMessage = (message) =>
  (document.querySelector('#registrationError').innerText = message);

form.addEventListener('input', () => {
  setRegistrationErrorMessage('');
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
});

async function onSubmitForm() {
  const id = window.location.search.split('=')[1];

  const data = {
    id: +id,
    login: form.login.value,
    password: form.password.value,
  };
  try {
    const fetchData = await fetch('/auth/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    });
    const response = await fetchData.json();
    if (fetchData.status >= 400) {
      const m = Array.isArray(response.message)
        ? response.message.join('\n')
        : response.message;
      setRegistrationErrorMessage(m);
      return;
    }
    window.location.replace(response.redirectUrl);
  } catch (error) {
    console.log(error);
  }
}
