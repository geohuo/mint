﻿var local_grammastr=[
{ "id":"$" , "value":"·" },
{ "id":"$" , "value":"·" },
{ "id":"$" , "value":"·" },
{ "id":".nt." , "value":"中" },
{ "id":".m." , "value":"陽" },
{ "id":".f." , "value":"陰" },
{ "id":".sg." , "value":"單" },
{ "id":".pl." , "value":"複" },
{ "id":".nom." , "value":"主" },
{ "id":".voc." , "value":"呼" },
{ "id":".acc." , "value":"受" },
{ "id":".gen." , "value":"屬" },
{ "id":".dat." , "value":"目的" },
{ "id":".inst." , "value":"具" },
{ "id":".abl." , "value":"源" },
{ "id":".loc." , "value":"處" },
{ "id":".imp." , "value":"命令" },
{ "id":".cond." , "value":"條件" },
{ "id":".opt." , "value":"願" },
{ "id":".pres." , "value":"現" },
{ "id":".aor." , "value":"過" },
{ "id":".pf." , "value":"完" },
{ "id":".fut." , "value":"將" },
{ "id":".act." , "value":"主" },
{ "id":".refl." , "value":"反" },
{ "id":".1p." , "value":"第一" },
{ "id":".2p." , "value":"第二" },
{ "id":".3p." , "value":"第三" },
{ "id":".prp." , "value":"現分" },
{ "id":".prpa." , "value":"現分" },
{ "id":".prpp." , "value":"現分" },
{ "id":".pp." , "value":"過分" },
{ "id":".ppa." , "value":"主過分" },
{ "id":".ppp." , "value":"被過分" },
{ "id":".futp." , "value":"未分" },
{ "id":".fpa." , "value":"未主分" },
{ "id":".fpp." , "value":"未被分" },
{ "id":".grd." , "value":"義務" },
{ "id":".pass." , "value":"被動" },
{ "id":".caus." , "value":"使役" },
{ "id":".desid." , "value":"意欲" },
{ "id":".intens." , "value":"強意" },
{ "id":".denom." , "value":"名動" },
{ "id":".ger." , "value":"連續" },
{ "id":".abs." , "value":"絕對" },
{ "id":".inf." , "value":"不定" },
{ "id":".n." , "value":"名" },
{ "id":".n:base." , "value":"名詞幹" },
{ "id":".ti:base." , "value":"三性詞幹" },
{ "id":".v:base." , "value":"動原型" },
{ "id":".adj." , "value":"形" },
{ "id":".ti." , "value":"三性" },
{ "id":".num." , "value":"數" },
{ "id":".pron." , "value":"代" },
{ "id":".v.ind." , "value":"動不變" },
{ "id":".v." , "value":"動" },
{ "id":".v:ind." , "value":"動不變" },
{ "id":".ind." , "value":"不變" },
{ "id":".adv." , "value":"副" },
{ "id":".adj:base." , "value":"形詞幹 " },
{ "id":".num:base." , "value":"數詞幹 " },
{ "id":".conj." , "value":"連" },
{ "id":".prep." , "value":"介" },
{ "id":".interj." , "value":"感嘆" },
{ "id":".comp." , "value":"複合" },
{ "id":".pron:base." , "value":"代詞幹" },
{ "id":".pre." , "value":"前綴" },
{ "id":".root." , "value":"詞根" },
{ "id":".suf." , "value":"後綴" },
{ "id":".end." , "value":"語尾" },
{ "id":".part." , "value":"待定片段" },
{ "id":".fr." , "value":"來自" },
{ "id":".note." , "value":"原版註釋" },
{ "id":"？" , "value":"待定" },
{ "id":"_un_auto_factormean_" , "value":"—自動—" },
{ "id":"_un_auto_mean_" , "value":"&nbsp;× × ×&nbsp;" },
{ "id":".un." , "value":"黏音" }
];


var local_type_str=[
{ "id":".n." , "value":"名" },
{ "id":".v." , "value":"動" },
{ "id":".ti." , "value":"三性" },
{ "id":".ind." , "value":"不變" },
{ "id":".pron." , "value":"代" },
{ "id":".v:ind." , "value":"動不變" },
{ "id":".num." , "value":"數" },
{ "id":".un." , "value":"黏音" },
{ "id":".comp." , "value":"複合" },
{ "id":".pron:base." , "value":"代詞幹" },
{ "id":".adj:base." , "value":"形詞幹 " },
{ "id":".n:base." , "value":"名詞幹" },
{ "id":".ti:base." , "value":"三性詞幹" },
{ "id":".num:base." , "value":"數詞幹" },
{ "id":".note." , "value":"原版註釋" },
{ "id":".v:base." , "value":"動原型" },
{ "id":".adj." , "value":"形" },
{ "id":".pre." , "value":"前綴" },
{ "id":".root." , "value":"詞根" },
{ "id":".suf." , "value":"後綴" },
{ "id":".end." , "value":"語尾" }

];

