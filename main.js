let allProducts = [];
let visibleCount = 6;

function LoadProducts() {
  fetch("data.json")
    .then((response) => response.json())
    .then((products) => {
      allProducts = products;
      showProducts(); // default allProducts
    })
    .catch((error) => {
      document.getElementById("products").innerHTML = "დაფიქსირდა შეცდომა!";
      console.log(error);
    });
}

function showProducts(productsArray = allProducts) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  const visibleProducts = productsArray.slice(0, visibleCount);

  visibleProducts.forEach((product) => {
    container.innerHTML += `
      <div class='card'>
        <img src='${product.imageUrl}' />
        <h3>${product.Title}</h3>
        <p>${product.shortdescription}</p>
        <span>${product.price}</span>
        <h2>${product.category}</h2>
      </div>
    `;
  });

  const btn = document.getElementById("showMoreBtn");
  if (visibleCount >= productsArray.length) {
    btn.style.display = "none";
  } else {
    btn.style.display = "block";
  }
}

function showMore() {
  visibleCount += 6;
  const searchValue = document.getElementById("search").value.toLowerCase();
  const filtered = allProducts.filter((product) =>
    product.Title.toLowerCase().includes(searchValue)
  );
  showProducts(searchValue ? filtered : allProducts);
}

document.addEventListener("DOMContentLoaded", LoadProducts);

document.getElementById("search").addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const filtered = allProducts.filter((product) =>
    product.Title.toLowerCase().includes(value)
  );
  visibleCount = 6;
  showProducts(filtered);
});

window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 80) {
    header.classList.add("sticky-header");
  } else {
    header.classList.remove("sticky-header");
  }
});
