<script>
import ListHeader from '@/components/list-header.vue';
import axios from 'axios';
import API from '@/store/config';
import CatalogList from './catalog-list.vue';
import { parseList } from '../../store/modules/action-utils';

export default {
  name: 'Recommendations',
  props: {
    isAuthenticated: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      errorMessage: '',
      message: '',
      title: 'Our Recommendation',
      eventId: undefined,
      recommendations: undefined,
    };
  },
  components: {
    ListHeader,
    CatalogList,
  },
  async created() {
    await this.getRecommendation();
  },
  methods: {
    async getRecommendation() {
      let path = `${API}/recommendation`;
      if (this.eventId !== undefined) {
        path += `?eventid=${this.eventId}`;
      }
      this.errorMessage = undefined;
      this.eventId = undefined;
      this.recommendations = undefined;
      try {
        const response = await axios.get(path);
        if (response.status === 200) {
          this.recommendations = parseList(response);
          this.eventId = this.recommendations[0].eventId;
        }
      } catch (error) {
        this.errorMessage = 'Unauthorized';
      }
    },
  },
};
</script>

<template>
  <div class="content-container">
    <ListHeader :title="title" @refresh="getRecommendation">
    </ListHeader>
    <div class="columns is-multiline is-variable">
      <div class="column" v-if="recommendations">
        <CatalogList
          :icecreams="recommendations"
          :errorMessage="errorMessage"
          :isAuthenticated="isAuthenticated"
        ></CatalogList>
      </div>
    </div>
  </div>
</template>
