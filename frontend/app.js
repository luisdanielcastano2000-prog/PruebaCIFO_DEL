// Comportamiento de Catálogo Tech (fase 2): los datos ya NO viven aquí, sino en el backend.
// La página pide los productos al backend con fetch (peticiones HTTP con JSON) y solo se encarga de pintarlos.

// Dirección de la API de productos (el backend NestJS)
const API_URL = 'http://localhost:3000/products';

// Copia local de lo último que nos ha enviado el backend (solo para pintar; la verdad está en el servidor)
let products = [];

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
const formMessage = document.getElementById('form-message');
const productList = document.getElementById('product-list');
const listMessage = document.getElementById('list-message');

// Muestra (u oculta, si text está vacío) un mensaje; isError lo pinta en rojo
function showMessage(element, text, isError = false) {
  element.textContent = text;
  element.hidden = !text;
  element.classList.toggle('error', isError);
}

// Convierte la respuesta de error del backend en un texto legible.
// Ejemplo de respuesta 400: { "message": ["price must not be less than 0", ...], "statusCode": 400 }
async function getErrorText(response) {
  try {
    const body = await response.json();
    const messages = Array.isArray(body.message) ? body.message : [body.message];
    return `El servidor ha rechazado los datos (${response.status}): ${messages.join('; ')}`;
  } catch {
    return `El servidor ha respondido con un error (${response.status}).`;
  }
}

const CONNECTION_ERROR =
  'No se puede conectar con el servidor. ¿Está arrancado el backend en http://localhost:3000?';

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

// Vacía el listado y lo vuelve a pintar a partir de la copia local
function renderProducts() {
  productList.innerHTML = '';
  for (const product of products) {
    productList.append(createProductCard(product));
  }
  showMessage(listMessage, products.length === 0 ? 'Todavía no hay productos.' : '');
}

// LEER: GET /products → el backend devuelve la lista en JSON (ya ordenada, más recientes primero)
async function loadProducts() {
  showMessage(listMessage, 'Cargando productos…');
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      showMessage(listMessage, await getErrorText(response), true);
      return;
    }
    products = await response.json();
    renderProducts();
  } catch {
    // fetch falla del todo (sin respuesta) cuando el servidor está apagado o CORS lo bloquea
    showMessage(listMessage, CONNECTION_ERROR, true);
  }
}

// Lee los campos del formulario y los convierte en el objeto que espera el backend
function readForm() {
  // form.elements da acceso a los campos del formulario por su atributo name
  const fields = form.elements;
  return {
    name: fields.name.value.trim(),
    category: fields.category.value,
    price: Number(fields.price.value),
    stock: Number(fields.stock.value),
    description: fields.description.value.trim(),
  };
}

// CREAR: POST /products con el producto en JSON → el backend lo valida, lo guarda y lo devuelve con _id y fechas
async function createProduct(data) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, // avisa al backend de que el cuerpo va en JSON
    body: JSON.stringify(data), // objeto de JavaScript → texto JSON
  });
  return response;
}

// EVENTO: cuando se envía el formulario (el navegador ya ha comprobado las reglas: required, min…)
form.addEventListener('submit', async function (event) {
  event.preventDefault(); // evita que el navegador recargue la página, que es lo que haría por defecto
  showMessage(formMessage, '');

  try {
    const response = await createProduct(readForm());
    if (!response.ok) {
      showMessage(formMessage, await getErrorText(response), true);
      return;
    }
    form.reset(); // deja el formulario vacío para el siguiente producto
    await loadProducts(); // volvemos a pedir la lista: así vemos exactamente lo que hay en el servidor
  } catch {
    showMessage(formMessage, CONNECTION_ERROR, true);
  }
});

// Al cargar la página, pedimos los productos al backend
loadProducts();