var local_formula=[
{"id":".1p.$.pl.$.aor." , "value":"{我們曾}~{過}${吾等曾}~{過}${我們}~{完了}${吾等}~{完了}${我們}~{了}${吾等}~{了}${我們}~{過}${吾等}~{過}${我們曾}~{}${吾等曾}~{}" },
{"id":".1p.$.pl.$.fut." , "value":"{我們將}~{}${吾等將}~{}${我們必將}~{}${吾等必將}~{}${我們一定會}~{}${吾等一定會}~{}${我們終將}~{}${吾等終將}~{}${我們定會}~{}${吾等定會}~{}${我們將要}~{}${吾等將要}~{}" },
{"id":".1p.$.pl.$.imp." , "value":"{讓我們來}~{}${讓吾等來}~{}${請我們}~{}${請吾等}~{}${請我們來}~{}${請吾等來}~{}${我們來}~{啊}${吾等來}~{啊}${讓我們}~{}${讓吾等}~{}${我們會}~{}${吾等會}~{}${我們要}~{}${吾等要}~{}${我們得}~{}${吾等得}~{}${我們去}~{啊}${吾等去}~{啊}${我們去}~{}${吾等去}~{}" },
{"id":".1p.$.pl.$.opt." , "value":"{如若我們}~{}${如若吾等}~{}${如果我們}~{}${如果吾等}~{}${若我們}~{}${若吾等}~{}${我們若}~{}${吾等若}~{}${我們如果}~{}${吾等如果}~{}${我們應}~{}${吾等應}~{}${我們願}~{}${吾等願}~{}${我們想}~{}${吾等想}~{}${我們願意}~{}${吾等願意}~{}${需要我們}~{}${需要吾等}~{}${我們需要}~{}${吾等需要}~{}${我們該}~{}${吾等該}~{}${我們應該}~{}${吾等應該}~{}" },
{"id":".1p.$.pl.$.pres." , "value":"{我們}~{}${吾等}~{}${我們在}~{呢}${吾等在}~{呢}${我們正}~{}${吾等正}~{}${我們在}~{}${吾等在}~{}${我們正在}~{}${吾等正在}~{}" },
{"id":".1p.$.sg.$.aor." , "value":"{我曾}~{過}${吾曾}~{過}${我}~{完了}${吾}~{完了}${我}~{了}${吾}~{了}${我}~{過}${吾}~{過}${我曾}~{}${吾曾}~{}" },
{"id":".1p.$.sg.$.fut." , "value":"{我將}~{}${吾將}~{}${我必將}~{}${吾必將}~{}${我一定會}~{}${吾一定會}~{}${我終將}~{}${吾終將}~{}${我定會}~{}${吾定會}~{}${我將要}~{}${吾將要}~{}" },
{"id":".1p.$.sg.$.imp." , "value":"{讓我來}~{}${讓吾來}~{}${請我}~{}${請吾}~{}${請我來}~{}${請吾來}~{}${我來}~{啊}${吾來}~{啊}${讓我}~{}${讓吾}~{}${我會}~{}${吾會}~{}${我要}~{}${吾要}~{}${我得}~{}${吾得}~{}${我去}~{啊}${吾去}~{啊}${我去}~{}${吾去}~{}" },
{"id":".1p.$.sg.$.opt." , "value":"{如若我}~{}${如若吾}~{}${如果我}~{}${如果吾}~{}${若我}~{}${若吾}~{}${我若}~{}${吾若}~{}${我如果}~{}${吾如果}~{}${我應}~{}${吾應}~{}${我願}~{}${吾願}~{}${我想}~{}${吾想}~{}${我願意}~{}${吾願意}~{}${需要我}~{}${需要吾}~{}${我需要}~{}${吾需要}~{}${我該}~{}${吾該}~{}${我應該}~{}${吾應該}~{}" },
{"id":".1p.$.sg.$.pres." , "value":"{我}~{}${吾}~{}${我在}~{呢}${吾在}~{呢}${我正}~{}${吾正}~{}${我在}~{}${吾在}~{}${我正在}~{}${吾正在}~{}" },
{"id":".2p.$.pl.$.aor." , "value":"{你們曾}~{過}${您曾}~{過}${大家曾}~{過}${汝等曾}~{過}${你們}~{完了}${您}~{完了}${大家}~{完了}${汝等}~{完了}${你們}~{了}${您}~{了}${大家}~{了}${汝等}~{了}${你們}~{過}${您}~{過}${大家}~{過}${汝等}~{過}${你們曾}~{}${您曾}~{}${大家曾}~{}${汝等曾}~{}" },
{"id":".2p.$.pl.$.fut." , "value":"{你們將}~{}${您將}~{}${大家將}~{}${汝等將}~{}${你們必將}~{}${您必將}~{}${大家必將}~{}${汝等必將}~{}${你們一定會}~{}${您一定會}~{}${大家一定會}~{}${汝等一定會}~{}${你們終將}~{}${您終將}~{}${大家終將}~{}${汝等終將}~{}${你們定會}~{}${您定會}~{}${大家定會}~{}${汝等定會}~{}${你們將要}~{}${您將要}~{}${大家將要}~{}${汝等將要}~{}" },
{"id":".2p.$.pl.$.imp." , "value":"{讓你們來}~{}${讓您來}~{}${讓大家來}~{}${讓汝等來}~{}${請你們}~{}${請您}~{}${請大家}~{}${請汝等}~{}${請你們來}~{}${請您來}~{}${請大家來}~{}${請汝等來}~{}${你們來}~{啊}${您來}~{啊}${大家來}~{啊}${汝等來}~{啊}${讓你們}~{}${讓您}~{}${讓大家}~{}${讓汝等}~{}${你們會}~{}${您會}~{}${大家會}~{}${汝等會}~{}${你們要}~{}${您要}~{}${大家要}~{}${汝等要}~{}${你們得}~{}${您得}~{}${大家得}~{}${汝等得}~{}${你們去}~{啊}${您去}~{啊}${大家去}~{啊}${汝等去}~{啊}${你們去}~{}${您去}~{}${大家去}~{}${汝等去}~{}" },
{"id":".2p.$.pl.$.opt." , "value":"{如若你們}~{}${如若您}~{}${如若大家}~{}${如若汝等}~{}${如果你們}~{}${如果您}~{}${如果大家}~{}${如果汝等}~{}${若你們}~{}${若您}~{}${若大家}~{}${若汝等}~{}${你們若}~{}${您若}~{}${大家若}~{}${汝等若}~{}${你們如果}~{}${您如果}~{}${大家如果}~{}${汝等如果}~{}${你們應}~{}${您應}~{}${大家應}~{}${汝等應}~{}${你們願}~{}${您願}~{}${大家願}~{}${汝等願}~{}${你們想}~{}${您想}~{}${大家想}~{}${汝等想}~{}${你們願意}~{}${您願意}~{}${大家願意}~{}${汝等願意}~{}${需要你們}~{}${需要您}~{}${需要大家}~{}${需要汝等}~{}${你們需要}~{}${您需要}~{}${大家需要}~{}${汝等需要}~{}${你們該}~{}${您該}~{}${大家該}~{}${汝等該}~{}${你們應該}~{}${您應該}~{}${大家應該}~{}${汝等應該}~{}" },
{"id":".2p.$.pl.$.pres." , "value":"{你們}~{}${您}~{}${大家}~{}${汝等}~{}${你們在}~{呢}${您在}~{呢}${大家在}~{呢}${汝等在}~{呢}${你們正}~{}${您正}~{}${大家正}~{}${汝等正}~{}${你們在}~{}${您在}~{}${大家在}~{}${汝等在}~{}${你們正在}~{}${您正在}~{}${大家正在}~{}${汝等正在}~{}" },
{"id":".2p.$.sg.$.aor." , "value":"{你曾}~{過}${汝曾}~{過}${你}~{完了}${汝}~{完了}${你}~{了}${汝}~{了}${你}~{過}${汝}~{過}${你曾}~{}${汝曾}~{}" },
{"id":".2p.$.sg.$.fut." , "value":"{你將}~{}${汝將}~{}${你必將}~{}${汝必將}~{}${你一定會}~{}${汝一定會}~{}${你終將}~{}${汝終將}~{}${你定會}~{}${汝定會}~{}${你將要}~{}${汝將要}~{}" },
{"id":".2p.$.sg.$.imp." , "value":"{讓你來}~{}${讓汝來}~{}${請你}~{}${請汝}~{}${請你來}~{}${請汝來}~{}${你來}~{啊}${汝來}~{啊}${讓你}~{}${讓汝}~{}${你會}~{}${汝會}~{}${你要}~{}${汝要}~{}${你得}~{}${汝得}~{}${你去}~{啊}${汝去}~{啊}${你去}~{}${汝去}~{}" },
{"id":".2p.$.sg.$.opt." , "value":"{如若你}~{}${如若汝}~{}${如果你}~{}${如果汝}~{}${若你}~{}${若汝}~{}${你若}~{}${汝若}~{}${你如果}~{}${汝如果}~{}${你應}~{}${汝應}~{}${你願}~{}${汝願}~{}${你想}~{}${汝想}~{}${你願意}~{}${汝願意}~{}${需要你}~{}${需要汝}~{}${你需要}~{}${汝需要}~{}${你該}~{}${汝該}~{}${你應該}~{}${汝應該}~{}" },
{"id":".2p.$.sg.$.pres." , "value":"{你}~{}${汝}~{}${你在}~{呢}${汝在}~{呢}${你正}~{}${汝正}~{}${你在}~{}${汝在}~{}${你正在}~{}${汝正在}~{}" },
{"id":".3p.$.pl.$.aor." , "value":"{其等曾}~{過}${TA們曾}~{過}${他們曾}~{過}${她們曾}~{過}${它們曾}~{過}${其等}~{完了}${TA們}~{完了}${他們}~{完了}${她們}~{完了}${它們}~{完了}${其等}~{了}${TA們}~{了}${他們}~{了}${她們}~{了}${它們}~{了}${其等}~{過}${TA們}~{過}${他們}~{過}${她們}~{過}${它們}~{過}${其等曾}~{}${TA們曾}~{}${他們曾}~{}${她們曾}~{}${它們曾}~{}" },
{"id":".3p.$.pl.$.fut." , "value":"{其等將}~{}${TA們將}~{}${他們將}~{}${她們將}~{}${它們將}~{}${其等必將}~{}${TA們必將}~{}${他們必將}~{}${她們必將}~{}${它們必將}~{}${其等一定會}~{}${TA們一定會}~{}${他們一定會}~{}${她們一定會}~{}${它們一定會}~{}${其等終將}~{}${TA們終將}~{}${他們終將}~{}${她們終將}~{}${它們終將}~{}${其等定會}~{}${TA們定會}~{}${他們定會}~{}${她們定會}~{}${它們定會}~{}${其等將要}~{}${TA們將要}~{}${他們將要}~{}${她們將要}~{}${它們將要}~{}" },
{"id":".3p.$.pl.$.imp." , "value":"{讓其等來}~{}${讓TA們來}~{}${讓他們來}~{}${讓她們來}~{}${讓它們來}~{}${請其等}~{}${請TA們}~{}${請他們}~{}${請她們}~{}${請它們}~{}${請其等來}~{}${請TA們來}~{}${請他們來}~{}${請她們來}~{}${請它們來}~{}${其等來}~{啊}${TA們來}~{啊}${他們來}~{啊}${她們來}~{啊}${它們來}~{啊}${讓其等}~{}${讓TA們}~{}${讓他們}~{}${讓她們}~{}${讓它們}~{}${其等會}~{}${TA們會}~{}${他們會}~{}${她們會}~{}${它們會}~{}${其等要}~{}${TA們要}~{}${他們要}~{}${她們要}~{}${它們要}~{}${其等得}~{}${TA們得}~{}${他們得}~{}${她們得}~{}${它們得}~{}${其等去}~{啊}${TA們去}~{啊}${他們去}~{啊}${她們去}~{啊}${它們去}~{啊}${其等去}~{}${TA們去}~{}${他們去}~{}${她們去}~{}${它們去}~{}" },
{"id":".3p.$.pl.$.opt." , "value":"{如若其等}~{}${如若TA們}~{}${如若他們}~{}${如若她們}~{}${如若它們}~{}${如果其等}~{}${如果TA們}~{}${如果他們}~{}${如果她們}~{}${如果它們}~{}${若其等}~{}${若TA們}~{}${若他們}~{}${若她們}~{}${若它們}~{}${其等若}~{}${TA們若}~{}${他們若}~{}${她們若}~{}${它們若}~{}${其等如果}~{}${TA們如果}~{}${他們如果}~{}${她們如果}~{}${它們如果}~{}${其等應}~{}${TA們應}~{}${他們應}~{}${她們應}~{}${它們應}~{}${其等願}~{}${TA們願}~{}${他們願}~{}${她們願}~{}${它們願}~{}${其等想}~{}${TA們想}~{}${他們想}~{}${她們想}~{}${它們想}~{}${其等願意}~{}${TA們願意}~{}${他們願意}~{}${她們願意}~{}${它們願意}~{}${需要其等}~{}${需要TA們}~{}${需要他們}~{}${需要她們}~{}${需要它們}~{}${其等需要}~{}${TA們需要}~{}${他們需要}~{}${她們需要}~{}${它們需要}~{}${其等該}~{}${TA們該}~{}${他們該}~{}${她們該}~{}${它們該}~{}${其等應該}~{}${TA們應該}~{}${他們應該}~{}${她們應該}~{}${它們應該}~{}" },
{"id":".3p.$.pl.$.pres." , "value":"{其等}~{}${TA們}~{}${他們}~{}${她們}~{}${它們}~{}${其等在}~{呢}${TA們在}~{呢}${他們在}~{呢}${她們在}~{呢}${它們在}~{呢}${其等正}~{}${TA們正}~{}${他們正}~{}${她們正}~{}${它們正}~{}${其等在}~{}${TA們在}~{}${他們在}~{}${她們在}~{}${它們在}~{}${其等正在}~{}${TA們正在}~{}${他們正在}~{}${她們正在}~{}${它們正在}~{}" },
{"id":".3p.$.sg.$.aor." , "value":"{其曾}~{過}${他曾}~{過}${她曾}~{過}${它曾}~{過}${其}~{完了}${他}~{完了}${她}~{完了}${它}~{完了}${其}~{了}${他}~{了}${她}~{了}${它}~{了}${其}~{過}${他}~{過}${她}~{過}${它}~{過}${其曾}~{}${他曾}~{}${她曾}~{}${它曾}~{}" },
{"id":".3p.$.sg.$.fut." , "value":"{其將}~{}${他將}~{}${她將}~{}${它將}~{}${其必將}~{}${他必將}~{}${她必將}~{}${它必將}~{}${其一定會}~{}${他一定會}~{}${她一定會}~{}${它一定會}~{}${其終將}~{}${他終將}~{}${她終將}~{}${它終將}~{}${其定會}~{}${他定會}~{}${她定會}~{}${它定會}~{}${其將要}~{}${他將要}~{}${她將要}~{}${它將要}~{}" },
{"id":".3p.$.sg.$.imp." , "value":"{讓其來}~{}${讓他來}~{}${讓她來}~{}${讓它來}~{}${請其}~{}${請他}~{}${請她}~{}${請它}~{}${請其來}~{}${請他來}~{}${請她來}~{}${請它來}~{}${其來}~{啊}${他來}~{啊}${她來}~{啊}${它來}~{啊}${讓其}~{}${讓他}~{}${讓她}~{}${讓它}~{}${其會}~{}${他會}~{}${她會}~{}${它會}~{}${其要}~{}${他要}~{}${她要}~{}${它要}~{}${其得}~{}${他得}~{}${她得}~{}${它得}~{}${其去}~{啊}${他去}~{啊}${她去}~{啊}${它去}~{啊}${其去}~{}${他去}~{}${她去}~{}${它去}~{}" },
{"id":".3p.$.sg.$.opt." , "value":"{如若其}~{}${如若他}~{}${如若她}~{}${如若它}~{}${如果其}~{}${如果他}~{}${如果她}~{}${如果它}~{}${若其}~{}${若他}~{}${若她}~{}${若它}~{}${其若}~{}${他若}~{}${她若}~{}${它若}~{}${其如果}~{}${他如果}~{}${她如果}~{}${它如果}~{}${其應}~{}${他應}~{}${她應}~{}${它應}~{}${其願}~{}${他願}~{}${她願}~{}${它願}~{}${其想}~{}${他想}~{}${她想}~{}${它想}~{}${其願意}~{}${他願意}~{}${她願意}~{}${它願意}~{}${需要其}~{}${需要他}~{}${需要她}~{}${需要它}~{}${其需要}~{}${他需要}~{}${她需要}~{}${它需要}~{}${其該}~{}${他該}~{}${她該}~{}${它該}~{}${其應該}~{}${他應該}~{}${她應該}~{}${它應該}~{}" },
{"id":".3p.$.sg.$.pres." , "value":"{其}~{}${他}~{}${她}~{}${它}~{}${其在}~{呢}${他在}~{呢}${她在}~{呢}${它在}~{呢}${其正}~{}${他正}~{}${她正}~{}${它正}~{}${其在}~{}${他在}~{}${她在}~{}${它在}~{}${其正在}~{}${他正在}~{}${她正在}~{}${它正在}~{}" },

{"id":".pl.$.abl." , "value":"{由諸}~${由}~{等}${由}~{們}${由}~{些}${出於諸}~${出於}~{等}${出於}~{們}${出於}~{些}${從諸}~{而來}${從}~{等而來}${從}~{們而來}${從}~{些而來}${從諸}~${從}~{等}${從}~{們}${從}~{些}${來自諸}~${來自}~{等}${來自}~{們}${來自}~{些}${比諸}~${比}~{等}${比}~{們}${比}~{些}${由於諸}~${由於}~{等}${由於}~{們}${由於}~{些}${因為諸}~${因為}~{等}${因為}~{們}${因為}~{些}" },
{"id":"$.pl.$.abl." , "value":"{由諸}~${由}~{等}${由}~{們}${由}~{些}${出於諸}~${出於}~{等}${出於}~{們}${出於}~{些}${從諸}~{而來}${從}~{等而來}${從}~{們而來}${從}~{些而來}${從諸}~${從}~{等}${從}~{們}${從}~{些}${來自諸}~${來自}~{等}${來自}~{們}${來自}~{些}${比諸}~${比}~{等}${比}~{們}${比}~{些}${由於諸}~${由於}~{等}${由於}~{們}${由於}~{些}${因為諸}~${因為}~{等}${因為}~{們}${因為}~{些}" },
{"id":".1p.$.pl.$.abl." , "value":"{由諸}~${由}~{等}${由}~{們}${由}~{些}${出於諸}~${出於}~{等}${出於}~{們}${出於}~{些}${從諸}~{而來}${從}~{等而來}${從}~{們而來}${從}~{些而來}${從諸}~${從}~{等}${從}~{們}${從}~{些}${來自諸}~${來自}~{等}${來自}~{們}${來自}~{些}${比諸}~${比}~{等}${比}~{們}${比}~{些}${由於諸}~${由於}~{等}${由於}~{們}${由於}~{些}${因為諸}~${因為}~{等}${因為}~{們}${因為}~{些}" },
{"id":".2p.$.pl.$.abl." , "value":"{由諸}~${由}~{等}${由}~{們}${由}~{些}${出於諸}~${出於}~{等}${出於}~{們}${出於}~{些}${從諸}~{而來}${從}~{等而來}${從}~{們而來}${從}~{些而來}${從諸}~${從}~{等}${從}~{們}${從}~{些}${來自諸}~${來自}~{等}${來自}~{們}${來自}~{些}${比諸}~${比}~{等}${比}~{們}${比}~{些}${由於諸}~${由於}~{等}${由於}~{們}${由於}~{些}${因為諸}~${因為}~{等}${因為}~{們}${因為}~{些}" },
{"id":".m.$.pl.$.abl." , "value":"{由諸}~${由}~{等}${由}~{們}${由}~{些}${出於諸}~${出於}~{等}${出於}~{們}${出於}~{些}${從諸}~{而來}${從}~{等而來}${從}~{們而來}${從}~{些而來}${從諸}~${從}~{等}${從}~{們}${從}~{些}${來自諸}~${來自}~{等}${來自}~{們}${來自}~{些}${比諸}~${比}~{等}${比}~{們}${比}~{些}${由於諸}~${由於}~{等}${由於}~{們}${由於}~{些}${因為諸}~${因為}~{等}${因為}~{們}${因為}~{些}" },
{"id":".nt.$.pl.$.abl." , "value":"{由諸}~${由}~{等}${由}~{們}${由}~{些}${出於諸}~${出於}~{等}${出於}~{們}${出於}~{些}${從諸}~{而來}${從}~{等而來}${從}~{們而來}${從}~{些而來}${從諸}~${從}~{等}${從}~{們}${從}~{些}${來自諸}~${來自}~{等}${來自}~{們}${來自}~{些}${比諸}~${比}~{等}${比}~{們}${比}~{些}${由於諸}~${由於}~{等}${由於}~{們}${由於}~{些}${因為諸}~${因為}~{等}${因為}~{們}${因為}~{些}" },
{"id":".f.$.pl.$.abl." , "value":"{由諸}~${由}~{等}${由}~{們}${由}~{些}${出於諸}~${出於}~{等}${出於}~{們}${出於}~{些}${從諸}~{而來}${從}~{等而來}${從}~{們而來}${從}~{些而來}${從諸}~${從}~{等}${從}~{們}${從}~{些}${來自諸}~${來自}~{等}${來自}~{們}${來自}~{些}${比諸}~${比}~{等}${比}~{們}${比}~{些}${由於諸}~${由於}~{等}${由於}~{們}${由於}~{些}${因為諸}~${因為}~{等}${因為}~{們}${因為}~{些}" },
{"id":".pl.$.acc." , "value":"{把諸}~${把}~{等}${把}~{們}${把}~{些}${諸}~$~{等}$~{們}$~{些}" },
{"id":"$.pl.$.acc." , "value":"{把諸}~${把}~{等}${把}~{們}${把}~{些}${諸}~$~{等}$~{們}$~{些}" },
{"id":".1p.$.pl.$.acc." , "value":"{把諸}~${把}~{等}${把}~{們}${把}~{些}${諸}~$~{等}$~{們}$~{些}" },
{"id":".2p.$.pl.$.acc." , "value":"{把諸}~${把}~{等}${把}~{們}${把}~{些}${諸}~$~{等}$~{們}$~{些}" },
{"id":".m.$.pl.$.acc." , "value":"{把諸}~${把}~{等}${把}~{們}${把}~{些}${諸}~$~{等}$~{們}$~{些}" },
{"id":".nt.$.pl.$.acc." , "value":"{把諸}~${把}~{等}${把}~{們}${把}~{些}${諸}~$~{等}$~{們}$~{些}" },
{"id":".f.$.pl.$.acc." , "value":"{把諸}~${把}~{等}${把}~{們}${把}~{些}${諸}~$~{等}$~{們}$~{些}" },
{"id":".pl.$.dat." , "value":"{對於諸}~${對於}~{等}${對於}~{們}${對於}~{些}${對諸}~{來說}${對}~{等來說}${對}~{們來說}${對}~{些來說}${為了諸}~${為了}~{等}${為了}~{們}${為了}~{些}${向諸}~${向}~{等}${向}~{們}${向}~{些}${對諸}~${對}~{等}${對}~{們}${對}~{些}" },
{"id":"$.pl.$.dat." , "value":"{對於諸}~${對於}~{等}${對於}~{們}${對於}~{些}${對諸}~{來說}${對}~{等來說}${對}~{們來說}${對}~{些來說}${為了諸}~${為了}~{等}${為了}~{們}${為了}~{些}${向諸}~${向}~{等}${向}~{們}${向}~{些}${對諸}~${對}~{等}${對}~{們}${對}~{些}" },
{"id":".1p.$.pl.$.dat." , "value":"{對於諸}~${對於}~{等}${對於}~{們}${對於}~{些}${對諸}~{來說}${對}~{等來說}${對}~{們來說}${對}~{些來說}${為了諸}~${為了}~{等}${為了}~{們}${為了}~{些}${向諸}~${向}~{等}${向}~{們}${向}~{些}${對諸}~${對}~{等}${對}~{們}${對}~{些}" },
{"id":".2p.$.pl.$.dat." , "value":"{對於諸}~${對於}~{等}${對於}~{們}${對於}~{些}${對諸}~{來說}${對}~{等來說}${對}~{們來說}${對}~{些來說}${為了諸}~${為了}~{等}${為了}~{們}${為了}~{些}${向諸}~${向}~{等}${向}~{們}${向}~{些}${對諸}~${對}~{等}${對}~{們}${對}~{些}" },
{"id":".m.$.pl.$.dat." , "value":"{對於諸}~${對於}~{等}${對於}~{們}${對於}~{些}${對諸}~{來說}${對}~{等來說}${對}~{們來說}${對}~{些來說}${為了諸}~${為了}~{等}${為了}~{們}${為了}~{些}${向諸}~${向}~{等}${向}~{們}${向}~{些}${對諸}~${對}~{等}${對}~{們}${對}~{些}" },
{"id":".nt.$.pl.$.dat." , "value":"{對於諸}~${對於}~{等}${對於}~{們}${對於}~{些}${對諸}~{來說}${對}~{等來說}${對}~{們來說}${對}~{些來說}${為了諸}~${為了}~{等}${為了}~{們}${為了}~{些}${向諸}~${向}~{等}${向}~{們}${向}~{些}${對諸}~${對}~{等}${對}~{們}${對}~{些}" },
{"id":".f.$.pl.$.dat." , "value":"{對於諸}~${對於}~{等}${對於}~{們}${對於}~{些}${對諸}~{來說}${對}~{等來說}${對}~{們來說}${對}~{些來說}${為了諸}~${為了}~{等}${為了}~{們}${為了}~{些}${向諸}~${向}~{等}${向}~{們}${向}~{些}${對諸}~${對}~{等}${對}~{們}${對}~{些}" },
{"id":".pl.$.gen." , "value":"{諸}~{的}$~{等的}$~{們的}$~{些的}${諸}~{之}$~{等之}$~{們之}$~{些之}" },
{"id":"$.pl.$.gen." , "value":"{諸}~{的}$~{等的}$~{們的}$~{些的}${諸}~{之}$~{等之}$~{們之}$~{些之}" },
{"id":".1p.$.pl.$.gen." , "value":"{諸}~{的}$~{等的}$~{們的}$~{些的}${諸}~{之}$~{等之}$~{們之}$~{些之}" },
{"id":".2p.$.pl.$.gen." , "value":"{諸}~{的}$~{等的}$~{們的}$~{些的}${諸}~{之}$~{等之}$~{們之}$~{些之}" },
{"id":".m.$.pl.$.gen." , "value":"{諸}~{的}$~{等的}$~{們的}$~{些的}${諸}~{之}$~{等之}$~{們之}$~{些之}" },
{"id":".nt.$.pl.$.gen." , "value":"{諸}~{的}$~{等的}$~{們的}$~{些的}${諸}~{之}$~{等之}$~{們之}$~{些之}" },
{"id":".f.$.pl.$.gen." , "value":"{諸}~{的}$~{等的}$~{們的}$~{些的}${諸}~{之}$~{等之}$~{們之}$~{些之}" },
{"id":".pl.$.inst." , "value":"{以諸}~${以}~{等}${以}~{們}${以}~{些}${通過諸}~${通過}~{等}${通過}~{們}${通過}~{些}${被諸}~${被}~{等}${被}~{們}${被}~{些}${根據諸}~${根據}~{等}${根據}~{們}${根據}~{些}${跟諸}~${跟}~{等}${跟}~{們}${跟}~{些}${經過諸}~${經過}~{等}${經過}~{們}${經過}~{些}${經由諸}~${經由}~{等}${經由}~{們}${經由}~{些}${由經諸}~${由經}~{等}${由經}~{們}${由經}~{些}" },
{"id":"$.pl.$.inst." , "value":"{以諸}~${以}~{等}${以}~{們}${以}~{些}${通過諸}~${通過}~{等}${通過}~{們}${通過}~{些}${被諸}~${被}~{等}${被}~{們}${被}~{些}${根據諸}~${根據}~{等}${根據}~{們}${根據}~{些}${跟諸}~${跟}~{等}${跟}~{們}${跟}~{些}${經過諸}~${經過}~{等}${經過}~{們}${經過}~{些}${經由諸}~${經由}~{等}${經由}~{們}${經由}~{些}${由經諸}~${由經}~{等}${由經}~{們}${由經}~{些}" },
{"id":".1p.$.pl.$.inst." , "value":"{以諸}~${以}~{等}${以}~{們}${以}~{些}${通過諸}~${通過}~{等}${通過}~{們}${通過}~{些}${被諸}~${被}~{等}${被}~{們}${被}~{些}${根據諸}~${根據}~{等}${根據}~{們}${根據}~{些}${跟諸}~${跟}~{等}${跟}~{們}${跟}~{些}${經過諸}~${經過}~{等}${經過}~{們}${經過}~{些}${經由諸}~${經由}~{等}${經由}~{們}${經由}~{些}${由經諸}~${由經}~{等}${由經}~{們}${由經}~{些}" },
{"id":".2p.$.pl.$.inst." , "value":"{以諸}~${以}~{等}${以}~{們}${以}~{些}${通過諸}~${通過}~{等}${通過}~{們}${通過}~{些}${被諸}~${被}~{等}${被}~{們}${被}~{些}${根據諸}~${根據}~{等}${根據}~{們}${根據}~{些}${跟諸}~${跟}~{等}${跟}~{們}${跟}~{些}${經過諸}~${經過}~{等}${經過}~{們}${經過}~{些}${經由諸}~${經由}~{等}${經由}~{們}${經由}~{些}${由經諸}~${由經}~{等}${由經}~{們}${由經}~{些}" },
{"id":".m.$.pl.$.inst." , "value":"{以諸}~${以}~{等}${以}~{們}${以}~{些}${通過諸}~${通過}~{等}${通過}~{們}${通過}~{些}${被諸}~${被}~{等}${被}~{們}${被}~{些}${根據諸}~${根據}~{等}${根據}~{們}${根據}~{些}${跟諸}~${跟}~{等}${跟}~{們}${跟}~{些}${經過諸}~${經過}~{等}${經過}~{們}${經過}~{些}${經由諸}~${經由}~{等}${經由}~{們}${經由}~{些}${由經諸}~${由經}~{等}${由經}~{們}${由經}~{些}" },
{"id":".nt.$.pl.$.inst." , "value":"{以諸}~${以}~{等}${以}~{們}${以}~{些}${通過諸}~${通過}~{等}${通過}~{們}${通過}~{些}${被諸}~${被}~{等}${被}~{們}${被}~{些}${根據諸}~${根據}~{等}${根據}~{們}${根據}~{些}${跟諸}~${跟}~{等}${跟}~{們}${跟}~{些}${經過諸}~${經過}~{等}${經過}~{們}${經過}~{些}${經由諸}~${經由}~{等}${經由}~{們}${經由}~{些}${由經諸}~${由經}~{等}${由經}~{們}${由經}~{些}" },
{"id":".f.$.pl.$.inst." , "value":"{以諸}~${以}~{等}${以}~{們}${以}~{些}${通過諸}~${通過}~{等}${通過}~{們}${通過}~{些}${被諸}~${被}~{等}${被}~{們}${被}~{些}${根據諸}~${根據}~{等}${根據}~{們}${根據}~{些}${跟諸}~${跟}~{等}${跟}~{們}${跟}~{些}${經過諸}~${經過}~{等}${經過}~{們}${經過}~{些}${經由諸}~${經由}~{等}${經由}~{們}${經由}~{些}${由經諸}~${由經}~{等}${由經}~{們}${由經}~{些}" },
{"id":".pl.$.loc." , "value":"{在諸}~${在}~{等}${在}~{們}${在}~{些}${在諸}~{上}${在}~{等上}${在}~{們上}${在}~{些上}${在諸}~{裏}${在}~{等裏}${在}~{們裏}${在}~{些裏}${在諸}~{旁}${在}~{等旁}${在}~{們旁}${在}~{些旁}${於諸}~{處}${於}~{等處}${於}~{們處}${於}~{些處}${在諸}~{狀態}${在}~{等狀態}${在}~{們狀態}${在}~{些狀態}${處於諸}~{狀態}${處於}~{等狀態}${處於}~{們狀態}${處於}~{些狀態}${於諸}~{情形下}${於}~{等情形下}${於}~{們情形下}${於}~{些情形下}${處於諸}~${處於}~{等}${處於}~{們}${處於}~{些}${於諸}~${於}~{等}${於}~{們}${於}~{些}${諸}~{處}$~{等處}$~{們處}$~{些處}${諸}~{時}$~{等時}$~{們時}$~{些時}${諸}~{狀態}$~{等狀態}$~{們狀態}$~{些狀態}${在諸}~{情形下}${在}~{等情形下}${在}~{們情形下}${在}~{些情形下}${處於諸}~{情形下}${處於}~{等情形下}${處於}~{們情形下}${處於}~{些情形下}${諸}~{情形下}$~{等情形下}$~{們情形下}$~{些情形下}${在諸}~{處}${在}~{等處}${在}~{們處}${在}~{些處}${在諸}~${在}~{等}${在}~{們}${在}~{些}${在諸}~{處}${在}~{等處}${在}~{們處}${在}~{些處}${在諸}~{時}${在}~{等時}${在}~{們時}${在}~{些時}${於諸}~{狀態}${於}~{等狀態}${於}~{們狀態}${於}~{些狀態}${於諸}~{時}${於}~{等時}${於}~{們時}${於}~{些時}${於諸}~{狀態}${於}~{等狀態}${於}~{們狀態}${於}~{些狀態}" },
{"id":"$.pl.$.loc." , "value":"{在諸}~${在}~{等}${在}~{們}${在}~{些}${在諸}~{上}${在}~{等上}${在}~{們上}${在}~{些上}${在諸}~{裏}${在}~{等裏}${在}~{們裏}${在}~{些裏}${在諸}~{旁}${在}~{等旁}${在}~{們旁}${在}~{些旁}${於諸}~{處}${於}~{等處}${於}~{們處}${於}~{些處}${在諸}~{狀態}${在}~{等狀態}${在}~{們狀態}${在}~{些狀態}${處於諸}~{狀態}${處於}~{等狀態}${處於}~{們狀態}${處於}~{些狀態}${於諸}~{情形下}${於}~{等情形下}${於}~{們情形下}${於}~{些情形下}${處於諸}~${處於}~{等}${處於}~{們}${處於}~{些}${於諸}~${於}~{等}${於}~{們}${於}~{些}${諸}~{處}$~{等處}$~{們處}$~{些處}${諸}~{時}$~{等時}$~{們時}$~{些時}${諸}~{狀態}$~{等狀態}$~{們狀態}$~{些狀態}${在諸}~{情形下}${在}~{等情形下}${在}~{們情形下}${在}~{些情形下}${處於諸}~{情形下}${處於}~{等情形下}${處於}~{們情形下}${處於}~{些情形下}${諸}~{情形下}$~{等情形下}$~{們情形下}$~{些情形下}${在諸}~{處}${在}~{等處}${在}~{們處}${在}~{些處}${在諸}~${在}~{等}${在}~{們}${在}~{些}${在諸}~{處}${在}~{等處}${在}~{們處}${在}~{些處}${在諸}~{時}${在}~{等時}${在}~{們時}${在}~{些時}${於諸}~{狀態}${於}~{等狀態}${於}~{們狀態}${於}~{些狀態}${於諸}~{時}${於}~{等時}${於}~{們時}${於}~{些時}${於諸}~{狀態}${於}~{等狀態}${於}~{們狀態}${於}~{些狀態}" },
{"id":".1p.$.pl.$.loc." , "value":"{在諸}~${在}~{等}${在}~{們}${在}~{些}${在諸}~{上}${在}~{等上}${在}~{們上}${在}~{些上}${在諸}~{裏}${在}~{等裏}${在}~{們裏}${在}~{些裏}${在諸}~{旁}${在}~{等旁}${在}~{們旁}${在}~{些旁}${於諸}~{處}${於}~{等處}${於}~{們處}${於}~{些處}${在諸}~{狀態}${在}~{等狀態}${在}~{們狀態}${在}~{些狀態}${處於諸}~{狀態}${處於}~{等狀態}${處於}~{們狀態}${處於}~{些狀態}${於諸}~{情形下}${於}~{等情形下}${於}~{們情形下}${於}~{些情形下}${處於諸}~${處於}~{等}${處於}~{們}${處於}~{些}${於諸}~${於}~{等}${於}~{們}${於}~{些}${諸}~{處}$~{等處}$~{們處}$~{些處}${諸}~{時}$~{等時}$~{們時}$~{些時}${諸}~{狀態}$~{等狀態}$~{們狀態}$~{些狀態}${在諸}~{情形下}${在}~{等情形下}${在}~{們情形下}${在}~{些情形下}${處於諸}~{情形下}${處於}~{等情形下}${處於}~{們情形下}${處於}~{些情形下}${諸}~{情形下}$~{等情形下}$~{們情形下}$~{些情形下}${在諸}~{處}${在}~{等處}${在}~{們處}${在}~{些處}${在諸}~${在}~{等}${在}~{們}${在}~{些}${在諸}~{處}${在}~{等處}${在}~{們處}${在}~{些處}${在諸}~{時}${在}~{等時}${在}~{們時}${在}~{些時}${於諸}~{狀態}${於}~{等狀態}${於}~{們狀態}${於}~{些狀態}${於諸}~{時}${於}~{等時}${於}~{們時}${於}~{些時}${於諸}~{狀態}${於}~{等狀態}${於}~{們狀態}${於}~{些狀態}" },
{"id":".2p.$.pl.$.loc." , "value":"{在諸}~${在}~{等}${在}~{們}${在}~{些}${在諸}~{上}${在}~{等上}${在}~{們上}${在}~{些上}${在諸}~{裏}${在}~{等裏}${在}~{們裏}${在}~{些裏}${在諸}~{旁}${在}~{等旁}${在}~{們旁}${在}~{些旁}${於諸}~{處}${於}~{等處}${於}~{們處}${於}~{些處}${在諸}~{狀態}${在}~{等狀態}${在}~{們狀態}${在}~{些狀態}${處於諸}~{狀態}${處於}~{等狀態}${處於}~{們狀態}${處於}~{些狀態}${於諸}~{情形下}${於}~{等情形下}${於}~{們情形下}${於}~{些情形下}${處於諸}~${處於}~{等}${處於}~{們}${處於}~{些}${於諸}~${於}~{等}${於}~{們}${於}~{些}${諸}~{處}$~{等處}$~{們處}$~{些處}${諸}~{時}$~{等時}$~{們時}$~{些時}${諸}~{狀態}$~{等狀態}$~{們狀態}$~{些狀態}${在諸}~{情形下}${在}~{等情形下}${在}~{們情形下}${在}~{些情形下}${處於諸}~{情形下}${處於}~{等情形下}${處於}~{們情形下}${處於}~{些情形下}${諸}~{情形下}$~{等情形下}$~{們情形下}$~{些情形下}${在諸}~{處}${在}~{等處}${在}~{們處}${在}~{些處}${在諸}~${在}~{等}${在}~{們}${在}~{些}${在諸}~{處}${在}~{等處}${在}~{們處}${在}~{些處}${在諸}~{時}${在}~{等時}${在}~{們時}${在}~{些時}${於諸}~{狀態}${於}~{等狀態}${於}~{們狀態}${於}~{些狀態}${於諸}~{時}${於}~{等時}${於}~{們時}${於}~{些時}${於諸}~{狀態}${於}~{等狀態}${於}~{們狀態}${於}~{些狀態}" },
{"id":".m.$.pl.$.loc." , "value":"{在諸}~${在}~{等}${在}~{們}${在}~{些}${在諸}~{上}${在}~{等上}${在}~{們上}${在}~{些上}${在諸}~{裏}${在}~{等裏}${在}~{們裏}${在}~{些裏}${在諸}~{旁}${在}~{等旁}${在}~{們旁}${在}~{些旁}${於諸}~{處}${於}~{等處}${於}~{們處}${於}~{些處}${在諸}~{狀態}${在}~{等狀態}${在}~{們狀態}${在}~{些狀態}${處於諸}~{狀態}${處於}~{等狀態}${處於}~{們狀態}${處於}~{些狀態}${於諸}~{情形下}${於}~{等情形下}${於}~{們情形下}${於}~{些情形下}${處於諸}~${處於}~{等}${處於}~{們}${處於}~{些}${於諸}~${於}~{等}${於}~{們}${於}~{些}${諸}~{處}$~{等處}$~{們處}$~{些處}${諸}~{時}$~{等時}$~{們時}$~{些時}${諸}~{狀態}$~{等狀態}$~{們狀態}$~{些狀態}${在諸}~{情形下}${在}~{等情形下}${在}~{們情形下}${在}~{些情形下}${處於諸}~{情形下}${處於}~{等情形下}${處於}~{們情形下}${處於}~{些情形下}${諸}~{情形下}$~{等情形下}$~{們情形下}$~{些情形下}${在諸}~{處}${在}~{等處}${在}~{們處}${在}~{些處}${在諸}~${在}~{等}${在}~{們}${在}~{些}${在諸}~{處}${在}~{等處}${在}~{們處}${在}~{些處}${在諸}~{時}${在}~{等時}${在}~{們時}${在}~{些時}${於諸}~{狀態}${於}~{等狀態}${於}~{們狀態}${於}~{些狀態}${於諸}~{時}${於}~{等時}${於}~{們時}${於}~{些時}${於諸}~{狀態}${於}~{等狀態}${於}~{們狀態}${於}~{些狀態}" },
{"id":".nt.$.pl.$.loc." , "value":"{在諸}~${在}~{等}${在}~{們}${在}~{些}${在諸}~{上}${在}~{等上}${在}~{們上}${在}~{些上}${在諸}~{裏}${在}~{等裏}${在}~{們裏}${在}~{些裏}${在諸}~{旁}${在}~{等旁}${在}~{們旁}${在}~{些旁}${於諸}~{處}${於}~{等處}${於}~{們處}${於}~{些處}${在諸}~{狀態}${在}~{等狀態}${在}~{們狀態}${在}~{些狀態}${處於諸}~{狀態}${處於}~{等狀態}${處於}~{們狀態}${處於}~{些狀態}${於諸}~{情形下}${於}~{等情形下}${於}~{們情形下}${於}~{些情形下}${處於諸}~${處於}~{等}${處於}~{們}${處於}~{些}${於諸}~${於}~{等}${於}~{們}${於}~{些}${諸}~{處}$~{等處}$~{們處}$~{些處}${諸}~{時}$~{等時}$~{們時}$~{些時}${諸}~{狀態}$~{等狀態}$~{們狀態}$~{些狀態}${在諸}~{情形下}${在}~{等情形下}${在}~{們情形下}${在}~{些情形下}${處於諸}~{情形下}${處於}~{等情形下}${處於}~{們情形下}${處於}~{些情形下}${諸}~{情形下}$~{等情形下}$~{們情形下}$~{些情形下}${在諸}~{處}${在}~{等處}${在}~{們處}${在}~{些處}${在諸}~${在}~{等}${在}~{們}${在}~{些}${在諸}~{處}${在}~{等處}${在}~{們處}${在}~{些處}${在諸}~{時}${在}~{等時}${在}~{們時}${在}~{些時}${於諸}~{狀態}${於}~{等狀態}${於}~{們狀態}${於}~{些狀態}${於諸}~{時}${於}~{等時}${於}~{們時}${於}~{些時}${於諸}~{狀態}${於}~{等狀態}${於}~{們狀態}${於}~{些狀態}" },
{"id":".f.$.pl.$.loc." , "value":"{在諸}~${在}~{等}${在}~{們}${在}~{些}${在諸}~{上}${在}~{等上}${在}~{們上}${在}~{些上}${在諸}~{裏}${在}~{等裏}${在}~{們裏}${在}~{些裏}${在諸}~{旁}${在}~{等旁}${在}~{們旁}${在}~{些旁}${於諸}~{處}${於}~{等處}${於}~{們處}${於}~{些處}${在諸}~{狀態}${在}~{等狀態}${在}~{們狀態}${在}~{些狀態}${處於諸}~{狀態}${處於}~{等狀態}${處於}~{們狀態}${處於}~{些狀態}${於諸}~{情形下}${於}~{等情形下}${於}~{們情形下}${於}~{些情形下}${處於諸}~${處於}~{等}${處於}~{們}${處於}~{些}${於諸}~${於}~{等}${於}~{們}${於}~{些}${諸}~{處}$~{等處}$~{們處}$~{些處}${諸}~{時}$~{等時}$~{們時}$~{些時}${諸}~{狀態}$~{等狀態}$~{們狀態}$~{些狀態}${在諸}~{情形下}${在}~{等情形下}${在}~{們情形下}${在}~{些情形下}${處於諸}~{情形下}${處於}~{等情形下}${處於}~{們情形下}${處於}~{些情形下}${諸}~{情形下}$~{等情形下}$~{們情形下}$~{些情形下}${在諸}~{處}${在}~{等處}${在}~{們處}${在}~{些處}${在諸}~${在}~{等}${在}~{們}${在}~{些}${在諸}~{處}${在}~{等處}${在}~{們處}${在}~{些處}${在諸}~{時}${在}~{等時}${在}~{們時}${在}~{些時}${於諸}~{狀態}${於}~{等狀態}${於}~{們狀態}${於}~{些狀態}${於諸}~{時}${於}~{等時}${於}~{們時}${於}~{些時}${於諸}~{狀態}${於}~{等狀態}${於}~{們狀態}${於}~{些狀態}" },
{"id":".pl.$.nom." , "value":"{諸}~$~{等}$~{們}$~{些}" },
{"id":"$.pl.$.nom." , "value":"{諸}~$~{等}$~{們}$~{些}" },
{"id":".1p.$.pl.$.nom." , "value":"{諸}~$~{等}$~{們}$~{些}" },
{"id":".2p.$.pl.$.nom." , "value":"{諸}~$~{等}$~{們}$~{些}" },
{"id":".m.$.pl.$.nom." , "value":"{諸}~$~{等}$~{們}$~{些}" },
{"id":".nt.$.pl.$.nom." , "value":"{諸}~$~{等}$~{們}$~{些}" },
{"id":".f.$.pl.$.nom." , "value":"{諸}~$~{等}$~{們}$~{些}" },
{"id":".pl.$.voc." , "value":"{諸}~{！}$~{等！}$~{們！}$~{些！}${諸}~{啊}$~{等啊}$~{們啊}$~{些啊}" },
{"id":"$.pl.$.voc." , "value":"{諸}~{！}$~{等！}$~{們！}$~{些！}${諸}~{啊}$~{等啊}$~{們啊}$~{些啊}" },
{"id":".1p.$.pl.$.voc." , "value":"{諸}~{！}$~{等！}$~{們！}$~{些！}${諸}~{啊}$~{等啊}$~{們啊}$~{些啊}" },
{"id":".2p.$.pl.$.voc." , "value":"{諸}~{！}$~{等！}$~{們！}$~{些！}${諸}~{啊}$~{等啊}$~{們啊}$~{些啊}" },
{"id":".m.$.pl.$.voc." , "value":"{諸}~{！}$~{等！}$~{們！}$~{些！}${諸}~{啊}$~{等啊}$~{們啊}$~{些啊}" },
{"id":".nt.$.pl.$.voc." , "value":"{諸}~{！}$~{等！}$~{們！}$~{些！}${諸}~{啊}$~{等啊}$~{們啊}$~{些啊}" },
{"id":".f.$.pl.$.voc." , "value":"{諸}~{！}$~{等！}$~{們！}$~{些！}${諸}~{啊}$~{等啊}$~{們啊}$~{些啊}" },
{"id":".sg.$.abl." , "value":"{由}~${出於}~${從}~{而來}${從}~${來自}~${比}~${由於}~${因為}~" },
{"id":"$.sg.$.abl." , "value":"{由}~${出於}~${從}~{而來}${從}~${來自}~${比}~${由於}~${因為}~" },
{"id":".1p.$.sg.$.abl." , "value":"{由}~${出於}~${從}~{而來}${從}~${來自}~${比}~${由於}~${因為}~" },
{"id":".2p.$.sg.$.abl." , "value":"{由}~${出於}~${從}~{而來}${從}~${來自}~${比}~${由於}~${因為}~" },
{"id":".m.$.sg.$.abl." , "value":"{由}~${出於}~${從}~{而來}${從}~${來自}~${比}~${由於}~${因為}~" },
{"id":".nt.$.sg.$.abl." , "value":"{由}~${出於}~${從}~{而來}${從}~${來自}~${比}~${由於}~${因為}~" },
{"id":".f.$.sg.$.abl." , "value":"{由}~${出於}~${從}~{而來}${從}~${來自}~${比}~${由於}~${因為}~" },
{"id":".sg.$.acc." , "value":"{把}~$~" },
{"id":"$.sg.$.acc." , "value":"{把}~$~" },
{"id":".1p.$.sg.$.acc." , "value":"{把}~$~" },
{"id":".2p.$.sg.$.acc." , "value":"{把}~$~" },
{"id":".m.$.sg.$.acc." , "value":"{把}~$~" },
{"id":".nt.$.sg.$.acc." , "value":"{把}~$~" },
{"id":".f.$.sg.$.acc." , "value":"{把}~$~" },
{"id":".sg.$.dat." , "value":"{對於}~${對}~{來說}${為了}~${向}~${對}~" },
{"id":"$.sg.$.dat." , "value":"{對於}~${對}~{來說}${為了}~${向}~${對}~" },
{"id":".1p.$.sg.$.dat." , "value":"{對於}~${對}~{來說}${為了}~${向}~${對}~" },
{"id":".2p.$.sg.$.dat." , "value":"{對於}~${對}~{來說}${為了}~${向}~${對}~" },
{"id":".m.$.sg.$.dat." , "value":"{對於}~${對}~{來說}${為了}~${向}~${對}~" },
{"id":".nt.$.sg.$.dat." , "value":"{對於}~${對}~{來說}${為了}~${向}~${對}~" },
{"id":".f.$.sg.$.dat." , "value":"{對於}~${對}~{來說}${為了}~${向}~${對}~" },
{"id":".sg.$.gen." , "value":"~{的}$~{之}" },
{"id":"$.sg.$.gen." , "value":"~{的}$~{之}" },
{"id":".1p.$.sg.$.gen." , "value":"~{的}$~{之}" },
{"id":".2p.$.sg.$.gen." , "value":"~{的}$~{之}" },
{"id":".m.$.sg.$.gen." , "value":"~{的}$~{之}" },
{"id":".nt.$.sg.$.gen." , "value":"~{的}$~{之}" },
{"id":".f.$.sg.$.gen." , "value":"~{的}$~{之}" },
{"id":".sg.$.inst." , "value":"{以}~${通過}~${被}~${根據}~${跟}~${經過}~${經由}~${由經}~" },
{"id":"$.sg.$.inst." , "value":"{以}~${通過}~${被}~${根據}~${跟}~${經過}~${經由}~${由經}~" },
{"id":".1p.$.sg.$.inst." , "value":"{以}~${通過}~${被}~${根據}~${跟}~${經過}~${經由}~${由經}~" },
{"id":".2p.$.sg.$.inst." , "value":"{以}~${通過}~${被}~${根據}~${跟}~${經過}~${經由}~${由經}~" },
{"id":".m.$.sg.$.inst." , "value":"{以}~${通過}~${被}~${根據}~${跟}~${經過}~${經由}~${由經}~" },
{"id":".nt.$.sg.$.inst." , "value":"{以}~${通過}~${被}~${根據}~${跟}~${經過}~${經由}~${由經}~" },
{"id":".f.$.sg.$.inst." , "value":"{以}~${通過}~${被}~${根據}~${跟}~${經過}~${經由}~${由經}~" },
{"id":".sg.$.loc." , "value":"{在}~${在}~{上}${在}~{裏}${在}~{旁}${於}~{處}${在}~{狀態}${處於}~{狀態}${於}~{情形下}${處於}~${於}~$~{處}$~{時}$~{狀態}${在}~{情形下}${處於}~{情形下}$~{情形下}${在}~{處}${在}~${在}~{處}${在}~{時}${於}~{狀態}${於}~{時}${於}~{狀態}" },
{"id":"$.sg.$.loc." , "value":"{在}~${在}~{上}${在}~{裏}${在}~{旁}${於}~{處}${在}~{狀態}${處於}~{狀態}${於}~{情形下}${處於}~${於}~$~{處}$~{時}$~{狀態}${在}~{情形下}${處於}~{情形下}$~{情形下}${在}~{處}${在}~${在}~{處}${在}~{時}${於}~{狀態}${於}~{時}${於}~{狀態}" },
{"id":".1p.$.sg.$.loc." , "value":"{在}~${在}~{上}${在}~{裏}${在}~{旁}${於}~{處}${在}~{狀態}${處於}~{狀態}${於}~{情形下}${處於}~${於}~$~{處}$~{時}$~{狀態}${在}~{情形下}${處於}~{情形下}$~{情形下}${在}~{處}${在}~${在}~{處}${在}~{時}${於}~{狀態}${於}~{時}${於}~{狀態}" },
{"id":".2p.$.sg.$.loc." , "value":"{在}~${在}~{上}${在}~{裏}${在}~{旁}${於}~{處}${在}~{狀態}${處於}~{狀態}${於}~{情形下}${處於}~${於}~$~{處}$~{時}$~{狀態}${在}~{情形下}${處於}~{情形下}$~{情形下}${在}~{處}${在}~${在}~{處}${在}~{時}${於}~{狀態}${於}~{時}${於}~{狀態}" },
{"id":".m.$.sg.$.loc." , "value":"{在}~${在}~{上}${在}~{裏}${在}~{旁}${於}~{處}${在}~{狀態}${處於}~{狀態}${於}~{情形下}${處於}~${於}~$~{處}$~{時}$~{狀態}${在}~{情形下}${處於}~{情形下}$~{情形下}${在}~{處}${在}~${在}~{處}${在}~{時}${於}~{狀態}${於}~{時}${於}~{狀態}" },
{"id":".nt.$.sg.$.loc." , "value":"{在}~${在}~{上}${在}~{裏}${在}~{旁}${於}~{處}${在}~{狀態}${處於}~{狀態}${於}~{情形下}${處於}~${於}~$~{處}$~{時}$~{狀態}${在}~{情形下}${處於}~{情形下}$~{情形下}${在}~{處}${在}~${在}~{處}${在}~{時}${於}~{狀態}${於}~{時}${於}~{狀態}" },
{"id":".f.$.sg.$.loc." , "value":"{在}~${在}~{上}${在}~{裏}${在}~{旁}${於}~{處}${在}~{狀態}${處於}~{狀態}${於}~{情形下}${處於}~${於}~$~{處}$~{時}$~{狀態}${在}~{情形下}${處於}~{情形下}$~{情形下}${在}~{處}${在}~${在}~{處}${在}~{時}${於}~{狀態}${於}~{時}${於}~{狀態}" },
{"id":".sg.$.nom." , "value":"~" },
{"id":"$.sg.$.nom." , "value":"~" },
{"id":".1p.$.sg.$.nom." , "value":"~" },
{"id":".2p.$.sg.$.nom." , "value":"~" },
{"id":".m.$.sg.$.nom." , "value":"~" },
{"id":".nt.$.sg.$.nom." , "value":"~" },
{"id":".f.$.sg.$.nom." , "value":"~" },
{"id":".sg.$.voc." , "value":"~{！}$~{啊}" },
{"id":"$.sg.$.voc." , "value":"~{！}$~{啊}" },
{"id":".1p.$.sg.$.voc." , "value":"~{！}$~{啊}" },
{"id":".2p.$.sg.$.voc." , "value":"~{！}$~{啊}" },
{"id":".m.$.sg.$.voc." , "value":"~{！}$~{啊}" },
{"id":".nt.$.sg.$.voc." , "value":"~{！}$~{啊}" },
{"id":".f.$.sg.$.voc." , "value":"~{！}$~{啊}" },




{ "id":".nom." , "value":"~" },
{ "id":".voc." , "value":"~" },
{ "id":".acc." , "value":"~" },
{ "id":".gen." , "value":"~{的}" },
{ "id":".dat." , "value":"{對}~" },
{ "id":".inst." , "value":"{以}~" },
{ "id":".abl." , "value":"{由}~" },
{ "id":".loc." , "value":"{在}~" },
{ "id":".imp." , "value":"{令}~" },
{ "id":".cond." , "value":"{若}" },
{ "id":".opt." , "value":"{願}~" },
{ "id":".pres." , "value":"~" },
{ "id":".aor." , "value":"{曾}~" },
{ "id":".pf." , "value":"{已}~" },
{ "id":".fut." , "value":"{將}~" },

{ "id":".prp." , "value":"{正}~{的}${正在}~{的}$~{中的}${正}~${正在}~$~{中}" },
{ "id":".prpa." , "value":"{正}~{的}" },
{ "id":".prpp." , "value":"{正被}~{的}" },
{ "id":".pp." , "value":"{已}~{的}$~{完的}${已}~$~{完}" },
{ "id":".ppa." , "value":"{已}~{的}" },
{ "id":".ppp." , "value":"{已被}~{的}" },
{ "id":".futp." , "value":"{將}~{的}" },
{ "id":".fpa." , "value":"{應}~{的}" },
{ "id":".fpp." , "value":"{應被}~{的}${可被}~{的}${能被}~{的}${應被}~${可被}~${能被}~" },
{ "id":".grd." , "value":"{應被}~{的}${可被}~{的}${能被}~{的}${應被}~${可被}~${能被}~" },
{ "id":".pass." , "value":"{被}~" },
{ "id":".caus." , "value":"{使}~" },
{ "id":".desid." , "value":"{要}~" },
{ "id":".intens." , "value":"{執意}~" },
{ "id":".ger." , "value":"~{完之後}$~{了之後}$~{後}$~{完了之後}" },
{ "id":".abs." , "value":"~{完之後}$~{了之後}$~{後}$~{完了之後}" },
{ "id":".inf." , "value":"{用來}~${為了}~${來}~" },


{ "id":".1p.$.sg.$.pass." , "value":"{我被}~" },
{ "id":".2p.$.sg.$.pass." , "value":"{你被}~${汝被}~" },
{ "id":".3p.$.sg.$.pass." , "value":"{其被}~${他被}~${她被}~${它被}~" },
{ "id":".1p.$.pl.$.pass." , "value":"{我們被}~" },
{ "id":".2p.$.pl.$.pass." , "value":"{你們被}~${汝等被}~" },
{ "id":".3p.$.pl.$.pass." , "value":"{其等被}~${他們被}~${她們被}~${它們被}~" },
{ "id":".1p.$.sg.$.pass." , "value":"{我被}~" },
{ "id":".2p.$.sg.$.pass." , "value":"{你被}~" },
{ "id":".3p.$.sg.$.pass." , "value":"{其被}~" },
{ "id":".1p.$.pl.$.pass." , "value":"{我們被}~" },
{ "id":".2p.$.pl.$.pass." , "value":"{你們被}~" },
{ "id":".3p.$.pl.$.pass." , "value":"{其等被}~" },

{ "id":".1p.$.sg.$.caus." , "value":"{我令}~" },
{ "id":".2p.$.sg.$.caus." , "value":"{你令}~" },
{ "id":".3p.$.sg.$.caus." , "value":"{其令}~" },
{ "id":".1p.$.pl.$.caus." , "value":"{我們令}~" },
{ "id":".2p.$.pl.$.caus." , "value":"{你們令}~" },
{ "id":".3p.$.pl.$.caus." , "value":"{其等令}~" },
{ "id":".1p.$.sg.$.caus." , "value":"{我令}~" },
{ "id":".2p.$.sg.$.caus." , "value":"{你令}~" },
{ "id":".3p.$.sg.$.caus." , "value":"{其令}~" },
{ "id":".1p.$.pl.$.caus." , "value":"{我們令}~" },
{ "id":".2p.$.pl.$.caus." , "value":"{你們令}~" },
{ "id":".3p.$.pl.$.caus." , "value":"{其等令}~" },

{ "id":".1p.$.sg.$.caus.opt." , "value":"{我應令}~" },
{ "id":".2p.$.sg.$.caus.opt." , "value":"{你應令}~" },
{ "id":".3p.$.sg.$.caus.opt." , "value":"{其應令}~" },
{ "id":".1p.$.pl.$.caus.opt." , "value":"{我們應令}~" },
{ "id":".2p.$.pl.$.caus.opt." , "value":"{你們應令}~" },
{ "id":".3p.$.pl.$.caus.opt." , "value":"{其等應令}~" },
{ "id":".1p.$.sg.$.caus.opt." , "value":"{我應令}~" },
{ "id":".2p.$.sg.$.caus.opt." , "value":"{你應令}~" },
{ "id":".3p.$.sg.$.caus.opt." , "value":"{其應令}~" },
{ "id":".1p.$.pl.$.caus.opt." , "value":"{我們應令}~" },
{ "id":".2p.$.pl.$.caus.opt." , "value":"{你們應令}~" },
{ "id":".3p.$.pl.$.caus.opt." , "value":"{其等應令}~" },

{ "id":".1p.$.sg.$.caus.pass." , "value":"{我被令}~" },
{ "id":".2p.$.sg.$.caus.pass." , "value":"{你被令}~" },
{ "id":".3p.$.sg.$.caus.pass." , "value":"{其被令}~" },
{ "id":".1p.$.pl.$.caus.pass." , "value":"{我們被令}~" },
{ "id":".2p.$.pl.$.caus.pass." , "value":"{你們被令}~" },
{ "id":".3p.$.pl.$.caus.pass." , "value":"{其等被令}~" },
{ "id":".1p.$.sg.$.caus.pass." , "value":"{我被令}~" },
{ "id":".2p.$.sg.$.caus.pass." , "value":"{你被令}~" },
{ "id":".3p.$.sg.$.caus.pass." , "value":"{其被令}~" },
{ "id":".1p.$.pl.$.caus.pass." , "value":"{我們被令}~" },
{ "id":".2p.$.pl.$.caus.pass." , "value":"{你們被令}~" },
{ "id":".3p.$.pl.$.caus.pass." , "value":"{其等被令}~" },

{ "id":".1p.$.sg.$.caus.doub." , "value":"{派我令}~" },
{ "id":".2p.$.sg.$.caus.doub." , "value":"{派你令}~" },
{ "id":".3p.$.sg.$.caus.doub." , "value":"{派其令}~" },
{ "id":".1p.$.pl.$.caus.doub." , "value":"{派我們令}~" },
{ "id":".2p.$.pl.$.caus.doub." , "value":"{派你們令}~" },
{ "id":".3p.$.pl.$.caus.doub." , "value":"{派其等令}~" },
{ "id":".1p.$.sg.$.caus.doub." , "value":"{派我令}~" },
{ "id":".2p.$.sg.$.caus.doub." , "value":"{派你令}~" },
{ "id":".3p.$.sg.$.caus.doub." , "value":"{派其令}~" },
{ "id":".1p.$.pl.$.caus.doub." , "value":"{派我們令}~" },
{ "id":".2p.$.pl.$.caus.doub." , "value":"{派你們令}~" },
{ "id":".3p.$.pl.$.caus.doub." , "value":"{派其等令}~" }
];

