

$("ul").on("click","li",function(){
	$(this).toggleClass("ltg");
});

$("ul").on("click","span",function(event){
	$(this).parent().fadeOut(500,function(){
		$(this).remove();
	});
	event.stopPropagation();
});

$("input").fadeOut(1);

$("input").keypress(function(event){
		if(event.which === 13){
			var newboard = $(this).val();
			
			$("ul").append("<li><span class='mainspan'></i></span> " +newtodo+ "</li>");
			$(this).val("");
		}
});

$(".fa-plus").click(function(){
	$("input").fadeToggle(200);
})