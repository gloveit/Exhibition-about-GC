//顶部圆弧
var gauge=echarts.init(document.getElementById("gauge"));
var option = {
    tooltip : {
        formatter: "{a} <br/>{b} : {c}%"
    },
    series : [
        {
        name:'业务指标',
        type:'gauge',
        startAngle: 180,
        endAngle: 0,
        min:0,
        max:100,
        center : ['50%', '95%'],    // 默认全局居中
        radius : 90,
        min:0, //最小刻度值
        max:100,
        splitNumber:1, //刻度线分段
        axisLine: { 
            show:false,           // 坐标轴线
            lineStyle: {       // 属性lineStyle控制线条样式
                width:20,
                // color:[[0.2, '#ff6c31'],[0.3, '#ff8532'],[0.2, '#ffa332'],[0.2, '#ffc033'], [0.1, '#ffda33'],[1, '#fff232']]
                color:[[0.2, '#ff6c31'],[0.3, '#ff6c31'],[0.3, '#ffa332'],[0.5, '#ffa332'], [0.9, '#ffda33'],[1, '#fff232']]

            } 
        },
        pointer:{ //不显示指针
            show:false
        },
        axisTick: { 
            show:false,           // 坐标轴小标记
            splitNumber:0,   // 每份split细分多少段
            length :0,        // 属性length控制线长
        },
       axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
           textStyle: { 
               show:false,      // 其余属性默认使用全局文本样式，详见TEXTSTYLE
               color: '#fff',
               fontSize: 0,
                fontWeight: 'bolder'
           }
       },
        // title : {
        //     show : true,
        //     offsetCenter: [0, '-60%'],       // x, y，单位px
        //     textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
        //         color: '#fff',
        //         fontSize:0
        //     }
        // },
        detail : {
            show : true,
            // backgroundColor: 'rgba(0,0,0,0)',
            borderWidth: 0,
            // borderColor: '#ccc',
            width: 100,
            height: 40,
            color:'#ff6c31',
            offsetCenter: [-5, -20],       // x, y，单位px
            formatter:'{value}%',
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontSize :16,
                
            }
        },
        data:[{value: 99.04}]
    }
]
};
gauge.setOption(option)

//顶部折线图
var line=echarts.init(document.getElementById("line"));
    var option1 = {

    xAxis: {
        // type: 'category',
        data:[],
        // data: ['5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7',
        //        '5.8', '5.9', '5.10', '5.11', '5.12', '5.13', '5.14',
        //        '5.15', '5.16', '5.17', '5.18', '5.19', '5.20', '5.21',
        //        '5.22', '5.23', '5.24', '5.25', '5.26', '5.27', '5.28',
        //        '5.29','5.30','5.31'
        //     ],
        axisTick: {
                alignWithLabel: true
           },
        nameTextStyle:{
            color:'red',
            fontSize:14
        },
        axisLabel : {
            formatter: '{value}',
            textStyle: {
                color: '#fff',
                fontSize:14
            }
        },
        axisLine:{
            lineStyle:{
                color:'#FFf',
             }
        }
    },
    yAxis: {
        // min:80,
        // max:100,
        type:'value',
        axisLabel : {
            textStyle: {
                color: '#fff',
                fontSize:14
            }
        },
        axisLine:{
            lineStyle:{
                color:'#fff',
             }
        },
        splitLine:{ //设置坐标轴在grid中的分割线的样式
            show:true,
            interval:2,
            lineStyle:{ //设置y轴线颜色和样式
                // color:['#f00','#00d'],  
                // type:'dashed',
                type:'dotted'
            }
        }
    },
    series: [{
        name:'抄表率',
        // data: [82, 85, 87, 94, 95, 96, 98,
        //        92, 88, 91, 94, 95, 98, 99,
        //        90, 86, 84, 83, 86, 88, 90,
        //        92, 94, 90, 87, 85, 90, 92,
        //        93,96,98
        //     ],
        type: 'line',
        lineStyle:{
            color:'#ccc'
        }
    }],
    grid:{
        top:'6%',
        bottom:'22%',
        left:'30%,',
        right:'0%'
    },
    tooltip: {
        formatter:'{a}<br/>{b}: {c}%'
    },
};
line.setOption(option1)

