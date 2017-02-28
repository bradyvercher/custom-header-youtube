<?php
/**
 * Plugin Name: YouTube Video Headers Extended
 * Description: Extend video header support by resizing YouTube videos to remove the letterbox effect.
 * Version: 1.0.0
 * Author: Brady Vercher
 * Author URI: https://www.cedaro.com/
 * License: GPL-2.0+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function chyoutube_header_video_settings( $settings ) {
	$settings['aspectRatio'] = 16 / 9;

	if ( 'video/x-youtube' === $settings['mimeType'] ) {
		wp_enqueue_script(
			'wp-custom-header-youtube',
			plugin_dir_url( __FILE__ ) . 'custom-header-youtube.js',
			array( 'wp-custom-header' )
		);
	}

	return $settings;
}
add_filter( 'header_video_settings', 'chyoutube_header_video_settings' );
