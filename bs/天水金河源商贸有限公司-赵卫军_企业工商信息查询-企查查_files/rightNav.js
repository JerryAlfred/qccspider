/***** PUBLIC  *****/

//操作成功对话框
sucdia = function(content,fn,time){
	var options = {};
	var delay;	
	if(typeof(content) == 'string'){
		options.content = content;
		options.fn = fn || function(){};
	}else{
		options = content;
	}
	options.content 	= options.content || '保存成功！';
	options.fn			= options.fn 		|| function(){};
	delay = function(ms, func) {
	    return setTimeout(func, ms);
	};
	toastr.options = {
	    positionClass: 'toast-bottom-left'
	};
	delay(100, function() { 
	    return toastr.success(options.content);
	}); 
	setTimeout(options.fn,2000);  
}
 
//操作失败对话框
faldia = function(content,fn,time){
	var options = {}; 
	if(typeof(content) == 'string'){
		options.content = content;
		options.fn = fn || function(){};
	}else{
		options = content;
	}
	options.content 	= options.content || '保存失败！';
	options.time		= options.time 	|| 2;
	options.fn			= options.fn 		|| function(){};
	var delay;
	delay = function(ms, func) {
	    return setTimeout(func, ms);
	};
	toastr.options = { 
	    positionClass: 'toast-bottom-left'
	};
	delay(10, function() {
	    return toastr.error(options.content);
	}); 
    setTimeout(options.fn,2000); 
}

/*关闭面板*/
function closePanel() {
	$('.i_bts-outer li').removeClass("active");
	$("#RNav").addClass("i_hide");
}

/*打开面板*/
function openPanel() {
	$("#RNav").removeClass("i_hide");
}
	
/*获取公司数据*/
function getCompany (companyKey,fn){
    $.ajax({
        url:"/company_getComparisonData",
        type:"GET",
        dataType:"JSON",
        data:{
            companyKey:companyKey,
        },
        success: function (data) {
            if(data){ fn(data); }
        }
    });
}// getCompany

/*刷新关注ui*/
function refreshFocUI (){
	$("#RNFoc .i_com-wrap .i_com").remove();
	
	$.ajax({ 
        type: 'POST',
        url: INDEX_URL+'/user_getUserFollowInfo',
        dataType:'json',
        success: function(data) {
            	
        	// 
        	if(!data.data.count) {
        		$("#FocCount").hide();
        		$("#FocCount").parent().addClass("spanHide");
        		data.count = 0;
        	} else {
        		$("#FocCount").parent().removeClass("spanHide");
        		$("#FocCount").text(data.data.count);
        		$("#FocCount").show();
        	}
        	
        	
        	// 添加公司
        	var coms = data.data.list;
        	if(coms && coms.length){
        		$(".i_nodata").hide();
        		
        		// 添加公司
				for(var i = 0; i < coms.length; i++){
					var com = coms[i];
					
					var url = frimUrl + "/firm/" + com.company_keyno +  ".html";
					
					if(!com.company_logo){
						if((com.company_keyno)[0] == 's'){
							com.company_logo = "http://co-image.qichacha.com/SocialOrgImage/default.jpg";
						} else {
							com.company_logo = comDefaultImg;
						}
					}
					
					var html = '<a class="i_com" href="' + url + '">'+
									'<img src="'+ com.company_logo +'" onerror="javascript:this.src=\''+ comDefaultImg +'\';"/>'+
									'<div class="i_comname">'+
							            '<div class="wrap">'+
							                '<p class="content">'+ com.company_name +'</p>'+
							            '</div>'+
							        '</div>'+
						        '</a>';
					        
					$("#RNFoc .i_com-wrap").append(html);
				}
        	}
        }
    });// 关注列表
} // refreshFocUI

/*刷新对比ui */
function refreshCompareUI(){
	// 清空面板
	$("#RNCom .i_com").not(".i_addcom").remove();
	$("#RNCom .i_addcom").show();
	
	// 获取数据
	var coms = [];
	if(localStorage.compareComs){
		coms = JSON.parse(localStorage.compareComs);
	}
	
	//
	if(coms && coms.length){
		$(".i_nodata").hide();
		
		if(coms.length >= 5){
			$("#RNCom .i_addcom").hide();
		}
		
		// 显示清空
		$("#ClearCompares").show();
		
		// 设置数字
		$("#ComCount").parent().removeClass("spanHide");
		$("#ComCount").text(coms.length);
		$("#ComCount").show();
		
		$("#ComLastCount").text(5 - coms.length);
		
		// 添加公司
		for(var i = 0; i < coms.length; i++){
			var com = coms[i];
			
			var html = '<div class="i_com">'+
						'<img src="'+ com.ImageUrl +'" />'+
						'<div class="i_comname">'+
				            '<div class="wrap">'+
				                '<p class="content">'+ com.Name +'</p>'+
				            '</div>'+
				        '</div>'+
				        '<a class="c_a bg-white" href="javascript:;" onclick="delCompares('+ i +')">删除</a>'+
			        '</div>';
			        
			$("#RNCom .i_addcom").before(html);
		}
	} else {
		// 隐藏清空
		$("#ClearCompares").hide();
		
		// 设置数字
		$("#ComCount").hide();
		$("#ComCount").parent().addClass("spanHide");
		$("#ComCount").text(0);
		$("#ComLastCount").text(5);
		$(".i_nodata").show();
	}
}

