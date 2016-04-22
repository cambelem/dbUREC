var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var CheckIn = React.createClass({
	getInitialState: function(){
        return ({cData: null});
    },
    componentWillMount: function() {
    	this.getCheckIn();
    }, 
    getCheckIn: function() {
        $.ajax({
            url: 'index.php?module=dbUREC&action=checkInRest&student='+banner_id,
            type: 'GET',
            dataType: 'json',
            success: function(data) {   
                this.setState({cData: data});
            	console.log(data);
	    }.bind(this),
            error: function(xhr, status, err) {
                alert("Couldn't grab check in data");
            }.bind(this)                
        });
    },
    addCheckIn: function() {
        $.ajax({
            url: 'index.php?module=dbUREC&action=checkInRest&student='+banner_id,
            type: 'POST',
            success: function() {   
                this.getCheckIn();
	    }.bind(this),
            error: function(xhr, status, err) {
                alert("Couldn't add Check in time");
            }.bind(this)                
        });
    },
    updateCheckIn: function(id) {
        $.ajax({
            url: 'index.php?module=dbUREC&action=checkInRest',
            type: 'PUT',
            processData: false,
            data: JSON.stringify(id),
            success: function() {   
                this.getCheckIn();
	    }.bind(this),
            error: function(xhr, status, err) {
                alert("Couldn't update Checkout time");
            }.bind(this)                
        });
    },
    render: function() {  
        return(
        	<div>
	        	<div className="row">
	        		<div className="col-md-6">
	        			<h2><i className="fa fa-plus" /> Check In & Out</h2>
	        		</div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-7">
                        <EquipmentTable cData = {this.state.cData} />
                    </div>

                    <div className="col-md-5">
                        <CheckinForm addCheckIn={this.addCheckIn} updateCheckIn={this.updateCheckIn} cData={this.state.cData}/>
                    </div>
                </div> 
        	</div>
        );
     }
  });


var CheckinForm = React.createClass({
    handleCheckIn: function(){
        this.props.addCheckIn();
    },
    handleCheckOut: function(){

        var id = this.props.cData.map(function(key) {
            if(key.time_out == null){ 
                return key.id
            } else {
                return -1;
            }
        });

        if (id == null){
            return;
        } else {
            this.props.updateCheckIn(id);
        }
    },
    render: function () {
        var checkInButton = checkInButton = <button type="button" className="btn btn-primary" onClick={this.handleCheckIn} >Check In</button>;
        var checkOutButton = '';

        if (this.props.cData != null)
        {
            checkOutButton = <button type="button" className="btn btn-primary" onClick={this.handleCheckOut} >Check Out</button>
        } else {
            checkOutButton = <button type="button" className="btn btn-primary" disabled>Check Out</button>
        }
        return(
            <div>
                <div className="col-md-6 col-md-offset-2">
                    {checkInButton}
                </div>
                <div className="col-md-4">
                    {checkOutButton}
                </div>
            </div>
        );       
    }
});

var EquipmentTable = React.createClass({
    render: function() {
        if (this.props.cData != null)
        {

            var cData = this.props.cData.map(function (check) {
            return (
                <EquipmentRow key={check.id}
                        timeIn={check.time_in}
                        timeOut={check.time_out}
                        id={check.id} />
                );
            });
        }
        else
        {
            var cData = <tr>
                            <td>
                                <p className="text-muted">
                                    No data on record.
                                </p>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>;
        }
        return (
            <div> 
                <table className="table table-condensed table-striped">
                    <thead>
                        <tr>
                            <th>Check In ID</th>
                            <th>Check In Time</th>
                            <th>Check Out Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cData}
                    </tbody>
                </table>
            </div>
        );
    }
});

var EquipmentRow = React.createClass({
    render: function() {
        var timeOut = '';

        (this.props.timeOut == null) ? timeOut == "Awaiting.." : timeOut = this.props.timeOut;

        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.timeIn}</td>
                <td>{timeOut}</td>
            </tr>
        );
    }
});


React.render(
    <CheckIn />,
    document.getElementById('checkIn')
    );

