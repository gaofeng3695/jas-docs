<template>
  <div>
    <div class="lgbtn" @click="goHome">点击进入</div>
  </div>
</template>

<script>
export default {
  methods: {
    goHome() {
      // 判断账号密码是否正确的逻辑
      // 正确，跳转
      this.$router.push({ path: "/home/index.html" });
    }
  }
};
</script>

<style>
.lgbtn {
  width: 160px;
  height: 40px;
  background: #f90;
  color: #fff;
  margin: 30% auto;
  cursor: pointer;
  line-height: 40px;
  text-align: center;
  border-radius: 4px;
}
</style>