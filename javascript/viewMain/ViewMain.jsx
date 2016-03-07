
var ViewMain = React.createClass({
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
            <div className="row">
                <div className="col-md-12">
                    <h1>User Control:</h1>

                    <AddUser />
                    <RemoveUser />
                    <SetPermissions />
                </div>
            </div>
        );
    }
});

var AddUser = React.createClass({
    render: function() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <h3>Add User:</h3>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-md-3">
                        <input type="text" className="form-control" placeholder="Username" ref="username" />
                    </div>
                    <div className="col-md-3">
                        <button type="button" className="btn btn-default" onClick={this.handleFollowUp}>Add</button>
                    </div>
                </div>
                <br />
                <hr />
            </div>
        );
    }
});

var RemoveUser = React.createClass({
    render: function() {      
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <h3>Remove User:</h3>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-md-3">
                        <input type="text" className="form-control" placeholder="Username" ref="username" />
                    </div>
                    <div className="col-md-3">
                        <button type="button" className="btn btn-default" onClick={this.handleFollowUp}>Remove</button>
                    </div>
                </div>
                <br />
                <hr />
            </div>
        );
    }
});

var SetPermissions = React.createClass({
    handlePermissions: function() {
        console.log("worked");
    },
    render: function() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <h3>Set Permissions:</h3>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-md-3">
                        <input type="text" className="form-control" placeholder="Username" ref="username" />
                    </div>
                    <div className="col-md-3">
                        <button type="button" className="btn btn-default" onClick={this.handleFollowUp}>Set Permission</button>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-3">
                        <select className="form-control" onChange={this.handlePermissions}>
                            <option value="-1" selected>Select a Permission</option> 
                            <option value="1" selected>Pagesmith</option> 
                            <option value="2" selected>Block</option> 
                            <option value="3" selected>MainMenu?</option>
                            <option value="4" selected>Deity</option> 
                            <option value="5" selected>???</option>  
                        </select>
                    </div>
                </div>

                
            </div>
        );
    }
});


React.render(
    <ViewMain />,
    document.getElementById('mainview')
);
