
;(function(){

	//Global vars and functions.

	var d = document, w = window;

	function clear() { this.value = '';	}

	// General behaviour

	;(function(){

		var features = d.get('#features li'),
			first_view = d.get('section[data-view]:first-child');

		first_view.addClass('active');
		features[0].addClass('active');

		features.addEvent('click', changeView);

		function changeView(){

			var view = this.data('view'),
				active_section = d.get('section[data-view].active'),
				section_to_show = d.get('section[data-view='+view+']'),
				feature_to_show = d.get('li[data-view='+view+']');

			features.removeClass('active');
			active_section.removeClass('active');

			feature_to_show.addClass('active');
			section_to_show.addClass('active');

		}

	})();

	// Math convertions

	;(function(){

		// 'Global' variables.
		var m = d.get('section[data-view=math]'); // Fluid math container.

		// PX to Em.
		;(function(){

			var pxc = m.get('[data-px-em]'), // Px converter.inputs
				// --------------------- //
				inputs = pxc.get('input'),
				not_base_inputs = pxc.get('input.values'),
				// --------------------- //
				base_input = pxc.get('.base-value'); 
				base = base_input.value,
				value = base,
				convertionType = 'px-to-em',
				// --------------------- //
				submit = pxc.get('#convert-px'),
				result = pxc.get('.result');

				base_input.addEvent('focus', clear );
				base_input.addEvent('keyup', changeBase );
				not_base_inputs.addEvent('focus', clearAll );
				not_base_inputs.addEvent('keyup', changeVal );

				function clearAll() {

					var i = 0, l = not_base_inputs.length;

					for(;i<l;i++){
						not_base_inputs[i].value = '';
					}

					convertionType = this.data( 'conv-type' );

				}

				function changeVal(){ value = Number(this.value); }

				function changeBase(){ base = Number(this.value); }

				var convertion = {
					'px-to-em' : function(){
						if( Number(value) && Number(base)){
							result.value = ( (value/base).toFixed(4).replace(/0{0,2}$/, "") + 'em');
						}
					},
					'em-to-px' : function(){
						if( Number(value) && Number(base)){
							result.value = ( Math.floor(value*base) + 'px');
						}
					}
				}

				submit.addEventListener('click', function( e ){
					e.preventDefault();
					convertion[ convertionType ]();
				});


		})();

		// Px to Percent
		;(function(){

			var prc = m.get('[data-percent]'), // Percent converter.
				base_input = prc.get('.base-value'),
				base = base_input.value,
				value = base,
				inputs = prc.get('input.values'),
				submit = prc.get('#convert-percent'),
				result = prc.get('.result');

			inputs.addEvent('focus', clear);
			inputs.addEvent('keyup', changeVal);
			base_input.addEvent('keyup', changeBase);
			submit.addEvent('click', doConvertion);

			function changeVal(){ value = Number(this.value); }

			function changeBase(){ base = Number(this.value); }

			function doConvertion(e) {
				e.preventDefault();
				result.value = value.getContext( base ).toFixed(4).replace(/0{0,2}$/, "") + '%';

			}


		})();

	})();

	// Border-radius

	;(function(){

		var br = d.get('section[data-view=radius]'), //br = border radius.
			top_left = br.get('.top.left'),
			bottom_left = br.get('.bottom.left'),
			top_right = br.get('.top.right'),
			bottom_right = br.get('.bottom.right'),
			result = br.get('p[data-radius-result]'),
			prev = br.get('.border-preview');

			[
				top_left,
				bottom_left,
				top_right,
				bottom_right
			].addEvent('focus',clear);

			[
				top_left,
				bottom_left,
				top_right,
				bottom_right
			].addEvent('keyup',change_radius);

			function change_radius(e){
					
				var final_radius = top_left.value +'px '+ top_right.value +'px '+	bottom_right.value +'px '+ bottom_left.value+'px ';

				result.innerHTML = 'border-radius: '+final_radius;

				prev.style.borderRadius = final_radius;
			}

	})();

})();