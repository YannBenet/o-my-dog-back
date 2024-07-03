export default  (err, req, res, next) => {

  if(err.name === 'ValidationError'){
    err.status = 400;
    err.message = `Bad request / ${err.details.map((detail) => detail.message)}`
  }

  if(err.status === 500){
    err.message = 'Internal server error';
  }

  return res.status(err.status).json({ error: err.message})
}