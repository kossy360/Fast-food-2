class Order {
    constructor(order, container) {
        this.order = order;
        this.container = container;
        this.object;
    }

    getRef(objRef) {
        let x = [];
        x.push(objRef);
        this.object = x[0];
    }

    initialize() {
        var main = document.createElement('div');
        main.setAttribute('class', 'orderDiv');
        main.addEventListener('click', function () {
            main.classList.contains('selected') ? main.classList.remove('selected') : main.classList.add('selected');
        })
        this.container.appendChild(main);

        var p = document.createElement('p');
        p.textContent = this.order.id;
        main.appendChild(p);

        var p1 = document.createElement('p');
        p1.textContent = this.order.user;
        main.appendChild(p1);

        var table = document.createElement('table');
        table.setAttribute('class', 'ordersTable');
        main.appendChild(table);

        var h1 = document.createElement('th');
        table.appendChild(h1);
        var headArray = ['Item', 'Quantity'];

        for (var i = 0; i < 2; i++) {
            var td1 = document.createElement('td');
            td1.setAttribute('class', 'tableHead');
            td1.textContent = headArray[i];
            h1.appendChild(td1);
        }

        for (var j = 0; j < this.order.orderItems.length; j++) {
            var y = this.order.orderItems[j];
            let tr = document.createElement('tr');
            table.appendChild(tr);
            let td1 = document.createElement('td');
            td1.textContent = y.item;
            tr.appendChild(td1);
            let td2 = document.createElement('td')
            td2.textContent = y.quantity;
            tr.appendChild(td2);
        }

        var buttons = document.createElement('div');
        buttons.setAttribute('class', 'orderButtonContainer');
        var confirm = document.createElement('button');
        confirm.setAttribute('class', 'orderButton');
        confirm.textContent = 'confirm';
        confirm.addEventListener('click', function () {
            main.parentElement.removeChild(main);
        });
        buttons.appendChild(confirm);

        var cancel = document.createElement('button');
        cancel.setAttribute('class', 'orderButton');
        cancel.textContent = 'cancel';
        cancel.addEventListener('click', function () {
            main.parentElement.removeChild(main);
        });
        buttons.appendChild(cancel);

        main.appendChild(buttons);
    }
}

class ItemDiv {
    constructor(item, category, categoryDiv) {
        this.item = item;
        this.category = category;
        this.categoryDiv = categoryDiv;
        this.object;
    }

    getRef(objRef) {
        let x = [];
        x.push(objRef);
        this.object = x[0];
    }

    initialize() {
        var item = this.item;
        var category = this.category;
        var array = this.item.details;
        var div = this.categoryDiv;

        var main = document.createElement('div');
        main.setAttribute('class', 'itemDiv');
        main.addEventListener('click', function () {

            var x = document.getElementsByClassName('itemDiv');
            var i = 0; var j = 0;
            while (i < 1 && j < x.length) {
                if (x.item(j).classList.contains('selected')) {
                    x.item(j).classList.remove('selected');
                    i++;
                }
                j++;
            }

            main.classList.add('selected');
        })
        div.appendChild(main);

        var img = document.createElement('img');
        img.setAttribute('src', array[3]);
        main.appendChild(img);

        var table = document.createElement('table');
        table.setAttribute('class', 'itemsTable');
        main.appendChild(table);

        var h1 = document.createElement('th');
        table.appendChild(h1);

        var tdh = document.createElement('td');
        tdh.setAttribute('class', 'tableHead');
        tdh.textContent = 'Details';
        h1.appendChild(tdh);

        var property = ['name', 'price', 'quantity', 'Image Source'];

        for (var i = 0; i < 4; i++) {
            let tr = document.createElement('tr');
            table.appendChild(tr);
            let td1 = document.createElement('td');
            td1.textContent = property[i];
            tr.appendChild(td1);
            let td2 = document.createElement('td')
            tr.appendChild(td2);

            let input = document.createElement('input');
            input.setAttribute('class', 'tableInput');
            input.setAttribute('id', i.toString())
            input.value = this.item.details[i];
            input.addEventListener('input', function (e) {
                let x = Number(e.target.id)
                array[x] = (x === 0 || x === 1) ? e.target.value : Number(e.target.value);
                if (x === 3) {
                    img.setAttribute('src', e.target.value);
                }
            });
            input.addEventListener('click', function (e) {
                if (main.classList.contains('selected')) { e.stopPropagation() }
            })
            td2.appendChild(input);
        }

        var button = document.createElement('button');
        button.setAttribute('class', 'itemButton');
        button.textContent = 'Delete';
        button.addEventListener('click', function () {
            main.parentElement.removeChild(main);
            deleteItem(item, category);
        })
        main.appendChild(button);
    }
}

class CategoryDiv {
    constructor(item, container, nameContainer) {
        this.item = item;
        this.container = container;
        this.nameContainer = nameContainer;
        this.div = document.createElement('div');
        this.div.setAttribute('class', 'categoryDiv');
        this.div.setAttribute('id', this.name);
        this.container.appendChild(this.div);
    }

