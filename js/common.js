/*
	최초 작성일 : 2017-05-29
	최초 작성자 : (주)그레이블루/퍼블리싱팀
	소속 : (주)그레이블루/퍼블리싱팀
	# 최초 작성자 이외 수정시 주석 필수 #
*/

$(window).load(function(){

	/* ===========================================================================================================
		공통
	=========================================================================================================== */
	/* -----------------------------------------------------------------------------------------------------------
		퀵메뉴
	----------------------------------------------------------------------------------------------------------- */
	/* 슬라이드 */
	$('.quick-slide .bxslider').bxSlider({
		mode: 'vertical',
		infiniteLoop: false,
		pager: false,
		hideControlOnEnd: true,
		maxSlides: 3,
		minSlides: 3
	});

	$('.quick-slide').append('<div class="over-list">');
	$('.quick-slide .slide-item').each(function(){
		var img = $(this).find('.img-area').html();
		$(this).find('.over-layer .img').html(img);
		var data = $(this).find('.over-layer').html();
		$(this).parents('.quick-slide').find('.over-list').append('<div class="over-item">' + data);
	});
	/* 최근본 차량 오버 */
	$('.quick-slide .slide-item').mouseenter(function(){
		var quickTop = $(this).parents('.bx-wrapper').offset().top;
		var top = $(this).offset().top;
		var idx = $(this).index();
		$('.over-item').css({'top':top-quickTop+20});
		$('.over-item').eq(idx).show().animate({right:0}, 100);
	});
	/* 최근본 차량 아웃 */
	$('.quick-slide .over-item').mouseleave(function(){
		$('.over-item').hide().css({'right':'-170px'});
	});

	/* -----------------------------------------------------------------------------------------------------------
		폼요소
	----------------------------------------------------------------------------------------------------------- */
	/*
		셀렉트 디자인
		++ 셀렉트 선택값(value)은 변수 oVal로 처리 ++
	*/
	$('select').each(function(){
		var title = $(this).find('option:first-child').html();
		var wid = $(this).outerWidth();
		if($(this).hasClass('styled1')){
			$(this).wrap('<div class="select-box">');
		}else{
			$(this).wrap('<div class="select-box type2">');
		}
		$(this).parents('.select-box').css({'width':wid}).append('<div class="select-title">');
		$(this).parents('.select-box').find('.select-title').html(title);

		$(this).parents('.select-box').append('<ul class="select-list">');
		var option = $(this).find('option');
		$(option).each(function(){
			var txt = $(this).html();
			$(this).parents('.select-box').find('.select-list').append('<li class="item">' + txt);
			$(this).parents('.select-box').find('.item:first-child').addClass('on');
		});

		$(this).change(function(){
			var transVal = $(this).val();
			//var order = $(this).index();
			$('.select-title').html(transVal);
		});

		if($(this).attr('disabled')){
			$(this).parents('.select-box').addClass('disabled');
		}
	});

	$('.select-title').click(function(){
		if($(this).parents('.select-box').hasClass('disabled') == false){
			$(this).parents('.select-box').addClass('focus').find('.select-list').slideDown(200);
			$(this).parents('.select-box').append('<div class="select-close" style="position:fixed;left:0;right:0;top:0;bottom:0;">');
		}
	});
	$('.select-box .item').mouseenter(function(){
		$(this).parents('.select-box').find('.item').removeClass('on');
		$(this).addClass('on');
	});
	$('.select-box .item').click(function(){
		var idx = $(this).index();
		var oVal = $(this).parents('.select-box').find('option').eq(idx).val();
		var txt = $(this).html();
		$(this).addClass('on');
		$(this).parents('.select-box').find('select').val(oVal);
		$(this).parents('.select-box').find('.select-title').html(txt);
		if(idx != 0){
			$(this).parents('.select-box').addClass('on');
		}else {
			$(this).parents('.select-box').removeClass('on');
		}
		$(this).parents('.select-box').removeClass('focus').attr('value', oVal);
		$(this).parents('.select-list').hide();
		$('.select-close').hide();
	});
	$(document).on('click', '.select-close', function(){
		$('.select-close').hide();
		$('.select-list').hide();
		$('.select-box').removeClass('focus');
	});

	/* 체크박스 */
	$('input[type=checkbox].styled1').each(function(){
		$(this).parents('label').addClass('check-radio');
		$(this).wrap('<span class="checkbox">');
		if(this.checked){
			$(this).parents('.checkbox').addClass('checked');
		}
		if(this.disabled){
			$(this).parents('.checkbox').addClass('disabled');
		}
	});
	$('input[type=checkbox].styled1').change(function(){
		if(this.checked){
			$(this).parents('.checkbox').addClass('checked');
		}else{
			$(this).parents('.checkbox').removeClass('checked');
		}
	});

	/* 라디오박스 */
	$('input[type=radio].styled1').each(function(){
		$(this).parents('label').addClass('check-radio');
		$(this).wrap('<span class="radiobox">');
		if(this.checked){
			$(this).parents('.radiobox').addClass('checked');
		}
		if(this.disabled){
			$(this).parents('.radiobox').addClass('disabled');
		}
	});
	$('input[type=radio].styled1').change(function(){
		var name = $(this).attr('name');
		if(this.checked){
			$('.radiobox input[name='+name+']').parents('.radiobox').removeClass('checked');
			$(this).parents('.radiobox').addClass('checked');
		}
	});

	/* ===========================================================================================================
		레이어 팝업
	=========================================================================================================== */
	$('.layer-popup').hide().css({'opacity':'1'});
	$('.layer-popup').each(function(){
		var winH = $(window).height();
		var popH = $(this).outerHeight();

		if(popH >= winH){
			$(this).addClass('scroll');
		}else{
			$(this).removeClass('scroll');
		}
	});

	$('.btn-popup').click(function(){
		var zIdx = $('.layer-popup').css('z-index');
		$('body').append('<div class="popup-close">');
		$('.popup-close').css({'z-index':zIdx-1});
		$('body').css({'overflow':'hidden'});
	});
	$(document).on('click', '.layer-popup .btn-close, .popup-close', function(){
		$('.layer-popup').fadeOut(200);
		$('.bg-layer').fadeOut(200);
		$('.popup-close').remove();
		$('body').css({'overflow-y':'inherit'});
	});
});
