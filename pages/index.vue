<script setup>
const name = ref("");
const platform = ref("");
var playersInfomation = ref([]);
var seasonInfomation = ref([]);
var noFoundPlayer = ref(false);
var searching = ref(false);

const handleSubmit = async () => {
  const playersName = name.value;
  const playersPlatform = platform.value;
  console.log("Name:", playersName);
  console.log("Platform:", playersPlatform);
  playersInfomation.value = [];
  seasonInfomation.value = [];

  searching.value = true;

  try {
    const config = useRuntimeConfig();
    const apex_API = config.public.APEX_TRACKER_API_KEY;
    const { data } = await useFetch(
      `https://api.mozambiquehe.re/bridge?player=${playersName}&platform=${playersPlatform}&auth=${apex_API}`
    );
    console.log("Fetched Data:", data.value);
    searching.value = false;
    if (data) {
      seasonInfomation.value = []; // Clear previous data
      for (const key in data.value.total) {
        const seasonRegex = /wins_season_(\d+)/;
        const match = key.match(seasonRegex);
        if (match) {
          seasonInfomation.value.push({
            season: `Season ${match[1]}`, // Season number
            name: data.value.total[key].name,
            value: data.value.total[key].value,
          });
        }
      }
      console.log("Season Information:", seasonInfomation.value);
    }

    const newPlayerInfo = {
      name: data.value.global.name,
      platform: data.value.global.platform,
      level: data.value.global.level,
      kills: data.value.total.kills,
      rankImg: data.value.global.rank.rankImg,
      legendPlayer: data.value.legends.selected.ImgAssets.icon,
      legend: data.value.legends.selected.LegendName,
      seasonData: seasonInfomation.value,
      legendBanner: data.value.legends.selected.ImgAssets.banner
    };

    playersInfomation.value = [...playersInfomation.value, newPlayerInfo];
  } catch (error) {
    noFoundPlayer.value = true;
    setInterval(() => {
      noFoundPlayer.value = false;
    }, 5000);
    console.error("Error fetching data:", error);
  }
};
</script>

<template>
  <div
    class="bg-red-900 bg pt-2 h-full bg-[url('/assets/apex.jpeg')] items-center justify-center bg-no-repeat bg-center bg-cover"
  >
    <div class="bg-black w-2/4 mx-auto p-6">
      <h1 class="text-white text-center text-2xl font-bold mb-6">
        Enter Player's Details
      </h1>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-100"
            >Name</label
          >
          <input
            id="name"
            type="text"
            v-model="name"
            required
            class="mt-1 block w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div class="mb-4">
          <label for="platform" class="block text-sm font-medium text-gray-100"
            >Platform</label
          >
          <select
            id="platform"
            v-model="platform"
            required
            class="mt-1 block w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="" disabled>Select a platform</option>
            <option value="PC">PC</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Xbox">Xbox</option>
            <option value="Switch">Nintendo Switch</option>
          </select>
        </div>

        <button
          type="submit"
          class="w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
    <div
      v-if="noFoundPlayer"
      class="bg-pink-500 w-1/4 p-10 rounded-xl mt-5 flex justify-center mx-auto"
    >
      <h1>No player found</h1>
    </div>
    <div
      v-if="searching"
      class="bg-blue-600 w-1/4 p-10 rounded-xl mt-5 flex justify-center mx-auto"
    >
      <h1 class="animate-bounce">Searching Player...</h1>
    </div>
    <div v-if="playersInfomation.length">
      <playerinfo :playerInfo="playersInfomation[0]" />
    </div>
  </div>
</template>
