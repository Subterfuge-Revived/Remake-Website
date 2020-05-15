import { expect } from "chai";
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Home from '../../src/pages/Home.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Home.vue", () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      state: {}
    });
  });

  it("Mounts", () => {
    const home = shallowMount(Home, {store, localVue });
    expect(home).to.not.be.null;
  });
});