<template>
  <div class="like" @click="onClickLike">
    1211
    <!-- <img  src="../../images/comment/like01.png" > -->
    <slot name="checked" class="likeImg" v-if="!likeStatus[index]"></slot>
    <slot name="uncheck" :class="['likeImg2','sc']" v-else></slot>
    <!-- <img  src="../../images/comment/like02.png" > -->
  </div>
</template>
<script lang="babel">
export default {
  name: 'radio-beat',
  props: {
  },
  data () {
    return {
    }
  },
  methods: {
    onClickLike(index, item) {
      const {
        id
      } = item;
      if (!this.likeStatus[index]) {
        const succ = res => {
          item.praiseCount ++;
          this.$set(this.likeStatus, [index], true);
        }
        const fail = res => {

        }
        this.dbyPublic.httpRequest('/user/getParseCount', {}, {
          id
        }, "post", succ, fail, this.dbyPublic.host.httpRoute);
      } else {
        const succ2 = res => {
          item.praiseCount --;
          this.$set(this.likeStatus, [index], false);
        }
        const fail2 = res => {

        }
        this.dbyPublic.httpRequest('/user/cancelParseCount', {}, {
          id
        }, "post", succ2, fail2, this.dbyPublic.host.httpRoute);
      }

    }
  }
}
</script>
<style lang="scss" scoped>
.like {
  display: flex;
  justify-content: space-between;
}
.likeImg {
  width: 33 * $unit;
  height: 29 * $unit;
}

.likeImg2 {
  width: 33 * $unit;
  height: 29 * $unit;
  transform: scale(1, 1);
}

.number {
  line-height: 29 * $unit;
  font-size: 24 * $unit;
  padding-left: 13 * $unit;
  margin-top: 2 * $unit;
  color: #7a90e4;
}
</style>
