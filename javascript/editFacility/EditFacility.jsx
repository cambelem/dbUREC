var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var EditFacility = React.createClass({
	getInitialState: function(){
        return ({submitted: false, errorMessages: null, fData: null});
    },
    componentWillMount: function() {
    	this.getFacility();
    }, 
    getFacility: function() {
        $.ajax({
            url: 'index.php?module=dbUREC&action=editFacilityRest',
            type: 'GET',
            dataType: 'json',
            success: function(data) {   
                this.setState({fData: data});
            	console.log(data);
	    }.bind(this),
            error: function(xhr, status, err) {
                alert("Couldn't grab facility data");
            }.bind(this)                
        });
    },
    addFacility: function(facilityData) {
        $.ajax({
            url: 'index.php?module=dbUREC&action=editFacilityRest',
            type: 'POST',
            processData: false,
            data: JSON.stringify(facilityData),
            success: function() {   
                this.getFacility();	
                this.setState({submitted: false});
	    }.bind(this),
            error: function(xhr, status, err) {
                alert("Couldn't add facility data");
            }.bind(this)                
        });
    },
    deleteFacility: function(fid) {
    	$.ajax({
            url: 'index.php?module=dbUREC&action=editFacilityRest&fid='+fid,
            type: 'DELETE',
            success: function() {  
            	this.getFacility();	        
            }.bind(this),
            error: function(xhr, status, err) {
                alert("Sorry, looks like something went wrong. We couldn't delete the facility.");
            }.bind(this)                
        });
    },	
    updateFacility: function(facilityData) {
        $.ajax({
            url: 'index.php?module=dbUREC&action=editFacilityRest',
            type: 'PUT',
            processData: false,
            data: JSON.stringify(facilityData),
            success: function() {   
                this.getFacility();	
	    }.bind(this),
            error: function(xhr, status, err) {
                alert("Couldn't update facility data");
            }.bind(this)                
        });
    },
    // Top-level onSubmit handler for the creation form
    handleSubmit: function(e) {
        // Stop the browser from immediately sending the post
        e.preventDefault();

        // Set submitted=true on the state to disable submit button and prevent double-submission
        var thisComponent = this; // Save a reference to 'this' for later use
        var formElement = e.target; // Save a reference to the form DOM nodes that were submitted

        this.setState({submitted: true, errorMessages: null}, function(){
            // After disabling submit buttons, use callback to validate the data
            if(!this.validate(formElement, thisComponent)){
                // If the data doesn't validate, wait a second before re-enabling the submit button
                // This makes sure the user sees the "Creating..." spinner, instead of it re-rendering
                // so fast that they don't think it did anything
                setTimeout(function(){
                    thisComponent.setState({submitted: false});
                }, 1000);

                return;
            }

            // If we get here, then validation was successful
            //formElement.submit();
            this.addFacility({facilityName: formElement.elements.facilityName.value,
                            facilityType: formElement.elements.facilityType.value,
                            facilityID: formElement.elements.facilityID.value
                        });
          
        });
    },
    validate: function(form, thisComponent) {

        // Assume everything is valid, change this if we detect otherwise
        var valid = true;
        var errors = [];

        // Check the name
        if(form.elements.facilityName.value === ''){
            thisComponent.refs.nameBlock.setError(true);
            errors.push('Facility Name');
            valid = false;
        }else {
            thisComponent.refs.nameBlock.setError(false);
        }
 
        // Check the type
        if(form.elements.facilityType.value === ''){
            thisComponent.refs.typeBlock.setError(true);
            errors.push('Facility Type');
            valid = false;
        }else {
            thisComponent.refs.typeBlock.setError(false);
        }

        // Check the id
        if(form.elements.facilityID.value === ''){
            thisComponent.refs.idBlock.setError(true);
            errors.push('ID');
            valid = false;
        }else {
            thisComponent.refs.idBlock.setError(false);
        }
      
        if(errors.length != 0){
            thisComponent.setErrorMessages(errors);
        }

        return valid;
    },
    setErrorMessages: function(messages) {
        this.setState({errorMessages: messages});
    },
    render: function() {  
		var errors;
        if(this.state.errorMessages == null){
            errors = '';
        } else {
            errors = <ErrorMessagesBlock key="errorSet" errors = {this.state.errorMessages} />
        }

        return(
        	<div>
	        	<div className="row">
	        		<div className="col-md-6">
	        			<h2><i className="fa fa-plus" />Add a Facility</h2>
	        		</div>
	        	</div>
	        	<br />
	        	<div className="row">
	        		<div className="col-md-7">
	            		<FacilityTable fData = {this.state.fData} deleteFacility={this.deleteFacility} updateFacility={this.updateFacility} />
	            	</div>

	        		<div className="col-md-5">
	        			<ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTime={500}>
		        			{errors}
		        	    </ReactCSSTransitionGroup>

	        			<form role="form" id="newClimberForm" className="form-protected form-horizontal" method="post" onSubmit={this.handleSubmit}>
		            		<input type="hidden" name="module" value="dbUREC"/>
							<input type="hidden" name="action" value="editFacilityRest"/>

		            		<InputBox ref="nameBlock" name="Facility Name" id="fname" divName="facilityName" />			
		                	<InputBox ref="typeBlock" name="Facility Type" id="type" divName="facilityType" />                   
		                	<InputBox ref="idBlock" name="Facility ID" id="id" divName="facilityID" />

		                	<Submit submitted={this.state.submitted}/>
	                	</form>
	        		</div>
	        	</div>
        	</div>
        );
     }
  });

