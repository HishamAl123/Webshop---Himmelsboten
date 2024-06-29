let carts = document.querySelectorAll('.add-cart, .add-cart2');
/* Produkte werden hier hinzugefüht  */
/* Der Preis muss hier manuel eingetragen werden */
let products = [
    {
        name: 'Veganer Burger',
        tag: 'img20',
        price: 10,
        inCart: 0
    },

    {
        name: 'Kroketen',
        tag: 'img6',
        price: 10,
        inCart: 0
    },

    {
        name: 'Mediterrane Pizza',
        tag: 'Picture1',
        price: 10,
        inCart: 0
    },

    {
        name: 'Spaghetti mit herbstlichem Gemüse',
        tag: 'img12',
        price: 10,
        inCart: 0
    },

    {
        name: 'Schnelle-Hänchen-Paprika-Pfanne',
        tag: 'img9',
        price: 10,
        inCart: 0
    },

    {
        name: 'Kürbissuppe mit Toppings',
        tag: 'img8',
        price: 10,
        inCart: 0
    },

    {
        name: 'Hummus-Dip mit Karotte',
        tag: 'img10',
        price: 10,
        inCart: 0
    },

    {
        name: 'Pizzabaguette',
        tag: 'img11',
        price: 10,
        inCart: 0
    },

    {
        name: 'Mediterrane Pizza',
        tag: 'Picture1',
        price: 10,
        inCart: 0
    },

    {
        name: 'Herzhafter Salat mit Pizzaecken und Bechamelsoße',
        tag: 'Picture3',
        price: 10,
        inCart: 0
    },

    {
        name: 'Spaghetti mit herbstlichem Gemüse',
        tag: 'img12',
        price: 10,
        inCart: 0
    },

    {
        name: 'Porreegemüse mit Salzkartoffeln',
        tag: 'img13',
        price: 10,
        inCart: 0
    },

    {
        name: 'Bananen-Kakao-Smoothie',
        tag: 'img14',
        price: 10,
        inCart: 0
    },

    {
        name: 'Kässepätzle',
        tag: 'img15',
        price: 10,
        inCart: 0
    },
    
    {
        name: 'Energiebällchen mit Kakao und Agavendicksaft',
        tag: 'img16',
        price: 10,
        inCart: 0
    },

    {
        name: 'Bulgur Salat',
        tag: 'img17',
        price: 10,
        inCart: 0
    },

    {
        name: 'Geröstete Knödel mit Ei',
        tag: 'img18',
        price: 10,
        inCart: 0
    },

    {
        name: 'Weiße Bohnen in scharfer Salsa',
        tag: 'img19',
        price: 15,
        inCart: 0
    },

    {
        name: 'Veganer Burger',
        tag: 'img20',
        price: 10,
        inCart: 0
    },

    {
        name: 'Kroketen',
        tag: 'img6',
        price: 10,
        inCart: 0
    },

    {
        name: 'Schnelle-Hänchen-Paprika-Pfanne',
        tag: 'img9',
        price: 10,
        inCart: 0
    },

    {
        name: 'Hummus-Dip mit Karotte',
        tag: 'img10',
        price: 10,
        inCart: 0
    },

    {
        name: 'Pizzabaguette',
        tag: 'img11',
        price: 10,
        inCart: 0
    },

    {
        name: 'Kürbissuppe mit Toppings',
        tag: 'img8',
        price: 10,
        inCart: 0
    },
]
/*---------------------------------------------------------------------------------------*/

for(let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers')
    if(productNumbers) {
        document.querySelector('.li span').textContent = productNumbers;
    }
}

function cartNumbers (products, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers)

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if( action ){
        localStorage.setItem("cartNumbers", productNumbers -1);
        document.querySelector('.li span').textContent = productNumbers -1;
        console.log("action running")
    } else if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1)
        document.querySelector('.li span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers',1)
        document.querySelector('.li span').textContent = 1;
    }

    setItems(products);

}
/* Tag gibt die Anzahl an, bei selben Tag, wird der selbe Counter auch verwendet */
function setItems(products){
    let cartItem = localStorage.getItem('productsInCart');
    cartItem = JSON.parse(cartItem);

    if(cartItem != null){
        let currentProduct = products.tag;

        if(cartItem[currentProduct] == undefined) {
            cartItem = {
                ...cartItem,
                [currentProduct]: products
            }
        }
        cartItem[currentProduct].inCart += 1;
    } else {
        products.inCart = 1;
        cartItem = {
        [products.tag]: products
        }
    }
localStorage.setItem("productsInCart", JSON.stringify(cartItem));
}


function totalCost(products, action){
    //console.log("The Price of the Product is", products.price);
    let cartCost = localStorage.getItem('totalCost');
   
    if(action) {
        cartCost = parseInt(cartCost)

        localStorage.setItem("totalCost", cartCost - products.price)
    } else if(cartCost != null){
        cartCost = parseInt(cartCost)
        localStorage.setItem("totalCost", cartCost + products.price);
    } else {
        localStorage.setItem("totalCost", products.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let productContainer = document.querySelector(".products");

    let cartCost = localStorage.getItem("totalCost");
    cartCost = parseInt(cartCost);

    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle-outline"></ion-icon>
                <img src="./Images/${item.tag}.jpg">
                <span2>${item.name}</span2>
            </div>
            <div class="price">
                €${item.price},00
            </div>
            <div class="quantity">
                <ion-icon class="decrease" name="chevron-back-circle-outline"></ion-icon>
                <span2>${item.inCart}</span2>
                <ion-icon class="increase" name="chevron-forward-circle-outline"></ion-icon> 
            </div>
            <div class="total">
                €${item.inCart * item.price},00
            </div>
            `
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitel">
                   Basket Total
                </h4> 
                <h4 class="basketTotal">
                    €${cartCost},00
                </h4>
            </div>
        `

        deleteButtons();
        manageQuantity();
    }
}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = products.tag;
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span2').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span2').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            if( cartItems[currentProduct] > 1 ) {
                cartItems[currentProduct] -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span2').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span2').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product ion-icon');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
           
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}

onLoadCartNumbers();
displayCart();
