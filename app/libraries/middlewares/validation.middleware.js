
export default (schema, reqProperty) => async (req, res, next) => {
  const userInput = req[reqProperty];

  try {
    await schema.validateAsync(userInput);
  }catch(err){
    console.log(`validationMiddlewareCatch: ${err.details}`);
    next(err);
  }
  
  next();
};
