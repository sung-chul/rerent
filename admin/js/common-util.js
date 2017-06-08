comutil = function() {};
comutil.prototype.dummy = function() {};

comutil.isNull = function(obj) {
	if(typeof(obj) == 'undefined') {
		return true;
	} else if(obj === null) {
		return true;
	} else if(typeof(obj)==="string" && obj.length===0) {
		return true;
	} else if(Array.isArray(obj) && obj.length===0) {
		return true;
	} else if(typeof(obj)==="number") {
		return false;
	} else {
		return false;
	}
};

comutil.goUrl = function(responseData) {
	document.location.href = window.location.origin+responseData.TARGET_URL;
};

comutil.pcPreview = function(responseData) {
	window.open(responseData.TARGET_URL, null, "height=900,width=1200,status=yes,toolbar=no,menubar=no,location=no,scrollbars=yes");
}

comutil.mobilePreview = function(responseData) {
	window.open(responseData.TARGET_URL, null, "height=900,width=1200,status=yes,toolbar=no,menubar=no,location=no,scrollbars=yes");
}

comutil.changePage = function(url) {
	document.location.href = window.location.origin+$(document).data("CONTEXTPATH")+url;
};


comutil.getExcel = function(url, data) {
	var currentUrl = window.location.origin;

	currentUrl += url+"?"+$.param(data);

	document.location.href = currentUrl;
};

comutil.getStrbyColumn = function(tableId, key) {
	var columnData = "";
	tableId = comutil.convertJQId(tableId);
	key = comutil.convertJQId(key);
	$(tableId+" tbody td"+key).each(function(index) {
		columnData += $(this).text()+" ";
	});

	return columnData.trim();
};

comutil.getStrInObjArr = function(objArr, key) {
	var result = "";
	$.each(objArr, function(idx) {
		result += objArr[idx][key] + " "
	});

	return result.trim();
};

comutil.getObjbyKeyValue = function(objArr, key, value) {
	var result;

	$.each(objArr, function(idx) {
		if(objArr[idx][key] == value) {
			result = objArr[idx];
		}
	});

	return result;
}

comutil.getObjInChkedList = function (tableId, objArr) {
	var returnArr = new Array();
	tableId = comutil.convertJQId(tableId);

	$(tableId+" tbody tr").each(function() {
		if( $(this).find("input:checkbox").is(":checked") ) {
			var idx = $(this).index();
			returnArr.push(objArr[idx]);
		}
	});
	return returnArr;
};

comutil.sendAjax = function(url, param, successCB) {
	var data = $(document).data().MENU;
	var chkVali = true;
	var chkUrl = url.split("/").slice(-1)[0];

	if(!comutil.isNull(data)) {
		if(comutil.isNull(param.MENU_CODE)) {
			var updateChk = "Y";
			var readChk = "Y";
			var deleteChk = "Y";
			$.each($(document).data().MENU, function(key, obj) {
			    $(document).data().MENU[key].U=="N"? updateChk="N":""
			    $(document).data().MENU[key].R=="N"? readChk="N":""
			    $(document).data().MENU[key].D=="N"? deleteChk="N":""
			});

			if(chkUrl.indexOf("update") >= 0 || chkUrl.indexOf("Update") >= 0) {
				if(updateChk != "Y") {
					alert("등록/수정 권한이 없습니다.");
					chkVali = false;
				}
			} else if(chkUrl.indexOf("detail") >= 0 || chkUrl.indexOf("Detail") >= 0) {
				if(readChk != "Y") {
					alert("조회 권한이 없습니다.");
					chkVali = false;
				}
			} else if(chkUrl.indexOf("Delete") >= 0 || chkUrl.indexOf("delete") >= 0) {
				if(deleteChk != "Y") {
					alert("삭제 권한이 없습니다.");
					chkVali = false;
				}
			}
		} else {
			if(chkUrl.indexOf("update") >= 0 || chkUrl.indexOf("Update") >= 0) {
				if(data[param.MENU_CODE].U != "Y") {
					alert("등록/수정 권한이 없습니다.");
					chkVali = false;
				}
			} else if(chkUrl.indexOf("detail") >= 0 || chkUrl.indexOf("Detail") >= 0) {
				if(data[param.MENU_CODE].R != "Y") {
					alert("조회 권한이 없습니다.");
					chkVali = false;
				}
			} else if(chkUrl.indexOf("delete") >= 0 || chkUrl.indexOf("Delete") >= 0) {
				if(data[param.MENU_CODE].D != "Y") {
					alert("삭제 권한이 없습니다.");
					chkVali = false;
				}
			}
		}
	} else {
		chkVali = true;
	}

	if(chkVali) {
		$.ajax({
			url : url
			, method : "post"
			, data :  param
			, error : function (request,status,error){
				console.log("error : " + error);
			}
			, success : function(responseData){
				console.log("success : " + responseData);
				successCB(responseData);
			}
		});
	}
};

