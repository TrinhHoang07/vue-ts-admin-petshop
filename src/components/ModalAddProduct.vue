<script lang="ts" setup>
import { ApiService } from '@/axios/ApiService';
import { Form, Input, InputNumber, Modal, Select } from 'ant-design-vue';
import { useToast } from 'primevue/usetoast';
import { ref, watch } from 'vue';

type T_Props = {
    open: any;
    setOpen: (open: boolean) => void;
    setData: Function;
};

const props = defineProps<T_Props>();
const apiService = new ApiService();
const toast = useToast();

const name = ref<string>('');
const description = ref<string>('');
const sub_description = ref<string>('');
const preview_url = ref<string>('');
const type = ref<string>('');
const color = ref<string>('');
const price = ref<number>();
const quantity = ref<number>();

watch(props.open, () => {
    name.value = '';
    description.value = '';
    sub_description.value = '';
    preview_url.value = '';
    type.value = '';
    color.value = '';
    price.value = 0;
    quantity.value = 0;
});

const handleFinish = () => {
    const values = {
        name: name.value,
        description: description.value,
        sub_description: sub_description.value,
        preview_url: preview_url.value,
        type: type.value,
        color: color.value,
        price: price.value,
        quantity: quantity.value,
    };

    apiService.products
        .createProduct(values)
        .then((res) => {
            if (res.success) {
                toast.add({
                    severity: 'success',
                    detail: 'Product created successfully',
                    life: 3000,
                });
                props.setData({
                    id: res.data.id,
                    name: res.data.name,
                    preview_url: res.data.preview_url,
                    price: res.data.price,
                    quantity: res.data.quantity,
                    rate: res.data.rate,
                    type: res.data.type,
                    color: res.data.color,
                    description: res.data.description,
                    sub_description: res.data.sub_description,
                    created_at: res.data.created_at,
                });
                props.setOpen(false);
            }
        })
        .catch((_) => {
            toast.add({
                severity: 'error',
                detail: 'ERROR !!!',
                life: 3000,
            });
        });
};
</script>

<template>
    <Modal
        :open="props.open.val"
        title="Thêm sản phẩm"
        @cancel="() => props.setOpen(false)"
        width="50%"
        ok-text="Thêm"
        @ok="handleFinish"
        forceRender
    >
        <div class="form-container">
            <Form layout="vertical" autoComplete="off" name="update_product" @finish="">
                <Form.Item name="name" label="Tên sản phẩm">
                    <Input v-model:value="name" />
                </Form.Item>
                <Form.Item name="description" label="Mô tả sản phẩm">
                    <Input.TextArea v-model:value="description" />
                </Form.Item>
                <Form.Item name="sub_description" label="Mô tả bổ sung cho sản phẩm">
                    <Input.TextArea v-model:value="sub_description" />
                </Form.Item>
                <Form.Item name="preview_url" label="Ảnh sản phẩm">
                    <Input v-model:value="preview_url" />
                </Form.Item>
                <Form.Item name="price" label="Giá sản phẩm">
                    <InputNumber v-model:value="price" />
                </Form.Item>
                <Form.Item name="quantity" label="Số lượng sản phẩm">
                    <InputNumber v-model:value="quantity" />
                </Form.Item>
                <Form.Item name="type" label="Loại sản phẩm">
                    <Select v-model:value="type">
                        <Select.Option value="dog">Dog</Select.Option>
                        <Select.Option value="cat">Cat</Select.Option>
                        <Select.Option value="food">Food</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="color" label="Màu (Thú cưng)">
                    <Input v-model:value="color" />
                </Form.Item>
            </Form>
        </div>
    </Modal>
</template>
