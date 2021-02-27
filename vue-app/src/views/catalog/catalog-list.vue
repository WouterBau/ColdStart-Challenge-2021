<script>
import CardContent from '@/components/card-content.vue';
import getUserInfo from '@/assets/js/userInfo';

export default {
  name: 'CatalogList',
  props: {
    icecreams: {
      type: Array,
      default: () => [],
    },
    errorMessage: {
      type: String,
      default: () => '',
    },
  },
  components: {
    CardContent,
  },
  data() {
    return {
      isAuthenticated: false,
    };
  },
  async created() {
    await this.getAuthInfo();
  },
  methods: {
    async getAuthInfo() {
      const userInfo = await getUserInfo();
      this.isAuthenticated = !(userInfo === undefined || userInfo === null);
    },
  },
};
</script>

<template>
  <div>
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <div v-if="!icecreams.length && !errorMessage">
      Loading data ...
    </div>
    <div class="container">
      <div
        v-for="(icecream) in icecreams"
        :key="icecream.Id"
        role="presentation"
      >
        <div class="card">
          <CardContent
            :name="icecream.Name"
            :description="icecream.Description"
            :imageurl="icecream.ImageUrl"
            :showOrderButton="isAuthenticated"
          />
        </div>
      </div>
    </div>
  </div>
</template>
