const searchForm = document.querySelector('form[method="get"]');
const tableBody = document.querySelector('tbody');

function calculateTotalQuantityAndPriceData(productList) {
    const totalQuantityData = document.getElementById('totalQuantity');
    const totalPriceData = document.getElementById('totalPrice');

    const [ totalQuantity, totalPrice ] = productList.reduce(
        (totalQuantityAndPrice, product) => {
            const [ totalQuantity, totalPrice ] = totalQuantityAndPrice;
            const { quantity, totalPrice: price } = product;

            return [
                totalQuantity + quantity,
                totalPrice + price
            ]
        },
        [0, 0]
    );

    totalQuantityData.innerText = `Total Quantity: ${totalQuantity}`;
    totalPriceData.innerText = `Total Price: $ ${totalPrice}`;
}

createTable(
    tableBody,
    getProductList(),
    ['id', 'name', 'price', 'unit', 'quantity', 'totalPrice']
);

calculateTotalQuantityAndPriceData(getProductList());

searchForm.addEventListener('change', (event) => {
    const change = event.target;

    if (change.name === 'quantityOption') {
        const quantityInput = document.getElementById('quantity');
        quantityInput.removeAttribute('disabled');
    }

    if (change.name === 'priceOption') {
        const priceInput = document.getElementById('price');
        priceInput.removeAttribute('disabled');
    }
});


searchForm.addEventListener('submit', (event)=>{
    event.preventDefault();//

let filterProduct = getProductList();
    const {target: form} = event;
    const formData = new FormData(form); 
    const quantityOption = formData.get('quantityOption')
    if(quantityOption){
        const quanity = formData.get('quantity');
        if (quanity > 0){
            switch(quantityOption){
                case 'QUANTITY_LESS': 
                filterProduct = getProductList().filter((product) =>{
                    return product.quantity <= quanity;
                });
                console.log(filterProduct)
                break;
                case 'QUANTITY_GREATER': 
                filterProduct = getProductList().filter((product) =>{
                    return product.quantity > quanity;
                });
                console.log(filterProduct)
                break;
            }
        }
    }

    const priceOption = formData.get('priceOption')

    if(priceOption){
      
        const quanity = formData.get('price');
     
        if (quanity > 0){

            switch(priceOption){
                
                case 'PRICE_LESS': 
                filterProduct = getProductList().filter((product) =>{
                
                    return product.quantity <= quanity;
                });
                console.log(filterProduct)
                break;
                case 'PRICE_GREATER': 
                filterProduct = getProductList().filter((product) =>{
                    return product.quantity > quanity;
                });
                console.log(filterProduct)
                break;
            }
        }
    }








    createTable(
    tableBody,
  filterProduct,
    ['id', 'name', 'price', 'unit', 'quantity', 'totalPrice']
);

})

searchForm.addEventListener('reset', () => {
    const quantityInput = document.getElementById('quantity');
    const priceInput = document.getElementById('price');

    quantityInput.setAttribute('disabled', '');
    priceInput.setAttribute('disabled', '');

    createTable(
        tableBody,
        getProductList(),
        ['id', 'name', 'price', 'unit', 'quantity', 'totalPrice']
    );

    calculateTotalQuantityAndPriceData(getProductList());
});