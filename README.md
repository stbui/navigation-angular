[前端导航大全](back/favourite.md)
----------

在线Demo
```
http://stbui.com
```

```bash
git clone https://github.com/stbui/navigation.git
```

安装依赖并启动
```bash
npm install
```

导入sql到MySQL数据库，然后修改项目数据库配置文件
```bash
src/common/config/db.js
```
默认配置
```javascript
mysql: {
      host: '127.0.0.1',
      port: '',
      database: 'navigation',
      user: 'root',
      password: 'root',
      prefix: 'nav_',
      encoding: 'utf8'
}
```

```bash
npm run start
```

## docker

> 前提依赖环境准备

```
 - docker pull node -
docker pull mysql
```

> 进入到项目目录下，执行下面命令构建镜像

```
docker build -t navigation .
```

> 启动mysql容器

```
docker run -d -p 3306:3306 --name nav-mysql -e MYSQL_ROOT_PASSWORD=root mysql
```
如果需要数据持久化，使用下面命令创建
```
docker run -d -p 3306:3306 --name nav-mysql -e MYSQL_ROOT_PASSWORD=root -v /data/mysql:/data mysql
```

> 启动node容器

```
docker run -d -p 8360:8360 --name node-navigation --link nav-mysql:mysql -e MYSQL_HOSTNAME=nav-mysql navigation
```

> 导入数据

进入刚刚运行的容器
```
docker exec -it aae /bin/bash
```
在mysql容器中执行 *mysql* 命令创建数据库名为 **navigation**
```
create database navigation
```
然后退出mysql容器， 导入sql文件到容器中
```
docker exec -d aae mysql -uroot -proot < ./navigation.sql
```


> 恭喜你，可以访问了
```
http://ip:8630
```
