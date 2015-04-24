<?php
if( isset( $_GET['url'] ) ) {

	$url = $_GET['url'];
	$meta_tags = get_meta_tags( $url );
	
	include_once("simple_html_dom.php");
	
	// Get Page Content
	$page_content = file_get_html( $url ); 
	
	// Get Page Title 
    foreach( $page_content->find('title') as $element ) {
        $page_title = $element->plaintext;
    }
	
	// Get Page Description/Text
	if ( ( ! $page_body = $meta_tags['description'] ) && ( ! $page_body = $meta_tags['og:description'] ) ) {
	
		foreach( $page_content->find('body') as $element ) {
			$page_body = trim( $element->plaintext );
			$pos = strpos( $page_body, ' ', 200 );
			$page_body = substr( $page_body, 0, $pos );
		}
	
	}
        
    // Get Page Image
	if ( ! $image_url = $meta_tags['og:image'] ) {
	
		foreach( $page_content->find('img') as $element ) {
			if( !preg_match( '/blank.(.*)/i', $element->src ) && filter_var( $element->src, FILTER_VALIDATE_URL ) ) {
				$image_url = $element->src;
				break;
			}
		}
		
	}
        
	// Encode to JSON
    $output = array( 'title'=>$page_title, 'image'=>$image_url, 'content'=> $page_body );
    echo json_encode( $output );

}