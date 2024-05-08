<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light px-2 justify-content-start">
    <router-link class="navbar-brand" :to="{ name: 'Home' }">
      Kossie Coder
    </router-link> 
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link" :to="{ name: 'Todos' }">
          Todos
        </router-link>
      </li>
    </ul> 
  </nav>
</template>

<script>
export default {
  name: 'vue-navbar'
}
</script>

<style>

</style>