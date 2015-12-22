var onPromoSuccessEvent = function (event, data) {
    $("#forAdminAjax").unbind("onPromoSuccessEvent", onPromoSuccessEvent);
    $("#forAdminAjax").unbind("onPromoErrorEvent", onPromoErrorEvent);
    $('input[name="standartDiscount"]').val("false");
    $('input[name="generalDiscount"]').val("false");
    $('input[name="remontDiscount"]').val("false");
    $('input[name="freeWindow"]').val("false");
    $('input[name="comment"]').val("");
    $('input[name="discount"]').val("0");
    if (!data.promo) {
        $('input[name="promo"]').addClass('error');
        $('input[name="promo"]').removeClass('success');
        calculatePrice();
        return;
    }
    var promo = data.promo;
//    var $discount;
//    var $window;
//    var $standart;
//    var $general;
//    var $remont;

    if (promo.discount !== "0") {
        $('input[name="discount"]').val(promo.discount);
    }
    if (promo.window !== "0") {
        $('input[name="freeWindow"]').val("true");
    }
    if (promo.standart !== "0") {
        $('input[name="standartDiscount"]').val("true");
    }
    if (promo.general !== "0") {
        $('input[name="generalDiscount"]').val("true");
    }
    if (promo.remont !== "0") {
        $('input[name="remontDiscount"]').val("true");
    }
    $('input[name="promo"]').addClass('success');
    $('input[name="promo"]').removeClass('error');
    calculatePrice();
};

var onPromoErrorEvent = function () {
    $("#forAdminAjax").unbind("onPromoSuccessEvent", onPromoSuccessEvent);
    $("#forAdminAjax").unbind("onPromoErrorEvent", onPromoErrorEvent);
    $('input[name="standartDiscount"]').val("false");
    $('input[name="freeWindow"]').val("false");
    $('input[name="generalDiscount"]').val("false");
    $('input[name="remontDiscount"]').val("false");
    $('input[name="promo"]').addClass('error');
    $('input[name="discount"]').val("0");
};

var calculateWindow = function (obj) {
    var width = obj.width();
    var height = obj.height();
    if (width > 1200) {
        $('.orderSpace').css('height', width / 4.44 + "px");
        $('.orderSpace').css('padding-top', width / 16 + "px");
        $('.orderSpace').css('background-size', "100% auto");
    } else {
        $('.orderSpace').css('height', "270px");
        $('.orderSpace').css('padding-top', "75px");
        $('.orderSpace').css('background-size', "1200px auto");
    }
    if (width > 1200) {
        $('.khimSpace').css('height', width / 4.44 + "px");
        $('.khimSpace').css('padding-top', width / 16 + "px");
        $('.khimSpace.pc').css('background-size', "100% auto");
    } else {
        $('.khimSpace').css('height', "270px");
        $('.khimSpace').css('padding-top', "75px");
        $('.khimSpace.pc').css('background-size', "1200px auto");
    }
};

