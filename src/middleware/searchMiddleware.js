const queryWithWhere = (where) => {
    let _where = {};
    if (where) {
      if (where.search) _where["$or"] = [
        { "address.village": { $regex: where.search, $options: "i" } },
        { "address.district": { $regex: where.search, $options: "i" } },
        { "address.province": { $regex: where.search, $options: "i" } },
        { description: { $regex: where.search, $options: "i" } },
      ];
    }
    return _where;
  };

  export default queryWithWhere