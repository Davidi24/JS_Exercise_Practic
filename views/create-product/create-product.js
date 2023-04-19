const searchForm = document.querySelector('form');
const nameInput = document.querySelector('#name');
const unit = document.querySelector('#unit');
const price = document.querySelector('#price');
const quantity = document.querySelector('#quantity');

    
ProductList = getProductList();
console.log(ProductList);

searchForm.addEventListener('submit', (event) => {
event.preventDefault();
    console.log(nameInput.value);
    console.log(unit.value);
    console.log(price.value);
    console.log(quantity.value);
   
    ProductList.push(
        {
            id:  ProductList[ProductList.length-1].id,
            name: nameInput.value,
            unit: unit.value,
            quantity: quantity.value,
            price: price.value,
            get totalPrice() {
                return this.quantity * this.price;
            }
        }
    )

    console.log(ProductList)


});

// searchForm.addEventListener('reset', (event) => {
//     event.preventDefault();

//         nameInput.value = '';
//        unit.value = '';
//         price.value= '';
//      quantity.value = null;
    
//     nameInput.value = '';
//    unit.value = '';
//     price.value= '';
//  quantity.value = null;
//     });