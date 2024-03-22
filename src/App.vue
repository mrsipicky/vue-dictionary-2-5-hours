<template>
  <div id="app">
    <div class="b-lead-text">
      <h1>Dictionary App</h1>
      <ul class="b-list">
        <li>Typescript Vue 3 app, base type checking.</li>
        <li>Used SASS styling with BEM methodology.</li>
        <li>Axios request to <strong>10k items</strong> dictionary API</li>
        <li>used <strong>vue-virtual-draglist</strong> plugin (vue draggable + virtual scroll)</li>
        <li><strong>performance optimized</strong> - only 25 items are in DOM always, rest are loaded with virtual scroll</li>
        <li>you can <strong>drag&drop items</strong>, after reload they will remain in local storage (same order).</li>
        <li>there's super-basic form validation (cannot send empty, if so, there's error handling)</li>
      </ul>

      <strong>Next steps?</strong>
      <ul>
        <li>BEM and proper SASS structure (global styles, variables, REM units...)</li>
        <li>API CRUD requests to work with real data</li>
        <li>Separate data to store (VueX, Pinia)</li>
        <li>Unit tests - I WROTE 1 (<i>tests/unit/dictionaryapp.spec.ts)</i>, but environment is not setup correctly</li>
        <li>CI/CD pipeline....</li>
      </ul>
    </div>

    <DictionaryApp  />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DictionaryApp from './components/DictionaryApp.vue';

export default defineComponent({
  name: 'App',
  components: {
    DictionaryApp
  }
});
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 20px;
  background-color: #38a5b5;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.b-list {
  li {
    margin-bottom: 5px;
  }
}

.b-lead-text {
  color: white;
  text-shadow: 1px 1px 1px rgb(0 0 0 / 20%);
}
</style>
