//menu内のdt要素、li要素にonMouseOver,onMouseOutを付与する。
//この関数は、onLoadで最初に読み込ませる。
function replaceEle(){
	if(document.getElementById){
		var obj = document.getElementById("menu");
		obj.innerHTML = obj.innerHTML.replace(/<dd>/gi, '<dd onmouseover="popupMenu(this);" onmouseout="hiddenMenu(this);">');
		obj.innerHTML = obj.innerHTML.replace(/<li>/gi, '<li onmouseover="popupMenu(this);" onmouseout="hiddenMenu(this);">');
	}
}

//onMouseOver時に、配下のメニューを表示。
function popupMenu( obj ){
	var menu = obj.getElementsByTagName("ul").item(0);
	var chkNode = obj.childNodes;
	
	//子要素にul要素がある場合は、a要素に矢印スタイルを適用。
	for(i=0; i<chkNode.length; i++){
		if(chkNode.item(i).nodeName.match(/ul/i)){
			var chkNode1 = chkNode.item(i).childNodes;
			for(j=0; j<chkNode1.length; j++){
				var chkNode2 = chkNode1.item(j).childNodes;
				for(k=0;k<chkNode2.length;k++){
					if(chkNode2.item(k).nodeName.match(/ul/i)){
						chkNode2.item(k).parentNode.getElementsByTagName("a").item(0).className += " hierarchy";
					}
				}
			}
		}
	}
	
	if(menu){
		menu.style.display = "block";
	}
	
	if(obj.tagName.match(/li/i)){
		var menuA = obj.getElementsByTagName("a").item(0);
		obj.className = "rollOver";
		
		//リンクの文字色のCSSを適用。
		if(menuA){
			menuA.className = "rollOverA";	
		}
	}
}

//onMouseOut時に、配下のメニューを非表示。
function hiddenMenu( obj ){
	var menu = obj.getElementsByTagName("ul").item(0);
	if(menu){
		menu.style.display = "none";
	}
	
	if(obj.tagName.match(/li/i)){
		var menuA = obj.getElementsByTagName("a").item(0);
		obj.className = "";
		
		//リンクの文字色のCSSを削除。
		if(menuA){
			menuA.className = "";	
		}
	}
}