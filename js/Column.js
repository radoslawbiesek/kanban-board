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
                btnCardSubmit.setAttribute('data-column-trigger', self.id);
                showModal(modalAddCard);
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
        fetch(prefix + baseUrl + '/column/' + self.id, {method: 'DELETE', headers: myHeaders})
            .then(function(resp) {
                return resp.json();
            })
            .then(function(resp){
                self.element.remove();
            })
    }
};

function submitCard(columnId) {
    var column = board.columns[columnId];
    var name = document.getElementById('card-name-input').value || "Untitled";
    var label = document.getElementById('card-label-input').value || "blue";
    var desc = name + '|' + label;
    var cardData = new FormData();
    cardData.append('name', desc);
    cardData.append('bootcamp_kanban_column_id', column.id);
 
    fetch(prefix + baseUrl + '/card', { 
        method: 'POST',
        headers: myHeaders,
        body: cardData,
    })
        .then(function(resp) {
            return resp.json();
        })
        .then(function(resp) {
            var card = new Card(resp.id, desc);
            column.addCard(card);
            hideAllModals(); 
        })             
}