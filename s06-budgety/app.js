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
        this.percentage = -1;
    }

    Expense.prototype.calculatePercentage = function(totalIncomes) {
        if(totalIncomes > 0) {
            this.percentage = Math.round((this.value/totalIncomes) * 100);
        } else {
            this.percentage = -1;
        }
    }

    Expense.prototype.getPercentage = function() {
        return this.percentage;
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

        deleteItem: function(type, id) {
            var arrayIds,
                index;

            arrayIds = data.allItems[type].map(function(current) {
                return current.id;
            });

            index = arrayIds.indexOf(id);

            if(index !== -1) {
                data.allItems[type].splice(index, 1);
            }
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

        calculatePercentages: function() {
            data.allItems.exp.forEach(function(current) {
                current.calculatePercentage(data.totals.inc);
            });
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalIncomes: data.totals.inc,
                totalExpenses: data.totals.exp,
                percentage: data.percentage
            }
        },

        getPercentages: function() {
            var allPercentages = data.allItems.exp.map(function(current) {
                return current.getPercentage();
            });

            return allPercentages;
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
        EXPENSE_PERCENTAGE_GLOBAL_VALUE: '.budget__expenses--percentage',
        INCS_AND_EXPS_CONTAINER: '.container',
        EXPENSE_PERCENTAGE_SINGLE_VALUE: '.item__percentage'
    };

    var formatNumber = function(number, type) {
        var numberSplitted,
            integerPart,
            decimalPart;

        number = number.toFixed(2);
        numberSplitted = number.split('.');
        integerPart = numberSplitted[0];

        if(integerPart.length > 3) {
            integerPart = integerPart.substr(0, integerPart.length - 3) + ',' + integerPart.substr(integerPart.length - 3, 3);
        }

        decimalPart = numberSplitted[1];

        return (type === 'inc'? '+' : '-') + integerPart + '.' + decimalPart;
    }

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
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if(type === 'exp') {
                listElement = document.querySelector(UI_CONSTANTS.EXPENSES_LIST);
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            newHtml = html.replace('%id%', dataObject.id);
            newHtml = newHtml.replace('%description%', dataObject.description);
            newHtml = newHtml.replace('%value%', formatNumber(dataObject.value, type));

            // Add the new html into the DOM
            listElement.insertAdjacentHTML('beforeend', newHtml);
        },

        deleteItemList: function(selectorId) {
            var elementToDelete = document.getElementById(selectorId);

            elementToDelete.parentNode.removeChild(elementToDelete);
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
            var type;

            budgetData.budget > 0 ? type = 'inc' : type = 'exp';

            document.querySelector(UI_CONSTANTS.BUDGET_VALUE).textContent = formatNumber(budgetData.budget, type);
            document.querySelector(UI_CONSTANTS.INCOME_VALUE).textContent = formatNumber(budgetData.totalIncomes, 'inc');
            document.querySelector(UI_CONSTANTS.EXPENSE_VALUE).textContent = formatNumber(budgetData.totalExpenses, 'exp');

            if(budgetData.percentage > 0) {
                document.querySelector(UI_CONSTANTS.EXPENSE_PERCENTAGE_GLOBAL_VALUE).textContent = budgetData.percentage + '%';
            } else {
                document.querySelector(UI_CONSTANTS.EXPENSE_PERCENTAGE_GLOBAL_VALUE).textContent = '-';
            }
        },

        displayExpensesPercentages: function(percentages) {
            var percentageElements = document.querySelectorAll(UI_CONSTANTS.EXPENSE_PERCENTAGE_SINGLE_VALUE);

            var nodeListForEach = function(nodeList, callback) {
                for(i = 0; i < nodeList.length; i++) {
                    callback(nodeList[i], i);
                }
            }

            nodeListForEach(percentageElements, function(current, index) {
                if(percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '-';
                }
            });
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
        
        document.querySelector(UI_CONSTANTS.INCS_AND_EXPS_CONTAINER).addEventListener('click', deleteItemController)
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
    };

    var updatePercentages = function() {
        var percentages;
        //1. Calculate percentages
        budgetCtrl.calculatePercentages();
        //2. Read percentages from the budget controller
        percentages = budgetCtrl.getPercentages();
        //3. Update the UI with the new percentages
        uiCtrl.displayExpensesPercentages(percentages);
    }

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
            //5. Call the updatePercentages method
            updatePercentages();
        }
    };
    
    var deleteItemController = function(event) {
        var itemId,
            splitId,
            type,
            incOrExpId;
            
        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if(itemId) {
            splitId = itemId.split('-');
            type = splitId[0];
            incOrExpId = parseInt(splitId[1]);

            //1. Delete the item from the data structure
            budgetCtrl.deleteItem(type, incOrExpId);
            //2. Delete the item from the UI
            uiCtrl.deleteItemList(itemId);
            //3. Call the updateBudget method
            updateBudget();
            //4. Call the updatePercentages method
            updatePercentages();
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
