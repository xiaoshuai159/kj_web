<template>
  <div class="processormain">
    <div class="processorshadow-div processorshadow-form">
      <el-form :inline="true" class="selectform" ref="selectform" :model="selectForm">
        <el-row>
          <el-col :span="6" class="tar">
            <el-form-item prop="companyName" label="公司名">
              <el-input placeholder="请输入关键字" v-model="selectForm.companyName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="tar">
            <el-form-item prop="tagName" label="标签">
              <el-select placeholder="请选择" v-model="selectForm.tagName">
                <el-option v-for="item in srctageIds" :key="item.key" :label="item.label" :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="tar">
            <el-form-item prop="isSubmitBeian" label="是否提交备案">
              <el-select placeholder="请选择" v-model="selectForm.isSubmitBeian">
                <el-option :value="1" label="是">是 </el-option>
                <el-option :value="0" label="否">否 </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="tar">
            <el-form-item prop="beianResult" label="备案是否通过">
              <el-select placeholder="请选择" v-model="selectForm.beianResult">
                <el-option :value="1" label="是">是 </el-option>
                <el-option :value="0" label="否">否 </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="tar">
            <el-form-item prop="isBeianEffective" label="备案是否在有效期">
              <el-select placeholder="请选择" v-model="selectForm.isBeianEffective">
                <el-option :value="1" label="是">是</el-option>
                <el-option :value="0" label="否">否 </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="tar">
            <el-form-item prop="isSubmitShenbao" label="是否提交申报">
              <el-select placeholder="请选择" v-model="selectForm.isSubmitShenbao">
                <el-option :value="1" label="是">是 </el-option>
                <el-option :value="0" label="否">否 </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="tar">
            <el-form-item prop="shenbaoResult" label="申报是否通过">
              <el-select placeholder="请选择" v-model="selectForm.shenbaoResult">
                <el-option :value="1" label="是">是 </el-option>
                <el-option :value="0" label="否">否 </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="tar">
            <el-form-item prop="isShenbaoEffective" label="申报是否在有效期">
              <el-select placeholder="请选择" v-model="selectForm.isShenbaoEffective">
                <el-option :value="1" label="是">是 </el-option>
                <el-option :value="0" label="否">否 </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div style="display: inline-block;float: right;  ">
              <el-button type="primary" @click="searchForm()">查询</el-button>
              <el-button type="info" @click="resetForm()">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="undershadow">
      <!-- 创建任务 -->
      <div style="margin-left: 15px;">
        <el-button type="primary" style="width: 100px;  background-color: #1bc5bd;border-color:#1bc5bd"
          @click="addindustrydialogFormVisible = true" class="marginright">+ 新增公司</el-button>
        <!-- 弹窗 -->
        <el-dialog title="新增公司" :visible.sync="addindustrydialogFormVisible" class="addindustry">
          <el-form :model="addindustryForm">
            <el-form-item label="公司名" :label-width="formLabelWidth" props="companyName">
              <el-input v-model="addindustryForm.companyName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="标签" :label-width="formLabelWidth" props="taginfoId">
              <el-select v-model="addindustryForm.taginfoId" placeholder="请选择" style="width: 100%;">
                <el-option v-for="item in srctageIds" :key="item.key" :label="item.label" :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addindustrydialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addindustry()">确 定</el-button>
          </div>
        </el-dialog>
        <el-button type="primary" style="width: 100px;  background-color: #ff9f43;border-color:#ff9f43"
          @click="updateindustrydialogFormVisible = true" class="marginright">+ 修改标签</el-button>
        <!-- 弹窗 -->
        <el-dialog title="修改标签" :visible.sync="updateindustrydialogFormVisible" class="updateindustry">
          <el-form :model="updateindustryForm">
            <el-form-item label="公司名" :label-width="formLabelWidth" props="companyName">
              <el-input v-model="updateindustryForm.companyName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="标签" :label-width="formLabelWidth" props="taginfoId">
              <el-select v-model="updateindustryForm.taginfoId" placeholder="请选择" style="width: 100%;">
                <el-option v-for="item in srctageIds" :key="item.key" :label="item.label" :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="updateindustrydialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateindustrydialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
        <el-button type="primary" style="width: 100px;  background-color: #158df7;border-color:#158df7"
          class="marginright">+ 新增备案</el-button>
        <el-button type="primary" style="width: 100px;  background-color: #f64e60;border-color:#f64e60"
          class="marginright" @click="addshenbao()">+ 新增申报</el-button>
      </div>

      <div class=" processorshadow-div">
        <div class="base_table">
          <el-table :data="tableData" ref="processorTable" style="width: 100%" tooltip-effect="dark"
            :header-cell-style="{ background: '#C6D9F1', color: '#101010', padding: '0px', 'text-align': 'center' }"
            :cell-style="{ padding: '0px' }" :row-style="{ height: '45px' }" :header-row-style="{ height: '38px' }"
            stripe>
            <el-table-column prop="number" :show-overflow-tooltip="true" label="编号" width="40px" align="center"
              fixed="left">
              <template slot-scope="scope">
                {{ scope.$index + (currentPage - 1) * pageSize + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="name" :show-overflow-tooltip="true" label="公司名" maxwidth="300px" align="left">
            </el-table-column>
            <el-table-column prop="tagName" :show-overflow-tooltip="true" label="标签" maxwidth="200px" align="left">
            </el-table-column>
            <el-table-column prop="isSubmitBeian" :show-overflow-tooltip="true" label="是否提交备案" width="90px"
              align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.isSubmitBeian == 1" class="istrue"> 是 </div>
                <div v-if="scope.row.isSubmitBeian == 0" class="isfalse"> 否 </div>
              </template>
            </el-table-column>
            <el-table-column prop="beianResult" :show-overflow-tooltip="true" label="备案是否通过" width="90px" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.beianResult == 1" class="istrue"> 是 </div>
                <div v-if="scope.row.beianResult == 0" class="isfalse"> 否 </div>
              </template>
            </el-table-column>
            <el-table-column prop="isBeianEffective" :show-overflow-tooltip="true" label="备案是否在有效期内" width="130px"
              align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.isBeianEffective == 1" class="istrue"> 是 </div>
                <div v-if="scope.row.isBeianEffective == 0" class="isfalse"> 否 </div>
              </template>
            </el-table-column>
            <el-table-column prop="isSubmitShenbao" :show-overflow-tooltip="true" label="是否提交申报" width="90px"
              align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.isSubmitShenbao == 1" class="istrue"> 是 </div>
                <div v-if="scope.row.isSubmitShenbao == 0" class="isfalse"> 否 </div>
              </template>
            </el-table-column>
            <el-table-column prop="shenbaoResult" :show-overflow-tooltip="true" label="申报是否通过" width="90px"
              align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.shenbaoResult == 1" class="istrue"> 是 </div>
                <div v-if="scope.row.shenbaoResult == 0" class="isfalse"> 否 </div>
              </template>
            </el-table-column>
            <el-table-column prop="isShenbaoEffective" :show-overflow-tooltip="true" label="申报是否在有效期内" width="130px"
              align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.isShenbaoEffective == 1" class="istrue"> 是 </div>
                <div v-if="scope.row.isShenbaoEffective == 0" class="isfalse"> 否 </div>
              </template>
            </el-table-column>
            <el-table-column prop="updateTime" :show-overflow-tooltip="true" label="更新时间" width="140px" align="center">
            </el-table-column>
            <el-table-column prop="operate" label="操作" width="90px" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" size="small"
                  style="color: #3286FF;width: 40px;margin: 0px;padding: 0px;">详情</el-button>
                <el-button type="text" size="small"
                  style="color: #E41634;width: 40px;margin: 0px;padding: 0px;">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="block" style="display: flex; justify-content: center;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
          :total="hostTotal">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      currentPage: 1, //当前页码
      pageSize: 10, //每页最大条数
      hostTotal: 0, //实际数据总条数

      addindustrydialogFormVisible: false,
      updateindustrydialogFormVisible: false,

      srctageIds: [],

      formLabelWidth: '120px',
      selectForm: {
        companyName: '',
        tagName: '',
        isSubmitBeian: '',
        beianResult: '',
        isBeianEffective: '',
        isSubmitShenbao: '',
        shenbaoResult: '',
        isShenbaoEffective: '',
      },
      addindustryForm: {
        companyName: '',
        taginfoId: '',
      },
      updateindustryForm: {
        companyName: '',
        taginfoId: '',
      },
      tableData: [{
        name: '',
        tagName: '',
        isSubmitBeian: 1,
        beianResult: 1,
        isBeianEffective: 1,
        isSubmitShenbao: 1,
        shenbaoResult: 1,
        isShenbaoEffective: 1,
      }
      ],
    };
  },
  //页面元素内容加载前需要执行的方法
  created() {
    this.getptagListByType();
    this.loadAPI();

  },

  mounted() {
    window.addEventListener("keydown", this.handleSearch);
  },
  destroyed() {
    window.removeEventListener("keydown", this.handleSearch, false); //销毁回车事件，如果不销毁，在其他页面敲回车也会执行回车登录操作。
  },
  methods: {
    //跳转页面
    addshenbao() {
      this.$router.push("/processorManage/shenbao");
    },
    //获取数据处理者
    async getptagListByType() {
      let list = {
        tagType: 0
      }
      const { data: res } = await this.$http.post('/api/tag/tagListByType', list);
      if (res.code == 200) {
        this.srctageIds = res.data.map((item) => ({
          label: item.tagName,
          key: item.id,
        }));
        // this.processorOptions = res.data.map(obj => obj.tagName);
        //this.processores = this.processorOptions;
      }
    },
    // selectForm: {
    //   name: '',
    //   tagName: '',
    //   isSubmitBeian: '',
    //   beianResult: '',
    //   isBeianEffective: '',
    //   isSubmitShenbao: '',
    //   shenbaoResult: '',
    //   isShenbaoEffective: '',

    // },
    searchForm() {
      this.currentPage = 1;
      this.loadAPI();
    },
    //     //查询数据
    async loadAPI() {
      //列表初始化
      let list = {
        companyName: this.selectForm.companyName,
        tagName: this.selectForm.tagName,
        isSubmitBeian: this.selectForm.isSubmitBeian,
        beianResult: this.selectForm.beianResult,
        isBeianEffective: this.selectForm.isBeianEffective,
        isSubmitShenbao: this.selectForm.isSubmitShenbao,
        shenbaoResult: this.selectForm.shenbaoResult,
        isShenbaoEffective: this.selectForm.isShenbaoEffective,

        pageSize: this.pageSize,
        pageNum: this.currentPage,
      };
      const { data: res } = await this.$http.post("/api/companyInfo/companyInfoList", list);
      if (res.code == 200) {
        this.tableData = res.data.content
        this.hostTotal = res.data.totalElements
        this.$nextTick(() => {
          this.$refs["processorTable"].doLayout();
        });
      }
    },
    //改变页面大小
    handleSizeChange(val) {
      this.pageSize = val;
      this.loadAPI();
    },
    //改变页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loadAPI();
    },
    async addindustry() {
      let list = {
        companyName: this.addindustryForm.companyName,
        taginfoId: this.addindustryForm.taginfoId,
      }
      try {
        const { data: res } = await this.$http.post("/api/companyInfo/addCompanyinfo", list);
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.loadAPI();
      } catch (error) {
        this.$message.error("请求失败，请稍后重试");
      } finally {
        this.addindustrydialogFormVisible = false; // 在请求完成后关闭弹窗
      }
    },
    async updateindustry() {
      let list = {
        companyName: this.updateindustryForm.companyName,
        taginfoId: this.updateindustryForm.taginfoId,
      }
      try {
        const { data: res } = await this.$http.post("/api/companyInfo/updateCompanyinfo", list);
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.loadAPI();
      } catch (error) {
        this.$message.error("请求失败，请稍后重试");
      } finally {
        this.updateindustrydialogFormVisible = false; // 在请求完成后关闭弹窗
      }
    },

    //     //新增规则
    //     addlawsFile() {
    //         //this.$router.push("#");
    //     },
    //重置
    resetForm() {

      this.selectForm.companyName = '';
      this.selectForm.tagName = '';
      this.selectForm.isSubmitBeian = '';
      this.selectForm.beianResult = '';
      this.selectForm.isBeianEffective = '';
      this.selectForm.isSubmitShenbao = '';
      this.selectForm.shenbaoResult = '';
      this.selectForm.isShenbaoEffective = '';
      this.loadAPI();
    },
    //     //修改 跳转页面
    //     async updateTerm(id) {
    //         this.$router.push({
    //             path: "/lawsManage/addstandardizeFile",
    //             query: {
    //                 from: "update", //更新客户端信息页面
    //                 id: id,
    //                 lawtermId: this.selectForm.lawtermId,
    //             },
    //         });
    //     },
    //     //删除
    //     async deleteFile(id) {
    //         this.$confirm("此操作将删除该任务, 是否继续?", "提示", {
    //             confirmButtonText: "确定",
    //             cancelButtonText: "取消",
    //             type: "warning",
    //         })
    //             .then(async () => {
    //                 const { data: res } = await this.$http.post("/api/standardiza/deleteStandardiza?id=" + id);

    //                 if (res.code == 200) {
    //                     let totalPage = Math.ceil((this.taskTotal - 1) / this.pageSize); // 总页数
    //                     let currentPage =
    //                         this.currentPage > totalPage
    //                             ? totalPage
    //                             : this.currentPage;

    //                     this.currentPage = currentPage < 1 ? 1 : currentPage;
    //                     this.loadAPI();
    //                     this.$message({
    //                         message: "删除成功",
    //                         type: "success",
    //                     });
    //                 } else {
    //                     this.$message(res.message);
    //                 }
    //             })
    //             .catch(() => {
    //                 this.$message("已取消删除");
    //             });
    //     },

  }

}
</script>
<style>
.processorshadow-div {
  padding-top: 20px;
  margin-bottom: 20px;
  width: calc(100% - 30px);
  background-color: #fff;
  position: relative;
  margin: auto;
  margin-bottom: 20px;
}

