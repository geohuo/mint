var _display = "para";
var _mode = "read";
var _direction = "row";
var _word = "";
var _channal = "";
var _lang = "";
var _author = "";


var _arrData = new Array();
var _channalData;

var MAX_NOTE_NEST = 2;

var gBuildinDictIsOpen = false;

var note_renderer = new marked.Renderer();
note_renderer.code = function(code, language) {
    if (language == "mermaid") return '<pre class="mermaid">' + code + "</pre>";
    else return "<pre><code>" + code + "</code></pre>";
};
/*
{{203-1654-23-45@11@en@*}}
<note>203-1654-23-45@11@en@*</note>
<note id=guid book=203 para=1654 begin=23 end=45 author=11 lang=en tag=*></note>

<note  id=guid book=203 para=1654 begin=23 end=45 author=11 lang=en tag=*>
	<div class=text>
	pali text
	</div>
	<tran>
	</tran>
	<ref>
	</ref>
</note>
*/

/*
解析百科字符串
{{203-1654-23-45@11@en@*}}
<note id=12345 info="203-1654-23-45@11@en@*"><note>
<note id="guid" book=203 para=1654 begin=23 end=45 author=11 lang=en tag=*></note>

*/
function note_create() {
	$.post("../ucenter/get_setting.php", {}, function (data, status) {
		setting = JSON.parse(data);
	});

	wbw_channal_list_init();
	note_sent_edit_dlg_init();
	term_edit_dlg_init();
	pali_sim_dlg_init();
	related_para_dlg_init();
	term_get_all_pali();
}
function note_sent_edit_dlg_init() {
	$("body").append(
		'<div id="note_sent_edit_dlg" title="' +
			gLocal.gui.edit +
			'"><guide gid="markdown_guide"></guide><div id="edit_dialog_content"></div></div>'
	);
	guide_init();
	$("#note_sent_edit_dlg").dialog({
		autoOpen: false,
		width: 550,
		buttons: [
			{
				text: gLocal.gui.save,
				click: function () {
					note_sent_save();
					$(this).dialog("close");
				},
			},
			{
				text: gLocal.gui.cancel,
				click: function () {
					$(this).dialog("close");
				},
			},
		],
	});
}
function note_init(input,channel="",editor="",lang="en") {
	if (input) {
		let output = "<div>";
		//output += marked(input);
		output += marked(term_std_str_to_tran(input, channel, editor, lang), { renderer: note_renderer });

		output += "</div>";

		let newString = output.replace(/\{\{/g, '<span class="note_shell"><note style="" info="');
		newString = newString.replace(/\}\}/g, '" ></note></span>');

		return newString;
	} else {
		return "";
	}
}

function note_update_background_style() {
	var mSentsBook = new Array();
	var mBgIndex = 1;
	$("note[info]").each(function () {
		let info = $(this).attr("info").split("-");
		if (info.length >= 2) {
			let book = info[0];
			$(this).attr("book", book);
			if (!mSentsBook[book]) {
				mSentsBook[book] = mBgIndex;
				mBgIndex++;
			}
			$(this).addClass("bg_color_" + mSentsBook[book]);
		}
	});
}
//
function note_refresh_new(callback = null) {
    let Params={
        maxSentenceOneRequest:0
    };
	note_update_background_style();
	let objNotes = document.querySelectorAll("note");
	let arrSentInfo = new Array();
    let noteCounter = 0;
	for (const iterator of objNotes) {
		let id = iterator.id;
		if (id == null || id == "") {
            
			//查看这个节点是第几层note嵌套。大于预定层数退出。
			let layout = 1;
			let parent = iterator.parentNode;
			while (parent.nodeType == 1) {
				if (parent.nodeName == "NOTE") {
					layout++;
					if (layout > MAX_NOTE_NEST) {
						return false;
					}
				} else if (parent.nodeName == "BODY") {
					break;
				}
				parent = parent.parentNode;
			}
            
			id = com_guid();
			iterator.id = id;
			if (iterator.hasAttribute("info")) {
				let info = iterator.getAttribute("info");
				if (info != null || info != "") {
					/*
					let arrInfo = info.split("-");
					
					if (arrInfo.length >= 2) {
						let book = arrInfo[0];
						let para = arrInfo[1];
					}
					*/
					arrSentInfo.push({ id: id, data: info });
				}
			}
            noteCounter++;
            if(Params.maxSentenceOneRequest>0 && noteCounter>=Params.maxSentenceOneRequest){
                break;
            }
		}
	}
	if (arrSentInfo.length > 0) {
		let setting = new Object();
		setting.lang = "";
		setting.channal = _channal;
		$.post(
			"../term/note.php",
			{
				setting: JSON.stringify(setting),
				data: JSON.stringify(arrSentInfo),
			},
			function (data, status) {
				if (status == "success") {
					try {
						let sentData = JSON.parse(data);
                        //开始渲染句子
						for (const iterator of sentData) {
							let id = iterator.id;
							let strHtml = "<a name='" + id + "'></a>";
							if (_mode && _mode == "read") {
								//阅读模式
								strHtml += render_read_mode_sent(iterator);
								$("#" + id).html(strHtml);
							} else {
								//编辑模式
								strHtml += note_json_html(iterator);
								$("#" + id).html(strHtml);
							}
						}
                        //句子渲染完毕
						//处理<code>标签作为气泡注释
						popup_init();

						//刷新句子链接递归，有加层数限制。
						//note_refresh_new();

						//将新的数据添加到数据总表
						_arrData = _arrData.concat(sentData);
						note_ref_init();
						//获取术语字典
						term_get_dict(callback);
						//刷新channel列表
						note_channal_list();
						//显示不同的巴利语脚本
						refresh_pali_script();
						//把巴利语单词用<w>分隔用于点词查询等
						splite_pali_word();
						//处理编辑框消息
						tran_sent_textarea_event_init();
                        //处理鼠标移入显示菜单消息
                        setSentToolBarEvent();
						//初始化mermaid
						mermaid.initialize({startOnLoad:true});

					} catch (e) {
						console.error(e);
					}
				}
                
			}
		);
	} else {
		term_get_dict(callback);
	}

    return arrSentInfo.length;
}

//渲染巴利原文句子
function render_pali_sent(palitext){
	let output = "";
	output =
		"<pali book='" +
		palitext.book +
		"' para='" +
		palitext.para +
		"' begin='" +
		palitext.begin +
		"' end='" +
		palitext.end +
		"' >";
	if(palitext.book<1000){
		output += palitext.palitext;
	}
	else{
		output += marked(palitext.palitext);
	}
		
	output +="</pali>";
	return output;
}
//渲染阅读模式句子
function render_read_mode_sent(iterator) {
	let id = iterator.id;
	let strPalitext =render_pali_sent(iterator);

	if (
		$("#" + id)
			.parent()
			.parent()
			.children(".para_div").length == 0
	) {
		let tranDivHtml = "";
		if (_channal != "") {
			let arrChannal = _channal.split(",");
			for (let index = arrChannal.length - 1; index >= 0; index--) {
				const iChannal = arrChannal[index];
				tranDivHtml += "<div class='tran_div_channel'  channal='" + iChannal + "'></div>";
			}
		} else {
			tranDivHtml = "<div class='tran_div_channel'  channal='0'></div>";
		}
		$("#" + id)
			.parent()
			.parent()
			.prepend(
				"<div class='para_div'>"+
				"<div class='palitext_div'>"+
				"<div class='palitext palitext1'></div>"+
				"<div class='palitext palitext2'></div>"+
				"</div>"+
				"<div class='para_tran_div'>" +
					tranDivHtml +
					"</div></div>"
			);
	}

	$("#" + id)
		.parent()
		.parent()
		.children(".para_div")
		.find(".palitext")
		.first()
		.append(strPalitext);

	let htmlSent = "";
	htmlSent += "<div class='note_body'>";
	htmlSent += "<div class='palitext_div'>";
	htmlSent += "<div class='palitext palitext1'>" + strPalitext + "</div>";
	htmlSent += "<span class='sent_no_read_mode'>";
	htmlSent += iterator.book + "-" + iterator.para + "-" + iterator.begin + "-" + iterator.end;
	htmlSent += "<span>";
	htmlSent += "<div class='palitext palitext2'></div>";
	htmlSent += "</div>";
	htmlSent += "<div class='sent_tran_div'>";
	for (const oneTran of iterator.translation) {
		let html = "<span class='sent_tran' lang='" + oneTran.lang + "' channal='" + oneTran.channal + "'>";

		//将绝对链接转换为 用户连接的主机链接
		//oneTran.text = oneTran.text.replace(/www-[A-z]*.wikipali.org/g,location.host);

		html += marked(term_std_str_to_tran(oneTran.text, oneTran.channal, oneTran.editor, oneTran.lang));
		html += "</span>";
		htmlSent += html;
		let channelId = "0";
		if (_channal != "") {
			channelId = oneTran.channal;
		}
		$("#" + id)
			.parent()
			.parent()
			.find(".tran_div_channel[channal='" + channelId + "']")
			.append(html);
	}
	htmlSent += "</div>";
	htmlSent += "</div>"; //note_body
	htmlSent += "<div class='note_foot'>";
	htmlSent += "<span>" + iterator.ref + "</span>";
	htmlSent +=
		"<span class='sent_id'>" +
		iterator.book +
		"-" +
		iterator.para +
		"-" +
		iterator.begin +
		"-" +
		iterator.end +
		"</span>";
	htmlSent += "</div>"; //note_foot

	return htmlSent;
}
//生成channel列表
function note_channal_list() {
	console.log("note_channal_list start");
	let arrSentInfo = new Array();
	$("note").each(function () {
		let info = $(this).attr("info");
		if (info && info != "") {
			arrSentInfo.push({ id: "", data: info });
		}
	});

	if (arrSentInfo.length > 0) {
		$.post(
			"../term/channal_list.php",
			{
				setting: "",
				data: JSON.stringify(arrSentInfo),
			},
			function (data, status) {
				if (status == "success") {
					try {
						let active = JSON.parse(data);
						_channalData = active;
						for (const iterator of _my_channal) {
							let found = false;
							for (const one of active) {
								if (iterator.uid == one.uid) {
									found = true;
									break;
								}
							}
							if (found == false) {
								_channalData.push(iterator);
							}
						}
						let strHtml = "";
						for (const iterator of _channalData) {
							if (_channal.indexOf(iterator.id) >= 0) {
								strHtml += render_channal_list(iterator);
							}
						}
						for (const iterator of _channalData) {
							if (_channal.indexOf(iterator.id) == -1) {
								strHtml += render_channal_list(iterator);
							}
						}

						$("#channal_list").html(strHtml);
						set_more_button_display();

						let lang=new Object();
						let currLang=_lang;
						let firstChannel="";
						if(_channal!=""){
							firstChannel = _channal.split(",")[0];
						}										
						for (const iterator of _channalData) {
							lang[iterator.lang]=1;
							if(iterator.id==firstChannel){
								currLang = iterator.lang;
							}
						}
						let htmlLangSelect="<option value=''>全部语言</option>";
						let isLangMatched=false;
						for (const key in lang) {
							if (lang.hasOwnProperty.call(lang, key)) {
								let strLang = key;
								if(gLocal.language.hasOwnProperty.call(gLocal.language, key)){
									strLang = gLocal.language[key];
								}
								htmlLangSelect += "<option value='"+key+"' ";
								if(currLang==key){
									htmlLangSelect += "selected ";
									isLangMatched = true;
								}
								htmlLangSelect +=">"+strLang+"</option>";	
							}
						}
						$("#select_lang").html(htmlLangSelect);
						if(isLangMatched){
							render_edition_list(currLang);
						}else{
							render_edition_list("");
						}
					} catch (e) {
						console.error(e);
					}
				}
			}
		);
	}
}
function lang_changed(obj){
	_lang = $(obj).val();
	render_edition_list(_lang);
}
//顶部的版本列表
function render_edition_list(lang=""){
	let firstChannel="";
	if(_channal!=""){
		firstChannel = _channal.split(",")[0];
	}	
	let html = "";
	html += "<div class='case_dropdown-content'>";
	let currChannel="选择一个版本";
	for (const iterator of _channalData) {
		if(iterator.id==firstChannel){
			currChannel = iterator.name;
		}
		if(lang=="" || (lang!="" && lang==iterator.lang)){
			if (iterator["final"]){
				html += "<a onclick=\"edition_list_changed('"+iterator.id+"')\">"+iterator.name+"</a>";
			}
		}
	}
	html +="</div>";
	html = "<span>"+currChannel+"▼</span>" + html;
	$("#edition_dropdown").html(html);
}
function edition_list_changed(channelId){
	_channal = channelId;
	render_edition_list(_lang);
	set_channal(channelId);
}
function find_channal(id) {
	for (const iterator of _channalData) {
		if (id == iterator.id || id == iterator.uid) {
			return iterator;
		}
	}
	return false;
}

