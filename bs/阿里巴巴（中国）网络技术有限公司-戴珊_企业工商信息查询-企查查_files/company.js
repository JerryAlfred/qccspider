/*搜索结果页面*/
$(function(){
    changetab();

    var key         = $("#companyname").val();
    var companykey  = $("#unique").val();
    var companylogo = $("#companylogo").val();
    var isrecompany  = $("#isrecompany").val();

    if(companylogo!="" && companykey){ 
        // alert(123);
        getLogo(companykey,companylogo);
    }

})

/*公司导航栏切换标签*/
var companyNavTimer; 
var companyNavPos;
var navPos; 
var baseLoaded = false;
function changetab(){
    var hash = location.hash;
    
    if(hash!=""){
        try{
            $(hash+"_title").click();
        }catch(e){}
    }else{
        baseLoaded = true;
        $("#base_title").click();
        
    }
}

function setCompanyNavFixed(pos){
    navPos = $('.company-nav').offset().top-56;
    window.onscroll = function(e){
        var scrollTop = window.scrollTop || document.documentElement.scrollTop||document.body.scrollTop;
        if(scrollTop>navPos){
             $('.company-nav').addClass('company-nav-fixed');
             $('.mtlist-tab').addClass('fixed');
             $('#hbuser').hide();
             $('#hfuser').show();
        }else{
             $('.company-nav').removeClass('company-nav-fixed');
             $('.mtlist-tab').removeClass('fixed');
             $('#hbuser').show();
             $('#hfuser').hide();
        }
        if(scrollTop>20){
            $('.own-switch').hide();
            $('.own-switch.fixed').show();
        }else{
            $('.own-switch').show();
            $('.own-switch.fixed').hide();
        }
    }

    
}
function setCompanyNavClick(){
    $('.company-nav-items>a').click(function(){
        var tabid = $(this).parent().prev().attr("tabid");
        companyNavPos = $(this).attr('data-pos');
        if(companyNavPos.indexOf('his')===0){
            tabid = 'history';
        }
        changeTab(tabid);
    });
     
}

setCompanyNavHover();
function setCompanyNavHover(){
    $('.company-nav').mouseover(function(){
        if(companyNavTimer){
            clearTimeout(companyNavTimer);
        }
        companyNavTimer = setTimeout(function(){
            $('.company-nav').addClass('company-nav-hover');
        },200);
    });

    $('.company-nav').mouseleave(function(){
        clearTimeout(companyNavTimer);
        $('.company-nav').removeClass('company-nav-hover');
    });
    $('.company-nav-items').height($('.company-nav-contain').height()-38);
}

$("a[tabid]").click(function() {
    var tabid = $(this).attr("tabid");
    companyNavPos = '';
    var fp = getQueryString('fp');
    if(fp){
        companyNavPos = fp;
    }
    changeTab(tabid);
    switch(tabid){
        case 'base':
            //zhugeTrack('企业主页-基础信息');
            break;
        case 'susong':
            //zhugeTrack('企业主页-法律诉讼');
            break;
        case 'run':
            //zhugeTrack('企业主页-经营状况');
            break;
        case 'touzi':
            //zhugeTrack('企业主页-对外投资');
            break;
        case 'report':
            //zhugeTrack('企业主页-企业年报');
            break;
        case 'assets':
            //zhugeTrack('企业主页-知识产权');
            break;
        case 'job':
            //zhugeTrack('企业主页-新闻舆情');
            break;
    }
});

function navDataPos(tabid, pos){
    companyNavPos = pos
    if(companyNavPos.indexOf('his')===0){
        tabid = 'history';
    }
    changeTab(tabid);
}

function changeTab(tabid){
    if(tabid=='base' && !baseLoaded){
        lazyBase()
        baseLoaded = true;
        window.scrollTo(0,navPos);
    }
    clearTimeout(companyNavTimer);
    $('.company-nav').removeClass('company-nav-hover');
    var unique       = $("#unique").val();
    var companyname  = $("#companyname").val();
    var data_info=$("."+tabid+"_info");
    var hash = location.hash;
    if(hash!=""||tabid!="base"){
        window.location.hash = "#" + tabid;
    }
    if(hash==""||tabid=="base"){
        
    }
    if($("a[tabid="+tabid+"]").hasClass('company-nav-head')){
        $("a[tabid]").parent().removeClass("current");
        $("a[tabid="+tabid+"]").parent().addClass("current");
    }else{
        $("a[tabid]").removeClass("current");
        $("a[tabid="+tabid+"]").addClass("current");
    }
    if(data_info.size()==0){
        $("#load_data").show();
        getDetail(tabid,unique,companyname);
        $(".data_div").css("display", "none");
        //showdata(tabid);
    }else{
        showdata(tabid);
    }
}

function lazyBase(){
    if($('#kzrIframe')[0]){
        $('#kzrIframe')[0].contentWindow.location.reload(true);
    }
    if($('#guquanIframe')[0]){
        $('#guquanIframe')[0].contentWindow.location.reload(true);
    }
}

function getDetail(tabid,unique,companyname){
    unique      = encodeURIComponent(unique);
    companyname = encodeURIComponent(companyname);
    var path = INDEX_URL+"/company_getinfos?";
    var url = path+"unique="+unique+'&companyname='+companyname+'&tab='+tabid;
    $.ajax({
        type:'GET',
        dataType:"html",
        url:url,
        success:function(data){
            if(data){
                showdata(tabid);
                $("#load_data").hide();
                $("#"+tabid+"_div").html(data);
            }
        }
    })
    if($('.company-nav').hasClass('company-nav-fixed')){
        window.scrollTo(0,navPos);
    }else{
        //window.scrollTo(0,navPos);
        //window.scrollTo(0,0);
    }
}


function showdata(tabid){
    $(".data_div").css("display", "none");
    $("#"+tabid+"_div").css("display", "block");
    if(companyNavPos){
        setTimeout(function() {
            if(companyNavPos.length==1){
                $('#myTab a[href="#'+companyNavPos+'"]').tab('show');
                window.scrollTo(0,navPos);
            }else{
                var offset = -96;
                if($('.mtlist-tab').height()>0){
                    offset = -140
                }
                $.scrollTo('#'+companyNavPos,{duration: 100, offset: offset});
            }
        }, 100);
    }
    if(tabid=='base'){
        var unique  = $("#unique").val();
        subUnique = unique.substr(0,1);
        if(subUnique!='s' && subUnique!='h' && subUnique!='t' && subUnique!='w' && subUnique!='j' && subUnique!='l'){
            baseDrawGuquanStatic();
        }
    }
}

function boxScrollNew(tabBox,obj){
    try{
        var offset = -96;
        if($('.mtlist-tab').height()>0){
            offset = -140
        }
        obj ? $(obj).scrollTo(tabBox,100) : $.scrollTo(tabBox,{duration: 100, offset: offset});
    }catch(e){
        var sub = $(tabBox)[0];
        $(obj)[0].scrollTop = sub.offsetTop + 100;
    }
}

function boxScrollTab(tab,pos){
    if(userId){
        if(window.firm){
            companyNavPos = pos;
            changeTab(tab);
        }else{
            var keyno  = $("#unique").val();
            location.href = INDEX_URL+'/firm/'+keyno+'.html?fp='+pos+'#'+tab;
        }
    }else{
        getCaptcha();
        $('#loginModal').modal('show');
    }
    
}

/*获取公司LOGO*/
function getLogo(companykey,companylogo){
    // alert(companykey);
    $.ajax({
        type:'GET',
        url:INDEX_URL+'/company_logo',
        data:'unique='+companykey+'&companylogo='+companylogo,
        success:function(msg){
            //alert("11"+msg);
            if(!msg) return;
            var obj = JSON.parse(msg);
            if(obj.status==0){
                return false;
            }else{
                $("#companybiglogo").attr("src","http://co-image.qichacha.com/CompanyImage/"+companykey+".jpg");
            }
        }
    })
}

// 监控企业
$('#newRadarGroup').on('click',function(){
    $(this).parent().parent().hide();
    $(this).parent().parent().next().show();
});

$('#oldRadarGroup').on('click',function(){
    $(this).parent().parent().hide();
    $(this).parent().parent().prev().show();
});
$('#chooseRadarGroup').on('click', function () {
    var companykey = $('#radarGroupCompanykey').val();
    var obj = '#radar_company';
    var group = $('#radarGroupId').val();
    if($(obj).attr('data-flag') == 0 && group != ''){
        addRadar($(obj),companykey,group,true);
    }else{
        faldia({content:'请选择分组'});
        return false;
    }
});

//添加监控新分组并监控企业
$('#addRadarGroup').on('click',function(){
    var groupname = $('#addRadarGroupName').val();
    var companykey = $('#radarGroupCompanykey').val();
    var url = INDEX_URL+'/radar_addgroup';
    if(groupname == '')return false;
    $.ajax({
        data:{groupname:groupname},
        type:'post',
        url:url,
        success:function(result){
            // console.log(result);
            if(result.success){
                addRadar($('#radar_company'), companykey, groupname, true);
            }else{
                faldia({content:result.msg});
            }
        }
    });
});

function getRadarGrouplist(){
    var groupArr = [];
    var groupCount = 0;
    $.ajax({
        data:{},
        url:'/radar_getGroupList',
        type:'get',
        success:function(result){
            $.map(result.list,function(item,i){
                if(i == 0) {
                    groupArr[i] =
                        '<li data-value="' + item.GroupId + '">' +
                        item.GroupName +
                        '<span class="glyphicon glyphicon-ok"></span></li>';
                    $('#groupId').val(item.GroupId);
                }else{
                    groupArr[i] =
                        '<li data-value="' + item.GroupName + '">' +
                        item.GroupName +
                        '<span class="glyphicon"></span></li>';
                }
                groupCount += 1;
            });
            $('#radarGroupBox').html(groupArr);
            $('.radarGroupCount').html(groupCount);
            $('#radarGroupBox li').on('click',function(){
                $('#radarGroupBox').find('span').removeClass('glyphicon-ok');
                $(this).find('span').addClass('glyphicon-ok');
                var radar_groupid = $(this).attr('data-value');
                $('#radarGroupId').val(radar_groupid);
            });
        }
    });
}
// 监控企业 end ======


//关注公司
var chossenGroupId;
function getGrouplist(){
    if(!userId){
        $('#loginModal').modal('show');
        getCaptcha();
        return;
    }
    if(!$('#groupList').html().isEmpty()){
        return;
    }
    $.ajax({
        data:{},
        url:'/company_getgrouplist',
        type:'get',
        success:function(result){
            var html='';
            $.each(result.list,function(i,vo){
                if(i==0){
                    chossenGroupId = vo.follow_group_id;
                }
                html+='<tr id="gl_'+vo.follow_group_id+'"><td onclick="chooseGroup(\''+vo.follow_group_id+'\')">';
                html+='<label><input type="radio" name="followGroupRadio"/><span class="groupName m-l-sm">'+vo.group_name+'</span></label>';
                html+='</td></tr>'
            });
            $('#groupList').html(html);
            chooseGroup(chossenGroupId);
            $('#groupModal').modal('show');
        }
    });
}
function chooseGroup(groupid){
    chossenGroupId = groupid;
    $.each($('#groupList').find('tr'),function(i,v){
        var trid = $(v).attr('id');
        if(trid=='gl_'+chossenGroupId){
            $(v).find('input').prop('checked',true);
        }else{
            $(v).find('input').prop('checked',false);
        }
    });
}
function editDone(){
    if($('a[href="#groupAdd"]').parent().hasClass('active')){
        var newGroupName = $('#groupAdd input').val();
        if($.trim(newGroupName) == ''){
            faldia('请填写分组名称');
            return false;
        }
        var exist;
        if(exist){
            faldia('新建失败 该分组已存在');
            return false;
        }else{
            $.ajax({
                data:{groupname:newGroupName},
                type:'post',
                url:INDEX_URL+'/company_addgroup',
                success:function(result){
                    if(result.success){
                        $('#groupList').html('');
                        var companykey = $('#groupCompanykey').val();
                        follow($('#follow'),companykey,result.list.follow_group_id);
                        $('#groupModal').modal('hide');
                    }else{
                        faldia({content:result.msg});
                    }
                }
            });
        }
    }else{
        if(!chossenGroupId){
            faldia({content:'请选择分组'});
            return false;
        }
        var companykey = $('#groupCompanykey').val();
        follow($('#follow'),companykey,chossenGroupId);
        $('#groupModal').modal('hide');
        
    }
}

