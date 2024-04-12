<script lang="ts" setup>
import Facebook from '@/assets/icons/Facebook.vue';
import Github from '@/assets/icons/Github.vue';
import MenuClose from '@/assets/icons/MenuClose.vue';
import MenuOpen from '@/assets/icons/MenuOpen.vue';
import Notifications from '@/assets/icons/Notifications.vue';
import avatar from '@/assets/images/logo-petshop.jpg';
    const props = defineProps<{
        isOpen: boolean
        setIsOpen: (data: boolean) => void
    }>()
</script>

<template>
    <div class="wrapper-header">
            <div @click="() => props.setIsOpen(!props.isOpen)" class="close-sidebar">
                <MenuClose v-if="props.isOpen"/> 
                <MenuOpen v-else />
            </div>
            <div class="utils">
                <div class="item">
                    <Notifications />
                    <div class="count-noti">
                        <span>5</span>
                    </div>
                </div>
                <div class="item">
                    <Github />
                </div>
                <div class="item">
                    <Facebook />
                </div>
                <div class="item">
                    <div class="avatar">
                        <img :src="avatar" alt="avatar admin" />
                    </div>
                </div>
            </div>
        </div>
</template>

<style lang="scss" scoped>
    .wrapper-header {
    height: 80px;
    background-color: #fff;
    width: 100%;
    border-bottom: 1px solid #d7d7d7;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;

    .close-sidebar {
        color: #333;
        cursor: pointer;
    }

    .utils {
        display: flex;
        align-items: center;

        .item {
            margin-left: 16px;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            .count-noti {
                position: absolute;
                top: -6px;
                right: -4px;
                background-color: red;
                padding: 0 4px;
                font-size: 10px;
                border-radius: 999px;

                span {
                    color: #fff;
                }
            }

            &:hover {
                color: #fff;
                cursor: pointer;
            }
        }

        .avatar {
            display: flex;
            width: 36px;
            height: 36px;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 999px;
            }
        }
    }
}

</style>