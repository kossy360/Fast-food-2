/* eslint-env browser */
/* import {
  EndPoint, request,
} from '/javascripts/userEndPoints.js';
// import {EndPoint} from './userEndPoints'; */

const body = document.querySelector('body');
const cartBtn = document.querySelector('.cartButton');
const itemCount = document.querySelector('.itemCount');
const orderHistory = document.querySelector('.orderHistory');
const sign = document.getElementsByClassName('sign');
const pName = document.querySelector('.pName');
const profile = document.querySelector('.profile');
const pEdit = document.querySelector('.pEdit');
const orderHis = document.querySelector('.orderHis');
const lgOut = document.querySelector('.lgOut');
const chkOUt = document.querySelector('.chkOut');
const checkOut = document.querySelector('.checkOut');
const address = document.querySelector('.address');
const payMethod = document.querySelector('.payMethod');
const cartItems = document.querySelector('.cartItems');
const cartItemsDefault = document.querySelector('.cartItemsDefault');
const orderTotal = document.querySelector('.orderTotal');
const category = document.querySelector('.category');
const categorySwitch1 = document.querySelector('.categorySwitch1');
const categorySwitch2 = document.querySelector('.categorySwitch2');
const nameContainer = document.querySelector('.nameContainer');
const menuBody = document.querySelector('.menuBody');
// const control = new EndPoint();

// start();

class OrderDiv {
  constructor(id, item, order, container) {
    this.id = id;
    this.item = item;
    this.order = order;
    this.container = container;
  }

  initialize() {
    const a = this.order;
    const b = this.item;
    const c = this.container;

    const main = document.createElement('div');
    main.setAttribute('class', 'asDiv');
    c.insertBefore(main, orderTotal);

    const nameDiv = document.createElement('div');
    nameDiv.setAttribute('class', 'cartNameDiv');
    main.appendChild(nameDiv);

    const img = document.createElement('img');
    img.setAttribute('class', 'nameImg');
    img.setAttribute('src', b.imgsrc);
    nameDiv.appendChild(img);

    const name = document.createElement('p');
    name.setAttribute('class', 'nameP');
    name.textContent = b.name;
    nameDiv.appendChild(name);

    const qty = document.createElement('div');
    qty.setAttribute('class', 'qty');
    main.appendChild(qty);

    const price = document.createElement('p');
    price.setAttribute('class', 'cartPrice');
    price.textContent = `₦ ${b.total}`;

    const input = document.createElement('input');
    input.setAttribute('class', 'qtyInput');
    input.setAttribute('type', 'number');
    input.value = 1;
    input.addEventListener('input', () => {
      const x = Number(input.value);
      if (x > b.stock) {
        input.value = b.stock.toString();
      }
      if (input.value === '0') {
        input.value = 1;
      }
      b.quantity = x;
      price.textContent = `₦ ${b.total}`;
      a.total();
      a.count();
    });

    const subtract = document.createElement('button');
    subtract.setAttribute('class', 'qtyBtn');
    subtract.textContent = '-';
    subtract.addEventListener('click', () => {
      let x = Number(input.value);
      if (x > 1) {
        x -= 1;
      }
      b.quantity = x;
      input.value = x.toString();
      price.textContent = `₦ ${b.total}`;
      a.total();
      a.count();
    });

    const add = document.createElement('button');
    add.setAttribute('class', 'qtyBtn');
    add.textContent = '+';
    add.addEventListener('click', () => {
      let x = Number(input.value);
      if (x < b.stock) {
        x += 1;
      }
      b.quantity = x;
      input.value = x.toString();
      price.textContent = `₦ ${b.total}`;
      a.total();
      a.count();
    });
    qty.appendChild(subtract);
    qty.appendChild(input);
    qty.appendChild(add);
    main.appendChild(price);

    const closeBtn = document.createElement('button');
    closeBtn.setAttribute('class', 'closeBtn');
    closeBtn.setAttribute('id', `close${this.id}`);
    closeBtn.textContent = 'X';
    closeBtn.addEventListener('click', () => {
      a.remove(b);
      main.parentElement.removeChild(main);
      document.getElementById(`item:${this.id}`).classList.remove('selected');
      a.total();
      a.count();
    });
    main.insertBefore(closeBtn, nameDiv);
  }
}

class OrderHis {
  constructor(order) {
    this.container = orderHistory;
    this.order = order;
  }

