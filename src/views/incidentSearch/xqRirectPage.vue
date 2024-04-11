<template>
    <div>
      <div class="top-header">
        <div class="header">
            <!-- 左侧标题 -->
            <div class="left">{{ headerTitle }}</div>
            <!-- 右侧 -->
            <div class="right">
                <!-- 用户信息 -->
                <el-dropdown trigger="click" placement="bottom">
                <div class="right-item">
                    <i class="el-icon-menu"></i>
                    <div class="user-name">主菜单</div>
                    <!-- <i class="el-icon-caret-bottom" style="color:white;" /> -->
                </div>
                <el-dropdown-menu slot="dropdown" class="user-dropdown">
                <router-link to="/">
                  <el-dropdown-item> 首页 </el-dropdown-item>
                </router-link>
                <router-link to="/dataOrigin">
                  <el-dropdown-item> 数据源管理 </el-dropdown-item>
                </router-link>
                <router-link to="/lawsManage">
                  <el-dropdown-item> 知识库管理 </el-dropdown-item>
                </router-link>
                <router-link to="/incidentSearch">
                  <el-dropdown-item> 违规事件查询 </el-dropdown-item>
                </router-link>
                <router-link to="/encryptedTraffic">
                  <el-dropdown-item> 加密配置管理 </el-dropdown-item>
                </router-link>
                <router-link to="/systemManage">
                  <el-dropdown-item> 系统管理 </el-dropdown-item>
                </router-link>
                    <!-- <el-dropdown-item @click.native="logout">
                    <span style="display:block;">退出登录</span>
                    </el-dropdown-item> -->
                </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
      </div>
      <div class="centerbody">
        <div style="font-size: 12px;margin-bottom:30px;padding-top:8px;display: block;">
          <span style="color: #929393;">当前位置：违规事件查询  /  </span>
          <span>详情</span>
        </div>
        <div class="zrzt">
          <span>责任主体：</span><span>{{ zrztData }}</span> <!-- 待改 -->
          <span>时间：</span><span>{{ kssj }} - {{ jssj }}</span> <!-- 待改 -->
          <!-- <span>个人信息涉及自然人：</span><span>{{ grxxsjzrr }}人</span>
          <span>个人敏感信息涉及自然人：</span><span>{{ grmgxxsjzrr }}人</span> -->
          <span class="fhsyj" @click="fhsyj">返回上一级<i class="el-icon-arrow-left"></i></span>
        </div>
        <div class="mainContain">
          <div class="mainContain-title">出境数据详情 <span style="font-size: 12px;color: #ffb845;">(注：以条数为统计单位，未去重)</span></div>
          <el-row>
            <el-col :span="6">
              <div style="height: 43vh; ">
                <div ref="myPieChart1" style="top:50%; transform: translateY(-50%); width: 100%; height: 60%;"></div>
              </div>
            </el-col>
            <el-col :span="6">
              <div style="height: 43vh; ">
                <div ref="myPieChart2" style="top:50%; transform: translateY(-50%);width: 100%; height: 60%;"></div>
              </div>
            </el-col>
            <el-col :span="12">
              <el-row v-if="liebiao" style="margin-top: 14px;margin-right: 10px;">
                <el-col :span="24">
                  <div class="label-value-wrapper">
                    <div style="color:#8fd3e1" class="column" v-for="(item, index) in tableTitle" :key="index">
                      <div class="label" style="margin:3px 8px; font-weight: bold;">{{ item.name }}</div>
                      <div class='value' style="padding: 3px 0;">{{ item.value }}</div>
                    </div>
                  </div>
                  <div class="label-value-wrapper" style="max-height: 43vh;overflow: auto;">
                    <div class="column" v-for="(item, index) in tableData" :key="index">
                      <!-- style="overflow: hidden; white-space: nowrap;text-overflow: ellipsis;" -->
                      <div class="label" style="width: 57%;overflow: hidden;transform: translate(7px,7px);text-overflow: ellipsis;font-size: 12px;">{{ item.name }}</div>
                      <div class='value' :style="{ color: getQuantityClass(item) }">{{ item.value }}</div>
                    </div>
                  </div>
                </el-col>
                <!-- <el-col :span="6">
                  <div class="label-value-wrapper">
                    <div style="color:#8fd3e1;border: 1px solid #0c65be;font-size: 14px;width:90%;">
                      <div class="label" style="margin:3px 2px; font-weight: bold;">违反标签名称</div>
                      <div class='value' style="padding: 3px 0;">条数</div>
                    </div>
                  </div>
                  <div class="label-value-wrapper">
                    <div style="width:90%; border: 1px solid #0c65be;font-size: 14px;" v-for="(item, index) in tableData2" :key="index">
                      <div class="label">{{ item.name }}</div>
                      <div class='value' :style="{ color: getQuantityClass2(index) }">{{ item.value }}</div>
                    </div>
                  </div>
                </el-col> -->
              </el-row>
              <div style="margin-top: 12px;" v-else>
                <el-badge v-for="(item, index) in tableData" :key="index" :value="item.value" :class="getBadgeType(item.value)" class="item" type="primary" style="margin: 8px;">
                  <el-button size="small">{{ item.name }}</el-button>
                </el-badge>
              </div>
            </el-col>
          </el-row>
              <div style="margin-bottom: 6px;">
                <span class="zrr">个人信息涉及自然人：</span><span class="zrrVal">{{ grxxsjzrr }}人</span>
                <el-badge v-for="(item, index) in sjzrr" :key="index" :value="item.value" :type="getBadgeType(item.value)" class="item" style="margin: 8px;">
                  <el-button size="small">{{ item.name }}</el-button>
                </el-badge>
              </div>
              <div>
                <span class="zrr">个人敏感信息涉及自然人：</span><span class="zrrVal">{{ grmgxxsjzrr }}人</span>
                <el-badge v-for="(item, index) in mgsjzrr" :key="index" :value="item.value" :type="getBadgeType(item.value)" class="item" style="margin: 8px;">
                  <el-button size="small">{{ item.name }}</el-button>
                </el-badge>
              </div>
          
        </div>
        <!-- <div style="float: right;margin-top: 8px;margin-right: 5px;">
          <el-button v-if="liebiao" size="mini" @click="changeliebiao">展示标签</el-button>
          <el-button v-else size="mini" @click="changeliebiao">展示列表标签</el-button>
        </div> -->
        <div >
          <el-row>
            <el-col :span="12" >
              <div class="hotIPtop5" style="background-color: rgba(0,0,0,0.2);width: 97%;">
                <div class="mainContain-title-left">出境源IP-Top5</div>
              <div>
                <el-table
                  :data="tableData3"
                  :cell-style="{borderColor:'#9eadc1',height:'45px',padding: '0'}"
                  :header-cell-style="{borderColor:'#9eadc1'}"
                  style="width:auto;margin: 0px 11px;">
                  <!-- <el-table-column
                    align="center"
                    label="编号"
                    type="index"
                    min-width="50">
                  </el-table-column> -->
                  <el-table-column
                  align="center"
                    prop="sourceIp"
                    label="源IP"
                    min-width="100"
                    :show-overflow-tooltip="true"
                    >
                  </el-table-column>
                  <el-table-column
                  align="center"
                    prop="sourceCountry"
                    label="源国家"
                    min-width="62"
                    :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column
                  align="center"
                    prop="sourceProvince"
                    label="源省份"
                    min-width="65"
                    :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column
                  align="center"
                    prop="sourceCity"
                    label="源城市"
                    min-width="65"
                    :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column
                  align="center"
                    prop="sourceAddress"
                    label="源区县"
                    min-width="65"
                    :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column
                  align="center"
                    prop="sourceOperator"
                    label="源运营商"
                    min-width="80"
                    :show-overflow-tooltip="true">
                  </el-table-column>
                 
                  <!-- <el-table-column
                  align="center"
                    prop="transferField"
                    label="传输字段"
                    min-width="100"
                    :show-overflow-tooltip="true">
                  </el-table-column> -->
                  <el-table-column
                  align="center"
                    prop="dataTotal"
                    label="数据量"
                    min-width="62"
                    :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column
                  align="center"
                    prop="time"
                    label="最新活跃时间"
                    min-width="110"
                    :show-overflow-tooltip="true">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            </el-col>
            <el-col :span="12">
              <div class="hotIPtop5" style="background-color: rgba(0,0,0,0.2);">
                <div class="mainContain-title-right">出境目的IP-Top5</div>
              <div>
                <el-table
                  :data="tableData3"
                  :cell-style="{borderColor:'#9eadc1',height:'45px',padding: '0'}"
                  :header-cell-style="{borderColor:'#9eadc1'}"
                  style="width:auto;margin: 0px 11px;">
                  <!-- <el-table-column
                    align="center"
                    label="编号"
                    type="index"
                    min-width="50">
                  </el-table-column> -->
                  <el-table-column
                  align="center"
                    prop="dstIp"
                    label="目的IP"
                    min-width="100"
                    :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column
                  align="center"
                    prop="dstCountry"
                    label="目的国家"
                    min-width="76"
                    :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column
                  align="center"
                    prop="dstProvince"
                    label="目的省份"
                    min-width="80"
                    :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column
                  align="center"
                    prop="dstCity"
                    label="目的城市"
                    min-width="80"
                    :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column
                  align="center"
                    prop="dstOperator"
                    label="目的运营商"
                    min-width="100"
                    :show-overflow-tooltip="true">
                  </el-table-column>
                  <!-- <el-table-column
                  align="center"
                    prop="transferField"
                    label="传输字段"
                    min-width="100"
                    :show-overflow-tooltip="true">
                  </el-table-column> -->
                  <el-table-column
                  align="center"
                    prop="dataTotal"
                    label="数据量"
                    min-width="80"
                    :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column
                  align="center"
                    prop="time"
                    label="最新活跃时间"
                    min-width="110"
                    :show-overflow-tooltip="true">
                  </el-table-column>
                </el-table>
              </div>
              </div>
              
            </el-col>
          </el-row>
          
          <!-- <div style="background-color: transparent;height: 15px;"></div> -->
        </div>
        <div class="wfflfgxq">
          <div class="mainContain-title">出境目的国家/地区数据量排行榜</div>
          <div style="height: 43vh; ">
                <div ref="myLineChart" style="width: 100%; height: 100%;"></div>
              </div>
        </div>
        <div class="wfflfgxq">
          <div class="mainContain-title">违反法律法规详情</div>
          <div style="float: right; transform: translate(-25px,-24px);font-size: 14px;"><span style="color: #63e9ea;">违规次数：</span> <span style="color:#d52512; font-weight: bold;">{{ wgcs }}</span></div>
          <div>
            <!-- width可能待改 -->
            <el-table
              :data="tableData4"
              :cell-style="{borderColor:'#9eadc1',height:'45px',padding: '0'}"
              :header-cell-style="{borderColor:'#9eadc1'}"
              style="width:98%;margin: 0px 11px">
              <el-table-column
                align="center"
                label="编号"
                type="index"
                min-width="50">
              </el-table-column>
              <el-table-column
                align="center"
                prop="lawName"
                label="法律法规文件"
                min-width="120"
                :show-overflow-tooltip="true"
                >
              </el-table-column>
              <el-table-column
              align="center"
                prop="lawtermContent"
                label="条款原文"
                min-width="100"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
              align="center"
                prop="judgCriteria"
                label="判定准则"
                min-width="100"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
              align="center"
                prop="lawtermResult"
                label="违规类型"
                min-width="100"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
              align="center"
                prop="standardizaId"
                label="标准化规则编号"
                min-width="100"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
              align="center"
                prop="digitalizeId"
                label="数字化规则编号"
                min-width="85"
                :show-overflow-tooltip="true">
              </el-table-column>
              
            </el-table>
          </div>
          <div style="background-color: transparent;height: 15px;"></div>
        </div>
        <div class="main-footer">
          <!-- <span style="color: #63e9ea;">本次数据统计来源于：</span> <span>{{ sjtjly }}</span> -->
        </div>
      </div>
      
    </div>