comutil.convertJQId = function(id) {
	if(id.length>0 && id[0]!="#"){
		id = "#" + id;
	}
	return id;
};

comutil.convertJQClass = function(classId) {
	if(classId.length>0 && classId[0]!="."){
		classId = "." + classId;
	}
	return classId;
};
comutil.nowPageNum = function(setAreaByClassID) {
	setAreaByClassID = comutil.convertJQClass(setAreaByClassID);
	return $(setAreaByClassID).find(".current").text();
};


comutil.setPageNum = function(setAreaByClassID, nowPage, totLIstCnt, pageCnt, onClickEvt) {
	var startPageNum = 0;
	var targetId = comutil.convertJQClass(setAreaByClassID);

	$(targetId).empty();

	if(parseInt(totLIstCnt) != 0) {
		pageCnt = parseInt(pageCnt);
		var totPage = Math.ceil(parseInt(totLIstCnt) / parseInt(pageCnt) );

		nowPage = parseInt(nowPage);
		totPage = parseInt(totPage);
		startPageNum = Math.floor((nowPage-1)/10)*10 + 1;

		for(var idx=startPageNum; idx<startPageNum+10; idx++) {
			var setStyle = "";
			if(idx == nowPage) {
				setStyle = "current";
			}

			$('<a/>', {
				id 		: "pageNum_"+idx,
				href 	: "#none",
				text 	: idx,
				"class" 	: setStyle
			}).appendTo(targetId);

			if(idx == totPage) {
				break;
			}
		}

		$('<a/>', {
			id: "pageNum_prev",
			href: "#none",
			text: "<",
			"class" : "prev"
		}).prependTo(targetId);

		$('<a/>', {
			id: "pageNum_prev",
			href: "#none",
			text: "<",
			"class" : "prev10"
		}).prependTo(targetId);

		$('<a/>', {
			id: "pageNum_next",
			href: "#none",
			text: ">",
			"class" : "next"
		}).appendTo(targetId);

		$('<a/>', {
			id: "pageNum_next",
			href: "#none",
			text: ">",
			"class" : "next10"
		}).appendTo(targetId);

		$(targetId).find("a").each(function(index) {
			$(this).on("click", function() {
				var currNum = parseInt($(".paging .current").text());
				if($(this).hasClass("current")) {
					return;
				} else if($(this).hasClass("prev")) {
					if(currNum > pageCnt) {
						onClickEvt(currNum-pageCnt);
					}
					return;
				} else if($(this).hasClass("next")) {
					if(currNum >= totPage-pageCnt) {
						onClickEvt(totPage);
					} else if(currNum < totPage) {
						onClickEvt(currNum+pageCnt);
					}
					return;
				} else if($(this).hasClass("prev10")) {
					onClickEvt("1");
					return;
				} else if($(this).hasClass("next10")) {
					onClickEvt(totPage);
					return;
				} else {
					onClickEvt($(this).text());
				}
			});
		});
	}
};

