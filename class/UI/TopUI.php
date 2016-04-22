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

        if (isset($_REQUEST['student'])){
            $tpl['ADD_LINK']     = \PHPWS_Text::moduleLink('<i class="fa fa-plus"></i> Check In', 'dbUREC', array('action' => 'showCheckIn','student'=>$_REQUEST['student']));
            $tpl['EDIT_CLIMBER_LINK']  = \PHPWS_Text::moduleLink('<i class="fa fa-edit"></i> Edit Climber', 'dbUREC', array('action' => 'showClimber','student'=>$_REQUEST['student']));
    	    $tpl['RENTAL_LINK'] = \PHPWS_Text::moduleLink('<i class="fa fa-edit"></i> Rental Service', 'dbUREC', array('action' => 'showRentalService','student'=>$_REQUEST['student']));
        }
        $auth = \Current_User::getAuthorization();

        $tpl['USER_FULL_NAME'] = \Current_User::getDisplayName();
        $tpl['LOGOUT_URI'] = $auth->logout_link;


        $adminOptions = array();

        // Edit list of majors
        //if(\Current_User::allow('intern', 'edit_major')){
        $adminOptions['EDIT_MAJORS_LINK'] = \PHPWS_Text::secureLink('Edit Undergraduate Majors','intern',array('action' => 'showEditMajors'));
        //}

        $tpl['EDIT_FACULTY_LINK'] =   \PHPWS_Text::moduleLink('Edit Faculty','dbUREC', array('action' => 'edit_faculty'));
    	$tpl['EDIT_EQUIPMENT_LINK'] =	\PHPWS_Text::moduleLink('Edit Equipment','dbUREC', array('action' => 'showEditEquipment'));
    	$tpl['EDIT_PROGRAM_LINK'] = 	\PHPWS_Text::moduleLink('Edit Programs', 'dbUREC', array('action' => 'showEditProgram'));
    	$tpl['EDIT_FACILITY_LINK'] = 	\PHPWS_Text::moduleLink('Edit Facilities', 'dbUREC', array('action' => 'showEditFacility'));
    	$tpl['EDIT_CERT_LINK'] = 	\PHPWS_Text::moduleLink('Edit Certifications', 'dbUREC', array('action' => 'showEditCert'));
            

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

