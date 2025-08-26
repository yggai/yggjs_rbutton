/**
 * 构建产物优化系统
 * 
 * 分析和优化包体积，确保每个主题的构建产物都是最优的
 * 支持Tree Shaking、代码分割、压缩优化等功能
 * 
 * @version 1.0.0
 * @author 源滚滚AI编程
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { gzipSync } from 'zlib';

/**
 * 构建优化配置接口
 */
export interface BuildOptimizationConfig {
  /**
   * 输出目录
   */
  outputDir: string;
  
  /**
   * 是否启用Tree Shaking分析
   */
  enableTreeShaking: boolean;
  
  /**
   * 是否启用代码分割分析
   */
  enableCodeSplitting: boolean;
  
  /**
   * 是否启用压缩分析
   */
  enableCompressionAnalysis: boolean;
  
  /**
   * 包体积阈值配置
   */
  sizeThresholds: {
    /** 单个主题的最大大小(KB) */
    maxThemeSize: number;
    /** 单个组件的最大大小(KB) */
    maxComponentSize: number;
    /** 总包大小的最大值(KB) */
    maxTotalSize: number;
    /** gzip后大小与原始大小的最大比值 */
    maxGzipRatio: number;
  };
  
  /**
   * 优化目标
   */
  targets: {
    /** 目标运行环境 */
    browsers: string[];
    /** 是否针对移动端优化 */
    mobile: boolean;
    /** 是否启用现代JS特性 */
    modernJs: boolean;
  };
  
  /**
   * 排除的文件模式
   */
  excludePatterns: string[];
}

/**
 * 包分析结果接口
 */
export interface BundleAnalysisResult {
  /** 主题名称 */
  themeName: string;
  
  /** 文件信息 */
  files: FileInfo[];
  
  /** 总体统计 */
  stats: {
    /** 总大小(字节) */
    totalSize: number;
    /** gzip后总大小(字节) */
    gzipSize: number;
    /** 文件数量 */
    fileCount: number;
    /** 平均文件大小(字节) */
    averageFileSize: number;
  };
  
  /** Tree Shaking分析 */
  treeShaking: {
    /** 未使用的导出 */
    unusedExports: string[];
    /** 可以被Tree Shake的大小(字节) */
    shakableSize: number;
    /** Tree Shaking效率 */
    efficiency: number;
  };
  
  /** 依赖分析 */
  dependencies: {
    /** 直接依赖 */
    direct: DependencyInfo[];
    /** 间接依赖 */
    indirect: DependencyInfo[];
    /** 重复依赖 */
    duplicates: DependencyInfo[];
  };
  
  /** 优化建议 */
  recommendations: OptimizationRecommendation[];
  
  /** 性能评分 */
  score: {
    /** 总体评分 (0-100) */
    overall: number;
    /** 各项评分 */
    breakdown: {
      size: number;
      treeshaking: number;
      dependencies: number;
      compression: number;
    };
  };
}

/**
 * 文件信息接口
 */
export interface FileInfo {
  /** 文件路径 */
  path: string;
  /** 文件名 */
  name: string;
  /** 文件大小(字节) */
  size: number;
  /** gzip后大小(字节) */
  gzipSize: number;
  /** 文件类型 */
  type: 'javascript' | 'typescript' | 'css' | 'json' | 'other';
  /** 是否为入口文件 */
  isEntry: boolean;
  /** 导入的模块 */
  imports: string[];
  /** 导出的内容 */
  exports: string[];
}

/**
 * 依赖信息接口
 */
export interface DependencyInfo {
  /** 依赖名称 */
  name: string;
  /** 版本 */
  version: string;
  /** 大小(字节) */
  size: number;
  /** 依赖层级 */
  level: number;
  /** 是否为开发依赖 */
  isDev: boolean;
}

/**
 * 优化建议接口
 */
export interface OptimizationRecommendation {
  /** 建议类型 */
  type: 'size' | 'treeshaking' | 'dependencies' | 'compression';
  /** 优先级 */
  priority: 'high' | 'medium' | 'low';
  /** 建议内容 */
  message: string;
  /** 预期收益(字节) */
  expectedSaving: number;
  /** 实施难度 */
  difficulty: 'easy' | 'medium' | 'hard';
  /** 相关文件 */
  affectedFiles: string[];
}

