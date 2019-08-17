(function ($) {
    // 在jq原型对象中添加一个自定义瀑布流插件
    // param: columns
    // 父容器宽度 - 各个子容器宽度之和 / ( 列数 - 1 ) 有10左右余数为最佳效果 
    $.fn.WaterFall = function (columns) {
        let $this = $(this);
        // 显示列数
        // let columns = 5;
        // 父容器宽度
        let parentWidth = $this.width();
        // 当前容器内所有子元素
        let items = $this.children();
        // 子元素宽度
        let childrenWidth = items.width();
        // 除去所有子元素宽度可分配的平均间距        
        let space = (parentWidth - childrenWidth * columns) / (columns - 1);
        // 记录所有子元素高度的数组
        let columnsArray = [];

        // 迭代容器内所有子元素
        items.each(function (index, node) {
            let $node = $(node);
            let height = $node.height();
            if (index < columns) {
                // 存储第一行元素的高度 用于下一行元素定位
                columnsArray[index] = height;
                // 设置第一行元素定位
                $node.css({ top: 0, left: index * (childrenWidth + space) });

            } else {
                // 下一行元素开始添加(从数组中找出上一行高度最小的元素，将元素添加至其下方)
                let minHeight = Math.min.apply(null, columnsArray);
                let minIndex = columnsArray.indexOf(minHeight);
                // 设置当前元素定位
                $node.css({ top: minHeight + 10, left: minIndex * (childrenWidth + space) });
                // 更新当前列的高度坐标(原高度+当前元素的高度+10px间距)
                columnsArray[minIndex] += height + 10;
            }
        })
        // 所有元素定位完毕 进行父容器高度设置
        let maxHeight = Math.max.apply(null, columnsArray);
        $this.height(maxHeight);
    }

})(jQuery)