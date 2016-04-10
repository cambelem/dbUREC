<?php
	namespace dbUREC;


/**
 * @author Eric Cambel
 */

	// Ensure core directory is defined
	if (!defined('PHPWS_SOURCE_DIR')) {
	    include '../../config/core/404.html';
	    exit();
	}

    if (!\Current_User::allow('dbUREC', 'use_urec'))
    {
		\PHPWS_Core::reroute('index.php?module=users&action=user&command=logout');
    }
 
    $uc = new \dbUREC\UniversityRec();
    $uc->handleRequest();
    $content = $uc->getContent();

    /**
	 * Plug content into TopUI. Show notifications. Add Style.
	 */
	if (isset($content)) {
	    if ($content === false) {
	        \NQ::close();
	        \PHPWS_Core::reroute('index.php?module=dbUREC');
	    }
	}
	// Add top menu bar to theme
	\PHPWS_Core::initModClass('dbUREC', 'UI/TopUI.php');
	UI\TopUI::plug();
	
	// Get Notifications, add to layout
	//$nv = new UI\NotifyUI();
	//$notifications = $nv->display();
	//\Layout::add($notifications);
	
	// Add content to Layout
	\Layout::add($content);
?>