</template>
  
  <script>
   import { mapGetters } from 'vuex'
  export default {
    name: 'xqRirectPage',
    components: {
    },
    data() {
      return {
        sjtjly:null,
        wgcs:null,
        tableTitle:[
        { name: '标准名称', value: '条数' },
        { name: '标准名称', value: '条数' },
        { name: '标准名称', value: '条数' },
        { name: '标准名称', value: '条数' },
        { name: '标准名称', value: '条数' },
        ],
        sjzrr:[
        { name: '身份证号', value: 2 },
        { name: '姓名', value: 5 },
        { name: '车架号', value: 22 },
        { name: '驾驶证档案号', value: 33 },
        { name: '患者姓名', value: 44 },
        { name: '军官证', value: 55 },
        { name: '护照', value: 66 },
        { name: '工作证', value: 77 },
        { name: '社保卡', value: 88 }
        ],
        mgsjzrr:[{ name: '居住证', value: 4 },
        { name: '基因', value: 7 },
        { name: '指纹', value: 14 },
        { name: '掌纹', value: 22 },
        { name: '虹膜', value: 24 },
        { name: '面部识别特征', value: 35 },
        { name: '港澳通行证', value: 46 },
        { name: '手机号', value: 47 },
        { name: 'IMEI号', value: 58 },
        { name: 'IMSI号', value: 67 },
        { name: '邮箱', value: 68 },
        { name: '声纹', value: 77 },
        { name: '耳廓', value: 88 },
        { name: '银行卡号', value: 97 }],
        tableData: [
        { name: '标签1', value: 12 },
        { name: '标签2', value: 11 },
        { name: '标签3', value: 22 },
        { name: '标签4', value: 33 },
        { name: '标签5', value: 44 },
        { name: '标签6', value: 55 },
        { name: '标签7', value: 66 },
        { name: '标签8', value: 77 },
        { name: '标签9', value: 88 }
        ],
        tableData2:[
        //   { name: '标签1', value: 12 },
        // { name: '标签2', value: 11 },
        // { name: '标签3', value: 22 },
        // { name: '标签4', value: 33 },
      ],
        tableData3:[],
        tableData4:[],
        colors: ['f46b6b', 'c8913e', '3c94ef'],
        cycleLength: 5,
        operatorName:'',
        liebiao: true,
        wffl:'',
        dateRange:'',
        currentPage: 1,
        pageSize: 10,
        hostTotal: 0,
        // 顶栏标题
        headerTitle: '数据出境违规行为判定',
        firstLevelData: [], // 第一级数据
        secondLevelData: [], // 第二级数据
        thirdLevelData: [], // 第三级数据
        zrztData:null,
        kssj:null,
        jssj:null,
        grxxsjzrr:null,
        grmgxxsjzrr:null
      }
    },
    computed: {
      ...mapGetters([
        'avatar',
        'name'
      ]),
      groupedData() {
        const result = [];
        let columnData = [];
        for (let i = 0; i < this.tableData.length; i++) {
          if (i % this.columnCount === 0 && columnData.length > 0) {
            result.push(columnData);
            columnData = [];
          }
          columnData.push(this.tableData[i]);
        }
        if (columnData.length > 0) {
          result.push(columnData);
        }
        return result;
      },
      // 计算属性，根据第一级数据获取第二级数据
      getBadgeType() {
        return function(value) {
          if (value >= 0 && value <= 10) {
            // console.log('primary');
            return 'primary';
          } else if (value > 10 && value <= 50) {
            // console.log('warning');
            return 'warning';
          } else {
            // console.log(' ');
            return null;
          }
        };
      }
    },
    created(){
      const row = JSON.parse(localStorage.getItem('row'))
      // console.log(row); // 在控制台输出传递过来的数据
      this.zrztData = row.operatorName
      this.kssj = row.eventTimeBegin.replace(/-/g, '/')
      this.jssj = row.eventTimeEnd.replace(/-/g, '/')
      this.grxxsjzrr = row.pInfoHumanNum
      this.grmgxxsjzrr = row.pSentiveInfoHumanNum
    },
    mounted() {
      // this.drawPiechart1()
      // this.drawPiechart2()
      this.drawLinechart()
      this.xqAPI()
      this.top5API()
      this.lawDetailAPI()
      window.addEventListener('resize', this.resizeChart);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.resizeChart);
    },
    methods: {
      fhsyj(){
        this.$router.push({
          name: 'redirectPage', // 目标路由的名称
        });
        localStorage.removeItem('row')
      },
      async xqAPI(){
        const row = JSON.parse(localStorage.getItem('row'))
        let list = {
          companyName:row.operatorName,
        };
        // console.log(list);
        const { data: res } = await this.$http.post("/api/event/getLabelByName", list);
        if (res.code == 200) {
          // console.log(res.data);
          this.firstLevelData = res.data
          // console.log(this.firstLevelData);
          this.drawPiechart1(this.firstLevelData);
          this.drawPiechart2(this.firstLevelData[0].children)
          this.tableData = this.firstLevelData[0].children[0].children;

        }
      },
      async top5API(){
        const row = JSON.parse(localStorage.getItem('row'))
        let list = {
          companyName:row.operatorName,
        };
        // console.log(list);
        const { data: res } = await this.$http.get("/api/event/getIpTop",{params:list} );
        if (res.code == 200) {
          this.tableData3 = res.data
          // console.log(this.tableData3);
        }
      },
      async lawDetailAPI(){
        const row = JSON.parse(localStorage.getItem('row'))
        let list = {
          companyName:row.operatorName,
        };
        // console.log(list);
        const { data: res } = await this.$http.get("/api/event/getLawDetail",{params:list} );
        if (res.code == 200) {
          this.tableData4 = res.data.violateDetailEntityList
          // console.log(this.tableData3);
          this.wgcs = res.data.number
        }
      },
      changeliebiao(){
        this.liebiao = !this.liebiao
      },
      getQuantityClass(item) {
        if(item.value<=10){
          return `#${this.colors[2]}`
        }else if(item.value>10&&item.value<50){
          return `#${this.colors[1]}`
        }else{
          return `#${this.colors[0]}`
        }
        // const colorIndex = Math.floor(index / this.cycleLength) % this.colors.length;
        // console.log(this.colors[colorIndex]);

        // return `#${this.colors[colorIndex]}`;
      },
      getQuantityClass2(index) {
        const colorIndex = Math.floor(index / 1) % this.colors.length;
        // console.log(this.colors[colorIndex]);
        return `#${this.colors[colorIndex]}`;
      },
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      },
      xqClick(row){
        console.log(row);
      },
      
      resizeChart() {
        let pie_chart1 = this.$echarts.init(this.$refs.myPieChart1);
        let pie_chart2 = this.$echarts.init(this.$refs.myPieChart2);
        let line_chart1 = this.$echarts.init(this.$refs.myLineChart);
        pie_chart1.resize();
        pie_chart2.resize();
        line_chart1.resize()
      },
      drawLinechart(){
        let line_chart = this.$echarts.init(this.$refs.myLineChart)
        window.addEventListener('resize', function () {
          line_chart.resize()
        })
        let option = {
          tooltip: {
            trigger: 'axis',
          },
          xAxis: {
            type: 'category',
            data: ['美国华盛顿', '中国北京', '日本东京', '德国柏林', '法国巴黎', '英国伦敦', '澳大利亚悉尼'],
            name: '国家/地区',
            axisLine: {
              lineStyle: {
                color: '#fff' // 设置轴线颜色为白色
              }
            },
            axisLabel: {
              color: '#fff' // 设置轴标签颜色为白色
            }

          },
          yAxis: {
            type: 'value',
            name: '单位/条数',
            axisLine: {
              lineStyle: {
                color: '#fff' // 设置轴线颜色为白色
              }
            },
            axisLabel: {
              color: '#fff' // 设置轴标签颜色为白色
            }
          },
          series: [
            {
              data: [120, 200, 150, 80, 70, 110, 130],
              type: 'bar'
            }
          ]
        };

        option && line_chart.setOption(option);
      },
      drawPiechart1(firstLevelData){
        let pie_chart = this.$echarts.init(this.$refs.myPieChart1)
        window.addEventListener('resize', function () {
          pie_chart.resize()
        })
        let option = {
          tooltip: {
            trigger: 'item'
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['45%', '70%'],
              label:{
                color:'white',
                formatter: '{b}\n{c}'
              },
              itemStyle: {
                borderRadius: 3,
              },
              emphasis: {
                label: {
                  show: true,
                  fontWeight: 'bold'
                }
              },
              data: firstLevelData,
              color:['#ffb845','#ea687b','#e2250f']
            }
          ]
        };

        const that = this
        // 添加点击事件监听器
        pie_chart.on('click', function(params){
          // params 对象包含了点击的相关信息，例如 params.name 可以获取被点击区域的名称
          console.log('点击了', params.name);
          // 在这里可以编写处理点击事件的逻辑代码
          // console.log(that.firstLevelData);
        
          that.secondLevelData = (that.firstLevelData.find(item => item.name == params.name)).children;
          that.drawPiechart2(that.secondLevelData)
 
        });
        option && pie_chart.setOption(option);
      },
      drawPiechart2(secondLevelData){
        let pie_chart2 = this.$echarts.init(this.$refs.myPieChart2)
        let option = {
          tooltip: {
            trigger: 'item'
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['45%', '70%'],
              label:{
                color:'white',
                formatter: '{b}\n{c}'
              },
              itemStyle: {
                borderRadius: 3,
              },
              emphasis: {
                label: {
                  show: true,
                  fontWeight: 'bold'
                }
              },
              data: secondLevelData,
              // data:[{name:'fdf',value:11},{name:'ff',value:11},{name:'dd',value:11},],
              color:['#a1deed','#3f95c2','#6dc8e1','#4eb2d4','#d1eff7']
            }
          ]
        };
        const that = this
        // 添加点击事件监听器
        pie_chart2.on('click', function(params){
          // params 对象包含了点击的相关信息，例如 params.name 可以获取被点击区域的名称
          // console.log('点击了', params.name);
          // 在这里可以编写处理点击事件的逻辑代码
          // console.log(that.firstLevelData);
        
          that.thirdLevelData = (that.secondLevelData.find(item => item.name == params.name)).children;
          console.log(that.thirdLevelData);
          that.tableData = that.thirdLevelData
        });
        option && pie_chart2.setOption(option);
      },
      //页面元素内容加载前需要执行的方法
      resetForm() {
        this.dateRange = '';
        this.operatorName = '';
        this.wffl = ''
        this.currentPage = 1;
        this.loadAPI();
      },
      handleSizeChange(val) {
          this.pageSize = val;
          this.loadAPI();
      },
      handleCurrentChange(val) {
          this.currentPage = val;
          this.loadAPI();
      },
      searchForm() {
            this.currentPage = 1;
            this.loadAPI();
        },
      searchClick(){
        // console.log(this.operatorName);
        // console.log(this.wffl);
        // console.log(this.dateRange);
        this.loadAPI()
      },
      async loadAPI() {
            //列表初始化
            let list = {
                beginTime:this.dateRange[0],
                endTime:this.dateRange[1],
                companyName:this.operatorName,
                lawId:this.wffl,
                pageSize: this.pageSize,
                pageNum: this.currentPage
            };
            // console.log(list);
            const { data: res } = await this.$http.post("/api/event/getEventList", list);
            // console.log(res);
            if (res.code == 200) {
                this.tableData = res.data.list;
                this.hostTotal = res.data.total;
                // this.$nextTick(() => {
                //     this.$refs["digitalizeTable"].doLayout();
                // });
            }
        },
    }
  }
  
  </script>
  
  <style lang="less" scoped>
