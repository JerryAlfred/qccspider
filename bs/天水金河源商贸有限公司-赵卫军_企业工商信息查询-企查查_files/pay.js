
function getWxPayStatus(){
    if (wxOrderStatus == 0 && wxOrderCode != '' && isModalShow) {
        $.ajax({
            url: INDEX_URL+'/order_payStatus',
            type: "GET",
            dataType:"json",
            data: {'id':wxOrderCode},
            success: function (result) {
                if (result.success) {
                    wxOrderStatus = 1;
                    if(window.pvipBack){
                        window.top.location.href = INDEX_URL+window.pvipBack;
                    }else{
                        window.top.location.href = INDEX_URL+'/user_vip';
                    }
                }
            },
            error: function () {
                console.log("请求订单状态出错");
            }
        });
    }
}

function changeYear(goods_id,year,price,dom){
    clearPay();
    $(dom).siblings().removeClass('active');
    $(dom).addClass('active');
    cGoods_id = goods_id;
    cYear = year;
    cPrice = price;
    if(cPrice-cDeduction<=0){
        $cmodal.find('.payYear').text('¥0.10');
    }else{
        $cmodal.find('.payYear').text('¥' + (cPrice-cDeduction) + '.00');
    }
    $cmodal.find("input[name='goods_id']").val(cGoods_id);
    getcouponlist(cGoods_id);
    window.zhuge.track(cYear + '年VIP会员');
}

function checkPay(payType){
    if(isPayShow){
        $cmodal.find('.pay-type-wx').removeClass('active');
        $cmodal.find('.pay-type-ali').removeClass('active');
        cPayType = payType;
        $cmodal.find("input[name='pay_type']").val(cPayType);
        if(cPayType==1){
            $cmodal.find('.pay-type-ali').addClass('active');
            aliPayAction();
        }else{
            $cmodal.find('.pay-type-wx').addClass('active');
            wxPayAction();
        }
    }
}


function checkCoupon(dPrice,name,code){
    clearPay();
    if($cmodal.find('#coupon_'+code).hasClass('active')){
    	$cmodal.find('#coupon_'+code).removeClass('active');
    	$cmodal.find('.couponText').text('不使用优惠券');
    	$cmodal.find('.payYear').text('¥' + (cPrice-cDeduction) + '.00');
    	$cmodal.find("input[name='coupon_code']").val('');
    }else{
    	$cmodal.find('.coupon-item').removeClass('active');
    	$cmodal.find('#coupon_'+code).addClass('active');
	    $cmodal.find('.couponText').text(name+' - ¥'+dPrice+'');
	    if(cPrice-dPrice-cDeduction<=0){
	        $cmodal.find('.payYear').text('¥0.10');
	    }else{
	        $cmodal.find('.payYear').text('¥' + (cPrice-dPrice-cDeduction) + '.00');
	    }
	    $cmodal.find("input[name='coupon_code']").val(code);
    }

    if(isModalShow){
        checkPay(cPayType);
    }
}

function wxPayAction(){
    if(!wxpayLoad){
        $cmodal.find('.wx_pay_box .pay-load').show();
        $.ajax({
            type:'post',
            url:INDEX_URL+'/order_pay',
            data:$cmodal.find('.pay-form').serialize(),
            success:function(res){
                if(res.success){
                    $cmodal.find('.wx_pay_img').empty();
                    wxOrderCode = res.orderCode;
                    var qrcode = new QRCode($cmodal.find('.wx_pay_img')[0], {
                        text: res.codeUrl,
                        width: 160,
                        height: 160,
                        colorDark : "#000000",
                        colorLight : "#ffffff",
                        correctLevel : QRCode.CorrectLevel.H
                    });
                    wxpayLoad = true;
                }
                $cmodal.find('.wx_pay_box .pay-load').hide();
            }
        });
        
    }
    $cmodal.find('.ali_pay_box').hide();
    $cmodal.find('.wx_pay_box').show();
}

function aliPayAction(){
    if(!alipayLoad){
        $cmodal.find('.ali_pay_box').empty();
        $cmodal.find('.ali_pay_box').append('<img class="pay-load" src="/material/theme/chacha/cms/v2/images/preloader.gif">');
        if(vType=='svip'){
            $cmodal.find('.ali_pay_box').append('<iframe width="160px" height="160px" class="ali_pay_frame" src="about:blank" name="aliPayFrameSVIP" scrolling="no" frameborder="no"></iframe>');
        }else{
            $cmodal.find('.ali_pay_box').append('<iframe width="160px" height="160px" class="ali_pay_frame" src="about:blank" name="aliPayFrame" scrolling="no" frameborder="no"></iframe>');
        }
        $cmodal.find('.packages-btn').click();
        $cmodal.find('.ali_pay_box .pay-load').show();
      
        $cmodal.find(".ali_pay_frame").load(function(e){
            $cmodal.find('.ali_pay_box .pay-load').hide();
            if(alipayLoad){
                if(window.pvipBack){
                    window.top.location.href = INDEX_URL+window.pvipBack;
                }else{
                    window.top.location.href = INDEX_URL+'/user_vip';
                }
            }
            alipayLoad = true;
        });
    }
    $cmodal.find('.ali_pay_box').show();
    $cmodal.find('.wx_pay_box').hide();
}



function clearPay(){
    wxpayLoad = false;
    alipayLoad = false;
    $cmodal.find('.wx_pay_img').empty();
    $cmodal.find('.ali_pay_box').hide();
    $cmodal.find('.wx_pay_box').hide();
    $cmodal.find('.ali_pay_frame').remove();
    wxOrderCode = '';
    $cmodal.find('.couponText').text('暂无优惠券');
}

function getcouponlist(goods_id){
    $.ajax({
        url:INDEX_URL+'/vip_getcouponlist',
        data:{
            goods_id:goods_id,
        },
        dataType:'html',
        success:function(html){
            if($.trim(html)!=''){

                $cmodal.find('.couponList').html(html);
                $cmodal.find('.couponList').parents(".coupon-drop").show();
                if(!$(html).hasClass("checkCouponRun")){
                    checkPay(cPayType);
                }
            } else {
                checkPay(cPayType);
                $cmodal.find('.couponList').parents(".coupon-drop").hide();
                //$('#couponList').parent().parent().parent().hide();
            }
        }
    })
}

function getdeduction(){
    $.ajax({
        url:INDEX_URL+'/vip_getdeduction',
        dataType:'json',
        success:function(res){
            cDeduction = res.deduction;
            if(res.deduction){
                $cmodal.find('.deduction').text('-¥'+cDeduction);
                $cmodal.find('.deduction').parent().show();
                if(cPrice-cDeduction<=0){
                    $cmodal.find('.payYear').text('¥0.10');
                }else{
                    $cmodal.find('.payYear').text('¥' + (cPrice-cDeduction) + '.00');
                }
            }else{
                $cmodal.find('.deduction').parent().hide();
                $cmodal.find('.payYear').text('¥' + cPrice + '.00');
            }
        }
    })
}
