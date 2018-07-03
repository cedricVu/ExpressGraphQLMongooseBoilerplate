'use strict';
function findMiddleware (next) {
  const filter = this.getQuery();
  Object.assign(
    {
      isDeleted: false
    },
    filter
  );
  next();
}

export default function (schema, options) {

  schema.pre('find', findMiddleware);
  schema.pre('findOne', findMiddleware);

};
