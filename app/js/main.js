$( document ).ready(function() {

// vertical line css
var circleVertical = $('.circle-plus-vertical');
// horizontal line css
var circleHorizontal = $('.circle-plus-horizontal');
// circle css
var circle = $('.circle-plus');
// plus sign css array
var plusSign = $('.plus-sign');
//
var button = $('.circle');

var movingOut = true;

// vars
//var playing = false;
//var playing = "false";
var curStep = 1;
var steps = 13;
var nextNoteTime = .2;
var looping = false;
var row = 0;
//var column = 12;
var intervalID;

// samples data
var $data;

// buttons
var $button = $(".boardButtons");
var $looper = $(".loop-plays");
var $playButton = $(".playbutton");

// AudioContext
var context = new AudioContext();


// load the data
$.get( "../data/samples.json", function( data ) {
	$data = data;

});


var playFile = function (startTime, duration, soundFile) {
	  var context = new AudioContext(),
				request = new XMLHttpRequest();

			  request.open('GET', soundFile, true);
			  request.responseType = 'arraybuffer';

			  request.onload = function () {
			      var undecodedAudio = request.response;

			      context.decodeAudioData(undecodedAudio, function (buffer) {
			          var sourceBuffer = context.createBufferSource();

			          sourceBuffer.buffer = buffer;
			          sourceBuffer.connect(context.destination);
			          sourceBuffer.start(context.currentTime);
			          //sourceBuffer.stop(context.currentTime + duration);
			      });
			  };

			request.send();

}

// Play oscillators at certain frequency and for a certain time
var playNote = function (frequency, startTime, duration) {
    var osc1 = context.createOscillator(),
        osc2 = context.createOscillator(),
        volume = context.createGain();

    // Set oscillator wave type
    osc1.type = 'triangle';
    osc2.type = 'triangle';

    volume.gain.value = 0.1;

    // Set up node routing
    osc1.connect(volume);
    osc2.connect(volume);
    volume.connect(context.destination);

    // Detune oscillators for chorus effect
    osc1.frequency.value = frequency + 1;
    osc2.frequency.value = frequency - 2;


    // Fade out
    volume.gain.setValueAtTime(0.1, startTime + duration - 0.05);
    volume.gain.linearRampToValueAtTime(0, startTime + duration);


    // Start oscillators
    osc1.start(startTime);
    osc2.start(startTime);

    // Stop oscillators
    osc1.stop(startTime + duration);
    osc2.stop(startTime + duration);
};

var nowPlaying = function(dataField) {
	var playingButtons = $("div[data-btn*=" +dataField+ "]");
	//console.log(playingButtons);
	$(playingButtons).attr("src", $data[0].activeImg);
	setTimeout(function () {
		$(playingButtons).attr("src", $data[0].img);
	}, 1000);
	//console.log("We made it here");
};

$( '.dropdown' ).hover(
        function(){
            $(this).children('.sub-menu').slideDown(200);
        },
        function(){
            $(this).children('.sub-menu').slideUp(200);
        }
    );

var playSuccessSound = function () {

	if(curStep == steps) {
		curStep = 1;
	}
	else{
		curStep++;
	}

	// get all the button rows on the board
	var rows = $(".button-row");

	// then loop through them
	for (var i=1; i<=rows.length+1; i++) {
		// there is a jquery property called 'nth-child' that lets you select the nth-child of that
		// kind of class or html element... check it out on the line below:
		var btn = $(".button-row:nth-child("+i+") img.boardButtons:nth-child("+curStep+")");
		var playing = btn.attr("data-playing");
		if ( playing === "true" ) {
				//var sample = $data[ (curStep-1) + (i-1) * 12 ]; // multiply by the current row to get to the right place in the data array
				var note = (curStep-1) + (i-1) * 12;
				playNote(300 + note, context.currentTime, nextNoteTime);
			}
		}
	/*
	for(var i = 0; i < $data.length-column; i+=column) {
    // Play a 'B' now that lasts for 0.116 seconds
		// $data[row+i].img
		console.log(row+i);
		console.log($data[row+i].playing );
/*
		if($data[row+i].playing == true) {
			console.log(row+i);
			console.log(4+i*100);
    	playNote(4+i*100, context.currentTime, nextNoteTime, $data[row+i].path);
		}
*/
    // Play an 'E' just as the previous note finishes, that lasts for 0.232 seconds

};

var myFakeAjaxCall = function (callback) {
    setTimeout(function () {
        callback();
    }, 1000);
};

$playButton.click(function() {
	var element = $(this);
	$(this).attr("src","img/PauseButton.png");
	//$(this).attr("src","img/PlayButton.png");
	setTimeout(function() {
	  element.attr("src","img/PlayButton.png");
		console.log("what?");
	}, nextNoteTime * 1000);

});

$looper.click(function () {
	looping = !looping;

	if(looping) {
		intervalID = setInterval(playSuccessSound, nextNoteTime*1000);
		$(this).attr("src","img/PauseButton.png");

		//myFakeAjaxCall(function () {
      //  playSuccessSound();
        //$btn.button('complete');
    //});
	}
	else {
		clearInterval(intervalID);
		console.log("clear");
		$(this).attr("src","img/LoopPlayButton.png");
		curStep = 1;
	}


});

$button.click( function ( event ) {
	// the button click simply sets the state of the button as playing or not playing
	//var playing = $(this).attr("data-playing");
	//var pos = $(this).attr("data-btn");
	// console.log($(this));

	var playing = $(this).attr("data-playing");
	if ( playing === "false" ) {
		// mark the button as playing
		playing = "true";

		// show the button as 'active'
		$(this).attr("src","img/ButtonBoardActive.png");
	}
	else {
		// mark the button as not playing
		playing = "false";
		// show the button as inactive
		var pos = $(this).attr("data-btn");
		$(this).attr("src", $data[pos].img);
		}

		// now set the new playing state on the HTML element
		$(this).attr("data-playing", playing);


		//var playing = $(this).attr("data-playing");
		//setTimeout(nowPlaying($(this).attr("data-btn")), 1000);
	});


  button.on('click', function(){
    circleVertical.toggleClass('active');
    circleHorizontal.toggleClass('active');
    button.toggleClass('active');
    var moveVal;
    if(movingOut == true) {
       moveVal = 30;
    }
    else {
      moveVal = 0;
    }
    for(var i=0; i < plusSign.length; i++) {
      $(plusSign[i]).css({
        "transform": "rotateZ(" + i*moveVal + "deg) translateX(" + i*moveVal + "px)"
      });
    }
    movingOut = !movingOut;
    //plusSign.toggleClass('active');
  });


});




