$(document).ready(function() {
	var inputColor,
		inputHeight,
		inputWidth,
		pixelCanvas = $('#pixel_canvas'),
		sizePicker = $('#sizePicker');

// Select color input
	function colorPick(){
		inputColor = $('#colorPicker').val();
		return inputColor;
	}
	

// Select size input
	function sizePick(){
		inputHeight = $('#input_height').val();
		inputWidth = $('#input_width').val();
		return {'heigth':inputHeight , 'width' : inputWidth};
	}

// Clean old grid and create e new
	function makeGrid(h,w) {
			pixelCanvas.empty(); // clean old grid

			for (var i = 0; i < h; i++) {
				var row = $('<tr></tr>');
				pixelCanvas.append(row);
			}

			$('tr').each(function(index, el) {
				for (var i = 0; i < w; i++) {
					$(el).append('<td></td>');
				}				
			});
	}		

//When size is submitted by the user, call makeGrid()
	sizePicker.submit(function(event) {
			/* Act on the event */
			var sizePicked = sizePick();
			makeGrid(sizePicked.heigth, sizePicked.width);
			event.preventDefault();
		});

//When a cell is clicked will painted with color selected
	pixelCanvas.on('click', 'td', function(event) {
		$(this).css('background', colorPick());
	});
});
