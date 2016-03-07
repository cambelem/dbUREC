<?php
	namespace usercontrol;


/**
 * @author Eric Cambel
 */

	// Ensure core directory is defined
	if (!defined('PHPWS_SOURCE_DIR')) {
	    include '../../config/core/404.html';
	    exit();
	}

    $uc = new \usercontrol\UserControl();
    $uc->handleRequest();
    $content = $uc->getContent();

    /**
	 * Plug content into TopUI. Show notifications. Add Style.
	 */
	if (isset($content)) {
	    if ($content === false) {
	        \NQ::close();
	        \PHPWS_Core::reroute('index.php?module=usercontrol');
	    }
	}
	// Add top menu bar to theme
	//\PHPWS_Core::initModClass('intern', 'UI/TopUI.php');
	//UI\TopUI::plug();
	
	// Get Notifications, add to layout
	//$nv = new UI\NotifyUI();
	//$notifications = $nv->display();
	//\Layout::add($notifications);
	
	// Add content to Layout
	\Layout::add($content);
?>