//刷新找关系ui
function refreshRelUI(){
	$("#RNRel .i_com").not(".i_addcom").remove();
	
	var coms = getRelComs();
	$("#RNRel .i_addcom").show();
	
	if(coms && coms.length){
		$(".i_nodata").hide();
		
		if(coms.length >= 5){
			$("#RNRel .i_addcom").hide();
		}
		
		// 显示清空
		$("#ClearRels").show();
		
		// 设置数字
		$("#RelCount").parent().removeClass("spanHide");
		$("#RelCount").text(coms.length);
		$("#RelCount").show();
		
		$("#RelLastCount").text(5 - coms.length);
		
		//
		for(var i = 0; i < coms.length; i++){
			var com = coms[i];
			if(com.userName){ // 添加的个人
				
				if((com.userName).length > 9){
					com.userName = (com.userName).slice(0,9) + "...";
				}
				
				if((com.comName).length > 18){
					com.comName = (com.comName).slice(0,18) + "...";
				}
				
				var html = '<div class="i_com">'+
									'<img src="'+ personImg +'" />'+
									'<div class="i_comname">'+
							            '<div class="wrap">'+
							                '<p class="content"><span>'+ com.userName + '</span>' +
							                	'<br/><span>' + com.comName + '</span>'+
							                '</p>'+
							            '</div>'+
							        '</div>'+
							        '<a class="c_a bg-white" href="javascript:;" onclick="delRels('+ i +')">删除</a>'+
						        '</div>';
						        
				$("#RNRel .i_addcom").before(html);
			} else { // 添加的公司
				var html = '<div class="i_com">'+
									'<img src="'+ com.comLogo +'" />'+
									'<div class="i_comname">'+
							            '<div class="wrap">'+
							                '<p class="content">'+ com.comName +'</p>'+
							            '</div>'+
							        '</div>'+
							        '<a class="c_a" href="javascript:;" onclick="delRels('+ i +')">删除</a>'+
						        '</div>';
						        
				$("#RNRel .i_addcom").before(html);
			}
		}//for
	} else {
		// 设置数字
		$("#RelCount").hide();
		$("#RelCount").parent().addClass("spanHide");
		$("#RelCount").text(0);
		$("#RelLastCount").text(5);
		
		// 隐藏清空
		$("#ClearRels").hide();
	}
}// refreshRelUI


/*****  找关系相关   *****/

/*页面调用 添加到找关系*/
function findRelation(comName, keyNo, userName, comLogo){

	  // 关闭其他面板
	  $('.i_wrap').hide();
	  
	  //$('.i_to-option').eq(2).click();
	  var coms = getRelComs();
	  
	  if(coms && coms.length > 4){
	  		errmsg('至多选择五个节点');
	  		//return;
	  } else {
		  	if(isExsit(coms, comName, userName)){
		  		errmsg('已添加');
		  		//return;
		  	} else {
		  		addRelCom(comName, keyNo, userName, comLogo);
		  	}
	  }
	  
	  refreshRelUI(); 
	  
	  //打开右侧栏
	  $('.i_bts-outer li').removeClass("active");
	  $('.i_bts-outer li').eq(1).addClass("active");
	
	  $("#RNRel").show();
	  openPanel();
	  
	  // 阻止冒泡
	  var e=arguments.callee.caller.arguments[0]||event; 
      if (e && e.stopPropagation) {
     	e.stopPropagation();
      } else if (window.event) {
      	window.event.cancelBubble = true;
      }
} 
/*添加节点*/
function addRelCom (comName, keyNo, userName, comLogo) {
	var relComs = [];
	
	if(localStorage.relComs) {
		relComs = JSON.parse(localStorage.relComs);
	}
	
	var obj = {
		comName : comName, 
		keyNo : keyNo, 
		userName : userName,
		comLogo : comLogo
	}
	
	relComs.push(obj);
	
	localStorage.relComs = JSON.stringify(relComs);
}
/*节点是否存在*/
function isExsit(coms, comName, userName){
	var flag = false;
	if(coms && coms.length) {
	  	for(var i = 0; i < coms.length; i++) {
	  		var com = coms[i];
	  		
	  		if(userName){ // 个人
	  			if(com.userName == userName && com.comName == comName) {
		  			flag = true;
		  			break;
		  		}
	  		} else {
	  			if(!com.userName && com.comName == comName) {
		  			flag = true;
		  			break;
		  		}
	  		}
	  	}
	}
	return flag;
}
/*从缓存中，获取所有节点*/
function getRelComs () {
	var relComs = [];
	
	if(localStorage.relComs) {
		relComs = JSON.parse(localStorage.relComs);
	}
	
	return relComs;
}
/*删除节点*/
function delRels(index) {
	var coms = getRelComs();
	coms.splice(index,1);
	localStorage.relComs = JSON.stringify(coms);
	refreshRelUI();
	
	// 阻止冒泡
	var e=arguments.callee.caller.arguments[0]||event; 
	if (e && e.stopPropagation) {
		e.stopPropagation();
	} else if (window.event) {
		window.event.cancelBubble = true;
	}
}

