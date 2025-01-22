import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import './pagination-controls.css';

export default class PaginationControls extends Component {
  @tracked paginationLinks;
  @tracked modelMetaData;

  _uid = guidFor(this);

  get paginationObject() {
    var paginationLinks = this.args.paginationLinks;
    if (!paginationLinks) {
      return;
    }
    var paginationObject = {};
    for (var key in paginationLinks) {
      var val = paginationLinks[key];
      var queryParamsString = val.split('?')[1];
      var queryParams = queryParamsString.split('&');
      paginationObject[key] = {};
      queryParams.forEach(function (keyValuePair) {
        const [param, value] = keyValuePair.split('=');
        if (param === 'page%5Bnumber%5D') {
          if (value) {
            paginationObject[key].number = value;
          }
        }
        if (param === 'page%5Bsize%5D') {
          if (value) {
            paginationObject.size = value;
          }
        }
      });
    }
    return paginationObject;
  }

  get pageSize() {
    var pageSize = parseInt(this.paginationObject.size);
    var maxPageSize = this.args.modelMetaData.max_page_size;
    var minPageSize = this.args.modelMetaData.min_page_size;
    var pageSizeIsMax = this.args.modelMetaData.page_size_is_max;
    var pageSizeIsMin = this.args.modelMetaData.page_size_is_min;
    var final = {
      current: pageSize,
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
  }
}
