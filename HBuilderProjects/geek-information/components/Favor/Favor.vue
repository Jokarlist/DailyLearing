<template>
	<view class="favor-container" @click.stop="_changeFavorStaus">
		<uni-icons color="#ff6600" type="heart" size="20"></uni-icons>
	</view>
</template>

<script>
export default {
	name: "Favor",
	data() {
		return {};
	},
	methods: {
		async _changeFavorStaus() {
			// TODOS 判断用户是否登录，若登录则改变当前的收藏状态，否则跳转至用户登录页
			uni.navigateTo({
				url: "/pages/user/login/login",
			});
		},
	},
};
</script>

<style lang="scss"></style>
