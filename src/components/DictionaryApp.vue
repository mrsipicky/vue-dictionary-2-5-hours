<template>
  <div class="b-dictionary-app">
    <VirtualList
      v-model="items"
      :dataKey="'_id'"
      :handle="'.b-virtual-list__item-dragger'"
      :keeps="25"
      :size="48"
      class="b-virtual-list__wrapper"
      wrapClass="b-virtual-list"
      itemClass="b-virtual-list__item"
      ghostClass="b-virtual-list__item--ghost"
      chosenClass="b-virtual-list__item--chosen"
      @drop="handleDrop"
    >
      <template v-slot:item="{ record, index }">
        <button type="button" class="b-virtual-list__item-delete" @click="deleteItem(index)">X</button>
        <span class="b-virtual-list__item-name">{{ record.name }}</span>
        <span class="b-virtual-list__item-dragger">drag here</span>
      </template>
    </VirtualList>

    <DictionaryForm @wordAdded="handleNewWord"></DictionaryForm>
  </div>

  <div v-if="isLoading" class="b-virtual-list__state b-virtual-list__state--loading">
    Loading...
  </div>

  <div v-if="error" class="b-virtual-list__state b-virtual-list__state--error">
    Error: {{ error }}
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import axios from 'axios';
import VirtualList from 'vue-virtual-draglist';
import DictionaryForm from './DictionaryForm.vue';

interface RecordType {
  _id: string;
  positionIndex: number;
  name: string;
}

interface DropParams {
  changed: boolean;
}

export default defineComponent({
  components: {
    DictionaryForm,
    VirtualList
  },
  setup() {
    const fetchedDictionaryList = ref<RecordType[]>([]);
    const isLoading = ref(false);
    const error = ref<string | null>(null);
    const items = ref<RecordType[]>([]);

    const fetchData = async (): Promise<void> => {
      isLoading.value = true;
      try {
        const response = await axios.get('https://run.mocky.io/v3/ff87ea66-ed96-4233-be35-80121315209b');
        fetchedDictionaryList.value = response.data;
        items.value = fetchedDictionaryList.value;
        saveVirtualListItems();
      } catch (err: unknown) {
        if (err instanceof Error) {
          error.value = err.message;
        } else {
          error.value = 'Failed to fetch data';
        }
      } finally {
        isLoading.value = false;
      }
    };

    const handleLoadData = () => {
      const savedItems = localStorage.getItem('virtualListItems');
      if (savedItems) {
        items.value = JSON.parse(savedItems);
      } else {
        fetchData();
      }
    };

    const saveVirtualListItems = () => {
      localStorage.setItem('virtualListItems', JSON.stringify(items.value));
    };

    const handleNewWord = (newWord: string) => {
      const newRecord = {
        _id: Date.now().toString(),
        positionIndex: items.value.length,
        name: newWord
      };
      items.value.unshift(newRecord);
      saveVirtualListItems();
    };

    const deleteItem = (index: number) => {
      items.value.splice(index, 1); // Remove the item at the given index
      saveVirtualListItems();
    };

    const handleDrop = (params: DropParams) => {
      if (params.changed) {
        saveVirtualListItems();
      }
    };

    onMounted(handleLoadData);

    return {
      isLoading,
      error,
      items,
      handleNewWord,
      handleDrop,
      deleteItem
    };
  }
});
</script>

<style lang="scss">
.b-dictionary-app {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
}

.b-virtual-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  max-width: 430px;

  &__wrapper {
    display: flex;
    justify-content: center;
    height: 700px;
    overflow-y: auto;
  }

  &__item {
    width: 100%;
    padding: 15px 25px;
    background-color: #f0f0f0;
    border-radius: 15px;
    box-shadow: 1px 2px 0px #2d8491;
    display: flex;
    gap: 10px;
    justify-content: space-between;

    &--chosen {
      box-shadow: 0 0 30px 0 #ffffff;
    }

    &--ghost {
      background-color: #f0f0f0;
      opacity: 0.5;
    }
  }

  &__item-delete {
    padding: 5px;
    border: 0;
    color: red;
    cursor: pointer;
  }

  &__item-dragger {
    color: black;
    font-weight: bold;
    text-transform: uppercase;
    cursor: grab;
  }

  &__state {
    text-align: center;

    &--loading {
      color: #bada55;
    }

    &--error {
      color: red;
    }
  }
}
</style>

