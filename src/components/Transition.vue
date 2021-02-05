<template>
<section id="Transition">
  <video autoplay muted loop id="desktop">
  <source src="../assets/img/transition.mp4" type="video/mp4">
  <source src="../assets/img/transition.ogg" type="video/ogg">
  </video>

  <video autoplay muted loop id="mobile">
  <source src="../assets/img/transition__mobile.mp4" type="video/mp4">
  <source src="../assets/img/transition__mobile.ogg" type="video/ogg">
  </video>

</section>
</template>

<style scoped>
#Transition{z-index:1000;position:absolute;top:0px;}
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
