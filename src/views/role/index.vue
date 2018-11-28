<template>
  <div class="con">
    <div class="search-con">
      <el-input v-model="name" placeholder="名称" clearable class="search-input" size="small"/>
      <el-input v-model="value" placeholder="key" clearable class="search-input" size="small"/>
    </div>
    <el-table :data="roleList" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="value" label="value"/>
      <el-table-column prop="description" label="描述"/>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" title="详情" @click="handleDetailClick(scope.row)">详情</el-button>
          <el-button type="text" size="small" title="修改" @click="handleEditClick(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="currentPage"
      :page-sizes="[10, 50, 100, 200]"
      :page-size.sync="pageSize"
      :total="total"
      class="right-bottom"
      background
      layout="total, prev, pager, next, sizes"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
    <el-dialog
      :visible.sync="detailDialogVisible"
      title="角色信息"
      class="align-right">
      <p>
        <label type="label" >角色名称：</label>
        <label type="text">{{ row.name }}</label>
      </p>
      <p>
        <label type="label">value：</label>
        <label type="text">{{ row.value }}</label>
      </p>
      <p>
        <label type="label">描述：</label>
        <label type="text">{{ row.description }}</label>
      </p>
      <p>
        <label type="label">创建时间：</label>
        <label type="text">{{ row.createAt }}</label>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="detailDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="editDialogVisible"
      title="角色信息"
      class="align-right">
      <el-form :model="row">
        <el-form-item :label-width="formLabelWidth" label="角色名称：">
          <el-input v-model="row.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="value：">
          <el-input v-model="row.value" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="描述：">
          <el-input v-model="row.description" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getRoleList } from '@/api/role'
export default {
  name: 'Role',
  data() {
    return {
      roleList: [],
      name: '',
      value: '',
      row: '',
      detailDialogVisible: false,
      editDialogVisible: false,
      formLabelWidth: '120px',
      currentPage: 1,
      pageSize: 10,
      total: 5
    }
  },
  created() {
    getRoleList().then(res => {
      this.pageSize = res.data.pageSize
      this.currentPage = res.data.currentPage
      this.total = res.data.total
      this.roleList = res.data.records
    })
  },
  methods: {
    handleDetailClick(row) {
      this.detailDialogVisible = true
      this.row = row
    },
    handleEditClick(row) {
      this.editDialogVisible = true
      this.row = row
    },
    handleEditSave(row) {
      this.editDialogVisible = false
      console.log(row)
    },
    handleSelectionChange() {}
  }
}
</script>
<style lang="scss" scoped>
  .con {
    padding: 0 20px;
  }
  .img {
    width: 30px;
    height: 30px;
    border-radius: 10px;
    vertical-align: middle;
  }
  .search-con{
    margin: 20px 0;
  }
  .search-input{
    width: 120px;
    margin-right: 20px;
  }
  .align-right p label:nth-of-type(1){
    display: inline-block;
    width: 80px;
    text-align: right;
  }
  .right-bottom{
    float: right;
    margin: 20px;
  }
</style>

