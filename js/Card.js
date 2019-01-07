// Class Card
function Card(id, desc) {
    var self = this; 
    this.id = id;
    this.name = desc.slice(0, desc.indexOf('|')) || 'Untitled';
    this.label = desc.slice(desc.indexOf('|') + 1) || 'blue';
    this.element = generateTemplate('card-template', { id: this.id, name: this.name, label: this.label}, 'li');
    
    this.element.querySelector('.card').addEventListener('click', function (event) {
        switch (event.target.getAttribute('data-action')) {
            case 'delete-card':
                self.removeCard();
        }
    });
};

//  Card methods
Card.prototype = {
    removeCard: function() {
        var self = this;
        fetch(prefix + baseUrl + '/card/' + self.id, {method: 'DELETE', headers: myHeaders})
            .then(function(resp){
                return resp.json();
            })
            .then(function(resp) {
                self.element.remove();
            });
    }
};