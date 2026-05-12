<template>
  <div class="container">
    <h1>Welcome to Booked Penginapan</h1>
    <p class="subtitle">Cari penginapan terbaik untuk liburan kamu 🏝️</p>

    <div class="search-bar">
      <input
        v-model="search"
        type="text"
        placeholder="🔍 Cari nama penginapan..."
      />
    </div>

    <p v-if="loading">Loading data...</p>

    <p v-else-if="error" style="color: red;">{{ error }}</p>

    <template v-else>
      <div class="list" v-if="filteredProperties.length">
        <PropertyCard
          v-for="item in filteredProperties"
          :key="item.id"
          :id="item.id"
          :name="item.name"
          :price="item.price"
          :description="item.description"
          :image="item.image"
        />
      </div>
      <p v-else class="empty">Tidak ada penginapan yang cocok dengan "{{ search }}".</p>
    </template>
  </div>
</template>

<script>
import PropertyCard from "../components/PropertyCard.vue"
import { store } from "../Store"

export default {
  components: { PropertyCard },

  data() {
    return {
      search: "",
      loading: true,
      error: null
    }
  },

  computed: {
    filteredProperties() {
      return store.properties.filter(p =>
        p.name.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  },

  mounted() {
    if (store.properties.length > 0) {
      this.loading = false
      return
    }
    fetch("/properties.json")
      .then(res => {
        if (!res.ok) throw new Error("Gagal mengambil data")
        return res.json()
      })
      .then(data => { store.properties = data })
      .catch(err => { this.error = err.message })
      .finally(() => { this.loading = false })
  }
}
</script>

<style scoped>
.container {
  padding: 30px;
}

.subtitle {
  color: #555;
  margin-bottom: 20px;
}

.search-bar {
  margin-bottom: 24px;
}

.search-bar input {
  width: 100%;
  max-width: 400px;
  padding: 10px 16px;
  border: 1px solid #ccc;
  border-radius: 24px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.search-bar input:focus {
  border-color: #4ca1af;
}

.list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 10px;
}

.empty {
  color: #888;
  margin-top: 20px;
  font-size: 15px;
}
</style>
