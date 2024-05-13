<script setup lang="ts">
import routesConfig from '@/config/routes';
import logo from '@/assets/images/logo-petshop.jpg';
import { RouterLink, useRouter } from 'vue-router';
import FaUser from '@/assets/icons/FaUser.vue';
import FaCart from '@/assets/icons/FaCart.vue';
import MessageCir from '@/assets/icons/MessageCir.vue';
import HomeIcon from '@/assets/icons/HomeIcon.vue';
import IconPet from '@/assets/icons/IconPet.vue';
import Logout from '@/assets/icons/Logout.vue';
import { useConfirm } from 'primevue/useconfirm';
import { useSession } from '@/stores';
import { useToast } from 'primevue/usetoast';
const props = defineProps<{
    isOpen: boolean;
}>();

const confirm = useConfirm();
const toast = useToast();
const { setSessions } = useSession();

const router = useRouter();

const handleLogout = () => {
    confirm.require({
        header: 'Đăng xuất',
        message: 'Bạn có chắc chắn muốn đăng xuất không?',
        acceptLabel: 'Dồng ý',
        rejectLabel: 'Hủy bỏ',
        accept: () => {
            setSessions(false, {});

            toast.add({
                severity: 'success',
                detail: 'Đăng xuất thành công!',
                life: 3000,
            });

            setTimeout(() => {
                router.push(routesConfig.home);
            }, 300);
        },
    });
};
</script>

<template>
    <div
        class="wrapper-sidebar"
        :style="{
            width: props.isOpen ? '250px' : '0',
            opacity: props.isOpen ? '1' : '0',
        }"
    >
        <div class="wrapper-logo">
            <div class="logo">
                <img :src="logo" alt="logo petshop" />
            </div>
            <span>H07</span>
        </div>
        <div class="contents">
            <RouterLink :to="routesConfig.home" class="link-wrapper">
                <div class="container-link">
                    <HomeIcon />
                    <span>Trang chủ</span>
                </div>
            </RouterLink>
            <RouterLink :to="routesConfig.chat" class="link-wrapper">
                <div class="container-link">
                    <MessageCir />
                    <span>Chats</span>
                </div>
            </RouterLink>
            <RouterLink :to="routesConfig.products" class="link-wrapper">
                <div class="container-link">
                    <IconPet />
                    <span>Sản phẩm</span>
                </div>
            </RouterLink>
            <RouterLink :to="routesConfig.customers" class="link-wrapper">
                <div class="container-link">
                    <FaUser />
                    <span>Người dùng</span>
                </div>
            </RouterLink>
            <RouterLink :to="routesConfig.orders" class="link-wrapper">
                <div class="container-link">
                    <FaCart />
                    <span>Đơn hàng</span>
                </div>
            </RouterLink>
            <div @click="handleLogout" class="link-wrapper">
                <div class="container-link">
                    <Logout />
                    <span>Đăng xuất</span>
                </div>
            </div>
            <!-- <RouterLink to="" class="link-wrapper">
                    <div class="container-link">
                        <BoxArrowUp />
                        <span>Phân tích</span>
                    </div>
                </RouterLink>
                <RouterLink to="" class="link-wrapper">
                    <div class="container-link">
                        <Setting />
                        <span>Cài đặt</span>
                    </div>
                </RouterLink> -->
        </div>
    </div>
</template>

<style scoped lang="scss">
.wrapper-sidebar {
    background-color: #fff;
    padding: 16px 0;
    height: 100vh;
    overflow-y: auto;
    transition: all 0.25s ease-in-out;
    border-right: 1px solid #d7d7d7;
    flex-shrink: 0;
}

.wrapper-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;

    span {
        font-size: 2.2rem;
        margin-left: 16px;
        color: #333;
    }
}

.logo {
    width: 48px;
    height: 48px;
    display: flex;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 999px;
    }
}

.contents {
    .link-wrapper {
        text-decoration: none;
        color: #333;
    }

    .container-link {
        display: flex;
        align-items: center;
        padding: 16px 24px;

        &:hover {
            background-color: #f2f3f5;
        }

        span {
            margin-left: 8px;
            font-size: 1.6rem;
        }
    }
}
</style>
