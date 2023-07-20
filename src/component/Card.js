import './card.css';

function BasicExample() {
  return (
    <>
      <div className="cont">
          <div className="left">
           <div className="cardd">
              <div className='imagee'><img src='sarup.png'></img></div>
              <h1>MOmo</h1>
              <h2>Rs. 150</h2>
           </div>
           <div className="cardd">
              <img src='sarup.png'></img>
              <h1>MOmo</h1>
              <h2>Rs. 150</h2>
           </div>
           <div className="cardd">
              <img src='sarup.png'></img>
              <h1>MOmo</h1>
              <h2>Rs. 150</h2>
           </div>
           <div className="cardd">
             <div>< img src='sarup.png' alt="" className="image"/></div> 
              <h1>MOmo</h1>
              <h2>Rs. 150</h2>
           </div>
           <div className="cardd">
              <img src='sarup.png'></img>
              <h1>MOmo</h1>
              <h2>Rs. 150</h2>
           </div>
          </div>
          <div className="right">
              <table>
                <tr>
                <th>S.N</th>
                <th>Item Name</th>
                <th>Price</th>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Momo</td>
                  <td>Rs 150</td>
                </tr>
                
              </table>
          </div>
      </div>
    </>
  );
}

export default BasicExample;