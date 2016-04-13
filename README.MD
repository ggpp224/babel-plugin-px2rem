#babel-plugin-px2rem
> 将js代码中以object属性中key以padding, margin开头,或是height, width,lineHeight,
fontSize,并且属性值中包含 `px` 的值转化为rem

## 安装

```
 $ npm install babel-plugin-px2rem
```

## 使用

修改 .babelrc 文件
```
{
  "plugins": ["px2rem"]
}

```

## 说明

不支持对象中变量的转化, 提供占位函数`_px2rem`对变量处理.

**In**
```
        const wh = _px2rem('48px');

        var obj = {
            "paddingLeft": '75px',
             padding: '6px 10px',
             margin:_px2rem('8px'),
             fontSize:'24px',
             width:wh,
             height:'75px',
             length:'100px'
        };
```


**Out**

```
            var wh = '1.28rem';

            var obj = {
                "paddingLeft": '2rem',
                padding: '0.16rem 0.26666666666666666rem',
                margin: '0.21333333333333335rem',
                fontSize: '0.64rem',
                width: wh,
                height: '2rem',
                length: '100px'
            };


```

