/*
	최초 작성일 : 2017-05-29
	최초 작성자 : (주)그레이블루/퍼블리싱팀
	소속 : (주)그레이블루/퍼블리싱팀
*/

$(window).load(function(){
	/* =================================================================
		상단 비주얼 슬라이드
	================================================================= */
	// 마우스 오버시 탭 변환
	$('.title-item .text').click(function(){
		var idx = $(this).parents('.title-item').index();
		$(this).parents('.visual-banner').find('.title-item').removeClass('on').eq(idx).addClass('on');
		$(this).parents('.visual-banner').find('.img-item').removeClass('on').eq(idx).addClass('on');
	});
	// 마우스 클릭시 탭 변환 (자동 슬라이드 전용 클릭)
	$('.title-item').click(function(){
		var idx = $(this).index();
		$(this).parents('.visual-banner').find('.title-item').removeClass('on').eq(idx).addClass('on');
		$(this).parents('.visual-banner').find('.img-item').removeClass('on').eq(idx).addClass('on');
	});

	// 다음 버튼
	$('.btn-next').click(function(){
		var idx = $(this).parents('.visual-banner').find('.title-item.on').index();
		var len = $(this).parents('.visual-banner').find('.title-item').length - 1;
		if(idx >= len){
			$(this).parents('.visual-banner').find('.title-item:first-child').click();
		}else{
			$(this).parents('.visual-banner').find('.title-item.on').next('.title-item').click();
		}
	});
	// 이전 버튼
	$('.btn-prev').click(function(){
		var idx = $(this).parents('.visual-banner').find('.title-item.on').index();
		var len = $(this).parents('.visual-banner').find('.title-item').length - 1;
		if(idx <= 0){
			$(this).parents('.visual-banner').find('.title-item:last-child').click();
		}else{
			$(this).parents('.visual-banner').find('.title-item.on').prev('.title-item').click();
		}
	});

	// 자동 슬라이드
	var sSpeed = 3000;// 슬라이드 속도
	visualTimer = setInterval(function(){
		$('.btn-next').click();
	}, sSpeed);

	// 재생/멈춤 버튼
	$('.btn-stop').click(function(){
		if($(this).hasClass('play')){
			$(this).removeClass('play');
			visualTimer = setInterval(function(){
				$('.btn-next').click();
			}, sSpeed);
		}else{
			$(this).addClass('play');
			clearInterval(visualTimer);
		}
	});

	// 마우스 오버시 자동 슬라이드 먼춤
	$('.visual-banner').mouseenter(function(){
		clearInterval(visualTimer);
	});
	// 마우스 아웃시 자동 슬라이드 시작
	$('.visual-banner').mouseleave(function(){
		if($('.btn-stop').hasClass('play')){
			clearInterval(visualTimer);
		}else{
			$(this).removeClass('play');
			visualTimer = setInterval(function(){
				$('.btn-next').click();
			}, sSpeed);
		}
	});

	$('.rent-cont .rent-bxslider').bxSlider({
		controls: true,
		infiniteLoop: false,
	});

	$('.rent-tab .item').each(function(){
		$(this).click(function(){
			var idx = $(this).index();
			$('.rent-tab .item').removeClass('on').eq(idx).addClass('on');
			//$('.rent-area').removeClass('on').eq(idx).addClass('on');
		});
	});
});
