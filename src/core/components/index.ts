/**
 * 核心组件统一导出
 * 
 * 提供组件库核心组件的统一入口
 * 包括基础组件、工厂函数、工具函数等
 * 
 * @version 1.0.0
 * @author 源滚滚AI编程
 */

// 基础按钮组件导出
export {
  BaseButton,
  defaultBaseButtonProps,
  createThemedButton,
  ButtonUtils,
} from './BaseButton';

export type {
  BaseButtonComponentProps,
} from './BaseButton';

/**
 * 组件开发指南
 * 
 * 1. 所有主题按钮都应该基于BaseButton构建
 * 2. 使用createThemedButton工厂函数快速创建主题按钮
 * 3. 实现computeStyles函数来定义主题特定的样式
 * 4. 可选实现renderLoadingIndicator和renderContent来自定义渲染
 * 5. 确保所有组件都通过ButtonUtils.validateProps验证
 * 
 * 示例：
 * ```typescript
 * const MyThemeButton = createThemedButton({
 *   themeId: 'my-theme',
 *   displayName: 'MyThemeButton',
 *   computeStyles: (props, state) => {
 *     // 返回主题特定的样式
 *     return {
 *       backgroundColor: props.variant === 'primary' ? '#007bff' : '#6c757d',
 *       color: '#ffffff',
 *       // ... 更多样式
 *     };
 *   },
 *   renderLoadingIndicator: (props) => {
 *     // 返回自定义的加载指示器
 *     return <MyCustomSpinner />;
 *   },
 * });
 * ```
 */