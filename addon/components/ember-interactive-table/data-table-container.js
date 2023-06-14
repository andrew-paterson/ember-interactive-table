import Component from '@ember/component';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import layout from '../../templates/components/ember-interactive-table/data-table-container';
import isEmptyObject from 'ember-interactive-table/utils/is-empty-object';

export default Component.extend({
  tagName: '',
  layout,

  title: computed('trashed', 'pageTitle', function () {
    return this.trashed ? `${this.pageTitle} | TRASH` : this.pageTitle;
  }),

  itemsSelected: computed('model.@each.selected', function () {
    return this.model.filter((item) => item.selected === true).length > 0;
  }),

  deleteRestoreButtonMode: computed('trashed', function () {
    return this.trashed ? 'restore' : 'delete';
  }),

  deleteRestoreButtonIcon: computed('trashed', function () {
    return this.trashed
      ? 'svg-repo/icons/icon-processing'
      : 'svg-repo/icons/icon-trash';
  }),

  toggleTrashViewButtonText: computed('trashed', function () {
    return this.trashed ? 'Exit Trash' : 'View Trash';
  }),

  toggleTrashViewButtonIcon: computed('trashed', function () {
    return this.trashed
      ? 'svg-repo/icons/icon-cross'
      : 'svg-repo/icons/icon-trash';
  }),

  modelMetaData: reads('model.meta'),

  paginationLinks: computed('model.links', function () {
    if (isEmptyObject(this.model.links)) {
      return;
    }
    return this.model.links;
  }),

  filtersActive: computed('model.meta.{filtered_data_length,total_data_length}', function () {
    return (
      this.model.meta.filtered_data_length < this.model.meta.total_data_length
    );
  }),

  actions: {
    didInsert() {
      if (!this.singleRecordName) {
        this.set('singleRecordName', 'item');
      }
      if (!this.pluralRecordName) {
        this.set('pluralRecordName', `${this.singleRecordName}s`);
      }
    },

    selectAll: function (prop, value) {
      this.model.setEach(prop, value);
    },

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
    },

    deleteOrRestoreResponseMessage: function (
      mode,
      counter,
      selectedItemsLength
    ) {
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
    },

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
    },
  },
});