.zrr{
  display: inline-block;
  font-size: 14px;
  color: #63e9ea;
  margin-left:15px;
  font-weight: bold;
}
.zrrVal{
  font-size: 14px;
  color: #fcfcfc;
  margin:0 15px 0 5px;
}
/deep/.el-button--mini, .el-button--small{
  padding: 4px 8px!important;
  font-size: 11px;
}
  .main-footer{
    font-size: 14px;
    margin: 30px 0 50px 20px;
  }
  .hotIPtop5{
    margin-top: 38px;
    padding-bottom: 14px;
    height: auto;
    width: 100%;
    border: #aaadb1 solid 1.5px;
    border-radius: 6px;
    // background-color: rgba(0,0,0,0.2);
  }

  .wfflfgxq{
    margin-top: 38px;
    height: auto;
    width: 100%;
    border: #aaadb1 solid 1.5px;
    border-radius: 6px;
    background-color: rgba(0,0,0,0.2);
  }
  /deep/.el-button--mini{
    padding:4px 10px!important
  }
.label-value-wrapper {
  
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.column {
  font-size: 14px;
  width: 20%;
  border: 1px solid #0c65be;
  
}
// .column:nth-child(n+5) {
//   transform: translateY(-1px);
// }
// .column:not(:first-child):not(:nth-child(4n+1)){
//   transform: translateX(-1px);
// }

.label {
  // margin: 7px 5px;
  
  display: inline-block;
}
// .label:hover {
//   overflow: visible;
//   white-space: normal;
// }
.value {
  width:36px;
  float: right;
  display: inline-block;
  border-left: 1px solid #0c65be;
  font-weight: bold;
  padding:7px 0px;
  text-align: center;
}
/* 定义滚动条的宽度和高度 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

/* 定义滚动条轨道的背景色 */
::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 3px;
}

