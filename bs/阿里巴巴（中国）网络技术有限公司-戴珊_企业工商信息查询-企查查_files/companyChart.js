function hideChart(dom){
    if($(dom).find('i').hasClass('i-arrow-up4')){
        $(dom).find('i').removeClass('i-arrow-up4');
        $(dom).find('i').addClass('i-arrow-down4')
        $(dom).find('span').html('展开');
        $(dom).parent().next().hide();
    }else{
        $(dom).find('i').removeClass('i-arrow-down4');
        $(dom).find('i').addClass('i-arrow-up4')
        $(dom).find('span').html('收起');
        $(dom).parent().next().show();
    }
}

function jobChart(_groupItems){
    Date.prototype.Format = function(fmt) { //author: meizz
        var o = {
            "M+" : this.getMonth()+1,                 //月份
            "d+" : this.getDate(),                    //日
            "h+" : this.getHours(),                   //小时
            "m+" : this.getMinutes(),                 //分
            "s+" : this.getSeconds(),                 //秒
            "q+" : Math.floor((this.getMonth()+3)/3), //季度
            "S"  : this.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt))
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)
            if(new RegExp("("+ k +")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
    }
    function objToArray(array) {
        var arr = []

        if(typeof array === "object" && !isNaN(array.length)){
            for (var i = 0; i < array.length ; i++) {
                arr.push(array[i]);
            }
        } else {
            for (var i in array) {
                arr.push(array[i]);
            }
        }

        return arr
    }
    function initChart() {
        function isAreaExsit(areas, name) {
            var index = -1;
            for(var i = 0; i < areas.length; i++){
                if(areas[i] == name){
                    index = i;
                    break;
                }
            }
            return index;
        }
        function gerPercent(array,num) {
            var all = 0;
            array.forEach(function (item) {
                //if(item && item.value && item.count){
                if(item && item.count){
                    all = Util.accAdd(all,item.count);
                }
            });
            var percent = Util.accDiv( num, all);
            percent = Util.accMul( Util.toFixed(percent, 2), 100);
            return percent;
        }

        var salData = {xData:['0-5k','5-10k','10-15k','15-20k','20-25k','25k以上','面议'],yData:[0,0,0,0,0,0,0]};
        var expData = {xData:['未知','不限','10年以上','5-10年','3-5年','1-3年','应届毕业生'],yData:[0,0,0,0,0,0,0]};
        var areaData = {xData:[],yData:[]};
        var eduData = {xData:['不限','初中','高中','中专','大专','本科','硕士','博士','未知'],yData:[0,0,0,0,0,0,0,0,0]};
        var eduDataPie = [];

        // 工资图表数据
        var salgroup = objToArray(_groupItems.salgroup);
        for(var i = 0; i < salgroup.length; i++){
            var obj = salgroup[i];
            if(obj && obj.value && obj.count) {
                switch (obj.value) {
                    case '0':
                        salData.yData[6] = gerPercent(salgroup, obj.count);
                        break;
                    case '1':
                        salData.yData[0] = gerPercent(salgroup, obj.count);
                        break;
                    case '2':
                        salData.yData[1] = gerPercent(salgroup, obj.count);
                        break;
                    case '3':
                        salData.yData[2] = gerPercent(salgroup, obj.count);
                        break;
                    case '4':
                        salData.yData[3] = gerPercent(salgroup, obj.count);
                        break;
                    case '5':
                        salData.yData[4] = gerPercent(salgroup, obj.count);
                        break;
                    case '6':
                        salData.yData[5] = gerPercent(salgroup, obj.count);
                        break;
                }
            }
        }

        // 经验图表数据
        var expgroup = objToArray(_groupItems.expgroup);
        for(var i = 0; i < expgroup.length; i++){
            var obj = expgroup[i];
            if(obj && obj.value && obj.count){
                switch (obj.value){
                    case '0': expData.yData[0] = gerPercent(expgroup, obj.count);break;
                    case '1': expData.yData[6] = gerPercent(expgroup, obj.count);break;
                    case '2': expData.yData[5] = gerPercent(expgroup, obj.count);break;
                    case '3': expData.yData[4] = gerPercent(expgroup, obj.count);break;
                    case '4': expData.yData[3] = gerPercent(expgroup, obj.count);break;
                    case '5': expData.yData[2] = gerPercent(expgroup, obj.count);break;
                    case '6': expData.yData[1] = gerPercent(expgroup, obj.count);break;
                }
            }
        }
        expData.xData.splice(0,2);// 删除未知、不限
        expData.yData.splice(0,2);

        // 地区图表数据
        var province = objToArray(_groupItems.province);
        //var province = objToArray(_groupItems.areagroup);
        var areaLength = province.length > 10 ? 10 : province.length; // 最多10条
        for(var i = 0; i <areaLength; i++){
            var obj = province[i];
            areaData.xData.push(obj.desc);
            areaData.yData.push(gerPercent(province, obj.count));
        }

        // 学历图表数据
        var edugroup = objToArray(_groupItems.edugroup);
        for(var i = 0; i < edugroup.length; i++){
            var obj = edugroup[i];
            switch (obj.value){
                case '0': eduData.yData[8] = gerPercent(edugroup, obj.count);break;
                case '1': eduData.yData[0] = gerPercent(edugroup, obj.count);break;
                case '2': eduData.yData[1] = gerPercent(edugroup, obj.count);break;
                case '3': eduData.yData[2] = gerPercent(edugroup, obj.count);break;
                case '4': eduData.yData[3] = gerPercent(edugroup, obj.count);break;
                case '5': eduData.yData[4] = gerPercent(edugroup, obj.count);break;
                case '6': eduData.yData[5] = gerPercent(edugroup, obj.count);break;
                case '7': eduData.yData[6] = gerPercent(edugroup, obj.count);break;
                case '8': eduData.yData[7] = gerPercent(edugroup, obj.count);break;
            }
        }

        // 学历要求
        eduData.yData.forEach(function (item,index) {
            if(item > 0){
                eduDataPie.push({
                    des: item + "%",
                    name : eduData.xData[index],
                    value : item + '0',
                    IsContainUnKnown :0,
                    unknown : false,
                });
            }
        });

        drawBar(salData,"PieSal",1);

        drawBar2(areaData,"PieArea",2);
        if(eduDataPie && eduDataPie.length){
            drawPie(eduDataPie,"PieEdu");
        }else{
            $('#PieEdu').html('<div class="pnodata"><img src="/material/theme/chacha/cms/v2/images/nno_image.png"><p>暂无数据</p></div>')
        }
        
        drawBar3(expData,"PieExp",3);
    }

    function drawBar(data,domId,type){
        if(data.xData.length==0){
            $('#'+domId+'Count').hide();
            $('#'+domId+'CountHref').removeAttr('onclick');
            $('#'+domId+'CountHref').addClass('text-diable');
            return;
        }
        var myChart = echarts.init(document.getElementById(domId));
        var option = {
            title: {
                text: '工资分布 (平均工资：￥'+_groupItems.avgsalary[0].value+')',
                subtext:'',
                x: 10,
                y: 10,
                textStyle: {
                    color:"#333333",
                    fontSize:14,
                    fontWeight:'normal'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: function(param){
                    return param.name + ':\n' + param.value + '%';
                }
            },
            grid:{
                top:80,
                right:20,
                bottom:50,
                left:20,
                backgroundColor:"#fbfbfb"
            },
            color:['#67aef5'],
            xAxis: {
                type: 'category',
                boundaryGap: true,
                axisLine:{
                    lineStyle:{
                        color:'#67aef5',
                        width:0
                    }
                },
                axisLine:{
                    show:false
                },
                axisTick:{
                    show:false
                },
                axisLabel:{
                    textStyle: {
                        color: "#666666"
                    },
                    interval:0,
                    rotate:45
                },
                splitLine:{
                    show:false
                },
                data: data.xData
            },
            yAxis: {
                axisLine:{
                    show:false
                },
                axisLabel:{
                    show:false
                },
                splitLine:{
                    show:false,
                    lineStyle: {
                        color: "#dbdbdb",
                        width: 0.5
                    }
                },
                axisTick:{
                    show:false
                }
            },
            series: [{
                name: '数量',
                type: 'bar',
                barMaxWidth:15,
                label:{
                    normal:{
                        show:true,
                        position:'top',
                        formatter: function(param){
                            return param.value + '%';
                        },
                    },
                },

                data: data.yData
            }]
        };


        myChart.setOption(option);
        return myChart;
    }
    function drawBar2(data,domId,type){
        if(data.xData.length==0){
            $('#'+domId+'Count').hide();
            $('#'+domId+'CountHref').removeAttr('onclick');
            $('#'+domId+'CountHref').addClass('text-diable');
            return;
        }
        var myChart = echarts.init(document.getElementById(domId));
        var option = {
            title: {
                text: '招聘地区 (TOP 10)',
                subtext:'',
                x: 10,
                y: 10,
                textStyle: {
                    color:"#333333",
                    fontSize:14,
                    fontWeight:'normal'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: function(param){
                    return param.name + ':\n' + param.value + '%';
                }
            },
            grid:{
                top:80,
                right:20,
                bottom:50,
                left:20,
                backgroundColor:"#fbfbfb"
            },
            color:['#67aef5'],
            xAxis: {
                type: 'category',

                boundaryGap: true,
                axisLine:{
                    lineStyle:{
                        /*color:'#333',*/
                        color:'#67aef5',
                        width:0
                    }
                },
                axisLine:{
                    show:false
                },
                axisTick:{
                    show:false
                },
                axisLabel:{
                    interval:0,
                    textStyle: {
                        color: "#666666"
                    },
                    /*rotate:-90*/
                    formatter: function(param){
                        var re = '';
                        if(param){
                            param = param.split('');
                            param.forEach(function (t) {
                                re += t + '\n';
                            });
                        }
                        return re;
                    }
                },
                splitLine:{
                    show:false
                },
                data: data.xData
            },
            yAxis: {
                axisLine:{
                    show:false
                },
                axisLabel:{
                    show:false
                },
                splitLine:{
                    show:false,
                    lineStyle: {
                        color: "#dbdbdb",
                        width: 0.5
                    }
                },
                axisTick:{
                    show:false
                }
            },
            series: [{
                name: '数量',
                type: 'bar',
                barMaxWidth:15,
                label:{
                    normal:{
                        show:true,
                        position:'top',
                        formatter: function(param){
                            return param.value + '%';
                        },
                    },

                },
                data: data.yData
            }]
        };


        myChart.setOption(option);
        return myChart;
    }
    function drawBar3(data,domId,type){
        if(data.xData.length==0){
            $('#'+domId+'Count').hide();
            $('#'+domId+'CountHref').removeAttr('onclick');
            $('#'+domId+'CountHref').addClass('text-diable');
            return;
        }
        var myChart = echarts.init(document.getElementById(domId));
        var option = {
            title: {
                text: '经验要求',
                subtext:'',
                x: 10,
                y: 10,
                textStyle: {
                    color:"#333333",
                    fontSize:14,
                    fontWeight:'normal'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: function(param){
                    return param.name + ':\n' + param.value + '%';
                }
            },
            grid:{
                top:60,
                right:40,
                bottom:10,
                left:80,
                backgroundColor:"#fbfbfb"
            },
            color:['#67aef5'],
            xAxis: {
                axisLine:{
                    show:false
                },
                axisLabel:{
                    show:false,
                    textStyle: {
                        color: "#666666"
                    },
                },
                splitLine:{
                    show:false,
                    lineStyle: {
                        color: "#dbdbdb",
                        width: 0.5
                    }
                },
                axisTick:{
                    show:false
                }
            },
            yAxis: {
                type: 'category',
                boundaryGap: true,
                axisLine:{
                    lineStyle:{
                        /*color:'#333',*/
                        color:'#67aef5',
                        width:0
                    }
                },
                axisLine:{
                    show:false
                },
                axisTick:{
                    show:false
                },
                axisLabel:{
                    textStyle: {
                        color: "#666666"
                    },
                    interval:0,
                    rotate:0
                },
                splitLine:{
                    show:false
                },
                data: data.xData

            },
            series: [{
                name: '数量',
                type: 'bar',
                barMaxWidth:15,
                label:{
                    normal:{
                        show:true,
                        position:'right',
                        formatter: function(param){
                            return param.value + '%';
                        },
                    },
                },

                data: data.xData
            }]
        };
        if (type == 3) {
            option.xAxis.type = 'value';
            /*option.xAxis.axisLabel.rotate = 30;
            option.grid.bottom = 50;
            option.grid.left = 40;*/
            option.yAxis.type = 'category';
            option.yAxis.data = data.xData;
            option.series[0].data = data.yData;
        }

        myChart.setOption(option);
        return myChart;
    }
    function drawPie(data,domId){
        var myChart = echarts.init(document.getElementById(domId));
        var option = {
            title: {
                text: '学历要求',
                subtext:'',
                x: 10,
                y: 10,
                textStyle: {
                    color:"#333333",
                    fontSize:14,
                    fontWeight:'normal'
                }
            },
            backgroundColor: '#ffffff',
            tooltip : {
                trigger: 'item',
                formatter: function(param){
                    if(param.data.des=='未知'){
                        return param.data.name+'：?%';
                    }else if(param.data.IsContainUnKnown){
                        return param.data.name+'：'+param.data.des+'+?%';
                    }else{
                        return param.data.name+'：'+param.data.des;
                    }
                }
            },
            color:['rgb(81, 130, 228)','rgb(81, 180, 241)','rgb(105, 212, 219)','rgb(63, 178, 126)','rgb(155, 204, 102)','rgb(200, 203, 74)'],
            series : [
                {
                    name:name,
                    type:'pie',
                    radius : '60%',
                    center: ['50%', '55%'],
                    data:data,
                    selectedOffset: 2,
                    roseType:false,
                    label: {
                        normal:{
                            textStyle: {
                                fontSize: 12,
                                color: '#666'
                            },
                            formatter: function(param){
                                if(param.data.des=='未知'){
                                    return param.data.name+'：?%';
                                }else if(param.data.IsContainUnKnown){
                                    return param.data.name+'：'+param.data.des+'+?%';
                                }else{
                                    return param.data.name+'：'+param.data.des;
                                }

                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    itemStyle:{
                        normal: {

                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
        return myChart;
    }

    var Util = {};
    //除法
    Util.accDiv = function(arg1,arg2){
        if(arg1){
            var t1=0,t2=0,r1,r2;
            try{t1=arg1.toString().split(".")[1].length}catch(e){}
            try{t2=arg2.toString().split(".")[1].length}catch(e){}

            r1=Number(arg1.toString().replace(".",""))
            r2=Number(arg2.toString().replace(".",""))
            return (r1/r2)*(Math.pow(10,t2-t1));
        } else {
            return 0;
        }
    }
    Number.prototype.div = function (arg){
        return accDiv(this, arg);
    }

    //乘法
    Util.accMul = function (arg1,arg2)
    {
        var m=0,s1=arg1.toString(),s2=arg2.toString();
        try{m+=s1.split(".")[1].length}catch(e){}
        try{m+=s2.split(".")[1].length}catch(e){}
        return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
    }
    Number.prototype.mul = function (arg){
        return accMul(arg, this);
    }

    //加法
    Util.accAdd = function (arg1,arg2){
        var r1,r2,m;
        try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
        try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
        m=Math.pow(10,Math.max(r1,r2))
        return (arg1*m+arg2*m)/m
    }
    Number.prototype.add = function (arg){
        return accAdd(arg,this);
    }

    //减法
    Util.accSubtr = function (arg1,arg2){
        var r1,r2,m,n;
        try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
        try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
        m=Math.pow(10,Math.max(r1,r2));
        //动态控制精度长度
        n=(r1>=r2)?r1:r2;
        return ((arg1*m-arg2*m)/m).toFixed(n);
    }
    //四舍五入
    Util.toFixed = function (number, decimal) {
        decimal = decimal || 0;
        var s = String(number);
        var decimalIndex = s.indexOf('.');
        if (decimalIndex < 0) {
            var fraction = '';
            for (var i = 0; i < decimal; i++) {
                fraction += '0';
            }
            return s + '.' + fraction;
        }
        var numDigits = s.length - 1 - decimalIndex;
        if (numDigits <= decimal) {
            var fraction = '';
            for (var i = 0; i < decimal - numDigits; i++) {
                fraction += '0';
            }
            return s + fraction;
        }
        var digits = s.split('');
        var pos = decimalIndex + decimal;
        var roundDigit = digits[pos + 1];
        if (roundDigit > 4) {
            //跳过小数点
            if (pos == decimalIndex) {
                --pos;
            }
            digits[pos] = Number(digits[pos] || 0) + 1;
            //循环进位
            while (digits[pos] == 10) {
                digits[pos] = 0;
                --pos;
                if (pos == decimalIndex) {
                    --pos;
                }
                digits[pos] = Number(digits[pos] || 0) + 1;
            }
        }
        //避免包含末尾的.符号
        if (decimal == 0) {
            decimal--;
        }
        return digits.slice(0, decimalIndex + decimal + 1).join('');
    }

    initChart();

}


function newsChart(keyno){

    $.ajax({
        url:INDEX_URL+'/company_newschart',
        data:{
            keyno:keyno,
            startDate:getStartDate()
        },
        dataType:'json',
        success:function(rs){
            if(rs.success){
                if(rs.data.newsCount >= 5){
                    $('#category-chart').parent().parent().parent().show();
                    drawChart(rs.data.groupItems,rs.data.newsDouble);
                }
            }
        }
    })

    function drawChart(_groupItems,newsDouble){
        var impactGroupItems;
        var tagGroupItems;

        if(_groupItems){
            $.each(_groupItems,function(index,obj){
                if(obj.key=='impact'){
                    impactGroupItems = obj.items;
                }
                if(obj.key=='topicid'){
                    tagGroupItems = obj.items;
                    
                }
            });
        }
        if(impactGroupItems){
            drawTypePie(impactGroupItems);
        }else{
            $('#type-chart').html('<div class="pnodata md"><img src="/material/theme/chacha/cms/v2/images/nno_image.png"><p>暂无数据</p></div>')
        }
        if(tagGroupItems){
            if(!drawCategroy(tagGroupItems)){
                $('#category-chart').html('<div class="pnodata md"><img src="/material/theme/chacha/cms/v2/images/nno_image.png"><p>暂无数据</p></div>')
            }
        }else{
            $('#category-chart').html('<div class="pnodata md"><img src="/material/theme/chacha/cms/v2/images/nno_image.png"><p>暂无数据</p></div>')
        }
        if(newsDouble && newsDouble.Impression && newsDouble.Impression.length>0){
            drawCloud(newsDouble.Impression);
        }else{
            $('#cloud-chart').html('<div class="pnodata md"><img src="/material/theme/chacha/cms/v2/images/nno_image.png"><p>暂无数据</p></div>')
        }
        if(newsDouble && newsDouble.List){
            drawTrend(newsDouble.List);
        }else{
            $('#trend-chart').html('<div class="pnodata md"><img src="/material/theme/chacha/cms/v2/images/nno_image.png"><p>暂无数据</p></div>')
        }

        if(!impactGroupItems && !tagGroupItems && !newsDouble){
            $('#category-chart').parent().parent().parent().hide();
        }
    }

    function getStartDate() {
        var dd = new Date();
        dd.setDate(dd.getDate() - 105);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();//获取当前几号，不足10补0
        return y + "-" + m + "-" + d;
    }


    function drawTypePie(list) {
            if (list.length < 1) {
                return;
            }

            var pieData = [];

            list.forEach(function (item) {
                var color = "";
                if (item.value == 'negative') {
                    color = "#FF8B8B";
                    item.text = "消极";
                }

                if (item.value == 'none') {
                    color = "#C4C4C4";
                    item.text = "中立";
                }

                if (item.value == 'positive') {
                    color = "#52AAF2";
                    item.text = "积极";
                }

                pieData.push({
                    value: item.count,
                    name: item.text,
                    category: item.value,
                    itemStyle: {
                        normal: {
                            color: color
                        }
                    }
                });
            });

            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts4.init(document.getElementById('type-chart'));

            var pieR = 63;
            

            // 指定图表的配置项和数据
            var option = {
                title:{
                    text: '舆情情感类型占比',
                    subtext:'',
                    x: 10,
                    y: 10,
                    textStyle: {
                        color:"#333333",
                        fontSize:13,
                        fontWeight:'normal'
                    }
                },
                grid: {
                    top: 10,
                    right: 10,
                    bottom: 10,
                    left: 10
                },
                color: ["#67aef5"],
                series: [{
                    name: '销量',
                    selectedMode: 'single',
                    selectedOffset: 0,
                    type: 'pie',
                    label: {
                        normal: {
                            formatter: '{b} {per|{d}%}',
                            rich: {
                                per: {
                                    align: 'left'
                                }
                            }
                        }
                    },
                    radius: pieR,
                    data: pieData
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
    }

    function drawTrend(list) {
        if (list.length < 1) {
            return;
        }

        var xData = [];
        var yData1 = [];
        var yData2 = [];

        for (var i = 0; i < list.length; i++) {
            xData.push(list[i].Date);
            if (list[i].IsForthDay == 1) {
                yData1.push({
                    name: "积极",
                    value: list[i].CountInfo.Positive
                });
                yData2.push({
                    name: "消极",
                    value: 0 - parseInt(list[i].CountInfo.Negative)
                });
            } else {
                yData1.push({
                    name: "积极",
                    value: 0
                });
                yData2.push({
                    name: "消极",
                    value: 0
                });
            }
        }

        var negativeNum = 0;
        var positiveNum = 0;
        for(var i=0; i<yData1.length; i++){
            negativeNum += yData1[i].value;
            positiveNum += yData2[i].value;
        }

        if(negativeNum==0&&positiveNum==0){
            $('#trend-chart').html('<div class="pnodata md"><img src="/material/theme/chacha/cms/v2/images/nno_image.png"><p>暂无数据</p></div>')
            return;
        }
        

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts4.init(document.getElementById('trend-chart'));


        // 指定图表的配置项和数据
        var option = {
            title:{
                text: '新闻舆情趋势',
                subtext:'',
                x: 10,
                y: 10,
                textStyle: {
                    color:"#333333",
                    fontSize:13,
                    fontWeight:'normal'
                }
            },
            grid: {
                top: 60,
                right: 10,
                bottom: 60,
                left: 50
            },
            legend: {
                show: true,
                bottom: 10,
                itemWidth: 14,
                itemHeight: 14,
                itemGap: 30,
                textStyle: {
                    padding: [1, 0, 0, 0]
                }
            },
            xAxis: {
                data: xData,
                axisLine: {
                    show: true,
                    onZero: true,
                    lineStyle: {
                        width: 0.5,
                        color: '#eee',
                        type: "solid"
                    }
                },
                axisLabel: {
                    show: true,
                    interval: 0,
                    color: "#333333",
                    formatter: function (value, index) {
                        if (value.substr(8, 2) == "01") {
                            return value.substr(0, 7);
                        }
                        return "";
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 0.5,
                        color: '#eee',
                        type: "solid"
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    color: "#666666",
                    formatter: function (value) {
                        if (value < 0) {
                            return 0 - value;
                        }
                        return value;
                    }
                },
                splitLine: {
                    show: false
                }
            },
            series: [{
                name: '积极',
                type: 'bar',
                barWidth: 10,
                stack: 'one',
                itemStyle: {
                    normal: {
                        color: '#67AEF5',
                    }
                },
                data: yData1
            }, {
                name: '消极',
                type: 'bar',
                barWidth: 10,
                stack: 'one',
                itemStyle: {
                    normal: {
                        color: '#FF8B8B',
                    }
                },
                data: yData2
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

    }

    function drawCloud(list) {
        if (list.length < 1) {
            return;
        }

        var data = [];

        for (var i = 0; i < list.length; i++) {
            data.push({
                name: list[i].Key,
                value: list[i].Weight,
                textStyle: {
                    normal: {
                        color: "rgba(18,139,237,1)"
                    }
                }
            });
        }

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts4.init(document.getElementById('cloud-chart'));

        // 指定图表的配置项和数据
        var option = {
            title:{
                text: '近期媒体印象',
                subtext:'',
                x: 10,
                y: 10,
                textStyle: {
                    color:"#333333",
                    fontSize:13,
                    fontWeight:'normal'
                }
            },
            grid: {
                top: 50,
                right: 10,
                bottom: 10,
                left: 10
            },
            color: "#128bed",
            series: [{
                type: 'wordCloud',
                // shape: "triangle",
                rotationRange: [0, 0],
                rotationStep: 45,
                left: 'center',
                top: '20%',
                width: '70%',
                height: '70%',
                data: data
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

    function drawCategroy(list) {
        if (!list) {
            return false;
        }

        if (list.length > 0) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].desc == "其他") {
                    list.splice(i, 1);
                }
            }
        }



        if (list.length < 1) {
            return false;
        }

        var xData = [];
        var yData = [];
        var valueArr = [];

        list.sort(function (a, b) {
            return b.count - a.count;
        });

        var len = (list.length > 10) ? 10 : list.length;
        var maxLableLength = 0;

        for (var i = len - 1; i >= 0; i--) {
            xData.push(list[i].desc);
            yData.push(list[i].count);
            valueArr.push(list[i].value);

            if (list[i].desc && list[i].desc.length > maxLableLength) {
                maxLableLength = list[i].desc.length;
            }
        }


        var myChart = echarts4.init(document.getElementById('category-chart'));

        // 指定图表的配置项和数据
        var option = {
            title:{
                text: '新闻类型分布 TOP10',
                subtext:'',
                x: 10,
                y: 10,
                textStyle: {
                    color:"#333333",
                    fontSize:13,
                    fontWeight:'normal'
                }
            },
            grid: {
                top: 60,
                right: 40,
                bottom: 30,
                left: maxLableLength * 12 + 20
            },
            color: ["#67aef5"],
            xAxis: {
                type: 'value',
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'category',
                triggerEvent: true,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 0.5,
                        color: '#eee',
                        type: "solid"
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    color: "#128bed",
                },
                splitLine: {
                    show: false
                },

                data: xData,
            },
            series: [{
                type: 'bar',
                barWidth: 11,
                label: {
                    show: true,
                    position: 'right',
                    color: "#333333"
                },
                data: yData
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        return true;
    }
}


function touziChart(touziIndustry,touziProvince){
    if(touziIndustry){
      touziIndustry = touziIndustry.sort(function (a, b) {
                return a.count - b.count;
      });
      touziIndustry.forEach(function(hy){
        
        if(hy.desc==''){
            hy.desc='其他'
        }
      })
      chartUtil.drawBar(chartUtil.transBarDataN(touziIndustry),"touzi-industry",1,'企业对外投资行业前五分布图');
    }    
    if(touziProvince){
      drawMap(chartUtil.transMapDataN(touziProvince),"touzi-province",1,'企业对外投资区域分布图');
    }

    function drawMap(data, domId, type,name){
        var myChart = echarts.init(document.getElementById(domId));
        var maxValue = 0;
        for (var i = 0; i < data.length; i++) {
            if(data[i].value>maxValue){
                maxValue = data[i].value;
            }
        }
        // 指定图表的配置项和数据
        var option = {
            title :{
                text: name,
                subtext:'',
                x: 10,
                y: 10,
                textStyle: {
                    color:"#333333",
                    fontSize:13,
                    fontWeight:'normal'
                }
            },
            backgroundColor: '#ffffff',
            tooltip: {
                trigger: 'item',
                formatter: function(param){
                    var html = param.seriesName;
                    if(param.data){
                        html+='<br>'+param.data.name+'：'+(param.data.value || '-');
                    }
                    return html;
                }
            },
            visualMap: {
                min: 0,
                max: maxValue,
                left: 40,
                top: 90,
                text: ['高', '低'], // 文本，默认为数值文本
                calculable: true,
                inRange:{
                    color:['#BFEFFF', '#128BED']
                }
            },
            toolbox: {
                right:18,
                top:5,
                feature: {
                    saveAsImage: {}
                }
            },
            series: [{
                name: name,
                type: 'map',
                top:40,
                left:160,
                right:100,
                mapType: 'china',
                itemStyle:{
                    emphasis:{
                        areaColor:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                              offset: 0, color: '#00EEEE' // 0% 处的颜色
                            }, {
                              offset: 1, color: '#00FF7F' // 100% 处的颜色
                            }], false),
                    }
                },
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: data

            }]
        };
        myChart.setOption(option);
        return myChart;
    }


}

function partnersChart(list,unit,count,barTitle){
    pieData = [];
    var xData = [];
    var yData = [];
    var percent = 100;
    $.each(list,function(index,vo) {
        if(index<6){
            pieData.push({
                name:vo.StockName,
                value:vo.StockPercentValue
            });
            xData.unshift(vo.StockName);
            if(barTitle == '持股数(股)'){
                yData.unshift(vo.ShouldCapi.replace(/,/g,''));
            }else{
                yData.unshift(vo.ShouldCapiAmount);
            }
            percent -= vo.StockPercentValue;
        } 
        if(index==6 && count==7) {
            pieData.push({
                name:vo.StockName,
                value:vo.StockPercentValue
            });
        }
    })
    
    if(percent == 100){
        $('#partnerschart').hide();
        return;
    }
    var bardata = {
        xData:xData,
        yData:yData
    }
    if(count>7 && percent>0){
        pieData.push({
            name:'其他',
            value:percent.toFixed(2)
        });
    }
    drawPie(pieData,"partners-percent");
    function drawPie(data,domId){
        var myChart = echarts.init(document.getElementById(domId));
        var option = {
            title: {
                text: '股东持股比例（%）',
                subtext:'',
                x: 10,
                y: 10,
                textStyle: {
                    color:"#333333",
                    fontSize:14,
                    fontWeight:'normal'
                }
            },
            toolbox: {
                right:18,
                top:5,
                feature: {
                    saveAsImage: {},
                }
            },
            backgroundColor: '#ffffff',
            tooltip : {
                trigger: 'item',
            },
            color:['rgb(81, 130, 228)','rgb(81, 180, 241)','rgb(105, 212, 219)','rgb(63, 178, 126)','rgb(155, 204, 102)','rgb(200, 203, 74)','#aaaaaa'],
            series : [
                {
                    name:'股东持股比例（%）',
                    type:'pie',
                    radius : '40%',
                    center: ['50%', '55%'],
                    data:data,
                    selectedOffset: 2,
                    roseType:false,
                    label: {
                        normal:{
                            textStyle: {
                                fontSize: 12,
                                color: '#666'
                            },
                            formatter: function(param){
                                var name = param.data.name.replace(/(.{7})(?=.)/g, '$1\n');
                                if(name.length>5){
                                    name = name.substr(0,4)+'…';
                                }
                                if(param.data.value){
                                    return name+' '+param.data.value+'%';
                                }else{
                                    return name+' -';
                                }
                                
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    itemStyle:{
                        normal: {

                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
        return myChart;
    }

    drawBar(bardata,"partners-capi");

    function drawBar(data,domId){
        var myChart = echarts.init(document.getElementById(domId));
        var option = {
            title: {
                text: barTitle ? '股东' + barTitle : '股东认缴出资额（'+unit+'）',
                subtext:'',
                x: 10,
                y: 10,
                textStyle: {
                    color:"#333333",
                    fontSize:14,
                    fontWeight:'normal'
                }
            },
            toolbox: {
                right:18,
                top:5,
                feature: {
                    saveAsImage: {},
                }
            },
            tooltip: {
                trigger: 'item',
            },
            grid:{
                top:50,
                right:90,
                bottom:20,
                left:100,
                backgroundColor:"#fbfbfb"
            },
            color:['#67aef5'],
            
            xAxis: {
                axisLine:{
                    show:false
                },
                axisLabel:{
                    show:false
                },
                splitLine:{
                    show:false,
                    lineStyle: {
                        color: "#dbdbdb",
                        width: 0.5
                    }
                },
                axisTick:{
                    show:false
                }
            },
            yAxis: {
                type: 'category',
                boundaryGap: true,
                axisLine:{
                    lineStyle:{
                        color:'#67aef5',
                        width:0
                    }
                },
                axisLine:{
                    show:false
                },
                axisTick:{
                    show:false
                },
                axisLabel:{
                    interval:0,
                    textStyle:{
                        color:'#666666'
                    },
                    formatter: function(param){
                        var name = param.replace(/(.{6})(?=.)/g, '$1\n');
                        if(name.length>14){
                            name = name.substr(0,13)+'…';
                        }
                        return name;
                    }
                },
                splitLine:{
                    show:false
                },
                data: data.xData
            },
            series: [{
                name: barTitle ? barTitle : '认缴出资额（'+unit+'）',
                type: 'bar',
                barMaxWidth:15,
                label:{
                    normal:{
                        show:true,
                        position:'right',
                        textStyle:{
                            color:'#666666'
                        },
                        formatter: function (param) {
                            if(barTitle == '持股数(股)'){
                                return param.value.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,');
                            }else{
                                return param.value;
                            }
                        }
                    },
                },

                data: data.yData
            }]
        };


        myChart.setOption(option);
        return myChart;
    }
}

function shangbiaoChart(groupItems){
    if(!groupItems){
        return;
    }
    var yearList = groupItems.appdateyear;
    var intclsList = groupItems.intcls
    var issuestatusList = groupItems.issuestatus
    function drawYear(data) {
        var xData = [];
        var yData = [];
        if(data && data.length){
            data = data.reverse();
        }
        data.forEach(function (item) {
            if(item.desc!='全部'){
                xData.push(item.value);
                yData.push(item.count);
            }
        });
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('shangbiao-year-chart'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '商标申请年份趋势',
                subtext:'',
                x: 10,
                y: 10,
                textStyle: {
                    color:"#333333",
                    fontSize:13,
                    fontWeight:'normal'
                }
            },
            grid: {
                top: 60,
                right: 10,
                bottom: 40,
                left: 10
            },
            color: ["#67aef5"],
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: [0],
                    start: 0,
                    end: 100,
                    minValueSpan: 20,
                    maxValueSpan: 20
                }
            ],
            xAxis: {
                type: 'category',
                boundaryGap: true,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 0.5,
                        color: '#eee',
                        type: "solid"
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: "#67aef5"
                    }
                },
                silent: false,
                triggerEvent: true,
                data: xData
            },
            yAxis: {
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
                name: '销量',
                type: 'line',
                symbolSize: 15,
                symbol: 'circle',
                label: {
                    normal: {
                        show: true
                    }
                },
                data: yData
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

    }
    function drawShangbiaoPie(data,domId,name){
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById(domId));

            var pieData = [];
            var otherCount = 0;
            data.sort(function (a, b) {
                return b.count - a.count;
            });
            for(var i=1; i<data.length; i++){
                if(i<=10){
                    var objValue = '';
                    if(data[i].value && domId == 'shangbiao-intcls-chart'){
                        objValue = data[i].value + '类 ';
                    }
                    var obj = {
                        value: data[i].count,
                        name: objValue+data[i].desc
                    };
                    pieData.push(obj)
                } else {
                    otherCount+=data[i].count;
                }
            }
            if(otherCount>0){
                pieData.push({
                    value: otherCount,
                    name: '其他'
                })
            }
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: name,
                    subtext:'',
                    x: 10,
                    y: 10,
                    textStyle: {
                        color:"#333333",
                        fontSize:13,
                        fontWeight:'normal'
                    }
                },
                color:['#4CD593', '#87D95E', '#F9D36D', '#55D8E4', '#40A0EE', '#7676EF', '#6AAFF2', '#EE9B67', '#ED6D5C', '#EE7777', '#F18B8B'],
                series : [
                    {
                        name:name,
                        type:'pie',
                        radius : '50%',
                        center: ['50%', '50%'],
                        data:pieData,
                        selectedOffset: 2,
                        roseType:false,
                        label: {
                            normal:{
                                textStyle: {
                                    fontSize: 12
                                },
                                formatter: '{b}({c}) {d}%'
                            }
                        },
                        labelLine: {
                            normal: {
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            }
                        },
                        itemStyle:{
                            normal: {
                                
                            }
                        }
                    }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
    }
    drawYear(yearList);
    if(intclsList && intclsList.length>1){
        drawShangbiaoPie(intclsList,'shangbiao-intcls-chart','商标申请分类分布');
    }else{
        $('#shangbiao-intcls-chart').hide();
    }
    if(issuestatusList && issuestatusList.length>1){
        drawShangbiaoPie(issuestatusList,'shangbiao-issuestatus-chart','商标申请状态分布');
    }else{
        $('#shangbiao-issuestatus-chart').hide();
    }
    
}

function zlChart(groupItems){
    if(!groupItems){
        return;
    }
    var zlAnalysisChart;
    var hasInfo = false;
    var option;

    var chartOption = {
        yearBarOption:'',
        pubBarOption:'',
        categoryBarOption:'',
        statusBarOption:'',
    }

    function noData(){
        //$('#zlAnalysisChart').hide();
        $('#zlAnalysisNodata').show();
    }

    function getTitleOption(name){
        return {
            text: name,
            subtext:'',
            x: 10,
            y: 10,
            textStyle: {
                color:"#333333",
                fontSize:13,
                fontWeight:'normal'
            }
        }
    }

    function drawT(data) {
        if (data.length < 1) {
            return;
        }
        var tCount = 0;
        data.forEach(function (item) {
            if (item.value == 'A') {
                tCount += item.count * 0.5;
            }

            if (item.value == 'B') {
                tCount += item.count * 1;
            }

            if (item.value == 'U') {
                tCount += item.count * 0.2;
            }

            if (item.value == 'D') {
                tCount += item.count * 0.03;
            }

            if (item.value == 'S') {
                tCount += item.count * 0.2;
            }
        });
        tCount = parseFloat(tCount.toFixed(2));
        $("#t-chart").text(tCount + "T");
    }

    function getYearOption(data,title) {
        var yearObj = {};
        var xData = [];
        var yData = [];

        var yData1 = [];
        var yData2 = [];
        var yData3 = [];
        var yData4 = [];

        var gridBottom = 50;
        // if ($("body").width() < 350) {
        //     gridBottom = 100;
        // }

        data.forEach(function (item) {
            if (item.value) {
                yearObj[item.value.split("-")[0]] = "";
            }
        });

        for (var year in yearObj) {
            xData.push(year);
        }
        for (var i = 1; i < 5; i++) {
            xData.forEach(function (item) {
                var x = 0;
                data.forEach(function (subItem) {
                    if (subItem.value == (item + "-" + i)) {
                        x = subItem.count;
                    }
                });

                if (i == 1) {
                    yData1.push(x);
                }

                if (i == 2) {
                    yData2.push(x);
                }

                if (i == 3) {
                    yData3.push(x);
                }

                if (i == 4) {
                    yData4.push(x);
                }
            })
        }


        for (var i = 0; i < xData.length; i++) {
            yData.push(yData1[i] + yData2[i] + yData3[i] + yData4[i]);
        }


        var series1 = {
            name: '发明公布',
            type: 'bar',
            stack: "年份",
            barWidth: 25,
            itemStyle: {
                normal: {
                    color: '#67aef5',
                }
            },
            label: {
                normal: {
                    show: false,
                }
            },
            data: yData1
        };

        var series2 = {
            name: '发明授权',
            type: 'bar',
            stack: "年份",
            barWidth: 25,
            itemStyle: {
                normal: {
                    color: '#84db56',
                }
            },
            label: {
                normal: {
                    show: false,
                }
            },
            data: yData2
        };

        var series3 = {
            name: '实用新型',
            type: 'bar',
            stack: "年份",
            barWidth: 25,
            itemStyle: {
                normal: {
                    color: '#fad464',
                }
            },
            label: {
                normal: {
                    show: false,
                }
            },
            data: yData3
        };

        var series4 = {
            name: '外观设计',
            type: 'bar',
            stack: "年份",
            barWidth: 25,
            itemStyle: {
                normal: {
                    color: '#f09b62',
                }
            },
            label: {
                normal: {
                    show: false,
                }
            },
            data: yData4
        };

        var seriesLine = {
            name: '总计',
            type: 'line',
            symbolSize: 0.1,
            symbol: 'circle',
            showSymbol: true,
            itemStyle: {
                normal: {
                    color: '#999999'
                }
            },
            label: {

                normal: {
                    show: true,
                    position: 'top',
                    color: "#333333",
                    fontSize: 11
                }
            },
            lineStyle: {
                normal: {
                    width: 0
                }
            },
            data: yData
        };


        var start = 0;

        if (xData.length / 5 < 1) {
            start = 0;
        } else {

            start = 100 - Math.floor((5 / xData.length) * 100);
        }

        // 指定图表的配置项和数据
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            title:getTitleOption(title),
            grid: {
                top: 45,
                right: 10,
                bottom: gridBottom,
                left: 10
            },
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: [0],
                    start: 0,
                    end: 100,
                    minValueSpan: 10,
                    maxValueSpan: 10
                }
            ],
            legend: {
                data: ['发明公布', '发明授权', '实用新型', '外观设计'],
                bottom: 0,
                itemWidth: 13,
                itemHeight: 13
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 0.5,
                        color: '#eee',
                        type: "solid"
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    // rotate:-90,
                    textStyle: {
                        color: "#67aef5"
                    }
                },
                silent: false,
                triggerEvent: true,
                data: xData
            },
            yAxis: {
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
            series: [
                series1,
                series2,
                series3,
                series4,
                seriesLine
            ]
        };

        option.legendselectchanged = function(params){
            var legends = params.selected;
            var keys = Object.keys(legends);

            var lineData = [];
            for (var i = 0; i < xData.length; i++) {
                lineData[i] = 0;
            }

            if (legends['发明公布'] == true) {
                for (var i = 0; i < xData.length; i++) {
                    lineData[i] += yData1[i];
                }
            }

            if (legends['发明授权'] == true) {
                for (var i = 0; i < xData.length; i++) {
                    lineData[i] += yData2[i];
                }
            }

            if (legends['实用新型'] == true) {
                for (var i = 0; i < xData.length; i++) {
                    lineData[i] += yData3[i];
                }
            }

            if (legends['外观设计'] == true) {
                for (var i = 0; i < xData.length; i++) {
                    lineData[i] += yData4[i];
                }
            }


            seriesLine.data = lineData;

            zlAnalysisChart.setOption({
                series: [
                    series1,
                    series2,
                    series3,
                    series4,
                    seriesLine
                ]
            });

        }


        // 使用刚指定的配置项和数据显示图表。
        chartOption.yearBarOption = option;

    }

    function getPubOption(data,title) {
        var yearObj = {};
        var xData = [];
        var yData = [];

        var yData1 = [];
        var yData2 = [];
        var yData3 = [];
        var yData4 = [];

        var gridBottom = 50;
        

        data.forEach(function (item) {
            if (item.value) {
                yearObj[item.value.split("-")[0]] = "";
            }
        });

        for (var year in yearObj) {
            xData.push(year);
        }
        for (var i = 1; i < 5; i++) {
            xData.forEach(function (item) {
                var x = 0;
                data.forEach(function (subItem) {
                    if (subItem.value == (item + "-" + i)) {
                        x = subItem.count;
                    }
                });

                if (i == 1) {
                    yData1.push(x);
                }

                if (i == 2) {
                    yData2.push(x);
                }

                if (i == 3) {
                    yData3.push(x);
                }

                if (i == 4) {
                    yData4.push(x);
                }
            })
        }


        for (var i = 0; i < xData.length; i++) {
            yData.push(yData1[i] + yData2[i] + yData3[i] + yData4[i]);
        }


        var series1 = {
            name: '发明公布',
            type: 'bar',
            stack: "年份",
            barWidth: 25,
            itemStyle: {
                normal: {
                    color: '#67aef5',
                }
            },
            label: {
                normal: {
                    show: false,
                }
            },
            data: yData1
        };

        var series2 = {
            name: '发明授权',
            type: 'bar',
            stack: "年份",
            barWidth: 25,
            itemStyle: {
                normal: {
                    color: '#84db56',
                }
            },
            label: {
                normal: {
                    show: false,
                }
            },
            data: yData2
        };

        var series3 = {
            name: '实用新型',
            type: 'bar',
            stack: "年份",
            barWidth: 25,
            itemStyle: {
                normal: {
                    color: '#fad464',
                }
            },
            label: {
                normal: {
                    show: false,
                }
            },
            data: yData3
        };

        var series4 = {
            name: '外观设计',
            type: 'bar',
            stack: "年份",
            barWidth: 25,
            itemStyle: {
                normal: {
                    color: '#f09b62',
                }
            },
            label: {
                normal: {
                    show: false,
                }
            },
            data: yData4
        };


        var seriesLine = {
            name: '总计',
            type: 'line',
            symbolSize: 0.1,
            symbol: 'circle',
            showSymbol: true,
            itemStyle: {
                normal: {
                    color: '#999999'
                }
            },
            label: {

                normal: {
                    show: true,
                    position: 'top',
                    color: "#333333",
                    fontSize: 11
                }
            },
            lineStyle: {
                normal: {
                    width: 0
                }
            },
            data: yData
        };


        var start = 0;

        if (xData.length / 5 < 1) {
            start = 0;
        } else {

            start = 100 - Math.floor((5 / xData.length) * 100);
        }
        

        // 指定图表的配置项和数据
        var option = {
            title:getTitleOption(title),
            tooltip: {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                top: 45,
                right: 10,
                bottom: gridBottom,
                left: 10
            },
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: [0],
                    start: 0,
                    end: 100,
                    minValueSpan: 10,
                    maxValueSpan: 10
                }
            ],
            legend: {
                data: ['发明公布', '发明授权', '实用新型', '外观设计'],
                bottom: 0,
                itemWidth: 13,
                itemHeight: 13
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 0.5,
                        color: '#eee',
                        type: "solid"
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    // rotate:-90,
                    textStyle: {
                        color: "#67aef5"
                    }
                },
                silent: false,
                triggerEvent: true,
                data: xData
            },
            yAxis: {
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
            series: [
                series1,
                series2,
                series3,
                series4,
                seriesLine
            ]
        };

        option.legendselectchanged = function(params){
            var legends = params.selected;
            var keys = Object.keys(legends);

            var lineData = [];
            for (var i = 0; i < xData.length; i++) {
                lineData[i] = 0;
            }

            if (legends['发明公布'] == true) {
                for (var i = 0; i < xData.length; i++) {
                    lineData[i] += yData1[i];
                }
            }

            if (legends['发明授权'] == true) {
                for (var i = 0; i < xData.length; i++) {
                    lineData[i] += yData2[i];
                }
            }

            if (legends['实用新型'] == true) {
                for (var i = 0; i < xData.length; i++) {
                    lineData[i] += yData3[i];
                }
            }

            if (legends['外观设计'] == true) {
                for (var i = 0; i < xData.length; i++) {
                    lineData[i] += yData4[i];
                }
            }


            seriesLine.data = lineData;

            zlAnalysisChart.setOption({
                series: [
                    series1,
                    series2,
                    series3,
                    series4,
                    seriesLine
                ]
            });

        }

        // 使用刚指定的配置项和数据显示图表。
        chartOption.pubBarOption = option;
    }

    function getCategoryOption(data,title) {
        var pieData = [];

        data.forEach(function (item) {
            var color = "#67aef5";

            if (item.value == 'U') {
                color = "#fad464";
            }

            if (item.value == 'A') {
                color = "#67aef5";
            }

            if (item.value == 'D') {
                color = "#f09b62";
            }

            if (item.value == 'B') {
                color = "#84db56";
            }

            pieData.push({
                value: item.count,
                name: item.desc,
                category: item.value,
                itemStyle: {
                    normal: {
                        color: color
                    }
                }
            });
        });

        var pieR = 53;
        

        // 指定图表的配置项和数据
        var option = {
            title:getTitleOption(title),
            
            color: ["#67aef5"],
            series: [{
                name: '销量',
                selectedMode: 'single',
                center: ['50%', '60%'],
                type: 'pie',
                label: {
                    normal: {
                        formatter: '{b}({c})\n{per|{d}%}',
                        rich: {
                            per: {
                                align: 'left'
                            }
                        }
                    }
                },
                radius: pieR,
                data: pieData
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        chartOption.categoryBarOption = option;

    }

    function drawStatus(data,title) {
        var xData = [];
        var yData = [];
        var valueArr = [];

        var descCount = 0;
        data.sort(function (a, b) {
            return a.count - b.count;
        });
        data.forEach(function (item, index) {
            if (item.desc) {
                xData.push(item.desc);
                if (item.desc.length > descCount) {
                    descCount = item.desc.length;
                }
                yData.push(item.count);
                valueArr.push(item.value);
            }
        });

        if(xData.length>3){
            $("#zlAnalysisChartStatus").css("height", xData.length*60 + "px");
        }
        

        var end = 50;

        if (xData.length / 9 < 1) {
            end = 100;
        } else {

            end = Math.floor((9 / xData.length) * 100);
        }
      
        // 指定图表的配置项和数据
        var option = {
            title:getTitleOption(title),
            grid: {
                top: 40,
                right: 120,
                bottom: 10,
                left: 150
            },
            color: ["#67aef5"],
            // dataZoom: [
            //     {
            //         type: 'inside',
            //         xAxisIndex: [0],
            //         start: 1,
            //         end: end,
            //         minValueSpan: 7,
            //         maxValueSpan: 7
            //     }
            // ],
            xAxis: {
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
                    show: false,
                    lineStyle: {
                        width: 0.5,
                        color: ['#eee']
                    }
                }
            },
            yAxis: {
               
                type: 'category',
                boundaryGap: true,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    inside:true,
                    interval:0,
                    margin:0,
                    formatter:function(value){
                        return '{value|' + value + '}';
                    },
                    verticalAlign:'bottom',
                    textStyle: {
                        color: "#67aef5"
                    },
                    rich:{
                        value:{
                            height:45
                        }
                    }
                },
                silent: false,
                triggerEvent: true,
                data: xData

            },
            series: [{
                name: '',
                type: 'bar',
                barWidth: 20,
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        textStyle: {
                            color: '#333333',
                            fontSize: 11
                        }
                    }
                },
                data: yData
            }]
        };
        // 基于准备好的dom，初始化echarts实例
        var statusChart = echarts4.init(document.getElementById('zlAnalysisChartStatus'));

        // 使用刚指定的配置项和数据显示图表。
        statusChart.setOption(option);
    }

    var t = [];

    if(groupItems){
        groupItems.forEach(function (item) {
            if (item.key == "yearkind") {
                if (item.items.length > 0) {
                    
                    getYearOption(item.items,'专利申请年份趋势');
                    
                }
            }

            if (item.key == "kindcode") {
                if (item.items.length > 0) {
                    getCategoryOption(item.items,'专利类型分布');

                    t = t.concat(item.items);
                }
            }

            if (item.key == "softwareCopyright") {
                if (item.items.length > 0) {
                    item.items[0].value = "S";

                    t = t.concat(item.items);
                }
            }

            if (item.key == "pubdatekind") {
                if (item.items.length > 0) {
                   getPubOption(item.items,'专利发布年份趋势')
                   
                }
            }

            if (item.key == "legalstatus") {
                if (item.items.length > 0) {
                    drawStatus(item.items,'专利状态分布');
                }
            }

            if (item.key == "ipclist") {
                if (item.items.length > 0) {
       
                }
            }
        });

        zlAnalysisChart = echarts4.init(document.getElementById('zlAnalysisChart'));

        $('#zlAnalysisTable tr').on('mouseenter',function(e){
            var dataOption = $(this).attr('data-option');
            zlAnalysisChart.clear();
            if(dataOption=='tBarOption'){
                $('#zlAnalysistBar').show();
                $('.zlAnalysisChartStatus').hide();
                $('#zlAnalysisNodata').hide();
                $('#zlAnalysisChart').hide();
                $('#zlAnalysisTitle').html('科技创新总含量');
                $('#zlAnalysisTitle').show();
            }else if(dataOption=='statusBarOption'){
                $('.zlAnalysisChartStatus').show();
                $('#zlAnalysistBar').hide();
                $('#zlAnalysisNodata').hide();
                $('#zlAnalysisChart').hide();
                $('#zlAnalysisTitle').html('专利状态分布');
                $('#zlAnalysisTitle').show();
            }else if(chartOption[dataOption]){
                zlAnalysisChart.setOption(chartOption[dataOption]); 
                if(dataOption=='yearBarOption'||dataOption=='pubBarOption'){
                    chartOption[dataOption].legendselectchanged({'selected':{'发明公布': true,'发明授权': true, '外观设计': true,'实用新型': true}});
                    zlAnalysisChart.off('legendselectchanged');
                    zlAnalysisChart.on('legendselectchanged', function (params) {
                        chartOption[dataOption].legendselectchanged(params);
                    });
                }
                $('#zlAnalysisChart').show();
                $('#zlAnalysisNodata').hide();
                $('#zlAnalysistBar').hide();
                $('.zlAnalysisChartStatus').hide();
                $('#zlAnalysisTitle').html(chartOption[dataOption].title.text);
                $('#zlAnalysisTitle').show();
            }else{
                $('#zlAnalysisTitle').hide();
                noData();
            }
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
        });
        $("#zlAnalysisTable tr").eq(0).trigger("mouseenter");
    } else {
        noData();
    }
    drawT(t);
}

function spledgeTrendChart(list){
    if(!list || $('#spledgeTrendChart').length==0){
        return;
    }
    var yearList = list;
    function drawYear(data) {
        var xData = [];
        var yData = [];

        data.forEach(function (item) {

            xData.push(item.TradeDate);
            yData.push(item.AmtShareRatio.replace('%',''));

        });



        var start = 50;

        if (xData.length / 7 < 1) {
            start = 0;
        } else {

            start = 100 - Math.floor((7 / xData.length) * 100);
        }
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('spledgeTrendChart'));

        // 指定图表的配置项和数据
        var option = {
            grid: {
                top: 60,
                right: 35,
                bottom: 40,
                left: 45
            },
            color: ["#67aef5"],
            tooltip: {
                trigger: 'axis',
                formatter: '{b}<br />{a}: {c}%',
                axisPointer: {
                    animation: false
                }
            },
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: [0],
                    
                    minValueSpan: 7,
                    maxValueSpan: 7
                }
            ],
            xAxis: {
                type: 'category',
                boundaryGap: true,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 0.5,
                        color: '#eee',
                        type: "solid"
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: "#67aef5"
                    }
                },
                silent: false,
                triggerEvent: true,
                data: xData
            },
            yAxis: {
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
                name: '质押比例',
                type: 'line',
                symbolSize: 3,
                symbol: 'circle',
                label: {
                    normal: {
                        show: true
                    }
                },
                data: yData
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

    }
    drawYear(yearList);
}

function creditrateChart(creditData,creditTrend) {
    if(creditData && creditData.length>0){
        drawCategroy(creditData);
    }else{
        $('#rate-latest-chart').html('<div class="pnodata md"> <img src="/material/theme/chacha/cms/v2/images/nno_image.png"> <p>暂无信息</p> </div>');
    }
    
    if(creditTrend && creditTrend.ByDate){
        drawLine(creditTrend.ByDate);
    }else{
        $('#rate-trend-chart').html('<div class="pnodata md"> <img src="/material/theme/chacha/cms/v2/images/nno_image.png"> <p>暂无信息</p> </div>');
    }

    
    function drawCategroy(list) {
        var xData = [];
        var yData = [];

        var maxLableLength = 0;

        for (var i = list.length - 1; i >= 0; i--) {
            xData.push(list[i].OrgShortName);
            yData.push({
                value:list[i].ComRatingLevelCode,
                valueText:list[i].ComRatingLevel
            });


            if (list[i].OrgShortName.length > maxLableLength) {
                maxLableLength = list[i].OrgShortName.length;
            }
        }

        var myChart = echarts4.init(document.getElementById('rate-latest-chart'));

        // 指定图表的配置项和数据
        var option = {
            grid: {
                top: 60,
                right: 40,
                bottom: 30,
                left: maxLableLength * 12 + 20
            },
            color: ["#67aef5"],
            xAxis: {
                type: 'value',
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'category',
                triggerEvent: true,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 0.5,
                        color: '#eee',
                        type: "solid"
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    color: "#128bed",
                },
                splitLine: {
                    show: false
                },

                data: xData,
            },
            series: [{
                type: 'bar',
                barWidth: 11,
                label: {
                    show: true,
                   // position:"right",
                    position: ["102%", 1],
                    color: "#333333",
                    fontSize:11,
                    formatter:function(params){
                       return params.data.valueText
                    }

                },
                data: yData
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

       
    }

    function drawLine(byDate){
        var legendText=[];
        var xData = [];
        var yData = [];
        var zData = [];

        var color="#128bed";

        for (var i = 0; i < byDate.length; i++) {
            for (var j = 0; j < byDate[i].Ratings.length; j++) {
                xData.push(byDate[i].Ratings[j].Date);
                yData.push(byDate[i].Ratings[j].Level);
            }
        }

        xData = xData.removal();
        xData.sort(function(a,b){
            return moment(a,'YYYY-MM-DD')-moment(b,'YYYY-MM-DD');
        });

        yData = yData.removal();
        yData.sort(function(a,b){
            return a.value-b.value;
        });

        

        for (var i = 0; i < byDate.length; i++) {
            if(byDate[i].OrgShortName=="中诚信国际"){
                color="#F09B62"
            }
            if(byDate[i].OrgShortName=="联合资信"){
                color="#84DB56"
            }
            if(byDate[i].OrgShortName=="大公国际"){
                color="#FAD464"
            }
            if(byDate[i].OrgShortName=="远东资信"){
                color="#4DD8E5"
            }
            if(byDate[i].OrgShortName=="上海新世纪"){
                color="#67AEF5"
            }
            if(byDate[i].OrgShortName=="鹏元资信"){
                color="#BAC859"
            }
            legendText.push({
                name:byDate[i].OrgShortName
            });

            var datas = [];

            for(var k = 0;k < xData.length; k++){
                var existValue = null;
                for (var m = 0; m < byDate[i].Ratings.length; m++) {
                    if(xData[k]==byDate[i].Ratings[m].Date){
                        existValue = [byDate[i].Ratings[m].Date,byDate[i].Ratings[m].Level];
                    }
                }
                if(existValue){
                    datas.push(existValue);
                }
                
            }

            zData.push({
                name:byDate[i].OrgShortName,
                type: 'line',
                symbolSize: 3,
                symbol: 'circle',
                itemStyle:{
                    normal:{
                        color:color,
                        lineStyle:{
                            width:1
                        }
                    }
                },
                data:datas,
            });
        }

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts4.init(document.getElementById('rate-trend-chart'));

        // 指定图表的配置项和数据
        var option = {
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                show: true,
                bottom: 10,
                itemWidth: 13,
                itemHeight: 13,
                itemGap: 30,
                textStyle: {
                    padding: [1, 0, 0, 0],
                    fontSize:11,
                    color:"#333"
                },
                data: legendText
            },
            grid:{
                top:60,
                right:30,
                bottom:70,
                left: 40
            },

            dataZoom: {
                    type: 'inside',
                    minValueSpan: 7,
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                axisLine:{
                    show:true,
                    lineStyle:{
                        color:"#eee"
                    }
                },
                axisLabel:{
                    textStyle:{
                        color:"#333",
                        fontSize:12
                    }
                },
                axisTick:{
                    show:false
                },
                splitLine:{
                    show:false
                },
                silent:false,
                triggerEvent:true,

                data: xData
            },
            yAxis: {
                type: 'category',
                axisLine:{
                    show:true,
                    lineStyle:{
                        color:"#eee"
                    }
                },
                axisLabel:{
                    textStyle:{
                        color:"#333",
                        fontSize:12
                    },

                },
                axisTick:{
                    show:false
                },
                splitLine:{
                    show:false
                },
                data:yData

            },
            series: zData
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

    }

    function drawLine2(byDate){
        var legendText=[];
        var xData = [];
        var yData = [];
        var zData=[];
        var maxLableLength = 0;
        var color="#128bed";
        var typeValue=[];

        for (var i = 0; i < byDate.length; i++) {
            if(byDate[i].OrgShortName=="中诚信国际"){
                color="#F09B62"
            }
            if(byDate[i].OrgShortName=="联合资信"){
                color="#84DB56"
            }
            if(byDate[i].OrgShortName=="大公国际"){
                color="#FAD464"
            }
            if(byDate[i].OrgShortName=="远东资信"){
                color="#4DD8E5"
            }
            if(byDate[i].OrgShortName=="上海新世纪"){
                color="#67AEF5"
            }
            if(byDate[i].OrgShortName=="鹏元资信"){
                color="#BAC859"
            }
            byDate[i].value=[];
            for (var j = 0; j < byDate[i].Ratings.length; j++) {
                legendText.push({
                    name:byDate[i].OrgShortName
                });
                xData.push(byDate[i].Ratings[j].Date);
                typeValue.push({
                    name:byDate[i].Ratings[j].Level,
                    date:byDate[i].Ratings[j].Date
                });
                byDate[i].value.push([byDate[i].Ratings[j].Date,byDate[i].Ratings[j].Level]);
                byDate[i].Ratings[j].value=byDate[i].Ratings[j].LevelCode;
                if (byDate[i].Ratings[j].Level.length > maxLableLength) {
                    maxLableLength = byDate[i].Ratings[j].Level.length;
                }
            }

            zData.push({
                name:byDate[i].OrgShortName,
                type: 'line',
                step: 'start',
                showSymbol:false,
                itemStyle:{
                    normal:{
                        color:color,
                        lineStyle:{
                            width:1
                        }
                    }
                },
                data:byDate[i].value
            });
        }
        var obj = {};
        var arr=[];
        typeValue.forEach(function(item){
            if (!obj[item.name + item.value]) {
                obj[item.name + item.value] = 1;
                arr.push(item)
            }
        });
        arr.sort(sortId);
        function sortId(a,b){
            return a.value-b.value
        }
        arr.forEach(function(item){
            yData.push(item.name)
        });        

        var start = 50;
        if(xData.length/7 <1){
            start = 0;
        }else{
            start =  100 - Math.floor((5/xData.length)*100);
        }
 

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts4.init(document.getElementById('rate-trend-chart'));

        // 指定图表的配置项和数据
        var option = {
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                show: true,
                bottom: 10,
                itemWidth: 13,
                itemHeight: 13,
                itemGap: 30,
                textStyle: {
                    padding: [1, 0, 0, 0],
                    fontSize:11,
                    color:"#333"
                },
                data: legendText
            },
            grid:{
                top:60,
                right:10,
                bottom:70,
                left: maxLableLength * 11 + 15
            },

            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: [0],
                    start: start,
                    end: 100,
                    minValueSpan:7,
                    maxValueSpan:7
                }
            ],
            xAxis: {
                type: 'category',
                inverse:true,
                boundaryGap: true,
                axisLine:{
                    show:true,
                    lineStyle:{
                        color:"#eee"
                    }
                },
                axisLabel:{
                    textStyle:{
                        color:"#333",
                        fontSize:12
                    },
                    formatter:function(params){
                        var date=params.split("-");
                        return date[1]+"-"+date[2]+"\n"+date[0]
                    }

                },
                axisTick:{
                    show:false
                },
                splitLine:{
                    show:false
                },
                silent:false,
                triggerEvent:true,

                data: xData
            },
            yAxis: {
                type: 'category',
                axisLine:{
                    show:true,
                    lineStyle:{
                        color:"#eee"
                    }
                },
                axisLabel:{
                    textStyle:{
                        color:"#333",
                        fontSize:12
                    },

                },
                axisTick:{
                    show:false
                },
                splitLine:{
                    show:false
                },
                data:yData

            },
            series: zData
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

    }
}
//持股变化
function stockChangeChart(list){
    var xData = [];
    var yData = [];
    $.each(list,function(i,v){
        if(v.d==0){
            xData.push({
                d:'更早',
                r:v.r,
                s:v.s
            });
        }else{
            xData.push({
                d:moment(v.d*1000).format('YYYY-MM-DD'),
                r:v.r,
                s:v.s
            });
        }
        yData.push(parseFloat(v.p));
    })
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('stock-change'));

    // 指定图表的配置项和数据
    var option = {
        grid: {
            top: 60,
            right: 50,
            bottom: 55,
            left: 50
        },
        color: ["#67aef5"],
        dataZoom: [
            {
                type: 'inside',
                minValueSpan: 7,
            }
        ],
        xAxis: {
            type: 'category',
            boundaryGap: true,
            axisLine: {
                show: true,
                lineStyle: {
                    width: 0.5,
                    color: '#eee',
                    type: "solid"
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: "#333333"
                },
                interval:0,
                formatter:function (v, i) {
                    var html = v.d;
                    if(v.r){
                        v.r = v.r.replace('人民币','');
                        html+='\n注册资本：'+v.r;
                    }
                    if(v.s){
                        v.s = v.s.replace('人民币','');
                        html+='\n认缴资本：'+v.s;
                    }
                    return html;
                }
            },
            silent: false,
            triggerEvent: true,
            data: xData
        },
        yAxis: {
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
            name: '参股比例：',
            type: 'bar',
            symbolSize: 6,
            barWidth:25,
            symbol: 'circle',
            label: {
                normal: {
                    textStyle: {
                        color: "#333333"
                    },
                    position:'top',
                    show: true,
                    formatter:'{c}%',
                },
            },
            data: yData
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

function kcbChart(financialTarget){
  setTimeout(function() {
    $('#financialtargetTable').slimScroll({
        wheelStep: 2,
        height:217
    });
  }, 500);
    
  $('#financialtargetTable tr').on('mouseenter',function(e){
    var dataFiled = $(this).attr('data-filed');
    if(dataFiled){
      
      var title = $(this).find('td').eq(0).text();
      var dataNumber = 1;
      dataType = $(this).attr('data-type');
      dateReportData = {
        xData:[],
        yData:[]
      }
      var unit = '';
      $.each(financialTarget,function(index,vo){
        dateReportData.xData.push(vo.FinancialTime);
        var value = vo[dataFiled];
        if(!value || value=='' || value=='--'){
          dateReportData.yData.push('0');
        }else if(value){
          var newUnit = value.substr(value.length-1,1);
          var valueInt = parseFloat(value.replace(/\,/g, ""));
          if(unit==''){
            unit = newUnit;
          }else if(unit!=newUnit){
            if(unit=='万' && newUnit=='亿'){
                valueInt = valueInt*10000;
            }else if(unit=='亿' && newUnit=='万'){
                valueInt = valueInt/10000;
                valueInt = valueInt.toFixed(4);
            }
          }
          dateReportData.yData.push(valueInt||'0');
        }
      });
      if(unit=='亿'){
        title = title.replace('元','亿元');
      }else if(unit=='万'){
        title = title.replace('元','万元');
      }
      drawSummaryChart(dateReportData, 'financialtargetChart', dataType ,title);
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
    }
  })

  
    $("#financialtargetTable tr").eq(0).trigger("mouseenter");

    function drawSummaryChart(data, domId, type ,name){
      if((type==2||type==3) && data.yData){
        $.each(data.yData,function(index,num){
          if(num){
            if(num.charAt(num.length-1)=='万'){
              num = parseFloat(num.substr(0,num.length-1))/10000;
            }else if(num.substr(num.length-2,num.length-1)=='万亿'){
              num = parseFloat(num.substr(0,num.length-2))*10000;
            }else if(num.charAt(num.length-1)=='亿'){
              num = num.substr(0,num.length-1);
            }
            num = parseFloat(num).toFixed(2);
          }else{
            num = '-';
          }
          data.yData[index] = num;
        }) 
      }
      if(type==3){
        name = name.replace('元','亿元')
      }

      var myChart = echarts.init(document.getElementById(domId));
      var option = {
          title: {
              text: name,
              subtext:'',
              x: 10,
              y: 10,
              textStyle: {
                  color:"#333333",
                  fontSize:13,
                  fontWeight:'normal'
              }
          },
          tooltip: {
              trigger: 'item',
          },
          grid:{
              top:100,
              right:0,
              bottom:55,
              left:0,
              backgroundColor:"#fbfbfb"
          },
          color:['#67aef5'],
          xAxis: {
              type: 'category',
              boundaryGap: true,
              axisLine:{
                  lineStyle:{
                      color:'#128bed',
                      width:0
                  }
              },
              axisLine:{
                  show:false
              },
              axisTick:{
                  show:false
              },
              axisLabel:{
                  interval:0,
                  rotate:0,
                  textStyle:{
                    color:'#333',
                    fontSize:13,
                  }
              },
              splitLine:{
                  show:false
              },
              data: data.xData
          },
          yAxis: {
              axisLine:{
                  show:false
              },
              splitLine:{
                  show:false,
              },
              axisLabel:{
                  show:false
              },
              axisTick:{
                  show:false
              }
          },
          series: [{
              name: name,
              type: 'line',
              smooth: true,
              animationDuration: 500,
              areaStyle: {
                normal: {
                }
              },
              label:{
                  normal:{
                      show:true,
                      position:'top',
                      textStyle: {
                          color:"#128bed",
                          fontSize:12,
                          fontWeight:'normal'
                      }
                  }
              },
              data: data.yData
          }]
      };
      
      if(!(window.ActiveXObject || "ActiveXObject" in window) || 1){
          option.series[0].areaStyle.normal = {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{   //ie 不能用渐变
                  offset: 0,
                  color: '#DEEFFE'
              }, {
                  offset: 1,
                  color: '#90CDFF'
              }])
          }
       }
      myChart.setOption(option);
      return myChart;
    }
}


function susongChart(zhixing,shixin,wenshuList,gonggaoList,noticeList) {



    var provinceList = [];
    var yearData = {
        xData:[],
        yDatas:[]
    };
    drawChart();
    function drawChart(){
        if(zhixing){
            addProvince(zhixing.province);
            countYear(zhixing.courtyear,'被执行人信息');
        }
        if(shixin){
            addProvince(shixin.province);
            countYear(shixin.courtyear,'失信被执行人');
        }
        if(wenshuList){
            addProvince(wenshuList.province);
            countYear(wenshuList.submityear,'裁判文书');
        }
        if(gonggaoList){
            addProvince(gonggaoList.province);
            countYear(gonggaoList.publishyear,'法院公告');
        }
        // if(noticeList){
        //     addProvince(noticeList.province);
        //     countYear(noticeList.courtyear,'开庭公告');
        // }

        yearData.xData.sort(function (a, b) {
            var pa = 0;
            var pb = 0;
            if(a!='未知'){
                pa = parseInt(a);
            }
            if(b!='未知'){
                pb = parseInt(b);
            }
            return pa - pb;
        });

        var unknown = null;
        yearData.xData.forEach(function (data,index) {
            if(data == '未知'){
                unknown = data;
                yearData.xData.splice(index,1);
            }
        });
        if(unknown){
            yearData.xData.push(unknown);
        }

        if(zhixing){
            kateYear(zhixing.courtyear,'被执行人信息');
        }
        if(shixin){
            kateYear(shixin.courtyear,'失信被执行人');
        }
        if(wenshuList){
            kateYear(wenshuList.submityear,'裁判文书');
        }
        if(gonggaoList){
            kateYear(gonggaoList.publishyear,'法院公告');
        }
        // if(noticeList){
        //     kateYear(noticeList.courtyear,'开庭公告');
        // }

        var yearDataStr = '{"xData":["2015","2016","2017"],"yDatas":[{"name":"被执行人信息","index":0,"value":[3,3,4]},{"name":"失信被执行人","index":1,"value":[1,3,3]},{"name":"裁判文书","index":2,"value":[5,6,2]},{"name":"法院公告","index":3,"value":[3,5,2]}]}'


        chartUtil.drawMap(provinceList,"susong-province",1,'法律诉讼省份分布');

        chartUtil.drawBarMuti(yearData,"susong-year",1,'法律诉讼年份分布');
    }
    

    function addProvince(list){
        if(list){
            list.forEach(function(obj){
                var province = containsProvince(provinceList,obj);
                if(!province){
                    provinceList.push({
                    value: parseInt(obj.count),
                    name: obj.desc,
                })
                }else{
                    province.value+=parseInt(obj.count);
                }
                
            })
        }else{

        }
        
        
    }

    function containsProvince(provinceList,obj){
        for(var i=0;i<provinceList.length;i++){
            if(provinceList[i].name==obj.desc){
                return provinceList[i];
            }
        }
        return null;
    }

    function countYear(list,title){
        if(!list){
            return;
        } 
        list.forEach(function(obj){
            var year = containsYear(yearData.xData,obj);
            if(!year){
                if(obj.value==""){
                    obj.value="未知"
                }
                yearData.xData.push(obj.value)
                
            }
        });
        yearData.yDatas.push({
            name:title,
            index:yearData.yDatas.length,
            value:[]
        });
        
    }

    

    function containsYear(yearList,obj){
        for(var i=0;i<yearList.length;i++){
            if(yearList[i]==obj.value){
                return yearList[i];
            }
        }
        return null;
    }

    function kateYear(list,title){
        var index = getIndex(title,yearData.yDatas);
        yearData.xData.forEach(function(year){
            if(list){
                var item = containsYear2(list,year);
                if(item){
                    yearData.yDatas[index].value.push(item.count);
                }else{
                    yearData.yDatas[index].value.push(0);
                }
            }
                
        });
    }

    function containsYear2(yearList,year){
        for(var i=0;i<yearList.length;i++){
            if(yearList[i].value==year){
                return yearList[i];
            }
        }
        return null;
    }

    function getIndex(title,yDatas){
        for(var i=0;i<yDatas.length;i++){
            if(yDatas[i].name==title){
                return yDatas[i].index;
            }
        }
    }
}