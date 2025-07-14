const products = [
  {
    name: 'Bacon Smash',
    image: '/images/burger1.jpg',
    description: 'Doble carne, cheddar, panceta crocante y salsa especial.'
  },
  {
    name: 'Clásica Doble',
    image: '/images/burger2.jpg',
    description: 'Pan casero, doble medallón, lechuga, tomate y cheddar.'
  },
  {
    name: 'Veggie Corner',
    image: '/images/burger3.jpg',
    description: 'Hamburguesa de lentejas con vegetales y alioli vegano.'
  }
];

const whatsapp = import.meta.env?.PUBLIC_WHATSAPP || "5491132776974"; // fallback

window.openModal = function(index) {
  const modal = document.getElementById('burger-modal');
  const product = products[index];
  document.getElementById('modal-img').src = product.image;
  document.getElementById('modal-title').textContent = product.name;
  document.getElementById('modal-description').textContent = product.description;
  document.getElementById('product-name').value = product.name;
  modal.classList.remove('hidden');
}

window.closeModal = function() {
  document.getElementById('burger-modal').classList.add('hidden');
}

window.sendOrder = function(event) {
  event.preventDefault();
  const name = document.getElementById('product-name').value;
  const qty = document.getElementById('quantity').value;
  const address = document.getElementById('address').value;
  const comment = document.getElementById('comment').value;

  const text = encodeURIComponent(`Hola! Quiero pedir ${qty} ${name}\nDirección: ${address}\n${comment ? 'Comentario: ' + comment : ''}`);
  window.open(`https://wa.me/${whatsapp}?text=${text}`, '_blank');
  window.closeModal();
}
