//javascript:

const week = ["(零)", "(一)", "(二)", "(三)", "(四)", "(五)", "(六)", "(七)"];


class Coure {
    constructor(row) {
        this.row = row;
        this.num = row.cells[1].innerText;
        this.name = row.cells[3].innerText;
        this.credit = row.cells[8].innerText;
        this.prop1 = row.cells[5].innerText;
        this.prop2 = row.cells[6].innerText;
        this.p1 = Number(row.cells[12].innerText);
        this.p2 = Number(row.cells[13].innerText);
        this.p3 = Number(row.cells[14].innerText);

        this.loc = row.cells[11].innerText.split(" ").pop();
        this.time = row.cells[11].innerText.replace(this.loc, "");
        this.html = row.innerHTML.replace("<tbody>", "").replace("</tbody>", "");

        this.show = [this.num, this.name.split(" ")[0], this.credit, this.prop2].join(" ");
    }

    get sec() {
        let time = this.time.split(" ");
        let se = [];
        let day;
        time.forEach(element => {
            if (element != "")
                if (week.indexOf(element) != -1) {
                    day = week.indexOf(element);
                } else {
                    if (element.includes("-")) {
                        for (let index = Number(element.substr(0, 2)); index <= Number(element.substr(3, 2)); index++) {
                            se.push(day + "_" + index);
                        }
                    } else if (!!Number(element) & Number(element) < 15) {
                        se.push(day + "_" + Number(element));
                    }
                }
        });
        return se;
    }
}

class Table {
    constructor(id) {
        this.id = id;
        this.coures = [];

        this.html = "";
        this.html += `<table id="` + id + `" class="table-hover" cellspacing="3" cellpadding="0" border="1" width="100%"><tbody><tr><td bgcolor="#000000"></td><td width="12%" bgcolor="#000000"><div align="center"><font color="#ffffff">星期一</font></div></td><td width="12%" bgcolor="#000000"><div align="center"><font color="#ffffff">星期二</font></div></td><td width="12%" bgcolor="#000000"><div align="center"><font color="#ffffff">星期三</font></div></td><td width="12%" bgcolor="#000000"><div align="center"><font color="#ffffff">星期四</font></div></td><td width="12%" bgcolor="#000000"><div align="center"><font color="#ffffff">星期五</font></div></td><td width="12%" bgcolor="#000000"><div align="center"><font color="#ffffff">星期六</font></div></td></tr>`;
        for (var i = 1; i < 14; i++) {
            this.html += `<tr style="background-color:lightblue;height:40px"><td width="8%" bgcolor="#000000"><div align="center"><font color="#ffffff">第 ` + i + ` 節</font></div></td>`;
            for (var j = 1; j < 7; j++) {
                this.html += `<td class="myshow j_i" width="12%" bgcolor="#ffffff" data-toggle="tooltip" title="星期 ` + j + ` 第 ` + i + ` 節" id="` + j + `_` + i + `"></td>`;
            }
        }
        this.html += `</tr></tbody></table>`;


        var ctb_head = `<meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
        var ctb_frame = "";
        ctb_frame += `<div class="w3-sidebar " style="width:28%;right:0;height: auto;" id="mySidebar"><div class="panel panel-primary">`;
        ctb_frame += this.html;
        ctb_frame += `</div></div>`;

        document.head.insertAdjacentHTML('beforeend', ctb_head);
        document.getElementById("mynav").insertAdjacentHTML('beforeend', ctb_frame);

        var btn_panel = document.getElementsByClassName("navbar-header")[0];
        var btn_js = `tablec.tog()`;
        var btn_frame = `<div class="navbar-header" style="text-align:right;background-color:cornflowerblue"><div class="" style="right:0"><a class="btn btn-default  btn-xs navbar-brand " onclick="` + btn_js + `">預覽課表</a></div></div>`;
        btn_panel.insertAdjacentHTML('afterend', btn_frame);



        this.table = $("." + id);
        this.frame = $(".w3-sidebar");
        this.frame.hide();


        /* delete */
        $(".j_i").click(function() {
            let num = $(this).text().split(" ")[0];
            tablec.del(num);
        });

    }
    show() {
        $(".j_i").text("");
        this.coures.forEach(ele => {
            ele.sec.forEach(element => {
                $("#" + element).text(ele.show);
            });
        });
    }
    add(cr) {
        this.coures.push(cr);
        this.show();
    }
    tog() {
        this.frame.toggle();
    }
    del(num) {
        this.coures = this.coures.filter(ccc => ccc.num != num);
        this.show();
    }
}

class Modal {
    constructor() {
        var modal_frame = `<div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog">
        
          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Modal Header</h4>
            </div>
            <div class="modal-body">
              <p>Some text in the modal.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
          
        </div>
      </div>`;
        document.body.insertAdjacentHTML('afterbegin', modal_frame);

        var btn_panel = document.getElementById("btn_panel");
        var btn_frame = `<button type="button" class="btn btn-info btn-xs" data-toggle="modal" data-target="#myModal">Modal</button>`;
        btn_panel.insertAdjacentHTML('beforeend', btn_frame);

    }

}

list();
let tablec = new Table("table2");
let modal = new Modal();

$(document).ready(function() {
    $("#result").on("mouseenter", function() {
        console.log("in");
        c_hover();
    });
});

function c_hover() {
    let fl = false;
    $(".table tr").hover(function() {
        $(this).css("background-color", "yellow");
        let tr = document.createElement("tr");
        tr.innerHTML = $(this).html();

        let cr = new Coure(tr);
        let se = [];
        se = cr.sec;
        console.log(se);

        fl = true;
        se.forEach(element => {
            let s = $("#" + element)
            if (s.text() == "") {
                s.css("background-color", "yellow");

            } else {
                s.css("background-color", "red");
                fl = false;
            }
        });
    }, function() {
        $(this).css("background-color", "white");
        $("#table2 .j_i").css("background-color", "white");
    });
    $(".table tr").click(function() {
        if (fl == false) {
            alert("衝堂");
            return;
        }
        let tr = document.createElement("tr");
        tr.innerHTML = $(this).html();
        let cr = new Coure(tr);
        tablec.add(cr);
    });
}

function list() {
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

}


function collect() {
    var table0 = document.getElementById("tbd");
    table0.innerHTML = "";
    var table = document.getElementById("table1");
    var v6 = prompt("課程性質2", "");
    var v11 = prompt("上課節次", "03-04");
    var v14 = prompt("選上人數 (未滿 1 不篩 0)", "1");
    if (!!table)
        for (var i = 1, row; row = table.rows[i]; i++) {
            let coure = new Coure(row);
            if (coure.time.includes(v11))
                if (coure.prop2.includes(v6))
                    if (v14 == "0" || coure.p1 > coure.p3) {
                        table0.innerHTML += coure.html;
                        console.log(coure.sec);
                    }
        }
    scroll(0, 0);
    c_hover();
}

function tg1() {
    $("#table0").toggle();
    scroll(0, 0);
}