//关注
function follow(obj,companykey,group){
    $.ajax({
        type: 'post',
        data:{companykey:companykey,group:group},
        url: INDEX_URL+'/company_followadd',
        success: function(data){
            if(!data.success){
                faldia({content:data.msg});
                return false;
            }
            $('#closeGroupBox').click();
            //obj.className = "btn btn-icon btn-primary  btn-rounded btn-inactive m-r-xs";
            $(obj).removeClass('ca_active');
            //$(obj).addClass('btn-primary');
            $(obj).attr('onclick','unfollow(this,"'+companykey+'");');
            $(obj).attr('title','取消关注');
            $(obj).html('<span></span>已关注');
            $('.follow-text').text('已关注');
            $(obj).addClass('ca_active');
            $(obj).find('.fa').removeClass('fa-plus');
            $(obj).find('.fa').addClass('fa-check');
            $(obj).attr('data-toggle','');
            $(obj).attr('data-target','');
            $(obj).attr('data-flag',1);

            // 刷新右侧导航 rightNav.js
            //refreshFocUI();

            sucdia({content:"操作成功"},function(){
                window.location.reload();
            });
        }
    });
}

//认可
function  digg(obj,companykey){
    var isUnDigg;
    if($(obj).hasClass('m_bt_renked')){
        isUnDigg = 1;
    }
    $.ajax({
        type: 'post',
        url: INDEX_URL+'/company_digg',
        data:{
            companykey:companykey,
            isUnDigg:isUnDigg
        },
        success: function(data){
            if(data.success){
                var diggCount =  parseInt($('#diggCount').text());
                console.info(diggCount);
                if(isUnDigg){
                    $(obj).attr('class','m_bt_renke');
                    if(diggCount){
                        diggCount--;
                        
                    }
                }else{
                    $(obj).attr('class','m_bt_renked');
                    if(diggCount){
                        diggCount++;
                    }else{
                        diggCount = 1;
                    }
                }
                $('#diggCount').text(diggCount);
                sucdia({content:"操作成功"});
            }
                
        }
    });
}


//取消关注
function  unfollow(obj,companykey){
    $.ajax({
        type: 'post',
        url: INDEX_URL+'/company_followdel?companykey='+companykey,
        success: function(data){
            //obj.className = "btn btn-icon btn-default  btn-rounded btn-inactive m-r-xs";
            $(obj).removeClass('ca_active');
            //$(obj).addClass('btn-default');
            $(obj).attr('onclick','getGrouplist()');
            $(obj).attr('title','关注公司');
            $(obj).html('<span></span>关注');
            $('.follow-text').text('关注');
            $(obj).attr('data-toggle','modal');
            $(obj).find('.fa').addClass('fa-plus');
            $(obj).find('.fa').removeClass('fa-check');
            $(obj).attr('data-target','#groupModal');
            $(obj).attr('data-flag',0);

            // 刷新右侧导航 rightNav.js
            //refreshFocUI();

            sucdia({content:"操作成功"},function(){
                window.location.reload();
            });
        }
    });
}




//取消点赞
function unfav(obj,e,posturl){
    $.ajax({
        type: 'post',
        url: posturl+'/course_zandel?cid='+e,
        data: {unfav:'true'},
        success: function(data){
            obj.className = "upvote";
            oldnum = $(obj).find('.votenum').html();
            $(obj).find('.votenum').html(parseInt(oldnum)-1);
            $(obj).attr('onclick','fav(this,"'+e+'","'+posturl+'");stopPP(arguments[0]);');
        },
    });
}



//赞
$("#zanadd").click(function(){
    //alert($(this).attr('companykey'));
    $.post(INDEX_URL+'/company_zanadd?companykey='+ $(this).attr('companykey'),function(rs){
        if(rs.success){
            $("#like_count").html(parseInt($("#like_count").html()) + 1);
            sucdia({content:"你点了赞~ 萌萌哒~~"});
        }else{
            faldia({
                content: rs.msg,
                'fn': function() {
                    if (rs['code'] == 1){
                        location.href = INDEX_URL+"/user_login";
                    }
                }
            });
        }
    },'json');
});
//取消赞
$("#zandel").click(function(){
    $.post(INDEX_URL+'/company_zandel?companykey='+ $(this).attr('companykey'),function(rs){
        if(rs.success)  sucdia({content:"取消成功",'fn':function(){
            location .reload();
        }});
        else faldia({content:rs.msg});
    },'json');
});







//阻止冒泡的方法
function stopPP(e){
    var evt = e || window.event;
    //IE用cancelBubble=true来阻止而FF下需要用stopPropagation方法
    evt.stopPropagation ? evt.stopPropagation() : (evt.cancelBubble=true);
}









/*委托更新*/
function update(){

    if($('.m_bt_refresh .ma_text').text() == "正在更新"){
        return;
    }
    var unique     =  $("#unique").val();
    var s_unique = unique.substr(0,1);
    $('.m_bt_refresh .ma_text').text('正在更新');
    $('.m_bt_refresh').addClass('m_bt_refresh_loading');
    $('.m_bt_refresh .ma_time').show();
    var num = 0;
    var time = setInterval(function(){
        $('.m_bt_refresh .ma_time').text(num++);
    }, 1000);
    if(s_unique == 'g'){
        location.reload();
    }
    $.post(INDEX_URL+'/company_update?keyNo='+unique,function(rs){
        if(rs.Status==200){

            num = 0;
            $('.m_bt_refresh').removeClass('m_bt_refresh_loading');
            $('.m_bt_refresh .ma_text').text('更新数据');
            $('.m_bt_refresh .ma_time').hidden();
            clearInterval(time);

            sucdia({
                content:"委托更新成功",
                'fn':function(){
                    location.reload()
                }
            });
        }else if(rs.Status==205){
            var jobid = rs.JobId;
            getJob(jobid,1);
        }else{
            faldia({
                content: rs.msg,
                'fn': function() {
                    location.reload();
                }
            });
        }
    },'json');
}


function getJob(JobId,count){
    //alert(JobId);
    $("#djs").show();
    $("#djs").text(count);
    $.ajax({
        type:'POST',
        url:INDEX_URL+'/company_getByJob',
        data:'jobid='+JobId,
        success:function(jobmsg){
            var obj2 = JSON.parse(jobmsg);
            if(obj2.Status==200){
                $('.ca_refresh').removeClass('ca_nobg');
                $('.ca_refresh_gif').addClass('hidden');
                sucText()
            }else if(obj2.Status==205){
                count++;
                if(count>60){
                    $('.ca_refresh').removeClass('ca_nobg');
                    $('.ca_refresh_gif').addClass('hidden');
                    falText()
                }else{
                    time = setTimeout("getJob('"+obj2.JobId+"','"+count+"')",2000);
                    if(count>60){
                        clearTimeout(time);
                    }
                }
            }else{
                $('.ca_refresh').removeClass('ca_nobg');
                $('.ca_refresh_gif').addClass('hidden');
                faldia({
                    content: '更新失败',
                    'fn': function() {
                        location.reload();
                    }
                });
            }
        }
    })
}


//请求年报
function askReport(){
    var unique     =  $("#unique").val();
    $("#noReport").hide();
    $("#loadReport").show();
    //alert($(this).attr('companykey'));
    $.get(INDEX_URL+'/company_update?keyNo='+ unique,function(rs){
        //alert(rs);
        if(rs.Status==200){
            sucdia({
                content:"请求成功",
                'fn':function(){
                    location.reload()
                }
            });
        }else if(rs.Status==205){
            var jobid = rs.JobId;
            getJobReport(jobid,1);
        }else{
            faldia({
                content: rs.msg,
                'fn': function() {
                    location.reload();
                }
            });
        }
    },'json');
}





/*轮回获取数据*/
function getJobReport(JobId,count){
    //alert(JobId);
    $.ajax({
        type:'POST',
        url:INDEX_URL+'/company_getByJob',
        data:'jobid='+JobId,
        success:function(jobmsg){
            //alert("2211"+jobmsg);
            var obj2 = JSON.parse(jobmsg);
            if(obj2.Status==200){
                if(obj2.Result.AnnualReports!='null' && obj2.Result.AnnualReports.length>0){
                    sucdia({
                        content:"委托更新成功",
                        'fn':function(){
                            location.reload()
                        }
                    });
                }else{
                    faldia({
                        content: '目前还没有年报，请稍后重试',
                        'fn': function() {
                            location.reload();
                            $("#askReport").hide();
                        }
                    });
                }
                //sucText()
            }else if(obj2.Status==205){
                count++;
                if(count>3){
                    faldia({
                        content: '请稍后重试',
                        'fn': function() {
                            location.reload();
                        }
                    });
                }else{
                    time = setTimeout("getJobReport('"+obj2.JobId+"','"+count+"')",2000);
                    if(count>3){
                        clearTimeout(time);
                    }
                }
            }else{
                faldia({
                    content: '请求失败',
                    'fn': function() {
                        location.reload();
                    }
                });
            }
        }
    })
}



function sucText(){
    $(".change a").text('委托更新');
    $(".change").attr("disabled",true);
    sucdia({
        content:"委托更新成功",
        'fn':function(){
            location.reload()
        }
    });
}

function falText(){
    $(".change a").text('委托更新');
    $(".change").attr("disabled",true);
    faldia({
        content:"亲，不要着急，慢慢来哦！！！",
        'fn':function(){
            location.reload()
        }
    });
}

function commentNew(){
    var companykey     =  $("#unique").val();
    var content        =  $("#commentcontentnew").val();
    if($.trim(content)==''){
        faldia('请输入评论内容');
        return false;
    }else{
        $.ajax({
            type:'POST',
            url:INDEX_URL+'/company_commentnew',
            dataType:'json',
            data:{
                companykey:companykey,
                content:content
            },
            success:function(rs){
                if(rs.code==200){
                    sucdia({'content':'评论成功','fn':function(){
                        location.reload();
                    }});
                }else if(rs.code==205){
                    faldia('包含敏感词');
                }else{
                    if(rs.msg=='请输入完整参数'){
                        rs.msg = '请输入评论内容'
                    }else if(rs.msg=='content允许最多500个字符'){
                        rs.msg = '内容允许最多500个字符'
                    }
                    faldia('评论失败：'+rs.msg);
                }
            }
        })
    }
}


//发表评论
function postComment(tab){
    var tab = arguments[0] ? 'job' : 'base';
    var companykey     =  $("#unique").val();
    var content        =  $("#commentcontent").val();
    var email          =  $("#companyemail").val();
    if( $.trim(content)==''){
        faldia({
            content:"请输入评论内容"
        });
        return false;
    }else{
        $.ajax({
            type:'POST',
            url:INDEX_URL+'/company_commentAdd',
            data:'companykey='+companykey+'&content='+content+'&email='+email,
            success:function(msg){
                //console.log(msg.success);
                //var obj = JSON.parse(msg);
                if(msg.success==true){
                    sucdia({content:"你评论了一家公司~ 获得 5 积分！"});
                    if(tab == 'base'){
                        getTabList(1,'base','comment');
                    }else{
                        getTabList(1,'job','comment2');
                    }
                    $("#commentcontent").val('');
                }else{
                    faldia({
                        content: '亲，好像出什么错了，请稍后重试'
                    });
                }
            }
        })
    }

}





//删除评论
function delComment(id,companykey){
    $.post(INDEX_URL+'/company_commentDel?id='+id+'&companykey='+companykey,function(rs){
        if(rs.success)  sucdia({
            content:"删除成功",
            'fn':function(){
                getTabList(1,'base','comment');
            }
        });
        else{
            faldia({
                content: rs.msg,
                'fn': function() {
                    if (rs['code'] == 1){
                        location.href = INDEX_URL+"/user_login";
                    }
                }
            });
        }
    },'json');

}

//分享地址
var timestamp;var nonceStr;var signature;
function startRequest()
{
    var unique       = $("#unique").val();
    var companyname  = $("#companyname").val();

    var share = $('#qrcode').attr('data');
    if(share==1) return false;
    xmlHttp = new XMLHttpRequest();
    try
    {
        xmlHttp.onreadystatechange = handleStateChange;
        xmlHttp.open("GET", "http://wechat.qichacha.com/enterprises/w1/getShareURLForDetail?category=4&province=&companyName="+companyname+"&key="+unique, true);
        xmlHttp.send();
    }
    catch(exception)
    {
        alert("xmlHttp Fail");
    }
}
function handleStateChange()
{
    if(xmlHttp.readyState == 4)
    {
        if (xmlHttp.status == 200 || xmlHttp.status == 0)
        {
            var result = xmlHttp.responseText;

            var data = eval("(" + result + ")");
            // var shareUrl =  data.data;
            var str = data.data;
            $('#qrcode').qrcode(str);
            $('#qrcode').attr('data',1);
        }
    }
}

