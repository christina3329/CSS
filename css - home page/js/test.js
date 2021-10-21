var screenAnimateElements={
	'.screen-1':[
	'.screen-1__heading',
	'.header',
	'.screen-1__subheading',],
	'.screen-2':[
	'.screen-2__heading',
	'.screen-2__pic-3',
	'.screen-2__subheading',
	'.screen-2__line-1',
	'.screen-2__pic-2',],
	'.screen-3':[
	'.screen-3__pic-1',
	'.screen-3__heading',
	'.screen-3__line-1',
	'.screen-3__subheading',
	'.screen-3__lang',],
	'.screen-4':[
	'.screen-4__heading',
	'.screen-4__line-1',
	'.screen-4__subheading',
	'.screen-4__pics-1',
	'.screen-4__pics-2',
	'.screen-4__pics-3',
	'.screen-4__pics-4',],
	'.screen-5':[
	'.screen-5__pic-1',
	'.screen-5__heading',
	'.screen-5__line-1',
	'.screen-5__subheading',],
}

function setScreenAnimate(screenCls){
	var screen= document.querySelector(screenCls);
	var animateElements = screenAnimateElements[screenCls];
	var isSetAnimateClass = false;//是否有初始化子元素的样式
	var isAnimateDone = false;//当前屏幕下所有子元素的状态是DONE?

	screen.onclick=function(){
		if(isSetAnimateClass===false){
			for (var i = 0; i < animateElements.length; i++) {
				var element=document.querySelector(animateElements[i]);
				var basecls=element.getAttribute('class');

				element.setAttribute('class',basecls+' '+animateElements[i].substr(1)+'_animate_init');
			}
			isSetAnimateClass=true;
			return;
		}
		if (isAnimateDone===false) {
			for (var i = 0; i < animateElements.length; i++) {
				var element=document.querySelector(animateElements[i]);
			var basecls=element.getAttribute('class');

			element.setAttribute('class',basecls.replace('_animate_init','_animate_done'));
			}
			isAnimateDone=true;
			return;
		}
			
		if(isAnimateDone===true){
			for (var i = 0; i < animateElements.length; i++) {
				var element=document.querySelector(animateElements[i]);
				var basecls=element.getAttribute('class');

				element.setAttribute('class',basecls.replace('_animate_done','_animate_init'));
			}
			isAnimateDone=false;
    		return;
		}
	}
}
for( k in screenAnimateElements){
	setScreenAnimate(k);
}