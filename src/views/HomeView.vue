<script setup lang="ts">
import routesConfig from '@/config/routes';
import PrivateRoute from '@/components/PrivateRoute.vue';
import ModalViewProduct from '@/components/ModalViewProduct.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation } from 'swiper/modules';
import { onMounted, ref, watch } from 'vue';
import CardHome from '@/components/CardHome.vue';
import 'swiper/css';
import 'swiper/css/pagination';
import { ApiService } from '@/axios/ApiService';

const apiService = new ApiService();
const optionsChart = ref<any>([]);
const dataHome = ref<any>({});
const detailProView = ref<any>({});

const handleCloseProView = () => {
    detailProView.value = {};
};

onMounted(() => {
    apiService.orders
        .getDataHome(2024)
        .then((res: any) => {
            if (res.message === 'success') {
                dataHome.value = res.data;
            }
        })
        .catch((err) => console.error(err));
});

watch(dataHome, () => {
    optionsChart.value = {
        animationEnabled: true,
        title: {
            text: 'Biểu đồ thống kê đơn hàng',
        },
        data: [
            {
                type: 'column',
                yValueFormatString: '##" đơn hàng"',
                dataPoints: [
                    { label: 'Tháng 1', y: dataHome?.value?.dataSetChart[0]?.data?.length },
                    { label: 'Tháng 2', y: dataHome?.value?.dataSetChart[1]?.data?.length },
                    { label: 'Tháng 3', y: dataHome?.value?.dataSetChart[2]?.data?.length },
                    { label: 'Tháng 4', y: dataHome?.value?.dataSetChart[3]?.data?.length },
                    { label: 'Tháng 5', y: dataHome?.value?.dataSetChart[4]?.data?.length },
                    { label: 'Tháng 6', y: dataHome?.value?.dataSetChart[5]?.data?.length },
                    { label: 'Tháng 7', y: dataHome?.value?.dataSetChart[6]?.data?.length },
                    { label: 'Tháng 8', y: dataHome?.value?.dataSetChart[7]?.data?.length },
                    { label: 'Tháng 9', y: dataHome?.value?.dataSetChart[8]?.data?.length },
                    { label: 'Tháng 10', y: dataHome?.value?.dataSetChart[9]?.data?.length },
                    { label: 'Tháng 11', y: dataHome?.value?.dataSetChart[10]?.data?.length },
                    { label: 'Tháng 12', y: dataHome?.value?.dataSetChart[11]?.data?.length },
                ],
            },
        ],
    };
});

const options = {
    animationEnabled: true,
    title: {
        text: 'Biểu đồ thống kê đơn hàng',
    },
    data: [
        {
            type: 'column',
            yValueFormatString: '##" đơn hàng"',
            dataPoints: optionsChart.value,
        },
    ],
};
</script>

<template>
    <PrivateRoute :redirect="routesConfig.home">
        <div class="wrapper-home">
            <div class="header-home">
                <CardHome
                    title="Đơn hàng hôm nay"
                    subTitle="Tiến triển tốt"
                    :value="dataHome?.totalOrdersaToday?.length"
                    type="orders"
                    redirect="/"
                />
                <CardHome
                    title="Tổng số người dùng"
                    subTitle="Đang tăng vọt"
                    :value="dataHome.totalCustomers"
                    type="users"
                    redirect="/customers"
                />
                <CardHome
                    title="Tổng số sản phẩm"
                    subTitle="Nhiều hàng mới về"
                    :value="dataHome.totalproducts"
                    type="products"
                    redirect="/products"
                />
                <CardHome
                    title="Tổng số đơn hàng"
                    subTitle="Tăng vọt"
                    :value="dataHome.totalOrders"
                    type="ordered"
                    redirect="/"
                />
            </div>
            <div class="popular-container">
                <ModalViewProduct :set-open="handleCloseProView" :data="detailProView" />
                <h3>sản phẩm bán chạy nhất tuần</h3>
                <div class="slider-popular-week">
                    <swiper
                        class="popupar-week-swiper"
                        :slides-per-view="3"
                        :autoplay="{
                            delay: 2000,
                            disableOnInteraction: false,
                        }"
                        :modules="[Navigation, Autoplay]"
                        :space-between="16"
                        navigation
                    >
                        <swiper-slide v-for="item in dataHome.dataSetWeek" :key="item.q_id">
                            <div class="item-popular" :style="{ backgroundImage: `url(${item.product_preview_url})` }">
                                <div class="info-popu">
                                    <h1>{{ item.product_name }}</h1>
                                    <button @click="detailProView = item">Xem thêm</button>
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
            <div class="chart-statistical">
                <!-- <canvas ref="chartRef"></canvas> -->

                <CanvasJSChart v-if="dataHome.dataSetChart" :options="optionsChart" />
            </div>
        </div>
    </PrivateRoute>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/Home.scss';
@import '@/assets/sass/customHome.scss';
</style>
