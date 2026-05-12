<template>
  <nav class="navbar">
    <router-link to="/" class="brand">Booked</router-link>

    <div class="menu">
      <router-link to="/">Home</router-link>
      <router-link to="/penginapan">Penginapan</router-link>
      <router-link to="/booking">Booking</router-link>
      <router-link to="/admin">Admin</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, #2c3e50, #4ca1af);
  padding: 15px 30px;
}

.brand {
  font-size: 22px;
  font-weight: 700;
  color: white;
  text-decoration: none;
  letter-spacing: 1px;
}

.menu {
  display: flex;
  gap: 20px;
}

.menu a {
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 6px;
  transition: 0.2s;
}

.menu a:hover {
  color: white;
  background: rgba(255,255,255,0.15);
}

.menu a.router-link-active {
  color: white;
  background: rgba(255,255,255,0.2);
}
</style>
