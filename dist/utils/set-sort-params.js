function setSortParams(controller, newSortField, defaultDirection = 'desc') {
  // - means desc.
  var currentSortFieldName = controller.sort.replace('-', '');
  var newSortDirection;
  if (currentSortFieldName === newSortField) {
    newSortDirection = controller.sort.split('')[0] === '-' ? 'asc' : 'desc';
  } else {
    newSortDirection = defaultDirection;
  }
  newSortDirection = newSortDirection.replace('desc', '-').replace('asc', '');
  controller.sort = `${newSortDirection}${newSortField}`;
}

export { setSortParams as default };
//# sourceMappingURL=set-sort-params.js.map
