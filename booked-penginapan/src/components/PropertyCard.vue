<template>
  <div class="card" @click="goToDetail">
    <img :src="image" alt="property" />

    <div class="content">
      <h3>{{ name }}</h3>
      <p class="desc">{{ description }}</p>
      <p class="price">{{ formatHarga(price) }} / malam</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "name", "price", "description", "image"],
  methods: {
    goToDetail() {
      this.$router.push(`/detail/${this.id}`)
    },
    formatHarga(num) {
      return "Rp " + Number(num).toLocaleString("id-ID")
    }
  }
}
</script>

<style scoped>
.card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.content {
  padding: 15px;
}

.content h3 {
  margin: 0 0 6px;
  font-size: 18px;
  color: #2c3e50;
}

.desc {
  font-size: 13px;
  color: #888;
  margin-bottom: 10px;
}

.price {
  font-weight: bold;
  color: #27ae60;
}
</style>
