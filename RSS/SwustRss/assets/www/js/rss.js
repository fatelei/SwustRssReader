/*
 * 获取RSS
 */

/*function wangyi_sub_all(belong) {
    var wy_rss_feed = wangyi_rss_feed();
    for (var i = 0; i < wy_rss_feed.length; i++) {
        if (wy_rss_feed[i].belong == belong) {
            for (var j = 0; j < wy_rss_feed[i].context.length; j++) {
                wy_subscribe(wy_rss_feed[i].context[j].tag, wy_rss_feed[i].context[j].parent,
                             wy_rss_feed[i].context[j].name, wy_rss_feed[i].context[j].url);
            }
            var db = new DB();
            if (db.open_database()) {
                db.save();
            }
        }
    }
}*/

function loadXMLDoc(vurl) { //获得RSS内容
	var html=""
	$('#main_content').html('<img src="img/loading.gif"/>');
	$.ajax({
	    type: 'GET',
	    url: vurl,
	    timeout: 30000,
	    complete: function(jqXHR, textStatus) {
	       if (textStatus == 'success') {
	       } else if (textStatus == 'error') {
	       }
	    },
	    success: function(data) {
	        $('#refresh').remove();
	        $('#op').append('<a href="#" id="refresh" class="btn" onclick=\'loadXMLDoc("' + vurl + '")\'>刷新<i class="icon-refresh"></i></a>');
	        $(data).find( "channel" ).find("item").each(function(index,ele){
                var titles = $(ele).find("title").text();
                var links = $(ele).find("link").text();
                var description = $(ele).find("description").text();
                var httpUrl = getimgsrc(description);
                var desText = description.replace(new RegExp('<.*?>', 'gm'), '');
                html += "<div class='accordion-group'><div class='accordion-heading'>";
                html += "<a class='accordion-toggle' data-toggle='collapse' href='#coll";
                html += index +"'>";
                html += titles +"</a></div> <div id='coll" + index + "'" + " class='accordion-body collapse'>";
                html += "<div class='accordion-inner' >";
                html += "<img src='" + httpUrl + "'" + "/>" + "<br/>" + desText + " <a href='" + links + "' class='btn pull-right'>查看原文</a></div></div></div>";
            });
            $('#main_content').html(html);
	    },
	    error: function(error) {
	        var html = "";
	        html += '<div class="alert alert-block alert-error">';
	        html += '<h4 class="alert-heading">访问出错</h4>获取RSS内容超时</div>';
	        $('#main_content').html(html);
	    }
	});
	return false;
}

function sohu_rss_feed() { //搜狐可订阅RSS内容
     var news_rss_feed = [{"tag": "shfn", "title": "焦点新闻", "url": "http://news.sohu.com/rss/pfocus.xml"},
                         {"tag": "shsn", "title": "滚动新闻", "url": "http://news.sohu.com/rss/scroll.xml"},
                         {"tag": "shgn", "title": "国内新闻", "url": "http://news.sohu.com/rss/guonei.xml"},
                         {"tag": "shgjn", "title": "国际新闻", "url": "http://news.sohu.com/rss/guoji.xml"},
                         {"tag": "shshn", "title": "社会新闻", "url": "http://news.sohu.com/rss/shehui.xml"},
                         {"tag": "shtyn", "title": "体育新闻", "url": "http://news.sohu.com/rss/sports.xml"},
                         {"tag": "shbn", "title": "产经新闻", "url": "http://news.sohu.com/rss/business.xml"},
                         {"tag": "shitn", "title": "IT新闻", "url": "http://news.sohu.com/rss/it.xml"},
                         {"tag": "shwjn", "title": "文教新闻", "url": "http://news.sohu.com/rss/learning.xml"},
                         {"tag": "shyln", "title": "娱乐新闻", "url": "http://news.sohu.com/rss/yule.xml"}];
    return news_rss_feed;
}

function  getimgsrc(htmlstr) { //提取图片
    var reg=/<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim;
    var arr = [];
    while(tem=reg.exec(htmlstr)){
        arr.push(tem[2]);
    }
    return arr;
}

