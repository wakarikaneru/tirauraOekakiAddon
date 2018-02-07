//お絵かきする場所を作成する
function createOekakiBoard(targetId, canvasId){
	var defaultBoard = new DrawingBoard.Board(targetId, {
				controls: [
					"Color",
					{ Size: { type: "range" } },
					{ DrawingMode: { filler: true } },
					"Navigation",
					"Download"
				],
				size: 1,
				webStorage: "session",
				enlargeYourContainer: true,
			});
	$(".drawing-board-canvas:first").attr("id", canvasId)
}

//お絵かき表示非表示切り替え用関数を返す
function switchOekakiBoardFunc(canvasId) {
	return function(){
		if ($("#"+canvasId).is(":visible")) {
			// 表示されている場合の処理
			$("#"+canvasId).hide();
		} else {
			// 非表示の場合の処理
			$("#"+canvasId).show();
		}
	}
}

//投稿する用関数を返す
function uploadOekakiBoardFunc(canvasId) {
	return function(){
		var canvas = $("#"+canvasId).get(0);
		if ( !canvas || ! canvas.getContext ) { return false; }
		
		canvas.toBlob(function(blob) {
			var formData = new FormData();
			var now = new Date();
			
			formData.append("mode", "bbs_write");
			formData.append("Category", "CT01");
			formData.append("upform", "s");
			formData.append("Title", "oekaki");
			//formData.append("Name2", "name");
			//formData.append("image", "image");
			//formData.append("cookieid", "");
			//formData.append("t_session", "");
			formData.append("Data", "oekaki" + "\n"+ now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds());
			formData.append("hash", "oekaki");
			//formData.append("hashcheck", "");
			
			formData.append("upfile", blob);
			
			$.ajax({
				url: "./rbbs.cgi",
				type: "POST",
				data: formData,
				processData: false, 
				contentType: false
			}).done(function(data){
				window.location.reload();
			}).fail(function(data){
				alert("失敗しました"+data);
			});
		}, "image/jpeg", 1.00);
	}
}

