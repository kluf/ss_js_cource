var ListManager =(function() {
    var mainDivEl, addTaskEl, errorDivEl, addTaskButton;
    var VISIBLE_CLASS_SELECTOR = 'visible';
    var CLOSE_CLASS = 'close';
    var LIST_ITEM_CLASS = 'list-group-item';
    var FORM_GROUP_TASK = 'form-group';
    var VISIBLE = 'visible';
    function setElements(rootElSelector) {
        mainDivEl = $(rootElSelector);
        addTaskEl = mainDivEl.find('.addTask');
        errorDivEl = mainDivEl.find('.alert-danger');
        addTaskButton = mainDivEl.find('.btn-success');
        listElement = mainDivEl.find('.list-group');
    };
    function fieldContainTheText(){
        var regExp = /^(([A-Za-z]+)\d?){3,}/;
        if (regExp.test(addTaskEl.val())) {
            appendDiv();
        } else {
            errorDivEl.addClass(VISIBLE);
        }
    };
    function deleteTask(e) {
        e.currentTarget.closest('.' + LIST_ITEM_CLASS).remove();
    };
    function appendDiv() {
        errorDivEl.removeClass(VISIBLE);
        listElement.append('<li class='+LIST_ITEM_CLASS+'>'+addTaskEl.val()+ '<button type="button" class="'+CLOSE_CLASS+'" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></li>');
        addTaskEl.val('');
        addTaskEl.focus();
    }
    function addStyledTaskDiv(e) {
        setElements(e.target.closest('.' + FORM_GROUP_TASK));
        fieldContainTheText(appendDiv);
    };
    return {
        initialize: function(rootElSelector) {
            $(rootElSelector).find('.btn-success').bind('click', addStyledTaskDiv);
            $(document).on('click', rootElSelector + " ." + CLOSE_CLASS, deleteTask);
        }
    }
}());