/*弹出层 - 联想公司和人1*/
function qrsearchCom (event,dom){
    setTimeout(function(){
        var value = $(dom).val().trim();
        var pdata = {
	        	key : value,
	        	type : 0,
	        	so : 1
	        }
        $.ajax({ 
            type: 'POST',
            url: INDEX_URL+'/gongsi_getInfos',
            data: pdata,
            dataType:'json',
            success: function(data) {
            	console.log(data);
            	
                if(data&&data.length>0){
                    var html='';
                    for(var i=0;i<data.length;i++){
                    	var item = data[i];
                    	item.Name = (item.Name).replace("<em>","");
		            	item.Name = (item.Name).replace("</em>","");
                    	if(item.Reason != "投资人" && item.Reason != "法人" && item.Reason != "主要人员"){
            				html += '<li class="list-group-item" >'+
                        			item.Name + '&nbsp;&nbsp;&nbsp;<a c-keyno="'+item.KeyNo+'" c-name="'+item.Name+'" c-username="" c-logo="'+item.ImageUrl+'" href="javascript:;" class="c_a m_addrel">添加</a><br/>' +
                        			item.OperName + '(法人)&nbsp;&nbsp;&nbsp;<a c-keyno="'+item.KeyNo+'" c-name="'+item.Name+'" c-username="'+ item.OperName +'" c-logo="'+item.ImageUrl+'" href="javascript:;" class="c_a m_addrel">添加</a>' +
                        		'</li>';
		            	} else {
		            		item.Value = (item.Value).replace("<em>","");
		            		item.Value = (item.Value).replace("</em>","");
		            		html += '<li class="list-group-item">'+
                        			item.Name + '&nbsp;&nbsp;&nbsp;<a c-keyno="'+item.KeyNo+'" c-name="'+item.Name+'" c-username="" c-logo="'+item.ImageUrl+'" href="javascript:;" class="c_a m_addrel">添加</a><br/>' + 
                        			item.Value + '(' + item.Reason +')&nbsp;&nbsp;&nbsp;<a c-keyno="'+item.KeyNo+'" c-name="'+item.Name+'" c-username="'+ item.Value +'" c-logo="'+item.ImageUrl+'" href="javascript:;" class="c_a m_addrel">添加</a>' +
                        		'</li>';
		            	}
                    }
                    $('#qrsearchList').html(html);
                    $('#qrsearchList').show();
                    
                    $(".m_addrel").click(function () {
                    	var comName = $(this).attr("c-name");
                    	var keyNo = $(this).attr("c-keyno");
                    	var userName = $(this).attr("c-username");
                    	var comLogo = $(this).attr("c-logo");
                    	findRelation(comName, keyNo, userName, comLogo);
                    	
                    	//关闭模态框
                    	$('#addRelPanel').modal('hide');
                    	$('#qrcomName').val('');
                    	$("#qrsearchList li").remove();
                    });
                }
            }
        })   
    },350);
}// searchCom
/*弹出层 - 联想公司和人 2*/
function qrtianbu (dom){
    $('#qrcomName').val($(dom).text());
    $('#qrcomName').attr('keyNo',$(dom).attr('keyNo'));
    $('#qrsearchList').hide();
}// tianbu



