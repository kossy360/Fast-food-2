/* eslint-env browser */
/* import {
  EndPoint, request,
} from '/javascripts/adminEndPoints.js';
// import Endpoint from './adminEndPoints'; */

const orderContainer = document.querySelector('.orderContainer');
const categorySwitch1 = document.querySelector('.categorySwitch1');
const categorySwitch2 = document.querySelector('.categorySwitch2');
const nameContainer = document.querySelector('.nameContainer');
const menuBody = document.querySelector('.menuBody');
// const // control = new EndPoint();

class Items {
  constructor(id, name, price, quantity, imgsrc, category) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.imgsrc = imgsrc;
    this.category = category;
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

  initialize(y) {
    const a = this.nameContainer;
    const c = this.div;
    let b = this.name;

    const container = document.createElement('div');
    container.setAttribute('class', 'nameContainer2');
    container.classList.add(this.div.classList.contains('hide') ? 'hide' : 'nc-showing');
    if (y) container.classList.add('new');
    a.appendChild(container);

    const remove = document.createElement('button');
    remove.setAttribute('class', 'categoryRemove');
    remove.textContent = 'X';
    remove.addEventListener('click', () => {
      categorySwitch2.click();
      c.parentElement.removeChild(c);
      container.parentElement.removeChild(container);
      // control.deleteCategory(b);
    });
    container.appendChild(remove);

    const input = document.createElement('input');
    input.setAttribute('class', 'categoryInput');
    if (y) input.classList.add('newInput');
    input.value = b;
    input.addEventListener('blur', () => {
      if (!container.classList.contains('new')) {
        if (input.value && input.value !== b) {
          // control.putCategory(b, input.value);
          b = input.value;
          c.setAttribute('id', input.value);
        } else { input.value = b; }
      } else if (input.value) {
        // control.postCategory(input.value);
        container.classList.remove('new');
        input.classList.remove('newInput');
        b = input.value;
        c.setAttribute('id', input.value);
      } else {
        categorySwitch2.click();
        container.parentElement.removeChild(container);
        c.parentElement.removeChild(c);
        // if (// control.categoryArray.length === 0) newCategory();
      }
    });
    input.addEventListener('keypress', (e) => {
      if (e.keyCode === 13) input.blur();
    });
    container.appendChild(input);

    const add = document.createElement('button');
    add.setAttribute('class', 'categoryAdd');
    add.textContent = '+';
    add.addEventListener('click', () => {
      newCategory();
    });
    container.appendChild(add);

    const x = document.createElement('div');
    const x1 = document.createElement('p');
    x1.textContent = '+';
    x.appendChild(x1);
    x.setAttribute('class', 'itemDiv');
    x.addEventListener('click', () => {
      newItem(b);
    });
    c.appendChild(x);
  }
}

class OrderDiv {
  constructor(order) {
    this.order = order;
    this.container = orderContainer;
  }

  initialize() {
    const main = document.createElement('div');
    main.setAttribute('class', 'orderDiv');
    main.addEventListener('click', () => {
      if (main.classList.contains('selected')) {
        main.classList.remove('selected');
        return;
      }
      const x = document.getElementsByClassName('orderDiv');
      let i = 0; let j = 0;
      while (i < 1 && j < x.length) {
        if (x.item(j).classList.contains('selected')) {
          x.item(j).classList.remove('selected');
          i += 1;
        }
        j += 1;
      }
      main.classList.add('selected');
    });
    this.container.appendChild(main);

    const p = document.createElement('p');
    p.textContent = this.order.id;
    main.appendChild(p);

    const p1 = document.createElement('p');
    p1.textContent = this.order.user;
    main.appendChild(p1);

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

    for (let j = 0; j < this.order.items.length; j += 1) {
      const y = this.order.items[j];
      const tr = document.createElement('tr');
      table.appendChild(tr);
      const td1 = document.createElement('td');
      td1.textContent = y.name;
      tr.appendChild(td1);
      const td2 = document.createElement('td');
      td2.textContent = y.quantity;
      tr.appendChild(td2);
    }

    const buttons = document.createElement('div');
    buttons.setAttribute('class', 'orderButtonContainer');
    const confirm = document.createElement('button');
    confirm.setAttribute('class', 'orderButton');
    confirm.textContent = 'confirm';
    confirm.addEventListener('click', () => {
      // control.putOrder(this.order);
      main.parentElement.removeChild(main);
    });
    buttons.appendChild(confirm);

    const cancel = document.createElement('button');
    cancel.setAttribute('class', 'orderButton');
    cancel.textContent = 'cancel';
    cancel.addEventListener('click', () => {
      main.parentElement.removeChild(main);
      // control.putOrder(this.order);
    });
    buttons.appendChild(cancel);

    main.appendChild(buttons);
  }
}

class ItemDiv {
  constructor(item) {
    this.item = item;
    this.categoryDiv = document.getElementById(this.item.category);
  }

