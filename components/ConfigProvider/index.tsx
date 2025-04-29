import React, { createContext, useContext, ReactNode } from 'react';
import type { PartialTheme } from '@fluentui/react-components';

// 定义全局配置的类型
interface ConfigContextProps {
  theme?: PartialTheme;
}

// 创建 Context
const ConfigContext = createContext<ConfigContextProps>({});

// 定义 Props 类型
export interface ConfigProviderProps {
  children: ReactNode;
  theme: PartialTheme;
}

// ConfigProvider 组件
const ConfigProvider: React.FC<ConfigProviderProps> = ({ children, theme }) => {
  const configValue = { theme };

  return <ConfigContext.Provider value={configValue}>{children}</ConfigContext.Provider>;
};

// 自定义 Hook，用于消费配置
export const useConfig = () => {
  return useContext(ConfigContext);
};

export default ConfigProvider;
