<script setup lang="ts">
import routesConfig from '@/config/routes';
import PrivateRoute from '@/components/PrivateRoute.vue';
import ModalAddCustomer from '@/components/ModalAddCustomer.vue';
import FaCat from '@/assets/icons/FaCat.vue';
import Loading from '@/components/Loading.vue';
import { useToast } from 'primevue/usetoast';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import type { Customers } from '@/models/Products';
import { ApiService } from '@/axios/ApiService';
import { Button } from 'ant-design-vue';
import { useConfirm } from 'primevue/useconfirm';

const toast = useToast();
const confirm = useConfirm();
const dataSource = ref<Customers[]>([]);
const isLoading = ref<boolean>(true);
const isModalAdd = reactive<{
    val: boolean;
}>({
    val: false,
});
const apiService = new ApiService();

onMounted(() => {
    apiService.customers
        .getCustomers()
        .then((res) => {
            if (res.data) {
                dataSource.value = res.data.map((item: any) => ({
                    key: item.id,
                    id: item.id,
                    name: item.name,
                    gender: item.gender,
                    email: item.email,
                    address: item.address,
                    phoneNumber: item.phone_number,
                    birthDate: item.birth_date,
                    avatarPath: item.avatar_path,
                }));
            }
        })
        .catch((err) => console.log(err));
});

watch(dataSource, () => {
    if (dataSource.value.length > 0) {
        isLoading.value = false;
    }
});

const columns = computed(() => [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Phone Number',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
    {
        title: 'Actions',
        key: 'actions',
    },
]);

const setIsModalAdd = (data: boolean) => {
    isModalAdd.val = data;
};

const setDataSource = (data: Customers) => {
    dataSource.value.push(data);
};
</script>

<template>
    <PrivateRoute :redirect="routesConfig.customers">
        <div class="customers">
            <div class="header-cus">
                <div class="list-options">
                    <div class="item-option">
                        <span>
                            <FaCat />
                        </span>
                        <p>Tìm kiếm</p>
                    </div>
                </div>
                <div class="actions">
                    <Button @click="isModalAdd.val = true" class="add-products" type="primary" size="large">
                        Thêm Người Dùng
                    </Button>
                    <ModalAddCustomer :open="isModalAdd" :setOpen="setIsModalAdd" :setDataSource="setDataSource" />
                </div>
            </div>
            <div class="wrapper">
                <div v-if="isLoading" class="wrapper-loading">
                    <Loading />
                </div>
                <a-table v-else :columns="columns" :dataSource="dataSource">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'actions'">
                            <Button
                                @click="
                                    () => {
                                        confirm.require({
                                            header: 'Thông báo',
                                            message: 'Bạn có chắc chắn muốn xóa không?',
                                            acceptLabel: 'Xóa',
                                            rejectLabel: 'Hủy',
                                            accept: () => {
                                                console.log('id delete: ', record);
                                                console.log('data source: ', dataSource);

                                                apiService.customers
                                                    .deleteCustomer(record.id.toString())
                                                    .then((res) => {
                                                        if (res.message === 'success') {
                                                            toast.add({
                                                                severity: 'success',
                                                                detail: 'Customer deleted successfully',
                                                                life: 3000,
                                                            });
                                                            dataSource = dataSource.filter(
                                                                (data) => data.id !== record.id,
                                                            );
                                                        }
                                                    })
                                                    .catch((err) => console.log(err));
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
                    </template>
                </a-table>
            </div>
        </div>
    </PrivateRoute>
</template>

<style lang="scss" scoped>
.header-cus {
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

            &:hover {
                background-color: #776fb9;
            }
        }
    }
}

.form-container {
    height: calc(50vh);
    overflow-y: auto;
}

.wrapper {
    min-height: calc(100vh - 80px - 72px - 48px);

    .wrapper-loading {
        min-height: calc(100vh - 80px - 72px - 48px);
        display: flex;
    }
}
</style>
