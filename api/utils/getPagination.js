const getPagination = (page, size) => {
    const limit = size ? +size : 8;
    const offset = page ? (page - 1) * limit : 0;
    return { limit, offset };
};

module.exports = { getPagination };