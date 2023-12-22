<template>
    <div>
        <div class="shadow-div shadow-form" style="margin-bottom: 10px;">
            <el-form :inline="true" class="selectform" ref="selectform" :model="selectForm">
                <el-form-item prop="lawtermId" label="条款ID:">
                    <el-input placeholder="请输入关键字" style="width: 200px;" v-model="selectForm.lawtermId"></el-input>
                </el-form-item>
                <el-form-item prop="id" label="标准化ID:">
                    <el-input placeholder="请输入关键字" style="width: 200px;" v-model="selectForm.id"></el-input>
                </el-form-item>
                <!-- <el-form-item prop="dataProcessor" label="数据处理者:">
                    <el-input placeholder="请输入关键字" style="width: 200px;" v-model="selectForm.dataProcessor"></el-input>
                </el-form-item> -->
                <div style="display: inline-block;float: right;  ">
                    <el-button type="primary" @click="searchForm()">查询</el-button>
                    <el-button type="info" @click="resetForm()">重置</el-button>
                </div>
            </el-form>
        </div>
        <!-- 创建任务 -->
        <div style="margin-left: 15px; margin-bottom: 20px;">
            <el-button type="primary" @click="addRule()" style="width: 100px;">+ 新增规则</el-button>
        </div>
        <div class="shadow-div">
            <div class="base_table">
                <el-table :data="tableData" ref="standardizeTable" style="width: 100%" tooltip-effect="dark"
                    :header-cell-style="{ background: '#C6D9F1', color: '#101010', padding: '0px', 'text-align': 'center' }"
                    :cell-style="{ padding: '0px' }" :row-style="{ height: '45px' }" :header-row-style="{ height: '38px' }"
                    stripe>
                    <el-table-column prop="number" :show-overflow-tooltip="true" label="编号" width="40px" align="center"
                        fixed="left">
                        <template slot-scope="scope">
                            {{ scope.$index + (currentPage - 1) * pageSize + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="lawtermId" :show-overflow-tooltip="true" label="条款ID" width="50px"
                        align="center">
                    </el-table-column>
                    <el-table-column prop="id" :show-overflow-tooltip="true" label="标准化ID" width="80px" align="center">
                    </el-table-column>
                    <!-- <el-table-column prop="dataProcessor" :show-overflow-tooltip="true" label="数据处理者" width="220"
                        align="center">
                    </el-table-column> -->
                    <el-table-column prop="exitBehavior" :show-overflow-tooltip="true" label="数据出境行为" maxwidth="180px"
                        align="left">
                    </el-table-column>
                    <el-table-column prop="violationSign" :show-overflow-tooltip="true" label="违规标志" maxwidth="180px"
                        align="left">
                    </el-table-column>
                    <el-table-column prop="violationType" :show-overflow-tooltip="true" label="违规类型" maxwidth="230px"
                        align="left">
                        <template slot-scope="scope">
                            <div v-if="scope.row.violationType == 1"> 未申报安全评估（应报未报） </div>
                            <div v-if="scope.row.violationType == 2"> 未通过安全评估出境 </div>
                            <div v-if="scope.row.violationType == 3"> 未重新申报安全评估（夹带私货） </div>
                            <div v-if="scope.row.violationType == 4"> 未重新申报安全评估（其他情形） </div>
                            <div v-if="scope.row.violationType == 5"> 未备案个人信息出境标准合同（应备未备） </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="updateTime" :show-overflow-tooltip="true" label="更新时间" maxwidth="180px"
                        align="center">
                    </el-table-column>
                    <el-table-column prop="operate" label="操作" width="90px" align="center" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" style="color: #3286FF;width: 40px;margin: 0px;padding: 0px;"
                                @click="updateTerm(scope.row.id)">修改</el-button>
                            <el-button type="text" size="small" style="color: #E41634;width: 40px;margin: 0px;padding: 0px;"
                                @click="deleteFile(scope.row.id)">删除</el-button>
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

export default {
    data() {
        return {
            currentPage: 1, //当前页码
            pageSize: 10, //每页最大条数
            hostTotal: 0, //实际数据总条数
            selectForm: {
                id: '',
                lawtermId: '',
                // dataProcessor:''
            },
            tableData: [{
                lawtermId: '1',
                id: '1',
                dataProcessor: '数据处理者',
                exitBehavior: '向境外提供重要数据',
                violationSign: '未申报安全评估',
                violationType: '未申报安全评估（应报未报）',
                updateTime: '2023/7/28 9:14'
            }],
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
    beforeRouteUpdate(to, from, next) {
        this.searchForm(); // 调用加载数据的方法
        next();
    },
    methods: {
        //跳转页面
        addRule() {
            this.$router.push("/lawsManage/addstandardizeFile");
        },
        //查询数据
        async loadAPI() {
            //列表初始化
            let list = {
                id: this.selectForm.id,
                lawtermId: this.selectForm.lawtermId,
                // dataProcessor: this.selectForm.dataProcessor,
                pageSize: this.pageSize,
                pageNum: this.currentPage
            };
            const { data: res } = await this.$http.post("/api/standardiza/standardizaList", list);
            if (res.code == 200) {
                this.tableData = res.data.content
                this.hostTotal = res.data.totalElements
                this.$nextTick(() => {
                    this.$refs["standardizeTable"].doLayout();
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
        //新增规则
        addlawsFile() {
            //this.$router.push("#");
        },
        //重置
        resetForm() {
            this.selectForm.id = '';
            this.selectForm.lawtermId = '';
            this.loadAPI();
        },
        searchForm() {
            this.currentPage = 1;
            this.loadAPI();
        },
        //修改 跳转页面
        async updateTerm(id) {
            this.$router.push({
                path: "/lawsManage/addstandardizeFile",
                query: {
                    from: "update", //更新客户端信息页面
                    id: id,
                    lawtermId: this.selectForm.lawtermId,
                },
            });
        },
        //删除
        async deleteFile(id) {
            this.$confirm("此操作将删除该任务, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(async () => {
                    const { data: res } = await this.$http.post("/api/standardiza/deleteStandardiza?id=" + id);

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

    }

}
</script>
<style></style>