<template>
  <div class="tags">
    <el-tag :label="item.label"
             :name="item.name"
             v-for="item in tagsList"
             :key="item.id"
            :closable="item.name!=='home'"
            size="small"
            :effect="$route.name === item.name ? 'dark':'plain'"
            @close="closeTag(item)"
            @click="clickTag(item)">
      {{item.label}}
    </el-tag>
  </div>

</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "CommonTags",
  computed:{
    ...mapState('tags',['tagsList'])
  },
  methods:{
    // 关闭Tag,自动转为下一个Tag
    closeTag(item){
      this.$store.dispatch('tags/delTag',item).then(()=>{
        this.$router.push({name:this.tagsList[this.tagsList.length-1].name})
      })
    },
    clickTag(item){
      this.$router.push({name:item.name})
      this.$store.commit('tags/ACTIVEMENU',item)
    }
  },
  mounted() {
    console.log(this.$router)
  }
}
</script>

<style lang="css" scoped>
.tags{
  padding: 10px;
}

.el-tag{
  margin-left: 10px;
  cursor: pointer
}

</style>
