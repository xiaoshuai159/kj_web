<template>
    <div class="shenbaodiv">
        <div class="elstepstyle">
            <el-steps :active="5" simple>
                <el-step title="数据处理者情况"></el-step>
                <el-step title="申报信息"></el-step>
                <el-step title="法定代表人信息"></el-step>
                <el-step title="数据安全负责人和管理机构信息"></el-step>
                <el-step title="经办人信息"></el-step>
                <el-step title="出境信息"></el-step>
                <el-step title="拟数据出境情况"></el-step>
                <el-step title="境外接收方情况"></el-step>
            </el-steps>
        </div>
        <div class="cardclass processorcard">
            <div class="titleclass">
                <span>数据处理者情况</span>
            </div>
            <el-form ref="processorform" :model="processorForm" style="width: 100%;">
                <el-form-item label="单位名称">
                    <el-input placeholder="请输入"> </el-input>
                </el-form-item>
                <el-form-item label="单位性质">
                    <el-select placeholder="请选择">
                        <el-option label="" value=""></el-option>
                        <el-option label="" value=""></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="单位注册地">
                    <el-select placeholder="请选择">
                        <el-option label="" value=""></el-option>
                        <el-option label="" value=""></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="办公所在地">
                    <el-select placeholder="请选择">
                        <el-option label="" value=""></el-option>
                        <el-option label="" value=""></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="有效期">
                    <el-date-picker v-model="processorForm.publishTime" type="date" placeholder="选择日期" style="width: 100%;"
                        :prefix-icon="processorForm.publishTime ? '   ' : 'el-icon-date'">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="邮政编码">
                    <el-input placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
        </div>

        <div class="cardclass shenbaocard">
            <div class="titleclass">
                <span>申报信息</span>
            </div>
            <el-form ref="shenbaoform" :model="shenbaoForm" style="width: 100%;">
                <el-form-item label="是否提交申报">
                    <el-select placeholder="请选择">
                        <el-option label="" value=""></el-option>
                        <el-option label="" value=""></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="提交申报时间">
                    <el-date-picker type="date" placeholder="选择日期" style="width: 100%;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="申报审批结果">
                    <el-select placeholder="请选择">
                        <el-option label="" value=""></el-option>
                        <el-option label="" value=""></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="申报生效时间">
                    <el-date-picker type="date" placeholder="选择日期" style="width: 100%;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="申报失效时间">
                    <el-date-picker type="date" placeholder="选择日期" style="width: 100%;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="申报附件">
                    <el-input placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="cardclass representcard">
            <div class="titleclass">
                <span>法定代表人信息</span>
            </div>
            <el-form ref="representform" :model="representForm" style="width: 100%;">
                <el-form-item label="姓名">
                    <el-input placeholder="请输入"> </el-input>
                </el-form-item>
                <el-form-item label="职务/国籍">
                    <el-input placeholder="请输入"> </el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input placeholder="请输入"> </el-input>
                </el-form-item>
                <el-form-item label="电子邮件">
                    <el-input placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="证件类型">
                    <el-select placeholder="请选择">
                        <el-option label="" value=""></el-option>
                        <el-option label="" value=""></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码">
                    <el-input placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="cardclass datasecuritycard">
            <div class="titleclass">
                <span>数据安全负责人和管理机构信息</span>
            </div>
            <el-form ref="datasecurityform" :model="datasecurityForm" style="width: 100%;">
                <el-form-item label="姓名">
                    <el-input placeholder="请输入"> </el-input>
                </el-form-item>
                <el-form-item label="职务/国籍">
                    <el-input placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱">
                    <el-input placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="证件类型">
                    <el-select placeholder="请选择">
                        <el-option label="" value=""></el-option>
                        <el-option label="" value=""></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码">
                    <el-input placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="机构名称">
                    <el-input placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="机构人数">
                    <el-input placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
        </div>

        <div class="cardclass operatorcard">
            <div class="titleclass">
                <span>经办人信息</span>
            </div>
            <el-form ref="operatorform" :model="operatorForm" style="width: 100%;">
                <el-form-item label="姓名">
                    <el-input placeholder="请输入"> </el-input>
                </el-form-item>
                <el-form-item label="职务/国籍">
                    <el-input placeholder="请输入"> </el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input placeholder="请输入"> </el-input>
                </el-form-item>
                <el-form-item label="电子邮件">
                    <el-input placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="证件类型">
                    <el-select placeholder="请选择">
                        <el-option label="" value=""></el-option>
                        <el-option label="" value=""></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码">
                    <el-input placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="cardclass exitcard">
            <div class="titleclass">
                <span>出境信息</span>
            </div>
            <el-form ref="exitform" :model="exitForm" style="width: 100%;">
                <el-form-item label="数据出境业务描述">
                    <el-input placeholder="请输入"> </el-input>
                </el-form-item>
                <el-form-item label="数据出境的目的">
                    <el-input placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="数据出境的方式">
                    <el-input placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="数据出境链路">
                    <el-input placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="cardclass dataexitcard">
            <div class="titleclass">
                <span>拟数据出境情况</span>
            </div>
            <el-form ref="dataexitform" :model="dataexitForm" style="width: 100%;">
                <el-form-item label="数据类型">
                    <el-select placeholder="请选择">
                        <el-option label="" value=""></el-option>
                        <el-option label="" value=""></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="敏感程度(如为个人信息)">
                    <el-select placeholder="请选择">
                        <el-option label="" value=""></el-option>
                        <el-option label="" value=""></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数据规模">
                    <el-select placeholder="请选择">
                        <el-option label="" value=""></el-option>
                        <el-option label="" value=""></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="涉及行业/领域">
                    <el-select placeholder="请选择">
                        <el-option label="" value=""></el-option>
                        <el-option label="" value=""></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="涉及自然人数">
                    <el-input placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="涉及重要数据数量">
                    <el-input placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="cardclass foreigncard">
            <div class="titleclass">
                <span>境外接收方情况</span>
            </div>
            <el-form ref="foreignform" :model="foreignForm" style="width: 100%;">
                <el-form-item label="境外自然人数量">
                    <el-input placeholder="请输入"> </el-input>
                </el-form-item>
                <el-form-item label="涉及重要数据数量">
                    <el-input placeholder="请输入"> </el-input>
                </el-form-item>
                <el-form-item label="所在地址">
                    <el-select placeholder="请选择">
                        <el-option label="" value=""></el-option>
                        <el-option label="" value=""></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="注册登记号码">
                    <el-input placeholder="请输入"> </el-input>
                </el-form-item>
                <el-form-item label="注册资金">
                    <el-input placeholder="请输入"> </el-input>
                </el-form-item>
                <el-form-item label="员工数量">
                    <el-input placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div style="float: right;margin-bottom: 20px;">
            <el-button type="primary" @click="loadAPI()">保存</el-button>
            <el-button type="info" @click="resetForm()">重置</el-button>
        </div>


    </div>