//每日定时自动刷新页面
var clear_updatetime;
function update_time(){
    var new_time=new Date();
    var new_hour=new_time.getHours();
    var new_minutes=new_time.getMinutes();
    var time=new_hour+":"+new_minutes;
    // console.log(time);
    if(time=="8:00"){
        document.location.reload();
        clearInterval(clear_updatetime);
    }
}
clear_updatetime=setInterval(update_time,60000)
// var new_time=new Date();
// var new_hour=new_time.getHours();
// var testtime=new_time.getMinutes();
// var nn=new_hour+testtime;
// if(nn===115){
//     document.location.reload();
// }
// if()
$(function(){
    //截止统计时间
    var date=new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();
    if(month<11){
        month="0"+month;
    }
    if(day<11){
        day="0"+day;
    }
    $("#newtime").html(year+"-"+month+"-"+day+" "+"00:00:00")

//顶部请求 抄表率数据
var ajax_url="";
$.ajax({
    url:ajax_url+"/nbiot/display/v1/totalReadInfo",
    type:"get",
    async:false,
    data:{},
    dataType:"json",
    success:function(data){
        // console.log(data);
        if(data){
            $("#company_count").html(data.data.companyCount);
            $("#deliver_count").html(data.data.deliverNumber);
            $("#sleep_count").html(data.data.sleepMeter);
            $("#open_count").html(data.data.openArchives);
            $("#real_count").html(data.data.realRead);
            // console.log(data.data.realRead);
        }
    }
    
})
//顶部请求30日抄表率折线图数据
var xvalue=[];
var yvalue=[];
	$.ajax({
            url:ajax_url+"/nbiot/display/v1/thirtyDailyReadRate",
            async:false,
            type:"get",
            data:{},
			// data:{'params':'fromjsonp'},
            dataType:"json",
            // jsonp:'callback',
            // jsonpCallback:'getResult',
			success:function(data){
				// console.log(data.data.length);
				if(data){
					for(var i=0;i<data.data.length;i++){
                        xvalue.unshift(data.data[i].readDate);
                        yvalue.unshift(data.data[i].readRate);
                        // console.log(xvalue[data.data.length-1])
					}
                }
                line.setOption({
                    xAxis:{
                        data:xvalue
                    },
                    series:[{
                        data:yvalue
                    }]
                })
			}
        })

//抄表率TOP排名
$.ajax({
    url:ajax_url+"/nbiot/display/v1/topCompany/readRate",
    async:false,
    type:"get",
    dataType:"json",
    data:{},
    success:function(data){
        // console.log(data)
        if(data){
            var cbltop=$("#cbltop").children();
            for(var i=0;i<data.data.length;i++){
                cbltop.eq(i).children("ul").children("li").eq(1).html(data.data[i].companyName)
                cbltop.eq(i).children("ul").children("li").eq(2).children("span").eq(0).html(data.data[i].value)
            }
            $('#cbl').liMarquee({
                direction: 'up',
                scrollamount: 10
            });
         }
    }
})
//发货总量TOP排名
$.ajax({
    url:ajax_url+"/nbiot/display/v1/topCompany/deliverNumber",
    async:false,
    type:"get",
    dataType:"json",
    data:{},
    success:function(data){
        // console.log(data)
        if(data){
            var cbltop=$("#fhzltop").children();
            for(var i=0;i<data.data.length;i++){
                cbltop.eq(i).children("ul").children("li").eq(1).html(data.data[i].companyName)
                cbltop.eq(i).children("ul").children("li").eq(2).children("span").eq(0).html(data.data[i].value)
            }
            $('#fhl').liMarquee({
                direction: 'up',
                scrollamount: 10
            });
         }
    }
})
//开户总量TOP排名
$.ajax({
    url:ajax_url+"/nbiot/display/v1/topCompany/openArchives",
    async:false,
    type:"get",
    dataType:"json",
    data:{},
    success:function(data){
        // console.log(data)
        if(data){
            var cbltop=$("#khzltop").children();
            for(var i=0;i<data.data.length;i++){
                cbltop.eq(i).children("ul").children("li").eq(1).html(data.data[i].companyName)
                cbltop.eq(i).children("ul").children("li").eq(2).children("span").eq(0).html(data.data[i].value)
            }
            $('#khl').liMarquee({
                direction: 'up',
                scrollamount: 10
            }); 
         }
    }
})
//集团客户省会客户公司列表
$.ajax({
    url:ajax_url+"/nbiot/display/v1/companyList/1",
    type:"get",
    dataType:"json",
    data:{},
    success:function(data){
        if(data){
            
        }
    }
});

//集团客户名单
var code=[]; //所有集团公司的code字段
var jt_ycbscode=[]; //存放对应code字段公司的已抄表数量
var jt_zkhscode=[]; //存放对应code字段公司的总开户数量
var jt_xmbzcode=[]; //存放对应code字段公司的休眠表数量
var jt_zfhlcode=[];  //存放对应code字段公司的总发货数量
var jt_thirtycbl=[]; //存放对应code字段公司的30日抄表率
// var jt_cblxvalue=[]; //存放对应code字段公司的30日抄表率x轴数据
// var jt_cbldatavalue=[]; //存放对应code字段公司的30日抄表率series数据
$.ajax({
    url:ajax_url+"/nbiot/display/v1/companyList/1",
    type:"get",
    async:false,
    dataType:"json",
    data:{},
    success:function(data){
        // console.log(data);
        if(data){
            var jdkh_acount=$("#jtkh").children();
            for(var i=0;i<data.data.length;i++){
                // jdkh_acount.eq(i).children("ul").children("li").eq(0).children("span").html(data.data[i].name);
                code[i]=data.data[i].code;
                $(".f_dz_m_n_u").append("<li class='f_dz_m_n_li'><ul class='u'><li class='f_dz_m_n_u_li'><span class='f_dz_m_n_u_li_f1'>"+data.data[i].name+"</span></li><li class='f_dz_m_n_u_li02'><span class='f_dz_m_n_u_li02_f'>"+'昨日抄表率'+"</span><span class='f_dz_m_n_u_li02_f02'></span></li></ul></li>")
            }
            // $(".f_dz_m_n_u").append("<li class='f_dz_m_n_li'><ul class='u'><li class='f_dz_m_n_u_li'><span class='f_dz_m_n_u_li_f1'>"+data.data.name+"</span></li><li class='f_dz_m_n_u_li02'><span class='f_dz_m_n_u_li02_f'>"+'昨日抄表率'+"</span><span class='f_dz_m_n_u_li02_f02'></span></li></ul></li>")
         }
    }
});
//集团客户详情
for(var i=0;i<code.length;i++){
$.ajax({
    url:ajax_url+"/nbiot/display/v1/companyInfo/"+code[i],
    type:"get",
    async:false,
    dataType:"json",
    data:{},
    success:function(data){
        // console.log(data);
        if(data){
            $("#jtkh").children().eq(i).children("ul").children("li:last-child").children("span:last-child").html(data.data.readRateList[i].readRate+"%")
            jt_ycbscode[i]=data.data.realRead;
            jt_zkhscode[i]=data.data.openArchives;
            jt_xmbzcode[i]=data.data.sleepMeter;
            jt_zfhlcode[i]=data.data.deliverNumber;

            jt_thirtycbl[i]=data.data.readRateList;
        }
     }
    });
}
//初始化集团客户名单NB表数据
$("#ycbs").html(jt_ycbscode[0])
$("#zkhs").html(jt_zkhscode[0])
$("#xmbs").html(jt_xmbzcode[0])
$("#zfhl").html(jt_zfhlcode[0])
//省会客户名单
var shcode=[];
$.ajax({
    url:ajax_url+"/nbiot/display/v1/companyList/2",
    type:"get",
    async:false,
    dataType:"json",
    data:{},
    success:function(data){
        // console.log(data);
        if(data){
            for(var i=0;i<data.data.length;i++){
                shcode[i]=data.data[i].code;
                $(".f_dz_m_n_u02").append("<li class='f_dz_m_n_li'><ul class='u'><li class='f_dz_m_n_u_li'><span class='f_dz_m_n_u_li_f1'>"+data.data[i].name+"</span></li><li class='f_dz_m_n_u_li02'><span class='f_dz_m_n_u_li02_f'>"+'昨日抄表率'+"</span><span class='f_dz_m_n_u_li02_f02'></span></li></ul></li>")

            }
            // $(".f_dz_m_n_u").append("<li class='f_dz_m_n_li'><ul class='u'><li class='f_dz_m_n_u_li'><span class='f_dz_m_n_u_li_f1'>"+data.data.name+"</span></li><li class='f_dz_m_n_u_li02'><span class='f_dz_m_n_u_li02_f'>"+'昨日抄表率'+"</span><span class='f_dz_m_n_u_li02_f02'></span></li></ul></li>")
         }
    }
});
//省会公司详情
var sh_ycbscode=[]; //存放对应code字段公司的已抄表数量
var sh_zkhscode=[]; //存放对应code字段公司的总开户数量
var sh_xmbzcode=[]; //存放对应code字段公司的休眠表数量
var sh_zfhlcode=[];  //存放对应code字段公司的总发货数量
var sh_thirtycbl=[]; //存放对应code字段公司的30日抄表率
// var sh_cblxvalue=[]; //存放对应code字段公司的30日抄表率x轴数据
// var sh_cbldatavalue=[]; //存放对应code字段公司的30日抄表率series数据
for(var i=0;i<shcode.length;i++){
    $.ajax({
        url:ajax_url+"/nbiot/display/v1/companyInfo/"+shcode[i],
        type:"get",
        async:false,
        dataType:"json",
        data:{},
        success:function(data){
            // console.log(data);
            if(data){
                $("#shkh").children().eq(i).children("ul").children("li:last-child").children("span:last-child").html(data.data.readRateList[i].readRate+"%")
                sh_ycbscode[i]=data.data.realRead;
                sh_zkhscode[i]=data.data.openArchives;
                sh_xmbzcode[i]=data.data.sleepMeter;
                sh_zfhlcode[i]=data.data.deliverNumber;
    
                sh_thirtycbl[i]=data.data.readRateList;
            }
         }
        });
    }
//初始化底部圆环
var jtkh_pie_legend=jt_thirtycbl[0][0].readRate;
var jtkh_pie_ycbs=jt_ycbscode[0];
var jtkh_pie_zkhs=jt_zkhscode[0];
var yuanhuan=echarts.init(document.getElementById("f_dn_d_left"));
    var option2 = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        show:false,
        orient: 'vertical',
        x: 'left',
        icon:'circle',
        itemGap:20,
        left:'65%',
        top:'24%',
        backgroundColor:'#062a40',
        textStyle:{
          fontSize:24,
          color:'#ccc',  
        },
    },
    graphic:{  //定义圆环副标题文本样式
        type:'text',
        left:'27%',
        top:'30%',
        style:{
            text:jtkh_pie_legend+'\n抄表率',
            textAlign:'center',
            fill:'#fff',
            width:30,
            height:30,
            // fontSize:10
        }
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['70%', '100%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '14',
                        // fontWeight: 'bold',
                        color:'#ccc'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            center:['30%','50%'],
            data:[
                {value:jtkh_pie_ycbs, name:'已抄表数量',itemStyle:{color:"#7ae45d"}},
                {value:jtkh_pie_zkhs, name:'休眠表数量',itemStyle:{color:"#08f8d3"}},
            ]
        }
    ]
};
yuanhuan.setOption(option2);
//初始化底部折线图
var jtkh_piex_xAxis=[]; //x轴
var jtkh_piex_series=[]; //data数据
for(var i=0;i<jt_thirtycbl[0].length;i++){
    jtkh_piex_xAxis.unshift(jt_thirtycbl[0][i].readDate);
    jtkh_piex_series.unshift(jt_thirtycbl[0][i].readRate);
}
var piex=echarts.init(document.getElementById("piex"));
    var zhexian_option= {
    xAxis: {
        data:jtkh_piex_xAxis,
        axisTick: {
                alignWithLabel: true
           },
        axisLabel : {
            formatter: '{value}',
            textStyle: {
                color: '#fff',
                fontSize:12
            }
        },
        axisLine:{
            lineStyle:{
                color:'#FFf',
             }
        }
    },
    yAxis: {
        type:"value",
        axisLabel : {
            formatter: '{value}',
            textStyle: {
                color: '#fff',
                fontSize:14
            }
        },
        axisLine:{
            lineStyle:{
                color:'#FFf',
             }
        },
        splitLine:{ //设置坐标轴在grid中的分割线的样式
            show:true,
            interval:2,
            lineStyle:{ //设置y轴线颜色和样式
                // color:['#f00','#00d'],  
                // type:'dashed',
                type:'dotted'
            }
        }
    },
    series: [{
        name:'抄表率',
        data:jtkh_piex_series,
        type: 'line',
        lineStyle:{
            color:'#ccc'
        }
    }],
    grid:{
        top:'8%',
        bottom:'25%',
        right:'0%',
        left:'5%'
    },
};
piex.setOption(zhexian_option);

    //底部三级联动滚动
    $(".f_dm_u").children().eq(0).addClass("back")
        var i=-1; //第一层动画初始
        var s=-1; //第二层动画初始
        var l=-1; //第三层动画初始

        var first; //清除第一次循环播放
        var second; //清除第二次循环播放
        var last;  //清除第三次循环播放
        //第一次获取左边部元素
        var child=$(".f_dz_m_n_u").children();

        //第一层动画
        function anima(){
            child.eq(i).find(".f_dz_m_n_u_li_f1").addClass("font_Color");
            $(".jtkh").animate({scrollTop:"65px"},10000,function(){
                $(".f_dz_m_n_u").children("li:first-child").find(".f_dz_m_n_u_li_f1").removeClass("font_Color");
                $(".f_dz_m_n_u").append($(".f_dz_m_n_u").children("li:first-child"));
                }); 
        }
        //第二层动画
        function anima02(){
            $(".f_dz_m_n_u02").children("li:first-child").find(".f_dz_m_n_u_li_f1").addClass("font_Color");
            $(".shkh").animate({scrollTop:"65px"},10000,function(){
                $(".f_dz_m_n_u02").children("li:first-child").find(".f_dz_m_n_u_li_f1").removeClass("font_Color");
                $(".f_dz_m_n_u02").append($(".f_dz_m_n_u02").children("li:first-child"))
                }); 
        }
        //第二层动画开始
        function cplay(){
            s++;
            if(s<shcode.length){
                $("#ycbs").html(sh_ycbscode[s]);
                $("#zkhs").html(sh_zkhscode[s]);
                $("#xmbs").html(sh_xmbzcode[s]);
                $("#zfhl").html(sh_zfhlcode[s]);
                var shkh_pie_legend_f=sh_thirtycbl[s][0].readRate;
                var shkh_pie_ycbs_f=jt_ycbscode[s];
                var shkh_pie_zkhs_f=jt_zkhscode[s];
                yuanhuan.clear();
                yuanhuan.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        show:false,
                        orient: 'vertical',
                        x: 'left',
                        icon:'circle',
                        itemGap:20,
                        left:'65%',
                        top:'24%',
                        backgroundColor:'#062a40',
                        textStyle:{
                          fontSize:24,
                          color:'#ccc',  
                        },
                    },
                    graphic:{  //定义圆环副标题文本样式
                        type:'text',
                        left:'27%',
                        top:'30%',
                        style:{
                            text:shkh_pie_legend_f+'\n抄表率',
                            textAlign:'center',
                            fill:'#fff',
                            width:30,
                            height:30,
                            // fontSize:10
                        }
                    },
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['70%', '100%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '14',
                                        // fontWeight: 'bold',
                                        color:'#ccc'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            center:['30%','50%'],
                            data:[
                                {value:shkh_pie_ycbs_f, name:'已抄表数量',itemStyle:{color:"#7ae45d"}},
                                {value:shkh_pie_zkhs_f, name:'休眠表数量',itemStyle:{color:"#08f8d3"}},
                            ]
                        }
                    ]
                });
                var shkh_piex_xAxis_f=[]; //x轴
                var shkh_piex_series_f=[]; //data数据
                for(var x=0;x<sh_thirtycbl[0].length;x++){
                    shkh_piex_xAxis_f.unshift(sh_thirtycbl[s][x].readDate);
                    shkh_piex_series_f.unshift(sh_thirtycbl[s][x].readRate);
                }
                // console.log()
                piex.clear();
                piex.setOption({
                    xAxis: {
                        data:shkh_piex_xAxis_f,
                        axisTick: {
                                alignWithLabel: true
                           },
                        axisLabel : {
                            formatter: '{value}',
                            textStyle: {
                                color: '#fff',
                                fontSize:12
                            }
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#FFf',
                             }
                        }
                    },
                    yAxis: {
                        type:"value",
                        axisLabel : {
                            formatter: '{value}',
                            textStyle: {
                                color: '#fff',
                                fontSize:14
                            }
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#FFf',
                             }
                        },
                        splitLine:{ //设置坐标轴在grid中的分割线的样式
                            show:true,
                            interval:2,
                            lineStyle:{ //设置y轴线颜色和样式
                                // color:['#f00','#00d'],  
                                // type:'dashed',
                                type:'dotted'
                            }
                        }
                    },
                    series: [{
                        data:shkh_piex_series_f,
                        type: 'line',
                        lineStyle:{
                            color:'#ccc'
                        }
                    }],
                    grid:{
                        top:'8%',
                        bottom:'25%',
                        right:'0%',
                        left:'5%'
                    }
                });
                anima02(); 
            }else if(s==shcode.length){
                clearInterval(second);
                $(".f_dm_u").children().eq(0).addClass("back").siblings().removeClass("back");
                $("#khmd").html("集团客户名单");
                $(".f_dz_l").children().eq(1).hide(1);
                $(".f_dz_l").children().eq(0).show(10);
                // $("#conecharts").children().eq(1).hide(1);
                // $("#conecharts").children().eq(2).show(10);
                i=-1;
                // last=setInterval(laply,10100) ;
                last=setInterval(play,10100);
                
            }
        }
        //第一层动画开始
        function play(){
            i++;
            if(i<code.length){
                // console.log(code.length);
                //集团客户-公司向上滚动-右侧echart图表重新渲染
                $("#ycbs").html(jt_ycbscode[i]); //动态渲染集团客户-对应公司相关数据
                $("#zkhs").html(jt_zkhscode[i]);
                $("#xmbs").html(jt_xmbzcode[i]);
                $("#zfhl").html(jt_zfhlcode[i]);
                var jtkh_pie_legend_f=jt_thirtycbl[i][0].readRate;
                var jtkh_pie_ycbs_f=jt_ycbscode[i];
                var jtkh_pie_zkhs_f=jt_zkhscode[i];
                //清空原echarts图表数据
                yuanhuan.clear();
                //重新渲染echarts图表
                yuanhuan.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        show:false,
                        orient: 'vertical',
                        x: 'left',
                        icon:'circle',
                        itemGap:20,
                        left:'65%',
                        top:'24%',
                        backgroundColor:'#062a40',
                        textStyle:{
                          fontSize:24,
                          color:'#ccc',  
                        },
                    },
                    graphic:{  //定义圆环副标题文本样式
                        type:'text',
                        left:'27%',
                        top:'30%',
                        style:{
                            text:jtkh_pie_legend_f+'\n抄表率',
                            textAlign:'center',
                            fill:'#fff',
                            width:30,
                            height:30,
                            // fontSize:10
                        }
                    },
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['70%', '100%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '14',
                                        // fontWeight: 'bold',
                                        color:'#ccc'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            center:['30%','50%'],
                            data:[
                                {value:jtkh_pie_ycbs_f, name:'已抄表数量',itemStyle:{color:"#7ae45d"}},
                                {value:jtkh_pie_zkhs_f, name:'休眠表数量',itemStyle:{color:"#08f8d3"}},
                            ]
                        }
                    ]
                });
                var jtkh_piex_xAxis_f=[]; //x轴
                var jtkh_piex_series_f=[]; //data数据
                for(var x=0;x<jt_thirtycbl[0].length;x++){
                    jtkh_piex_xAxis_f.unshift(jt_thirtycbl[i][x].readDate);
                    jtkh_piex_series_f.unshift(jt_thirtycbl[i][x].readRate);
                }
                // console.log()
                //清空echarts折线图表数据
                piex.clear();
                piex.setOption({
                    xAxis: {
                        data:jtkh_piex_xAxis_f,
                        axisTick: {
                                alignWithLabel: true
                           },
                        axisLabel : {
                            formatter: '{value}',
                            textStyle: {
                                color: '#fff',
                                fontSize:12
                            }
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#FFf',
                             }
                        }
                    },
                    yAxis: {
                        type:"value",
                        axisLabel : {
                            formatter: '{value}',
                            textStyle: {
                                color: '#fff',
                                fontSize:14
                            }
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#FFf',
                             }
                        },
                        splitLine:{ //设置坐标轴在grid中的分割线的样式
                            show:true,
                            interval:2,
                            lineStyle:{ //设置y轴线颜色和样式
                                // color:['#f00','#00d'],  
                                // type:'dashed',
                                type:'dotted'
                            }
                        }
                    },
                    series: [{
                        data:jtkh_piex_series_f,
                        type: 'line',
                        lineStyle:{
                            color:'#ccc'
                        }
                    }],
                    grid:{
                        top:'8%',
                        bottom:'25%',
                        right:'0%',
                        left:'5%'
                    }
                });
                anima();
            }else if(i==code.length){
                clearInterval(f);
                clearInterval(last);
                $(".f_dm_u").children().eq(1).addClass("back").siblings().removeClass("back");
                $("#khmd").html("省会客户名单");
                $(".f_dz_l").children().eq(0).hide(1);
                $(".f_dz_l").children().eq(1).show(10);
                s=-1;
                second=setInterval(cplay,10100);
            }
        }
        var f=setInterval(play,10000);
        //echarts图表随窗口变化
        window.onresize=function(){
            piex.resize(zhexian_option);
            yuanhuan.resize(option2);
        }      
})