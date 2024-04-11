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
        <div class="body-left" :class="{'is-collapsed': !isActive}">
          <div>
            <span>责任主体</span>
            <el-input v-model="operatorName" size="mini" placeholder="请输入内容" style="width: 180px;"></el-input>
          </div>
          <div>
            <span>源IP</span>
            <el-input v-model="sourceIP" size="mini" placeholder="请输入内容" style="width: 180px;"></el-input>
          </div>
          <div>
            <span>违反法律</span>
            <el-select v-model="wffl" size="mini" placeholder="请选择" style="width: 180px;">
              <el-option
              
                v-for="item in lawsOptions"
                :key="item.id"
                :label="item.lawName"
                :value="item.id">
              </el-option>
            </el-select>
            <!-- <el-input v-model="wffl" size="mini" placeholder="请输入内容" style="width: 150px;"></el-input> -->
          </div>
          <div>
            <span>时间范围</span>
            <el-date-picker
            style="width: 180px;"
            size="mini"
              v-model="dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div style="position:fixed; bottom:10px; text-align: center; left:10%; transform: translate(-50%,-50%)">
            <el-button size="mini" type="primary" @click="searchClick" style="width: 70px; height: 26px;">查询</el-button>
            <el-button size="mini" style="color: black;width: 70px; height: 26px;" @click="resetForm" >重置</el-button>
          </div>
        </div>
        <div class="body-right" >
          <div style="display: inline-block; padding: 0 5px 0 15px;"  @click="toggleMenu">
            <svg
              :class="{'is-active':isActive}"
              class="hamburger"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
            >
              <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z" />
            </svg>
          </div>
          <div style="display: inline-block;margin: 8px 0 0 8px; font-size: 12px; "><span style="color: #918c8b;">当前位置：</span><span>违规事件查询</span></div>
          <div> <el-button style="position:absolute; right:10px;width: 70px; height: 26px;"  type="warning" size="mini">导出</el-button></div>
          <div>
            <el-table
              :data="tableData"
              :cell-style="{borderColor:'#9eadc1',height:'45px',padding: '0',fontSize: '14px'}"
              :header-cell-style="{borderColor:'#9eadc1'}"
              style="width:auto;margin: 36px 20px 0 20px;">
              <!-- <el-table-column
                align="center"
                label="编号"
                type="index"
                width="48">
              </el-table-column> -->
              <el-table-column
                align="center"
                label="编号"
                width="48">
                <template #default="{$index}">
                  <span>
                    {{ (currentPage-1)*pageSize +$index+1 }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="operatorName"
                label="责任主体"
                min-width="180"
                :show-overflow-tooltip="true"
                >
              </el-table-column>
              <el-table-column
                prop="srcIpNum"
                label="源IP个数"
                width="100"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="personalInfoRecordTotal"
                label="个人信息"
                width="100"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <div>
                    {{ scope.row.personalInfoRecordTotal }}条_{{ scope.row.pInfoHumanNum }}人
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="个人敏感信息"
                width="128"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <div>
                    {{ scope.row.personalSentiveInfoRecord }}条_{{ scope.row.pSentiveInfoHumanNum }}人
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="importantDataRecord"
                label="重要数据"
                width="100"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <div>
                    {{ scope.row.importantDataRecord }}条
                  </div>
                </template>
              </el-table-column>
              <!-- <el-table-column
                prop="totalRecord"
                label="涉及自然人(人)"
                width="115"
                :show-overflow-tooltip="true">
              </el-table-column> -->
              <!-- <el-table-column
                prop="datalabelNames"
                label="数据标签"
                min-width="130"
                :show-overflow-tooltip="true"
                :formatter="formatDatalabelNames">
              </el-table-column> -->
              <el-table-column
                prop="lawName"
                label="违反法律法规"
                min-width="110"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="eventTimeBegin"
                label="发现时间"
                width="95"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="eventTimeEnd"
                label="截止时间"
                width="95"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="cz"
                label="操作"
                align="center"
                fixed="right"
                min-width="60">
                <template slot-scope="scope">
                  <el-button @click="xqClick(scope.row)" type="text" size="small" style="color:#3082f7">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="block">
            <el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="hostTotal" width="100px">
            </el-pagination>
        </div>
        <el-dialog title="全部域名" class="dialogInfo" width="35%" :visible.sync="dialogVisible" max-height='70vh' :style="{ 'overflow-y': 'auto' }">
          <ul>
            <li v-for="domain in getDomainList(dialogContent)" :key="domain">{{ domain }}</li>
          </ul>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false" size="mini"
                class="el-button-xitongerr">确定</el-button>
          </span>
        </el-dialog>
        </div>
      </div>

    </div>
  </template>
  
  <script>
   import { mapGetters } from 'vuex'
  export default {
    name: 'redirectPage',
    components: {
    },
    data() {
      return {
        dialogContent:'',
        dialogVisible:false,
        isActive: true,
        operatorName:'',
        wffl:'',
        sourceIP:'',
        dateRange:'',
        currentPage: 1,
        pageSize: 10,
        hostTotal: 0,
        // 顶栏标题
        headerTitle: '数据出境违规行为判定',
        datalabelMap: {}, // 数据标签映射
        lawsOptions:[],
        tableData:[
        //   {
        //   operatorName:'中国电信',
        //   personalInfoRecord:110000,
        //   personalSentiveInfoRecord:20000,
        //   importantDataRecord:0,
        //   totalRecord:130000,
        //   datalabelNames:'姓名',
        //   lawName:'数据出境安全评估办法',
        //   eventTimeBegin:'2023/3/1',
        //   eventTimeEnd:'2023/3/20'
        // }
      ]
      }
    },
    computed: {
      ...mapGetters([
        'avatar',
        'name'
      ])
    },
    mounted() {
      this.loadAPI()
    },
    created() {
      this.getAllLawsAPI()
    // 从后端获取数据标签列表，并将它们存储为一个映射对象
    this.fetchDatalabelList().then((datalabelList) => {
      this.datalabelMap = datalabelList.reduce((map, datalabel) => {
        map[datalabel.datalabelCode] = datalabel.datalabelName;
        return map;
      }, {});
    });
  },
    methods: {
      async getAllLawsAPI(){
        const {data:res} = await this.$http.get('/api/law/lawAllList');
        if(res.code == 200){
          this.lawsOptions = res.data
        }
      },
      getDomainList(content) {
      if (typeof content === 'string') {
        return content.split(',');
      }
      return [];
    },
      fetchDatalabelList() {
      // 调用后端接口获取数据标签列表
      // 该接口应返回一个Promise对象
      return this.$http.get('/api/datalabel/getLabelList').then((response) => {
        return response.data.data;
      });
    },
    formatDatalabelNames(row, column, cellValue) {
      // 将英文逗号分隔的数据标签转换为中文逗号分隔的字符串
      const datalabels = cellValue.split(',');
      const chineseDatalabels = datalabels.map((datalabel) => {
        return this.datalabelMap[datalabel] || datalabel;
      });
      return chineseDatalabels.join('，');
    },
      toggleMenu() {
        this.isActive = !this.isActive;
        const bodyRight = document.querySelector('.body-right');
        if (!this.isActive) {
          bodyRight.classList.add('is-expanded');
          bodyRight.style.width = '100vw';
        } else {
          bodyRight.classList.remove('is-expanded');
          bodyRight.style.width = '';
        }
      },
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      },
      xqClick(row){
        // console.log(row);
        localStorage.setItem('row',JSON.stringify(row))
        this.$router.push({
          name: 'xqRirectPage', // 目标路由的名称
          params: { row } // 传递当前行的数据作为参数
        });
      },
      //页面元素内容加载前需要执行的方法
      resetForm() {
        this.dateRange = '';
        this.operatorName = '';
        this.wffl = '';
        this.sourceIP = '';
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
                sourceIP: this.sourceIP,
                pageSize: this.pageSize,
                pageNum: this.currentPage
            };
            // console.log(list);
            const { data: res } = await this.$http.post("/api/event/getEventList", list);
            // console.log(res);
            if (res.code == 200) {
              // console.log(res.data.list);
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
  .body-left.is-collapsed {
    width: 0;
  display: none;
}
.body-right.is-expanded {
  width: 100vw;
}
  .centerbody{
    width: 100%;
  height: calc(100vh - 60px);
  background-image: url('../../assets/bg1.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: white;
  display: flex;
  }
  .body-left{

    position: relative;
    font-size: 14px;
    width: 20vw;
    background-color: rgba(255,255,255,0.2);
    border:1px solid rgba(112, 173, 239) ;
    box-shadow: 0 0 5px 3px rgba(112, 173, 239);
    transition: width 0.5s ease-in-out;
  }
  .body-right{
    width: 80vw;
    transition: width 0.5s ease-in-out;
  }
  .body-left div {
    font-size: 14px;
  display: flex;
  // align-items: center;
  margin-top: 20px;
}

.body-left div span {
  transform: translate(18px, 26px);
  width: 70px;
  margin-right: 20px;
}
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  fill: #fff;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
// /deep/.el-table__fixed, .el-table__fixed-right{
//   background-color: rgba(10, 32, 64, 0.5);
// }
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
  color:white !important;
}
// prev和next箭头disabled的样式
::v-deep .el-pagination button:disabled {
  background-color:transparent !important;
}
// 页码样式
::v-deep .el-pager li{
  background-color:transparent !important;
  color:white !important;
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
/deep/.el-table__fixed-right{
  z-index: 999;
  background-color: rgba(6, 30, 58);
}
/deep/.el-table__row:hover {
  background-color: transparent!important;
  /* 其他样式 */
}
/deep/.el-table__body tr.hover-row.current-row>td.el-table__cell, /deep/.el-table__body tr.hover-row.el-table__row--striped.current-row>td.el-table__cell, /deep/.el-table__body tr.hover-row.el-table__row--striped>td.el-table__cell, /deep/.el-table__body tr.hover-row>td.el-table__cell {
  background-color: transparent!important;
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
  .dialogInfo /deep/ .el-dialog {
    // background: #021c2d url(../assets/img/shouye/背景框.png) no-repeat;
    background-size: 100% 100%;
    padding: 10px;
    opacity: 0.9;
    box-sizing: border-box;
    .el-dialog__headerbtn {
      top: 5px !important;
      right: 10px !important;
      .el-dialog__close {
        color: #fff;
        font-size: 14px;
      }
    }
    .el-dialog__header {
      margin: 20px 20px 0px 20px;
      // background: url(../assets/img/shouye/标题矩形.png) no-repeat;
      background-size: 100% 100%;
    }
    .el-dialog__title,
    .gailan h3,
    .gailan1 h3 {
      color: #2fbcfc;
    }
    .gailan h3,
    .gailan1 h3 {
      padding-left: 10px;
    }
  }
  .dialogInfo ul {
  list-style: none; /* 去掉默认的列表样式 */
}
  </style>
  