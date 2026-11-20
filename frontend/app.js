// Comportamiento de Catálogo Tech (fase 2): los datos ya NO viven aquí, sino en el backend.
// La página pide los productos al backend con fetch (peticiones HTTP con JSON) y solo se encarga de pintarlos.
// Operaciones: listar (GET), crear (POST), editar (PATCH) y borrar (DELETE).

// Dirección de la API de productos (el backend NestJS)
const API_URL = 'http://localhost:3000/products';

// Copia local de lo último que nos ha enviado el backend (solo para pintar; la verdad está en el servidor)
let products = [];

// Si estamos editando un producto, aquí va su _id; si estamos creando uno nuevo, vale null
let editingId = null;

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
const formTitle = document.getElementById('form-title');
const submitButton = document.getElementById('submit-button');
const cancelButton = document.getElementById('cancel-button');
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
  if (product._id === editingId) {
    card.classList.add('editing'); // borde azul en la tarjeta que se está editando
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

  // Botones de la tarjeta. data-action y data-id dicen qué hacer y con qué producto (ver "EVENTO: clic en el listado")
  const actions = document.createElement('div');
  actions.className = 'card-actions';
  const editButton = document.createElement('button');
  editButton.type = 'button';
  editButton.textContent = 'Editar';
  editButton.dataset.action = 'edit';
  editButton.dataset.id = product._id;
  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'delete';
  deleteButton.textContent = 'Borrar';
  deleteButton.dataset.action = 'delete';
  deleteButton.dataset.id = product._id;
  actions.append(editButton, deleteButton);
  card.append(actions);

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

// EDITAR: PATCH /products/:id con los campos nuevos → el backend los valida y devuelve el producto actualizado
async function updateProduct(id, data) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response;
}

// BORRAR: DELETE /products/:id → el backend lo quita y devuelve el producto borrado
async function deleteProduct(product) {
  // confirm() muestra una ventana del navegador con Aceptar / Cancelar
  if (!confirm(`¿Seguro que quieres borrar "${product.name}"?`)) {
    return;
  }
  showMessage(formMessage, '');
  try {
    const response = await fetch(`${API_URL}/${product._id}`, { method: 'DELETE' });
    if (!response.ok) {
      // p. ej., 404 si otra persona ya lo había borrado: recargamos la lista para ver lo que hay de verdad
      const errorText = await getErrorText(response);
      await loadProducts();
      showMessage(listMessage, errorText, true);
      return;
    }
    if (product._id === editingId) {
      stopEditing(); // si estábamos editando el producto borrado, salimos de la edición
    }
    await loadProducts();
  } catch {
    showMessage(listMessage, CONNECTION_ERROR, true);
  }
}

// Pasa el formulario a modo edición: lo rellena con los datos del producto y cambia título y botón
function startEditing(product) {
  editingId = product._id;
  const fields = form.elements;
  fields.name.value = product.name;
  fields.category.value = product.category;
  fields.price.value = product.price;
  fields.stock.value = product.stock;
  fields.description.value = product.description ?? '';
  formTitle.textContent = 'Editar producto';
  submitButton.textContent = 'Guardar cambios';
  cancelButton.hidden = false;
  showMessage(formMessage, '');
  renderProducts(); // para marcar en azul la tarjeta que se edita
  fields.name.focus();
}

// Vuelve al modo "Nuevo producto" con el formulario vacío
function stopEditing() {
  editingId = null;
  form.reset();
  formTitle.textContent = 'Nuevo producto';
  submitButton.textContent = 'Añadir producto';
  cancelButton.hidden = true;
  showMessage(formMessage, '');
  renderProducts();
}

// EVENTO: cuando se envía el formulario (el navegador ya ha comprobado las reglas: required, min…)
form.addEventListener('submit', async function (event) {
  event.preventDefault(); // evita que el navegador recargue la página, que es lo que haría por defecto
  showMessage(formMessage, '');

  // Desactiva el botón mientras se guarda: evita crear el mismo producto dos veces con un doble clic
  const buttonText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = 'Guardando…';

  try {
    // Si estamos editando → PATCH; si no → POST
    const response = editingId
      ? await updateProduct(editingId, readForm())
      : await createProduct(readForm());
    if (!response.ok) {
      showMessage(formMessage, await getErrorText(response), true);
      return;
    }
    if (editingId) {
      stopEditing();
    } else {
      form.reset(); // deja el formulario vacío para el siguiente producto
    }
    await loadProducts(); // volvemos a pedir la lista: así vemos exactamente lo que hay en el servidor
  } catch {
    showMessage(formMessage, CONNECTION_ERROR, true);
  } finally {
    // finally se ejecuta siempre, haya ido bien o mal: vuelve a activar el botón
    submitButton.disabled = false;
    if (submitButton.textContent === 'Guardando…') {
      submitButton.textContent = buttonText;
    }
  }
});

// EVENTO: botón Cancelar → salir de la edición sin guardar
cancelButton.addEventListener('click', stopEditing);

// EVENTO: clic en el listado. Un solo "escuchador" para todos los botones de todas las tarjetas:
// miramos si el clic fue en un botón con data-action y actuamos sobre el producto de su data-id
productList.addEventListener('click', function (event) {
  const button = event.target.closest('button[data-action]');
  if (!button) {
    return;
  }
  const product = products.find((p) => p._id === button.dataset.id);
  if (!product) {
    return;
  }
  if (button.dataset.action === 'edit') {
    startEditing(product);
  } else if (button.dataset.action === 'delete') {
    deleteProduct(product);
  }
});

// Al cargar la página, pedimos los productos al backend
loadProducts();
