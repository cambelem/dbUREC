var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var SearchUser = React.createClass({
    getInitialState: function() {
        return {submitted: false, errorMessages: null};
    },
    handleSubmit: function(e) {
        e.preventDefault();

        var thisComponent = this;
        var formElement = e.target;

        this.setState({submitted: true}, function(){
           if(!this.validate(formElement, thisComponent)){
                setTimeout(function(){
                    thisComponent.setState({submitted: false});
                },1000);
                 
                return;
	    }
            formElement.submit();
        });
    },
    validate: function(form, thisComponent) {
        var valid = true;
        var errors = [];

        if(form.elements.student.value === ''|| form.elements.student.value.length != 9 || !(/^\d+$/.test(form.elements.student.value)))
            {
            thisComponent.refs.studentInfo.setError(true);
            errors.push('Search');
            valid = false;
        }else{
            thisComponent.refs.studentInfo.setError(false);
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

        return (
            <div>
                <div className="row">
                    <div className="col-md-12 col-md-offset-4">
                        <h2><i className="fa fa-search" />Search Climber</h2>
                        <br />
                    </div>
                </div>

                <form role="form" id="searchClimberForm" className="form-horizontal" action="index.php" method="get" onSubmit={this.handleSubmit}>
                    <input type="hidden" name="module" value="dbUREC"/>
                    <input type="hidden" name="action" value="menu" />
                                            
                    <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTime={500}>
                        {errors}
                    </ReactCSSTransitionGroup>

                    <StudentInfo ref="studentInfo" />

                    <SearchButton submitted={this.state.submitted}/>
                </form>                 
            </div>
        );
    }
});

var StudentInfo = React.createClass({
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
            <div className="row" style={{marginBottom:"2em"}}>  
                <div className="col-md-12 col-md-offset-4">  
                <fieldset>
                    <div className={fgClasses} id="student">
                        <div className="col-md-4">
                            <label htmlFor="student">Please enter a Banner ID:</label>
                            <input type="search" id="studentSearch" className="form-control" name="student" />
                        </div>
                    </div>
                </fieldset>
                </div>
            </div> 
        );
    }
});

var SearchButton = React.createClass({
    render: function() {
        var button = null;
        if(this.props.submitted) {
            button = <button type="submit" className="btn btn-lg btn-primary pull-right" id="create-btn" disabled ><i className="fa fa-spinner fa-spin"></i> Searching...</button>;
        } else {
            button = <button type="submit" className="btn btn-lg btn-primary pull-right" id="create-btn" onClick={this.handleClick} >Search Climber</button>;
        }
        return (
            <div className="row">
                <div className="col-sm-12 col-md-6 col-md-push-2">
                    {button}
                </div>
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
                <div className="col-md-4 col-md-offset-4">  
                    <div className="alert alert-danger" role="alert">
                        <p><i className="fa fa-exclamation-circle fa-2x"></i> Please enter a valid Banner ID: </p>
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
    <SearchUser />,
    document.getElementById('search-user')
);
