//javascript:

var panel = document.getElementsByClassName("panel-info")[0];
var table0_frame = '<div id="p0"><br><div class="panel panel-primary"><div class="panel-heading" id="btn_panel">篩選課程列表</div><div id="" style="display: block;"><table id="table0" class="table table-bordered table-hover table-condensed rwd-table "><thead><tr><th class="tbhead01" style="text-align: center; vertical-align: middle;">序號</th><th class="tbhead01" style="text-align: center; vertical-align: middle;">課程代碼</th><th class="tbhead01" style="text-align: center; vertical-align: middle;">開課班別(代表)</th><th class="tbhead01" style="text-align: center; vertical-align: middle;">課程名稱</th><th class="tbhead01" style="text-align: center; vertical-align: middle;">教學大綱<br>Syllabus</th><th class="tbhead01" style="text-align: center; vertical-align: middle;">課程性質</th><th class="tbhead01" style="text-align: center; vertical-align: middle;">課程性質2</th><th class="tbhead01" style="text-align: center; vertical-align: middle;">全英語授課</th><th class="tbhead01" style="text-align: center; vertical-align: middle;">學分</th><th class="tbhead01" style="text-align: center; vertical-align: middle;">教師姓名</th><th class="tbhead01" style="text-align: center; vertical-align: middle;">上課大樓</th><th class="tbhead01" style="text-align: center; vertical-align: middle;">上課節次+地點</th><th class="tbhead01" style="text-align: center; vertical-align: middle;">上限人數</th><th class="tbhead01" style="text-align: center; vertical-align: middle;">登記人數</th><th class="tbhead01" style="text-align: center; vertical-align: middle;">選上人數</th><th class="tbhead01" style="text-align: center; vertical-align: middle;">可跨班</th><th class="tbhead01" style="text-align: center; vertical-align: middle;">備註</th></tr></thead><tbody id = "tbd"></tbody></table><div class="alert form-signin-heading"></div></div></div></div>';
if (!!document.getElementById("p0")) document.getElementById("p0").remove();
panel.insertAdjacentHTML('beforebegin', table0_frame);

var btn_panel = document.getElementById("btn_panel");
var btn_js = `collect()`;
var btn_frame = '<a class="btn btn-info btn-xs" onclick="' + btn_js + '">篩選</a>';
btn_panel.insertAdjacentHTML('beforeend', btn_frame);

var btn_js = `tg1()`;
var btn_frame = '<a class="btn btn-default btn-xs" onclick="' + btn_js + '">開合</a>';
btn_panel.insertAdjacentHTML('beforeend', btn_frame);

function collect() {
    var table0 = document.getElementById("tbd");
    table0.innerHTML = "";
    var table = document.getElementById("table1");
    var v6 = prompt("課程性質2", "");
    var v11 = prompt("上課節次", "03-04");
    var v14 = prompt("選上人數 (未滿 1 不篩 0)", "1");
    if (!!table)
        for (var i = 1, row; row = table.rows[i]; i++) {
            var loc = row.cells[11].innerText.split(" ").pop();
            var time = row.cells[11].innerText.replace(loc, "");
            if (time.includes(v11))
                if (row.cells[6].innerText.includes(v6))
                    if (v14 == "0" || Number(row.cells[12].innerText) > Number(row.cells[14].innerText)) table0.innerHTML += row.innerHTML.replace("<tbody>", "").replace("</tbody>", "");
        }
    scroll(0, 0);
}

function tg1() {
    $("#table0").toggle();
    scroll(0, 0);
}