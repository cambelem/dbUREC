  <!-- Brand and toggle get grouped for better mobile display -->
  <div class="navbar-header">
    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#dburecNavbar" >
      <span class="sr-only">Toggle navigation</span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>
    <a class="navbar-brand" href="index.php?module=dbUREC">Univerisity Recreation</a>
  </div>
<!-- Collect the nav links, forms, and other content for toggling -->
  <div class="collapse navbar-collapse" id="dburecNavbar">
    <ul class="nav navbar-nav">
      <li>{ADD_LINK}</li>
      <li>{EDIT_CLIMBER_LINK}</li>
      <li>{RENTAL_LINK}</li>
    </ul>


    <ul class="nav navbar-nav navbar-right">
      
      {ADMIN_OPTIONS}
      <li class="dropdown">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-cog"></i> Settings &nbsp;<b class="caret"></b></a>
        <ul class="dropdown-menu">
       
    <li>{EDIT_FACULTY_LINK}</li>   
	  <li>{EDIT_EQUIPMENT_LINK}</li>
	  <li>{EDIT_PROGRAM_LINK}</li>
	  <li>{EDIT_FACILITY_LINK}</li>
	  <li>{EDIT_CERT_LINK}</li>

          <!-- BEGIN ctrl_panel -->
          <li>{CONTROL_PANEL}</li>
          <!-- END ctrl_panel -->
        </ul>
      </li>
      
      <li>
        <a href="#">{USER_FULL_NAME}</a>
      </li>
      <li>
        <a href="{LOGOUT_URI}"><i class="fa fa-sign-out"></i> Sign out</a>
      </li>
      
    </ul>

  </div><!-- /.navbar-collapse -->



