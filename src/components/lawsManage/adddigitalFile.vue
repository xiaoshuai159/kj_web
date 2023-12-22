<template>
    <div style="margin-top: 30px;">
        <div class="goback" @click="goBack()">
            <span>返回上一级</span>
            <i class="el-icon-arrow-left"></i>
        </div>
        <div>
            <el-card shadow="always" style="width: 98%;margin: 0 auto; margin-bottom: 20px;">
                <el-timeline>
                    <el-timeline-item placement="top" timestamp="数字化来源" style="font-weight: 600;:color: #4a2525;">
                        <el-form :label-position="labelPosition" label-width="80px" :model="digitalOrigin"
                            ref="digitalorigin">
                            <el-form-item label="法律名称" prop="lawId">
                                <el-select v-model="digitalOrigin.lawId" placeholder="请选择" class="itemwidth"
                                    @change="handleLawNameChange">
                                    <el-option v-for="item in lawids" :key="item.key" :label="item.value" :value="item.key">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="条款内容" prop="lawtermId">
                                <el-select v-model="digitalOrigin.lawtermId" placeholder="请选择" class="itemwidth"
                                    @change="handleLawTermChange">
                                    <el-option v-for="item in lawtermids" :key="item.key" :label="item.value"
                                        :value="item.key">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="标准化规则" prop="standardizaId">
                                <el-select v-model="digitalOrigin.standardizaId" placeholder="请选择" class="itemwidth">
                                    <el-option v-for="item in standardizaids" :key="item.key" :label="item.value"
                                        :value="item.key">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </el-timeline-item>
                    <el-timeline-item placement="top" timestamp="数字化规则" style="font-weight: 600;color: #4a2525;">
                        <el-form :label-position="labelPosition" label-width="80px" :model="digitalRule" ref="digitalrule">
                            <el-form-item label="数据处理者" prop="dataProcessor">
                                <template>
                                    <el-checkbox :indeterminate="isProcessorIndeterminate" v-model="pcheckAll"
                                        @change="handleCheckAllChange">所有主体</el-checkbox>
                                    <div style="margin: 15px 0;"></div>
                                    <el-checkbox-group v-model="digitalRule.dataProcessor"
                                        @change="handleCheckedprocessoresChange">
                                        <el-checkbox v-for="processor in processores" :label="processor.label"
                                            :key="processor.key" :value="processor.key"
                                            ref="processorCheckbox"></el-checkbox>
                                    </el-checkbox-group>
                                </template>
                            </el-form-item>
                            <el-form-item label="境外接收方" prop="foreignRecipient">
                                <template>
                                    <el-checkbox :indeterminate="isRecipientIndeterminate" v-model="rcheckAll"
                                        @change="handleAllrecipientesChange">所有主体</el-checkbox>
                                    <div style="margin: 15px 0;"></div>
                                    <el-checkbox-group v-model="digitalRule.foreignRecipient"
                                        @change="handleCheckedrecipientesChange">
                                        <el-checkbox v-for="recipient in recipientes" :label="recipient.key"
                                            :key="recipient.label" :value="recipient.key">
                                            {{ recipient.label }}
                                        </el-checkbox>
                                    </el-checkbox-group>
                                </template>
                            </el-form-item>
                            <el-form-item label="涉及数据" prop="referencedata">
                                <el-cascader :options="options" :props="props" clearable class="itemwidth"
                                    v-model="digitalRule.referencedata"></el-cascader>
                            </el-form-item>
                            <el-form-item label="时间类型" prop="timeType">
                                <el-select v-model="digitalRule.timeType" placeholder="请选择" class="itemwidth">
                                    <el-option v-for="item in timeTypes" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="数据阈值" prop="calcSign" style="display: inline-block;width: 30%">
                                <el-select v-model="digitalRule.calcSign" placeholder="请选择运算符" style=";">
                                    <el-option v-for="item in calcsigns" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="count" style="display: inline-block;width: 30%;margin-left: 5%;">
                                <el-input v-model="digitalRule.count" placeholder="请输入阈值"></el-input>
                            </el-form-item>
                            <el-form-item prop="unit" style="display: inline-block;width: 30%;margin-left: 5%;">
                                <el-select v-model="digitalRule.unit" placeholder="请选择单位">
                                    <el-option v-for="item in units" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="备案信息" style="display: inline-block;width: 40%;margin-right: 20%;">
                                <el-card class="box-card">
                                    <el-form :model="beianForm" ref="beianform">
                                        <el-form-item label="" prop="isBeian">
                                            <span class="spanwidth">是否提交备案</span>
                                            <el-radio-group v-model="beianForm.isBeian">
                                                <el-radio label="1">是</el-radio>
                                                <el-radio label="0">否</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                        <el-form-item label="" prop="beianResult">
                                            <span class="spanwidth">备案是否通过</span>
                                            <el-radio-group v-model="beianForm.beianResult">
                                                <el-radio label="1">是</el-radio>
                                                <el-radio label="0">否</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                        <el-form-item label="" prop="beianIsValid">
                                            <span class="spanwidth">备案是否在有效期内</span>
                                            <el-radio-group v-model="beianForm.beianIsValid">
                                                <el-radio label="1">是</el-radio>
                                                <el-radio label="0">否</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                    </el-form>
                                </el-card>
                            </el-form-item>
                            <el-form-item label="申报信息" style="display: inline-block; width: 40%;">
                                <el-card class="box-card">
                                    <el-form :model="shenbaoForm" ref="shenbaoform">
                                        <el-form-item label="" prop="isShenbao">
                                            <span class="spanwidth">是否提交申报</span>
                                            <el-radio-group v-model="shenbaoForm.isShenbao">
                                                <el-radio label="1">是</el-radio>
                                                <el-radio label="0">否</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                        <el-form-item label="" prop="shenbaoResult">
                                            <span class="spanwidth">申报是否通过</span>
                                            <el-radio-group v-model="shenbaoForm.shenbaoResult">
                                                <el-radio label="1">是</el-radio>
                                                <el-radio label="0">否</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                        <el-form-item label="" prop="shenbaoIsValid">
                                            <span class="spanwidth">申报是否在有效期内</span>
                                            <el-radio-group v-model="shenbaoForm.shenbaoIsValid">
                                                <el-radio label="1">是</el-radio>
                                                <el-radio label="0">否</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                    </el-form>
                                </el-card>
                            </el-form-item>
                            <el-form-item label="变化内容" props="changeTagId">
                                <el-select v-model="digitalRule.changeTagId" multiple placeholder="请选择" class="itemwidth">
                                    <el-option v-for="item in changetagids" :key="item.key" :label="item.label"
                                        :value="item.key">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="违规类型" props="violationSign">
                                <el-select v-model="digitalRule.violationSign" placeholder="请选择" class="itemwidth">
                                    <el-option v-for="item in lawtermresults" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </el-timeline-item>
                    <el-timeline-item placement="top" timestamp="备注" style="font-weight: 600;color: #4a2525;">
                        <el-form ref="digitalnotes" v-model="digitalNotes">
                            <el-form-item props="notes">
                                <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="digitalNotes.notes"
                                    resize="none">
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </el-timeline-item>
                    <el-timeline-item placement="top" class="hiddentime">
                    </el-timeline-item>
                </el-timeline>
                <div style="float: right;margin-bottom: 20px;">
                    <el-button type="primary" @click="loadAPI()">保存</el-button>
                    <el-button type="info" @click="resetForm()">重置</el-button>
                </div>
            </el-card>
        </div>
    </div>
