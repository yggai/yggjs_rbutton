/**
 * 集成示例组件
 * 
 * 展示YggJS多主题按钮系统与各种前端框架和工具的集成方案
 * 包括表单集成、状态管理、路由系统、测试工具等实际应用场景
 * 
 * @version 1.0.0
 * @author YggJS Team
 */
import React, { useState, useCallback, useMemo } from 'react';
import { css } from '@emotion/react';

// 导入按钮组件
import { TechButton, MinimalButton } from 'yggjs_rbutton';

/**
 * 组件属性接口
 */
interface IntegrationExamplesProps {
  theme: {
    mode: 'light' | 'dark';
    colors: Record<string, string>;
    typography: Record<string, any>;
    spacing: Record<string, string>;
    borderRadius: Record<string, string>;
    shadows: Record<string, string>;
    animations: Record<string, any>;
    breakpoints: Record<string, string>;
  };
}

/**
 * 表单数据接口
 */
interface FormData {
  name: string;
  email: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  notifications: boolean;
}

/**
 * 模拟API响应接口
 */
interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  timestamp: number;
}

/**
 * 演示容器组件
 */
interface DemoSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  theme: IntegrationExamplesProps['theme'];
  codeExample?: string;
}

const DemoSection: React.FC<DemoSectionProps> = React.memo(({ 
  title, 
  description, 
  children, 
  theme,
  codeExample 
}) => {
  const [showCode, setShowCode] = useState(false);

  const sectionStyles = useMemo(() => css`
    margin-bottom: ${theme.spacing['2xl']};
    padding: ${theme.spacing['2xl']};
    background-color: ${theme.colors.surface};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.borderRadius.lg};
    box-shadow: ${theme.shadows.sm};
    
    .section-header {
      margin-bottom: ${theme.spacing.xl};
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: ${theme.spacing.md};
      
      .header-content {
        flex: 1;
        min-width: 250px;
        
        .section-title {
          margin: 0 0 ${theme.spacing.sm} 0;
          font-size: ${theme.typography.fontSize.xl};
          font-weight: ${theme.typography.fontWeight.semibold};
          color: ${theme.colors.text};
          display: flex;
          align-items: center;
          gap: ${theme.spacing.sm};
          
          .integration-badge {
            display: inline-flex;
            align-items: center;
            padding: ${theme.spacing.xs} ${theme.spacing.sm};
            background-color: ${theme.colors.primary}15;
            color: ${theme.colors.primary};
            border-radius: ${theme.borderRadius.full};
            font-size: ${theme.typography.fontSize.xs};
            font-weight: ${theme.typography.fontWeight.medium};
            text-transform: uppercase;
            letter-spacing: 0.025em;
          }
        }
        
        .section-description {
          margin: 0;
          font-size: ${theme.typography.fontSize.sm};
          color: ${theme.colors.textSecondary};
          line-height: ${theme.typography.lineHeight.relaxed};
        }
      }
      
      ${codeExample && css`
        .code-toggle {
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          border: 1px solid ${theme.colors.border};
          border-radius: ${theme.borderRadius.md};
          background-color: ${theme.colors.background};
          color: ${theme.colors.text};
          cursor: pointer;
          transition: all ${theme.animations.duration.fast} ${theme.animations.easing.easeOut};
          font-size: ${theme.typography.fontSize.sm};
          
          &:hover {
            border-color: ${theme.colors.primary};
            background-color: ${theme.colors.primary}10;
          }
        }
      `}
    }
    
    .section-content {
      display: flex;
      flex-direction: column;
      gap: ${theme.spacing.lg};
    }
    
    ${showCode && codeExample && css`
      .code-example {
        margin-top: ${theme.spacing.lg};
        padding: ${theme.spacing.lg};
        background-color: ${theme.colors.background};
        border: 1px solid ${theme.colors.border};
        border-radius: ${theme.borderRadius.md};
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        font-size: ${theme.typography.fontSize.sm};
        color: ${theme.colors.text};
        overflow-x: auto;
        
        pre {
          margin: 0;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        
        .code-comment {
          color: ${theme.colors.textSecondary};
          font-style: italic;
        }
        
        .code-keyword {
          color: ${theme.colors.primary};
          font-weight: ${theme.typography.fontWeight.semibold};
        }
        
        .code-string {
          color: ${theme.colors.success};
        }
      }
    `}
  `, [theme, showCode, codeExample]);

  return (
    <section css={sectionStyles}>
      <div className="section-header">
        <div className="header-content">
          <h2 className="section-title">
            {title}
            <span className="integration-badge">集成</span>
          </h2>
          <p className="section-description">{description}</p>
        </div>
        {codeExample && (
          <button 
            className="code-toggle"
            onClick={() => setShowCode(!showCode)}
          >
            {showCode ? '隐藏代码' : '查看代码'}
          </button>
        )}
      </div>
      <div className="section-content">
        {children}
      </div>
      {showCode && codeExample && (
        <div className="code-example">
          <pre dangerouslySetInnerHTML={{ __html: codeExample }} />
        </div>
      )}
    </section>
  );
});

DemoSection.displayName = 'DemoSection';

/**
 * React Hook Form 集成示例
 */
const ReactHookFormDemo: React.FC<{ theme: IntegrationExamplesProps['theme'] }> = React.memo(({ theme }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    priority: 'medium',
    notifications: false,
  });
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<ApiResponse | null>(null);

  // 模拟表单验证
  const validateForm = useCallback((data: FormData): Partial<FormData> => {
    const errors: Partial<FormData> = {};

    if (!data.name.trim()) {
      errors.name = '姓名不能为空';
    } else if (data.name.length < 2) {
      errors.name = '姓名至少需要2个字符';
    }

    if (!data.email.trim()) {
      errors.email = '邮箱不能为空';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = '邮箱格式不正确';
    }

    if (!data.message.trim()) {
      errors.message = '消息内容不能为空';
    } else if (data.message.length < 10) {
      errors.message = '消息内容至少需要10个字符';
    }

    return errors;
  }, []);

  // 模拟表单提交
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const response: ApiResponse = {
        success: Math.random() > 0.2, // 80% 成功率
        message: Math.random() > 0.2 ? '表单提交成功！' : '服务器错误，请稍后重试',
        data: formData,
        timestamp: Date.now(),
      };

      setSubmitResult(response);

      if (response.success) {
        // 成功后重置表单
        setFormData({
          name: '',
          email: '',
          message: '',
          priority: 'medium',
          notifications: false,
        });
        setFormErrors({});
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm]);

  const handleInputChange = useCallback((field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // 清除对应字段的错误
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [formErrors]);

  const formStyles = useMemo(() => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${theme.spacing.xl};
    
    @media (max-width: ${theme.breakpoints.md}) {
      grid-template-columns: 1fr;
    }
    
    .form-section {
      padding: ${theme.spacing.xl};
      background-color: ${theme.colors.background};
      border-radius: ${theme.borderRadius.lg};
      border: 1px solid ${theme.colors.border};
      
      .form-title {
        font-size: ${theme.typography.fontSize.lg};
        font-weight: ${theme.typography.fontWeight.semibold};
        color: ${theme.colors.text};
        margin: 0 0 ${theme.spacing.lg} 0;
      }
      
      .form-group {
        margin-bottom: ${theme.spacing.lg};
        
        .form-label {
          display: block;
          font-size: ${theme.typography.fontSize.sm};
          font-weight: ${theme.typography.fontWeight.medium};
          color: ${theme.colors.text};
          margin-bottom: ${theme.spacing.sm};
          
          .required {
            color: ${theme.colors.danger};
            margin-left: ${theme.spacing.xs};
          }
        }
        
        .form-input {
          width: 100%;
          padding: ${theme.spacing.md};
          border: 1px solid ${theme.colors.border};
          border-radius: ${theme.borderRadius.md};
          background-color: ${theme.colors.surface};
          color: ${theme.colors.text};
          font-size: ${theme.typography.fontSize.md};
          transition: all ${theme.animations.duration.fast} ${theme.animations.easing.easeOut};
          
          &:focus {
            outline: none;
            border-color: ${theme.colors.primary};
            box-shadow: 0 0 0 2px ${theme.colors.primary}20;
          }
          
          &.error {
            border-color: ${theme.colors.danger};
            
            &:focus {
              border-color: ${theme.colors.danger};
              box-shadow: 0 0 0 2px ${theme.colors.danger}20;
            }
          }
        }
        
        .form-textarea {
          min-height: 120px;
          resize: vertical;
        }
        
        .form-select {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 16px;
          padding-right: 40px;
        }
        
        .checkbox-wrapper {
          display: flex;
          align-items: center;
          gap: ${theme.spacing.sm};
          
          .form-checkbox {
            width: 18px;
            height: 18px;
            accent-color: ${theme.colors.primary};
          }
        }
        
        .form-error {
          margin-top: ${theme.spacing.sm};
          font-size: ${theme.typography.fontSize.sm};
          color: ${theme.colors.danger};
          display: flex;
          align-items: center;
          gap: ${theme.spacing.xs};
        }
      }
      
      .form-actions {
        display: flex;
        gap: ${theme.spacing.md};
        margin-top: ${theme.spacing.xl};
        
        .form-button {
          flex: 1;
        }
      }
    }
    
    .result-section {
      padding: ${theme.spacing.xl};
      background-color: ${theme.colors.background};
      border-radius: ${theme.borderRadius.lg};
      border: 1px solid ${theme.colors.border};
      
      .result-title {
        font-size: ${theme.typography.fontSize.lg};
        font-weight: ${theme.typography.fontWeight.semibold};
        color: ${theme.colors.text};
        margin: 0 0 ${theme.spacing.lg} 0;
      }
      
      .form-preview {
        padding: ${theme.spacing.lg};
        background-color: ${theme.colors.surface};
        border-radius: ${theme.borderRadius.md};
        border: 1px solid ${theme.colors.border};
        margin-bottom: ${theme.spacing.lg};
        
        .preview-title {
          font-size: ${theme.typography.fontSize.md};
          font-weight: ${theme.typography.fontWeight.semibold};
          color: ${theme.colors.text};
          margin: 0 0 ${theme.spacing.md} 0;
        }
        
        .preview-data {
          display: flex;
          flex-direction: column;
          gap: ${theme.spacing.sm};
          
          .data-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: ${theme.spacing.sm} 0;
            border-bottom: 1px solid ${theme.colors.border};
            
            &:last-child {
              border-bottom: none;
            }
            
            .data-label {
              font-size: ${theme.typography.fontSize.sm};
              color: ${theme.colors.textSecondary};
              font-weight: ${theme.typography.fontWeight.medium};
            }
            
            .data-value {
              font-size: ${theme.typography.fontSize.sm};
              color: ${theme.colors.text};
              text-align: right;
              max-width: 200px;
              word-break: break-word;
            }
          }
        }
      }
      
      ${submitResult && css`
        .submit-result {
          padding: ${theme.spacing.lg};
          border-radius: ${theme.borderRadius.md};
          border: 1px solid;
          margin-bottom: ${theme.spacing.lg};
          
          ${submitResult.success ? css`
            background-color: ${theme.colors.success}10;
            border-color: ${theme.colors.success}30;
            color: ${theme.colors.success};
          ` : css`
            background-color: ${theme.colors.danger}10;
            border-color: ${theme.colors.danger}30;
            color: ${theme.colors.danger};
          `}
          
          .result-message {
            font-size: ${theme.typography.fontSize.md};
            font-weight: ${theme.typography.fontWeight.medium};
            margin: 0 0 ${theme.spacing.sm} 0;
          }
          
          .result-timestamp {
            font-size: ${theme.typography.fontSize.sm};
            opacity: 0.8;
            margin: 0;
          }
        }
      `}
    }
  `, [theme, submitResult]);

  const codeExample = `<span class="code-comment">// React Hook Form 与 YggJS 按钮集成示例</span>
<span class="code-keyword">import</span> { useForm } <span class="code-keyword">from</span> <span class="code-string">'react-hook-form'</span>;
<span class="code-keyword">import</span> { TechButton } <span class="code-keyword">from</span> <span class="code-string">'yggjs_rbutton'</span>;

<span class="code-keyword">const</span> MyForm = () => {
  <span class="code-keyword">const</span> { register, handleSubmit, formState: { isSubmitting } } = useForm();

  <span class="code-keyword">return</span> (
    &lt;form onSubmit={handleSubmit(onSubmit)}&gt;
      &lt;input {...register(<span class="code-string">'name'</span>, { required: <span class="code-keyword">true</span> })} /&gt;
      
      &lt;TechButton 
        type=<span class="code-string">"submit"</span>
        variant=<span class="code-string">"primary"</span>
        loading={isSubmitting}
        disabled={isSubmitting}
      &gt;
        {isSubmitting ? <span class="code-string">'提交中...'</span> : <span class="code-string">'提交表单'</span>}
      &lt;/TechButton&gt;
    &lt;/form&gt;
  );
};`;

  return (
    <DemoSection
      title="React Hook Form 集成"
      description="展示如何将YggJS按钮与React Hook Form结合使用，实现高效的表单处理"
      theme={theme}
      codeExample={codeExample}
    >
      <div css={formStyles}>
        <div className="form-section">
          <h3 className="form-title">联系表单</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">
                姓名
                <span className="required">*</span>
              </label>
              <input
                type="text"
                className={`form-input ${formErrors.name ? 'error' : ''}`}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="请输入您的姓名"
              />
              {formErrors.name && (
                <div className="form-error">
                  ⚠️ {formErrors.name}
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                邮箱
                <span className="required">*</span>
              </label>
              <input
                type="email"
                className={`form-input ${formErrors.email ? 'error' : ''}`}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="请输入您的邮箱"
              />
              {formErrors.email && (
                <div className="form-error">
                  ⚠️ {formErrors.email}
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">优先级</label>
              <select
                className="form-input form-select"
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value as FormData['priority'])}
              >
                <option value="low">低优先级</option>
                <option value="medium">中优先级</option>
                <option value="high">高优先级</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                消息内容
                <span className="required">*</span>
              </label>
              <textarea
                className={`form-input form-textarea ${formErrors.message ? 'error' : ''}`}
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="请输入您的消息内容..."
              />
              {formErrors.message && (
                <div className="form-error">
                  ⚠️ {formErrors.message}
                </div>
              )}
            </div>

            <div className="form-group">
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={formData.notifications}
                  onChange={(e) => handleInputChange('notifications', e.target.checked)}
                  id="notifications"
                />
                <label htmlFor="notifications" className="form-label" style={{ margin: 0 }}>
                  接收邮件通知
                </label>
              </div>
            </div>

            <div className="form-actions">
              <TechButton
                type="button"
                variant="secondary"
                onClick={() => {
                  setFormData({
                    name: '',
                    email: '',
                    message: '',
                    priority: 'medium',
                    notifications: false,
                  });
                  setFormErrors({});
                  setSubmitResult(null);
                }}
                className="form-button"
              >
                重置表单
              </TechButton>
              <TechButton
                type="submit"
                variant="primary"
                loading={isSubmitting}
                disabled={isSubmitting}
                className="form-button"
              >
                {isSubmitting ? '提交中...' : '提交表单'}
              </TechButton>
            </div>
          </form>
        </div>

        <div className="result-section">
          <h3 className="result-title">实时预览</h3>
          
          <div className="form-preview">
            <h4 className="preview-title">当前表单数据</h4>
            <div className="preview-data">
              <div className="data-item">
                <span className="data-label">姓名：</span>
                <span className="data-value">{formData.name || '未填写'}</span>
              </div>
              <div className="data-item">
                <span className="data-label">邮箱：</span>
                <span className="data-value">{formData.email || '未填写'}</span>
              </div>
              <div className="data-item">
                <span className="data-label">优先级：</span>
                <span className="data-value">
                  {formData.priority === 'low' ? '低优先级' : 
                   formData.priority === 'medium' ? '中优先级' : '高优先级'}
                </span>
              </div>
              <div className="data-item">
                <span className="data-label">消息长度：</span>
                <span className="data-value">{formData.message.length} 字符</span>
              </div>
              <div className="data-item">
                <span className="data-label">邮件通知：</span>
                <span className="data-value">{formData.notifications ? '已启用' : '已禁用'}</span>
              </div>
            </div>
          </div>

          {submitResult && (
            <div className="submit-result">
              <p className="result-message">
                {submitResult.success ? '✅' : '❌'} {submitResult.message}
              </p>
              <p className="result-timestamp">
                时间：{new Date(submitResult.timestamp).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoSection>
  );
});

ReactHookFormDemo.displayName = 'ReactHookFormDemo';

/**
 * 状态管理集成示例（模拟Redux/Zustand）
 */
const StateManagementDemo: React.FC<{ theme: IntegrationExamplesProps['theme'] }> = React.memo(({ theme }) => {
  // 模拟全局状态
  const [globalState, setGlobalState] = useState({
    user: {
      name: '张三',
      role: 'admin',
      preferences: {
        theme: 'tech',
        notifications: true,
      }
    },
    cart: {
      items: [],
      total: 0,
    },
    loading: {
      userProfile: false,
      cartUpdate: false,
      checkout: false,
    }
  });

  const [actionHistory, setActionHistory] = useState<Array<{
    type: string;
    payload: any;
    timestamp: number;
  }>>([]);

  // 模拟Action Creators
  const dispatch = useCallback((action: { type: string; payload?: any }) => {
    const newAction = {
      ...action,
      timestamp: Date.now(),
    };

    setActionHistory(prev => [...prev.slice(-9), newAction]);

    switch (action.type) {
      case 'SET_LOADING':
        setGlobalState(prev => ({
          ...prev,
          loading: { ...prev.loading, [action.payload.key]: action.payload.value }
        }));
        break;
        
      case 'UPDATE_USER_PREFERENCE':
        setGlobalState(prev => ({
          ...prev,
          user: {
            ...prev.user,
            preferences: { ...prev.user.preferences, [action.payload.key]: action.payload.value }
          }
        }));
        break;
        
      case 'ADD_TO_CART':
        setGlobalState(prev => ({
          ...prev,
          cart: {
            items: [...prev.cart.items, action.payload],
            total: prev.cart.total + action.payload.price
          }
        }));
        break;
        
      case 'CLEAR_CART':
        setGlobalState(prev => ({
          ...prev,
          cart: { items: [], total: 0 }
        }));
        break;
        
      default:
        break;
    }
  }, []);

  const stateStyles = useMemo(() => css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: ${theme.spacing.xl};
    
    @media (max-width: ${theme.breakpoints.lg}) {
      grid-template-columns: 1fr;
    }
    
    .state-panel {
      padding: ${theme.spacing.xl};
      background-color: ${theme.colors.background};
      border-radius: ${theme.borderRadius.lg};
      border: 1px solid ${theme.colors.border};
      
      .panel-title {
        font-size: ${theme.typography.fontSize.lg};
        font-weight: ${theme.typography.fontWeight.semibold};
        color: ${theme.colors.text};
        margin: 0 0 ${theme.spacing.lg} 0;
      }
      
      .state-display {
        margin-bottom: ${theme.spacing.lg};
        
        .state-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: ${theme.spacing.sm};
          background-color: ${theme.colors.surface};
          border-radius: ${theme.borderRadius.sm};
          margin-bottom: ${theme.spacing.sm};
          
          .state-key {
            font-size: ${theme.typography.fontSize.sm};
            color: ${theme.colors.textSecondary};
            font-family: monospace;
          }
          
          .state-value {
            font-size: ${theme.typography.fontSize.sm};
            color: ${theme.colors.text};
            font-weight: ${theme.typography.fontWeight.medium};
          }
        }
      }
      
      .action-buttons {
        display: flex;
        flex-direction: column;
        gap: ${theme.spacing.sm};
        
        .action-button {
          width: 100%;
        }
      }
    }
    
    .history-panel {
      .action-list {
        max-height: 300px;
        overflow-y: auto;
        
        .action-item {
          padding: ${theme.spacing.md};
          background-color: ${theme.colors.surface};
          border-radius: ${theme.borderRadius.sm};
          margin-bottom: ${theme.spacing.sm};
          border-left: 3px solid ${theme.colors.primary};
          
          .action-type {
            font-size: ${theme.typography.fontSize.sm};
            font-weight: ${theme.typography.fontWeight.semibold};
            color: ${theme.colors.primary};
            font-family: monospace;
          }
          
          .action-payload {
            font-size: ${theme.typography.fontSize.xs};
            color: ${theme.colors.textSecondary};
            margin: ${theme.spacing.xs} 0;
            font-family: monospace;
            background-color: ${theme.colors.background};
            padding: ${theme.spacing.xs};
            border-radius: ${theme.borderRadius.xs};
          }
          
          .action-time {
            font-size: ${theme.typography.fontSize.xs};
            color: ${theme.colors.textSecondary};
          }
        }
      }
    }
  `, [theme]);

  const handleAsyncAction = useCallback(async (actionType: string) => {
    const loadingKey = actionType.toLowerCase().replace('_', '');
    
    dispatch({ type: 'SET_LOADING', payload: { key: loadingKey, value: true } });
    
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    switch (actionType) {
      case 'FETCH_USER_PROFILE':
        dispatch({ type: 'UPDATE_USER_PREFERENCE', payload: { key: 'theme', value: 'minimal' } });
        break;
      case 'UPDATE_CART':
        dispatch({ 
          type: 'ADD_TO_CART', 
          payload: { 
            id: Date.now(), 
            name: '商品' + Math.floor(Math.random() * 100), 
            price: Math.floor(Math.random() * 100) + 10 
          } 
        });
        break;
      case 'CHECKOUT':
        dispatch({ type: 'CLEAR_CART' });
        break;
    }
    
    dispatch({ type: 'SET_LOADING', payload: { key: loadingKey, value: false } });
  }, [dispatch]);

  const codeExample = `<span class="code-comment">// 状态管理与 YggJS 按钮集成示例</span>
<span class="code-keyword">import</span> { useSelector, useDispatch } <span class="code-keyword">from</span> <span class="code-string">'react-redux'</span>;
<span class="code-keyword">import</span> { TechButton } <span class="code-keyword">from</span> <span class="code-string">'yggjs_rbutton'</span>;

<span class="code-keyword">const</span> CartButton = () => {
  <span class="code-keyword">const</span> dispatch = useDispatch();
  <span class="code-keyword">const</span> { items, loading } = useSelector(state => state.cart);

  <span class="code-keyword">const</span> handleAddToCart = <span class="code-keyword">async</span> () => {
    <span class="code-keyword">await</span> dispatch(addToCart(productId));
  };

  <span class="code-keyword">return</span> (
    &lt;TechButton
      variant=<span class="code-string">"primary"</span>
      loading={loading}
      onClick={handleAddToCart}
      disabled={loading}
    &gt;
      添加到购物车 ({items.length})
    &lt;/TechButton&gt;
  );
};`;

  return (
    <DemoSection
      title="状态管理集成"
      description="展示如何将YggJS按钮与Redux、Zustand等状态管理库集成使用"
      theme={theme}
      codeExample={codeExample}
    >
      <div css={stateStyles}>
        <div className="state-panel">
          <h3 className="panel-title">用户状态</h3>
          <div className="state-display">
            <div className="state-item">
              <span className="state-key">user.name</span>
              <span className="state-value">{globalState.user.name}</span>
            </div>
            <div className="state-item">
              <span className="state-key">user.role</span>
              <span className="state-value">{globalState.user.role}</span>
            </div>
            <div className="state-item">
              <span className="state-key">theme</span>
              <span className="state-value">{globalState.user.preferences.theme}</span>
            </div>
            <div className="state-item">
              <span className="state-key">notifications</span>
              <span className="state-value">{globalState.user.preferences.notifications ? 'on' : 'off'}</span>
            </div>
          </div>
          <div className="action-buttons">
            <TechButton
              variant="primary"
              size="small"
              loading={globalState.loading.userProfile}
              onClick={() => handleAsyncAction('FETCH_USER_PROFILE')}
              className="action-button"
            >
              {globalState.loading.userProfile ? '更新中...' : '更新用户偏好'}
            </TechButton>
            <TechButton
              variant="secondary"
              size="small"
              onClick={() => dispatch({
                type: 'UPDATE_USER_PREFERENCE',
                payload: { key: 'notifications', value: !globalState.user.preferences.notifications }
              })}
              className="action-button"
              fill="outline"
            >
              切换通知状态
            </TechButton>
          </div>
        </div>

        <div className="state-panel">
          <h3 className="panel-title">购物车状态</h3>
          <div className="state-display">
            <div className="state-item">
              <span className="state-key">items.length</span>
              <span className="state-value">{globalState.cart.items.length}</span>
            </div>
            <div className="state-item">
              <span className="state-key">total</span>
              <span className="state-value">¥{globalState.cart.total}</span>
            </div>
            <div className="state-item">
              <span className="state-key">loading</span>
              <span className="state-value">{globalState.loading.cartUpdate ? 'true' : 'false'}</span>
            </div>
          </div>
          <div className="action-buttons">
            <TechButton
              variant="success"
              size="small"
              loading={globalState.loading.cartUpdate}
              onClick={() => handleAsyncAction('UPDATE_CART')}
              className="action-button"
            >
              {globalState.loading.cartUpdate ? '添加中...' : '添加商品'}
            </TechButton>
            <TechButton
              variant="warning"
              size="small"
              loading={globalState.loading.checkout}
              onClick={() => handleAsyncAction('CHECKOUT')}
              disabled={globalState.cart.items.length === 0}
              className="action-button"
            >
              {globalState.loading.checkout ? '结账中...' : '立即结账'}
            </TechButton>
            <MinimalButton
              variant="danger"
              size="small"
              onClick={() => dispatch({ type: 'CLEAR_CART' })}
              disabled={globalState.cart.items.length === 0}
              className="action-button"
            >
              清空购物车
            </MinimalButton>
          </div>
        </div>

        <div className="state-panel history-panel">
          <h3 className="panel-title">Action历史</h3>
          <div className="action-list">
            {actionHistory.length === 0 && (
              <div style={{ 
                textAlign: 'center', 
                color: theme.colors.textSecondary, 
                fontStyle: 'italic',
                padding: theme.spacing.lg 
              }}>
                暂无操作记录
              </div>
            )}
            {actionHistory.map((action, index) => (
              <div key={`action-${index}`} className="action-item">
                <div className="action-type">{action.type}</div>
                {action.payload && (
                  <div className="action-payload">
                    {JSON.stringify(action.payload, null, 2)}
                  </div>
                )}
                <div className="action-time">
                  {new Date(action.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DemoSection>
  );
});

StateManagementDemo.displayName = 'StateManagementDemo';

/**
 * 路由集成示例（模拟React Router）
 */
const RouterIntegrationDemo: React.FC<{ theme: IntegrationExamplesProps['theme'] }> = React.memo(({ theme }) => {
  const [currentRoute, setCurrentRoute] = useState('/dashboard');
  const [navigationHistory, setNavigationHistory] = useState<string[]>(['/dashboard']);
  const [isNavigating, setIsNavigating] = useState(false);

  // 模拟路由配置
  const routes = [
    { path: '/dashboard', name: '仪表板', icon: '📊', component: 'DashboardComponent' },
    { path: '/products', name: '产品管理', icon: '📦', component: 'ProductsComponent' },
    { path: '/orders', name: '订单中心', icon: '📋', component: 'OrdersComponent' },
    { path: '/customers', name: '客户管理', icon: '👥', component: 'CustomersComponent' },
    { path: '/settings', name: '系统设置', icon: '⚙️', component: 'SettingsComponent' },
    { path: '/profile', name: '个人资料', icon: '👤', component: 'ProfileComponent' },
  ];

  // 模拟异步路由导航
  const navigateTo = useCallback(async (path: string) => {
    if (currentRoute === path) return;

    setIsNavigating(true);
    
    // 模拟路由切换延迟
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setCurrentRoute(path);
    setNavigationHistory(prev => {
      const newHistory = [...prev, path];
      return newHistory.slice(-10); // 保留最近10条记录
    });
    setIsNavigating(false);
  }, [currentRoute]);

  // 模拟浏览器后退
  const goBack = useCallback(() => {
    if (navigationHistory.length > 1) {
      const previousRoute = navigationHistory[navigationHistory.length - 2];
      const newHistory = navigationHistory.slice(0, -1);
      setCurrentRoute(previousRoute);
      setNavigationHistory(newHistory);
    }
  }, [navigationHistory]);

  const routerStyles = useMemo(() => css`
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: ${theme.spacing.xl};
    min-height: 400px;
    
    @media (max-width: ${theme.breakpoints.md}) {
      grid-template-columns: 1fr;
    }
    
    .navigation-sidebar {
      padding: ${theme.spacing.xl};
      background-color: ${theme.colors.background};
      border-radius: ${theme.borderRadius.lg};
      border: 1px solid ${theme.colors.border};
      
      .nav-title {
        font-size: ${theme.typography.fontSize.lg};
        font-weight: ${theme.typography.fontWeight.semibold};
        color: ${theme.colors.text};
        margin: 0 0 ${theme.spacing.lg} 0;
      }
      
      .nav-menu {
        display: flex;
        flex-direction: column;
        gap: ${theme.spacing.sm};
        
        .nav-item {
          display: flex;
          align-items: center;
          gap: ${theme.spacing.sm};
          padding: ${theme.spacing.md};
          border-radius: ${theme.borderRadius.md};
          border: 1px solid transparent;
          background-color: transparent;
          color: ${theme.colors.textSecondary};
          cursor: pointer;
          transition: all ${theme.animations.duration.fast} ${theme.animations.easing.easeOut};
          text-align: left;
          width: 100%;
          
          &:hover {
            background-color: ${theme.colors.surface};
            color: ${theme.colors.text};
          }
          
          &.active {
            background-color: ${theme.colors.primary}15;
            border-color: ${theme.colors.primary}30;
            color: ${theme.colors.primary};
          }
          
          .nav-icon {
            font-size: ${theme.typography.fontSize.lg};
            width: 24px;
            text-align: center;
          }
          
          .nav-text {
            font-size: ${theme.typography.fontSize.sm};
            font-weight: ${theme.typography.fontWeight.medium};
          }
        }
      }
      
      .nav-actions {
        margin-top: ${theme.spacing.lg};
        padding-top: ${theme.spacing.lg};
        border-top: 1px solid ${theme.colors.border};
        
        .back-button {
          width: 100%;
        }
      }
    }
    
    .main-content {
      padding: ${theme.spacing.xl};
      background-color: ${theme.colors.background};
      border-radius: ${theme.borderRadius.lg};
      border: 1px solid ${theme.colors.border};
      position: relative;
      
      ${isNavigating && css`
        &::before {
          content: '';
          position: absolute;
          inset: 0;
          background-color: ${theme.colors.background}80;
          backdrop-filter: blur(2px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }
        
        &::after {
          content: '页面加载中...';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: ${theme.typography.fontSize.md};
          color: ${theme.colors.primary};
          z-index: 11;
        }
      `}
      
      .page-header {
        margin-bottom: ${theme.spacing.lg};
        
        .page-title {
          font-size: ${theme.typography.fontSize.xl};
          font-weight: ${theme.typography.fontWeight.bold};
          color: ${theme.colors.text};
          margin: 0 0 ${theme.spacing.sm} 0;
          display: flex;
          align-items: center;
          gap: ${theme.spacing.sm};
          
          .page-icon {
            font-size: ${theme.typography.fontSize.xl};
          }
        }
        
        .page-description {
          font-size: ${theme.typography.fontSize.sm};
          color: ${theme.colors.textSecondary};
          margin: 0;
        }
        
        .page-path {
          font-size: ${theme.typography.fontSize.sm};
          color: ${theme.colors.primary};
          font-family: monospace;
          background-color: ${theme.colors.primary}10;
          padding: ${theme.spacing.xs} ${theme.spacing.sm};
          border-radius: ${theme.borderRadius.sm};
          margin: ${theme.spacing.sm} 0 0 0;
        }
      }
      
      .page-content {
        padding: ${theme.spacing.lg};
        background-color: ${theme.colors.surface};
        border-radius: ${theme.borderRadius.md};
        border: 1px solid ${theme.colors.border};
        
        .content-placeholder {
          text-align: center;
          color: ${theme.colors.textSecondary};
          font-style: italic;
          padding: ${theme.spacing['2xl']};
        }
      }
      
      .navigation-history {
        margin-top: ${theme.spacing.lg};
        padding: ${theme.spacing.lg};
        background-color: ${theme.colors.surface};
        border-radius: ${theme.borderRadius.md};
        border: 1px solid ${theme.colors.border};
        
        .history-title {
          font-size: ${theme.typography.fontSize.md};
          font-weight: ${theme.typography.fontWeight.semibold};
          color: ${theme.colors.text};
          margin: 0 0 ${theme.spacing.md} 0;
        }
        
        .history-list {
          display: flex;
          flex-wrap: wrap;
          gap: ${theme.spacing.sm};
          
          .history-item {
            padding: ${theme.spacing.xs} ${theme.spacing.sm};
            background-color: ${theme.colors.background};
            border-radius: ${theme.borderRadius.sm};
            font-size: ${theme.typography.fontSize.sm};
            color: ${theme.colors.textSecondary};
            font-family: monospace;
            
            &.current {
              background-color: ${theme.colors.primary}15;
              color: ${theme.colors.primary};
              font-weight: ${theme.typography.fontWeight.semibold};
            }
          }
        }
      }
    }
  `, [theme, isNavigating]);

  const currentRouteData = routes.find(route => route.path === currentRoute);

  const codeExample = `<span class="code-comment">// React Router 与 YggJS 按钮集成示例</span>
<span class="code-keyword">import</span> { useNavigate, useLocation } <span class="code-keyword">from</span> <span class="code-string">'react-router-dom'</span>;
<span class="code-keyword">import</span> { TechButton } <span class="code-keyword">from</span> <span class="code-string">'yggjs_rbutton'</span>;

<span class="code-keyword">const</span> NavigationButton = ({ to, children }) => {
  <span class="code-keyword">const</span> navigate = useNavigate();
  <span class="code-keyword">const</span> location = useLocation();
  <span class="code-keyword">const</span> isActive = location.pathname === to;

  <span class="code-keyword">return</span> (
    &lt;TechButton
      variant={isActive ? <span class="code-string">'primary'</span> : <span class="code-string">'secondary'</span>}
      onClick={() => navigate(to)}
      disabled={isActive}
    &gt;
      {children}
    &lt;/TechButton&gt;
  );
};`;

  return (
    <DemoSection
      title="路由系统集成"
      description="展示如何将YggJS按钮与React Router等路由库结合实现导航功能"
      theme={theme}
      codeExample={codeExample}
    >
      <div css={routerStyles}>
        <div className="navigation-sidebar">
          <h3 className="nav-title">导航菜单</h3>
          <div className="nav-menu">
            {routes.map((route) => (
              <button
                key={route.path}
                className={`nav-item ${currentRoute === route.path ? 'active' : ''}`}
                onClick={() => navigateTo(route.path)}
                disabled={isNavigating}
              >
                <span className="nav-icon">{route.icon}</span>
                <span className="nav-text">{route.name}</span>
              </button>
            ))}
          </div>
          <div className="nav-actions">
            <MinimalButton
              variant="secondary"
              size="small"
              onClick={goBack}
              disabled={navigationHistory.length <= 1 || isNavigating}
              className="back-button"
            >
              ← 返回上一页
            </MinimalButton>
          </div>
        </div>

        <div className="main-content">
          {currentRouteData && (
            <div className="page-header">
              <h2 className="page-title">
                <span className="page-icon">{currentRouteData.icon}</span>
                {currentRouteData.name}
              </h2>
              <p className="page-description">
                这是{currentRouteData.name}页面的内容区域
              </p>
              <div className="page-path">{currentRouteData.path}</div>
            </div>
          )}
          
          <div className="page-content">
            <div className="content-placeholder">
              {isNavigating ? '页面正在加载...' : `${currentRouteData?.component} 组件内容将在这里显示`}
            </div>
          </div>

          <div className="navigation-history">
            <h4 className="history-title">导航历史</h4>
            <div className="history-list">
              {navigationHistory.map((path, index) => (
                <span
                  key={`history-${index}`}
                  className={`history-item ${path === currentRoute ? 'current' : ''}`}
                >
                  {path}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DemoSection>
  );
});

RouterIntegrationDemo.displayName = 'RouterIntegrationDemo';

/**
 * 集成示例主组件
 */
const IntegrationExamples: React.FC<IntegrationExamplesProps> = ({ theme }) => {
  return (
    <div>
      <ReactHookFormDemo theme={theme} />
      <StateManagementDemo theme={theme} />
      <RouterIntegrationDemo theme={theme} />
    </div>
  );
};

export default React.memo(IntegrationExamples);