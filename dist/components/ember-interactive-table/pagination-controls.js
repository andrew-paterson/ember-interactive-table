import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import './pagination-controls.css';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div class=\"table-pagination\" ...attributes>\n  <div class=\"page-navigation\" data-test-class=\"eit-pagination\">\n    {{#if this.paginationObject.prev}}\n      <button\n        {{on \"click\" (fn (mut @page) this.paginationObject.first.number)}}\n        class=\"incrementing-arrow-double left-right margin-right-md btn-content\"\n        title=\"First\"\n        data-test-class=\"eit-pagination-first\"\n      ><SvgRepo::Icons::IconArrowLeftDouble /></button>\n      <button\n        {{on \"click\" (fn (mut @page) this.paginationObject.prev.number)}}\n        class=\"incrementing-arrow left-right right margin-right-md btn-content\"\n        title=\"Previous\"\n        data-test-class=\"eit-pagination-prev\"\n      ><SvgRepo::Icons::IconArrowLeft /></button>\n    {{/if}}\n    <div class=\"page-number-input\" data-test-class=\"eit-pagination-page-number\">\n      Page\n\n      <input\n        id=\"eit-page-number-{{this._uid}}\"\n        value={{readonly this.paginationObject.self.number}}\n        {{on\n          \"change\"\n          (ember-interactive-table/extract \"target.value\" (fn (mut @page)))\n        }}\n      />\n      of\n      {{this.paginationObject.last.number}}\n    </div>\n    {{#if this.paginationObject.next}}\n      <button\n        {{on \"click\" (fn (mut @page) this.paginationObject.next.number)}}\n        class=\"incrementing-arrow left-right margin-left-md btn-content\"\n        title=\"Next\"\n        data-test-class=\"eit-pagination-next\"\n      ><SvgRepo::Icons::IconArrowRight /></button>\n      <button\n        {{on \"click\" (fn (mut @page) this.paginationObject.last.number)}}\n        class=\"incrementing-arrow-double left-right margin-left-md btn-content\"\n        title=\"Last\"\n        data-test-class=\"eit-pagination-last\"\n      ><SvgRepo::Icons::IconArrowRightDouble /></button>\n    {{/if}}\n  </div>\n  <div class=\"page-size\">\n    <div class=\"arrows\">\n      <button\n        {{on \"click\" (fn (mut @size) this.pageSize.nextUp)}}\n        class=\"incrementing-arrow up-down up btn-content\"\n        title=\"Next\"\n        data-test-class=\"eit-pagination-increase-page-size\"\n      ><SvgRepo::Icons::IconArrowUp /></button>\n      <button\n        {{on \"click\" (fn (mut @size) this.pageSize.nextDown)}}\n        class=\"incrementing-arrow up-down down btn-content\"\n        title=\"Last\"\n        data-test-class=\"eit-pagination-decrease-page-size\"\n      ><SvgRepo::Icons::IconArrowDown /></button>\n    </div>\n    <span\n      class=\"page-size\"\n      data-test-class=\"eit-pagination-current-page-size\"\n    ><input\n        id=\"eit-page-size-{{this._uid}}\"\n        value={{readonly this.pageSize.current}}\n        {{on\n          \"change\"\n          (ember-interactive-table/extract \"target.value\" (fn (mut @size)))\n        }}\n      /></span>\n    items per page\n  </div>\n</div>");

class PaginationControls extends Component {
  static {
    g(this.prototype, "paginationLinks", [tracked]);
  }
  #paginationLinks = (i(this, "paginationLinks"), undefined);
  static {
    g(this.prototype, "modelMetaData", [tracked]);
  }
  #modelMetaData = (i(this, "modelMetaData"), undefined);
  _uid = guidFor(this);
  updatePage(event) {
    console.log(event.target.value);
    this.args.page = event.target.value;
  }
  static {
    n(this.prototype, "updatePage", [action]);
  }
  updateSize(event) {
    console.log(event.target.value);
    this.args.size = event.target.value;
  }
  static {
    n(this.prototype, "updateSize", [action]);
  }
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
  }
}
setComponentTemplate(TEMPLATE, PaginationControls);

export { PaginationControls as default };
//# sourceMappingURL=pagination-controls.js.map
