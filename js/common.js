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
	$('.quick-slide .bxslider').each(function(){
		$(this).bxSlider({
			mode: 'vertical',
			infiniteLoop: false,
			pager: false,
			hideControlOnEnd: true,
			maxSlides: 3,
			minSlides: 3
		});
	});

	$('.quick-menu').css({'opacity':'1'});

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
	/* 스크롤 탑 버튼 */
	$('.btn-scroll-top').click(function(){
		$('html, body').animate({scrollTop:0}, 300);
	});
	/* 스크롤 */
	$(window).scroll(function(){
		var winTop = $(window).scrollTop();
		// 서브 페이지
		$('.container').each(function(){
			var conTop = $('.container').offset().top;
			if(winTop >= conTop){
				$('.quick-menu').css({'top':'40px'});
			}else{
				$('.quick-menu').css({'top':(conTop+40)-winTop});
			}
		});
		// 메인페이지
		$('.visual-banner').each(function(){
			var conTop = $('.visual-banner').next('.section').offset().top;
			if(winTop >= conTop){
				$('.quick-menu').css({'top':'40px'});
			}else{
				$('.quick-menu').css({'top':(conTop+40)-winTop});
			}
		});
	});
	$(window).scroll();

	/* 푸터 패밀리사이트 버튼 */
	$('.footer .inner .util .link .btn').click(function(){
		$(this).parents('.link').find('.layer').show();
	});
	$('.footer .inner .util .link .layer .close').click(function(){
		$(this).parents('.layer').hide();
	});

	/* -----------------------------------------------------------------------------------------------------------
		폼요소
	----------------------------------------------------------------------------------------------------------- */
	/*
		셀렉트 디자인
		++ 셀렉트 선택값(value)은 변수 oVal로 처리 ++
	*/
	$.fn.ps_designSelBox = function(options){
		return this.each(function(){
			var $obj = $(this),
				dom = '';
				dom += '<div class="ps_designSelBoxIn">',
				dom += '<button type="button" class="ps_currSel"></button>',
				dom += '<ul class="ps_list"></ul>',
				dom += '</div>'

				$obj.append(dom);

			var $sel = $obj.find('select'),
				$deSel = $obj.find('.ps_designSelBoxIn'),
				$btn = $deSel.find('.ps_currSel'),
				$lst = $deSel.find('.ps_list'),
				$lstBtn = $lst.find('button'),

				selEd = $sel.find('option:selected').text(),
				idx = 0,
				txt = '',
				code = 0,
				max = $sel.find('option').length;

			// 초기 설정 값
			var defaults = {
				rows: max
			};

			// 기본, 임의 값 합침
			var init = {};
			init = $.extend(true, defaults, options);

			// 상태초기화
			function selReset(){
				$('.ps_designSelBox').each(function () {
					$(this).find('.ps_list').removeAttr('style');
					$(this).removeClass('on');
					$(this).removeClass('bot');
				});
			};

			// 디자인 셀렉트 박스 버튼 초기값
			$btn.text(selEd);

			// 디자인 셀렉트 박스 리스트 뿌리기
			$sel.find('option').each(function(){
				$lst.append('<li><button type="button">' + $(this).text() + '</button></li>');
			});
			$lst.find('li:first-child').addClass('on');

			// 디자인 셀렉트 박스의 기본 넓이 적용
			$deSel.width($sel.outerWidth());

			// 버튼 눌렀을때 디자인 셀렉트 나오기
			$btn.on('click', function(e){
				$(this).parents('.ps_designSelBox').append('<div class="select-close">');
				if(!$(this).parents('.ps_designSelBox').hasClass('on')){
					$('.ps_designSelBox').removeClass('on');
					$(this).parents('.ps_designSelBox').addClass('on');

					// 노출될 리스트 개수
					if(!$(this).parents('.ps_designSelBox').hasClass('on') || max > init.rows){
						$lst.css({width:$(this).outerWidth(), height:$lst.find('li').eq(1).height() * init.rows})
					};

					// 셀렉트 박스의 위치가 아래있어서 리스트가 아래로 나올경우 가려져 안나오는 것을 방지하고 bot클래스 추가
					if($(window).height() < $deSel.offset().top + $lst.height() - $(window).scrollTop() + $deSel.height()){
						$(this).parents('.ps_designSelBox').addClass('bot');
						$(this).next().css({bottom:$(this).outerHeight()});
					};
				}else{
					selReset();
					$('.select-close').remove();
				}

				/* 펼쳐진 상태에서 다른 곳을 눌렀을 경우 닫히기
				$(document).on('click', function(){
					selReset();
					$(document).unbind('click');
				});
				*/

				// 이벤트 방지
				e.stopPropagation();
			});

			// 셀렉트박스 닫기
			$(document).on('click', '.select-close', function(){
				selReset();
				$(this).remove();
			});

			// 키보드 접근
			$btn.on('keydown', function(e){
				code = (e.keyCode ? e.keyCode : e.which);
				$sel.find('option:eq(' + idx + ')').prop('selected', false);

				if(code == 38 && !(idx==0)) {idx--;} // 방향키 위
				else if(code == 40 && !(idx == max -1)) {idx++;} // 방향키 아래

				$(this).text($lst.find('li').eq(idx).find('button').text());
				$sel.find('option:eq(' + idx + ')').prop('selected', true).change();

				// 다음 객체에 포커스 이동이 되야 하므로 탭 키가 아닐 경우만 이벤트 방지
				if(code != 9) {e.preventDefault();}
			});

			// 리스트 눌렀을 때 현재 선택한 값 표시 및 셀렉트 박스에 선택
			$lst.on('click', 'button', function(){
				idx = $(this).parent().index();
				txt = $(this).text();

				// 현재 선택한 값 노출
				$btn.text(txt);

				// 셀렉트 박스의 옵션 선택
				$sel.find('option').prop('selected', false);
				$sel.find('option:eq(' + idx + ')').prop('selected', true).change();

				// 리스트 닫기
				selReset();
				$('.select-close').remove();
				$btn.focus();

				$('.ps_list li').removeClass('on');
				$(this).parent('li').addClass('on');

				// 선택후 붉은색 활성화
				if($(this).parent('li').index() <= 0){
					$(this).parents('.ps_designSelBox').removeClass('red');
				}else{
					$('.ps_designSelBox').removeClass('red');
					$(this).parents('.ps_designSelBox').addClass('red');
				}
			});
		});
	};

	// Design Select Box 기본
	$('.ps_designSelBox').ps_designSelBox({
		rows: 10 // 노출하고 싶은 option 갯수 설정
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
	});
	$('input[type=radio].styled1').change(function(){
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
	$('.layer-popup, .layer-menu').hide().css({'opacity':'1'});
	$('.layer-popup, .layer-menu').each(function(){
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
	$(document).on('click', '.layer-popup .btn-close, .popup-close, .layer-menu .btn-close', function(){
		$('.layer-popup, .layer-menu').fadeOut(200);
		$('.bg-layer').fadeOut(200);
		$('.popup-close').remove();
		$('body').css({'overflow-y':'inherit'});
	});
});