:deep(.el-form--inline .el-form-item) {
  display: inline-block;
  margin-right: 1px;
  vertical-align: top;
}

.el-button {
  color: #ffffff;
  height: 30px !important;
  width: 60px;
  line-height: 0px;
  border-radius: 4px;
  padding: 0px !important;

}

.el-button--primary {
  background: #0054AA;
  border-color: #0054AA;
}

.el-button--info {
  background: #d3d4dd;
  border-color: #d3d4dd;
  color: black !important;
}

.selectform .el-form-item {
  margin-right: 0px !important;
}

/* label标签 */
.processormain .processorshadow-form .el-form-item__label {
  line-height: 48px;
  width: 120px;
  height: 30px;
  line-height: 30px;
  padding: 0px;
  background-color: #f5f7fa;
  border: 1px solid rgb(212, 207, 207);
  border-right: none;
  border-radius: 4px 0px 0px 4px;
  text-align: center;
  margin-top: 4px
}

/* 查询输入框 */
.processormain .selectform .el-input__inner {
  width: 140px;
  height: 30px;
  padding: 0px 10px;
  /* border:0px 4px 4px 0px!important; */
}

/* 查询框上边距 */
.processormain .processorshadow-form {
  width: calc(100% - 30px);
  border-radius: 10px;
  padding: 20px 10px 20px 10px;
  margin-bottom: 30px;
  box-shadow:
    0 0 8px #ededed,
    0 0 8px #ededed,
    0 0 8px #ededed,
    0 0 8px #ededed;
}

