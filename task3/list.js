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
    function fieldContainTheText(cb){
        $.ajax({
            url: "/validate",
            method: "POST",
            data: {val: addTaskEl.val()},
            success: function(data) {
                if (JSON.parse(data).error === false) {
                    cb();
                } else {
                    errorDivEl.addClass('visible');
                }
            }
        });
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