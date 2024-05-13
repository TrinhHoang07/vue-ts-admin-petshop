<script lang="ts" setup>
import { Modal } from 'ant-design-vue';
import { Helper } from '../helper';
type T_Props = {
    setOpen: () => void;
    data: any;
};

const props = defineProps<T_Props>();
</script>

<template>
    <Modal
        :open="!Helper.isEmpty(props.data)"
        title="Thông tin sản phẩm"
        @cancel="() => props.setOpen()"
        width="50%"
        ok-text="Ok"
        @ok="() => props.setOpen()"
        forceRender
    >
        <div class="products-view-container">
            <div class="container-detail-product">
                <p>Tên sản phầm: {{ data?.product_name }}</p>
                <div class="preview-product-detail">
                    <img :src="data?.product_preview_url" alt="preview product" />
                </div>
                <p>Màu sắc: {{ data?.product_color }}</p>
                <p>Số lương: {{ data?.q_quantity }}</p>
                <p>Đơn giá: {{ Helper.formatVND.format(data?.q_price ?? 0) }}</p>
                <p>
                    Thành tiền:
                    {{ Helper.formatVND.format((data?.q_price ?? 1) * (data?.q_quantity ?? 1)) }}
                </p>
            </div>
        </div>
    </Modal>
</template>

<style scoped lang="scss">
.container-detail-product {
    p {
        font-size: 1.4rem;
        color: #333;
        margin: 4px 0;
    }

    .preview-product-detail {
        display: flex;
        margin: 12px 0;
        width: 350px;
        height: 260px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
        }
    }
}
</style>