//生成版本列表
//选择列表中的版本切换页面
function render_channal_list(channalinfo) {
	let output = "";
	let checked = "";
	let selected = "noselect";
	if (_channal.indexOf(channalinfo.uid) >= 0) {
		checked = "checked";
		selected = "selected";
	}
	output += "<div class='list_with_head " + selected + "'>";

	output += '<div class="tool_bar">';
	output += '<div class="right">';
	output += '<div class="pop_menu">';
	output += render_icon_button("copy", "commit_init({src:'" + channalinfo.uid + "'})", gLocal.gui.copy_to);
	output += render_icon_button("ic_mode_edit", "", gLocal.gui.modify);
	output += "</div>";
	output += "</div>";
	output += "</div>";

	output +=
		'<div class="channel_select"><input type="checkbox" ' + checked + " channal_id='" + channalinfo.uid + "'></div>";
	output += "<div class='head'>";
	output += "<span class='head_img'>";
	if (parseInt(channalinfo.power) == 30) {
		output += gLocal.gui.your.slice(0, 1);
	} else {
		output += channalinfo.nickname.slice(0, 1);
	}

	output += "</span>";
	output += "</div>";

	output += "<div style='width: 100%;overflow-x: hidden;'>";

	output += "<div class='channal_list' >";

	//  output += "<a href='../wiki/wiki.php?word=" + _word;
	//  output += "&channal=" + channalinfo.uid + "' >";
	switch (parseInt(channalinfo.status)) {
		case 10:
			output += "🔐";
			break;
		case 20:
			output += "🌐";
			break;
		case 30:
			output += "🌐";
			break;
		default:
			break;
	}
	if (parseInt(channalinfo.power) >= 20) {
		//if (parseInt(channalinfo.power) != 30)
		{
			output += "✏️";
		}
	}
	//✋
	output += "<a onclick=\"set_channal('" + channalinfo.uid + "')\">";

	output += channalinfo["name"];

	output += "</a>";
	if (parseInt(channalinfo.power) == 30) {
		output += "@" + gLocal.gui.your;
	} else {
		output += "@" + channalinfo["nickname"];
	}
	output += "</div>";

	output += "<div class='userinfo_channal'>";
	output += channalinfo["username"];
	output += "</div>";

	//绘制句子进度
	if (channalinfo["final"]) {
		//进度
		output += "<div>";
		let article_len = channalinfo["article_len"];
		let svg_width = article_len;
		let svg_height = parseInt(article_len / 15);
		output += '<svg viewBox="0 0 ' + svg_width + " " + svg_height + '" width="100%" >';

		let curr_x = 0;
		let allFinal = 0;
		for (const iterator of channalinfo["final"]) {
			let stroke_width = parseInt(iterator.len);
			output += "<rect ";
			output += ' x="' + curr_x + '"';
			output += ' y="0"';
			output += ' height="' + svg_height + '"';
			output += ' width="' + stroke_width + '"';

			if (iterator.final == true) {
				allFinal += stroke_width;
				output += ' class="progress_bar_done" ';
			} else {
				output += ' class="progress_bar_undone" ';
			}
			output += "/>";

			curr_x += stroke_width;
		}
		output +=
			"<rect  x='0' y='0'  width='" + svg_width + "' height='" + svg_height / 5 + "' class='progress_bar_bg' />";
		output +=
			"<rect  x='0' y='0'  width='" +
			allFinal +
			"' height='" +
			svg_height / 5 +
			"' class='progress_bar_percent' style='stroke-width: 0; fill: rgb(100, 228, 100);'/>";
		output += '<text x="0" y="' + svg_height + '" font-size="' + svg_height * 0.8 + '">';
		output += channalinfo["count"] + "/" + channalinfo["all"] + "@" + curr_x;
		output += "</text>";
		output += "<svg>";
		output += "</div>";
		//进度结束
	}

	output += "</div>";
	output += "</div>";
	return output;
}

