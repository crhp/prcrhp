//menu����dt�v�f�Ali�v�f��onMouseOver,onMouseOut��t�^����B
//���̊֐��́AonLoad�ōŏ��ɓǂݍ��܂���B
function replaceEle(){
	if(document.getElementById){
		var obj = document.getElementById("menu");
		obj.innerHTML = obj.innerHTML.replace(/<dd>/gi, '<dd onmouseover="popupMenu(this);" onmouseout="hiddenMenu(this);">');
		obj.innerHTML = obj.innerHTML.replace(/<li>/gi, '<li onmouseover="popupMenu(this);" onmouseout="hiddenMenu(this);">');
	}
}

//onMouseOver���ɁA�z���̃��j���[��\���B
function popupMenu( obj ){
	var menu = obj.getElementsByTagName("ul").item(0);
	var chkNode = obj.childNodes;
	
	//�q�v�f��ul�v�f������ꍇ�́Aa�v�f�ɖ��X�^�C����K�p�B
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
		
		//�����N�̕����F��CSS��K�p�B
		if(menuA){
			menuA.className = "rollOverA";	
		}
	}
}

//onMouseOut���ɁA�z���̃��j���[���\���B
function hiddenMenu( obj ){
	var menu = obj.getElementsByTagName("ul").item(0);
	if(menu){
		menu.style.display = "none";
	}
	
	if(obj.tagName.match(/li/i)){
		var menuA = obj.getElementsByTagName("a").item(0);
		obj.className = "";
		
		//�����N�̕����F��CSS���폜�B
		if(menuA){
			menuA.className = "";	
		}
	}
}