$(function(){
	
	/***** 主体功能  *****/
	
	// 公司容器高度改变
	window.onresize = function (){
		var containerHeight = $('.i_container').height();
		$('.i_com-wrap').height(containerHeight - 170);
	}
	
	//登录注册隐藏
	var hidepath = window.location.pathname;
	var hide = (hidepath == "/user_login" || hidepath == "/user_logintwo" || hidepath == "/user_login2" || hidepath == "/user_register");
	if(!hide) {
		$("#RNav").show();
	}
	
	// 点击空白关闭
	$(document).click(function(e){
		  var _con = $('#RNav');   // 设置目标区域
		  if(!_con.is(e.target) && _con.has(e.target).length === 0){
		       closePanel();
		  }
	});
	$(".i_title").click(function () {
		closePanel();
	});
	
	// 点击菜单打开面板等
	$('.i_to-option').click(function(){
		
		openPanel();
		
		/*菜单更改当前样式*/
		$('.i_bts-outer li').removeClass("active");
		$(this).addClass("active");
		
		/*切换内容列表*/
		var id = "#" + $(this).attr('to');
		$('.i_wrap').hide();
		$(id).show();
		
		switch(id){
			case '#RNCom':
				refreshCompareUI();
				break;
			case '#RNFoc':
				refreshFocUI();
				break;
			case '#RNRel':
				refreshRelUI();
				break;
		}
	});
	
	// 公司内容高度
	var containerHeight = $('.i_container').height();
	$('.i_com-wrap').height(containerHeight - 170);
	
	// 反馈
	$("#RNBack").click(function(){
        //zhugeTrack('反馈');
		closePanel();
	});
	
	// 置顶
	$("#RNTop").click(function(){
        //zhugeTrack('置顶');
		closePanel();
		$('html, body').animate({scrollTop:0}, 'slow' );
	});
	
	// 弹出层弹出自动focus input
	$('#qaddComPanel').on('shown.bs.modal', function (e) {
	  $("#qcomName").focus();
	})
	$('#addRelPanel').on('shown.bs.modal', function (e) {
	  $("#qrcomName").focus();
	})
		
	// 数字初始化
	initCount();
	function initCount() {
		
		// 比对数量
		var coms = [];
		if(localStorage.compareComs) {
			coms = JSON.parse(localStorage.compareComs);
		}
		
		if(coms && coms.length){
			$("#ComCount").parent().removeClass("spanHide");
			$("#ComCount").text(coms.length);
			$("#ComCount").show();
		} else {
			$("#ComCount").hide();
			$("#ComCount").parent().addClass("spanHide");
			$("#ComCount").text(0);
		}
		
		// 关系
		var rels = getRelComs();
		
		if(rels && rels.length){
			$("#RelCount").parent().removeClass("spanHide");
			$("#RelCount").text(rels.length);
			$("#RelCount").show();
		} else {
			$("#RelCount").hide();
			$("#RelCount").parent().addClass("spanHide");
			$("#RelCount").text(0);
		}
		
		// 关注列表
		//refreshFocUI();
	}
	
	
	
	/***** 找关系相关功能  *****/
	
	
	// 清空对比
	$("#ClearRels").click(function(){
		 localStorage.relComs = "";
		 refreshRelUI();
	});
	
	//打开全部
	$("#RelOpenAll").click(function () {
		var url = $(this).attr('target-url');
    	
    	// 获取数据
		var coms = getRelComs();
		
		if(coms && coms.length){

			if(coms.length<2){
				faldia({'content':'找公司必须两个以上'});
				return;
			}
			
			
			if(coms.length == 2){
				url += "#";
				
				var sourceCom = coms[0];
				var targetCom = coms[1];
				var obj = {
					sourceCompanyName : sourceCom.comName,
					sourceKeyNo : sourceCom.keyNo,
					sourceUserName : sourceCom.userName,
					targetCompanyName : targetCom.comName,
					targetKeyNo : targetCom.keyNo,
					targetUserName : targetCom.userName
				}
				
				url += JSON.stringify(obj);
			} else if( coms.length > 2) {
				url += "duo#";
				for(var i = 0; i < coms.length; i++){
					var com = coms[i];
					if(i == (coms.length - 1)){
						if(com.userName){
							url += com.userName;
						} else {
							url += com.comName;
						}
					} else {
						if(com.userName){
							url += com.userName + " ";
						} else {
							url += com.comName + " ";
						}
					}
					
				}
			}
		} else {
			faldia({'content':'找公司必须两个以上'});
			return;
		}
		
		window.location.href = encodeURI(url);
	});
	
	
	/***** 对比功能  *****/
	
	// 联想公司 1
	window.qsearchCom = function (event,dom){
	    setTimeout(function(){
	        var value = $(dom).val().trim();
	        var pdata = {
	        	key : value,
	        	type : 0,
	        	so : 1
	        }
	        $.ajax({ 
	            type: 'POST',
	            url: INDEX_URL+'/gongsi_getList',
	            data: pdata,
	            dataType:'json',
	            success: function(data) {
	                if(data&&data.length>0){
	                    var html='';
	                    for(var i=0;i<data.length;i++){
	                        html=html+'<a class="list-group-item" onclick="qtianbu(this)" keyNo="'+data[i].KeyNo+'"  href="javascript:;">'+data[i].Name+'</a>';
	                    }
	                    $('#qsearchList').html(html);
	                    $('#qsearchList').show();
	                }
	            }
	        })   
	    },350);
	}// searchCom
	// 联想公司 2
	window.qtianbu = function (dom){
	    $('#qcomName').val($(dom).text());
	    $('#qcomName').attr('keyNo',$(dom).attr('keyNo'));
	    $('#qsearchList').hide();
	}// tianbu
	
	/*弹出层添加确定*/
	$("#qaddComPanelConfirm").click(function(){
		var keyNo = $('#qcomName').attr('keyNo');
		window.qaddCom(keyNo);
	});
	
	window.qaddCom = function (keyNo){
	    if(keyNo&&keyNo!=''){
	        var exist = false;
	        var compareComs = [];
	        if(localStorage.compareComs){
	        	compareComs = JSON.parse(localStorage.compareComs);
	        }
	        for(var i=0;i<compareComs.length;i++){
	            if(compareComs[i].KeyNo==keyNo){
	                exist = true;
	                break;
	            }
	        }
	        if(!exist){
	            getCompany(keyNo,function(data){
	            	insertCompareCom(data);
	                $('#qcomName').val('');
	                $('#qcomName').attr('keyNo','');
	                $('#qaddComPanel').modal('hide');
	            });
	            
	        }else{
	            faldia({'content':'公司已经存在'});
	        }
	    }else{
	        faldia({'content':'请输入公司'});
	    }
	}// addCom
	
	window.insertCompareCom = function (company){
   	 	var compareComs = [];
   	 	
   	 	// 存入storage
		if(localStorage.compareComs) {
			compareComs = JSON.parse(localStorage.compareComs);
		}
		compareComs.push(company)
		localStorage.compareComs = JSON.stringify(compareComs);
		
		// 添加成功提示，并打开
		sucdia({'content':'添加成功'});
		
		refreshCompareUI();
	}
	
	window.delCompares = function (index) {
		var coms = JSON.parse(localStorage.compareComs);
		coms.splice(index,1);
		localStorage.compareComs = JSON.stringify(coms);
		refreshCompareUI();
		
		// 阻止冒泡
		var e=arguments.callee.caller.arguments[0]||event; 
		if (e && e.stopPropagation) {
			e.stopPropagation();
		} else if (window.event) {
			window.event.cancelBubble = true;
		}
	}
	
	// 清空对比
	$("#ClearCompares").click(function(){
		 localStorage.compareComs = "";
		 refreshCompareUI();
	});
	
	// 页面中添加对比
    window.pageAddCompare = function(companykey){
    	// 关闭其他面板
	    $('.i_wrap').hide();
	  
	  	//
    	qaddCom(companykey);
		refreshCompareUI();
		
		//打开右侧栏
		$('.i_bts-outer li').removeClass("active");
		$('.i_bts-outer li').eq(0).addClass("active");
		
		$("#RNCom").show();
		openPanel();
		
		// 阻止冒泡
		var e=arguments.callee.caller.arguments[0]||event; 
		if (e && e.stopPropagation) {
		 	e.stopPropagation();
		} else if (window.event) {
		  	window.event.cancelBubble = true;
		}
    }  
    
    // 打开对比页面
    $("#RNComA").click(function(){
    	var url = $(this).attr('target-url');
    	
    	// 获取数据
		var coms = [];
		if(localStorage.compareComs){
			coms = JSON.parse(localStorage.compareComs);
		}

		if(coms.length<2){
			faldia({'content':'对比公司必须两个以上'});
			return;
		}
		
		if(coms && coms.length){
			url += "#";
			for(var i = 0; i < coms.length; i++){
				var com = coms[i];
				if(i == (coms.length - 1)){
					url += com.KeyNo;
				} else {
					url += com.KeyNo + " ";
				}
			}
		} 
		
		window.location.href = encodeURI(url);
    });
});