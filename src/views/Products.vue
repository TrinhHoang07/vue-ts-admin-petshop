<script setup lang="ts">
import routesConfig from '@/config/routes';
import PrivateRoute from '@/components/PrivateRoute.vue';
import type { Products as I_Products } from '@/models/Products';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { Button, Modal, Typography } from 'ant-design-vue';
import Loading from '@/components/Loading.vue';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import IconPet from '@/assets/icons/IconPet.vue';
import FaDog from '@/assets/icons/FaDog.vue';
import FaCat from '@/assets/icons/FaCat.vue';
import FaFood from '@/assets/icons/FaFood.vue';
import { ApiService } from '@/axios/ApiService';
import ModalUpdateProduct from '@/components/ModalUpdateProduct.vue';
import ModalAddProduct from '@/components/ModalAddProduct.vue';

export type _T_FormProducts = {
    key?: number;
    name?: string;
    description?: string;
    sub_description?: string;
    preview_url?: string;
    price?: number;
    quantity?: number;
    type?: string;
    color?: string;
};

const activeHeader = ref<string>('all');
const isModalAdd = reactive<{
    val: boolean;
}>({
    val: false,
});
const isModalUpdate = ref<boolean>(false);
const isLoading = ref<boolean>(true);
const description = ref<string>('');

const data = reactive<{
    data: I_Products[];
}>({
    data: [],
});
const dataSource = ref<_T_FormProducts[]>([]);
const dataUpdate = reactive<{
    data: _T_FormProducts;
}>({
    data: {},
});
const toast = useToast();
const confirm = useConfirm();
const apiService = new ApiService();

const setIsModalUpdate = (data: boolean) => {
    isModalUpdate.value = data;
};

const setIsModalAdd = (data: boolean) => {
    isModalAdd.val = data;
};

const setDataArr = (val: I_Products) => {
    data.data.push(val);
};

const handleFilterData = (data: I_Products[], type?: string): _T_FormProducts[] => {
    if (type) {
        return data
            .filter((item: I_Products) => item.type === type)
            .map((item: I_Products) => ({
                key: item.id,
                preview_url: item.preview_url,
                name: item.name,
                description: item.description,
                type: item.type,
                price: item.price,
                quantity: item.quantity,
                color: item.color,
                sub_description: item.sub_description,
            }));
    }

    return data.map((item: I_Products) => ({
        key: item.id,
        name: item.name,
        description: item.description,
        preview_url: item.preview_url,
        type: item.type,
        price: item.price,
        quantity: item.quantity,
        color: item.color,
        sub_description: item.sub_description,
    }));
};

onMounted(() => {
    apiService.products
        .getProducts()
        .then((res: { message: string; statusCode: number; data: I_Products[] }) => {
            console.log(data);

            data.data = res.data;
        })
        .catch((err) => console.log(err));
});

watch(data, () => {
    dataSource.value = handleFilterData(data.data);
});

watch(dataSource, () => {
    if (dataSource.value.length > 0) {
        isLoading.value = false;
    }
});

watch([activeHeader, data], () => {
    switch (activeHeader.value) {
        case 'dog':
            dataSource.value = handleFilterData(data.data, 'dog');
            break;
        case 'cat':
            dataSource.value = handleFilterData(data.data, 'cat');
            break;
        case 'food':
            dataSource.value = handleFilterData(data.data, 'food');
            break;
        case 'accessory':
            dataSource.value = handleFilterData(data.data, 'accessory');
            break;
        default:
            dataSource.value = handleFilterData(data.data);
    }
});

const columns = computed(() => [
    {
        title: 'ID',
        dataIndex: 'key',
        key: 'stt',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Color',
        dataIndex: 'color',
        key: 'color',
    },
    {
        title: 'Actions',
        key: 'actions',
    },
]);
</script>