</template>

<script>

export default {
    data() {

        return {
            processorForm: {

            },
            shenbaoForm: {

            },
            representForm: {

            },
            datasecurityForm: {

            },
            operatorForm: {

            },
            exitForm: {

            },
            dataexitForm: {

            },
            foreignForm: {

            }
        };
    },
}
</script>


<style>
.shenbaodiv {
    padding: 15px;
}

.elstepstyle {
    width: calc(100%-80px);
    margin-bottom: 40px;
}

.cardclass {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    padding: 20px;
    margin-bottom: 50px;
    border-radius: 10px;
}


.titleclass {
    font-weight: 600 !important;
    font-size: 30px;
    color: #0054AA;
    margin-top: -40px;
    margin-bottom: 15px;
}

/* 数据处理者card 表单样式 */
/* .processorcard .el-form-item {
    width: 50%;
    display: inline-block;
} */
/* 下拉框宽度 */
/* .processorcard .el-select  {
    width: 100%;
} */
/* 数据处理者card 表单样式 */
.shenbaodiv .el-form-item {
    width: 48%;
    display: inline-block;
    margin-bottom: 10px !important;
}

.shenbaodiv .el-form-item.el-form-item:nth-child(2n+1) {
    margin-right: 4%;
}

.shenbaodiv .el-form-item__label {
    width: 100%;
    text-align: left;
}

/* 进度条 */
.shenbaodiv .el-steps--simple {
    padding: 0px 2%;
    background-color: rgba(255, 255, 255, .5);
}

/* .shenbaodiv .el-step.is-simple .el-step__title {
    width: 110% !important;
} */
.shenbaodiv .el-step.is-simple:not(:last-of-type) .el-step__title {
    max-width: 85%;
}


/* 下拉框宽度 */
.el-select {
    width: 100%;
}
</style>