function wangyi_rss_feed() { //网易可订阅RSS内容
    var news_rss_feed = [{"belong": "wynews", "classify": "新闻", "context": [{"tag": "wyttxn", "parent": "wyxw", "name": "头条新闻", "url": "http://news.163.com/special/00011K6L/rss_newstop.xml"},
                                                         {"tag": "wygn", "parent": "wyxw", "name": "国内新闻", "url": "http://news.163.com/special/00011K6L/rss_gn.xml"},
                                                         {"tag": "wygjn", "parent": "wyxw", "name": "国际新闻", "url": "http://news.163.com/special/00011K6L/rss_gj.xml"},
                                                         {"tag": "wysh", "parent": "wyxw", "name": "社会新闻", "url": "http://news.163.com/special/00011K6L/rss_sh.xml"},
                                                         {"tag": "wyjsn", "parent": "wyxw", "name": "军事新闻", "url": "http://news.163.com/special/00011K6L/rss_war.xml"},
                                                         {"tag": "wysdn", "parent": "wyxw", "name": "深度新闻", "url": "http://news.163.com/special/00011K6L/rss_hotnews.xml"},
                                                         {"tag": "wypln", "parent": "wyxw", "name": "评论新闻", "url": "http://news.163.com/special/00011K6L/rss_newsspecial.xml"},
                                                         {"tag": "wytpn", "parent": "wyxw", "name": "图片新闻", "url": "http://news.163.com/special/00011K6L/rss_photo.xml"},
                                                         {"tag": "wyssn", "parent": "wyxw", "name": "搜索新闻", "url": "http://news.163.com/special/00011K6L/rss_discovery.xml"}]},
                         {"belong": "wysports", "classify": "体育", "context": [{"tag": "wynba", "parent": "wyty", "name": "NBA", "url": "http://sports.163.com/special/00051K7F/rss_sportslq.xml"},
                                                         {"tag": "wycba", "parent": "wyty", "name": "CBA", "url": "http://sports.163.com/special/00051K7F/rss_sportscba.xml"},
                                                         {"tag": "wyycn", "parent": "wyty", "name": "英超", "url": "http://sports.163.com/special/00051K7F/rss_sportsyc.xml"},
                                                         {"tag": "wyyjn", "parent": "wyty", "name": "意甲", "url": "http://sports.163.com/special/00051K7F/rss_sportsyj.xml"},
                                                         {"tag": "wygjzqn", "parent": "wyty", "name": "国际足球", "url": "http://sports.163.com/special/00051K7F/rss_sportsgj.xml"},
                                                         {"tag": "wyzgzqn", "parent": "wyty", "name": "中国足球", "url": "http://sports.163.com/special/00051K7F/rss_sportszg.xml"},
                                                         {"tag": "wyzhtyn", "parent": "wyty", "name": "综合体育", "url": "http://sports.163.com/special/00051K7F/rss_sportszh.xml"},
                                                         {"tag": "wywqn", "parent": "wyty", "name": "网球", "url": "http://sports.163.com/special/00051K7F/rss_sportstennis.xml"},
                                                         {"tag": "wyfyn", "parent": "wyty", "name": "F1", "url": "http://sports.163.com/special/00051K7F/rss_sportsf1.xml"},
                                                         {"tag": "wyxsn", "parent": "wyty", "name": "秀色", "url": "http://sports.163.com/special/00051K7F/rss_ttxs.xml"},
                                                         {"tag": "wycpn", "parent": "wyty", "name": "彩票", "url": "http://sports.163.com/special/00051K7F/rss_sportscp.xml"}]},
                         {"belong": "wyyayun", "classify": "亚运", "context": [{"tag": "wyyyyw", "parent": "wyyy", "name": "要闻", "url": "http://2010.163.com/special/00863I1M/rss_2010.xml"},
                                                         {"tag": "wyzhssn", "parent": "wyyy", "name": "综合赛事", "url": "http://2010.163.com/special/00863I1M/rss_2010.xml"},
                                                         {"tag": "wybdn", "parent": "wyyy", "name": "本地新闻", "url": "http://2010.163.com/special/00863I1M/rss_2010.xml"},
                                                         {"tag": "wymxjj", "parent": "wyyy", "name": "明星聚焦", "url": "http://2010.163.com/special/00863I1M/rss_2010.xml"},
                                                         {"tag": "wygfn", "parent": "wyyy", "name": "官方新闻", "url": "http://2010.163.com/special/00863I1M/rss_2010.xml"}]},
                         {"belong": "wyyule", "classify": "娱乐", "context": [{"tag": "wyyltt", "parent": "wyyl", "name": "娱乐头条", "url": "http://ent.163.com/special/00031K7Q/rss_toutiao.xml"},
                                                         {"tag": "wymxdt", "parent": "wyyl", "name": "明星动态", "url": "http://ent.163.com/special/00031K7Q/rss_entstar.xml"},
                                                         {"tag": "wydysj", "parent": "wyyl", "name": "电影世界", "url": "http://ent.163.com/special/00031K7Q/rss_entmovie.xml"},
                                                         {"tag": "wydyjc", "parent": "wyyl", "name": "电影剧场", "url": "http://ent.163.com/special/00031K7Q/rss_enttv.xml"},
                                                         {"tag": "wyyysl", "parent": "wyyl", "name": "音乐沙龙", "url": "http://ent.163.com/special/00031K7Q/rss_entmusic.xml"},
                                                         {"tag": "wyyltp", "parent": "wyyl", "name": "图片新闻", "url": "http://ent.163.com/special/00031K7Q/rss_entpic.xml"}]},
                         {"belong": "wyvideo", "classify": "视频", "context": [{"tag": "wysptt", "parent": "wysp", "name": "视频头条", "url": "http://v.163.com/special/008544NC/vheadline.xml"},
                                                         {"tag": "wyspzx", "parent": "wysp", "name": "资讯频道", "url": "http://v.163.com/special/008544NC/vnewsrss.xml"},
                                                         {"tag": "wydsjpd", "parent": "wysp", "name": "电视剧频道", "url": "http://v.163.com/special/008544NC/tvrss.xml"},
                                                         {"tag": "wydypd", "parent": "wysp", "name": "电影频道", "url": "http://v.163.com/special/008544NC/moiverss.xml"},
                                                         {"tag": "wyzypd", "parent": "wysp", "name": "综艺频道", "url": "http://v.163.com/special/008544NC/ventrss.xml"},
                                                         {"tag": "wyjspd", "parent": "wysp", "name": "纪实频道", "url": "http://v.163.com/special/008544NC/vdocrss.xml"}]},
                         {"belong": "wytech", "classify": "科技", "context": [{"tag": "wykjtt", "parent": "wykj", "name": "科技头条", "url": "http://tech.163.com/special/000944OI/headlines.xml"},
                                                         {"tag": "wyhlw", "parent": "wykj", "name": "互联网", "url": "http://tech.163.com/special/000944OI/hulianwang.xml"},
                                                         {"tag": "wykjyw", "parent": "wykj", "name": "要闻", "url": "http://tech.163.com/special/000944OI/yaowen.xml"},
                                                         {"tag": "wykjtx", "parent": "wykj", "name": "通信", "url": "http://tech.163.com/special/000944OI/kejitongxin.xml"},
                                                         {"tag": "wykjityj", "parent": "wykj", "name": "IT业界", "url": "http://tech.163.com/special/000944OI/kejiyejie.xml"},
                                                         {"tag": "wykjsp", "parent": "wykj", "name": "视频", "url": "http://tech.163.com/special/000944OI/kejishipin.xml"},
                                                         {"tag": "wykjsdyd", "parent": "wykj", "name": "深度阅读", "url": "http://tech.163.com/special/000944OI/shenduyuedu.xml"},
                                                         {"tag": "wykjgdft", "parent": "wykj", "name": "高端访谈", "url": "http://tech.163.com/special/000944OI/kejifangtan.xml"},
                                                         {"tag": "wykjzt", "parent": "wykj", "name": "主题", "url": "http://tech.163.com/special/000944OI/kejizhuanti.xml"}]},
                         {"belong": "wyeconomy", "classify": "财经", "context": [{"tag": "wycjtt", "parent": "wycj", "name": "头条新闻", "url": "http://money.163.com/special/00252EQ2/toutiaorss.xml"},
                                                         {"tag": "wycjywzh", "parent": "wycj", "name": "要闻综合", "url": "http://money.163.com/special/00252EQ2/yaowenrss.xml"},
                                                         {"tag": "wycjhgyw", "parent": "wycj", "name": "宏观要闻", "url": "http://money.163.com/special/00252EQ2/macrorss.xml"},
                                                         {"tag": "wycjzqyw", "parent": "wycj", "name": "证券要闻", "url": "http://money.163.com/special/00252EQ2/gushinewsrss.xml"},
                                                         {"tag": "wyczzn", "parent": "wycj", "name": "操作指南", "url": "http://money.163.com/special/00252EQ2/caozuorss.xml"},
                                                         {"tag": "wycjsyyw", "parent": "wycj", "name": "商业要闻", "url": "http://media.163.com/special/00762B70/media.xml"},
                                                         {"tag": "wyjjyw", "parent": "wycj", "name": "基金要闻", "url": "http://money.163.com/special/00252EQ2/jjywrss.xml"},
                                                         {"tag": "wycjzt", "parent": "wycj", "name": "财经专题", "url": "http://money.163.com/special/00252LIB/cjztrss.xml"}]},
                         {"belong": "wycar", "classify": "汽车", "context": [{"tag": "wyqctt", "parent": "wyqc", "name": "头条新闻", "url": "http://auto.163.com/special/00081K7D/rsstoutiao.xml"},
                                                         {"tag": "wyqccxyw", "parent": "wyqc", "name": "车讯要闻", "url": "http://auto.163.com/special/00081K7D/rsscxyw.xml"},
                                                         {"tag": "wyqcxc", "parent": "wyqc", "name": "新车", "url": "http://auto.163.com/special/00081K7D/rss_autotry.xml"},
                                                         {"tag": "wyqcdg", "parent": "wyqc", "name": "导购", "url": "http://auto.163.com/special/00081K7D/rss_autobuy.xml"},
                                                         {"tag": "wyqchq", "parent": "wyqc", "name": "行情", "url": "http://auto.163.com/special/00081K7D/rssdepreciate.xml"},
                                                         {"tag": "wyqcsj", "parent": "wyqc", "name": "网易试驾", "url": "http://auto.163.com/special/00081K7D/rsstest.xml"},
                                                         {"tag": "wyqcycxxc", "parent": "wyqc", "name": "用车修车", "url": "http://auto.163.com/special/00081K7D/rss_autouse.xml"},
                                                         {"tag": "wyqcyp", "parent": "wyqc", "name": "汽车用品", "url": "http://auto.163.com/special/00081K7D/rssqcyp.xml"},
                                                         {"tag": "wyyjtt", "parent": "wyqc", "name": "业界头条", "url": "http://auto.163.com/special/00081K7D/rsstoutiao.xml"}]},
                         {"belong": "wydigital", "classify": "数码", "context": [{"tag": "wysmyw", "parent": "wysm", "name": "数码要闻", "url": "http://tech.163.com/digi/special/00161K7K/rss_digixj.xml"},
                                                         {"tag": "wysmbjbzx", "parent": "wysm", "name": "笔记本资讯", "url": "http://tech.163.com/digi/special/00161K7K/rss_diginote.xml"},
                                                         {"tag": "wysmdiyzx", "parent": "wysm", "name": "DIY资讯", "url": "http://tech.163.com/digi/special/00161K7K/rss_digipc.xml"},
                                                         {"tag": "wysmxjzx", "parent": "wysm", "name": "相机资讯", "url": "http://tech.163.com/digi/special/00161K7K/rss_digidc.xml"},
                                                         {"tag": "wysmjdzx", "parent": "wysm", "name": "家电资讯", "url": "http://tech.163.com/digi/special/00161K7K/rss_digijd.xml"},
                                                         {"tag": "wysmsstzx", "parent": "wysm", "name": "随身听资讯", "url": "http://tech.163.com/digi/special/00161K7K/rss_digisyt.xml"},
                                                         {"tag": "wysmjk", "parent": "wysm", "name": "数码极客", "url": "http://tech.163.com/digi/special/00161K7K/rss_digigeek.xml"}]},
                         {"belong": "wyphone", "classify": "手机", "context": [{"tag": "wysjtt", "parent": "wysj", "name": "手机头条", "url": "http://tech.163.com/mobile/special/001144R8/mobile163.xml"},
                                                         {"tag": "wysjxjsd", "parent": "wysj", "name": "新机速递", "url": "http://tech.163.com/mobile/special/001144R8/xinjisudi.xml"},
                                                         {"tag": "wysjpc", "parent": "wysj", "name": "手机评测", "url": "http://tech.163.com/mobile/special/001144R8/shoujipingce.xml"},
                                                         {"tag": "wysjgjzn", "parent": "wysj", "name": "购机指南", "url": "http://tech.163.com/mobile/special/001144R8/shoujidaogou.xml"},
                                                         {"tag": "wysjbjhq", "parent": "wysj", "name": "北京行情", "url": "http://tech.163.com/mobile/special/001144R8/beijinghangqing.xml"},
                                                         {"tag": "wysjshhq", "parent": "wysj", "name": "上海行情", "url": "http://tech.163.com/mobile/special/001144R8/shanghaihangqing.xml"},
                                                         {"tag": "wysjgzhq", "parent": "wysj", "name": "广州行情", "url": "http://tech.163.com/mobile/special/001144R8/guangzhouhangqing.xml"},
                                                         {"tag": "wysjgdhq", "parent": "wysj", "name": "各地行情", "url": "http://tech.163.com/mobile/special/001144R8/gedihangqing.xml"}]},
                         {"belong": "wywomen", "classify": "女性", "context": [{"tag": "wynxsszx", "parent": "wynx", "name": "时尚资讯", "url": "http://lady.163.com/special/00261R8C/ladyrss1.xml"},
                                                         {"tag": "wynxplts", "parent": "wynx", "name": "扮靓贴士", "url": "http://lady.163.com/special/00261R8C/ladyrss2.xml"},
                                                         {"tag": "wynxqgks", "parent": "wynx", "name": "情感口述", "url": "http://lady.163.com/special/00261R8C/ladyrss3.xml"},
                                                         {"tag": "wynxxzys", "parent": "wynx", "name": "星座运势", "url": "http://lady.163.com/special/00261R8C/ladyrss4.xml"},
                                                         {"tag": "wynxnrb", "parent": "wynx", "name": "女人帮", "url": "http://lady.163.com/special/00261R8C/ladyrss5.xml"},
                                                         {"tag": "wynxnrlt", "parent": "wynx", "name": "女人论坛", "url": "http://lady.163.com/special/00261R8C/ladyrss6.xml"},
                                                         {"tag": "wynxxqrj", "parent": "wynx", "name": "心情日记", "url": "http://lady.163.com/special/00261R8C/ladyrss7.xml"},
                                                         {"tag": "wynxqzly", "parent": "wynx", "name": "亲子乐园", "url": "http://lady.163.com/special/00261R8C/ladyrss7.xml"}]},
                         {"belong": "wyhouse", "classify": "房产", "context": [{"tag": "wyfcgz", "parent": "wyfc", "name": "广州", "url": "http://gz.house.163.com/special/00873E0M/rss.xml"},
                                                         {"tag": "wyfcbj", "parent": "wyfc", "name": "北京", "url": "http://gz.house.163.com/special/00873E0M/rss.xml"},
                                                         {"tag": "wyfcsh", "parent": "wyfc", "name": "上海", "url": "http://sh.house.163.com/special/000741DO/rsssh.xml"},
                                                         {"tag": "wyfcsz", "parent": "wyfc", "name": "深圳", "url": "http://sz.house.163.com/special/000741HU/szrss.xml"}]},
                         {"belong": "wygame", "classify": "游戏", "context": [{"tag": "wyyxttn", "parent": "wyyx", "name": "头条新闻", "url": "http://game.163.com/special/003144N4/rss_gametop.xml"},
                                                         {"tag": "wyyxyjn", "parent": "wyyx", "name": "业界新闻", "url": "http://game.163.com/special/003144N4/rss_gametop.xml"},
                                                         {"tag": "wyyxmsn", "parent": "wyyx", "name": "魔兽世界新闻", "url": "http://game.163.com/special/003144N4/rss_wowxw.xml"},
                                                         {"tag": "wyyxtxen", "parent": "wyyx", "name": "天下贰新闻", "url": "http://game.163.com/special/003144N4/rss_tx2xw.xml"},
                                                         {"tag": "wyyxtxegl", "parent": "wyyx", "name": "天下贰攻略", "url": "http://game.163.com/special/003144N4/rss_tx2xw.xml"},
                                                         {"tag": "wyyxmhxyn", "parent": "wyyx", "name": "梦幻西游新闻", "url": "http://game.163.com/special/003144N4/rss_xyqxw.xml"},
                                                         {"tag": "wyyxmhxygl", "parent": "wyyx", "name": "梦幻西游攻略", "url": "http://game.163.com/special/003144N4/rss_xyqgl.xml"},
                                                         {"tag": "wyyxjwsn", "parent": "wyyx", "name": "剑网3新闻", "url": "http://game.163.com/special/003144N4/rss_jx3xw.xml"},
                                                         {"tag": "wyyxjwsgl", "parent": "wyyx", "name": "剑网3攻略", "url": "http://game.163.com/special/003144N4/rss_jx3gl.xml"},
                                                         {"tag": "wyymlxzxn", "parent": "wyyx", "name": "梦幻诛仙新闻", "url": "http://game.163.com/special/003144N4/rss_mhzxxw.xml"},
                                                         {"tag": "wyymlxzxgl", "parent": "wyyx", "name": "梦幻诛仙攻略", "url": "http://game.163.com/special/003144N4/rss_mhzxgl.xml"}]},
                         {"belong": "wybook", "classify": "读书", "context": [{"tag": "wydszxyd", "parent": "wyds", "name": "在线阅读", "url": "http://book.163.com/special/0092451H/rss_online.xml"},
                                                         {"tag": "wydsszwz", "parent": "wyds", "name": "书摘文摘", "url": "http://book.163.com/special/0092451H/rss_shuzhai.xml"},
                                                         {"tag": "wydswhzx", "parent": "wyds", "name": "文化资讯", "url": "http://book.163.com/special/0092451H/rss_whzx.xml"},
                                                         {"tag": "wydsbk", "parent": "wyds", "name": "读书博客", "url": "http://book.163.com/special/0092451H/rss_blog.xml"}]},
                         {"belong": "wymedia", "classify": "媒体", "context": [{"tag": "wymtcm", "parent": "wymt", "name": "传媒", "url": "http://media.163.com/special/00762B70/media.xml"}]},
                         {"belong": "wywelfare", "classify": "公益", "context": [{"tag": "wygyn", "parent": "wygy", "name": "公益新闻", "url": "http://gongyi.163.com/special/009344MB/gyxw2.xml"}]},
                         {"belong": "wyscholl", "classify": "校园", "context": [{"tag": "wyxyn", "parent": "wyxy", "name": "校园", "url": "http://daxue.163.com/special/00913J5N/daxuerss.xml"}]},
                         {"belong": "wytravel", "classify": "旅游", "context": [{"tag": "wylytttj", "parent": "wyly", "name": "头条推荐", "url": "http://travel.163.com/special/00061K7R/rss_hline.xml"},
                                                         {"tag": "wylyrd", "parent": "wyly", "name": "旅游热点", "url": "http://travel.163.com/special/00061K7R/rss_hotpl.xml"},
                                                         {"tag": "wylygnly", "parent": "wyly", "name": "国内旅游", "url": "http://travel.163.com/special/00061K7R/rss_gnly.xml"},
                                                         {"tag": "wylycjly", "parent": "wyly", "name": "出境旅游", "url": "http://travel.163.com/special/00061K7R/rss_cjly.xml"},
                                                         {"tag": "wylyztly", "parent": "wyly", "name": "主题旅游", "url": "http://travel.163.com/special/00061K7R/rss_ztly.xml"},
                                                         {"tag": "wylychwl", "parent": "wyly", "name": "吃喝玩乐", "url": "http://travel.163.com/special/00061K7R/rss_chwl.xml"}]},
                         {"belong": "wyedu", "classify": "教育", "context": [{"tag": "wyjyzx", "parent": "wyjy", "name": "新闻资讯", "url": "http://edu.163.com/special/002944N7/edunews0126.xml"},
                                                         {"tag": "wyjyksxx", "parent": "wyjy", "name": "考试信息", "url": "http://edu.163.com/special/002944N7/eduexam.xml"},
                                                         {"tag": "wyjyxyjd", "parent": "wyjy", "name": "校园焦点", "url": "http://edu.163.com/special/002944N7/educampus.xml"},
                                                         {"tag": "wyjycyn", "parent": "wyjy", "name": "产业新闻", "url": "http://edu.163.com/special/002944N7/eduindustry.xml"},
                                                         {"tag": "wyjygdft", "parent": "wyjy", "name": "高端访谈", "url": "http://edu.163.com/special/002944N7/edutalk.xml"},
                                                         {"tag": "wyjyqcsq", "parent": "wyjy", "name": "青春社区", "url": "http://edu.163.com/special/002944N7/eduyoung.xml"}]},
                         {"belong": "wybbs", "classify": "论坛", "context": [{"tag": "wylttt", "parent": "wylt", "name": "头条", "url": "http://bbs.163.com/special/001544OQ/bbstop.xml"},
                                                         {"tag": "wyltxwlt", "parent": "wylt", "name": "新闻论坛", "url": "http://bbs.163.com/special/001544OQ/bbsnewsrss.xml"},
                                                         {"tag": "wyltlyly", "parent": "wylt", "name": "旅游论坛", "url": "http://bbs.163.com/special/001544OQ/bbstravelrss.xml"},
                                                         {"tag": "wylttylt", "parent": "wylt", "name": "体育论坛", "url": "http://bbs.163.com/special/001544OQ/bbssportsrss.xml"},
                                                         {"tag": "wyltcjlt", "parent": "wylt", "name": "财经论坛", "url": "http://bbs.163.com/special/001544OQ/bbsmoneyrss.xml"},
                                                         {"tag": "wyltdflt", "parent": "wylt", "name": "地方论坛", "url": "http://bbs.163.com/special/001544OQ/bbslocalrss.xml"},
                                                         {"tag": "wyltnrlt", "parent": "wylt", "name": "女人论坛", "url": "http://bbs.163.com/special/001544OQ/bbsladyrss.xml"}]},
                         {"belong": "wyblog", "classify": "博客", "context": [{"tag": "wybksoc", "parent": "wybk", "name": "社会", "url": "http://news.163.com/special/000144P0/blogsh.xml"},
                                                         {"tag": "wybksh", "parent": "wybk", "name": "生活", "url": "http://news.163.com/special/000144P0/style.xml"},
                                                         {"tag": "wybkls", "parent": "wybk", "name": "历史", "url": "http://news.163.com/special/000144P0/history.xml"},
                                                         {"tag": "wybkwy", "parent": "wybk", "name": "文艺", "url": "http://news.163.com/special/000144P0/music.xml"},
                                                         {"tag": "wybkds", "parent": "wybk", "name": "读书", "url": "http://news.163.com/special/000144P0/dushu.xml"},
                                                         {"tag": "wybkmx", "parent": "wybk", "name": "明星", "url": "http://news.163.com/special/000144P0/star.xml"},
                                                         {"tag": "wybkdy", "parent": "wybk", "name": "电影", "url": "http://news.163.com/special/000144P0/movie2.xml"},
                                                         {"tag": "wybkds", "parent": "wybk", "name": "电视", "url": "http://news.163.com/special/000144P0/dianshi.xml"},
                                                         {"tag": "wybkkx", "parent": "wybk", "name": "科学", "url": "http://news.163.com/special/000144P0/kexue.xml"},
                                                         {"tag": "wybkjs", "parent": "wybk", "name": "军事", "url": "http://news.163.com/special/000144P0/junshi2.xml"}]},
                         {"belong": "wysell", "classify": "营销", "context": [{"tag": "wyyxn", "parent": "wyyix", "name": "营销", "url": "http://mkt.163.com/special/009044MP/163mktmorerss.xml"}]}];
    return news_rss_feed;
}

