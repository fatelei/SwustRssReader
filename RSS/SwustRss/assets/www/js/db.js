/*
 * 创建数据库
 */
function DB() {
    this.db = null;
    this.open_database = function() { //打开数据库
        if (this.db == null) {
            this.db = new Lawnchair({name: 'Rss', adapter: 'dom'}, function(e){
                 console.log("db opened");
            });
            return true;
        }
        return false;
    }
    this.save = function(tag, name, url) { //存储数据
        if (this.db != null) {
            this.db.save({key: tag, value: {'tag': tag, 'name': name, 'url': url}});
            alert('订阅成功!');
            return true;
        } else {
            return false;
        }
    }
    this.del = function(tag) { //删除数据
        if (this.db != null) {
            this.db.remove(tag, function(){
               console.log("delete " + tag);
               alert('取消订阅成功!');
            });
            return true;
        }
        return false;
    }
    this.update = function(tag, newvalue) { //更新数据
        if (this.db != null) {
            
        }
        return false;
    }
    this.query = function(tag) { //查询数据
        var rst;
        if (this.db != null) {
            this.db.get(tag, function(obj){
                //console.log(obj);
                rst = obj; 
            });
            return rst;
        }
        return false;
    }
    this.count = function() { //统计
        var length = 0;
        if (this.db != null) {
            this.db.all(function(objs) {
                length = objs.length;
            });
            this.db.get('cfg', function(obj) {
                if (obj != undefined) {
                    length -= 1;
                }
            });
            return length;
        }
    }
    this.get_config = function(key) {
        var rst;
        if (this.db != null) {
            this.db.get(key, function(obj){
               rst = obj; 
            });
            return rst;
        }
        return undefined;
    }
    this.save_config = function(auto_refresh, not_auto_refresh, skin) {
        if (this.db != null) {
            this.db.get('cfg', function(obj) {
                if (obj != undefined) {
                    var tmp_obj = [];
                    tmp_obj = obj.value;
                    tmp_obj.auto_refresh = auto_refresh;
                    tmp_obj.not_auto_refresh = not_auto_refresh;
                    tmp_obj.skin = skin;
                    this.save({key: obj.key, value: tmp_obj});
                } else {
                    this.save({key: 'cfg', value: {'auto_refresh': auto_refresh, 'not_auto_refresh': not_auto_refresh, "skin": skin}});
                }
            });
            return true;
        }
        return false;
    }
}
