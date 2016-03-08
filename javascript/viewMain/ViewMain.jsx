
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
                    <h1>Test:</h1>
                    <Test />
                </div>
            </div>
        );
    }
});

var Test = React.createClass({
    render: function() {
        return (
            <div>
                Hello World!
            </div>
        );
    }
});


React.render(
    <ViewMain />,
    document.getElementById('mainview')
);
