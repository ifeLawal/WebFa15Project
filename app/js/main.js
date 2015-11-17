$( document ).ready(function() {

	console.log("document is ready!");
	var $data;

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

		$button.click(function( event ) {
			//alert( "The link will no longer take you to jquery.com" );
			//event.preventDefault();
			var pos = 0;
			console.log($data[pos].class);
			console.log($data.length);
			while(!($(this).hasClass($data[pos].class)) && pos < $data.length - 1) {
				pos++;
				console.log($data[pos].class);
			}
			console.log($data[pos].class);

			var playing = $data[pos].playing;

			console.log($data[pos].playing);

			console.log(samples);
			if($data[pos].playing) {
				samples.stop($data[pos].key);
			}
			else {
				samples.start($data[pos].key);
			}

			$data[pos].playing = !$data[pos].playing;
			console.log($data[pos].playing);

			if($data[pos].playing) {
			// and animate, fade out, fade in, add and remove classes
				$(this).attr("src","img/ButtonBoardActive.jpg");
				//snd/musicradar-minimal-house-samples
			}
			else {
				$(this).attr("src", $data[pos].img);
				console.log($data[pos].img);
			}


		});
	}


	// set up button events



	// jQuery makes animations easy


	// jQuery also has built in methods for making AJAX calls


});
