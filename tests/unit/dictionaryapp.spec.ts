import { shallowMount } from '@vue/test-utils';
import DictionaryApp from '@/components/DictionaryApp.vue'; // adjust the path based on your file structure
import DictionaryForm from '@/components/DictionaryForm.vue';

// Mock child component
jest.mock('@/components/DictionaryForm.vue', () => ({
  name: 'DictionaryForm',
  emits: ['wordAdded'],
  render: () => {}
}));

describe('DictionaryApp.vue', () => {
  it('renders list items properly', async () => {
    const testItems = [
      { _id: '1', name: 'Word 0', positionIndex: 0 },
      { _id: '2', name: 'Word 1', positionIndex: 1 },
      { _id: '3', name: 'Word 2', positionIndex: 2 },
    ];

    const wrapper = shallowMount(DictionaryApp, {
      global: {
        stubs: { DictionaryForm }
      },
      data() {
        return { items: testItems }; // Override items data
      }
    });

    // Assert the rendered text of the component
    expect(wrapper.text()).toContain('Word 0');
    expect(wrapper.text()).toContain('Word 1');
    expect(wrapper.text()).toContain('Word 2');

    // Check if all items are rendered
    expect(wrapper.findAll('.b-virtual-list__item-name').length).toBe(testItems.length);
  });
});
