<script lang="ts" setup>
import { ApiService } from '@/axios/ApiService';
import { Form, Input, InputNumber, Modal, Select } from 'ant-design-vue';
import { useToast } from 'primevue/usetoast';
import { onMounted, reactive, ref, watch } from 'vue';

type T_Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    data: any;
    setData: Function;
    dataArr: any;
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

watch(props.data, () => {
    (name.value = props?.data?.data.name),
        (description.value = props.data?.data.description),
        (preview_url.value = props.data?.data.preview_url),
        (color.value = props.data?.data.color),
        (price.value = props.data?.data.price),
        (quantity.value = props.data?.data.quantity),
        (sub_description.value = props.data?.data.sub_description),
        (type.value = props.data?.data.type);
});

const handleFinish = () => {
    const values = {
        name: name.value,
        description: description.value,
        sub_description: sub_description.value,
        preview_url: preview_url.value,
        color: color.value,
        price: price.value,
        quantity: quantity.value,
        type: type.value,
    };

    apiService.products
        .updateProduct(props.data.data.key.toString(), JSON.stringify(values))
        .then((res) => {
            if (res.message === 'success') {
                toast.add({
                    severity: 'success',
                    detail: 'Update products successfully',
                    life: 3000,
                });

                const index = props.dataArr.data.findIndex((item: any) => item.id === props.data.data.key);
                if (index !== -1) {
                    props.dataArr.data[index] = {
                        ...props.dataArr.data[index],
                        name: values.name,
                        preview_url: values.preview_url,
                        price: values.price,
                        quantity: values.quantity,
                        type: values.type,
                        color: values.color,
                        description: values.description,
                        sub_description: values.sub_description,
                    };
                }

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
        :open="props.open"
        title="Cập nhật sản phẩm"
        @cancel="() => props.setOpen(false)"
        width="50%"
        ok-text="Cập nhật"
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
