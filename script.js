   const API_URL = "https://makeup-api.herokuapp.com/api/v1/products.json";
    const productsContainer = document.getElementById("products");
    const categoriesNav = document.getElementById("categories");
    const searchInput = document.getElementById("search");
    let allProducts = [];

    // Fetch products
    async function fetchProducts() {
      const res = await fetch(API_URL);
      const data = await res.json();
      allProducts = data;
      displayProducts(data);
      loadCategories(data);
    }

    // Display products
    function displayProducts(products) {
      productsContainer.innerHTML = products.map(p => `
        <div class="card">
          <img src="${p.image_link}" alt="${p.name}">
          <div class="title">${p.name}</div>
          <div class="desc">${p.description ? p.description.substring(0,100) + "..." : "No description"}</div>
          <div class="price">$${p.price || "N/A"}</div>
          <div class="category">#${p.product_type}</div>
        </div>
      `).join("");
    }

    // Load categories
    function loadCategories(products) {
      const categories = ["all", ...new Set(products.map(p => p.product_type))];
      categoriesNav.innerHTML = categories.map(cat => `
        <a href="#" data-category="${cat}">${cat.toUpperCase()}</a>
      `).join("");
    }

    // Filter by category
    categoriesNav.addEventListener("click", e => {
      if (e.target.tagName === "A") {
        e.preventDefault();
        const category = e.target.dataset.category;
        const filtered = category === "all" ? allProducts : allProducts.filter(p => p.product_type === category);
        displayProducts(filtered);
      }
    });

    // Search filter
    searchInput.addEventListener("input", e => {
      const term = e.target.value.toLowerCase();
      const filtered = allProducts.filter(p => p.name.toLowerCase().includes(term));
      displayProducts(filtered);
    });

    fetchProducts();