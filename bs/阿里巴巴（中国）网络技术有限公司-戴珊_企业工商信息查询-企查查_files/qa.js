var qaMyCompanyKeynos = [];
var hasEditQuestion = false;


function getQaMyCompany(){
    $.ajax({
        url:INDEX_URL+'/qiyemd_getqamycompany',
        dataType:'json',
        success:function(rs){
            if(rs.data){
               qaMyCompanyKeynos =  rs.data;
            }
        }
    })
}

function isMyCompany(keyno){
    for(var i=0;i<qaMyCompanyKeynos.length;i++){
        if(qaMyCompanyKeynos[i]==keyno){
            return true;
        }
    }
    return false;
}



//回答或删除后ajax 刷新问答，flag为1是列表，flag为2是弹框  topReplySize 只对flag==1起作用
function getQaDetail(questionId,tab,flag,topReplySize,callback){
    var params = {id:questionId,tab:tab,flag:flag,topReplySize:topReplySize};
    $.ajax({
        url:INDEX_URL+'/qa_qadetail',
        data:params,
        dataType:'html',
        success:function(res){
            if(res){
                if(flag==1){
                    $('#qa_question_'+questionId).replaceWith(res);
                }else{
                    $('#answerListModal .answers').html(res);
                    $('#answerListModal').modal('show');
                }
                if(callback){
                    callback();
                }
            }else{
                if(flag==2){
                    $('#qa404Modal').modal('show');
                }
            }
        }
    })
}


//企业问答
function showAnswerModal(id,content,keyno,tab){
	$('#answerModal').modal('show');
    $('#answerModal input[name=questionId]').val(id);
    $('#answerModal').attr('data-tab',tab);
    $('#answerModal .title').html(decodeURIComponent(content.replace(/\+/g, '%20')));
    if(isMyCompany(keyno)){
        $('#answerModal .official-p').show();
    }else{
       $('#answerModal .official-p').hide();
    }
	
}
function showAnswerListModal(id,keyno,tab){
    if(!userId){
        $('#loginModal').modal('show');
        getCaptcha();
        return;
    }
    $('#answerListModal input[name=questionId]').val(id);
    $('#answerListModal').attr('data-tab',tab);
    getQaDetail(id,tab,2,'');
    if(isMyCompany(keyno)){
        $('#answerListModal input').attr('placeholder','说说你的看法，您是该企业认证管理员，您提交的回答将作为企业官方回答展示')
    }else{
        $('#answerListModal input').attr('placeholder','说说你的看法')
    }
    hasEditQuestion = false;
}



function gethotqa() {
    $.ajax({
        url:INDEX_URL+'/qa_hotqa',
        dataType:'json',
        success:function(res){
            if(res.success){
                var html = '';
                $.each(res.data,function(index,vo){
                    html+='<li class="list-group-item clearfix">';
                    html+='<div class="title m-b">';
                    html+='<img class="logo m-r-sm" src="'+vo.companyLogo.replace('http://co-image.qichacha.com','https://co-image.qichacha.com')+'">';
                    html+='<a href="'+INDEX_URL+'/firm/'+vo.companyKeyNo+'.html">'+vo.companyName+'</a></div>'
                    html+='<div class="question" onclick="zhugeTrack(\'问答模块按钮点击\',{\'按钮名称\':\'本企业问答详情\'});showAnswerListModal(\''+vo.id+'\',\''+vo.companyKeyNo+'\',10)">';
                    html+='<span class="icon"></span>'+vo.content;
                    if(vo.topAnswers&&vo.topAnswers.length>0){
                        html+='<div class="count"><span class="text-danger">'+vo.answerCount+'</span>条回答</div></div>';
                        html+='<div class="answer" onclick="zhugeTrack(\'问答模块按钮点击\',{\'按钮名称\':\'本企业问答详情\'});showAnswerListModal(\''+vo.id+'\',\''+vo.companyKeyNo+'\',10)"><span class="icon"></span><pre class="qa-pre">'+vo.topAnswers[0].content+'</pre></div></li>';
                    }else{
                        html+='<div class="count">暂无回答</div></li>';
                    }
                    
                });
                $('#hotUlQa').html(html);
                $('#hotUlQa').parent().show();
                if($('#hotUlQa').height()>=434){
                    $('#hotUlQa').slimScroll({
                        wheelStep: 3,
                        height:434
                    });
                }
            }
        }
    })
}

