function createStorage() {
  let products = [];
  return {
    setProductsBackup: function (newProducts) {
      return products = newProducts;
    },
    getProductsBackup: function () {
      return products;
    }
  }
}

const store = createStorage();

fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(function (data) {
    const filteredData = data.map(function (el) {
      return {
        title: el.title,
        category: el.category,
        image: el.image,
        price: el.price
      }
    })

    store.setProductsBackup(filteredData);
    renderProducts(filteredData);
  })

function renderProducts(products) {
  if(!products.length) {
    htmlStr = `<div>No Items Found</div>`;
    document.getElementById('products').innerHTML = htmlStr;
    return;
  }
  products.reduce(function (htmlString, product) {
    htmlString += `<div class="card product col-lg-3 col-md-6" >
   <img  src="${product.image}" class="card-img-top" alt="...">
   <div class="card-body">
     <h5 class="card-title">${product.title}</h5>
     <p class="card-text">${product.category}</p>
     <p class="card-text text-danger font-weight-bold">${product.price}$<p/>
   </div>
 </div>`
    return document.querySelector("#products").innerHTML = htmlString;
  }, '');

  const cards = document.getElementsByClassName("card");
  for (let item = 0; item < cards.length; item++) {
    let card = cards[item];
    card.onmouseenter = function (e) {
      e.currentTarget.classList.add("border-primary");
    }
    card.onmouseleave = function (e) {
      e.currentTarget.classList.remove("border-primary");
    }
  }
}



function filterProducts(searchValue) {
  const filteredProducts = store.getProductsBackup().filter(function (product) {
    return product.title.trim().toLowerCase().indexOf(searchValue) >= 0 || product.category.trim().toLowerCase().indexOf(searchValue) >= 0
  })
  renderProducts(filteredProducts)

}


search = document.getElementById('search');
search.onkeyup = function (e) {
  const searchValue = e.currentTarget.value;
  filterProducts(searchValue.trim().toLowerCase());
}