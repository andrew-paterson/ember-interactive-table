import Component from '@ember/component';
import layout from '../../templates/components/ember-interactive-table/pagination-controls';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  layout,
  tagName: 'div',
  classNames: ['table-pagination'],
  classNameBindings: ['class'],

  paginationObject: computed('paginationLinks', function() {
    var paginationLinks = this.get('paginationLinks');
    console.log(paginationLinks);
    var paginationObject = {};
    $.each(paginationLinks, function(key, val) {
      var queryParamsString = val.split('?')[1];
      var queryParams = queryParamsString.split('&');
      paginationObject[key] = {};
      queryParams.forEach(function(keyValuePair) {
        const [param, value] = keyValuePair.split('=');
        if (param === 'page%5Bnumber%5D') {
          if (value) {
            paginationObject[key].number = value;
          }
        }
      });
    });
    console.log(paginationObject);
    return paginationObject;
  }),

  pageSize: computed('modelMetaData', function() {
    var pageSize = this.get('modelMetaData.page_size');
    var maxPageSize = this.get('modelMetaData.max_page_size');
    var minPageSize = this.get('modelMetaData.min_page_size');
    var pageSizeIsMax = this.get('modelMetaData.page_size_is_max');
    var pageSizeIsMin = this.get('modelMetaData.page_size_is_min');
    var final = {
      current: pageSize
    };
    if (pageSizeIsMax) {
      final.nextUp = pageSize;
    } else if (pageSize + 10 > maxPageSize) {
      final.nextUp = maxPageSize;
    } else {
      final.nextUp = pageSize + 10;
    }
    if (pageSizeIsMin) {
      final.nextDown = pageSize;
    } else if (pageSize - 10 < minPageSize) {
      final.nextDown = minPageSize;
    } else {
      final.nextDown = pageSize - 10;
    }
    return final;
  })
});