function onChannelMultiSelectStart() {
	$(".channel_select").show();
}
function onChannelMultiSelectCancel() {
	$(".channel_select").hide();
}
function onChannelChange() {
	let channal_list = new Array();
	$("[channal_id]").each(function () {
		if (this.checked) {
			channal_list.push($(this).attr("channal_id"));
		}
	});
	set_channal(channal_list.join());
}
//点击引用 需要响应的事件
function note_ref_init() {
	$("chapter").click(function () {
		let bookid = $(this).attr("book");
		let para = $(this).attr("para");
		window.open("../article/?view=chapter&book=" + bookid + "&par=" + para, "_blank");
	});

	$("para").click(function () {
		let bookid = $(this).attr("book");
		let para = $(this).attr("para");
		window.open("../article/?view=para&book=" + bookid + "&par=" + para, "_blank");
	});
}
/*
生成编辑模式句子块
id
palitext
tran
ref
*/
function note_json_html(in_json) {
	let output = "";
	output += '<div class="note_tool_bar" style=" position: relative;">';
	output += '<div class="case_dropdown note_tool_context" >';
	output += "<svg class='icon' >";
	output += "<use xlink:href='../studio/svg/icon.svg#ic_more'></use>";
	output += "</svg>";
	output += "<div class='case_dropdown-content sent_menu'>";
	if (typeof _reader_view != "undefined" && _reader_view != "sent") {
		output += "<a onclick='junp_to(this)'>" + gLocal.gui.jump_to_this_sent + "</a>";
	}
	output +=
		"<a  onclick='related_para_dlg_open(" +
		in_json.book +
		"," +
		in_json.para +
		")'>" +
		gLocal.gui.related_para +
		"</a>";
	output +=
		"<a  onclick='goto_nissaya(" +
		in_json.book +
		"," +
		in_json.para +
		"," +
		in_json.begin +
		"," +
		in_json.end +
		")'>" +
		gLocal.gui.show_nissaya +
		"</a>";
	output +=
		"<a onclick=\"copy_ref('" +
		in_json.book +
		"','" +
		in_json.para +
		"','" +
		in_json.begin +
		"','" +
		in_json.end +
		"')\">" +
		gLocal.gui.copy_link +
		"</a>";
	output += "<a onclick='copy_text(this)'>" + gLocal.gui.copy + "“" + gLocal.gui.pāli + "”</a>";
	output +=
		"<a onclick=\"edit_in_studio('" +
		in_json.book +
		"','" +
		in_json.para +
		"','" +
		in_json.begin +
		"','" +
		in_json.end +
		"')\">" +
		gLocal.gui.edit_now +
		"</a>";
	output += "<a onclick='add_to_list()'>" + gLocal.gui.add_to_edit_list + "</a>";
	output += "<a onclick='slider_show(this)'>Slider Show</a>";
	output += "</div>";
	output += "</div>";
	output += " </div>";

	let strPalitext = render_pali_sent(in_json);

	output += "<div class='note_body'>";
	output += "<div class='palitext_div'>";
	output += "<div class='palitext palitext_roma'>" + strPalitext + "</div>";
	output += "<div class='palitext palitext1'></div>";
	output += "<div class='palitext palitext2'></div>";
	output += "</div>";

	//译文开始
	output += "<div class='sent_tran_div'>";
	for (const iterator of in_json.translation) {
        if(iterator.channalinfo.type != "commentary"){
            output += render_one_sent_tran_a(iterator);
        }
	}
	output += "</div>";
	//译文结束
	output += "</div>"; /**note_body end */

	//工具栏开始
    let sent_id = in_json.book + "-" + in_json.para + "-" + in_json.begin + "-" + in_json.end;
	output += "<div class='other_tran_div' sent='" + sent_id + "' >";
	output += "<div class='tool_bar' sent='" + sent_id + "' >";
	output += "<span class='tool_left'>";
	//第一个按钮
	//新增译文按钮开始
	output += "<span class='' ";
	output += "book='" + in_json.book + "' ";
	output += "para='" + in_json.para + "' ";
	output += "begin='" + in_json.begin + "' ";
	output += "end='" + in_json.end + "' ";
	output += " >";
	output += "<span class='' onclick='add_new_tran_button_click(this)' title='" + gLocal.gui.add_tran + "'>➕</span>";
	output += "<div class='tran_text_tool_bar'>";
	output += "</div>";
	output += "</span>";
	//新增译文按钮结束

    //分隔线
	output += "<span class='separate_line'></span>";

	
	output += "<span class='more_tran icon_expand'></span>";

	//第二个按钮其他译文
	output += "<span class='other_bar' sent='"+sent_id+"' channel_type='translation'>";
	output +=
		"<span class='other_tran_span' title='" +
		gLocal.gui.other +
		gLocal.gui.translation +
		"'>";
	output += "<svg class='icon' style='fill: var(--box-bg-color1)'>";
	output += "<use xlink:href='../../node_modules/bootstrap-icons/bootstrap-icons.svg#translate'>";
	output += "</svg>" ;
	output +=	gLocal.gui.translation ;
	output += "</span>";
	output += "<span class='other_tran_num'></span>";
	output += "</span>";
    //第二个按钮结束

    //分割线
	output += "<span class='separate_line'></span>";

    //nissaya
	output += "<span class='other_bar' sent='"+sent_id+"' channel_type='nissaya' >";
	output +=
		"<span class='other_nissaya_span' title='" +
		gLocal.gui.other +
		gLocal.gui.translation +
		"'>";
	output += "<svg class='icon' style='fill: var(--box-bg-color1)'>";
	output += "<use xlink:href='../../node_modules/bootstrap-icons/bootstrap-icons.svg#sun'>";
	output += "</svg>" ;
	output += "Nissaya" ;
	output += "</span>";
	output += "<span class='other_tran_num'></span>";
	output += "</span>";

    //分割线
	output += "<span class='separate_line'></span>";

	//手工义注
	output += "<span class='other_bar'  sent='"+sent_id+"' channel_type='commentary' >";
	output +=
		"<span class='other_tran_span commentray' title='📔" +
		gLocal.gui.vannana +
		"'>";
	output += "<svg class='icon' style='fill: var(--box-bg-color1)'>";
	output += "<use xlink:href='../public/images/svg/oil-lamp.svg#oil-lamp'>";
	output += "</svg>" ;
	output += gLocal.gui.commentary +
		"</span>";
	output += "<span class='other_tran_num'></span>";
	output += "</span>";

    //分割线
	output += "<span class='separate_line'></span>";

	//第三个按钮 相似句
	if (parseInt(in_json.sim) > 0) {
		output += "<span class='sim_bar' >";
		output +=
			"<span class='similar_sent_span' onclick=\"note_show_pali_sim('" +
			in_json.pali_sent_id +
			"')\" title='" +
			gLocal.gui.similar_sentences +
			"'>";
        	output += "<svg class='icon' style='fill: var(--box-bg-color1)'>";
            output += "<use xlink:href='../../node_modules/bootstrap-icons/bootstrap-icons.svg#hdd-stack'>";
            output += "</svg>" ;
			output += gLocal.gui.similar + "</span>";
		output += "<span class='similar_sent_num'>" + in_json.sim + "</span>";
		output += "</span>";
		output += "<span class='separate_line'></span>";
	}
	//第三个按钮 相似句结束

	output += "</span>";

	output += "<span class='tool_right'>";
	//出处路径开始
	output += "<span class='ref'>";
	output += "<span class='book_name tooltip'>" + in_json.booktitle;
	output += "<span class='tooltiptext tooltip-bottom'>";
	output += in_json.ref;
	output += "</span>";
	output += "<span class='sent_no'>";
	output += in_json.book + "-" + in_json.para + "-" + in_json.begin + "-" + in_json.end;
	output += "<span>";
	output += "</span>";

	output += "</span>";
	//出处路径结束
	output += "</span>";

	output += "</div>";
	//工具栏结束

	//未选择的其他译文开始
	output += "<div class='other_tran'>";
	output += "</div>";

	output += "</div>";

	return output;
}

//设置取消输入框的编辑模式
function sent_tran_set_edit_mode(obj, isEditMode) {
	$(".sent_tran").removeClass("edit_mode");
	if (isEditMode) {
		let jqObj = $(obj);
		while (!jqObj.hasClass("sent_tran")) {
			jqObj = jqObj.parent();
			if (!jqObj) {
				return;
			}
		}
		jqObj.addClass("edit_mode");
	}
}

function sent_tran_edit(obj) {
	let jqObj = $(obj);
	while (!jqObj.hasClass("sent_tran")) {
		jqObj = jqObj.parent();
		if (!jqObj) {
			return;
		}
	}
	if (jqObj.hasClass("edit_mode")) {
		jqObj.removeClass("edit_mode");
	} else {
		$(".sent_tran").removeClass("edit_mode");
		jqObj.addClass("edit_mode");
	}
}

//采纳 pr
function sent_pr_merge(id) {
	$.post(
		"../usent/sent_pr_merge.php",
		{
			id: id,
		},
		function (data) {
			let result = JSON.parse(data);
			if (result.status > 0) {
				alert("error" + result.message);
			} else {
				ntf_show("成功采纳");
			}
		}
	);
}
function sent_commit(src, id) {
	commit_init({
		src: src,
		sent: [id],
		express: false,
	});
}

function render_icon_button(icon_id, event, tiptitle) {
	let html = "";
	html += "<button class='icon_btn tooltip' onclick=\"" + event + '">';
	html += '<svg class="icon" >';
	html += '<use xlink="http://www.w3.org/1999/xlink" href="../studio/svg/icon.svg#' + icon_id + '"></use>';
	html += "</svg>";
	html += "<span class='tooltiptext tooltip-top'>";
	html += tiptitle;
	html += "</span>";
	html += "</button>";
	return html;
}
var menuFocusIndex=0;
var term_data=["amanussa","anadhiṭṭhita","anantarāya","anissaṭṭha","aniyata","antaravāsaka"];
var term_filterd_data=[];
var term_input_text ;
var term_input="";

