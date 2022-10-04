var ctb_frame = `<div class="w3-sidebar w3-bar-block w3-collapse w3-card w3-animate-right" style="width:28%;right:0;" id="mySidebar"><div class="panel panel-primary"><table id="table2" class="table-hover" cellspacing="3" cellpadding="0" border="1" width="100%"><tbody><tr><td bgcolor="#000000"></td><td width="12%" bgcolor="#000000"><div align="center"><font color="#ffffff">星期一</font></div></td><td width="12%" bgcolor="#000000"><div align="center"><font color="#ffffff">星期二</font></div></td><td width="12%" bgcolor="#000000"><div align="center"><font color="#ffffff">星期三</font></div></td><td width="12%" bgcolor="#000000"><div align="center"><font color="#ffffff">星期四</font></div></td><td width="12%" bgcolor="#000000"><div align="center"><font color="#ffffff">星期五</font></div></td><td width="12%" bgcolor="#000000"><div align="center"><font color="#ffffff">星期六</font></div></td></tr>`;
for (var i = 1; i < 14; i++) {
    ctb_frame += `<tr style="background-color:lightblue;height:40px"><td width="8%" bgcolor="#000000"><div align="center"><font color="#ffffff">第 ` + i + ` 節</font></div></td>`;
    for (var j = 1; j < 7; j++) {
        ctb_frame += `<td class="myshow" width="12%" bgcolor="#ffffff" data-toggle="tooltip" title="星期 ` + j + ` 第 ` + i + ` 節"></td>`;
    }
}
ctb_frame += `</tr></tbody></table></div></div>`;