function getcompanyqa(keyno) {
    $.ajax({
        url:INDEX_URL+'/qa_companyqa',
        data:{keyno:keyno},
        dataType:'json',
        success:function(res){
            if(res.success){
                var html = '';
                $.each(res.data,function(index,vo){
                    html+='<a class="list-group-item clearfix" onclick="zhugeTrack(\'问答模块按钮点击\',{\'按钮名称\':\'本企业问答详情\',});showAnswerListModal(\''+vo.id+'\',\''+vo.companyKeyNo+'\',10)">';
                    html+='<div class="question">';
                    html+='<span class="icon"></span><div class="title">'+vo.content+'</div>';
                    if(vo.topAnswers&&vo.topAnswers.length>0){
                        html+='<div class="count"><span class="text-danger">'+vo.answerCount+'</span>条回答</div></div>';
                        html+='<div class="answer"><span class="icon"></span><pre class="qa-pre">'+vo.topAnswers[0].content+'</pre></div></a>';
                    }else{
                        html+='<div class="count">暂无回答</div></div>';
                    }
                    
                });
                $('#companyUlQaCount').text(res.count);
                if(res.count<=5){
                    $('#companyUlQaCount').parent().parent().hide();
                }else{
                    $('#companyUlQaCount').parent().parent().show();
                }
                $('#companyUlQa').html(html);
                $('#companyUlQa').show();
                if($('#companyUlQa').height()>=434){
                    $('#companyUlQa').slimScroll({
                        wheelStep: 3,
                        height:434
                    });
                }
            }
        }
    })
}

var isAskingQuestion = false;
function askquestion(type) {
    if(isAskingQuestion){
        return;
    }
    var content;
    var questionId;
    if(type==1){
        var content = $('#qaRightAsk textarea').val();
        var keyno = $('#qaRightAsk input[name=keyno]').val();
    }else{
        var content = $('#qalist textarea').val();
        var keyno = $('#qalist input[name=keyno]').val();
    }
    if(!content){
        faldia({'content':'请输入你的问题'});
        return;
    }
    if($.trim(content).length<4){
        faldia({'content':'问题字数至少4个字'});
        return;
    }
    if($.trim(content).length>100){
        faldia({'content':'问题字数最多100个字'});
        return;
    }
    // if(content.indexOf('?')==-1 && content.indexOf('？')==-1){
    //     faldia({'content':'你还没有给问题添加问号'});
    //     return;
    // }
    isAskingQuestion = true;
    $.ajax({
        url:INDEX_URL+'/qa_askquestion',
        data:{
        	keyno:keyno,
        	content:content
        },
        method:'post',
        dataType:'json',
        success:function(rs){
            if(rs.success){
                sucdia({'content':rs.msg,'fn':function(){
                    if(type==1){
                        //$('#qaRightAsk .ask-footer').removeClass('active');
                        $('#qaRightAsk textarea').val('');
                        $('#qaRightAsk .wordCount').text('0');
                    }else{
                        $('#qalist textarea').val('');
                        $('#qalist .wordCount').text('0');
                    }
                    //location.href = INDEX_URL +'user_qa';
                    isAskingQuestion = false;
                }});

            }else{
                isAskingQuestion = false;
            	faldia({'content':rs.msg});
            }
        }
    })
}

