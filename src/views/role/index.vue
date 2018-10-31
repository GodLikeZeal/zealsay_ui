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
          <el-button type="text" size="small" @click="handleClick(scope.row)">详情</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      title="角色信息"
      class="align-right">
      <p>
        <label type="label" class="small">角色名称：</label>
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
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
      dialogVisible: false
    }
  },
  created() {
    getRoleList().then(res => {
      this.roleList = res.data
    })
  },
  methods: {
    handleClick(row) {
      this.dialogVisible = true
      this.row = row
    },
    handleClose(row) {
      this.dialogVisible = false
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
  .el-dialog__body p label:nth-of-type(1){
    display: inline-block;
    width: 80px;
    text-align: right;
  }
</style>

