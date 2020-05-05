# vue-todo

## 获取代码

```
git clone git@github.com/curder/vue-todo.git
```

## 更新前端以来
```
yarn install
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

可以参考【[curder/laravel-todo](https://github.com/curder/laravel-todo)】