var calculatePrice = function () {
    if (!$('input[name="flattype"]').length) {
        return;
    }
    var additionalHtml = "";
    var total = 0;
    var type = $('input[name="type"]').val();
    var promoCode = $('input[name="promo"]').val();
    var flattype = parseInt($('input[name="flattype"]').val());
    var standartDiscount = $('input[name="standartDiscount"]');
    var generalDiscount = $('input[name="generalDiscount"]');
    var remontDiscount = $('input[name="remontDiscount"]');
    var freeWindow = false;
    if ($('input[name="freeWindow"]').val() === "true") {
        var freeWindow = true;
    }
    var applyPromo = false;
    if (type === 'standart' && flattype) {
        total += standart[flattype];
        if (standartDiscount.val() === "true") {
            applyPromo = true;
        }
    }
    if (type === 'general' && flattype) {
        total += general[flattype];
        if (generalDiscount.val() === "true") {
            applyPromo = true;
        }
    }
    if (type === 'remont' && flattype) {
        total += remont[flattype];
        if (remontDiscount.val() === "true") {
            applyPromo = true;
        }
    }
    if (!applyPromo && (standartDiscount.val() === "true" || generalDiscount.val() === "true" || remontDiscount.val() === "true")) {
        $('div.row > label span.promoError').css('display', 'block');
    } else {
        $('div.row > label span.promoError').css('display', 'none');
    }
    if (flattype == 1) {
        $('.calculateSpace > div > div > .rightSpace > .totalSpace > h4').html('Уборка квартиры с 1 жилой комнатой и одной ванной');
    } else {
        $('.calculateSpace > div > div > .rightSpace > .totalSpace > h4').html('Уборка квартиры с ' + flattype + ' жилыми комнатами и одной ванной');
    }
    var windowNum = parseInt($('input[name="windowNum"]').val());
    if (!applyPromo || !freeWindow) {
        total += okno * windowNum;
    }
    if (windowNum) {
        additionalHtml += "<p>Мытье окон " + windowNum + "шт</p>";
    }
    var balNum = parseInt($('input[name="balNum"]').val());
    total += bal * balNum;
    if (balNum) {
        additionalHtml += "<p>Мытье балконов " + balNum + "шт</p>";
    }
    var lustraNum = parseInt($('input[name="lustraNum"]').val());
    total += lustra * lustraNum;
    if (lustraNum) {
        additionalHtml += "<p>Мытье люстр " + lustraNum + "шт</p>";
    }
    var holodNum = parseInt($('input[name="holod"]').val());
    total += holod * holodNum;
    if (holodNum) {
        additionalHtml += "<p>Мытье холодильника " + holodNum + "шт</p>";
    }
    var duhovNum = parseInt($('input[name="duhov"]').val());
    total += duhov * duhovNum;
    if (duhovNum) {
        additionalHtml += "<p>Мытье духовки/СВЧ внутри " + duhovNum + "шт</p>";
    }
    var glad1Num = parseInt($('input[name="glad1"]').val());
    total += glad[1] * glad1Num;
    if (glad1Num) {
        additionalHtml += "<p>Глажка " + glad1Num + "шт</p>";
    }
    var glad2Num = parseInt($('input[name="glad2"]').val());
    total += glad[2] * glad2Num;
    if (glad2Num) {
        additionalHtml += "<p>Поменять бельё " + glad2Num + "шт</p>";
    }
    var glad3Num = parseInt($('input[name="glad3"]').val());
    total += glad[3] * glad3Num;
    if (glad3Num) {
        additionalHtml += "<p>Развесить бельё " + glad3Num + "шт</p>";
    }
    if ($('input[name="getkey"]').val() === "true") {
        total += getkey;
        additionalHtml += "<p>Заехать за ключами от квартиры</p>";
    }
    if ($('input[name="eco"]').val() === "true") {
        total += total * eco / 100;
        additionalHtml += "<p>Эко уборка + " + eco + "%</p>";
    }
    var additionalPromoHtml = "";
    if (applyPromo) {
        additionalPromoHtml += "<span>Промо-код</span>";
        additionalPromoHtml += "<p>" + promoCode + "</p>";
    }
    if (applyPromo && freeWindow) {
        $('input[name="comment"]').val("Мытьё окон бесплатно");
        additionalPromoHtml += "<p>Мытьё окон бесплатно</p>";
    }
    var discount = parseInt($('input[name="discount"]').val());
    var totalDiscount = total;
    if (applyPromo) {
        totalDiscount = total - discount;
    }
    $('input[name="total"]').val(totalDiscount);
    $('input[name="totalCost"]').val(total);
    if (applyPromo && discount) {
        $('.calculateSpace > div > div > .rightSpace .totalSpace > div p.total').html('<span>' + total + '</span>' + totalDiscount + " руб.");
    } else {
        $('.calculateSpace > div > div > .rightSpace .totalSpace > div p.total').html(total + " руб.");
    }
    if (additionalHtml !== "") {
        $('.calculateSpace > div > div > .rightSpace .totalSpace > div.additional').html('<span>Дополнительно</span> ' + additionalHtml);
    } else {
        $('.calculateSpace > div > div > .rightSpace .totalSpace > div.additional').html('');
    }
    if (additionalPromoHtml !== "") {
        $('.calculateSpace > div > div > .rightSpace .totalSpace > div.additional').append(additionalPromoHtml);
    }
};

