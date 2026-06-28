import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, keywords }) {
  const defaultTitle = "Yashwant Sahu | Full-Stack Developer";
  const defaultDesc = "Portfolio of Yashwant Sahu, a Full-Stack Software Engineer specializing in React, Node.js, and modern web architectures.";
  
  return (
    <Helmet>
      <title>{title ? `${title} | Yashwant Sahu` : defaultTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <meta name="keywords" content={keywords || "Full-Stack Developer, MERN Stack, React, Node.js, Software Engineer, Web Development"} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}