function TermRenderSentTranTextarea(text,dbId,sentId,channelId,isPr){
	let html="";
	html += '<div class="text_input" >';
	html += '<div class="menu"></div>';
	html += '<div class="textarea text_shadow"></div>';

	html += "<textarea class='textarea tran_sent_textarea' onfocus=\"text_input_textarea_focuse(this)\"";
	html += " dbid='" + dbId + "' ";
	html += "sid='" + sentId + "' ";
	html += "channel='" + channelId + "' ";
	if (typeof isPr != "undefined" && isPr == true) {
		html += ' is_pr="true" "';
	} else {
		html += 'is_pr="false"';
	}

	html += ">" ;
	html += text;
	html += "</textarea>";

	html += '</div>';
	return html;
}
function render_one_sent_tran_a(iterator, diff = false) {
	let mChannel = get_channel_by_id(iterator.channal);

	let tranText;
	let sid = iterator.book + "-" + iterator.para + "-" + iterator.begin + "-" + iterator.end;

	//将绝对链接转换为 用户连接的主机链接
	//let showText = iterator.text.replace(/www-[A-z]*.wikipali.org/g,location.host);
	let showText = iterator.text;

	if (iterator.text == "") {
		if (typeof iterator.channalinfo == "undefined") {
			tranText =
				"<span style='color:var(--border-line-color);'>" +
				"空" +
				"@" +
				iterator.editor_name.nickname +
				"</span>";
		} else {
			tranText =
				"<span style='color:var(--border-line-color);'>" +
				iterator.channalinfo.name +
				"-" +
				iterator.channalinfo.lang +
				"</span>";
		}
	} else {
		if (diff) {
			let orgText = "";
			for (const oneSent of _arrData) {
				if (
					oneSent.book == iterator.book &&
					oneSent.para == iterator.para &&
					oneSent.begin == iterator.begin &&
					oneSent.end == iterator.end
				) {
					for (const tran of oneSent.translation) {
						if (tran.channal == iterator.channal) {
							orgText = tran.text;
							break;
						}
					}
					break;
				}
			}
			tranText = str_diff(orgText, iterator.text);
		} else {
			//note_init处理句子链接
            if(iterator.type=='nissaya' || iterator.channalinfo.type=='nissaya'){
                tranText = renderNissayaPreview(iterator.text);
            }else{
                tranText = iterator.text;
            }
			tranText = note_init(term_std_str_to_tran(tranText, iterator.channal, iterator.editor, iterator.lang));
            if(iterator.type=='nissaya' || iterator.channalinfo.type=='nissaya'){
                tranText = "<div class='nissaya'>"+tranText+"</div>";
            }
		}
	}

	let html = "";
	html += "<div class='sent_tran ";
    html += iterator.channalinfo.type;
	if (typeof iterator.is_pr != "undefined" && iterator.is_pr == true) {
		html += " pr ";
	}
	html += "' dbid='" + iterator.id + "' channel='" + iterator.channal + "' sid='" + sid + "'>";
	html += "<div class='sent_tran_inner'>";
	html += '<div class="tool_bar">';
	html += '	<div class="right">';
	//句子菜单
	html += '<div class="pop_menu">';

	if (typeof iterator.is_pr != "undefined" && iterator.is_pr == true) {
		//在pr 列表中的译文
		if (typeof iterator.is_pr_editor != "undefined" && iterator.is_pr_editor == true) {
			//提交人
			//修改按钮
			html += render_icon_button("ic_mode_edit", "sent_tran_edit(this)", gLocal.gui.modify);
			//删除按钮
			html += render_icon_button("ic_delete", "sent_pr_del(this)", gLocal.gui.delete);
		} else {
			//非提交人
			if (parseInt(iterator.mypower) >= 20) {
				//有权限 采纳按钮
				html += render_icon_button(
					"accept_copy",
					"sent_pr_merge('" + iterator.id + "')",
					gLocal.gui.accept_copy
				);
			}
			//点赞按钮
			html += render_icon_button("like", "sent_pr_like(this)", gLocal.gui.like);
		}
	} else {
		//非pr列表里的句子
		//编辑按钮
		if (parseInt(iterator.mypower) < 20) {
			html += render_icon_button("my_idea", "sent_tran_edit(this)", gLocal.gui.suggest);
		} else {
			html += render_icon_button("ic_mode_edit", "sent_tran_edit(this)", gLocal.gui.edit);
		}

		//推送按钮
		let commitIcon = "";
		let commitTipText = "";
		if (parseInt(iterator.mypower) >= 30 && parseInt(iterator.status) < 30) {
			//我的私有资源 公开发布
			commitIcon = "publish";
			commitTipText = gLocal.gui.publish;
		} else {
			if (parseInt(iterator.mypower) < 20) {
				//只读资源 采纳
				commitIcon = "accept_copy";
				commitTipText = gLocal.gui.accept_copy;
			} else {
				//其他资源 复制到
				commitIcon = "copy";
				commitTipText = gLocal.gui.copy_to;
			}
		}
		html += render_icon_button(commitIcon, "sent_commit('" + iterator.channal + "','" + sid + "')", commitTipText);
		//推送按钮结束

		//更多按钮
		html += '<div class="case_dropdown">';

		html += "<button class='icon_btn'>";
		html += '<svg class="icon" >';
		html += '<use xlink="http://www.w3.org/1999/xlink" href="../studio/svg/icon.svg#ic_more"></use>';
		html += "</svg>";
		html += "</button>";

		html += '<div class="case_dropdown-content menu_space_between" style="right:0;">';
		//时间线
		html += "<a onclick=\"history_show('" + iterator.id + "')\">";
		html += "<span>" + gLocal.gui.timeline + "</span>";
		html += '<svg class="icon" >';
		html += '<use xlink="http://www.w3.org/1999/xlink" href="../studio/svg/icon.svg#recent_scan"></use>';
		html += "</svg>";
		html += "</a>";
		//复制
		html += "<a onclick=\"history_show('" + iterator.id + "')\">";
		html += "<span>" + gLocal.gui.copy + "</span>";
		html += '<svg class="icon" >';
		html += '<use xlink="http://www.w3.org/1999/xlink" href="../studio/svg/icon.svg#copy"></use>';
		html += "</svg>";
		html += "</a>";
		//点赞
		html += "<a onclick=\"history_show('" + iterator.id + "')\">";
		html += "<span>" + gLocal.gui.like + "</span>";
		html += '<svg class="icon" >';
		html += '<use xlink="http://www.w3.org/1999/xlink" href="../studio/svg/icon.svg#like"></use>';
		html += "</svg>";
		html += "</a>";
		//分享
		html += "<a onclick=\"history_show('" + iterator.id + "')\">";
		html += "<span>" + gLocal.gui.share_to + "</span>";
		html += '<svg class="icon" >';
		html += '<use xlink="http://www.w3.org/1999/xlink" href="../studio/svg/icon.svg#share_to"></use>';
		html += "</svg>";
		html += "</a>";

		html += "</div>";
		html += "</div>";
		//更多按钮结束
	}

	html += "</div>";
	//句子菜单结束

	html += "</div>";
	html += "</div>";
	//tool_bar 结束
	html += '<div class="left_bar" >';
	html += "<span class='icon_sent_status icon_sent_loading'>";
	html +=
		"<svg class='icon icon_spin' style='fill: var(--detail-color); '>" +
		"<use xlink='http://www.w3.org/1999/xlink' href='../studio/svg/icon.svg#loading'></use>" +
		"</svg>";
	html += "</span>";
	html += "<span class='icon_sent_status icon_sent_error' title='再次发送' onclick='tran_sent_save(this)'>";
	html +=
		"<svg class='icon' style='fill: red; '>" +
		"<use xlink='http://www.w3.org/1999/xlink' href='../term/error.svg'></use>" +
		"</svg>";
	html += "</span>";
	html += '	<div class="face">';
	if (iterator.id != "") {
		html += '<span class="head_img">' + iterator.editor_name.nickname.slice(0, 1) + "</span>";
	}
	html += "</div>";
	html +=
		'<div class="date" title="' +
		getFullDataTime(iterator.update_time) +
		'">' +
		getDataTime(iterator.update_time) +
		"</div>";
	html += "</div>";
	html += '<div class="body">';
	html += '<div class="head_bar">';
	html += '<div class="info">';
	html += '<span class="name channel_name" title="' + iterator.editor_name.nickname + gLocal.gui.recent_update + '">';
	if (typeof iterator.channalinfo == "undefined") {
		html += "unkown";
	} else {
		html += iterator.channalinfo.name;
	}
	html += "</span>";
	html += '<span class="name editor_name" ';
	if (typeof iterator.channalinfo == "undefined") {
		html += ">";
		html += "unkown";
	} else {
		html += 'title="' + iterator.channalinfo.name + gLocal.gui.recent_update + '">';
		html += iterator.editor_name.nickname;
	}
	html += "</span>";
	html += '<span class="date">' + getPassDataTime(iterator.update_time) + "</span>";
	html += "</div>";
	html += "<div class='preview'>" + tranText + "</div>";
	html += "</div>";

	html += '<div class="edit">';
	html += '<div class="input">';

	//输入框
	html += TermRenderSentTranTextarea(iterator.text,iterator.id,sid,iterator.channal,iterator.is_pr);


	html += "</div>";
	html += '<div class="edit_tool">';
	//html += ""
	html += '<span  style="display: inline-flex;">';
	html += '<span class="keybutton" >ESC</span> = ';
	html += "<a onclick='tran_sent_edit_cancel(this)'>" + gLocal.gui.cancel + "</a>";
	html += "</span>";
	html += "<span style='display: inline-flex;'>";
	html += '<span class="keybutton" >Ctrl/⌘</span>';
	html += "➕";
	html += '<span class="keybutton" >Enter</span> = ';
	if (parseInt(iterator.mypower) < 20) {
		html += "<a onclick='tran_sent_save(this)'>";
		html += gLocal.gui.submit + "<b>" + gLocal.gui.suggest + gLocal.gui.translation + "</b>";
		html += "</a></span><span style='display: inline-flex;'>";
	} else {
		html += "<a onclick='tran_sent_save(this)'>";
		html += gLocal.gui.save;
		html += "</a></span><span style='display: inline-flex;'>";
	}
	html += '<span class="keybutton" >Enter</span> = ';
	html += gLocal.gui.next_line;
	html += "</span><span style='display: inline-flex;'>MarkDown✅</span>";
	html += "</div>";
	html += "</div>";

	html += '<div class="foot_bar">';

	html += '<div class="info">';
	if (iterator.id != "") {
		html += '<span class="date"> ' + getPassDataTime(iterator.update_time) + "</span>";
	}
	if (iterator.id != "") {
		html += '<span class="name">' + iterator.editor_name.nickname + "</span>";
	}
	if (iterator.id != "") {
		html += '<span class="channel">' + gLocal.gui.updated + " ";
		if (typeof iterator.channalinfo == "undefined") {
			html += "unkown";
		} else {
			html += "<a title='" + iterator.channalinfo.summary + "'>" + iterator.channalinfo.name + "@</a>";
		}
		html += "</span>";
	} else {
		html += '<span class="channel">' + gLocal.gui.no_updated + " @";
		if (typeof iterator.channalinfo == "undefined") {
			html += "unkown";
		} else {
			html += "<a title='" + iterator.channalinfo.owner + "'>" + iterator.channalinfo.name + "@</a>";
		}
		html += "</span>";
	}

	html += '<ul class="tag_list">';
	if (iterator.pr_all && parseInt(iterator.pr_all) > 0) {
		html +=
			"<li onclick=\"note_pr_show('" +
			iterator.channal +
			"','" +
			sid +
			"')\"><span class='icon'>✋</span><span class='num'>" +
			iterator.pr_new +
			"/" +
			iterator.pr_all +
			"</span></li>";
	}
	html += "</ul>";
	html += "</div>"; //end of info

	html += "</div>"; //end of foot bar

	html += "</div>";
	html += "</div>";
	//sent_tran_inner结束
	html += '<div class="pr_content"></div>';
	html += "</div>";
	return html;
}
function renderNissayaPreview(str){
    let html ='';
    //html +="<div class='nissaya'>";
    const sent = str.split("\n");
    for (const iterator of sent) {
        const word =  iterator.split("=");
        if(iterator.indexOf('=')>=0){
            html += "<span class='nsy_word'>"
            html += "<span class='org'>";
            switch (getCookie('language')) {
                case 'my':
                    html +=  $.trim(word[0]) + "၊";
                    break;
                default:
                    html += my_to_roman(word[0]);
                    break;
            }
            html += "</span>";
            html += "<span class='meaning'>"+ word[1]+"</span>";
            html += "</span>";
        }else{
            html += iterator;
        }
    }
    //html += "</div>";
    return html;
}
function tran_sent_textarea_event_init() {
	let textarea = document.querySelectorAll(".tran_sent_textarea");
	for (let iterator of textarea) {
		iterator.onkeydown = function (e) {
			let menu = document.querySelector("#menu");
			switch (e.key) {
				case "Enter":
					if (menu && menu.style.display == "block") {
						let value = textarea.value;
						let selectionStart = textarea.selectionStart;
						let str1 = value.slice(0, selectionStart);
						let str2 = value.slice(selectionStart);
						textarea.value = str1 + data[menuFocusIndex] + "]]" + str2;
						menu.style.display = "none";
						return false;
					} else {
						if (e.ctrlKey) {
							//回车存盘
							tran_sent_save(e.currentTarget);
							return false;
						}
					}
					break;
				case "Escape":
					tran_sent_edit_cancel(e.currentTarget);
					break;
				default:
					break;
			}
		};
	}
}

