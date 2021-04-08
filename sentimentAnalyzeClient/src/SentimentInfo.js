import React from 'react';
import './bootstrap.min.css';

class SentimentInfo extends React.Component {
    constructor(props){
      super(props)
    
    }
    render() {  
      const {keywords}= this.props;
      console.log(keywords);
    
      return (  
        <div>
         
            {
             
               keywords && keywords.length > 0 ? (
                //Write code to use the .map method that you worked on in the Hands-on React lab to extract the emotions
               keywords.map(item => {
                  let sentimentResult=item.sentiment;                
                  //let sentimentDetails = Object.entries(sentimentResult);
                   let output=<div>Sentiment</div>;
                  
                  let labelS= sentimentResult.label;
                    if(labelS === "positive") {
                      output = <div>
                        <span style={{color:"black",fontSize:20}}> {item.text} - </span >
                        <span style={{color:"green",fontSize:20}}>{sentimentResult.label}</span>
                        </div>
                    } else if (labelS === "negative"){
                      output = <div>
                         <span style={{color:"black",fontSize:20}}> {item.text} - </span >
                         <span style={{color:"red",fontSize:20}}>{sentimentResult.label}</span>
                        </div>
                    } else {
                      output = <div>
                        <span style={{color:"black",fontSize:20}}> {item.text} - </span >
                        <span style={{color:"yellow",fontSize:20}}>{sentimentResult.label}</span>
                        </div>
                    }
                   return output;
                })
                ) : (
                  <p style={{color: "black",border: "1px solid black"}}>{`Returned ${keywords}`}</p>
                )
            }
          
          </div>
          );
        }
    
}
export default SentimentInfo;
