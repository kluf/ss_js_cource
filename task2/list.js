var ListManager =(function() {
    var mainDivEl, addTaskEl, errorDivEl, addTaskButton;
    var VISIBLE_CLASS_SELECTOR = 'visible';
    var CLOSE_CLASS = 'close';
    var LIST_ITEM_CLASS = 'list-group-item';

    function setElements(rootElSelector) {
        mainDivEl = $(rootElSelector);
        addTaskEl = $(rootElSelector).find('.addTask');
        errorDivEl = $(rootElSelector).find('.alert-danger');
        addTaskButton = $(rootElSelector).find('.btn-success');
        listElement = $(rootElSelector).find('.list-group');
    };
    function verifyInput(val) {
        var regExp = /^([A-Za-z]+)\d?/;
        return regExp.test(val);
    };
    function fieldContainTheText(cb){
        //emulating server delay for future task
        setTimeout(function() {
            if (verifyInput(addTaskEl.val())) {
                appendDiv();
            } else {
                errorDivEl.addClass('visible');
            }
        }, 500);
    };
    function deleteTask(e) {
        e.currentTarget.closest('.list-group-item').remove();
    };
    function appendDiv() {
        errorDivEl.removeClass('visible');
        listElement.append('<li class='+LIST_ITEM_CLASS+'>'+addTaskEl.val()+ '<button type="button" class="'+CLOSE_CLASS+'" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></li>');
        addTaskEl.val('');
        addTaskEl.focus();
    }
    function addStyledTaskDiv(e) {
        setElements(e.target.closest('.form-group'));
        fieldContainTheText(appendDiv);
    };
    return {
        initialize: function(rootElSelector) {
            rootElSelector.find('.btn-success').bind('click', addStyledTaskDiv);
            $(document).on('click', '.close', deleteTask);
        }
    }
}());