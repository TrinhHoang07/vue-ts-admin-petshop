<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import SideBar from '@/components/SideBar.vue';
import { ref } from 'vue';

    
    const isOpen = ref<boolean>(true)
    const setIsOpen = (data: boolean) => {
        isOpen.value = data;
    }
</script>

<template>
    <main class="wrapper-layout">
            <SideBar :isOpen="isOpen" />
            <div class="container">
                <Header :setIsOpen="setIsOpen" :isOpen="isOpen" />
                <div class="wrapper-contents">
                    <div class="contents">
                        <router-view></router-view>
                    </div>
                    <Footer />
                </div>
            </div>
        </main>
</template>

<style lang="scss" scoped>
.wrapper-layout {
    display: flex;
}

.container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .wrapper-contents {
        flex: 1;
        max-height: calc(100vh - 80px);
        overflow-y: auto;
    }
}

</style>