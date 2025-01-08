import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import isEmptyObject from '../../utils/is-empty-object';

export default class DataTableContainer extends Component {
  @tracked trashed;
  @tracked pageTitle;
  @tracked model;

  get title() {
    return this.args.trashed
      ? `${this.args.pageTitle} | TRASH`
      : this.args.pageTitle;
  }

  get itemsSelected() {
    return this.args.model.filter((item) => item.selected === true).length > 0;
  }

  get deleteRestoreButtonMode() {
    return this.args.trashed ? 'restore' : 'delete';
  }

  get deleteRestoreButtonIcon() {
    return this.args.trashed
      ? 'svg-repo/icons/icon-processing'
      : 'svg-repo/icons/icon-trash';
  }

  get toggleTrashViewButtonText() {
    return this.args.trashed ? 'Exit Trash' : 'View Trash';
  }

  get toggleTrashViewButtonIcon() {
    return this.args.trashed
      ? 'svg-repo/icons/icon-cross'
      : 'svg-repo/icons/icon-trash';
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
    if (
      this.modelMetaData.total_data_length > 0 &&
      (this.filtersActive === true || this.filtersActive === false)
    ) {
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

  @action
  selectAll(prop, value) {
    this.args.model.forEach((item) => {
      item[prop] = value;
    });
  }

  @action
  deleteOrRestoreSelected(mode) {
    var selectedItems = this.args.model.filter(
      (item) => item.selected === true,
    );
    var counter = {
      success: 0,
      fail: 0,
    };
    selectedItems.forEach(function (item) {
      var deleted = mode === 'delete' ? true : false;
      item.deleted = deleted;
      item
        .toggleDeleted()
        .then(() => {
          counter.success++;
          if (counter.success + counter.fail === selectedItems.length) {
            this.deleteOrRestoreResponseMessage(
              mode,
              counter,
              selectedItems.length,
            );
            this.args.refreshModel();
          }
        })
        .catch(() => {
          counter.fail++;
          if (counter.success + counter.fail === selectedItems.length) {
            this.deleteOrRestoreResponseMessage(
              mode,
              counter,
              selectedItems.length,
            );
            this.args.refreshModel();
          }
        });
    });
  }

  @action
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
      message: flashMessage,
    });
  }

  @action
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
        itemsToSelect.forEach((item) => {
          item.selected = true;
        });
      }
    }
    this.lastSelectedItem = item;
  }
}
