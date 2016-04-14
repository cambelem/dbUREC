// IMPORTANT, banner_id is a global variable.


var ShowClimber = React.createClass({ 
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
            	console.log(data);
	    }.bind(this),
            error: function(xhr, status, err) {
                alert("Couldn't grab climber data");
            }.bind(this)                
        });
    },
    handleDelete: function(bid) {

        $.ajax({
            url: 'index.php?module=dbUREC&action=showClimberRest&student='+bid,
            type: 'DELETE',
            success: function() {   
                // Redirect to search screen
                window.location = 'index.php';         
            }.bind(this),
            error: function(xhr, status, err) {
                alert("Sorry, looks like something went wrong. We couldn't delete the record.");
            }.bind(this)                
        });

    },
    handleSave: function(climberData) {

        $.ajax({
            url: 'index.php?module=dbUREC&action=showClimberRest',
            type: 'PUT',
            processData: false,
            dataType: 'json',
            data: JSON.stringify(climberData),
            success: function() {            
            }.bind(this),
            error: function(xhr, status, err) {
                alert("Sorry, looks like something went wrong. We couldn't save your changes.");
            }.bind(this)                
        });

    },
    render: function() {  
        if (this.state.student == null)
		{
		   	var studentInfo = null;
            var interface = <p className="text-muted" style={{position:"absolute", top:"50%", left:"50%"}}>
                                <i className="fa fa-spinner fa-2x fa-spin"></i> Loading Climber...
                            </p>;
		}
		else
		{
			var handleSave = this.handleSave;
			var handleDelete = this.handleDelete;

		   	var studentInfo = this.state.student.map(function(data){
		   	return(
		   			<StudentInfo key = {data.bannerid}
		   						 bid = {data.bannerid}
		   						 bday = {data.bday}
		   						 fname = {data.fname}
		   						 mname = {data.mname}
		   						 lname = {data.lname}
		   						 phone = {data.phoneNumber}
		   						 address = {data.address} 
		   						 handleDelete = {handleDelete} 
		   						 handleSave = {handleSave}/>
		   		);
		   	}) ;

            var interface = <div className="row" style={{marginBottom:"2em"}}>
                                <div className="col-md-12">
                                    <h2><i className="fa fa-search" />Climber Information</h2>
                                    <br />
                                    <div className="form-horizontal">
                                        {studentInfo} 
                                    </div>                                                      
                                </div>
                            </div>
		}
	return (
            <div>
                {interface}
            </div>
        );
    }
});

var StudentInfo = React.createClass({
	handleSave: function() {
		
        this.props.handleSave({bannerid: this.props.bid,
                            address: React.findDOMNode(this.refs.climberEditAddress).value,
                            fname: React.findDOMNode(this.refs.climberEditFname).value,
                            lname: React.findDOMNode(this.refs.climberEditLname).value,
                            mname: React.findDOMNode(this.refs.climberEditMname).value,
                            bday: this.props.bday,
                            phoneNumber: React.findDOMNode(this.refs.climberEditPhone).value,
                            
                        });
    },
    handleDelete: function() {
        this.props.handleDelete(this.props.bid);
    },
    render: function() {
        return (
            <div>
                    <fieldset>
                        
                            <legend>Climber Information</legend>
                        
                        <div className="form-group">
                            <div className="col-md-5">
                                <label htmlFor="">Last Name</label>
                                <input type="text" className="form-control" id="climber-edit-Lname" ref="climberEditLname" defaultValue={this.props.lname} />
                            </div>
                       
                            <div className="col-md-2">
                                <label htmlFor="">Middle Initial</label>
                                <input type="text" className="form-control" ref="climberEditMname" defaultValue={this.props.mname}/>
                            </div>
                             
                            <div className="col-md-5 pull-right">
                                <label htmlFor="">First Name</label>
                                <input type="text" className="form-control" ref="climberEditFname" defaultValue={this.props.fname}/>
                            </div>
                        </div>        
                        

                        <div className="form-group">
                            <div className="col-md-4">
                                <label htmlFor="">Local Phone</label>
                                <input type="text" className="form-control" ref="climberEditPhone" defaultValue={this.props.phone}/>
                            </div>
                             
                            <div className="col-md-4">
                                <label htmlFor="">Cell Phone</label>
                                <input type="text" className="form-control" defaultValue="no value"/>
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="">Address</label>
                                <input type="text" className="form-control" ref="climberEditAddress" defaultValue={this.props.address}/>
                            </div>
                        </div>        

                        <div className="form-group">
                            <div className="col-md-8">
                                <label htmlFor="">Primary Email</label>
                                <input type="text" className="form-control" defaultValue="no value"/>
                            </div>

                            <div className="col-md-4 pull-right">
                                <label htmlFor="">Banner ID</label>
                                <input type="text" className="form-control" defaultValue={this.props.bid} readOnly/>
                            </div>
                        </div>        
                       
                        <div className="form-group">
                            <div className="col-md-4">
                                <label htmlFor="">Current Certification Level</label>
                                <select className="form-control">
                                    <option value="test">Test</option>
                                </select>
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="">Date of Last Skills Assessment</label>
                                <input type="text" className="form-control" defaultValue="no value"/>
                            </div> 
                        </div>               
                    </fieldset>

                    <ButtonGroup handleSave={this.handleSave} 
                    			 handleDelete={this.handleDelete}/>  
            </div> 
        );
    }
});

var ButtonGroup = React.createClass({
    render: function() {
        return(
            <fieldset>
                <div className="form-group">
                    <Delete handleDelete={this.props.handleDelete}/>
                    <Submit handleSave={this.props.handleSave} /> 
                </div>
            </fieldset>      
        );
    }
});

var Submit = React.createClass({
	handleClick: function() {
		this.props.handleSave();
		console.log("made it")
	},
    render: function() {       
        var button = null;

        //if(this.props.submitted){
         //   button = <button type="submit" className="btn btn-primary pull-right" id="search-btn" disabled><i className="fa fa-spinner fa-spin" /> Searching...</button>;
        //}else{
            button = <button type="submit" className="btn btn-primary pull-right" id="search-btn" onClick={this.handleClick}>Save Climber</button>;
        //} 
        
        return (
            <div className="col-lg-2">
                {button}
            </div>            
        );
    }
});

var Delete = React.createClass({
	handleClick: function() {
		console.log("MADE IT");
		this.props.handleDelete();
	},
    render: function() {
        return(
            <div className="col-lg-1 col-lg-offset-9">
                <button type="submit" className="btn btn-danger-hover" onClick={this.handleClick}>Delete</button>
            </div>             
        );
    }
});

React.render(
    <ShowClimber />,
    document.getElementById('show-climber')
);
