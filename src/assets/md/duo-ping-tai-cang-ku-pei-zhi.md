---
title: 多平台仓库配置
date: 2021-04-24 21:26:16
tags:
  - 代码托管
  - 仓库配置
categories:
  - 技术
description: false
top_img: https://gitee.com/loungers/picbed/raw/master/images/漂亮美少女%20女孩子%20手机%20白裤袜%20美脚美腿%20好看二次元4k动漫壁纸.jpg
cover: https://gitee.com/loungers/picbed/raw/master/images/初音%20画画%20电脑%20初音未来4k动漫壁纸.jpg
---

<div align = 'center'><font size = "70">多平台仓库配置</font></div>  

---

​    多平台仓库配置主要是对于同时有多个托管平台提交项目，如同时使用Gitee、Github、Gitlab等共存的开发环境

---

### 思路：通过建立不同密钥，来对不同托管平台进行配置

---

## 一、清除git的全局设置

​    已经安装了git的用户想必已经设置了全局的`user.name`和`user.email` ，可以使用`git config --global --list`来进行查看你的电脑已经设置的全局设置。

```code
$ git config --global user.name "你的名字"
$ git config --global user.email  "你的邮箱"
```

​    如果配置过以上命令，最好进行删除，以免之后命令发生冲突。

​    删除全局设置则需要运行一下命令

```code
$ git config --global --unset user.name "你的名字"
$ git config --global --unset user.email "你的邮箱"
```

---

## 二、生成新的SSH Keys

针对不同的托管平台，我们需要创建不同的SSH Keys

在进行Keys的创建时，我们指定文件创建的路径，进而方便之后的操作：`~/.ssh/gitee_id_rsa`

---

### 1) Gitee的SSH Keys

```code
$ ssh-keygen -t rsa -f ~/.ssh/gitee_id_rsa -C "你的邮箱"
```

​    输入命令后直接回车，不用管输入密码，最后就会是默认的没有密码，需要密码的自行设置。

---

### 2) Github的SSH Keys

```code
$ ssh-keygen -t rsa -f ~/.ssh/github_id_rsa -C "你的邮箱"
```

---

### 3) Gitlab的SSH Keys

同上
```code
$ ssh-keygen -t rsa -f ~/.ssh/gitlab_id_rsa -C "你的邮箱"
```

---

### 4）完成后会在路径`~/.ssh/`下生成以下文件

```code
.
├── ./gitee_id_rsa
├── ./gitee_id_rsa.pub
├── ./github_id_rsa
└── ./github_id_rsa.pub
```



---

### 5) 添加使系统识别我们创建的Keys

​    系统默认只读取`id_rsa`，但我们对SSH Keys进行了自定义的命名，所以需要将我们创建的密钥添加到SSH agent中

 `听人说Mac下可以直接创建不需要添加，我自己测试了一下，新建一个SSH。没有添加ssh-agent，也被系统识别到了，所以Mac用户此步骤可省略，如果遇到问题，删除所有密钥，重新按步骤操作一遍`

    ```code
$ ssh-agent
$ ssh-add ~/.ssh/gitee_id_rsa
$ ssh-add ~/.ssh/github_id_rsa
$ ssh-add ~/.ssh/gitlab_id_rsa
    ```

---

### 6) 多帐号必须要配置config文件（重要）

​    若是路径下无config文件则需要创建config文件

#### 创建

```code
$ touch ~/.ssh/config
```

#### config文件配置

##### 最简配置文件

```code
Host github.com
    HostName github.com
    IdentityFile ~/.ssh/github_id_rsa
```

##### 完整配置文件

```code
#Github
Host github.com
    HostName github.com
    User git #默认就是git，可以不写
    IdentityFile ~/.ssh/github_id_rsa
    
#GitLab
Host git@gitlab.com
    HostName gitlab.com
    User git
    IdentityFile ~/.ssh/gitlab_id_rsa
    
#Gitee
Host gitee.com
    Port 22
    HostName gitee.com
    User git
    IdentityFile ~/.ssh/gitee_id_rsa
    
#其他
Host git@git.startdt.net
    Port 22
    HostName http://git.startdt.net
    User git
    IdentityFile ~/.ssh/startdt_id_rsa
```

##### 配置字段解释

> **Host**: 主机服务器地址，当ssh的时候如果服务器地址能匹配上这里Host指定的值，则Host下面指定的HostName将被作为最终的服务器地址使用，并且将使用该Host字段下面配置的所有自定义配置来覆盖默认的/etc/ssh/ssh_config配置信息
>
> **Port**：自定义的端口，可不配置
>
> **User**：自定义的用户名，可不配置
>
> **HostName**：真正连接的服务器地址
>
> **PreferredAuthentications**：指定优先使用哪种方式进行验证，支持密码和密钥验证的方式
>
> **IdentifyFile**：指定本次连接使用的密钥文件

---

### 7）在托管商添加SSH Keys

 ##### Github

 地址：<https://github.com/settings/keys>

  1.登录Github

  2.点击头像进入`settings`

  3.选择左边`SSH and GPG keys`

  4.点击`Add SSH Key`

  5.将之前创建的`~/.ssh/github_id_rsa.pub`文件中的Keys复制到页面中的key位置，按步骤完成就好。（Gitlab和Gitee以及其他平台也同样步骤添加就好）

<img src="https://gitee.com/loungers/picbed/raw/master/blogimg/Github-add-ssh.png" alt="Github-add-ssh" style="zoom:50%;" />

---

## 三、测试是否连接成功

​	由于每个托管平台的仓库都有唯一的一个后缀，比如Github的是`git@github.com`

​	所以可以通过输入命令来测试：

```code
$ SSH -T git@github.com
$ SSH -T git@gitlab.corp.xyz.com
$ SSH -T git@gitee.com
```

​	第一次测试会让你确认信息，按照提示确认输入`yes`就好。

```code
$ SSH -T git@github.com
Hi 你的名字! You've successfully authenticated, but GitHub does not provide shell access.
$ SSH -T git@gitee.com
Hi 你的名字! You've successfully authenticated, but GITEE.COM does not provide shell access.
```

​	结果如果出现这个就代表成功：

- GitHub -> successfully
- GitLab -> Welcome to GitLab
- Gitee -> successfully

---

## 四) 测试clone和push项目

### Clone

![Gitee-clone](https://gitee.com/loungers/picbed/raw/master/blogimg/Gitee-clone.png)

### Push

![Gitee-push](https://gitee.com/loungers/picbed/raw/master/blogimg/Gitee-push.png)

---

## 5) 操作过程可能出现问题

​	检查是否成功的时候，报错：`tilde_expand_filename: No such user .`

```code
$ ssh -T git@github.com
tilde_expand_filename: No such user . 
```

​	解决办法：此问题是因为`写错了文件路径` 或者 `大小写没写对`，删除重新配置，或者直接复制文章中的改好粘贴进去。