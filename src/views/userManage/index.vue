<template>
  <div class="con">
    <div class="search-con">
      <el-input v-model="phone" placeholder="手机号码" clearable class="search-input" size="small" />
      <el-input v-model="email" placeholder="邮箱" clearable class="search-input" size="small" />
    </div>
    <el-table :data="userList" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="username" label="账户名" />
      <el-table-column label="头像" width="60">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt="图片" class="img">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="email" label="邮箱" width="200" />
      <el-table-column prop="phoneNumber" label="手机号码" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column label="性别">
        <template slot-scope="scope">
        <span>{{ scope.row.age==1?'男':'女' }}<span/></span></template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">详情</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" title="提示" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>
<script>
import { getUserList } from '@/api/userManage'
export default {
  data() {
    return {
      userList: [],
      phone: '',
      email: '',
      row: '',
      dialogVisible: false
    }
  },
  created() {
    getUserList().then(res => {
      this.userList = res.data
    })
  },
  methods: {
    handleClick(row) {
      console.log(row)
      this.row = row
      this.dialogVisible = true
    },
    handleSelectionChange() {

    },
    handleClose() {
      this.dialogVisible = false
    }
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
.search-con {
  margin: 20px 0;
}
.search-input {
  width: 120px;
  margin-right: 20px;
}
</style>

