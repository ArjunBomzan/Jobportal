const Access=(req, res, next)=>{
    
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
        // Add other required CORS headers if necessary
      
        next();
      }

      module.exports=Access