.el-form-item {
  margin-bottom: 8px;
}

/* 斑马线颜色 */
.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
  background: #E6EDF8;
}

.filetbale .el-button {
  width: 50px;
  padding: 0 0;
}

/* 边框阴影 */
/* .processormain {
    box-shadow:
    0 0 8px #ededed,
    0 0 8px #ededed,
    0 0 8px #ededed,
    0 0 8px #ededed;
  margin: auto;
  margin-bottom: 20px;
  margin-top: 15px;
  padding-top: 10px;
  width: calc(100% - 30px);
  border-radius: 10px;

} */

.undershadow {
  box-shadow:
    0 0 8px #ededed,
    0 0 8px #ededed,
    0 0 8px #ededed,
    0 0 8px #ededed;
  margin: auto;
  margin-bottom: 20px;
  margin-top: 15px;
  padding-top: 10px;
  width: calc(100% - 30px);
  border-radius: 10px;
}

.block {
  padding-bottom: 20px;
  /* padding-top: 20px; */
}

.el-table th.el-table__cell>.cell {
  padding: 0px;
}

.el-table .cell {
  padding: 0px;
}

.datestyle .el-input__icon {
  margin-right: 10px;
}

/* 是否标签 */

.istrue {
  color: #56AB61;
  background-color: rgba(224, 255, 208, 0.94);
  width: 30px;
  height: 27px;
  line-height: 27px;
  display: inline-block;
  border-radius: 4px;
}

.isfalse {
  color: #E2250F;
  background-color: rgba(226, 37, 15, 0.25);
  width: 30px;
  height: 27px;
  line-height: 27px;
  display: inline-block;
  border-radius: 4px;
}

.tar {
  text-align: center;
}

/* 序号最小宽度 */
.el-table .cell.el-tooltip {
  min-width: 40px !important;
  ;
}

.marginright {
  margin-right: 20px;
}</style>