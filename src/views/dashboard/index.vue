<template>
  <div>
    <el-row style="margin-top:3%">
      <el-col :span="11">
        <div style="margin-left:3%">
          <el-table :data="tableData" style="width: 95%">
            <el-table-column prop="platform" label="平台" min-width="85">
            </el-table-column>
            <el-table-column prop="CPUratio" label="CPU占比" min-width="85">
            </el-table-column>
            <el-table-column prop="Memoryratio" label="内存占比" min-width="85">
            </el-table-column>
            <el-table-column prop="state" label="状态">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="13">
        <div ref="chart" :style="{ width: '590px', height: '340px' }"></div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <div style="display:flex;justify-content:space-around;">
          <el-button type="primary" @click="allStart()" :loading="loading">全部开启</el-button>
          <el-button type="primary" @click="CloseAllProductStatus()">全部关闭</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { reqProductStatus } from '@/api'
export default {
  name: 'Dashboard',
  data() {
    return {
      loading:false,
      myChart:null,
      timer:null,
      tableData: [{
        platform: 'DPDK',
        CPUratio: '0%',
        Memoryratio: '0%',
        state: '关闭'
      }, {
        platform: 'ZEEK',
        CPUratio: '0%',
        Memoryratio: '0%',
        state: '关闭'
      }, {
        platform: 'KAFKA',
        CPUratio: '0%',
        Memoryratio: '0%',
        state: '关闭'
      }, {
        platform: 'MODELS_xy',
        CPUratio: '0%',
        Memoryratio: '0%',
        state: '关闭'
      },
      {
        platform: 'MODELS_zq',
        CPUratio: '0%',
        Memoryratio: '0%',
        state: '关闭'
      }]
    };
  },
  mounted() {
    // console.log(this.tableData[2]);
    this.initCharts();
  },
  beforeDestroy(){
    clearInterval(this.timer)
    this.timer = null;
    for (let i = 1; i < 10000; i++) {
        clearInterval(i);
    }
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = true
    next(0)
  },
  methods: {
    initCharts() {
      this.myChart = this.$echarts.init(this.$refs.chart);
      // 绘制图表
      let option = {
        legend: {},
        tooltip: {},
        dataset: {
          dimension: ['product', 'CPU占比(%)', '内存占比(%)'],
          source: [
            { product: 'DPDK', 'CPU占比(%)': 1, '内存占比(%)': 2 },
            { product: 'ZEEK', 'CPU占比(%)': 2, '内存占比(%)': 3 },
            { product: 'KAFKA', 'CPU占比(%)': 3, '内存占比(%)': 1 },
            { product: 'MODELS_xy', 'CPU占比(%)': 4, '内存占比(%)': 2 },
            { product: 'MODELS_zq', 'CPU占比(%)': 2, '内存占比(%)': 2 },
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }]
      };
      option && this.myChart.setOption(option);
    },
    
    async getAllProductStatus() {
      // console.log('点击了开启按钮');
      const allProductStatus = await this.$API.dashboard.reqProductStatus() //获取数据
      
      // console.log(allProductStatus);
      // 将获取的数据赋值给表格和柱状图
      // 1.赋值给表格
      this.tableData[0].state=allProductStatus[1].status
      this.tableData[0].CPUratio=allProductStatus[1].cpu
      this.tableData[0].Memoryratio=allProductStatus[1].memory
      this.tableData[1].state=allProductStatus[2].status
      this.tableData[1].CPUratio=allProductStatus[2].cpu
      this.tableData[1].Memoryratio=allProductStatus[2].memory
      this.tableData[2].state=allProductStatus[3].status
      this.tableData[2].CPUratio=allProductStatus[3].cpu
      this.tableData[2].Memoryratio=allProductStatus[3].memory
      this.tableData[3].state=allProductStatus[4].status
      this.tableData[3].CPUratio=allProductStatus[4].cpu
      this.tableData[3].Memoryratio=allProductStatus[4].memory
      this.tableData[4].state=allProductStatus[5].status
      this.tableData[4].CPUratio=allProductStatus[5].cpu
      this.tableData[4].Memoryratio=allProductStatus[5].memory
      // 2.赋值给柱状图
      // 绘制图表
      let option = {
        legend: {},
        tooltip: {},
        dataset: {
          dimension: ['product', 'CPU占比(%)', '内存占比(%)'],
          source: [
            { product: 'DPDK', 'CPU占比(%)': 0, '内存占比(%)': 0 },
            { product: 'ZEEK', 'CPU占比(%)': 0, '内存占比(%)': 0 },
            { product: 'KAFKA', 'CPU占比(%)': 0, '内存占比(%)': 0 },
            { product: 'MODELS_xy', 'CPU占比(%)': 0, '内存占比(%)': 0 },
            { product: 'MODELS_zq', 'CPU占比(%)': 0, '内存占比(%)': 0 },
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }]
      };
      option.dataset.source[0]['CPU占比(%)']=allProductStatus[1].cpu
      option.dataset.source[0]['内存占比(%)']=allProductStatus[1].memory
      option.dataset.source[1]['CPU占比(%)']=allProductStatus[2].cpu
      option.dataset.source[1]['内存占比(%)']=allProductStatus[2].memory
      option.dataset.source[2]['CPU占比(%)']=allProductStatus[3].cpu
      option.dataset.source[2]['内存占比(%)']=allProductStatus[3].memory
      option.dataset.source[3]['CPU占比(%)']=allProductStatus[4].cpu
      option.dataset.source[3]['内存占比(%)']=allProductStatus[4].memory
      option.dataset.source[4]['CPU占比(%)']=allProductStatus[5].cpu
      option.dataset.source[4]['内存占比(%)']=allProductStatus[5].memory
      option && this.myChart.setOption(option);
      // 设置定时器 重复更新数据
    },
    async allStart(){
      this.$message({
          message: '正在开启，请稍候...',
          type: 'success'
        });
      this.loading = true
      await this.getAllProductStatus()
      this.loading = false
      this.timer = setInterval(()=>{
        this.getAllProductStatus()
      },30000)
    },
    CloseAllProductStatus() {
      for (let i = 1; i < 10000; i++) {
                clearInterval(i);
            }
      // clearInterval(this.timer)
      this.timer = null
      this.$API.dashboard.reqCloseAll()
      this.tableData = [{
        platform: 'DPDK',
        CPUratio: '0%',
        Memoryratio: '0%',
        state: '关闭'
      }, {
        platform: 'ZEEK',
        CPUratio: '0%',
        Memoryratio: '0%',
        state: '关闭'
      }, {
        platform: 'KAFKA',
        CPUratio: '0%',
        Memoryratio: '0%',
        state: '关闭'
      }, {
        platform: 'MODELS_xy',
        CPUratio: '0%',
        Memoryratio: '0%',
        state: '关闭'
      },
      {
        platform: 'MODELS_zq',
        CPUratio: '0%',
        Memoryratio: '0%',
        state: '关闭'
      }]
      const option = {
        legend: {},
        tooltip: {},
        dataset: {
          dimension: ['product', 'CPU占比(%)', '内存占比(%)'],
          source: [
            { product: 'DPDK', 'CPU占比(%)': 0, '内存占比(%)': 0 },
            { product: 'ZEEK', 'CPU占比(%)': 0, '内存占比(%)': 0 },
            { product: 'KAFKA', 'CPU占比(%)': 0, '内存占比(%)': 0 },
            { product: 'MODELS_xy', 'CPU占比(%)': 0, '内存占比(%)': 0 },
            { product: 'MODELS_zq', 'CPU占比(%)': 0, '内存占比(%)': 0 },
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }]
      };
      option && this.myChart.setOption(option);
      //再清空定时器 clearInterval  beforeDestory(){}也要清空一下定时器
    }
  }
}

</script>

<style lang="less" scoped>

</style>
