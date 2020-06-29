
function getWxPayStatusIn(dom){
    var wxOrderStatus = $(dom).attr('data-wx-order-status');
    var wxOrderCode = $(dom).attr('data-wx-order-code');
    var isPayShow = $(dom).attr('data-is-pay-show');

    if (wxOrderStatus == 0 && wxOrderCode != '' && isPayShow == 'true') {
        $.ajax({
            url: INDEX_URL+'/order_payStatus',
            type: "GET",
            dataType:"json",
            data: {'id':wxOrderCode},
            success: function (result) {
                if (result.success) {
                    $(dom).attr('data-wx-order-status',1);
                    window.top.location.href = INDEX_URL+'/user_vip';
                }
            },
            error: function () {
                console.log("请求订单状态出错");
            }
        });
    }
}

function changeYearIn(goods_id,year,price,dom){
    var parentDomId = "#" + $(dom).parents(".vip-insert-wrap").attr('id');
    clearPayIn(parentDomId);
    $(dom).siblings().removeClass('active');
    $(dom).addClass('active');

    $(parentDomId).attr('data-c-goods-id',goods_id);
    $(parentDomId).attr('data-c-year',year);
    $(parentDomId).attr('data-c-price',price);

    $(parentDomId).find('#payYear').text('¥' + price + '.00');
    $(parentDomId).find("input[name='goods_id']").val(goods_id);
    var isPayShow = $(parentDomId).attr('data-is-pay-show');
    if(isPayShow == 'true'){
        getcouponlistIn(goods_id,parentDomId);
    }

    window.zhuge.track(year + '年VIP会员');
}

function checkPayIn(payType,dom){
    $(dom).find('.pay-type-wx').removeClass('active');
    $(dom).find('.pay-type-ali').removeClass('active');
    $(dom).attr('data-c-pay-type',payType);
    $(dom).find("input[name='pay_type']").val(payType);
    if(payType==1){
        $(dom).find('.pay-type-ali').addClass('active');
        aliPayActionIn(dom);
    }else{
        $(dom).find('.pay-type-wx').addClass('active');
        wxPayActionIn(dom);
    } 
}

function checkCouponIn(dPrice,name,code,domId){
    var cPrice = parseFloat($(domId).attr('data-c-price'));
    var isPayShow = $(domId).attr('data-is-pay-show');
    clearPayIn(domId);
    if($(domId).find('#coupon_'+code).hasClass('active')){
        $(domId).find('#coupon_'+code).removeClass('active');
        $(domId).find('#couponText').text('不使用优惠券');
        $(domId).find('#payYear').text('¥' + (cPrice) + '.00');
        $(domId).find("input[name='coupon_code']").val('');
    }else{
        $(domId).find('.coupon-item').removeClass('active');
        $(domId).find('#coupon_'+code).addClass('active');
        $(domId).find('#couponText').text(name+' - ¥'+dPrice+'');
	    if(cPrice-dPrice<0){
            $(domId).find('#payYear').text('¥0.10');
	    }else{
            $(domId).find('#payYear').text('¥' + (cPrice-dPrice) + '.00');
	    }
        $(domId).find("input[name='coupon_code']").val(code);
    }

    if(isPayShow == 'true') {
        var cPayType = $(domId).attr('data-c-pay-type')
        checkPayIn(cPayType,domId);
    }
}

function wxPayActionIn(dom){
    var wxpayLoad = $(dom).attr('data-wx-pay-load');
    var isPayShow = $(dom).attr('data-is-pay-show');
    if(wxpayLoad == 'false' && isPayShow == 'true'){
        $(dom).find('.wx_pay_box .pay-load').show();
        $.ajax({
            type:'post',
            url:INDEX_URL+'/order_pay',
            data:$(dom).find('.pay-form').serialize(),
            success:function(res){
                if(res.success){
                    $(dom).find('.wx_pay_img').empty();
                    $(dom).attr('data-wx-order-code',res.orderCode);
                    var flagName = dom.substr(1,dom.length-1).split('VipInsert')[0];
                    var qrcode = new QRCode('wx_pay_img_'+flagName, {
                        text: res.codeUrl,
                        width: 160,
                        height: 160,
                        colorDark : "#000000",
                        colorLight : "#ffffff",
                        correctLevel : QRCode.CorrectLevel.H
                    });
                    $(dom).attr('data-wx-pay-load','true');
                }
                $(dom).find('.wx_pay_box .pay-load').hide();
            }
        });
        
    }
    $(dom).find('.ali_pay_box').hide();
    $(dom).find('.wx_pay_box').show();
}

