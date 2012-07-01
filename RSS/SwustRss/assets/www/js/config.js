/*
 * 软件配置
 */
function configure() { //初始化配置界面
    var html = "";
    var db = new DB();
    if (db.open_database()) {
        var obj = db.get_config('cfg');
        html += '<form class="form-horizontal">';
        html += '<fieldset>';
        html += '<div class="control-group">';
        html += '<label class="control-label">是否设置自动刷新</label>';
        html += '<div class="controls"><label class="checkbox">';
        if ((undefined == obj) || (false == obj) || (!obj.value.not_auto_refresh)) {
            html += '<input type="checkbox" id="not_auto_refresh">';
        } else if (obj.value.not_auto_refresh){
            html += '<input type="checkbox" id="not_auto_refresh" checked="checked">';
        }
        html += '</label></div></div>';
        html += '<div class="control-group">';
        html += '<label class="control-label">设置自动刷新</label>';
        if ((undefined == obj) || (false == obj)) {
            html += '<div class="controls"><select id="auto_refresh" disabled="disabled">';
            html += '<option value="1">每隔1小时</option><option value="2">每隔3小时</option></select></div></div>';
        } else {
            if (obj.value.not_auto_refresh) {
                html += '<div class="controls"><select id="auto_refresh">';
            } else {
                html += '<div class="controls"><select id="auto_refresh" disabled="disabled">';
            }
            switch (obj.value.auto_refresh) {
                case 1:
                    html += '<option value="1" selected="selected">每隔1小时</option><option value="2">每隔3小时</option>';
                    break;
                case 2:
                    html += '<option value="1">每隔1小时</option><option value="2" selected="selected">每隔3小时</option>';
                    break;
                default:
                    html += '<option value="1">每隔1小时</option><option value="2">每隔3小时</option>';
                    break;
            }
            html += '</select></div></div>';
        }
        html += '<div class="control-group">';
        html += '<label class="control-label">皮肤选择</label>';
        html += '<div class="controls"><select id="skin">';
        if ((undefined == obj) || (false == obj)) {
            html += '<option value="1" selected="selected">黑色</option>';
            html += '<option value="2">蓝色</option>';
            html += '<option value="3">红色</option>';
        } else {
            switch (obj.value.skin) {
                case 1:
                    html += '<option value="1" selected="selected">黑色</option>';
                    html += '<option value="2">蓝色</option>';
                    html += '<option value="3">红色</option>';
                    break;
                case 2:
                    html += '<option value="1">黑色</option>';
                    html += '<option value="2" selected="selected">蓝色</option>';
                    html += '<option value="3">红色</option>';
                    break;
                case 3:
                    html += '<option value="1">黑色</option>';
                    html += '<option value="2">蓝色</option>';
                    html += '<option value="3" selected="selected">红色</option>';
                    break;
            }
        }
        html += '</select></div></div>';
        html += '<div class="form-actions"><input type="button" onclick="save_cfg()" class="btn btn-primary pull-right" value="保存修改"/></div>';
        html += '</fieldset></form></div>';
        $('#cfg_views').html(html);
    }
}

function save_cfg() { //存储配置
    var auto_refresh;
    var manu_refresh;
    var skin;
    var db = new DB();
    if (db.open_database()) {
        var ar_obj = document.getElementById("not_auto_refresh");
        if (!ar_obj.checked) {
            not_auto_refresh = false;
            auto_refresh = -1;
        } else {
            not_auto_refresh = true;
            auto_refresh = parseInt(document.getElementById("auto_refresh").value);
        }
        skin = parseInt(document.getElementById("skin").value);
        if (db.save_config(auto_refresh, not_auto_refresh, skin)) {
            alert('保存成功!(^_^)');
            window.location.href = 'index.html';
        } else {
            alert('保存失败!(%>_<%)');
        }
    }
}