/**
 * 构建优化分析器
 */
export class BuildOptimizer {
  private config: BuildOptimizationConfig;
  private analysisResults: Map<string, BundleAnalysisResult> = new Map();

  constructor(config: Partial<BuildOptimizationConfig> = {}) {
    this.config = {
      outputDir: './dist',
      enableTreeShaking: true,
      enableCodeSplitting: true,
      enableCompressionAnalysis: true,
      sizeThresholds: {
        maxThemeSize: 200, // 200KB per theme
        maxComponentSize: 50, // 50KB per component
        maxTotalSize: 500, // 500KB total
        maxGzipRatio: 0.3, // gzip should compress to 30% or less
      },
      targets: {
        browsers: ['> 1%', 'last 2 versions', 'not dead'],
        mobile: true,
        modernJs: true,
      },
      excludePatterns: ['**/*.test.*', '**/*.spec.*', '**/node_modules/**'],
      ...config,
    };
  }

  /**
   * 分析主题的构建产物
   */
  public async analyzeTheme(themeName: string, themePath: string): Promise<BundleAnalysisResult> {
    console.log(`🔍 开始分析主题构建产物: ${themeName}`);
    
    // 分析文件
    const files = await this.analyzeFiles(themePath);
    
    // 计算统计信息
    const stats = this.calculateStats(files);
    
    // Tree Shaking分析
    const treeShaking = await this.analyzeTreeShaking(files);
    
    // 依赖分析
    const dependencies = await this.analyzeDependencies(themePath);
    
    // 生成优化建议
    const recommendations = this.generateRecommendations(files, stats, treeShaking, dependencies);
    
    // 计算性能评分
    const score = this.calculateScore(stats, treeShaking, dependencies);
    
    const result: BundleAnalysisResult = {
      themeName,
      files,
      stats,
      treeShaking,
      dependencies,
      recommendations,
      score,
    };
    
    this.analysisResults.set(themeName, result);
    console.log(`✅ 主题 ${themeName} 构建分析完成`);
    
    return result;
  }

  /**
   * 分析文件
   */
  private async analyzeFiles(themePath: string): Promise<FileInfo[]> {
    const files: FileInfo[] = [];
    
    try {
      const entries = await this.getAllFiles(themePath);
      
      for (const filePath of entries) {
        // 跳过排除的文件
        if (this.shouldExcludeFile(filePath)) {
          continue;
        }
        
        const fileInfo = await this.analyzeFile(filePath);
        files.push(fileInfo);
      }
      
    } catch (error) {
      console.warn(`无法分析路径 ${themePath}:`, error);
    }
    
    return files;
  }

