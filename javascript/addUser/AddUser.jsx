var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var AddUser = React.createClass({
	getInitialState: function(){
        return ({submitted: false, errorMessages: null});
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
            formElement.submit();
	    //window.location = "index.php?module=dbUREC&action=showClimber&student="+banner_id;
        });
    },
    validate: function(form, thisComponent) {

        // Assume everything is valid, change this if we detect otherwise
        var valid = true;
        var errors = [];

        // Check the firstname
        if(form.elements.firstName.value === ''){
            thisComponent.refs.fnameBlock.setError(true);
            errors.push('First Name');
            valid = false;
        }else {
            thisComponent.refs.fnameBlock.setError(false);
        }
 
        // Check the middlename
        if(form.elements.MidName.value === ''){
            thisComponent.refs.mnameBlock.setError(true);
            errors.push('Middle Name');
            valid = false;
        }else {
            thisComponent.refs.mnameBlock.setError(false);
        }

        // Check the lastname
        if(form.elements.lastName.value === ''){
            thisComponent.refs.lnameBlock.setError(true);
            errors.push('Last Name');
            valid = false;
        }else {
            thisComponent.refs.lnameBlock.setError(false);
        }

        // Check the birthday
        if(form.elements.bDay.value === ''){
            thisComponent.refs.bdayBlock.setError(true);
            errors.push('Birthday');
            valid = false;
        }else {
            thisComponent.refs.bdayBlock.setError(false);
        }

        // Check the Address
        if(form.elements.climbAdd.value === ''){
            thisComponent.refs.addressBlock.setError(true);
            errors.push('Address');
            valid = false;
        }else {
            thisComponent.refs.addressBlock.setError(false);
        }
 
        // Check the phone number
        if(form.elements.phoneNum.value === ''){
            thisComponent.refs.phoneBlock.setError(true);
            errors.push('Phone Number');
            valid = false;
        }else {
            thisComponent.refs.phoneBlock.setError(false);
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
	
	var url = "index.php?module=dbUREC&action=showClimber&student="+banner_id;
        return (
            <div className="row" style={{marginBottom:"2em"}}>
                <div className="col-md-6 col-md-offset-3">
                    <h2><i className="fa fa-plus" />Add a Student</h2>
                    <br />
        			<ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTime={500}>
        			    {errors}
        	    	</ReactCSSTransitionGroup>
			    
			         <form role="form" id="newClimberForm" className="form-protected form-horizontal" action="index.php" method="post" onSubmit={this.handleSubmit}>
						<input type="hidden" name="module" value="dbUREC"/>
						<input type="hidden" name="action" value="addUserRest"/>
						<input type="hidden" name="student" value={banner_id}/>
						
					
						<fieldset>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" htmlFor="">Banner ID</label>
                            <div className="col-lg-6"><input type="text" className="form-control" defaultValue={banner_id} readOnly/></div>
                        </div>        
     		
                			<InputBox ref="fnameBlock" name="First Name" id="fname" divName="firstName" />			
                			<InputBox ref="mnameBlock" name="Middle Name" id="minit" divName="MidName" />                   
                			<InputBox ref="lnameBlock" name="Last Name" id="lname" divName="lastName" />			
                			<InputBox ref="bdayBlock" name="Birthday" id="bday" divName="bDay" />                   
                			<InputBox ref="addressBlock" name="Address" id="address" divName="climbAdd" />			
                			<InputBox ref="phoneBlock" name="Phone Number" id="phone" divName="phoneNum" />                   
            		
            		     </fieldset>
  
						<Submit submitted={this.state.submitted}/>
                    </form>
                </div>
            </div>
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
            button = <button type="submit" className="btn btn-primary pull-right" id="search-btn" onClick={this.handleClick}>Add Climber</button>;
        } 
        
        return (
            <div className="col-lg-2 pull-right">
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
    <AddUser />,
    document.getElementById('add-user')
);
