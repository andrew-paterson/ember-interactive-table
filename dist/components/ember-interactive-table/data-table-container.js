import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import isEmptyObject from '../../utils/is-empty-object.js';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div class=\"width-100 overflow-x-auto\" ...attributes>\n  <div class=\"above-table {{@aboveTableClass}}\">\n    <div class=\"above-table-row-1 {{@aboveTableRow1Class}}\">\n      {{#if (or @filtersComponent @filterFormSchema)}}\n        <div class=\"sort-filter\">\n          {{#if @sortParams.sortProps}}\n            <div class=\"sorting-controls flex margin-bottom-lg\">\n              <h3 class=\"margin-right-lg\">Sort by: </h3>\n              {{#each @sortParams.sortProps as |propName|}}\n                <a\n                  {{on\n                    \"click\"\n                    (fn\n                      @setSortParams propName (or @defaultSortDirection \"asc\")\n                    )\n                  }}\n                  class=\"margin-right-lg btn btn-outline-gray-medium\"\n                >{{propName}}</a>\n              {{/each}}\n            </div>\n          {{/if}}\n          {{#if this.showFiltersForm}}\n            <BasicDropdown\n              @verticalPosition=\"below\"\n              @renderInPlace={{false}}\n              @initiallyOpened={{this.filtersActive}}\n              @destination=\"above-table-row-2\"\n              as |Dropdown|\n            >\n              <Dropdown.Trigger>\n                <button\n                  class={{or @filtersTriggerClass \"btn btn-outline-primary\"}}\n                  data-test-id=\"toggle-filters-button\"\n                >\n                  {{#if Dropdown.isOpen}}\n                    <SvgRepo::Icons::IconCross />\n                    Hide Filters\n                  {{else}}\n                    <SvgRepo::Icons::IconFilter />\n                    Show Filters\n                  {{/if}}\n                </button>\n              </Dropdown.Trigger>\n              <Dropdown.Content\n                class=\"filter-controls body-content position-static\"\n              >\n                <div class=\"pop-up-box box-arrow\">\n                  {{#if this.filtersActive}}\n                    <div\n                      class=\"filtering-results\"\n                      data-test-class=\"eit-data-table-filtering-result-overview\"\n                    >\n                      <SvgRepo::Icons::IconAsterisk\n                        class=\"filters-active-icon bg-primary\"\n                      />\n\n                      Filters are active ({{this.modelMetaData.filtered_data_length}}\n                      {{ember-skeleton/custom-inflector\n                        this.modelMetaData.filtered_data_length\n                        singular=@singleRecordName\n                        plural=@pluralRecordName\n                      }}\n                      returned).\n                    </div>\n                  {{/if}}\n                  {{#if @filterFormSchema}}\n                    <ChangesetWebform\n                      @formSchema={{@filterFormSchema}}\n                      @submitAction={{@applyFilters}}\n                      @beforeReset={{@clearAllFilters}}\n                      @afterFieldEdit={{@filterFieldChanged}}\n                      @data={{@filterProps}}\n                      data-test-id=\"filters-form\"\n                    />\n                  {{else}}\n                    <@filtersComponent\n                      @applyFilters={{@applyFilters}}\n                      @clearAllFilters={{@clearAllFilters}}\n                      @afterFieldEdit={{@filterFieldChanged}}\n                      @data={{@filterProps}}\n                      @filterFormSchema={{@filterFormSchema}}\n                    />\n                  {{/if}}\n                </div>\n              </Dropdown.Content>\n            </BasicDropdown>\n          {{/if}}\n        </div>\n      {{/if}}\n      {{yield (hash aboveTable=(component \"blank-template\"))}}\n    </div>\n    <div\n      id=\"above-table-row-2\"\n      class=\"above-table-row-2 {{@aboveTableRow2Class}}\"\n    ></div>\n\n  </div>\n  {{#if @model}}\n    <div class=\"eit-top-pagination\">\n      {{#if this.paginationLinks}}\n        <EmberInteractiveTable::PaginationControls\n          @modelMetaData={{this.modelMetaData}}\n          @paginationLinks={{this.paginationLinks}}\n          @page={{mut @page}}\n          @size={{@size}}\n          class=\"margin-bottom-lg\"\n        />\n      {{/if}}\n      {{yield (hash afterTopPagination=(component \"blank-template\"))}}\n    </div>\n    <div\n      class=\"data-table-wrapper\n        {{if @trashed \'viewing-trashed-items\'}}\n        {{if @deletionPending \'deletion-pending\'}}\"\n    >\n      <div class=\"data-table-wrapper-inner\">\n        {{yield (hash tableComponent=(component \"blank-template\"))}}\n      </div>\n    </div>\n    {{#if this.paginationLinks}}\n      <EmberInteractiveTable::PaginationControls\n        @modelMetaData={{this.modelMetaData}}\n        @paginationLinks={{this.paginationLinks}}\n        @page={{mut @page}}\n        @size={{@size}}\n        class=\"margin-top-lg\"\n      />\n    {{/if}}\n  {{else}}\n    <EmberSundries::InPageAlert @type=\"info\" data-test-id=\"no-items-notice\">\n      {{#if this.filtersActive}}\n        Your selected filters don\'t match any\n        {{this.pluralRecordName}}. Please update your filter settings.\n      {{else}}\n        You have no\n        {{this.pluralRecordName}}\n        to display yet.\n      {{/if}}\n    </EmberSundries::InPageAlert>\n  {{/if}}\n</div>");