//admin < code 쪽 멀티 페이징 때문에 추가 : 이벤트 되는 함수에 파라미터가 하나 더 들어가기때문에 uppperCode 추가
comutil.setPageNum2 = function(setAreaByClassID, nowPage, totLIstCnt, pageCnt, onClickEvt, upperCode) {
	
	var startPageNum = 0;
	var targetId = comutil.convertJQClass(setAreaByClassID);
	

	$(targetId).empty();

	pageCnt = parseInt(pageCnt);
	var totPage = parseInt(totLIstCnt) / parseInt(pageCnt) + 1

	nowPage = parseInt(nowPage);
	totPage = parseInt(totPage);
	startPageNum = Math.floor((nowPage-1)/10)*10 + 1;

	for(var idx=startPageNum; idx<startPageNum+10; idx++) {
		var setStyle = "";
		if(idx == nowPage) {
			setStyle = "current";
		}

		$('<a/>', {
			id 		: "pageNum2_"+idx,
			href 	: "#none",
			text 	: idx,
			"class" 	: setStyle
		}).appendTo(targetId);

		if(idx == totPage) {
			break;
		}
	}

	$('<a/>', {
		id: "pageNum2_prev",
		href: "#none",
		text: "<",
		"class" : "prev"
	}).prependTo(targetId);

	$('<a/>', {
		id: "pageNum2_prev",
		href: "#none",
		text: "<",
		"class" : "prev10"
	}).prependTo(targetId);

	$('<a/>', {
		id: "pageNum2_next",
		href: "#none",
		text: ">",
		"class" : "next"
	}).appendTo(targetId);

	$('<a/>', {
		id: "pageNum2_next",
		href: "#none",
		text: ">",
		"class" : "next10"
	}).appendTo(targetId);

	$(targetId).find("a").each(function(index) {
		$(this).on("click", function() {
			var currNum = parseInt($(".paging2 .current").text());
			if($(this).hasClass("current")) {
				return;
			} else if($(this).hasClass("prev")) {
				if(currNum > pageCnt) {
					onClickEvt(currNum-pageCnt, upperCode);
				}
				return;
			} else if($(this).hasClass("next")) {
				if(currNum >= totPage-pageCnt, upperCode) {
					onClickEvt(totPage, upperCode);
				} else if(currNum < totPage) {
					onClickEvt(currNum+pageCnt, upperCode);
				}
				return;
			} else if($(this).hasClass("prev10")) {
				onClickEvt("1", upperCode);
				return;
			} else if($(this).hasClass("next10")) {
				onClickEvt(totPage, upperCode);
				return;
			} else {
				onClickEvt($(this).text(), upperCode);
			}
		});
	});
};

comutil.chkRadioBtn = function(wrapId, selectVal) {
	wrapId = comutil.convertJQId(wrapId);

	$(wrapId + " input[type='radio']").next().removeClass("on");

	$(wrapId + " input[type='radio']").each(function(index) {
		if($(this).val() == selectVal) {
			$(this)[0].checked = true;
			$(this).next().addClass("on");
		}
	});
};

comutil.getChkRadioBtn = function(wrapId) {
	wrapId = comutil.convertJQId(wrapId);
	return $(wrapId + " input[type='radio']:checked").val();;
};

comutil.chkChkboxBtn = function(chkBoxId, chkYN) {
	chkBoxId = comutil.convertJQId(chkBoxId);

	$(chkBoxId).attr("checked", chkYN);

	if(chkYN) {
		$(chkBoxId).next().addClass("on");
	} else {
		$(chkBoxId).next().removeClass("on");
	}
};

comutil.getChkCount = function(tableId) {
	var chkCount = 0;
	tableId = comutil.convertJQId(tableId);
	return $(tableId+" tbody input[type='checkbox']:checked").length;
};

comutil.setTblChkEvent = function(tableId, getCountId) {
	tableId = comutil.convertJQId(tableId);
	if(!comutil.isNull(getCountId)) {
		getCountId = comutil.convertJQId(getCountId);
	}

	$(tableId+" thead input[type='checkbox']").on("change", function() {
		var thead = this;

		$(tableId+" tbody input[type='checkbox']").each(function(idx) {
			this.checked = thead.checked;

			if(!comutil.isNull(getCountId)) {
				$(getCountId).text(comutil.getChkCount(tableId));
			}
		});
	});

	if(!comutil.isNull(getCountId)) {
		$(tableId+" tbody input[type='checkbox']").on("change", function() {
			$(getCountId).text(comutil.getChkCount(tableId));
		});
	}
};

comutil.setListData = function(tableId, listData, chkYN) {
	var innerHTML = "";
	tableId = comutil.convertJQId(tableId);

	$(tableId+" tbody tr").remove();

	if(listData.length != 0) {
		for( rowIdx in listData ) {
			$("<tr/>").appendTo(tableId+" tbody");

			$(tableId).find("thead tr th").each(function(idx) {
				$('<td/>', {
					id 		: this.id
				}).html(this.id=="ALLCHK"? this.innerHTML : listData[rowIdx][this.id] ).appendTo(tableId+" tbody tr:last");
			});
			$("tbody #TITLE").css("text-decoration", "underline");
			$("tbody #TITLE").css("cursor", "Pointer");
		}
	} else {
		$("<tr/>").appendTo(tableId+" tbody");
		$('<td colspan="'+$(tableId+" col").length+'"/>').html("검색 결과가 없습니다." ).appendTo(tableId+" tbody tr:last");
	}
};

