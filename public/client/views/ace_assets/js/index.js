//cdnjs.cloudflare.com/ajax/libs/ace/1.1.3/ace.js
var theme='ace/theme/tomorrow';
var mode='ace/mode/scss';
var editor= ace.edit('ace-editorid');
    editor.setTheme(theme);
    editor.getSession().setMode(mode);
    // editor.renderer.setShowGutter(false); 

$('#ace-mode').on('change',function(){
  editor.getSession().setMode('ace/mode/' +$(this).val().toLowerCase());
});
$('#ace-theme').on('change',function(){
  editor.setTheme('ace/theme/' +$(this).val().toLowerCase());
});