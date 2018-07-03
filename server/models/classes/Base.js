'use strict';

export default class BaseModelClass {

  static async getAll (params) {
    params = Object.assign(
      {
        where: null,
        limit: 1000,
        skip: 0,
        sort: { createdAt: -1 },
        attributes: null,
        isLean: true
      },
      params
    );
    return await this
      .find(params.where)
      .limit(params.limit)
      .skip(params.skip)
      .sort(params.sort)
      .select(params.attributes)
      .lean(params.isLean);
  }

}
