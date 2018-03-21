var budgetController = (function() {

    // Some code

})();

var uiController = (function() {

    // Some code

})();

var appController = (function(budgetCtrl, uiCtrl) {

    var addItemController = function() {
        console.log('It works.')
    }

    document.querySelector('.add__btn').addEventListener('click', addItemController);
    document.addEventListener('keypress', function(event) {
        if(event.keycode == 13 || event.which == 13) {
            addItemController();
        }
    });

})(budgetController, uiController);