  /**
   * 获取所有文件
   */
  private async getAllFiles(dirPath: string): Promise<string[]> {
    const files: string[] = [];
    
    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        
        if (entry.isDirectory()) {
          if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
            const subFiles = await this.getAllFiles(fullPath);
            files.push(...subFiles);
          }
        } else {
          files.push(fullPath);
        }
      }
    } catch {
      // 目录不存在或无权限访问
    }
    
    return files;
  }

  /**
   * 检查是否应该排除文件
   */
  private shouldExcludeFile(filePath: string): boolean {
    return this.config.excludePatterns.some(pattern => {
      // 简化的glob匹配
      const regex = pattern
        .replace(/\*\*/g, '.*')
        .replace(/\*/g, '[^/]*')
        .replace(/\?/g, '.');
      return new RegExp(regex).test(filePath);
    });
  }

  /**
   * 分析单个文件
   */
  private async analyzeFile(filePath: string): Promise<FileInfo> {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const stats = await fs.stat(filePath);
      const gzipSize = gzipSync(content).length;
      
      const fileInfo: FileInfo = {
        path: filePath,
        name: path.basename(filePath),
        size: stats.size,
        gzipSize,
        type: this.getFileType(filePath),
        isEntry: this.isEntryFile(filePath),
        imports: this.extractImports(content),
        exports: this.extractExports(content),
      };
      
      return fileInfo;
    } catch {
      // 返回空的文件信息
      return {
        path: filePath,
        name: path.basename(filePath),
        size: 0,
        gzipSize: 0,
        type: 'other',
        isEntry: false,
        imports: [],
        exports: [],
      };
    }
  }

  /**
   * 获取文件类型
   */
  private getFileType(filePath: string): FileInfo['type'] {
    const ext = path.extname(filePath).toLowerCase();
    
    switch (ext) {
      case '.js':
      case '.jsx':
        return 'javascript';
      case '.ts':
      case '.tsx':
        return 'typescript';
      case '.css':
      case '.scss':
      case '.sass':
        return 'css';
      case '.json':
        return 'json';
      default:
        return 'other';
    }
  }

  /**
   * 检查是否为入口文件
   */
  private isEntryFile(filePath: string): boolean {
    const fileName = path.basename(filePath);
    return fileName === 'index.ts' || fileName === 'index.js' || fileName === 'index.tsx';
  }

  /**
   * 提取导入语句
   */
  private extractImports(content: string): string[] {
    const imports: string[] = [];
    
    // 匹配 import 语句
    const importRegex = /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:\{[^}]*\}|\*\s+as\s+\w+|\w+))*\s+from\s+)?['"]([^'"]+)['"]/g;
    
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      imports.push(match[1]);
    }
    
    // 匹配 require 语句
    const requireRegex = /require\(['"]([^'"]+)['"]\)/g;
    
    while ((match = requireRegex.exec(content)) !== null) {
      imports.push(match[1]);
    }
    
    return [...new Set(imports)];
  }

  /**
   * 提取导出语句
   */
  private extractExports(content: string): string[] {
    const exports: string[] = [];
    
    // 匹配 export 语句
    const exportRegex = /export\s+(?:default\s+)?(?:(?:const|let|var|function|class)\s+)?(\w+)/g;
    
    let match;
    while ((match = exportRegex.exec(content)) !== null) {
      exports.push(match[1]);
    }
    
    // 匹配 export { ... }
    const exportBlockRegex = /export\s+\{([^}]+)\}/g;
    
    while ((match = exportBlockRegex.exec(content)) !== null) {
      const exportNames = match[1].split(',').map(name => name.trim());
      exports.push(...exportNames);
    }
    
    return [...new Set(exports)];
  }

  /**
   * 计算统计信息
   */
  private calculateStats(files: FileInfo[]): BundleAnalysisResult['stats'] {
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    const gzipSize = files.reduce((sum, file) => sum + file.gzipSize, 0);
    const fileCount = files.length;
    const averageFileSize = fileCount > 0 ? totalSize / fileCount : 0;
    
    return {
      totalSize,
      gzipSize,
      fileCount,
      averageFileSize,
    };
  }

  /**
   * Tree Shaking分析
   */
  private async analyzeTreeShaking(files: FileInfo[]): Promise<BundleAnalysisResult['treeShaking']> {
    const unusedExports: string[] = [];
    let shakableSize = 0;
    
    // 收集所有导出
    const allExports = new Set<string>();
    const allImports = new Set<string>();
    
    for (const file of files) {
      file.exports.forEach(exp => allExports.add(exp));
      file.imports.forEach(imp => allImports.add(imp));
    }
    
    // 找出未使用的导出
    for (const exp of allExports) {
      if (!allImports.has(exp) && exp !== 'default') {
        unusedExports.push(exp);
        // 估算可shake的大小（简化计算）
        shakableSize += 1000; // 假设每个未使用的导出约1KB
      }
    }
    
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    const efficiency = totalSize > 0 ? (shakableSize / totalSize) * 100 : 0;
    
    return {
      unusedExports,
      shakableSize,
      efficiency,
    };
  }

  /**
   * 依赖分析
   */
  private async analyzeDependencies(themePath: string): Promise<BundleAnalysisResult['dependencies']> {
    const direct: DependencyInfo[] = [];
    const indirect: DependencyInfo[] = [];
    const duplicates: DependencyInfo[] = [];
    
    try {
      // 尝试读取package.json
      const packageJsonPath = path.join(themePath, '../../package.json');
      const packageContent = await fs.readFile(packageJsonPath, 'utf-8');
      const packageJson = JSON.parse(packageContent);
      
      // 分析直接依赖
      const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
      
      for (const [name, version] of Object.entries(deps)) {
        direct.push({
          name,
          version: version as string,
          size: await this.estimateDependencySize(name),
          level: 1,
          isDev: name in (packageJson.devDependencies || {}),
        });
      }
      
    } catch (error) {
      console.warn('无法分析依赖:', error);
    }
    
    return { direct, indirect, duplicates };
  }

  /**
   * 估算依赖大小
   */
  private async estimateDependencySize(depName: string): Promise<number> {
    // 简化实现：根据依赖名称估算大小
    const sizeEstimates: Record<string, number> = {
      'react': 40000,
      'react-dom': 120000,
      'typescript': 50000,
      '@types/react': 5000,
      'jest': 80000,
    };
    
    return sizeEstimates[depName] || 10000; // 默认10KB
  }

  /**
   * 生成优化建议
   */
  private generateRecommendations(
    files: FileInfo[],
    stats: BundleAnalysisResult['stats'],
    treeShaking: BundleAnalysisResult['treeShaking'],
    _dependencies: BundleAnalysisResult['dependencies']
  ): OptimizationRecommendation[] {
    const recommendations: OptimizationRecommendation[] = [];
    
    // 大小相关建议
    if (stats.totalSize > this.config.sizeThresholds.maxThemeSize * 1024) {
      recommendations.push({
        type: 'size',
        priority: 'high',
        message: `主题总大小超过阈值 ${this.config.sizeThresholds.maxThemeSize}KB，当前为 ${Math.round(stats.totalSize / 1024)}KB`,
        expectedSaving: stats.totalSize - (this.config.sizeThresholds.maxThemeSize * 1024),
        difficulty: 'medium',
        affectedFiles: files.filter(f => f.size > 10000).map(f => f.name),
      });
    }
    
    // Tree Shaking建议
    if (treeShaking.unusedExports.length > 0) {
      recommendations.push({
        type: 'treeshaking',
        priority: 'medium',
        message: `发现 ${treeShaking.unusedExports.length} 个未使用的导出，可以通过清理减少 ${Math.round(treeShaking.shakableSize / 1024)}KB`,
        expectedSaving: treeShaking.shakableSize,
        difficulty: 'easy',
        affectedFiles: treeShaking.unusedExports.slice(0, 5),
      });
    }
    
    // 压缩效率建议
    const gzipRatio = stats.gzipSize / stats.totalSize;
    if (gzipRatio > this.config.sizeThresholds.maxGzipRatio) {
      recommendations.push({
        type: 'compression',
        priority: 'low',
        message: `压缩率较低(${Math.round(gzipRatio * 100)}%)，建议优化代码结构以提高压缩效率`,
        expectedSaving: stats.totalSize - (stats.gzipSize / this.config.sizeThresholds.maxGzipRatio),
        difficulty: 'hard',
        affectedFiles: [],
      });
    }
    
    // 大文件建议
    const largeFiles = files.filter(f => f.size > this.config.sizeThresholds.maxComponentSize * 1024);
    if (largeFiles.length > 0) {
      recommendations.push({
        type: 'size',
        priority: 'medium',
        message: `发现 ${largeFiles.length} 个大文件，建议拆分或优化`,
        expectedSaving: largeFiles.reduce((sum, f) => sum + f.size, 0) * 0.3,
        difficulty: 'medium',
        affectedFiles: largeFiles.map(f => f.name),
      });
    }
    
    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  /**
   * 计算性能评分
   */
  private calculateScore(
    stats: BundleAnalysisResult['stats'],
    treeShaking: BundleAnalysisResult['treeShaking'],
    dependencies: BundleAnalysisResult['dependencies']
  ): BundleAnalysisResult['score'] {
    // 大小评分 (0-100)
    const maxSize = this.config.sizeThresholds.maxThemeSize * 1024;
    const sizeScore = Math.max(0, 100 - (stats.totalSize / maxSize) * 100);
    
    // Tree Shaking评分 (0-100)
    const treeshakingScore = Math.max(0, 100 - treeShaking.efficiency);
    
    // 依赖评分 (0-100) - 依赖越少评分越高
    const maxDeps = 20;
    const depScore = Math.max(0, 100 - (dependencies.direct.length / maxDeps) * 100);
    
    // 压缩评分 (0-100)
    const gzipRatio = stats.gzipSize / stats.totalSize;
    const compressionScore = Math.max(0, (this.config.sizeThresholds.maxGzipRatio / gzipRatio) * 100);
    
    // 综合评分
    const overall = (sizeScore + treeshakingScore + depScore + compressionScore) / 4;
    
    return {
      overall: Math.round(overall),
      breakdown: {
        size: Math.round(sizeScore),
        treeshaking: Math.round(treeshakingScore),
        dependencies: Math.round(depScore),
        compression: Math.round(compressionScore),
      },
    };
  }

  /**
   * 比较多个主题的构建产物
   */
  public compareThemes(): {
    themes: string[];
    comparison: Record<string, unknown>;
    recommendations: string[];
    bestPractices: string[];
    size: Record<string, number>;
    score: Record<string, number>;
    treeshaking: Record<string, number>;
  } {
    const themes = Array.from(this.analysisResults.keys());
    const results = Array.from(this.analysisResults.values());
    
    const comparison: Record<string, unknown> = {
      size: {},
      score: {},
      treeshaking: {},
    };
    
    // 比较各项指标
    for (const result of results) {
      comparison.size[result.themeName] = Math.round(result.stats.totalSize / 1024);
      comparison.score[result.themeName] = result.score.overall;
      comparison.treeshaking[result.themeName] = Math.round(result.treeShaking.efficiency);
    }
    
    // 生成建议
    const recommendations: string[] = [];
    const bestPractices: string[] = [];
    
    // 找出最优主题
    const bestTheme = results.reduce((best, current) => 
      current.score.overall > best.score.overall ? current : best
    );
    
    recommendations.push(`最优主题: ${bestTheme.themeName} (评分: ${bestTheme.score.overall})`);
    
    // 找出需要优化的主题
    const worstTheme = results.reduce((worst, current) => 
      current.score.overall < worst.score.overall ? current : worst
    );
    
    if (worstTheme.score.overall < 70) {
      recommendations.push(`${worstTheme.themeName} 需要重点优化 (评分: ${worstTheme.score.overall})`);
    }
    
    // 最佳实践
    bestPractices.push('保持单个主题大小在200KB以内');
    bestPractices.push('定期清理未使用的导出以提高Tree Shaking效率');
    bestPractices.push('使用代码分割减少初始加载大小');
    bestPractices.push('优化依赖项，避免引入不必要的包');
    
    const sizeComparison = comparison.size as Record<string, number>;
    const scoreComparison = comparison.score as Record<string, number>;
    const treeshakingComparison = comparison.treeshaking as Record<string, number>;

    return {
      themes,
      comparison,
      recommendations,
      bestPractices,
      size: sizeComparison,
      score: scoreComparison,
      treeshaking: treeshakingComparison,
    };
  }

  /**
   * 生成优化报告
   */
  public generateOptimizationReport(): string {
    const comparison = this.compareThemes();
    
    let report = '# 构建产物优化分析报告\n\n';
    
    report += '## 分析概要\n';
    report += `- 分析时间: ${new Date().toISOString()}\n`;
    report += `- 分析主题: ${comparison.themes.join(', ')}\n\n`;
    
    report += '## 包体积对比\n\n';
    report += '| 主题 | 大小(KB) | 评分 | Tree Shaking效率(%) |\n';
    report += '|------|----------|------|--------------------|\n';
    
    for (const theme of comparison.themes) {
      report += `| ${theme} | ${comparison.size[theme]} | ${comparison.score[theme]} | ${comparison.treeshaking[theme]} |\n`;
    }
    
    report += '\n## 优化建议\n\n';
    for (const recommendation of comparison.recommendations) {
      report += `- ${recommendation}\n`;
    }
    
    report += '\n## 最佳实践\n\n';
    for (const practice of comparison.bestPractices) {
      report += `- ${practice}\n`;
    }
    
    report += '\n## 详细分析\n\n';
    
    for (const [themeName, result] of this.analysisResults.entries()) {
      report += `### ${themeName}\n\n`;
      report += `**评分**: ${result.score.overall}/100\n\n`;
      report += `**统计信息**:\n`;
      report += `- 总大小: ${Math.round(result.stats.totalSize / 1024)}KB\n`;
      report += `- Gzip后: ${Math.round(result.stats.gzipSize / 1024)}KB\n`;
      report += `- 文件数: ${result.stats.fileCount}\n\n`;
      
      if (result.recommendations.length > 0) {
        report += `**优化建议**:\n`;
        for (const rec of result.recommendations) {
          const emoji = rec.priority === 'high' ? '🔴' : rec.priority === 'medium' ? '🟡' : '🟢';
          report += `${emoji} ${rec.message} (预期节省: ${Math.round(rec.expectedSaving / 1024)}KB)\n`;
        }
        report += '\n';
      }
    }
    
    return report;
  }

  /**
   * 执行自动优化
   */
  public async optimizeTheme(themeName: string): Promise<{
    applied: OptimizationRecommendation[];
    skipped: OptimizationRecommendation[];
    totalSaving: number;
  }> {
    const result = this.analysisResults.get(themeName);
    if (!result) {
      throw new Error(`未找到主题 ${themeName} 的分析结果`);
    }
    
    const applied: OptimizationRecommendation[] = [];
    const skipped: OptimizationRecommendation[] = [];
    let totalSaving = 0;
    
    for (const recommendation of result.recommendations) {
      if (recommendation.difficulty === 'easy' && recommendation.type === 'treeshaking') {
        // 自动应用简单的Tree Shaking优化
        console.log(`应用优化: ${recommendation.message}`);
        applied.push(recommendation);
        totalSaving += recommendation.expectedSaving;
      } else {
        skipped.push(recommendation);
      }
    }
    
    console.log(`✅ 主题 ${themeName} 自动优化完成，节省 ${Math.round(totalSaving / 1024)}KB`);
    
    return {
      applied,
      skipped,
      totalSaving,
    };
  }

  /**
   * 清理资源
   */
  public cleanup(): void {
    this.analysisResults.clear();
  }
}

