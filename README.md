# doskey

> 为个人在使用 window 时候添加多个命令别名，方便快捷键使用。

## 要求

* Windows XP +
* Node 6+

## 安装

```shell
  npm install doskey -g
```

## 使用

通过 `node` 全局安装后，直接运行在 `cmd` 下执行 **dk** 查看可用命令。

```shell
  Usage: index [options] [command]
  
  Options:
  
    -V, --version  output the version number
    -h, --help     output usage information
  
  Commands:
  
    ls                           List all the doskeys
    add <key> <value> [disable]  Add custom doskey
    edit                         Edit doskeys
    del <key>                    Delete doskeys by key
    activate                     Activate the changes
    open                         Open configs file directly for batch edit. Experiment feature
```


### dk ls
列举所有的 `doskeys`， 当前工具内置常见方法。

### dk add <key> <value> [disable]
自定义添加doskey，如：<br />
`dk add ws webstorm $*`
`dk add ws "D:\JetBrains\WebStorm 2017.2.1\bin\webstorm64.exe"` **experiment**
`dk add sb "C:\Program Files\Sublime Text 2\sublime_text.exe"` 

常用场景，需要通过 `git clone` 某项目，
```shell
  git clone git://xxx
  cd xxx
  ws . #通过 webstorm 打开当前项目
  sb . #通过 sublime 打开当前项目
```

### dk edit
自定义启用或禁用doskey。

### dk del <key>
根据 `key` 删除指定 `doskey`。如：<br />
`dk del ws`

### dk open
使用系统默认 `json` 编辑器打开配置文件，批量修改。 <实验阶段, 慎用>

### dk activate
在做任何修改后，请使用 `dk activate` 命令使其生效，该命令会把配置文件修改并保存，
同时添加到注册表中，所以需要系统权限。

## License
MIT © Ailun She
