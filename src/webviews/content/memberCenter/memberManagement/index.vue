<template>
  <div>
    <VueTable :loading="listLoading" :tableData='list' :tableColumn='TableColumn' @pagination="getList" :total='total'>
      <template #UpgradableOrNotOperation='scope'>
        <span v-if="scope.row.upgraded == '1'">是</span>
        <span v-if="scope.row.upgraded == '0'">否</span>
      </template>
      <template #operation='scope'>
        <el-button @click="editRow(scope.row)" type="text" size="small" v-per="'vip-edit'">编辑</el-button>
        <el-button @click="deleteRow(scope.row)" type="text" size="small" v-per="'vip-delete'">删除</el-button>
      </template>
    </VueTable>
    <el-table :data="list" ref="multipleTable" v-loading="listLoading" element-loading-text="加载中..." border fit
      highlight-current-row>
      <el-table-column align="center" type="index" width="50"></el-table-column>
      <el-table-column align="center" label="会员等级" prop="vipLevel">
        <template scope="{row}">
          <span v-if="row.vipLevel == '1'">新星</span>
          <span v-if="row.vipLevel == '2'">黄金</span>
          <span v-if="row.vipLevel == '6'">铂金</span>
          <span v-if="row.vipLevel == '4'">体验版铂金</span>
          <span v-if="row.vipLevel == '8'">PLUS</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="会员ID" prop="id"></el-table-column>
      <el-table-column align="center" label="会员名称" prop="vipName"></el-table-column>
      <el-table-column align="center" label="SKU" prop="skuIds"></el-table-column>
      <el-table-column align="center" label="展示SKU" prop="skuId" width="110"></el-table-column>
      <el-table-column align="center" label="是否为统一产品" prop="provinceName"></el-table-column>
      <el-table-column align="center" label="展示名称" prop="showName"></el-table-column>
      <el-table-column align="center" label="订购corgoodsid" prop="corGoodsId" width="170"></el-table-column>
      <el-table-column align="center" label="订购goodsid" prop="goodsId" width="150"></el-table-column>
      <el-table-column align="center" label="退订corgoodsid" prop="reCorGoodsId" width="170"></el-table-column>
      <el-table-column align="center" label="退订goodsid" prop="reGoodsId" width="150"></el-table-column>
      <el-table-column align="center" label="展示优先级" prop="priority"></el-table-column>
      <el-table-column align="center" label="是否可升级" prop="upgraded">
        <template scope="{row}">
          <span v-if="row.upgraded == '1'">是</span>
          <span v-if="row.upgraded == '0'">否</span>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="editRow(scope.row)" type="text" size="small" v-per="'vip-edit'">编辑</el-button>
          <el-button @click="deleteRow(scope.row)" type="text" size="small" v-per="'vip-delete'">删除</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column label="会员类型" prop="vipType">
        <template scope="{row}">
          <span v-if="row.vipType == '1'">全网会员</span>
          <span v-if="row.vipType == '2'">5G高级会员</span>
        </template>
      </el-table-column>
      <el-table-column label="会员有效期" prop="vipEffective">
        <template scope="{row}">
          <span v-if="row.vipEffective == '0'">长期</span>
          <span v-if="row.vipEffective == '1'">一年</span>
          <span v-if="row.vipEffective == '2'">6个月</span>
          <span v-if="row.vipEffective == '3'">3个月</span>
          <span v-if="row.vipEffective == '4'">一个月</span>
          <span v-if="row.vipEffective == '5'">7天</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="online">
        <template scope="{row}">
          <span v-if="row.online == '0'" class="green">上线</span>
          <span v-if="row.online == '1'" class="red">下线</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.online" type="text" @click="changeStatus('up', scope.row)" v-per="'vip-online'">上线
          </el-button>
          <el-button v-else type="text" @click="changeStatus('down', scope.row)" v-per="'vip-offline'">下线</el-button>
        </template>
      </el-table-column>
      <el-table-column label="设置权益">
        <template slot-scope="scope">
          <el-button type="text" @click="equityDeploy(scope.row, scope.$index)" v-per="'vip-config'">权益配置</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <page :page="temp.page" :limit="temp.size" :total="total" @pagination="getList" />
  </div>
