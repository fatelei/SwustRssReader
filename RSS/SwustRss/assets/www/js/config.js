/*
 * �������
 */
function configure() { //��ʼ�����ý���
    var html = "";
    var db = new DB();
    if (db.open_database()) {
        var obj = db.get_config('cfg');
        html += '<form class="form-horizontal">';
        html += '<fieldset>';
        html += '<div class="control-group">';
        html += '<label class="control-label">�Ƿ������Զ�ˢ��</label>';
        html += '<div class="controls"><label class="checkbox">';
        if ((undefined == obj) || (false == obj) || (!obj.value.not_auto_refresh)) {
            html += '<input type="checkbox" id="not_auto_refresh">';
        } else if (obj.value.not_auto_refresh){
            html += '<input type="checkbox" id="not_auto_refresh" checked="checked">';
        }
        html += '</label></div></div>';
        html += '<div class="control-group">';
        html += '<label class="control-label">�����Զ�ˢ��</label>';
        if ((undefined == obj) || (false == obj)) {
            html += '<div class="controls"><select id="auto_refresh" disabled="disabled">';
            html += '<option value="1">ÿ��1Сʱ</option><option value="2">ÿ��3Сʱ</option></select></div></div>';
        } else {
            if (obj.value.not_auto_refresh) {
                html += '<div class="controls"><select id="auto_refresh">';
            } else {
                html += '<div class="controls"><select id="auto_refresh" disabled="disabled">';
            }
            switch (obj.value.auto_refresh) {
                case 1:
                    html += '<option value="1" selected="selected">ÿ��1Сʱ</option><option value="2">ÿ��3Сʱ</option>';
                    break;
                case 2:
                    html += '<option value="1">ÿ��1Сʱ</option><option value="2" selected="selected">ÿ��3Сʱ</option>';
                    break;
                default:
                    html += '<option value="1">ÿ��1Сʱ</option><option value="2">ÿ��3Сʱ</option>';
                    break;
            }
            html += '</select></div></div>';
        }
        html += '<div class="control-group">';
        html += '<label class="control-label">Ƥ��ѡ��</label>';
        html += '<div class="controls"><select id="skin">';
        if ((undefined == obj) || (false == obj)) {
            html += '<option value="1" selected="selected">��ɫ</option>';
            html += '<option value="2">��ɫ</option>';
            html += '<option value="3">��ɫ</option>';
        } else {
            switch (obj.value.skin) {
                case 1:
                    html += '<option value="1" selected="selected">��ɫ</option>';
                    html += '<option value="2">��ɫ</option>';
                    html += '<option value="3">��ɫ</option>';
                    break;
                case 2:
                    html += '<option value="1">��ɫ</option>';
                    html += '<option value="2" selected="selected">��ɫ</option>';
                    html += '<option value="3">��ɫ</option>';
                    break;
                case 3:
                    html += '<option value="1">��ɫ</option>';
                    html += '<option value="2">��ɫ</option>';
                    html += '<option value="3" selected="selected">��ɫ</option>';
                    break;
            }
        }
        html += '</select></div></div>';
        html += '<div class="form-actions"><input type="button" onclick="save_cfg()" class="btn btn-primary pull-right" value="�����޸�"/></div>';
        html += '</fieldset></form></div>';
        $('#cfg_views').html(html);
    }
}

function save_cfg() { //�洢����
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
            alert('����ɹ�!(^_^)');
            window.location.href = 'index.html';
        } else {
            alert('����ʧ��!(%>_<%)');
        }
    }
}

