<template>
	<view class="article-list-container">
		<swiper class="swiper-container" :current="activeIdx" @change="onSwiperChange">
			<swiper-item v-for="(n, i) in labelListLength" :key="i">
				<view class="swiper-item">
					<ListItem />
				</view>
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
	// touch-action: none;
	
	.swiper-item {
		height: 100%;
		overflow: hidden;
	}
}
</style>
