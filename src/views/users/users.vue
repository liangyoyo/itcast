<template>
  <div class="users">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/login' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <!-- .native可以监听组件根元素的原生事件 我们引入一个原生标签(div、li、p......)的概念，那么原生事件（存在于标准当中的如'click','mouseover'）应该绑定到原生标签上。自定义组件上应该绑定自定义事件。如果我们想给自定义组件标签（注意是标签，不是内部元素）绑定原生事件（使原生事件生效于组件template的rootelement上）怎么办，加.native修饰符。
    组件为//div为rootelement，里面的为内部元素,你可以试试，给自定义组件标签绑定js标准的原生事件是不会生效的，所以需要加native修饰符。-->
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入内容"
        v-model="userobj.query"
        class="input-with-select"
        style="width:300px;margin-right:20px"
        @keydown.enter.native="init"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="success" plain @click="adddialogFormVisible =true">添加用户</el-button>
    </div>
    <!-- 数据列表页 -->
    <template>
      <el-table :data="userList" border style="width: 100% ;margin-top:20px">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column property="username" label="姓名" width="120"></el-table-column>
        <el-table-column property="email" label="邮箱" width="160"></el-table-column>
        <el-table-column property="mobile" label="电话"></el-table-column>
        <el-table-column label="用户状态" width="80">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeState(scope.row.id,scope.row.mg_state)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" content="编辑" placement="top">
              <el-button type="primary" icon="el-icon-edit" round @click="showEditDialog(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="删除" placement="top" >
              <el-button type="danger" icon="el-icon-delete" round  @click="delUser(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="light"
              content="分配角色"
              placement="top"
            >
              <el-button type="warning" icon="el-icon-check" round  @click="showgrantUserRole(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="userobj.pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="userobj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="adddialogFormVisible">
      <el-form :model="addform" ref="addform" :label-width="'80px'" :rules="rules">
        <!-- 定表单元素的prop属性和对应的rules规则名称一致 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addform.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addform.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addform.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="addform.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adddialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addsubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="editdialogFormVisible">
      <el-form :model="editform" ref="editform" :label-width="'80px'" :rules="rules">
        <!-- 定表单元素的prop属性和对应的rules规则名称一致 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editform.username" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editform.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="editform.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editsubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="grantdialogFormVisible">
      <el-form :model="grantform">
        <el-form-item label="用户名" width="20">
         <span>{{grantform.username}}</span>
        </el-form-item>
        <el-form-item label="角色" width="100">
          <el-select v-model="grantform.rid" clearable placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click=" grantdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantrole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getAllUserList,
  addUser,
  editUser,
  delUserById,
  updateUserState,
  grantUserRole
} from '@/api/user_index.js'
import { getAllRoleList } from '@/api/role_index.js'
export default {
  data () {
    return {
      value2: true,
      adddialogFormVisible: false,
      total: 0,
      userList: [],
      userobj: {
        query: '',
        pagenum: 1,
        pagesize: 4
      },
      addform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editdialogFormVisible: false,
      editform: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      roleList: [],
      grantdialogFormVisible: false,
      grantform: {
        username: '',
        rid: '',
        id: ''
      },
      // 表单验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 5,
            max: 10,
            message: '密码长度在 5 到 10 个字符',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            pattern: /\w+[@]+\w+[.]\w+/,
            message: '请输入合法的电子邮箱',
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1\d{10}$/,
            message: '请输入合法的手机号',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 获取每页总条数时触发
    handleSizeChange (val) {
      // 修改全局的pagesize
      this.userobj.pagesize = val
      // 重新刷新数据
      this.init()
    },
    // 切换当前页码时触发
    handleCurrentChange (val) {
      // 修改全局pagenum
      this.userobj.pagenum = val
      // 重新刷新数据
      this.init()
    },
    // 添加用户
    addsubmit () {
      this.$refs.addform.validate(valid => {
        if (valid) {
          addUser(this.addform)
            .then(res => {
              console.log(res)
              if (res.data.meta.status === 201) {
                this.$message({
                  type: 'success',
                  message: '数据添加成功'
                })
                // 隐藏对话框
                this.adddialogFormVisible = false
                // 对整个表单进行重置
                this.$refs.addform.resetFields()
                // 刷新
                this.init()
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$message({
            type: 'error',
            message: '数据输入不合法'
          })
        }
        return false
      })
    },
    // 编辑用户
    editsubmit () {
      this.$refs.editform.validate(valid => {
        if (valid) {
          editUser(this.editform)
            .then(res => {
              console.log(res)
              if (res.data.meta.status === 200) {
                this.$message({
                  type: 'success',
                  message: '数据编辑成功'
                })
                // 隐藏对话框
                this.editdialogFormVisible = false
                // 对整个表单进行重置
                this.$refs.editform.resetFields()
                // 刷新
                this.init()
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$message({
            type: 'error',
            message: '数据输入不合法'
          })
        }
        return false
      })
    },
    // 填充默认数据
    showEditDialog (row) {
      this.editdialogFormVisible = true
      this.editform.username = row.username
      this.editform.email = row.email
      this.editform.mobile = row.mobile
      this.editform.id = row.id
    },
    // 删除用户
    delUser (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delUserById(id)
            .then(res2 => {
              if (res2.data.meta.status === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                // Math.celi（）向上取整
                this.userobj.pagenum =
                  Math.ceil((this.total - 1) / this.userobj.pagesize) <
                  this.userobj.pagenum
                    ? --this.userobj.pagenum
                    : this.userobj.pagenum
                this.init()
              }
            })
            .catch(err2 => {
              console.log(err2)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 更新用户状态
    async changeState (id, type) {
      console.log(id, type)
      let res = await updateUserState(id, type)
      console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: '状态修改成功'
        })
      }
    },
    // 获取默认数据
    showgrantUserRole (row) {
      this.grantdialogFormVisible = true
      this.grantform.id = row.id
      this.grantform.rid = row.rid
      this.grantform.username = row.username
      console.log(row)
    },
    // 分配角色
    async grantrole () {
      if (!this.grantform.rid) {
        this.$message({
          type: 'warning',
          message: '请选择一个角色'
        })
      } else {
        let res = await grantUserRole(this.grantform)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '角色设置成功'
          })
          this.grantdialogFormVisible = false
          this.init()
        }
      }
    },
    // 数据初始化
    init () {
      getAllUserList(this.userobj)
        .then(res => {
          if (res.data.meta.status === 200) {
            this.userList = res.data.data.users
            // 获取总记录数
            this.total = res.data.data.total
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取所有角色数据
    async roleListInit () {
      let res = await getAllRoleList()
      this.roleList = res.data.data
    }
  },

  mounted () {
    this.init()
    this.roleListInit()
  }
}
</script>
<style lang="less">
</style>