var isGivingAnswer = false; //type:1 弹框回答 type:2 回答列表回答
function giveAnswer(type) {
    if(isGivingAnswer){
        return;
    }
    var content;
    var questionId;
    if(type==1){
        content = $('#answerModal textarea').val();
        questionId = $('#answerModal input[name=questionId]').val();
    }else{
        content = $('#answerListModal input[name=content]').val();
        questionId = $('#answerListModal input[name=questionId]').val();
    }
    if(!content){
        faldia({'content':'请输入你的看法'});
        return;
    }
    if($.trim(content).length<4){
        faldia({'content':'回答字数至少4个字'});
        return;
    }
    if($.trim(content).length>500){
        faldia({'content':'回答字数最多50个字'});
        return;
    }
    isGivingAnswer = true;
    $.ajax({
        url:INDEX_URL+'/qa_giveanswer',
        data:{
            questionId:questionId,
            content:content
        },
        method:'post',
        dataType:'json',
        success:function(rs){
            if(rs.success){
                sucdia({'content':rs.msg,'fn':function(){
                    //location.reload();
                    if(type==1){
                        $('#answerModal').modal('hide');
                        $('#answerModal textarea').val('');
                        $('#answerModal .wordCount').text('0');
                        //回答成功后刷新列表
                        // var tab = $('#answerModal').attr('data-tab');
                        // if(tab==3){
                        //     location.href = INDEX_URL+'/user_qa?tab=2'
                        // }else{
                        //     getQaDetail(questionId,tab,type,2);
                        // }
                    }else{
                        //$('#answerListModal').modal('hide');
                        $('#answerListModal input[name=content]').val('');
                        //回答成功后刷新列表
                        // var tab = $('#answerListModal').attr('data-tab');
                        // getQaDetail(questionId,tab,type,2);
                    }
                    isGivingAnswer = false;
                }});

            }else{
                isGivingAnswer = false;
                faldia({'content':rs.msg});
            }
        }
    });
    hasEditQuestion = true;
}
function favorqa(dom,questionId){
    if($(dom).hasClass('disable')){
        return;
    }
    $(dom).addClass('disable');
    var isFavor = 1;
    if($(dom).hasClass('active')){
        isFavor = 0;
    }
    $.ajax({
        url:INDEX_URL+'/qa_favorqa',
        data:{
            questionId:questionId,
            status:isFavor
        },
        method:'post',
        dataType:'json',
        success:function(rs){
            $(dom).removeClass('disable');
            if(rs.success){
                if(isFavor){
                    $(dom).addClass('active');
                    sucdia({'content':'收藏成功','fn':function(){
                        var qaTab4Count = $('#qaTab4Count').attr('data-count');
                        qaTab4Count++;
                        $('#qaTab4Count').attr('data-count',qaTab4Count);
                        $('#qaTab4Count').text(qaTab4Count);
                    }});
                }else{
                    $(dom).removeClass('active');
                    sucdia({'content':'已取消收藏','fn':function(){
                        var qaTab4Count = $('#qaTab4Count').attr('data-count');
                        qaTab4Count--;
                        $('#qaTab4Count').attr('data-count',qaTab4Count);
                        $('#qaTab4Count').text(qaTab4Count);
                    }});
                }
                

            }else{
                faldia({'content':rs.msg});
            }
        }
    });
    hasEditQuestion = true;
}

function likeAnswer(dom,answerId){
    if($(dom).hasClass('disable')){
        return;
    }
    $(dom).addClass('disable');
    var isLike = 1;
    if($(dom).hasClass('active')){
        isLike = 0;
    }
    $.ajax({
        url:INDEX_URL+'/qa_likeanswer',
        data:{
            answerId:answerId,
            status:isLike
        },
        method:'post',
        dataType:'json',
        success:function(rs){
            $(dom).removeClass('disable');
            if(rs.success){
                var likeCount = parseInt($(dom).find('.likeCount').text());
                if(isLike){
                    $(dom).addClass('active');
                    likeCount++;
                }else{
                    $(dom).removeClass('active');
                    likeCount--;
                }
                $(dom).find('.likeCount').text(likeCount);
            }else{
                faldia({'content':rs.msg});
            }
        }
    });
    hasEditQuestion = true;
}


