const whatsapp = import.meta.env?.PUBLIC_WHATSAPP || "5491132776974"; // fallback

window.openModalFromList = function(index) {
  const product = window.dynamicProducts?.[index];
  if (!product) return;

  const modal = document.getElementById('burger-modal');
  modal.classList.remove('hidden');

  // Guardar el índice actual para uso posterior
  modal.dataset.index = index;

  document.getElementById('modal-img').src = product.image;
  document.getElementById('modal-title').textContent = product.name;
  document.getElementById('modal-description').textContent = product.description;
  document.getElementById('product-name').value = product.name;

  const priceText = document.getElementById('modal-price');
  priceText.textContent = `Precio unitario: $${product.price}`;

  updateTotalPrice();
};

window.closeModal = function() {
  document.getElementById('burger-modal').classList.add('hidden');
};

// Cierra al hacer clic fuera del modal
window.addEventListener('click', function (event) {
  const modal = document.getElementById('burger-modal');
  const content = document.querySelector('.modal-content');
  if (!modal.classList.contains('hidden') && !content.contains(event.target)) {
    closeModal();
  }
});

// Actualiza el total al cambiar cantidad
document.addEventListener('input', function (event) {
  if (event.target.id === 'quantity') {
    updateTotalPrice();
  }
});

function updateTotalPrice() {
  const modal = document.getElementById('burger-modal');
  const index = parseInt(modal.dataset.index, 10);
  const quantity = parseInt(document.getElementById('quantity').value, 10) || 1;
  const product = window.dynamicProducts?.[index];

  const total = (parseFloat(product?.price || 0) * quantity).toFixed(2);
  const totalPrice = document.getElementById('modal-total');
  totalPrice.textContent = `Total: $${total}`;
}

window.sendOrder = function(event) {
  event.preventDefault();
  const name = document.getElementById('product-name').value;
  const qty = document.getElementById('quantity').value;
  const address = document.getElementById('address').value;
  const comment = document.getElementById('comment').value;

  const text = encodeURIComponent(
    `Hola! Quiero pedir ${qty} ${name}\nDirección: ${address}\n${comment ? 'Comentario: ' + comment : ''}`
  );

  window.open(`https://wa.me/${whatsapp}?text=${text}`, '_blank');
  closeModal();
};
