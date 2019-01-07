// MODALS
var modals = document.querySelectorAll('.modal__content');
var modalOverlay = document.getElementById('modal-overlay');
var modalAddCard = document.getElementById('modal-add-card');
var modalAddColumn = document.getElementById('modal-add-column');
var closeModalButtons = document.querySelectorAll('[data-action="close-modal"]');
var btnCardSubmit = document.getElementById('btn-card-submit');

modalOverlay.addEventListener('click', function() {
    hideAllModals();
    btnCardSubmit.removeEventListener('click', linkModal);
});

closeModalButtons.forEach(function(button) {
    button.addEventListener('click', function(){
        hideAllModals();
        btnCardSubmit.removeEventListener('click', linkModal);                
    });
})

modals.forEach(function(modal) {
    modal.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});

function hideAllModals() {
    modals.forEach(hideModal);
    hideOverlay();
}

function hideModal(modal) {
    modal.classList.remove('modal__content--show');
}

function hideOverlay() {
    modalOverlay.classList.remove('modal__overlay--show');
}

function showModal(modal) {
    modal.classList.add('modal__content--show');
    modalOverlay.classList.add('modal__overlay--show');
}