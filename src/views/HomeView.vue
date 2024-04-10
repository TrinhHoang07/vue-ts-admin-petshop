<script setup lang="ts">
import routesConfig from '@/config/routes';
import PrivateRoute from '@/components/PrivateRoute.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation } from 'swiper/modules';
import { onMounted, ref } from 'vue';
import CardHome from '@/components/CardHome.vue';
import Chart from 'chart.js/auto';
import 'swiper/css';
import 'swiper/css/pagination';

const chartRef = ref<any>();

onMounted(() => {
    new Chart(chartRef.value, {
        type: 'line',
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    text: 'Biểu đồ thống kê',
                    display: true,
                    font: {
                        size: 24,
                        weight: 'bold',
                    },
                },
            },
            interaction: {
                intersect: false,
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                    },
                },
                y: {
                    display: true,
                    title: {
                        display: false,
                        text: 'Value',
                    },
                    suggestedMin: -10,
                    suggestedMax: 200,
                },
            },
        },
        data: {
            labels: [
                'Tháng 1',
                'Tháng 2',
                'Tháng 3',
                'Tháng 4',
                'Tháng 5',
                'Tháng 6',
                'Tháng 7',
                'Tháng 8',
                'Tháng 9',
                'Tháng 10',
                'Tháng 11',
                'Tháng 12',
            ],
            datasets: [
                {
                    label: 'Số lượng đơn hàng (đã bán)',
                    data: [0, 20, 20, 60, 60, 120, 100, 180, 120, 125, 105, 110, 170],
                    borderColor: 'red',
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,
                },
                {
                    label: 'Số lượng người dùng',
                    data: [0, 10, 35, 55, 68, 83, 95, 110, 119, 125, 155, 200, 210],
                    borderColor: 'blue',
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,
                },
                {
                    label: 'Số sản phẩm đang có',
                    data: [0, 5, 10, 18, 20, 29, 50, 62, 88, 111, 121, 150, 180],
                    borderColor: 'yellow',
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,
                },
            ],
        },
    });
});
</script>

<template>
    <PrivateRoute :redirect="routesConfig.home">
        <div class="wrapper-home">
            <div class="header-home">
                <CardHome title="Đơn hàng hôm nay" subTitle="Tiến triển tốt" :value="99" type="orders" redirect="/" />
                <CardHome
                    title="Tổng số người dùng"
                    subTitle="Đang tăng vọt"
                    :value="5799"
                    type="users"
                    redirect="/customers"
                />
                <CardHome
                    title="Tổng số sản phẩm"
                    subTitle="Nhiều hàng mới về"
                    :value="388"
                    type="products"
                    redirect="/products"
                />
                <CardHome title="Tổng số đơn hàng" subTitle="Tăng vọt" :value="2179" type="ordered" redirect="/" />
            </div>
            <div class="popular-container">
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
                        <swiper-slide>
                            <div class="item-popular">
                                <div class="info-popu">
                                    <h1>Mèo Anh Lông Ngắn</h1>
                                    <button>Xem thêm</button>
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div class="item-popular">
                                <div class="info-popu">
                                    <h1>Chó Alaska</h1>
                                    <button>Xem thêm</button>
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div class="item-popular">
                                <div class="info-popu">
                                    <h1>Mèo Anh Lông Dài</h1>
                                    <button>Xem thêm</button>
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div class="item-popular">
                                <div class="info-popu">
                                    <h1>Chó Cỏ Việt Nam</h1>
                                    <button>Xem thêm</button>
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div class="item-popular">
                                <div class="info-popu">
                                    <h1>Hạt cỡ lớn cho</h1>
                                    <button>Xem thêm</button>
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
            <div class="chart-statistical">
                <canvas ref="chartRef"></canvas>
            </div>
        </div>
    </PrivateRoute>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/Home.scss';
@import '@/assets/sass/customHome.scss';
</style>