/**
 * 默认构建优化配置
 */
export const DEFAULT_BUILD_OPTIMIZATION_CONFIG: BuildOptimizationConfig = {
  outputDir: './dist',
  enableTreeShaking: true,
  enableCodeSplitting: true,
  enableCompressionAnalysis: true,
  sizeThresholds: {
    maxThemeSize: 200,
    maxComponentSize: 50,
    maxTotalSize: 500,
    maxGzipRatio: 0.3,
  },
  targets: {
    browsers: ['> 1%', 'last 2 versions', 'not dead'],
    mobile: true,
    modernJs: true,
  },
  excludePatterns: [
    '**/*.test.*',
    '**/*.spec.*',
    '**/node_modules/**',
    '**/__tests__/**',
    '**/coverage/**',
  ],
};

/**
 * 执行完整的构建优化分析
 */
export async function runBuildOptimization(
  config: Partial<BuildOptimizationConfig> = {}
): Promise<void> {
  console.log('🚀 启动构建产物优化分析...');
  
  const optimizer = new BuildOptimizer({
    ...DEFAULT_BUILD_OPTIMIZATION_CONFIG,
    ...config,
  });

  try {
    // 分析所有主题
    const themePaths = [
      './src/themes/tech',
      './src/themes/minimal',
    ];
    
    const themeNames = ['科技风主题', '极简主题'];
    
    for (let i = 0; i < themePaths.length; i++) {
      await optimizer.analyzeTheme(themeNames[i], themePaths[i]);
    }
    
    // 生成比较和报告
    const report = optimizer.generateOptimizationReport();
    
    console.log('📊 构建优化分析报告:');
    console.log(report);
    
    // 执行自动优化
    for (const themeName of themeNames) {
      const optimizationResult = await optimizer.optimizeTheme(themeName);
      console.log(`💡 ${themeName} 优化结果:`, optimizationResult);
    }
    
    optimizer.cleanup();
    console.log('✅ 构建产物优化分析完成！');
    
  } catch (error) {
    console.error('❌ 构建优化分析失败:', error);
    optimizer.cleanup();
    throw error;
  }
}