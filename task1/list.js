var ListManager =(function() {
    var addTaskEl = document.querySelector('#addTask');
    var errorDivEl = document.querySelector('#error');
    var mainDivEl = document.getElementById('main');
    function fieldContainTheText(){
        return addTaskEl.value;
    };
    function addStyledTaskDiv(event) {
        event.preventDefault();
        if (fieldContainTheText()) {
            var divElement = document.createElement('div');
            divElement.innerHTML = "<div class='task'>"+addTaskEl.value+"<span class='close'>x</span></div>";
            mainDivEl.appendChild(divElement);
            divElement.querySelector('.close').addEventListener('click', removeTask, true);
            toggleClass('visible');
            resetInput();
            setFocus();
        } else {
            toggleClass('visible');
        }
    };
    function removeTask(event) {
        event.preventDefault();
        var nodeToRemove = event.target.parentNode;
        event.target.parentNode.parentNode.removeChild(nodeToRemove);
    };
    function resetInput() {
        addTaskEl.value = '';
    };
    function setFocus() {
        addTaskEl.focus();
    };
    function toggleClass(className) {
        errorDivEl.className = fieldContainTheText() ? '' : className;
    };
    return {
        initialize: function() {
            document.getElementById('addTaskButton').addEventListener('click', addStyledTaskDiv);
        }
    }
}());
ListManager.initialize();
