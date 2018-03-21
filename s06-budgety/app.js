var budgetController = (function() {

    // Some code

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
    var UI_CONSTANTS = uiCtrl.getUiConstants();
    var addItemController = function() {
        var inputData = uiCtrl.getInputData();
        console.log(inputData);
    }

    document.querySelector('.add__btn').addEventListener('click', addItemController);
    document.addEventListener('keypress', function(event) {
        if(event.keycode == 13 || event.which == 13) {
            addItemController();
        }
    });

})(budgetController, uiController);