comutil.setData = function(wrapId, objData) {
	wrapId = comutil.convertJQId(wrapId);

	for ( property in objData ) {
		$(wrapId+" #"+property).text(objData[property]);
	}
};

comutil.addListData = function(tableId, listData, chkYN) {
	var innerHTML = "";
	tableId = comutil.convertJQId(tableId);

	for( rowIdx in listData ) {
		$("<tr/>").appendTo(tableId+" tbody");

		$(tableId).find("thead tr th").each(function(idx) {
			$('<td/>', {
				id 		: this.id
			}).html(this.id=="ALLCHK"? this.innerHTML : listData[rowIdx][this.id] ).appendTo(tableId+" tbody tr:last");
		});
	}

	// $.each(listData, function(idx) {
	// 	for ( property in this ) {
	// 		// console.log( property ); // Outputs: foo, fiz or fiz, foo

	// 	}
	// });
};

comutil.setSelBoxData = function(selBoxID, valNM, textNM, listData) {
	selBoxID = comutil.convertJQId(selBoxID);

	if(listData.length==0 || listData=="") {
		console.log("listData is empty");
		return;
	}

	$.each(listData, function(idx) {
		$(selBoxID).append("<option value="+this[valNM]+">"+this[textNM]+"</option>");
	});
};

comutil.setSelBoxShow = function(selBoxID, value) {
	selBoxID = comutil.convertJQId(selBoxID);
	$(selBoxID).val(value);
	$(selBoxID).next().find(".customSelectInner").text( $(selBoxID + " option:selected").text() );
};

comutil.getSelBoxVal = function(selBoxID) {
	selBoxID = comutil.convertJQId(selBoxID);
	return $(selBoxID + " option:selected").val();
};

comutil.getSelBoxName = function(selBoxID) {
	selBoxID = comutil.convertJQId(selBoxID);
	return $(selBoxID + " option:selected").text();
};

comutil.paddingLeftChar = function(value, len, c) {
    if(!c) {
        c = "0";
    }

    value = value + "";
    if(value.length > len) {
        value = value.substring(value.length - 2);
    }

    for(var i=0; i<(len-value.length); i++) {
        value = c + value;
    }

    return value;
};

///////////////////////////////////////////// Tag Util Start ///////////////////////////////////

comutil.setInputTag = function (inputID, readOnlyFlag, delYN, placeholder) {
	inputID = comutil.convertJQId(inputID);
	readOnlyFlag = !readOnlyFlag;

	$(inputID).tagsInput({
		'interactive': readOnlyFlag,
		'defaultText': placeholder,
		'onAddTag' : function(value) {
			if(!delYN) {
				$(inputID+"_tagsinput").find("a").remove();
				$(inputID+"_tagsinput .tag").each(function(index) {
					$(this).find("span").text($.trim($(this).find("span").text()));
				});
			}
		},
		'delimiter': [' '],   // Or a string with a single delimiter. Ex: ';'
		'removeWithBackspace' : true,
		'minChars' : 0,
		'maxChars' : 0, // if not provided there is no limit
		'placeholderColor' : '#666666'
	});
};

comutil.addTag = function(tagID, tagData, delYN) {
	tagID = comutil.convertJQId(tagID);
	$(tagID).addTag(tagData);
};

