/*
	최초 작성일 : 2017-03-06
	최초 작성자 : 최민호
	소속 : (주)그레이블루/퍼블리싱팀
	# 최초 작성자 이외 수정시 주석 필수 #
*/

$(window).load(function(){
	/* 멀티 말줄임 */
	$('.line-2').each(function(){
		$(this).dotdotdot();
	});

	/* 알림창 팝업 */
	$('.popup-notice').each(function(){
		var popH = $(this).outerHeight();
		$(this).css({'bottom':-popH}).delay(500).animate({bottom:-4}, 400);
	});
	$('.popup-notice .btn-close').click(function(){
		$('.popup-notice').hide();
	});

	/* 퀵메뉴 */
	$('.quick-layer').hide().css({'opacity':'1'});
	// 스크롤 버튼
	$('.btn-scroll-area button').click(function(){
		if($(this).hasClass('btn-top')){
			$('html, body').stop().animate({scrollTop:0},200);
		}else{
			var sBtm = $(document).height() - $(window).height();
			$('html, body').stop().animate({scrollTop:sBtm},200);
		}
	});
	// 메뉴 버튼
	$('.quick-list .item1.btn-popup').click(function(){
		$('.pop-consul').fadeIn(200);
		$('.quick-list .item').removeClass('on');
		$('.quick-layer').hide();
		$(this).addClass('on');
	});
	$(document).on('click', '.popup-close, .btn-close', function(){
		$('.quick-list .item1.btn-popup').removeClass('on');
	});
	$('.btn-group .item').click(function(){
		var idx = $(this).index();
		$('.btn-group .item').removeClass('on').eq(idx).addClass('on');
		$('.quick-layer').hide().eq(idx).show();
	});
	$('.quick-menu-layer .head .btn-close').click(function(){
		$('.btn-group .item').removeClass('on');
		$('.quick-layer').hide();
	});
	// 간편주문 팝업
	$('.btn-pop-order').click(function(){
		$('.pop-order').fadeIn(200);
	});

	// 상단 배너 닫기
	$('.top-banner .btn-close').click(function(){
		$(this).parents('.top-banner').slideUp(300, function(){
			$(this).remove();
		});
		$('.quick-menu').animate({top:145}, 300);// 퀵메뉴
	});

	/* 상단 검색 레이어 */
	$('.search-input .query, .search-box .search-text').focusin(function(){
		$(this).next('.word-box').show();
	}).focusout(function(){
		$(this).next('.word-box').hide();
	});

	/* 전체보기 레이어에 gnb 복사 */
	var gnb = $('.gnb-list').html();
	$('.gnb-layer .layer-top').append('<ul class="gnb-list">');
	$('.gnb-layer .layer-top .gnb-list').html(gnb);

	/* 전체메뉴 열기 */
	$('.gnb .btn-menu').click(function(){
		$('.head-btm').css({'z-index':'15'});
		$('.gnb-layer').fadeIn(200);
		$('.gnb').append('<div class="gnb-close">');
	});
	$(document).on('click', '.btn-close, .gnb-close', function(){
		$('.head-btm').css({'z-index':'10'});
		$('.gnb-close').remove();
		$('.gnb-layer').fadeOut(100, function(){
			$('.lnb-item, .menu-box .gnb-depth').removeClass('on');
			$('.lnb-item:first-child, .menu-box .gnb-depth:first-child').addClass('on');
		});
	});

	/* gnb 레이어 LNB 오버 */
	$('.lnb-item').mouseenter(function(){
		var idx = $(this).index();
		$('.lnb-item').removeClass('on').eq(idx).addClass('on');
		$('.menu-box .gnb-depth').removeClass('on').eq(idx).addClass('on');
	});

	/* 달력 (datepicker) */
	$('.datepicker').each(function(){
		$(this).datepicker({
			showOn:'button',
			dateFormat:'yy/mm/dd',
			monthNames :['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			showMonthAfterYear:true,
			dayNamesMin:['일', '월', '화', '수', '목', '금', '토'],
			firstDay: 0,
			showOtherMonths: true,
			yearSuffix: '년',
			onSelect: function(e){
				if($(this).parents('.calendar').hasClass('term') == false){
					var date = new Date($(this).datepicker({ dateFormat:'yy/mm/dd'}).val()),
					week = new Array('일', '월', '화', '수', '목', '금', '토');
					if (week[date.getDay()]!= undefined){
						$(this).val($(this).val() + '(' + (week[date.getDay()]) + ')');
					}
				}
			}
		});

		var now = new Date();
		var year= now.getFullYear();
		var mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
		var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
		var week = new Array('일', '월', '화', '수', '목', '금', '토');
		var dateVal = year + '/' + mon + '/' + day + '(' + week[now.getDay()] + ')';

		var newDay = new Date( year, mon, "");
		var lastDay = newDay.getDate();
		var firstVal = year + '/' + mon + '/' + '01'; // 이번달 시작일
		var lastVal = year + '/' + mon + '/' + lastDay; // 이번달 마지막일

		if($(this).parents('.calendar').hasClass('term')){
			if($(this).hasClass('start')){
				// 이번달 시작일 호출
				$(this).val(firstVal);
			}else{
				// 이번달 마지막일 호출
				$(this).val(lastVal);
			}
		}else{
			// 오늘 날짜 호출
			$(this).val(dateVal);
		}
	});

	// 캘린더 개월 설정
	$('.btn-term').click(function(){
		$(this).parents('.btn-area').find('.btn-term').removeClass('on');
		$(this).addClass('on');

		var now = new Date();
		var year= now.getFullYear();
		var mon1 = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
		var mon3 = (now.getMonth()+3)>9 ? ''+(now.getMonth()+3) : '0'+(now.getMonth()+3);
		var mon6 = (now.getMonth()+6)>9 ? ''+(now.getMonth()+6) : '0'+(now.getMonth()+6);
		var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();

		var newDay = new Date( year, mon3, "");
		var lastDay = newDay.getDate();
		var firstVal = year + '/' + mon1 + '/' + '01'; // 이번달 시작일
		var lastVal = year + '/' + mon3 + '/' + lastDay; // 이번달 마지막일

		var endMon3 = '0' + (mon3 - 12);
		var endMon3 = '0' + (mon6 - 12);

		$(this).parents('.search-form').find('.datepicker.start').val(firstVal);
		// 1개월
		if($(this).hasClass('month1')){
			var lastVal = year + '/' + mon1 + '/' + lastDay;
			$(this).parents('.search-form').find('.datepicker.end').val(lastVal);
		}
		// 3개월
		if($(this).hasClass('month3')){
			if(mon3 >= 13){
				var lastVal = (year+1) + '/' + endMon3 + '/' + lastDay;
				$(this).parents('.search-form').find('.datepicker.end').val(lastVal);
			}else{
				var lastVal = year + '/' + mon3 + '/' + lastDay;
				$(this).parents('.search-form').find('.datepicker.end').val(lastVal);
			}
		}
		// 6개월
		if($(this).hasClass('month6')){
			if(mon3 >= 13){
				var lastVal = (year+1) + '/' + endMon6 + '/' + lastDay;
				$(this).parents('.search-form').find('.datepicker.end').val(lastVal);
			}else{
				var lastVal = year + '/' + mon6 + '/' + lastDay;
				$(this).parents('.search-form').find('.datepicker.end').val(lastVal);
			}
		}
	});

	/* ===========================================================================================================
		슬라이더
	=========================================================================================================== */
	/* 관련물품 */
	var bxsliderLen = $('.bxslider').length;

	$('.thumb-slide1 .bxslider').each(function(){
		$(this).bxSlider({
			//infiniteLoop:false,
			speed:400
		});
	});

	$('.thumb-slide2 .bxslider').each(function(){
		$(this).bxSlider({
			//infiniteLoop:false,
			speed:400,
			pagerType:'short'
		});
	});

	/* 테마식단 */
	$('.thumb-slide3 .bxslider').each(function(){
		$(this).bxSlider({
			//infiniteLoop:false,
			speed:400
		});
	});

	/*한살림 매장 소식*/
	$('.thumb-slide4 .bxslider').each(function(){
		$(this).bxSlider({
			//infiniteLoop:false,
			slideWidth: 366,
			minSlides: 2,
			maxSlides: 3,
			moveSlides: 3,
			slideMargin: 10,
		});
	});


	/* 새로 공급한 물품 이용후기 */
	$('.review-area .bxslider').each(function(){
		$(this).bxSlider({
			//infiniteLoop:false,
			speed:400
		});
	});

	$('.bx-pager').each(function(){
		var len = $(this).find('.bx-pager-item').length;
		if(len <= 1){
			$(this).hide();
		}
	});
	$('.bxslider').animate({'opacity':'1'}, 200);

	/* 나의 한살림 (오늘의 알림) */
	$('.notice-slide').each(function(){
		var item = $(this).find('.notice-list .item');
		var itemLen =  $(item).length;
		if(itemLen >= 2){
			$(this).append('<button type="button" class="btn-notice-tog">');
			$(this).append('<div class="count-area"><span class="now">1</span>/<span class="all">' + itemLen + '</span></div>');
			$(this).append('<button type="button" class="btn-next">다음');

			var itemHei = $(item).outerHeight();
			$(item).each(function(){
				var idx = $(this).index();
				$(this).css({'top':itemHei * idx});
			});

			count = 0;
			var btnNext = $(this).find('.btn-next');
			$(btnNext).click(function(){
				$('.notice-slide .notice-list .item').animate({top:'-=' + itemHei}, 300);
				setTimeout(function(){
					var itemData = $('.notice-slide .notice-list .item:first-child').html();
					$('.notice-slide .notice-list .item:first-child').remove();
					var itemLen = $('.notice-slide .notice-list .item').length;
					$('.notice-slide .notice-list').append('<p class="item" style="top:' + itemHei * itemLen + 'px;">' + itemData);
				}, 300);

				count ++;
				if(count >= itemLen){
					count = 0;
					$('.notice-slide .count-area .now').html('1');
				}else{
					$('.notice-slide .count-area .now').html(count + 1);
				}
			});

			var sSpeed = 4000;// 슬라이드 속도
			noticeTimer = setInterval(function(){
				$(btnNext).click();
			}, sSpeed);

			var btnTog = $(this).find('.btn-notice-tog');
			$(btnTog).click(function(){
				if($(this).hasClass('on')){
					noticeTimer = setInterval(function(){
						$(btnNext).click();
					}, sSpeed);
					$('.notice-slide .notice-list').animate({'height':itemHei}, 200);
					$('.notice-slide .count-area').show();
					$(this).removeClass('on');
				}else{
					clearInterval(noticeTimer);
					$('.notice-slide .notice-list').animate({'height':itemLen * itemHei}, 200);
					$('.notice-slide .count-area').hide();
					$(this).addClass('on');
				}
			});
		}
	});

	/* ===========================================================================================================
		탭메뉴
	=========================================================================================================== */
	/*상세 탭*/
	$('.tab-item').click(function(){
		var idx = $(this).index();
		var cont_height = $('.cont-wrap').offset().top - $('.tab-wrap').outerHeight() - $('.head-btm').outerHeight() ;

		$('.tab-item').removeClass('on').eq(idx).addClass('on');
		$('.tab-content').removeClass('on').eq(idx).addClass('on');
		$('html, body').animate({scrollTop:cont_height});
	});

	/*방사성물질 검사 탭*/
	$('.test-term .year > li').click(function(){
		if($(this).hasClass('on')){
			$(this).addClass('on').children('.month').show();
		}else{
			$('.test-term .year > li').removeClass('on').children('.month').hide().find('li').removeClass('on');
			$(this).addClass('on').children('.month').show();
		}
	});

	$('.month li').click(function(){
		$(this).addClass('on').siblings('li').removeClass('on');
	});

	$('.test-tab li button').click(function(){
		var idx = $(this).parents('li').index();
		$('.test-tab li').removeClass('on').eq(idx).addClass('on');
	});
	/* ===========================================================================================================
		상품상세 faq
	=========================================================================================================== */
	//아코디언
	$(document).on('click', '.faq-list .question', function(){
		if($(this).parents('li').hasClass('on')){
			$(this).parents('li').removeClass('on').find('.answer').slideUp(100);
		}else{
			$('.faq-list .question').parents('li').removeClass('on').find('.answer').slideUp(100);
			$(this).parents('li').addClass('on').find('.answer').slideDown(200);
		}
	});

	//글자수
	$('#text-write').keyup(function (e){
		var content = $(this).val();
		//$(this).height(((content.split('\n').length + 1) * 1.5) + 'em');
		$('.text-leng').html(content.length + '/500자');
	});

	/* ===========================================================================================================
		스크롤 이벤트
	=========================================================================================================== */
	$(window).scroll(function(){
		var winTop = $(window).scrollTop();
		var winLeft = $(window).scrollLeft();
		/* 스크롤 다운시 해더 변경 */
		var gnbTop = $('.head-top').offset().top + $('.head-top').outerHeight();

		if(winTop >= gnbTop){
		//2017-05-08 삭제
			// $('html').addClass('down');
			// $('.head-btm .gnb').css({'left':-winLeft});
			// $(window).resize(function(){
			// 	var gnbW = $('.gnb').outerWidth();
			// 	var searchW = $('.head-top .search-box').outerWidth();
			// 	var left = $('.gnb').offset().left + (gnbW - searchW);
			// 	$('.down .head-top .search-box').css({'right':'inherit', 'left':left});
			// });
		//2017-05-08 삭제끝
			$(window).resize();
			$('.quick-menu').stop().animate({top:145}, 200);// 퀵메뉴
		}else{
		//2017-05-08 삭제
			// $('html').removeClass('down');
			// $('.head-btm .gnb').css({'left':'0'});
			// $('.head-top .search-box').css({'right':'0', 'left':'inherit'});
		//2017-05-08 삭제끝
			if($('.top-banner').length >= 1){
				$('.quick-menu').stop().animate({top:245}, 200);// 퀵메뉴
			}else{
				$('.quick-menu').stop().animate({top:145}, 200);// 퀵메뉴
			}
		}
		function resizeTab(){
			$('.tab-wrap').each(function(){
				var tabTop = $('.tab-wrap').offset().top - $('.gnb-list').outerHeight();
				if(winTop >= tabTop){
					$('html').addClass('tab');
					var winW = $(window).width();
					if(winW <= 1120 ){
						$('.tab .tab-area').css({'left':-winLeft, 'margin-left':'0'});
					}else{
						$('.tab .tab-area').css({'left':'50%', 'margin-left':'-560px'});
					}
				}else{
					$('html').removeClass('tab');
					$('.tab-area').removeAttr('style');
				}
			});
		}
		resizeTab();
		$(window).resize(resizeTab);

	});
	$(window).scroll();


	/* ===========================================================================================================
		공통
	=========================================================================================================== */
	/* -----------------------------------------------------------------------------------------------------------
		폼요소
	----------------------------------------------------------------------------------------------------------- */
	/* 페스워드 (나눔스퀘어폰트가 일부 브라우저에서 인코딩되지 않는 현상 해결) */
	$('input[type=password]').keyup(function(){
		if($(this).val() == 0){
			$(this).removeClass('click');
		}else{
			$(this).addClass('click');
		}
	});
	/* 검색 포커스 */
	$('.search-box input[type=text]').each(function(){
		$(this).focus(function(){
			$(this).parents('.search-box').addClass('focus');
		});
		$(this).blur(function(){
			$(this).parents('.search-box').removeClass('focus');
		});
	});

	/*
		셀렉트 디자인
		++ 셀렉트 선택값(value)은 변수 oVal로 처리 ++
	*/
	$('select.styled1').each(function(){
		var title = $(this).find('option:first-child').html();
		var wid = $(this).outerWidth();
		$(this).wrap('<div class="select-box">');
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

	/* 수량체크 */
	$('body').click(function(){
		$('.volume-box').removeClass('on');
	});
	$('.volume-box').click(function(){
		$('.volume-box').removeClass('on');
		$(this).addClass('on');
		return false;
	});
	$('.volume-box .btn').each(function(){
		if($(this).parents('.volume-box').hasClass('disabled')){
			$(this).parents('.volume-box').find('.volume').prop('disabled', true).val('0');
		}
		$(this).click(function(){
			if($(this).parents('.volume-box').hasClass('disabled') == false){
				if($(this).hasClass('btn-plus')){
					var defaultN = $(this).parents('.volume-box').find('.volume').val()*1;
					$(this).parents('.volume-box').find('.volume').val(defaultN+1);
				}else{
					var defaultN = $(this).parents('.volume-box').find('.volume').val()*1;
					if(defaultN <= 1){
						$(this).parents('.volume-box').find('.volume').val('1');
					}else{
						$(this).parents('.volume-box').find('.volume').val(defaultN-1);
					}
				}
			}
		});
	});

	/* 인풋 셀렉트 레이어 타입 */
	$('.input-select input').mouseenter(function(){
		$(this).parents('.input-select').find('.list').show();
	});
	$('.input-select input').keyup(function(){
		var byte = $(this).val().length;
		$(this).parents('.input-select').find('.byte-text .byte').html(byte);
	});
	$('.input-select .list .item').click(function(){
		var txt = $(this).html();
		var byte = $(this).text().length;
		if($(this).hasClass('write')){
			$(this).parents('.input-select').find('input').val('').focus();
		}else{
			$(this).parents('.input-select').find('input').val(txt);
		}
		$(this).parents('.input-select').find('.list').hide();
		$(this).parents('.input-select').find('.byte-text .byte').html(byte);
	});
	$('.input-select').mouseleave(function(){
		$(this).find('.list').hide();
	});

	/* 정렬 솔팅 영역 */
	$('.order-list button').click(function(){
		$(this).parents('.order-list').find('button').removeClass('on');
		$(this).addClass('on');
	});

	/* 알림 토글 버튼 */
	$('.btn-notice2').click(function(){
		$(this).toggleClass('on');
	});

	/* -----------------------------------------------------------------------------------------------------------
		검색 조건 설정 테이블
	----------------------------------------------------------------------------------------------------------- */
	/* 선택 조건 */
	$('.select-area').each(function(){
		// 갯수 출력
		var len = $(this).find('.list-area li').length;
		$(this).find('.title span').html(len);

		// 삭제
		var btnDelete = $(this).find('.btn-delete');
		$(btnDelete).click(function(){
			var dLen = $(this).parents('.select-area').find('.list-area li').length - 1;
			$(this).parents('.select-area').find('.title span').html(dLen);
			if(dLen <= 0){
				$(this).parents('.select-area').find('.reset-area').hide();
				$(this).parents('.select-area').find('.list-area ul').remove();
			}
			$(this).parents('li').remove();
		});

		// 초기화
		var btnReset = $(this).find('.btn-reset');
		$(btnReset).click(function(){
			$(this).parents('.select-area').find('.title span').html('0');
			$(this).parents('.select-area').find('.list-area ul').remove();
		});
	});

	/* 알레르기성분 제외조건 */
	$('.allergy-area').each(function(){
		// 갯수 출력
		var len = $(this).find('.btn-toggle.on').length;
		$(this).find('.title span').html(len);

		// 버튼 선택
		var btnTog = $(this).find('.btn-toggle');
		$(btnTog).click(function(){
			$(this).toggleClass('on');
			var len = $(this).parents('.allergy-area').find('.btn-toggle.on').length;
			$(this).parents('.allergy-area').find('.title span').html(len);
		});

		// 초기화
		var btnReset = $(this).find('.btn-reset');
		$(btnReset).click(function(){
			$(this).parents('.allergy-area').find('.btn-toggle').removeClass('on');
			var len = $(this).parents('.allergy-area').find('.btn-toggle.on').length;
			$(this).parents('.allergy-area').find('.title span').html(len);
		});
	});

	/* ===========================================================================================================
		로그인 (lo/)
	=========================================================================================================== */
	/* 아이디 찾기 IM-LO0201.html */
	// 인증 라디오 선택시 동작
	$('.id-radio').click(function(){
		var idx = $(this).index();
		$(this).parents('.center-cont').find('.form-area').removeClass('on').eq(idx).addClass('on');
	});


	/* ===========================================================================================================
		회원가입 (jo/)
	=========================================================================================================== */
	/* 약관 전체 동의 체크박스 (IM-JO0301.html) */
	$('.all-check input[type=checkbox]').change(function(){
		if(this.checked){
			$(this).parents('.terms-wrap').find('input[type=checkbox]').prop('checked', true);
			$(this).parents('.terms-wrap').find('.checkbox').addClass('checked');
		}else{
			$(this).parents('.terms-wrap').find('input[type=checkbox]').prop('checked', false);
			$(this).parents('.terms-wrap').find('.checkbox').removeClass('checked');
		}
	});
	$('.terms-box input[type=checkbox]').change(function(){
		var boxLen = $(this).parents('.terms-wrap').find('.terms-box input[type=checkbox]').length;
		var ckeckLen = $(this).parents('.terms-wrap').find('.terms-box input[type=checkbox]:checked').length;
		if(ckeckLen >= boxLen){
			$(this).parents('.terms-wrap').find('.all-check input[type=checkbox]').prop('checked', true);
			$(this).parents('.terms-wrap').find('.all-check .checkbox').addClass('checked');
		}else{
			$(this).parents('.terms-wrap').find('.all-check input[type=checkbox]').prop('checked', false);
			$(this).parents('.terms-wrap').find('.all-check .checkbox').removeClass('checked');
		}
	});


	/* 이메일 셀렉트박스 (IM-JO0401.html) */
	$('.e-mail-form .select-list .item').click(function(){
		var mailTxt = $(this).html();
		if($(this).index() <= 0){
			$(this).parents('.e-mail-form').find('.transTxt').val('').focus();
		}else{
			$(this).parents('.e-mail-form').find('.transTxt').val(mailTxt);
		}
	});

	/* 도움말 보기 (IM-JO0301.html) */
	$('.btn-hint').click(function(){
		if($(this).parents('.btn-layer').hasClass('on')){
			$('.btn-layer').removeClass('on').find('.hint-layer').slideUp(100);
		}else{
			$('.btn-layer').removeClass('on').find('.hint-layer').slideUp(100);
			$(this).parents('.btn-layer').addClass('on').find('.hint-layer').slideDown(200);
		}
	})
	$('.btn-layer .btn-close').click(function(){
		$('.btn-layer').removeClass('on').find('.hint-layer').slideUp(100);
	});

	$('.view-select').each(function(){
		$(this).parents('.select-box').find('.select-list .item').append('<span class="data">');

		// 물품상세 셀렉트 박스
		var option = $(this).find('option');
		$(option).each(function(){
			var data = $(this).attr('data');
			var idx = $(this).index();
			$(this).parents('.select-box').find('.select-list .item').eq(idx).find('.data').html(data);
		});
		var item = $(this).parents('.select-box').find('.select-list .item');
		$(item).click(function(){
			$(this).parents('.select-box').find('.select-title .data').remove();
		});
	});

	/* sns 공유 */
	$('.btn-use').click(function(){
		$(this).next('.sns-box').show();
	});

	$('.sns-box .sns-close').click(function(){
		$(this).parents('.sns-box').hide();
	});

	/* ===========================================================================================================
		장바구니 (sh/)
	=========================================================================================================== */
	/* 장바구니 (IM-SH01.html) */
	// 아코디언
	$('.list-group.on .list-content').slideDown(200);
	$('.list-title .btn-list-close').click(function(){
		if($(this).parents('.list-group').hasClass('on')){
			$(this).parents('.list-group').removeClass('on').find('.list-content').slideUp(100);
		}else{
			$(this).parents('.list-group').addClass('on').find('.list-content').slideDown(200);
		}
	});
	// 테이블 안 체크박스 전체 선택
	$('th input[type=checkbox]').change(function(){
		if(this.checked){
			$(this).parents('table').find('tr').not('.bg').find('input[type=checkbox]').prop('checked', true).parents('.checkbox').addClass('checked');
			$(this).parents('table').find('input[type=checkbox]:disabled').prop('checked', false).parents('.checkbox').removeClass('checked');
		}else{
			$(this).parents('table').find('tr').not('.bg').find('input[type=checkbox]').prop('checked', false).parents('.checkbox').removeClass('checked');
		}
	});
	$('td input[type=checkbox]').change(function(){
		var boxLen = $(this).parents('table').find('td input[type=checkbox]').length;
		var disLen = $(this).parents('table').find('td input[type=checkbox]:disabled').length;
		var bgLen = $(this).parents('table').find('.bg td input[type=checkbox]').length;
		var len = boxLen - (disLen + bgLen);
		var checkLen = $(this).parents('table').find('td input[type=checkbox]:checked').length;
		var bgCheckLen = $(this).parents('table').find('.bg td input[type=checkbox]:checked').length;
		if(checkLen - bgCheckLen >= len){
			$(this).parents('table').find('th input[type=checkbox]').prop('checked', true).parents('.checkbox').addClass('checked');
		}else{
			$(this).parents('table').find('th input[type=checkbox]').prop('checked', false).parents('.checkbox').removeClass('checked');
		}
	});

	/* GNB BODY > 요리 (검색결과)*/
	$('.list-area-wrap').each(function(){
		var btnLen = $(this).find('.btn-search').length;
		if(btnLen <= 0){
			$(this).css({'padding-right':'30px'});
		}
	});

	/* 고정 버튼 */
	$('.btn-fixed').click(function(){
		$(this).toggleClass('on');
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
		$('.popup-close').remove();
		$('body').css({'overflow-y':'inherit'});
	});
});



/*
 *	jQuery dotdotdot 1.8.3
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 *	Plugin website:
 *	dotdotdot.frebsite.nl
 *
 *	Licensed under the MIT license.
 *	http://en.wikipedia.org/wiki/MIT_License
 */
!function(t,e){"use strict";function n(t,e,n){var r=t.children(),a=!1;t.empty();for(var i=0,d=r.length;i<d;i++){var l=r.eq(i);if(t.append(l),n&&t.append(n),o(t,e)){l.remove(),a=!0;break}n&&n.detach()}return a}function r(e,n,i,d,l){var s=!1,c="a, table, thead, tbody, tfoot, tr, col, colgroup, object, embed, param, ol, ul, dl, blockquote, select, optgroup, option, textarea, script, style",u="script, .dotdotdot-keep";return e.contents().detach().each(function(){var h=this,f=t(h);if("undefined"==typeof h)return!0;if(f.is(u))e.append(f);else{if(s)return!0;e.append(f),!l||f.is(d.after)||f.find(d.after).length||e[e.is(c)?"after":"append"](l),o(i,d)&&(s=3==h.nodeType?a(f,n,i,d,l):r(f,n,i,d,l)),s||l&&l.detach()}}),n.addClass("is-truncated"),s}function a(e,n,r,a,d){var c=e[0];if(!c)return!1;var h=s(c),f=h.indexOf(" ")!==-1?" ":"　",p="letter"==a.wrap?"":f,g=h.split(p),v=-1,w=-1,m=0,b=g.length-1;if(a.fallbackToLetter&&0===m&&0===b&&(p="",g=h.split(p),b=g.length-1),a.maxLength)h=i(h.trim().substr(0,a.maxLength),a),l(c,h);else{for(;m<=b&&(0!==m||0!==b);){var y=Math.floor((m+b)/2);if(y==w)break;w=y,l(c,g.slice(0,w+1).join(p)+a.ellipsis),r.children().each(function(){t(this).toggle().toggle()}),o(r,a)?(b=w,a.fallbackToLetter&&0===m&&0===b&&(p="",g=g[0].split(p),v=-1,w=-1,m=0,b=g.length-1)):(v=w,m=w)}if(v==-1||1===g.length&&0===g[0].length){var x=e.parent();e.detach();var C=d&&d.closest(x).length?d.length:0;if(x.contents().length>C?c=u(x.contents().eq(-1-C),n):(c=u(x,n,!0),C||x.detach()),c&&(h=i(s(c),a),l(c,h),C&&d)){var T=d.parent();t(c).parent().append(d),t.trim(T.html())||T.remove()}}else h=i(g.slice(0,v+1).join(p),a),l(c,h)}return!0}function o(t,e){return t.innerHeight()>e.maxHeight||e.maxLength&&t.text().trim().length>e.maxLength}function i(e,n){for(;t.inArray(e.slice(-1),n.lastCharacter.remove)>-1;)e=e.slice(0,-1);return t.inArray(e.slice(-1),n.lastCharacter.noEllipsis)<0&&(e+=n.ellipsis),e}function d(t){return{width:t.innerWidth(),height:t.innerHeight()}}function l(t,e){t.innerText?t.innerText=e:t.nodeValue?t.nodeValue=e:t.textContent&&(t.textContent=e)}function s(t){return t.innerText?t.innerText:t.nodeValue?t.nodeValue:t.textContent?t.textContent:""}function c(t){do t=t.previousSibling;while(t&&1!==t.nodeType&&3!==t.nodeType);return t}function u(e,n,r){var a,o=e&&e[0];if(o){if(!r){if(3===o.nodeType)return o;if(t.trim(e.text()))return u(e.contents().last(),n)}for(a=c(o);!a;){if(e=e.parent(),e.is(n)||!e.length)return!1;a=c(e[0])}if(a)return u(t(a),n)}return!1}function h(e,n){return!!e&&("string"==typeof e?(e=t(e,n),!!e.length&&e):!!e.jquery&&e)}function f(t){for(var e=t.innerHeight(),n=["paddingTop","paddingBottom"],r=0,a=n.length;r<a;r++){var o=parseInt(t.css(n[r]),10);isNaN(o)&&(o=0),e-=o}return e}if(!t.fn.dotdotdot){t.fn.dotdotdot=function(e){if(0===this.length)return t.fn.dotdotdot.debug('No element found for "'+this.selector+'".'),this;if(this.length>1)return this.each(function(){t(this).dotdotdot(e)});var a=this,i=a.contents();a.data("dotdotdot")&&a.trigger("destroy.dot"),a.data("dotdotdot-style",a.attr("style")||""),a.css("word-wrap","break-word"),"nowrap"===a.css("white-space")&&a.css("white-space","normal"),a.bind_events=function(){return a.bind("update.dot",function(e,d){switch(a.removeClass("is-truncated"),e.preventDefault(),e.stopPropagation(),typeof l.height){case"number":l.maxHeight=l.height;break;case"function":l.maxHeight=l.height.call(a[0]);break;default:l.maxHeight=f(a)}l.maxHeight+=l.tolerance,"undefined"!=typeof d&&(("string"==typeof d||"nodeType"in d&&1===d.nodeType)&&(d=t("<div />").append(d).contents()),d instanceof t&&(i=d)),g=a.wrapInner('<div class="dotdotdot" />').children(),g.contents().detach().end().append(i.clone(!0)).find("br").replaceWith("  <br />  ").end().css({height:"auto",width:"auto",border:"none",padding:0,margin:0});var c=!1,u=!1;return s.afterElement&&(c=s.afterElement.clone(!0),c.show(),s.afterElement.detach()),o(g,l)&&(u="children"==l.wrap?n(g,l,c):r(g,a,g,l,c)),g.replaceWith(g.contents()),g=null,t.isFunction(l.callback)&&l.callback.call(a[0],u,i),s.isTruncated=u,u}).bind("isTruncated.dot",function(t,e){return t.preventDefault(),t.stopPropagation(),"function"==typeof e&&e.call(a[0],s.isTruncated),s.isTruncated}).bind("originalContent.dot",function(t,e){return t.preventDefault(),t.stopPropagation(),"function"==typeof e&&e.call(a[0],i),i}).bind("destroy.dot",function(t){t.preventDefault(),t.stopPropagation(),a.unwatch().unbind_events().contents().detach().end().append(i).attr("style",a.data("dotdotdot-style")||"").removeClass("is-truncated").data("dotdotdot",!1)}),a},a.unbind_events=function(){return a.unbind(".dot"),a},a.watch=function(){if(a.unwatch(),"window"==l.watch){var e=t(window),n=e.width(),r=e.height();e.bind("resize.dot"+s.dotId,function(){n==e.width()&&r==e.height()&&l.windowResizeFix||(n=e.width(),r=e.height(),u&&clearInterval(u),u=setTimeout(function(){a.trigger("update.dot")},100))})}else c=d(a),u=setInterval(function(){if(a.is(":visible")){var t=d(a);c.width==t.width&&c.height==t.height||(a.trigger("update.dot"),c=t)}},500);return a},a.unwatch=function(){return t(window).unbind("resize.dot"+s.dotId),u&&clearInterval(u),a};var l=t.extend(!0,{},t.fn.dotdotdot.defaults,e),s={},c={},u=null,g=null;return l.lastCharacter.remove instanceof Array||(l.lastCharacter.remove=t.fn.dotdotdot.defaultArrays.lastCharacter.remove),l.lastCharacter.noEllipsis instanceof Array||(l.lastCharacter.noEllipsis=t.fn.dotdotdot.defaultArrays.lastCharacter.noEllipsis),s.afterElement=h(l.after,a),s.isTruncated=!1,s.dotId=p++,a.data("dotdotdot",!0).bind_events().trigger("update.dot"),l.watch&&a.watch(),a},t.fn.dotdotdot.defaults={ellipsis:"... ",wrap:"word",fallbackToLetter:!0,lastCharacter:{},tolerance:0,callback:null,after:null,height:null,watch:!1,windowResizeFix:!0,maxLength:null},t.fn.dotdotdot.defaultArrays={lastCharacter:{remove:[" ","　",",",";",".","!","?"],noEllipsis:[]}},t.fn.dotdotdot.debug=function(t){};var p=1,g=t.fn.html;t.fn.html=function(n){return n!=e&&!t.isFunction(n)&&this.data("dotdotdot")?this.trigger("update",[n]):g.apply(this,arguments)};var v=t.fn.text;t.fn.text=function(n){return n!=e&&!t.isFunction(n)&&this.data("dotdotdot")?(n=t("<div />").text(n).html(),this.trigger("update",[n])):v.apply(this,arguments)}}}(jQuery),jQuery(document).ready(function(t){t(".dot-ellipsis").each(function(){var e=t(this).hasClass("dot-resize-update"),n=t(this).hasClass("dot-timer-update"),r=0,a=t(this).attr("class").split(/\s+/);t.each(a,function(t,e){var n=e.match(/^dot-height-(\d+)$/);null!==n&&(r=Number(n[1]))});var o={};n&&(o.watch=!0),e&&(o.watch="window"),r>0&&(o.height=r),t(this).dotdotdot(o)})}),jQuery(window).on("load",function(){jQuery(".dot-ellipsis.dot-load-update").trigger("update.dot")});
