<template> 
  <Navbar/>
  <div class="container"> 
    <router-view /> 
    <Toast /> 
  </div>
</template>

<script>  
import Navbar from '@/components/Navbar'; 
import Toast from '@/components/Toast.vue'; 
export default {
  components: { 
    Navbar,
    Toast
  }
}
</script> 

