export const getLimitAndPage = (req) => {
  let { limit, page } = req.query;

  if (!limit && isNaN(limit)) {
    limit = 25;
  }

  if (!page && isNaN(page)) {
    page = 1;
  }

  console.log({ limit, page });

  return { limit: parseInt(limit), page: parseInt(page) };
};
