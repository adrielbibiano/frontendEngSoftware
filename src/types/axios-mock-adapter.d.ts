declare module 'axios-mock-adapter' {
  import { AxiosInstance } from 'axios'

  interface MockAdapterStatic {
    new (instance: AxiosInstance, options?: any): any
  }

  const MockAdapter: MockAdapterStatic
  export default MockAdapter
}
