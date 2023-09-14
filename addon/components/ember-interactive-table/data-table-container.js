import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import isEmptyObject from 'ember-interactive-table/utils/is-empty-object';

export default class DataTableContainer extends Component {
  @tracked trashed;
  @tracked pageTitle;
  @tracked model;

  get title() {
    return this.trashed ? `${this.pageTitle} | TRASH` : this.pageTitle;
  }

  get itemsSelected() {
    return this.model.filter((item) => item.selected === true).length > 0;
  }

  get deleteRestoreButtonMode() {
    return this.trashed ? 'restore' : 'delete';
  }

  get deleteRestoreButtonIcon() {
    return this.trashed
      ? 'svg-repo/icons/icon-processing'
      : 'svg-repo/icons/icon-trash';
  }

  get toggleTrashViewButtonText() {
    return this.trashed ? 'Exit Trash' : 'View Trash';
  }

  get toggleTrashViewButtonIcon() {
    return this.trashed
      ? 'svg-repo/icons/icon-cross'
      : 'svg-repo/icons/icon-trash';
  }

  get modelMetaData() {
    return this.model.meta;
  }

  get paginationLinks() {
    if (isEmptyObject(this.model.links)) {
      return;
    }
    return this.model.links;
  }

  get filtersActive() {
    return (
      this.model.meta.filtered_data_length < this.model.meta.total_data_length
    );
  }

  @action
  didInsert() {
    if (!this.singleRecordName) {
      this.singleRecordName = 'item';
    }
    if (!this.pluralRecordName) {
      this.pluralRecordName = `${this.singleRecordName}s`;
    }
  }

  @action
  selectAll(prop, value) {
    this.model.forEach((item) => {
      item[prop] = value;
    });
  }

  @action
  deleteOrRestoreSelected(mode) {
    var selectedItems = this.model.filter((item) => item.selected === true);
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
            this.send(
              'deleteOrRestoreResponseMessage',
              mode,
              counter,
              selectedItems.length
            );
            this.refreshModel();
          }
        })
        .catch(() => {
          counter.fail++;
          if (counter.success + counter.fail === selectedItems.length) {
            this.send(
              'deleteOrRestoreResponseMessage',
              mode,
              counter,
              selectedItems.length
            );
            this.refreshModel();
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
    this.flashMessages.add({
      type: flashType,
      message: flashMessage,
    });
  }

  @action
  onCheckboxClick(value, event, item) {
    if (event.shiftKey) {
      if (this.lastSelectedItem) {
        const items = this.model.items;
        const selectedIndex = items.indexOf(item);
        const lastSelectedIndex = items.indexOf(this.lastSelectedItem);
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
