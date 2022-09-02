<template>
	<view class="list-card-container">
		<!-- 基础模式 -->
		<view class="list-card base-mode" v-if="item.mode === 'base'" @click="go2ArticleDetail">
			<view class="list-card-img">
				<image :src="item.cover[0] || '/static/img/logo.jpeg'" mode="aspectFill"></image>
			</view>
			<view class="list-card-content">
				<view class="title">
					<text>{{ item.title }}</text>
					<Favor :article-id="item._id" />
				</view>
				<view class="desc">
					<view class="article-type">{{ item.classify }}</view>
					<view class="visit-times">{{ item.browse_count }}浏览</view>
				</view>
			</view>
		</view>
		<!-- 多图模式 -->
		<view
			class="list-card column-mode"
			v-else-if="item.mode === 'column'"
			@click="go2ArticleDetail"
		>
			<view class="list-card-top">
				<text>{{ item.title }}</text>
				<Favor :article-id="item._id" />
			</view>
			<view class="list-card-middle">
				<view class="list-card-img" v-for="(item, i) in item.cover.slice(0, 3)" :key="i">
					<image :src="`https://images.weserv.nl/?url=${item}`" mode="aspectFill"></image>
					<!-- <image :src="item" mode="aspectFill"></image> -->
				</view>
			</view>
			<view class="desc list-card-bottom">
				<view class="article-type">{{ item.classify }}</view>
				<view class="visit-times">{{ item.browse_count }}浏览</view>
			</view>
		</view>
		<!-- 大图模式 -->
		<view class="list-card image-mode" v-else @click="go2ArticleDetail">
			<view class="list-card-top">
				<view class="list-card-img"> <image :src="item.cover[0]" mode="aspectFill"></image> </view>
			</view>
			<view class="list-card-middle">
				<text>{{ item.title }}</text>
				<Favor :article-id="item._id" />
			</view>
			<view class="desc list-card-bottom">
				<view class="article-type">{{ item.classify }}</view>
				<view class="visit-times">{{ item.browse_count }}浏览</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "ListCard",
	props: {
		item: {
			type: Object,
			default: () => ({ mode: "base" }),
		},
	},
	methods: {
		go2ArticleDetail() {
			const {
				_id,
				title,
				author,
				create_time,
				thumbs_up_count,
				browse_count,
			} = this.item;

			const basicInfo = { _id, title, author, create_time, thumbs_up_count, browse_count };
			uni.navigateTo({
				url: `/pages/articleDetail/articleDetail?basicInfo=${JSON.stringify(basicInfo)}`,
			});
		},
	},
};
</script>

<style lang="scss">
.list-card {
	@include flex();
	padding: 20rpx;
	margin: 20rpx;
	border-radius: 10rpx;
	box-shadow: 0 0 20rpx 2rpx rgba(0, 0, 0, 0.1);

	.list-card-img {
		width: 120rpx;
		height: 120rpx;
		border-radius: 10rpx;
		overflow: hidden;
		flex-shrink: 0;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.list-card-content {
		@include flex(column);
		padding-left: 20rpx;
		width: 100%;

		.title {
			@include flex();
			width: 100%;
			align-items: flex-start;
			font-size: 28rpx;
			color: #333333;
			font-weight: 400;
			line-height: 1.2;

			text {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
		}
	}

	/* 三种卡片类型的公共样式 */
	.desc {
		@include flex();
		width: 100%;
		margin-top: 20rpx;
		font-size: 24rpx;

		.article-type {
			padding: 0 10rpx;
			margin-right: 10rpx;
			color: $base-color;
			border-radius: 30rpx;
			border: 1px solid $base-color;
		}

		.visit-times {
			color: #999;
			line-height: 1.5;
		}
	}

	/* 多图模式及大图模式的公共样式 */
	.list-card-top,
	.list-card-middle,
	.list-card-bottom {
		@include flex();
		width: 100%;
	}

	/* 多图模式 */
	&.column-mode {
		flex-direction: column;

		.list-card-top {
			text {
				font-size: 28rpx;
				color: #333333;
			}
		}

		.list-card-middle {
			margin: 20rpx 0;
			.list-card-img {
				width: 32%;
				height: 140rpx;
				border-radius: 10rpx;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	/* 大图模式 */
	&.image-mode {
		flex-direction: column;

		.list-card-img {
			width: 100%;
			height: 200rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.list-card-middle {
			margin-top: 10rpx;

			text {
				font-size: 28rpx;
				color: #333333;
			}
		}
	}
}
</style>
