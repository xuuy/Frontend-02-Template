
## 这周还做了个东西，也是为了复习和深入ES

https://github.com/xuuy/es-executer

## block level box

- display为以下值时会创建block level box
  - block
  - flex
  - grid
  - table
  - flow-root

## block container

- display为以下值时会创建block container box
  - block
  - flow-root
  - inline-block
- 其内容是block container
  - table-cell
  - table-caption
  - flex-item
  - grid-cell

## block box

- display为以下值时会创建block box
  - block
  - list-item

## BFC(block formatting context)

### 建立BFC
  - `float: left、right`
  - `position: absolute、fixed`
  - block containers (such as inline-blocks, table-cells, and table-captions) that are **not block boxes**
  - `overflow`除了`visible`
  - flex-item
  - grid-cell
  - 匿名表格单元格

### **margin collaspe**  

什么情况下会发生？

引用规范的一句话：**Vertical margins between adjacent block-level boxes in a block formatting context collapse**  
  
所以**边距折叠**只会发生在**同一个BFC**下的**block level box**中，所以这些值就会折叠`block、flex、grid、table、flow-root`

## inline level box

display为以下值时会创建inline level box

- inline-block
- inline-flex
- inline-grid
- inline-table

## inline box

inline box 又名 inline block  

display: inline会创建inline box

## IFC（inline-formatting-context）

仅包含inline-level content的block container会建立一个新的inline-formatting-context


