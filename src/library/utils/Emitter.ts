type EventMap = Record<string, any>;

type EventKey<T extends EventMap> = string & keyof T;
type EventReceiver<T> = (params: T) => void;

export interface Emitter<T extends EventMap> {
  /**
   * 订阅事件
   * @param eventName 事件名
   * @param fn 订阅函数
   */
  on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void
  /**
   * 取消订阅
   * @param eventName 事件名
   * @param fn 订阅函数(调用on时传递的函数)
   */
  off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void
  /**
   * 触发事件
   * @param eventName 事件名
   * @param params 参数
   */
  emit<K extends EventKey<T>>(eventName: K, params: T[K]): void
}