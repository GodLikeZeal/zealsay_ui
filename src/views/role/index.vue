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
      value: ''
    }
  },
  created() {
    getRoleList().then(res => {
      this.roleList = res.data
    })
  },
  methods: {
    handleClick(row) {
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
</style>