function render_one_sent_tran(book, para, begin, end, iterator) {
	let output = "";
	output += "<div class='tran' lang='" + iterator.lang + "' style='display:flex;'>";
	//译文工具按钮开始
	output += "<div class='tran_text_tool_botton' onclick='tool_bar_show(this)'>";
	output +=
		"<div class='icon_expand' style='width: 0.8em;height: 0.8em;min-width: 0.8em;min-height: 0.8em;transition: transform 0.5s ease;'></div>";
	//译文工具栏开始
	output += "<div class='tran_text_tool_bar'>";
	output += "<div style='border-right: solid 1px;margin: 0.3em 0;'><li class = 'tip_buttom' ";
	output +=
		" onclick=\"note_edit_sentence('" +
		book +
		"' ,'" +
		para +
		"' ,'" +
		begin +
		"' ,'" +
		end +
		"' ,'" +
		iterator.channal +
		"')\"";
	output +=
		">" +
		'<svg class="icon" ><use xlink="http://www.w3.org/1999/xlink" href="../studio/svg/icon.svg#ic_mode_edit"></use></svg>';
	output += gLocal.gui.edit + "</li>";
	output += "<li class = 'tip_buttom' ";
	output += " onclick=\"history_show('" + iterator.id + "')\" >";
	output +=
		'<svg class="icon" ><use xlink="http://www.w3.org/1999/xlink" href="../studio/svg/icon.svg#recent_scan"></use></svg>';
	output += gLocal.gui.timeline + "</li>";
	output +=
		"<li class = 'tip_buttom'>" +
		'<svg class="icon" ><use xlink="http://www.w3.org/1999/xlink" href="../studio/svg/icon.svg#copy"></use></svg>';
	output += gLocal.gui.copy + "</li></div>";

	output +=
		"<div style='border-right: solid 1px;margin: 0.3em 0;'><li class = 'tip_buttom'>" +
		'<svg class="icon" ><use xlink="http://www.w3.org/1999/xlink" href="../studio/svg/icon.svg#like"></use></svg>';
	output += gLocal.gui.like + "</li>";
	output +=
		"<li class = 'tip_buttom'>" +
		'<svg class="icon" ><use xlink="http://www.w3.org/1999/xlink" href="../studio/svg/icon.svg#comment"></use></svg>';
	output += gLocal.gui.comment + "</li>";
	output +=
		"<li class = 'tip_buttom'>" +
		'<svg class="icon" ><use xlink="http://www.w3.org/1999/xlink" href="../studio/svg/icon.svg#ic_shopping_cart"></use></svg>';
	output += gLocal.gui.digest + "</li></div>";
	output +=
		"<div style='margin: 0.3em 0;'><li class = 'tip_buttom'>" +
		'<svg class="icon" ><use xlink="http://www.w3.org/1999/xlink" href="../studio/svg/icon.svg#share_to"></use></svg>';
	output += gLocal.gui.share_to + "</li>";
	output += "</div></div>";
	//译文工具栏结束
	output += "</div>";
	//译文工具按钮结束
	//译文正文开始
	output +=
		"<div class='text' id='tran_text_" +
		book +
		"_" +
		para +
		"_" +
		begin +
		"_" +
		end +
		"_" +
		iterator.channal +
		"'>";
	if (iterator.text == "") {
		output +=
			"<span style='color:var(--border-line-color);'>" +
			iterator.channalinfo.name +
			"-" +
			iterator.channalinfo.lang +
			"</span>";
	} else {
		//note_init处理句子链接
		output += note_init(term_std_str_to_tran(iterator.text, iterator.channal, iterator.editor, iterator.lang));
	}
	output += "</div>";
	//译文正文结束

	output += "</div>";
	//单个channal译文框结束
	return output;
}
function hidden_control(obj) {
	if ($(".lang_2")[0].style.display == "none" && $(".lang_3")[0].style.display == "none") {
		$(".lang_2").show();
		$(".lang_3").show();
		obj.innerHTML = "⬅"
	}
	else {
		$(".lang_2").hide();
		$(".lang_3").hide();
		obj.innerHTML = "➡"
	}
}

function add_new_tran_button_click(obj) {

	let html = "<div style='display:flex; max-width: 70vw; white-space: normal;'>";
	var first_lang = "";
	for (const iterator of _my_channal) {
		if (iterator.lang) {
			first_lang = iterator.lang;
			break;
		}
	}
	//母语channel列表
	html += "<ul class='channel_list lang_0' >";
	html += "<li>";
	html += gLocal.language[first_lang];
	html += "</li>";
	for (const iterator of _my_channal) {
		if (iterator.status > 0 && first_lang.indexOf(iterator.lang) != -1 && iterator.lang != 0) {
			if (_channal.indexOf(iterator.id) < 0) {
				html += '<li class="channel_name" onclick="';
				html +=
					"new_sentence('" +
					$(obj).parent().attr("book") +
					"' ,'" +
					$(obj).parent().attr("para") +
					"' ,'" +
					$(obj).parent().attr("begin") +
					"' ,'" +
					$(obj).parent().attr("end") +
					"' ,'" +
					iterator.id +
					"',this)";
				html += '" title="' + iterator.nickname;
				html += '">' + iterator.name;
				if (parseInt(iterator.power) < 20) {
					html += "(建议)";
				}
				html += "</li>";
			}
		}
	}
	html += "<li><a href='../channal/my_channal_index.php' target='_blank'><button>" + gLocal.gui.new + "&nbsp;" + gLocal.gui.channel + "</button></a></li>"
	html += "</ul>";
	//非母语channel列表
	html += "<ul class='channel_list lang_1'>";
	html += "<li>";
	html += gLocal.gui.other;
	html += "&nbsp;<button style='height: 1.8em;' onmouseover='hidden_control(this)'>➡</button>"
	html += "</li>";
	for (const iterator of _my_channal) {
		if (iterator.status > 0 && first_lang.indexOf(iterator.lang) == -1 && iterator.lang != 0) {
			if (_channal.indexOf(iterator.id) < 0) {
				html += '<li class="channel_name" onclick="';
				html +=
					"new_sentence('" +
					$(obj).parent().attr("book") +
					"' ,'" +
					$(obj).parent().attr("para") +
					"' ,'" +
					$(obj).parent().attr("begin") +
					"' ,'" +
					$(obj).parent().attr("end") +
					"' ,'" +
					iterator.id +
					"',this)";
				html += '" title="' + iterator.nickname;
				html += '">' + iterator.name;
				if (parseInt(iterator.power) < 20) {
					html += "(建议)";
				}
				html += "</li>";
			}
		}
	}
	html += "</ul>";
	//协作channel列表-带中文
	html += "<ul class='channel_list lang_2' style='display:none;'>";
	html += "<li>";
	html += "协作";
	html += "</li>";
	for (const iterator of _my_channal) {
		if (iterator.status > 0 && iterator.lang == 0 && checkStringIsChinese(iterator.name) == true) {
			if (_channal.indexOf(iterator.id) < 0) {
				html += '<li class="channel_name" onclick="';
				html +=
					"new_sentence('" +
					$(obj).parent().attr("book") +
					"' ,'" +
					$(obj).parent().attr("para") +
					"' ,'" +
					$(obj).parent().attr("begin") +
					"' ,'" +
					$(obj).parent().attr("end") +
					"' ,'" +
					iterator.id +
					"',this)";
				html += '" title="' + iterator.nickname;
				html += '">' + iterator.name;
				if (parseInt(iterator.power) < 20) {
					html += "(建议)";
				}
				html += "</li>";
			}
		}
	}
	html += "</ul>";
	//协作channel列表-不带中文
	html += "<ul class='channel_list lang_3' style='display:none;'>";
	html += "<li>";
	html += "collaborate";
	html += "</li>";
	for (const iterator of _my_channal) {
		if (iterator.status > 0 && iterator.lang == 0 && checkStringIsChinese(iterator.name) == false) {
			if (_channal.indexOf(iterator.id) < 0) {
				html += '<li class="channel_name" onclick="';
				html +=
					"new_sentence('" +
					$(obj).parent().attr("book") +
					"' ,'" +
					$(obj).parent().attr("para") +
					"' ,'" +
					$(obj).parent().attr("begin") +
					"' ,'" +
					$(obj).parent().attr("end") +
					"' ,'" +
					iterator.id +
					"',this)";
				html += '" title="' + iterator.nickname;
				html += '">' + iterator.name;
				if (parseInt(iterator.power) < 20) {
					html += "(建议)";
				}
				html += "</li>";
			}
		}
	}
	html += "</ul>";


	html += "</div>";
	$(obj).parent().children(".tran_text_tool_bar").first().html(html);

	if ($(obj).parent().children(".tran_text_tool_bar").css("display") == "block") {
		$(obj).parent().children(".tran_text_tool_bar").first().hide();
	} else {
		$(obj).parent().children(".tran_text_tool_bar").first().show();
		$(document).one("click", function () {
			$(obj).parent().children(".tran_text_tool_bar").first().hide();
		});
		event.stopPropagation();
		$(obj).parent().show();
	}
}
function checkStringIsChinese(str) {
	var pattern = new RegExp("[\u4E00-\u9FA5]+");
	if (pattern.test(str)) {
		return true;
	}
	return false;
}
function tool_bar_show(element) {
	if ($(element).find(".tran_text_tool_bar").css("display") == "none") {
		$(element).find(".tran_text_tool_bar").css("display", "flex");
		$(element).find(".icon_expand").css("transform", "rotate(-180deg)");
		$(element).css("background-color", "var(--btn-bg-color)");
		$(element).css("visibility", "visible");
		$(document).one("click", function () {
			$(element).find(".tran_text_tool_bar").hide();
			$(element).css("background-color", "var(--nocolor)");
			$(element).find(".icon_expand").css("transform", "unset");
			$(element).css("visibility", "");
		});
		event.stopPropagation();
	} else {
		$(element).find(".tran_text_tool_bar").hide();
		$(element).css("background-color", "var(--nocolor)");
		$(element).find(".icon_expand").css("transform", "unset");
		$(element).css("visibility", "");
	}
}
function new_sentence(book, para, begin, end, channel, obj) {
	let newsent = { id: "", text: "", lang: "", channal: channel };

	for (let iterator of _arrData) {
		if (iterator.book == book && iterator.para == para && iterator.begin == begin && iterator.end == end) {
			let found = false;
			for (const tran of iterator.translation) {
				if (tran.channal == channel) {
					found = true;
					break;
				}
			}
			if (!found) {
				iterator.translation.push(newsent);
			}
		}
	}
	if ($(obj).parent().parent().css("display") == "block") {
		$(obj).parent().parent().hide();
	}

	note_edit_sentence(book, para, begin, end, channel);
}

