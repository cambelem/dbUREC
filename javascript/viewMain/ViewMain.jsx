
var ViewMain = React.createClass({
    getInitialState: function() {
        return {student: null};
    },
    componentWillMount: function() {
        this.getClimbers();
    }, 
    getClimbers: function() {
        $.ajax({
            url: 'index.php?module=dbUREC&action=showClimberRest&student='+banner_id,
            type: 'GET',
            dataType: 'json',
            success: function(data) {   
                if(data == null){
                    window.location = 'index.php?module=dbUREC&action=newUser&student=' + banner_id;
                }
                this.setState({student: data});
        }.bind(this),
            error: function(xhr, status, err) {
                alert("Couldn't grab climber data");
            }.bind(this)                
        });
    },
    render: function() {  
        return (
            <div className="row">
                <div className="col-md-12">
                    {(this.state.student != null) ? <Menu /> :  <p className="text-muted" style={{position:"absolute", top:"50%", left:"50%"}}>
                                                                    <i className="fa fa-spinner fa-2x fa-spin"></i> Loading Climber...
                                                                </p>}
                </div>
            </div>
        );
    }
});

var Menu = React.createClass({
    render: function() {
	var checkIn = "index.php?module=dbUREC&action=showCheckIn&student="+banner_id;
	var editClimber = "index.php?module=dbUREC&action=showClimber&student="+banner_id;
	var rental = "index.php?module=dbUREC&action=showRentalService&student="+banner_id;
        return (
     	   <div className="row">
		  <div className="col-lg-4">
    			<h2>Rockwall Check In</h2>
    			<p>Climber check in and check out for the rockwall.</p>
    			<p><a className="btn btn-primary btn-large" href={checkIn}><i className="fa fa-plus"></i> Check In / Check Out</a></p>
  		</div>
  		<div className="col-lg-4">
    			<h2>Edit Climber </h2>
    			<p>Edit or Remove Climber</p>
    			<p><a className="btn btn-primary btn-large" href={editClimber}><i className="fa fa-edit"></i> Edit Climber</a></p>
  		</div>
  		<div className="col-lg-4">
    			<h2>Rental Service</h2>
    			<p>Show and retrieve rental gear for the climber.</p>
    			<p><a className="btn btn-primary btn-large" href={rental}><i className="fa fa-edit"></i> Add &amp; Update Rental</a></p>

  		</div>
	</div> 
        );
    }
});


React.render(
    <ViewMain />,
    document.getElementById('mainview')
);
