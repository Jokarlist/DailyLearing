<template>
	<view class="author-list-container">
		<scroll-view scroll-y class="list-scroll">
			<view class="author-card" v-for="item in authorList" :key="item._id">
				<view class="author-image-container">
					<image :src="item.avatar" mode="aspectFill"></image>
				</view>
				<view class="author-info-container">
					<view class="author-info-title">{{ item.author_name }}</view>
					<view class="author-info-desc">
						<view class="author-info-job">{{ item.professional }}</view>
						<view class="author-info-popular">
							<view class="author-info-post">发帖 {{ item.article_ids.length }}</view>
							<view class="author-info-fans">粉丝 {{ item.fans_count }}</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	name: "AuthorList",
	props: {
		authorList: {
			type: Array,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.author-list-container {
	height: 100%;

	.list-scroll {
		height: 100%;

		.author-card {
			@include flex(row, flex-start);
			align-items: flex-start;
			padding: 20rpx 0;
			margin: 0 20rpx;
			border-bottom: 1px solid #f5f5f5;
			box-sizing: border-box;

			.author-image-container {
				width: 80rpx;
				height: 80rpx;
				overflow: hidden;
				flex-shrink: 0;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.author-info-container {
				@include flex(column);
				flex-grow: 1;
				padding-left: 20rpx;
				height: 80rpx;
				align-items: flex-start;

				.author-info-title {
					font-size: 28rpx;
					font-weight: bold;
					color: #333;
					line-height: 1.2;
				}

				.author-info-desc {
					@include flex();
					width: 100%;
					line-height: 1.5;
					font-size: 24rpx;
					color: #666;

					.author-info-popular {
						@include flex(row, flex-start);

						.author-info-post,
						.author-info-fans {
							margin-left: 20rpx;
						}
					}
				}
			}
		}
	}
}
</style>
