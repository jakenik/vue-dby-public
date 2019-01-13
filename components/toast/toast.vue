<template>
	<view class="dby-toast" v-show="visible" :class="[customClass, hiddenClass]" :style="{ 'padding': iconClass === '' ? '10upx' : '20upx' }">
		<view class="dby-toast-text" :style="{ 'padding-top': iconClass === '' ? '0' : '10upx' }">{{ message }}</view>
	</view>
</template>

<style lang="scss" scoped>
	.dby-toast-placetop {
	  top: 50upx;
	  left: 50%;
	  transform: translate(-50%, 0);
	}
	.dby-toast-placemiddle {
	  left: 50%;
	  top: 50%;
	  transform: translate(-50%, -50%);
	}
	
	.dby-toast-placebottom {
	  bottom: 50upx;
	  left: 50%;
	  transform: translate(-50%, 0);
	}
	
	.dby-toast-pop-enter{
	  opacity: 0;
	}
	.dby-toast-hidden {
		animation: toastHidden 0.5s
	}
	@keyframes toastHidden {
		from {
			transform: translateY(-100%)
		}
		to {
			transform: translateY(0)
		}
	}
	.dby-toast {
      position: fixed;
      max-width: 80%;
      border-radius: 5upx;
      background: rgba(0, 0, 0, 0.7);
      color: #fff;
      box-sizing: border-box;
      text-align: center;
      z-index: 1000;
      transition: opacity .3s linear;
  
      .dby-toast-icon {
        display: block;
        text-align: center;
        font-size: 56upx;
      }
      
      .dby-toast-text {
        font-size: 32upx;
        display: block;
        text-align: center;
				line-height: 32upx;
      }
    }
</style>

<script type="text/babel">
	export default {
    data() {
      return {
        visible: false,
				message: "",
				className: "",
				position: null,
				iconClass: "",
				duration: 0,
				hiddenClass: null,
				animationTime: 300
      };
    },
		methods: {
			open(param) {
				let {
					message,
					position,
					duration
				} = {};
				typeof param === "string" ? message = param : {
					message,
					position,
					duration
				} = param;
				this.hiddenClass = null
				this.message = message || ""
				this.position = position || ""
				this.duration = duration || 2000
				if( this.duration < this.animationTime ) this.duration = this.animationTime
				this.visible = true
				setTimeout(()=>{
					this.hiddenClass = 'dby-toast-pop-enter'
				},(this.duration - this.animationTime))
				setTimeout(()=>{
					this.visible = false
				},this.duration)
			}
		},
    computed: {
      customClass() {
        let classes = [];
        switch (this.position) {
          case 'top':
            classes.push('dby-toast-placetop');
            break;
          case 'bottom':
            classes.push('dby-toast-placebottom');
            break;
          default:
            classes.push('dby-toast-placemiddle');
        }
        classes.push(this.className);
        return classes.join(' ');
      }
    }
  };
</script>
