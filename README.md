# E-commerce-projects
An e-commerce project that connects the entire shopping process and calls the payment interface to mimic the payment process.
一个电商项目，打通了购物全流程，并且调用了支付接口模仿支付流程。
## 特点
用 element-ui 实现了 zent 的 SKU 规格选择器组件
后台编辑 SKU
为每一种 SKU 设置额外的属性，如价格、库存等
前端展示并选择 SKU

## SKU
最小库存管理单元（Stock Keeping Unit, SKU）是一个会计学名词，定义为库存管理中的最小可用单元。
官方的解释可能有点晦涩，我举个例子，假设有一个手机，信息如下表格所示：


## 数据结构设定:
属性集（key）：定义了所有可选的属性及其可选值。
数据集（sku）：定义了每种属性组合的库存和价格。
## 动态SKU处理:
当用户选择或改变属性时，系统需要动态调整其他属性的可选状态。这是通过检查与已选择属性组合可能的所有SKU来实现的，如果某个属性组合的库存为0，则该属性值将被设为不可选。
## SKU 组合验证:
使用递归或迭代算法来生成所有可能的属性组合。这是为了处理部分选择的情况，即用户还没有选择所有的属性值。
对于每一个生成的属性组合，系统检查对应的库存。如果库存为零，则相关的属性值（未被选中的）会被标记为不可选。
## 优化用户体验:
在用户接近完成属性选择时（例如只剩下一个未选属性），系统通过检查所有可能的完整属性组合来禁用那些会导致库存为0的选项。
对于完全选择的情况，系统检查除已选择外的每个单独属性与其他已选属性的组合。
总结:
此系统确保用户在选择属性时，不会结束于一个库存为零的产品配置。
算法效率和精确的数据管理是此系统成功的关键。
通过上述步骤，您的系统可以有效地指导用户通过产品配置，同时确保所有显示的选项都是可实现的（即有库存的）。


其中一段代码展示：
```javascript
// 从m中取n的所有组合
function getFlagArrs(m, n) {
    var flagArrs = [],
        flagArr = [],
        isEnd = false;
    for(var i = 0; i < m; i++){
        flagArr[i] = i < n ? 1 : 0;
    }
    flagArrs.push(flagArr.concat());
    // 当n不等于0并且m大于n的时候进入
    if(n && m > n){
        while(!isEnd){
            var leftCnt = 0;
            for(var i = 0; i < m - 1; i++){
                if (flagArr[i] == 1 && flagArr[i + 1] == 0){
                    for(var j = 0; j < i; j++){
                        flagArr[j] = j < leftCnt ? 1 : 0;
                    }
                    flagArr[i] = 0;
                    flagArr[i + 1] = 1;
                    var aTmp = flagArr.concat();
                    flagArrs.push(aTmp);
                    if(aTmp.slice(-n).join('').indexOf('0') == -1){
                        isEnd = true;
                    }
                    break;
                }
                flagArr[i] == 1 && leftCnt++;
            }
        }
    }
    return flagArrs;
}
```
这个方法在调用后返回的 flagArrs 并不是最终所需要的业务数据，而是返回一组这样的数据
