<template>
	<view class="list-item-container">
		<scroll-view scroll-y class="scroll-list">
			<ListCard v-for="(item, i) in itemList" :key="i" :item="item" />
		</scroll-view>
	</view>
</template>

<script>
export default {
	name: "ListItem",
	data() {
		return {
			itemList: [
				{ mode: "base" },
				{ mode: "column" },
				{ mode: "image" },
				{ mode: "base" },
				{ mode: "base" },
			],
		};
	},
};
</script>

<style lang="scss" scoped>
.list-item-container {
	height: 100%;

	.scroll-list {
		height: 100%;
		overflow: hidden;
		box-sizing: border-box;
	}
}
</style>
