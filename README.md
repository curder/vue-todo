# vue-todo

## 获取代码

```
git clone git@github.com/curder/vue-todo.git
```

## 更新前端依赖
```
yarn
```

### 开发编译
```
yarn serve
```

### 生产编译
```
yarn build
```

### 代码检查和修复
```
yarn lint
```

### 依赖后端接口

| 方法 | 地址 | 返回状态码 | 简单说明 |
| ---- | ---- | ---- | ---- |
| GET | `/api/todos` | 200 | 获取todos列表 |
| POST | `/api/todos` | 201 | 新增todo |
| PATCH、PUT | `/api/todos/check-all` | 200 | 选中或反选所有todos |
| PATCH、PUT| `/api/todos/{todoID}` | 200 | 更新todo |
| DELETE | `/api/todos/delete-completed` | 200 | 删除已完成的todos | 
| DELETE | `/api/todos/{todoID}` | 200 | 删除todo |
| GET | `/api/user` | 200 | 获取用户 |
| POST | `/api/login` | 200 | 登录 |
| POST | `/api/logout` | 200 | 退出登录 |
| POST | `/api/register` | 200 | 注册 |
| POST | `oauth/token` | 200 | 获取access_token |
| DELETE | `oauth/tokens/{token_id}` | 200 | 回收token |  

可以参考【[curder/laravel-todo](https://github.com/curder/laravel-todo)】