comutil.imgValidation = function(flieSelector, loadedCB, chkSizeObj) {
	$("body").on("change", flieSelector, function() {
		var reader = new FileReader();
		var fileId = comutil.convertJQId($(this).attr("id"));
		var callbackFn = loadedCB;

		if(window.FileReader){   
			var filename = $(this)[0].files[0].name;
		} else {
			var filename = $(this).val().split('/').pop().split('\\').pop(); 
		}  
		$(this).siblings('.upload-name').val(filename);

		reader.onloadend = function (e) {
			var maxSize = 1024*1024*5;
			var fileSize = e.total;
			var fileNm = e.target.fileName;
			var ext =  fileNm.split('.').pop().toLowerCase();

			if(fileSize > maxSize){
				alert("이미지 용량은 5MG이하로 등록하여주세요.");
				return;
			}

			if($.inArray(ext, ['gif','png','jpg','GIF','PNG','JPG']) == -1) {
				alert('gif,png,jpg 파일만 업로드 할수 있습니다.')		
				return;
			}

			var image = new Image();
			image.src = e.target.result;
			$(image).attr("id",fileNm);

			image.onload = function (e) {
				var height = this.height;
				var width = this.width;
				var chkFlag = false;

				$.each(chkSizeObj ,function(index) {
					if(this.width!=width&&this.height!=height) {
						chkFlag = true;
					}
				});

				if(chkFlag){
					alert("사이즈 가이드에 맞는 이미지를 첨부해주시기 바랍니다.");
					$(fileId).siblings('.upload-name').val("");
					$(fileId).val("");
					return;
				} else {
					$(fileId).siblings('.upload-name').val($(this).attr("id"));
					loadedCB(this);
				}
			};
		}

		reader.fileName = filename;
		reader.readAsDataURL($(this)[0].files[0]);
	});
};
///////////////////////////////////////////// Tag Util End ///////////////////////////////////

comutil.setMouseOverPopup = function(selector) {
	$("body").on("mouseover", selector, function () {
		var fileTag = $(this).parent().find("input[type='file']")[0];
		var imageSrc = $(this).parent().find("img").attr("src");
		var offset = $(this).offset();
		$("<div></div>", {"id":"hoverpopup", "class":"hover-img-wrap", "style":"display:block;position:absolute"}).append("<img style='width:250px;' />").appendTo("body");

		if(!comutil.isNull(imageSrc)) {
			// $("body").append("<img src='about:blank' name='hoverpopup' id='hoverpopup'>");
			// $("#hoverpopup").css("top", event.clientY + 15);
			// $("#hoverpopup").css("left", event.clientX + 30);

			var isIE = (navigator.appName=="Microsoft Internet Explorer");
			var path = imageSrc;
			var ext = path.substring(path.lastIndexOf('.') + 1).toLowerCase();

			if(ext == "gif" || ext == "jpeg" || ext == "jpg" ||  ext == "png" ) {
				$("#hoverpopup img").attr('src', path);
			}

			$("#hoverpopup").css("top", offset.top - $("#hoverpopup img").height() - 17);
			$("#hoverpopup").css("left", offset.left);
		} else if(!comutil.isNull(fileTag.value)) {
			// $("body").append("<img src='about:blank' name='hoverpopup' id='hoverpopup'>");
			// $("#hoverpopup").css("top", event.clientY + 15);
			// $("#hoverpopup").css("left", event.clientX + 30);
			// $("#hoverpopup").css("position", "absolute");

			var isIE = (navigator.appName=="Microsoft Internet Explorer");
			var path = fileTag.value;
			var ext = path.substring(path.lastIndexOf('.') + 1).toLowerCase();

			if(ext == "gif" || ext == "jpeg" || ext == "jpg" ||  ext == "png" ) {
				if(isIE) {
					$("#hoverpopup").attr('src', path);
				} else {
					if (fileTag.files[0]) {
						var reader = new FileReader();
						reader.onload = function (e) {
							$("#hoverpopup img").attr('src', e.target.result);

							$("#hoverpopup").css("top", offset.top - $("#hoverpopup img").height() - 17);
							$("#hoverpopup").css("left", offset.left);
						}
						reader.readAsDataURL(fileTag.files[0]);
					}
				}
			}
		}

	});

	$("body").on("mouseleave", selector, function () {
		$("#hoverpopup").remove();
	});
};
///////////////////////////////////////////// Date Util Start ///////////////////////////////////
// <input type="text" id="FromDatePickerId">
// <input type="text" id="ToDatePickerId">
// datePick.setSinglePicker("FromDatePickerId")
// datePick.setDualPicker("FromDatePickerId", "ToDatePickerId")
//////////////////////////////////////////////////////////////////////////////////////////////////
datePick = function() {};
datePick.prototype.dummy = function() {};

datePick.setSinglePicker = function(id) {
	id = comutil.convertJQId(id);
	datePick.setDefPicker(id);
	datePick.setDate(id, new Date());

	$(id).blur(function() {
		dateCheck($(this).val(), $(this).attr("id"));
	});
};

