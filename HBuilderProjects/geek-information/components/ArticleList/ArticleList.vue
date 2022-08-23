<template>
	<view class="article-list-container">
		<swiper class="swiper-container" :current="activeIdx" @change="onSwiperChange">
			<swiper-item v-for="n in labelListLength">
				<view class="swiper-item">{{ n - 1 + 10 ** 10 }}</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	name: "ArticleList",
	props: {
		labelListLength: {
			type: Number,
			default: 0,
		},
		activeIdx: {
			type: Number,
			default: 0,
		},
	},
	methods: {
		onSwiperChange({ detail: { current } }) {
			this.$emit("active-idx-change", current);
		},
	},
};
</script>

<style lang="scss" scoped>
.swiper-container {
	height: 100%;
	touch-action: none;
}
</style>
