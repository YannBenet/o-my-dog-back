
export default (schema, reqProperty) => async (req, res, next) => {
  const userInput = req[reqProperty];

  try {
    await schema.validateAsync(userInput);
  }catch(err){
    return next(err);
  }
  console.log('donnée valides');
  next();
};
