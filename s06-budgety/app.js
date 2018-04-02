var budgetController = (function() {
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
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

        calculateBudget: function(type) {
            var totalSum = 0;

            data.allItems[type].forEach(function(current) {
                totalSum = totalSum + current.value;
            });

            data.totals[type] = totalSum;
            data.budget = data.totals.inc - data.totals.exp;

            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp/data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalIncomes: data.totals.inc,
                totalExpenses: data.totals.exp,
                percentage: data.percentage
            }
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
        EXPENSES_LIST: '.expenses__list',
        BUDGET_VALUE: '.budget__value',
        INCOME_VALUE: '.budget__income--value',
        EXPENSE_VALUE: '.budget__expenses--value',
        EXPENSE_PERCENTAGE_VALUE: '.budget__expenses--percentage'

    };

    return {
        getInputData: function() {
            return {
                inputType: document.querySelector(UI_CONSTANTS.INPUT_TYPE).value, // inc or exp
                inputDescription: document.querySelector(UI_CONSTANTS.INPUT_DESCRIPTION).value,
                inputValue: parseFloat(document.querySelector(UI_CONSTANTS.INPUT_VALUE).value)
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

        clearInputFields: function() {
            var fields,
                fieldsArray;

            fields = document.querySelectorAll(UI_CONSTANTS.INPUT_DESCRIPTION+', '+ UI_CONSTANTS.INPUT_VALUE); // return a list
            fieldsArray = Array.prototype.slice.call(fields); // Trick to convert the list in an array

            fieldsArray.forEach(function(current, index, array) {
                current.value = "";
            });

            fieldsArray[0].focus();
        },

        displayBudgetData: function(budgetData) {
          document.querySelector(UI_CONSTANTS.BUDGET_VALUE).textContent = budgetData.budget;
          document.querySelector(UI_CONSTANTS.INCOME_VALUE).textContent = budgetData.totalIncomes;
          document.querySelector(UI_CONSTANTS.EXPENSE_VALUE).textContent = budgetData.totalExpenses;

          if(budgetData.percentage > 0) {
            document.querySelector(UI_CONSTANTS.EXPENSE_PERCENTAGE_VALUE).textContent = budgetData.percentage + '%';
          } else {
            document.querySelector(UI_CONSTANTS.EXPENSE_PERCENTAGE_VALUE).textContent = '-';
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

    var updateBudget = function() {
        var budgetData;
        // 1. Calculate budget
        budgetCtrl.calculateBudget('inc');
        budgetCtrl.calculateBudget('exp');
        // 2. Get budget
        budgetData = budgetCtrl.getBudget();
        // 3. Pass budget to the ui
        uiCtrl.displayBudgetData(budgetData);
        console.log(budgetData);
    };

    var addItemController = function() {
        var inputData,
            newItem;

        //1. Get the field input data
        inputData = uiCtrl.getInputData();

        if(inputData.inputDescription !== "" && !isNaN(inputData.inputValue) && inputData.inputValue > 0) {
            //2. Add item to the budget controller
            newItem = budgetCtrl.addItem(inputData.inputType, inputData.inputDescription, inputData.inputValue);
            //3. Add the item to the UI and clear input fields
            uiCtrl.addItemList(newItem, inputData.inputType);
            uiCtrl.clearInputFields();
            //4. Call the updateBudget method
            updateBudget();
        }
    };

    return {
        init: function() {
            console.log('Application Started');
            setupEventListeners();
            uiCtrl.displayBudgetData({
                budget: 0,
                totalIncomes: 0,
                totalExpenses: 0,
                percentage: -1
            });
        }
    }
})(budgetController, uiController);

appController.init();
