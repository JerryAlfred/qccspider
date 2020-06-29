function industryAnalysis(keyno){
    var industryDesc;
    var industryAnalysisChart;
    var hasInfo = false;
    var option;
    var chartOption = {
        registCountryOption:'',
        registProvinceOption:'',
        industryGradeCountryOption:'',
        industryGradeProvinceOption:'',
        dateCountryChartOption:'',
        dateProvinceChart:'',
        areaMapOption:'',
        capiMapOption:'',
    }
    
    $.ajax({
        url:'/company_industryanalysis',
        dataType:'json',
        data:{keyno:keyno},
        success:function(rs){
            if(rs.Status==200){
                industryDesc = rs.Result.IndustryDesc;
                processResult(rs.Result);
            }else{
                noData();
            }
        }
    });
    function processResult(data) {
        if (data.RegistAmtList) {
            if (data.RegistAmtList.length > 0) {
                hasInfo = true;
                getRegisterOption(data.RegistAmtList);
            }
        }

        if (data.IndustryGradeList) {
            if (data.IndustryGradeList.length > 0) {
                hasInfo = true;
                getIndustryGradeOption(data.IndustryGradeList);
            }
        }

        if (data.StDateList) {
            if (data.StDateList.length > 0) {
                hasInfo = true;
                getDateOption(data.StDateList);
            }
        }

        if (data.AreaMap) {
            hasInfo = true;
            getAreaMapOption(data.AreaMap);
        }

        if (data.RegistAreaMap) {
            hasInfo = true;
            getCapiMapOption(data.RegistAreaMap);
        }

        if (hasInfo) {
            industryAnalysisChart = echarts4.init(document.getElementById('industryAnalysisChart'));
            $('#industryAnalysisTable tr').on('mouseenter',function(e){
                var dataOption = $(this).attr('data-option');
                industryAnalysisChart.clear();
                if(chartOption[dataOption]){
                    industryAnalysisChart.setOption(chartOption[dataOption]); 
                    $('#industryAnalysisTitle').html(chartOption[dataOption].title.text);
                }
                $(this).addClass('active');
                $(this).siblings().removeClass('active');
            });
            $("#industryAnalysisTable tr").eq(0).trigger("mouseenter");
        } else {
            noData();
        }
    }

    function noData(){
        $('#industryAnalysisChart').html('<div class="pnodata"> <img src="/material/theme/chacha/cms/v2/images/nno_image.png"><p>暂无数据</p></div>')
        $('.industryAnalysisChart').hide();
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
    function getRegisterOption(list) {
        list.forEach(function (element) {
            if (element.Province == "全国") {
                var title = "该企业注册资本" + element.RegistAmt + "(元)，属于" + (industryDesc || "-") + "。" + "注册资金方面，在" + element.Province + "同行企业中，表现" + element.FallIn + "。";
                registCapi = parseInt(element.RegistAmt);

                var val = 50;
                if (element.FallIn == "优秀") {

                    if (element.FallInIndex) {
                        val = 70 + 30/3*parseInt(element.FallInIndex)
                    } else {
                        val = 95;
                    }

                }

                if (element.FallIn == "中等") {
                    if (element.FallInIndex) {
                        val = 30 + 30/7*parseInt(element.FallInIndex)
                    } else {
                        val = 50;
                    }
                }

                if (element.FallIn == "偏低") {
                    if (element.FallInIndex) {
                        val = 0 + 30/3*parseInt(element.FallInIndex)
                    } else {
                        val = 5;
                    }
                }

                // 指定图表的配置项和数据
                var option = {
                    title:getTitleOption(title),
                    series: [{
                        name: '全国范围',
                        type: 'gauge',
                        center: ['50%', '65%'],
                        radius: '80%',
                        startAngle: 180,
                        endAngle: 0,
                        splitNumber: 100,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                width: 20,
                                color: [[0.3, '#F85A5A'], [0.7, '#FCCA38'], [1, '#80EC46']]
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: true
                        },
                        axisLabel: {
                            show: true,
                            distance: -55,
                            color: "#333333",
                            padding: [0, -15],
                            formatter: function (value) {
                                if (value == 2) {
                                    return "偏低";
                                }

                                if (value == 50) {
                                    return "中等";
                                }

                                if (value == 98) {
                                    return "优秀";
                                }
                            }
                        },
                        pointer: {
                            length: '90%',
                            width: 2
                        },
                        itemStyle: {
                            color: "#666666"
                        },
                        title: {
                            offsetCenter: [0, '40%']
                        },
                        detail: { show: false },
                        data: [{ value: val, name: '全国范围内' }]
                    }]
                };

                chartOption.registCountryOption = option;
            } else {
                var title = "该企业注册资本" + element.RegistAmt + "(元)，属于" + (industryDesc || "-") + "。" + "注册资金方面，在" + element.Province + "同行企业中，表现" + element.FallIn + "。";

                var val = 50;
                if (element.FallIn == "优秀") {

                    if (element.FallInIndex) {
                        val = 70 + 30/3*parseInt(element.FallInIndex)
                    } else {
                        val = 95;
                    }

                }

                if (element.FallIn == "中等") {
                    if (element.FallInIndex) {
                        val = 30 + 30/7*parseInt(element.FallInIndex)
                    } else {
                        val = 50;
                    }
                }

                if (element.FallIn == "偏低") {
                    if (element.FallInIndex) {
                        val = 0 + 30/3*parseInt(element.FallInIndex)
                    } else {
                        val = 5;
                    }
                }

                // 指定图表的配置项和数据
                var option = {
                    title:getTitleOption(title),
                    series: [{
                        name: '本省范围',
                        type: 'gauge',
                        center: ['50%', '65%'],
                        radius: '80%',
                        startAngle: 180,
                        endAngle: 0,
                        splitNumber: 100,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                width: 20,
                                color: [[0.3, '#F85A5A'], [0.7, '#FCCA38'], [1, '#80EC46']]
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: true
                        },
                        axisLabel: {
                            show: true,
                            distance: -55,
                            color: "#333333",
                            padding: [0, -15],
                            formatter: function (value) {
                                if (value == 2) {
                                    return "偏低";
                                }

                                if (value == 50) {
                                    return "中等";
                                }

                                if (value == 98) {
                                    return "优秀";
                                }
                            }
                        },
                        pointer: {
                            length: '90%',
                            width: 2
                        },
                        itemStyle: {
                            color: "#666666"
                        },
                        title: {
                            offsetCenter: [0, '40%']
                        },
                        detail: { show: false },
                        data: [{ value: val, name: '本省范围内' }]
                    }]
                };
                chartOption.registProvinceOption = option;
            }
        });
    }

    function getIndustryGradeOption(list) {
        var dataIndex = 0;
        if (registCapi < 10) {
            dataIndex = 0
        } else if (registCapi >= 10 && registCapi < 100) {
            dataIndex = 1
        } else if (registCapi >= 100 && registCapi < 1000) {
            dataIndex = 2
        } else if (registCapi >= 1000 && registCapi < 5000) {
            dataIndex = 3
        } else {
            dataIndex = 4
        }

        list.forEach(function (element) {
            if (element.Province == "全国") {
                if (element.IndustryGradeList.length < 1) {
                    return;
                }
                var title;
                var sum = 0;
                element.IndustryGradeList.sort(function (a, b) {
                    return b.Amount - a.Amount;
                });

                var legendData = [];

                element.IndustryGradeList.forEach(function (ele) {
                    sum += ele.Amount;
                    ele.value = ele.Amount;
                    ele.name = ele.Scope;
                });

                if (sum == 0) {
                    title = '';
                    return;
                }

                element.IndustryGradeList.forEach(function (ele) {
                    var percent = ele.Amount / sum;
                    percent = (100 * percent).toFixed(2);
                    ele.percent = parseFloat(percent);
                });


                if (element.IndustryGradeList[0].percent >= 50) {
                    title = "全国范围内，同业资金集中在" + element.IndustryGradeList[0].Scope + "规模的企业中，共" + element.IndustryGradeList[0].CompanyCount + "家，注册资本合计" + element.IndustryGradeList[0].Amount + "万元，占比" + element.IndustryGradeList[0].percent + "%。";
                } else if (element.IndustryGradeList[0].percent + element.IndustryGradeList[1].percent >= 50) {
                    title = "全国范围内，同业资金集中在" + element.IndustryGradeList[0].Scope + "和" + element.IndustryGradeList[1].Scope + "规模的企业中，共" + (element.IndustryGradeList[0].CompanyCount + element.IndustryGradeList[1].CompanyCount) + "家，注册资本合计" + (element.IndustryGradeList[0].Amount + element.IndustryGradeList[1].Amount) + "万元，占比" + (element.IndustryGradeList[0].percent + element.IndustryGradeList[1].percent) + "%。";
                } else if (element.IndustryGradeList[0].percent + element.IndustryGradeList[1].percent + element.IndustryGradeList[2].percent >= 50) {
                    title = "全国范围内，同业资金集中在" + element.IndustryGradeList[0].Scope + "、" + element.IndustryGradeList[1].Scope + "和" + element.IndustryGradeList[2].Scope + "规模的企业中，共" + (element.IndustryGradeList[0].CompanyCount + element.IndustryGradeList[1].CompanyCount + element.IndustryGradeList[2].CompanyCount) + "家，注册资本合计" + (element.IndustryGradeList[0].Amount + element.IndustryGradeList[1].Amount + element.IndustryGradeList[2].Amount) + "万元，占比" + (element.IndustryGradeList[0].percent + element.IndustryGradeList[1].percent + element.IndustryGradeList[2].percent) + "%。";
                }

                element.IndustryGradeList.forEach(function (vo,index) {
                    if(vo.Scope == '0-10万'){
                        vo.indexnum = 0;
                    }else if(vo.Scope == '10-100万'){
                        vo.indexnum = 1;
                    }else if(vo.Scope == '100-1000万'){
                        vo.indexnum = 2;
                    }else if(vo.Scope == '1000-5000万'){
                        vo.indexnum = 3;
                    }else if(vo.Scope == '5000万以上'){
                        vo.indexnum = 4;
                    }
                });

                element.IndustryGradeList.sort(function (a, b) {
                    return a.indexnum - b.indexnum;
                });

                element.IndustryGradeList.forEach(function (ele) {
                    legendData.push(ele.Scope);
                });

                element.IndustryGradeList[dataIndex].desc = "（当前企业地位）";

                // 指定图表的配置项和数据
                var option = {
                    title:getTitleOption(title),
                    legend: {
                        x: 'center',
                        bottom: 12,
                        data: legendData,
                        itemWidth: 14
                    },
                    color: ["#F09B62", "#84DB56", "#FAD464", "#4DD8E5", "#67AEF5"],
                    series: [{
                        selectedMode: 'single',
                        selectedOffset: 0,
                        type: 'pie',
                        center: ['50%', '40%'],
                        radius: [0, '30%'],
                        label: {
                            normal: {
                                formatter: function (a) {
                                    if (a.dataIndex == dataIndex) {
                                        return a.percent + "%" + "\n" + "{a|" + "（当前企业地位）}"
                                    } else {
                                        return a.percent + "%"
                                    }
                                },
                                rich: {
                                    a: {
                                        color: "#fe5151",
                                        fontSize: 12,
                                        padding: [0, -36, 0, -36]
                                    }
                                }
                            },

                        },
                        labelLine: {
                            length: 25
                        },
                        data: element.IndustryGradeList
                    }]
                };

                // 使用刚指定的配置项和数据显示图表。
                chartOption.industryGradeCountryOption = option;
            } else {
                if (element.IndustryGradeList.length < 1) {
                    return;
                }
                var title;
                var sum = 0;
                element.IndustryGradeList.sort(function (a, b) {
                    return b.Amount - a.Amount;
                });

                var legendData = [];

                element.IndustryGradeList.forEach(function (ele) {
                    sum += ele.Amount;
                    ele.value = ele.Amount;
                    ele.name = ele.Scope;
                });

                if (sum == 0) {
                    title = '';
                    return;
                }

                element.IndustryGradeList.forEach(function (ele) {
                    var percent = ele.Amount / sum;
                    percent = (100 * percent).toFixed(2);
                    ele.percent = parseFloat(percent);
                });

                if (element.IndustryGradeList[0].percent >= 50) {
                    title = "全省（" + element.Province + "）范围内，同业资金集中在" + element.IndustryGradeList[0].Scope + "规模的企业中，共" + element.IndustryGradeList[0].CompanyCount + "家，注册资本合计" + element.IndustryGradeList[0].Amount + "万元，占比" + element.IndustryGradeList[0].percent + "%。";
                } else if (element.IndustryGradeList[0].percent + element.IndustryGradeList[1].percent >= 50) {
                    title = "全省（" + element.Province + "）范围内，同业资金集中在" + element.IndustryGradeList[0].Scope + "和" + element.IndustryGradeList[1].Scope + "规模的企业中，共" + (element.IndustryGradeList[0].CompanyCount + element.IndustryGradeList[1].CompanyCount) + "家，注册资本合计" + (element.IndustryGradeList[0].Amount + element.IndustryGradeList[1].Amount) + "万元，占比" + (element.IndustryGradeList[0].percent + element.IndustryGradeList[1].percent).toFixed(2) + "%。"
                } else if (element.IndustryGradeList[0].percent + element.IndustryGradeList[1].percent + element.IndustryGradeList[2].percent >= 50) {
                    title = "全省（" + element.Province + "）范围内，同业资金集中在" + element.IndustryGradeList[0].Scope + "和" + element.IndustryGradeList[1].Scope + "规模的企业中，共" + (element.IndustryGradeList[0].CompanyCount + element.IndustryGradeList[1].CompanyCount) + "家，注册资本合计" + (element.IndustryGradeList[0].Amount + element.IndustryGradeList[1].Amount) + "万元，占比" + (element.IndustryGradeList[0].percent + element.IndustryGradeList[0].percent + element.IndustryGradeList[2].percent) + "%。"
                }

                element.IndustryGradeList.forEach(function (vo,index) {
                    if(vo.Scope == '0-10万'){
                        vo.indexnum = 0;
                    }else if(vo.Scope == '10-100万'){
                        vo.indexnum = 1;
                    }else if(vo.Scope == '100-1000万'){
                        vo.indexnum = 2;
                    }else if(vo.Scope == '1000-5000万'){
                        vo.indexnum = 3;
                    }else if(vo.Scope == '5000万以上'){
                        vo.indexnum = 4;
                    }
                });

                element.IndustryGradeList.sort(function (a, b) {
                    return a.indexnum - b.indexnum;
                });

                element.IndustryGradeList[dataIndex].desc = "（当前企业地位）";

                element.IndustryGradeList.forEach(function (ele) {
                    legendData.push(ele.Scope);
                });

                // 指定图表的配置项和数据
                var option = {
                    title:getTitleOption(title),
                    legend: {
                        x: 'center',
                        bottom: 12,
                        data: legendData,
                        itemWidth: 14
                    },
                    color: ["#F09B62", "#84DB56", "#FAD464", "#4DD8E5", "#67AEF5"],
                    series: [{
                        selectedMode: 'single',
                        selectedOffset: 0,
                        type: 'pie',
                        center: ['50%', '40%'],
                        radius: [0, '30%'],
                        label: {
                            normal: {
                                formatter: function (a) {
                                    if (a.dataIndex == dataIndex) {
                                        return a.percent + "%" + "\n" + "{a|" + "（当前企业地位）}"
                                    } else {
                                        return a.percent + "%"
                                    }
                                },
                                rich: {
                                    a: {
                                        color: "#fe5151",
                                        fontSize: 12,
                                        padding: [0, -36, 0, -36]
                                    }
                                }
                            },

                        },
                        labelLine: {
                            length: 25
                        },
                        data: element.IndustryGradeList
                    }]
                };

                // 使用刚指定的配置项和数据显示图表。
                chartOption.industryGradeProvinceOption = option;
            }
        });
    }

    function getDateOption(list) {
        list.forEach(function (element) {
            if (element.Province == "全国") {
                if (element.StartDateList.length < 1) {
                    return;
                }
                var title = "全国范围内，该企业成立日期 <span style='color:#ffa454'>" + moment(element.StartDate*1000).format("YYYY-MM-DD") + "</span>，属于" + element.FallIn + "进入市场。"
                var xData = [];
                var yData = [];
                var startDate = moment(element.StartDate*1000).format('YYYY');
                var xPointOffset = 0;
                var month = moment(element.StartDate*1000).format('MM');
                month = parseInt(month);
                xPointOffset = parseInt((month / 12) * 100);
                var yPoint = 0;
                var startValue = 0;
                var canvasWidth = $('#industryAnalysisChart').width()-20;
                var barWith = canvasWidth;

                for (var i = 0; i < element.StartDateList.length; i++) {
                    xData.push(parseInt(element.StartDateList[i].Year));
                    yData.push(element.StartDateList[i].CompanyCount);
                    if (startDate == element.StartDateList[i].Year) {
                        if (i < element.StartDateList.length - 1) {
                            yPoint = element.StartDateList[i].CompanyCount + (element.StartDateList[i + 1].CompanyCount - element.StartDateList[i].CompanyCount) * (month / 12);
                            xPointOffset = barWith * (element.StartDateList[i + 1].CompanyCount - element.StartDateList[i].CompanyCount) * (month / 12);
                        } else {
                            yPoint = element.StartDateList[i].CompanyCount;
                        }

                        if (startDate == '2018') {
                            yPoint = element.StartDateList[i].CompanyCount;
                        }
                        startValue = i;
                    }
                }

                if (element.FallIn == "早期") {
                    startValue = startValue;
                }

                if (element.FallIn == "中期") {
                    startValue = element.StartDateList.length - (element.StartDateList.length - 1 - startValue) * 2;
                }
                if (element.FallIn == "晚期") {
                    startValue = element.StartDateList.length - (element.StartDateList.length - 1 - startValue) * 3;
                }
                if (element.StartDateList.length - 1 - startValue < 8) {
                    startValue = element.StartDateList.length - 9
                }

                if (startValue < 0) {
                    startValue = 0;
                }

                barWith = canvasWidth / (element.StartDateList.length - 1 - startValue);

                for (var i = 0; i < element.StartDateList.length; i++) {
                    if (startDate == element.StartDateList[i].Year) {
                        if (i < element.StartDateList.length - 1) {
                            xPointOffset = barWith * (month / 12);
                        }
                    }
                }

                if (startDate == '2018') {
                    xPointOffset = 0;
                }
                
                // 指定图表的配置项和数据
                var option = {
                    title:getTitleOption(title),
                    grid: {
                        top: 28,
                        right: 10,
                        bottom: 60,
                        left: 10
                    },
                    color: ["#67aef5"],
                    dataZoom: [
                        {
                            type: 'inside',
                            xAxisIndex: [0],
                            startValue: startValue,
                            endValue: element.StartDateList.length - 1,
                            minValueSpan: 7,
                            maxValueSpan: 7
                        }
                    ],
                    xAxis: {
                        type: 'category',
                        data: xData,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                width: 1,
                                color: ['#eee'],
                                type: "solid"
                            }
                        },
                        axisLabel: {
                            show: true,
                            color: "#333333"
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
                    label: {
                        show: true,
                        formatter: function (data) {
                            if (data.data > 10000) {
                                return (data.data / 10000).toFixed(1) + "W";
                            }
                            return data.data;
                        }
                    },
                    series: [{
                        name: 'date',
                        type: 'line',
                        symbolSize: 8,
                        symbol: 'circle',
                        markPoint: {
                            itemStyle: {
                                color: "#ffa454"
                            },
                            data: [{
                                coord: [startDate, yPoint],
                                symbol: 'circle',
                                symbolSize: 8,
                                symbolOffset: [xPointOffset, 0],
                                label: {
                                    show: false
                                }
                            }]
                        },
                        data: yData
                    }]
                };

                // 使用刚指定的配置项和数据显示图表。
                chartOption.dateCountryChartOption = option;
            } else {
                if (element.StartDateList.length < 1) {
                    return;
                }
                var title = "本省（" + element.Province + "）范围内，该企业成立日期 <span style='color:#ffa454'>" + moment(element.StartDate*1000).format("YYYY-MM-DD") + "</span>，属于" + element.FallIn + "进入市场。";
                var xData = [];
                var yData = [];
                var startDate = moment(element.StartDate*1000).format('YYYY');
                var xPointOffset = 0;
                var month = moment(element.StartDate*1000).format('MM');
                month = parseInt(month);
                xPointOffset = parseInt((month / 12) * 100);
                var yPoint = 0;
                var startValue = 0;
                var canvasWidth = $('#industryAnalysisChart').width()-20;
                var barWith = canvasWidth;

                for (var i = 0; i < element.StartDateList.length; i++) {
                    xData.push(parseInt(element.StartDateList[i].Year));
                    yData.push(element.StartDateList[i].CompanyCount);
                    if (startDate == element.StartDateList[i].Year) {
                        if (i < element.StartDateList.length - 1) {
                            yPoint = element.StartDateList[i].CompanyCount + (element.StartDateList[i + 1].CompanyCount - element.StartDateList[i].CompanyCount) * (month / 12);
                            xPointOffset = barWith * (element.StartDateList[i + 1].CompanyCount - element.StartDateList[i].CompanyCount) * (month / 12);
                        } else {
                            yPoint = element.StartDateList[i].CompanyCount;
                        }

                        if (startDate == '2018') {
                            yPoint = element.StartDateList[i].CompanyCount;
                        }
                        startValue = i;
                    }
                }

                if (element.FallIn == "早期") {
                    startValue = startValue;
                }

                if (element.FallIn == "中期") {
                    startValue = element.StartDateList.length - (element.StartDateList.length - 1 - startValue) * 2;
                }
                if (element.FallIn == "晚期") {
                    startValue = element.StartDateList.length - (element.StartDateList.length - 1 - startValue) * 3;
                }
                if (element.StartDateList.length - 1 - startValue < 8) {
                    startValue = element.StartDateList.length - 9
                }

                if (startValue < 0) {
                    startValue = 0;
                }

                barWith = canvasWidth / (element.StartDateList.length - 1 - startValue);

                for (var i = 0; i < element.StartDateList.length; i++) {
                    if (startDate == element.StartDateList[i].Year) {
                        if (i < element.StartDateList.length - 1) {
                            xPointOffset = barWith * (month / 12);
                        }
                    }
                }

                if (startDate == '2018') {
                    xPointOffset = 0;
                }

                // 指定图表的配置项和数据
                var option = {
                    title:getTitleOption(title),
                    grid: {
                        top: 28,
                        right: 10,
                        bottom: 45,
                        left: 10
                    },
                    color: ["#67aef5"],
                    dataZoom: [
                        {
                            type: 'inside',
                            xAxisIndex: [0],
                            startValue: startValue,
                            endValue: element.StartDateList.length - 1,
                            minValueSpan: 7,
                            maxValueSpan: 7
                        }
                    ],
                    xAxis: {
                        type: 'category',
                        data: xData,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                width: 1,
                                color: ['#eee'],
                                type: "solid"
                            }
                        },
                        axisLabel: {
                            show: true,
                            color: "#333333"
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
                    label: {
                        show: true,
                        formatter: function (data) {
                            if (data.data > 10000) {
                                return (data.data / 10000).toFixed(1) + "W";
                            }
                            return data.data;
                        }
                    },
                    series: [{
                        name: 'date',
                        type: 'line',
                        symbolSize: 8,
                        symbol: 'circle',
                        markPoint: {
                            itemStyle: {
                                color: "#ffa454"
                            },
                            data: [{
                                coord: [startDate, yPoint],
                                symbol: 'circle',
                                symbolSize: 8,
                                symbolOffset: [xPointOffset, 0],
                                label: {
                                    show: false
                                }
                            }]
                        },
                        data: yData
                    }]
                };

                // 使用刚指定的配置项和数据显示图表。
                chartOption.dateProvinceChart = option;

            }
        });
    }

    function getAreaMapOption(mapData) {
        var title = "全国范围内，同业公司主要集中在" + mapData.ProvinceDesc + "，共" + mapData.CompanyCount + "家，约占" + mapData.Percent + "。";

        var mydata = [];
        var visualData = [];

        mapData.LegendList.forEach(function (ele) {
            if (ele.Max) {
                visualData.push({
                    gt: ele.Min,
                    lte: ele.Max,
                    label: ele.Label
                });
            } else {
                visualData.push({
                    gt: ele.Min,
                    label: ele.Label
                });
            }
        });


        mapData.ScopeList.forEach(function (ele) {
            mydata.push({
                name: ele.Province,
                value: ele.CompanyCount
            })
        });

        // 指定图表的配置项和数据
        var option = {
            title:getTitleOption(title),
            //左侧小导航图标
            visualMap: {
                show: true,
                type: 'piecewise',
                bottom: 20,
                left: 13,
                itemWidth: 14,
                color: ['#128BED', '#47A9F1', '#A5D8F6', '#C4EDF9', '#D9FAFD'],
                pieces: visualData
            },

            series: [{
                name: '数据',
                type: 'map',
                itemStyle: {
                    borderColor: '#f3f3f3',
                },
                mapType: 'china',
                roam: false,
                top: 0,
                data: mydata  //数据
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        chartOption.areaMapOption = option;
    }

    function getCapiMapOption(mapData) {
        $("#capi-chart-wrap").css("display", "block");
        var title = "同业资金主要地域分布在" + mapData.ProvinceDesc + "，达" + mapData.Percent + "；该企业所在省份" + (mapData.SelfProvinceDesc || "") + "共" + mapData.TotalAmt + "，占全国总金额达" + mapData.SelfPercent + "。";

        var mydata = [];
        var mydata2 = [];
        var max = mapData.RegistAmtList[0].TotalAmount;
        var min = mapData.RegistAmtList[0].TotalAmount;

        mapData.RegistAmtList.forEach(function (ele) {
            mydata.push({
                name: ele.ProvinceDesc,
                value: ele.TotalAmount
            })

            if (mapData.SelfProvinceDesc == ele.ProvinceDesc) {
                mydata2.push({
                    name: ele.ProvinceDesc,
                    value: ele.TotalAmount
                })
            }

            if (ele.TotalAmount > max) {
                max = ele.TotalAmount;
            }

            if (ele.TotalAmount < min) {
                min = ele.TotalAmount;
            }
        });

        // 指定图表的配置项和数据
        var option = {
            title:getTitleOption(title),
            color: ['#ffa454'],
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['企业所处省份'],
                bottom: 30,
                left: 13,
                itemWidth: 14
            },
            //左侧小导航图标
            visualMap: {
                show: true,
                type: 'continuous',
                text: ['多', '少'],
                inverse: true,
                color: ['#128BED', '#D9FAFD'],
                bottom: 55,
                min: min,
                max: max,
                orient: 'horizontal',
                left: 13,
            },
            series: [{
                name: '数据',
                type: 'map',
                mapType: 'china',
                roam: false,
                itemStyle: {
                    borderWidth: 0
                },
                top: 0,
                showLegendSymbol: false,
                label: {
                    show: true,
                    fontSize: 8,
                    color: "#8D4A1C"
                },
                data: mydata  //数据
            },
            {
                name: '企业所处省份',
                type: 'map',
                mapType: 'china',
                roam: false,
                data: mydata2  //数据
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        chartOption.capiMapOption = option;
    }
}

function financialAnalysis(keyno){
    var financialDesc;
    var financialAnalysisChart;
    var hasInfo = false;
    var option;
    var chartOption = {
        operationRevenueOption:'',
        netMarginOption:'',
        totalAssetsOption:'',
        netAssetsOption:'',
        netProfitOption:'',
        grossProfitOption:'',
    }
    
    $.ajax({
        url:'/company_financialanalysis',
        dataType:'json',
        data:{keyno:keyno},
        success:function(rs){
            if(rs.Status==200){
                financialDesc = rs.Result.financialDesc;
                processResult(rs.Result);
            }else{
                noData();
            }
        }
    });
    function processResult(data) {
        if (data.OperationRevenueList.DataList) {
            if (data.OperationRevenueList.DataList.length > 0) {
                hasInfo = true;
                getOperationRevenueOption(data.OperationRevenueList.DataList,"营业区间：" + data.OperationRevenueList.Period + "")
            }
        }

        if (data.NetMarginList.DataList) {
            if (data.NetMarginList.DataList.length > 0) {
                hasInfo = true;
                getNetMarginOption(data.NetMarginList.DataList,"利润区间：" + data.NetMarginList.Period + "")
            }
        }

        if (data.TotalAssetsList.DataList) {
            if (data.TotalAssetsList.DataList.length > 0) {
                hasInfo = true;
                getTotalAssetsOption(data.TotalAssetsList.DataList,"资产区间：" + data.TotalAssetsList.Period + "")
            }
        }

        if (data.NetAssetsList.DataList) {
            if (data.NetAssetsList.DataList.length > 0) {
                hasInfo = true;
                getNetAssetsOption(data.NetAssetsList.DataList,"资产区间：" + data.NetAssetsList.Period + "")
            }
        }

        if (data.NetProfitRateList.DataList) {
            if (data.NetProfitRateList.DataList.length > 0) {
                hasInfo = true;
                getNetProfitOption(data.NetProfitRateList.DataList,"利率区间：" + data.NetProfitRateList.Period + "")
            }
        }

        if (data.GrossProfitRateList.DataList) {
            if (data.GrossProfitRateList.DataList.length > 0) {
                hasInfo = true;
                getGrossProfitOption(data.GrossProfitRateList.DataList,"利率区间：" + data.GrossProfitRateList.Period + "")
            }
        }
        if (hasInfo) {
            financialAnalysisChart = echarts4.init(document.getElementById('financialAnalysisChart'));
            $('#financialAnalysisTable tr').on('mouseenter',function(e){
                var dataOption = $(this).attr('data-option');
                financialAnalysisChart.clear();
                if(chartOption[dataOption]){
                    financialAnalysisChart.setOption(chartOption[dataOption]); 
                    $('#financialAnalysisTitle').html(chartOption[dataOption].title.text);
                    $('#financialAnalysisTitle').show();
                    $('#financialAnalysisNodata').hide();
                }else{
                    $('#financialAnalysisTitle').hide();
                    noData();
                }
                $(this).addClass('active');
                $(this).siblings().removeClass('active');
            });
            $("#financialAnalysisTable tr").eq(0).trigger("mouseenter");
        } else {
            noData();
        }
    }

    function noData(){
        $('#financialAnalysisNodata').show();
        $(".financialAnalysis").hide();
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

    // 绘制营业收入图表
    function getOperationRevenueOption(list,title) {
        var xData = [];
        var yData = [];
        list.forEach(function(element) {
            xData.push(element.Year);
            yData.push(element.Value);
        });

        // 指定图表的配置项和数据
        var option = {
            title:getTitleOption(title),
            grid: {
                top: 10,
                right: 10,
                bottom: 20,
                left: 10
            },
            xAxis: {
                data: xData,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: ['#eee'],
                        type: "dashed"
                    }
                },
                axisLabel: {
                    show: true,
                    interval:0,  
                    color: "#333333"
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
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    formatter: function (value) {
                        // if (value == 0) {
                        //     return value;
                        // }
                    },
                    color: "#666666"
                },
                splitLine: {
                    show: false
                }
            },
            series: [{
                name: '营业收入',
                type: 'bar',
                barCategoryGap: 5,
                barMaxWidth: 20,
                itemStyle: {
                    normal: {
                        color: '#128bed',
                    }
                },
                data: yData
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        chartOption.operationRevenueOption = option;
    }

    // 绘制净利润图表
    function getNetMarginOption(list,title) {
        var xData = [];
        var yData = [];

        list.forEach(function(element){
            xData.push(element.Year);
            yData.push(element.Value);
        });

        // 指定图表的配置项和数据
        var option = {
            title:getTitleOption(title),
            grid: {
                top: 10,
                right: 10,
                bottom: 20,
                left: 10
            },
            xAxis: {
                data: xData,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: ['#eee'],
                        type: "dashed"
                    }
                },
                axisLabel: {
                    show: true,
                    interval:0,  
                    color: "#333333"
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
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    formatter: function (value) {
                        // if (value == 0) {
                        //     return value;
                        // }
                    },
                    color: "#666666"
                },
                splitLine: {
                    show: false
                }
            },
            series: [{
                name: '净利润',
                type: 'bar',
                barCategoryGap: 5,
                barMaxWidth: 20,
                itemStyle: {
                    normal: {
                        color: '#128bed',
                    }
                },
                data: yData
            }]
        };

        chartOption.netMarginOption = option;
    }

    // 绘制总资产图表
    function getTotalAssetsOption(list,title) {
        var xData = [];
        var yData = [];

        list.forEach(function(element) {
            xData.push(element.Year);
            yData.push(element.Value);
        });

        // 指定图表的配置项和数据
        var option = {
            title:getTitleOption(title),
            grid: {
                top: 10,
                right: 10,
                bottom: 20,
                left: 10
            },
            xAxis: {
                data: xData,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: ['#eee'],
                        type: "dashed"
                    }
                },
                axisLabel: {
                    show: true,
                    interval:0,  
                    color: "#333333"
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
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    formatter: function (value) {
                        // if (value == 0) {
                        //     return value;
                        // }
                    },
                    color: "#666666"
                },
                splitLine: {
                    show: false
                }
            },
            series: [{
                name: '净利润',
                type: 'bar',
                barCategoryGap: 5,
                barMaxWidth: 20,
                itemStyle: {
                    normal: {
                        color: '#128bed',
                    }
                },
                data: yData
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        chartOption.totalAssetsOption = option;
    }

    // 绘制净资产图表
    function getNetAssetsOption(list,title) {
        var xData = [];
        var yData = [];

        list.forEach(function(element) {
            xData.push(element.Year);
            yData.push(element.Value);
        });

        // 指定图表的配置项和数据
        var option = {
            title:getTitleOption(title),
            grid: {
                top: 10,
                right: 10,
                bottom: 20,
                left: 10
            },
            xAxis: {
                data: xData,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: ['#eee'],
                        type: "dashed"
                    }
                },
                axisLabel: {
                    show: true,
                    interval:0,  
                    color: "#333333"
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
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    formatter: function (value) {
                        // if (value == 0) {
                        //     return value;
                        // }
                    },
                    color: "#666666"
                },
                splitLine: {
                    show: false
                }
            },
            series: [{
                name: '净利润',
                type: 'bar',
                barCategoryGap: 5,
                barMaxWidth: 20,
                itemStyle: {
                    normal: {
                        color: '#128bed',
                    }
                },
                data: yData
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        chartOption.netAssetsOption = option;
    }

    // 绘制净利率图表
    function getNetProfitOption(list,title) {
        var xData = [];
        var yData = [];

        list.forEach(function(element) {
            xData.push(element.Year);
            yData.push(element.Value);
        });

        // 指定图表的配置项和数据
        var option = {
            title:getTitleOption(title),
            grid: {
                top: 10,
                right: 10,
                bottom: 20,
                left: 10
            },
            xAxis: {
                data: xData,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: ['#eee'],
                        type: "dashed"
                    }
                },
                axisLabel: {
                    show: true,
                    interval:0,  
                    color: "#333333"
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
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    formatter: function (value) {
                        // if (value == 0) {
                        //     return value;
                        // }
                    },
                    color: "#666666"
                },
                splitLine: {
                    show: false
                }
            },
            series: [{
                name: '净利润',
                type: 'bar',
                barCategoryGap: 5,
                barMaxWidth: 20,
                itemStyle: {
                    normal: {
                        color: '#128bed',
                    }
                },
                data: yData
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        chartOption.netProfitOption = option
    }

    // 绘制毛利率图表
    function getGrossProfitOption(list,title) {
        var xData = [];
        var yData = [];

        list.forEach(function(element){
            xData.push(element.Year);
            yData.push(element.Value);
        });

        // 指定图表的配置项和数据
        var option = {
            title:getTitleOption(title),
            grid: {
                top: 10,
                right: 10,
                bottom: 20,
                left: 10
            },
            xAxis: {
                data: xData,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: ['#eee'],
                        type: "dashed"
                    }
                },
                axisLabel: {
                    show: true,
                    interval:0,  
                    color: "#333333"
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
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    formatter: function (value) {
                        // if (value == 0) {
                        //     return value;
                        // }
                    },
                    color: "#666666"
                },
                splitLine: {
                    show: false
                }
            },
            series: [{
                name: '净利润',
                type: 'bar',
                barCategoryGap: 5,
                barMaxWidth: 20,
                itemStyle: {
                    normal: {
                        color: '#128bed',
                    }
                },
                data: yData
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        chartOption.grossProfitOption = option;
    }
    
}