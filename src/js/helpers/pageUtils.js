export const isCurrentPage = function isCurrentPagePath(path) {
  return stripTrailingSlash(path) === stripTrailingSlash(getPagePath());
};

export const redirect = function redirect(url) {
  window.location.replace(url);
};

export const getParam = function getParam(param) {
  const { search } = window.location;

  const params = new URLSearchParams(search);

  return params.get(param);
};

function stripTrailingSlash(str) {
  if (str.endsWith('/') && str.length > 1) {
    return str.slice(0, -1);
  }

  return str;
}

function getPagePath() {
  const { pathname } = window.location;

  return pathname.replace(/(index)?(\.html)?$/, '');
}

export default { isCurrentPage, redirect, getParam };