<template>
    <PrivateRoute :redirect="routesConfig.products">
        <div class="wrapper-pro">
            <div class="header-pro">
                <div class="list-options">
                    <div
                        @click="activeHeader = 'all'"
                        :style="{
                            color: '#fff',
                            opacity: activeHeader === 'all' ? 1 : 0.75,
                        }"
                        class="item-option"
                    >
                        <span>
                            <IconPet />
                        </span>
                        <p>Tất cả</p>
                    </div>
                    <div
                        @click="activeHeader = 'dog'"
                        :style="{
                            color: '#fff',
                            opacity: activeHeader === 'dog' ? 1 : 0.55,
                        }"
                        class="item-option"
                    >
                        <span>
                            <FaDog />
                        </span>
                        <p>Chó cưng</p>
                    </div>
                    <div
                        @click="activeHeader = 'cat'"
                        :style="{
                            color: '#fff',
                            opacity: activeHeader === 'cat' ? 1 : 0.55,
                        }"
                        class="item-option"
                    >
                        <span>
                            <FaCat />
                        </span>
                        <p>Mèo cưng</p>
                    </div>
                    <div
                        @click="activeHeader = 'food'"
                        :style="{
                            color: '#fff',
                            opacity: activeHeader === 'food' ? 1 : 0.55,
                        }"
                        class="item-option"
                    >
                        <span>
                            <FaFood />
                        </span>
                        <p>Đồ ăn</p>
                    </div>
                    <div
                        @click="activeHeader = 'accessory'"
                        :style="{
                            color: '#fff',
                            opacity: activeHeader === 'accessory' ? 1 : 0.55,
                        }"
                        class="item-option"
                    >
                        <span>
                            <FaFood />
                        </span>
                        <p>Phụ kiện</p>
                    </div>
                </div>
                <div class="actions">
                    <Button @click="isModalAdd.val = true" class="add-products" type="primary" size="large">
                        Thêm Sản Phẩm
                    </Button>
                    <ModalAddProduct :open="isModalAdd" :setOpen="setIsModalAdd" :set-data="setDataArr" />
                </div>
            </div>
            <div class="contents">
                <div v-if="isLoading" class="wrapper-loading">
                    <Loading />
                </div>
                <a-table v-else :columns="columns" :dataSource="dataSource">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'actions'">
                            <Button
                                @click="
                                    () => {
                                        isModalUpdate = true;
                                        dataUpdate.data = {
                                            key: record.key,
                                            name: record.name,
                                            preview_url: record.preview_url,
                                            price: record.price,
                                            quantity: record.quantity,
                                            type: record.type,
                                            color: record.color,
                                            description: record.description,
                                            sub_description: record.sub_description,
                                        };
                                    }
                                "
                                type="primary"
                            >
                                Sửa
                            </Button>
                            <Button
                                @click="
                                    () => {
                                        confirm.require({
                                            header: 'Thông báo',
                                            message: 'Bạn có chắc chắn muốn xóa không?',
                                            acceptLabel: 'Xóa',
                                            rejectLabel: 'Hủy',
                                            accept: () => {
                                                console.log('id delete: ', record.key);

                                                apiService.products
                                                    .deleteProduct(record.key.toString())
                                                    .then((res) => {
                                                        console.log(res);

                                                        if (res.message === 'success') {
                                                            toast.add({
                                                                severity: 'success',
                                                                detail: 'Xoa thanh cong',
                                                                life: 3000,
                                                            });

                                                            data.data = data.data.filter(
                                                                (item) => item.id !== record.key,
                                                            );
                                                        }
                                                    })
                                                    .catch((err) => console.error(err));
                                            },
                                        });
                                    }
                                "
                                :style="{ marginLeft: '8px' }"
                                type="default"
                            >
                                Xóa
                            </Button>
                        </template>
                        <template v-else-if="column.key === 'description'">
                            <Typography.Text
                                @click="
                                    () => {
                                        if (record) {
                                            description = record.description;
                                        } else {
                                            toast.add({
                                                severity: 'error',
                                                detail: 'Chưa có mô tả',
                                                life: 3000,
                                            });
                                        }
                                    }
                                "
                                class="detail-description"
                            >
                                Chi tiết
                            </Typography.Text>
                        </template>
                    </template>
                </a-table>
                <Modal :open="!!description" @cancel="description = ''" title="Chi tiết sản phẩm">
                    <template #footer>
                        <Button type="primary" @click="description = ''"> Ok </Button>
                    </template>
                    <Typography.Paragraph>{{ description }}</Typography.Paragraph>
                </Modal>
                <ModalUpdateProduct
                    :open="isModalUpdate"
                    :setOpen="setIsModalUpdate"
                    :data="dataUpdate"
                    :setData="setDataArr"
                    :dataArr="data"
                />
            </div>
        </div>
    </PrivateRoute>
</template>

<style lang="scss" scoped>
.wrapper-pro {
    .header-pro {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 24px;
        background-color: #22222f;
        position: sticky;
        right: 0;
        left: 0;
        top: 0;
        z-index: 999;

        .list-options {
            display: flex;
            align-items: center;

            .item-option {
                display: flex;
                align-items: center;
                padding-right: 24px;
                transition: all 0.2s ease-out;
                color: var(--sidebar-color);

                &:hover {
                    color: #fff;
                    cursor: pointer;
                }

                span {
                    display: flex;
                }

                p {
                    margin-left: 8px;
                    padding: 0;
                }
            }
        }

        .actions {
            .add-products {
                border-radius: 4px;
                background-color: #857dcc;
                color: #fff;
            }
        }
    }

    .contents {
        min-height: calc(100vh - 80px - 72px - 48px);

        .wrapper-loading {
            min-height: calc(100vh - 80px - 72px - 48px);
            display: flex;
        }
        .detail-description {
            cursor: pointer;

            &:hover {
                text-decoration: underline;
            }
        }
    }
}

.form-container {
    height: calc(50vh);
    overflow-y: auto;
}
</style>
