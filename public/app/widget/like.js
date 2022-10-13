var arrElement = new Array();
function Like(){
	$("like").each(function(){
		if($(this).attr("init")!="true"){
            let likeItem = {
							like_type:$(this).attr("liketype"),
							resource_type:$(this).attr("restype"),
							resource_id:$(this).attr("resid"),
							like:$(this).attr("count"),
							me:$(this).attr("mine"),
							init:false
						};
			arrElement.push(likeItem);
		}
	});
	$("like").on("click",function(){
			let liketype = $(this).attr("liketype");
			let rettype = $(this).attr("restype");
			let resid = $(this).attr("resid");		
			let readonly = $(this).attr("readonly");
            if(readonly=='true'){
                return;
            }
		let e = arrElement.find(function(item){

			if(liketype===item.like_type && rettype===item.resource_type && resid===item.resource_id){
				return true;
			}
			else{
				return false;
			}
		});
		if(e.me){
            remove(e.me,e.like_type,e.resource_id);
		}else{
			add(e.like_type,e.resource_type,e.resource_id);	
		}
	})
	Render();
}
function add(liketype,restype,resid) {
    fetch('/api/v2/like',{
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type:liketype,
            target_type:restype,
			target_id:resid
        })
    })
  .then(response => response.json())
  .then(function(data){
      console.log(data);
		let result = data.data;
		if(data.ok==true){
			for (let it of arrElement) {
				if(result.type===it.like_type &&
				result.target_id===it.resource_id){
					it.like++;
					it.me=result.id;
				}
			}
			Render();
		}
  });

}
function remove(id,liketype,resid) {
        fetch('/api/v2/like',{
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id:id,
            type:liketype,
			target_id:resid
        })
    })
  .then(response => response.json())
  .then(function(data){
      console.log(data);
		let result = data.data;
		if(data.ok==true){
			for (let it of arrElement) {
				if(liketype===it.like_type &&
				   resid===it.resource_id){
					it.like = result.count;
					it.me=false;
				}
			}
			Render();
		}
  });
/*
	$.getJSON(
		"../api/like.php",
		{
			_method:"delete",
			like_type:liketype,
			resource_type:restype,
			resource_id:resid
		}
	).done(function (data) {
		console.log("delete",data);
		if(data.ok){
			LikeRefresh(data.data);
		}
	}).fail(function(jqXHR, textStatus, errorThrown){
		switch (textStatus) {
			case "timeout":
				break;
			case "error":
				switch (jqXHR.status) {
					case 404:
						break;
					case 500:
						break;				
					default:
						break;
				}
				break;
			case "abort":
				break;
			case "parsererror":
				console.log("delete-parsererror",jqXHR.responseText);
				break;
			default:
				break;
		}
		
	});
    */
}
function LikeRefresh(data){
	$.ajaxSetup({contentType: "application/json; charset=utf-8"});
	$.post(
		"../api/like.php?_method=list",
		JSON.stringify([data])
	).done(function (data) {
		console.log(data);
		let result = JSON.parse(data);
		for (let it of arrElement) {
			if(result["data"][0].resource_type===it.resource_type &&
			result["data"][0].resource_id===it.resource_id &&
			result["data"][0].like_type===it.like_type){
				it.like=result["data"][0].like;
				it.me=result["data"][0].me;
			}
		}
		Render();
	});
}

function LikeRefreshAll(){
	$.ajaxSetup({contentType: "application/json; charset=utf-8"});
	$.post(
		"../api/like.php?_method=list",
		JSON.stringify(arrElement)
	).done(function (data) {
		console.log(data);
		arrElement = JSON.parse(data).data;
		Render();
	});
}

function Render(){
	for (const it of arrElement) {
		let html=" ";
		let meClass="";
		let likeIcon="";
		switch (it.like_type) {
			case "like":
				likeIcon = "👍Like";
				break;
			case "favorite":
				likeIcon = "⭐Favorite";
				break;
			case "watch":
				likeIcon = "👁️Watch";
				break;
			default:
				break;
		}
		if(it.me){
			meClass = " like_mine";
		}
		html +="<div class='like_inner "+meClass+"'>"+likeIcon;
        html +="<span class='number'>"+it.like+"<span>";
        html +="</div>";

		$("like[liketype='"+it.like_type+"'][restype='"+it.resource_type+"'][resid='"+it.resource_id+"']").html(html);
	}
}
