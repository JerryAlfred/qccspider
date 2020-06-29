

function zhixingView(dataId,relat){
     $.ajax({
        type:'GET',
        url:INDEX_URL+'/company_zhixingDetail',
        data:{
            id:dataId
        },
        dataType:'json',
        success:function(msg){
            data = msg.data;
            if(data.Partycardnum == 0){
                data.Partycardnum = '';
            }
            if(data.Liandate){
                var newDate = new Date();
                newDate.setTime(data.Liandate*1000);
                data.Liandate = newDate.bformat('yyyy-MM-dd');
            }
            var html = '';
            html = html+"<table class='ntable'>";
            html = html+"<tr>";
            if(data.NameKeyNoCollection&&data.NameKeyNoCollection[0].KeyNo){
                html = html+"<td width='23%' class='tb'>被执行人：</td><td><a target='_blank' href='/firm/"+data.NameKeyNoCollection[0].KeyNo+".html'>"+(data.Name || '-')+"</a></td>";
            }else{
                html = html+"<td width='23%' class='tb'>被执行人：</td><td>"+(data.Name || '-')+"</td>";
            }
            html = html+"<td width='23%' class='tb'>身份证号码/组织机构代码：</td> <td width='27%'>"+(data.Partycardnum || '-')+"</td>";
            html = html+"</tr>";

            if(data.SqrInfo.length>0 && data.SqrInfo[0].Name){
                html = html+"<tr>";
                html = html+"<td width='23%' class='tb'>疑似申请执行人<a data-trigger='hover' data-html='true'  data-toggle='tooltip' data-placement='right' data-delay='500' title='该数据由企查查基于公开数据分析得出，仅供参考，<br/>不代表企查查任何明示、暗示之观点或保证'><i class='m_question'></i></a>：</td><td colspan='3'>";
                var sqr_info = '';
                $.each(data.SqrInfo,function(key,val){
                    if(val.KeyNo && val.Org == 2){
                        sqr_info = sqr_info+"<a target='_blank' href='/pl/"+val.KeyNo+".html'>"+(val.Name|| '-')+"</a> ";
                    }else if(val.KeyNo){
                        sqr_info = sqr_info+"<a target='_blank' href='/firm/"+val.KeyNo+".html'>"+(val.Name || '-')+"</a> ";
                    }else{
                        sqr_info = sqr_info+(val.Name || '-');
                    }
                    sqr_info = sqr_info+ ' ';
                });
                html = html+sqr_info+ "</td>";
                html = html+"</tr>";
            }

            html = html+"<tr>";
            html = html+"<td width='23%' class='tb'>执行标的（元）：</td><td>"+data.Biaodi+"</td>";
            html = html+"<td width='23%' class='tb'>执行法院：</td> <td>"+(data.Executegov || '-')+"</td>";
            html = html+"</tr>";

            html = html+"<tr>";
            html = html+"<td width='23%' class='tb'>立案日期：</td> <td>"+(data.Liandate || '-')+"</td>";
            html = html+"<td width='23%' class='tb'>案号：</td><td>";
            if(data.CaseSearchId && data.CaseSearchId.length){
                html = html+ "<a  rel='nofollow' target='_blank' href='"+INDEX_URL+"/case/"+data.CaseSearchId[0]+".html'>"+(data.Anno || '-')+"</a>";
            }else{
                html = html+ (data.Anno || '-');
            }
            html = html+"</tr>";
            html  = html+"</table>";
            if(relat){
                $('#relatDetail').html(html);
            }else{
                $('#zhixingview').html(html);
            }
            $('[data-toggle="tooltip"]').tooltip();
            
        }
    });
}

