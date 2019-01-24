<template>
  <div class="like" @click="onClickLike">
    <div class="likeImg" v-if="!likeStatus[index]">
      <slot name="checked" ></slot>
    </div>
    <div  :class="['likeImg2','sc']" v-else>
      <slot name="uncheck"></slot>
    </div>
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
