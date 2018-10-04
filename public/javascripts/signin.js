/* eslint-env browser */
const email = document.getElementById('email');
const password = document.getElementById('password1');
const sign = document.getElementById('sign');
let checkEmail = false;
let checkPass = false;

email.addEventListener('blur', () => {
  inputTest('email');
});

email.addEventListener('input', (e) => {
  e.target.nextElementSibling.classList.replace('show', 'hide');
});

password.addEventListener('blur', () => {
  inputTest('password1');
});

password.addEventListener('input', (e) => {
  e.target.nextElementSibling.classList.replace('show', 'hide');
});

sign.addEventListener('click', async () => {
  const x = {};
  if (checkEmail && checkPass) {
    x.email = email.value;
    x.password = password.value;
    request('POST', 'signin', x)
      .then((res) => {
        if (res === 'not found') {
          const a = document.getElementById('signinError');
          a.classList.replace('hide', 'show');
          a.textContent = 'username or password incorrect';
          return;
        }
        window.location.assign(`./${res}`);
      }).catch(errorHandler);
  }
});

function inputTest(container) {
  const a = document.getElementById(container);
  if (!a.value) return;
  const b = document.getElementById(`${container}Error`);
  const emailTest = /\w+@\w+\.\w+/;
  const pass = /^([\w\s]|[^\w]){6,}$/;
  if (container === 'email') {
    const x = emailTest.test(a.value);
    if (!x) {
      b.textContent = 'incorrect email format';
      b.classList.replace('hide', 'show');
      checkEmail = x; return;
    }
    checkEmail = x;
  } else {
    const x = pass.test(a.value);
    if (!x) {
      b.textContent = 'password must contain 8 characters or more';
      b.classList.replace('hide', 'show');
      checkPass = x; return;
    }
    checkPass = x;
  }
}

function request(method, url, body) {
  return new Promise((res, rej) => {
    const req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open(method.toUpperCase(), url);
    req.timeout = 10000;
    req.addEventListener('load', () => {
      if (req.status < 400) res(req.response);
      else rej(req);
    });
    req.addEventListener('error', () => {
      throw rej(Error('not connected'));
    });
    if (body) {
      req.setRequestHeader('content-type', 'application/json');
      req.send(JSON.stringify(body));
    } else req.send();
  });
}

function errorHandler(err) {
  console.log(err.status);
  console.log(err.statusText);
}
