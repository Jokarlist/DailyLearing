<template>
	<view class="favor-container" @click.stop="_changeFavorStaus">
		<uni-icons color="#ff6600" :type="isFavor ? 'heart-filled' : 'heart'" :size="size"></uni-icons>
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
		size: {
			type: String,
			default: "20",
		},
	},
	data() {
		return {};
	},
	methods: {
		async _changeFavorStaus() {
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
				uni.$emit("update-follow-article");
			} catch (e) {
				uni.navigateTo({
					url: "/pages/user/login/login",
				});
			}
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
