// Global tip tanımlamaları
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
    }
  }
  
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}

// React modülü için tip tanımlaması
declare module 'react' {
  export function useState<T>(initialState: T | (() => T)): [T, (value: T | ((prev: T) => T)) => void]
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void
  export const Fragment: any
  export type ReactNode = any
  export type ReactElement = any
  export type FC<P = {}> = (props: P) => ReactElement | null
}

// Lucide React modülü için tip tanımlaması
declare module 'lucide-react' {
  export interface IconProps {
    className?: string
    size?: number | string
  }
  
  export const Loader2: React.FC<IconProps>
  export const TrendingUp: React.FC<IconProps>
  export const TrendingDown: React.FC<IconProps>
  export const DollarSign: React.FC<IconProps>
  export const Calendar: React.FC<IconProps>
  export const AlertTriangle: React.FC<IconProps>
  export const CheckCircle: React.FC<IconProps>
  export const Receipt: React.FC<IconProps>
}

// Next.js modülleri için tip tanımlaması
declare module 'next/server' {
  export interface NextRequest {
    url: string
  }
  
  export class NextResponse {
    static json(body: any, init?: ResponseInit): NextResponse
  }
}

// Node.js modülleri için tip tanımlaması
declare module 'fs' {
  export const promises: {
    readFile(path: string, encoding: string): Promise<string>
  }
}

declare module 'path' {
  export function join(...paths: string[]): string
}

export {} 