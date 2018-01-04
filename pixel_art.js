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

//Erase cell
	function eraseCell(el) {
		const elem = $(el.target);
		var newColor = '#fff';
		elem.css('background', newColor);
		event.preventDefault();
	}

// Clean old grid and create e new
	function makeGrid() {
			canvas.empty(); // clean old grid

			for (var i = 0; i < inputHeight; i++) {
				const row = $('<tr class="row"></tr>');
				for (var j = 0; j < inputWidth; j++) {
					const cell = $('<td class="cell" id="'+i+','+j+'"></td>');
					cell.on('mousedown', startPaint);
					cell.on('mouseenter', paint);
					cell.on('contextmenu',eraseCell);
					row.append(cell);
				}			
				canvas.append(row);	
			}
	}		

//When size is submitted by the user, call makeGrid()
	sizePicker.submit(function(event) {
			/* Act on the event */
			var sizePicked = sizePick();
			makeGrid();
			event.preventDefault();
		});

//Listen event to stop paint
	canvas.on('mouseup', stopPaint);

//Show an initial grid
	sizePick();
	makeGrid();
});
