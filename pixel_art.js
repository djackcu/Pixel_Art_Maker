$(document).ready(function() {
	var inputColor,
		inputHeight,
		inputWidth,
		canvas = $('#pixelCanvas'),
		sizePicker = $('#sizePicker'),
		isPaint = false;


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

//Start paint
	function startPaint(el) {
		isPaint = true;
		event.preventDefault(); //Prevent drag event
		paint(el);
	}

//Stop paint 
	function stopPaint(el) {
		isPaint = false;
	}

//Paint cell
	function paint(el) {
		if (!isPaint) {
			return;
		}else {
			const elem = $(el.target);
			var newColor = colorPick();
			elem.css('background', newColor);
		}
	}

// Clean old grid and create e new
	function makeGrid(h,w) {
			canvas.empty(); // clean old grid

			for (var i = 0; i < h; i++) {
				const row = $('<tr class="row"></tr>');
				for (var j = 0; j < w; j++) {
					const cell = $('<td class="cell" id="'+i+','+j+'"></td>');
					cell.on('mousedown', startPaint);
					cell.on('mouseenter', paint);
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

//Listen event to stop paint
	canvas.on('mouseup', stopPaint);

	makeGrid(30, 30);
});