function shixinView(dataId,relat){
    $.ajax({
        type:'GET',
        url:INDEX_URL+'/company_shixinDetail',
        data:{
            id:dataId
        },
        dataType:'json',
        success:function(msg){
            data = msg.data;
            if(data.Liandate){
                var newDate = new Date();
                newDate.setTime(data.Liandate*1000);
                data.Liandate = newDate.bformat('yyyy-MM-dd');
                
            }
            if(data.Publicdate){
                var newDate = new Date();
                newDate.setTime(data.Publicdate*1000);
                data.Publicdate = newDate.bformat('yyyy-MM-dd');
            }
            var html = '';
            html = html+"<table class='ntable'>";
            html = html+"<tr>";
            if(data.NameKeyNoCollection&&data.NameKeyNoCollection[0].KeyNo){
                html = html+"<td width='23%' class='tb'>失信被执行人：</td><td width='27%'><a  target='_blank' href='/firm/"+data.NameKeyNoCollection[0].KeyNo+".html'>"+(data.Name || '-')+"</a></td>";
            }else{
                html = html+"<td width='23%' class='tb'>失信被执行人：</td><td width='27%'>"+(data.Name  || '-')+"</td>";
            }
            
            html = html+"<td width='23%' class='tb'>身份证号码/组织机构代码：</td> <td>"+(data.Orgno || '-')+"</td>";
            html = html+"</tr>";

            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td width='23%' class='tb'>被执行人的履行情况：</td><td>"+data.Executestatus+"</td>";
            html = html+"<td width='23%' class='tb'>省份：</td> <td>"+(data.Province || '-')+"</td>";
            html = html+"</tr>";

            html = html+"<tr>";
            html = html+"<td width='23%' class='tb'>案号：</td><td>";
            if(data.CaseSearchId && data.CaseSearchId != ''){
                html = html+ "<a  rel='nofollow' target='_blank' href='"+INDEX_URL+"/case/"+data.CaseSearchId[0]+".html'>"+(data.Anno || '-')+"</a>";
            }else{
                html = html+ (data.Anno || '-');
            }
            html = html+   "</td>";
            html = html+"<td width='23%' class='tb'>执行法院：</td> <td>"+(data.Executegov || '-')+"</td>";

            html = html+"</tr>";
            html = html+"<tr>";

            html = html+"<td width='23%' class='tb'>执行依据文号：</td><td>"+(data.Executeno || '-')+"</td>";
            html = html+"<td width='23%' class='tb'>做出执行依据单位：</td> <td>"+(data.Executeunite || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td width='23%' class='tb'>立案日期：</td> <td>"+(data.Liandate || '-')+"</td>";
            html = html+"<td width='23%' class='tb'>发布日期：</td><td>"+(data.Publicdate)+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb' width='23%'>失信被执行人行为具体情形：</td><td colspan='3'>"+(data.Actionremark  || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb' width='23%'>生效法律文书确定的义务：</td><td colspan='3'>"+($.trim(data.Yiwu) || '-')+"</td>";
            html = html+"</tr>";
            html  = html+"</table>";
            if(relat){
                $('#relatDetail').html(html);
            }else{
                $('#shixinview').html(html);
            }
        }
    })
}
/*裁判文书详情*/
function wsView(wsid,relat,callback){
    $.ajax({
        type:'POST',
        url:INDEX_URL+'/company_wenshuView',
        data:'id='+wsid,
        success:function(msg){
            var html="";
            var obj = JSON.parse(msg);
            if(callback){
                callback(obj);
            }else{
                if(obj.Status=="200"){
                    var html = obj.Result.ContentClear;
                    var wenshuView = $('<div class="wenshu-view"></div>');
                    wenshuView.html(html);
                    if(relat){
                        $("#relatDetail").html(wenshuView);
                    }else{
                        $("#wsview").html(wenshuView);
                    }
                }else{
                    if(relat){
                        $("#relatDetail").html("未找到相关信息");
                    }else{
                        $("#wsview").html("未找到相关信息");
                    }
                }
            }
        }
    })
}

/*裁判文书详情html*/
function wenshuHtml(id){
    $('#wshtml').empty();
    $.ajax({
        url:INDEX_URL+'/company_wenshuHtml',
        data:'id='+id,
        dataType:'html',
        success:function(html){
            $('#wshtml').html(html);
        }
    })
}

//开庭公告
function ktnoticeView(ktid,relat) {
    $.ajax({
        type:'POST',
        url:INDEX_URL+'/company_ktnoticeView',
        data:'id='+ktid,
        success:function(msg){
            var html="";
            var obj = JSON.parse(msg);
            if(obj.status=="200"){
                var data = obj.data;
                var html = '';
                /*
                var defendant_ = '';
                if(data.defendant){
                    $.each(data.defendant,function(i,item){
                        if(item.keyno){
                            var name_ = '<a class="text-blue"  href="'+INDEX_URL+'/firm/'+item.keyno+'.html" target="_blank" class="c_a" >'+item.name+'</a>';
                            defendant_ = defendant_ + name_;
                        }else {
                            defendant_ = defendant_ + item.name;
                        }

                        if(data.defendant.length != (i+1)){
                            defendant_ = defendant_ + '、';
                        }
                    });
                }

                var thirdParty_ = '';
                if(data.ThirdParty){
                    $.each(data.ThirdParty,function(i,item){
                        if(item.keyno){
                            var name_ = '<a class="text-blue"  href="'+INDEX_URL+'/firm/'+item.keyno+'.html" target="_blank" class="c_a" >'+item.name+'</a>';
                            thirdParty_ = thirdParty_ + name_;
                        }else {
                            thirdParty_ = thirdParty_ + item.name;
                        }
                        thirdParty_ = thirdParty_ + ' ';
                    });
                }*/

                var Party_ = '';
                if(data.Party){
                    $.each(data.Party,function(i,item){
                        var role_ = '';
                        if(item.RoleType == 'P'){
                            role_ = '上诉人/原告-';
                        }else if(item.RoleType == 'D'){
                            role_ = '被上诉人/被告-';
                        }else if(item.RoleType == 'TP'){
                            role_ = '第三方人-';
                        }
                        Party_ = Party_ + role_;
                        if(item.KeyNo){
                            var name_ = '<a class="text-blue"  href="'+INDEX_URL+'/firm/'+item.KeyNo+'.html" target="_blank" class="c_a" >'+item.Name+'</a>';
                            Party_ = Party_ + name_;
                        }else {
                            Party_ = Party_ + item.Name;
                        }
                        if(data.Party.length != (i+1)){
                            Party_ = Party_ + '<br/> ';
                        }
                    });
                }

                if(data.schedule_time){
                    var newDate = new Date();
                    newDate.setTime(data.schedule_time*1000);
                    data.schedule_time = newDate.bformat('yyyy-MM-dd');
                }

                html = html+"<table class='ntable'>";
                html = html+"<tr>";
                html = html+"<td class='tb' width='21%' >案由：</td><td colspan='3'>"+(data.case_reason || '-')+"</td>";
                html = html+"</tr>";

                html = html+"<tr>";
                html = html+"<td width='21%' class='tb'>案号：</td><td width='29%'>";
                if(data.CaseSearchId && data.CaseSearchId != ''){
                    html = html+ "<a  rel='nofollow' target='_blank' href='"+INDEX_URL+"/case/"+data.CaseSearchId[0]+".html'>"+(data.case_no || '-')+"</a>";
                }else{
                    html = html+ (data.case_no || '-');
                }
                html = html+   "</td>";
                html = html+"<td width='21%' class='tb'>开庭时间：</td> <td width='29%'>"+(data.open_time || '-')+"</td>";
                html = html+"</tr>";
                html = html+"<tr>";
                html = html+"<td class='tb'>地区：</td><td>"+(data.province || '-')+"</td>";
                html = html+"<td class='tb'>排期日期：</td> <td>"+(data.schedule_time || '-')+"</td>";
                html = html+"</tr>";

                html = html+"<tr>";
                html = html+"<td class='tb'>承办部门：</td> <td>"+(data.undertake_department || '-')+"</td>";
                html = html+"<td class='tb'>审判长/主审人：</td><td>"+(data.chief_judge || '-')+"</td>";
                html = html+"</tr>";

                html = html+"<tr>";
                html = html+"<td class='tb' style='width:15%;'>当事人：</td><td colspan='3'>"+(Party_ || '-')+"</td>";
                html = html+"</tr>";

                html = html+"<tr>";
                html = html+"<td class='tb'>法院：</td> <td>"+(data.execute_gov|| '-')+"</td>";
                html = html+"<td class='tb'>法庭：</td><td>"+(data.execute_unite|| '-')+"</td>";
                html = html+"</tr>";

                html = html+"<tr>";
                html = html+"<td class='tb' width='21%' >公告内容：</td><td colspan='3'>"+(data.content || '-')+"</td>";
                html = html+"</tr>";

                html  = html+"</table>";
                if(relat){
                    $("#relatDetail").html(html);
                }else{
                    $("#ktggview").html(html);
                }
                
            }else{
                if(relat){
                    $("#relatDetail").html("未找到相关信息");
                }else{
                    $("#ktggview").html("未找到相关信息");
                }
                
            }
        }
    })
}
//终本案件
function zhongbenView(id,relat) {
    $("#relatDetail").empty();
    $.ajax({
        url:INDEX_URL+'/company_zhongbendetail',
        data:{id:id},
        dataType:'json',
        success:function(res){
            var data = res.data
            var html="";
            html = html+"<table class='ntable'>";
            html = html+"<td class='tb' width='15%'>案号</td> <td width='35%'>"+(data.CaseNo || '-')+"</td>";
            html = html+"<td class='tb' width='15%'>被执行人姓名</td><td width='35%'>"+getCoyStr(data.OwnerInfo)+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb'>身份证号码/组织机构代码</td> <td>"+(data.CerNo || '-')+"</td>";
            html = html+"<td class='tb'>执行法院</td><td>"+(data.Court || '-')+"</td>";
            html = html+"</tr>";

            html = html+"<tr>";
            html = html+"<td class='tb'>立案时间</td> <td>"+getMomentDate(data.JudgeDate)+"</td>";
            html = html+"<td class='tb'>终本日期</td><td>"+getMomentDate(data.EndDate)+"</td>";
            html = html+"</tr>";

            html = html+"<tr>";
            html = html+"<td class='tb'>执行标的（元）</td> <td>"+(data.BiaoDi || '-')+"</td>";
            html = html+"<td class='tb'>未履行金额</td><td>"+(data.UnFinishedAmt || '-')+"</td>";
            html = html+"</tr>";

            html  = html+"</table>";
            if(relat){
                $("#relatDetail").html(html);
            }else{
                //$("#ktggview").html(html);
            }
        }
    })
}



/*商标详情*/
function sbview(sbid){
    $.ajax({
        type:'POST',
        url:INDEX_URL+'/company_shangbiaoView',
        data:'id='+sbid,
        success:function(msg){
            var html="";
            var obj = JSON.parse(msg);
            //alert("11"+msg);
            if(obj.Status=="200"){
                var html = shangbiaoHTML(obj.Result);
                $(".sbview").html(html);
            }else{
                $(".sbview").html("未找到相关商标信息");
            }
        }
    })
}

/**商标html**/
function shangbiaoHTML(data){
    var html='';
    html = html+"<table class='ntable'>";
    if(data.ImageUrl){
         html = html+"<tr>";
        html = html+"<td class='text-center' colspan='4'><img src='"+data.ImageUrl+"' onerror='this.src=\"/material/theme/chacha/cms/v2/images/no_image.png\"'  style='max-width:200px;'/></td>";
        html = html+"</tr>";
    }
    html = html+"<tr>";
    html = html+"<td class='tb' style='width:15%;'>商标名称：</td><td colspan='3'>"+(data.Name || '-')+"</td>";
    html = html+"</tr>";
    html = html+"<tr>";
    html = html+"<td width='18%' class='tb'>注册号：</td> <td width='32%'>"+data.RegNo+"</td>";
    html = html+"<td width='18%' class='tb'>状态：</td><td width='32%'>"+(data.FlowStatusDesc || '-')+"</td>";
    html = html+"</tr>";
    html = html+"<tr>";
    html = html+"<td class='tb'>国际分类：</td> <td>"+(data.IntCls + " - " + data.IntClsDesc)+"</td>";
    html = html+"<td class='tb'>申请日期：</td><td>"+data.AppDate+"</td>";
    html = html+"</tr>";
    html = html+"<tr>";
    html = html+"<td class='tb'>使用期限：</td> <td>"+data.ValidPeriod+"</td>";
    html = html+"<td class='tb'>代理机构：</td> <td>"+(data.Agent || '-')+"</td>";
    html = html+"</tr>";
    html = html+"<tr>";
    html = html+"<td class='tb'>初审公告号：</td> <td>"+(data.AnnouncementIssue||"-")+"</td>";
    html = html+"<td class='tb'>注册公告号：</td><td>"+(data.RegIssue||"-")+"</td>";
    html = html+"</tr>";
    html = html+"<tr>";
    html = html+"<td class='tb'>申请人：</td> <td>"+(data.ApplicantCn || '-')+"</td>";
    html = html+"<td class='tb'>申请地址：</td><td>"+(data.AddressCn || '-')+"</td>";
    html = html+"</tr>";
    html = html+"<tr>";
    html = html+"<td class='tb'>商品服务列表：</td> <td>";
    var list_group_ = '';
    for(var i=0;i<data.ListGroupItems.length;i++){
        list_group_=list_group_+"<p>"+data.ListGroupItems[i]+"</p>";
    }
    if(list_group_){
        html = html+list_group_+"</td>";
    }else{
        html = html+"-"+"</td>";
    }
    html = html+"<td class='tb'>申请流程：</td><td>";
    var flow_ = '';
    for(var i=0;i<data.FlowItems.length;i++){
        flow_=flow_+"<p>";
        if(data.FlowItems[i].FlowDate){
            flow_ = flow_+""+data.FlowItems[i].FlowDate+"";
        }
        flow_  = flow_+"&nbsp;&nbsp;"+data.FlowItems[i].FlowItem+"";
        flow_  = flow_+"</p>";
    }
    if(flow_){
        html = html+flow_+"</td>";
    }else{
        html = html+"-</td>";
    }
    html = html+"</tr>";
    html  = html+"</table>";
    return html;
}

/*专利详情*/
function zlView(zlid){
    $.ajax({
        type:'POST',
        url:INDEX_URL+'/company_zhuanliView',
        data:'id='+zlid,
        success:function(msg){
            var html="";
            var obj = JSON.parse(msg);
            // alert("11"+msg);
            if(obj.Result){
                var html = zhuanliHTML(obj.Result);
                $(".zlview").html(html);
            }else{
                $(".zlview").html("未找到相关信息");
            }
        }
    });
}




function zhuanliHTML(data){
    if(data.ApplicationDate){
        var newDate = new Date();
        newDate.setTime(data.ApplicationDate*1000);
        data.ApplicationDate = newDate.bformat('yyyy-MM-dd');
    }
    if(data.PublicationDate){
        var newDate = new Date();
        newDate.setTime(data.PublicationDate*1000);
        data.PublicationDate = newDate.bformat('yyyy-MM-dd');
    }
    var html='';
    html = html+"<table class='ntable'>";
    html = html+"<tr>";
    html = html+"<td class='tb' style='width:15%;'>名称：</td><td colspan='3'>"+data.Title+"</td>";
    html = html+"</tr>";
    html = html+"<tr>";
    html = html+"<td class='tb'>申请号：</td> <td>"+data.ApplicationNumber+"</td>";
    html = html+"<td class='tb'>申请日：</td><td>"+data.ApplicationDate+"</td>";
    html = html+"</tr>";
    html = html+"<tr>";
    html = html+"<td class='tb'>公开（公告）号：</td> <td>"+data.PublicationNumber+"</td>";
    html = html+"<td class='tb'>公开（公告）日：</td><td>"+data.PublicationDate+"</td>";
    html = html+"</tr>";
    html = html+"<tr>";
    html = html+"<td class='tb'>发明人：</td>";
    html = html+"<td>"
    $.each(data.InventorStringList,function(i,value){
        html = html+""+value+"&nbsp;&nbsp;";
    });
    html = html+"</td>";
    html = html+"<td class='tb'>类型：</td><td>"+data.KindCodeDesc+"</td>";
    html = html+"</tr>";
    html = html+"<tr class='white'>";
    html = html+"<td class='tb'>专利代理机构：</td> <td>"+(data.Agency || '-')+"</td>";
    html = html+"<td class='tb'>法律状态：</td><td>"+(data.LegalStatusDesc || '-')+"</td>";
    html = html+"</tr>";
    html = html+"<tr class='white'>";
    html = html+"<td class='tb' style='width:15%;'>法律历史状态：</td><td colspan='3'>";
    if(data.PatentLegalHistory.length>0){
        $.each(data.PatentLegalHistory,function(i,item){
            if(item.LegalStatusDate){
                var newDate = new Date();
                newDate.setTime(item.LegalStatusDate*1000);
                item.LegalStatusDate = newDate.bformat('yyyy-MM-dd');
            }
            html = html+""+item.Desc+"&nbsp;&nbsp;"+item.LegalStatusDate+"&nbsp;&nbsp;";
            if(data.PatentLegalHistory.length>1 && data.PatentLegalHistory.length>(i+1)){
                html = html+"→";
            }
            html = html+"&nbsp;&nbsp;";
        });
    }else{
        html = html+"-";
    }
    html = html+"</td>";
    html = html+"</tr>";
    html = html+"<tr class='white'>";
    html = html+"<td class='tb'>摘要：</td><td colspan='3'>"+data.Abstract+"</td>";
    html = html+"</tr>";
    html  = html+"</table>";
    return html;
}

/*证书详情*/

function zsView(zsid){
    $.ajax({
        type:'POST',
        url:INDEX_URL+'/company_zhengshuView',
        data:'id='+zsid,
        success:function(msg){
            var html="";
            var obj = JSON.parse(msg);
            // alert("11"+msg);
            if(obj.status=="200"){
                var html = zhengshuHTML(obj.data);
                $(".zsview").html(html);
            }else{
                $(".zsview").html("未找到相关信息");
            }
        }
    })
}



function zhengshuHTML(data){
    var html='';
    html = html+"<table class='ntable'>";
    $.each(data.NewData,function(i,value){
        i = value.key;
        value = value.value;
        if(!value || value=='-'){
            value = '-';
            return true;
        }
        if(i=='排污许可证正本' && value && value!='-'){
            html = html+"<tr>";
            html = html+"<td class='tb' style='width:18%;'>"+i+"</td><td colspan='3'><div style='word-wrap: break-word; word-break: break-all; '>";
            html = html+"<a target='_blank' href='"+value.url+"'>"+value.name+"</a>"
            html = html+"</div></td></tr>";
        }else if(i=='排污许可证副本' && value && value!='-'){
            html = html+"<tr>";
            html = html+"<td class='tb' style='width:18%;'>"+i+"</td><td colspan='3'><div style='word-wrap: break-word; word-break: break-all; '>";
            html = html+"<a target='_blank' href='"+value.url+"'>"+value.name+"</a>"
            html = html+"</div></td></tr>";
        }else if((i=='企业法人营业执照或其他主体资格证明' || i=='与特许经营活动相关的商标权、专利权其他经营资源的注册证书') && value && value!='-'){
            var reportArr = JSON.parse(value);
            html = html+"<tr>";
            html = html+"<td class='tb' style='width:18%;'>"+i+"</td><td colspan='3'><div style='word-wrap: break-word; word-break: break-all; '>";
            $.each(reportArr,function(i,v){
                html = html+"<div><a target='_blank' href='"+v.url+"'>"+v.name+"</div></a>"
            })
            html = html+"</div></td></tr>";
        }else if(i=='执行报告' && value && value!='-'){
            var reportArr = JSON.parse(value);
            html = html+"<tr>";
            html = html+"<td class='tb' style='width:18%;'>"+i+"</td><td colspan='3'><div style='word-wrap: break-word; word-break: break-all; '>";
            $.each(reportArr,function(i,v){
                html = html+"<div><a target='_blank' href='"+v.link+"'>"+v.name+"</div></a>"
            })
            html = html+"</div></td></tr>";
        }else if(i!='_id'&&i!='_status'&&i!='_title'&&i!='_type'&&i!='showtemp'&&i!='manuInfoItem'&&i!='facInfoItem'){
            
            html = html+"<tr>";
            html = html+"<td class='tb' style='width:18%;'>"+i+"</td><td colspan='3'><div style='word-wrap: break-word; word-break: break-all; '>"+value+"</div></td>";
            html = html+"</tr>";
        }
    });

    html  = html+"</table>";
    return html;
}




//行政许可
function xzxukeView(xkid) {
    $.ajax({
        type:'POST',
        url:INDEX_URL+'/company_xzxukeView',
        data:'id='+xkid,
        success:function(msg){
            var html="";
            var obj = JSON.parse(msg);
            if(obj.status=="200"){
                var html = xzxukeHTML(obj.data);
                $(".xzxukeview").html(html);
            }else{
                $(".xzxukeview").html("未找到相关信息");
            }
        }
    })
}

function xzxukeHTML(data){
    if(data.province == '总局'){
        data.province = '全国';
    }
    var html='';
    html = html+"<table class='ntable'>";
    html = html+"<tr>";
    html = html+"<td class='tb' style='width:15%;'>项目名称：</td><td colspan='3'>"+(data.name || '-')+"</td>";
    html = html+"</tr>";
    html = html+"<tr>";
    html = html+"<td class='tb' width='15%'>许可机关：</td> <td width='35%'>"+(data.office_no || '-')+"</td>";
    html = html+"<td class='tb' width='15%'>决定文书号：</td><td width='35%'>"+(data.document_no || '-')+"</td>";
    html = html+"</tr>";
    html = html+"<tr>";
    html = html+"<td class='tb'>决定日期：</td> <td>"+(data.decide_date || '-')+"</td>";
    html = html+"<td class='tb'>许可状态：</td><td>"+(data.status || '-')+"</td>";
    html = html+"</tr>";

    html = html+"<tr>";
    html = html+"<td class='tb'>许可内容：</td> <td>"+(data.content || '-')+"</td>";
    html = html+"<td class='tb'>截止日期：</td><td>"+(data.expire_date || '-')+"</td>";
    html = html+"</tr>";

    html = html+"<tr>";
    html = html+"<td class='tb'>审批类别：</td> <td>"+(data.type || '-')+"</td>";
    html = html+"<td class='tb'>地域：</td><td>"+(data.province || '-')+"</td>";
    html = html+"</tr>";

    html  = html+"</table>";
    return html;
}

//行政处罚
function xzcfView(cfid,ftype) {
    $.ajax({
        type:'POST',
        url:INDEX_URL+'/company_xzcfView',
        data:'id='+cfid,
        success:function(msg){
            var html="";
            var obj = JSON.parse(msg);
            if(ftype == 's'){
                $('.show-modal-list').css('margin-left','-100%');
                $('.show-modal-detail').css('margin-left','0px');
                if(obj.status=="200"){
                    var html = xzcfHTML(obj.data);
                    $('#showDetail').html(html);
                }else{
                    $('#showDetail').html('未找到相关信息');
                }
            }else{
                if(obj.status=="200"){
                    var html = xzcfHTML(obj.data);
                    $(".xzcfview").html(html);
                }else{
                    $(".xzcfview").html("未找到相关信息");
                }
                $('#cfModal').modal('show');
            }

        }
    })
}

function xzcfHTML(data) {
    var html='';
    var chtml = '';
    if(data.CompanyAndKeyNo[0].KeyNo){
        chtml = '<a target="_blank" href="'+INDEX_URL+'/firm/'+data.CompanyAndKeyNo[0].KeyNo+'.html">'+data.CompanyAndKeyNo[0].Name+'</a>'
    }else{
        chtml = data.CompanyAndKeyNo[0].Name;
    }
    html = html+"<table class='ntable'>";
    html = html+"<tr>";
    html = html+"<td class='tb' style='width:15%;'>处罚名称：</td><td >"+(data.name || '-')+"</td>";
    html = html+"<td width='15%' class='tb'>行政相对人名称：</td> <td width='35%' >"+(chtml || '-')+"</td>";
    html = html+"</tr>";
    html = html+"<tr>";
    html = html+"<td width='15%' class='tb'>决定文书号：</td><td width='35%' >"+(data.document_no || '-')+"</td>";
    html = html+"<td width='15%' class='tb'>处罚事由：</td> <td width='35%' >"+(data.reason || '-')+"</td>";
    html = html+"</tr>";
    html = html+"<tr>";
    html = html+"<td class='tb'>处罚状态：</td><td>"+(data.status || '-')+"</td>";
    html = html+"<td class='tb'>决定日期：</td> <td>"+(data.decide_date || '-')+"</td>";
    html = html+"</tr>";

    html = html+"<tr>";
    html = html+"<td class='tb'>处罚类别1：</td> <td>"+(data.typ1 || '-')+"</td>";
    html = html+"<td class='tb'>处罚类别2：</td><td>"+(data.typ2 || '-')+"</td>";
    html = html+"</tr>";

    html = html+"<tr>";
    html = html+"<td class='tb' style='width:15%;'>处罚依据：</td><td colspan='3'>"+(data.according || '-')+"</td>";
    html = html+"</tr>";

    html = html+"<tr>";
    html = html+"<td class='tb'>处罚结果：</td> <td>"+(data.content|| '-')+"</td>";
    html = html+"<td class='tb'>处罚机关：</td><td>"+(data.office_no|| '-')+"</td>";
    html = html+"</tr>";

    html  = html+"</table>";
    return html;
}
// 人员详情-股权冻结
function assistanceViewPeo(data,keyno) {
    var id = '';
    var personId = '';
    var dom = '';
    if(keyno){
        id = data;
        personId = keyno;
        dom = '#xzxkview';
    }else{
        id = data.No;
        personId = data.KeyNo;
        dom = '#assistanceview';
    }
    $.ajax({
        type:'POST',
        url:INDEX_URL+'/people_getAssistance',
        data:{id:id,personId:personId},
        success:function(msg){
            var obj = JSON.parse(msg);
            if(obj.status=="200"){
                var html = assistanceHtml(obj.data);
                $(dom).html(html);
            }
        }
    })
}
function assistanceView(data,keyno) {
    if(keyno){
        $.ajax({
            url:INDEX_URL+'/company_assistancedetail',
            data:{
                id:data,
                keyno:keyno
            },
            success:function(rs){
                if(rs.data){
                    var html = assistanceHtml(rs.data);
                    $("#xzxkview").html(html);
                }else{
                    $("#xzxkview").html('<div class="pnodata lg"> <img src="/material/theme/chacha/cms/v2/images/nno_image.png"> <p>暂无信息</p> </div>');

                }
                $('#assistanceModal').modal('show');
                
            }
        })
    }else{
        var html = assistanceHtml(data);
        $("#xzxkview").html(html);
    }
     
}
function assistanceHtml(data){
    console.info(data)
    data.Name = data.ExecutedBy;
    var html = '';
    if(data.EquityFreezeDetail){
        html = html+"<div class='mtcaption'>股权冻结信息</div>";
        html = html+"<table class='ntable'>";
        

        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>执行通知书文号：</td><td  width='30%'>"+(data.ExecutionNoticeNum  || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>执行事项：</td> <td width='30%'>"+(data.EquityFreezeDetail.ExecutionMatters  || '-')+"</td>";
        html = html+"</tr>";

        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>执行法院：</td><td  width='30%'>"+(data.EnforcementCourt  || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>执行文书文号：</td> <td>"+(data.EquityFreezeDetail.ExecutionDocNum  || '-')+"</td>";
        html = html+"</tr>";

        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>执行裁定书文号：</td><td  width='30%'>"+(data.EquityFreezeDetail.ExecutionVerdictNum  || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>被执行人：</td><td  width='30%'>"+getCoyStr(data)+"</td>";
        html = html+"</tr>";

        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>被执行人持有股权、其他投资权益数额：</td> <td>"+(data.EquityAmount  || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>冻结股权标的企业</td> <td>"+getCoyStr(data.RelatedCompanyInfo)+"</td>";
        html = html+"</tr>";

        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>被执行人证件种类：</td><td  width='30%'>"+(data.EquityFreezeDetail.ExecutedPersonDocType  || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>被执行人证件号码：</td> <td>"+(data.EquityFreezeDetail.ExecutedPersonDocNum  || '-')+"</td>";
        html = html+"</tr>";

        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>冻结日期自：</td><td  width='30%'>"+(data.EquityFreezeDetail.FreezeStartDate  || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>冻结日期至：</td> <td>"+(data.EquityFreezeDetail.FreezeEndDate  || '-')+"</td>";
        html = html+"</tr>";

        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>冻结期限：</td><td  width='30%'>"+(data.EquityFreezeDetail.FreezeTerm  || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>公示日期：</td> <td>"+(data.EquityFreezeDetail.PublicDate  || '-')+"</td>";
        html = html+"</tr>";
        html  = html+"</table>";
    }
    if(data.EquityUnFreezeDetail){
        html = html+"<div class='tcaption m-t-n-md'>股权解冻信息</div>";
        html = html+"<table class='ntable'>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>执行通知书文号：</td><td width='30%'>"+(data.ExecutionNoticeNum  || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>执行事项：</td> <td>"+(data.EquityUnFreezeDetail.ExecutionMatters  || '-')+"</td>";
        html = html+"</tr>";

        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>执行法院：</td><td  width='30%'>"+(data.EnforcementCourt  || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>执行文书文号：</td> <td>"+(data.EquityUnFreezeDetail.ExecutionDocNum  || '-')+"</td>";
        html = html+"</tr>";

        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>执行裁定书文号：</td><td  width='30%'>"+(data.EquityUnFreezeDetail.ExecutionVerdictNum  || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>被执行人：</td><td  width='30%'>"+getCoyStr(data)+"</td>";
        html = html+"</tr>";

        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>被执行人持有股权、其他投资权益数额：</td> <td>"+(data.EquityAmount  || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>冻结股权标的企业</td> <td>"+getCoyStr(data.RelatedCompanyInfo)+"</td>";
        html = html+"</tr>";

        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>被执行人证件种类：</td><td width='30%'>"+(data.EquityUnFreezeDetail.ExecutedPersonDocType  || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>被执行人证件号码：</td> <td>"+(data.EquityUnFreezeDetail.ExecutedPersonDocNum  || '-')+"</td>";
        html = html+"</tr>";

        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>解冻机关：</td><td  width='30%'>"+(data.EquityUnFreezeDetail.ThawOrgan  || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>解冻文书号：</td> <td>"+(data.EquityUnFreezeDetail.ThawDocNo  || '-')+"</td>";
        html = html+"</tr>";

        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>解除冻结日期：</td><td  width='30%'>"+(data.EquityUnFreezeDetail.UnFreezeDate  || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>公示日期：</td> <td>"+(data.EquityUnFreezeDetail.PublicDate  || '-')+"</td>";
        html = html+"</tr>";
        html  = html+"</table>";
    }

    if(data.JudicialPartnersChangeDetail){
        html = html+"<div class='tcaption m-t-n-md'>股东变更信息</div>";
        html = html+"<table class='ntable'>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>执行通知书文号：</td><td  colspan='3'>"+(data.ExecutionNoticeNum  || '-')+"</td>";
        html = html+"</tr>";

        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>执行法院：</td><td  width='30%'>"+(data.EnforcementCourt  || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>执行事项：</td> <td>"+(data.JudicialPartnersChangeDetail.ExecutionMatters  || '-')+"</td>";
        html = html+"</tr>";

        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>执行裁定书文号：</td><td  width='30%'>"+(data.JudicialPartnersChangeDetail.ExecutionVerdictNum  || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>冻结股权标的企业</td> <td>"+getCoyStr(data.RelatedCompanyInfo)+"</td>";
        html = html+"</tr>";

        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>被执行人：</td><td  width='30%'>"+getCoyStr(data)+"</td>";
        html = html+"<td class='tb' width='20%'>被执行人持有股权数额：</td> <td>"+(data.EquityAmount  || '-')+"</td>";
        html = html+"</tr>";

        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>被执行人证件种类：</td><td width='30%'>"+(data.JudicialPartnersChangeDetail.ExecutedPersonDocType  || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>被执行人证件号码：</td> <td>"+(data.JudicialPartnersChangeDetail.ExecutedPersonDocNum  || '-')+"</td>";
        html = html+"</tr>";

        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>受让人：</td><td  width='30%'>"+(data.JudicialPartnersChangeDetail.Assignee  || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>协助执行日期：</td> <td>"+(data.JudicialPartnersChangeDetail.AssistExecDate  || '-')+"</td>";
        html = html+"</tr>";

        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>受让人证照种类：</td><td width='30%'>"+(data.JudicialPartnersChangeDetail.AssigneeDocKind  || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>受让人证照号码：</td> <td>"+(data.JudicialPartnersChangeDetail.AssigneeRegNo  || '-')+"</td>";
        html = html+"</tr>";
        html  = html+"</table>";
    }
    return html;
}  

//法院公告
function gonggaoView(dataId){
    $('#gonggaoModalLabel').text('法院公告详情');
    $.ajax({
        type:'GET',
        url:INDEX_URL+'/company_gonggaoDetail',
        data:{
            id:dataId
        },
        dataType:'json',
        success:function(msg){
            var data = msg.data;
            if(data.PublishDate){
                var newDate = new Date();
                newDate.setTime(data.PublishDate*1000);
                data.PublishDate = newDate.bformat('yyyy-MM-dd');
                
            }
            if(data.SubmitDate){
                var newDate = new Date();
                newDate.setTime(data.SubmitDate*1000);
                data.SubmitDate = newDate.bformat('yyyy-MM-dd');
            }
            var html = '';
            html = html+"<table class='ntable'>";
            html = html+"<tr>";
            html = html+"<td width='25%' class='tb'>公诉人/原告/上诉人/申请人</td> <td width='25%'>"+getCoyStr(data.ProsecutorList)+"</td>";
            html = html+"<td width='25%' class='tb'>被告人/被告/被上诉人/被申请人</td> <td width='25%'>"+getCoyStr(data.DefendantList)+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb'>公告类型：</td> <td width='25%'>";
            html = html+ (data.Category || '-');
            html = html+   "</td>";
            html = html+"<td class='tb'>刊登日期：</td> <td>"+(data.PublishDate || '-')+"</td>";
            
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb'>刊登版面：</td><td>"+(data.PublishPage || '-')+"</td>";
            html = html+"<td class='tb'>公告人：</td><td>"+(data.Court || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb'>上传日期：</td><td>"+(data.SubmitDate  || '-')+"</td>";
            html = html+"<td class='tb'>案号：</td><td>";
            if(data.CaseSearchId && data.CaseSearchId != ''){
                html = html+ "<a  rel='nofollow' target='_blank' href='"+INDEX_URL+"/case/"+data.CaseSearchId[0]+".html'>"+(data.Ano || '-')+"</a>";
            }else{
                html = html+ (data.Ano || '-');
            }
            html = html+   "</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb'>内容：</td><td colspan='3'>"+(data.Content  || '-')+"</td>";
            html = html+"</tr>";
            html  = html+"</table>";
            $('#gonggaoview').html(html);
            $('#gonggaoModal').modal('show');
        }
    });
}

//简易注销
function jyzxView(id){
    $.ajax({
        type:'GET',
        url:INDEX_URL+'/company_jyzxDetail',
        data:{
            id:id
        },
        dataType:'json',
        success:function(res){
            var data = res.data;
            var docUrlStr = '-';
            if(data.DocUrl){
                docUrlStr = '<a target="_blank" href="'+data.DocUrl+'">查看详情</a>'
            }
            var html = '';
            html = html+"<table class='ntable'>";
            html = html+"<tr>";
            html = html+"<td class='tb' width='20%'' rowspan='5'>企业公告信息</td>"
            html = html+"<td width='20%'>企业名称</td><td>"+'<a class="text-blue"  href="'+INDEX_URL+'/firm/'+id+'.html" target="_blank" class="c_a" >'+(data.CompanyName  || '-')+'</a>'+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td width='20%'>统一社会信用代码/注册号</td> <td width='27%'>"+(data.RegNoOrCreditCode  || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td width='20%'>登记机关</td> <td width='27%'>"+(data.Registration || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td width='20%'>公告期</td><td>"+(data.PublicDate || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td width='20%'>全体投资人承诺书</td><td>"+(docUrlStr || '-')+"</td>";
            html = html+"</tr>";
            if(data.DissentList){
                var len = data.DissentList.length*3;
                data.DissentList.forEach(function (dis,i) {
                    html = html+"<tr>";
                    if(i == 0){
                        html = html+"<td class='tb' width='20%'' rowspan='"+len+"'>异议信息</td>"
                    }
                    html = html+"<td width='20%'>异议申请人</td><td>"+(dis.DissentPerson || '-')+"</td>";
                    html = html+"</tr>";
                    html = html+"<tr>";
                    html = html+"<td width='20%'>异议时间</td><td>"+(dis.DissentDate || '-')+"</td>";
                    html = html+"</tr>";
                    html = html+"<tr>";
                    html = html+"<td width='20%'>异议内容</td><td>"+(dis.DissentContent || '-')+"</td>";
                    html = html+"</tr>";
                })
            }else{
                html = html+"<tr>";
                html = html+"<td class='tb' width='20%'' rowspan='3'>异议信息</td>"
                html = html+"<td width='20%'>异议申请人</td><td>"+'-'+"</td>";
                html = html+"</tr>";
                html = html+"<tr>";
                html = html+"<td width='20%'>异议时间</td><td>"+'-'+"</td>";
                html = html+"</tr>";
                html = html+"<tr>";
                html = html+"<td width='20%'>异议内容</td><td>"+'-'+"</td>";
                html = html+"</tr>";
            }
            if(data.CancellationResultList && data.CancellationResultList[0]){
                html = html+"<tr>";
                html = html+"<td class='tb' width='20%'' rowspan='3'>简易注销结果</td>"
                html = html+"<td width='20%'>简易注销结果</td><td>"+(data.CancellationResultList[0].ResultContent || '-')+"</td>";
                html = html+"</tr>";
                html = html+"<tr>";
                html = html+"<td width='20%'>公告申请日期</td><td>"+(data.CancellationResultList[0].PublicDate || '-')+"</td>";
                html = html+"</tr>";
            }
            html  = html+"</table>";
            $('#jyzxModal .modal-body').html(html);
            $('#jyzxModal').modal('show');
        }
    });
}


//开庭公告
function ktnoticeViewOld(ktid) {
    $.ajax({
        type:'POST',
        url:INDEX_URL+'/company_ktnoticeView',
        data:'id='+ktid,
        success:function(msg){
            var html="";
            var obj = JSON.parse(msg);
            if(obj.status=="200"){
                var data = obj.data;
                var html = '';
                var defendant_ = '';
                if(data.defendant){
                    $.each(data.defendant,function(i,item){
                        if(item.keyno){
                            var name_ = '<a class="text-blue"  href="'+INDEX_URL+'/firm/'+item.keyno+'.html" target="_blank" class="c_a" >'+item.name+'</a>';
                            defendant_ = defendant_ + name_;
                        }else {
                            defendant_ = defendant_ + item.name;
                        }

                        if(data.defendant.length != (i+1)){
                            defendant_ = defendant_ + '、';
                        }
                    });
                }

                var thirdParty_ = '';
                if(data.ThirdParty){
                    $.each(data.ThirdParty,function(i,item){
                        if(item.keyno){
                            var name_ = '<a class="text-blue"  href="'+INDEX_URL+'/firm/'+item.keyno+'.html" target="_blank" class="c_a" >'+item.name+'</a>';
                            thirdParty_ = thirdParty_ + name_;
                        }else {
                            thirdParty_ = thirdParty_ + item.name;
                        }
                        thirdParty_ = thirdParty_ + ' ';
                    });
                }
                

                html = html+"<table class='ntable'>";
                html = html+"<tr>";
                html = html+"<td class='tb' width='21%' >案由：</td><td colspan='3'>"+(data.case_reason || '-')+"</td>";
                html = html+"</tr>";

                html = html+"<tr>";
                // html = html+"<td width='21%' class='tb'>案号：</td><td width='29%'>"+(data.case_no || '-')+"</td>";
                html = html+"<td width='21%' class='tb'>案号：</td><td width='29%'>";
                if(data.CaseSearchId && data.CaseSearchId != ''){
                    html = html+ "<a  rel='nofollow' target='_blank' href='"+INDEX_URL+"/case/"+data.CaseSearchId[0]+".html'>"+(data.case_no || '-')+"</a>";
                }else{
                    html = html+ (data.case_no || '-');
                }
                html = html+   "</td>";
                html = html+"<td width='21%' class='tb'>开庭时间：</td> <td width='29%'>"+(data.open_time || '-')+"</td>";
                html = html+"</tr>";
                html = html+"<tr>";
                html = html+"<td class='tb'>地区：</td><td>"+(data.province || '-')+"</td>";
                html = html+"<td class='tb'>排期日期：</td> <td>"+(data.schedule_time || '-')+"</td>";
                html = html+"</tr>";

                html = html+"<tr>";
                html = html+"<td class='tb'>承办部门：</td> <td>"+(data.undertake_department || '-')+"</td>";
                html = html+"<td class='tb'>审判长/主审人：</td><td>"+(data.chief_judge || '-')+"</td>";
                html = html+"</tr>";

                html = html+"<tr>";
                if(data.prosecutor && data.prosecutor[0] && data.prosecutor[0].keyno){
                    html = html+"<td class='tb' style='width:15%;'>上诉人：</td><td colspan='3'><a href='"+INDEX_URL+"/firm/"+data.prosecutor[0].keyno+".html' target='_blank'>"+data.prosecutor[0].name+"</a></td>";
                }else if(data.prosecutor && data.prosecutor[0] && data.prosecutor[0].name){  
                    html = html+"<td class='tb' style='width:15%;'>上诉人：</td><td colspan='3'>"+data.prosecutor[0].name+"</td>";
                }else{
                    html = html+"<td class='tb' style='width:15%;'>上诉人：</td><td colspan='3'>-</td>";
                }
                html = html+"</tr>";

                html = html+"<tr>";
                html = html+"<td class='tb' style='width:15%;'>被上诉人：</td><td colspan='3'>"+(defendant_ || '-')+"</td>";
                html = html+"</tr>";

                html = html+"<tr>";
                html = html+"<td class='tb' style='width:15%;'>第三方人：</td><td colspan='3'>"+(thirdParty_ || '-')+"</td>";
                html = html+"</tr>";

                html = html+"<tr>";
                html = html+"<td class='tb'>法院：</td> <td>"+(data.execute_gov|| '-')+"</td>";
                html = html+"<td class='tb'>法庭：</td><td>"+(data.execute_unite|| '-')+"</td>";
                html = html+"</tr>";

                html = html+"<tr>";
                html = html+"<td class='tb' width='21%' >公告内容：</td><td colspan='3'>"+(data.content || '-')+"</td>";
                html = html+"</tr>";

                html  = html+"</table>";
                $("#ktggview").html(html);
            }else{
                $("#ktggview").html("未找到相关信息");
            }
        }
    })
}

function ktnoticeHTML(data) {
    


    return html;
}

// 司法拍卖
function sfpaimaiView(sfid) {
    $(".sfpmview").empty();
    $.ajax({
        type:'POST',
        url:INDEX_URL+'/company_sfpaimaiView',
        data:'id='+sfid,
        dataType:'json',
        success:function(obj){
            if(obj.status==200 && obj.data){
                var html = obj.data;
                try{
                    $(".sfpmview").html(html);
                }catch(e){
                    //$(".sfpmview").text(html);
                    $(".sfpmview").html('<div class="pnodata md"> <img src="/material/theme/chacha/cms/v2/images/nno_image.png"> <p>小查还没找到数据</p> </div>');
                }
            }else{
                $(".sfpmview").html('<div class="pnodata md"> <img src="/material/theme/chacha/cms/v2/images/nno_image.png"> <p>小查还没找到数据</p> </div>');
            }

            $('#sfpmModal').modal('show');
            setTimeout(function() {
                $("#sfpmModal .modal-body").scrollTop(0)
            }, 200);
        }
    })

}


// 海关进出口信用信息
function jinchuinfoView(jcid) {
    $.ajax({
        type:'POST',
        url:INDEX_URL+'/company_jcinfoView',
        data:'id='+jcid,
        success:function(msg){
            var html="";
            var obj = JSON.parse(msg);
            if(obj.status=="200"){
                var html = jinchuinfoHTML(obj.data);
                $(".jcxyview").html(html);
            }else{
                $(".jcxyview").html('<div class="pnodata md"> <img src="/material/theme/chacha/cms/v2/images/nno_image.png"> <p>小查还没找到数据</p> </div>');
            }
        }
    })
}

// 股权出质详情
function pledgeView(data,keyno,isNew){
    if(keyno){
        $.ajax({
            url:INDEX_URL+'/company_pledgedetail',
            data:{
                id:data,
                keyno:keyno,
                isNew:isNew ? 1 : 0
            },
            success:function(rs){
                var html = pledgeHtml(rs.data);
                $('#pledgeview').html(html);
                $('#pledgeModal').modal('show');
            }
        })
    }else{
        var html = pledgeHtml(data);
        $('#pledgeview').html(html);
    }
}
function pledgeHtml(data){
    if(data.RegDate){
        var newDate = new Date();
        newDate.setTime(data.RegDate*1000);
        data.RegDate = newDate.bformat('yyyy-MM-dd');
    }
    var html = '';
    html = html+"<table class='ntable'>";

    html = html+"<tr>";
    html = html+"<td width='20%' class='tb'>登记编号：</td><td width='30%'>"+(data.RegistNo || '-')+"</td>";
    html = html+"<td width='20%' class='tb'>状态：</td> <td width='30%'>"+(data.Status || '-')+"</td>";
    html = html+"</tr>";

    html = html+"<tr>";
    html = html+"<td class='tb'>出质人：</td> <td>";
    if(data.PledgorInfo.KeyNo && data.PledgorInfo.KeyNo[0]!='p'){
        html = html+"<a target='_blank' href='"+INDEX_URL+"/firm/"+data.PledgorInfo.KeyNo+".html'>"+(data.PledgorInfo.Name|| '-')+"</a>";
    }else if(data.PledgorInfo.KeyNo && data.PledgorInfo.KeyNo[0]=='p'){
        html = html+"<a target='_blank' href='"+INDEX_URL+"/pl/"+data.PledgorInfo.KeyNo+".html'>"+(data.PledgorInfo.Name|| '-')+"</a>";
    }else if(data.PledgorInfo.KeyNo){
        html = html+"<a target='_blank' href='"+INDEX_URL+"/more_gov?name="+data.PledgorInfo.Name+"'>"+(data.PledgorInfo.Name|| '-')+"</a>";
    }else{
        html = html+(data.PledgorInfo.Name|| '-');
    }
    html = html+"</td>"
    html = html+"<td class='tb'>出质人证件号码：</td><td>"+(data.PledgorInfo.No|| '-')+"</td>";
    html = html+"</tr>";

    html = html+"<tr>";
    html = html+"<td class='tb'>出质股权数额（万元）：</td><td>"+(data.PledgedAmount || '-')+"</td>";
    html = html+"<td class='tb'>质权人：</td> <td>";
    if(data.PledgeeInfo.KeyNo){
        html = html+"<a target='_blank' href='"+INDEX_URL+"/firm/"+data.PledgeeInfo.KeyNo+".html'>"+(data.PledgeeInfo.Name || '-')+"</a>";
    }else{
        html = html+(data.PledgeeInfo.Name || '-');
    }
    html = html+"</td>"
    html = html+"</tr>";

        html = html+"<tr>";
        html = html+"<td class='tb'>出质股权标的企业：</td> <td colspan='3'>";
        if(data.RelatedCompanyInfo){
            if(data.RelatedCompanyInfo.KeyNo){
                html = html+"<a target='_blank' href='"+INDEX_URL+"/firm/"+data.RelatedCompanyInfo.KeyNo+".html'>"+(data.RelatedCompanyInfo.Name || '-')+"</a>";
            }else{
                html = html+"-";
            }
        }else{
            html = html+"-";
        }
        html = html+"</td>"
        html = html+"</tr>";

    html = html+"<tr>";
    html = html+"<td class='tb'>质权人证件号：</td> <td>"+(data.PledgeeInfo.No || '-')+"</td>";
    html = html+"<td class='tb'>股权出质登记日期：</td><td>"+(data.RegDate || '-')+"</td>";
    html = html+"</tr>";

    html  = html+"</table>";
    return html;
}    

// 动产抵押详情
function mPledgeView(data,keyno,isNew){
    var url = INDEX_URL+'/company_mpledgedetail';
    if(isNew){
        url = INDEX_URL+'/company_mpledgedetailnew';
    }
    if(keyno){
        $.ajax({
            url:url,
            data:{
                id:data,
                keyno:keyno
            },
            success:function(rs){
                mPledgeHtml(rs.data);
                
            }
        })
    }else{
        mPledgeHtml(data);
    }
    function mPledgeHtml(data){
        $('#mPledgeview').empty();
        if(data.RegisterDate){
            var newDate = new Date();
            newDate.setTime(data.RegisterDate*1000);
            data.RegisterDate = newDate.bformat('yyyy-MM-dd');
        }
        
        var html = '';
        html+="<div class='mtcaption m-b-sm'>动产抵押登记信息</div>"
        html = html+"<table class='ntable'>";
        html = html+"<tr>";
        html = html+"<td width='20%' class='tb'>登记机关：</td><td colspan='3'>"+(data.RegisterOffice || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>登记编号：</td> <td width='30%'>"+(data.RegisterNo || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>登记日期：</td><td width='30%'>"+(data.RegisterDate || '-')+"</td>";
        html = html+"</tr>";
        html  = html+"</table>";
        if(data.MPledgeDetail&&data.MPledgeDetail.PledgeeList&&data.MPledgeDetail.PledgeeList.length>0){
            html+="<div class='mtcaption m-b-sm'>抵押权人信息</div>"
            html = html+"<table class='ntable'>";
            $.each(data.MPledgeDetail.PledgeeList,function(index,obj){
                html = html+"<tr>";
                html = html+"<td class='tb' width='20%'>抵押权人名称：</td> <td width='30%'>";

                if(obj.KeyNo){
                    html = html+"<a target='_blank' href='"+INDEX_URL+"/firm/"+obj.KeyNo+".html'>"+(obj.Name || '-')+"</a>"+"</td>";
                }else{
                    html = html+(obj.Name || '-')+"</td>";
                }
                html = html+"<td class='tb' width='20%'>抵押权人证照类型：</td> <td width='30%'>"+(obj.IdentityType || '-')+"</td>";
                html = html+"</tr>";
                html = html+"<tr>";
                html = html+"<td class='tb'>证照号码：</td> <td>"+(obj.IdentityNo || '-')+"</td>";
                html = html+"<td class='tb'>住所地：</td><td>"+(obj.Address || '-')+"</td>";
                html = html+"</tr>";
            })
            html  = html+"</table>";
        }
        

        if(data.MPledgeDetail&&data.MPledgeDetail.GuaranteedCredRight){
            html+="<div class='mtcaption m-b-sm'>被担保主债权信息</div>"
            html = html+"<table class='ntable'>";
            html = html+"<tr>";
            html = html+"<td width='20%' class='tb'>债务人：</td><td colspan='3'>";
            if(data.RelatedCompanyInfo.KeyNo){
                html = html+"<a target='_blank' href='"+INDEX_URL+"/firm/"+data.RelatedCompanyInfo.KeyNo+".html'>"+(data.RelatedCompanyInfo.Name || '-')+"</a>"+"</td>";
            }else{
                html = html+(data.RelatedCompanyInfo.Name || '-')+"</td>";
            }
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td width='20%' class='tb'>债务人履行债务的期限：</td><td colspan='3'>"+(data.MPledgeDetail.GuaranteedCredRight.FulfillObligation || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb' width='20%'>种类：</td> <td width='30%'>"+(data.MPledgeDetail.GuaranteedCredRight.Kind || '-')+"</td>";
            html = html+"<td class='tb' width='20%'>数额：</td> <td width='30%'>"+(data.MPledgeDetail.GuaranteedCredRight.Amount || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<td class='tb'>担保的范围：</td> <td>"+(data.MPledgeDetail.GuaranteedCredRight.AssuranceScope || '-')+"</td>";
            html = html+"<td class='tb'>备注：</td><td>"+(data.MPledgeDetail.GuaranteedCredRight.Remark || '-')+"</td>";
            html = html+"</tr>";
            html  = html+"</table>";
        }

        if(data.MPledgeDetail&&data.MPledgeDetail.GuaranteeList&&data.MPledgeDetail.GuaranteeList.length>0){
            html+="<div class='mtcaption m-b-sm'>抵押物信息</div>"
            html = html+"<table class='ntable'>";
            $.each(data.MPledgeDetail.GuaranteeList,function(index,obj){
                html = html+"<tr>";
                html = html+"<td class='tb' width='20%'>抵押物名称：</td> <td width='30%'>"+(obj.Name || '-')+"</td>";
                html = html+"<td class='tb' width='20%'>所有权或使用权归属：</td> <td width='30%'>";
                if(obj.Ownership && obj.KeyNoList){
                    $.each(obj.KeyNoList,function(ki,kv){
                        if(kv.KeyNo){
                            html = html+"<a target='_blank' href='"+INDEX_URL+"/firm/"+kv.KeyNo+".html'>"+(kv.Name || '-')+"</a>；";
                        }else{
                            html = html+(kv.Name || '-');
                        }
                    })
                    html = html+"</td>";
                }else{
                    html = html+"-</td>";
                }

                html = html+"</tr>";
                html = html+"<tr>";
                html = html+"<td class='tb'>数量、质量、状况、所在地等情况：</td> <td>"+(obj.Other || '-')+"</td>";
                html = html+"<td class='tb'>备注：</td><td>"+(obj.Remark || '-')+"</td>";
                html = html+"</tr>";
            })
            html  = html+"</table>";
        }
        
        if(data.MPledgeDetail&&data.MPledgeDetail.ChangeList&&data.MPledgeDetail.ChangeList.length>0){
            html+="<div class='mtcaption m-b-sm'>变更信息</div>"
            html = html+"<table class='ntable'>";
            $.each(data.MPledgeDetail.ChangeList,function(index,obj){
                html = html+"<tr>";
                html = html+"<td class='tb' width='20%'>变更日期：</td> <td width='30%'>"+getMomentDate(obj.ChangeDate)+"</td>";
                html = html+"<td class='tb' width='20%'>变更内容：</td> <td width='30%'>"+(obj.ChangeContent || '-')+"</td>";
                html = html+"</tr>";
            })
            html  = html+"</table>";
        }
        if(data.MPledgeDetail&&data.MPledgeDetail.CancelInfo){
            var CancelInfoData = '-';
            if(data.MPledgeDetail.CancelInfo.CancelDate){
                CancelInfoData = moment(data.MPledgeDetail.CancelInfo.CancelDate*1000).format('YYYY-MM-DD');
            }
            html+="<div class='mtcaption m-b-sm'>注销信息</div>"
            html = html+"<table class='ntable'>";
            html = html+"<tr>";
            html = html+"<td class='tb' width='20%'>注销日期：</td> <td width='30%'>"+CancelInfoData+"</td>";
            html = html+"<td class='tb' width='20%'>注销原因：</td> <td width='30%'>"+(data.MPledgeDetail.CancelInfo.CancelReason || '-')+"</td>";
            html = html+"</tr>";
            html  = html+"</table>";
        }
        $("#mPledgeview").html(html);
        $('#mPledgeModal').modal('show');
        setTimeout(function() {
            $("#mPledgeModal .modal-body").scrollTop(0)
        }, 200);
    }
        
}

function jinchuinfoHTML(data) {
    var html = '';
    html = html+"<table class='ntable'>";
    html = html+"<tr>";
    html = html+"<td class='tb' style='width:15%;'>公司：</td><td colspan='3'>"+(data.company_name || '-')+"</td>";
    html = html+"</tr>";

    html = html+"<tr>";
    html = html+"<td width='25%' class='tb'>海关注册编码：</td><td width='25%'>"+(data.reg_no || '-')+"</td>";
    html = html+"<td width='25%' class='tb'>注册海关：</td> <td width='25%'>"+(data.reg_gov || '-')+"</td>";
    html = html+"</tr>";

    html = html+"<tr>";
    html = html+"<td class='tb'>行政地区：</td> <td>"+(data.administrative_area|| '-')+"</td>";
    html = html+"<td class='tb'>经济地区：</td><td>"+(data.economic_area|| '-')+"</td>";
    html = html+"</tr>";

    html = html+"<tr>";
    html = html+"<td class='tb'>经营类别：</td><td>"+(data.trade_type || '-')+"</td>";
    html = html+"<td class='tb'>特殊贸易区域：</td> <td>"+(data.special_trade_area || '-')+"</td>";
    html = html+"</tr>";

    html = html+"<tr>";
    html = html+"<td class='tb'>海关注销标志：</td> <td>"+(data.cancellation_flag || '-')+"</td>";
    html = html+"<td class='tb'>年报情况：</td><td>"+(data.annual_status || '-')+"</td>";
    html = html+"</tr>";

    html = html+"<tr>";
    html = html+"<td class='tb'>注册日期：</td> <td>"+(data.reg_date || '-')+"</td>";
    html = html+"<td class='tb'>报关有效期：</td><td>"+(data.expire_date || '-')+"</td>";
    html = html+"</tr>";

    html = html+"<tr>";
    html = html+"<td class='tb'>行业种类：</td> <td>"+(data.industry_type || '-')+"</td>";
    html = html+"<td class='tb'>跨境贸易电子商务类型：</td><td>"+(data.e_business_type|| '-')+"</td>";
    html = html+"</tr>";

    var credit_grade_ = data.credit_grade;

   
    if(credit_grade_){
        credit_grade_.forEach(function (grade) {
            html = html+"<tr>";
            html = html+"<td class='tb'>认定时间：</td> <td>"+(grade.time || '-')+"</td><td class='tb'>信用等级："+"</td><td>"+(grade.grade|| '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb'>认证证书编码：</td> <td colspan='3'>"+(grade.code || '-')+"</td>";
            html = html+"</tr>";
        })
    }else {
        html = html+"<tr>";
        html = html+"<td class='tb'>信用等级：</td> <td colspan='3'>-</td>";
        html = html+"</tr>";
    }

    var punish_info_ = data.punish_info;


    punish_info_ = JSON.parse(punish_info_);

    if(punish_info_ != ''){
        html = html+"<tr>";
        html = html+"<td class='tb' colspan='4' style='text-align: center;'>海关行政处罚</td>";
        html = html+"</tr>";
        var i = 1;
        punish_info_.forEach(function (punish) {
            html = html+"<tr>";
            html = html+"<td class='tb' rowspan='4' style='text-align: right;'>"+i+"</td> <td>行政处罚决定书编号："+"</td> <td colspan='2'>"+(punish.decisionNo || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td>当事人：</td> <td colspan='2'>"+(punish.party|| '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td>处罚日期：</td> <td colspan='2'>"+(punish.penaltDate|| '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td>案件性质：</td> <td colspan='2'>"+(punish.case|| '-')+"</td>";
            html = html+"</tr>";
            i++;
        })
    }else {
        html = html+"<tr>";
        html = html+"<td class='tb'>海关行政处罚：</td> <td colspan='3'>-</td>";
        html = html+"</tr>";
    }


    html  = html+"</table>";
    return html;
}



/*失信人详情*/
function shixinDetail(id){
    $.ajax({
        type:'GET',
        url:INDEX_URL+'/search_shixinDetail',
        data:{id:id},
        dataType:'html',
        success:function(result){
            $("#shixinDetail").html(result);
        }
    })
}

function zhixingDetail(id){
    $.ajax({
        type:'GET',
        url:INDEX_URL+'/search_zhixingDetail',
        data:{id:id},
        dataType:'html',
        success:function(result){
            $("#zhixingDetail").html(result);
        }
    })
}
/*法院公告详情*/
function gonggaoDetail(id){
    $.ajax({
        type:'GET',
        url:INDEX_URL+'/search_gonggaoDetail',
        data:{id:id},
        dataType:'html',
        success:function(result){
            $("#gonggaoDetail").html(result);
        }
    })
}


//公示催告详情
function pnDetail(id) {
    $.get(INDEX_URL+'/company_pnDetail',{id:id},function (result) {
        var data = result.data;
        var html = '<table class="ntable">'
            + '<tr>'
            + '<td width="20%" class="tb">票号：</td>'
            + '<td colspan="3">'
            + (data.PjNo || '-')
            + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td width="20%" class="tb">申请人：</td>'
            + '<td width="30%" >'
            + (data.ApplyComName.KeyNo ? '<a href="' + INDEX_URL+'/firm/' + data.ApplyComName.KeyNo + '.html" target="_blank">' : '')
            + (data.ApplyComName.Name || '-')
            + (data.ApplyComName.KeyNo ? '</a>' : '')
            + '</td>'
            + '<td width="20%" class="tb">出票人：</td>'
            + '<td width="30%" >'
            + (data.DrawComName.KeyNo ? '<a href="' + INDEX_URL+'/firm/' + data.DrawComName.KeyNo + '.html" target="_blank">' : '')
            + (data.DrawComName.Name || '-')
            + (data.DrawComName.KeyNo ? '</a>' : '')
            + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td class="tb">持票人：</td>'
            + '<td>'
            + (data.OwnerComName.KeyNo ? '<a href="' + INDEX_URL+'/firm/' + data.OwnerComName.KeyNo + '.html" target="_blank">' : '')
            + (data.OwnerComName.Name || '-')
            + (data.OwnerComName.KeyNo ? '</a>' : '')
            + '</td>'
            + '<td class="tb">票据类型：</td>'
            + '<td>'
            + (data.PjType || '-')
            + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td class="tb">票面金额：</td>'
            + '<td>'
            + (data.PmMoney || '-')
            + '</td>'
            + '<td class="tb">出票日：</td>'
            + '<td>'
            + (data.BillBeginDt ? (new Date(data.BillBeginDt * 1000)).bformat('yyyy-MM-dd') : '-')
            + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td class="tb">到期日：</td>'
            + '<td>'
            + (data.BillEndDt ? (new Date(data.BillEndDt * 1000)).bformat('yyyy-MM-dd') : '-')
            + '</td>'
            + '<td class="tb">付款银行：</td>'
            + '<td>'
            + (data.PayComName.KeyNo ? '<a href="' + INDEX_URL+'/firm/' + data.PayComName.KeyNo + '.html" target="_blank">' : '')
            + (data.PayComName.Name || '-')
            + (data.PayComName.KeyNo ? '</a>' : '')
            + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td class="tb">类别：</td>'
            + '<td>'
            + (data.Type || '-')
            + '</td>'
            + '<td class="tb">公告日期：</td>'
            + '<td>'
            + (data.PublishDt ? (new Date(data.PublishDt * 1000)).bformat('yyyy-MM-dd') : '-')
            + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td class="tb">公告内容：</td>'
            + '<td colspan="3">'
            + (data.InfoDetail || '-')
            + '</td>'
            + '</tr>'
            + '</table>';
        $("#pnModal .modal-body").html(html);
        $('#pnModal').modal('show');
    });
}

function taxPunishDetail(id,ftype) {
    $.get(INDEX_URL+'/company_tpenaltyDetail',{id:id},function (result) {
        var obj = JSON.parse(result)
        if(obj.status==200){
            var data = obj.data;
            if(data.PunishDate){
              var newDate = new Date();
              newDate.setTime(data.PunishDate*1000);
              data.PunishDate = newDate.bformat('yyyy-MM-dd');
            }
            var chtml = ''; 
            if(data.KeyNo){
                chtml = '<a target="_blank" href="'+INDEX_URL+'/firm/'+data.KeyNo+'.html">'+data.CompanyName+'</a>'
            }else{
                chtml = data.CompanyName;
            }
            var phtml = '';
            if(data.Oper && data.Oper.KeyNo){
                if(data.Oper.Org==2){
                    phtml = '<a target="_blank" href="'+INDEX_URL+'/pl/'+data.Oper.KeyNo+'.html">'+data.Oper.Name+'</a>'
                }else{
                    phtml = '<a target="_blank" href="'+INDEX_URL+'/firm/'+data.Oper.KeyNo+'.html">'+data.Oper.Name+'</a>'
                }
            }else{
                phtml = data.Oper.Name;
            }
            var html='';
            html = html+"<table class='ntable'>";
            html = html+"<tr>";
            html = html+"<td class='tb' width='23%'>行政相对人名称：</td><td colspan='3'>"+(chtml || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb' width='23%'>行政相对人统一社会信用代码：</td><td width='27%'>"+(data.CreditCode || '-')+"</td>";
            html = html+"<td class='tb width='23%''>法定代表人姓名：</td> <td width='27%'>"+(phtml || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb'>案件名称：</td><td>"+(data.CaseName || '-')+"</td>";
            html = html+"<td class='tb'>决定书文号：</td> <td>"+(data.CaseNo || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb' width='23%'>处罚事由：</td><td colspan='3'>"+(data.Reason || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb'>处罚类型：</td> <td>"+(data.Type || '-')+"</td>";
            html = html+"<td class='tb'>处罚状态：</td><td>"+(data.Status || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb'>处罚结果：</td> <td>"+(data.Result || '-')+"</td>";
            html = html+"<td class='tb'>处罚决定日期：</td><td>"+(data.PunishDate || '-')+"</td>";
            html = html+"</tr>";

            html = html+"<tr>";
            html = html+"<td class='tb' style='width:15%;'>执法依据：</td><td colspan='3'>"+(data.Basis || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb' style='width:15%;'>作出处罚决定部门：</td><td colspan='3'>"+(data.IssuedBy || '-')+"</td>";
            html = html+"</tr>";

            html = html+"<tr>";
            html = html+"<td class='tb'>国税/地税：</td> <td>"+(data.Level|| '-')+"</td>";
            html = html+"<td class='tb'>省份：</td><td>"+(data.Province|| '-')+"</td>";
            html = html+"</tr>";
            html  = html+"</table>";
            if(ftype == 's'){
                $('.show-modal-list').css('margin-left','-100%');
                $('.show-modal-detail').css('margin-left','0px');
                $('#showDetail').html(html);
            }else{
                $("#taxPunishModal .modal-body").html(html);
                $('#taxPunishModal').modal('show');
            }
        }
        
    });
}

function otherPunishDetail(id,ftype) {
    $.get(INDEX_URL+'/company_openaltyDetail',{id:id},function (result) {
        var obj = JSON.parse(result)
        if(obj.status==200){
            var data = obj.data;
            if(data.JudgeDate){
                var newDate = new Date();
                newDate.setTime(data.JudgeDate*1000);
                data.JudgeDate = newDate.bformat('yyyy-MM-dd');
            }
            var html='';
            html = html+"<table class='ntable'>";
            html = html+"<tr>";
            html = html+"<td class='tb' width='23%'>行政处罚决定书文号：</td><td width='28%'>"+(data.CaseNo || '-')+"</td>";
            html = html+"<td class='tb' width='23%'>行政相对人名称：</td><td width='28%'>"+getCoyStr(data.OwnerInfo)+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb' width=''>项目名称：</td><td width=''>"+(data.CaseName || '-')+"</td>";
            html = html+"<td class='tb width=''>处罚类型：</td> <td width=''>"+(data.Category || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb' style='width:220px;'>行政相对人统一社会信用代码：</td><td>"+(data.CreditCode || '-')+"</td>";
            html = html+"<td class='tb' style='width:140px;'>处罚单位：</td> <td>"+(data.Unit || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb' width=''>处罚决定日期：</td><td>"+(data.JudgeDate || '-')+"</td>";
            html = html+"<td class='tb' width=''>处罚依据：</td><td>"+(data.Basis || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb'>处罚事由：</td> <td colspan='3'>"+(data.Reason || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb'>处罚结果：</td> <td colspan='3'>"+(data.Result || '-')+"</td>";
            html = html+"</tr>";
            if(data.Content){
                html = html+"<tr>";
                html = html+"<td class='tb'>处罚文书明细：</td> <td colspan='3'>"+(data.Content || '-')+"</td>";
                html = html+"</tr>";
            }
            html  = html+"</table>";
            if(ftype == 's'){
                $('.show-modal-list').css('margin-left','-100%');
                $('.show-modal-detail').css('margin-left','0px');
                $('#showDetail').html(html);
            }else{
                $("#otherPunishModal .modal-body").html(html);
                $('#otherPunishModal').modal('show');
            }
        }

    });
}
var ajaxData;
function showSamePenalty(keyno,name,groupid,isValid){
    $('#showDetailModal').modal('show');
    var modalTitle = '相似行政处罚';
    $('.show-modal-list .modal-title').text(modalTitle);
    if(keyno[0]=='p'){
        $('#showTcaption').html('关联人员 <a href="'+INDEX_URL+'/pl/'+keyno+'.html" target="_blank" class="text-primary">'+name+'</a>');
    }else{
        $('#showTcaption').html('关联企业 <a href="'+INDEX_URL+'/firm/'+keyno+'.html"  target="_blank" class="text-primary">'+name+'</a>');
    }
    $('#showTable').html('<div class="risk-modal-load"><img src="/material/theme/chacha/cms/v2/images/preloader.gif"></div>');
    ajaxData = {
        keyno:keyno,
        groupid:groupid,
        isValid:isValid
    }
    getAdminPenaltyInfos(1);
}

function getAdminPenaltyInfos(page){
    ajaxData['p']=page;
    $.ajax({
        type:'GET',
        dataType:"html",
        url:'/company_getAdminPenaltyInfos',
        data:ajaxData,
        success:function(data){
            if(data){
                $('#showTable').html(data);
                // $('.show-modal-list .modal-body').scrollTo(0,100);
            }
        }
    });
}
function showBackRiskList(){
    $('.show-modal-list').css('margin-left','0px');
    $('.show-modal-detail').css('margin-left','100%');
}
$(function(){
    $('#showDetailModal').on('hidden.bs.modal', function () {
        $('.show-modal-list').css('margin-left','0px');
        $('.show-modal-detail').css('margin-left','100%');
        $('#showTable').empty();
        $('#showDetail').empty();
    });
})


//欠税公告详情
function oweNoticeDetail(id) {
    $.get(INDEX_URL+'/company_oweNoticeDetail',{id:id},function (result) {
        var data = result.data;
        if(data.PublishDate){
            var newDate = new Date();
            newDate.setTime(data.PublishDate*1000);
            data.PublishDate = newDate.bformat('yyyy-MM-dd');
        }
        var chtml = ''; 
        if(data.KeyNo){
            chtml = '<a target="_blank" href="'+INDEX_URL+'/firm/'+data.KeyNo+'.html">'+data.CompanyName+'</a>'
        }else{
            chtml = data.CompanyName;
        }
        var phtml = '';
        if(data.Oper && data.Oper.KeyNo){
            if(data.Oper.Org==2){
            phtml = '<a target="_blank" href="'+INDEX_URL+'/pl/'+data.Oper.KeyNo+'.html">'+data.Oper.Name+'</a>'
        }else{
            phtml = '<a target="_blank" href="'+INDEX_URL+'/firm/'+data.Oper.KeyNo+'.html">'+data.Oper.Name+'</a>'
        }
        }else{
            phtml = data.Oper.Name;
        }
        var dhtml = '';
        if(data.Addr && $('#mapModal').length>0){
            dhtml = '<a onclick="showMapModal(\''+data.Addr+'\',\'\')">'+data.Addr+'</a>';
        }else{
            dhtml = data.Addr;
        }
        var html = '';
        html = html+"<table class='ntable'>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='23%'>企业名称：</td><td colspan='3'>"+(chtml  || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td width='23%' class='tb'>纳税人类型：</td><td width='27%'>"+(data.Type  || '-')+"</td>";
        html = html+"<td width='23%' class='tb'>纳税人识别号：</td> <td width='27%'>"+(data.IdentifyNo || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td width='23%' class='tb'>负责人姓名：</td><td width='27%'>"+(phtml  || '-')+"</td>";
        html = html+"<td width='23%' class='tb'>证件号码：</td> <td width='27%'>"+(data.IdNo || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='23%'>经营地点：</td><td colspan='3'>"+(dhtml  || '-')+"</td>";
        html = html+"</tr>";
        html = html+"</table><table class='ntable'>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='23%'>欠税税种：</td><td colspan='3'>"+(data.Category  || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td width='23%' class='tb'>欠税余额（元）：</td><td width='27%'>"+(data.Balance  || '-')+"</td>";
        html = html+"<td width='24%' class='tb'>当前新发生的欠税金额（元）：</td> <td width='27%'>"+(data.NewBal)+"</td>";
        html = html+"</tr>";
        html = html+"</table><table class='ntable'>";
        html = html+"<tr>";
        html = html+"<td width='23%' class='tb'>发布单位：</td> <td width='27%'>"+(data.IssuedBy || '-')+"</td>";
        html = html+"<td width='23%' class='tb'>发布日期：</td><td width='27%'>"+(data.PublishDate || '-')+"</td>";
        html = html+"</tr>";
        html  = html+"</table>";
        $("#oweNoticeModal .modal-body").html(html);
        $('#oweNoticeModal').modal('show');
    });
}

//送达公告详情
function dnoticeDetail(id) {
    $("#dnoticeModal .modal-body").empty();
    $.get(INDEX_URL+'/company_dnoticeDetail',{id:id},function (result) {
        var data = result.data;
        $("#dnoticeModal .modal-body").html(data.Content);
        $("#dnoticeModal").modal('show');
    });
}

function fundProjectDetail(id) {
    $.get(INDEX_URL+'/company_fundProjectDetail',{id:id},function (result) {
        var data = result.data;
        var html = '';
        html = html+"<table class='ntable'>";
        html = html+"<tr>";
        html = html+"<td width='23%' class='tb'>项目名称：</td><td width='27%'>"+(data.ProjectName  || '-')+"</td>";
        html = html+"<td width='23%' class='tb'>执行年度：</td> <td width='27%'>"+(data.RunYear || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td width='23%' class='tb'>年度收入（万元）：</td><td width='27%'>"+(data.AnnualIncome  || '-')+"</td>";
        html = html+"<td width='23%' class='tb'>年度支出（万元）：</td> <td width='27%'>"+(data.AnnualExpense || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td width='23%' class='tb'>关注领域：</td><td width='27%'>"+(data.FocusArea  || '-')+"</td>";
        html = html+"<td width='23%' class='tb'>覆盖地域：</td> <td width='27%'>"+(data.OverrideArea)+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='23%'>基金会名称：</td><td colspan='3'>"+(data.FundName  || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td width='23%' class='tb'>资金用途：</td> <td width='27%'>"+(data.FundUse || '-')+"</td>";
        html = html+"<td width='23%' class='tb'>受益群体：</td><td width='27%'>"+(data.IncomeGroup || '-')+"</td>";
        html = html+"</tr>";
         html = html+"<tr>";
        html = html+"<td class='tb' width='23%'>项目简介：</td><td colspan='3'>"+(data.ProjectIntro  || '-')+"</td>";
        html = html+"</tr>";
        html  = html+"</table>";
        $("#fundProjectDetailModal .modal-body").html(html);
    });
}

//债券信息详情
function creditorDetail(id,code) {
    $.get(INDEX_URL+'/company_creditorDetail',{id:id},function (result) {
        var data = result.data;
        if(data.MaturityDate){
            var newDate = new Date();
            newDate.setTime(data.MaturityDate*1000);
            data.MaturityDate = newDate.bformat('yyyy-MM-dd');
        }
        if(data.HonourDate){
            var newDate = new Date();
            newDate.setTime(data.HonourDate*1000);
            data.HonourDate = newDate.bformat('yyyy-MM-dd');
        }
        if(data.DelistDate){
            var newDate = new Date();
            newDate.setTime(data.DelistDate*1000);
            data.DelistDate = newDate.bformat('yyyy-MM-dd');
        }
        if(data.PayoutDate){
            var newDate = new Date();
            newDate.setTime(data.PayoutDate*1000);
            data.PayoutDate = newDate.bformat('yyyy-MM-dd');
        }
        if(data.CeaseDate){
            var newDate = new Date();
            newDate.setTime(data.CeaseDate*1000);
            data.CeaseDate = newDate.bformat('yyyy-MM-dd');
        }
        if(data.ReleaseDate){
            var newDate = new Date();
            newDate.setTime(data.ReleaseDate*1000);
            data.ReleaseDate = newDate.bformat('yyyy-MM-dd');
        }
        if(data.LaunchDate){
            var newDate = new Date();
            newDate.setTime(data.LaunchDate*1000);
            data.LaunchDate = newDate.bformat('yyyy-MM-dd');
        }
        var html = '';
        html = html+"<div class='mtcaption m-b-sm'>基本信息</div>";
        html = html+"<table class='ntable'>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>债券名称：</td> <td colspan='3'>"+(data.FullName || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>债券简称：</td> <td colspan='3'>"+(data.ShortName || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>债券代码：</td> <td width='30%'>"+(data.BondCode || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>债券类型：</td><td width='30%'>"+(data.BondType || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>债券面值（元）：</td> <td width='30%'>"+(data.BoundValue || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>债券年限（年）：</td><td width='30%'>"+(data.YearLimit || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>票面利率（%）：</td> <td width='30%'>"+(data.InterestRate || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>到期日：</td><td width='30%'>"+(data.MaturityDate || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>兑付日：</td> <td width='30%'>"+(data.HonourDate || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>摘牌日：</td><td width='30%'>"+(data.DelistDate || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>利率说明：</td> <td colspan='3'>"+(data.InterestRateIntroduce || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>计息方式：</td> <td width='30%'>"+(data.PlanBreathWay || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>付息方式：</td><td width='30%'>"+(data.ServicingWay || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>起息日期：</td> <td width='30%'>"+(data.PayoutDate || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>止息日期：</td><td width='30%'>"+(data.CeaseDate || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>年付息次数：</td> <td width='30%'>"+(data.AnnualInterestRate || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>付息日期：</td><td width='30%'>"+(data.InterestPaymentDate || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>发行价格（元）：</td> <td width='30%'>"+(data.OfferingPrice || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>发行规模（亿元）：</td><td width='30%'>"+(data.Issuance || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>发行日期：</td> <td width='30%'>"+(data.ReleaseDate || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>上市日期：</td><td width='30%'>"+(data.LaunchDate || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>上市场所：</td> <td width='30%'>"+(data.PublicPlaces || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>信用等级：</td><td width='30%'>"+(data.CreditRating || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>内部信用增级方式：</td> <td width='30%'>"+(data.InternalCreditEnhancementMode || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>外部信用增级方式：</td><td width='30%'>"+(data.ExternalCreditEnhancementMode || '-')+"</td>";
        html = html+"</tr>";
            + '</table>';
        $("#creditorview").html(html);
    });

    
    $('#creditorannouncementlist').empty();
    $.ajax({
        type:'GET',
        dataType:"html",
        url:'/company_creditorannouncementlist',
        data:{key:code},
        success:function(data){
            if(data){
               $('#creditorannouncementlist').html(data);
                
            }
        }
    })
}

//地块公示详情
function landpubDetail(id) {
    $.get(INDEX_URL+'/company_landpubDetail',{id:id},function (result) {
        var data = result.data;
            if(data.PublishDate){
            var newDate = new Date();
            newDate.setTime(data.PublishDate*1000);
            data.PublishDate = newDate.bformat('yyyy-MM-dd');
        }
        var html = '';
        html+="<div class='mtcaption m-b-sm'>地块基本信息</div>"
        html = html+"<table class='ntable'>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>宗地编号：</td> <td width='30%'>"+(data.LandNo || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>地块位置：</td><td width='30%'>"+(data.Address || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>土地面积（公顷）：</td> <td width='30%'>"+(data.Acreage || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>土地用途：</td><td width='30%'>"+(data.Purpose || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>项目名称：</td> <td width='30%'>"+(data.ProjectName || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>受让单位：</td><td width='30%'>";
        if(data.AssigneeUnit){
            if(data.AssigneeUnit.KeyNo){
                html = html+"<a href='"+INDEX_URL+"/firm/"+data.AssigneeUnit.KeyNo+".html' target='_blank'>"+data.AssigneeUnit.Name+"</a>"
            }else{
                html = html+data.AssigneeUnit.Name;
            }
        }else{
            html = html+"-"
        }
        html = html+"</td>"
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>备注：</td> <td width='30%'>"+(data.Remarks || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>公示期：</td><td width='30%'>"+(data.PublishTerm || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>发布机关：</td> <td width='30%'>"+(data.PublishGov || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>发布日期：</td><td width='30%'>"+(data.PublishDate || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td width='20%' class='tb'>意见反馈方式：</td><td colspan='3'>"+(data.Explains || '-')+"</td>";
        html = html+"</tr>";
        html  = html+"</table>";

        html+="<div class='mtcaption m-b-sm'>联系方式</div>"
        html = html+"<table class='ntable'>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>联系单位：</td> <td width='30%'>"+(data.ContactUnit || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>单位地址：</td><td width='30%'>"+(data.UnitAddress || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>邮政编码：</td> <td width='30%'>"+(data.PostCode || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>联系电话：</td><td width='30%'>"+(data.ContactNumber || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>联系人：</td> <td width='30%'>"+(data.ContactPerson || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>电子邮件：</td><td width='30%'>"+(data.Email || '-')+"</td>";
        html = html+"</tr>";
        html  = html+"</table>";
        $('#landpubview').html(html);
    });
}

//购地信息详情
function landpurchaseDetail(id) {
    $.get(INDEX_URL+'/company_landpurchaseDetail',{id:id},function (result) {
        var data = result.data;
        if(data.AgreedCompletionTime){
            var newDate = new Date();
            newDate.setTime(data.AgreedCompletionTime*1000);
            data.AgreedCompletionTime = newDate.bformat('yyyy-MM-dd');
        }
        if(data.AgreedLandTime){
            var newDate = new Date();
            newDate.setTime(data.AgreedLandTime*1000);
            data.AgreedLandTime = newDate.bformat('yyyy-MM-dd');
        }
        if(data.AgreedPaymentDate){
            var newDate = new Date();
            newDate.setTime(data.AgreedPaymentDate*1000);
            data.AgreedPaymentDate = newDate.bformat('yyyy-MM-dd');
        }
        if(data.AgreedStartTime){
            var newDate = new Date();
            newDate.setTime(data.AgreedStartTime*1000);
            data.AgreedStartTime = newDate.bformat('yyyy-MM-dd');
        }
        if(data.SignContractTime){
            var newDate = new Date();
            newDate.setTime(data.SignContractTime*1000);
            data.SignContractTime = newDate.bformat('yyyy-MM-dd');
        }
        var html = '';
        html+="<div class='mtcaption m-b-sm'>基本信息</div>"
        html = html+"<table class='ntable'>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>行政区：</td> <td width='30%'>"+(data.Region || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>电子监管号：</td><td width='30%'>"+(data.ElecSuNum || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td width='20%' class='tb'>项目名称：</td><td colspan='3'>"+(data.ProjectName || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td width='20%' class='tb'>项目位置：</td><td colspan='3'>"+(data.ProjectLocation || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>面积（公顷）：</td> <td width='30%'>"+(data.Area || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>土地资源：</td><td width='30%'>"+(data.LandSource || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>土地用途：</td> <td width='30%'>"+(data.LandUse || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>供地方式：</td><td width='30%'>"+(data.LandSupplyWay || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>土地使用年限：</td> <td width='30%'>"+(data.LandUseYears || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>行业分类：</td><td width='30%'>"+(data.Industry || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>土地级别：</td> <td width='30%'>"+(data.LandLevel || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>成交价格（万元）：</td><td width='30%'>"+(data.TransactionPrice || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>土地使用权人：</td> <td width='30%'>";
        if(data.Landholder){
            if(data.Landholder.KeyNo){
                html = html+"<a href='"+INDEX_URL+"/firm/"+data.Landholder.KeyNo+".html' target='_blank'>"+data.Landholder.Name+"</a>"
            }else{
                html = html+data.Landholder.Name;
            }
        }else{
            html = html+"-"
        }
        html = html+"</td>"
        html = html+"<td class='tb' width='20%'>约定交地日期：</td><td width='30%'>"+(data.AgreedLandTime || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>约定开工日期：</td> <td width='30%'>"+(data.AgreedStartTime || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>约定竣工日期：</td><td width='30%'>"+(data.AgreedCompletionTime || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>实际开工日期：</td> <td width='30%'>"+(data.ActualStartTime || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>实际竣工日期：</td><td width='30%'>"+(data.ActualCompletionTime || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>批准单位：</td> <td width='30%'>"+(data.ApprovalUnit || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>合同签订日期：</td><td width='30%'>"+(data.SignContractTime || '-')+"</td>";
        html = html+"</tr>";
        html  = html+"</table>";

        html+="<div class='mtcaption m-b-sm'>分期支付约定</div>"
        html = html+"<table class='ntable'>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>支付期号：</td> <td width='30%'>"+(data.PaymentIssue || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>约定支付日期：</td><td width='30%'>"+(data.AgreedPaymentDate || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>约定支付金额（万元）：</td> <td width='30%'>"+(data.AgreedPayment || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>备注：</td><td width='30%'>"+(data.mark || '-')+"</td>";
        html = html+"</tr>";
        html  = html+"</table>";

        html+="<div class='mtcaption m-b-sm'>约定容积率</div>"
        html = html+"<table class='ntable'>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>下限：</td> <td width='30%'>"+(data.AgreedRateMin || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>上限：</td><td width='30%'>"+(data.AgreedRateMax || '-')+"</td>";
        html = html+"</tr>";
        html  = html+"</table>";
        $('#landpurchaseview').html(html);
    });
}

//土地转让详情
function landmarketDetail(id) {
    $.get(INDEX_URL+'/company_landmarketDetail',{id:id},function (result) {
        var data = result.data;
            if(data.TransactionTime){
            var newDate = new Date();
            newDate.setTime(data.TransactionTime*1000);
            data.TransactionTime = newDate.bformat('yyyy-MM-dd');
        }
        var html = '';
        html = html+"<table class='ntable'>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>宗地标识：</td> <td width='30%'>"+(data.LandSign || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>宗地编号：</td><td width='30%'>"+(data.LandNo || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td width='20%' class='tb'>宗地座落：</td><td colspan='3'>"+(data.Address || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>所在行政区：</td> <td width='30%'>"+(data.AdministrativeAreaName || data.AdministrativeArea || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>土地用途：</td><td width='30%'>"+(data.Purpose || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>原土地使用权人：</td> <td width='30%'>";
        if(data.OldUsufruct){
            if(data.OldUsufruct.KeyNo){
                html = html+"<a href='"+INDEX_URL+"/firm/"+data.OldUsufruct.KeyNo+".html' target='_blank'>"+data.OldUsufruct.Name+"</a>"
            }else{
                html = html+data.OldUsufruct.Name;
            }
        }else{
            html = html+"-"
        }
        html = html+"</td>"
        html = html+"<td class='tb' width='20%'>现土地使用权人：</td><td width='30%'>";
        if(data.NewUsufruct){
            if(data.NewUsufruct.KeyNo){
                html = html+"<a href='"+INDEX_URL+"/firm/"+data.NewUsufruct.KeyNo+".html' target='_blank'>"+data.NewUsufruct.Name+"</a>"
            }else{
                html = html+data.NewUsufruct.Name;
            }
        }else{
            html = html+"-"
        }
        html = html+"</td>"
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>土地面积（公顷）：</td> <td width='30%'>"+(data.Acreage || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>成交日期：</td><td width='30%'>"+(data.TransactionTime || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>土地使用权类型：</td> <td width='30%'>"+(data.UsufructType || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>土地使用年限：</td><td width='30%'>"+(data.DurableYears || '-')+"</td>";
        html = html+"</tr>";
        tml = html+"<tr>";
        html = html+"<td class='tb' width='20%'>土地利用状况：</td> <td width='30%'>"+(data.UtilizationStatus || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>土地级别：</td><td width='30%'>"+(data.Level || '-')+"</td>";
        html = html+"</tr>";
        tml = html+"<tr>";
        html = html+"<td class='tb' width='20%'>转让方式：</td> <td width='30%'>"+(data.AttornMode || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>转让价格（万元）：</td><td width='30%'>"+(data.AttornPrice || '-')+"</td>";
        html = html+"</tr>";
        html  = html+"</table>";
        $('#landmarketview').html(html);
    });
}

//土地抵押详情
function landmortgageDetail(id) {
    $.get(INDEX_URL+'/company_landmortgageDetail',{id:id},function (result) {
        var data = result.data;
        if(data.OnBoardEndTime){
            var newDate = new Date();
            newDate.setTime(data.OnBoardEndTime*1000);
            data.OnBoardEndTime = newDate.bformat('yyyy-MM-dd');
        }
        if(data.OnBoardStartTime){
            var newDate = new Date();
            newDate.setTime(data.OnBoardStartTime*1000);
            data.OnBoardStartTime = newDate.bformat('yyyy-MM-dd');
        }
        var html = '';
        html = html+"<table class='ntable'>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>宗地标识：</td> <td width='30%'>"+(data.LandSign || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>宗地编号：</td><td width='30%'>"+(data.LandNo || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>所在行政区：</td> <td width='30%'>"+(data.AdministrativeAreaName || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>土地面积（公顷）：</td><td width='30%'>"+(data.Acreage || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td width='20%' class='tb'>宗地座落：</td><td colspan='3'>"+(data.Address || '-')+"</td>";
        html = html+"</tr>";
        
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>土地他项权利人证号：</td> <td width='30%'>"+(data.ObligeeNo || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>土地使用权证号：</td><td width='30%'>"+(data.UsufructNo || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>土地抵押人名称：</td> <td width='30%'>";
        if(data.MortgagorName){
            if(data.MortgagorName.KeyNo){
                html = html+"<a href='"+INDEX_URL+"/firm/"+data.MortgagorName.KeyNo+".html' target='_blank'>"+data.MortgagorName.Name+"</a>"
            }else{
                html = html+data.MortgagorName.Name;
            }
        }else{
            html = html+"-"
        }
        html = html+"</td>";

        html = html+"<td class='tb' width='20%'>土地抵押人性质：</td><td width='30%'>"+(data.MortgagorNature || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>土地抵押权人：</td> <td width='30%'>";
        if(data.MortgagePeople){
            if(data.MortgagePeople.KeyNo){
                html = html+"<a href='"+INDEX_URL+"/firm/"+data.MortgagePeople.KeyNo+".html' target='_blank'>"+data.MortgagePeople.Name+"</a>"
            }else{
                html = html+data.MortgagePeople.Name;
            }
        }else{
            html = html+"-"
        }
        html = html+"</td>";
        html = html+"<td class='tb' width='20%'>抵押土地用途：</td><td width='30%'>"+(data.MortgagePurpose || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>抵押土地权属性质与使用权类型：</td> <td width='30%'>"+(data.NatureAndType || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>抵押面积（公顷）：</td><td width='30%'>"+(data.MortgageAcreage || '-')+"</td>";
        html = html+"</tr>";
        tml = html+"<tr>";
        html = html+"<td class='tb' width='20%'>评估金额（万元）：</td> <td width='30%'>"+(data.AssessmentPrice || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>抵押金额（万元）：</td><td width='30%'>"+(data.MortgagePrice || '-')+"</td>";
        html = html+"</tr>";
        tml = html+"<tr>";
        html = html+"<td class='tb' width='20%'>土地抵押登记起始日期：</td> <td width='30%'>"+(data.OnBoardStartTime || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>土地抵押结束日期：</td><td width='30%'>"+(data.OnBoardEndTime || '-')+"</td>";
        html = html+"</tr>";
        html  = html+"</table>";
        $('#landmortgageview').html(html);
        $('#landmortgageModal').modal('show');
    });
}

//环保处罚详情
function envDetail(id) {
    $.get(INDEX_URL+'/company_envDetail',{id:id},function (result) {
        var data = result.data;
        if(data.PunishDate){
            var newDate = new Date();
            newDate.setTime(data.PunishDate*1000);
            data.PunishDate = newDate.bformat('yyyy-MM-dd');
        }
        var chtml = '';
        if(data.CompanyNameAndKeyNo[0].KeyNo){
            chtml = '<a target="_blank" href="'+INDEX_URL+'/firm/'+data.CompanyNameAndKeyNo[0].KeyNo+'.html">'+data.CompanyNameAndKeyNo[0].Name+'</a>'
        }else{
            chtml = data.CompanyNameAndKeyNo[0].Name;
        }

        var html = '';
        html = html+"<table class='ntable'>";
        html = html+"<tr>";
        html = html+"<td width='20%' class='tb'>决定书文号：</td><td >"+(data.CaseNo || '-')+"</td>";
        html = html+"<td width='20%' class='tb'>行政相对人名称：</td> <td width='30%' >"+(chtml || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td width='20%' class='tb'>处罚事由：</td><td colspan='3'>"+(data.PunishReason || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>违法类型：</td> <td width='30%'>"+(data.IllegalType || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>处罚依据：</td><td width='30%'>"+(data.PunishBasis || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>处罚结果：</td> <td width='30%'>"+(data.PunishmentResult || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>处罚单位：</td> <td width='30%'>"+(data.PunishGov || '-')+"</td>";
        html = html+"</tr>";
        tml = html+"<tr>";
        html = html+"<td class='tb' width='20%'>处罚日期：</td><td width='30%'>"+(data.PunishDate || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>执行情况：</td><td width='30%'>"+(data.Implementation || '-')+"</td>";
        html = html+"</tr>";
        
        html  = html+"</table>";
        $('#envview').html(html);
        $('#envModal').modal('show');
    });
}

//电信许可详情
function telecomDetail(id) {
    $.get(INDEX_URL+'/company_telecomdetail',{id:id},function (result) {
        var data = result.data;
        var html = '';
        html+="<div class='mtcaption m-b-sm'>基本信息</div>"
        html = html+"<table class='ntable'>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>公司名称：</td> <td width='30%'>";
        if(data.NameAndKeyNo){
            html = html+"<a target='_blank' href='"+INDEX_URL+"/firm/"+data.NameAndKeyNo.KeyNo+".html'>"+(data.NameAndKeyNo.CompanyName || '-')+"</a></td>";
        }else{
            html = html+"-</td>";
        }
        html = html+"<td class='tb' width='20%'>许可证号：</td><td width='30%'>"+(data.LicenseNo || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>是否有效：</td> <td width='30%'>"+(data.IsOk || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>业务及其覆盖范围：</td><td width='30%'>"+(data.Coverage || '-')+"</td>";
        html = html+"</tr>";
        html  = html+"</table>";
        if(data.AnnualReport && JSON.stringify(data.AnnualReport)!='[]'){
            html+="<div class='mtcaption m-b-sm'>年报公示</div>"
            html = html+"<table class='ntable'>";
            html = html+"<tr>";
            html = html+"<td class='tb' width='20%'>公司名称：</td> <td width='30%'>";
            if(data.AnnualReport.NameAndKeyNo){
                html = html+"<a target='_blank' href='"+INDEX_URL+"/firm/"+data.AnnualReport.NameAndKeyNo.KeyNo+".html'>"+(data.AnnualReport.NameAndKeyNo.CompanyName || '-')+"</a></td>";
            }else{
                html = html+"-</td>";
            }
            html = html+"<td class='tb' width='20%'>统一社会信用代码：</td><td width='30%'>"+(data.AnnualReport.RegNo || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb' width='20%'>法定代表人：</td> <td width='30%'>";
            if(data.AnnualReport.OperInfo && data.AnnualReport.OperInfo.OperId){
                html = html+"<a target='_blank' href='"+INDEX_URL+"/pl/"+data.AnnualReport.OperInfo.OperId+".html'>"+(data.AnnualReport.OperInfo.OperName || '-')+"</a></td>";
            }else if(data.AnnualReport.OperInfo){
                html = html+(data.AnnualReport.OperInfo.OperName || '-')+"</td>";
            }else{
                html = html+"-</td>";
            }
            html = html+"<td class='tb' width='20%'>许可证编号：</td><td width='30%'>"+(data.AnnualReport.LicenseNo || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb' width='20%'>注册地址：</td> <td width='30%'>"+(data.AnnualReport.Addr || '-')+"</td>";
            html = html+"<td class='tb' width='20%'>注册属地：</td><td width='30%'>"+(data.AnnualReport.Province || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb' width='20%'>注册资本：</td> <td width='30%'>"+(data.AnnualReport.Assets || '-')+"</td>";
            html = html+"<td class='tb' width='20%'>许可证业务种类：</td><td width='30%'>"+(data.AnnualReport.Type || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb' width='20%'>企业性质：</td> <td width='30%'>"+(data.AnnualReport.EntKind || '-')+"</td>";
            html = html+"<td class='tb' width='20%'>上市情况：</td><td width='30%'>"+(data.AnnualReport.IpoStatus || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb' width='20%'>股票代码：</td> <td width='30%'>"+(data.AnnualReport.StockCode || '-')+"</td>";
            html = html+"<td class='tb' width='20%'>客服服务电话：</td><td width='30%'>"+(data.AnnualReport.Tel || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb' width='20%'>用户投诉量：</td> <td width='30%'>"+(data.AnnualReport.TsNum || '-')+"</td>";
            html = html+"<td class='tb' width='20%'>用户投诉回复率：</td><td width='30%'>"+(data.AnnualReport.TsAnswerPer || '-')+"</td>";
            html = html+"</tr>";
            html  = html+"</table>";
            
        }
        if(data.BadCount>0){
            html+="<div class='mtcaption m-b-sm'>不良名单信息 "+data.BadCount+"</div>"
            $.each(data.BadList,function(key,vo){
                if(vo.TreatmentDate){
                    var newDate = new Date();
                    newDate.setTime(vo.TreatmentDate*1000);
                    vo.TreatmentDate = newDate.bformat('yyyy-MM-dd');
                }
                html = html+"<table class='ntable'>";
                html = html+"<tr>";
                html = html+"<td class='tb' width='20%'>处理日期：</td> <td width='30%'>"+(vo.TreatmentDate || '-')+"</td>";
                html = html+"<td class='tb' width='20%'>列入单位：</td><td width='30%'>"+(vo.InUnit || '-')+"</td>";
                html = html+"</tr>";
                html = html+"<tr>";
                html = html+"<td class='tb' width='20%'>列入事由：</td> <td colspan='3'>"+(vo.InReason || '-')+"</td>";
                html = html+"</tr>";
                html  = html+"</table>";
            })
        }
        if(data.ShixinCount>0){
            html+="<div class='mtcaption m-b-sm'>失信名单信息 "+data.ShixinCount+"</div>"
            $.each(data.ShixinList,function(key,vo){
                if(vo.TreatmentDate){
                    var newDate = new Date();
                    newDate.setTime(vo.TreatmentDate*1000);
                    vo.TreatmentDate = newDate.bformat('yyyy-MM-dd');
                }
                html = html+"<table class='ntable'>";
                html = html+"<tr>";
                html = html+"<td class='tb' width='20%'>处理日期：</td> <td width='30%'>"+(vo.TreatmentDate || '-')+"</td>";
                html = html+"<td class='tb' width='20%'>列入单位：</td><td width='30%'>"+(vo.InUnit || '-')+"</td>";
                html = html+"</tr>";
                html = html+"<tr>";
                html = html+"<td class='tb' width='20%'>主要投资者：</td> <td width='30%'>"+(vo.a || '-')+"</td>";
                html = html+"<td class='tb' width='20%'>主要经营管理人员：</td><td width='30%'>"+(vo.b || '-')+"</td>";
                html = html+"</tr>";
                html = html+"<tr>";
                html = html+"<td class='tb' width='20%'>列入事由：</td> <td colspan='3'>"+(vo.InReason || '-')+"</td>";
                html = html+"</tr>";
                html  = html+"</table>";
            })
        }
        html  = html+"<div class='text-gray'>数据来源：电信业务市场综合管理信息系统</div>";
        $("#telecomModal .modal-body").html(html);
    });
}

//税收违法
function taxIllegalDetail(id) {
    $.get(INDEX_URL+'/company_taxIllegalDetail',{id:id},function (result) {
        $('#taxIllegalview').html(result);
        $('#taxIllegalModal').modal('show');
    });
}

//股东出资详情
function gdczView(data,unit){
    if(!unit){
        unit = "万元";
    }
    if(data.ShouldType){
        data.ShouldType = data.ShouldType.replace(new RegExp(',','g'),',<br>');
    }
    if(data.RealType){
        data.RealType = data.RealType.replace(new RegExp(',','g'),',<br>');
    }
    if(data.ShouldCapi){
        data.ShouldCapi = data.ShouldCapi.replace(new RegExp(',','g'),',<br>');
    }
    if(data.RealCapi){
        data.RealCapi = data.RealCapi.replace(new RegExp(',','g'),',<br>');
    }
    if(data.ShoudDate){
        data.ShoudDate = data.ShoudDate.replace(new RegExp(',','g'),',<br>');
    }
    if(data.RealDate){
        data.RealDate = data.RealDate.replace(new RegExp(',','g'),',<br>');
    }
    var html = '';
    html = html+"<table class='ntable'>";
    html = html+"<tr>";
    html = html+"<td class='tb' width='132'>股东：</td> <td colspan='7'>"
    if(data.Partner){
        if(data.Partner.KeyNo){
            html = html + "<a href='"+INDEX_URL+"/firm/"+data.Partner.KeyNo+".html'>"+data.Partner.Name+"</a>";
        }else{
            html = html + data.Partner.Name;
        }
    }else{
        html = html+"-";
    }
    html = html+"</td>";
    html = html+"</tr>";
    html = html+"<tr>";
    html = html+"<td class='tb' width='132'>持股比例：</td> <td colspan='7'>"+(data.StockPercent || '-')+"</td>";
    html = html+"</tr>";
    html = html+"<tr>";
    html = html+"<td width='132' class='tb'>认缴出资方式：</td><td width='80' class='text-center'>"+(data.ShouldType  || '-')+"</td>";
    html = html+"<td width='130' class='tb'>认缴出资日期：</td> <td width='115' class='text-center'>"+(data.ShoudDate || '-')+"</td>";
    html = html+"<td width='140' class='tb' style='padding-right:2px;'>认缴出资额("+unit+")：</td> <td width='112' class='text-center'>"+(data.ShouldCapi || '-')+"</td>";
    html = html+"<td width='130' class='tb' style='padding-right:2px;'>认缴公示日期：</td> <td width='112' class='text-center'>"+(data.ShouldPublicDate || '-')+"</td>";
    html = html+"</tr>";
    html = html+"<tr>";
    html = html+"<td class='tb'>实缴出资方式：</td> <td class='text-center'>"+(data.RealType || '-')+"</td>";
    html = html+"<td class='tb'>实缴出资日期：</td><td class='text-center'>"+(data.RealDate || '-')+"</td>";
    html = html+"<td class='tb' style='padding-right:2px;'>实缴出资额("+unit+")：</td><td class='text-center'>"+(data.RealCapi || '-')+"</td>";
    html = html+"<td class='tb' style='padding-right:2px;'>实缴公示日期：</td><td class='text-center'>"+(data.ReallyPublicDate || '-')+"</td>";
    html = html+"</tr>";
    html  = html+"</table>";
    $('#gdczview').html(html);
}

//立案信息
function lianDetail(id){
    $('#lianview').empty();
    $.get(INDEX_URL+'/company_lianDetail',{id:id},function (result) {
        var data = result.data;
        if(data.RegistDate){
            var newDate = new Date();
            newDate.setTime(data.RegistDate*1000);
            data.RegistDate = newDate.bformat('yyyy-MM-dd');
        }
        if(data.HoldDate){
            var newDate = new Date();
            newDate.setTime(data.HoldDate*1000);
            data.HoldDate = newDate.bformat('yyyy-MM-dd');
        }
        if(data.FinishDate){
            var newDate = new Date();
            newDate.setTime(data.FinishDate*1000);
            data.FinishDate = newDate.bformat('yyyy-MM-dd');
        }
        var prosecutorHtml = ''
        if(data.Prosecutor && data.Prosecutor.length>0){
            $.each(data.Prosecutor,function(i,v){
                if(i!=0){
                    prosecutorHtml+='、';
                }
                if(v.KeyNo && v.Org==2){
                    prosecutorHtml+='<a href="'+INDEX_URL+'/pl/'+v.KeyNo+'.html" target="_blank">'+v.Name+'</a>';
                }else if(v.KeyNo){
                    prosecutorHtml+='<a href="'+INDEX_URL+'/firm/'+v.KeyNo+'.html" target="_blank">'+v.Name+'</a>';
                }else{
                    prosecutorHtml+=v.Name;
                }
                
            })
        }
        var appelleeHtml = ''
        if(data.Appellee && data.Appellee.length>0){
            $.each(data.Appellee,function(i,v){
                if(i!=0){
                    appelleeHtml+='、';
                }
                if(v.KeyNo && v.Org==2){
                    appelleeHtml+='<a href="'+INDEX_URL+'/pl/'+v.KeyNo+'.html" target="_blank">'+v.Name+'</a>';
                }else if(v.KeyNo){
                    appelleeHtml+='<a href="'+INDEX_URL+'/firm/'+v.KeyNo+'.html" target="_blank">'+v.Name+'</a>';
                }else{
                    appelleeHtml+=v.Name;
                }
                
            })
        }
        var outsiderHtml = ''
        if(data.Outsider && data.Outsider.length>0){
            $.each(data.Outsider,function(i,v){
                if(i!=0){
                    outsiderHtml+='、';
                }
                if(v.KeyNo && v.Org==2){
                    outsiderHtml+='<a href="'+INDEX_URL+'/pl/'+v.KeyNo+'.html" target="_blank">'+v.Name+'</a>';
                }else if(v.KeyNo){
                    outsiderHtml+='<a href="'+INDEX_URL+'/firm/'+v.KeyNo+'.html" target="_blank">'+v.Name+'</a>';
                }else{
                    outsiderHtml+=v.Name;
                }
                
            })
        }
        var html = '';
        html = html+"<table class='ntable'>";
        html = html+"<tr>";
        html = html+"<td width='20%' class='tb'>案由：</td><td colspan='3'>"+(data.Reason || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>案号：</td> <td width='30%'>";
        if(data.CaseSearchId && data.CaseSearchId != ''){
            html = html+ "<a  rel='nofollow' target='_blank' href='"+INDEX_URL+"/case/"+data.CaseSearchId[0]+".html'>"+(data.CaseNo || '-')+"</a>";
        }else{
            html = html+ (data.CaseNo || '-');
        }
        html = html+   "</td>";
        html = html+"<td class='tb' width='20%'>立案日期：</td><td width='30%'>"+(data.RegistDate || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>开庭时间：</td> <td width='30%'>"+(data.HoldDate || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>结束时间：</td><td width='30%'>"+(data.FinishDate || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>承办部门：</td> <td width='30%'>"+(data.Department || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>法院：</td><td width='30%'>"+(data.Court || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>承办法官：</td> <td width='30%'>"+(data.Judger || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>法官助理：</td><td width='30%'>"+(data.Assistant || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>案件类型：</td> <td width='30%'>"+(data.CaseType || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>案件状态：</td><td width='30%'>"+(data.CaseStatus || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td width='20%' class='tb'>上诉人：</td><td colspan='3'>"+(prosecutorHtml || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td width='20%' class='tb'>被上诉人：</td><td colspan='3'>"+(appelleeHtml || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td width='20%' class='tb'>第三人：</td><td colspan='3'>"+(outsiderHtml || '-')+"</td>";
        html = html+"</tr>";
        html  = html+"</table>";
        $('#lianview').html(html);
        $('#lianModal').modal('show');
    });
}

function gdPledgeDetail(personid,keyno){
    $('#gdPledgeModal .modal-body').empty();
    $.getJSON(INDEX_URL+'/company_gdpledgedetail',{personid:personid,keyno:keyno},function (result) {
         var html = '';
        $.each(result,function(index,data){
            if(data.RegDate){
                var newDate = new Date();
                newDate.setTime(data.RegDate*1000);
                data.RegDate = newDate.bformat('yyyy-MM-dd');
            }
           
            html = html+"<table class='ntable'>";

            html = html+"<tr>";
            html = html+"<td width='20%' class='tb'>登记编号：</td><td width='30%'>"+(data.RegistNo || '-')+"</td>";
            html = html+"<td width='20%' class='tb'>状态：</td> <td width='30%'>"+(data.Status || '-')+"</td>";
            html = html+"</tr>";

            html = html+"<tr>";
            html = html+"<td class='tb'>出质人：</td> <td>";
            if(data.PledgorInfo.KeyNo && data.PledgorInfo.KeyNo[0]!='p'){
                html = html+"<a target='_blank' href='"+INDEX_URL+"/firm/"+data.PledgorInfo.KeyNo+".html'>"+(data.PledgorInfo.Name|| '-')+"</a>";
            }else if(data.PledgorInfo.KeyNo && data.PledgorInfo.KeyNo[0]=='p'){
                html = html+"<a target='_blank' href='"+INDEX_URL+"/pl/"+data.PledgorInfo.KeyNo+".html'>"+(data.PledgorInfo.Name|| '-')+"</a>";
            }else if(data.PledgorInfo.KeyNo){
                html = html+"<a target='_blank' href='"+INDEX_URL+"/more_gov?name="+data.PledgorInfo.Name+"'>"+(data.PledgorInfo.Name|| '-')+"</a>";
            }else{
                html = html+(data.PledgorInfo.Name|| '-');
            }
            html = html+"</td>"
            html = html+"<td class='tb'>出质人证件号码：</td><td>"+(data.PledgorInfo.No|| '-')+"</td>";
            html = html+"</tr>";

            html = html+"<tr>";
            html = html+"<td class='tb'>出质股权数额（万元）：</td><td>"+(data.PledgedAmount || '-')+"</td>";
            html = html+"<td class='tb'>质权人：</td> <td>";
            if(data.PledgeeInfo.KeyNo){
                html = html+"<a target='_blank' href='"+INDEX_URL+"/firm/"+data.PledgeeInfo.KeyNo+".html'>"+(data.PledgeeInfo.Name || '-')+"</a>";
            }else{
                html = html+"-";
            }
            html = html+"</td>"
            html = html+"</tr>";

            html = html+"<tr>";
            html = html+"<td class='tb'>质权人证件号：</td> <td>"+(data.PledgeeInfo.No || '-')+"</td>";
            html = html+"<td class='tb'>股权出质登记日期：</td><td>"+(data.RegDate || '-')+"</td>";
            html = html+"</tr>";

            html  = html+"</table>";
        })
        $('#gdPledgeModal .modal-body').html(html);
        $('#gdPledgeModal').modal('show');
    });
}

function gdAssistanceDetail(personid,keyno){
    $('#gdPledgeModal .modal-body').empty();
    $.getJSON(INDEX_URL+'/company_gdassistancedetail',{personid:personid,keyno:keyno},function (result) {
         var html = '';
        $.each(result,function(index,data){
            html+=assistanceHtml(data);
        })
        $('#gdPledgeModal .modal-body').html(html);
        $('#gdPledgeModal').modal('show');
    });
}

function weiguiViewPeo(data) {
    var html = '';
    html = html+"<table class='ntable'>";
    html = html+"<tr>";
    html = html+"<td class='tb' width='20%'>公告日期：</td><td width='30%'>"+getMomentDate(data.PublicDate)+"</td>";
    html = html+"<td width='20%' class='tb'>处罚对象：</td><td>";
    if(data.MarkedManKey){
        html = html+"<a target='_blank' href='/pl/"+data.MarkedManKey+".html'>"+(data.MarkedMan || '-')+"</a>";
    }else{
        html = html+(data.MarkedMan || '-');
    }
    html = html+"</td>";
    html = html+"</tr>";
    html = html+"<tr>";
    html = html+"<td class='tb' width='20%'>违规类型：</td> <td width='30%'>"+(data.Type || '-')+"</td>";
    html = html+"<td class='tb' width='20%'>处分类型：</td> <td width='30%'>"+(data.Disposition || '-')+"</td>";
    html = html+"</tr>";
    html = html+"<tr>";
    html = html+"<td class='tb' width='20%'>处理人：</td> <td width='30%'>"+(data.ProcessMan || '-')+"</td>";
    html = html+"<td class='tb' width='20%'>处罚金额（万元）：</td> <td width='30%'>"+(data.PunishmentAmount || '-')+"</td>";
    html = html+"</tr>";
    html = html+"<tr>";
    html = html+"<td class='tb' width='20%'>违规行为：</td> <td colspan='3'>"+(data.Violation || '-')+"</td>";
    html = html+"</tr>";
    html = html+"<tr>";
    html = html+"<td class='tb' width='20%'>处分措施：</td> <td colspan='3'>"+(data.PunishmentMeasure || '-')+"</td>";
    html = html+"</tr>";
    html  = html+"</table>";
    $('#weiguiview').html(html);
    $('#weiguiModal').modal('show');
}

/**
 * 股权质押详情-人员
 */
function spledgeViewPeo(data) {
    var id = data.Id;
    $.ajax({
        type:'POST',
        url:INDEX_URL+'/people_getSpledge',
        data:'id='+id,
        success:function(msg){
            var obj = JSON.parse(msg);
            if(obj.status=="200"){
                var html = spledgeHtml(obj.data);
                $('#spledgeview').html(html);
            }
        }
    })
}

//股权质押详情
function spledgeView(id,ipotag) {
    $('#spledgeModal .modal-body').empty();
    $.get(INDEX_URL+'/company_spledgedetail',{id:id,ipotag:ipotag},function (result) {
        var data = result.data;
        var html = spledgeHtml(data,ipotag);
        $('#spledgeModal .modal-body').html(html);
        $('#spledgeModal').modal('show');
    });
}


function spledgeHtml(data,ipotag){
    if(ipotag==2 || ipotag==1){
        var html = '';
        html = html+"<table class='ntable'>";
        html = html+"<tr>";
        html = html+"<td width='20%' class='tb'>股东名称：</td><td colspan='3'>";
        if(data.HolderKeyNo && data.HolderOrg==6){
            html = html+"<a target='_blank' href='/simu_"+data.HolderKeyNo+".html'>"+(data.HolderName || '-')+"</a>";
        }else if(data.HolderKeyNo){
            html = html+"<a target='_blank' href='/firm/"+data.HolderKeyNo+".html'>"+(data.HolderName || '-')+"</a>";
        }else{
            html = html+(data.HolderName || '-');
        }
        html = html+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>质押股份数量（股）：</td> <td width='30%'>"+(data.ShareFrozenNum || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>质押股份市值（元）：</td><td width='30%'>"+(data.SZ || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>占所持股份比例：</td> <td width='30%'>"+(data.FrozenRatio || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>占总股本比例：</td><td width='30%'>"+(data.FrozeninTotal || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td width='20%' class='tb'>质押机构：</td><td colspan='3'>";
        if(data.JgKeyNo){
            html = html+"<a target='_blank' href='/firm/"+data.JgKeyNo+".html'>"+(data.JgName || '-')+"</a>";
        }else{
            html = html+(data.JgName || '-');
        }
        html = html+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td width='20%' class='tb'>质押原因：</td><td colspan='3'>"+(data.FrozenReason || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>质押目的：</td> <td width='30%'>"+(data.Pledgepur || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>质押日收盘价（元）：</td><td width='30%'>"+(data.SPJ || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>预警线（估算）：</td> <td width='30%'>"+(data.YJX || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>平仓线（估算）：</td><td width='30%'>"+(data.PCX || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>质押开始日期：</td> <td width='30%'>"+(data.StartDate || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>质押解除日期：</td><td width='30%'>"+(data.EndDate || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>状态：</td> <td width='30%'>"+(data.Type || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>公告日期：</td><td width='30%'>"+(data.NoticeDate || '-')+"</td>";
        html = html+"</tr>";
        html  = html+"</table>";
    }else{
        var html = '';
        html = html+"<table class='ntable'>";
        html = html+"<tr>";
        html = html+"<td width='20%' class='tb'>质押人：</td><td colspan='3'>";
        if(data.KeyNo){
            html = html+"<a target='_blank' href='/firm/"+data.KeyNo+".html'>"+(data.Name || '-')+"</a>";
        }else{
            html = html+(data.Name || '-');
        }
        html = html+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td width='20%' class='tb'>质押人参股企业：</td><td colspan='3'>";
        if(data.CompanyKeyNo){
            html = html+"<a target='_blank' href='/firm/"+data.CompanyKeyNo+".html'>"+(data.CompanyName || '-')+"</a>";
        }else{
            html = html+(data.CompanyName || '-');
        }
        html = html+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>质押股份数量（股）：</td> <td width='30%'>"+(data.ShareFrozenNum || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>质押股份市值（元）：</td><td width='30%'>"+(data.SZ || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>占所持股份比例：</td> <td width='30%'>"+(data.FrozenRatio || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>占总股本比例：</td><td width='30%'>"+(data.FrozeninTotal || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td width='20%' class='tb'>质押机构：</td><td colspan='3'>";
        if(data.JgKeyNo){
            html = html+"<a target='_blank' href='/firm/"+data.JgKeyNo+".html'>"+(data.JgName || '-')+"</a>";
        }else{
            html = html+(data.JgName || '-');
        }
        html = html+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td width='20%' class='tb'>质押原因：</td><td colspan='3'>"+(data.FrozenReason || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>质押目的：</td> <td width='30%'>"+(data.Pledgepur || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>质押日收盘价（元）：</td><td width='30%'>"+(data.SPJ || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>预警线（估算）：</td> <td width='30%'>"+(data.YJX || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>平仓线（估算）：</td><td width='30%'>"+(data.PCX || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>质押开始日期：</td> <td width='30%'>"+(data.StartDate || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>质押解除日期：</td><td width='30%'>"+(data.EndDate || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb' width='20%'>状态：</td> <td width='30%'>"+(data.Type || '-')+"</td>";
        html = html+"<td class='tb' width='20%'>公告日期：</td><td width='30%'>"+(data.NoticeDate || '-')+"</td>";
        html = html+"</tr>";
        html  = html+"</table>";
    }
    return html;
}

function  spledgeHoldView(data) {
    var html = '';
    html = html+"<table class='ntable'>";
    html = html+"<tr>";
    html = html+"<td width='22%' class='tb'>股东名称：</td><td colspan='3'>";
    if(data.HolderKeyNo && data.HolderOrg==6){
        html = html+"<a target='_blank' href='/simu_"+data.HolderKeyNo+".html'>"+(data.HolderName || '-')+"</a>";
    }else if(data.HolderKeyNo){
        html = html+"<a target='_blank' href='/firm/"+data.HolderKeyNo+".html'>"+(data.HolderName || '-')+"</a>";
    }else{
        html = html+(data.HolderName || '-');
    }
    html = html+"</td>";
    html = html+"</tr>";
    html = html+"<tr>";
    html = html+"<td class='tb' width='22%'>最新质押笔数：</td> <td width='28%'>"+(data.ShareCount || '-')+"</td>";
    html = html+"<td class='tb' width='22%'>剩余质押股数（股）：</td><td width='28%'>"+(data.AmtShareFrozen || '-')+"</td>";
    html = html+"</tr>";
    html = html+"<tr>";
    html = html+"<td class='tb' width='22%'>剩余质押股数市值（元）：</td> <td width='28%'>"+(data.ZYSZ || '-')+"</td>";
    html = html+"<td class='tb' width='22%'>占所持股份比例：</td><td width='28%'>"+(data.ZYBL || '-')+"</td>";
    html = html+"</tr>";
    html = html+"<tr>";
    html = html+"<td class='tb' width='22%'>占总股本比例：</td> <td width='28%'>"+(data.AmtFrozenRatio || '-')+"</td>";
    if(data.PCXMin!='-' || data.PCXMax!='-'){
        html = html+"<td class='tb' width='22%'>平仓线区间（预估）：</td><td width='28%'>"+(data.PCXMin || '-')+"~"+(data.PCXMax || '-')+"</td>";
    }else{
        html = html+"<td class='tb' width='22%'>平仓线区间（预估）：</td><td width='28%'>-</td>";
    }
    html = html+"</tr>";
    html = html+"<tr>";
    if(data.YjxMin!='-' || data.YjxMax!='-'){
        html = html+"<td class='tb' width='22%'>预警线区间（预估）：</td> <td width='28%'>"+(data.YjxMin || '-')+"~"+(data.YjxMax || '-')+"</td>";
    }else{
        html = html+"<td class='tb' width='22%'>预警线区间（预估）：</td><td width='28%'>-</td>";
    }
    
    html = html+"<td class='tb' width='22%'>更新日期：</td><td width='28%'>"+(data.UpdateDate || '-')+"</td>";
    html = html+"</tr>";
    html  = html+"</table>";
    $('#spledgeHoldModal .modal-body').html(html);
    $('#spledgeHoldModal').modal('show');
}

//招投标详情
function tenderview(id){
    $('#tenderModal .modal-body').empty();
    $.getJSON(INDEX_URL+'/company_tenderview',{id:id},function (res) {
        
        if(res.data){
            if(res.data.DataType=='html'){
                res.data.Data.Content = res.data.Data.Content.replace(/\n\n/g, "<br/><div class='space'></div>");
                res.data.Data.Content = res.data.Data.Content.replace(/(&nbsp;)+/g, " ");
                res.data.Data.Content = res.data.Data.Content.replace(/\s+/g, " ");

                var html = res.data.Data.Content;
            }else if(res.data.DataType=='json'){
                var data = res.data.Data;
                var html = '';

                if(data.contentNew && data.contentNew.length>0){
                    html = html+"<table class='ntable'>";
                    $.each(data.contentNew,function(i,v){
                        html = html+"<tr>";
                        html = html+"<td width='20%' class='tb'>"+v.desc+"：</td><td colspan='3'>"+(v.value || '-')+"</td>";
                        html = html+"</tr>";
                    });
                    html  = html+"</table>";
                }
                
                if(data.contentListNew && data.contentListNew.length>0){
                    $.each(data.contentListNew,function(i,list){
                        html = html+"<table class='ntable'>";
                        $.each(list,function(index,v){
                            if(index%2==0){
                                html = html+"<tr>";
                            }
                            
                            html = html+"<td width='20%' class='tb'>"+v.desc+"：</td><td width='30%'>"+(v.value || '-')+"</td>";
                            if(index%2==1){
                                html = html+"</tr>";
                            }
                            
                        });
                        html  = html+"</table>";
                    });
                }
            }
        }
        $('#tenderModal .modal-body').html(html);

        if(res.data.DataType=='html'){
            var table = $('#tenderModal')[0].getElementsByTagName("table");
            for(var i=0;i<table.length;i++){
                var rows = table[i].rows;
                var rownum = table[i].rows.length;
                var arr=[];
                for(var j=0;j<rownum;j++){
                    arr.push(rows[j].cells.length);
                }
                var max2 = arr.sort(function(a,b){
                    return b-a;
                })[0];

                for(var z=0;z<rownum;z++){
                    $(rows[z].cells[rows[z].cells.length-1]).attr("colspan",max2-rows[z].cells.length+1)
                }
            }
        }
        $('#tenderModal').modal('show');
    });
}

//资质资格详情
function bmqualificationView(dataId){
    $.ajax({
        type:'GET',
        url:INDEX_URL+'/company_bmqualificationDetail',
        data:{
            id:dataId
        },
        dataType:'json',
        success:function(msg){
            data = msg.data;
            if(data.KeyNo){
                data.Name = '<a target="_blank" href="'+INDEX_URL+'/firm/'+data.KeyNo+'.html">'+data.Name+'</a>';
            }
            var html = '';
            html = html+"<div class='mtcaption'>资质资格</div>";
            html = html+"<table class='ntable'>";
            html = html+"<tr>";
            html = html+"<td width='23%' class='tb'>设计资质：</td> <td width='27%'>"+(data.Category || '-')+"</td>";
            html = html+"<td width='23%' class='tb'>资质证书号：</td><td width='27%'>"+(data.CertNo || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb' width='23%'>资质名称：</td><td colspan='3'>"+(data.QualificationName || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td width='23%' class='tb'>发证日期：</td> <td>"+getMomentDate(data.SignDate)+"</td>";
            html = html+"<td width='23%' class='tb'>证书有效期：</td><td>"+getMomentDate(data.ValidPeriod)+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb' width='23%'>发证机关：</td><td colspan='3'>"+(data.SignDept  || '-')+"</td>";
            html = html+"</tr>";
            html  = html+"</table>";
            html = html+"<div class='mtcaption'>证书信息</div>";
            html = html+"<table class='ntable'>";
            html = html+"<tr>";
            html = html+"<td width='23%' class='tb'>企业名称：</td> <td width='27%'>"+(data.Name || '-')+"</td>";
            html = html+"<td width='23%' class='tb'>证书编号：</td><td width='27%'>"+(data.QualificationCertNo || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td width='23%' class='tb'>发证日期：</td> <td>"+getMomentDate(data.CertSignDate)+"</td>";
            html = html+"<td width='23%' class='tb'>有效期至：</td><td>"+getMomentDate(data.CertEndDate)+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb' width='23%'>资质范围：</td><td colspan='3'>"+($.trim(data.QualificationScope) || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb' width='23%'>备注：</td><td colspan='3'>"+(data.Remark  || '-')+"</td>";
            html = html+"</tr>";
            html  = html+"</table>";
            $('#bmqualificationModal .modal-body').html(html);
            $('#bmqualificationModal').modal('show');
        }
    })
}

//注册人员详情
function bmpersonView(dataId){
    $.ajax({
        type:'GET',
        url:INDEX_URL+'/company_bmpersonDetail',
        data:{
            id:dataId
        },
        dataType:'json',
        success:function(msg){
            data = msg.data;
            var html = '';
            html = html+"<div class='mtcaption'>基本信息</div>";
            html = html+"<table class='ntable'>";
            html = html+"<tr>";
            html = html+"<td width='23%' class='tb'>姓名：</td> <td width='27%'>"+(data.Name || '-')+"</td>";
            html = html+"<td width='23%' class='tb'>性别：</td><td width='27%'>"+(data.Sex || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td width='23%' class='tb'>证件类型：</td> <td>"+(data.CredentialType || '-')+"</td>";
            html = html+"<td width='23%' class='tb'>证件号码：</td><td>"+(data.IdNo || '-')+"</td>";
            html = html+"</tr>";
            html  = html+"</table>";

            if(data.RegInfo && data.RegInfo.length>0){
                html = html+"<div class='mtcaption'>执业注册信息</div>";
                $.each(data.RegInfo,function(key,vo){
                    html = html+"<table class='ntable'>";
                    html = html+"<tr>";
                    html = html+"<td width='23%' class='tb'>注册类别：</td> <td width='27%'>"+(vo.RegCategory || '-')+"</td>";
                    html = html+"<td width='23%' class='tb'>注册证书：</td><td width='27%'>"+(vo.CertNo || '-')+"</td>";
                    html = html+"</tr>";
                    html = html+"<tr>";
                    html = html+"<td width='23%' class='tb'>注册单位：</td> <td>"+getCoyStr(vo.RegCoy)+"</td>";
                    html = html+"<td width='23%' class='tb'>执业印章号：</td><td>"+(vo.WorkingNo || '-')+"</td>";
                    html = html+"</tr>";
                    html = html+"<tr>";
                    html = html+"<td width='23%' class='tb'>注册专业：</td> <td>"+(vo.Specialty || '-')+"</td>";
                    html = html+"<td width='23%' class='tb'>有效期：</td><td>"+getMomentDate(vo.EndDate)+"</td>";
                    html = html+"</tr>";
                    html  = html+"</table>";
                });
            }
                
            if(data.AchievementInfo && data.AchievementInfo.length>0){
                html = html+"<div class='mtcaption'>个人工程业绩</div>";
                $.each(data.AchievementInfo,function(key,vo){
                    html = html+"<table class='ntable'>";
                    html = html+"<tr>";
                    html = html+"<td class='tb' width='23%'>项目名称：</td><td colspan='3'>"+(vo.ProjectName  || '-')+"</td>";
                    html = html+"</tr>";
                    html = html+"<tr>";
                    html = html+"<td width='23%' class='tb'>项目属地：</td> <td width='27%'>"+(vo.Position || '-')+"</td>";
                    html = html+"<td width='23%' class='tb'>项目类别：</td><td width='27%'>"+(vo.Type || '-')+"</td>";
                    html = html+"</tr>";
                    html = html+"<tr>";
                    html = html+"<td width='23%' class='tb'>建设单位：</td> <td>"+getCoyStr(vo.ConsCoy)+"</td>";
                    html = html+"<td width='23%' class='tb'>项目编码：</td><td>"+(vo.ProjectNo || '-')+"</td>";
                    html = html+"</tr>";
                    html  = html+"</table>";
                });
            }
                
            if(data.NegativeInfo && data.NegativeInfo.length>0){
                html = html+"<div class='mtcaption'>不良行为</div>";
                $.each(data.NegativeInfo,function(key,vo){
                    html = html+"<table class='ntable'>";
                    html = html+"<tr>";
                    html = html+"<td class='tb' width='23%'>诚信记录主体：</td><td colspan='3'>"+(vo.OwnerInfo  || '-')+"</td>";
                    html = html+"</tr>";
                    html = html+"<tr>";
                    html = html+"<td width='23%' class='tb'>诚信记录编号：</td> <td width='27%'>"+(vo.No || '-')+"</td>";
                    html = html+"<td width='23%' class='tb'>实施部门（文号）：</td><td width='27%'>"+(vo.Dept || '-')+"</td>";
                    html = html+"</tr>";
                    html = html+"<tr>";
                    html = html+"<td width='23%' class='tb'>决定内容：</td> <td>"+(vo.Decision || '-')+"</td>";
                    html = html+"<td width='23%' class='tb'>发布有限期：</td><td>"+getMomentDate(vo.EndDate)+"</td>";
                    html = html+"</tr>";
                    html  = html+"</table>";
                });
            }
                
            if(data.PositiveInfo && data.PositiveInfo.length>0){
                html = html+"<div class='mtcaption'>良好行为</div>";
                $.each(data.PositiveInfo,function(key,vo){
                    html = html+"<table class='ntable'>";
                    html = html+"<tr>";
                    html = html+"<td class='tb' width='23%'>诚信记录主体：</td><td colspan='3'>"+(vo.OwnerInfo  || '-')+"</td>";
                    html = html+"</tr>";
                    html = html+"<tr>";
                    html = html+"<td width='23%' class='tb'>诚信记录编号：</td> <td width='27%'>"+(vo.No || '-')+"</td>";
                    html = html+"<td width='23%' class='tb'>实施部门（文号）：</td><td width='27%'>"+(vo.Dept || '-')+"</td>";
                    html = html+"</tr>";
                    html = html+"<tr>";
                    html = html+"<td width='23%' class='tb'>决定内容：</td> <td>"+(vo.Decision || '-')+"</td>";
                    html = html+"<td width='23%' class='tb'>发布有限期：</td><td>"+getMomentDate(vo.EndDate)+"</td>";
                    html = html+"</tr>";
                    html  = html+"</table>";
                });
            }

            if(data.BlackListInfo && data.BlackListInfo.length>0){
                html = html+"<div class='mtcaption'>黑名单记录</div>";
                $.each(data.BlackListInfo,function(key,vo){
                    html = html+"<table class='ntable'>";
                    html = html+"<tr>";
                    html = html+"<td class='tb' width='23%'>黑名单记录主体：</td><td colspan='3'>"+(vo.OwnerInfo  || '-')+"</td>";
                    html = html+"</tr>";
                    html = html+"<tr>";
                    html = html+"<td width='23%' class='tb'>记录原由：</td> <td width='27%'>"+(vo.Reason || '-')+"</td>";
                    html = html+"<td width='23%' class='tb'>实施部门（文号）：</td><td width='27%'>"+(vo.Dept || '-')+"</td>";
                    html = html+"</tr>";
                    html = html+"<tr>";
                    html = html+"<td width='23%' class='tb'>决定日期：</td> <td>"+getMomentDate(vo.DecisionDate)+"</td>";
                    html = html+"<td width='23%' class='tb'>有效期截止：</td><td>"+getMomentDate(vo.EndDate)+"</td>";
                    html = html+"</tr>";
                    html  = html+"</table>";
                });
            }

            if(data.ChangeInfo && data.ChangeInfo.length>0){
                html = html+"<div class='mtcaption'>变更记录</div>";
                $.each(data.ChangeInfo,function(key,vo){
                    html = html+"<table class='ntable'>";
                    html = html+"<tr>";
                    html = html+"<td width='23%' class='tb'>变更日期：</td> <td width='27%'>"+getMomentDate(vo.ChangeDate)+"</td>";
                    html = html+"<td width='23%' class='tb'>变更内容：</td><td width='27%'>"+(vo.Content || '-')+"</td>";
                    html = html+"</tr>";
                    html  = html+"</table>";
                });
            }
            
            $('#bmpersonModal .modal-body').html(html);
            $('#bmpersonModal').modal('show');
        }
    })
}

//工程项目详情
function bmprojectView(dataId){
    $.ajax({
        type:'GET',
        url:INDEX_URL+'/company_bmprojectDetail',
        data:{
            id:dataId
        },
        dataType:'json',
        success:function(msg){
            data = msg.data;
            var html = '';
            html = html+"<div class='mtcaption'>基本信息</div>";
            html = html+"<table class='ntable'>";
            html = html+"<tr>";
            html = html+"<td class='tb' width='23%'>项目名称：</td><td colspan='3'>"+(data.ProjectName  || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td width='23%' class='tb'>项目编号：</td> <td width='27%'>"+(data.No || '-')+"</td>";
            html = html+"<td width='23%' class='tb'>省级项目编号：</td><td width='27%'>"+(data.ProvinceNo || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td width='23%' class='tb'>建设单位：</td> <td>"+getCoyStr(data.ConsCoyList)+"</td>";
            html = html+"<td width='23%' class='tb'>建设单位组织机构代码 （统一社会信用代码）：</td><td>"+(data.OrgNo || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td width='23%' class='tb'>建设性质：</td> <td>"+(data.Identification || '-')+"</td>";
            html = html+"<td width='23%' class='tb'>工程用途：</td><td>"+(data.Purpose || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td width='23%' class='tb'>立项级别：</td> <td>"+(data.Level || '-')+"</td>";
            html = html+"<td width='23%' class='tb'>总投资：</td><td>"+(data.GrossInvestment || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td width='23%' class='tb'>总面积：</td> <td>"+(data.Area || '-')+"</td>";
            html = html+"<td width='23%' class='tb'>立项文号：</td><td>"+(data.DocNo || '-')+"</td>";
            html = html+"</tr>";
            html  = html+"</table>";

            if(data.TenderInfo && data.TenderInfo.length>0){
                html = html+"<div class='mtcaption'>招投标</div>";
                $.each(data.TenderInfo,function(key,vo){
                    html = html+"<table class='ntable'>";
                    html = html+"<tr>";
                    html = html+"<td class='tb' width='23%'>中标单位名称：</td><td colspan='3'>"+getCoyStr(vo.BidWinCoy)+"</td>";
                    html = html+"</tr>";
                    html = html+"<tr>";
                    html = html+"<td width='23%' class='tb'>招标类型：</td> <td width='27%'>"+(vo.Type || '-')+"</td>";
                    html = html+"<td width='23%' class='tb'>招标方式：</td><td width='27%'>"+(vo.Way || '-')+"</td>";
                    html = html+"</tr>";
                    html = html+"<tr>";
                    html = html+"<td width='23%' class='tb'>中标日期：</td> <td>"+getMomentDate(vo.BidWinDate)+"</td>";
                    html = html+"<td width='23%' class='tb'>中标金额：</td><td>"+(vo.BidWinAmt)+"</td>";
                    html = html+"</tr>";
                    html = html+"<tr>";
                    html = html+"<td width='23%' class='tb'>中标通知书编号：</td> <td>"+(vo.NoticeNo || '-')+"</td>";
                    html = html+"<td width='23%' class='tb'>省级中标通知书标号：</td><td>"+(vo.PrNoticeNo)+"</td>";
                    html = html+"</tr>";
                    html  = html+"</table>";
                })
            }

            if(data.SGTInfo && data.SGTInfo.length>0){
                html = html+"<div class='mtcaption'>施工图审查</div>";
                $.each(data.SGTInfo,function(key,vo){
                    html = html+"<table class='ntable'>";
                    html = html+"<tr>";
                    html = html+"<td width='23%' class='tb'>设计单位名称：</td> <td width='27%'>"+getCoyStr(vo.DesignCoy)+"</td>";
                    html = html+"<td width='23%' class='tb'>勘察单位名称：</td><td width='27%'>"+getCoyStr(vo.AuditCoy)+"</td>";
                    html = html+"</tr>";
                    html = html+"<tr>";
                    html = html+"<td width='23%' class='tb'>施工图审查合格证书编号：</td> <td>"+(vo.DocNo || '-')+"</td>";
                    html = html+"<td width='23%' class='tb'>省级施工图审核合格书编号：</td><td>"+(vo.PrDocNo || '-')+"</td>";
                    html = html+"</tr>";
                    html = html+"<tr>";
                    html = html+"<td width='23%' class='tb'>施工图审查机构名称：</td> <td>"+getCoyStr(vo.InsCoy)+"</td>";
                    html = html+"<td width='23%' class='tb'>审查完成日期：</td><td>"+getMomentDate(vo.FinishDate)+"</td>";
                    html = html+"</tr>";
                    html  = html+"</table>";
                }); 
            }
            
            if(data.ContractBuInfo && data.ContractBuInfo.length>0){
                html = html+"<div class='mtcaption'>合同备案</div>";
                $.each(data.ContractBuInfo,function(key,vo){   
                    html = html+"<table class='ntable'>";
                    html = html+"<tr>";
                    html = html+"<td width='23%' class='tb'>合同类型：</td> <td width='27%'>"+(vo.Category || '-')+"</td>";
                    html = html+"<td width='23%' class='tb'>合同金额：</td><td width='27%'>"+(vo.Amount || '-')+"</td>";
                    html = html+"</tr>";
                    html = html+"<tr>";
                    html = html+"<td width='23%' class='tb'>合同签订日期：</td> <td>"+getMomentDate(vo.SignDate)+"</td>";
                    html = html+"<td width='23%' class='tb'>合同备案编号：</td><td>"+(vo.RecordNo)+"</td>";
                    html = html+"</tr>";
                    html = html+"<tr>";
                    html = html+"<td class='tb' width='23%'>省级合同备案编号：</td><td colspan='3'>"+(vo.PrRecordNo  || '-')+"</td>";
                    html = html+"</tr>";
                    html = html+"<tr>";
                    html  = html+"</table>";
                });
            }

                
            if(data.SgLicense && data.SgLicense.length>0){
                html = html+"<div class='mtcaption'>施工许可</div>";
                $.each(data.SgLicense,function(key,vo){ 
                    html = html+"<table class='ntable'>";
                    html = html+"<tr>";
                    html = html+"<td width='23%' class='tb'>合同金额：</td> <td width='27%'>"+(vo.Amount || '-')+"</td>";
                    html = html+"<td width='23%' class='tb'>面积：</td><td width='27%'>"+(vo.Area || '-')+"</td>";
                    html = html+"</tr>";
                    html = html+"<tr>";
                    html = html+"<td width='23%' class='tb'>发证日期：</td> <td>"+getMomentDate(vo.LicenseDate)+"</td>";
                    html = html+"<td width='23%' class='tb'>施工许可证编号：</td><td>"+(vo.DocNo || '-')+"</td>";
                    html = html+"</tr>";
                    html = html+"<tr>";
                    html = html+"<td class='tb' width='23%'>省级施工许可证编号：</td><td colspan='3'>"+(vo.PrDocNo  || '-')+"</td>";
                    html = html+"</tr>";
                    html = html+"<tr>";
                    html  = html+"</table>";
                });
            }
                
            if(data.FinishVerify && data.FinishVerify.length>0){
                html = html+"<div class='mtcaption'>竣工验收备案</div>";
                $.each(data.FinishVerify,function(key,vo){ 
                    html = html+"<table class='ntable'>";
                    html = html+"<tr>";
                    html = html+"<td width='23%' class='tb'>实际造价：</td> <td width='27%'>"+(vo.Price || '-')+"</td>";
                    html = html+"<td width='23%' class='tb'>实际面积：</td><td width='27%'>"+(vo.Area || '-')+"</td>";
                    html = html+"</tr>";
                    html = html+"<tr>";
                    html = html+"<td width='23%' class='tb'>实际开工日期：</td> <td>"+getMomentDate(vo.StartDate)+"</td>";
                    html = html+"<td width='23%' class='tb'>实际竣工验收日期：</td><td>"+getMomentDate(vo.VerifyDate)+"</td>";
                    html = html+"</tr>";
                    html = html+"<tr>";
                    html = html+"<td width='23%' class='tb'>竣工备案编号：</td> <td>"+(vo.RecordNo || '-')+"</td>";
                    html = html+"<td width='23%' class='tb'>省级竣工备案编号：</td><td>"+(vo.PrRecordNo)+"</td>";
                    html = html+"</tr>";
                    html  = html+"</table>";
                });
            }
                
            $('#bmprojectModal .modal-body').html(html);
            $('#bmprojectModal').modal('show');
        }
    })
}

//持股详情
function stockView(partnerId,tag){
    tag = arguments[1] ? arguments[1] : 'all';
    $('.relat-modal-list').css('margin-left','0px');
    $('.relat-modal-detail').css('margin-left','100%');
    $('#stockdetail').empty();
    $('#stockrelate').empty();
    var keyno  = $("#unique").val();
    $.ajax({
        type:'GET',
        url:INDEX_URL+'/company_stockdetail',
        data:{
            keyno:keyno,
            partnerId:partnerId,
            tag:tag,
        },
        dataType:'html',
        success:function(html){
            if(html){
                $('#stockdetail').html(html);
            }else{
                $('#stockdetail').html('<div class="pnodata lg"> <img src="{{$STYLE_ROOT}}/cms/v2/images/nno_image.png"> <p>信息</p> </div>');
            }
            $('#stockModal').modal('show');
        }
    })
}

//股权链
function benefitDetail(partnerId,tags){
    var keyno  = $("#unique").val();
    if(!userId){
        getCaptcha();
        $('#loginModal').modal('show');
        return;
    }
    if(userGroupid!='43' && !inFreeCompanies(keyno)){
        zhugeTrack('开通VIP',{'弹窗来源':'股权链'});
        showVipModal('股权链','成为VIP会员 即可查看企业股东最终受益股份的股权链详情','gqlj');
        return;
    }
    $.ajax({
        type:'GET',
        url:INDEX_URL+'/company_benefitdetail',
        data:{
            keyno:keyno,
            partnerId:partnerId,
            tags:tags,
        },
        dataType:'html',
        success:function(html){
            if(html){
                $('#benefitdetail').html(html);
            }else{
                $('#benefitdetail').html('<div class="pnodata lg"> <img src="{{$STYLE_ROOT}}/cms/v2/images/nno_image.png"> <p>信息</p> </div>');
            }
            $('#benefitModal').modal('show');
        }
    })
}

function stockViewRelat(data,type,pledgeType){
    var title;
    if(type=='spledgeView'){
        title = '股权质押详情';
        if(pledgeType==1){
            pledgeType=2; 
        }else if(pledgeType==2){
            pledgeType=1;
        }
        $.get(INDEX_URL+'/company_spledgedetail',{id:data,ipotag:pledgeType},function (result) {
            var html = spledgeHtml(result.data,pledgeType);
            $('#stockrelate').html(html);
        });

    }else if(type=='pledgeView'){
        title = '股权出质详情';
        var html = pledgeHtml(data);
        $('#stockrelate').html(html);
    }else if(type=='assistance'){
        title = '股权冻结详情';
        var html = assistanceHtml(data);
        $('#stockrelate').html(html);
    }
    $('#stockModal .relat-modal-detail .modal-title').html(title)
    $('.relat-modal-list').css('margin-left','-100%');
    $('.relat-modal-detail').css('margin-left','0px');
    
}

function investList(p,keyno,name){
    if(!userId){
        getCaptcha();
        $('#loginModal').modal('show');
        return;
    }
    if(name){
        $('#investListModal .modal-title').html(name+' 对外投资');
    }
    $.ajax({
        type:'GET',
        url:INDEX_URL+'/company_investlist',
        data:{
            keyno:keyno,
            p:p
        },
        dataType:'html',
        success:function(html){
            $('#investListModal .modal-body').html(html);
            $('#investListModal').modal('show');
        }
    })
}

function guquanList(p,keyno,name,box){
    if(name){
        $('#guquanListModal .modal-title').html(name+' 股权结构');
    }
    $.ajax({
        type:'GET',
        url:INDEX_URL+'/company_guquanlist',
        data:{
            keyno:keyno,
            name:name,
            p:p
        },
        dataType:'html',
        success:function(html){
            if(html){
                $('#guquanListModal .modal-body').html(html);
            }else{
                $('#guquanListModal .modal-body').html('<div class="pnodata lg"> <img src="{{$STYLE_ROOT}}/cms/v2/images/nno_image.png"> <p>暂无信息</p> </div>');
            }
            $('#guquanListModal').modal('show');
        }
    })
}

function guquanList2(keyno,name){
    if(!userId){
        getCaptcha();
        $('#loginModal').modal('show');
        return;
    }
    if(userGroupid!='43' && !inFreeCompanies(keyno)){
        showVipModal('股权结构','成为VIP会员 即可查看企业的股东持股和对外投资情况','gqjg');
        return;
    }
    if(name){
        $('#guquanListModal2 .modal-title>.t').html(name+' 股权结构');
    }
    $('#guquanlist').html('<div class="ploading lg"> <img src="/material/theme/chacha/cms/v2/images/preloader.gif"> </div>');
    $('#guquanListModal2').modal('show');
    $.ajax({
        url: INDEX_URL+'/company_guquanview',
        type: 'get',
        data:{keyno:keyno,name:name},
        dataType:'html',
        success: function (result) {
            $('#guquanview').empty();
            $('#guquanlist').html(result);
        }
    });
}

function rzadminList(p,groupId,keyno,name,count,gqName) {
    if(!userId){
        getCaptcha();
        $('#loginModal').modal('show');
        return;
    }
    if(userGroupid!='43'){
        showVipModal('集团主页','成为VIP会员即可开启集团企业功能','jtzy');
        return;
    }
    if(name){
        $('#operdetailModal .modal-title>.t').html(name+' '+gqName+'内任职');
    }
    $.ajax({
        type:'GET',
        url:INDEX_URL+'/group_admindetaillist',
        data:{
            groupid:groupId,
            keyno:keyno,
            keyname:name,
            p:p
        },
        dataType:'html',
        success:function(html){
            if(html){
                $('#operdetailModal .modal-body').html(html);
            }else{
                $('#operdetailModal .modal-body').html('<div class="pnodata lg"> <img src="{{$STYLE_ROOT}}/cms/v2/images/nno_image.png"> <p>暂无信息</p> </div>');
            }
            $('#operdetailModal').modal('show');
        }
    })
}

function rzemployList(p,groupId,keyno,name,count,gqName) {
    if(!userId){
        getCaptcha();
        $('#loginModal').modal('show');
        return;
    }
    if(userGroupid!='43'){
        showVipModal('集团主页','成为VIP会员即可开启集团企业功能','jtzy');
        return;
    }
    if(name){
        $('#operdetailModal .modal-title>.t').html(name+' '+gqName+'内任职');
    }
    $.ajax({
        type:'GET',
        url:INDEX_URL+'/group_employdetaillist',
        data:{
            groupid:groupId,
            keyno:keyno,
            p:p
        },
        dataType:'html',
        success:function(html){
            if(html){
                $('#operdetailModal .modal-body').html(html);
            }else{
                $('#operdetailModal .modal-body').html('<div class="pnodata lg"> <img src="{{$STYLE_ROOT}}/cms/v2/images/nno_image.png"> <p>暂无信息</p> </div>');
            }
            $('#operdetailModal').modal('show');
        }
    })
}

function rzoperdetailList(p,groupId,keyno,name,count,gqName) {
    if(!userId){
        getCaptcha();
        $('#loginModal').modal('show');
        return;
    }
    if(userGroupid!='43'){
        showVipModal('集团主页','成为VIP会员即可开启集团企业功能','jtzy');
        return;
    }
    if(name){
        $('#operdetailModal .modal-title>.t').html(name+' '+gqName+'内任职');
    }
    $.ajax({
        type:'GET',
        url:INDEX_URL+'/group_operdetaillist',
        data:{
            groupid:groupId,
            keyno:keyno,
            p:p
        },
        dataType:'html',
        success:function(html){
            if(html){
                $('#operdetailModal .modal-body').html(html);
            }else{
                $('#operdetailModal .modal-body').html('<div class="pnodata lg"> <img src="{{$STYLE_ROOT}}/cms/v2/images/nno_image.png"> <p>暂无信息</p> </div>');
            }
            $('#operdetailModal').modal('show');
        }
    })
}

function investmentList(p,groupId,keyno,name,count,gqName) {
    if(!userId){
        getCaptcha();
        $('#loginModal').modal('show');
        return;
    }
    if(userGroupid!='43'){
        showVipModal('集团主页','成为VIP会员即可开启集团企业功能','jtzy');
        return;
    }
    if(name){
        $('#investmentModal .modal-title>.t').html(name+' '+gqName+'内'+count+'家企业参与投资');
    }
    $.ajax({
        type:'GET',
        url:INDEX_URL+'/group_cytouzilist',
        data:{
            groupid:groupId,
            keyno:keyno,
            p:p
        },
        dataType:'html',
        success:function(html){
            if(html){
                $('#investmentModal .modal-body').html(html);
            }else{
                $('#investmentModal .modal-body').html('<div class="pnodata lg"> <img src="{{$STYLE_ROOT}}/cms/v2/images/nno_image.png"> <p>暂无信息</p> </div>');
            }
            $('#investmentModal').modal('show');
        }
    })
}

function touziList(p,groupId,keyno,name,count,gqName) {
    if(!userId){
        getCaptcha();
        $('#loginModal').modal('show');
        return;
    }
    if(userGroupid!='43'){
        showVipModal('集团主页','成为VIP会员即可开启集团企业功能','jtzy');
        return;
    }
    if(name){
        $('#touziListModal .modal-title>.t').html(name+' 投资'+gqName+'内'+count+'家企业');
    }
    $.ajax({
        type:'GET',
        url:INDEX_URL+'/group_touzilist',
        data:{
            groupid:groupId,
            keyno:keyno,
            p:p
        },
        dataType:'html',
        success:function(html){
            if(html){
                $('#touziListModal .modal-body').html(html);
            }else{
                $('#touziListModal .modal-body').html('<div class="pnodata lg"> <img src="{{$STYLE_ROOT}}/cms/v2/images/nno_image.png"> <p>暂无信息</p> </div>');
            }
            $('#touziListModal').modal('show');
        }
    })
}

function relatedList(p,personid,name){
    if(!userId){
        getCaptcha();
        $('#loginModal').modal('show');
        return;
    }
    if(userGroupid!='43' && !inFreePeople(personid)){
        showVipModal('老板查询','成为VIP会员 即可无限次查看老板投资、任职的公司与他相关的企业和老板','lbcx');
        return;
    }
    if(name){
        $('#relatedListModal .modal-title>.t').html(name+' 关联企业');
    }
    $.ajax({
        type:'GET',
        url:INDEX_URL+'/people_relatedlist',
        data:{
            personid:personid,
            p:p
        },
        dataType:'html',
        success:function(html){
            if(html){
                $('#relatedListModal .modal-body').html(html);
            }else{
                $('#relatedListModal .modal-body').html('<div class="pnodata lg"> <img src="{{$STYLE_ROOT}}/cms/v2/images/nno_image.png"> <p>暂无信息</p> </div>');
            }
            $('#relatedListModal').modal('show');
        }
    })
}

function fgzhqView(dataId,tType) {
    $.ajax({
        type:'GET',
        url:INDEX_URL+'/dynamic_getDynamicDetail',
        data:{
            id:dataId
        },
        dataType:'json',
        success:function(result){
            data = result.data;
            var html = '';

            if(data.ChangeDate){
                var newDate = new Date();
                newDate.setTime(data.ChangeDate*1000);
                data.ChangeDate = newDate.bformat('yyyy-MM-dd');
            }

            html = html+"<table class='ntable'>";
            html = html+"<tr>";
            var changeTitle = '变更企业';
            if(tType == 'per') changeTitle = '变更人员';
            if(data.KeyNo){
                html = html+"<td width='23%' class='tb'>"+changeTitle+"</td><td width='27%'><a target='_blank' href='/firm/"+data.KeyNo+".html'>"+(data.Name || '-')+"</a></td>";
            }else{
                html = html+"<td width='23%' class='tb'>"+changeTitle+"</td><td width='27%'>"+(data.Name  || '-')+"</td>";
            }
            html = html+"<td width='23%' class='tb'>发现变更日期</td> <td>"+(data.ChangeDate || '-')+"</td>";
            html = html+"</tr>";
            data.ChangeExtend = JSON.parse(data.ChangeExtend);
            if(tType == 'com'){
                if(data.ChangeExtend.OperInfo){
                    html = html+"<tr>";
                    html = html+"<td  colspan='4'>法定代表人变更</td>";
                    html = html+"</tr>";
                    var ophtml = '从';
                    if(data.ChangeExtend.OperInfo.A.K && data.ChangeExtend.OperInfo.A.O == 2){
                        ophtml = ophtml+"<a target='_blank' href='/pl/"+data.ChangeExtend.OperInfo.A.K+".html'>"+(data.ChangeExtend.OperInfo.A.N || '-')+"</a>";
                    }else if(data.ChangeExtend.OperInfo.A.K){
                        ophtml = ophtml+"<a target='_blank' href='/firm/"+data.ChangeExtend.OperInfo.A.K+".html'>"+(data.ChangeExtend.OperInfo.A.N || '-')+"</a>";
                    }else{
                        ophtml = ophtml+(data.ChangeExtend.OperInfo.A.N || '-');
                    }
                    var ophtml = ophtml+'变更为';
                    if(data.ChangeExtend.OperInfo.B.K && data.ChangeExtend.OperInfo.B.O == 2){
                        ophtml = ophtml+"<a target='_blank' href='/pl/"+data.ChangeExtend.OperInfo.B.K+".html'>"+(data.ChangeExtend.OperInfo.B.N || '-')+"</a>";
                    }else if(data.ChangeExtend.OperInfo.A.K){
                        ophtml = ophtml+"<a target='_blank' href='/firm/"+data.ChangeExtend.OperInfo.B.K+".html'>"+(data.ChangeExtend.OperInfo.B.N || '-')+"</a>";
                    }else{
                        ophtml = ophtml+(data.ChangeExtend.OperInfo.B.N || '-');
                    }
                    html = html+"<tr>";
                    html = html+"<td class='tb' width='23%'>变更内容</td><td colspan='3'>"+ophtml+"</td>";
                    html = html+"</tr>";
                }
                if(data.ChangeExtend.PartInfo){
                    html = html+"<tr>";
                    html = html+"<td  colspan='4'>股东变更</td>";
                    html = html+"</tr>";
                    if(data.ChangeExtend.PartInfo.A && data.ChangeExtend.PartInfo.A!=0){
                        var dhtml = '';
                        $.each(data.ChangeExtend.PartInfo.D,function(key,val){
                            if(val.K && val.O == 2){
                                dhtml = dhtml+"<a target='_blank' href='/pl/"+val.K+".html'>"+(val.A || '-')+"</a>";
                            }else if(val.K){
                                dhtml = dhtml+"<a target='_blank' href='/firm/"+val.K+".html'>"+(val.A || '-')+"</a>";
                            }else{
                                dhtml = dhtml+(val.A || '-');
                            }
                            dhtml+="持股比例从";
                            if(val.B && val.B!="0%" && val.B!="0.00%"){
                                dhtml+=val.B+"下降到";
                            }else{
                                dhtml+="未知下降到";
                            }
                            if(val.C && val.C!="0%" && val.C!="0.00%"){
                                dhtml+=val.C+"<br>";
                            }else{
                                dhtml+="未知"+"<br>";
                            }
                        });
                        var hhtml = '';
                        var cols = "colspan='3'";
                        if(data.ChangeExtend.PartInfo.H){
                            $.each(data.ChangeExtend.PartInfo.H,function(key,val){
                                if(val.K && val.O == 2){
                                    hhtml = hhtml+"<a target='_blank' href='/pl/"+val.K+".html'>"+(val.A || '-')+"</a>";
                                }else if(val.K){
                                    hhtml = hhtml+"<a target='_blank' href='/firm/"+val.K+".html'>"+(val.A || '-')+"</a>";
                                }else{
                                    hhtml = hhtml+(val.A || '-');
                                }
                                hhtml+="持股比例从";
                                if(val.B && val.B!="0%" && val.B!="0.00%"){
                                    hhtml+=val.B+"上升到";
                                }else{
                                    hhtml+="未知上升到";
                                }
                                if(val.C && val.C!="0%" && val.C!="0.00%"){
                                    hhtml+=val.C+"<br>";
                                }else{
                                    hhtml+="未知"+"<br>";
                                }
                            });
                            cols = '';
                        }

                        html = html+"<tr>";
                        html = html+"<td class='tb' width='23%'>股份下降</td><td "+cols+">"+dhtml+"</td>";
                        if(hhtml != ''){
                            html = html+"<td class='tb' width='23%'>股份上升</td><td >"+hhtml+"</td>";
                        }
                        html = html+"</tr>";
                    }
                    if(data.ChangeExtend.PartInfo.B && data.ChangeExtend.PartInfo.B!=0){
                        var ehtml = '';
                        $.each(data.ChangeExtend.PartInfo.E,function(key,val){
                            if(val.K && val.O == 2){
                                ehtml = ehtml+"<a target='_blank' href='/pl/"+val.K+".html'>"+(val.A || '-')+"</a>";
                            }else if(val.K){
                                ehtml = ehtml+"<a target='_blank' href='/firm/"+val.K+".html'>"+(val.A || '-')+"</a>";
                            }else{
                                ehtml = ehtml+(val.A || '-');
                            }
                            if(val.B && val.B!="0%" && val.B!="0.00%"){
                                ehtml+="，退出前持股"+val.B+"<br>";
                            }else{
                                ehtml+="，退出前持股未知"+"<br>";
                            }
                        });

                        var hhtml = '';
                        var cols = "colspan='3'";
                        var align_ = "";
                        if(data.ChangeExtend.PartInfo.H){
                            $.each(data.ChangeExtend.PartInfo.H,function(key,val){
                                if(val.K && val.O == 2){
                                    hhtml = hhtml+"<a target='_blank' href='/pl/"+val.K+".html'>"+(val.A || '-')+"</a>";
                                }else if(val.K){
                                    hhtml = hhtml+"<a target='_blank' href='/firm/"+val.K+".html'>"+(val.A || '-')+"</a>";
                                }else{
                                    hhtml = hhtml+(val.A || '-');
                                }
                                hhtml+="持股比例从";
                                if(val.B && val.B!="0%" && val.B!="0.00%"){
                                    hhtml+=val.B+"上升到";
                                }else{
                                    hhtml+="未知上升到";
                                }
                                if(val.C && val.C!="0%" && val.C!="0.00%"){
                                    hhtml+=val.C+"<br>";
                                }else{
                                    hhtml+="未知"+"<br>";
                                }
                            });
                            cols = '';
                            align_ = "valign='top'";
                        }
                        html = html+"<tr>";
                        html = html+"<td class='tb' width='23%'>退出</td><td "+cols+" "+align_+">"+ehtml+"</td>";
                        if(hhtml != ''){
                            html = html+"<td class='tb' width='23%'>股份上升</td><td >"+hhtml+"</td>";
                        }
                        html = html+"</tr>";
                    }
                    if(data.ChangeExtend.PartInfo.C && data.ChangeExtend.PartInfo.C!=0){
                        var fhtml = '';
                        $.each(data.ChangeExtend.PartInfo.F,function(key,val){
                            if(val.K && val.O == 2){
                                fhtml = fhtml+"<a target='_blank' href='/pl/"+val.K+".html'>"+(val.A || '-')+"</a>";
                            }else if(val.K){
                                fhtml = fhtml+"<a target='_blank' href='/firm/"+val.K+".html'>"+(val.A || '-')+"</a>";
                            }else{
                                fhtml = fhtml+(val.A || '-');
                            }
                            if(val.B && val.B!="0%" && val.B!="0.00%"){
                                fhtml+="，持股"+val.B+"<br>";
                            }else{
                                fhtml+="<br>";
                            }
                        });
                        html = html+"<tr>";
                        html = html+"<td class='tb' width='23%'>新增</td><td colspan='3'>"+fhtml+"</td>";
                        html = html+"</tr>";
                    }
                }
                if(data.ChangeExtend.EmpInfo){
                    html = html+"<tr>";
                    html = html+"<td  colspan='4'>主要成员变更</td>";
                    html = html+"</tr>";
                    if(data.ChangeExtend.EmpInfo.A && data.ChangeExtend.EmpInfo.A!=0){
                        var dhtml = '';
                        $.each(data.ChangeExtend.EmpInfo.D,function(key,val){
                            if(val.K && val.O == 2){
                                dhtml = dhtml+"<a target='_blank' href='/pl/"+val.K+".html'>"+(val.A || '-')+"</a>";
                            }else if(val.K){
                                dhtml = dhtml+"<a target='_blank' href='/firm/"+val.K+".html'>"+(val.A || '-')+"</a>";
                            }else{
                                dhtml = dhtml+(val.A || '-');
                            }
                            if(val.B && !val.C){
                                dhtml+="，从 "+val.B+" 调整为-"+"<br>";
                            }else if(!val.B && val.C){
                                dhtml+="，调整为 "+val.C+"<br>";
                            }else{
                                dhtml+="，从 "+val.B+" 调整为 "+val.C+"<br>";
                            }
                        });
                        html = html+"<tr>";
                        html = html+"<td class='tb' width='23%'>职务调整</td><td colspan='3'>"+dhtml+"</td>";
                        html = html+"</tr>";
                    }
                    if(data.ChangeExtend.EmpInfo.B && data.ChangeExtend.EmpInfo.B!=0){
                        var ehtml = '';
                        $.each(data.ChangeExtend.EmpInfo.E,function(key,val){
                            if(val.K && val.O == 2){
                                ehtml = ehtml+"<a target='_blank' href='/pl/"+val.K+".html'>"+(val.A || '-')+"</a> ";
                            }else if(val.K){
                                ehtml = ehtml+"<a target='_blank' href='/firm/"+val.K+".html'>"+(val.A || '-')+"</a> ";
                            }else{
                                ehtml = ehtml+(val.A || '-');
                            }
                            if(val.B){
                                ehtml+="退出前职务："+val.B+"<br>";
                            }
                        });
                        html = html+"<tr>";
                        html = html+"<td class='tb' width='23%'>退出</td><td colspan='3'>"+ehtml+"</td>";
                        html = html+"</tr>";
                    }
                    if(data.ChangeExtend.EmpInfo.C && data.ChangeExtend.EmpInfo.C!=0){
                        var fhtml = '';
                        $.each(data.ChangeExtend.EmpInfo.F,function(key,val){
                            if(val.K && val.O == 2){
                                fhtml = fhtml+"<a target='_blank' href='/pl/"+val.K+".html'>"+(val.A || '-')+"</a> ";
                            }else if(val.K){
                                fhtml = fhtml+"<a target='_blank' href='/firm/"+val.K+".html'>"+(val.A || '-')+"</a> ";
                            }else{
                                fhtml = fhtml+(val.A || '-');
                            }
                            if(val.B){
                                fhtml+="，职务："+val.B+"<br>";
                            }
                        });
                        html = html+"<tr>";
                        html = html+"<td class='tb' width='23%'>新增</td><td colspan='3'>"+fhtml+"</td>";
                        html = html+"</tr>";
                    }
                }
            }else if(tType == 'per'){
                if(data.ChangeExtend.OperInfo){
                    html = html+"<tr>";
                    html = html+"<td  colspan='4'>法定代表人变更</td>";
                    html = html+"</tr>";
                    var ohtml = '不再担任';
                    if(data.ChangeExtend.OperInfo.K){
                        ohtml = ohtml+"<a target='_blank' href='/firm/"+data.ChangeExtend.OperInfo.K+".html'>"+(data.ChangeExtend.OperInfo.A || '-')+"</a>";
                    }else{
                        ohtml = ohtml+(data.ChangeExtend.OperInfo.A || '-');
                    }
                    ohtml = ohtml+'的法定代表人';
                    html = html+"<tr>";
                    html = html+"<td class='tb' width='23%'>变更内容</td><td colspan='3'>"+ohtml+"</td>";
                    html = html+"</tr>";
                }
                if(data.ChangeExtend.PartInfo){
                    html = html+"<tr>";
                    html = html+"<td  colspan='4'>股东变更</td>";
                    html = html+"</tr>";
                    var hhtml = '退出投资企业';
                    if(data.ChangeExtend.PartInfo.K){
                        hhtml = hhtml+"<a target='_blank' href='/firm/"+data.ChangeExtend.PartInfo.K+".html'>"+(data.ChangeExtend.PartInfo.A || '-')+"</a>";
                    }else{
                        hhtml = hhtml+(data.ChangeExtend.PartInfo.A || '-');
                    }
                    if(data.ChangeExtend.PartInfo.B){
                        hhtml = hhtml+'，退出前持股比例：'+data.ChangeExtend.PartInfo.B;
                    }
                    html = html+"<tr>";
                    html = html+"<td class='tb' width='23%'>变更内容</td><td colspan='3'>"+hhtml+"</td>";
                    html = html+"</tr>";
                }
                if(data.ChangeExtend.EmpInfo){
                    html = html+"<tr>";
                    html = html+"<td  colspan='4'>主要成员变更</td>";
                    html = html+"</tr>";
                    var ehtml = '退出企业';
                    if(data.ChangeExtend.EmpInfo.K){
                        ehtml = ehtml+"<a target='_blank' href='/firm/"+data.ChangeExtend.EmpInfo.K+".html'>"+(data.ChangeExtend.EmpInfo.A || '-')+"</a>";
                    }else{
                        ehtml = ehtml+(data.ChangeExtend.EmpInfo.A || '-');
                    }
                    if(data.ChangeExtend.EmpInfo.B){
                        ehtml = ehtml+'，退出前职务：'+data.ChangeExtend.EmpInfo.B;
                    }
                    html = html+"<tr>";
                    html = html+"<td class='tb' width='23%'>变更内容</td><td colspan='3'>"+ehtml+"</td>";
                    html = html+"</tr>";
                }
            }

            html  = html+"</table>";
            $('#fgzhqTitle').html(data.Desc.Subtitle);
            $('#fgzhqView').html(html);
        }
    })
}

function monitorPartnerView(dataId){
    $.ajax({
        type:'GET',
        url:INDEX_URL+'/monitor_getDetail',
        data:{
            id:dataId
        },
        dataType:'json',
        success:function(result){
            data = result.data;
            if(data.ChangeDate){
                var newDate = new Date();
                newDate.setTime(data.ChangeDate*1000);
                data.ChangeDate = newDate.bformat('yyyy-MM-dd');
            }
            var html = '';
            html = html+"<table class='ntable'>";
            html = html+"<tr>";
            if(data.KeyNo){
                html = html+"<td width='23%' class='tb'>变更企业</td><td width='27%'><a target='_blank' href='/firm/"+data.KeyNo+".html'>"+(data.Name || '-')+"</a></td>";
            }else{
                html = html+"<td width='23%' class='tb'>变更企业</td><td width='27%'>"+(data.Name  || '-')+"</td>";
            }
            html = html+"<td width='23%' class='tb'>发现变更日期</td> <td>"+(data.ChangeDate || '-')+"</td>";
            html = html+"</tr>";
            data.ChangeExtend = JSON.parse(data.ChangeExtend);
            if(data.ChangeExtend.A && data.ChangeExtend.A!=0){
                var dhtml = '';
                $.each(data.ChangeExtend.D,function(key,val){
                    if(val.K && val.O == 2){
                        dhtml = dhtml+"<a target='_blank' href='/pl/"+val.K+".html'>"+(val.A || '-')+"</a>";
                    }else if(val.K){
                        dhtml = dhtml+"<a target='_blank' href='/firm/"+val.K+".html'>"+(val.A || '-')+"</a>";
                    }else{
                        dhtml = dhtml+(val.A || '-');
                    }
                    dhtml+="持股比例从";
                    if(val.B && val.B!="0%" && val.B!="0.00%"){
                        dhtml+=val.B+"下降到";
                    }else{
                        dhtml+="未知下降到";
                    }
                    if(val.C && val.C!="0%" && val.C!="0.00%"){
                        dhtml+=val.C+"<br>";
                    }else{
                        dhtml+="未知"+"<br>";
                    }
                });
                var hhtml = '';
                var cols = "colspan='3'";
                if(data.ChangeExtend.H){
                    $.each(data.ChangeExtend.H,function(key,val){
                        if(val.K && val.O == 2){
                            hhtml = hhtml+"<a target='_blank' href='/pl/"+val.K+".html'>"+(val.A || '-')+"</a>";
                        }else if(val.K){
                            hhtml = hhtml+"<a target='_blank' href='/firm/"+val.K+".html'>"+(val.A || '-')+"</a>";
                        }else{
                            hhtml = hhtml+(val.A || '-');
                        }
                        hhtml+="持股比例从";
                        if(val.B && val.B!="0%" && val.B!="0.00%"){
                            hhtml+=val.B+"上升到";
                        }else{
                            hhtml+="未知上升到";
                        }
                        if(val.C && val.C!="0%" && val.C!="0.00%"){
                            hhtml+=val.C+"<br>";
                        }else{
                            hhtml+="未知"+"<br>";
                        }
                    });
                    cols = '';
                }

                html = html+"<tr>";
                html = html+"<td class='tb' width='23%'>股份下降</td><td "+cols+">"+dhtml+"</td>";
                if(hhtml != ''){
                    html = html+"<td class='tb' width='23%'>股份上升</td><td >"+hhtml+"</td>";
                }
                html = html+"</tr>";
            }
            if(data.ChangeExtend.B && data.ChangeExtend.B!=0){
                var ehtml = '';
                $.each(data.ChangeExtend.E,function(key,val){
                    if(val.K && val.O == 2){
                        ehtml = ehtml+"<a target='_blank' href='/pl/"+val.K+".html'>"+(val.A || '-')+"</a>";
                    }else if(val.K){
                        ehtml = ehtml+"<a target='_blank' href='/firm/"+val.K+".html'>"+(val.A || '-')+"</a>";
                    }else{
                        ehtml = ehtml+(val.A || '-');
                    }
                    if(val.B && val.B!="0%" && val.B!="0.00%"){
                        ehtml+="，退出前持股"+val.B+"<br>";
                    }else{
                        ehtml+="，退出前持股未知"+"<br>";
                    }
                });

                var hhtml = '';
                var cols = "colspan='3'";
                var align_ = "";
                if(data.ChangeExtend.H){
                    $.each(data.ChangeExtend.H,function(key,val){
                        if(val.K && val.O == 2){
                            hhtml = hhtml+"<a target='_blank' href='/pl/"+val.K+".html'>"+(val.A || '-')+"</a>";
                        }else if(val.K){
                            hhtml = hhtml+"<a target='_blank' href='/firm/"+val.K+".html'>"+(val.A || '-')+"</a>";
                        }else{
                            hhtml = hhtml+(val.A || '-');
                        }
                        hhtml+="持股比例从";
                        if(val.B && val.B!="0%" && val.B!="0.00%"){
                            hhtml+=val.B+"上升到";
                        }else{
                            hhtml+="未知上升到";
                        }
                        if(val.C && val.C!="0%" && val.C!="0.00%"){
                            hhtml+=val.C+"<br>";
                        }else{
                            hhtml+="未知"+"<br>";
                        }
                    });
                    cols = '';
                    align_ = "valign='top'";
                }


                html = html+"<tr>";
                html = html+"<td class='tb' width='23%'>退出</td><td "+cols+" "+align_+">"+ehtml+"</td>";
                if(hhtml != ''){
                    html = html+"<td class='tb' width='23%'>股份上升</td><td >"+hhtml+"</td>";
                }
                html = html+"</tr>";
            }
            if(data.ChangeExtend.C && data.ChangeExtend.C!=0){
                var fhtml = '';
                $.each(data.ChangeExtend.F,function(key,val){
                    if(val.K && val.O == 2){
                        fhtml = fhtml+"<a target='_blank' href='/pl/"+val.K+".html'>"+(val.A || '-')+"</a>";
                    }else if(val.K){
                        fhtml = fhtml+"<a target='_blank' href='/firm/"+val.K+".html'>"+(val.A || '-')+"</a>";
                    }else{
                        fhtml = fhtml+(val.A || '-');
                    }
                    if(val.B && val.B!="0%" && val.B!="0.00%"){
                        fhtml+="，持股"+val.B+"<br>";
                    }else{
                        fhtml+="<br>";
                    }
                });
                html = html+"<tr>";
                html = html+"<td class='tb' width='23%'>新增</td><td colspan='3'>"+fhtml+"</td>";
                html = html+"</tr>";
            }
            html  = html+"</table>";
            $('#monitorPartnerView').html(html);
        }
    })
}

function monitorEmployeView(dataId){
    $.ajax({
        type:'GET',
        url:INDEX_URL+'/monitor_getDetail',
        data:{
            id:dataId
        },
        dataType:'json',
        success:function(result){
            data = result.data;
            if(data.ChangeDate){
                var newDate = new Date();
                newDate.setTime(data.ChangeDate*1000);
                data.ChangeDate = newDate.bformat('yyyy-MM-dd');
            }
            var html = '';
            html = html+"<table class='ntable'>";
            html = html+"<tr>";
            if(data.KeyNo){
                html = html+"<td width='23%' class='tb'>变更企业</td><td width='27%'><a target='_blank' href='/firm/"+data.KeyNo+".html'>"+(data.Name || '-')+"</a></td>";
            }else{
                html = html+"<td width='23%' class='tb'>变更企业</td><td width='27%'>"+(data.Name  || '-')+"</td>";
            }
            html = html+"<td width='23%' class='tb'>发现变更日期</td> <td>"+(data.ChangeDate || '-')+"</td>";
            html = html+"</tr>";
            data.ChangeExtend = JSON.parse(data.ChangeExtend);
            if(data.ChangeExtend.A && data.ChangeExtend.A!=0){
                var dhtml = '';
                $.each(data.ChangeExtend.D,function(key,val){
                    if(val.K && val.O == 2){
                        dhtml = dhtml+"<a target='_blank' href='/pl/"+val.K+".html'>"+(val.A || '-')+"</a>";
                    }else if(val.K){
                        dhtml = dhtml+"<a target='_blank' href='/firm/"+val.K+".html'>"+(val.A || '-')+"</a>";
                    }else{
                        dhtml = dhtml+(val.A || '-');
                    }
                    if(val.B && !val.C){
                        dhtml+="，从 "+val.B+" 调整为-"+"<br>";
                    }else if(!val.B && val.C){
                        dhtml+="，调整为 "+val.C+"<br>";
                    }else{
                        dhtml+="，从 "+val.B+" 调整为 "+val.C+"<br>";
                    }
                });
                html = html+"<tr>";
                html = html+"<td class='tb' width='23%'>职务调整</td><td colspan='3'>"+dhtml+"</td>";
                html = html+"</tr>";
            }
            if(data.ChangeExtend.B && data.ChangeExtend.B!=0){
                var ehtml = '';
                $.each(data.ChangeExtend.E,function(key,val){
                    if(val.K && val.O == 2){
                        ehtml = ehtml+"<a target='_blank' href='/pl/"+val.K+".html'>"+(val.A || '-')+"</a> ";
                    }else if(val.K){
                        ehtml = ehtml+"<a target='_blank' href='/firm/"+val.K+".html'>"+(val.A || '-')+"</a> ";
                    }else{
                        ehtml = ehtml+(val.A || '-');
                    }
                    if(val.B){
                        ehtml+="退出前职务："+val.B+"<br>";
                    }
                });
                html = html+"<tr>";
                html = html+"<td class='tb' width='23%'>退出</td><td colspan='3'>"+ehtml+"</td>";
                html = html+"</tr>";
            }
            if(data.ChangeExtend.C && data.ChangeExtend.C!=0){
                var fhtml = '';
                $.each(data.ChangeExtend.F,function(key,val){
                    if(val.K && val.O == 2){
                        fhtml = fhtml+"<a target='_blank' href='/pl/"+val.K+".html'>"+(val.A || '-')+"</a> ";
                    }else if(val.K){
                        fhtml = fhtml+"<a target='_blank' href='/firm/"+val.K+".html'>"+(val.A || '-')+"</a> ";
                    }else{
                        fhtml = fhtml+(val.A || '-');
                    }
                    if(val.B){
                        fhtml+="，职务："+val.B+"<br>";
                    }
                });
                html = html+"<tr>";
                html = html+"<td class='tb' width='23%'>新增</td><td colspan='3'>"+fhtml+"</td>";
                html = html+"</tr>";
            }
            html  = html+"</table>";
            $('#monitorEmployeView').html(html);
        }
    })
}

function radarModalView(dataId,category,keyno,objectvalue,dom){
    riskDetailView(dataId,category,keyno);

    $.ajax({
        url:INDEX_URL+'/radar_refreshRadarNewTag',
        data:{
            objectvalue:objectvalue,
            keyno:keyno,
            category:category
        },
        dataType:'json',
        success:function(rs){
            if(rs.Status==200){
                $(dom).parent().parent().find('.fa-circle').hide();
                $(dom).parent().parent().find('.dot').hide();
            }
        }
    })
}

function showRelatModal(tag,dataId) {
    $('#RelatModal').modal('show');
    var url = INDEX_URL+'/company_'+tag+'Relat';
    $.ajax({
        type:'GET',
        url:url,
        data:{
            id:dataId
        },
        dataType:"html",
        success:function(result){
            $('#relatList').html(result);
        }
    });
    if(tag=='zhixing'){
        $('.relat-modal-list .modal-title').text('被执行人详情');
        $('.relat-modal-detail .modal-title').text('被执行人详情');
    }else if(tag=='shixin'){
        $('.relat-modal-list .modal-title').text('失信被执行人详情');
        $('.relat-modal-detail .modal-title').text('失信被执行人详情');
    }else if(tag=='wenshu'){
        $('.relat-modal-list .modal-title').text('裁判文书详情');
        $('.relat-modal-detail .modal-title').text('裁判文书详情');
    }else if(tag=='ktnotice'){
        $('.relat-modal-list .modal-title').text('开庭公告详情');
        $('.relat-modal-detail .modal-title').text('开庭公告详情');
    }else if(tag=='zhongben'){
        $('.relat-modal-list .modal-title').text('终本案件详情');
        $('.relat-modal-detail .modal-title').text('终本案件详情');
    }else if(tag=='bankruptcy'){
        $('.relat-modal-list .modal-title').text('破产重整详情');
        $('.relat-modal-detail .modal-title').text('破产重整详情');
    }else if(tag=='lian'){
        $('.relat-modal-list .modal-title').text('立案信息详情');
        $('.relat-modal-detail .modal-title').text('立案信息详情');
    }else if(tag=='gonggao'){
        $('.relat-modal-list .modal-title').text('法院公告详情');
        $('.relat-modal-detail .modal-title').text('法院公告详情');
    }else if(tag=='dnoticelist' || tag=='dnotice'){
        $('.relat-modal-list .modal-title').text('送达公告详情');
        $('.relat-modal-detail .modal-title').text('送达公告详情');
    }else if(tag=='assistance'){
        $('.relat-modal-list .modal-title').text('股权冻结详情');
        $('.relat-modal-detail .modal-title').text('股权冻结详情');
    }
    
  
}

function showRelatDetail(tag,dataId){
    $('.relat-modal-list').css('margin-left','-100%');
    $('.relat-modal-detail').css('margin-left','0px');
    if(tag=='zhixing'){
        zhixingView(dataId,true);
        $('.relat-modal-detail .tcaption').text('关联被执行人');
    }else if(tag=='shixin'){
        shixinView(dataId,true);
        $('.relat-modal-detail .tcaption').text('关联失信被执行人');
    }else if(tag=='wenshu'){
        wsView(dataId,true);
        $('.relat-modal-detail .tcaption').text('关联裁判文书');
    }else if(tag=='ktnotice'){
        ktnoticeView(dataId,true);
        $('.relat-modal-detail .tcaption').text('关联开庭公告');
    }else if(tag=='zhongben'){
        zhongbenView(dataId,true);
        $('.relat-modal-detail .tcaption').text('关联终本案件');
    } 
}

function backRelatList(){
    $('.relat-modal-list').css('margin-left','0px');
    $('.relat-modal-detail').css('margin-left','100%');
}

setTimeout(function() {
    $('#RelatModal').on('hidden.bs.modal', function () {
      $('.relat-modal-list').css('margin-left','0px');
      $('.relat-modal-detail').css('margin-left','100%');
      $('#relatList').empty();
      $('#relatDetail').empty();
    });
}, 1000);
function MonitorModalView(dataId,category,keyno,id,dom){
    var o_cat = category;
    // 消息列表查看详情
    if(category == 'na'){
        $.ajaxSettings.async = false;
        $.ajax({
            url:INDEX_URL+'/monitor_getRiskInfo',
            data:{
                linkid:id,
            },
            dataType:'json',
            success:function(rs){
                if(rs.Status==200){
                    dataId = rs.Result.ObjectId;
                    id = rs.Result.Id;
                    category = rs.Result.Category;
                    keyno = rs.Result.KeyNo;
                    if(category == 13){
                        id = rs.Result.AfterContent;
                    }
                    if(category == 12 || category == 213){
                        var ChangeExtend = JSON.parse(rs.Result.ChangeExtend);
                        if(ChangeExtend.CompanyId){
                            keyno = ChangeExtend.CompanyId;
                        }
                    }
                    if(category == 48 || category == 53){
                        var ChangeExtend = JSON.parse(rs.Result.ChangeExtend);
                        id = ChangeExtend.Code;
                    }
                }
            }
        });
        $.ajaxSettings.async = true;
    }
    if($.inArray(parseInt(category), [2,3,4,7,11,12,13,14,15,16,18,19,20,22,26,27,28,29,30,31,44,46,48,49,50,51,53,105,106,205,206,212,213,214,208,58,61,23,56,59,216,55,219,218,217,220,221,223,225])>= 0){
        riskDetailView(dataId,category,keyno,id);
    }else{
        if(o_cat =='na'){
            window.open(INDEX_URL+'/monitor_dynamic');
        }
    }
    $.ajax({
        url:INDEX_URL+'/monitor_refreshNewTag',
        data:{
            objectvalue:id,
            keyno:keyno
        },
        dataType:'json',
        success:function(rs){
            if(rs.Status==200){
                $(dom).parent().parent().find('.fa-circle').hide();
                $(dom).parent().parent().find('.dot').hide();
            }
        }
    })
}

function dynamicModalView(dataId,category,keyno,id,dom){
    riskDetailView(dataId,category,keyno,id)
}

function riskDetailView(dataId,category,keyno,id){
    if(category==2){
        $('#shixinModal').modal('show');
        shixinView(dataId)
    }else if(category==3){
        $('#zhixingModal').modal('show');
        zhixingView(dataId)
    }else if(category==4 || category == 221){ //裁判文书
        $('#wenshuModal').modal('show');
        wenshuHtml(dataId);
    }else if(category==7 || category == 218){  //法院公告
        $('#gonggaoModal').modal('show');
        gonggaoView(dataId)
    }else if(category==11){ //经营异常
        window.open(INDEX_URL+'/firm/'+keyno+'.html#fengxian');
    }else if(category==12){ //股权出质
        $('#pledgeModal').modal('show');
        pledgeView(dataId,keyno,1)
    }else if(category==13){ //行政处罚
        // window.open(INDEX_URL+'/firm/'+keyno+'.html#fengxian');
        xzcfDetail(keyno,id)
    }else if(category==225){ //人员-其他行政处罚
        otherPunishDetail(dataId);
    }else if(category==14){ //抽查检查
        window.open(INDEX_URL+'/firm/'+keyno+'.html#run');
    }else if(category==15){ //动产抵押
        $('#mPledgeModal').modal('show');
        mPledgeView(dataId,keyno);
    }else if(category==16){ //清算信息
        window.open(INDEX_URL+'/firm/'+keyno+'.html#fengxian');
    }else if(category==18 || category == 219){ //开庭公告
        $('#ktnoticeModal').modal('show');
        ktnoticeView(dataId)
    }else if(category==19){ //司法拍卖
        $('#sfpmModal').modal('show');
        sfpaimaiView(dataId)
    }else if(category==20){ //严重违法
        window.open(INDEX_URL+'/firm/'+keyno+'.html#fengxian');
    }else if(category==22){ //环保处罚
        $('#envModal').modal('show');
        envDetail(dataId,keyno)
    }else if(category==26){ //股权冻结
        $('#assistanceModal').modal('show');
        assistanceView(dataId,keyno)
    }else if(category==27 || category==217){ //送达公告
        $('#dnoticeModal').modal('show');
        dnoticeDetail(dataId)
    }else if(category==28){ //融资动态 直接跳

    }else if(category==29){ //税收违法
        $('#taxIllegalModal').modal('show');
        taxIllegalDetail(dataId);
    }else if(category==30){ //土地抵押
        $('#landmortgageModal').modal('show');
        landmortgageDetail(dataId);
    }else if(category==31){ //欠税公告
        $('#oweNoticeModal').modal('show');
        oweNoticeDetail(dataId)
    }else if(category==44){ //风险-非大股东变更
        $('#monitorPartnerModal').modal('show');
        monitorPartnerView(id)
    }else if(category==46){ //风险-主要成员变更
        $('#monitorEmployeModal').modal('show');
        monitorEmployeView(id)
    }else if(category==48 || category==223){ //违规处理
        $('#clModal').modal('show');
        showClModal(dataId,id);
    }else if(category==49 || category==220){ //立案信息
        $('#lianModal').modal('show');
        lianDetail(dataId)
    }else if(category==50){ //股权质押
        spledgeView(dataId)
    }else if(category==51){ //公示催告
        $('#pnModal').modal('show');
        pnDetail(dataId);
    }else if(category==53){ //对外担保
        $('#dbModal').modal('show');
        showDbModal(dataId,id)
    }else if(category==63){ //双随机抽查
        drcDetailAjax(dataId,keyno)
    }else if(category==105){
        $('#shixinModal').modal('show');
        shixinView(dataId)
    }else if(category==106){
        $('#zhixingModal').modal('show');
        zhixingView(dataId)
    }else if(category==205){ //失信被执行人(人)
        showRelatModal('shixin',dataId)
    }else if(category==206){ //被执行人(人)
        showRelatModal('zhixing',dataId)
    }else if(category==212){ //股权冻结(人)
        $('#assistanceModal').modal('show');
        assistanceViewPeo(dataId,keyno)
    }else if(category==213){ //股权出质(人)
        $('#pledgeModal').modal('show');
        pledgeView(dataId,keyno,1)
    }else if(category==214){ //股权质押(人)
        $('#spledgeModal').modal('show');
        spledgeViewPeo({Id:dataId})
    }else if(category==58){ //破产重整
        $('#bankruptcyModal').modal('show');
        bankruptcyDetail(dataId);
    }else if(category==61){ //注销备案
        $('#zxbaModal').modal('show');
        enliqDetail(keyno);
    }else if(category==23){ //简易注销
        $('#jyzxModal').modal('show');
        jyzxView(keyno);
    }else if(category==56 || category==216){ //终本案件
        // $('#jyzxModal').modal('show');
        endExecutionCaseDetail(dataId);
    }else if(category == 55 || category == 208){
        window.open(INDEX_URL+'/xiangaoDetail/'+dataId+'.html');
    }else if(category == 59){
        window.open(INDEX_URL+'/inquirydetail_'+dataId+'.html')
    }else if(category==72){ //公司法定代表人、股东、主要成员变更三合一
        $('#fgzhqModal').modal('show');
        fgzhqView(id,'com');
    }else if(category==222){ //人员法定代表人、股东、主要成员变更三合一
        $('#fgzhqModal').modal('show');
        fgzhqView(id,'per');
    }
}

function caseDetailView(dataId,type,keyno){
    if(type=='CaseList'){
        $('#wenshuModal').modal('show');
        wenshuHtml(dataId);
    }else if(type=='SxList'){
        $('#shixinModal').modal('show');
        shixinView(dataId)
    }else if(type=='ZxList'){
        $('#zhixingModal').modal('show');
        zhixingView(dataId)
    }else if(type=='XgList'){
        window.open(INDEX_URL+'/xiangaoDetail/'+dataId+'.html');
    }else if(type=='LianList'){
        $('#lianModal').modal('show');
        lianDetail(dataId)
    }else if(type=='FyggList'){
        $('#gonggaoModal').modal('show');
        gonggaoView(dataId)
    }else if(type=='KtggList'){
        $('#ktnoticeModal').modal('show');
        ktnoticeView(dataId)
    }else if(type=='SdggList'){
        $('#dnoticeModal').modal('show');
        dnoticeDetail(dataId)
    }else if(type=='PcczList'){ //破产重整
        $('#bankruptcyModal').modal('show');
        bankruptcyDetail(dataId);
    }else if(type=='CfgsList'){ //行政处罚
        xzcfDetail(keyno,dataId)
    }else if(type=='CfxyList'){ //行政处罚(信用中国)
        xzcfView(dataId)
    }else if(type=='CfdfList'){ //行政处罚(地方)
        otherPunishDetail(dataId)
    }else if(type=='HbcfList'){ //环保处罚
        envDetail(dataId)
    }else if(type=='GqdjList'){ //股权冻结
        assistanceView(dataId,keyno)
    }else if(type=='ZbList'){ //终本案件
        endExecutionCaseDetail(dataId)
    }else if(type=='XjpgList'){ //询价评估
        window.open(INDEX_URL+'/inquirydetail_'+dataId+'.html')
    }
}

function explainDetailView(dataId,type,keyno){
    if(type=='1'){
        $('#zhixingModal').modal('show');
        zhixingView(dataId)
    }else if(type=='2'){
        $('#shixinModal').modal('show');
        shixinView(dataId)
    }else if(type=='3'){
        window.open(INDEX_URL+'/xiangaoDetail/'+dataId+'.html');
    }else if(type=='4'){ //终本案件
        endExecutionCaseDetail(dataId)
    }else if(type=='5'){
        $('#wenshuModal').modal('show');
        wenshuHtml(dataId);
    }else if(type=='6'){
        $('#gonggaoModal').modal('show');
        gonggaoView(dataId)
    }else if(type=='7'){
        $('#ktnoticeModal').modal('show');
        ktnoticeView(dataId)
    }else if(type=='8'){
        $('#dnoticeModal').modal('show');
        dnoticeDetail(dataId)
    }else if(type=='9'){ //股权冻结
        assistanceView(dataId,keyno)
    }else if(type=='10'){
        $('#lianModal').modal('show');
        lianDetail(dataId)
    }else if(type=='11'){
        window.open(INDEX_URL+'/firm/'+keyno+'.html#fengxian');
    }else if(type=='12'){
        window.open(INDEX_URL+'/firm/'+keyno+'.html#fengxian');
    }else if(type=='13'){
        $('#pledgeModal').modal('show');
        pledgeView(dataId,keyno,1)
    }else if(type=='15'){
        xzcfDetail(keyno,dataId)
    }else if(type=='16'){
        xzcfView(dataId)
    }else if(type=='17'){
        otherPunishDetail(dataId)
    }else if(type=='18'){
        envDetail(dataId)
    }else if(type=='19'){
        $('#taxIllegalModal').modal('show');
        taxIllegalDetail(dataId);
    }else if(type=='20'){
        $('#mPledgeModal').modal('show');
        mPledgeView(dataId,keyno);
    }else if(type=='21'){
        window.open(INDEX_URL+'/firm/'+keyno+'.html#fengxian');
    }else if(type=='22'){
        window.open(INDEX_URL+'/inquirydetail_'+dataId+'.html')
    }else if(type=='23'){
        window.open(INDEX_URL+'/sfpaimaiDetail/'+dataId+'.html')
    }else if(type=='24'){
        $('#bankruptcyModal').modal('show');
        bankruptcyDetail(dataId);
    }else if(type=='25'){
        $('#landmortgageModal').modal('show');
        landmortgageDetail(dataId);
    }else if(type=='26'){
        $('#pnModal').modal('show');
        pnDetail(dataId);
    }else if(type=='27'){
        $('#oweNoticeModal').modal('show');
        oweNoticeDetail(dataId)
    }
}

function enliqDetail(id) {
    $.ajax({
        type:'GET',
        url:INDEX_URL+'/company_enliqDetail',
        data:{
            id:id
        },
        dataType:'json',
        success:function(res){
            var data = res.data;
            var docUrlStr = '-';
            if(data.DocUrl){
                docUrlStr = '<a target="_blank" href="'+data.DocUrl+'">查看详情</a>'
            }
            var html = '';
            html = html+"<table class='ntable'>";
            if(data.LiqBAInfo ){
                if(data.LiqBAInfo.LiqBADate){
                    data.LiqBAInfo.LiqBADate = moment(data.LiqBAInfo.LiqBADate*1000).format('YYYY-MM-DD');
                }
                if(data.LiqBAInfo.LiqStartDate){
                    data.LiqBAInfo.LiqStartDate = moment(data.LiqBAInfo.LiqStartDate*1000).format('YYYY-MM-DD');
                }
                html = html+"<tr>";
                html = html+"<td class='tb' width='20%'' rowspan='10'>清算组备案信息</td>"
                html = html+"<td width='20%'>企业名称</td><td>"+'<a class="text-blue"  href="'+INDEX_URL+'/firm/'+id+'.html" target="_blank" class="c_a" >'+(data.LiqBAInfo.CompanyName  || '-')+'</a>'+"</td>";
                html = html+"</tr>";
                html = html+"<tr>";
                html = html+"<td width='20%'>统一社会信用代码/注册号</td> <td width='27%'>"+(data.LiqBAInfo.CreditCode  || '-')+"</td>";
                html = html+"</tr>";
                html = html+"<tr>";
                html = html+"<td width='20%'>登记机关</td> <td width='27%'>"+(data.LiqBAInfo.BelongOrg || '-')+"</td>";
                html = html+"</tr>";
                html = html+"<tr>";
                html = html+"<td width='20%'>清算组备案日期</td><td>"+(data.LiqBAInfo.LiqBADate || '-')+"</td>";
                html = html+"</tr>";
                html = html+"<tr>";
                html = html+"<td width='20%'>清算组成立日期</td><td>"+(data.LiqBAInfo.LiqStartDate || '-')+"</td>";
                html = html+"</tr>";
                html = html+"<tr>";
                html = html+"<td width='20%'>注销原因</td><td>"+(data.LiqBAInfo.CancelReason || '-')+"</td>";
                html = html+"</tr>";
                html = html+"<tr>";
                html = html+"<td width='20%'>清算组办公地址</td><td>"+(data.LiqBAInfo.LiqAddress || '-')+"</td>";
                html = html+"</tr>";
                html = html+"<tr>";
                html = html+"<td width='20%'>清算组联系电话</td><td>"+(data.LiqBAInfo.LiqTelNo || '-')+"</td>";
                html = html+"</tr>";
                html = html+"<tr>";
                html = html+"<td width='20%'>清算组负责人</td><td>"+(data.LiqBAInfo.LiqLeader || '-')+"</td>";
                html = html+"</tr>";
                html = html+"<tr>";
                html = html+"<td width='20%'>清算组成员</td><td>"+(data.LiqBAInfo.LiqMember || '-')+"</td>";
                html = html+"</tr>";
            }
            if(data.CreditorNoticeInfo){
                html = html+"<tr>";
                html = html+"<td class='tb' width='20%'' rowspan='8'>债权人公告信息</td>"
                html = html+"<td width='20%'>企业名称</td><td>"+(data.CreditorNoticeInfo.CompanyName || '-')+"</td>";
                html = html+"</tr>";
                html = html+"<tr>";
                html = html+"<td width='20%'>统一社会信用代码/注册号</td><td>"+(data.CreditorNoticeInfo.CreditCode || '-')+"</td>";
                html = html+"</tr>";
                html = html+"<tr>";
                html = html+"<td width='20%'>登记机关</td><td>"+(data.CreditorNoticeInfo.BelongOrg || '-')+"</td>";
                html = html+"</tr>";
                html = html+"<tr>";
                html = html+"<td width='20%'>公告期</td><td>"+(data.CreditorNoticeInfo.NoticeDate || '-')+"</td>";
                html = html+"</tr>";
                html = html+"<tr>";
                html = html+"<td width='20%'>公告内容</td><td>"+(data.CreditorNoticeInfo.NoticeContent || '-')+"</td>";
                html = html+"</tr>";
                html = html+"<tr>";
                html = html+"<td width='20%'>债权申报联系人</td><td>"+(data.CreditorNoticeInfo.ClaimsDeclarationMember || '-')+"</td>";
                html = html+"</tr>";
                html = html+"<tr>";
                html = html+"<td width='20%'>债权申报联系电话</td><td>"+(data.CreditorNoticeInfo.ClaimsDeclarationTelNo || '-')+"</td>";
                html = html+"</tr>";
                html = html+"<tr>";
                html = html+"<td width='20%'>债权申报地址</td><td>"+(data.CreditorNoticeInfo.ClaimsDeclarationAddress || '-')+"</td>";
                html = html+"</tr>";
            }
            if(data.ChangeInfos.ChangeContent){
                if(data.ChangeInfos.ChangeDate){
                    data.ChangeInfos.ChangeDate = moment(data.ChangeInfos.ChangeDate*1000).format('YYYY-MM-DD');
                }
                html = html+"<tr>";
                html = html+"<td class='tb' width='20%'' rowspan='4'>修改信息</td>"
                html = html+"<td width='20%'>修改内容</td><td>"+(data.ChangeInfos.ChangeContent || '-')+"</td>";
                html = html+"</tr>";
                html = html+"<tr>";
                html = html+"<td width='20%'>修改前</td><td>"+(data.ChangeInfos.ChangeBefore || '-')+"</td>";
                html = html+"</tr>";
                html = html+"<tr>";
                html = html+"<td width='20%'>修改后</td><td>"+(data.ChangeInfos.ChangeAfter || '-')+"</td>";
                html = html+"</tr>";
                html = html+"<tr>";
                html = html+"<td width='20%'>修改时间</td><td>"+(data.ChangeInfos.ChangeDate || '-')+"</td>";
                html = html+"</tr>";
            }
            html  = html+"</table>";
            $('#zxbaModal .modal-body').html(html);
            $('#zxbaModal').modal('show');
        }
    });
}

function xzcfDetail(keyno,id) {
    $('#xzcfview').empty();
    $.ajax({
        type:'GET',
        url:INDEX_URL+'/company_getPenaltyDetail',
        data:{
            dataId:id,
            keyno:keyno,
        },
        dataType:'json',
        success:function(result){
            data = result.data;
            if(data.PublicDate){
                data.PublicDate = moment(data.PublicDate*1000).format('YYYY-MM-DD');
            }
            if(data.PenaltyDate){
                data.PenaltyDate = moment(data.PenaltyDate*1000).format('YYYY-MM-DD');
            }
            var chtml = '';

            if(data.Detail){
                chtml = data.Detail.PersonName;
            }
            
            
            var html = '';
            html = html+"<table class='ntable'>";

            html = html+"<tr>";
            html = html+"<td width='20%' class='tb'>行政相对人名称：</td><td colspan='3'>"+(chtml  || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";

            html = html+"<tr>";
            html = html+"<td width='20%' class='tb'>决定书文号</td><td width='30%'>"+(data.DocNo || '-')+"</td>";
            html = html+"<td width='20%' class='tb'>违法行为类型</td> <td width='30%'>"+(data.PenaltyType || '-')+"</td>";
            html = html+"</tr>";

            html = html+"<tr>";
            html = html+"<td class='tb'>行政处罚内容</td> <td>"+(data.Content|| '-')+"</td>";
            html = html+"<td class='tb'>处罚决定日期</td><td>"+(data.PenaltyDate|| '-')+"</td>";
            html = html+"</tr>";

            html = html+"<tr>";
            html = html+"<td class='tb'>公示日期：</td><td>"+(data.PublicDate || '-')+"</td>";
            html = html+"<td class='tb'>决定机关：</td> <td>"+(data.OfficeName || '-')+"</td>";
            html = html+"</tr>";

            html  = html+"</table>";
            $('#xzcfview').html(html);
            $('#xzcfModal').modal();
        }
    })
}

function showClModal(dataId,companyCode){
    $.ajax({
        type:'GET',
        url:INDEX_URL+'/company_getIpoWgDetail',
        data:{
            dataId:dataId,
            companyCode:companyCode,
        },
        dataType:'json',
        success:function(result){
            data = result.data;
            if(data.PublicDate){
                data.PublicDate = moment(data.PublicDate*1000).format('YYYY-MM-DD');

            }
            $('#clModal').modal();
            var html = '';
            html = html+"<table class='ntable'>";

            html = html+"<tr>";
            html = html+"<td width='20%' class='tb'>公告日期：</td><td width='30%'>"+(data.PublicDate || '-')+"</td>";
            html = html+"<td width='20%' class='tb'>处罚对象：</td> <td width='30%'>"+(data.Markedman || '-')+"</td>";
            html = html+"</tr>";

            html = html+"<tr>";
            html = html+"<td class='tb'>违规类型：</td> <td>"+(data.Type|| '-')+"</td>";
            html = html+"<td class='tb'>处分类型：</td><td>"+(data.Disposition|| '-')+"</td>";
            html = html+"</tr>";

            html = html+"<tr>";
            html = html+"<td class='tb'>处理人：</td><td>"+(data.ProcessMan || '-')+"</td>";
            html = html+"<td class='tb'>处罚金额（万元）：</td> <td>"+(data.PunishmentAmount || '-')+"</td>";
            html = html+"</tr>";

            html = html+"<tr>";
            html = html+"<td class='tb' style='width:20%;'>违规行为：</td><td colspan='3'>"+(data.Violation || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb' style='width:20%;'>处分措施：</td><td colspan='3'>"+(data.PunishmentMeasure || '-')+"</td>";
            html = html+"</tr>";
            html  = html+"</table>";
            $('#clview').html(html);
        }
    })
}

function showDbModal(dataId,companyCode){
    $.ajax({
        type:'GET',
        url:INDEX_URL+'/company_getIpoDbDetail',
        data:{
            dataId:dataId,
            companyCode:companyCode,
        },
        dataType:'json',
        success:function(result){
            data = result.data;
            if(data.PublicDate){
                data.PublicDate = moment(data.PublicDate*1000).format('YYYY-MM-DD');
            }
            if(data.GuaranteeStartDate){
                data.GuaranteeStartDate = moment(data.GuaranteeStartDate*1000).format('YYYY-MM-DD');
            }
            if(data.GuaranteeEndDate){
                data.GuaranteeEndDate = moment(data.GuaranteeEndDate*1000).format('YYYY-MM-DD');
            }
            if(data.date_format){
                data.date_format = moment(data.date_format*1000).format('YYYY-MM-DD');
            }
            if(data.ReportingDate){
                data.ReportingDate = moment(data.ReportingDate*1000).format('YYYY-MM-DD');
            }
            $('#dbModal').modal();
            var html = '';
            html = html+"<table class='ntable'>";
            html = html+"<tr>";
            html = html+"<td class='tb' style='width:20%;'>担保方：</td><td colspan='3'>"+(data.SecuredParty || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb' style='width:20%;'>被担保方：</td><td colspan='3'>"+(data.BSecuredParty || '-')+"</td>";
            html = html+"</tr>";

            html = html+"<tr>";
            html = html+"<td width='20%' class='tb'>公告日期：</td><td width='30%'>"+(data.PublicDate || '-')+"</td>";
            html = html+"<td width='20%' class='tb'>担保方式：</td> <td width='30%'>"+(data.SecuredType || '-')+"</td>";
            html = html+"</tr>";

            html = html+"<tr>";
            html = html+"<td class='tb'>担保金额：</td> <td>"+(data.SecuredAmount|| '-')+"</td>";
            html = html+"<td class='tb'>币种：</td><td>"+(data.Currency|| '-')+"</td>";
            html = html+"</tr>";

            html = html+"<tr>";
            html = html+"<td class='tb'>担保期限：</td><td>"+(data.GuaranteePeriod || '-')+"</td>";
            html = html+"<td class='tb'>担保起始日：</td> <td>"+(data.GuaranteeStartDate || '-')+"</td>";
            html = html+"</tr>";

            html = html+"<tr>";
            html = html+"<td class='tb'>担保终止日：</td> <td>"+(data.GuaranteeEndDate || '-')+"</td>";
            html = html+"<td class='tb'>是否履行完毕：</td><td>"+(data.IsFinished || '-')+"</td>";
            html = html+"</tr>";

            html = html+"<tr>";
            html = html+"<td class='tb'>是否关联交易：</td> <td>"+(data.IsTransactions || '-')+"</td>";
            html = html+"<td class='tb'>交易日期：</td><td>"+(data.date_format || '-')+"</td>";
            html = html+"</tr>";

            html = html+"<tr>";
            html = html+"<td class='tb'>报告期：</td> <td>"+(data.ReportingDate || '-')+"</td>";
            html = html+"<td class='tb'>报告期类别：</td><td>"+(data.ReportingType || '-')+"</td>";
            html = html+"</tr>";

            html = html+"<tr>";
            html = html+"<td class='tb' style='width:20%;'>担保事件说明：</td><td colspan='3'>"+(data.GuaranteeContent || '-')+"</td>";
            html = html+"</tr>";
            html  = html+"</table>";
            $('#dbview').html(html);
        }
    })

}


function getMomentDate(time){
    if(time && time.length!=0 && time!='-'){
        if(time.toString().length==10){
            time = time*1000;
        }
        return moment(time).format('YYYY-MM-DD');
    }
    return '-';
}

//终本案件
function endExecutionCaseDetail(id){
    $.ajax({
        type:'GET',
        url:INDEX_URL+'/company_endexecutioncaseDetail',
        data:{
            id:id
        },
        dataType:'json',
        success:function(res){
            var data = res.data;
            var html = '';
            var phtml = '';
            if(data.OwnerInfo && data.OwnerInfo.KeyNo){
                if(data.OwnerInfo.Org==2){
                    phtml = '<a target="_blank" href="'+INDEX_URL+'/pl/'+data.OwnerInfo.KeyNo+'.html">'+data.OwnerInfo.Name+'</a>'
                }else{
                    phtml = '<a target="_blank" href="'+INDEX_URL+'/firm/'+data.OwnerInfo.KeyNo+'.html">'+data.OwnerInfo.Name+'</a>'
                }
            }else{
                phtml = data.OwnerInfo.Name;
            }
            html = html+"<table class='ntable'>";
            html = html+"<tr>";
            html = html+"<td class='tb' width='20%'>被执行人姓名</td> <td width='30%'>"+(phtml || '-')+"</td>";
            html = html+"<td class='tb' width='20%'>身份证号码/组织机构代码</td> <td width='30%'>"+(data.CerNo  || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb'>性别</td> <td>"+('-')+"</td>";

            html = html+"<td class='tb'>案号</td> <td>";
            if(data.CaseSearchId && data.CaseSearchId != ''){
                html = html+ "<a  rel='nofollow' target='_blank' href='"+INDEX_URL+"/case/"+data.CaseSearchId[0]+".html'>"+(data.CaseNo || '-')+"</a>";
            }else{
                html = html+ (data.CaseNo || '-');
            }
            html = html+   "</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb'>执行法院</td> <td colspan='3'>"+(data.Court  || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb'>立案时间</td> <td>"+getMomentDate(data.JudgeDate)+"</td>";
            html = html+"<td class='tb'>终本日期</td> <td>"+getMomentDate(data.EndDate)+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb'>执行标的（元）</td> <td>"+(data.BiaoDi  || '-')+"</td>";
            html = html+"<td class='tb'>未履行金额</td> <td>"+(data.UnFinishedAmt  || '-')+"</td>";
            html = html+"</tr>";
            html  = html+"</table>";
            $('#endexecutioncaseModal .modal-body').html(html);
            $('#endexecutioncaseModal').modal('show');
        }
    });
}

//双随机抽查

function drcDetailAjax(dataId,keyno){
    console.info(dataId,keyno)
    $.ajax({
        type:'GET',
        url:INDEX_URL+'/company_drcdetail',
        data:{
            dataId:dataId,
            keyno:keyno
        },
        dataType:'json',
        success:function(res){
            if(res.success){
                drcDetail(res.data);
            }
            
        }
    });
}

function drcDetail(data){
    var html = '';
    html = html+"<table class='ntable'>";
    html = html+"<tr>";
    html = html+"<td class='tb' width='20%'>任务编号</td> <td width='30%'>"+(data.CheckTaskNo || '-')+"</td>";
    html = html+"<td class='tb' width='20%'>任务名称</td> <td width='30%'>"+(data.CheckTaskName  || '-')+"</td>";
    html = html+"</tr>";
    html = html+"<tr>";
    html = html+"<td class='tb'>抽查机关</td> <td>"+(data.CheckBelongOrg || '-')+"</td>";
    html = html+"<td class='tb'>完成日期</td> <td>"+getMomentDate(data.CheckDoneDate)+"</td>";
    html = html+"</tr>";

    $.each(data.Detail,function(i,item){
        html = html+"<tr>";
        html = html+"<td class='tb'>事项"+(i+1)+"</td> <td colspan='3'>"+((item && item.CheckItem) || '-')+"</td>";
        html = html+"</tr>";
        html = html+"<tr>";
        html = html+"<td class='tb'>结果</td> <td colspan='3'>"+((item && item.CheckResult) || '-')+"</td>";
        html = html+"</tr>";
    });
    html  = html+"</table>";
    $('#drcModal .modal-body').html(html);
    $('#drcModal').modal('show');
}

//破产重组-详情
function bankruptcyDetail(id){
    $.ajax({
        type:'GET',
        url:INDEX_URL+'/company_bankruptcydetail',
        data:{
            id:id
        },
        dataType:'json',
        success:function(res){
            var data = res.data;
            var html = '';
            html = html+"<table class='ntable'>";
            html = html+"<tr>";
            html = html+"<td class='tb' width='20%'>案号</td> <td width='30%'>"+(data.CaseNo || '-')+"</td>";
            html = html+"<td class='tb' width='20%'>破产类型</td> <td width='30%'>"+(data.CaseType  || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb'>被申请人</td> <td>"+getCoyStr(data.RespondentNameAndKeyNo)+"</td>";
            html = html+"<td class='tb'>申请人</td> <td>"+getCoyStr(data.ApplicantNameAndKeyNo)+"</td>";
            html = html+"</tr>";
            html = html+"<td class='tb'>管理人机构</td> <td>"+(data.ManagementOrganization || '-')+"</td>";
            html = html+"<td class='tb'>管理人主要负责人</td> <td>"+(data.ResponsiblePerson || '-')+"</td>";
            html = html+"</tr>";
            html = html+"<tr>";
            html = html+"<td class='tb'>经办法院</td> <td>"+(data.CourtName  || '-')+"</td>";
            html = html+"<td class='tb'>公开日期</td> <td>"+getMomentDate(data.RiskDate)+"</td>";
            html = html+"</tr>";
            html  = html+"</table>";
            var RelatedAnnouncementList_ = data.RelatedAnnouncementList;
            if(RelatedAnnouncementList_.length>0){
                html = html+'<div class="tcaption">关联公告</div>';
                html = html+'<table class="ntable ntable-odd"> <tr><th class="tx">序号</th><th>公告标题</th><th>公告类型</th><th>公开日期</th></tr>';
                RelatedAnnouncementList_.forEach(function (ral,i) {
                    var title_l = '<a target="_blank" href="'+INDEX_URL+'/bankruptcydetail_'+ral.Id+'.html">'+ral.Title+'</a>';
                    html = html+"<tr>";
                    html = html+"<td>"+(i+1)+"</td>";
                    html = html+"<td>"+title_l+"</td>";
                    html = html+"<td>"+(ral.CaseType || '-')+"</td>";
                    html = html+"<td>"+getMomentDate(ral.RiskDate)+"</td>";

                    html = html+"</tr>";
                })
                html = html+'</table>';
            }
            $('#bankruptcyModal .modal-body').html(html);
            $('#bankruptcyModal').modal('show');
        }
    });
}

