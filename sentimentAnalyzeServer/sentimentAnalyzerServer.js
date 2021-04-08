const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = new express();

// middleware
app.use(express.static('client'));
/* app.use(express.json());
app.use(express.urlencoded()); */

const cors_app = require('cors');
app.use(cors_app());

const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level= "debug";

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;
    
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');
    
    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
          apikey: api_key,
        }),
        serviceUrl: api_url,
      });

    return naturalLanguageUnderstanding;
  }


  const analyzeText= (getsentiment,getemotion, targetText, res)=>{
      let NLU =  getNLUInstance();

      const analyzeParams1 = {       
        'features': {
          'keywords': {
            'sentiment': getsentiment,
            'emotion': getemotion,
            'limit': 15
          }
        },
        'text': targetText,      
        "language": "en"
      };

     NLU.analyze(analyzeParams1)
    .then(analysisResults => {        
         logger.debug(JSON.stringify(analysisResults, null, 15));
         return res.send(JSON.stringify(analysisResults, null, 15));       
     
    })
    .catch(err => {
        res.send(err.toString());
        console.log('error:', err);
    });
  }
  
  
  const analyzeURL= (getsentiment,getemotion, targetUrl, res)=>{
    let NLU =  getNLUInstance();

    const analyzeParams2 = {  
       'url': targetUrl,
      "language": "en",     
      'features': {
        'keywords': {
          'sentiment': getsentiment,
          'emotion': getemotion,
          'limit': 5
        }
      }      
    };

   NLU.analyze(analyzeParams2)
  .then(analysisResults => {
      
        logger.debug(JSON.stringify(analysisResults, null, 15));
          return res.send(JSON.stringify(analysisResults, null, 15));
    
   
  })
  .catch(err => {
      res.send(err.toString());
      console.log('error:', err);
  });
}

//NLU apidocs
//https://cloud.ibm.com/apidocs/natural-language-understanding?code=node&cm_mmc=Email_Newsletter-_-Developer_Ed%2BTech-_-WW_WW-_-SkillsNetwork-Courses-IBMDeveloperSkillsNetwork-CD0220EN-SkillsNetwork-20363180&cm_mmca1=000026UJ&cm_mmca2=10006555&cm_mmca3=M12345678&cvosrc=email.Newsletter.M12345678&cvo_campaign=000026UJ

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    let target=req.query.url;
    analyzeURL(false, true, target, res);

    //return res.send({"happy":"90","sad":"10"});
 
});

app.get("/url/sentiment", (req,res) => {
    let target=req.query.url;
    analyzeURL(true, false, target, res);
    //return res.send("url sentiment for "+req.query.url);
});

app.get("/text/emotion", (req,res) => {
    let txt=req.query.text;
    analyzeText(false, true, txt,res);
    //return res.send({"happy":"10","sad":"90"});
});

app.get("/text/sentiment", (req,res) => {
    let txt=req.query.text;
    analyzeText(true, false, txt,res);
    //return res.send("text sentiment for "+req.query.text);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

