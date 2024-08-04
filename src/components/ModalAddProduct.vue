<script lang="ts" setup>
import { ApiService } from '@/axios/ApiService';
import { Form, Input, InputNumber, Modal, Select } from 'ant-design-vue';
import { useToast } from 'primevue/usetoast';
import { reactive, ref, watch } from 'vue';

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
const price = ref<string>('');
const quantity = ref<string>('');

const errors = reactive<
    | {
          name: boolean;
          description: boolean;
          sub_description: boolean;
          preview_url: boolean;
          type: boolean;
          color: boolean;
          price: boolean;
          quantity: boolean;
      }
    | any
>({
    name: false,
    description: false,
    sub_description: false,
    preview_url: false,
    type: false,
    color: false,
    price: false,
    quantity: false,
});

watch(props.open, () => {
    name.value = '';
    description.value = '';
    sub_description.value = '';
    preview_url.value = '';
    type.value = '';
    color.value = '';
    price.value = '';
    quantity.value = '';
});

const REGEX_NUMBER = /^\d+$/;

const handleError = (name: string) => {
    errors[`${name}`] = true;
};

const handleClearError = (name: string) => {
    errors[`${name}`] = false;
};

const handleFinish = () => {
    if (!name.value.trim()) {
        handleError('name');
    } else {
        handleClearError('name');
    }
    if (!description.value.trim()) {
        handleError('description');
    } else {
        handleClearError('description');
    }
    if (!sub_description.value.trim()) {
        handleError('sub_description');
    } else {
        handleClearError('sub_description');
    }
    if (!preview_url.value.trim()) {
        handleError('preview_url');
    } else {
        handleClearError('preview_url');
    }
    if (!type.value.trim()) {
        handleError('type');
    } else {
        handleClearError('type');
    }
    if (!color.value.trim()) {
        handleError('color');
    } else {
        handleClearError('color');
    }
    if (!REGEX_NUMBER.test(price.value.trim())) {
        handleError('price');
    } else {
        handleClearError('price');
    }
    if (!REGEX_NUMBER.test(quantity.value.trim())) {
        handleError('quantity');
    } else {
        handleClearError('quantity');
    }

    if ((Object as any).entries(errors).every((item: any) => item[1] === false)) {
        const values = {
            name: name.value,
            description: description.value,
            sub_description: sub_description.value,
            preview_url: preview_url.value,
            type: type.value,
            color: +color.value,
            price: +price.value,
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
    }
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
                    <Input
                        @input="
                            () => {
                                handleClearError('name');
                            }
                        "
                        v-model:value="name"
                    />
                    <p v-if="errors.name" class="error-field">Trường này là bắt buộc!</p>
                </Form.Item>
                <Form.Item name="description" label="Mô tả sản phẩm">
                    <Input.TextArea
                        @input="
                            () => {
                                handleClearError('description');
                            }
                        "
                        v-model:value="description"
                    />
                    <p v-if="errors.description" class="error-field">Trường này là bắt buộc!</p>
                </Form.Item>
                <Form.Item name="sub_description" label="Mô tả bổ sung cho sản phẩm">
                    <Input.TextArea
                        @input="
                            () => {
                                handleClearError('sub_description');
                            }
                        "
                        v-model:value="sub_description"
                    />
                    <p v-if="errors.sub_description" class="error-field">Trường này là bắt buộc!</p>
                </Form.Item>
                <Form.Item name="preview_url" label="Ảnh sản phẩm">
                    <Input
                        @input="
                            () => {
                                handleClearError('preview_url');
                            }
                        "
                        v-model:value="preview_url"
                    />
                    <p v-if="errors.preview_url" class="error-field">Trường này là bắt buộc!</p>
                </Form.Item>
                <Form.Item name="price" label="Giá sản phẩm">
                    <Input
                        @input="
                            () => {
                                handleClearError('price');
                            }
                        "
                        v-model:value="price"
                    />
                    <p v-if="errors.price" class="error-field">Trường này phải là 1 số!</p>
                </Form.Item>
                <Form.Item name="quantity" label="Số lượng sản phẩm">
                    <Input
                        @input="
                            () => {
                                handleClearError('quantity');
                            }
                        "
                        v-model:value="quantity"
                    />
                    <p v-if="errors.quantity" class="error-field">Trường này phải là 1 số!</p>
                </Form.Item>
                <Form.Item name="type" label="Loại sản phẩm">
                    <Select
                        @change="
                            () => {
                                handleClearError('type');
                            }
                        "
                        v-model:value="type"
                    >
                        <Select.Option value="dog">Dog</Select.Option>
                        <Select.Option value="cat">Cat</Select.Option>
                        <Select.Option value="food">Food</Select.Option>
                    </Select>
                    <p v-if="errors.type" class="error-field">Trường này là bắt buộc!</p>
                </Form.Item>
                <Form.Item name="color" label="Màu (Thú cưng)">
                    <Input
                        @input="
                            () => {
                                handleClearError('color');
                            }
                        "
                        v-model:value="color"
                    />
                    <p v-if="errors.color" class="error-field">Trường này là bắt buộc!</p>
                </Form.Item>
            </Form>
        </div>
    </Modal>
</template>

<style lang="scss" scoped>
.error-field {
    color: red;
}
</style>
