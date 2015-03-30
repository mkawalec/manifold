export default (hapi) => {
  require('./users/controller')(hapi);
  require('./posts/controller')(hapi);
};
