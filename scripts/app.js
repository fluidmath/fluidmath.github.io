// Math convertions

;(function(){

	// 'Global' variables.
	var d = document, w = window,
		// --------------------- //
		m = d.get('div[data-math]'); // Fluid math container.

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
			not_base_inputs.addEvent('focus', clearAll );
			not_base_inputs.addEvent('keyup', changeVal );

			function clear() {
				this.value = '';
			}

			function clearAll() {

				var i = 0, l = not_base_inputs.length;

				for(;i<l;i++){
					not_base_inputs[i].value = '';
				}

				changeConvertionType( this.data( 'conv-type' ) );

			}

			function changeVal(){
				value = this.value;
			}

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

			function changeConvertionType( ct) { convertionType = ct; }

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

		function clear() { this.value = '';	}

		function changeVal(){ value = Number(this.value); }

		function changeBase(){ base = Number(this.value); }

		function doConvertion(e) {
			e.preventDefault();
			result.value = value.getContext( base ).toFixed(4).replace(/0{0,2}$/, "") + '%';

		}


	})();

})();