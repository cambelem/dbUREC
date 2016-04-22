var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
//
var RentalService = React.createClass({
	getInitialState: function(){
        return ({submitted: false, 
                 errorMessages: null, 
                 uData: null, 
                 availGear: null,
                 showHarness: false,
                 showShoes: false,
                 showRope: false});
    },
    componentWillMount: function() {
    	this.getUserGear();
    }, 
    getUserGear: function() {
        $.ajax({
            url: 'index.php?module=dbUREC&action=rentalServiceRest&student='+banner_id,
            type: 'GET',
            dataType: 'json',
            success: function(data) { 
                // if (data == null)
                //     data = 0; 
                this.setState({uData: data});
            	console.log(data);
	    }.bind(this),
            error: function(xhr, status, err) {
                alert("Couldn't grab user gear data");
            }.bind(this)                
        });
    },
    getAvailableGear: function(gear) {
        var type = '';
        console.log(this.state.showHarness);
        if(gear === 'harness' || this.state.showHarness){
            type = 'harness';
        } else if (gear === 'shoes' || this.state.showShoes){
            type = 'shoes';
        } else if (gear === 'rope' || this.state.showRope){
            type = 'rope';
        }

        $.ajax({
            url: 'index.php?module=dbUREC&action=rentalServiceRest&student='+banner_id+'&type='+type,
            type: 'GET',
            dataType: 'json',
            success: function(data) {   
                this.setState({availGear: data});
                console.log(data);
        }.bind(this),
            error: function(xhr, status, err) {
                alert("Couldn't grab gear data");
            }.bind(this)                
        });
    },
    addRental: function(gear) {
        $.ajax({
            url: 'index.php?module=dbUREC&action=rentalServiceRest&student='+banner_id+'&gear='+gear,
            type: 'PUT',
            success: function() {   
                this.getUserGear();	
                this.getAvailableGear();
	    }.bind(this),
            error: function(xhr, status, err) {
                alert("Couldn't add gear data");
            }.bind(this)                
        });
    },
    returnRental: function(eid) {
    	$.ajax({
            url: 'index.php?module=dbUREC&action=rentalServiceRest&eid='+eid,
            type: 'DELETE',
            success: function() {  
            	this.getUserGear();	 
                this.getAvailableGear();       
            }.bind(this),
            error: function(xhr, status, err) {
                alert("Sorry, looks like something went wrong. We couldn't return the equipment.");
            }.bind(this)                
        });
    },	
    setHarness: function() {
        this.setState({showHarness: true, showShoes: false, showRope: false}, function(){
            this.getAvailableGear('harness');
        }.bind(this));
    },
    setShoes: function() {
        this.setState({showHarness: false, showShoes: true, showRope: false}, function(){
            this.getAvailableGear('shoes');
        }.bind(this));

    },
    setRope: function() {
        this.setState({showHarness: false, showShoes: false, showRope: true}, function(){
            this.getAvailableGear('rope');
        }.bind(this));
    },
    render: function() {  
        //console.log(this.state.availGear);
        return(
        	<div>
	        	<div className="row">
	        		<div className="col-md-6">
	        			<h2><i className="fa fa-plus" /> Rental Services</h2>
	        		</div>
	        	</div>

                <div className="row">
                    <div className="col-md-6">
                        <GearTable uData = {this.state.uData} returnRental = {this.returnRental}/>
                    </div>

                    <div className="col-md-4 col-md-offset-2">
                        <ButtonGroup setHarness = {this.setHarness}
                                     setShoes   = {this.setShoes} 
                                     setRope    = {this.setRope} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 col-md-offset-7">
                        {(this.state.availGear != null) ? <GearDrop gear = {this.state.availGear} addRental={this.addRental}/> : null} 
                    </div>
                </div>
        	</div>
        );
     }
  });

//  
// {this.state.showShoes   && (this.state.availGear != null) ? <GearDrop gear = {this.state.availGear} /> : null}
// {this.state.showRope    && (this.state.availGear != null) ? <GearDrop gear = {this.state.availGear} /> : null}
var GearTable = React.createClass({
    render: function() {
        var returnRental = this.props.returnRental;
     	if (this.props.uData != null)
		{
			//var deleteFacility = this.props.deleteFacility;
			var UData = this.props.uData.map(function (renter) {
			return (
				<GearRow key={renter.id}
						name={renter.name}
						eType={renter.e_type}
					  	id={renter.id}
                        renterId={renter.renterid}
                        returnRental = {returnRental} />
				);
			});
		}
		else
		{
			var UData = <tr>
							<td>
								<p className="text-muted">
									<i className="fa fa-spinner fa-2x fa-spin"></i> Loading User Gear...
								</p>
							</td>
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
							<th>Equipment id</th>
							<th>Equipment Name</th>
							<th>Equipment Type</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{UData}
					</tbody>
				</table>
        	</div>
        );
    }
});

var GearRow = React.createClass({
    handleReturn: function() {
    	this.props.returnRental(this.props.id);
    },
    render: function() {

    	var id = '';
        var name = '';
    	var type = '';
        var rentalReturn = '';

        if (this.props.id != null){
            id = this.props.id;
            name = this.props.name;
            type = this.props.eType;
            rentalReturn = <button className='btn btn-xs' onClick={this.handleReturn}>Return</button>;
        }

        return (
        	<tr>
				<td>{id}</td>
				<td>{name}</td>
                <td>{type}</td>
                <td>{rentalReturn}</td>
			</tr>
        );
    }
});

var ButtonGroup = React.createClass({
    handleHarness: function() {
        this.props.setHarness();
    },
    handleShoes: function() {
        this.props.setShoes();
    },
    handleRope: function() {
        this.props.setRope();
    },
    render: function() {
        return (
            <div className="btn-group" data-toggle="buttons" >
                <label className="btn btn-default" onClick={this.handleHarness} >
                    <input type="radio" name="types" /> Harness
                </label>      

                <label className="btn btn-default" onClick={this.handleShoes} >
                    <input type="radio" name="types" /> Shoes
                </label>    

                <label className="btn btn-default" onClick={this.handleRope} >
                    <input type="radio" name="types" /> Rope
                </label>  
            </div>
        );
    }
});

var GearDrop = React.createClass({
    handleRental: function() {
        var val = React.findDOMNode(this.refs.gear).value;
        // val = val.slice(0, -5).trim();
        this.props.addRental(val);
    },
    render: function() {
        var gearData = this.props.gear;

        // send gearname to server to choose first available

        

                // {Object.keys(gearData).map(function(key) {
                //         return <option key={key} value={gearData[key].name}>{gearData[key]}</option>;
                //     })}
        return (
            <div>
                <div className="col-md-2">
                    <button type="button" id="faculty-change" className="btn btn-default" onClick={this.handleRental} >
                      <i className="fa fa-chevron-left"></i> Rent
                    </button>
                </div>

                <div className="col-md-6">
                <select className='form-control' ref='gear'>
                   {gearData.map(function (gear) {
                    return (
                        <DropRow key={gear.name}
                                name={gear.name}
                                count={gear.count} />
                        );
                    })}
                </select>

                </div>
            </div>
        );
    },
});


var DropRow = React.createClass({
    render: function() {
        var val = this.props.name + ": (" + this.props.count + ")";
        return (
            <option value={this.props.name}>{val}</option>
        );
    },
});

React.render(
    <RentalService />,
    document.getElementById('rentalService')
    );

