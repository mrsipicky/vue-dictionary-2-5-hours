<template>
  <div class="b-dictionary-form">
    <input
        v-model="newWord"
        @keyup.enter="emitNewWord"
        :placeholder="inputPlaceholder"
        class="b-dictionary-form__input"
        :class="{'b-dictionary-form__input--error': showError}"
    />
    <button
        @click="emitNewWord"
        class="b-dictionary-form__btn"
    >
      Add Word
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, computed, watch } from 'vue';

const newWord = ref('');
const emit = defineEmits(['wordAdded']);
const showError = ref(false);

// Dynamic placeholder text based on showError
const inputPlaceholder = computed(() => showError.value ? 'Pls, fill out at least 1 character :)' : 'Add a new word');

// Check if word is not empty and not longer than 20 characters
const isInvalid = computed(() => newWord.value.trim().length === 0 || newWord.value.trim().length > 20);

// Watch the newWord value to revalidate on change
watch(newWord, (newValue) => {
  if (newValue.trim().length > 0 && newValue.trim().length <= 20) {
    showError.value = false;
  }
});

const emitNewWord = () => {
  if (!isInvalid.value) {
    emit('wordAdded', newWord.value.trim());
    newWord.value = '';
    showError.value = false;
  } else {
    showError.value = true;
  }
};
</script>

<style lang="scss" scoped>
.b-dictionary-form {
  width: 100%;
  display: flex;

  &__input,
  &__btn {
    padding: 15px 20px;
    box-shadow: 1px 2px 0px #2d8491;
  }

  &__input {
    flex: 1 1 0;
    border-radius: 15px 0 0 15px;
    border: 0;

    &:focus {
      outline: none;
    }

    &--error {
      box-shadow: 1px 2px 0px red;
    }
  }

  &__btn {
    flex: 0 0 auto;
    border-radius: 0 15px 15px 0;
    border: 0;
    background-color: #9d9d9d;
    color: white;
    font-weight: bold;
    cursor: pointer;

    &:hover,
    &:focus {
      background-color: #2d8491;
      outline: none;
    }
  }
}
</style>