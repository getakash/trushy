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
			var newtodo = $(this).val();
			$("ul").append("<li><span><i class='fas fa-trash-alt'></i></span> " +newtodo+ "</li>");
			$(this).val("");
		}
});

$(".fa-plus").click(function(){
	$("input").fadeToggle(200);
})