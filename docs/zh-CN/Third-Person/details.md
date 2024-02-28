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

* **手持即瞄准的 _物品模式_ 集合** 当玩家手持的任意物品符合集合中任意模式时，进入瞄准模式。
* **使用即瞄准的 _物品模式_ 集合** 当玩家正在使用的物品符合集合中任意模式时，进入瞄准模式。

集合中的 _物品模式_ 有 2 种来源：

* **模组配置** 可以在模组的配置界面中定义 _物品模式_。
* **资源包** 包括此模组内置的资源包、其他模组内置的资源包，以及玩家手动安装的其他资源包。

## 使用特定物品时暂时进入第一人称

第三人称下，当玩家使用特定物品时，会暂时进入第一人称视角，当停止使用该物品时，又会回到第三人称视角。

类似于瞄准模式判定规则，对这种物品的判定也使用 _物品模式_。
可以通过配置或资源包来自定义相关的 _物品模式_。

## 物品模式

_物品模式_ 是一种规则，用于根据 NBT 标签来匹配拥有某些特征的物品。可以用来判断玩家物品栏中的某个物品是否符合某种规则。

可以使用 _物品模式表达式_ 来描述一个 _物品模式_。例如“已装填的弩”的 NBT 标签中，属性 `Charged` 的值是 `1b` ，而“未装填的弩”的该属性值是 `0b` ，那么可以使用以下 _物品模式_ 来匹配“已装填的弩”：

> id 为`minecraft:crossbow`，且`Charged`标签值为`1b`的物品

它的表达式是 `minecraft:crossbow{Charged:1b}`

表达式可以是以下 3 种结构之一：

| 结构                  | 含义                         | 示例                    |
| --------------------- | ---------------------------- | ----------------------- |
| 物品 ID               | 匹配 id 相同的任意物品       | `egg` , `minecraft:egg` |
| NBT 标签              | 匹配符合该标签结构的任意物品 | `{Charged:1b}`          |
| 物品 ID 连着 NBT 标签 | 两者同时匹配的物品           | `crossbow{Charged:1b}`  |

示例

| _物品模式_ 表达式      | 含义                                            |
| ---------------------- | ----------------------------------------------- |
| `item.minecraft.egg  ` | 鸡蛋                                            |
| `minecraft.egg`        | 鸡蛋                                            |
| `minecraft:egg`        | 鸡蛋                                            |
| `egg`                  | 鸡蛋                                            |
| `crossbow`             | 弩（无论是否已装填）                            |
| `crossbow{Charged:1b}` | 已装填的弩                                      |
| `{Charged:1b}`         | NBT 标签里有 Charged 属性，且值为 1b 的任意物品 |

## 资源包

### 物品模式集合




目前已支持的集合有 3 种：
* `hold_to_aim` **手持即瞄准的 _物品模式_ 集合** 当玩家手持的任意物品符合集合中任意模式时，进入瞄准模式。
* `use_to_aim` **使用即瞄准的 _物品模式_ 集合** 当玩家正在使用的物品符合集合中任意模式时，进入瞄准模式。
* `use_to_first_person` **使用时暂时切换到第一人称的 _物品模式_ 集合** 当玩家正在使用的物品符合集合中任意模式时，暂时入第一人称模式。

每个集合都对应着资源包中的一个目录。例如集合 `hold_to_aim` 对应的资源包目录是 `assets/<命名空间>/item_patterns/hold_to_aim/`。

该目录中可以包含多个任意名称的json文件，每个文件中可以包含若干 _物品模式_ 表达式（见下方的内置资源包示例）。

该目录中的所有文件中的所有 _物品模式_ 都将会合并到这个目录所代表的集合中并在游戏中发挥作用。

### 内置资源包

本模组内置资源包中仅包含适用于原版 Minecraft 的相关 _物品模式_。

:::details 持有这些物品时进入瞄准模式

`assets/minecraft/item_patterns/hold_to_aim/vanilla.json`

```json
[
	"minecraft:crossbow{Charged:1b}",
	"minecraft:ender_pearl",
	"minecraft:snowball",
	"minecraft:egg",
	"minecraft:splash_potion",
	"minecraft:lingering_potion",
	"minecraft:experience_bottle"
]
```
:::

:::details 使用这些物品时进入瞄准模式

`assets/minecraft/item_patterns/use_to_aim/vanilla.json`

```json
[
	"minecraft:bow",
	"minecraft:trident"
]
```
:::

:::details 使用这些物品时暂时进入第一人称视角

`assets/minecraft/item_patterns/use_to_first_person/vanilla.json`

```json
[
	"minecraft:spyglass"
]
```
:::

### 额外的资源包

通过添加额外的资源包，可以使其他物品也在第三人称下自动进入瞄准模式。

`assets/<命名空间>/item_patterns/<hold_to_aim|use_to_aim|use_to_first_person>/<任意名称>.json`

:::warning
命名空间和名称可以任取，但是不同资源包中拥有相同路径的 JSON 文件会互相冲突，最终生效的文件将是所在资源包优先级最高的那个。
:::

