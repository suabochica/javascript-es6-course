var budgetController = (function() {
    var data = {
        allItems: {
            expenses: [],
            incomes: []
        },
        totals: {
            expenses: 0,
            incomes: 0
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

})();

var uiController = (function() {
    var UI_CONSTANTS = {
        INPUT_TYPE: '.add__type',
        INPUT_DESCRIPTION: '.add__description',
        INPUT_VALUE: '.add__value',
        ADD_BUTTON: '.add__btn'
    };

    return {
        getInputData: function() {
            return {
                inputType: document.querySelector(UI_CONSTANTS.INPUT_TYPE).value,
                inputDescription: document.querySelector(UI_CONSTANTS.INPUT_DESCRIPTION).value,
                inputValues: document.querySelector(UI_CONSTANTS.INPUT_VALUE).value
            }
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
        //1. Get the field input data
        var inputData = uiCtrl.getInputData();
        console.log(inputData);
        //2. Add item to the budget controller
        //3. Add the item to the UI
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
