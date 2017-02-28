(function( window, wp, settings ) {

	var youtubeHandler = wp.customHeader.handlers.youtube,
		showControls = youtubeHandler.showControls;

	function resizeYouTubeIframe() {
		var handler = this;

		window.requestAnimationFrame(function() {
			var containerHeight = handler.container.clientHeight,
				containerWidth = handler.container.clientWidth,
				containerRatio = containerWidth / containerHeight,
				iframe = handler.player.getIframe();;

			if ( settings.aspectRatio > containerRatio ) {
				iframe.style.height = containerHeight + 'px';
				iframe.style.width = containerHeight * 16 / 9 + 'px';
			} else {
				iframe.style.height = containerWidth * 9 / 16 + 'px';
				iframe.style.width = containerWidth + 'px';
			}
		});
	};

	/**
	 * Attach a resize handler to the iframe.
	 *
	 * The `showControls` method is called when the YouTube iframe is ready to
	 * be played.
	 */
	youtubeHandler.showControls = function() {
		var onResize = resizeYouTubeIframe.bind( this );

		onResize();
		window.addEventListener( 'resize', onResize );
		window.addEventListener( 'orientationchange', onResize );
		showControls.apply( this, arguments );
	};

	// Selective refresh support in the Customizer.
	if ( 'customize' in window.wp && 'selectiveRefresh' in window.wp.customize ) {
		window.wp.customize.selectiveRefresh.bind( 'render-partials-response', function( response ) {
			if ( 'custom_header_settings' in response ) {
				settings = response.custom_header_settings;
			}
		});
	}

})( window, wp, window._wpCustomHeaderSettings || {} );
