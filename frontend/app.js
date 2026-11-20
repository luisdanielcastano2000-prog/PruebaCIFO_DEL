// Comportamiento de Catálogo Tech (fase 1): los datos viven en un array, en la memoria del navegador.
// Al recargar la página, el array vuelve a su estado inicial (esa es la limitación de esta fase).

// DATOS: lista de productos. Empieza con 3 de ejemplo.
const products = [
  {
    name: 'MacBook Air 13',
    category: 'portatil',
    price: 1199,
    stock: 8,
    description: 'Portátil ligero con chip Apple M3 y 16 GB de RAM.',
  },
  {
    name: 'Pixel 9',
    category: 'movil',
    price: 799,
    stock: 15,
    description: 'Móvil Android con cámara de 50 MP.',
  },
  {
    name: 'Sony WH-1000XM5',
    category: 'audio',
    price: 349.99,
    stock: 0,
    description: 'Auriculares inalámbricos con cancelación de ruido.',
  },
];

// Para mostrar la categoría en español: se guarda "portatil", se muestra "Portátil"
const categoryLabels = {
  portatil: 'Portátil',
  movil: 'Móvil',
  tablet: 'Tablet',
  audio: 'Audio',
  accesorio: 'Accesorio',
};

// Referencias a elementos del HTML (del DOM) con los que vamos a trabajar
const form = document.getElementById('product-form');
const productList = document.getElementById('product-list');

// Crea la tarjeta HTML de un producto
function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card';
  if (product.stock === 0) {
    card.classList.add('out-of-stock'); // pegatina "agotado" para que el CSS la pinte en rojo
  }

  // Usamos textContent (y no innerHTML) para que el texto escrito por el usuario se muestre tal cual, sin interpretarse como HTML
  const title = document.createElement('h3');
  title.textContent = product.name;

  const category = document.createElement('p');
  category.className = 'category';
  category.textContent = categoryLabels[product.category];

  const price = document.createElement('p');
  price.className = 'price';
  price.textContent = product.price.toFixed(2) + ' €';

  const stock = document.createElement('p');
  stock.className = 'stock';
  stock.textContent = 'Stock: ' + product.stock;

  card.append(title, category, price, stock);

  // La descripción es opcional: solo se añade si hay texto
  if (product.description) {
    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = product.description;
    card.append(description);
  }

  return card;
}

// Vacía el listado y lo vuelve a pintar a partir del array (el array es la única fuente de verdad)
function renderProducts() {
  productList.innerHTML = '';
  for (const product of products) {
    productList.append(createProductCard(product));
  }
}

// EVENTO: cuando se envía el formulario (el navegador ya ha comprobado las reglas: required, min…)
form.addEventListener('submit', function (event) {
  event.preventDefault(); // evita que el navegador recargue la página, que es lo que haría por defecto

  // form.elements da acceso a los campos del formulario por su atributo name
  const fields = form.elements;
  const newProduct = {
    name: fields.name.value.trim(),
    category: fields.category.value,
    price: Number(fields.price.value),
    stock: Number(fields.stock.value),
    description: fields.description.value.trim(),
  };

  products.unshift(newProduct); // al principio del array: los más recientes primero
  renderProducts();
  form.reset(); // deja el formulario vacío para el siguiente producto
});

// Al cargar la página, pintamos los productos iniciales
renderProducts();
