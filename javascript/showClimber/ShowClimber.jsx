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
                this.setState({student: data});
            	console.log(data);
	    }.bind(this),
            error: function(xhr, status, err) {
                alert("Failed to grab client data."+err.toString());
                console.error(this.props.url, status, err.toString());
            }.bind(this)                
        });
    },
    deleteUse: function() {
        /*
        $.ajax({
            url: 'index.php?module=usercontrol&action=DeleteUser,
            type: 'GET',
            dataType: 'json',
            success: function(data) {   
                this.setState({clientData: data});           
            }.bind(this),
            error: function(xhr, status, err) {
                alert("Failed to grab client data."+err.toString());
                console.error(this.props.url, status, err.toString());
            }.bind(this)                
        });
*/
    },
    updatePermissions: function() {
        /*
        $.ajax({
            url: 'index.php?module=usercontrol&action=UpdatePermissions,
            type: 'GET',
            dataType: 'json',
            success: function(data) {   
                this.setState({clientData: data});           
            }.bind(this),
            error: function(xhr, status, err) {
                alert("Failed to grab client data."+err.toString());
                console.error(this.props.url, status, err.toString());
            }.bind(this)                
        });
*/
    },
    render: function() {  
        if (this.state.student == null)
	{
	   var studentInfo = null;
	}
	else
	{
	   var studentInfo = <StudentInfo student={this.state.student} />
	}
	return (
            <div className="row" style={{marginBottom:"2em"}}>
                <div className="col-md-12">
                    <h2><i className="fa fa-search" />Search Climber</h2>
                    <br />
                    <form role="form" id="searchClimberForm" className="form-horizontal" action="index.php" method="get" onSubmit={this.handleSubmit}>
                        <input type="hidden" name="module" value="dbUREC"/>
                        <input type="hidden" name="action" value="searchClimber"/>

                        {studentInfo}                     
                        <ButtonGroup />
                    </form>                    
                    
                </div>
            </div>
        );
    }
});

var StudentInfo = React.createClass({
    render: function() {
console.log(this.props.student.fname);
        return (
            <div>
                    <fieldset>
                        
                            <legend>Climber Information</legend>
                        
                        <div className="form-group">
                            <div className="col-md-5">
                                <label htmlFor="">Last Name</label>
                                <input type="text" className="form-control">{this.props.student.lname}</input>
                            </div>
                       
                            <div className="col-md-2">
                                <label htmlFor="">Middle Initial</label>
                                <input type="text" className="form-control" />
                            </div>
                             
                            <div className="col-md-5 pull-right">
                                <label htmlFor="">First Name</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>        
                        

                        <div className="form-group">
                            <div className="col-md-4">
                                <label htmlFor="">Local Phone</label>
                                <input type="text" className="form-control" />
                            </div>
                             
                            <div className="col-md-4">
                                <label htmlFor="">Cell Phone</label>
                                <input type="text" className="form-control" />
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="">Address</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>        

                        <div className="form-group">
                            <div className="col-md-8">
                                <label htmlFor="">Primary Email</label>
                                <input type="text" className="form-control" />
                            </div>

                            <div className="col-md-4 pull-right">
                                <label htmlFor="">Banner ID</label>
                                <input type="text" className="form-control" />
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
                                <input type="text" className="form-control" />
                            </div> 
                        </div>               
                    </fieldset>
            </div> 
        );
    }
});

var ButtonGroup = React.createClass({
    render: function() {
        return(
            <fieldset>
                <div className="form-group">
                    <Delete />
                    <Submit /> 
                </div>
            </fieldset>      
        );
    }
});

var Submit = React.createClass({
    render: function() {       
        var button = null;
        if(this.props.submitted){
            button = <button type="submit" className="btn btn-primary pull-right" id="search-btn" disabled><i className="fa fa-spinner fa-spin" /> Searching...</button>;
        }else{
            button = <button type="submit" className="btn btn-primary pull-right" id="search-btn" onClick={this.handleClick}>Search Climber</button>;
        } 
        
        return (
            <div className="col-lg-2">
                {button}
            </div>            
        );
    }
});

var Delete = React.createClass({
    render: function() {
        return(
            <div className="col-lg-1 col-lg-offset-9">
                <a href="" className="btn btn-danger-hover" onclick="return confirm('Are you sure you want to delete this climber?');">Delete</a>
            </div>             
        );
    }
});

React.render(
    <ShowClimber />,
    document.getElementById('show-climber')
);
