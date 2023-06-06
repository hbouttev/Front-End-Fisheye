function openModal(modalElement) {
    document.body.style.overflow = 'hidden';
    modalElement.showModal();
}

function closeModal(modalElement) {
    document.body.style.overflow = '';
    modalElement.close();
}