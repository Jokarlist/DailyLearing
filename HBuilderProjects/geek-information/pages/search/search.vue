<template>
	<view class="search-container">
		<!-- 搜索导航组件 -->
		<NavBar
			:is-search="true"
			v-model="searchVal"
			@search-confirm="_searchConfirm"
			@search-input-null-str="searchInputNullStr"
		/>
		<!-- 搜索区域，没有进行搜索的操作 -->
		<view v-if="isShowSearchHistory" class="search-history-area">
			<view class="search-history-container">
				<!-- 头部 -->
				<view class="search-history-header">
					<text class="history-text">搜索历史</text>
					<text class="history-clear" @click="clearSearchHistory">清空</text>
				</view>
				<!-- 内容 -->
				<view v-if="searchHistory.length" class="search-history-content">
					<view
						class="history-content-item"
						v-for="(item, idx) in searchHistory"
						:key="item"
						@click="applySearchHistory(item)"
					>
						{{ item }}
					</view>
				</view>

				<view v-else class="no-data">当前没有搜索历史</view>
			</view>
		</view>
		<!-- 搜索内容展示，开始进行搜索的操作 -->
		<view v-else class="search-list-container">
			<ListItem
				v-if="searchList.length"
				:articleList="searchList"
				:is-show-load-more="isShowLoadMore"
			/>
			<view v-else class="no-data">没有搜索到相关数据</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
	data() {
		return {
			searchVal: "",
			searchList: [],
			isShowLoadMore: false,
			isShowSearchHistory: true,
		};
	},
	computed: { ...mapState("search", ["searchHistory"]) },
	methods: {
		...mapMutations("search", ["setSearchHistory", "clearSearchHistory"]),
		async _searchConfirm(searchVal) {
			this.isShowSearchHistory = false;
			if (!searchVal) {
				this.isShowSearchHistory = true;
				this.searchList.length = 0;
				return;
			}

			const { articleList } = await this.$http.getArticleByKeyword({ searchVal });
			this.searchList = articleList;
			this.setSearchHistory(searchVal);
		},
		searchInputNullStr() {
			this._searchConfirm(false);
		},
		applySearchHistory(searchVal) {
			this.searchVal = searchVal;
			this._searchConfirm(searchVal);
		},
	},
};
</script>

<style lang="scss">
page {
	height: 100%;
	background-color: #f5f5f5;

	.search-container {
		width: 100%;
		display: flex;
		flex-direction: column;

		.search-history-area {
			background-color: #fff;
			margin-bottom: 20rpx;

			.search-history-header {
				@include flex();
				padding: 20rpx 30rpx;
				font-size: 28rpx;
				color: #666;
				border-bottom: 1px solid #f5f5f5;

				.history-text {
					color: $base-color;
				}

				.history-clear {
					color: #30b33a;
					font-weight: bold;
				}
			}

			.search-history-content {
				@include flex(row, flex-start, center, wrap);
				padding: 30rpx;
				padding-top: 0;

				.history-content-item {
					padding: 4rpx 20rpx;
					margin-top: 24rpx;
					margin-right: 20rpx;
					font-size: 28rpx;
					color: #666;
					border-radius: 10rpx;
					border: 1px solid #666;
				}
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

		.search-list-container {
			height: 100%;
			flex: 1;
			overflow: hidden;
		}
	}
}
</style>
