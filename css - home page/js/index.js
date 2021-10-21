//获取元素
var getElem = function (selector) {
	return document.querySelector(selector);
}
var getAllElem= function(selector) {
	return document.querySelectorAll(selector);
}
//获取元素样式
var getCls=function(element){
	return element.getAttribute('class');
}
//设置元素样式
var setCls=function (element,cls) {
	return element.setAttribute('class',cls);
}
//为元素添加样式
var addCls=function(element,cls) {
	var baseCls= getCls(element);
	if (baseCls.indexOf(cls)===-1) {
		setCls(element,baseCls+' '+cls)
	}
	return;
}
//为元素删除样式
var delCls=function(element,cls) {
	var baseCls= getCls(element);
	if (baseCls.indexOf(cls)!=-1) {
		setCls(element,baseCls.split(cls).join(' ').replace(/\s+/g,' '));
	}
	return;
}
//第一步初始化样式
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
//设置屏内元素为初始状态
var setScreenAnimateInit=function(screencls) {
	var screen=document.querySelector(screencls);
	var animateElements=screenAnimateElements[screencls];

	for (var i = 0; i < animateElements.length; i++) {
		var element = document.querySelector(animateElements[i]);
		var baseCls = element.getAttribute('class');

		element.setAttribute('class',baseCls+' '+animateElements[i].substr(1)+'_animate_init');
	}

}
//设置播放屏内元素的动画
var playScreenAnimateDone=function(screencls){
	var screen=document.querySelector(screencls);
	var animateElements=screenAnimateElements[screencls];

	for (var i = 0; i < animateElements.length; i++) {
		var element=document.querySelector(animateElements[i]);
		var basecls=element.getAttribute('class');

		element.setAttribute('class',basecls.replace('_animate_init','_animate_done'));
	}

}
window.onload=function() {
	console.log('onload');
	for (k in screenAnimateElements) {
		if(k==='.screen-1'){
			continue;
		}
		setScreenAnimateInit(k);
	}
}
//滚到哪里就播放到哪里
var navItems = getAllElem('.header__nav-item');
var outLineItems = getAllElem('.outline__item');

var switchNavItemsActive = function(idx) {
for (var i = 0; i< navItems.length;i++){
		delCls(navItems[i],'header__nav-item_status_active');
		getElem('.header__nav-tip').style.left = 0+'px';
	}
	addCls(navItems[idx],'header__nav-item_status_active');
	getElem('.header__nav-tip').style.left = (idx*96)+'px';

	for (var i = 0; i< outLineItems.length;i++){
		delCls(outLineItems[i],'outline__item_status_active');
	}
	addCls(outLineItems[idx],'outline__item_status_active');
}
switchNavItemsActive(0);
window.onscroll = function() {
	var top = document.documentElement.scrollTop;
	console.log(top);
	if(top<640 && top>60){
		addCls(getElem('.header'),'header_status_back_active');
		addCls(getElem('.outline'),'outline_status_in');
		switchNavItemsActive(0);
	}
	else if(top>=640){
		addCls(getElem('.header'),'header_status_back');
		delCls(getElem('.header'),'header_status_back_active');
	}else{
		delCls(getElem('.header'),'header_status_back');
		delCls(getElem('.outline'),'outline_status_in');
		switchNavItemsActive(0);	
	}
	
	if(top>1){
		playScreenAnimateDone('.screen-1');
	}
	if (top>640*1-100) {
		playScreenAnimateDone('.screen-2');
		switchNavItemsActive(1);
	}
	if (top>640*2-100) {
		playScreenAnimateDone('.screen-3');
		switchNavItemsActive(2);
	}
	if (top>640*3-100) {
		playScreenAnimateDone('.screen-4');
		switchNavItemsActive(3);
	}
	if (top>640*4-100) {
		playScreenAnimateDone('.screen-5');
		switchNavItemsActive(4);
	}
}
//第三步双向定位
var setNavJump = function (i,lib) {
	var item = lib[i];
	item.onclick =function() {
		document.documentElement.scrollTop=i*640;
	}
}
for(var i=0;i<navItems.length;i++){
	setNavJump(i,navItems);
}
for (var i = 0; i < outLineItems.length; i++) {
	setNavJump(i,outLineItems);
}
//滑动门特效
var navTip = getElem('.header__nav-tip');
var setTip = function(idx,lib){

	lib[idx].onmouseover=function () {
		console.log(this,idx);
		navTip.style.left=(idx*96)+'px';
	}
	var currentIdx = 0;
	lib[idx].onmouseout = function(){
		console.log(currentIdx);
		for(var i=0;i<lib.length;i++){
			if(getCls(lib[i]).indexOf('header__nav-item_status_active')>-1){
				currentIdx=i;
				break;
			}
		}
		navTip.style.left=(currentIdx*96)+'px';
	} 
}
for (var i = 0; i < navItems.length; i++) {
	setTip(i,navItems);
}
//点击继续了解学习体验按钮，跳转到第一页
var btn = getElem('.screen-6__button')
btn.onclick = function(){
	document.documentElement.scrollTop=0;
}
setTimeout(function(){
	playScreenAnimateDone('.screen-1');
},200)