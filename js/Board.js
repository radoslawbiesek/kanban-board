//  Board
var board = {
    name: 'Kanban Board',
    addColumn: function(column) {
        this.element.insertBefore(column.element, document.getElementById('column-add'));
        initSortable(column.id);
    },
    element: document.querySelector('#board .column-container')
};

document.querySelector('#board .column__btn-add-column').addEventListener('click', function() {
    showModal(modalAddColumn);
});

document.getElementById('btn-column-submit').addEventListener('click', function(element) {
    var columnNameInput = document.getElementById('column-name-input');
    var name = columnNameInput.value || "Untitled";

    var data = new FormData();
    data.append('name', name);

    fetch(prefix + baseUrl + '/column', {
        method: 'POST', 
        headers: myHeaders,
        body: data,
    })
        .then(function(resp){
            return resp.json();
        })
        .then(function(resp){
            var column = new Column(resp.id, name);
            board.addColumn(column);
            hideAllModals();
            hideOverlay();  
        });
});

// Init Sortable
function initSortable(id) {
    var el = document.getElementById(id);
    var sortable = Sortable.create(el, {
        group: 'kanban',
        sort: true
    });
};