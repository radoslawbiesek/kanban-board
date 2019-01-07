// Class Card
function Card(id, name, label) {
    var self = this; 
    this.id = id;
    this.name = name || 'Untitled';
    this.label = label || 'blue';
    this.element = generateTemplate('card-template', { name: this.name, id: this.id, label: this.label }, 'li');
    
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
        fetch(prefix + baseUrl + '/card' + self.id, {method: 'DELETE', headers: myHeaders})
            .then(function(resp){
                return resp.json();
            })
            .then(function(resp) {
                self.remove();
            });
    }
};