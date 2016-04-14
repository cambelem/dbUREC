
var ViewMain = React.createClass({
    render: function() {  
        return (
            <div className="row">
                <div className="col-md-12">
                    <Menu />
                </div>
            </div>
        );
    }
});

var Menu = React.createClass({
    render: function() {
        return (
     	   <div className="row">
		  <div className="col-lg-4">
    			<h2>Rockwall Check In</h2>
    			<p>Climber check in and check out for the rockwall.</p>
    			<p><a className="btn btn-primary btn-large" href="index.php?module=dbUREC&action=checkIn"><i className="fa fa-plus"></i> Check In / Check Out</a></p>
  		</div>
  		<div className="col-lg-4">
    			<h2>Search</h2>
    			<p>Find existing climbers or Add a climber if the student is new.</p>
    			<p><a className="btn btn-primary btn-large" href="index.php?module=dbUREC&action=search"><i className="fa fa-search"></i> Search Climber</a></p>
  		</div>
  		<div className="col-lg-4">
    			<h2>Rental Service</h2>
    			<p>Show and retrieve rental gear for climbers.</p>
    			<p><a className="btn btn-primary btn-large" href="index.php?module=dbUREC&action=rentalService"><i className="fa fa-edit"></i> Add &amp; Update Faculty</a></p>

  		</div>
	</div> 
        );
    }
});


React.render(
    <ViewMain />,
    document.getElementById('mainview')
);
