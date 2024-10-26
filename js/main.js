
var toggleOpen = document.getElementById('toggleOpen');
var toggleClose = document.getElementById('toggleClose');
var collapseMenu = document.getElementById('collapseMenu');

function handleClick() {
    if (collapseMenu.style.display === 'block') {
        collapseMenu.style.display = 'none';
    } else {
        collapseMenu.style.display = 'block';
    }
}

toggleOpen.addEventListener('click', handleClick);
toggleClose.addEventListener('click', handleClick);

const cart = JSON.parse(localStorage.getItem('cart')) || [];


// slider Herosections

var swiper = new Swiper(".heroSwiper", {
    slidesPerView: 1,
    loop: true,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },

});
// slider testimonials
var swiper = new Swiper(".testimonialSwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,

    },
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 18,

        },
        768: {
            slidesPerView: 2,
            spaceBetween: 20,

        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 32,
        },
    },

});

// API calls

const getData = () => {
    fetch("https://dummyjson.com/products")
        .then(res => res.json())
        .then(data => {
            const products = data.products;
            displayProducts(products);
            displayCategory(products)
            displayShopProducts(data.products);
            document.getElementById("search-btn").addEventListener("click", () => {
                handleSearch(products);
                displaySearchProducts()
            });
           
        })
}
getData()


document.addEventListener("DOMContentLoaded", function () {
    const togglebtn = document.getElementById("show-search");

    togglebtn.addEventListener("click", function () {
        const sdiv = document.getElementById("search-div");
        sdiv.classList.toggle("hidden");
    });
});


// Handle search when the input value changes
// const handleSearchEvent = (products) => {
//     const value = document.getElementById("search-input").value.trim();

//     if (value) {
//         // Filter products based on the search term
//         const filteredProducts = products.filter(product =>
//             product.title.toLowerCase().includes(value.toLowerCase())
//         );

//         console.log('Filtered Products:', filteredProducts);

//         // Clear input field after search (optional)
//         document.getElementById("search-input").value = '';

//         // Display filtered products
//         displaySearchProducts(filteredProducts);
//     } else {
//         alert("Please enter a valid search term.");
//     }
// };






const handleSearch = (products) => {
    const value = document.getElementById("search-input").value.trim();

    if (value) {
        // Filter products based on the search term
        const filteredProducts = products.filter(product =>
            product.title.toLowerCase().includes(value.toLowerCase())
        );

        // Debug: Check if filtered products exist
        console.log('Filtered Products:', filteredProducts);

        // Clear input field
        document.getElementById("search-input").value = '';

        // Display the filtered products
        displaySearchProducts(filteredProducts);
    } else {
        alert("Please enter a valid search term.");
    }
};

const displaySearchProducts = (products) => {
    const productsContainer = document.getElementById('searchproducts');
    console.log('Displaying Products: 17', products.length);
   
    productsContainer.innerHTML = '';  

    // Check if any products are available
    if (products.length === 0) {
        productsContainer.innerHTML = '<p>No products found.</p>';
        return;
    }

 
    products.forEach(product => {
        const productImage = product.images && product.images[0] ? product.images[0] : 'placeholder.jpg'; // Fallback image
        const productTitle = product.title ? product.title : 'No title available';

        productsContainer.innerHTML += `
            <div
                class="w-[365px] border-b flex gap-3 p-3 rounded-lg group overflow-hidden cursor-pointer relative z-50 hover:before:bg-black before:absolute before:inset-0 before:opacity-20 before:transition-all"
                onclick="window.location.href='product-details.html?id=${product.id}'"> 
                <div class="w-12 h-12 overflow-hidden mx-auto aspect-w-16 aspect-h-8">
                    <img src="${productImage}" alt="product" class="h-full w-full object-contain" />
                </div>
                
                <h3 class="text-base font-bold text-gray-800">${productTitle}</h3>
            </div>
        `;
    });
};

const displayProducts = (products) => {
    const productsContainer = document.getElementById('products');

    products.forEach(product => {
        productsContainer.innerHTML += `
            <div
                class="bg-gray-100 p-3 rounded-lg group overflow-hidden cursor-pointer relative  hover:before:bg-black before:absolute before:inset-0 before:opacity-20 before:transition-all"
                >  
                <div class="w-full h-[300px] overflow-hidden mx-auto aspect-w-16 aspect-h-8">
                    <img src=${product?.images[0]} alt="product1" class="h-full w-full object-contain" />
                </div>

                <div
                    class="absolute mx-auto left-0 right-0 -bottom-80 group-hover:bottom-2 bg-white w-11/12 p-3 rounded-lg transition-all duration-500">
                    <div class="text-center">
                        <h3 onclick="window.location.href='product-details.html?id=${product.id}'" class="text-base font-bold text-gray-800">${product.title}</h3>
                        <h4 class="text-lg text-blue-600 font-bold mt-2">$${product.price}</h4>
                    </div>
                    
                    <div class="flex justify-center space-x-1 mt-4 text-[#facc15]">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star text-[#CED5D8]"></i>
                    </div>
                    <button class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
    });
}

// const displayCategory = (products) => {
//     const category = [...new Set(products?.map(product => product.category))]
// }
// displayCategory()
// Get stored cart from localStorage or initialize an empty cart
const getStoredCart = () => {  
    return localStorage.getItem('shopping-cart') ? JSON.parse(localStorage.getItem('shopping-cart')) : [];
}

// Add product to the cart
const addToCart = (productId) => {
    const cart = getStoredCart();
    const product = cart.find(item => item.id === productId);

    if (product) {
        product.quantity += 1; // Increase quantity if already in cart
        localStorage.setItem('shopping-cart', JSON.stringify(cart)); // Save updated cart to localStorage
        displayCart(); 
        displayCartLength()// Update cart display immediately
    } else {
        // Fetch product data if not already in the cart
        fetch("https://dummyjson.com/products")
            .then(res => res.json())
            .then(data => {
                const products = data.products;
                const productToAdd = products.find(item => item.id === productId);

                if (productToAdd) {
                    cart.push({ ...productToAdd, quantity: 1 }); // Add product with quantity 1
                    localStorage.setItem('shopping-cart', JSON.stringify(cart)); // Save updated cart to localStorage
                    displayCart();
                    displayCartLength() // Update cart display immediately
                    alert('Product added to cart!'); // Notify user
                }
            });
    }
}
// Remove product from the cart by ID
const removeFromCart = (productId) => {
    const cart = getStoredCart();
    const updatedCart = cart.filter(item => item.id !== productId); // Remove item by ID
    localStorage.setItem('shopping-cart', JSON.stringify(updatedCart)); // Update cart in localStorage
    displayCart(); // Refresh cart display
    alert('Product removed from cart!'); // Notify user
}
//  <button onclick="removeFromCart(${item.id})">Remove</button> <!-- Remove button -->
// You can create a function to display cart items
const displayCart = () => {
    const cartContainer = document.getElementById('cart'); 
    cartContainer.innerHTML = '';

    cart.forEach(item => {
        cartContainer.innerHTML += `
            <div>
                <h3>${item.title} - $${item.price} x ${item.quantity}</h3>
            </div>
        `;
    });
}

const displayCartLength = () => {
    const cartLength = getStoredCart().length;
    console.log(cartLength);
    document.getElementById('cartLength').innerHTML = cartLength;

}
displayCartLength()