var FacilityTable = React.createClass({
    render: function() {
    	if (this.props.fData != null)
		{
			var deleteFacility = this.props.deleteFacility;
			var updateFacility = this.props.updateFacility;
			var FData = this.props.fData.map(function (facility) {
			return (
				<FacilityRow key={facility.id}
						name={facility.name}
						facilityType={facility.f_type}
					  	id={facility.id} 
					  	deleteFacility={deleteFacility}
					  	updateFacility={updateFacility} />
				);
			});
		}
		else
		{
			var FData = <tr>
							<td>
								<p className="text-muted">
									<i className="fa fa-spinner fa-2x fa-spin"></i> Loading Facility Data...
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
							<th>Facility Name</th>
							<th>Facility Type</th>
							<th>Facility ID</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{FData}
					</tbody>
				</table>
        	</div>
        );
    }
});

var FacilityRow = React.createClass({
	getInitialState: function() {
		return {editMode: false};
	},
	handleEdit: function() {
		this.setState({editMode: true});
	},
    handleDelete: function() {
    	this.props.deleteFacility(this.props.id);
    },
    handleSave: function() {
		this.setState({editMode: false});

		this.props.updateFacility({facilityName: React.findDOMNode(this.refs.saveName).value,
                            facilityType: React.findDOMNode(this.refs.saveType).value,
                            facilityID: this.props.id});
	},
    render: function() {
    	var name = '';
    	var type = '';
    	var editToggle = '';

    	if (this.state.editMode){
    		name = <input type="text" className="form-control" defaultValue={this.props.name} ref='saveName' />
    		type = <input type="text" className="form-control" defaultValue={this.props.facilityType} ref='saveType' />
    		editToggle = <button className="btn btn-default btn-xs" type="submit" onClick={this.handleSave}> Save </button>;
    	} else {
    		name = this.props.name;
    		type = this.props.facilityType;
    		editToggle = <a style={{cursor:'pointer'}} onClick={this.handleEdit}> <i className="fa fa-pencil-square-o" /> </a>;
    	}

        return (
        	<tr>
				<td>{name}</td>
				<td>{type}</td>
				<td>{this.props.id}</td>
				<td>{editToggle}</td>
				<td> <a style={{cursor:'pointer'}} onClick={this.handleDelete}> <i className="fa fa-trash-o" /> </a> </td>
			</tr>
        );
    }
});


var InputBox = React.createClass({
    getInitialState: function() {
        return({hasError: false});
    },
    setError: function(status) {
        this.setState({hasError: status});
    },
	render: function() {
	    var fgClasses = classNames({
            	'form-group': true,
            	'has-error': this.state.hasError
        	});

    	return (
	    <div className={fgClasses}>
            	<label className="col-lg-3 control-label" htmlFor="">{this.props.name}</label>
                <div className="col-lg-6"><input type="text" className="form-control" id={this.props.id} name={this.props.divName}/></div>
            </div>        
	);
    }
});


var Submit = React.createClass({
    render: function() {       
        var button = null;

        if(this.props.submitted){
            button = <button type="submit" className="btn btn-primary pull-right" id="search-btn" disabled><i className="fa fa-spinner fa-spin" /> Adding...</button>;
        }else{
            button = <button type="submit" className="btn btn-primary pull-right" id="search-btn" onClick={this.handleClick}>Add Facility</button>;
        } 
        
        return (
            <div className="col-lg-2 col-md-offset-7">
                {button}
            </div>            
        );
    }
});

var ErrorMessagesBlock = React.createClass({
    render: function() {
        if(this.props.errors === null){
            return '';
        }

        var errors = this.props.errors.map(function(message, i){
            return (
                <li key={i}>{message}</li>
            );
        });

        return (
            <div className="row">
                <div className="col-sm-12 col-md-8 col-md-push-2">
                    <div className="alert alert-danger" role="alert">
                        <p><i className="fa fa-exclamation-circle fa-2x"></i> Please select values for the following field(s): </p>
                        <ul>
                            {errors}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});

React.render(
    <EditFacility />,
    document.getElementById('editFacility')
    );

