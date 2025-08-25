/**
 * 核心模块统一导出
 * 
 * YggJS RButton 组件库的核心架构模块
 * 提供主题无关的基础功能和抽象
 * 
 * @version 1.0.0
 * @author YggJS Team
 */

// 核心类型导出
export type * from './types';

// 核心组件导出
export * from './components';

// 核心Hooks导出
export * from './hooks';

// 核心工具导出
export * from './utils';

/**
 * 核心架构说明
 * 
 * 本模块提供了组件库的核心架构，包括：
 * 
 * ## 📦 模块结构
 * 
 * ```
 * core/
 * ├── types/          # 类型定义系统
 * │   ├── button.ts   # 按钮相关类型
 * │   ├── theme.ts    # 主题系统类型
 * │   └── index.ts    # 类型统一导出
 * ├── components/     # 基础组件抽象
 * │   ├── BaseButton.tsx  # 基础按钮组件
 * │   └── index.ts        # 组件统一导出
 * ├── hooks/          # 核心Hooks
 * │   ├── useButton.ts    # 按钮逻辑Hook
 * │   ├── useTheme.ts     # 主题管理Hook
 * │   └── index.ts        # Hooks统一导出
 * ├── utils/          # 工具函数集
 * │   ├── accessibility.ts  # 可访问性工具
 * │   ├── style-cache.ts   # 样式缓存系统
 * │   ├── performance.ts   # 性能监控工具
 * │   └── index.ts         # 工具统一导出
 * └── index.ts        # 核心模块总导出
 * ```
 * 
 * ## 🎯 设计原则
 * 
 * 1. **主题无关**: 核心模块不依赖任何具体主题
 * 2. **高度抽象**: 提供可扩展的基础抽象和接口
 * 3. **性能优先**: 内置缓存、防抖、性能监控等优化
 * 4. **可访问性**: 默认支持WCAG标准和屏幕阅读器
 * 5. **类型安全**: 完整的TypeScript类型定义
 * 6. **可测试性**: 纯函数和可预测的状态管理
 * 
 * ## 🔧 核心功能
 * 
 * ### 类型系统 (types/)
 * - 统一的按钮属性和状态定义
 * - 完整的主题系统类型规范
 * - 工具类型和类型守卫函数
 * 
 * ### 基础组件 (components/)
 * - BaseButton: 所有主题按钮的基类
 * - 工厂函数: 快速创建主题特定组件
 * - 组件工具: 验证、调试、性能分析
 * 
 * ### 核心Hooks (hooks/)
 * - useButton: 按钮交互逻辑和状态管理
 * - useTheme: 主题系统访问和管理
 * - useButtonGroup: 按钮组键盘导航
 * - 响应式和偏好管理Hooks
 * 
 * ### 工具函数 (utils/)
 * - 可访问性检查和增强工具
 * - 高性能样式缓存系统
 * - 实时性能监控和分析
 * - 通用工具函数集合
 * 
 * ## 🚀 使用方式
 * 
 * ### 创建主题按钮组件
 * 
 * ```typescript
 * import { createThemedButton, useTheme } from '@/core';
 * 
 * const MyThemeButton = createThemedButton({
 *   themeId: 'my-theme',
 *   computeStyles: (props, state) => {
 *     const { tokens } = useTheme();
 *     return {
 *       backgroundColor: tokens.colors.primary[500],
 *       // ... 更多样式
 *     };
 *   },
 * });
 * ```
 * 
 * ### 使用核心Hooks
 * 
 * ```typescript
 * import { useButton, useTheme } from '@/core';
 * 
 * function CustomButton(props) {
 *   const { buttonProps, state } = useButton(props);
 *   const { tokens } = useTheme();
 *   
 *   // 自定义逻辑...
 * }
 * ```
 * 
 * ### 扩展工具函数
 * 
 * ```typescript
 * import { 
 *   defaultStyleCache, 
 *   AccessibilityChecker,
 *   getPerformanceMonitor 
 * } from '@/core';
 * 
 * // 使用样式缓存
 * const cachedStyle = defaultStyleCache.get('my-style-key');
 * 
 * // 可访问性检查
 * const auditResult = AccessibilityChecker.auditContainer(containerElement);
 * 
 * // 性能监控
 * const monitor = getPerformanceMonitor();
 * ```
 * 
 * ## 📈 性能特性
 * 
 * - **样式缓存**: 自动缓存计算结果，避免重复计算
 * - **防抖优化**: 内置防抖机制，防止频繁触发
 * - **懒加载**: 按需加载主题和组件资源
 * - **内存管理**: 自动清理和垃圾回收
 * - **监控分析**: 实时性能指标和优化建议
 * 
 * ## ♿ 可访问性特性
 * 
 * - **WCAG 2.1 AA**: 符合最新可访问性标准
 * - **屏幕阅读器**: 完整的ARIA支持和语音提示
 * - **键盘导航**: 全键盘操作支持
 * - **高对比度**: 系统高对比度模式支持
 * - **减少动画**: 尊重用户的动画偏好
 * - **自动检查**: 开发时自动可访问性检查
 * 
 * ## 🛠️ 开发工具
 * 
 * - **TypeScript**: 完整的类型提示和检查
 * - **性能监控**: 开发环境下的实时性能分析
 * - **调试工具**: 组件状态和主题信息展示
 * - **验证工具**: 属性和配置的自动验证
 * - **测试支持**: 提供测试工具和模拟对象
 * 
 * ## 🔄 扩展指南
 * 
 * 1. **新增组件类型**: 扩展BaseButton或创建新的基础组件
 * 2. **自定义主题**: 实现ThemeDefinition接口
 * 3. **新增工具**: 遵循现有工具函数的设计模式
 * 4. **性能优化**: 使用提供的缓存和监控工具
 * 5. **可访问性**: 利用accessibility工具确保标准合规
 */