function showmap(){

    /*弹窗大地图*/
    var map = new BMap.Map("allmap");
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.MapTypeControl());
    map.addControl(new BMap.OverviewMapControl());
    map.enableScrollWheelZoom(true);
    // 创建地址解析器实例
    var gc = new BMap.Geocoder();
    $(function(){
        $('#mapPreview').bind('click',function(){
            //$.colorbox({inline:true, href:"#baiduMap",title:"公司地址"});
            var address = "{{$company.Address}}";
            var city = "{{$shen}}";
            var lat = $('#positionLat').val();
            var lng = $('#positionLng').val();
            map.setCurrentCity(city);
            map.setZoom(12);
            gc.getPoint(address, function(point){
                if (point) {
                    var p = new BMap.Point(point.lng, point.lat);
                    var marker = new BMap.Marker(p);  // 创建标注
                    map.addOverlay(marker);              // 将标注添加到地图中
                    setTimeout(function(){
                        map.centerAndZoom(p, 15);
                    },1000);
                    map.setZoom(14);
                    var sContent =
                        "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>"+city+"</h4>" +
                        "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>"+address+"</p>" +
                        "</div>";
                    var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
                    //图片加载完毕重绘infowindow
                    marker.openInfoWindow(infoWindow);
                }
            }, city);

        });

    });
}

var tdropFilterOption = {};

//公司维度表格筛选
function tdropFilter(tab,box,option,value,desc){
    var ajaxData = {
        tab:tab,
        box:box,
        p:1,
        unique:$("#unique").val(),
        companyname:$("#companyname").val(),
    };
    ajaxData[option] = value;
    ajaxData[option+'desc'] = desc;
    getTabListNew(ajaxData);
    if(!tdropFilterOption[box]){
        tdropFilterOption[box] = {};
    }
    tdropFilterOption[box][option] = {value:value,desc:desc}
    
}

//拼装参数
function getAjaxData(page,tab,box){
    var unique       = $("#unique").val();
    var companyname  = $("#companyname").val();
    var ajaxData = {'unique':unique,'companyname':companyname,'p':page,'tab':tab,'box':box};
    var optionArr = [];
    var hiddenName = '';
    var hiddenValue = '';
    switch(box){
        case 'branche':
            optionArr = ['branchestatus'];
            break;
        case 'touzi':
            optionArr = ['touzistatus','touziratio','touzicapi'];
            break;
        case 'partners':
            optionArr = ['partnersratio','partnerscapi','capiUnit'];
            break;
        case 'wenshu':
            optionArr = ['casetype','casereason','wsparticipant'];
            break;
        case 'shixin':
            optionArr = ['courtyear','executestatus'];
            break;
        case 'hisshixin':
            optionArr = ['hiscourtyear','hisexecutestatus'];
            break;
        case 'case':
            optionArr = ['caseltype','caselreason','caselround','caselTag'];
            break;
        case 'news':
            optionArr = ['newstags','newsimpact','newstime'];
            break;
        case 'supplier':
            optionArr = ['supplieryear'];
            break;
        case 'customer':
            optionArr = ['customeryear'];
            break;
        case 'hisjudgement':
            optionArr = ['hiscasetype','hiscasereason','hiswsparticipant'];
            break;
        case 'shangbiao':
            optionArr = ['sbappdateyear','sbstatus','sbflowno','sbintcls'];
            break;
        case 'zhuanli':
            optionArr = ['zlpublicationyear','zlipclist','zlkindcode','zllegalstatus'];
            break;
        case 'zhengshu':
            optionArr = ['zscertCategory'];
            break;
        case 'yb':
            optionArr = ['ybtype'];
            break;
        case 'sumptuary':
            optionArr = ['sumtype','sumcourtyear'];
            break;
        case 'sgg':
            optionArr = ['sggcategory','sggpublishYear'];
            break;
        case 'rgg':
            optionArr = ['rggcategory','rggpublishYear'];
            break;
        case 'ryb':
            optionArr = ['rybrate','rybcategory','rybpublishYear'];
            break;
        case 'hissumptuary':
            optionArr = ['hissumcourtyear','hissumtype'];
            break;
        case 'gonggao':
            optionArr = ['ggparticipant','ggcasetype','ggcourtyear'];
            break;
        case 'hiscta':
            optionArr = ['hisggparticipant','hisggcasetype','hisggcourtyear'];
            break;
        case 'landmortgage':
            optionArr = ['ldtype'];
            break;
        case 'lian':
            optionArr = ['latype'];
            break;
        case 'dnotice':
            optionArr = ['dntype','dncasereason','dncourtyear'];
            break;
        case 'pn':
            optionArr = ['pntype','pjtype'];
            break;
        case 'bankruptcy':
            optionArr = ['bktype'];
            break;
        case 'inquiryevaluation':
            optionArr = ['intype','incaseno'];
            break;
        case 'notice':
            optionArr = ['nttype','ntcasereason'];
            break;
        case 'hiscsa':
            optionArr = ['hiscscasereason','hiscstype'];
            break;
        case 'assistance':
            optionArr = ['asstype'];
            break;
        case 'hisassistance':
            optionArr = ['hisasstype'];
            break;
        case 'pledge':
            optionArr = ['pletype','plestatus'];
            break;
        case 'hispledge':
            optionArr = ['hispletype','hisplestatus'];
            break;
        case 'spledge':
            optionArr = ['spletype','splestatus'];
            break;
        case 'tender':
            optionArr = ['tenderPublishYear','tenderProgress','tenderProvince'];
            break;
        default :
            break;
    }
    for(var i=0;i<optionArr.length;i++){
        hiddenName = optionArr[i];
        hiddenValue = $("input[name=" + hiddenName + "]").val();
        ajaxData[hiddenName] = hiddenValue;
    }
    if(tab=='hkstock'){
        ajaxData['stockCode'] = $("#stockCode").val()
    }
    return ajaxData;
}

//排序还原参数
function addTsortParam(box,ajaxData){
    var tsortArr =  $('#'+box+'list').find('.tsort-icon');
    if(tsortArr.length>0){
         $.each(tsortArr,function(i,tsortDom){
            if($(tsortDom).hasClass('asc')){
                ajaxData.sortField = $(tsortDom).attr('data-field');
                ajaxData.isAsc = 'true';
            }else if($(tsortDom).hasClass('desc')){
                ajaxData.sortField = $(tsortDom).attr('data-field');
                ajaxData.isAsc = 'false';
            }
        })
    }
}

//获取公司分页列表内容 主要分页用
function getTabList(page,tab,box){
    var ajaxData = getAjaxData(page,tab,box);
    addTsortParam(box,ajaxData);
    var url = INDEX_URL+"/company_getinfos";
    if(tdropFilterOption[box]){
        $.each(tdropFilterOption[box],function(tkey,tvo){
            if(tvo.value){
                ajaxData[tkey] = tvo.value;
                ajaxData[tkey+'desc'] = tvo.desc;
            }  
        })
    }
    $.ajax({
        type:'GET',
        dataType:"html",
        url:url,
        data:ajaxData,
        success:function(data){
            if(data){
                var tabBox = '#' + box + 'list';
                keepTabFilter(tabBox);
                $(tabBox).html(data);
                boxScrollNew(tabBox)
            }
        }
    })
}

//获取公司分页列表内容(筛选条件)
function getTabListNew(ajaxData){
    var url = INDEX_URL+"/company_getinfos";
    $.ajax({
        type:'GET',
        dataType:"html",
        url:url,
        data:ajaxData,
        success:function(data){
            if(data){
                var tabBox = '#' + ajaxData['box'] + 'list';
                if(data.indexOf("<title>会员登录") > 0){
                    getCaptcha();
                    $('#loginModal').modal('show');
                }else{
                    keepTabFilter(tabBox);
                    $(tabBox).html(data);
                }
                //$.scrollTo(tabBox,100);
            }
        }
    })
}

//筛选后条件不变
function keepTabFilter(tabBox){
    if($.inArray(tabBox,['#branchelist','#zhengshulist','#landmortgagelist','#lianlist'])>-1){
        var dropdownMenusHtmls = []
        $.each($(tabBox).find('.dropdown-menu'),function(i,v){
            dropdownMenusHtmls.push($(v).html());
        })
        setTimeout(function() {
            $.each($(tabBox).find('.dropdown-menu'),function(i,v){
                $(v).html(dropdownMenusHtmls[i])
            })
        }, 10);
    }    
}

//列表排序 翻页有问题
function sortTabList(dom,tab,box,sortField){
    if(!userId){
        $('#loginModal').modal('show');
        getCaptcha();
        return;
    }
    var ajaxData = getAjaxData(1,tab,box);
    ajaxData.sortField = sortField
    if($(dom).find('.tsort-icon').hasClass('asc')){
        ajaxData.isAsc = 'false';
    }else{
        ajaxData.isAsc = 'true';
    }
    getTabListNew(ajaxData);
    // if($(dom).find('.tsort-icon').hasClass('asc')){
    //     $(dom).find('.tsort-icon').addClass('desc')
    // }else{
    //     $(dom).find('.tsort-icon').addClass('asc')
    // }
}

function boxScroll(tabBox,obj){
    try{
        obj ? $(obj).scrollTo(tabBox,100) : $.scrollTo(tabBox,100);
    }catch(e){
        var sub = $(tabBox)[0];
        $(obj)[0].scrollTop = sub.offsetTop + 100;
    }
}

//根据年度筛选财务信息
function financeYearChoose(obj) {
    var companykey = $("#unique").val();
    var companyname = $("#companyname").val();
    var box = $(obj).attr('data-option');
    var year = $(obj).attr('data-value');
    $.ajax({
        type: 'GET',
        dataType: "html",
        url: INDEX_URL+"/company_getinfos",
        data: {unique:companykey,companyname:companyname,tab:'base',box:box,year:year},
        success: function (data) {
            if (data) {
                var tabBox = '#' + box + 'list';
                var tabBoxHeader = '#' + box + 'Header';
                var text = year == '0' ? '最近数据' : year + '年度';
                var offsetHight = $(window).scrollTop() >= 200 ? $('#company-nav').height()*2 : $('#company-nav').height()*4;
                $(tabBox).html(data);
                $(obj).parent().parent().prev().find('span').first().text(text);
                // $.scrollTo(tabBoxHeader,100,{ offset:{ top: -offsetHight} });
            }
        }
    })
}
//港股根据年度筛选财务信息
function hkStockYearChooseYear(year,box){
    var companykey = $("#unique").val();
    var companyname = $("#companyname").val();
    
    $.ajax({
        type: 'GET',
        dataType: "html",
        url: INDEX_URL+"/company_getinfos",
        data: {unique:companykey,companyname:companyname,tab:'base',box:box,year:year},
        success: function (data) {
            if (data) {
                var tabBox = '#' + box + 'list';
                $(tabBox).html(data);
            }
        }
    })
}

//委托联系
$('.delegationSubmit').on('click',function(){
    var content = $.trim($(".delegationContent").val());
    var email = $.trim($(".delegationEmail").val());
    var phone = $.trim($(".delegationPhone").val());
    var companykey = $(".delegationCompanykey").val();
    var phoneRegExp = /^15[^4]{1}\d{8}$|^17[0,6,7,8]{1}\d{8}$|^18[\d]{9}$/;
    var employeeId = $("input[name='delegationEmployee']").val();
    if(content==""){
        faldia({content:"请输入内容！"});
        return false;
    }
    if(phone==""){
        faldia({content:"请输入手机号码！"});
        return false;
    }
    if(email==""){
        faldia({content:"请输入电子邮箱！"});
        return false;
    }
    if (!phoneRegExp.test(phone)) {
        //faldia({content:"手机号码不正确！"});
        //return false;
    }
    if(!email.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)) {
        faldia({content:"邮箱格式不正确！"});
        return false;
    }
    $.ajax({
        type: 'POST',
        url:INDEX_URL+'/user_contactCompany',
        data:{companykey:companykey,content:content,phone:phone,email:email,employeeId:employeeId},
        success: function(result){
            if(result.success){
                sucdia({content:"提交成功！"});
                $(".delegationContent").val('');
                $(".delegationEmail").val('');
                $(".delegationPhone").val('');
                window.location.reload();
            }else{
                faldia(result.msg);
            }
        }
    });
});

//委托联系
$('.transferFilesSubmit').on('click',function(){
    var phone = $.trim($(".transferFilesPhone").val());
    var name = $.trim($(".transferFilesName").val());
    var type = $.trim($(".transferFilesType").val());
    var companykey = $.trim($(".transferFilesCompanykey").val());
    var phoneRegExp = /^1\d{10}$/;
    if(phone==""){
        faldia({content:"请输入手机号码！"});
        return false;
    }
    if(name==""){
        faldia({content:"请输入真实姓名！"});
        return false;
    }
    if (!phoneRegExp.test(phone)) {
        faldia({content:"手机号码不正确！"});
        return false;
    }
    $.ajax({
        type: 'POST',
        url:INDEX_URL+'/user_transferFiles',
        data:{companykey:companykey,phone:phone,name:name,type:type},
        success: function(result){
            if(result.success){
                sucdia({content:"提交成功！"});
                $(".delegationContent").val('');
                $(".delegationEmail").val('');
                $(".delegationPhone").val('');
                window.location.reload();
            }else{
                faldia({content:"提交失败！"});
            }
        }
    });
});

