$(function() {

	// 编辑区focus时高亮显示
	$(document).off('focus.editor').on('focus.editor', '#editor', function() {
		$('.chat_opt').addClass('bk_white')
	})
	$(document).off('blur.editor').on('blur.editor', '#editor', function() {
		$('.chat_opt').removeClass('bk_white')
	})



})

// 在光标位置插入节点
function _insertimg(str){
    document.getElementById('js_info').focus();
    var selection= window.getSelection ? window.getSelection() : document.selection;
    var range= selection.createRange ? selection.createRange() : selection.getRangeAt(0);
    if (!window.getSelection){
        var selection= window.getSelection ? window.getSelection() : document.selection;
        var range= selection.createRange ? selection.createRange() : selection.getRangeAt(0);
        range.pasteHTML(str);
        range.collapse(false);
        range.select();
    }
    else{
        range.collapse(false);
        var hasR = range.createContextualFragment(str);
        var hasR_lastChild = hasR.lastChild;
        while (hasR_lastChild && hasR_lastChild.nodeName.toLowerCase() == "br" && hasR_lastChild.previousSibling && hasR_lastChild.previousSibling.nodeName.toLowerCase() == "br") {
            var e = hasR_lastChild;
            hasR_lastChild = hasR_lastChild.previousSibling;
            hasR.removeChild(e)
        }
        range.insertNode(hasR);
        if (hasR_lastChild) {
            range.setEndAfter(hasR_lastChild);
            range.setStartAfter(hasR_lastChild)
            if(str == '<div><br></div>') {
                range.setEndBefore(hasR_lastChild.lastChild);
                range.setStartBefore(hasR_lastChild.lastChild)
            }
        }
        selection.removeAllRanges();
        selection.addRange(range)
    }
}