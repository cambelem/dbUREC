

var EditPrograms = React.createClass( {

    render: function() {

        return (
            <div>
            
            <SearchBar ref="sb" />
            
            </div>);

    }
});

var SearchBar = React.createClass({

    render: function() {
        return(
            <div>
                <label>Yeet</label>
                <button className="button" type="ah">Click here hahaha</button>
            </div>
        );
    }
});


React.render(
    <EditPrograms />,
    document.getElementById('editPrograms')
);


