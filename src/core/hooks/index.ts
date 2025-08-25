/**
 * 核心Hooks统一导出
 * 
 * 提供组件库核心Hooks的统一入口
 * 包括按钮逻辑、主题管理、样式计算等功能
 * 
 * @version 1.0.0
 * @author YggJS Team
 */

// 按钮相关Hooks导出
export {
  useButton,
  useButtonGroup,
} from './useButton';

// 主题相关Hooks导出
export {
  ThemeContext,
  useTheme,
  useThemeTokens,
  useThemeUtils,
  useThemeValue,
  useResponsiveValue,
  useColorScheme,
  useThemeTransition,
  useMediaQuery,
  useThemePreference,
} from './useTheme';

/**
 * Hooks使用指南
 * 
 * ## 按钮Hooks
 * 
 * ### useButton
 * 用于实现按钮的核心逻辑和交互行为：
 * ```typescript
 * const { buttonProps, state, actions } = useButton({
 *   disabled: false,
 *   loading: false,
 *   onClick: handleClick,
 *   preventDoubleClick: true,
 * });
 * ```
 * 
 * ### useButtonGroup
 * 用于管理按钮组的键盘导航和焦点管理：
 * ```typescript
 * const {
 *   registerButton,
 *   handleGroupKeyDown,
 *   activeIndex
 * } = useButtonGroup({
 *   orientation: 'horizontal',
 *   loop: true,
 * });
 * ```
 * 
 * ## 主题Hooks
 * 
 * ### useTheme
 * 访问完整的主题系统：
 * ```typescript
 * const { theme, tokens, utils, setTheme } = useTheme();
 * ```
 * 
 * ### useThemeTokens
 * 仅访问设计令牌（轻量级）：
 * ```typescript
 * const tokens = useThemeTokens();
 * const primaryColor = tokens.colors.primary[500];
 * ```
 * 
 * ### useThemeValue
 * 获取主题中的特定值：
 * ```typescript
 * const primaryColor = useThemeValue('colors.primary.500', '#007bff');
 * ```
 * 
 * ### useResponsiveValue
 * 响应式值管理：
 * ```typescript
 * const fontSize = useResponsiveValue({
 *   mobile: '14px',
 *   tablet: '16px',
 *   desktop: '18px',
 *   default: '16px',
 * });
 * ```
 * 
 * ### useColorScheme
 * 颜色方案管理：
 * ```typescript
 * const { colorScheme, setColorScheme } = useColorScheme();
 * ```
 * 
 * ### useMediaQuery
 * 媒体查询监听：
 * ```typescript
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * ```
 * 
 * ## 最佳实践
 * 
 * 1. **组合使用**: 在组件中组合多个Hooks来实现复杂功能
 * 2. **性能优化**: 使用轻量级的专门Hooks（如useThemeTokens）避免不必要的重渲染
 * 3. **缓存策略**: Hooks内部已实现缓存，无需额外的useMemo
 * 4. **错误处理**: 主题相关Hooks会自动处理错误和降级
 * 5. **可访问性**: 按钮Hooks自动包含可访问性支持
 * 
 * ## 示例：创建一个完整的主题按钮
 * 
 * ```typescript
 * function MyButton(props: BaseButtonProps) {
 *   const { tokens } = useThemeTokens();
 *   const { buttonProps, state } = useButton(props);
 * 
 *   const styles = useMemo(() => ({
 *     backgroundColor: state.isPressed 
 *       ? tokens.colors.primary[700]
 *       : tokens.colors.primary[500],
 *     color: tokens.colors.semantic.text.primary,
 *     padding: tokens.spacing[2],
 *     borderRadius: tokens.borderRadius.md,
 *     transition: tokens.animation.transition.all,
 *   }), [tokens, state]);
 * 
 *   return (
 *     <button {...buttonProps} style={styles}>
 *       {props.children}
 *     </button>
 *   );
 * }
 * ```
 */