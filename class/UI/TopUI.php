<?php

namespace dbUREC\UI;

/**
 * TopUI
 *
 * @author Robert Bost <bostrt at tux dot appstate dot edu>
 */
class TopUI implements UI
{
    public function display(){
    }

    public static function plug()
    {
	$tpl = array();
        $tpl['HOME_LINK']    = \PHPWS_Text::moduleLink('Menu', 'dbUREC');
        $tpl['ADD_LINK']     = \PHPWS_Text::moduleLink('Add New User', 'dbUREC', array('action' => 'newUser'));
        $tpl['SEARCH_LINK']  = \PHPWS_Text::moduleLink('Search', 'dbUREC', array('action' => 'search'));
        $auth = \Current_User::getAuthorization();

        $tpl['USER_FULL_NAME'] = \Current_User::getDisplayName();
        $tpl['LOGOUT_URI'] = $auth->logout_link;


        $adminOptions = array();

        // Edit list of majors
        if(\Current_User::allow('intern', 'edit_major')){
            $adminOptions['EDIT_MAJORS_LINK'] = \PHPWS_Text::secureLink('Edit Undergraduate Majors','intern',array('action' => 'showEditMajors'));
        }

        

        if(\Current_User::isDeity()){
            $adminOptions['CONTROL_PANEL']         = \PHPWS_Text::secureLink('Control Panel','controlpanel');
            $adminOptions['EDIT_ADMINS_LINK']      = \PHPWS_Text::secureLink('Edit Administrators','intern',array('action' => 'showEditAdmins'));
        }

        // If any admin options were added, them show the dropdown and merge those
        // links into the main set of template tags
        if(sizeof($adminOptions) > 0){
            $tpl['ADMIN_OPTIONS'] = ''; // dummy var to show dropdown menu in template
            $tpl = array_merge($tpl, $adminOptions);
        }

        \Layout::plug(\PHPWS_Template::process($tpl, 'dbUREC', 'top.tpl'), 'NAV_LINKS');
    }
}

?>

