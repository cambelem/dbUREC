<?php
/**
 *
 * @author Eric Cambel>
 *
 */
function dbUREC_update(&$content, $currentVersion)
{
    switch ($currentVersion) {
		/*
        case version_compare($currentVersion, '0.0.1', '<') :
            $db = new PHPWS_DB();
            $result = $db->importFile(PHPWS_SOURCE_DIR . 'mod/intern/boost/updates/update_0_0_01.sql');
            if (PEAR::isError($result)) {
                return $result;
            }
		*/
    }
    return TRUE;
}