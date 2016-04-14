var EditFaculty = React.createClass({

	render: function() {
		
		return(
			<div>
				<FacultyInfo />
			</div>
		);
	}
});

var FacultyInfo = React.createClass({

	render: function() {
		
		return(
			<div>
			<button className="btn btn-default" type="submit">Button</button> 
			<table className="table table-striped"></table>
			<label>Hello world</label>
			</div>
		);
	}
});


React.render(
	<EditFaculty />,
	document.getElementById('editFaculty')
);

