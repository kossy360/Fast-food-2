/* eslint-env browser */
const name = document.getElementById('name');
const dispName = document.getElementById('dispName');
const email = document.getElementById('email');
const password = document.getElementById('password1');
const phone1 = document.getElementById('phone1');
const phone2 = document.getElementById('phone2');
const address = document.getElementById('address');
const create = document.getElementById('create');
let checkEmail = false;
let checkPass = false;
let checkPhone1 = false;
let checkPhone2 = false;

class User {
  constructor(id, names, name2, emails, passwords, phone1s, phone2s, addresss) {
    this.id = id;
    this.name = names;
    this.displayName = name2;
    this.email = emails;
    this.password = passwords;
    this.phone1 = phone1s;
    this.phone2 = phone2s;
    this.address = addresss;
    this.orderHistory = [];
    this.oderedItems = [];
  }
}

email.addEventListener('blur', () => {
  inputTest('email');
});

email.addEventListener('input', () => {
  email.nextElementSibling.classList.replace('show', 'hide');
});

password.addEventListener('blur', () => {
  inputTest('password1');
});

password.addEventListener('input', () => {
  password.nextElementSibling.classList.replace('show', 'hide');
});

phone1.addEventListener('blur', () => {
  inputTest('phone1');
});

phone1.addEventListener('input', () => {
  phone1.nextElementSibling.classList.replace('show', 'hide');
});

phone2.addEventListener('blur', () => {
  inputTest('phone2');
});

phone2.addEventListener('input', () => {
  phone2.nextElementSibling.classList.replace('show', 'hide');
});

create.addEventListener('click', async () => {
  if (checkEmail && checkPass && checkPhone1 && checkPhone2
    && name.value && dispName.value && address.value) {
    const id = await request('GET', 'user/id').catch(errorHandler);
    if (id) {
      const user = new User(id, name.value, dispName.value, email.value, password.value,
        phone1.value, phone2.value, address.value);
      request('POST', 'new', user)
        .then(x => window.location.assign('./signin')).catch(errorHandler);
    }
  }
});

function checkRepeat() {
  const x = document.getElementById('emailError');
  request('GET', `check/profile/${email.value}`)
    .then((res) => {
      if (res === 'found') {
        x.textContent = 'email already exists';
        x.classList.replace('hide', 'show');
        checkEmail = false; return;
      }
      checkEmail = true;
    }).catch((err) => {
      errorHandler(err);
      x.textContent = 'cannot connect to server';
      x.classList.replace('hide', 'show');
    });
}

function inputTest(container) {
  const a = document.getElementById(container);
  if (!a.value) return;
  const b = document.getElementById(`${container}Error`);
  const emailTest = /\w+@\w+\.\w+/;
  const pass = /^([\w\s]|[^\w]){6,}$/;
  const phone = /(0|\+234)\d{10}/;
  if (container === 'email') {
    const x = emailTest.test(a.value);
    if (!x) {
      b.textContent = 'incorrect email format';
      b.classList.replace('hide', 'show');
      checkEmail = x; return;
    }
    checkRepeat();
  } else if (container === 'password1') {
    const x = pass.test(a.value);
    if (!x) {
      b.textContent = 'password must contain 8 characters or more';
      b.classList.replace('hide', 'show');
      checkPhone1 = x; return;
    }
    checkPass = x;
  } else if (container === 'phone1') {
    const x = phone.test(a.value);
    if (!x) {
      b.textContent = 'incorrect phone number';
      b.classList.replace('hide', 'show');
      checkPhone1 = x; return;
    }
    checkPhone1 = x;
  } else {
    const x = phone.test(a.value);
    if (!x) {
      b.textContent = 'incorrect phone number';
      b.classList.replace('hide', 'show');
      checkPhone2 = x; return;
    }
    checkPhone2 = x;
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