function get_wangyi_rss() { //获得网易RSS
    var news_rss_feed = wangyi_rss_feed();
    var html = "";
    var db = new DB();
    var nav_ary = [];
    $('#refresh').remove();
    if (db.open_database()) {
        $('#main_content').html('<img src="img/loading.gif"/>');
        html += '<table class="table table-condensed"><tbody>';
        for (var i = 0; i < news_rss_feed.length; i++) {
            html += '<tr><td width="1000px"><div class="accordion-group"><div class="accordion-heading">';
            html += '<a class="accordion-toggle" data-toggle="collapse" href="#wangyi_' + i + '">' + news_rss_feed[i].classify + '</a>';
            html += '</div><div id="wangyi_' + i + '" class="accordion-body collapse"><div class="accordion-inner">';
            html += '<table class="table table-condensed"><tbody>';
            for (var j = 0; j < news_rss_feed[i].context.length; j++) {
                html += '<tr><td><a href="#" onclick=\'click_to_get_rss("'+ news_rss_feed[i].context[j].url +'", "wy", "' + news_rss_feed[i].context[j].name + '")\' >' + news_rss_feed[i].context[j].name + '</a></td>';
                if ((db.query(news_rss_feed[i].context[j].tag) == undefined) || (db.query(news_rss_feed[i].context[j].tag) == null)) {
                    html += '<td><a href="#" onclick=\'wy_subscribe("'+ news_rss_feed[i].context[j].tag + '", "' + news_rss_feed[i].context[j].parent + '", "' + news_rss_feed[i].context[j].name + '", "' + news_rss_feed[i].context[j].url + '")\' class="btn">订阅</a></td></tr>';    
                } else {
                    html += '<td><a href="#" onclick=\'cancel_subscribe("'+ news_rss_feed[i].context[j].tag + '")\'class="btn btn-success">订阅</a></td></tr>';
                }
            }
            html += '</tbody></table></div></div></div></td></tr>';
        }
        html += '</tbody></table>';
        $('#main_content').html(html);
        nav_ary.push({'name': '网易RSS', 'func': 'get_wangyi_rss'});
        update_nav_bar(nav_ary);
        return false;
    }
}