</template>

<script>
import {
  queryByPage,
  provinceVipExport,
  addVip,
  updateVip,
  queryExtendByPage,
  updateVipExtend,
  addVipExtend,
  deleteOneExtend,
  provinceVipSave,
  provinceVipDown,
  provinceVipImport,
  provinceVipDelete,
  excelImportHistory
} from '@/api/member'
import {
  secOptions,
  filterAll
} from '@/utils/options'
import page from '@/components/Pagination/index'
import provinceMixin from '@/mixins/province'
import Dialog from '@/components/Dialog/dialog'
import VueTable from '@/components/VueTable/vueTable'
import VueForm from '@/components/VueForm/vueForm'
import VueUpload from './upload-files'
export default {
  mixins:[provinceMixin],
  components: {
    page,
    Dialog,
    VueTable,
    VueForm,
    VueUpload
  },
  data() {
    return {
      temp: {
        provinceId: localStorage.getItem('provinceId') == 'ALL' ? '' : Number(localStorage.getItem('provinceId')),
        skuId: '',
        vipLevel: '',
        page: 1,
        size: 10,
      },
      addFormData:{
        page: 1,
        size: 10,
      },
      addFormDataTotal:0,
      tableRules: {
        required: [
          { required: true, message: '此项不能为空', trigger: 'blur' },
        ],
      },
      flag: '',
      reTime: '',
      list: [],
      dataList: [],
      newDta: {},
      model: false,
      currentIndex: null,
      id: '',
      total: 0,
      addDisabled: false,
      orderId: '',
      textMap: {
        update: '编辑',
        create: '新增',
      },
      dialogStatus: '',
      dialogFormVisible: false,
      addDialogFormVisible:false,
      uploadDialogFormVisible:false,
      editDialogFormVisible:false,
      ruleForm: {
        region: '',
        name: '',
        versions: '',
        memberStatus: '',
        memberDate: '',
        textarea: '',
      },
      exportLoading: false,
      firOptions: [
        { label: '全网会员',value: '0', },
        { label: '5G高级会员',value: '1', },
      ],
      secOptions: [
        { label: '黄金', value: '1',},
        { label: '铂金', value: '2', },
        { label: '钻石',  value: '3', },
      ],
      thiOptions: [
        { label: '失效', value: '0',  },
        { label: '有效', value: '1', },
      ],
      fouOptions: [
        {label: '长期', value: '0',  },
        { label: '1年',  value: '1',  },
        { label: '6个月', value: '2',},
        {label: '3个月', value: '3',},
        { label: '1个月', value: '4',  },
        {  label: '7天',value: '5', },
      ],
      rules: {
        name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        region: [
          { required: true, message: '请选择会员类型', trigger: 'change' },
        ],
        versions: [
          { required: true, message: '请选择会员等级', trigger: 'change' },
        ],
        memberStatus: [
          { required: true, message: '请选择会员状态', trigger: 'change' },
        ],
        memberDate: [
          { required: true, message: '请选择会员有效期', trigger: 'change' },
        ],
      },
      editFormRules:{
        id: [{ required: true, message: '不能为空', trigger: 'blur' }],
        vipLevel: [{ required: true, message: '不能为空', trigger: 'blur' }],
        vipName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        skuIds: [{ required: true, message: '不能为空', trigger: 'blur' }],
        skuId: [{ required: true, message: '不能为空', trigger: 'blur' }],
        provinceName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        showName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        corGoodsId: [{ required: true, message: '不能为空', trigger: 'blur' }],
        goodsId: [{ required: true, message: '不能为空', trigger: 'blur' }],
        reCorGoodsId: [{ required: true, message: '不能为空', trigger: 'blur' }],
        reGoodsId: [{ required: true, message: '不能为空', trigger: 'blur' }],
        priority: [{ required: true, message: '不能为空', trigger: 'blur' }],
        upgraded: [{ required: true, message: '不能为空', trigger: 'blur' }],
      },
      listLoading: false,
      marketStatus: [
        {value: '1',label: '新星', },
        {value: '2',label: '黄金', },
        {value: '4', label: '体验版铂金',},
        {value: '6', label: '铂金', },
        {value: '8',label: 'PLUS', },
      ],
      myAddList:[],
      myAddTableColumn:[
         {prop:'filename',label:'上传文件',slotName:'uploadFile'},
         {prop:'note',label:'任务说明'},
         {prop:'detail',label:'执行明细',slotName:'execDetail'},
         {prop:'createTime',label:'创建时间'},
         {prop:'createUser',label:'创建人'},
      ],   
      formItem:[ //主界面中搜索项
        {type:'select',prop:'vipLevel',label:'会员等级',placeholder:"会员等级",options:secOptions},
        {type:'slot',prop:'provinceId',label:'是否为全网产品',placeholder:"请选择", slotName: 'provinceIdOperation' },
        {type:'slot',prop:'skuId',label:'skuID',placeholder:"请输入",slotName:'skuIDOperation'},
      ],
      tableHandler:[// 主界面中的按钮方法
        {type:'primary',size:'mini', handler:()=>{this.getList()},label:'查询',per:"'vip-select'" },
        {type:'primary',size:'mini', handler:()=>{this.openAddDialogForm()},label:'新增'},
        {type:'primary',size:'mini', handler:()=>{this.educe()},label:'导出',per:"'vip-export'" ,loading:this.exportLoading},
        {type:'primary',size:'mini', handler:()=>{this.reset()},label:'重置查询'},
      ],
      
        // <div style="margin-left: 10px; display: inline-block">
        //   <el-button type="primary" @click="getList()" v-per="'vip-select'"  >查询</el-button >
        //   <el-button type="primary" icon="el-icon-plus" @click="openAddDialogForm">新增</el-button>
        //   <el-button type="primary" :loading="exportLoading" @click="educe()" v-per="'vip-export'">导出</el-button>
        //   <el-button @click="reset">重置查询</el-button>
      TableColumn:[
         {prop:'vipLevel',label:'会员等级',handler: (item) => {return filterAll(item.vipLevel, 'secOptions')},},
         {prop:'id',label:'会员ID'},
         {prop:'vipName',label:'会员名称',},
         {prop:'skuIds',label:'SKU'},
         {prop:'skuId',label:'展示SKU', width:"110"},
         {prop:'provinceName',label:'是否为统一产品'},
         {prop:'showName',label:'展示名称'},
         {prop:'corGoodsId',label:'订购corgoodsid', width:"170"},
         {prop:'goodsId',label:'订购goodsid',width:"150"},
         {prop:'reCorGoodsId',label:'退订corgoodsid', width:"170"},
         {prop:'reGoodsId',label:'退订goodsid',width:"150"},
         {prop:'priority',label:'展示优先级',},
         {prop:'upgraded',label:'是否可升级', slotName: 'UpgradableOrNotOperation' },
         {prop:'reCorGoodsId',label:'操作', slotName: 'operation' },
      ],
      myAddtableHandler:[
        {handler:()=>{this.uploadDialogFormVisible=true},type:'primary',label:'批量新增',size:'small',per:'vip-batchAdd'},
        {handler:()=>{this.refresh()},type:'primary',label:'刷新',size:'small'},
      ],
      myAddtableLoading:false,
      uploadFormItem:[
        {label:'上传文件',type:'slot',slotName:'upload',prop:'file'},
        {label:'',type:'slot',slotName:'downloadFileTemplate',prop:'download'},
        {label:'任务说明',type:'slot',slotName:'describe',prop:'describe'},
      ],
      uploadFormHandler:[
        {type:'primary',loading:false,icon:'el-icon-search',handler:()=>{this.startExec()},label:'开始执行'},
        {type:'',handler:()=>{this.uploadDialogFormVisible=false},label:'取消'}
      ],
      uploadFormData:{
        file:'',
        describe:''
      },
      editFormData:{
        id:'',
        vipLevel:'',
        vipName:'',
        skuIds:'',
        skuId:'',
        provinceName:'',
        showName:'',
        corGoodsId:'',
        goodsId:'',
        reCorGoodsId:'',
        reGoodsId:'',
        priority:'',
        upgraded:'',
      },
      editFormItem:[
        {label:'会员ID:',type:'input',prop:'id',placeholder:"请输入",required:true,name:'id',disabled:'disabled'},
        {label:'会员等级:',type:'select',prop:'vipLevel',placeholder:"请输入",required:true,name:'vipLevel',disabled:'disabled',options:secOptions},
        {label:'会员名称:',type:'input',prop:'vipName',placeholder:"请输入",required:true,name:'vipName'},
        {label:'SKU:',type:'input',prop:'skuIds',placeholder:"请输入",required:true,name:'skuIds'},
        {label:'展示SKU:',type:'input',prop:'skuId',placeholder:"请输入",required:true,name:'skuId'},
        {label:'是否为统一产品:',type:'select',prop:'provinceName',placeholder:"请输入",required:true,name:'provinceName',options:[],disabled:'disabled'},
        {label:'展示名称:',type:'input',prop:'showName',placeholder:"请输入",required:true,name:'showName'},
        {label:'订购corgoodsid:',type:'input',prop:'corGoodsId',placeholder:"请输入",required:true,name:'corGoodsId'},
        {label:'订购goodsid:',type:'input',prop:'goodsId',placeholder:"请输入",required:true,name:'goodsId'},
        {label:'退订corgoodsid:',type:'input',prop:'reCorGoodsId',placeholder:"请输入",required:true,name:'reCorGoodsId'},
        {label:'退订goodsid:',type:'input',prop:'reGoodsId',placeholder:"请输入",required:true,name:'reGoodsId'},
        {label:'展示优先级:',type:'input',prop:'priority',placeholder:"请输入",required:true,name:'priority'},
        {label:'是否可升级:',type:'select',prop:'upgraded',required:true,name:'upgraded',options:[
          {label:'是',value:1},
          {label:'否',value:0},
        ]},
      ],
      editFormHandler:[
        {type:'primary',icon:'el-icon-search',handler:()=>{this.submitEditForm()},label:'确定'},
        {type:'',handler:()=>{this.editFormClose()},label:'关闭'}
      ],
    }
  },
  updated(){},
  mounted() {
    
     this.tableHandler=[// 主界面中的按钮方法
        {type:'primary',size:'mini', handler:()=>{this.getList()},label:'查询',per:"'vip-select'" },
        {type:'primary',size:'mini', handler:()=>{this.openAddDialogForm()},label:'新增'},
        {type:'primary',size:'mini', handler:()=>{this.educe()},label:'导出',per:"'vip-export'" ,loading:this.exportLoading},
        {type:'primary',size:'mini', handler:()=>{this.reset()},label:'重置查询'},
      ]
      
    this.editFormItem.forEach((item)=>{
      if(item.prop==='provinceName'){
        item.options=this.$store.getters.provinceList
      }
    })
    this.getList()
  },
  methods: {
    // 查询分页
    getList(page) {
      if (page) {
        this.temp.size = page.limit
        if ((page.page - 1) * page.limit >= this.total) {
          return
        }
      }
      this.temp.page = page ? page.page : 1
      this.listLoading = true
      for (let key in this.temp) {
        if (this.temp[key] === '') {
          delete this.temp[key]
        }
      }
      queryByPage(this.temp)
        .then((res) => {
          this.list = res.data.rows
          this.total = res.data.counts
          this.listLoading = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
    educe() {
      for (let i in this.temp) {
        if (this.temp[i] == ''||i == 'page' || i == 'size') {
          delete this.temp[i]
        }
      }
      this.exportLoading = true
      setTimeout(() => {
          this.exportLoading = false;
      }, 1000);
      // provinceVipExport(this.temp)
      //   .then((res) => {
      //     this.exportLoading = false;
      //     let that = this;
      //     let reader = new FileReader();
      //     reader.addEventListener('loadend', function (e) {
      //       let result = e.target.result
      //       if(result.substr(0, 1) == "{"){
      //         result= JSON.parse(result);
      //         that.$message.error(result.message)
      //       } else {
      //         that.$exportFile(res,'权益超市会员中心导出清单.xlsx')
      //       }
      //     })
      //     reader.readAsText(res)
      //   })
      //   .catch((err) => {
      //     this.exportLoading = false
      //     console.log(err)
      //   })
    },
    // 新增会员
    // add() {
    //   this.dialogStatus = 'create'
    //   this.dialogFormVisible = true
    //   this.ruleForm.region = ''
    //   this.ruleForm.versions = ''
    //   this.ruleForm.memberStatus = ''
    //   this.ruleForm.names = ''
    //   this.$nextTick(() => {
    //     this.$refs['ruleForm'].clearValidate()
    //   })
    // },
    //新增确认
    createData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let query = {
            vipName: this.ruleForm.name,
            remark: this.ruleForm.textarea,
            vipCode: '4545',
            skuId: this.ruleForm.memberStatus,
            vipLevel: this.ruleForm.versions,
            vipType: this.ruleForm.region,
            vipEffective: this.ruleForm.memberDate,
          }
          addVip(query)
            .then()
            .catch((err) => {
              console.log(err)
            })
          setTimeout(() => {
            this.$message.success('新增成功')
            this.getList()
            this.dialogFormVisible = false
          }, 0)
        }
      })
    },

    // 会员上下线
    changeStatus(type, item) {
      this.$confirm(
        '确定要' + (type === 'down' ? '下' : '上') + '线吗？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          if (type === 'down') {
            updateVip({
              // online: 1,
              id: item.id,
            })
              .then((res) => {
                this.$message.success('操作成功')
                this.getList()
              })
              .catch(() => {})
          } else if (type === 'up') {
            updateVip({
              // online: 0,
              id: item.id,
            })
              .then((res) => {
                this.$message.success('操作成功')
                this.getList()
              })
              .catch(() => {})
          }
        })
        .catch(() => {})
    },
    // 新增权益
    addItem() {
      this.flag = 1
      this.addDisabled = true
      this.currentIndex = 0
      this.dataList &&
        this.dataList.unshift({
          rightName: '',
          rightUrl: '',
          image: '',
          status: '',
        })
    },
    isDisabled(index) {
      if (index == this.currentIndex) {
        return false
      } else {
        return true
      }
    },

    // 新增/编辑确定
    toSure(row, index) {
      this.addDisabled = false
      this.currentIndex = null
      if (!row.rightName || !row.rightUrl || !row.image) {
        this.$message.warning('请将新增内容填写完整')
        this.currentIndex = index
        return
      }
      // 调用接口
      let VipManageExtend = {
        rightName: row.rightName,
        rightUrl: row.rightUrl,
        status: row.status,
        image: row.image,
        vipManageId: this.id,
        id: row.id,
      }
      // 新增确认
      if (this.flag == 1) {
        addVipExtend(VipManageExtend)
          .then()
          .catch((err) => {
            console.log(err)
          })
      } else {
        // 修改确认
        updateVipExtend(VipManageExtend)
          .then()
          .catch((err) => {
            console.log(err)
          })
      }
    },
    // 编辑
    toEdit(row, index) {
      this.flag = 2
      this.currentIndex = index
    },
    // 删除权益
    deleteProvinceRow(index, row) {
      if (row.id) {
        let id = row.id
        deleteOneExtend(id)
          .then()
          .catch((err) => {
            console.log(err)
          })
        this.dataList && this.dataList.splice(index, 1)
      } else {
        this.dataList && this.dataList.splice(index, 1)
      }
    },
    // 权益配置详情
    equityDeploy(item, index) {
      let vipManageId = item.id
      this.id = vipManageId
      queryExtendByPage(vipManageId)
        .then((res) => {
          this.newDta = res
          this.dataList = res.data
          console.log('请求数据: ', this.dataList)
        })
        .catch((err) => {
          console.log(err)
        })
      this.model = true
    },
    cancel() {
      this.addDisabled = false
      this.model = false
      this.dataList = []
    },
    // 重置查询
    reset() {
      this.$refs['form'].resetFields()
      // this.reTime = ''
      // this.quittime = ''
      // this.temp.createTimeStart = ''
      // this.temp.createTimeEnd = ''
      // this.temp.refundStartTime = ''
      // this.temp.refundEndTime = ''
      this.getList()
    },
     addClose(){
      this.$emit('input', false);
    },
    editRow(row){
      // console.log(row)
      // console.log(Reflect.ownKeys(row))
      // console.log( )
      Object.keys(row).forEach((key)=>{
        this.editFormData[key]=row[key]
      })
      // this.editFormData=JSON.parse(JSON.stringify(row))
      this.editDialogFormVisible=true
    },
    submitEditForm(){     
      this.$refs.editForm.$refs.formRef.validate((valid)=>{
        if(!valid){
          console.log('no ok')
          this.$message('请填写完整！')
          return
        }

      // 处理provinceId和provinceName  
      let formData=this.editFormData
      const provinceList=this.$store.getters.provinceList
      provinceList.forEach(province=>{
        if(province.value===formData.provinceName){
          formData.provinceName=province.label
          formData.provinceId=province.value
        }
      })
      
      provinceVipSave(formData).then((res)=>{
        if(res.code==200){
           this.$message({message: '修改成功',type: 'success'});
           this.editFormClose()
           this.getList()
        }
      })
      })
    },
    downloadFileTemplate(id=null,filename='文件模板.xlsx',type){
        provinceVipDown({id,type}).then((res)=>{
         this.$exportFile(res, filename)
      }).catch((err)=>{
         this.$message({message: err,type: 'error'});
      })
    },
    refresh(){
      this.myAddtableLoading=true
      excelImportHistory(this.addFormData).then((res)=>{
        this.myAddtableLoading=false
        if(res.code==200){
          const {counts,rows}=res.data
          this.addFormDataTotal=counts
          this.myAddList=rows
        }
      }).catch((err)=>{
        this.myAddtableLoading=false
      })
    },
    startExec(){
      console.log('开始执行')
      this.uploadFormHandler[0].loading=true
      this.$refs.vueUpload.submitUpload()
    },
    startDelte(){
      const params={
        id:'',
      }
      provinceVipDelete(params).then((res)=>{
        console.log(res)
      })
    },
     editFormClose(){
      this.editFormData={
        id:'',
        vipLevel:'',
        vipName:'',
        skuIds:'',
        skuId:'',
        provinceName:'',
        showName:'',
        corGoodsId:'',
        goodsId:'',
        reCorGoodsId:'',
        reGoodsId:'',
        priority:'',
        upgraded:'',
      }
      this.editDialogFormVisible=false
    },
    deleteRow(row){
      this.$confirm('确认删除吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          const {id}=row
          provinceVipDelete({id}).then((res)=>{
            if(res.code==200){
              this.$message.success('刪除成功!')
              this.getList()
            }
          }).catch(err=>{
            this.$message.error('刪除失败')
          })
        }).catch(err=>{

        })
    },
    openAddDialogForm(){
      this.addDialogFormVisible=true
      this.refresh()
    },
    downloadUploadFile(row,type){
      const {id,filename}=row
      this.downloadFileTemplate(id,filename,type)
    },
    uploadSuccess(file,flag){
      if(!flag){
        this.uploadFormHandler[0].loading=false  
        return  
      }
      this.uploadFormHandler[0].loading=false  
      this.uploadDialogFormVisible=false
      this.refresh()
    }
  },
}
</script>

<style lang="scss" scoped>
.flex {
  margin: 10px 0;
}
.red {
  color: #f56c6c;
}
.blue {
  color: #409eff;
}
.green {
  color: #67c23a;
}
.tableForm {
  .el-form-item {
    margin-bottom: 0px;
  }
  /deep/.el-form-item__content {
    margin-left: 0px !important;
  }
  max-height: 380px;
  overflow: scroll;
}
.addButton {
  margin-bottom: 10px;
}
.table-img {
  width: 100px;
}
.table-staus span {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 12px;
  &.up {
    background-color: #67c23a;
  }
  &.no-up {
    background-color: #909399;
  }
}

/deep/.el-select {
  width: 190px;
}
.formdata {
  display: flex;
  justify-content: space-around;
  position: relative;
}
.addCombo {
  position: relative;
  left: -20px;
  top: -10px;
}
.addBtn {
  position: relative;
  top: 0px;
  left: -10px;
}
</style>



