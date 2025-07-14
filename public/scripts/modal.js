const products = window.dynamicProducts || [];
const whatsapp = window.dynamicWhatsapp || "5491132776974";

window.openModalFromList = function(index) {
  const modal = document.getElementById('burger-modal');
  const product = products[index];

  document.getElementById('modal-img').src = product.image;
  document.getElementById('modal-title').textContent = product.name;
  document.getElementById('modal-description').textContent = product.description;
  document.getElementById('product-name').value = product.name;
  document.getElementById('quantity').value = 1;
  document.getElementById('order-total').textContent = `$${product.price}`;

  modal.dataset.productIndex = index;
  modal.classList.remove('hidden');
};

window.closeModal = function() {
  document.getElementById('burger-modal').classList.add('hidden');
};

// Cerrar al hacer clic fuera del modal
document.addEventListener('click', function (event) {
  const modal = document.getElementById('burger-modal');
  const modalContent = modal.querySelector('.modal-content');

  if (!modal.classList.contains('hidden') && !modalContent.contains(event.target)) {
    closeModal();
  }
});

// Actualizar total al cambiar cantidad
document.addEventListener('DOMContentLoaded', function () {
  const qtyInput = document.getElementById('quantity');
  qtyInput.addEventListener('input', function () {
    const modal = document.getElementById('burger-modal');
    const index = parseInt(modal.dataset.productIndex, 10);
    const product = products[index];
    const qty = parseInt(qtyInput.value, 10) || 1;
    const total = product.price * qty;
    document.getElementById('order-total').textContent = `$${total}`;
  });
});

window.sendOrder = function(event) {
  event.preventDefault();

  const modal = document.getElementById('burger-modal');
  const index = parseInt(modal.dataset.productIndex, 10);
  const product = products[index];

  const qty = document.getElementById('quantity').value;
  const address = document.getElementById('address').value;
  const comment = document.getElementById('comment').value;

  const text = encodeURIComponent(`Hola! Quiero pedir ${qty} ${product.name}\nDirección: ${address}\n${comment ? 'Comentario: ' + comment : ''}`);
  window.open(`https://wa.me/${whatsapp}?text=${text}`, '_blank');

  closeModal();
};
