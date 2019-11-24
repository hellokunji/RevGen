export function filterRevenueData(data, slug) {
  let obj = null;
  if (isDataValid(data) & isDataValid(slug)) {
    const index = data.findIndex(item => item.slug === slug);
    if (slug !== -1) obj = data[index];
  }
  return obj;
}

export function isDataValid(data) {
  let isValid = false;
  if (data !== undefined && data !== null) isValid = true;
  return isValid;
}

export function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
