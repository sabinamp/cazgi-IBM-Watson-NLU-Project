import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    constructor(props){
      super(props)
    
    }
    render() {  
      const {emotions}= this.props;
      console.log(emotions);
    
      return (  
        <div>
                 
          <table className="table table-bordered">
            <tbody>
            {
             
             emotions.result && emotions.result.keywords && emotions.result.keywords.length > 0 ? (
                //Write code to use the .map method that you worked on in the Hands-on React lab to extract the emotions
                emotions.result.keywords.map(item => {
                  let emotionResult=item.emotion;
                  console.log(`emotionResult is ${emotionResult}`);
                  let emotionDetails = Object.entries(emotionResult);
                    console.log(`emotionDetails is ${emotionDetails}`);
                   //return <tr><td>"sadness"</td><td style={{color: "red",border: "1px solid black"}}>{`${emotionResult.sadness}`}</td></tr>;

                 
                    let displayedInfo= emotionDetails.map((em)=>{
                      return <tr><td style={{color: "black",border: "1px solid black"}}>{em[0]}</td><td style={{color: "black",border: "1px solid black"}}>{em[1]} </td></tr>;
                    }); 
                   return displayedInfo;
                })
                ) : (
                  <tr><td style={{color: "red",border: "1px solid black"}}>{`Returned ${emotions}`}</td></tr>
                )
            }
           
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
