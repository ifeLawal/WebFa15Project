$( document ).ready(function() {

	console.log("document is ready!");
	var $data;
	var subClassNum = 0;
	var columnSize = 4;

	//var playing = false;
	var key = 'what';
	var snd = '../snd/bass_01.ogg';
	var looping = true;
	// jQuery can help you select HTML elements on your page
	var $button = $(".boardButtons");

	$.get( "../data/samples.json", function( data ) {
 		//console.log(data);
		$data = data;
		initboard();
	});

	function initboard() {
		for (var i = 0; i < $data.length; i++) {
			var sample = $data[i];
				samples.load(sample.key, sample.path, function(key) {
					console.log(sample);
					samples.setLooping(key, sample.looping);
			});
		}
	}

	function play(pos) {

	//	console.log($data[pos].playing);

		//console.log(samples);
		if($data[pos].playing) {
			samples.stop($data[pos].key);
		}
		else {
			console.log("tester");
			samples.start($data[pos].key);
		}

	}

	function playThrough() {
		for(var i = 0; i < $data.length; i++) {
	}

	function playThrough() {
		if(subClassNum == 7) {
			subClassNum = 0;
		}
		else{
			subClassNum += 1;
		}
		var subClass = "b0" + subClassNum;
		console.log(subClass);
		for(var i = 0; i < $data.length; i++) {
			if($data[i].subclass == subClass && $data[i].playing){
				console.log("ester");
				samples.start($data[i].key);
				//console.log(samples.start($data[pos].key));
			}
			else{
				console.log("bester");
				samples.stop($data[i].key);
				//console.log(samples.start($data[pos].key));
			}
		}

		setTimeout(playThrough, 1000);
	}
/*
	function toggleImgSrc(pos) {
		if($data[pos].playing) {
		// and animate, fade out, fade in, add and remove classes
			$(this).attr("src","img/ButtonBoardActive.jpg");
			//snd/musicradar-minimal-house-samples
		}
		else {
			$(this).attr("src", $data[pos].img);
			console.log($data[pos].img);
		}
	}
*/
		//var myVar = setInterval(playThrough, 1000);


		$button.click(function ( event ) {
			//alert( "The link will no longer take you to jquery.com" );
			//event.preventDefault();
			var pos = 0;
			//console.log($data[pos].class);
			//console.log($data.length);
			//($(this).hasClass($data[pos].class)) if it has the class
			//($(this).hasClass($data[pos].subclass)) if it has the subclass
			while(!($(this).hasClass($data[pos].subclass)) || !($(this).hasClass($data[pos].class)) && pos < $data.length - 1) {
				pos++;
				//console.log($(this).hasClass($data[pos].subclass));
				//console.log($(this).hasClass($data[pos].class));
				//console.log('tester');
				//console.log($data[pos].subclass);
			}
			console.log(pos);
			//console.log($data[pos].class);
			//console.log($data[pos].subclass);

			if($data[pos].playing) {
			// and animate, fade out, fade in, add and remove classes
				$(this).attr("src","img/ButtonBoardActive.png");
				//snd/musicradar-minimal-house-samples
			}
			else {
				$(this).attr("src", $data[pos].img);
				console.log($data[pos].img);
			}

			$data[pos].playing = !$data[pos].playing;
			//console.log($data[pos].playing);
			//play(pos);
			playThrough();

		});


	// set up button events



	// jQuery makes animations easy


	// jQuery also has built in methods for making AJAX calls


});
