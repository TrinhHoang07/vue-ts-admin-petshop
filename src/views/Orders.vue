<script setup lang="ts">
import routesConfig from '@/config/routes';
import PrivateRoute from '@/components/PrivateRoute.vue';
import { ApiService } from '@/axios/ApiService';
import type { Orders as IOrders } from '@/models/Orders';
import { computed, onMounted, ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import Loading from '@/components/Loading.vue';

const apiService = new ApiService();
const isOpen = ref<boolean>(false);
const isLoading = ref<boolean>(true);
const toast = useToast();
const statusC = ref<{
    status: string;
    id: number;
}>();
const data = ref<IOrders[]>([]);
const dataSource = ref<IOrders[]>([]);

onMounted(() => {
    apiService.orders
        .getOrders()
        .then((res) => {
            if (res.message === 'success') {
                data.value = res.data as IOrders[];
            }
        })
        .catch((err) => console.error(err));
});

watch(data, () => {
    if (data.value.length > 0) {
        isLoading.value = false;

        dataSource.value = data.value.map((item: IOrders) => {
            return {
                key: item.orders_id,
                customer_address: item.customer_address,
                customer_avatar_path: item.customer_avatar_path,
                customer_birth_date: item.customer_birth_date,
                customer_gender: item.customer_gender,
                customer_name: item.customer_name,
                customer_phone_number: item.customer_phone_number,
                orders_created_at: item.orders_created_at,
                orders_customer_id: item.orders_customer_id,
                orders_id: item.orders_id,
                orders_price: item.orders_price,
                orders_product_id: item.orders_product_id,
                orders_quantity: item.orders_quantity,
                orders_status: item.orders_status,
                product_color: item.product_color,
                product_description: item.product_description,
                product_name: item.product_name,
                product_preview_url: item.product_preview_url,
                product_price: item.product_price,
                product_rate: item.product_rate,
                product_type: item.product_type,
            };
        });
    }
});

const columns = computed(() => [
    {
        title: 'ID',
        dataIndex: 'key',
        key: 'stt',
    },
    {
        title: 'User order',
        dataIndex: 'customer_name',
        key: 'customer_name',
    },
    {
        title: 'Name',
        dataIndex: 'product_name',
        key: 'name',
    },
    {
        title: 'Create order',
        dataIndex: 'orders_created_at',
        key: 'orders_created_at',
    },
    {
        title: 'Quantity',
        dataIndex: 'orders_quantity',
        key: 'quantity',
    },
    {
        title: 'Price',
        dataIndex: 'product_price',
        key: 'price',
    },
    {
        title: 'Total Amount',
        dataIndex: 'orders_price',
        key: 'total_amount',
    },
    {
        title: 'Status',
        dataIndex: 'orders_status',
        key: 'orders_status',
    },
    {
        title: 'Actions',
        key: 'actions',
    },
]);
</script>

<template>
    <PrivateRoute :redirect="routesConfig.orders">
        <div class="orders">
            <a-modal :open="isOpen" @cancel="isOpen = false" title="Trạng thái đơn hàng">
                <template #footer>
                    <a-button
                        type="primary"
                        @click="() => {
                                apiService.orders
                                    .updateStatus((statusC?.id as number).toString(), {
                                        status: statusC?.status,
                                    })
                                    .then((res) => {
                                        if (res.message === 'success') {
                                            toast.add({
                                              severity: 'success',
                                              summary: 'Thành công',
                                              detail: 'Cập nhật trạng thái đơn hàng thành công',
                                              life: 3000,
                                            })

                                            ////// testttttt => no OK
                                            apiService.orders
                                                .getOrders()
                                                .then((res) => {
                                                    if (res.message === 'success') {
                                                        data = (res.data as IOrders[]);
                                                        isOpen = false
                                                    }
                                                })
                                                .catch((err) => console.error(err));
                                        } else {
                                            toast.add({
                                              severity: 'error',
                                              summary: 'Thất bại',
                                              detail: 'Cập nhật trạng thái đơn hàng thất bại',
                                              life: 3000,
                                            })
                                            isOpen = false
                                        }
                                    })
                                    .catch((err) => console.error(err));
                            }"
                    >
                        Ok
                    </a-button>
                    <a-button type="default" @click="isOpen = false"> Hủy </a-button>
                </template>
                <a-select
                    :value="statusC?.status"
                    :style="{ width: '100%' }"
                    @change="(value: string) => {
                        statusC = {
                            id: statusC?.id ?? 0,
                            status: value
                        }
                    }"
                    :options="[
                        { value: 'processing', label: 'Processing' },
                        { value: 'shipping', label: 'Shipping' },
                        { value: 'finished', label: 'Finished' },
                    ]"
                ></a-select>
            </a-modal>

            <div class="contents">
                <div v-if="isLoading" class="wrapper-loading">
                    <Loading />
                </div>
                <a-table v-else :columns="columns" :data-source="dataSource">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'actions'">
                            <div :style="{ display: 'flex', alignItems: 'center' }">
                                <a-button
                                    :style="{ marginRight: '8px' }"
                                    @click="
                                        () => {
                                            statusC = {
                                                id: record.orders_id,
                                                status: record.orders_status,
                                            };
                                            isOpen = true;
                                        }
                                    "
                                    type="primary"
                                >
                                    Sửa
                                </a-button>
                                <a-button
                                    @click="
                                        () =>
                                            toast.add({
                                                severity: 'error',
                                                summary: 'Thất bại',
                                                detail: 'Xóa đơn hàng thất bại',
                                                life: 3000,
                                            })
                                    "
                                    type="default"
                                >
                                    Hủy đơn
                                </a-button>
                            </div>
                        </template>
                    </template>
                </a-table>
            </div>
        </div>
    </PrivateRoute>
</template>