var local_parent_formula=[
{ "id":".imp." , "value":"~" },
{ "id":".cond." , "value":"~" },
{ "id":".opt." , "value":"~" },
{ "id":".pres." , "value":"~" },
{ "id":".aor." , "value":"~" },
{ "id":".pf." , "value":"已~完" },
{ "id":".fut." , "value":"~" },
{ "id":".prp." , "value":"正~的" },
{ "id":".prpa." , "value":"正~的" },
{ "id":".prpp." , "value":"正被~的" },
{ "id":".pp." , "value":"已~的" },
{ "id":".ppa." , "value":"已~的" },
{ "id":".ppp." , "value":"已被~的" },
{ "id":".futp." , "value":"將~的" },
{ "id":".fpa." , "value":"將~的" },
{ "id":".fpp." , "value":"應被~的" },
{ "id":".grd." , "value":"應被~的" },
{ "id":".pass." , "value":"被~" },
{ "id":".caus." , "value":"使~" },
{ "id":".desid." , "value":"要~" },
{ "id":".intens." , "value":"執意~" },
{ "id":".ger." , "value":"~" },
{ "id":".abs." , "value":"~" },
{ "id":".inf." , "value":"~" }
];
var local_gui=
{
"applyto":"套用到：" ,
"heading":"标题" , 
"wbw":"逐詞解析" , 
"translate":"译文" , 
"note":"註釋" , 
"current":"目前" , 
"up":"向上" , 
"down":"向下" , 
"thischapter":"本章" , 
"all":"全部" , 
"lock":"鎖定" , 
"toDB":"上傳至用戶數據庫" , 
"cancel":"取消" , 
"para":"段" , 
"translate1":"譯" , 
"read":"閲讀" , 
"edit":"編輯" , 
"newheading":"內容編輯" , 
"newword":"新增詞彙" , 
"wordtype":"單詞類型" , 
"gramma":"語法信息" , 
"parent":"直系源型" , 
"part":"拆分方式" , 
"partmeaning":"拆分含義" , 
"meaning":"整體含義" , 
"userdict":"用戶詞典" , 
"dictsouce":"詞典來源" , 
"otherdict":"其他詞典" , 
"children":"直系派生" , 
"newproject":"啓動新的項目" , 
"nofilename":"文件名缺失" , 
"loading":"讀取中……" , 
"ok":"成功" , 
"removeword":"黏音詞組分已移除" , 
"unsplit":"黏音詞拆分" , 
"allsplit":"黏音詞已成功拆分 ^-^" , 
"modifyok":"已批量修改" , 
"success":"詞" , 
"level":"層級" , 
"totally":"共計：" , 
"translate1":"翻譯：" , 
"edit1":"編輯：" , 
"revision":"校對：" , 
"edition":"版次：" , 
"language":"語言：" , 
"innerdict":"內聯詞典" , 
"dict_match":"匹配字典數據到文檔" , 
"match_end":"文檔更新結束，完成度" , 
"empty1":"清空" , 
"wordmap":"詞源树" , 
"auto":"自動" , 
"new":"新建" , 
"factors_input":"點此輸入拆分" , 
"meaning_input":"點此輸入詞義" , 
"parent_input":"點此輸入父級" , 
"read_only":"只讀" , 
"sent_trans":"整句譯文" , 
"more":"更多" , 
"statistical_data":"統計數據" , 
"wordnum":"文字總量：" , 
"vocabulary":"詞匯總量：" , 
"words":"詞" , 
"letters":"字母" , 
"word_length":"單詞均長" , 
"num_k":"千" , 
"num_m":"兆" , 
"repeat":"重複係數：" , 
"tran_workload":"全文翻譯：" , 
"workload":"工程評估" , 
"total_workload":"工作總量" , 
"product":"譯文字數" , 
"difficulty":"難度評級" , 
"min":"分鐘" , 
"h":"小時" , 
"week":"周" , 
"year":"年" , 
"round_1":"第" , 
"round_2":"轮" , 
"done":"檢索完畢" , 
"all_done":"查詢完成" , 
"checking":"檢索中" , 
"empty_history":"清空歷史記録" , 
"auto_fill":"自動填充" , 
"finished":"已完成" , 
"now_time":"現在" , 
"twilight_time":"曙光" , 
"noon_time":"正午" , 
"vikala":"不適當的時間" , 
"kala":"適當的時間" , 
"gama_entry":"入村" , 
"need_inform":"未告知其他同伴" , 
"no_string":"不能" , 
"yes_string":"可以" , 
"eat":"進餐" , 
"CE":"西元" , 
"BE":"佛曆" , 
"year_1":"年" ,
"month_1":"月" ,
"day":"日" , 
"years":"年" ,
"months":"個月又" ,
"days":"天" , 
"today":"今日" , 
"dhamma_time":"會延續五千年的教法" ,
"past":"已過去" , 
"left":"還剩下" , 
"year_0":"年",
"season":"季節" ,
"month":"月" ,
"pakkha":"月相變化" ,
"date":"日期" ,
"week_day":"星期" ,
"":"" ,
"":"" ,
"":"" ,
"":"" ,
"":"" ,
"":"" ,
"":"" ,




"key":"value"
};
var local_dictname=[
{ "id":"bh" , "value":"巴漢-明法尊者" },
{ "id":"sy" , "value":"巴日-漢譯" },
{ "id":"user" , "value":"用戶詞典" },
{ "id":"co" , "value":"Concise" },
{ "id":"unkow" , "value":"未知" },
{ "id":"vn" , "value":"不規則表-V" },
{ "id":"SCR" , "value":"詞根表-中" },
{ "id":"ENR" , "value":"詞根表-英" },
{ "id":"parts" , "value":"零件庫" },
{ "id":"sys_ir" , "value":"不規則表-K" },
{ "id":"PM" , "value":"巴緬" },
{ "id":"" , "value":"" },
{ "id":"" , "value":"" },
{ "id":"" , "value":"" }
];
var local_language=[
{ "id":"en" , "value":"英语" },
{ "id":"zh" , "value":"简体中文" },



{ "id":".end." , "value":"—" }
];

