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
        };

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
                if (event.target.parentNode.classList.contains('column__btn-delete')) {
                  self.removeColumn();
                }    
                if (event.target.classList.contains('column__add-card-btn')) {
                  self.addCard(new Card(prompt("Please enter the name of the task: ")));
                }
              });
        }
        // Column methods
        Column.prototype = {
            addCard: function(card) {
              this.element.querySelector('.column__cards-list').appendChild(card.element);
            },
            removeColumn: function() {
              this.element.parentNode.removeChild(this.element);
            }
        };

        // Class Card
        function Card(description) {
            var self = this;
          
            this.id = randomString();
            this.description = description;
            this.element = generateTemplate('card-template', { description: this.description, id: this.id }, 'li');
            
            this.element.querySelector('.card').addEventListener('click', function (event) {
                event.stopPropagation();
              
                if (event.target.parentNode.classList.contains('card__btn-delete')) {
                  self.removeCard();
                }
            });
        };
        //  Card methods
        Card.prototype = {
            removeCard: function() {
                this.element.parentNode.removeChild(this.element);
            }
        };

        //  Board
        var board = {
            name: 'Kanban Board',
            addColumn: function(column) {
              var columns = document.querySelectorAll('.column');
              this.element.insertBefore(column.element, columns[columns.length-1]);
              initSortable(column.id);
            },
            element: document.querySelector('#board .column-container')
        };

        // Init Sortable
        function initSortable(id) {
            var el = document.getElementById(id);
            var sortable = Sortable.create(el, {
              group: 'kanban',
              sort: true
            });
        };

        document.querySelector('#board .column__btn-create-column').addEventListener('click', function() {
            var name = prompt('Enter a column name');
            var column = new Column(name);
            board.addColumn(column);
        });

        // Default columns and carts
        var todoColumn = new Column('To do');
        var doingColumn = new Column('Doing');
        var doneColumn = new Column('Done');

        // ADDING COLUMNS TO THE BOARD
        board.addColumn(todoColumn);
        board.addColumn(doingColumn);
        board.addColumn(doneColumn);

        // CREATING CARDS
        var task1 = new Card('Layout: Photo');
        var task2 = new Card('Layout: Golden');
        var task3 = new Card('Modul 11');
        var task4 = new Card('Modul 12');
        var task5 = new Card('Rock, Paper, Scissors');
        var task6 = new Card('YDKJS book series');

        // ADDING CARDS TO COLUMNS
        todoColumn.addCard(task1);
        todoColumn.addCard(task2);
        todoColumn.addCard(task4);
        todoColumn.addCard(task6);
        doingColumn.addCard(task3);
        doneColumn.addCard(task5);
    })
})();