  initialize() {
    const main = document.createElement('div');
    main.classList.add('orderHistoryDiv');
    this.container.appendChild(main);

    const date = document.createElement('p');
    date.classList.add('orderHistoryDate');
    date.textContent = order.date;
    main.appendChild(date);

    const table = document.createElement('table');
    table.setAttribute('class', 'ordersTable');
    main.appendChild(table);

    const h1 = document.createElement('th');
    table.appendChild(h1);
    const headArray = ['Item', 'Quantity'];

    for (let i = 0; i < 2; i += 1) {
      const td1 = document.createElement('td');
      td1.setAttribute('class', 'tableHead');
      td1.textContent = headArray[i];
      h1.appendChild(td1);
    }

    for (let j = 0; j < this.order.orderItems.length; j += 1) {
      const y = this.order.orderItems[j];
      const tr = document.createElement('tr');
      table.appendChild(tr);
      const td1 = document.createElement('td');
      td1.textContent = y.item.name;
      tr.appendChild(td1);
      const td2 = document.createElement('td');
      td2.textContent = y.quantity;
      tr.appendChild(td2);
    }

    const buttons = document.createElement('div');
    main.appendChild(buttons);

    const reOrder = document.createElement('button');
    reOrder.classList.add('orderHistoryButton');
    reOrder.textContent = 'Order';
    reOrder.addEventListener('click', () => {

    });
    buttons.appendChild(reOrder);

    const oDelete = document.createElement('button');
    oDelete.classList.add('orderHistoryButton');
    oDelete.textContent = 'Delete';
    oDelete.addEventListener('click', () => {

    });
    buttons.appendChild(oDelete);
  }
}

const order = {
  id: `od-${random()}${random()}${random()}`,
  date: new Date().toLocaleDateString(),
  items: [],

  total() {
    let i = 0;
    let c = 0;
    while (i < this.items.length) { c += this.items[i].total; i += 1; }
    orderTotal.textContent = `Total: ₦${c}`;
    chkOUt.classList[c > 0 ? 'remove' : 'add']('hide');
  },

  count() {
    let i = 0;
    let c = 0;
    while (i < this.items.length) { c += this.items[i].quantity; i += 1; }
    itemCount.textContent = c;
    chkOUt.classList[c > 0 ? 'remove' : 'add']('hide');
  },

  add(item) {
    if (this.items.length === 0) {
      cartItemsDefault.classList.add('hide');
      orderTotal.classList.remove('hide');
    }
    const x = {
      get total() {
        return this.price * this.quantity;
      },
    };
    x.name = item.name;
    x.price = item.price;
    x.quantity = 1;
    x.imgsrc = item.imgsrc;
    x.stock = item.quantity;
    this.items.push(x);
    const z = new OrderDiv(item.id, x, this, cartItems);
    z.initialize();
    this.total();
    this.count();
  },

  remove(item) {
    const a = this.items;
    a.splice(a.indexOf(item), 1);
    if (this.items.length === 0) {
      orderTotal.classList.add('hide');
      cartItemsDefault.classList.remove('hide');
    }
  },
};

class ItemDiv {
  constructor(item) {
    this.item = item;
    this.categoryDiv = document.getElementById(this.item.category);
  }

  initialize() {
    const a = this.item;
    const div = this.categoryDiv;
    const arranger = document.querySelector(`#arranger${a.category}`);

    const main = document.createElement('div');
    main.setAttribute('class', 'itemDiv');
    main.setAttribute('id', `item:${a.id}`);
    main.addEventListener('click', () => {
      if (main.classList.contains('selected')) {
        main.classList.remove('selected');
        document.getElementById(`close${a.id}`).click();
        return;
      }
      main.classList.add('selected');
      order.add(a);
    });
    div.insertBefore(main, arranger);

    const img = document.createElement('img');
    img.setAttribute('src', a.imgsrc);
    main.appendChild(img);

    const name = document.createElement('p');
    name.setAttribute('class', 'itemName');
    name.textContent = a.name;
    main.appendChild(name);

    const price = document.createElement('p');
    price.setAttribute('class', 'itemPrice');
    price.textContent = a.price;
    main.appendChild(price);
  }
}

class CategoryDiv {
  constructor(name) {
    this.name = name;
    this.container = menuBody;
    this.nameContainer = nameContainer;
    this.div = document.createElement('div');
    this.div.setAttribute('class', 'categoryDiv');
    this.div.classList.add(this.container.hasChildNodes() ? 'hide' : 'showing');
    this.div.setAttribute('id', this.name);
    this.container.appendChild(this.div);
  }

  initialize() {
    const a = this.nameContainer;

    const container = document.createElement('div');
    container.setAttribute('class', 'nameContainer2');
    container.classList.add(this.div.classList.contains('hide') ? 'hide' : 'nc-showing');
    a.appendChild(container);

    const name = document.createElement('p');
    name.setAttribute('class', 'categoryName');
    name.textContent = this.name;
    container.appendChild(name);

    for (let i = 0; i < 2; i += 1) {
      const x = document.createElement('div');
      x.classList.add('arranger');
      if (i === 0) x.setAttribute('id', `arranger${this.name}`);
      this.div.appendChild(x);
    }
  }
}

async function start() {
  const x = /us-\w{8}/.exec(window.location.href);
  if (x) {
    const y = await control.getUser().catch(errorHandler);
    if (y) {
      pName.classList.remove('hide');
      pName.textContent = y.displayName;
    } return;
  }
  sign[0].classList.remove('hide'); sign[1].classList.remove('hide');
  control.initialize();
}