function qaMakeRead(questionId,tab){
    if(tab!=1 && tab!=7){
        return;
    }
    $('#qa_question_'+questionId).removeClass('new');
    $.ajax({
        url:INDEX_URL+'/qa_makeread',
        method:'post',
        data:{questionId:questionId,tab:tab},
        dataType:'json',
        success:function(rs){
            if(rs.success){
                var qaCountNew = $('#qaCountNew').attr('data-count');
                qaCountNew--;
                $('#qaCountNew').attr('data-count',qaCountNew);
                if(qaCountNew<=0){
                    $('#qaCountNew').hide();
                }
                if(tab==7){
                    $('#newQaCount').text(qaCountNew);
                    if(qaCountNew<=0){
                        $('#newQaCount').hide();
                    }
                }
            }else{
                console.info(rs.msg);
            }
        }
    })
}

function indictModal(questionId,answerId){
    $('#indictModal').modal('show');
    $('#indictModal input[name=questionId]').val(questionId);
    if(answerId){
        $('#indictModal input[name=answerId]').val(answerId);
    }else{
        $('#indictModal input[name=answerId]').val('');
    }
    
}

function indictQA(){
    var questionId = $('#indictModal input[name=questionId]').val();
    var answerId = $('#indictModal input[name=answerId]').val();
    var desc = $('#indictModal textarea[name=desc]').val();
    var reasonArr = [];
    $("input[name=reason]:checked").each(function(i){
            reasonArr.push(this.value);
    }); 
    if(reasonArr.length==0 && !desc){
        faldia({'content':'请至少填写一项举报原因'});
        return;
    }
    $.ajax({
        url:INDEX_URL+'/qa_indictqa',
        method:'post',
        data:{
            questionId:questionId,
            answerId:answerId,
            reason:reasonArr.toString(),
            desc:desc
        },
        dataType:'json',
        success:function(rs){
            if(rs.success){
                sucdia({'content':'举报成功','fn':function(){
                    $('#indictModal').modal('hide');
                    $('#indictModal textarea[name=desc]').val('');
                    $("input[name=reason]:checked").each(function(i){
                        this.checked = false;
                    }); 
                }});
            }else{
                faldia({'content':rs.msg});
            }
        }
    });
    hasEditQuestion = true;
}

function deleteQuestion(questionId){
    tkConfirm(function(){
        $.ajax({
            url:INDEX_URL+'/qa_deletequestion',
            method:'post',
            data:{questionId:questionId},
            dataType:'json',
            success:function(rs){
                if(rs.success){
                    sucdia({'content':'操作成功','fn':function(){
                        location.reload();
                    }});
                }else{
                    console.info(rs.msg);
                }
            }
        })
    },'你确定要删除这个问题吗？');   
}

function deleteAnswer(dom,questionId,answerId,tab,type){
    tkConfirm(function(){
        $.ajax({
            url:INDEX_URL+'/qa_deleteanswer',
            method:'post',
            data:{answerId:answerId,questionId:questionId},
            dataType:'json',
            success:function(rs){
                if(rs.success){
                    sucdia({'content':'操作成功'});
                    getQaDetail(questionId,tab,type,2);
                }else{
                    console.info(rs.msg);
                }
            }
        })
    },'你确定要删除这个回答吗？');
    hasEditQuestion = true;
}

