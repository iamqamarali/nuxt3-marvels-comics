<template>
    <NuxtLayout>
      <NuxtLoadingIndicator  
      :throttle="0"       
      color="#E62429"
      ></NuxtLoadingIndicator>

      <NuxtPage ></NuxtPage>

    </NuxtLayout>
</template>


<style lang="scss">
@import './assets/scss/app.scss';

</style>
