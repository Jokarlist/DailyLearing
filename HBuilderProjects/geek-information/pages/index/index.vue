<template>
	<view class="container">
		<text>left</text>
		<text>center</text>
		<text>right</text>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {},
	methods: {}
};
</script>

<style scoped lang="scss">
.container {
	@include flex(row, space-around);
}
</style>