</template>
<script>
const processorOptions = [];
const recipientOptions = []
export default {
    data() {
        return {
            //存储完整级联三级
            alloptions: '',
            //存储已选择级联
            selectedoptions: '',
            //重叠
            overlapping: '',

            labelPosition: 'top',
            id: 0,
            page: '',
            pageSize: '',
            violationSign: '',
            // lawtermId: '',
            standardizaId: '',
            srcTageId: '',
            datalevels: '',
            dataclasses: '',
            datalabeles: '',

            pcheckAll: false,
            rcheckAll: false,
            processores: processorOptions,
            recipientes: recipientOptions,
            isProcessorIndeterminate: true,
            isRecipientIndeterminate: true,

            digitalOrigin: {
                lawId: '',
                lawtermId: '',
                standardizaId: '',
            },
            digitalRule: {
                dataProcessor: [],
                foreignRecipient: [],
                datalabeles: '',
                timeType: '',
                calcSign: '',
                count: '',
                unit: '',
                changeTagId: '',
                referencedata: '',
                violationSign: '',
            },

            digitalNotes: {
                notes: '',
            },
            beianForm: {
                isBeian: '',
                beianResult: '',
                beianIsValid: ''
            },
            shenbaoForm: {
                isShenbao: '',
                shenbaoResult: '',
                shenbaoIsValid: ''
            },
            lawids: [],
            lawtermids: [],
            standardizaids: [],
            timeTypes: [
                { value: 'enact_time', label: '法律文件生效时间起' },
                { value: 'lastyear_1_1', label: '自上年1月1日起' }
            ],
            props: { multiple: true },
            options: [],
            calcsigns: [
                { value: 1, label: '大于等于' },
                { value: 2, label: '大于' },
                { value: 3, label: '等于' },
                { value: 4, label: '小于' },
                { value: 5, label: '小于等于' }
            ],
            units: [
                { value: "1", label: '条' },
                { value: "2", label: '人' },
            ],
            lawtermresults: [
                { value: "1", label: '未申报安全评估（应报未报）' },
                { value: "2", label: '未通过安全评估出境' },
                { value: "3", label: '未重新申报安全评估（夹带私货）' },
                { value: "4", label: '未重新申报安全评估（其他情形）' },
                { value: "5", label: '未备案个人信息出境标准合同（应备未备）' },
                { value: "6", label: '未通过个人信息出境标准合同备案出境' },
                { value: "7", label: '未重新备案个人信息出境标准合同（夹带私货）' },
                { value: "8", label: '未重新备案个人信息出境标准合同（其他情形）' },
                { value: "9", label: '应向个人告知并取得个人同意' },
                { value: "10", label: '违反国标要求' },
                { value: "11", label: '违反行标要求' },
                { value: "12", label: '违反地标要求' },
                { value: "13", label: '违反《中华人民共和国人类遗传资源管理条例》要求' },
                { value: "14", label: '未经中华人民共和国主管机关批准出境' },

            ],
            changetagids: []


        };


    },
    created() {
        //     this.lawtermId = this.$route.query.lawtermId;
        //     this.standardizaId = this.$route.query.standardizaId;
        //     this.violationSign = this.$route.query.violationSign;
        //     this.srcTageId = this.$route.query.srcTageId;
        //     this.datalevels = this.$route.query.datalevels;

        if (this.$route.query.from == 'update') { //获取浏览器url的参数，from页面来源: table客户端列表页面，update更新客户端信息页面 
            this.id = parseInt(this.$route.query.id) || 0;
            this.getDigitalizeById();
        }
        this.getdatalevelAllList();
        this.getAllList();
        this.getptagListByType();
        this.getrtagListByType();
        this.getbtagListByType();
    },
    //当路由发生变化，先清空原来的数据 
    watch: {
        $route: {
            handler(route) {
                this.resetForm();
                this.id = parseInt(this.$route.query.id) || 0;

                if (this.$route.query.from == 'update' && this.id != 0) { //获取浏览器url的参数，from页面来源: table客户端列表页面，update更新客户端信息页面 
                    this.getDigitalizeById();
                }
                immediate: true

            }
        }
    },

    // mounted() {
    //     window.addEventListener("keydown", this.handleSearch);
    // },
    // destroyed() {
    //     window.removeEventListener("keydown", this.handleSearch, false); //销毁回车事件，如果不销毁，在其他页面敲回车也会执行回车登录操作。
    // },

    // mounted() {
    //     console.log('this.$refs.processorCheckbox')
    //     console.log(this.$refs.processorCheckbox)
    //     this.$nextTick(() => {
    //         this.$refs.processorCheckbox.forEach(checkbox => {
    //             checkbox.checked = this.digitalRule.dataProcessor.includes(Number(checkbox.value));
    //         });
    //     });
    // },

    methods: {
        goBack() {
            this.$router.push({
                path: "/lawsManage",
                query: {
                    from: "to", //更新客户端信息页面
                    //修改返回原来页面所需参数
                    id: this.id,
                    standardizaId: this.standardizaId,
                    violationSign: this.violationSign,
                    srcTageId: this.srcTageId,
                    datalevels: this.datalevels,
                    pageSize: this.pageSize,
                    pageNum: this.currentPage

                },
            });
        },
        //数据处理者
        handleCheckAllChange(val) {

            if (val) {
                this.digitalRule.dataProcessor = this.processorOptions.map(item => item.label);
            } else {
                this.digitalRule.dataProcessor = [];
            }
            this.isProcessorIndeterminate = false;
            // 更新 pcheckAll 的状态
            this.pcheckAll = val;
        },
        handleCheckedprocessoresChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.processores.length;
            this.isProcessorIndeterminate = checkedCount > 0 && checkedCount < this.processores.length;

        },
        //境外接收方
        handleAllrecipientesChange(val) {
            if (val) {
                this.digitalRule.foreignRecipient = this.recipientOptions.map(item => item.key);
            } else {
                this.digitalRule.foreignRecipient = [];
            }
            //this.digitalRule.foreignRecipient = val ? this.recipientOptions : [];
            this.isRecipientIndeterminate = false;
        },
        handleCheckedrecipientesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.processores.length;
            this.isRecipientIndeterminate = checkedCount > 0 && checkedCount < this.recipient.length;
        },

        //涉及数据
        async getdatalevelAllList() {
            const { data: res } = await this.$http.get('/api/datalabel/getAllList');
            if (res.code == 200) {
                this.options = res.data; // 将完整的级联关系数据赋值给 this.options
            }
            // console.log( "this.options");
            // console.log( this.options)

            if (this.options) {
                this.flattenOptions(this.options);
                this.getAllCombinations(this.datalevels, this.dataclasses, this.datalabeles);
            }
        },
        //查询法律名称
        async getAllList() {
            const { data: res } = await this.$http.get('/api/digitalizeRule/getAllList');
            if (res.code == 200) {
                this.lawids = res.data.map((item) => ({
                    key: item.id,
                    value: item.value,
                }));

            }
        },
        //当下拉选择框的值发生变化
        handleLawNameChange(value) {
            this.digitalOrigin.lawtermId = '';
            this.getLawTermById(parseInt(value));
        },
        //根据法律名称查询条款内容
        async getLawTermById(value) {
            const { data: res } = await this.$http.get('/api/lawterm/getLawTermByLawId?lawId=' + value);
            if (res.code == 200) {
                // this.lawtermids.push(res.data.lawtermContent);
                this.lawtermids = res.data.map((item) => ({
                    key: item.id,
                    value: item.lawtermContent,
                }));
            }
        },
        //查询标准化准则
        handleLawTermChange(value) {
            this.digitalOrigin.standardizaId = '';
            this.getListByLawtermId(value)
        },
        //根据法律名称查询标准化
        async getListByLawtermId(value) {
            const { data: res } = await this.$http.get('/api/standardiza/getListByLawtermId?lawtermId=' + value);
            if (res.code == 200) {
                this.standardizaids = res.data.map((item) => ({
                    key: item.id,
                    value: item.exitBehavior,
                }));
            }
        },


        //获取数据处理者
        async getptagListByType() {
            let list = {
                tagType: 0
            }
            const { data: res } = await this.$http.post('/api/tag/tagListByType', list);
            if (res.code == 200) {
                this.processorOptions = res.data.map((item) => ({
                    label: item.tagName,
                    key: item.id,
                }));
                this.processores = this.processorOptions;
            }
        },

        //获取境外接收方
        async getrtagListByType() {
            let list = {
                tagType: 2
            }
            const { data: res } = await this.$http.post('/api/tag/tagListByType', list);
            if (res.code == 200) {
                if (res.data && res.data.length > 0) {
                    this.recipientOptions = res.data.map((item) => ({
                        label: item.tagName,
                        key: item.id,
                    }));
                    // this.recipientOptions = res.data.map(obj => obj.tagName);
                    this.recipientes = this.recipientOptions;
                } else {
                    // 当 res.data 为空时的处理逻辑
                    this.recipientOptions = []; // 或者设置为其他默认值
                }
            }
        },
        //获取变化内容
        async getbtagListByType() {
            let list = {
                tagType: 1
            }
            const { data: res } = await this.$http.post('/api/tag/tagListByType', list);
            if (res.code == 200) {
                this.changetagids = res.data.map((item) => ({
                    label: item.tagName,
                    key: item.id,
                }));
            }
        },
        // 定义一个递归函数，将每一层的value值和子孙节点的value值逐步拼接
        // 将原options 拼接成 newOptions，
        flattenOptions(options, path = []) {
            if (!options) return;
            const result = [];
            options.forEach((item) => {
                const newPath = [...path, item.value];
                if (item.children) {
                    const childResult = this.flattenOptions(item.children, newPath);
                    result.push(...childResult);
                } else {
                    result.push(newPath);
                }
            });
            this.alloptions = result;
            console.log('this.alloptions');
            console.log(this.alloptions);
            // return result;
        },


        // 再计算出一级二级三级组合的所有数组，
        getAllCombinations(datalevels, dataclasses, datalabeles) {
            const result = [];
            for (let i = 0; i < datalevels.length; i++) {
                for (let j = 0; j < dataclasses.length; j++) {
                    for (let k = 0; k < datalabeles.length; k++) {
                        result.push([datalevels[i], dataclasses[j], datalabeles[k]]);
                    }
                }
            }
            this.selectedoptions = result;
            console.log('this.selectedoptions');
            console.log(this.selectedoptions);
            this.flattenOptions(this.options)
            this.getreferencedata(this.alloptions, this.selectedoptions);
            // return result;
        },


        // 将两个数组进行对比，筛选出重合的子集
        getreferencedata(flattened, combinations) {
            this.digitalRule.referencedata = combinations.filter((combination) => {
                const subsetString = JSON.stringify(combination);
                return flattened.some((path) => JSON.stringify(path) === subsetString);
            })
            console.log('this.digitalRule.referencedata');
            console.log(this.digitalRule.referencedata);

            // this.referencedata = this.overlapping;
        },

        // 定义一个递归函数，将每一层的value值和子孙节点的value值逐步拼接
        // flattenOptions(options, path = []) {
        //     if (!options) return;
        //     const result = [];
        //     options.forEach((item) => {
        //         const newPath = [...path, item.value];
        //         if (item.children) {
        //             const childResult = this.flattenOptions(item.children, newPath);
        //             result.push(...childResult);
        //         } else {
        //             result.push(newPath);
        //         }
        //     });
        //     this.alloptions = result;
        // },

        // // 再计算出一级二级三级组合的所有数组
        // getAllCombinations(datalevels, dataclasses, datalabeles) {
        //     const result = [];
        //     for (let i = 0; i < datalevels.length; i++) {
        //         for (let j = 0; j < dataclasses.length; j++) {
        //             for (let k = 0; k < datalabeles.length; k++) {
        //                 result.push([datalevels[i], dataclasses[j], datalabeles[k]]);
        //             }
        //         }
        //     }
        //     this.selectedoptions = result;
        //     console.log('this.selectedoptions');
        //     console.log(this.selectedoptions);

        //     const combinedResult = this.selectedoptions.map(([first, second, third]) => {
        //         return [this.alloptions[first - 1], this.alloptions[second - 1], this.alloptions[third - 1]];
        //     });

        //     console.log('combinedResult');
        //     console.log(combinedResult);

        //     this.getreferencedata(this.alloptions, this.selectedoptions);
        // },

        // // 将两个数组进行对比，筛选出重合的子集
        // getreferencedata(flattened, combinations) {
        //     this.digitalRule.referencedata = combinations.filter((combination) => {
        //         const subsetString = JSON.stringify(combination);
        //         return flattened.some((path) => JSON.stringify(path) === subsetString);
        //     });
        //     console.log('this.digitalRule.referencedata');
        //     console.log(this.digitalRule.referencedata);
        // },

        //按id查询
        async getDigitalizeById() {
            let list = {
                id: this.id,
            };

            const { data: res } = await this.$http.post('/api/digitalizeRule/getDigitalizeById', list);
            if (res.code == 200) {

                this.digitalOrigin.lawId = res.data.lawId + '';
                this.getLawTermById(parseInt(this.digitalOrigin.lawId));
                this.digitalOrigin.lawtermId = res.data.lawtermId;
                this.getListByLawtermId(parseInt(this.digitalOrigin.lawtermId))
                this.digitalOrigin.standardizaId = parseFloat(res.data.standardizaId);


                const backendArray = res.data.srcTagId.split(',').map(Number);
                // 根据后台返回的数组，获取对应的label值
                const completeArray = this.processores;
                const labels = backendArray.map(key => completeArray.find(item => item.key === key).label);

                // 将获取的label值存储到this.digitalRule.dataProcessor中
                this.digitalRule.dataProcessor = labels;

                this.digitalRule.foreignRecipient = res.data.foreignRecipient;

                this.datalevels = res.data.datalevels.split(',').map(value => parseInt(value));
                this.dataclasses = res.data.dataclasses.split(',').map(value => parseInt(value));
                this.datalabeles = res.data.datalabeles.split(',').map(value => parseInt(value));

                this.digitalRule.timeType = res.data.timeType;
                this.digitalRule.calcSign = res.data.calcSign;
                this.digitalRule.count = res.data.count;
                this.digitalRule.unit = res.data.unit;
                this.digitalRule.changeTagId = res.data.changeTagId.split(',');
                this.digitalRule.changeTagId = this.digitalRule.changeTagId.map(value => parseInt(value));
                this.digitalRule.violationSign = res.data.violationSign;

                this.digitalNotes.notes = res.data.notes;

                this.beianForm.isBeian = res.data.isBeian + '';
                this.beianForm.beianResult = res.data.beianResult + '';
                this.beianForm.beianIsValid = res.data.beianIsValid + '';
                this.shenbaoForm.isShenbao = res.data.isShenbao + '';
                this.shenbaoForm.shenbaoResult = res.data.shenbaoResult + '';
                this.shenbaoForm.shenbaoIsValid = res.data.shenbaoIsValid + '';
            }
        },
        //重置
        resetForm() {
            this.digitalOrigin.lawId = '';
            this.digitalOrigin.lawtermId = '';
            this.digitalOrigin.standardizaId = '';

            this.digitalRule.dataProcessor = '';
            this.digitalRule.foreignRecipient = '';
            this.isRecipientIndeterminate = true;
            this.isProcessorIndeterminate = true;
            this.digitalRule.referencedata = '';
            this.digitalRule.timeType = '';
            this.digitalRule.calcSign = '';
            this.digitalRule.count = '';
            this.digitalRule.unit = '';
            this.digitalRule.changeTagId = '';
            this.digitalRule.violationSign = '';

            this.digitalNotes.notes = '';

            this.beianForm.isBeian = '';
            this.beianForm.beianResult = '';
            this.beianForm.beianIsValid = '';
            this.shenbaoForm.isShenbao = '';
            this.shenbaoForm.shenbaoResult = '';
            this.shenbaoForm.shenbaoIsValid = '';

        },
        // //保存
        async loadAPI() {
            if (
                !this.digitalOrigin.lawId ||
                !this.digitalOrigin.lawtermId ||
                !this.digitalOrigin.standardizaId ||
                !this.digitalRule.dataProcessor ||
                !this.digitalRule.referencedata ||
                !this.digitalRule.timeType ||
                !this.digitalRule.calcSign ||
                !this.digitalRule.count ||
                !this.digitalRule.unit ||
                !this.digitalRule.changeTagId ||
                !this.digitalRule.violationSign ||
                !this.beianForm.isBeian ||
                !this.beianForm.beianResult ||
                !this.beianForm.beianIsValid ||
                !this.shenbaoForm.isShenbao ||
                !this.shenbaoForm.shenbaoResult ||
                !this.shenbaoForm.shenbaoIsValid
            ) {
                this.$message.error("请填写完整信息");
                return; // 如果有输入框为空，停止执行后续请求
            };

            let list = {
                lawId: this.digitalOrigin.lawId,
                lawtermId: this.digitalOrigin.lawtermId,
                standardizaId: this.digitalOrigin.standardizaId,

                srcTagId: this.digitalRule.dataProcessor.map(Number) + '',
                dstId: this.digitalRule.foreignRecipient ? this.digitalRule.foreignRecipient.map(Number) + '' : '',
                datalevels: Array.from(new Set(this.digitalRule.referencedata.map(item => item[0]))) + '',//分级
                dataclasses: Array.from(new Set(this.digitalRule.referencedata.map(item => item[1]))) + '',//分类
                datalabeles: Array.from(new Set(this.digitalRule.referencedata.map(item => item[2]))) + '',//标签
                timeType: this.digitalRule.timeType,
                calcSign: this.digitalRule.calcSign,
                count: this.digitalRule.count,
                unit: this.digitalRule.unit,
                changeTagId: this.digitalRule.changeTagId + '',
                violationSign: this.digitalRule.violationSign,//违规标志
                //规则包含的数据分级、规则包含的数据分类、规则包含的数据标签

                notes: this.digitalNotes.notes,

                isBeian: this.beianForm.isBeian,
                beianResult: this.beianForm.beianResult,
                beianIsValid: this.beianForm.beianIsValid,
                isShenbao: this.shenbaoForm.isShenbao,
                shenbaoResult: this.shenbaoForm.shenbaoResult,
                shenbaoIsValid: this.shenbaoForm.shenbaoIsValid,
            };
            if (this.$route.query.from == 'update') {
                const { date: res } = await this.$http.post('/digitalizeRule/updateDigitalize', list);
                if (res.code == 200) {
                    this.$message({
                        message: "更新成功",
                        type: "success",
                    });
                } else {
                    this.$message("更新失败");
                }
            } else {
                const { data: res } = await this.$http.post('/digitalizeRule/addDigitalize', list);
                if (res.code == 200) {
                    this.$message({
                        message: "添加成功",
                        type: "success",
                    });
                } else {
                    this.$message("添加失败");
                }
            }
        }
    }
}
</script>
<style>
/* .main {
    margin-top: 20px;
} 
*/
.el-form-item {
    margin-bottom: 3px;
}

