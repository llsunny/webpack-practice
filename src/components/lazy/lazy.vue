<template>
  <div
    class="container"
    ref="container"
  >
    <button @click="handleAdd">添加</button>
    <button @click="handleDelete">删除</button>
    <ul ref="ul">
      <li
        v-for="img in imgs"
        :key="img.id"
      >
        <img
          v-lazy="img.src"
          :title="img.title"
          :alt="img.alt"
        />
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      imgs: [
        // {
        //   id: "",
        //   src: "",
        //   alt: "",
        //   title: "",
        // },
      ],
    };
  },
  created() {
    let i = 0;
    while (i < 100) {
      i++;
      this.imgs.push({
        id: `img-${i}`,
        src: require("../../assets/images/reserve_query_bg.png"),
        alt: `图片-${i}`,
        title: `图片-${i}`,
      });
    }
  },
  mounted() {
    this.$refs.container.addEventListener("scroll", this.handleMainScroll);
  },
  beforeDestroy() {
    this.$bus.$emit("mainScroll");
    this.$refs.container.removeEventListener("scroll", this.handleMainScroll);
  },
  methods: {
    handleMainScroll() {
      this.$bus.$emit("mainScroll", this.$refs.container);
    },
    handleAdd() {
      let i = this.imgs.length
      i++
      this.imgs.push({
        id: `img-${i}`,
        src: require("../../assets/images/reserve_query_bg.png"),
        alt: `图片-${i}`,
        title: `图片-${i}`,
      })
    },
    handleDelete() {
      this.imgs.pop()
    }
  },
};
</script>

<style lang="stylus" scoped>
.container
  height 100%
  overflow auto
  ul
    display flex
    flex-wrap wrap
    li
      >img
        width 500px
        height 500px
</style>
