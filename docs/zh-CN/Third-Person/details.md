---
prev:

    text: 🗒简介
    link: './intro'

next:

    text: 📝更新日志
    link: ./changelog

---

# 📖 详细特性

## 配置文件

此模组的配置文件是 json 格式。位于游戏运行目录下 `config/leawind_third_person.json`

## 瞄准模式判定规则

第三人称下，模组会根据玩家手持的物品、正在使用的物品判断是否进入瞄准模式。

在游戏运行时，模组会维护两个[_物品模式_](#物品模式)集合：

*   **手持即瞄准的 _物品模式_ 集合** 当玩家手持的任意物品符合集合中任意模式时，进入瞄准模式。
*   **使用即瞄准的 _物品模式_ 集合** 当玩家正在使用的物品符合集合中任意模式时，进入瞄准模式。

集合中的 _物品模式_ 有 2 种来源：

*   **模组配置** 可以在模组的配置界面中定义 _物品模式_。
*   **资源包** 包括此模组内置的资源包、其他模组内置的资源包，以及玩家手动安装的其他资源包。

## 资源包

### 内置资源包

本模组内置资源包中包含适用于原版 Minecraft 的瞄准模式判定规则。

:::details 内置的原版相关规则

`assets/minecraft/item_patterns/aiming_check/vanilla.json`

```json
{
	"hold_to_aim": [
		"minecraft:crossbow{Charged:1b}",
		"minecraft:ender_pearl",
		"minecraft:snowball",
		"minecraft:egg",
		"minecraft:splash_potion",
		"minecraft:lingering_potion",
		"minecraft:experience_bottle"
	],
	"use_to_aim": [
		"minecraft:fbow",
		"minecraft:trident"
	]
}
```
:::

### 第三方资源包

通过添加额外的资源包，可以使其他物品也在第三人称下自动进入瞄准模式。

`assets/<命名空间>/item_patterns/aiming_check/<名称>.json`

:::details 类型定义
```ts
type AimingCheck = {
	hold_to_aim?: string[];	// 可选
	use_to_aim?: string[];	// 可选
}
```
:::

:::warning
命名空间和名称可以任取，但是不同资源包中拥有相同路径的json文件会互相冲突，最终生效的文件将是所在资源包优先级最高的那个。
:::

## 物品模式

_物品模式_ 是一种规则，用于根据 NBT 标签来匹配拥有某些特征的物品。可以用来判断玩家物品栏中的某个物品是否符合某种规则。

可以使用 _物品模式表达式_ 来描述一个 _物品模式_。例如已装填的弩的 NBT 标签中，属性 `Charged` 的值是 `1b` ，而未装填的弩的该属性值是 `0b` ，那么可以使用这样的 _物品模式_ 来匹配已装填的弩：

> id 为`minecraft:crossbow`，且`Charged`标签值为`1b`的物品

它的表达式是 `minecraft:crossbow{Charged:1b}`

### 物品模式表达式

表达式可以是 3 种结构：

| 结构                  | 含义                         | 示例                    |
| --------------------- | ---------------------------- | ----------------------- |
| 物品 ID               | 匹配 id 相同的任意物品       | `egg` , `minecraft:egg` |
| NBT 标签              | 匹配符合该标签结构的任意物品 | `{Charged:1b}`          |
| 物品 ID 连着 NBT 标签 | 两者同时匹配的物品           | `crossbow{Charged:1b}`  |

### 示例

| _物品模式_ 表达式      | 含义                                            |
| ---------------------- | ----------------------------------------------- |
| `item.minecraft.egg  ` | 鸡蛋                                            |
| `minecraft.egg`        | 鸡蛋                                            |
| `minecraft:egg`        | 鸡蛋                                            |
| `egg`                  | 鸡蛋                                            |
| `crossbow`             | 弩（拥有任意 NBT 标签）                         |
| `crossbow{Charged:1b}` | 已装填的弩                                      |
| `{Charged:1b}`         | NBT 标签里有 Charged 属性，且值为 1b 的任意物品 |