function chkOut(orderObj) {
  const a = orderObj;
  checkOut.style.display = 'block';
  for (let i = 0; i < user.address.length; i++) {
    const addr = document.createElement('p');
    addr.classList.add('chkOutAddr');
    if (i === 0) addr.classList.add('activeaddr');
    addr.textContent = user.address[i];
    addr.addEventListener('click', (e) => {
      if (!e.target.classList.contains('activeaddr')) {
        document.querySelector('.activeaddr').classList.remove('activeaddr');
        document.querySelector('.activeInput').classList.remove('.activeInput');
      }
      a.address = user.address[i];
    });
    address.appendChild(addr);
  }

  const newaddr = document.createElement('p');
  newaddr.textContent = 'use different address';
  const input = document.createElement('input');
  input.classList.add('addrInput');
  address.appendChild(input);
  const inputBtn = document.createElement('button');
  inputBtn.classList.add('addrInputBtn');
  inputBtn.textContent = 'Use';
  inputBtn.addEventListener('click', () => {
    if (input.value) {
      document.querySelector('.activeaddr').classList.remove('activeaddr');
      input.classList.add('activeInput');
      a.address = input.value;
    }
  });
  address.appendChild(inputBtn);

  const submit = document.createElement('button');
  submit.classList.add('chkOutBtn');
  submit.textContent = 'Place Order';
  submit.addEventListener('click', () => {

  });
}

function switcher(x, y) {
  const a = document.querySelector('.showing');
  const b = document.querySelector('.nc-showing');
  a.classList.replace('showing', 'hide');
  b.classList.replace('nc-showing', 'hide');
  if (y) {
    menuBody.lastElementChild.classList.replace('hide', 'showing');
    nameContainer.lastElementChild.classList.replace('hide', 'nc-showing');
  } else if (x) {
    if (!menuBody.lastElementChild.isSameNode(a)) {
      a.nextElementSibling.classList.replace('hide', 'showing');
      b.nextElementSibling.classList.replace('hide', 'nc-showing');
    } else {
      menuBody.firstElementChild.classList.replace('hide', 'showing');
      nameContainer.firstElementChild.classList.replace('hide', 'nc-showing');
    }
  } else if (!menuBody.firstElementChild.isSameNode(a)) {
    a.previousElementSibling.classList.replace('hide', 'showing');
    b.previousElementSibling.classList.replace('hide', 'nc-showing');
  } else {
    menuBody.lastElementChild.classList.replace('hide', 'showing');
    nameContainer.lastElementChild.classList.replace('hide', 'nc-showing');
  }
}

function errorHandler(err) {
  console.log(err.statusText);
  console.log(err.message);
}

pName.addEventListener('click', (e) => {
  e.stopPropagation();
  cartBtn.classList.remove('opened');
  cartItems.classList.add('hide');
  if (pName.classList.contains('opened')) {
    pName.classList.remove('opened');
    profile.classList.add('hide');
  } else {
    pName.classList.add('opened');
    profile.classList.remove('hide');
  }
});

lgOut.addEventListener('click', () => {
  request('GET', 'logout')
    .then(() => {
      control.user = null;
      window.location.href = 'http://localhost:3000/';
    })
    .catch(errorHandler);
});

cartItems.addEventListener('click', (e) => {
  e.stopPropagation();
});

cartBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  pName.classList.remove('opened');
  profile.classList.add('hide');
  if (cartBtn.classList.contains('opened')) {
    cartBtn.classList.remove('opened');
    cartItems.classList.add('hide');
  } else {
    cartBtn.classList.add('opened');
    cartItems.classList.remove('hide');
  }
});

categorySwitch1.addEventListener('click', () => {
  switcher();
});

categorySwitch2.addEventListener('click', () => {
  switcher(1);
});

window.addEventListener('click', () => {
  cartBtn.classList.remove('opened');
  cartItems.classList.add('hide');
  pName.classList.remove('opened');
  profile.classList.add('hide');
});

// dummy constructors
class Item {
  constructor(id, name, quantity, category, price, imgsrc) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.category = category;
    this.price = price;
    this.imgsrc = imgsrc;
  }
}

const categories = ['category1', 'category2', 'category3', 'category4'];

function random() {
  return Math.floor((Math.random() * 8) + 1);
}

function populate() {
  let i = 0;
  while (i < categories.length) {
    new CategoryDiv(categories[i]).initialize();
    populate2(categories[i]);
    i += 1;
  }
}

function populate2(cat) {
  let i = 0;
  while (i < 7) {
    const id = `it-${random()}${random()}${random() + i}`;
    const x = new Item(id.toString(), `item${i + 1}`, 5 * i, cat, i * 10, 'https://drive.google.com/uc?id=1AabwtI4axYUkx_2IRIltNnbtEbuigJJc');
    new ItemDiv(x).initialize();
    i += 1;
  }
}

populate();

// window.onclick = () => alert(/us-\w{8}/.exec(window.location.href));
/* export {
  ItemDiv, OrderDiv, CategoryDiv, errorHandler,
}; */