  initialize(x) {
    const a = this.item;
    const c = Object.keys(a);
    const d = this.categoryDiv;

    const main = document.createElement('div');
    main.setAttribute('class', 'itemDiv');
    if (x) main.classList.add('new');
    main.addEventListener('click', () => {
      if (main.classList.contains('selected')) {
        main.classList.remove('selected');
        return;
      }
      const items = document.getElementsByClassName('itemDiv');
      let i = 0; let j = 0;
      while (i < 1 && j < items.length) {
        if (items.item(j).classList.contains('selected')) {
          items.item(j).classList.remove('selected');
          i += 1;
        }
        j += 1;
      }
      main.classList.add('selected');
    });
    d.insertBefore(main, d.lastElementChild);

    const img = document.createElement('img');
    img.setAttribute('src', a[c[4]]);
    main.appendChild(img);

    const table = document.createElement('table');
    table.setAttribute('class', 'itemsTable');
    main.appendChild(table);

    const h1 = document.createElement('th');
    table.appendChild(h1);

    const tdh = document.createElement('td');
    tdh.setAttribute('class', 'tableHead');
    tdh.textContent = 'Details';
    h1.appendChild(tdh);

    const property = ['name', 'price', 'quantity', 'Image Source'];

    for (let i = 0; i < 4; i += 1) {
      const tr = document.createElement('tr');
      table.appendChild(tr);
      const td1 = document.createElement('td');
      td1.textContent = property[i];
      tr.appendChild(td1);
      const td2 = document.createElement('td');
      tr.appendChild(td2);

      const input = document.createElement('input');
      input.setAttribute('class', 'tableInput');
      input.setAttribute('class', a[c[0]]);
      input.value = a[c[i + 1]];
      input.addEventListener('click', (e) => {
        if (main.classList.contains('selected')) { e.stopPropagation(); }
      });
      td2.appendChild(input);
    }

    const inputs = document.getElementsByClassName(a[c[0]]);

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'itemButton');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      // control.deleteItem(a.id);
      main.parentElement.removeChild(main);
    });
    main.appendChild(deleteBtn);

    const resetBtn = document.createElement('button');
    resetBtn.setAttribute('class', 'itemButton');
    resetBtn.textContent = 'Reset';
    resetBtn.addEventListener('click', (e) => {
      if (main.classList.contains('selected')) { e.stopPropagation(); }
      inputs[0].value = a[c[1]];
      inputs[1].value = a[c[2]];
      inputs[2].value = a[c[3]];
      inputs[3].value = a[c[4]];
    });
    main.appendChild(resetBtn);

    const modifyBtn = document.createElement('button');
    modifyBtn.setAttribute('class', 'itemButton');
    modifyBtn.textContent = main.classList.contains('new') ? 'save' : 'modify';
    modifyBtn.addEventListener('click', (e) => {
      if (main.classList.contains('selected')) { e.stopPropagation(); }
      a[c[1]] = inputs[0].value;
      a[c[2]] = Number(inputs[1].value);
      a[c[3]] = Number(inputs[2].value);
      a[c[4]] = inputs[3].value;
      img.setAttribute('src', a[c[4]]);
      if (main.classList.contains('new')) {
        // control.postItem(a);
        main.classList.remove('new');
        modifyBtn.textContent = 'modify';
      } else { } // control.putItem(a); }
    });
    main.appendChild(modifyBtn);
    inputs[0].click();
    inputs[0].focus();
  }
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

function newCategory() {
  const y = new CategoryDiv('');
  y.initialize(1);
  switcher(1, 1);
  document.querySelector('.newInput').focus();
}

async function newItem(a) {
  const x = new Items('it-2255', '', '', '', '', a);
  const z = new ItemDiv(x);
  z.initialize(1);
}

categorySwitch1.addEventListener('click', () => {
  switcher();
});

categorySwitch2.addEventListener('click', () => {
  switcher(1);
});

function errorHandler(err) {
  console.log(err.status);
  console.log(err.statusText);
}

window.addEventListener('load', () => {
  // control.initialize();
});

export {
  ItemDiv, OrderDiv, CategoryDiv, errorHandler, newCategory,
};

const orders = [
  {
    id: 'od-0011',
    userId: 'us-5555',
    items: [
      {
        name: 'item1', quantity: 5,
      },
    ],
  },
  {
    id: 'od-0011',
    userId: 'us-5555',
    items: [
      {
        name: 'item1', quantity: 5,
      },
    ],
  },
  {
    id: 'od-0011',
    userId: 'us-5555',
    items: [
      {
        name: 'item1', quantity: 5,
      },
    ],
  },
  {
    id: 'od-0011',
    userId: 'us-5555',
    items: [
      {
        name: 'item1', quantity: 5,
      },
    ],
  },
];

const populate = () => {
  let i = 0;
  while (i < orders.length) {
    new OrderDiv(orders[i]).initialize();
    i += 1;
  }
};

populate();
