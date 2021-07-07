class Orders {
    constructor(id) {
        this.id = id;
        this.items = [];
        this.orderTotal = document.createElement('p');
        this.orderTotal.setAttribute('class', 'orderTotal');
        document.querySelector('.cartItems').appendChild(this.orderTotal);
        this.orderCount = itemCount;
    }

    total() {
        var t = 0;
        for (var i = 0; i < this.items.length; i++) {
            t += this.items[i].total;
        }
        this.orderTotal.textContent = t;
    }

    count() {
        var c = 0;
        for (var i = 0; i < this.items.length; i++) {
            c += this.items[i].quantity;
        }
        this.orderCount.textContent = c;
    }

    add(item) {
        if (this.items.length === 0) {
            cartItemsDefault.classList.add('hide');
            this.orderTotal.classList.remove('hide');
        }
        var x = {
            get total() {
                return this.price * this.quantity;
            }
        };
        var y = item.details;
        x.name = y[0]; x.price = y[1]; x.quantity = 1; x.imgSrc = y[3]; x.stock = y[2];
        this.items.push(x);
        var z = new OrderDiv(x, order, cartItems);
        z.initialize();
        this.total();
        this.count();
    }

    remove(item) {
        var items = this.items
        items.splice(items.indexOf(item), 1);
        if (this.items.length === 0) {
            this.orderTotal.classList.add('hide');
            cartItemsDefault.classList.remove('hide');
        }

    }
}

class OrderDiv {
    constructor(item, order, container) {
        this.item = item;
        this.order = order;
        this.container = container;
    }

    initialize() {
        var order = this.order;
        var item = this.item;
        var container = this.container;

        var main = document.createElement('div');
        main.setAttribute('class', 'ordersDiv');
        container.insertBefore(main, order.orderTotal);

        var nameDiv = document.createElement('div');
        nameDiv.setAttribute('class', 'nameDiv');
        main.appendChild(nameDiv);

        var name = document.createElement('p');
        name.setAttribute('class', 'nameP');
        name.textContent = item.name;
        nameDiv.appendChild(name);

        var img = document.createElement('img');
        img.setAttribute('class', 'nameImg');
        img.setAttribute('src', item.imgSrc);
        nameDiv.appendChild(img);

        var qty = document.createElement('div');
        qty.setAttribute('class', 'qty');
        main.appendChild(qty);

        var input = document.createElement('input');
        input.setAttribute('class', 'qtyInput');
        input.setAttribute('type', 'number');
        input.value = 1;
        input.addEventListener('input', function () {
            var x = Number(input.value);
            if (x > item.stock) {
                input.value = item.stock.toString();
            }
            if (input.value === '0') {
                input.value = 1;
            }
            item.quantity = x;
            price.textContent = item.total;
            order.total();
            order.count();
        })

        var subtract = document.createElement('button');
        subtract.setAttribute('class', 'qtyBtn');
        subtract.textContent = '-';
        subtract.addEventListener('click', function () {
            let x = Number(input.value);
            if (x > 1) {
                x--;
            }
            item.quantity = x;
            input.value = x.toString();
            price.textContent = item.total;
            order.total();
            order.count();
        })

        var add = document.createElement('button');
        add.setAttribute('class', 'qtyBtn');
        add.textContent = '+';
        add.addEventListener('click', function () {
            let x = Number(input.value);
            if (x < item.stock) {
                x++;
            }
            item.quantity = x;
            input.value = x.toString();
            price.textContent = item.total;
            order.total();
            order.count();
        })
        qty.appendChild(subtract);
        qty.appendChild(input);
        qty.appendChild(add);

        var price = document.createElement('p');
        price.setAttribute('class', 'cartPrice');
        price.textContent = item.total;
        main.appendChild(price);

        var closeBtn = document.createElement('button');
        closeBtn.setAttribute('class', 'closeBtn');
        closeBtn.setAttribute('id', 'close' + item.name);
        closeBtn.textContent = 'X';
        closeBtn.addEventListener('click', function () {
            order.remove(item);
            main.parentElement.removeChild(main);
            document.getElementById('item:' + item.name).classList.remove('selected');
            order.total();
            order.count();
        })
        main.appendChild(closeBtn);
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

        var name = document.createElement('p');
        name.setAttribute('class', 'categoryName');
        name.textContent = this.item.name;
        container.appendChild(name);

        for (var i = 0; i < this.item.items.length; i++) {
            var item = new ItemDiv(this.item.items[i], this.div);
            item.initialize();
        }
    }
}

