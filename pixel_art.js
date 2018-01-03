$(document).ready(function() {
	var inputColor,
		inputHeight,
		inputWidth,
		canvas = $('#pixel_canvas'),
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
			canvas.empty(); // clean old grid

			for (var i = 0; i < h; i++) {
				const row = $('<tr></tr>');
				for (var j = 0; j < w; j++) {
					const cell = $('<td id="'+i+','+j+'"></td>');
					row.append(cell);
				}			
				canvas.append(row);	
			}
	}		

//When size is submitted by the user, call makeGrid()
	sizePicker.submit(function(event) {
			/* Act on the event */
			var sizePicked = sizePick();
			makeGrid(sizePicked.heigth, sizePicked.width);
			event.preventDefault();
		});

//When a cell is clicked will painted with color selected
	canvas.on('click', 'td', function(event) {
		$(this).css('background', colorPick());
	});
});
