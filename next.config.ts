import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	rewrites:async () => {
		return [
		  {
			source: "/hastag/:tag",
			destination: "/home/search?q=%23:tag",
		  },
		];
	  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  
  images:{
		remotePatterns:[
			{
				protocol:"https",
				hostname:"lh3.googleusercontent.com",
				
			},
				{
				  protocol: "https",
				  hostname: "utfs.io",
				},
				{
					protocol: 'https',
					hostname: 'avatars.githubusercontent.com',
					pathname: '/**', // Allow all paths from this hostname
				  },
			  
		]
	},
	
	eslint: {
		ignoreDuringBuilds: true,
	},
};

export default nextConfig;