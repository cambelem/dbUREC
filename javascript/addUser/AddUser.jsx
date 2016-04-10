
var AddUser = React.createClass({
    addUser: function() {
        /* 
        $.ajax({
            url: 'index.php?module=usercontrol&action=AddUser,
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
        return (
            <div className="row" style={{marginBottom:"2em"}}>
                <div className="col-md-6 col-md-offset-3">
                    <h2><i className="fa fa-plus" />Add a Student</h2>
                    <br />
                    <StudentInfo />   
                        
                    
                </div>
            </div>
        );
    }
});

var StudentInfo = React.createClass({
    render: function() {
        return (
            <div>
                <form className="form-horizontal">
                    <fieldset>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" htmlFor="">Banner ID</label>
                            <div className="col-lg-6"><input type="text" className="form-control" /></div>
                        </div>        
                        
                        <div className="form-group">
                            <label className="col-lg-3 control-label" htmlFor="">First Name</label>
                            <div className="col-lg-6"><input type="text" className="form-control" /></div>
                        </div>        

                        <div className="form-group">
                            <label className="col-lg-3 control-label" htmlFor="">Middle Name</label>
                            <div className="col-lg-6"><input type="text" className="form-control" /></div>
                        </div>        

                        <div className="form-group">
                            <label className="col-lg-3 control-label" htmlFor="">Last Name</label>
                            <div className="col-lg-6"><input type="text" className="form-control" /></div>
                        </div>        

                        <div className="form-group">
                            <label className="col-lg-3 control-label" htmlFor="">Birth day</label>
                            <div className="col-lg-6"><input type="text" className="form-control" /></div>
                        </div>        

                        <div className="form-group">
                            <label className="col-lg-3 control-label" htmlFor="">Address</label>
                            <div className="col-lg-6"><input type="text" className="form-control" /></div>
                        </div>        

                        <div className="form-group">
                            <label className="col-lg-3 control-label" htmlFor="">Phone Number</label>
                            <div className="col-lg-6"><input type="text" className="form-control" /></div>
                        </div>        
                        
                        <button type="submit" className="btn btn-lg btn-primary pull-right" id="create-btn">Create Climber</button>
                        

                    </fieldset>
                </form>
            </div> 
        );
    }
});


React.render(
    <AddUser />,
    document.getElementById('add-user')
);
