export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '';

// IDが取得できない場合
export const existsGaId = GA_ID !== '';
