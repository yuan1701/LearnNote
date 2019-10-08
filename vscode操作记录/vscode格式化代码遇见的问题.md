### VSCode中使用vetur插件格式化vue文件时，js代码会被添加上分号且单引号会转变为双引号
在 VS Code 中使用 Ctrl+Shift+P打开命令面板，输入Preferences: Open User Settings或Preferences: Open Workspace Settings。在settings.json里面添加：

```javascript
"vetur.format.defaultFormatterOptions": {
        // --- 解决问题 ---
        "prettier": {
            "semi": false,
            "singleQuote": true
        }
    },
```
