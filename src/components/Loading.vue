<template>
<section id="Loading">
  <!--<img src="../assets/img/loading.gif" alt="this slowpoke moves" width=250 id="desktop"/>
  <img src="../assets/img/loading__mobile2.gif" alt="this slowpoke moves" width=250 id="mobile"/>
  -->
  <video autoplay muted id="desktop">
  <source src="../assets/img/loading.mp4" type="video/mp4">
  <source src="../assets/img/loading.ogg" type="video/ogg">
  </video>

  <video autoplay muted id="mobile">
  <source src="../assets/img/loading__mobile2.mp4" type="video/mp4">
  <source src="../assets/img/loading__mobile2.ogg" type="video/ogg">
  </video>

</section>
</template>

<style scoped>

img{
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1;
}

video{
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1;
  object-fit: fill;
}

#mobile{display:none;}
@media only screen and (max-width: 700px) {
#mobile{display:block!important;}
#desktop{display:none!important;}
}
</style>