function changeEmployee(id){
    $("input[name='delegationEmployee']").val(id);
}

//写笔记
$('.noteSubmit').on('click',function(){
    var content = $.trim($(".noteContent").val());
    var companykey = $(".noteCompanykey").val();
    var companyname = $(".noteCompanyname").val();
    if(content==""){
        faldia({content:"请输入内容！"});
        return false;
    }
    $.ajax({
        type: 'POST',
        url:INDEX_URL+'/user_writeNote',
        data:{companykey:companykey,companyname:companyname,content:content},
        success: function(result){
            if(result.success){
                sucdia({content:"提交成功！"});
                $(".noteContent").val('');
                window.location.reload();
            }else{
                faldia({content:"提交失败！"});
            }
        }
    });
});

//删除笔记
function delNote(id) {
    var companykey = $(".noteCompanykey").val();
    $.ajax({
        type: 'POST',
        url: INDEX_URL+'/user_delNote',
        data: {companykey: companykey,id:id},
        success: function (result) {
            if (result.success) {
                sucdia({content: "删除成功！"});
                window.location.reload();
            } else {
                faldia({content: "删除失败！"});
            }
        }
    });
}

Date.prototype.bformat = function(format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                    ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}

function getNoteList(companykey){
    $('#nNoteContent').val('');
    $('#nNoteId').val('');
    $.ajax({
        type: 'GET',
        url: INDEX_URL+'/company_notelist',
        dataType:'json',
        data: {companykey: companykey},
        success: function (notelist) {
            if(notelist&&notelist.length>0){
                var html = '';
                $.each(notelist,function(i,v){
                    var newDate = new Date();
                    newDate.setTime(v.update_time*1000);
                    v.update_time = newDate.bformat('yyyy-MM-dd hh:mm');
                    html+='<div class="item clearfix"><div class="content">'+v.content;
                    html+='<div class="time">'+v.update_time+'</div></div>';
                    html+='<div class="opericon">';

                    html+='<span onclick="noteEdit(\''+v.note_id+'\',\''+encodeURI(v.content)+'\')" class="edit"></span>';
                    html+='<span onclick="noteDel(\''+v.note_id+'\',\''+companykey+'\')" class="delete"></span>';
                    html+='</div></div>'
                });
                $('#nNodeList').html(html);
                $('#nNodeList').show();
                $('#nNodeCount').text(notelist.length);
            }else{
                $('#nNodeList').html('');
                $('#nNodeList').hide();
                $('#nNodeCount').text('');
            }
            
        }
    });
}

function noteSave(companykey,companyname,dom){
    var nodeContent = $('#nNoteContent').val();
    var nodeId = $('#nNoteId').val();
    if(!nodeContent||nodeContent==""){
        faldia({content:"请输入内容！"});
        return false;
    }
    if(nodeId){
        $.ajax({
            type: 'POST',
            url:INDEX_URL+'/user_editNote',
            data:{id:nodeId,content:nodeContent},
            success: function(result){
                if(result.success){
                    sucdia({content:"编辑成功！"});
                    getNoteList(companykey);
                    setTimeout(function() {
                        $('#nNodeList').animate({scrollTop:0},300);
                    }, 500);
                }else{
                    faldia({content:"编辑失败 "+result.msg});
                }
                $(dom).removeAttr('disabled');

            }
        });
    }else{
        $.ajax({
            type: 'POST',
            url:INDEX_URL+'/user_writeNote',
            data:{companykey:companykey,companyname:companyname,content:nodeContent},
            success: function(result){
                if(result.success){
                    sucdia({content:"提交成功！"});
                    getNoteList(companykey);
                    setTimeout(function() {
                        $('#nNodeList').animate({scrollTop:0},300);
                    }, 500);
                }else{
                    faldia({content:"提交失败 "+result.msg});
                }
                $(dom).removeAttr('disabled');
            }
        });
    }
    $(dom).attr('disabled',"true");
}

function noteEdit(id,content){
    $('#nNoteId').val(id);
    $('#nNoteContent').val(decodeURI(content));
    $('#nNoteContent').focus();
}

function noteDel(id,companykey){
    $.ajax({
        type: 'POST',
        url: INDEX_URL+'/user_delNote',
        data: {companykey: companykey,id:id},
        success: function (result) {
            if (result.success) {
                sucdia({content: "删除成功！"});
                getNoteList(companykey);
                
            }
        }
    });
}


function managerInfo(){
    var p = arguments[0];
    var infokind = arguments[1];
    var tab = arguments[2];
    var tabObj = '#' + tab + 'List';
    var companykey = $("input[name='managerInfoCompanykey']").val();
    var companyname = $("input[name='managerInfoCompanyname']").val();
    var name = $("input[name='managerInfoName']").val();
    $.ajax({
        url: INDEX_URL+'/company_managerInfoStatus',
        type: 'post',
        data:{companykey:companykey,companyname:companyname,name:name,infokind:infokind,tab:tab,p:p},
        dataType:'html',
        success: function (result) {
            console.log(result);
            if(result){
                $(tabObj).html(result);
            }
        }
    });
}

function payInfo(){
    var p = arguments[0];
    var infokind = arguments[1];
    var ajax = arguments[2];
    var ajaxObj = '#' + ajax + 'List';
    var companykey = $("input[name='hiddenKey']").val();
    var companyname = $("input[name='hiddenName']").val();
    $.ajax({
        url: INDEX_URL+'/company_getinfos',
        type: 'get',
        data:{tab:'pay',infokind:infokind,ajax:ajax,unique:companykey,companyname:companyname,p:p},
        dataType:'html',
        success: function (result) {
            console.log(result);
            if(result){
                $(ajaxObj).html(result);
            }
        }
    });
}

function addRadar(obj,companykey,flag,username){
    if(!userId){
        $('#loginModal').modal('show');
        getCaptcha();
        return;
    }
    var img_ = 'fxsm2';
    if(userGroupid != '43' && flag){
        if(username){
            img_ = 'fxsmP';
            zhugeTrack('开通VIP',{'弹窗来源':'人员主页-风险监控'});
        }else{
            img_ = 'fxsmC';
            zhugeTrack('开通VIP',{'弹窗来源':'企业主页-风险监控'});
        }
        showVipModal('风险监控','成为VIP会员 即可实时获取关注企业和人员的工商信息和风险信息变动',img_)
        return;
    }
    if(username){
        var isPerson = '1';
        var username = username;
    }else{
        var isPerson = '';
        var username = '';
    }
    var radarFlag = true;
    if(radarFlag) {
        radarFlag = false;
        $.get('/radar_addOrRemove', {
            companykey: companykey,
            flag: flag,
            isPerson: isPerson,
            username: username
        }, function (result) {
            if(result.msg == 'VIP功能'){
                showVipModal('风险监控','成为VIP会员 即可实时获取关注企业和人员的工商信息和风险信息变动','fxsm2')
                return;
            }
            if (result.success) {
                if (flag) {//添加
                    if (username) {
                        $(obj).attr('onclick', 'addRadar(this,"' + companykey + '",' + false + ',"' + username + '");');
                    } else {
                        $(obj).attr('onclick', 'addRadar(this,"' + companykey + '",' + false + ');');
                    }
                    $(obj).addClass('ca_active');
                    $(obj).html($(obj).html().replace('监控风险','已监控'));
                } else {
                    if (username) {
                        $(obj).attr('onclick', 'addRadar(this,"' + companykey + '",' + true + ',"' + username + '");');
                    } else {
                        $(obj).attr('onclick', 'addRadar(this,"' + companykey + '",' + true + ');');
                    }
                    $(obj).removeClass('ca_active');
                    $(obj).html($(obj).html().replace('已监控','监控风险'));
                }
                if((userGroupid==43 || userGroupid==73) && flag){
                    warndia({content:'监控成功，'+ result.msg});
                }else if(userGroupid==11 && flag) {
                    warndia({content: '监控成功，升级VIP可查看风险详情'});
                }else{
                    if(!flag){
                        sucdia({content: "成功取消监控"});
                    }else{
                        sucdia({content: "操作成功"});
                    }
                } 
            } else {
                radarFlag = true;
                if(result.code==10){
                    //$('#radarTsModal').modal('show');
                    if(isPerson){
                        //$('#radarTsModal .modal-body>p').html(result.msg+'，升级SVIP会员最多可监控500位人员。')
                        showSVipModal('升级SVIP会员','升级SVIP会员最多可监控500位人员','fxsm2')
                        return;
                    }else{
                        //$('#radarTsModal .modal-body>p').html(result.msg+'，升级SVIP会员最多可监控500家企业。')
                        showSVipModal('升级SVIP会员','升级SVIP会员最多可监控500家企业','fxsm2')
                        return;
                    }
                    //$('#radarTsModal .modal-footer').html('<a href="'+INDEX_URL+'/vip_svip" class="btn btn-primary pull-right">立即开通</a>')
                }else if(result.code==11){
                    $('#radarTsModal').modal('show');
                    if(isPerson){
                        $('#radarTsModal .modal-body>p').html(result.msg+'，请前往监控列表删除部分人员后继续添加。')
                        $('#radarTsModal .modal-footer').html('<a target="_blank" href="'+INDEX_URL+'/monitor_radarlist" class="btn btn-primary pull-right">立即前往</a>')
                    }else{
                        $('#radarTsModal .modal-body>p').html(result.msg+'，请前往监控列表删除部分企业后继续添加。')
                        $('#radarTsModal .modal-footer').html('<a target="_blank" href="'+INDEX_URL+'/monitor_radarlist" class="btn btn-primary pull-right">立即前往</a>')
                    }
                }else{
                    faldia({content: "操作失败:" + result.msg});
                }
                
            }
        });
    }
}
String.prototype.isEmpty = function () {
    var s1 = this.replace(/[\r\n]/g, '').replace(/[ ]/g, ''),
        s2 = (s1 == '') ? true : false;
    return s2;
};
function ipoDetail(code,ipoType,keyno){
    location.href = INDEX_URL+'/company_ipoview?code=' +code+'&ipoType='+ipoType+'&keyno='+keyno;
}

function getIpoList(p,type,code){
    $.ajax({
        url: INDEX_URL+'/company_ipoview',
        type: 'get',
        data:{code:code,ajaxFlag:'1',type:type,p:p},
        dataType:'html',
        success: function (result) {
            var dom = '#' + type + 'List';
            $(dom).html(result);
            boxScrollNew(dom)
        }
    });
}

function jumpTo51(id){
    $.ajax({
        url: INDEX_URL+'/company_lietou',
        type: 'get',
        data:{id:id},
        success: function (result) {
            if(result.success){
                window.location.href = result.url;
            }
        }
    });
}

function showHistoryTip(){
    // if(Prefs.Get('firstht').length==0){
    //     $('#protGltu').show();
    //     $(document).click(function(){
    //         $('#protGltu').fadeOut();
    //     });
    //     Prefs.Set('firstht','[1]');
    // }
}

function showGroupTip(){
    if(Prefs.Get('firstgroup').length==0){
        $('#firstgroupModal').modal('show');
        Prefs.Set('firstgroup','[1]');
    }
}

function showEpdadTip(){
    if(Prefs.Get('firstepdad').length==0){
        $('#firstepdadModal').modal('show');
        Prefs.Set('firstepdad','[1]');
    }
}

function showCaseTip(){
    if(Prefs.Get('firstcase').length==0){
        $('#firstcaseModal').modal('show');
        Prefs.Set('firstcase','[1]');
    }
}

//委托联系(2,联系公司)
formset({
    "id":"contactCompany",
    "url":"user_contactCompany",
    "rule":{
        "name":{
            required:true
        },
        "phone":{
            required:true,
            ismobile:true
        },
        "email":{
            required:true,
            email:true
        },
        "companyName":{
            required:true
        },
        "industry":{
            required:true
        },
        "job":{
            required:true
        },
        "content":{
            required:true
        }
    },
    "messages":{
        "name":{
            required:"请输入姓名"
        },
        "phone":{
            required:"请输入手机号",
            ismobile:"请输入正确格式的手机号"
        },
        "email":{
            required:"请输入邮箱",
            email:"请输入正确格式的邮箱"
        },
        "companyName":{
            required:"请输入公司名称"
        },
        "industry":{
            required:"请输入所在行业"
        },
        "job":{
            required:"请输入职位"
        },
        "content":{
            required:"请输入委托事由"
        }
    },
    "sucfunc":function(){
        sucdia('提交成功');
        $('#contactModal .close').click();
    },
    "falfunc":function(result){
        faldia(result.msg);
    }
});