class ItemDiv {
    constructor(item, categoryDiv) {
        this.item = item;
        this.categoryDiv = categoryDiv;
    }

    initialize() {
        var item = this.item;
        var array = this.item.details;
        var div = this.categoryDiv;

        var main = document.createElement('div');
        main.setAttribute('class', 'itemDiv');
        main.setAttribute('id', 'item:' + array[0]);
        main.addEventListener('click', function () {
            if (main.classList.contains('selected')) {
                main.classList.remove('selected');
                document.getElementById('close' + array[0]).click();
                return 0;
            }
            main.classList.add('selected');
            order.add(item);
        })
        div.appendChild(main);

        var name = document.createElement('p');
        name.setAttribute('class', 'itemName');
        name.textContent = array[0];
        main.appendChild(name);

        var img = document.createElement('img');
        img.setAttribute('src', array[3]);
        main.appendChild(img);

        var price = document.createElement('p');
        price.setAttribute('class', 'itemPrice');
        price.textContent = array[1];
        main.appendChild(price);
    }
}

class Category {
    constructor(name) {
        this.name = name;
        this.items = [];
    }
}

class Items {
    constructor(name, price, quantity, imgsrc) {
        this.details = [name, price, quantity, imgsrc];
    }
}

var displayControlObject = {
    count: 0,
    switchMenu(x) {
        var a = document.getElementsByClassName('categoryDiv');
        if (x) {
            if (this.count === 0) {
                this.count = a.length - 1;
                this.displayMenu(this.count);
            } else {
                this.count--
                this.displayMenu(this.count);
            }
        } else {
            if (this.count === a.length - 1) {
                this.count = 0
                this.displayMenu(this.count)
            } else {
                this.count++
                this.displayMenu(this.count);
            }
        }
    },

    displayMenu(x) {
        var a = document.getElementsByClassName('categoryDiv');
        var b = document.getElementsByClassName('nameContainer2');
        if (a.length < 1) { return }
        for (var i = 0; i < a.length; i++) {
            if (i !== x) {
                a[i].classList.add('hide');
                b[i].classList.add('hide');
            } else {
                a[i].classList.remove('hide');
                b[i].classList.remove('hide');
            }
        }
    }
}

var body = document.querySelector('body');
var profile = document.querySelector('.profile');
var cartBtn = document.querySelector('.cartButton');
var itemCount = document.querySelector('.itemCount');
var cartItems = document.querySelector('.cartItems');
var cartItemsDefault = document.querySelector('.cartItemsDefault');
var category = document.querySelector('.category');
var categorySwitch1 = document.querySelector('.categorySwitch1');
var categorySwitch2 = document.querySelector('.categorySwitch2');
var itemsContainer = document.querySelector('.itemsContainer');

var order = new Orders;
var array = [];

cartItems.addEventListener('mouseenter', function () {
    cartItems.classList.add('active');
})

cartItems.addEventListener('mouseleave', function () {
    cartItems.classList.remove('active')
})

cartBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (cartBtn.classList.contains('opened')) {
        cartBtn.classList.remove('opened');
        cartItems.classList.add('hide');
    } else {
        cartBtn.classList.add('opened');
        cartItems.classList.remove('hide');
    }
});


categorySwitch1.addEventListener('click', function () {
    displayControlObject.switchMenu(1);
})

categorySwitch2.addEventListener('click', function () {
    displayControlObject.switchMenu();
})

body.addEventListener('click', function (e) {
    if (!cartItems.classList.contains('active')) {
        cartBtn.classList.remove('opened');
        cartItems.style.display = 'none';
    }
})

window.onload = function () {
    populate('test1');
    populate('test2');
    populate('test3');
    populate('test4');
    cartItems.style.display = 'none';
    displayControlObject.displayMenu(0);
}

function populate(name) {
    var category1 = new Category(name);
    for (var i = 0; i < 5; i++) {
        let x = new Items('order' + i.toString(), 55 + i, 5 + i, 'scomed');
        array.push(x);
        category1.items.push(x);
    }
    var categoryDiv = new CategoryDiv(category1, itemsContainer, category);
    categoryDiv.initialize();
}