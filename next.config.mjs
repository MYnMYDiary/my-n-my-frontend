const nextConfig = {
    reactStrictMode: false,
    experimental: {},
    compiler: {
        styledComponents: true, // styled-components 활성화
      },
    images: {
        domains: ['localhost'], // 허용할 도메인 추가
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: `
          default-src 'self'; 
          img-src 'self' blob: data:; 
          media-src 'self' blob:;
          connect-src 'self' blob:;
          script-src 'self' 'unsafe-inline' 'unsafe-eval';
          style-src 'self' 'unsafe-inline';
        `,
      },
};

export default nextConfig;
