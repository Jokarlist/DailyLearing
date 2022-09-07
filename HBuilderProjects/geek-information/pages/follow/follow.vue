<template>
	<view class="follow-container">
		<view class="follow-tab">
			<view class="follow-tab-box">
				<view class="follow-tab-item" :class="{ active: curIdx === 0 }" @click="curIdx = 0">
					文章
				</view>
				<view class="follow-tab-item" :class="{ active: curIdx === 1 }" @click="curIdx = 1">
					作者
				</view>
			</view>
		</view>
		<view class="follow-list">
			<swiper class="follow-list-swiper" :current="curIdx" @change="curIdx = $event.detail.current">
				<swiper-item>
					<ListItem
						:article-list="followArticleList"
						:is-show-load-more="isShowLoadMore"
						v-if="followArticleList.length"
					/>
					<view class="no-data" v-else>暂无收藏的文章</view>
				</swiper-item>
				<swiper-item>
					<AuthorList :author-list="followAuthorList" v-if="followAuthorList.length" />
					<view class="no-data" v-else>暂无关注的作者</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
export default {
	onLoad() {
		// #ifdef MP-WEIXIN
		if (!this.userInfo) {
			uni.redirectTo({
				url: "/pages/user/login/login",
			});

			return;
		}
		// #endif
		uni.$on("update-follow-article", this._getFollowArticle);
		uni.$on("update-follow-author", this._getFollowAuthor);
		this._getFollowArticle();
		this._getFollowAuthor();
	},
	onUnload() {
		uni.$off();
	},
	data() {
		return {
			followArticleList: [],
			followAuthorList: [],
			curIdx: 0,
			isShowLoadMore: false,
		};
	},
	methods: {
		async _getFollowArticle() {
			const followArticleList = await this.$http.getFollowArticle({
				userId: this.userInfo._id,
			});

			this.followArticleList = followArticleList;
		},
		async _getFollowAuthor() {
			const followAuthorList = await this.$http.getFollowAuthor({
				userId: this.userInfo._id,
			});

			this.followAuthorList = followAuthorList;
		},
	},
};
</script>

<style lang="scss" scoped>
page {
	height: 100%;
	display: flex;
}

.follow-container {
	display: flex;
	flex: 1;
	flex-direction: column;
	box-sizing: border-box;

	.follow-tab {
		@include flex(row, center);
		height: 100rpx;
		padding: 0 40rpx;
		border-bottom: 1px solid #f5f5f5;
		box-sizing: content-box;

		.follow-tab-box {
			display: flex;
			height: 60rpx;
			width: 100%;
			border-radius: 10rpx;
			border: 1px solid $base-color;

			.follow-tab-item {
				@include flex(row, center);
				color: #666;
				font-size: 28rpx;
				flex-grow: 1;

				&:first-child {
					border-right: 1px solid $base-color;
				}

				&.active {
					color: $base-color;
				}
			}
		}
	}

	.follow-list {
		flex: 1;

		.follow-list-swiper {
			height: 100%;
		}
	}

	.no-data {
		height: 400rpx;
		width: 100%;
		line-height: 400rpx;
		text-align: center;
		font-size: 24rpx;
		color: #666;
	}
}
</style>