datePick.setDualPicker = function(fromId, toId) {
	fromId = comutil.convertJQId(fromId);
	toId = comutil.convertJQId(toId);

	datePick.setDefPicker(fromId);
	datePick.setDefPicker(toId);

	var fdate = new Date();
	fdate.setMonth(fdate.getMonth() - 1);

	datePick.setDate(fromId, fdate);
	datePick.setDate(toId, new Date());

	$( fromId ).datepicker("option", "maxDate", $( toId ).val());
	$( fromId ).datepicker("option", "onClose", function ( selectedDate ) {
		$( toId ).datepicker("option", "minDate", selectedDate);
	});

	$( toId ).datepicker("option", "minDate", $( fromId ).val());
	$( toId ).datepicker("option", "onClose", function ( selectedDate ) {
		$( fromId ).datepicker("option", "maxDate", selectedDate);
	});

	$(fromId).blur(function() {
		dateCheck($(this).val(), $(this).attr("id"));
	});

	$(toId).blur(function() {
		dateCheck($(this).val(), $(this).attr("id"));
	});
};

datePick.setDefPicker = function(id) {
	id = comutil.convertJQId(id);

	$( id ).datepicker({
			dateFormat: "yy.mm.dd",
			changeMonth: true,
			changeYear: true,
			showOn: "button",
			buttonImage: "../../include_files/images/cal.png",
			buttonImageOnly: true,
			// buttonText: "선택",
			dayNames: ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'],
			dayNamesMin: ['월', '화', '수', '목', '금', '토', '일'], 
			monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
			monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
		}
	);
};

datePick.getDate = function(id) {
	id = comutil.convertJQId(id);
	return $( id ).datepicker({dateFormat: "yy/mm/dd"}).val();
};

datePick.setDate = function(id, date) {
	id = comutil.convertJQId(id);
	return $( id ).datepicker("setDate", date);
};

datePick.disablePicker = function(id) {
	id = comutil.convertJQId(id);

	$( id ).datepicker("destroy");
};

datePick.setDualToday = function(fromId, toId) {
	fromId = comutil.convertJQId(fromId);
	toId = comutil.convertJQId(toId);

	datePick.setDate(fromId, new Date());
	datePick.setDate(toId, new Date());
};

datePick.setDualWeekAgo = function(fromId, toId, week) {
	fromId = comutil.convertJQId(fromId);
	toId = comutil.convertJQId(toId);

	var weekAgo = parseInt(week) * 7;
	var fdate = new Date();
		fdate.setDate(fdate.getDate() - weekAgo);

	datePick.setDate(fromId, fdate);
	datePick.setDate(toId, new Date());
};

datePick.setDualMonthAgo = function(fromId, toId, month) {
	fromId = comutil.convertJQId(fromId);
	toId = comutil.convertJQId(toId);

	var monthAgo = parseInt(month);
	var fdate = new Date();
		fdate.setMonth(fdate.getMonth() - monthAgo);

	datePick.setDate(fromId, fdate);
	datePick.setDate(toId, new Date());
};

datePick.setDualWeekAfter = function(fromId, toId, week) {
	fromId = comutil.convertJQId(fromId);
	toId = comutil.convertJQId(toId);

	var weekAfter = parseInt(week) * 7;
	var edate = new Date();
		edate.setDate(edate.getDate() + weekAfter);

	datePick.setDate(fromId, new Date());
	datePick.setDate(toId, edate);
};

datePick.setDualMonthAfter = function(fromId, toId, month) {
	fromId = comutil.convertJQId(fromId);
	toId = comutil.convertJQId(toId);

	var monthAfter = parseInt(month);
	var edate = new Date();
		edate.setMonth(edate.getMonth() + monthAfter);

	datePick.setDate(fromId, new Date());
	datePick.setDate(toId, edate);
};

///////////////////////////////////////////// Date Util End ///////////////////////////////////

///////////////DATECHECK Strart////////////////




//날짜체크 시작 함수
function dateCheck(date, id){
	if(date.length == 10){
		if(isValidDate(date) != true){
			alert("날짜형식이 올바르지 않습니다.\n\n마침표(.)를 포함하여 입력해 주십시오.\n");
			$("#"+id).focus();
			return;
		}
	}else if(date.length > 0 && date.length <10){
		alert("날짜형식이 올바르지 않습니다.\n\n마침표(.)를 포함하여 입력해 주십시오.\n");
		$("#"+id).focus();
		return;
	}
}
/*
 * 날짜형식 2016/01/01
 */
function isDateFormat(date) {
	var pattern = /\d{4}\.\d{2}\.\d{2}/;
	return date.match(pattern);
}