/* 定义滚动条滑块的样式 */
::-webkit-scrollbar-thumb {
  background-color: #d2d2d8;
  border-radius: 3px;
}

/* 鼠标悬停在滚动条上时的样式 */
::-webkit-scrollbar-thumb:hover {
  background-color: #969696;
  border-radius: 3px;
}

/* 定义滚动条的角落样式 */
::-webkit-scrollbar-corner {
  background-color: transparent;
}
.el-table--scrollable-x .el-table__body-wrapper {
    overflow: auto;
}
// /deep/.el-table--scrollable-x .el-table__body-wrapper::-webkit-scrollbar{
  // width: 100%;
  // height: 4px;
// }
/deep/.el-button--small, .el-button--small.is-round {
    padding: 6px 12px;
    background-color: transparent;
    color: #fcfcfc;
    border: 1px solid #0152a5;
}
/deep/.el-table__row .cell{
  color:white
}
/deep/ .el-table, /deep/ .el-table__expanded-cell{
  background-color: transparent;
}
/* 表格内背景颜色 */
/deep/ .el-table th,
/deep/ .el-table tr,
/deep/ .el-table td {
  background-color: transparent;
}
/deep/ .el-table thead {
    color: #94dfed;
    font-weight: 500;
}
.red {
  color: red;
}

