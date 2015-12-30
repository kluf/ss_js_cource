var ListManager =(function() {
    var mainDivEl, addTaskEl, errorDivEl, addTaskButton;
    var CLOSE_SELECTOR_EL = '.close';
    var VISIBLE_CLASS_SELECTOR = 'visible';
    var TASK_CLASS_SELECTOR = 'task';
    var CLOSE_CLASS_SELECTOR = 'close';
    var ERROR_CLASS_SELECTOR = 'error';

    function setElements(rootElSelector) {
        mainDivEl = rootElSelector;
        addTaskEl = mainDivEl.querySelector('.addTask');
        errorDivEl = mainDivEl.querySelector('.error');
        addTaskButton = mainDivEl.querySelector('.addTaskButton');
    }
    function fieldContainTheText(){
        return addTaskEl.value;
    };
    function addStyledTaskDiv(e) {
        setElements(e.target.parentNode);
        if (fieldContainTheText()) {
            var divElement = document.createElement('div');
            divElement.innerHTML = "<div class='"+TASK_CLASS_SELECTOR+"'>"+addTaskEl.value+"<span class='"+CLOSE_CLASS_SELECTOR+"'>x</span></div>";
            console.log(mainDivEl);
            mainDivEl.appendChild(divElement);
            divElement.querySelector(CLOSE_SELECTOR_EL).addEventListener('click', removeTask);
            toggleClass(VISIBLE_CLASS_SELECTOR);
            resetInput();
            setFocus();
        } else {
            toggleClass(VISIBLE_CLASS_SELECTOR);
        }
    };
    function removeTask(event) {
        var nodeToRemove = event.target.parentNode;
        event.target.parentNode.parentNode.removeChild(nodeToRemove);
    };
    function resetInput(e) {
        addTaskEl.value = '';
    };
    function setFocus() {
        addTaskEl.focus();
    };
    function toggleClass(className) {
        errorDivEl.className = fieldContainTheText() ? ERROR_CLASS_SELECTOR : ERROR_CLASS_SELECTOR + ' ' + className;
    };
    return {
        initialize: function(rootElSelector) {
            rootElSelector.querySelector('.addTaskButton').addEventListener('click', addStyledTaskDiv);
        }
    }
}());