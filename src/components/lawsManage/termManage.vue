<template>
    <div>
        <div class="shadow-div shadow-form" style="margin-bottom: 10px;">
            <el-form :inline="true" class="selectform" ref="selectForm" :model="selectForm">
                <el-form-item prop="lawName" label="法律名称:">
                    <el-input placeholder="请输入关键字" style="width: 200px;" v-model="selectForm.lawName"></el-input>
                </el-form-item>
                <el-form-item prop="lawtermContent" label="条款内容:">
                    <el-input placeholder="请输入关键字" style="width: 200px;" v-model="selectForm.lawtermContent"></el-input>
                </el-form-item>
                <div style="display: inline-block;float: right; ">
                    <el-button type="primary" @click="searchForm()">查询</el-button>
                    <el-button type="info" @click="resetForm()">重置</el-button>
                </div>
            </el-form>
        </div>
        <!-- 创建任务 -->
        <div style="margin-left: 15px;margin-bottom: 20px;">
            <el-button type="primary" @click="addtermFile()" style="width: 100px;">+ 新增规则</el-button>
        </div>
        <div class="shadow-div">
            <div class="base_table">
                <el-table :data="tableData" ref="termsTable" style="width: 100%" tooltip-effect="dark"
                    :header-cell-style="{ background: '#C6D9F1', color: '#101010', padding: '0px', 'text-align': 'center' }"
                    :cell-style="{ padding: '0px' }" :row-style="{ height: '45px' }" :header-row-style="{ height: '38px' }"
                    stripe>
                    <el-table-column prop="number" :show-overflow-tooltip="true" label="编号" width="40px" align="center"
                        fixed="left">
                        <template slot-scope="scope">
                            {{ scope.$index + (currentPage - 1) * pageSize + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" :show-overflow-tooltip="true" label="条款ID" width="50px" align="center">
                    </el-table-column>
                    <el-table-column prop="lawName" :show-overflow-tooltip="true" label="法律法规名称" width="260px" align="left">
                    </el-table-column>
                    <el-table-column prop="lawtermSerialNumber" :show-overflow-tooltip="true" label="条款章节" width="120px"
                        align="left">
                    </el-table-column>
                    <el-table-column prop="lawtermContent" :show-overflow-tooltip="true" label="条款内容" maxwidth="440px"
                        align="left">
                    </el-table-column>
                    <el-table-column prop="updateTime" :show-overflow-tooltip="true" label="更新时间" width="140px"
                        align="center">
                    </el-table-column>
                    <el-table-column prop="operate" :show-overflow-tooltip="true" label="操作" width="90px" align="center"
                        fixed="right">
                        <template slot-scope="scope">
                            <el-button type="text" size="small"
                                style="color: #3286FF; width: 40px;margin: 0px;padding: 0px;"
                                @click="updateLawTerm(scope.row.id)">修改</el-button>
                            <el-button type="text" size="small"
                                style="color: #E41634; width: 40px;margin: 0px;padding: 0px;"
                                @click="deleteLawTerm(scope.row.id)">删除</el-button>
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
</template>

<script>

export default {

    data() {

        return {
            selectForm: {
                lawName: '',
                lawtermContent: ''
            },
            tableData: [{
                number: '1',
                termID: '1',
                legalName: '《数据出境安全评估办法》',
                termSection: '第四条第一款',
                termCondition: '数据处理者向境外提供重要数据',
                updatetime: '2023-05-25 15:58:38'
            }],
            currentPage: 1, //当前页码
            pageSize: 10, //每页最大条数
            hostTotal: 0, //实际数据总条数
        };




    },
    //页面元素内容加载前需要执行的方法
    created() {
        this.loadAPI()
    },

    mounted() {
        window.addEventListener("keydown", this.handleSearch);
    },
    destroyed() {
        window.removeEventListener("keydown", this.handleSearch, false); //销毁回车事件，如果不销毁，在其他页面敲回车也会执行回车登录操作。
    },

    methods: {
        addtermFile() {
            this.$router.push("/lawsManage/addtermFile");
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.loadAPI();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.loadAPI();
        },

        //重置
        resetForm() {
            this.selectForm.lawName = '';
            this.selectForm.lawtermContent = '';            
            this.currentPage=1;
            this.loadAPI();
        },
        searchForm(){
            this.currentPage=1;
            this.loadAPI();
        },

        //查询数据
        async loadAPI() {
            //列表初始化
            let list = {
                lawName: this.selectForm.lawName,
                lawtermContent: this.selectForm.lawtermContent,
                pageSize: this.pageSize,
                pageNum: this.currentPage
            };
            const { data: res } = await this.$http.post("/api/lawterm/lawTermList", list);
            if (res.code == 200) {
                this.tableData = res.data.content
                this.hostTotal = res.data.totalElements
                this.$nextTick(() => {
                    this.$refs["termsTable"].doLayout();
                });
            }
        },
        //修改  待修改
        async updateLawTerm(id) {
            this.$router.push({
                path: "/lawsManage/addtermFile",
                query: {
                    from: "update", //更新客户端信息页面
                    id: id,
                    //修改返回原来页面所需参数
                    lawName: this.selectForm.lawName,
                    lawtermContent: this.selectForm.lawtermContent,
                    page: this.currentPage,
                    pageSize: this.pageSize,
                },
            });
        },
        //删除
        async deleteLawTerm(id) {
            this.$confirm("此操作将删除该任务, 是否继续?", "提示", {
                cancelButtonText: "取消",
                confirmButtonText: "确定",
                type: "warning",
            })
                .then(async () => {
                    const { data: res } = await this.$http.post("/api/lawterm/deleteLawTerm?id=" + id);
                    if (res.code == 200) {
                        let totalPage = Math.ceil((this.taskTotal - 1) / this.pageSize); // 总页数

                        let currentPage =
                            this.currentPage > totalPage
                                ? totalPage
                                : this.currentPage;

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

    },

}
</script>
<style>
/* .addbutton {
    padding: 0px !important;    
} */
</style>