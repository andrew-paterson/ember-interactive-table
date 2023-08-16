import { layout as templateLayout, tagName } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../../templates/components/ember-interactive-table/data-table-container';
import isEmptyObject from 'ember-interactive-table/utils/is-empty-object';

@tagName('')
@templateLayout(layout)
export default class DataTableContainer extends Component {
  @computed('trashed', 'pageTitle')
  get title() {
    return this.trashed ? `${this.pageTitle} | TRASH` : this.pageTitle;
  }

  @computed('model.@each.selected')
  get itemsSelected() {
    return this.model.filter((item) => item.selected === true).length > 0;
  }

  @computed('trashed')
  get deleteRestoreButtonMode() {
    return this.trashed ? 'restore' : 'delete';
  }

  @computed('trashed')
  get deleteRestoreButtonIcon() {
    return this.trashed
      ? 'svg-repo/icons/icon-processing'
      : 'svg-repo/icons/icon-trash';
  }

  @computed('trashed')
  get toggleTrashViewButtonText() {
    return this.trashed ? 'Exit Trash' : 'View Trash';
  }

  @computed('trashed')
  get toggleTrashViewButtonIcon() {
    return this.trashed
      ? 'svg-repo/icons/icon-cross'
      : 'svg-repo/icons/icon-trash';
  }

  @computed('model', 'model.@each')
  get modelMetaData() {
    return this.model.meta;
  }

  @computed('model')
  get paginationLinks() {
    if (isEmptyObject(this.model.links)) {
      return;
    }
    return this.model.links;
  }

  @computed('model.meta')
  get filtersActive() {
    return (
      this.model.meta.filtered_data_length < this.model.meta.total_data_length
    );
  }

  @action
  didInsert() {
    if (!this.singleRecordName) {
      this.set('singleRecordName', 'item');
    }
    if (!this.pluralRecordName) {
      this.set('pluralRecordName', `${this.singleRecordName}s`);
    }
  }

  @action
  selectAll(prop, value) {
    this.model.setEach(prop, value);
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
      item.set('deleted', deleted);
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
        itemsToSelect.setEach('selected', true);
      }
    }
    this.set('lastSelectedItem', item);
  }
}
