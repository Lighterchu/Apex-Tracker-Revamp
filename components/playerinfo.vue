<template>
  <div class=" w-2/4 mx-auto w-4/5 mt-60 p-6 rounded-lg">
    <div class="bg-indigo-600 rounded-xl p-2">
      <div class="flex justify-center">
        <h1>Player Information</h1>
      </div>
      <div v-if="playerInfo" class="flex flex-wrap  rounded-xl [text-shadow:_0_1px_10px_rgb(0_0_0_/_100%)]" :style="backgroundStyle">
        <div class="p-2 text-gray-100  w-80">
          <p>Name: {{ playerInfo.name }}</p>
          <p>Platform: {{ playerInfo.platform }}</p>
          <p>Level: {{ playerInfo.level }}</p>
          <p>Kills: {{ playerInfo.kills.value }}</p>
        </div>
        <div class="flex w-40">
          <!-- <img :src="playerInfo.legendPlayer" alt="Legend Image" />
          <img :src="playerInfo.rankImg" alt="Rank Image" /> -->
        </div>
      </div>
      <div v-if="playerInfo.seasonData" class="text-black mt-6">
        <select name="season" v-model="selectedSeason">
          <option disabled value="">Pick a season?</option>
          <option
            v-for="season in playerInfo.seasonData"
            :key="season.value"
            :value="season.value"
          >
            {{ season.name }}
          </option>
        </select>
      </div>
      <div v-if="selectedSeasonObject" class="bg-black mt-6 p-2 rounded-xl [text-shadow:_0_1px_10px_rgb(0_0_0_/_100%)]" :style="backgroundStyle">
        <h3>{{ selectedSeasonObject.name }}</h3>
        <p>Wins {{ selectedSeasonObject.value }}</p>
        <!-- <img :src=playerInfo.legendBanner alt="" class="bg-fill"> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Define props
const props = defineProps({
  playerInfo: {
    type: Object,
    required: true,
  },
});

const backgroundStyle = computed(() => {
  return {
    backgroundImage: `url(${props.playerInfo?.legendBanner})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
});

// Define reactive properties
const selectedSeason = ref("");

// Computed property to get the selected season object
const selectedSeasonObject = computed(() => {
  return props.playerInfo?.seasonData.find(
    (season) => season.value == selectedSeason.value
  );
});
</script>

