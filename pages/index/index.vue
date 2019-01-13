<template>
	<view class="content">
		<image class="logo" src="../../static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
		</view>
		<view >
			<toast ref="toast"></toast>
			<chat-textarea @focus="onFocus" ref="chatTextarea"></chat-textarea>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			
		},
		onShow() { // 监听页面显示
			this.$nextTick(()=>{
// 				this.$refs.toast.open({
// 					message: '提示',
// 					position: 'bottom',
// 					duration: 1
// 				})
// 				setTimeout(()=>{
// 					this.$refs.toast.open('你好')
// 					setTimeout(()=>{
// 						this.$refs.toast.open('我就是我')
// 					},2000)
// 				},2000)
				this.$refs.chatTextarea.getSystemInfo((res)=>{
					this.$refs.toast.open(res.windowBottom.toString())
				})
      })
		},
		components: {
			
		},
		methods: {
			onFocus(){
				this.$refs.chatTextarea.getSystemInfo((res)=>{
					this.$refs.toast.open(res.windowBottom.toString())
				})
			}
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
