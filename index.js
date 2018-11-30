// #c53f3c
// #ce4045
// 深灰色 fffefd
// var  1080 1920
// body  1600
// 	left 170px
// height 156px
$(function(){
	var modal = {
		hide(){
			$('.modal').attr('hidden','');
		},
		show(str){
			$('.modal').find('.faceID,.success').attr('hidden','')
			$('.modal').find('.'+str).removeAttr('hidden').end().removeAttr('hidden')
		}
	}
	window.modal = modal
	// modal.hide()
	// modal.show('faceID')
	// modal.show('success')
	
	$('.content-1 .left').initList({
		wrapperTemplate:$('#left-list-wrapper-template'),
		groupTemplate:$('#left-list-group-template'),
		data:new Array(20).fill('').map(item=>{
			return {
				img:'./img/餐具.png',
				text:'生鲜农产',
				id:'2142',
			}
		}),
		useSwiperPlugin:true,
		dataMap:{
			//可以在页面自定义hanldlebars模板
			title:'id',
			terms:null,
			// term:'dept_name',
			// description:'description',
			slideItemClass: '.term-group',
		}
	})
	$('.content-1 .right .list-container').initList({
		wrapperTemplate:$('#left-list-wrapper-template'),
		groupTemplate:$('#right-list-group-template'),
		data:[
		{	
			name:'生鲜农产',
			items:new Array(20).fill('').map(item=>{
				return {
					img:'./img/白雪公主苹果.png',
					name:'白雪公主无敌超级大苹果',
					price:'100.0',
					id:'2142',
				}
			})
		}
		],
		useSwiperPlugin:true,
		dataMap:{
			//可以在页面自定义hanldlebars模板
			title:'id',
			terms:'items',
			// term:'dept_name',
			// description:'description',
			slideItemClass: '.term-group',
		}
	})
	$('.content-2 .list-container').initList({
		wrapperTemplate:$('#left-list-wrapper-template'),
		groupTemplate:$('#detail-list-group-template'),
		data:new Array(20).fill('').map(item=>{
			return {
				img:'./img/餐具.png',
				name:'生鲜农产',
				id:'2142',
				price:'28.00',
				amt:2,
			}
		}),
		useSwiperPlugin:true,
		dataMap:{
			//可以在页面自定义hanldlebars模板
			title:'id',
			terms:null,
			// term:'dept_name',
			// description:'description',
			slideItemClass: '.term-group',
		}
	})
	$('.content-1 .left').on('click','.term-group',function(){
		let $this = $(this)
		$this.closest('.list-wrapper').find('.term-group').removeClass('selected')
		$this.addClass('selected')
	})

	$('.select-done').on('click',function(){
		// 去第二页
		modal.show('faceID')
		// $('.content-container').attr('data-step',2)
	})
	$('.return').on('click',function(){
		// 回第一页
		modal.show('success')
		// $('.content-container').attr('data-step',1)
	})

	
})