// menu
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
            console.log(data.products);
            displayProducts(data.products);
            displayCategory(data.products)
            // Add search event listener to the button
            document.getElementById("search-btn").addEventListener("click", () => {
                handleSearch(data.products);
                displaySearchProducts()
            });
        })
}
getData()


document.addEventListener("DOMContentLoaded", function () {
    const togglebtn = document.getElementById("show-search");

    togglebtn.addEventListener("click", function() {
        const sdiv = document.getElementById("search-div");
        sdiv.classList.toggle("hidden");
    });
});



const handleSearch = (products) => {
    const value = document.getElementById("search-input").value.trim();
    
    if (value) {
        const filteredProducts = products.filter(product =>
            product.title.toLowerCase().includes(value.toLowerCase())
        );
        document.getElementById("search-input").value=''
        console.log(filteredProducts);
        displaySearchProducts(filteredProducts); 
    } else {
        alert("Please enter a valid search term.");
    }
};

const displaySearchProducts=(products)=>{
    const productsContainer = document.getElementById('searchproducts');

    products.forEach(product => {
        productsContainer.innerHTML += `
            <div
                class=" w-[365px] border-b flex gap-3 p-3 rounded-lg group overflow-hidden cursor-pointer relative z-50 hover:before:bg-black before:absolute before:inset-0 before:opacity-20 before:transition-all"
                onclick="window.location.href='product-details.html?id=${product.id}'"> 
                <div class="w-12 h-12 overflow-hidden mx-auto aspect-w-16 aspect-h-8">
                    <img src=${product?.images[0]} alt="product1" class="h-full w-full object-contain" />
                </div>
                
                <h3 class="text-base font-bold text-gray-800">${product?.title}</h3>




                </div>
            </div>
        `;

    });

}




const displayProducts = (products) => {
    const productsContainer = document.getElementById('products');

    products.forEach(product => {
        productsContainer.innerHTML += `
            <div
                class="bg-gray-100 p-3 rounded-lg group overflow-hidden cursor-pointer relative z-50 hover:before:bg-black before:absolute before:inset-0 before:opacity-20 before:transition-all"
                onclick="window.location.href='product-details.html?id=${product.id}'">  <!-- Link to product details page -->
                <div class="w-full h-[300px] overflow-hidden mx-auto aspect-w-16 aspect-h-8">
                    <img src=${product?.images[0]} alt="product1" class="h-full w-full object-contain" />
                </div>

                <div
                    class="absolute mx-auto left-0 right-0 -bottom-80 group-hover:bottom-2 bg-white w-11/12 p-3 rounded-lg transition-all duration-500">
                    <div class="text-center">
                        <h3 class="text-base font-bold text-gray-800">${product.title}</h3>
                        <h4 class="text-lg text-blue-600 font-bold mt-2">$${product.price}</h4>
                    </div>
                    
                    <div class="flex justify-center space-x-1 mt-4 text-[#facc15]">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star text-[#CED5D8]"></i>
                    </div>
                </div>
            </div>
        `;
    });
}

const displayCategory = (products) => {

   const category= [...new Set(products?.map(product=>product.category))]
console.log(category);
    
   
}
displayCategory()