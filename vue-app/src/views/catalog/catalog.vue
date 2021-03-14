<script>
import { mapActions, mapGetters } from 'vuex';
import ListHeader from '@/components/list-header.vue';
import getUserInfo from '@/assets/js/userInfo';
import CatalogList from './catalog-list.vue';
import Recommendations from './recommendation.vue';

export default {
  name: 'Catalog',
  data() {
    return {
      errorMessage: '',
      message: '',
      routePath: '/catalog',
      title: 'Our Ice Creams',
      isAuthenticated: false,
    };
  },
  components: {
    ListHeader,
    CatalogList,
    Recommendations,
  },
  async created() {
    await this.getAuthInfo();
    await this.getCatalog();
  },
  computed: {
    ...mapGetters('catalog', { catalog: 'catalog' }),
  },
  methods: {
    ...mapActions('catalog', ['getCatalogAction']),
    async getCatalog() {
      this.errorMessage = undefined;
      try {
        await this.getCatalogAction();
      } catch (error) {
        this.errorMessage = 'Unauthorized';
      }
    },
    async getAuthInfo() {
      const userInfo = await getUserInfo();
      this.isAuthenticated = !(userInfo === undefined || userInfo === null);
    },
  },
};
</script>

<template>
  <div class="content-container">
    <Recommendations :isAuthenticated="isAuthenticated"></Recommendations>
    <ListHeader :title="title" @refresh="getCatalog" :routePath="routePath">
    </ListHeader>
    <div class="columns is-multiline is-variable">
      <div class="column" v-if="catalog">
        <CatalogList
          :icecreams="catalog"
          :errorMessage="errorMessage"
          :isAuthenticated="isAuthenticated"
        ></CatalogList>
      </div>
    </div>
  </div>
</template>
