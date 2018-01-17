$(document).ready(function() {
	let inputColor,
		inputHeight,
		inputWidth,
		isPaint = false;
	const canvas = $("#pixelCanvas"),
		sizePicker = $("#sizePicker");

//Show an initial grid
	sizePick();
	makeGrid();

// Select color input
	function colorPick(){
		inputColor = $('#colorPicker').val();
	}
	
// Select size input
	function sizePick(){
		inputHeight = $('#input_height').val();
		inputWidth = $('#input_width').val();
	}

//Start paint
	function startPaint(ev) {
		ev.preventDefault(); //prevent drag
		const elem = $(ev.target);
		    switch (ev.which) {
		        case 1:
		        	isPaint = true;
		            colorPick();		            
		            break;
		        case 2:
		            isPaint = false;
		            break;
		        case 3:
		        	isPaint = true;
		            inputColor= '#fff';
		            break;
		        default:
		            isPaint = false;
			};		
		paint(ev);
	}

//Stop paint 
	function stopPaint(ev) {
		ev.preventDefault();
		isPaint = false;		
	}

//Paint cell
	function paint(ev) {
		if (!isPaint) {
			return;
		}else {
			const elem = $(ev.target);			
			elem.css('background', inputColor);
		}
	}

// Clean old grid and create e new
	function makeGrid() {
			canvas.empty(); // clean old grid

			for (let i = 0; i < inputHeight; i++) {
				const row = $('<tr class="row"></tr>');
				for (let j = 0; j < inputWidth; j++) {
					const cell = $('<td class="cell" id="'+i+','+j+'"></td>');
					cell.on('mousedown', startPaint);
					cell.on('mouseenter', paint);
					cell.on('contextmenu', function(ev) {
						ev.preventDefault();
					});
					row.append(cell);
				}			
				canvas.append(row);	
			}
	}		

//When size is submitted by the user, call makeGrid()
	sizePicker.submit(function(ev) {
			/* Act on the event */
			let sizePicked = sizePick();
			makeGrid();
			ev.preventDefault();
		});

//Listen event to stop paint
	canvas.on('mouseup', stopPaint);

});