function replyAnswer(dom,answerId,type){
    if($(dom).find('.text').text()=='回复'){
        $(dom).find('.text').text('取消回复');
        $(dom).parent().parent().next().show();
        $(dom).parent().parent().next().find('input').focus();

    }else{
        $(dom).find('.text').text('回复');
        $(dom).parent().parent().next().hide();
    }
    
        
}
var isReplyingAnswer = false;
function addReply(dom,questionId,answerId,targetId,tab,type){
    if(isReplyingAnswer){
        return;
    }
    var replyContent = $(dom).prev().val();
    if($.trim(replyContent)==''){
        $(dom).prev().focus();
        faldia({'content':'请输入回复内容'});
        return;
    }
    if(replyContent.length>50){
        $(dom).prev().focus();
        faldia({'content':'最多回复50个字'});
        return;
    }
    isReplyingAnswer = true;
    $.ajax({
        url:INDEX_URL+'/qa_addreply',
        method:'post',
        data:{
            replyContent:replyContent,
            targetId:targetId,
            answerId:answerId
        },
        dataType:'json',
        success:function(rs){
            isReplyingAnswer = false;
            if(rs.success){
                var replyId = rs.data.id;
                $(dom).parent().hide();
                sucdia({'content':rs.msg});
                /*getAnswerDetail(questionId,answerId,tab,type,function(){
                    //回复完滚动到能看到自己回复的位置 根据回复id
                    if(type==1){
                        var answerHeight = $('#qa_answer_'+answerId).height();
                        if(answerHeight>400){
                            $.scrollTo('#qa_reply_'+type+replyId,{duration: 100, offset:-window.innerHeight+300});
                        }
                    }else{
                        var answerHeight = $('#qawrap_answer_'+answerId).height();
                        if(answerHeight>400){
                            $('.answers-list').scrollTo('#qa_reply_'+type+replyId,{duration: 100, offset:-300});
                        }
                    }
                });*/
            }else{
                faldia({'content':rs.msg});
            }
        }
    })
}

function replyKeydown(dom,questionId,answerId,targetId,tab,type){
    var code = event.keyCode;
    if(code == 13){
        addReply($(dom).next()[0],questionId,answerId,targetId,tab,type);
    }
}

function showReply(dom,questionId,answerId,tab){
    qaMakeRead(questionId,tab);
    getAnswerDetail(questionId,answerId,tab,1,function(){
        $('#qa_question_'+questionId).attr('data-morereply',true);
    });

}

function showMoreReply(questionId,answerId,tab){
    qaMakeRead(questionId,tab);
    getAnswerDetail(questionId,answerId,tab,1,function(){
        $('#qa_question_'+questionId).attr('data-morereply',true);
    });
}

function ignoreInvitation(questionId){
    $.ajax({
        url:INDEX_URL+'/qa_ignoreinvitation',
        method:'post',
        data:{
            questionId:questionId,
        },
        dataType:'json',
        success:function(rs){
            if(rs.success){
                sucdia({'content':'操作成功','fn':function(){
                    location.reload();
                }});
            }else{
                console.info(rs.msg);
            }
        }
    })
}
function getAnswerDetail(questionId,answerId,tab,type,callback){
    $.ajax({
        url:INDEX_URL+'/qa_answerdetail',
        method:'get',
        data:{
            questionId:questionId,
            answerId:answerId,
            tab:tab,
            type:type
        },
        dataType:'html',
        success:function(html){
            if(type==1){
                $('#qa_answer_'+answerId).html(html);
            }else{
                $('#qawrap_answer_'+answerId).html(html);
            }
            if(callback){
                callback();
            }
        }
    });
}

function answersScroll(dom,qustionId,tab) {
    var h = $(dom).height();
    var sh = dom.scrollHeight;
    var st =dom.scrollTop;
    if(h+st>=sh && hasMoreAnswers){
        answersPageIndex++;
        $.ajax({
            url:INDEX_URL+'/qa_qadetail',
            data:{
                id:qustionId,
                tab:tab,
                flag:2,
                p:answersPageIndex
            },
            dataType:'html',
            success:function(html){
                if($.trim(html)){
                    $('.answers-list').append(html);
                }else{
                    hasMoreAnswers = false;
                }
                
            }
        })
    }
}


$(function(){
    if(userId){
        getQaMyCompany();
        $('#answerListModal').on('hide.bs.modal',function(param){
            var tab = $(this).attr('data-tab');
            var questionId = $(this).find('input[name=questionId]').val();
            if(hasEditQuestion){
                console.info($('#qa_question_'+questionId).attr('data-morereply'));
                if ($('#qa_question_'+questionId).attr('data-morereply')){
                    getQaDetail(questionId,tab,1,'');
                }else{
                    getQaDetail(questionId,tab,1,2);
                }
            }
        })
    }
});