/*
 * 윤년여부 검사
 */
function isLeaf(year) {
    var leaf = false;

    if(year % 4 == 0) {
        leaf = true;

        if(year % 100 == 0) {
            leaf = false;
        }

        if(year % 400 == 0) {
            leaf = true;
        }
    }

    return leaf;
}

/*
 * 날짜가 유효한지 검사
 */
function isValidDate(date) {
    // 포맷에 안맞으면 false리턴
    if(!isDateFormat(date)) {
        return false;
    }

    var month_day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var dateToken = date.split('.');
    var year = Number(dateToken[0]);
    var month = Number(dateToken[1]);
    var day = Number(dateToken[2]);

    // 날짜가 0이면 false
    if(day == 0) {
        return false;
    }

    var isValid = false;

    // 윤년일때
    if(isLeaf(year)) {
        if(month == 2) {
            if(day <= month_day[month-1] + 1) {
                isValid = true;
            }
        } else {
            if(day <= month_day[month-1]) {
                isValid = true;
            }
        }
    } else {
        if(day <= month_day[month-1]) {
            isValid = true;
        }
    }

    return isValid;
}

///////////////DATECHECK End////////////////

// 오늘 날짜 구하기 형식 2016/06/03
function getToday(){

	 var today = new Date(); // 날자 변수 선언
     var dateNow = fnLPAD(String(today.getDate()),"0",2); //일자를 구함
     var monthNow = fnLPAD(String((today.getMonth()+1)),"0",2); // 월(month)을 구함
     var yearNow = String(today.getFullYear()); //년(year)을 구함

     return yearNow +"."+ monthNow +"."+ dateNow;
}

/*
왼쪽에 원하는 텍스트 추가
오라클 LPAD 함수와 같음

val         원래 값
set         왼쪽에 추가하려는 값
cnt         set 갯수
*/
function fnLPAD(val, set, cnt) {
	if (!set || !cnt || val.length >= cnt) {
		return val;
	}

	var max = (cnt - val.length) / set.length;

	for (var i = 0; i < max; i++) {
		val = set + val;
	}

	return val;
}

/*이미지 check
 * 이미지 사이즈, 확장자
 */
function fnImgCheck(id, wid, heg){
	
	var result = true;
	//파일 사이즈 체크
	var maxSize = 1024*1024*5;
	var fileSize = $("#"+id)[0].files[0].size;
	if(fileSize > maxSize){
		$("#"+id).siblings('.upload-name').val("");
    	$("#"+id).val("");
		alert("이미지 용량은 5MG이하로 등록하여주세요.");
		return;
		
	}else{
        $("#"+id).siblings('.upload-name').val($("#"+id)[0].files[0].name);
    }
	
	//미미지 확장자 체크
	var ext =  $("#"+id).val().split('.').pop().toLowerCase();
	if($.inArray(ext, ['gif','png','jpg']) == -1) {
		alert('gif,png,jpg 파일만 업로드 할수 있습니다.');
		$("#"+id).siblings('.upload-name').val("");
    	$("#"+id).val("");
		return;
	}else{
        $("#"+id).siblings('.upload-name').val($("#"+id)[0].files[0].name);
    }
	
	//해상도 체크(load 시간 때문에 같이 쓸 수 없음)
	//width, heghit 설정값이 있을 경우만 체크
	console.log(wid);
	console.log(heg);
	if(wid != null && heg != null){
		fnImgCheck2(id, wid, heg);	
	}
	
}

/*이미지 check
 * 이미지 해상도 체크
 */
function fnImgCheck2(id, wid, heg){
	
	//이미지 width/height 체크
	var reader = new FileReader();
    reader.readAsDataURL($("#"+id)[0].files[0]);
    reader.onload = function (e) {

	    var image = new Image();
	    image.src = e.target.result;
	    	               
	    image.onload = function () {
	    	var height = this.height;
	        var width = this.width;
	        
	        if(width != wid && height != heg){	        	
	        	alert("이미지 해상도가 "+wid+"x"+heg+"인 이미지를 등록하여 주세요.");
	        	$("#"+id).siblings('.upload-name').val("");
	        	$("#"+id).val("");
	        	return;
	        }else{
	            $("#"+id).siblings('.upload-name').val($("#"+id)[0].files[0].name);
	        }
	            
	     };

    }
	
}