function get_sohu_rss() { //获得搜狐 RSS
    var news_rss_feed = sohu_rss_feed();
    var html = "";
    var db = new DB();
    var nav_ary = [];
    $('#refresh').remove();
    if (db.open_database()) {
        $('#main_content').html('<img src="img/loading.gif"/>');
        html += '<table class="table table-condensed"><tbody>';
        for (var i = 0; i < news_rss_feed.length; i++) {
            html += '<tr>';
            html += '<td><a href="#" onclick=\'click_to_get_rss("' + news_rss_feed[i].url + '", "sh", "' + news_rss_feed[i].title + '")\'>'+ news_rss_feed[i].title + '</a></td>';
            if (db.query(news_rss_feed[i].tag) == undefined) {
                html += '<td><a href="#" id="' + news_rss_feed[i].tag + '" class="btn" onclick=\'sh_subscribe("' + news_rss_feed[i].tag + '", "' + news_rss_feed[i].title + '", "' + news_rss_feed[i].url + '")\'>订阅</a></td>';    
            } else {
                html += '<td><a href="#" id="' + news_rss_feed[i].tag + '" class="btn btn-success" onclick=\'cancel_subscribe("' + news_rss_feed[i].tag + '")\'>订阅</a></td>';            
            }
            html += '</tr>';
        }
        html += '</tbody></table>';
        $('#main_content').html(html);
        nav_ary.push({'name': '搜狐RSS', 'func': 'get_sohu_rss'});
        update_nav_bar(nav_ary);
        return false;
    }
}

