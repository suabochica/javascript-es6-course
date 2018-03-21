var budgetController = (function() {

    var x = 21;
    var add = function(a) {
        return x + a;
    }

    return {
        publicTest: function(b) {
            return add(b);
        }
    }

})();

var uiController = (function() {

// Some code

})();

var appController = (function(budgetCtrl, uiCtrl) {
    var z = budgetCtrl.publicTest(5);

    return {
        anotherPublicTest: function() {
            console.log(z);
        }
    }    
})(budgetController, uiController);
