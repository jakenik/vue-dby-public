<template>
	<view>
		<view class="dby-chatTextarea-block">
			<textarea class="dby-chatTextarea-style" :maxlength="maxlength" @blur="bindTextAreaBlur" @focus="onFocus" auto-height />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				maxlength: 1000
			}
		},
		onLoad() { // 监听页面加载，其参数为上个页面传递的数据，参数类型为Object（用于页面传参）
			
		},
		onShow() { // 监听页面显示

		},
		onReady() { // 监听页面初次渲染完成
		
		},
		onHide() { // 监听页面隐藏
		
		},
		onUnload() { // 监听页面卸载
		
		},
		onPullDownRefresh() { // 监听用户下拉动作，一般用于下拉刷新
		
		},
		onReachBottom() { // 页面上拉触底事件的处理函数
		
		},
		onShareAppMessage() { // 用户点击右上角分享
		
		},
		onPageScroll() { // 监听页面滚动，参数为Object
		
		},
		onNavigationBarButtonTap() { // 监听原生标题栏按钮点击事件，参数为Object
		
		},
		onBackPress() { // 监听页面返回

		},
		methods: {
			getSystemInfo(succ) {
				uni.getSystemInfo({
						success: function (res) {
// 								console.log(res.model);
// 								console.log(res.pixelRatio);
// 								console.log(res.windowWidth);
								console.log(res.windowBottom);
								succ(res)
// 								console.log(res.language);
// 								console.log(res.version);
// 								console.log(res.platform);
						}
				});
			},
			bindTextAreaBlur: function (e) {
				console.log(e.detail.value)
			},
			onFocus(){
				this.$emit('focus');
			}
		},
		components: {
			
		}
	}
</script>

<style scoped>
	.dby-chatTextarea-style{
		height: 40upx;
		width: 100%;
		border: 2upx solid #000;
	}
	.dby-chatTextarea-block{
		position: fixed;
		bottom: 0;
		min-height: 40upx;
		width: 100%;
	}
</style>