function add_mywy_sub(parent, html) {
    switch (parent) {
        case 'wyxw':
            $('#mywyxwsub').append(html);
            break;
        case 'wyty':
            $('#mywytysub').append(html);
            break;
        case 'wyyy':
            $('#mywyyysub').append(html);
            break;
        case 'wyyl':
            $('#mywyylsub').append(html);
            break;
        case 'wysp':
            $('#mywyspsub').append(html);
            break;
        case 'wykj':
            $('#mywykjsub').append(html);
            break;
        case 'wycj':
            $('#mywycjsub').append(html);
            break;
        case 'wyqc':
            $('#mywyqcsub').append(html);
            break;
        case 'wysm':
            $('#mywysmsub').append(html);
            break;
        case 'wysj':
            $('#mywysjsub').append(html);
            break;
        case 'wynx':
            $('#mywynvsub').append(html);
            break;
        case 'wyfc':
            $('#mywyfcsub').append(html);
            break;
        case 'wyyx':
            $('#mywyyxsub').append(html);
            break;
        case 'wyds':
            $('#mywydssub').append(html);
            break;
        case 'wymt':
            $('#mywymtsub').append(html);
            break;
        case 'wygy':
            $('#mywygysub').append(html);
            break;
        case 'wyxy':
            $('#mywyxysub').append(html);
            break;
        case 'wyly':
            $('#mywylysub').append(html);
            break;
        case 'wyjy':
            $('#mywyjysub').append(html);
            break;
        case 'wylt':
            $('#mywyltsub').append(html);
            break;
        case 'wybk':
            $('#mywybksub').append(html);
            break;
        case 'wyyix':
            $('#mywyyixsub').append(html);
            break;
    }
}

