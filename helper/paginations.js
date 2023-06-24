const paginate = (model, page, limit, dataName, filters, applicableFilters, select) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalCount = await model.countDocuments();
      const totalPages = Math.ceil(totalCount / limit);

      const results = await model
        .find(filters)
        .skip((page - 1) * limit)
        .limit(limit)
				.select(select)

      resolve({
        [dataName]: results,
        pagnations: {
          currentPage: page,
          totalPages: totalPages,
        },
        filters: {
          selectedFilters: filters,
          applicableFilters
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

// module.exports = paginate;
module.exports = {
  paginate,
};
