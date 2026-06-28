const apiUrl = "https://www.course-api.com/javascript-store-products";

// Uses fetch(), .then(), and .catch()
function fetchProductsThen() {
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch products using .then()");
      }

      return response.json();
    })
    .then((products) => {
      products.forEach((product) => {
        console.log("Product name:", product.fields.name);
      });
    })
    .catch((error) => {
      console.error("Fetch error:", error.message);
    });
}

// Uses async/await with try/catch
async function fetchProductsAsync() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch products using async/await");
    }

    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    handleError(error);
  }
}

// Displays the first 5 products on the page
function displayProducts(products) {
  const productContainer = document.querySelector("#product-container");

  productContainer.innerHTML = "";

  products.slice(0, 5).forEach((product) => {
    const name = product.fields.name;
    const image = product.fields.image[0].url;
    const price = product.fields.price / 100;

    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
      <img src="${image}" alt="${name}">
      <h2>${name}</h2>
      <p>$${price.toFixed(2)}</p>
    `;

    productContainer.appendChild(productCard);
  });
}

// Reusable error handler
function handleError(error) {
  console.error(`An error occurred: ${error.message}`);
}

// Function calls
fetchProductsThen();
fetchProductsAsync();