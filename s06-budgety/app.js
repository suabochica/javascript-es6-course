var budgetController = (function() {
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    return {
        addItem: function(type, description, value) {
            var newItem,
                id;

            if(data.allItems[type].length > 0) {
                id = data.allItems[type][data.allItems[type].length - 1].id + 1
            } else {
                id = 0;
            }

            if(type === 'exp') {
                newItem = new Expense(id, description, value);
            } else if(type === 'inc') {
                newItem = new Income(id, description, value);
            }

            data.allItems[type].push(newItem);

            return newItem;
        },

        testDataPrint: function() {
            console.log(data);
        }
    }
})();

var uiController = (function() {
    var UI_CONSTANTS = {
        INPUT_TYPE: '.add__type',
        INPUT_DESCRIPTION: '.add__description',
        INPUT_VALUE: '.add__value',
        ADD_BUTTON: '.add__btn',
        INCOMES_LIST: '.incomes__list',
        EXPENSES_LIST: '.expenses__list'
    };

    return {
        getInputData: function() {
            return {
                inputType: document.querySelector(UI_CONSTANTS.INPUT_TYPE).value, // inc or exp
                inputDescription: document.querySelector(UI_CONSTANTS.INPUT_DESCRIPTION).value,
                inputValue: document.querySelector(UI_CONSTANTS.INPUT_VALUE).value
            }
        },

        addItemList: function(dataObject, type) {
            var html, 
                newHtml,
                listElement;

            // Set placeholder html for the income or expese list
            if(type === 'inc') {
                listElement = document.querySelector(UI_CONSTANTS.INCOMES_LIST);
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if(type === 'exp') {
                listElement = document.querySelector(UI_CONSTANTS.EXPENSES_LIST);
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            newHtml = html.replace('%id%', dataObject.id);
            newHtml = newHtml.replace('%description%', dataObject.description);
            newHtml = newHtml.replace('%value%', dataObject.value);

            // Add the new html into the DOM
            listElement.insertAdjacentHTML('beforeend', newHtml);
        },

        getUiConstants: function() {
            return UI_CONSTANTS;
        }
    }
})();

var appController = (function(budgetCtrl, uiCtrl) {
    var setupEventListeners = function() {
        var UI_CONSTANTS = uiCtrl.getUiConstants();

        document.querySelector('.add__btn').addEventListener('click', addItemController);
        document.addEventListener('keypress', function(event) {
            if(event.keycode == 13 || event.which == 13) {
                addItemController();
            }
        });
    };

    var addItemController = function() {
        var inputData,
            newItem;

        //1. Get the field input data
        inputData = uiCtrl.getInputData();
        //2. Add item to the budget controller
        newItem = budgetCtrl.addItem(inputData.inputType, inputData.inputDescription, inputData.inputValue);
        //3. Add the item to the UI
        uiCtrl.addItemList(newItem, inputData.inputType);
        //4. Calculate budget
        //5. Display the budget on the UI
    };

    return {
        init: function() {
            console.log('Application Started');
            setupEventListeners();
        }
    }
})(budgetController, uiController);

appController.init();
