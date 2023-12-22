<template>
  <div dispaly:flex class="tabdiv">
    <template>

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="   " name="">
          <!-- 路由第三步 -->
        </el-tab-pane>
        <el-tab-pane label="法律文件管理" name="first">
          <!-- 路由第三步 -->
          <lawsFileManage />
        </el-tab-pane>
        <el-tab-pane label="条款管理" name="second">
          <termManage />
        </el-tab-pane>
        <el-tab-pane label="条款标准化" name="third">
          <standardizeRule />
        </el-tab-pane>
        <el-tab-pane label="条款数字化" name="fourth">
          <digitalizeRule />
        </el-tab-pane>
        <!-- <el-tab-pane label="标签管理" name="fifth">
          <labelManage/>
        </el-tab-pane> -->

      </el-tabs>
    </template>
  </div>
</template>
  
<script>
// 路由第二步
import lawsFileManage from '../../components/lawsManage/lawsFileManage.vue'
import termManage from '../../components/lawsManage/termManage.vue'
import standardizeRule from '../../components/lawsManage/standardizeRule.vue'
import digitalizeRule from '../../components/lawsManage/digitalizeRule.vue'
//import labelManage from '../../components/lawsManage/labelManage.vue'
export default {
  name: 'lawsManage',
  data() {
    return {
      activeName: 'first'
    };
  },

  // 路由第一步
  components: {
    lawsFileManage,
    termManage,
    standardizeRule,
    digitalizeRule,
    // labelManage
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}

</script>
  
<style lang="less" scoped>
.tabdiv {
  margin-top: 10px !important;
  margin-bottom: 20px !important;
  width: calc(100% - 30px);
  border-radius: 5px;
  margin: 0 auto;
  box-shadow:
    0 0 8px #ededed,
    0 0 8px #ededed,
    0 0 8px #ededed,
    0 0 8px #ededed;
}
</style>
  