/*
console.log("document is ready!");
	// samples data
	var $data;

	// vars
	var subClassNum = 0;
	var keyLoaded = 0;
	var looping = false;
	var steps = 12;
	var curStep = 1;
	var timer;

	// buttons
	var $button = $(".boardButtons");
	var $looper = $(".loop-plays");

	// load the data
	$.get( "../data/samples.json", function( data ) {
		$data = data;

		// after the data is loaded, initialize the sequencer
		initBoard();
	});



	function initBoard() {
		console.log("initBoard!");
		for (var i = 0; i < $data.length; i++) {
			var sample = $data[i];
				samples.load(sample.key, sample.path, function(key) {
					// setting looping to false since the sequencer is already looping!
					// should probably be set to false in the JSON or just taken out entirely
					samples.setLooping(key, false);
					keyLoaded++;
					if ( keyLoaded == $data.length ) {
						// once all the keys have been loaded, *then* create the button events
						initButtons();
					}
				});
		}
	}


	function initButtons() {
		console.log("init buttons on board, samples data has loaded");

		// our sequencer buttons
		$button.click( function ( event ) {
			// the button click simply sets the state of the button as playing or not playing
			var playing = $(this).attr("data-playing");

			if ( playing === "false" ) {
				// mark the button as playing
				playing = "true";

				// show the button as 'active'
				$(this).attr("src","img/ButtonBoardActive.png");
			}
			else {
				// mark the button as not playing
				playing = "false";

				// show the button as inactive
				var pos = $(this).attr("data-btn");
				$(this).attr("src", $data[pos].img);
			}

			// now set the new playing state on the HTML element
			$(this).attr("data-playing", playing);

		});

		// our looping button
		$looper.click( function ( event ) {

			// toggle whether we are looping or not
			looping = !looping;

			// if we are looping...
			if ( looping ) {

				// start an interval that loops
				timer = setInterval(playThrough, 1000);
			}
			else {

				// otherwise, clear the interval and stop all sounds and reset to step 1
				clearInterval(timer);
				samples.stop();
				curStep = 1;
			}

		});
	}

	function playThrough() {

		if (curStep == steps) {
			curStep = 1;
		}
		else{
			curStep++;
		}

		// get all the button rows on the board
		var rows = $(".button-row");
		// then loop through them
		for (var i=0; i<rows.length; i++) {
			// there is a jquery property called 'nth-child' that lets you select the nth-child of that
			// kind of class or html element... check it out on the line below:
			var btn = $(".button-row:nth-child("+i+") img.boardButtons:nth-child("+curStep+")");
			var playing = btn.attr("data-playing");
			if ( playing === "true" ) {
				var sample = $data[ (curStep-1) * i ]; // multiply by the current row to get to the right place in the data array
				console.log("sample.key: " + sample.key);
				samples.start(sample.key);
			}
		}
	}
*/
