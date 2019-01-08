// MODALS
var modals = document.querySelectorAll('.modal__content');
var modalOverlay = document.getElementById('modal-overlay');
var modalAddCard = document.getElementById('modal-add-card');
var modalAddColumn = document.getElementById('modal-add-column');
var closeModalButtons = document.querySelectorAll('[data-action="close-modal"]');
var btnCardSubmit = document.getElementById('btn-card-submit');

btnCardSubmit.addEventListener('click', function() {
    submitCard(btnCardSubmit.getAttribute('data-column-trigger'));
});

modalOverlay.addEventListener('click', function() {
    hideAllModals();
});

closeModalButtons.forEach(function(button) {
    button.addEventListener('click', function(){
        hideAllModals();              
    });
})

modals.forEach(function(modal) {
    modal.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});

function hideAllModals() {
    modals.forEach(function(modal){
        modal.classList.remove('modal__content--show');
    });
    modalOverlay.classList.remove('modal__overlay--show');
}

function showModal(modal) {
    modal.classList.add('modal__content--show');
    modalOverlay.classList.add('modal__overlay--show');
}