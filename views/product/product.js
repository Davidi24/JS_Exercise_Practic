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







const Namee = document.getElementById('Namee');
let sortt = false;
let temp1 = "lol";


Namee.addEventListener('click', (event) => {
    const column = event.target;
    // console.log('Clicked column:', column.textContent);

    let productList = getProductList();

    let temp2 = temp1;
 temp1 = column.textContent;





    if(column.textContent == 'Name'){
if(sortt){
    productList = sortArrayOfObjects(productList, 'name', 'desc');
    createTable(tableBody,productList, ['id', 'name', 'price', 'unit', 'quantity', 'totalPrice']);
sortt = false;
}
else{
    productList = sortArrayOfObjects(productList, 'name', 'asc');
    createTable(tableBody,productList, ['id', 'name', 'price', 'unit', 'quantity', 'totalPrice']);
sortt = true;
}
          
   
    }

    if(column.textContent == 'Quantity'){
        if(!sortt){
            productList = sortArrayOfObjects(productList, 'quantity', 'desc');
            createTable(tableBody,productList, ['id', 'name', 'price', 'unit', 'quantity', 'totalPrice']);
        sortt = true;
        }
        else{
            productList = sortArrayOfObjects(productList, 'quantity', 'asc');
            createTable(tableBody,productList, ['id', 'name', 'price', 'unit', 'quantity', 'totalPrice']);
        sortt = false;
        }
                  
           
            }

            if(column.textContent == 'Price'){
                if(sortt){
                    productList = sortArrayOfObjects(productList, 'price', 'desc');
                    createTable(tableBody,productList, ['id', 'name', 'price', 'unit', 'quantity', 'totalPrice']);
                sortt = false;
                }
                else{
                    productList = sortArrayOfObjects(productList, 'price', 'asc');
                    createTable(tableBody,productList, ['id', 'name', 'price', 'unit', 'quantity', 'totalPrice']);
                sortt = true;
                }
                          
                   
                    }




  });





  function sortArrayOfObjects(array, property, order) {
    const sortOrder = order === 'asc' ? 1 : -1;
  
    return array.sort((a, b) => {
      const valueA = a[property];
      const valueB = b[property];
  
      let result = 0;
      if (valueA < valueB) {
        result = -1;
      } else if (valueA > valueB) {
        result = 1;
      }
  
      return result * sortOrder;
    });
  }