.el-timeline-item__timestamp {
    color: #000000;
    font-size: 20px;
}

.el-form--label-top .el-form-item__label {
    padding: 0px;
}

/* 返回上一级 */
.goback {
    margin-bottom: 10px;
    margin-right: 30px;
    font-family: "Microsoft YaHei";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #1675d5;
    float: right;
    margin-top: -15px;
    cursor: pointer;


    i {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #1675d5;
    }

}

.el-input__inner {
    height: 38px;
}

.timewidth .el-input__inner {
    width: 510px;
}

/* 时间戳标题 */
.el-timeline-item__timestamp {
    color: #101010;
}

.el-button--primary {
    background: #0054AA;
    border-color: #0054AA;
}

.text {
    font-size: 14px;
}

.item {
    padding: 18px 0;
}

.box-card {
    /* width: 480px; */
    padding-left: 30px;
    background-color: #fbfbfb;
    border-radius: 10px;
}

.el-timeline {
    padding: 10px;
}

.el-timeline-item__wrapper {
    padding-left: 30px;
}

.el-timeline-item__node {
    border: 3px solid #3a8ee6;
    background-color: #ffffff;
}

.hiddentime .el-timeline-item__node {
    border: 3px solid #ffffff;
    background-color: #ffffff;
}

.itemwidth {
    width: 100%;
}

.spanwidth {
    display: inline-block;
    width: 140px;
}

.el-timeline-item__wrapper {
    top: -6px;
}

.el-timeline-item__node--normal {
    left: -3px;
    width: 16px;
    height: 16px;
}
</style>