//委托联系(2,联系公司) 最近表单信息
function getLstContactCompany(){
    $.get(INDEX_URL+'/user_getLstContactCompany',function(result){
        if(result.success){
            $("#contactCompany input[name='name']").val(result.data.user_name);
            $("#contactCompany input[name='companyName']").val(result.data.user_company_name);
            $("#contactCompany textarea[name='content']").val(result.data.content);
            $("#contactCompany input[name='email']").val(result.data.email);
            $("#contactCompany input[name='phone']").val(result.data.phone);
            $("#contactCompany input[name='industry']").val(result.data.industry);
            $("#contactCompany input[name='job']").val(result.data.job);
        }
    });
}

//委托联系(2,联系公司) 邮件预览
function contactCompanyPreview(){
    if($('#contactForm').is(":hidden")){
        $('#contactForm').show();
        $('#contactPreview').hide();
        $('#ylBtn').text('邮件预览');

    }else{
        $('#contactForm').hide();
        $('#contactPreview').show();
        $('#ylBtn').text('取消预览');
        $('#ylCompanyName').text($('#contactCompany input[name="companyName"]').val());
        $('#ylName').text($('#contactCompany input[name="name"]').val());
        $('#ylIndustry').text($('#contactCompany input[name="industry"]').val());
        $('#ylJob').text($('#contactCompany input[name="job"]').val());
        $('#ylPhone').text($('#contactCompany input[name="phone"]').val());
        $('#ylEmail').text($('#contactCompany input[name="email"]').val());
        $('#ylContent').text($('#contactCompany textarea[name="content"]').val());
        $('#ylName2').text($('#contactCompany input[name="name"]').val());
    }

    // var toCompanyName = $('#contactCompany input[name="toCompanyName"]').val();
    // var companyName = $('#contactCompany input[name="companyName"]').val();
    // var name = $('#contactCompany input[name="name"]').val();
    // var industry = $('#contactCompany input[name="industry"]').val();
    // var job = $('#contactCompany input[name="job"]').val();
    // var phone = $('#contactCompany input[name="phone"]').val();
    // var email = $('#contactCompany input[name="email"]').val();
    // var content = $('#contactCompany textarea[name="content"]').val();
    // var params = {
    //     toCompanyName:toCompanyName,
    //     companyName:companyName,
    //     name:name,
    //     industry:industry,
    //     job:job,
    //     phone:phone,
    //     email:email,
    //     content:content
    // };
    // var query = $.param(params);
    // $('#iframeContact').attr('src',INDEX_URL+'/more_deputeemail?' + query);
}

$('.contactCompany2').on('click',function(){
    $('#contactModalYl .close').click();
    $('.contactCompany1').click();
});

function drawGuquanStatic(companyName,guquanData){
    if(!guquanData){
        $('#guquanStatic').parent().html('暂无');
        return;
    }
    var svgId = "guquanStatic";
    $.each(guquanData,function(i,v){

        v.Name = v.StockName;
        v.SubConAmt = v.ShouldCapi;
        v.FundedRatio = v.StockPercent;

    });
    if(guquanData[0] && guquanData[1] && guquanData[0].FundedRatio!=guquanData[1].FundedRatio){
        guquanData[0].LargePartner = "大股东";
    }
    var rootData = {
        Name:companyName,
        Children:guquanData
    }
    rootData.x0 = 0;
    rootData.y0 = 0;
    var i=0;
    var barHeight = 50;
    var barWidth = 335;
    var duration = 400;
    var tree = d3.layout.tree()
        .children(function (d) {
            return d.Children;
        })
        .nodeSize([0, 20]);

    var diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.y, d.x]; });

    var svg = d3.select("#"+svgId).append("svg");
    $("#"+svgId+" svg").empty();

    var width = $("#"+svgId).width();
    var height = $("#"+svgId).height();

    svg.attr("width",width-15);
    svg.attr("height",height-15);

    container = svg.append("g");

    nodes = tree.nodes(rootData);

    update(rootData);

    initLocation();

    function initLocation(){
        container.attr("transform", "translate(12,22) scale(0.8)");
    }

    function update(source) {

        if(source.Name.length>24){
            source.Name = source.Name.substr(0,23)+'…';
        }
        nodes = tree.nodes(rootData);
        svg.attr("height",Math.max(480, 55*nodes.length+120));
        var svgHeight = Math.max(500, nodes.length * barHeight);

        d3.select(self.frameElement).style("height", svgHeight + "px");

        nodes.forEach(function(n, i) {
            n.x = i * (barHeight+5);
        });


        var node = container.selectAll("g.node")
            .data(nodes, function(d) { return d.id || (d.id = ++i); });

        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
            .style("opacity", 1e-6);


        nodeEnter.append("rect")
            .attr("y", function (d) {

                if(d.depth==0){
                    return -barHeight/2
                }else{
                    return -15;
                }
            })
            .attr("height", barHeight)
            .attr("width", barWidth)
            .style("stroke", "#999999")
            .attr("fill","#ffffff")
            .attr('fill-opacity',0)
            .attr("stroke-width",0.5);

        nodeEnter.append("rect")
            .attr("y", function (d) {
                if(d.depth==0){
                    return -barHeight/2
                }else{
                    return -15;
                }
            })
            .attr("height", barHeight)
            .attr("width", 5)
            .style("fill", color)
            .style("fill-opacity",1);

        nodeEnter.append("text")
            .attr("dy", 3.5)
            .attr("dx", 30.5)
            .text(function(d) {
                return d.Name;
            })
            .attr("fill","#333333")
            .style("font-size", "12px")
            .style("font-weight","bold");

        nodeEnter.append("text")
            .attr("dy", 15.5)
            .attr("dx", barWidth-30)
            .text(function (d) {
                if(d.depth>0&&d.Category==1){
                    if(d.KeyNo){
                        return "详情";
                    }else{
                        return "";
                    }
                }else{
                    return "";
                }
            })
            .style("font-size","12px")
            .style("cursor","pointer")
            .attr("fill","#128bed");
        nodeEnter.append("text")
            .attr("dy", 20.5)
            .attr("dx", 30.5)
            .style("font","11px sans-serif")
            .attr("fill","#666666")
            .text(function(d) {
                if(d.depth==0){
                    return "";
                }else{
                    return "股权比例：";
                }
            });
        nodeEnter.append("text")
            .attr("dy", 20.5)
            .attr("dx", 95.5)
            .style("font","11px sans-serif")
            .attr("fill","#ff7e00")
            .text(function(d) {
                if(d.depth==0){
                    return "";
                }else{
                    if(d.FundedRatio){
                        return (parseFloat(d.FundedRatio.substr(0,d.FundedRatio.length-1)).toFixed(2)+'%'||"-");
                    }else{
                        return '-';
                    }
                    
                }
            });
        nodeEnter.append("text")
            .attr("dy", 20.5)
            .attr("dx", 150.5)
            .style("font","11px sans-serif")
            .attr("fill","#666666")
            .text(function(d) {
                if(d.depth==0){
                    return "";
                }else{
                    return "认缴金额：";
                }
            });
        nodeEnter.append("text")
            .attr("dy", 20.5)
            .attr("dx", 215.5)
            .style("font","11px sans-serif")
            .attr("fill","#ff7e00")
            .text(function(d) {
                if(d.depth==0){
                    return "";
                }else{
                    if(d.SubConAmt){
                        if(d.SubConAmt.indexOf("万元")>0){
                            var index = d.SubConAmt.indexOf("万元");
                            return encodeURI(parseFloat(d.SubConAmt).toFixed(2)).substr(0,index)+"\." + "万元";
                        }else{
                            return parseFloat(d.SubConAmt).toFixed(2)+'万元';
                        }
                    }
                    return "-";
                }
            });
        nodeEnter.append("path")
            .attr("d", function (d) {
                if(d.depth==0){
                    if(d._Children){
                        return "M7 -2 H11 V-6 H13 V-2 H17 V0 H13 V4 H11 V0 H7 Z"
                    }else if(d.Children){
                        return "M7 -2 H17 V0 H7 Z"
                    }
                }else{
                    if(d._Children){
                        return "M7 6 H11 V2 H13 V6 H17 V8 H13 V12 H11 V8 H7 Z"
                    }else if(d.Children){
                        return "M7 6 H17 V8 H7 Z"
                    }
                }
            })
            .attr("fill","#bbbbbb")
            .on("click", function (d) {
                if(d.depth>0){
                    click(d);
                }
            });
        nodeEnter.append("circle")
            .attr("cx",12)
            .attr("cy",function (d) {
                if(d.depth==0){
                    return -1;
                }
                return 7;
            })
            .attr("r",function (d) {
                if(d._Children){
                    return "6"
                }else if(d.Children){
                    return "6"
                }
            })
            .attr("fill","none")
            .attr("stroke","#999999")
            .attr("stroke-width","0.5") ;


        nodeEnter.attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
            .style("opacity", 1);




        var link = container.selectAll("path.link")
            .data(tree.links(nodes), function(d) { return d.target.id; });

        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("fill","none")
            .attr("stroke-width","0.5px")
            .attr("stroke","#80c3a8")
            .attr("d", function(d) {
                var o = {x: source.x0, y: source.y0};
                return diagonal({source: o, target: o});
            })
            .style("stroke",function (d) {
                if(d.target.LargePartner=="大股东"){
                    return "#fe5151";
                }
            })
            .attr("d", diagonal)
            .style("stroke",function (d) {
                if(d.target.LargePartner=="大股东"){
                    return "#fe5151";
                }
            });
    }

    function color(d) {
        if(d.depth==0){
            return "#128bed";
        }else{
            if(d.LargePartner=="大股东"){
                return "#fe5151";
            }

            if(d.Category==1){
                return "#7985f3";
            }else{
                return "#4aceb1";
            }
        }

        return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
    }
}

function guquanDetail(keyno,name){
    $('#guquanModal').modal('show');
    if($('#guquanview').html().isEmpty()){
        $.ajax({
            url: INDEX_URL+'/company_guquanview',
            type: 'get',
            data:{keyno:keyno,name:name},
            dataType:'html',
            success: function (result) {
                $('#guquanview').html(result);
            }
        });
    }
}

function opercorDetail(name,personId,keyno){
    $('#opercorModal').modal('show');
    if($('#opercorview').html().isEmpty()){
        $.ajax({
            url: INDEX_URL+'/company_opercorview',
            type: 'get',
            data:{name:name,personId:personId,keyno:keyno},
            dataType:'html',
            success: function (result) {
                if(result){
                    $('#opercorview').html(result);
                }else{
                    $('#opercorview').parent().parent().parent().css('width','600px');
                    $('#opercorview').html('<div class="opercor-lvip"><p>非VIP用户一天只能查看2次</p><a href="/vip" onclick="" target="_blank" class="btn btn-primary">立即开通</a></div>');
                }

            }
        });
    }
}

function showHisTel(){
    $('#phoneModal').modal('show');
}

function showHisEmail(){
    $('#hisEmailModal').modal('show');
}

//变更记录筛选
function changeRecordsFilter(productName,dom){
    if(productName){
        $.each($('#Changelist table tr'),function(index,tr){
            if(index==0) return;
            $(tr).hide();
            if($(tr).attr('data-pname')==productName){
                $(tr).show();
            }
        });
        $(dom).parent().parent().parent().find('.changelisttype').text(productName);
    }else{
        $('#Changelist table tr').show();
        $(dom).parent().parent().parent().find('.changelisttype').text('全部类型');
    }
    var tx = 1;
    $.each($('#Changelist table tr'),function(index,tr){
        if(index==0) return;
        if(!$(tr).is(':hidden')){
            $(tr).children().eq(0).text(tx);
            tx ++;
        }
    });
    $('.changelistcount').text(tx-1);
    //$('#ChangelistTable').animate({scrollTop:0},300);
    //$('#ChangelistTable').slimScroll({ scrollTo : '0px' });
    
}

function gdTab(dom){
    $('#gdDropSpan').text($(dom).text());
    $('#gdExportSpan').attr('data-date',$(dom).text());
    setTimeout(function() {
        $(dom).parent().removeClass('active');
    }, 10);
}

function tnavTabgdTab(dom){
    $('#tnavTabgdDropSpan').text($(dom).text());
    $('#tnavTabgdExportSpan').attr('data-date',$(dom).text());
    setTimeout(function() {
        $(dom).parent().removeClass('active');
    }, 10);
}

