jQuery(document).ready(function($) {
	var height_slide=0;
	var positionlock=0;
	$("#btn_clickup").click(function(){
	      
      	height_slide = height_slide + 93;
      	if(height_slide >= 0){
          height_slide = 0;
      	}
      	$(".list_img_style > ul").attr("style","top:"+height_slide+"px");
	    
	});
  	$("#btn_clickdown").click(function(){
     	var num_li=$("li.item_img").length;
    	 num_height=num_li*93;
     	 height_slide = height_slide - 93;
     	 if(height_slide <= -(num_height)){
          height_slide = -(num_height);
      	}
     	$(".list_img_style > ul").attr("style","top:"+height_slide+"px");
  	});
  	$('.list_img_style > ul > li').click(function(){
    	if(!$(this).hasClass('active_img'))
      	{
        	$(".list_img_style > ul > li.active_img").removeClass("active_img");
        	$(this).addClass("active_img");        
     	}
    });
    $(".click_change_img").click(function(){
        var get_img = $(this).children(".img_each").attr("val");
	    $("#zoom_index").attr("src",get_img);
        return false;
    });
    $(".iconsprites_zoombig").click(function(){
      	$(".popup_general").fadeOut();
      	$(".popup_outside_zoom").fadeIn();
      	var src_img = $('#zoom_index').attr('src');
      	$("#zoom_index2").attr("src",src_img);
    	$('#zoom_index2').width($('#zoom_index').width()*1.5);
      	return false;
    });
    $(".iconsprites_zoomsmall").click(function(){
      	$(".popup_general").fadeOut();
      	$(".popup_outside_zoom").fadeIn();
      	$(".popup_outside_zoom").children(".popup_position_zoom").addClass('popup_position_small');
      	var src_img = $('#zoom_index').attr('src');
      	$("#zoom_index2").attr("src",src_img);
    	$('#zoom_index2').width($('#zoom_index').width()/1.5);
      	return false;
    });
    $(".popup_limit_stock").click(function(){
      	$(".popup_general").hide();
      	$(".popup_outside_stock").show();
      	return false;
    });
    $(".btncontact").click(function(){
        $(".popup_general").hide();
        $(".popup_outside_contact").show();
        return false;
    });
    $('.text_closepopup').click(function(){
      	$(".popup_general").hide();
      	$(".popup_outside_zoom").children(".popup_position_zoom").removeClass('popup_position_small');
      	return false;
    });
    $('.popup_hidden').click(function() {
       	$(".popup_general").hide();
       	$(".popup_outside_zoom").children(".popup_position_zoom").removeClass('popup_position_small');
      	return false;
    });
    $(".reply_comment").click(function(){
        $(this).parent().next().toggle(500);
    });
    $(".readmore").click(function(){
        $(".box_fulltem").css('max-height', '100%');
        $(this).remove();
    });
});