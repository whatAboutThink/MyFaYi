// utils/request.js
import Config from 'react-native-config';

class Request {
    constructor(config = {}) {
      // 基础配置
      this.config = {
        baseURL: '', // 基础路径
        timeout: 10000, // 默认超时时间（10秒）
        headers: { 'Content-Type': 'application/json' }, // 默认请求头
        ...config,
      };
  
      // 拦截器
      this.interceptors = {
        request: [],
        response: [],
      };
  
      // 请求队列（用于取消请求）
      this.requestMap = new Map();
    }
  
    /**
     * 核心请求方法
     * @param {string} url 请求地址
     * @param {object} options 请求配置
     * @returns {Promise} 请求结果
     */
    async request(url, options = {}) {
      // 合并配置
      const mergedOptions = {
        ...this.config,
        ...options,
        headers: { ...this.config.headers, ...options.headers },
      };
  
      // 生成唯一请求标识（用于取消请求）
      const requestId = Symbol(url);
      const controller = new AbortController();
      this.requestMap.set(requestId, controller);
  
      try {
        // 处理请求拦截器
        let requestConfig = await this.runInterceptors('request', {
          url,
          ...mergedOptions,
        });
  
        // 设置超时
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error(`请求超时（${this.config.timeout}ms）`)),
            requestConfig.timeout
          )
        );
        console.log(url);
        
        // 发起请求
        const responsePromise = fetch(requestConfig.baseURL + url, {
          ...requestConfig,
          signal: controller.signal,
        });
  
        // 等待请求结果或超时
        const response = await Promise.race([responsePromise, timeoutPromise]);
  
        // 处理响应拦截器
        return this.runInterceptors('response', response);
      } catch (error) {
        // 统一错误处理
        throw this.normalizeError(error);
      } finally {
        // 清理请求队列
        this.requestMap.delete(requestId);
      }
    }
  
    /**
     * 执行拦截器
     * @param {'request' | 'response'} type 拦截器类型
     * @param {object} value 拦截器输入值
     */
    async runInterceptors(type, value) {
      let result = value;
      for (const interceptor of this.interceptors[type]) {
        try {
          result = await interceptor.onFulfilled(result);
        } catch (error) {
          interceptor.onRejected?.(error);
          throw error;
        }
      }
      return result;
    }
  
    /**
     * 标准化错误格式
     * @param {Error} error 原始错误
     * @returns {object} 标准化错误对象
     */
    normalizeError(error) {
      return {
        code: error.code || 'NETWORK_ERROR',
        message: error.message || '网络请求失败',
        original: error,
      };
    }
  
    // 快捷方法 ------------------------------------------------------
    get(url, params, options = {}) {
      return this.request(url, {
        ...options,
        method: 'GET',
        params,
      });
    }
  
    post(url, data, options = {}) {
      return this.request(url, {
        ...options,
        method: 'POST',
        body: JSON.stringify(data),
      });
    }
  
    put(url, data, options = {}) {
      return this.request(url, {
        ...options,
        method: 'PUT',
        body: JSON.stringify(data),
      });
    }
  
    delete(url, options = {}) {
      return this.request(url, {
        ...options,
        method: 'DELETE',
      });
    }
  
    // 拦截器管理 ----------------------------------------------------
    useRequestInterceptor(onFulfilled, onRejected) {
      this.interceptors.request.push({ onFulfilled, onRejected });
    }
  
    useResponseInterceptor(onFulfilled, onRejected) {
      this.interceptors.response.push({ onFulfilled, onRejected });
    }
  
    // 取消请求 ------------------------------------------------------
    cancelRequest(requestId) {
      if (this.requestMap.has(requestId)) {
        this.requestMap.get(requestId).abort();
        this.requestMap.delete(requestId);
      }
    }
  
    cancelAllRequests() {
      this.requestMap.forEach(controller => controller.abort());
      this.requestMap.clear();
    }
  }
  
  // 创建默认实例（可根据需要创建多个实例）
  const api = new Request({
    baseURL: Config.API_URL,
    timeout: 15000,
  });
  
  // 示例：添加全局请求拦截器（如添加 Token）
  api.useRequestInterceptor(async (config) => {
    // const token = await getTokenFromStorage(); // 从安全存储获取 Token
    const token = "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjM0OTkwNGE5LTVmZmYtNGRmNi1iMGI4LTRlZjZhNDFmNzUyYSJ9.HmkWIrrZ5a70HzzlzI8mEqFAvyf92ud-GKY6Uqmgr1qVDcyGOdceSiUeJhDkqSxepYGO3ewH6jTcgteBgytdyw";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  
  // 示例：添加全局响应拦截器（如处理错误状态码）
  api.useResponseInterceptor(
    (response) => {
      if (!response.ok) {
        throw new Error(`HTTP错误: ${response.status}`);
      }
      return response.json();
    },
    (error) => {
      console.error('请求失败:', error);
      throw error;
    }
  );
  
  export default api;