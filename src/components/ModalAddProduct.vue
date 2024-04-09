<script lang="ts" setup>
import { Form, Input, InputNumber, Modal, Select } from 'ant-design-vue';
import { onMounted, reactive, ref, watch } from 'vue';


type T_Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    setData?: Function;
};

const props = defineProps<T_Props>()

const name = ref<string>('')
const description = ref<string>('')
const sub_description = ref<string>('')
const preview_url = ref<string>('')
const type = ref<string>('')
const color = ref<string>('kk')
const price = ref<number>()
const quantity = ref<number>()

</script>

<template>
    <Modal
            :open="props.open"
            title="Thêm sản phẩm"
            @cancel="() => props.setOpen(false)"
            width='50%'
            ok-text="Thêm"
            @ok=""
            forceRender
        >
            <div class="form-container">
                <Form
                    layout="vertical"
                    autoComplete="off"
                    name="update_product"
                    @finish=""
                >
                    <Form.Item
                        name="name"
                        label="Tên sản phẩm"
                        
                    >
                        <Input v-model:value="name" />
                    </Form.Item>
                    <Form.Item  name="description" label="Mô tả sản phẩm">
                        <Input.TextArea v-model:value="description"/>
                    </Form.Item>
                    <Form.Item  name="sub_description" label="Mô tả bổ sung cho sản phẩm">
                        <Input.TextArea v-model:value="sub_description"/>
                    </Form.Item>
                    <Form.Item
                        name="preview_url"
                        label="Ảnh sản phẩm"
                        
                    >
                        <Input v-model:value="preview_url"/>
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Giá sản phẩm"
                        
                    >
                        <InputNumber v-model:value="price"/>
                    </Form.Item>
                    <Form.Item
                        name="quantity"
                        label="Số lượng sản phẩm"
                        
                    >
                        <InputNumber v-model:value="quantity"/>
                    </Form.Item>
                    <Form.Item
                        name="type"
                        label="Loại sản phẩm"
                    >
                        <Select v-model:value="type">
                            <Select.Option value="dog">Dog</Select.Option>
                            <Select.Option value="cat">Cat</Select.Option>
                            <Select.Option value="food">Food</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item  name="color" label="Màu (Thú cưng)">
                        <Input v-model:value="color"/>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
</template>