//显示更多译文按钮动作
function set_more_button_display() {
	$(".other_bar").each(function () {
		const sentid = $(this).attr("sent").split("-");
		const channelType = $(this).attr("channel_type");

		const book = sentid[0];
		const para = sentid[1];
		const begin = sentid[2];
		const end = sentid[3];
		let count = 0;
        let commentaryChannel=0;
        if(channelType=='commentary'){
            for (const iterator of _channal.split(',')) {
                let thisChannel = find_channal(iterator);
                if(thisChannel && thisChannel.type=='commentary'){
                    commentaryChannel++;
                }
            }            
        }

        
		for (const iterator of _channalData) {
			if (iterator.final && iterator.type==channelType) {
				for (const onesent of iterator.final) {
					let id = onesent.id.split("-");
					if (book == id[0] && para == id[1] && begin == id[2] && end == id[3] && onesent.final) {
                        if(channelType=='commentary'){
                            count++;
                        }else{
                            if (_channal.indexOf(iterator.id) == -1) {
                                count++;
                            }
                        }
					}
				}
			}
		}
		if (count > 0 || commentaryChannel>0) 
        {
			$(this).find(".other_tran_num").html(count);
			$(this).find(".other_tran_num").attr("style", "display:inline-flex;");
			$(this).off('click')
				.on('click',function () {
					const sentid = $(this).attr("sent").split("-");
		            const channelType = $(this).attr("channel_type");
					const book = sentid[0];
					const para = sentid[1];
					const begin = sentid[2];
					const end = sentid[3];
					let sentId = $(this).attr("sent");
                    let otherSentDiv = $(this).parent().parent().siblings(".other_tran").first();
					if (otherSentDiv.css("display") == "none") {
						otherSentDiv.slideDown();
                        //加号复位
						//$(this).siblings(".more_tran ").css("transform", "unset");
						$.get(
							"../usent/get.php",
							{
								book: book,
								para: para,
								begin: begin,
								end: end,
                                type:channelType,
							},
							function (data, status) {
								let arrSent = JSON.parse(data);
								let html = "<div class='compact "+channelType+"'>";
                                if(channelType==='commentary'){
                                    //先渲染被选择的channel
                                    if (_channal != "") {
                                        //for(const channel of _channal.split(","))
                                        {
                                            for (const sent of _arrData) {
                                                if (sent.book == book && sent.para==para && sent.begin==begin && sent.end==end) {
                                                    for (const tran of sent.translation) {
                                                        if(tran.channalinfo.type=='commentary'){
                                                            html += render_one_sent_tran_a(tran);
                                                        }
                                                    }
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                                //然后渲染没有被选择的
								for (const iterator of arrSent) {
									if (_channal.indexOf(iterator.channal) == -1) {
										html += render_one_sent_tran_a(iterator);
									}
								}
								html += "</div>";
								otherSentDiv.html(html);
                                if(channelType==='commentary'){
                                    note_refresh_new();
                                }

								//初始化文本编辑框消息处理
								tran_sent_textarea_event_init();
							}
						);
					} else {
						otherSentDiv.slideUp();
						$(this).siblings(".more_tran ").css("transform", "rotate(-90deg)");
					}

                    return false;    //  阻止事件冒泡
				});
		}else 
        {
			//隐藏自己
			//$(this).hide();
			$(this).addClass("disable");
			//$(this).find(".more_tran").hide();
		}
	});
}

function note_edit_sentence(book, para, begin, end, channal) {
	let channalInfo;
	for (const iterator of _channalData) {
		if (iterator.id == channal) {
			channalInfo = iterator;
			break;
		}
	}
	for (const iterator of _arrData) {
		if (iterator.book == book && iterator.para == para && iterator.begin == begin && iterator.end == end) {
			for (const tran of iterator.translation) {
				if (tran.channal == channal) {
					let html = "";
					html += "<div style='color:blue;'>" + channalInfo.name + "@" + channalInfo.nickname + "</div>";
					html +=
						"<textarea id='edit_dialog_text' sent_id='" +
						tran.id +
						"' book='" +
						book +
						"' para='" +
						para +
						"' begin='" +
						begin +
						"' end='" +
						end +
						"' channal='" +
						channal +
						"' style='width:100%;min-height:260px;'>" +
						tran.text +
						"</textarea>";
					$("#edit_dialog_content").html(html);
					$("#note_sent_edit_dlg").dialog("open");
					return;
				}
			}
		}
	}

	alert("未找到句子");
}
function tran_sent_edit_cancel(obj) {
	sent_tran_set_edit_mode(obj, false);
}
function tran_sent_save(obj) {
	let sentDiv = find_sent_tran_div(obj);
	if (sentDiv) {
		let textarea = $(sentDiv).children('.sent_tran_inner').first().children('.body').first().children('.edit').find(".tran_sent_textarea").first();
		//let textarea = $(sentDiv).children().find(".tran_sent_textarea").first();
		let isPr = $(textarea).attr("is_pr");
		if (isPr == "true") {
			note_pr_save(textarea);
		} else {
			note_sent_save_a(textarea);
		}
		sent_tran_set_edit_mode(textarea, false);
	} else {
		console.error("sent div not found");
	}
}

//保存pr句子 新
function note_pr_save(obj) {
	let id = $(obj).attr("dbid");
	let sid = $(obj).attr("sid").split("-");
	let book = sid[0];
	let para = sid[1];
	let begin = sid[2];
	let end = sid[3];
	let channel = $(obj).attr("channel");
	let text = $(obj).val();
	let sent_tran_div = find_sent_tran_div(obj);
	$.post(
		"../usent/pr_post.php",
		{
			id: id,
			book: book,
			para: para,
			begin: begin,
			end: end,
			channel: channel,
			text: text,
		},
		sent_save_callback
	);

	if (sent_tran_div) {
		$(sent_tran_div).addClass("loading");
	}
}

//保存译文句子 新
function note_sent_save_a(obj) {
	let id = $(obj).attr("dbid");
	let sid = $(obj).attr("sid").split("-");
	let book = sid[0];
	let para = sid[1];
	let begin = sid[2];
	let end = sid[3];
	let channal = $(obj).attr("channel");
	let text = $(obj).val();
	let sent_tran_div = find_sent_tran_div(obj);

	$.ajaxSetup({
		timeout: 5000,
	});

	$.post("../usent/sent_post.php", {
		id: id,
		book: book,
		para: para,
		begin: begin,
		end: end,
		channal: channal,
		text: text,
		lang: "zh",
	})
		.done(function (data) {
			sent_save_callback(data);
		})
		.fail(function (xhr, error, data) {
			let sid = book + "-" + para + "-" + begin + "-" + end;

			let sent_tran_div = $(".sent_tran[channel='" + channal + "'][sid='" + sid + "']");
			if (sent_tran_div) {
				sent_tran_div.removeClass("loading");
				sent_tran_div.addClass("error");
			}

			switch (error) {
				case "timeout":
					alert("服务器长时间没有回应。请稍后重试。");
					break;
				case "error":
					alert("与服务器通讯失败，您可能没有连接到网络。请稍后重试。");
					break;
				case "notmodified":
					break;
				default:
					break;
			}
		});

	if (sent_tran_div) {
		$(sent_tran_div).addClass("loading");
		$(sent_tran_div).removeClass("error");
	}
}
function update_sent_tran(sentData) {}
function sent_save_callback(data) {
	let result;
	try {
		result = JSON.parse(data);
	} catch (e) {
		alert(e.message);
        console.error('sent_save_callback',data);
		return;
	}
	if (result.status > 0) {
		alert("error" + result.message);
	} else {
		let sid = result.book + "-" + result.para + "-" + result.begin + "-" + result.end;

		let sent_tran_div = $(
			".sent_tran[dbid='" + result.id + "'][channel='" + result.channal + "'][sid='" + sid + "']"
		);
		if (sent_tran_div) {
			sent_tran_div.removeClass("loading");
		}
		if (result.commit_type == 1 || result.commit_type == 2) {
			ntf_show("成功修改");
			if (sent_tran_div) {
				let divPreview = sent_tran_div.find(".preview").first();
                let thisChannel = find_channal(result.channal);
				if (result.text == "") {
                    //内容为空
					let channel_info = "Empty";
					if (thisChannel) {
						channel_info = thisChannel.name + "-" + thisChannel.nickname;
					}
					divPreview.html("<span style='color:var(--border-line-color);'>" + channel_info + "</span>");
				} else {
					for (const iterator of _arrData) {
						if (
							iterator.book == result.book &&
							iterator.para == result.para &&
							iterator.begin == result.begin &&
							iterator.end == result.end
						) {
							for (const tran of iterator.translation) {
								if (tran.channal == result.channal) {
									tran.text = result.text;
									break;
								}
							}
						}
					}
                    switch (thisChannel.type) {
                        case 'nissaya':
                            divPreview.html(renderNissayaPreview(result.text));
                            break;
                        case 'commentary':
                            divPreview.html(
                                note_init(result.text, result.channal, result.editor, result.lang)
                            );
                            note_refresh_new();
                        break;
                        default:
                            divPreview.html(
                                marked(term_std_str_to_tran(result.text, result.channal, result.editor, result.lang))
                            );
                            term_updata_translation();                        
                            break;
                    }
					popup_init();
				}
			}
		} else if (result.commit_type == 3) {
			ntf_show("已经提交修改建议");
		} else {
			ntf_show("未提交");
		}
	}
}

//保存译文句子
function note_sent_save() {
	let id = $("#edit_dialog_text").attr("sent_id");
	let book = $("#edit_dialog_text").attr("book");
	let para = $("#edit_dialog_text").attr("para");
	let begin = $("#edit_dialog_text").attr("begin");
	let end = $("#edit_dialog_text").attr("end");
	let channal = $("#edit_dialog_text").attr("channal");
	let text = $("#edit_dialog_text").val();

	$.post(
		"../usent/sent_post.php",
		{
			id: id,
			book: book,
			para: para,
			begin: begin,
			end: end,
			channal: channal,
			text: text,
			lang: "zh",
		},
		function (data) {
			let result = JSON.parse(data);
			if (result.status > 0) {
				alert("error" + result.message);
			} else {
				if (result.commit_type == 1 || result.commit_type == 2) {
					ntf_show("成功修改");
					if (result.text == "") {
						let channel_info = "Empty";
						let thisChannel = find_channal(result.channal);
						if (thisChannel) {
							channel_info = thisChannel.name + "-" + thisChannel.nickname;
						}
						$(
							"#tran_text_" +
								result.book +
								"_" +
								result.para +
								"_" +
								result.begin +
								"_" +
								result.end +
								"_" +
								result.channal
						).html("<span style='color:var(--border-line-color);'>" + channel_info + "</span>");
					} else {
						$(
							"#tran_text_" +
								result.book +
								"_" +
								result.para +
								"_" +
								result.begin +
								"_" +
								result.end +
								"_" +
								result.channal
						).html(marked(term_std_str_to_tran(result.text, result.channal, result.editor, result.lang)));
						term_updata_translation();
						for (const iterator of _arrData) {
							if (
								iterator.book == result.book &&
								iterator.para == result.para &&
								iterator.begin == result.begin &&
								iterator.end == result.end
							) {
								for (const tran of iterator.translation) {
									if (tran.channal == result.channal) {
										tran.text = result.text;
										break;
									}
								}
							}
						}
					}
				} else if (result.commit_type == 3) {
					ntf_show("已经提交修改建议");
				} else {
					ntf_show("未提交");
				}
			}
		}
	);
}

function copy_ref(book, para, begin, end) {
	let strRef = "{{" + book + "-" + para + "-" + begin + "-" + end + "}}";
	copy_to_clipboard(strRef);
}

function goto_nissaya(book, para, begin = 0, end = 0) {
	window.open("../nissaya/index.php?book=" + book + "&par=" + para + "&begin=" + begin + "&end=" + end, "nissaya");
}
function edit_in_studio(book, para, begin, end) {
	wbw_channal_list_open(book, [para]);
}

//显示和隐藏某个内容 如 巴利文
function setVisibility(key, value) {
	switch (key) {
		case "palitext":
			if ($(value).is(":checked")) {
				$(".palitext").show();
			} else {
				$(".palitext").hide();
			}

			break;

		default:
			break;
	}
}

function note_show_pali_sim(SentId) {
	pali_sim_dlg_open(SentId, 0, 20);
}

function set_pali_script(pos, script) {
	if (script == "none") {
		$(".palitext" + pos).html("");
	} else {
		$(".palitext" + pos).each(function () {
			let html = $(this).siblings(".palitext_roma").first().html();
			$(this).html(html);
		});

		$(".palitext" + pos)
			.find("*")
			.contents()
			.filter(function () {
				return this.nodeType != 1;
			})
			.wrap("<pl" + pos + "></pl" + pos + ">");

		$(".palitext" + pos)
			.contents()
			.filter(function () {
				return this.nodeType != 1;
			})
			.wrap("<pl" + pos + "></pl" + pos + ">");

		$("pl" + pos).html(function (index, oldcontent) {
			switch(script){
				case "မြန်မာ":
					return roman_to_my(oldcontent);
				case "My2Roman":
					return my_to_roman(oldcontent);
				case "සිංහල":
					return roman_to_si(oldcontent);
				case "ᨲ᩠ᩅᩫᨴᩱ᩠ᨿᨵᨾ᩠ᨾ᩼":
					return roman_to_tai(oldcontent);
				case "อักษรไทย":
					return roman_to_thai(oldcontent);
				default:
					return(oldcontent);
			}
			
		});
	}
}

function splite_pali_word() {
	$("pali")
		.contents()
		.filter(function () {
			return this.nodeType != 1;
		})
		.wrap("<pl></pl>");

	$("pl").each(function () {
		let html = $(this).html();
		$(this).html("<w>" + html.replace(/\s/g, "</w> <w>") + "</w>");
	});

	$("w").click(function () {
		let word = com_getPaliReal($(this).text());
		if (gBuildinDictIsOpen) {
			window.open("../dict/index.php?builtin=true&key=" + word, "dict");
		}
	});
}

function refresh_pali_script() {
	if (_display && _display == "para") {
		//段落模式
	} else {
		//句子模式
		setting_get("lib.second_script", set_second_scrip);
	}
}
function set_second_scrip(value) {
	set_pali_script(2, value);
}
function slider_show(obj) {
	$(obj).parent().parent().parent().parent().parent().toggleClass("slider_show_shell");
}

function find_sent_tran_div(obj) {
	let jqObj = $(obj);
	while (!jqObj.hasClass("sent_tran")) {
		jqObj = jqObj.parent();
		if (!jqObj) {
			return false;
		}
	}
	return jqObj;
	/*
	let parent = obj.parentNode;
	while (parent.nodeType == 1) {
		if ($(parent).hasClass("sent_tran")) {
			return parent;
		} else if (parent.nodeName == "BODY") {
			return false;
		}
		parent = parent.parentNode;
	}

	return false;
	*/
}
//显示或隐藏pr数据
function note_pr_show(channel, id) {
	let obj = $(".sent_tran[channel='" + channel + "'][sid='" + id + "']").find(".pr_content");
	let prHtml = obj.first().html();
	if (prHtml == "") {
		note_get_pr(channel, id);
	} else {
		obj.slideUp();
		obj.html("");
	}
}

//获取pr数据并显示
function note_get_pr(channel, id) {
	let sid = id.split("-");
	let book = sid[0];
	let para = sid[1];
	let begin = sid[2];
	let end = sid[3];
	$.post(
		"../usent/get_pr.php",
		{
			book: book,
			para: para,
			begin: begin,
			end: end,
			channel: channel,
		},
		function (data) {
			let result = JSON.parse(data);
			if (result.length > 0) {
				let html = "<div class='compact pr'>";
				for (const iterator of result) {
					html += render_one_sent_tran_a(iterator, true);
				}
				html += "</div>";
				$(".sent_tran[channel='" + channel + "'][sid='" + id + "']")
					.find(".pr_content")
					.html(html);
				$(".sent_tran[channel='" + channel + "'][sid='" + id + "']")
					.find(".pr_content")
					.slideDown();
			} else {
			}
		}
	);
	$(".sent_tran[channel='" + channel + "'][sid='" + id + "']")
		.find(".pr_content")
		.html("loading");
	$(".sent_tran[channel='" + channel + "'][sid='" + id + "']")
		.find(".pr_content")
		.show();
}

function get_channel_by_id(id) {
	if (typeof _channalData != "undefined") {
		for (const iterator of _channalData) {
			if (iterator.id == id) {
				return iterator;
			}
		}
	}
	if (typeof _my_channal != "undefined") {
		for (const iterator of _my_channal) {
			if (iterator.id == id) {
				return iterator;
			}
		}
	}
	return false;
}
//设置显示方向
function setDirection(obj) {
	if (obj.value == "row") {
		$("#contents").removeClass("vertical");
		$("#contents").addClass("horizontal");
		_direction = "row";
	} else {
		$("#contents").removeClass("horizontal");
		$("#contents").addClass("vertical");
		_direction = "col";
	}
}
//设置逐段或逐句模式
function setDisplay(obj) {
	if (obj.value == "para") {
		$("#contents").removeClass("sent_mode");
		$("#contents").addClass("para_mode");
		_display = "para";
	} else {
		$("#contents").removeClass("para_mode");
		$("#contents").addClass("sent_mode");
		_display = "sent";
	}
}

//获取文章中H 并渲染为目录
function render_heading_toc() {
	//$(":header")
}


//术语输入At 
const _term_max_menu=9;
function term_set_word_list_data(el){
	let sid = $(el).attr("sid");
	let asid = sid.split("-");
	let words=new Array();
	let tmpWords = [];
	term_data=[];
	for (const it of _arrData) {
		if(it.book==asid[0] && it.para==asid[1] && it.begin==asid[2] && it.end==asid[3]){
			let palitext = it.palitext;
			words = palitext.split(" ");
		}
	}
	console.log("word",words);
	//查询parent
	for (let index = 0; index < words.length; index++) {
		words[index] = com_getPaliReal(words[index]);
		if(words[index]!=""){
			let parents = term_parent(words[index]);

			for (const key in parents) {
				if (parents.hasOwnProperty.call(parents, key)) {		
					//term_data.push({word:key,en:com_getPaliEn(key),weight:weight});
					tmpWords[key]={word:key,en:com_getPaliEn(key),weight:3,exist:0};
				}
			}
		}
	}
	for (const iterator of arrTermAllPali) {
		if(tmpWords.hasOwnProperty(iterator.word)){
			tmpWords[iterator.word].weight+=1;
			tmpWords[iterator.word].exist=1;
		}else{
			tmpWords[iterator.word]={word:iterator.word,en:com_getPaliEn(iterator.word),weight:1,exist:1};
		}
	}	
	//arrMyTerm 词头查重
	let tmpMyTerm=[];
	for (const iterator of arrMyTerm) {
		tmpMyTerm[iterator.word]=1;
	}
	//加入到列表
	//在我的字典中的排名靠前
	for (const key in tmpMyTerm) {
		if (tmpMyTerm.hasOwnProperty.call(tmpMyTerm, key)) {
			if(tmpWords.hasOwnProperty(key)){
				tmpWords[key].weight+=1;
				tmpWords[key].exist=2;
			}else{
				tmpWords[key]={word:key,en:com_getPaliEn(key),weight:1,exist:2};
			}
		}
	}

	for (const key in tmpWords) {
		if (tmpWords.hasOwnProperty.call(tmpWords, key)) {
			const element = tmpWords[key];
			term_data.push(element);
		}
	}
	term_data.sort(function(a,b){
		return b.weight-a.weight;
	});

}

function text_input_textarea_focuse(el){
	term_set_word_list_data(el);
	term_input_text = el;
	term_input_text.onresize = function(){
		term_input_text.parentElement.querySelector(".text_shadow").style.height=term_input_text.clientHeight+"px";
	}
	term_input_text.onkeydown = function (e) {
	
		let menu = term_input_text.parentElement.querySelector('.menu');
		switch (e.key) {
			case "ArrowDown"://down arrow
				if(menu.style.display=="block"){
					menuFocusIndex++;
					if(menuFocusIndex>_term_max_menu){
						menuFocusIndex=_term_max_menu;
					}
					menu.innerHTML=TermAtRenderMenu({focus:menuFocusIndex});
					return false;					
				}
				break;
			case "ArrowUp"://up arrow
				if(menu.style.display=="block"){
					menuFocusIndex--;
					if(menuFocusIndex<0){
						menuFocusIndex=0;
					}
					menu.innerHTML=TermAtRenderMenu({focus:menuFocusIndex});
					return false;					
				}
			break;
			case "Enter":
				if(menu.style.display=="block"){
					term_insert(term_filterd_data[menuFocusIndex]);
					return false;
				}
				if (e.ctrlKey) {
					//回车存盘
					tran_sent_save(e.currentTarget);
					return false;
				}
				break;
			case "Escape":
				if(menu.style.display=="block"){
					term_at_menu_hide();
				}else{
					tran_sent_edit_cancel(e.currentTarget);
				}
				
				break;
			default:
				break;
		}
	}
	term_input_text.onkeyup = function (e) {
		let textHeight = term_input_text.parentElement.querySelector(".text_shadow").scrollHeight;
		let textHeight2 = term_input_text.clientHeight;
		if(textHeight2>textHeight){
			textHeight=textHeight2;
		}
		term_input_text.style.height = textHeight+"px";
		console.log("text height",textHeight);

	let value = term_input_text.value
	let selectionStart = term_input_text.selectionStart
	let str1 = value.slice(0, selectionStart)
	let str2 = value.slice(selectionStart)
	let textNode1 = document.createTextNode(str1)
	let textNode2 = document.createTextNode(str2)
	let cursor = document.createElement('span')
	cursor.innerHTML = '&nbsp;'
	cursor.setAttribute('class','cursor')
	let mirror = term_input_text.parentElement.querySelector('.text_shadow')
	mirror.innerHTML = ''
	mirror.appendChild(textNode1)
	mirror.appendChild(cursor)
	mirror.appendChild(textNode2)
	let menu = term_input_text.parentElement.querySelector('.menu');	
	if(str1.slice(-2)=="[[" ){
		if( menu.style.display!="block"){
			menuFocusIndex=0;
			menu.innerHTML=TermAtRenderMenu({focus:0});
			term_at_menu_show(cursor);
		}
	}else{
		if( menu.style.display=="block"){
			let pos1=str1.lastIndexOf("[[");
			let pos2=str1.lastIndexOf("]]");
			if(pos1==-1 || (pos1!=-1 && pos2>pos1)){
				//光标前没有[[ 或 光标在[[]] 之后
				term_at_menu_hide();
			}
		}
	}

	
	if(menu.style.display=="block"){
		//term_input += e.key;
		let value = term_input_text.value
		let selectionStart = term_input_text.selectionStart
		let str1 = value.slice(0, selectionStart)
		let str2 = value.slice(selectionStart)
		let pos1=str1.lastIndexOf("[[");
		let pos2=str1.lastIndexOf("]]");
		if(pos1!=-1){
			if(pos2==-1 || pos2<pos1){
				//光标
				term_input = str1.slice(str1.lastIndexOf("[[")+2);
			}
		}
		console.log("term_input",term_input);
		menu.innerHTML=TermAtRenderMenu({focus:menuFocusIndex});
	}

	console.log(e.key);
	console.log(cursor.offsetLeft,cursor.offsetTop)
}

}
function term_at_menu_show(cursor){
	menuFocusIndex=0;
	let menu = term_input_text.parentElement.querySelector('.menu');
	menu.style.display="block";
	menu.style.top=cursor.offsetTop+20+"px";
	menu.style.left=cursor.offsetLeft+"px";
	$(document).on("keyup", function (e) {
		if(e.key=="Escape"){
			term_at_menu_hide();
		}
	});
}
function term_at_menu_hide(){
	let menu = term_input_text.parentElement.querySelector('.menu');
	menu.style.display="none";
	term_input="";
}
function term_insert(strTerm){
	let value = term_input_text.value;
	let selectionStart = term_input_text.selectionStart;
	let str1 = value.slice(0, selectionStart)
	let str2 = value.slice(selectionStart)
	let pos1=str1.lastIndexOf("[[");
	let pos2=str1.lastIndexOf("]]");
	if(pos1!=-1){
		//光标前有[[
		if(pos2==-1 || pos2<pos1){
			//光标在[[之间]]
			str1 = str1.slice(0,str1.lastIndexOf("[[")+2);
		}
	}

	//TODO 光标会跑到最下面
	term_input_text.value = str1+strTerm+"]]"+str2;
	term_at_menu_hide();
}
function TermAtRenderMenu(params) {
	term_filterd_data=[];
	let html="";
	html +="<div class='term_at_menu_input'>"+term_input+"|</div>";
	html +="<ul class='term_at_menu_ul'>";
	let index=0;
	let focusIndex = params.focus%term_data.length;
	for (const it of term_data) {
		if(term_input=="" || it.word.indexOf(term_input)==0 || it.en.indexOf(term_input)==0){
			
			html +="<li ";
			if(focusIndex==index){
				html +="class='trem_focus' "
			}
			html += "onclick=\"term_insert('"+it.word+"')\" ";
			
			html +=">";
			html += (index+1)+ ". ";
			if(it.exist>0){
				html += "<b>"+it.word+"</b>";
			}else{
				html +=it.word;
			}
			html +="<li>";
			term_filterd_data.push(it.word);
			if(index >= _term_max_menu){
				break;
			}
			index++;
		}
		
	}
	return html;
}

//添加自动格位数据到内存字典
function term_parent(paliword) {
	let output=[];
	for (const it of gCaseTable) {
		if (it.type != ".v.") {
			let sEnd2 = paliword.slice(0 - it.end2.length);
			if (sEnd2 == it.end2) {
				let wordParent = paliword.slice(0, 0 - it.end2.length) + it.end1;
				output[wordParent]=1;
			}
		}		
	}
	return output;
}

function setSentToolBarEvent(){
    $('.sent_tran_inner').not('.commentary').off('mouseenter').on('mouseenter',function(){
        $(this).children('.tool_bar').first().children('.right').show();
    });
    $('.sent_tran_inner').not('.commentary').off('mouseleave').on('mouseleave',function(){
        $(this).children('.tool_bar').first().children('.right').hide();
    })
}