$().ready(function () {
    $('.headSpace ul li.personal > a.menu').click(function () {
        $('.headSpace ul li.personal > ul').fadeIn(100);
        $(window).click(function () {
            $('.headSpace ul li.personal > ul').fadeOut(100);
            $(window).unbind();
        });
        return false;
    });
    
    $('.headSpace ul li.personal > ul').click(function (event) {
        event.stopPropagation();
        return true;
    });

    $('input[name="promo"]').keyup(function () {
        if ($(this).val()) {
            $('div.row.withHint > a:last-child').css('display', 'inline-block');
        } else {
            $('div.row.withHint > a:last-child').css('display', 'none');
        }
    });

    $('div.row.withHint > a:last-child').click(function () {
        var postArray = {
            id: 'promo',
            code: $('input[name="promo"]').val()
        };
        $("#forAjaxSpace").bind("onPromoSuccessEvent", onPromoSuccessEvent);
        $("#forAjaxSpace").bind("onPromoErrorEvent", onPromoErrorEvent);
        ajaxPost(postArray, "onPromoSuccessEvent", "onPromoErrorEvent");

        return false;
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 400) {
            $(".arrowUpSpace").css("display", "block");
        } else {
            $(".arrowUpSpace").css("display", "none");
        }
    });

    $('.calculateSpace.unregistered > div > div > .rightSpace a.submit').click(function () {
        $phone = $('input[name="phone"]');
        $name = $('input[name="name"]');
        var error = false;
        if (!$name.val()) {
            error = true;
            $name.addClass('error');
        } else {
            $name.removeClass('error');
        }
        if (!$phone.val()) {
            error = true;
            $phone.addClass('error');
        } else {
            $phone.removeClass('error');
        }
        if (error) {
            return false;
        }

        $('form').submit();

        return false;
    });
    calculatePrice();

    $('input[name="phone"]').mask("+7 (999) 999-99-99");
    $(window).resize(function () {
        calculateWindow($(this));
    });
    calculateWindow($(window));

    $('.spinner input').change(function () {
        if (parseInt($(this).val()) > 0) {
            $(this).parent().addClass('touched');
        } else {
            $(this).parent().removeClass('touched');
        }
        calculatePrice();
    });
    $('.selector > div').click(function () {
        if ($(this).parent().find('ul').css("display") === "block") {
            $(this).parent().find('ul').slideUp();
        } else {
            $(this).parent().find('ul').slideDown();
        }
        $(this).parent().addClass("touched");
        return false;
    });
    $('.selector > ul li').click(function () {
        var value = $(this).attr("rel");
        var text = $(this).html();
        $(this).parent().parent().find("input").val(value);
        $(this).parent().slideUp();
        $(this).parent().parent().find("div p").html(text);
        calculatePrice();
        $(this).parent().parent().trigger("selectEvent", value);
    });

    $('.spinner a.more').click(function () {
        var value = parseInt($(this).parent().find('input').val());
        value++;
        $(this).parent().find('input').val(value);
        $(this).parent().addClass('touched');
        calculatePrice();
        return false;
    });

    $('.spinner a.less').click(function () {
        var value = parseInt($(this).parent().find('input').val());
        if (value <= 0) {
            return false;
        }
        value--;
        if (value == 0) {
            $(this).parent().removeClass('touched');
        }
        $(this).parent().find('input').val(value);
        calculatePrice();
        return false;
    });

    $('.checkbox').click(function () {
        var value = $(this).find('input').val();
        if (value === "false") {
            $(this).addClass('touched');
            value = "true";
        } else {
            $(this).removeClass('touched');
            value = "false";
        }
        $(this).find('input').trigger("checkboxChanged", value);
        $(this).find('input').val(value);
        calculatePrice();
    });

    $('.calculateSpace > div > div > .rightSpace .miniFaq li.accordion h4').click(function () {
        var $ul = $(this).parent().find('div');
        if ($ul.css("display") === "block") {
            $(this).parent().find('h4').removeClass('active');
            $ul.slideUp();
        } else {
            $(this).parent().parent().find('h4').removeClass('active');
            $(this).parent().parent().find('li > div').slideUp();
            $(this).addClass('active');
            $ul.slideDown();
        }
        return false;
    });

    $('div.row > label a.info').click(function () {
        $('div.row > label a.info div').fadeOut();
        $(this).find('div').fadeIn();
        $(window).click(function () {
            $('div.row > label a.info div').fadeOut();
            $(window).unbind();
        });
        return false;
    });

    $('div.row > label a.info div').click(function () {
        $(this).fadeOut();
        return false;
    });

    calculatePrice();
});