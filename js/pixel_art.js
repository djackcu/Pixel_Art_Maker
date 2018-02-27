$(document).ready(function() {
	let inputColor,
		inputHeight,
		inputWidth,
		isPaint = false;
	const canvas = $("#pixelCanvas"),
		sizePicker = $("#sizePicker"),
		grid = $('#grid');

//Show an initial grid
	sizePick();  								//pick size to make grid
	makeGrid();

// Pick color input
	function colorPick(){
		inputColor = $('#colorPicker').val();
	}
	
// Pick size input
	function sizePick(){
		inputHeight = $('#input_height').val();
		inputWidth = $('#input_width').val();
	}

//Start paint
	function startPaint(ev) {
		ev.preventDefault(); 					//prevent drag
			//Read mouse buttons
		    switch (ev.which) {
		        case 1: 						//pick left click and set color
		        	isPaint = true;
		            colorPick();		            
		            break;
		        case 2: 						//don't paint with central click
		            isPaint = false;
		            break;
		        case 3: 						//pick right click and set white color
		        	isPaint = true;
		            inputColor= '#fff';
		            break;
		        default: 						//don't paint with another button
		            isPaint = false;
			};		
		paint(ev);								//start paint
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
			canvas.empty(); 					// clean old grid
			//Creating a grid with nested loop
			for (let i = 0; i < inputHeight; i++) {
				const row = $('<tr class="row"></tr>');							//create a row element
				for (let j = 0; j < inputWidth; j++) {
					const cell = $('<td class="cell" id="'+i+','+j+'"></td>');	//create a cell element and events
					cell.on('mousedown', startPaint);
					cell.on('mouseenter', paint);
					cell.on('contextmenu', function(ev) {
						ev.preventDefault();
					});
					row.append(cell);											//insert cell element in row element
				}			
				canvas.append(row);												//insert row element with j cell elements in table
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

//View grid
	grid.on('change', function(ev) {
		let gridBox = ev.target;
		if (gridBox.checked) {
			$('.cell').addClass('cellGrid');
		} else {
			$('.cell').removeClass('cellGrid');
		}
	});

});