function click_to_get_rss(url, flag, name) { //点击获得RSS
    var db = new DB();
    var update_timer = null;
    loadXMLDoc(url);
    if (db.open_database()) {
        var obj = db.get_config('cfg'); //检查刷新设置
        //alert(obj.value.not_auto_refresh);
        //alert(obj.value.auto_refresh);
        var nav_ary = [];
        if (flag == 'wy') {
            nav_ary.push({'name': '网易RSS', 'func': 'get_wangyi_rss'});
            nav_ary.push({'name': name, 'func': null});
        } else if (flag == 'sh') {
            nav_ary.push({'name': '搜狐RSS', 'func': 'get_sohu_rss'});
            nav_ary.push({'name': name, 'func': null});
        }
        update_nav_bar(nav_ary);
        if (undefined != obj) {
            if (obj.value.not_auto_refresh) {
                switch (obj.value.auto_refresh) {
                    case 1:
                        upload_timer = setInterval(function() {
                            loadXMLDoc(url);
                        }, 360000);
                        break;
                    case 2:
                        upload_timer = setInterval(function() {
                            loadXMLDoc(url);
                        }, 10800000);
                        break;
                }
            }
        }
    }
}

function wy_subscribe(tag, parent, name, url) { //网易订阅感兴趣的RSS
    var db = new DB();
    if (db.open_database()) { //打开数据库
        if (db.save(tag, name, url)) { //存储订阅到数据库
            var html = "";
            html += '<li id="' + tag + '_li"><a href="#" onclick=\'click_to_get_rss("' + url + '", "wy", "' + name + '")\' class="btn">' + name + '</a><a href="#" class="btn" onclick=\'cancel_subscribe("'+ tag +'")\'><i class="icon-remove"></i></a></li>';
            add_mywy_sub(parent, html);
            get_wangyi_rss();
        }
    }
}

