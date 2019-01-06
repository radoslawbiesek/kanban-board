'use strict';
(function() {
    document.addEventListener('DOMContentLoaded', function() {      

        // Generate random id for a card
        function randomString() {
            var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
            var str = '';
            for (var i = 0; i < 10; i++) {
                str += chars[Math.floor(Math.random() * chars.length)];
            }
            return str;
        }

        // Generate template
        function generateTemplate(name, data, basicElement) {
            var template = document.getElementById(name).innerHTML;
            var element = document.createElement(basicElement || 'div');
            Mustache.parse(template);
            element.innerHTML = Mustache.render(template, data); 
            return element;
        }

        // Class Column
        function Column(name) {
            var self = this;
            this.id = randomString();
            this.name = name;
            this.element = generateTemplate('column-template', { name: this.name, id: this.id });

            this.element.querySelector('.column').addEventListener('click', function (event) {
                switch (event.target.getAttribute('data-action')) {
                    case 'delete-column':
                        self.removeColumn();
                    case 'show-modal':
                        showModal(modalAddCard);
                        btnCardSubmit.addEventListener('click', function linkModal() { 
                            submitCard(self);
                            btnCardSubmit.removeEventListener('click', linkModal);
                        });
                }
            });
        }

        function submitCard(column) {
            var name = document.getElementById('card-name-input').value || "Untitled";
            var label = document.getElementById('card-label-input').value || "blue";
            var card = new Card(name, label);
            column.addCard(card);
            hideAllModals();
            hideOverlay();           
        }

        // Column methods
        Column.prototype = {
            addCard: function(card) {
                this.element.querySelector('.column__cards-list').appendChild(card.element);
            },
            removeColumn: function() {
                this.element.remove();
            }
        };

        // Class Card
        function Card(description, label) {
            var self = this; 
            this.id = randomString();
            this.description = description;
            this.label = label || 'blue';
            this.element = generateTemplate('card-template', { description: this.description, id: this.id, label: this.label }, 'li');
            
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
                this.element.remove();
            }
        };

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
            var column = new Column(name);
            board.addColumn(column);
            columnNameInput.value = "";
            hideAllModals();
            hideOverlay();  
        });

        // Init Sortable
        function initSortable(id) {
            var el = document.getElementById(id);
            var sortable = Sortable.create(el, {
                group: 'kanban',
                sort: true
            });
        };

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

        // Default columns and carts
        var todoColumn = new Column('To do');
        var doingColumn = new Column('Doing');
        var doneColumn = new Column('Done');

        // ADDING COLUMNS TO THE BOARD
        board.addColumn(todoColumn);
        board.addColumn(doingColumn);
        board.addColumn(doneColumn);

        // CREATING CARDS
        var task1 = new Card('Layout: Photo', 'yellow');
        var task2 = new Card('Layout: Golden', 'yellow');
        var task3 = new Card('Modul 11', 'blue');
        var task4 = new Card('Modul 12', 'red');
        var task5 = new Card('Rock, Paper, Scissors', 'green');
        var task6 = new Card('YDKJS book series', 'orange');

        // ADDING CARDS TO COLUMNS
        doingColumn.addCard(task1);
        todoColumn.addCard(task2);
        doingColumn.addCard(task4);
        todoColumn.addCard(task6);
        doingColumn.addCard(task3);
        doneColumn.addCard(task5);

    }) 
})();