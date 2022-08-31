<template>
	<view class="article-list-container">
		<swiper class="swiper-container" :current="activeIdx" @change="onSwiperChange">
			<swiper-item v-for="(item, i) in labelList" :key="item.name">
				<view class="swiper-item">
					<ListItem
						:article-list="articleListCache[i]"
						@load-more="onLoadMore"
						:load-data="loadDataControl[i]"
					/>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	name: "ArticleList",
	props: {
		labelList: {
			type: Array,
			default: () => [],
		},
		activeIdx: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			articleListCache: {}, // 文章数据缓存组，存储每一个 ListItem 获取的数据
			loadDataControl: {}, // 数据加载控制量组，存储每一个 ListItem 加载更多数据时的控制量
		};
	},
	methods: {
		onSwiperChange({ detail: { current } }) {
			this.$emit("active-idx-change", current);
			if (!this.articleListCache[current] || !this.articleListCache[current].length) {
				this._getArticleList(current);
			}
		},
		async _getArticleList(curIdx) {
			// 首先判断当前索引对应的数据加载控制量是否已存在，不存在则新建
			if (!this.loadDataControl[curIdx]) {
				this.$set(this.loadDataControl, curIdx, {
					pageNum: 1,
					loadStatus: "loading",
					total: 0,
				});
			}

			const { articleList, total } = await this.$http.getArticleList({
				classify: this.labelList[curIdx].name,
				pageNum: this.loadDataControl[curIdx].pageNum,
				pageSize: this.pageSize,
			});

			articleList.length === total && (this.loadDataControl[curIdx].loadStatus = "noMore");
			const prevData = this.articleListCache[curIdx] || [];
			this.loadDataControl[curIdx].total = total;
			this.$set(this.articleListCache, curIdx, [...prevData, ...articleList]);
		},
		onLoadMore() {
			if (
				this.articleListCache[this.activeIdx].length === this.loadDataControl[this.activeIdx].total
			) {
				this.loadDataControl[this.activeIdx].loadStatus = "noMore";
				return;
			}

			this.loadDataControl[this.activeIdx].pageNum++;
			this._getArticleList(this.activeIdx);
		},
	},
	watch: {
		labelList(newVal, oldVal) {
			this.articleListCache = {};
			this.loadDataControl = {};
			this._getArticleList(this.activeIdx);
		},
	},
	created() {
		this.labelList.length && this._getArticleList(this.activeIdx);
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