function sh_subscribe(tag, name, url) { //sohu订阅感兴趣的RSS
    var db = new DB();
    if (db.open_database()) {
        if (db.save(tag, name, url)) {
            var html = '';
            html += '<li id="' + tag + '_li"><a href="#" onclick=\'click_to_get_rss("' + url + '", "sh", "' + name + '")\' class="btn">' + name + '</a><a href="#" class="btn" onclick=\'cancel_subscribe("'+ tag +'")\'><i class="icon-remove"></i></a></li>';
            $('#myshsub').append(html);
            get_sohu_rss();    
        }
    }
}

function cancel_subscribe(tag) { //取消订阅
    var db = new DB();
    if (db.open_database()) {
        if (db.del(tag)) {
            if (tag.indexOf('wy') != -1) {
                $('#' + tag + '_li').remove();
                get_wangyi_rss();
            } else {
                $('#' + tag + '_li').remove();
                get_sohu_rss();
            }
            console.log("delete successfully");
            return true;
        } else {
            console.log("deleted failed");
            return false;
        }
    }
}

function get_my_subscribe() { //获得我的订阅
    var wy_rss_feed = wangyi_rss_feed();
    var sh_rss_feed = sohu_rss_feed();
    var db = new DB();
    $('#refresh').remove();
    if (db.open_database()) {
        if (db.count()) {
            for (var i = 0; i < sh_rss_feed.length; i++) {
                if (db.query(sh_rss_feed[i].tag) != undefined) {
                    var html = '';
                    html += '<li id="' + sh_rss_feed[i].tag + '_li"><a href="#" onclick=\'click_to_get_rss("' + sh_rss_feed[i].url + '", "sh", "' + sh_rss_feed[i].title + '")\'class="btn">' + sh_rss_feed[i].title + '</a>'
                    html += '<a href="#" class="btn" onclick=\'cancel_subscribe("'+ sh_rss_feed[i].tag +'")\'>';
                    html += '<i class="icon-remove"></i></a></li>';
                    $('#myshsub').append(html);
                }
            }
            for (var i = 0; i < wy_rss_feed.length; i++) {
                for (var j = 0; j < wy_rss_feed[i].context.length; j++) {
                    if (db.query(wy_rss_feed[i].context[j].tag) != undefined) {
                        var html = '';
                        html += '<li id="' + wy_rss_feed[i].context[j].tag + '_li">';
                        html += '<a href="#" onclick=\'click_to_get_rss("' + wy_rss_feed[i].context[j].url + '", "wy", "' + wy_rss_feed[i].context[j].name + '")\' class="btn">' + wy_rss_feed[i].context[j].name + '</a>';
                        html += '<a href="#" class="btn" onclick=\'cancel_subscribe("'+ wy_rss_feed[i].context[j].tag +'")\'><i class="icon-remove"></i></a></li>';
                        add_mywy_sub(wy_rss_feed[i].context[j].parent, html);
                    }
                }
            }
            $('#main_content').html('<div class="alert alert-block alert-info"><h4>(^_^)</h4>赶快来查看您订阅的感兴趣RSS吧！</div>');
        } else {
            var html = "";
            html += '<div class="alert alert-block alert-info">';
            html += '<h4>(^_^)</h4>欢迎使用本软件，您可以从这里订阅您感兴趣的RSS哦！</div>'
            $('#main_content').html(html);
        }
    }
}

function update_nav_bar (nav_ary) {
    $('#nav_rss').html('');
    for (var i = 0; i < nav_ary.length; i++) {
        var html = "";
        if (i == (nav_ary.length - 1)) {
            html += '<li class="active"><a href="#" onclick="' + nav_ary[i].func +'()">' + nav_ary[i].name + '</a></li>';
        } else {
            html += '<li><a href="#" onclick="' + nav_ary[i].func + '()">' + nav_ary[i].name + '</a></li>';
        }
        $('#nav_rss').append(html);
    }
}