    initialize() {
        var nameContainer = this.nameContainer;
        var container = document.createElement('div');
        container.setAttribute('class', 'nameContainer2');
        nameContainer.appendChild(container);

        var div = this.div;
        var item = this.item;

        var remove = document.createElement('button');
        remove.setAttribute('class', 'categoryRemove');
        remove.textContent = 'X';
        remove.addEventListener('click', function () {
            div.parentElement.removeChild(div);
            container.parentElement.removeChild(container);
            deleteCategory(item);
        })
        container.appendChild(remove);

        var input = document.createElement('input');
        input.setAttribute('class', 'categoryInput');
        input.value = this.item.name;
        input.addEventListener('input', function () {
            item.name = input.value;
        })
        container.appendChild(input);

        var add = document.createElement('button');
        add.setAttribute('class', 'categoryAdd');
        add.textContent = '+';
        add.addEventListener('click', function () {
            newCategory();
        })
        container.appendChild(add);

        var x = document.createElement('div');
        var x1 = document.createElement('p');
        x1.textContent = '+';
        x.appendChild(x1);
        x.setAttribute('class', 'itemDiv');
        x.addEventListener('click', function () {
            newItem(item, div);
        })
        div.appendChild(x);
    }
}

class Category {
    constructor() {
        this.name = '';
        this.items = [];
    }
}

class Items {
    constructor(name, price, quantity, imgsrc) {
        this.details = [name, price, quantity, imgsrc];
    }
}

function newCategory() {
    var x = new Category();
    var y = new CategoryDiv(x, menuBody, nameContainer);
    categoryArray.push(x);
    y.initialize();
    displayControlObject.displayMenu(categoryArray.length - 1);
}

function deleteCategory(item) {
    alert(4);
    categoryArray.splice(categoryArray.indexOf(item), 1);
    if (categoryArray.length === 0) {
        newCategory();
    } else {
        displayControlObject.displayMenu(categoryArray.length - 1)
    }
}

function newItem(a, b) {
    var x = new Items('', '', '', '');
    a.items.push(x)
    var z = new ItemDiv(x, a, b)
    z.initialize();
}

function deleteItem(a, b) {
    b.items.splice(b.items.indexOf(a), 1);
}

var displayControlObject = {
    count: 0,
    switchMenu(x) {
        if (x) {
            if (this.count === 0) {
                this.count = categoryArray.length - 1;
                this.displayMenu(this.count);
            } else {
                this.count--
                this.displayMenu(this.count);
            }
        } else {
            if (this.count === categoryArray.length - 1) {
                this.count = 0
                this.displayMenu(this.count)
            } else {
                this.count++
                this.displayMenu(this.count);
            }
        }
    },

    displayMenu(x) {
        if (categoryArray.length < 1) { return }
        var a = document.getElementsByClassName('categoryDiv');
        var b = document.getElementsByClassName('nameContainer2');
        for (var i = 0; i < menuBody.childElementCount; i++) {
            if (i !== x) {
                a[i].style.display = 'none';
                b[i].style.display = 'none';
            } else {
                a[i].style.display = 'block';
                b[i].style.display = 'block';
            }
        }
    }
}

var body = document.querySelector('body');
var orderContainer = document.querySelector('.orderContainer');
var menuModify = document.querySelector('.menuModify');
var addItemContainer = document.querySelector('.addItemContainer');
var categorySwitch1 = document.querySelector('.categorySwitch1');
var categorySwitch2 = document.querySelector('.categorySwitch2');
var nameContainer = document.querySelector('.nameContainer');
var menuBody = document.querySelector('.menuBody');

var categoryArray = [];

categorySwitch1.addEventListener('click', function () {
    displayControlObject.switchMenu(1);
});

categorySwitch2.addEventListener('click', function () {
    displayControlObject.switchMenu();
});

//code from this point are only for testing purposes, modify as needed;
/*class Orders {
    constructor(id) {
        this.id = id;
        this.user = 'user';
        this.address = 'banana island'
        this.orderItems = [{ item: 'item1', quantity: 5 }, { item: 'item2', quantity: 10 }]
    }
}

function populate() {
    alert(4)
    for (var i = 0; i < 6; i++) {
        var x = new Orders(i);
        var y = new Order(x, orderContainer);
        y.initialize();
    }
}

populate();


var testArray = [];

var y = new Category();
categoryArray.push(y);
var z = new CategoryDiv(y, menuBody, nameContainer);
z.initialize();
var x = new Items('', '', '', '');
y.items.push(x)
var z = new ItemDiv(x, y, z.div);
z.initialize();

var p = document.createElement('p')
p.textContent = 'check'
body.appendChild(p)
p.onclick = function () {
    alert(categoryArray[1].items[1].details[1])
}*/