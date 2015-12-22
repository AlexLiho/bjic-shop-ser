function array_unique(arr) {
    var tmp_arr = new Array();
    for (i = 0; i < arr.length; i++)
    {
        if (tmp_arr.indexOf(arr[i]) == "-1")
        {
            tmp_arr.push(arr[i]);
        }
    }
    return tmp_arr;
}

function ajaxPost(postArray, event, errorEvent, showPreloader) {
    if (showPreloader == true)
        $('#forAjaxSpace').attr('style', 'display:block');
    $.ajax({
        url: '/index.php',
        type: 'POST',
        data: postArray,
        dataType: 'json',
        success: function (data, textStatus, jqXHR)
        {
            $('#forAjaxSpace').attr('style', 'display:none');
            if (event != "")
                $("#forAjaxSpace").trigger(event, [data]);
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            $('#forAjaxSpace').attr('style', 'display:none');
            if (errorEvent != "")
                $("#forAjaxSpace").trigger(errorEvent, [textStatus]);
        }
    });
}

function ajaxPostUrl(url, postArray, event, errorEvent, showPreloader) {
    if (showPreloader === true)
        $('#forAjaxSpace').attr('style', 'display:block');

    $.ajax({
        url: url,
        type: 'POST',
        data: postArray,
        dataType: 'json',
        success: function (data, textStatus, jqXHR)
        {
            $('#forAjaxSpace').attr('style', 'display:none');
            if (event !== "")
                $("#forAjaxSpace").trigger(event, [data]);
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            $('#forAjaxSpace').attr('style', 'display:none');
            if (errorEvent !== "")
                $("#forAjaxSpace").trigger(errorEvent, [textStatus]);
        }
    });
}

function ajaxGet(getArray, event, errorEvent) {
    $.ajax({
        url: '/index.php',
        type: 'GET',
        data: getArray,
        dataType: 'html',
        success: function (data, textStatus, jqXHR)
        {
            if (event != "")
                $("#forAjaxSpace").trigger(event, [data]);
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            if (errorEvent != "")
                $("#forAjaxSpace").trigger(errorEvent, [textStatus]);
        }
    });
}


fmtEnding = function (t, p1, p2, p3)
{
    var index = 1;

    if (t > 0)
    {
        t = parseInt(t);
        t = t.toString();
        t = "00" + t;
        t = t.substr(-2, 2);
        if ((t > 4 && t < 21))
            index = 1;
        else
        {
            t = t.substr(-1, 1);
            if (t == 0 || t > 4)
                index = 1;
            else if (t == 1)
                index = 2;
            else
                index = 3;
        }
    }
    else
        index = 1;

    var result = "";
    eval("result = p" + index + ";");
    return result;
}