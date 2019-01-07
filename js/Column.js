// Class Column
function Column(id, name) {
    var self = this;
    this.id = id;
    this.name = name || 'Untitled';
    this.element = generateTemplate('column-template', { name: this.name, id: this.id });

    this.element.querySelector('.column').addEventListener('click', function (event) {
        switch (event.target.getAttribute('data-action')) {
            case 'delete-column':
                self.removeColumn();
                break;
            case 'show-modal':
                showModal(modalAddCard);
                btnCardSubmit.addEventListener('click', function linkModal() {
                    submitCard(self);
                    btnCardSubmit.removeEventListener('click', linkModal);
                });
        }
    });
}

// Column methods
Column.prototype = {
    addCard: function(card) {
        this.element.querySelector('.column__cards-list').appendChild(card.element);
    },
    removeColumn: function() {
        var self = this;
        fetch(baserUrl + '/column' + self.id, {method: 'DELETE', headers: myHeaders})
            .then(function(resp) {
                return resp.json();
            })
            .then(function(resp){
                self.element.remove();
            })
    }
};

function submitCard(column) {
    var name = document.getElementById('card-name-input').value || "Untitled";
    var label = document.getElementById('card-label-input').value || "blue";
    var data = new FormData();
    data.append('name', name);
    data.append('bootcamp_kanban_column_id', self.id);

    fetch(prefix + baseUrl + '/card', { 
        method: 'POST',
        headers: myHeaders,
        body: data,
    })
    .then(function(resp) {
        return resp.json();
    })
    .then(function(resp) {
        var card = new Card(resp.id, name);
        column.addCard(card);
        hideAllModals();
        hideOverlay(); 
    })             
}