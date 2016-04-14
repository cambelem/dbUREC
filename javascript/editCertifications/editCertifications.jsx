var EditCertifications = React.createClass({
    render:function(){
        return(
        <div>
            <CertificationInfo ref="certInfo" />
        </div>

        );
     }
  });

var CertificationInfo = React.createClass({
    render: function() {
        return (<div> 
        <table className="table table-striped">
          <tr>
              <td>Jill</td>
              <td>Smith</td> 
              <td>50</td>
          </tr>
          <tr>
               <td>Eve</td>
               <td>Jackson</td> 
               <td>94</td>
          </tr>
         </table>
                                        
        <button type="button" className="btn btn-default">Right</button>
        </div>
        );
    }
});

React.render(
    <EditCertifications />,
    document.getElementById('editCertifications')
    );