.orange {
  color: orange;
}

.blue {
  color: blue;
}
  .mainContain{
    // height: 48vh;
    width: 100%;
    border: #aaadb1 solid 1.5px;
    border-radius: 6px;
    background-color: rgba(0,0,0,0.2);
  }
  .mainContain-title{
    
    border-bottom: #aaadb1 solid 1px;
    color: #63e9ea;
    padding: 6px 12px;
    margin: 0 11px;
  }
  .mainContain-title-left{
    // background-color: rgba(0,0,0,0.2);
    border-bottom: #aaadb1 solid 1px;
    color: #63e9ea;
    padding: 6px 12px;
    margin:0 11px;
  }
  .mainContain-title-right{
    // background-color: rgba(0,0,0,0.2);
    border-bottom: #aaadb1 solid 1px;
    color: #63e9ea;
    padding: 6px 12px;
    margin: 0 11px;
  }
  .zrzt{
    font-size: 14px;
    margin-bottom: 10px;
  }
  .zrzt> span:nth-child(odd) {
    margin: 0 5px 10px 25px;
    color: #63e9ea;
  }
  .zrzt> span:nth-child(even) {
    font-weight: 600;
  }
  .fhsyj{
    float: right !important;
    cursor: pointer;
    color: white !important;
  }
  .centerbody{
    position: relative;
    width: 100%;
    height: calc(100vh - 60px);
    background-image: url('../../assets/bg1.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: white;
    padding:0 20px;
    overflow: auto;
  }
  .body-left{

    position: relative;
    font-size: 14px;
    width: 20vw;
    background-color: rgba(255,255,255,0.2);
    border:1px solid rgba(112, 173, 239) ;
    box-shadow: 0 0 5px 3px rgba(112, 173, 239);
  }
  .body-right{
    width: 80vw;
    
  }
  .body-left div {
    font-size: 14px;
  display: flex;
  // align-items: center;
  margin-top: 20px;
}

.body-left div span {
  transform: translate(18px, 26px);
  width: 80px;
  margin-right: 20px;
}

/deep/.el-badge__content{
  border: 0px;
  height: 14px;
    line-height: 14px;
}
/deep/.el-input__inner,
/deep/.el-date-picker__editor{
  background-color: transparent !important;
  border: 1.5px solid rgba(101, 217, 225) !important;
  color: white
}
/deep/.el-range-input{
  background-color: transparent !important;
  color: white
}
/deep/.el-range-separator{
  color:white
}
/deep/.el-button--primary {
    color: #FFF;
    background-color: #0054aa;
    border-color: #0054aa;
}
// 小按钮样式
/deep/.el-button--mini, .el-button--mini.is-round {
    padding: 4px 18px;
}
// 鼠标浮动颜色
/deep/.el-table__body tr:hover>td{
 
 background-color: transparent !important;
  
 }
 /deep/.el-pagination{
  text-align:center;
  margin-top:20px;
} 
/deep/.el-date-editor .el-icon-date {
    display: none;
}

/deep/.el-range-input{
  width: 70px;
}
/deep/.el-range-editor.el-input__inner {

    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    padding: 3px 5px;
}
/deep/ .el-icon-circle-close{
  transform: translateY(-6px);
}
// page-sizes选择器
::v-deep .el-select-dropdown__item li{
  background-color:transparent !important;
}
// prev和next箭头的样式
::v-deep .el-pagination .btn-next,
::v-deep .el-pagination .btn-prev{
  background:transparent !important;
  background-color:transparent !important;
}
// prev和next箭头disabled的样式
::v-deep .el-pagination button:disabled {
  background-color:transparent !important;
}
// 页码样式
::v-deep .el-pager li{
  background-color:transparent !important;
}
// active的页码样式
::v-deep .el-pager li.active{
  color: #267aff !important;
}
/deep/.el-pagination__total {
    margin-right: 10px;
    font-weight: 400;
    color: white;
}
/deep/.el-pagination__jump {
    margin-left: 24px;
    font-weight: 400;
    color: white;
}
/deep/.el-table__row .cell{
  color:white
}

.el-date-editor /deep/.el-range__close-icon {
    font-size: 14px;
    color: #C0C4CC;
    width: 0px;
    display: inline-block;
    float: right;
    line-height: 32px;
}

/deep/ .el-table, /deep/ .el-table__expanded-cell{
  background-color: transparent;
}
/* 表格内背景颜色 */
/deep/ .el-table th,
/deep/ .el-table tr,
/deep/ .el-table td {
  background-color: transparent;
}
/deep/ .el-table thead {
    color: #94dfed;
    font-weight: 500;
}
  .user-dropdown {
  background-color: rgba(3, 33, 66, 0.8); /* 设置蓝色背景并增加透明度 */
}
.user-dropdown /deep/ .el-dropdown-menu__item {
  color: white; /* 设置字体颜色为白色 */
}
.user-dropdown /deep/.el-dropdown-menu__item:hover {
  color: black; /* 设置鼠标悬浮时的字体颜色为黑色 */
}
  .el-icon-menu {
  color: white; /* 替换为您想要的颜色值 */
  font-size: 20px;
  transform: translateX(-3px)
}
   .top-header {
    height: 60px !important;
    position: relative;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1001;
    font-size: 15px;
    background-color:#032142;
  }
//   .bgImage {
//     background: url('../../../assets/images/frame/header.png') no-repeat;
//     background-size: 100% 100%;
//   }
  .header {
    display: flex;
    align-items: center;
    height: 60px !important;
  }
  .left {
    flex: 3;
    padding-left: 30px;
    font-size: 20px;
    font-weight: bold;
    color: white;
  }
  .right {
    flex: 7;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 60px !important;
    padding-right: 20px;
  }
  .right-item {
    display: flex;
    align-items: center;
    margin: 0px 10px;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .right-item-img {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }
  .right-item-text {
    color: white;
    margin: 0px 5px;
  }
  
  .user-avatar {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }
  .user-name {
    color: white;
    margin: 0px 5px;
  }
  </style>
  