function changeGdYear(date) {
    var stockCode = $('#stockCode').val()
    $.ajax({
        type:'get',
        url:INDEX_URL+'/company_getSanbanGdlist',
        data:{code:stockCode,date:date},
        dataType:'html',
        success:function(data){
            if(data){
                $('#gdList').html(data);
                $.scrollTo('#gdList',{duration: 100, offset: -96});
            }
        }
    })
}

function tnavTabChangeGdYear(date) {
    var stockCode = $('#sanbanStockCode').val()
    $.ajax({
        type:'get',
        url:INDEX_URL+'/company_getSanbanGdlist',
        data:{code:stockCode,date:date,tag:'tnavTab'},
        dataType:'html',
        success:function(data){
            if(data){
                $('#tenpartners').html(data);
            }
        }
    })
}

function chooseRunTab(box,source,tab,nologin){
    if(nologin){
        getCaptcha();
        $('#loginModal').modal('show');
        return;
    }
    var ajaxData = {};
    ajaxData['box'] = box;
    ajaxData['source'] = source;
    ajaxData['unique'] = $("#unique").val();
    ajaxData['companyname'] = $("#companyname").val();
    ajaxData['tab'] = tab;
    ajaxData['p'] = '1';
    getTabListNew(ajaxData);
}


 function getSCAN(keyno){
    $("#fapiao-title").show();
    if($('#qiye_taitou').length>0){
        var qrcode = new QRCode('qiye_taitou', {
            text: 'http://www.qichacha.com/qrcode_companyinfo?keyno='+keyno,
            width: 170,
            height: 170,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    }
    if($('#fapiao_taitou').length>0){
        var qrcode2 = new QRCode('fapiao_taitou', {
            text: 'http://www.qichacha.com/qrcode_invoiceinfo?keyno='+keyno,
            width: 170,
            height: 170,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    }
}

function staffQr(keyno) {
    if($('#qrcodeStaffQr').length>0 && !$('#qrcodeStaffQr').html()){
        $('#qrcodeStaffQr').empty();
        var qrcode3 = new QRCode('qrcodeStaffQr', {
            text: 'http://www.qichacha.com/qrcode_companyinfo?keyno='+keyno,
            width: 160,
            height: 160,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    }    
}

function changeQrTAB(flag,dom){
    $(dom).addClass('active');
    if(flag==1){
        $(dom).next().removeClass('active');
        $('#qiyeQrcode').show();
        $('#fapiaoQrcode').hide();
        var url = INDEX_URL+"/tax_getscan";
        
    }else{
        $(dom).prev().removeClass('active');
        $('#fapiaoQrcode').show();
        $('#qiyeQrcode').hide();
        
    }
}

function getTaxView(keyno){
    $.ajax({
        type:'get',
        url:INDEX_URL+'/tax_view',
        data:{keyno:keyno,ajaxflag:1},
        success:function(result){
            if(result.success){
                $('#fapiao-title .Name').text(result.data.Name || '暂无');
                $('#fapiao-title .CreditCode').text(result.data.CreditCode || '暂无');
                $('#fapiao-title .Address').text(result.data.Address || '暂无');
                $('#fapiao-title .PhoneNumber').text(result.data.PhoneNumber || '暂无');
                $('#fapiao-title .Bank').text(result.data.Bank || '暂无');
                $('#fapiao-title .Bankaccount').text(result.data.Bankaccount || '暂无');
                $('#fapiao-title .TaxView').show();
            }
        }
    })
}

var pScrollIndex = {
    product:0,
    staff:0
};
function pScroll(next,dom,flag){
    if($(dom).hasClass('disable')){
        return;
    }
    var width = parseInt($('.'+flag+' .scroll-wrap').css('width'));
    if(next){
        pScrollIndex[flag]++;
    }else{
        pScrollIndex[flag]--;
    }
    ml = -pScrollIndex[flag]*265;
    if(pScrollIndex[flag]>=0&&pScrollIndex[flag]<=width/265-1){
        $('.'+flag+' .scroll-wrap').css('margin-left',ml+'px');
    }
    if(pScrollIndex[flag]==0){
        $('.'+flag+' .scroll-btn.prev').addClass('disable'); 
    }else{
        $('.'+flag+' .scroll-btn.prev').removeClass('disable');
    }
    if(pScrollIndex[flag]==parseInt(width/265)-1){
       $('.'+flag+' .scroll-btn.next').addClass('disable'); 
    }else{
        $('.'+flag+' .scroll-btn.next').removeClass('disable');
    }
}

function jumpProduct(){
    companyNavPos = 'productlist';
    changeTab('run');
}

function jumpFinanceAn(){
    companyNavPos = 'cwsj';
    changeTab('base');
}

function jumpHistory(pos){
    companyNavPos = pos;
    changeTab('history');
}

function jumpPeopleHistory(pos){
    console.info(pos);
    boxScrollNew('#'+pos);
}

function jumpRelatRisk(keyno,pos,type){
    var relatedobj;
    if(type=='rc'){
        relatedobj = 1;
    }else if(type=='rp'){
        relatedobj = 2;
    }
    jumpUrl = INDEX_URL+'/risk?unique='+keyno+'&property=2&relatedobj='+relatedobj+'&fpos='+pos;
    window.open(jumpUrl);
}

function traJump(keyno,pos,type){
    if(!userId){
        $('#loginModal').modal('show');
        getCaptcha();
        return;
    }
    if(userGroupid!=43){
        if(keyno && !(inFreeCompanies(keyno) || inFreePeople(keyno))){
            zhugeTrack('开通VIP',{'弹窗名称':'企业主页-关联风险'});
            if(type=='his'){
                showVipModal('历史信息','成为VIP会员即可 查看历史工商变更、投资、股东、诉讼、受到的行政处罚等信息','lsglxx',null,null,true)
            }else{
                showVipModal('风险扫描','成为VIP会员 即可查看企业自身风险和关联风险','fxsm2','查看样例公司','https://www.qcc.com/firm/9cce0780ab7644008b73bc2120479d31.html');
            }
            return;
        }  
    }
    if(type=='his'){
        if(keyno[0]=='p'){
            jumpPeopleHistory(pos);
        }else{
            jumpHistory(pos);
        }
        
    }else{
        jumpRelatRisk(keyno,pos,type);
    }
    
}

function setUnloginJumpFp(){
    var fp = getQueryString('fp');
    if(fp){
        companyNavPos = fp;
        setTimeout(function() {
            $.scrollTo('#'+companyNavPos,{duration: 100, offset: -96});
        }, 300);
        
    }
}



// 搜索公司提示
var scompanyTimeout;
var $clist;
var $companyname;
var $companykey;
function scompanyList(value,clist,companyname,companykey){
    $clist = $('#'+clist);
    $companyname = $('#'+companyname);
    $companykey = $('#'+companykey);
    if ($.trim(value) == "") {
        return false
    } else {
        if(scompanyTimeout){
            clearTimeout(scompanyTimeout);
        }
        scompanyTimeout = setTimeout(function() {
            $.ajax({
                type: 'POST',
                url: INDEX_URL+'/gongsi_getList',
                dataType:'json',
                data: {key:value},
                success: function(rs) {
                    if(rs){
                        var html = scompanyListHTML(rs);
                        
                        $clist.html(html);
                        $clist.show();
                    }else{
                        $clist.hide();
                        
                    }
                }
            })
        }, 350);     
    }
}
function scompanyListHTML(companys){
    var html='';
    html=html+"<div class='list-group no-radius alt'>";
    for(var i=0;i<companys.length;i++){
        html=html+"<a class='list-group-item' onclick='scompanySelect(this);' href='javascript:;' data-key='" + companys[i].KeyNo + "'>"+companys[i].Name+"</a>";
    }
    html=html+"</div>";
    return html;
}

function scompanySelect(obj){
    var key = $(obj).attr('data-key');
    var name = $(obj).text();
    $companykey.val(key);
    $companyname.val(name);
    $clist.hide();
}
//end 搜索公司提示
// 递名片
function fileinput(param){
  document.getElementById(param).click();
}

$('#faceImg').change(function(e){
    $('#uploadFaceImg').submit();
})

formset({
    "id": "uploadFaceImg",
    "url": INDEX_URL+"/user_updatefaceimg",
    "dataType":"html",
    "tips": 1,
    "sucfunc": function(rs) {
        var url = rs.pic;
        $('#uploadFaceImgArea img').attr('src',url);
        $('#uploadFaceImgArea input').val(url);
    },
    "falfunc": function(rs) {
        faldia({'content':rs.msg});
    }
});

function postcardTep(tep){
    if(tep==1){
        $('.postcard-tep1').show();
        $('.postcard-tep2').hide();
        $('.postcard-edit').hide();
        $('#postCardForm').show();
        $('#editCardForm').hide();
    }else if(tep == 3){
        $('#postcardImg2').attr('src',$('#postCardForm input[name="faceimg"]').val());
        $('#postcardName2').text($('#postCardForm input[name="name"]').val());
        $('#postCardCompany2').text($('#postCardForm input[name="my_company_name"]').val());
        $('#postCardPostion2').text($('#postCardForm input[name="position"]').val());
        $('#postCardPhone2').val($('#postCardForm input[name="phone"]').val());
        $('#postCardEmail2').val($('#postCardForm input[name="email"]').val());

        $('.postcard-tep1').hide();
        $('.postcard-tep2').hide();
        $('.postcard-edit').show();
        $('#editCardForm').show();
        $('#postCardForm').hide();
    }else{
        if(!$('#postCardForm').valid()){
            return;
        }
        //$("cooperation_intention").rules("add", { required: true, messages: { required: "请输入合作意向"} });
        $('#postcardImg').attr('src',$('#postCardForm input[name="faceimg"]').val());
        $('#postcardName').text($('#postCardForm input[name="name"]').val());
        $('#postCardCompany').text($('#postCardForm input[name="my_company_name"]').val());
        $('#postCardPostion').text($('#postCardForm input[name="position"]').val());
        $('#postCardPhone').text($('#postCardForm input[name="phone"]').val());
        $('#postCardEmail').text($('#postCardForm input[name="email"]').val());

        $('.postcard-tep1').hide();
        $('.postcard-tep2').show();
        $('.postcard-edit').hide();
        $('#postCardForm').show();
        $('#editCardForm').hide();
    }
}

function postcardModal(){
    $.ajax({
        url:INDEX_URL+'/company_getpostcardinfo',
        data:{
            ajax:1
        },
        dataType:'json',
        success:function(rs){
            if(rs.success){
                var userInfo = rs.msg;
                $('#uploadFaceImgArea img').attr('src',userInfo.faceimg);
                $('#postCardForm input[name="faceimg"]').val(userInfo.faceimg);
                $('#postCardForm input[name="name"]').val(userInfo.real_name);
                $('#postCardForm input[name="my_company_name"]').val(userInfo.company_name);
                $('#postCardForm input[name="my_company_keyno"]').val(userInfo.company_keyno);
                $('#postCardForm input[name="position"]').val(userInfo.office);
                $('#postCardForm input[name="email"]').val(userInfo.email);

                if(userInfo.phone){
                    $('#postCardForm input[name="phone"]').val(userInfo.phone);
                }
                if(userInfo.real_name&&userInfo.company_name&&userInfo.company_keyno&&userInfo.office&&userInfo.address&&userInfo.industry&&
                    userInfo.email&&$('#postCardForm input[name="phone"]').val()){
                    $('#postCardModal').modal('show');
                    postcardTep(2);
                }else{
                    $('#toSettingModal').modal('show');
                }
            }else{
                if(rs.msg=='10'){
                    showVipModal('递名片','成为VIP会员 即可每日向企业递送自己的名片信息500次','default',null,null,null);
                }else{
                    faldia({'content':'递名片次数超出限制'});
                }
                
            }
        }
    })
}

formset({
    "id":"editCardForm",
    "url":INDEX_URL+"/company_setUserCache",
    "dataType":"json",
    "rule":{
        "postCardPhone2" : {
            required : true,
            number:true,
            minlength:11,
            maxlength:11
        },
        "postCardEmail2" : {
            required : true,
            email:true
        },
    },
    "messages":{
        "postCardPhone2" : {
            required : '请输入手机号',
            number:"请输入正确格式手机号",
            minlength:"请输入正确格式手机号",
            maxlength:"请输入正确格式手机号"
        },
        "postCardEmail2" : {
            required : '请输入邮箱',
            email: '请输入正确格式邮箱'
        },
    },
    "comfunc":function(){
        subbtB = $('#' + this.id).find('button[type=submit]');
        if(!subbtB.attr('disabled')){
            subbtB.attr('disabled','disabled');
            return true;
        }
        return true;
    },
    "sucfunc":function(rs){
        if(rs.success){
            subbtB = $('#' + this.id).find('button[type=submit]');
            subbtB.removeAttr('disabled')
            postcardModal();
        }
    },
    "falfunc":function(rs){
        faldia({'content':rs.msg});
        subbtB = $('#' + this.id).find('button[type=submit]');
        subbtB.removeAttr('disabled')
    }
});

formset({
    "id":"postCardForm",  
    "url":INDEX_URL+"/company_postcard",
    "dataType":"json",
    "rule":{   
        "faceimg":{
            required:false
        },
        "name":{ 
            required:true
        },
        "my_company_name":{
            required:true,
        },
        "position" : {
            required : true,
        },
        "phone" : {
            required : true,
        },
        "email" : {
            required : true,
            email:true
        },
    },
    "messages":{
        "faceimg":{
            required:'请上传图片',
        },
        "name":{
            required:"请输入真实姓名",
        }, 
        "my_company_name":{
            required:'请输入所属公司',
        },
        "position" : {
            required : '请输入公司职位',
        },
        "phone" : {
            required : '请输入联系电话',
        },
        "email" : {
            required : '请输入联系邮箱',
            email: '请输入正确格式的邮箱！'
        },
    },
    "comfunc":function(){
        subbtB = $('#' + this.id).find('button[type=submit]');
        if(!subbtB.attr('disabled')){
            subbtB.attr('disabled','disabled');
            return true;
        }
        return true;
    },
    "sucfunc":function(rs){
        if(rs.success){
            if(userGroupid==43){
                warndia({'content':rs.msg,'fn':function(){
                    location.reload();
                }});
            }else{
                sucdia({'content':rs.msg,'fn':function(){
                    location.reload();
                }});
            }
            
        }
    },
    "falfunc":function(rs){
        if(rs.upgradeVip){
            $('#postCardModal').modal('hide');
            showVipModal('递名片','成为VIP会员 即可每日向企业递送自己的名片信息500次','default',null,null,null);
        }else if(rs.upgradeSvip){
            $('#postCardModal').modal('hide');
            showSVipModal('递名片','成为SVIP会员 即可每日向企业递送自己的名片信息1000次','default',null,null,null);
        }else{
            faldia({'content':rs.msg});
        }
        subbtB = $('#' + this.id).find('button[type=submit]');
        subbtB.removeAttr('disabled')
    }
});

//公司反馈
function setErrorCat(dom){
    if($(dom).hasClass('active')){
        $(dom).removeClass('active')
    }else{
        $(dom).addClass('active')
    }
    var catArr = [];
    $.each($('#errorCategory .se-item'),function(i,cat){
        if($(cat).hasClass('active')){
            catArr.push($(cat).attr('data-value'));
        }
    });
    if(catArr.length>0){
        $('#errorCategory').next().hide();
    }else{
        $('#errorCategory').next().show();
    }
    $('#companyFeedForm').find('input[name=category]').val(catArr.toString());
}
$('#addVisitPic').change(function(e){
    $('#uploadVisitAddPic').submit();
})

formset({
    "id": "uploadVisitAddPic",
    "url": INDEX_URL+"/qiyemd_applyimg",
    "dataType":"html",
    "tips": 1,
    "sucfunc": function(rs) {
        var url = rs.pic;
        $('#uploadVisitPicArea').find('.noimg').hide();
        $('#uploadVisitPicArea').find('.img').show().css("display","table-cell");
        $('#uploadVisitPicArea').find('.img>img').attr('src',url);
        $('#uploadVisitPicArea').find('input').val(url);
        $('#uploadVisitPicArea').find('.message').hide();
    },
    "falfunc": function(rs) {
        faldia({'content':'请上传jpg、jpeg、png格式的图片，大小不超过2M'});
    }
});

formset({
    "id":"companyFeedForm",  
    "url":INDEX_URL+"/company_feedback",
    "dataType":"json",
    "rule":{   
        "company_name":{
            required:false
        },
        "category":{
            required:true,
        },
        "content":{
            required:true,
        },
        "phone" : {
            required : true,
            number:true,
            minlength:11,
            maxlength:11
        },
        
    },
    "messages":{
        "company_name":{
            required:'请输入公司名称',
        },
        "category":{
            required:'请选择有误模块',
        },
        "content":{
            required:'请输入补充说明',
        },
        "phone" : {
            required : '请输入联系电话',
            number:"请输入正确格式的手机号",
            minlength:"请输入正确格式的手机号",
            maxlength:"请输入正确格式的手机号"
        },
        
    },
    "comfunc":function(){
        subbtB = $('#' + this.id).find('button[type=submit]');
        if(!subbtB.attr('disabled')){
            subbtB.attr('disabled','disabled');
            return true;
        }
        return true;
    },
    "sucfunc":function(rs){
        if(rs.success){
            sucdia({'content':'提交成功','fn':function(){
                location.reload();
            }});
        }
    },
    "falfunc":function(rs){
        faldia({'content':'提交失败'});
        subbtB = $('#' + this.id).find('button[type=submit]');
        subbtB.removeAttr('disabled')
    }
});


function muhouIframe(){
     /*v3 add*/
    var scrollDom = document.body;
    var muhouUrl = $("#muhouIframe").attr('data-src');
    var needReload = true;
    /*关系图谱嵌入 火狐重新刷新*/
    if(navigator.userAgent.indexOf("Firefox")>0){
        $(".company-nav-head").click(function () {
            if($(this).find("h2").text() == '基本信息'){
                needReload = true;
            }
        });
    }
    $(window).scroll(function () {

        /*关系图谱嵌入 火狐重新刷新*/
        if(navigator.userAgent.indexOf("Firefox")>0){
            if($('#muhouIframe').length>0){
                var scrollTop = scrollDom.scrollTop || document.documentElement.scrollTop||document.body.scrollTop;
                var iframeOffTop = $('#muhouIframe').offset().top;
                var iframeHeight = $('#muhouIframe').height();
                if(scrollTop > iframeOffTop - 1000 && scrollTop <= iframeOffTop + iframeHeight && needReload){
                    $("#muhouIframe").attr('src','');
                    $("#muhouIframe").attr('src',muhouUrl);
                    needReload = false;
                }
            }
                
        }
        /*修复从招聘详情返回时，显示空白*/
        var MainCy = $("#muhouIframe").contents().find("#MainCy > div");
        //if(MainCy.width() == 0 && MainCy.width() != null && $("#base_title").parent().hasClass("current")){
        if($("#base_title").parent().hasClass("current")){
            if($('#muhouIframe').length>0){
                var scrollTop = scrollDom.scrollTop || document.documentElement.scrollTop||document.body.scrollTop;
                var iframeOffTop = $('#muhouIframe').offset().top;
                var iframeHeight = $('#muhouIframe').height();
                if(scrollTop > iframeOffTop - 1000 && scrollTop <= iframeOffTop + iframeHeight && needReload){
                    $("#muhouIframe").attr('src','');
                    $("#muhouIframe").attr('src',muhouUrl);
                    needReload = false;
                }
            }     
        }

    });
}

// 访问趋势图表
function visitChart(keyno,click_count) {
    var hasLoad = false;
    $('.company-visit').fadeIn();
    $('#companyVisit').mouseenter(function(){
        if(!hasLoad){
            visitWeekData()
        }   
    }) 

    function visitWeekData(){
        $.ajax({
            url:INDEX_URL+'/company_visitweek',
            data:{
                keyno:keyno,
                click_count:click_count
            },
            dataType:'json',
            success:function(res){
                if(res.success){
                    hasLoad = true;
                    drawChart(res.data);
                }
            }
        })
    }
    function drawChart(list){
        var xData = [];
        var yData = [];
        if(list && list.length>0){
            for (var i = 0; i < 7; i++) {
                xData.unshift(list[i].view_time);
                yData.unshift(list[i].view_count);
            }
        }
        var option = {
            grid: {
                right: 5,
                left: 5
            },
            color:['#128bed'],
            xAxis: {
                type: 'category',
                data: xData,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    interval: 0,
                    textStyle:{
                        color: "#999999"
                    },
                    formatter:function(param){
                        if(param){
                            return moment(param,'YYYY-MM-DD').format("MM-DD");
                        }else{
                            return '-'
                        }
                    }
                },
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            },
            series: [{
                type: 'line',
                data: yData,
                symbol:'circle',
                symbolSize:8,
                label: {
                    normal:{
                        show: true,
                        position: 'top',
                    }
                },
                
            }]
        };
        var visitChart = echarts.init(document.getElementById('visitChart'));
        visitChart.setOption(option);
    }
        
}
function setHotNews(keyno,companyName,viewAll){
    $.ajax({
        url:INDEX_URL+'/company_hotnews',
        data:{
            keyno:keyno,
        },
        dataType:'json',
        success:function(res){
            if(res.data&&res.data.length>0){
                var html = '';
                $.each(res.data,function(index,vo){
                    html+='<div class="item" style="transform: translateY('+index*25+'px);">';
                    html+='<a onclick="zhugeTrack(\'企业主页头部按钮点击\',{\'按钮名称\':\'热点新闻\'});" href="'+INDEX_URL_A+'/postnews_'+vo.NewsId+'.html" target="_blank">'+vo.Title+'</a>';
                    html+='<span class="text-gray m-l-sm">'+dateAgo(vo.PublishTime)+'</span>';
                    if(viewAll){
                        html+='<a onclick="zhugeTrack(\'企业主页头部按钮点击\',{\'按钮名称\':\'查看全部新闻\'});boxScrollTab(\'news\',\'newslist\');" class="text-primary m-l-sm">查看全部</a>';
                    }
                    html+='</div>';
                });
                $('#hotNews').html(html);
                $('#hotNewsWrap').fadeIn();
                hotNewsCarousel();
            }
        }
    })
}


//发票抬头弹窗
function saveInvoiceModal(keyno,name) {
    if($('#qrcodeViewAppCode').attr('loaded')){
        $('#savefpModal').modal('show');
        return;
    }
    $.ajax({
        type:'get',
        url:INDEX_URL+'/tax_view',
        data:{keyno:keyno,ajaxflag:1},
        success:function(result){
            if(result.success){
                $('#taxView .Name').text(result.data.Name || '暂无');
                $('#taxView .CreditCode').text(result.data.CreditCode || '暂无');
                $('#taxView .Address').text(result.data.Address || '暂无');
                $('#taxView .PhoneNumber').text(result.data.PhoneNumber || '暂无');
                $('#taxView .Bank').text(result.data.Bank || '暂无');
                $('#taxView .Bankaccount').text(result.data.Bankaccount || '暂无');
                $('#savefpModal').modal('show');
            }

        }
    })
    var qrcodeViewAppCode = new QRCode('qrcodeViewAppCode', {
        text: 'http://www.qichacha.com/qrcode_invoiceinfo?keyno='+keyno,
        width: 170,
        height: 170,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
    $('#qrcodeViewAppCode').attr('loaded',true);
}
function qrcodeViewTab(dom,type,keyno){
    $(dom).siblings().removeClass('active');
    $(dom).addClass('active');
    if(type==1){
        $('#qrcodeViewApp').show();
        $('#qrcodeViewWx').hide();
    }else{
        $('#qrcodeViewWx').show();
        $('#qrcodeViewApp').hide();
        gQrcodeViewWxCode(keyno);
        
    }
}

function gQrcodeViewWxCode(keyno){
    if($('#qrcodeViewWxCode').attr('loaded')){
        return;
    }
    $.ajax({
        type:'POST',
        data:{keyno:keyno},
        url:INDEX_URL+"/tax_getscan4",
        success:function(data){
            var data = JSON.parse(data);
            if(data.url){
                $('#qrcodeViewWxCode').empty();
                var qrcodeViewWxCode = new QRCode('qrcodeViewWxCode', {
                    text: data.url,
                    width: 170,
                    height: 170,
                    colorDark : "#000000",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H
                });
                $('#qrcodeViewWxCode').attr('loaded',true);
            }
        }
    });
}


//热点新闻轮播
function hotNewsCarousel(){
    var hotNewsIndex = 0;
    var hotNewsLength = $('#hotNews .item').length;
    if(hotNewsLength>1){
        setInterval(function() {
            $('#hotNews .item').eq(hotNewsIndex%hotNewsLength).css('transform','translateY(-25px)');
            $('#hotNews .item').eq((hotNewsIndex+1)%hotNewsLength).css('transform','translateY(0px)');
            setTimeout(function() {
                $('#hotNews .item').eq(hotNewsIndex%hotNewsLength).hide();
                $('#hotNews .item').eq(hotNewsIndex%hotNewsLength).css('transform','translateY(25px)');
            }, 500);
            setTimeout(function() {
                $('#hotNews .item').eq(hotNewsIndex%hotNewsLength).show();
                hotNewsIndex++;
            }, 800);
        }, 4000);
    }
}

//企业动态
function qingbaoCarousel(){
    $items = $('#qingbaoScrollinfo .item');
    var index = 0;
    var length = $items.length;
    if(length>1){
        setInterval(function() {
            $items.eq(index%length).css('transform','translateY(-100%)');
            $items.eq((index+1)%length).css('transform','translateY(0px)');
            setTimeout(function() {
                $items.eq(index%length).hide();
                $items.eq(index%length).css('transform','translateY(100%)');
            }, 500);
            setTimeout(function() {
                $items.eq(index%length).show();
                index++;
            }, 800);
        }, 4000);
    }
}


function showReportModal(keyno,name,individual,isNew,countryCode,address){
    var paramData = {
        keyno:keyno,
        name:decodeURI(name),
        individual:individual,
        address:address
    }
    if(isNew){
        paramData.isNew = isNew;
    }
    if(countryCode){
        paramData.countryCode = countryCode;
    }
    $.ajax({
        url:INDEX_URL+'/report_reportlist',
        data:paramData,
        dataType:'html',
        success:function(html){
            $html = $(html);
            var cellLength = $html.find('.cell').length;
            var gqctLength = $html.find('.gqctshow').length;
            var djgLength = $html.find('.djgshow').length;
            if(gqctLength == 0 && djgLength == 0){
                $('#reportModal .report-modal').addClass('dan')
            }
            if(cellLength==3){
                $('#reportModal .report-modal').css("cssText", "width:790px !important;");
            }else if(cellLength==2){
                $('#reportModal .report-modal').css("cssText", "width:530px !important;");
            }else if(cellLength==1){
                //$('#reportModal .report-modal').css("cssText", "width:530px !important;");
                var jumpUrl = $html.find('a.btn-primary').attr('href');
                // if(address){
                //     jumpUrl += '&address='+address
                // }
                location.href = jumpUrl;return;
            }else if(cellLength==5){
                $('#reportModal .report-modal').css("cssText", "width:1100px !important;");
            }
            $('#reportModal .modal-body').html($html);
            $('#reportModal').modal('show');
            $('#reportModal [data-toggle="tooltip"]').tooltip();
        }
    })
}

function changeReportTab(dom,type){
    if(type==1){
        $(dom).siblings().removeClass('a');
        $(dom).addClass('a'); 
    }else{
        $('#report .report').text($(dom).text());
        setTimeout(function() {
            $(dom).parent().removeClass('active');
        }, 100);
    }
    
}

//质押比例年份筛选
function changeSpledgeProportion(year) {
    var url = INDEX_URL+"/company_getinfos";
    var companykey = $("#unique").val();
    var companyname = $("#companyname").val();
    var ajaxData = {'unique':companykey,'companyname':companyname,'tab':'fengxian','box':'spledge','subbox':'proportion','tradeDate':year};
    console.info(ajaxData);
    $.ajax({
        type:'get',
        url:url,
        data:ajaxData,
        dataType:'html',
        success:function(data){
            if(data){
                $('#spledgeproportion').html(data);
            }
        }
    })
}

//异步获取置顶公告
function getRightNotice(keyno){
    $.ajax({
        url:INDEX_URL+'/companyown_rightnotice',
        data:{keyno:keyno},
        dataType:'html',
        success:function(html){
            if(html){
                $('#noticeRight').html(html);
                $('#noticeRight').parent().show();
            }
        }

    })
}
//异步获取推广企业
function getRightPromote(keyno){
    if(keyno[0]=='g'||keyno[0]=='y'){
        return;
    }
    var companyname = $('#headerKey').val();
    $.ajax({
        url:INDEX_URL+'/companyown_rightpromote',
        data:{keyno:keyno,companyname:companyname},
        dataType:'html',
        success:function(html){
            if(html){
                $('#promoteRight').html(html);
            }
        }

    })
}

function showContentDetailModal(dom){
    var html = $(dom).parent().attr('data-detail');
    html = '<pre>' + html + '</pre>';
    $('#contentDetailModal .modal-body').html(html);
    $('#contentDetailModal').modal('show');
}

function addTransfer(keyno){
    $.get(INDEX_URL+'/companyown_addTransfer', {keyno: keyno});
}

function scollFixAcItem(pdom,acItems){

    var scrollDom = document.body;
    var offset = 106;
    
    $(window).scroll(function(e){
        var scrollTop = scrollDom.scrollTop || document.documentElement.scrollTop||document.body.scrollTop;
        pdom.removeClass('active');
        
        $.each(acItems,function(index,vo){
            acItemsFuc(scrollTop,vo.id,vo.index);
        })
    })
    function acItemsFuc(scrollTop,domId,index){
        var jdom = $(domId);
        if(jdom.length>0){
            if(scrollTop>jdom.offset().top-offset&&scrollTop<=jdom.offset().top+jdom.height()-offset){
                pdom.eq(index).addClass('active');
            }
        }
        
    }
}

function bottomNavLoad(tab){
    $('.bottomNavSec').replaceWith($('#bottomNavFrom').html())
}

function ipoGgDetial(dom){
    var content = $(dom).attr('data-detail');
    $('#ggDetailModal').modal('show');
    $('#ggDetailModal .ggDetail').html(content);
}

var isSendingReport = false;
function sendReport(goods_id,report_format) {
    if(isSendingReport){
        return;
    }
    var companykey = $('#unique').val();
    var companyname = $('#companyname').val();
    var order_goods = [];
    order_goods.push({
        keyno : companykey,
        name : companyname
    });
    var email = $("input[name='sendReportEmail']").val();
    if(email == ''){
        faldia({content:"请输入邮箱地址！"});
        return false;
    }
    if(!email.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)){
        faldia({content:"邮箱格式不正确！"});
        return false;
    }
    window.localStorage.setItem('reportEmail',email);
    isSendingReport = true;
    $.ajax({
        url:INDEX_URL+'/report_getReport',
        method:'post',
        data:{
            companykey:companykey,
            companyname:companyname,
            goods_id:goods_id,
            report_format:report_format,
            report_email:email,
            order_goods:JSON.stringify(order_goods)
        },
        dataType:'json',
        success:function(result){
            if(result.success){
                sucdia({content:result.msg});
                window.location.href = INDEX_URL+'/order_manage';
            }else{
                faldia({content:result.msg});
            }
            isSendingReport = false;
        }
    });
}

function ngdTab(dom,tabid){
    $('#partnern .tabtitle').removeClass('active');
    $(dom).addClass('active');
    $('#partnern .tnavtab-box').hide();
    $('#'+tabid).show();
}

function nggTab(dom,tabid){
    $('#Mainmember .tabtitle').removeClass('active');
    $(dom).addClass('active');
    $('#Mainmember .tnavtab-box').hide();
    $('#'+tabid).show();
}

function ngsTab(dom,tabid){
    $('#stockholdersTab .tabtitle').removeClass('active');
    $(dom).addClass('active');
    $('#stockholdersTab .tnavtab-box').hide();
    $('#'+tabid).show();
}

function ncoBottomTab(dom,tabname){
  $(dom).siblings().removeClass('active');
  $(dom).addClass('active');
  $('.nco-bottom .company-list').hide();
  $('#'+tabname).fadeIn();
}

function explainToCertModal(){
    $('#explainToCertModal').modal();
    zhugeTrack('企业主页按钮点击',{'按钮名称':'风险说明'});
}


function riskExplain(dom,list){
    setExplainForm()
    if($(dom).hasClass('active')){
        $(dom).removeClass('active');
        $('#'+list+' .explain-row.own').hide();
        $('#'+list+' .explain-row.visit').show();
    }else{
        $(dom).addClass('active');
        $('#'+list+' .explain-row.own').show();
        $('#'+list+' .explain-row.visit').hide();
    }
}

function riskExplainModal(risk_type,risk_id,risk_name,isEdit,desc,imagelist){
    $('#riskExplainModal').modal();
    $('#riskExplainForm input[name="risk_type"]').val(risk_type);
    $('#riskExplainForm input[name="risk_id"]').val(risk_id);
    $('#riskExplainForm input[name="risk_name"]').val(risk_name);
    $('#riskExplainForm button[type=submit]').removeAttr('disabled');
    explainImgList = [];
    var content = '';
    var attachment_url = '';
    if(isEdit){
        content = desc;
        if(imagelist){
            explainImgList = imagelist.split(',');
        }
    }
    $('#riskExplainForm textarea[name="content"]').val(content);
    $('#riskExplainForm input[name="attachment_url"]').val(attachment_url);
    setMultiImg();
}

var explainImgList = [];
var isEdit = false;
var hasSetExplainForm = false;

function setExplainForm(){
    if(hasSetExplainForm){
        return;
    }
    hasSetExplainForm = true;
    $('#explainPic').change(function(e){
      if(e.target.files[0]){
        $('#uploadExplainPic').submit();
      }
    })

    formset({
        "id": "uploadExplainPic",
        "url": INDEX_URL+"/qiyemd_applyimg",
        "dataType":"html",
        "tips": 1,
        "sucfunc": function(rs) {
            var url = rs.pic;
            explainImgList.push(url);
            setMultiImg();
            $('#explainImg').find('.message').hide();
            $('#explainPic').val('');
        },
        "falfunc": function(rs) {
            faldia({'content':'请上传jpg、jpeg、png格式的图片，大小不超过2M'});
        }
    });

    formset({
        "id":"riskExplainForm",  
        "url":INDEX_URL+"/qiyemd_addexplain",
        "dataType":"json",
        "rule":{   
            "content":{ 
                required:true,
                maxlength:50
            }
        },
        "messages":{
            "content":{
                required:"针对此条风险补充说明，最多50个字",
                maxlength:"针对此条风险补充说明，最多50个字"
            },
        },
        "comfunc":function(){
            subbtB = $('#' + this.id).find('button[type=submit]');
            if(!subbtB.attr('disabled')){
                subbtB.attr('disabled','disabled');
                return true;
            }
            return false;
        },
        "sucfunc":function(rs){
            if(rs.success){
                sucdia({'content':'添加成功','fn':function(){
                    location.href=INDEX_URL+'/qiyemd_explain?keyno='+$('#unique').val();
                }});
            }
        },
        "falfunc":function(rs){
            if(rs.msg == '风险说明正在审核中'){
                rs.msg = '此条风险的补充说明已提交，请前往个人中心查看审核结果。';
            }
            faldia({'content':rs.msg});
            subbtB = $('#' + this.id).find('button[type=submit]');
            subbtB.removeAttr('disabled')
        }
    });
}

function setMultiImg(){
    var ilist = explainImgList;
    var fuc = 'explainPic';
    var html = '';
    var defaultImg = '/material/theme/chacha/cms/v2/images/no_image.png';
    $.each(ilist,function(i,v){
        html+='<span class="img">';
        html+='<img src="'+v+'?x-oss-process=image/resize,h_100" onerror="this.src=\''+defaultImg+'\'">';
        html+='<a onclick="deleteMultiImg(\''+v+'\')" class="close"></a></span>';
    });
    if(ilist.length<3){
        html+='<span class="img" onclick="fileinput(\''+fuc+'\')">';
        html+='<img src="/material/theme/chacha/cms/v2/images/img_add.png"></span>';
    }
    $('#multiexplainImg').html(html);
    $('#riskExplainForm input[name="attachment_url"]').val(ilist.toString());
}

function deleteMultiImg(val){
    var ilist = explainImgList;
    var index = ilist.indexOf(val); 
    if (index > -1) { 
        ilist.splice(index, 1); 
    } 
    setMultiImg();
}

function samefieldlist(p,key,value,type) {
    var text = '';
    if(type=='tel'){
        text = '同电话企业';
    }else if(type=='area'){  
        text = '同地址企业';
    }
    if(!userId){
        $('#loginModal').modal('show');
        getCaptcha();
        return;
    }
    if(userGroupid!=43){
        showVipModal(text,'成为VIP会员，即可查看更多'+text);
        return;
    }
    if(type=='tel'){
        $('#phoneModal').modal('hide');
    }
    if(text){
        $('#samefieldlistLabel').text(text);
    }
    $.ajax({
        type:'GET',
        data:{key:key,value:value,p:p,type:type},
        dataType:"html",
        url:INDEX_URL+'/company_samefieldlist',
        success:function(data){
            $('#samefieldlistModal .modal-body').html(data);
            $('#samefieldlistModal').modal('show');
        }
    })
}

function creatLink(){
    sucdia('操作成功');
    zhugeTrack('企业主页头部按钮点击',{'按钮名称':'快捷方式'});
}


    

