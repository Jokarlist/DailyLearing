<template>
	<view class="favor-container" @click.stop="_changeFavorStaus">
		<uni-icons color="#ff6600" :type="isFavor ? 'heart-filled' : 'heart'" size="20"></uni-icons>
	</view>
</template>

<script>
export default {
	name: "Favor",
	props: {
		articleId: {
			type: String,
			required: true,
		},
	},
	data() {
		return {};
	},
	methods: {
		async _changeFavorStaus() {
			// TODOS 判断用户是否登录，若登录则改变当前的收藏状态，否则跳转至用户登录页
			try {
				await this.checkLoginStatus();
				const { msg, updatedUserInfo } = await this.$http.updateArticleFavorStatus({
					articleId: this.articleId,
					userId: this.userInfo._id,
				});

				uni.showToast({
					title: msg,
					icon: "none",
				});

				this.setUserInfo({ ...this.userInfo, ...updatedUserInfo });
			} catch (e) {
				uni.navigateTo({
					url: "/pages/user/login/login",
				});
			}
			/* if (this.checkLoginStatus()) {
			} else {
			} */
		},
	},
	computed: {
		isFavor() {
			return this.userInfo && this.userInfo.article_likes_ids.includes(this.articleId);
		},
	},
};
</script>

<style lang="scss"></style>
