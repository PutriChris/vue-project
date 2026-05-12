<template>
  <div class="container">
    <div class="box">
      <h1>404</h1>
      <p>Halaman yang kamu cari tidak ditemukan.</p>
      <router-link to="/">← Kembali ke Home</router-link>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.box {
  text-align: center;
}

.box h1 {
  font-size: 80px;
  color: #2c3e50;
  margin: 0;
}

.box p {
  color: #666;
  font-size: 18px;
  margin: 10px 0 24px;
}

.box a {
  background: #2c3e50;
  color: white;
  padding: 10px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 15px;
  transition: 0.2s;
}

.box a:hover {
  background: #1a252f;
}
</style>
