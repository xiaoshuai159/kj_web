<template>
    <div>
        <div class="shadow-div shadow-form" style="margin-bottom: 10px;">
            <el-form :inline="true" class="selectform" ref="selectForm" :model="selectForm">
                <el-form-item prop="lawName" label="法律名称:" >
                    <el-input placeholder="请输入关键字" v-model="selectForm.lawName" ></el-input>
                </el-form-item>
                <el-form-item prop="IndustryCode" label="行业:" v-model="selectForm.IndustryCode" >
                    <el-select v-model="selectForm.IndustryCode" placeholder="请选择行业">
                        <el-option v-for="item in potOpt" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="publishTime" label="出版时间:">
                    <el-date-picker v-model="selectForm.publishTime" type="date" placeholder="选择日期" style="width: 160px;"
                        :prefix-icon="selectForm.publishTime ? '   ' : 'el-icon-date'">
                    </el-date-picker>
                </el-form-item>
                <div style="display: inline-block;float: right;  ">
                    <el-button type="primary" @click="searchForm()">查询</el-button>
                    <el-button type="info" @click="resetForm()">重置</el-button>
                </div>
            </el-form>
        </div>
        <!-- 创建任务 -->
        <div style="margin-left: 15px;margin-bottom: 20px;">
            <el-button type="primary" @click="addlawsFile()" style="width: 100px;">+ 新增文件</el-button>
        </div>
        <div class="shadow-div">
            <div class="base_table">
                <el-table :data="tableData" style="width: 100%" tooltip-effect="dark" ref="lawsTable"
                    :header-cell-style="{ background: '#C6D9F1', color: '#101010', padding: '0px', 'text-align': 'center' }"
                    :cell-style="{ padding: '0px' }" :row-style="{ height: '45px' }" :header-row-style="{ height: '38px' }"
                    stripe class="filetbale">
                    <el-table-column :show-overflow-tooltip="true" label="编号" width="40px" align="center" fixed="left">
                        <template slot-scope="scope">
                            {{ scope.$index + (currentPage - 1) * pageSize + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" :show-overflow-tooltip="true" label="文件ID" width="50px" align="center">
                    </el-table-column>
                    <el-table-column prop="lawName" :show-overflow-tooltip="true" label="法律法规名称" maxwidth="400px"
                        align="left">
                    </el-table-column>
                    <el-table-column prop="industryName" :show-overflow-tooltip="true" label="行业" width="60px"
                        align="center">
                    </el-table-column>
                    <el-table-column prop="lawDesc" :show-overflow-tooltip="true" label="备注" width="180px" align="center">
                    </el-table-column>
                    <el-table-column prop="fileName" :show-overflow-tooltip="true" label="附件" width="100px" align="center">
                    </el-table-column>
                    <el-table-column prop="publishTime" :show-overflow-tooltip="true" label="出版时间" width="80px"
                        align="center">
                    </el-table-column>
                    <el-table-column prop="enactTime" :show-overflow-tooltip="true" label="生效时间" width="145px"
                        align="center">
                    </el-table-column>
                    <el-table-column prop="updateTime" :show-overflow-tooltip="true" label="更新时间" width="145px"
                        align="center">
                    </el-table-column>
                    <el-table-column prop="operate" label="操作" width="130px" align="center" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="text" size="small"
                                style="color: #F39300;width: 40px;margin: 0px;padding: 0px;">下载</el-button>
                            <el-button type="text" size="small"
                                style="color: #3286FF; width: 40px;margin: 0px;padding: 0px;"
                                @click="updateLawTerm(scope.row.id)">修改</el-button>
                            <el-button type="text" size="small"
                                style="color: #E41634; width: 40px;margin: 0px;padding: 0px;"
                                @click="deleteLawsFile(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="hostTotal">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { List } from 'echarts';
import { Loading } from 'element-ui';


export default {
    data() {

        return {
            currentPage: 1, //当前页码
            pageSize: 10, //每页最大条数
            hostTotal: 0, //实际数据总条数
            selectForm: {
                lawName: '',
                IndustryCode: '',
                publishTime: '',
            },
            tableData: [],
            potOpt: [],
        };
    },
    //页面元素内容加载前需要执行的方法
    created() {
        this.selectForm.lawName = this.$route.query.lawName || '';
        this.selectForm.industryId = this.$route.query.IndustryCode || '';
        this.selectForm.publishTime = this.$route.query.publishTime || '';
        this.pageSize = this.pageSize;
        this.pageNum = this.currentPage;
        this.loadAPI();
        this.industryAllList();
    },

    mounted() {
        window.addEventListener("keydown", this.handleSearch);
    },
    destroyed() {
        window.removeEventListener("keydown", this.handleSearch, false); //销毁回车事件，如果不销毁，在其他页面敲回车也会执行回车登录操作。
    },

    methods: {
        //查询数据
        async loadAPI() {
            //列表初始化
            let list = {
                lawName: this.selectForm.lawName,
                industryId: this.selectForm.IndustryCode,
                publishTime: this.selectForm.publishTime,
                pageSize: this.pageSize,
                pageNum: this.currentPage
            };
            const { data: res } = await this.$http.post("/api/law/lawList", list);
            if (res.code == 200) {
                this.tableData = res.data.content
                this.hostTotal = res.data.totalElements
                this.$nextTick(() => {
                    this.$refs["lawsTable"].doLayout();
                });
            }
        },

        //查询行业
        async industryAllList() {
            const { data: res } = await this.$http.get("/api/industry/industryAllList");
            if (res.code == 200) {
                this.potOpt = res.data.map((item) => ({
                    key: item.id,
                    value: item.industryName,
                }));
            };
            console.log(this.potOpt)
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
        addlawsFile() {
            this.$router.push("/lawsManage/addlawsFile");
        },
        resetForm() {
            this.selectForm.lawName = '';
            this.selectForm.IndustryCode = '';
            this.selectForm.publishTime = '';
            this.currentPage=1;
            this.loadAPI();
        },
        searchForm(){
            this.currentPage=1;
            this.loadAPI();
        },
        //下载  待修改

        // async downloadApp(id) {
        //     const { data: res } = await this.$http.get(
        //         "/app/download?id=" + id,
        //         {
        //             responseType: 'blob', //设置请求的类型为blob文件流形式
        //         },
        //     );
        //     console.log(res);
        //     let binaryData = [];
        //     binaryData.push(res);
        //     var _url = window.URL.createObjectURL(new Blob(binaryData, { type: "application/vnd.ms-excel" }))
        //     window.open(_url, "_blank").focus();
        // },

        //修改
        async updateLawTerm(id) {
            this.$router.push({
                path: "/lawsManage/addlawsFile",
                query: {
                    from: "update", //更新客户端信息页面
                    id: id,
                    //修改返回原来页面所需参数
                    lawName: this.selectForm.lawName,
                    industryId: this.selectForm.IndustryCode,
                    publishTime: this.selectForm.publishTime,
                    pageSize: this.pageSize,
                    pageNum: this.currentPage

                },
            });
        },
        //删除
        async deleteLawsFile(id) {
            //let intid = parseInt(id);
            //console.log(typeof intid, intid);
            this.$confirm("此操作将删除该任务, 是否继续?", "提示", {                
                confirmButtonText: "确定",                
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(async () => {
                    const { data: res } = await this.$http.post("/api/law/deleteLaw?id=" + id);
                    if (res.code == 200) {
                        let totalPage = Math.ceil((this.taskTotal - 1) / this.pageSize); // 总页数
                        let currentPage = this.currentPage > totalPage ? totalPage : this.currentPage;
                        this.currentPage = currentPage < 1 ? 1 : currentPage;
                        this.loadAPI();
                        this.$message({
                            message: "删除成功",
                            type: "success",
                        });
                    } else {
                        this.$message(res.message);
                    }
                })
                .catch(() => {
                    this.$message("已取消删除");
                });
        },
    }
}
</script>
<style>
.shadow-div {
    width: calc(100% - 30px);
    background-color: #fff;
    position: relative;
    margin: auto;
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


/* 查询条件之间距离 */
.selectform .el-form-item {
    margin-right: 80px;
}

/* label标签 */
.shadow-form .el-form-item__label {
    /* margin-left: 10px; */
    line-height: 40px;
    padding: 0px;
    margin-right: 10px;
}

/* 查询输入框 */
.selectform .el-input__inner {
    width: 160px;
    height: 30px;
    padding: 0px 10px;
    /* margin-right: 30px!important; */
}

/* 查询框上边距 */
.main .shadow-form {
    padding-top: 5px;
}

.el-form-item {
    margin-bottom: 2px;
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
/* .main {
    box-shadow:
        0 0 8px #ededed,
        0 0 8px #ededed,
        0 0 8px #ededed,
        0 0 8px #ededed;
    margin: auto;
    margin-bottom: 20px;
    margin-top: 5px;
    padding-top: 10px;
    width: calc(100% - 30px);
    border-radius: 5px;

} */

.block {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    padding-bottom: 10px;
}

.el-table th.el-table__cell>.cell {
    padding: 0px;
}

.el-table .cell {
    padding: 0px;
    /* font-size: 12px; */
}

.el-table .cell.el-tooltip {
    min-width: 40px !important;
    ;
}

.datestyle .el-input__icon {
    margin-right: 10px;
}

/* .addbutton{
    padding: 0px!important;
    width: 100px
} */

/**********css：全局配置样式***********/

.el-date-editor {
    .el-input__inner {
        padding-left: 10px;
    }

    .el-input__prefix {
        left: initial;
        right: 5px;
    }
}

.el-message-box__btns > button:first-child{
    color: #606266;
}

</style>