class DataTableContainer extends Component {
  static {
    g(this.prototype, "trashed", [tracked]);
  }
  #trashed = (i(this, "trashed"), undefined);
  static {
    g(this.prototype, "pageTitle", [tracked]);
  }
  #pageTitle = (i(this, "pageTitle"), undefined);
  static {
    g(this.prototype, "model", [tracked]);
  }
  #model = (i(this, "model"), undefined);
  get title() {
    return this.args.trashed ? `${this.args.pageTitle} | TRASH` : this.args.pageTitle;
  }
  get itemsSelected() {
    return this.args.model.filter(item => item.selected === true).length > 0;
  }
  get deleteRestoreButtonMode() {
    return this.args.trashed ? 'restore' : 'delete';
  }
  get deleteRestoreButtonIcon() {
    return this.args.trashed ? 'svg-repo/icons/icon-processing' : 'svg-repo/icons/icon-trash';
  }
  get toggleTrashViewButtonText() {
    return this.args.trashed ? 'Exit Trash' : 'View Trash';
  }
  get toggleTrashViewButtonIcon() {
    return this.args.trashed ? 'svg-repo/icons/icon-cross' : 'svg-repo/icons/icon-trash';
  }
  get modelMetaData() {
    return this.args.model.meta;
  }
  get paginationLinks() {
    if (isEmptyObject(this.args.model.links || {})) {
      return;
    }
    return this.args.model.links;
  }
  get filteredDataLength() {
    return this.modelMetaData.filtered_data_length;
  }
  get filtersActive() {
    return this.filteredDataLength < this.modelMetaData.total_data_length;
  }
  get showFiltersForm() {
    if (this.modelMetaData.total_data_length > 0 && (this.filtersActive === true || this.filtersActive === false)) {
      return true;
    }
    return false;
  }
  get singleRecordName() {
    return this.args.singleRecordName || 'item';
  }
  get pluralRecordName() {
    return this.args.pluralRecordName || `${this.singleRecordName}s`;
  }
  selectAll(prop, value) {
    this.args.model.forEach(item => {
      item[prop] = value;
    });
  }
  static {
    n(this.prototype, "selectAll", [action]);
  }
  deleteOrRestoreSelected(mode) {
    var selectedItems = this.args.model.filter(item => item.selected === true);
    var counter = {
      success: 0,
      fail: 0
    };
    selectedItems.forEach(function (item) {
      var deleted = mode === 'delete' ? true : false;
      item.deleted = deleted;
      item.toggleDeleted().then(() => {
        counter.success++;
        if (counter.success + counter.fail === selectedItems.length) {
          this.deleteOrRestoreResponseMessage(mode, counter, selectedItems.length);
          this.args.refreshModel();
        }
      }).catch(() => {
        counter.fail++;
        if (counter.success + counter.fail === selectedItems.length) {
          this.deleteOrRestoreResponseMessage(mode, counter, selectedItems.length);
          this.args.refreshModel();
        }
      });
    });
  }
  static {
    n(this.prototype, "deleteOrRestoreSelected", [action]);
  }
  deleteOrRestoreResponseMessage(mode, counter, selectedItemsLength) {
    var flashType;
    var flashMessage;
    if (counter.success === selectedItemsLength) {
      flashType = 'success';
      flashMessage = `${counter.success} items ${mode}d.`;
    } else if (counter.fail === selectedItemsLength) {
      flashType = 'danger';
      flashMessage = `Deletion failed. Please try again.`;
    } else {
      flashType = 'warning';
      flashMessage = `${counter.success} items were ${mode}d, but ${counter.fail} deletions failed.`;
    }
    this.args.flashMessages.add({
      type: flashType,
      message: flashMessage
    });
  }
  static {
    n(this.prototype, "deleteOrRestoreResponseMessage", [action]);
  }
  onCheckboxClick(value, event, item) {
    if (event.shiftKey) {
      if (this.lastSelectedItem) {
        const items = this.args.model.items;
        const selectedIndex = items.indexOf(item);
        const lastSelectedIndex = items.indexOf(this.args.lastSelectedItem);
        let itemsToSelect = [];
        if (lastSelectedIndex > selectedIndex) {
          itemsToSelect = items.slice(selectedIndex, lastSelectedIndex);
        } else {
          itemsToSelect = items.slice(lastSelectedIndex, selectedIndex);
        }
        itemsToSelect.forEach(item => {
          item.selected = true;
        });
      }
    }
    this.lastSelectedItem = item;
  }
  static {
    n(this.prototype, "onCheckboxClick", [action]);
  }
}
setComponentTemplate(TEMPLATE, DataTableContainer);

export { DataTableContainer as default };
//# sourceMappingURL=data-table-container.js.map
