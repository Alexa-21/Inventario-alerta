//  arreglo de productos (simulado) con esta estructura:
const products = [
    {
        name: "Centrum",
        category: "medicamento",
        description: "Descripción del producto 1",
        price: 10.99,
        stock: 50
    },
    {
        name: "Advil",
        category: "vendible",
        description: "Descripción del producto 2",
        price: 5.99,
        stock: 100
    },
    // Agregar más productos aquí...
    {
        name: "Ibuprofeno",
        category: "medicamento",
        description: "Alivia el dolor y reduce la fiebre",
        price: 7.99,
        stock: 30
    }
];

// Elementos HTML
const productList = document.getElementById('product-list');
const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('category');

const productDetailsContainer = document.getElementById('product-details');
const productName = document.getElementById('product-name');
const productCategory = document.getElementById('product-category');
const productDescription = document.getElementById('product-description');
const productPrice = document.getElementById('product-price');
const productStock = document.getElementById('product-stock');
const productExpiry = document.getElementById('product-expiry');

const addToCartButton = document.getElementById('add-to-cart');
const cartItemsList = document.getElementById('cart-items');
const buyButton = document.getElementById('buy-button');
const clearCartButton = document.getElementById('clear-cart-button');

const exportCsvButton = document.getElementById('export-csv');

// Carrito de compras
const cart = []; // Un arreglo para almacenar los productos en el carrito

// Variable para almacenar el producto actualmente mostrado
let selectedProduct = null;

// Función para renderizar la lista de productos
function renderProducts() {
    productList.innerHTML = '';
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value.toLowerCase();

    products.forEach(product => {
        if ((product.name.toLowerCase().includes(searchTerm) || searchTerm === '') &&
            (product.category === selectedCategory || selectedCategory === '')) {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <h2>${product.name}</h2>
                <p>Categoría: ${product.category}</p>
                <p>Descripción: ${product.description}</p>
                <p>Precio: $${product.price}</p>
                <p>Stock: ${product.stock}</p>
            `;
            productList.appendChild(productElement);

            // Agregar un listener para mostrar detalles al hacer clic
            productElement.addEventListener('click', () => {
                showProductDetails(product);
            });
        }
    });
}

// Agregar escuchas de eventos a los elementos de entrada
searchInput.addEventListener('input', renderProducts);
categorySelect.addEventListener('change', renderProducts);

// Función para mostrar detalles de un producto
function showProductDetails(product) {
    selectedProduct = product; // Captura el producto actual
    productName.textContent = `Nombre: ${product.name}`;
    productCategory.textContent = `Categoría: ${product.category}`;
    productDescription.textContent = `Descripción: ${product.description}`;
    productPrice.textContent = `Precio: $${product.price}`;
    productStock.textContent = `Stock: ${product.stock}`;
    productExpiry.textContent = `Fecha de Vencimiento: ${product.expiry || 'No especificada'}`;

    productDetailsContainer.style.display = 'block' ;
}

// Función para agregar un producto al carrito de compras
addToCartButton.addEventListener('click', () => {
    if (selectedProduct) {
        // Agregar el producto actual al carrito
        cart.push(selectedProduct);

        // Crear un nuevo elemento de lista para mostrar en el carrito
        const cartItem = document.createElement('li');
        cartItem.textContent = `${selectedProduct.name} - $${selectedProduct.price}`;
        cartItemsList.appendChild(cartItem);

        // Agregar botón para eliminar el producto del carrito
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.addEventListener('click', () => {
            // Elimina el producto del carrito
            const index = cart.indexOf(selectedProduct);
            if (index !== -1) {
                cart.splice(index, 1);
                cartItemsList.removeChild(cartItem);
            }
        });
        cartItem.appendChild(removeButton);

        // Puedes realizar otras acciones aquí, como actualizar el precio total del carrito

        // Limpia los detalles del producto y oculta el contenedor de detalles
        productDetailsContainer.style.display = 'none';
        productName.textContent = '';
        productCategory.textContent = '';
        productDescription.textContent = '';
        productPrice.textContent = '';
        productStock.textContent = '';
        productExpiry.textContent = '';
    }
});

// Función para comprar productos en el carrito
buyButton.addEventListener('click', () => {
    // Puedes realizar acciones adicionales aquí, como procesar la compra
    alert('Compra realizada. Gracias por su compra.');
    // Limpia el carrito después de la compra
    cart.length = 0;
    renderCart();
});

// Función para limpiar el carrito
clearCartButton.addEventListener('click', () => {
    // Limpia el carrito
    cart.length = 0;
    renderCart();
});

// Función para renderizar el carrito
function renderCart() {
    cartItemsList.innerHTML = '';
    cart.forEach(product => {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${product.name} - $${product.price}`;
        cartItemsList.appendChild(cartItem);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.addEventListener('click', () => {
            // Elimina el producto del carrito
            const index = cart.indexOf(product);
            if (index !== -1) {
                cart.splice(index, 1);
                cartItemsList.removeChild(cartItem);
            }
        });
        cartItem.appendChild(removeButton);
    });
}

// Función para exportar el inventario a un archivo CSV
function exportToCsv(data) {
    const csvContent = "data:text/csv;charset=utf-8," + data.map(e => Object.values(e).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "inventory.csv");
    document.body.appendChild(link);
    link.click();
}

exportCsvButton.addEventListener('click', () => {
    exportToCsv(products);
});

// Llama a la función inicialmente para cargar los productos.
renderProducts();
renderCart();