function aliPayActionIn(dom){
    var alipayLoad = $(dom).attr('data-ali-pay-load');

    if(alipayLoad == 'false'){

        $('.ali_pay_box').empty();
        $('.ali_pay_box').append('<img class="pay-load" src="/material/theme/chacha/cms/v2/images/preloader.gif">');

        /*$(dom).find('.ali_pay_box').append('<iframe width="160px" height="160px"  class="ali_pay_frame" src="about:blank" name="aliPayFrame" scrolling="no" frameborder="no"></iframe>');
        $(dom).find('.packages-btn').click();
        $(dom).find('.ali_pay_box .pay-load').show();
        $(dom).find(".ali_pay_frame").load(function(e){
            $(dom).find('.ali_pay_box .pay-load').hide();
            if(alipayLoad == 'true'){
                window.top.location.href = INDEX_URL+'/user_vip';
            }
            alipayLoad == 'true';
        });*/
        var flagName = dom.substr(1,dom.length-1).split('VipInsert')[0];
        $(dom).find('.ali_pay_box').append('<iframe id="'+flagName+'VipInsertIframe" width="160px" height="160px"  class="ali_pay_frame" src="about:blank" name="'+flagName+'AliPayFrame" scrolling="no" frameborder="no"></iframe>');
        $(dom).find('.packages-btn').click();
        $(dom).find('.ali_pay_box .pay-load').show();
        $("#"+flagName+"VipInsertIframe").load(function(e){
            $(dom).find('.ali_pay_box .pay-load').hide();
            $(dom).attr('data-ali-pay-load','true')
            if(alipayLoad == 'true'){
                window.top.location.href = INDEX_URL+'/user_vip';
            }
            alipayLoad = 'true';
        });

    }
    $(dom).find('.ali_pay_box').show();
    $(dom).find('.wx_pay_box').hide();
}

function clearPayIn(dom){
    $(dom).attr('data-wx-pay-load','false');
    $(dom).attr('data-ali-pay-load','false');
    $(dom).attr('data-wx-order-code','false');

    $(dom).find('.wx_pay_img').empty();
    $(dom).find('.ali_pay_box').hide();
    $(dom).find('.wx_pay_box').hide();
    $(dom).find('.ali_pay_frame').remove();
    $(dom).find('#couponText').text('暂无优惠券');
}

function getcouponlistIn(goods_id,dom_id){
    var isPayShow = $(dom_id).attr('data-is-pay-show');

    if(isPayShow == 'true'){
        $.ajax({
            url:INDEX_URL+'/vip_getcouponlistin',
            data:{
                goods_id:goods_id,
                dom_id:dom_id
            },
            dataType:'html',
            success:function(html){
                var cPayType = $(dom_id).attr('data-c-pay-type')
                if($.trim(html)!=''){
                    $(dom_id).find('#couponList').html(html);
                    $(dom_id).find('#couponList').parents(".coupon-drop").show();

                    if(!$(html).hasClass("checkCouponRun")){
                        checkPayIn(cPayType,dom_id);
                    }
                } else {
                    if(isPayShow == 'true') {
                        checkPayIn(cPayType,dom_id);
                    }
                    $(dom_id).find('#couponList').parents(".coupon-drop").hide();
                }
            }
        })
    }
}

var siInsert = null;
function strartBuyIn(dom){
    if(typeof siModel != 'undefined' && siModel){
        clearInterval(siModel);
        siModel = null;
    }
    if(typeof siInsert != 'undefined' && siInsert){
        clearInterval(siInsert);
        siInsert = null;
    }
    siInsert = setInterval(function(){
        getWxPayStatusIn(dom);
    }, 3000);
    //checkPayIn(cPayType,dom);
    setTimeout(function() {
        getcouponlistIn(cGoods_id,dom);
    }, 300);
}

function modalJumpVipIn(domId){
    //其他隐藏
    $(".vip-insert-wrap .step1").show();
    $(".vip-insert-wrap .step2").hide();

    //
    $(domId).attr('data-is-pay-show','true');
    strartBuyIn(domId);

    $(domId).find(".step1").hide();
    $(domId).find(".step2").show();

    zhugeTrack('开通VIP',{'立即开通':$(domId).find('.vip-title .title').text()});
    zhugeTrack('开通VIP',{'弹窗名称':$(domId).find('.vip-title .title').text()});
    zhugeTrack('开通VIP-立即开通',{'弹窗标题名称':$(domId).find('.vip-title .title').text()});
}

$('.vip-year-list-in .vip-kuang').on('click',function(){
    var parentDomId = "#" + $(this).parents(".vip-insert-wrap").attr('id');
    changeYearIn($(this).attr('data-id'),$(this).attr('data-year'),$(this).attr('data-price'),this);
    var couponCode = $(parentDomId).find("input[name='coupon_code']").val();
    if(couponCode == ''){
        var cPayType = $(parentDomId).attr('data-c-pay-type');
        //checkPayIn(cPayType,parentDomId);
    }
});